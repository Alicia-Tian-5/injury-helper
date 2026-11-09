// Recovery log: a private diary of the recovery, with an optional photo.
// Entries stay in this browser (IndexedDB) and are never uploaded, because
// injury photos are personal and there are no accounts.

var LOG_TEXT_MAX = 1000;

// A date as YYYY-MM-DD in the visitor's own time zone, as a date input uses.
function logDateString(date) {
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

var LOG_PAIN_MAX = 10;
// Two optional pain scores: at rest, and while doing the rehab exercises.
var LOG_PAIN_FIELDS = ['painRest', 'painExercise'];

// A chosen score as text ('' when none was chosen) to a number or null.
function painScore(value) {
  var text = String(value == null ? '' : value);
  return text === '' ? null : Number(text);
}

// Trim the form's values, ready to save. photo is a data URL or null.
function logEntryFromForm(input, now) {
  return {
    date: String(input.date || ''),
    text: String(input.text || '').trim(),
    painRest: painScore(input.painRest),
    painExercise: painScore(input.painExercise),
    photo: input.photo || null,
    createdAt: now.getTime()
  };
}

// Problems with an entry, as {field, problem} like caseProblems in share.js.
// An empty list means it can be saved.
function logEntryProblems(entry) {
  var problems = [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) problems.push({field: 'date', problem: 'missing'});
  if (entry.text.length === 0) problems.push({field: 'text', problem: 'missing'});
  else if (entry.text.length > LOG_TEXT_MAX) problems.push({field: 'text', problem: 'tooLong'});
  LOG_PAIN_FIELDS.forEach(function (field) {
    var pain = entry[field];
    if (pain !== null && !(Number.isInteger(pain) && pain >= 0 && pain <= LOG_PAIN_MAX)) problems.push({field: field, problem: 'outOfRange'});
  });
  return problems;
}

// Newest day first; on the same day, the entry written last comes first.
function sortLogEntries(entries) {
  return entries.slice().sort(function (a, b) {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return b.createdAt - a.createdAt;
  });
}

// Days from one YYYY-MM-DD date to another, for spacing the chart by real
// time (noon avoids daylight-saving shifts).
function daysBetween(from, to) {
  function noon(dateString) { return new Date(dateString + 'T12:00:00').getTime(); }
  return Math.round((noon(to) - noon(from)) / 86400000);
}

// One point per day that has a pain score, oldest first, for the trend
// chart. Several records on one day are averaged (to one decimal); a score
// nobody gave that day is null.
function painTrend(entries) {
  var days = {};
  entries.forEach(function (entry) {
    LOG_PAIN_FIELDS.forEach(function (field) {
      if (entry[field] === null || entry[field] === undefined) return;
      var day = days[entry.date] = days[entry.date] || {};
      day[field] = (day[field] || []).concat(entry[field]);
    });
  });
  return Object.keys(days).sort().map(function (date) {
    var point = {date: date};
    LOG_PAIN_FIELDS.forEach(function (field) {
      var scores = days[date][field];
      point[field] = scores ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / scores.length * 10) / 10 : null;
    });
    return point;
  });
}

// ---- Storage in this browser ----

// Opens one of this site's databases; `stores` are created the first time.
function openDatabase(name, stores) {
  return new Promise(function (resolve, reject) {
    var request = indexedDB.open(name, 1);
    request.onupgradeneeded = function () {
      stores.forEach(function (store) { request.result.createObjectStore(store.name, store.options); });
    };
    request.onsuccess = function () { resolve(request.result); };
    request.onerror = function () { reject(request.error); };
  });
}

// Runs one request in a transaction and resolves with its result once the
// transaction has finished, so saved data is really on disk.
function databaseRequest(open, storeName, mode, makeRequest) {
  return open().then(function (database) {
    return new Promise(function (resolve, reject) {
      var transaction = database.transaction(storeName, mode);
      var request = makeRequest(transaction.objectStore(storeName));
      transaction.oncomplete = function () { database.close(); resolve(request.result); };
      transaction.onerror = function () { database.close(); reject(transaction.error); };
      transaction.onabort = function () { database.close(); reject(transaction.error); };
    });
  });
}

var LOG_DATABASE = 'injury-helper-log';
var LOG_STORE = 'entries';

function openLogDatabase() {
  return openDatabase(LOG_DATABASE, [{name: LOG_STORE, options: {keyPath: 'id', autoIncrement: true}}]);
}

function logRequest(mode, makeRequest) {
  return databaseRequest(openLogDatabase, LOG_STORE, mode, makeRequest);
}

var logStore = {
  all: function () { return logRequest('readonly', function (store) { return store.getAll(); }); },
  add: function (entry) { return logRequest('readwrite', function (store) { return store.add(entry); }); },
  remove: function (id) { return logRequest('readwrite', function (store) { return store.delete(id); }); }
};
