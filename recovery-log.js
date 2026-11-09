// Recovery log: a private diary of the recovery, with an optional photo.
// Entries stay in this browser (IndexedDB) and are never uploaded, because
// injury photos are personal and there are no accounts.

var LOG_TEXT_MAX = 1000;

// A date as YYYY-MM-DD in the visitor's own time zone, as a date input uses.
function logDateString(date) {
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

// Trim the form's values, ready to save. photo is a data URL or null.
function logEntryFromForm(input, now) {
  return {
    date: String(input.date || ''),
    text: String(input.text || '').trim(),
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
  return problems;
}

// Newest day first; on the same day, the entry written last comes first.
function sortLogEntries(entries) {
  return entries.slice().sort(function (a, b) {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return b.createdAt - a.createdAt;
  });
}

// ---- Storage in this browser ----

var LOG_DATABASE = 'injury-helper-log';
var LOG_STORE = 'entries';

function openLogDatabase() {
  return new Promise(function (resolve, reject) {
    var request = indexedDB.open(LOG_DATABASE, 1);
    request.onupgradeneeded = function () {
      request.result.createObjectStore(LOG_STORE, {keyPath: 'id', autoIncrement: true});
    };
    request.onsuccess = function () { resolve(request.result); };
    request.onerror = function () { reject(request.error); };
  });
}

// Runs one request in a transaction and resolves with its result once the
// transaction has finished, so a saved entry is really on disk.
function logRequest(mode, makeRequest) {
  return openLogDatabase().then(function (database) {
    return new Promise(function (resolve, reject) {
      var transaction = database.transaction(LOG_STORE, mode);
      var request = makeRequest(transaction.objectStore(LOG_STORE));
      transaction.oncomplete = function () { database.close(); resolve(request.result); };
      transaction.onerror = function () { database.close(); reject(transaction.error); };
      transaction.onabort = function () { database.close(); reject(transaction.error); };
    });
  });
}

var logStore = {
  all: function () { return logRequest('readonly', function (store) { return store.getAll(); }); },
  add: function (entry) { return logRequest('readwrite', function (store) { return store.add(entry); }); },
  remove: function (id) { return logRequest('readwrite', function (store) { return store.delete(id); }); }
};
