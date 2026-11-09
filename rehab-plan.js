// Rehab plan: exercises the person enters from their doctor's or physical
// therapist's instructions, which ones are due today, which are done, and a
// calendar file for a daily reminder. Like the recovery log, everything stays
// in this browser. Uses openDatabase and logDateString from recovery-log.js.

var PLAN_NAME_MAX = 60;
var PLAN_AMOUNT_MAX = 60;
var ALL_WEEKDAYS = [0, 1, 2, 3, 4, 5, 6]; // Sunday is 0, as Date.getDay() counts.
var DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// Trim the form's values, ready to save. `days` are weekday numbers; an empty
// `end` means the exercise has no end date.
function planItemFromForm(input, now) {
  var days = (input.days || []).map(Number)
    .filter(function (day, index, all) { return ALL_WEEKDAYS.indexOf(day) >= 0 && all.indexOf(day) === index; })
    .sort(function (a, b) { return a - b; });
  return {
    name: String(input.name || '').trim(),
    amount: String(input.amount || '').trim(),
    days: days,
    start: String(input.start || ''),
    end: String(input.end || ''),
    createdAt: now.getTime()
  };
}

// Problems with an exercise, as {field, problem} like logEntryProblems.
function planItemProblems(item) {
  var problems = [];
  if (item.name.length === 0) problems.push({field: 'name', problem: 'missing'});
  else if (item.name.length > PLAN_NAME_MAX) problems.push({field: 'name', problem: 'tooLong'});
  if (item.amount.length > PLAN_AMOUNT_MAX) problems.push({field: 'amount', problem: 'tooLong'});
  if (item.days.length === 0) problems.push({field: 'days', problem: 'missing'});
  if (!DATE_PATTERN.test(item.start)) problems.push({field: 'start', problem: 'missing'});
  if (item.end !== '' && (!DATE_PATTERN.test(item.end) || item.end < item.start)) problems.push({field: 'end', problem: 'beforeStart'});
  return problems;
}

function weekdayOf(dateString) {
  return new Date(dateString + 'T12:00:00').getDay();
}

// Whether the exercise is planned for that day (YYYY-MM-DD).
function isDueOn(item, dateString) {
  if (dateString < item.start) return false;
  if (item.end && dateString > item.end) return false;
  return item.days.indexOf(weekdayOf(dateString)) >= 0;
}

function itemsDueOn(items, dateString) {
  return items.filter(function (item) { return isDueOn(item, dateString); });
}

// Whether the exercise will never be due again after `today`.
function isPlanItemOver(item, today) {
  return item.end !== '' && item.end < today;
}

// Running first, then those starting later, then the ones that are over.
function sortPlanItems(items, today) {
  function group(item) { return isPlanItemOver(item, today) ? 2 : item.start > today ? 1 : 0; }
  return items.slice().sort(function (a, b) {
    return group(a) - group(b) || (a.start < b.start ? -1 : a.start > b.start ? 1 : a.createdAt - b.createdAt);
  });
}

// The key of a "done" mark: one per exercise per day.
function doneKey(itemId, dateString) {
  return dateString + '|' + itemId;
}

// ---- A plan from the assessment result ----

// One plan item per rehab stage with fixed days (see triage.js), counted from
// the injury date and done every day. Stages already over by `today` are
// left out. `ref` points back at the stage, so its text follows the page's
// language; `name` is the English goal, kept for when the stage is not found.
function rehabPlanItems(injury, injuryDate, today, now) {
  var items = [];
  injury.rehab.forEach(function (stage, index) {
    if (!stage.days) return;
    var item = {
      name: stage.goal.en,
      amount: '',
      days: ALL_WEEKDAYS.slice(),
      start: addDays(injuryDate, stage.days[0]),
      end: addDays(injuryDate, stage.days[1] - 1),
      ref: {injury: injury.id, stage: index},
      createdAt: now.getTime()
    };
    if (!isPlanItemOver(item, today)) items.push(item);
  });
  return items;
}

// Stages that start when the body is ready, not on a date.
function untimedRehabStages(injury) {
  return injury.rehab.filter(function (stage) { return !stage.days; });
}

// The rehab stage a plan item came from, or null for an exercise the person typed.
function rehabStageOf(item) {
  if (!item.ref) return null;
  var injury = INJURIES.filter(function (candidate) { return candidate.id === item.ref.injury; })[0];
  return (injury && injury.rehab[item.ref.stage]) || null;
}

// ---- Calendar file (iCalendar, .ics) ----

var ICS_WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

function icsText(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

function icsDate(dateString) {
  return dateString.replace(/-/g, '');
}

function addDays(dateString, days) {
  var date = new Date(dateString + 'T12:00:00');
  date.setDate(date.getDate() + days);
  return logDateString(date);
}

// The first day on or after `start` that the exercise is due, or null.
function firstDueDay(item) {
  for (var offset = 0; offset < 7; offset++) {
    var day = addDays(item.start, offset);
    if (isDueOn(item, day)) return day;
  }
  return null;
}

// A calendar file with one repeating event per exercise, at `time` (HH:MM)
// local time on the days it is due, with an alert when it starts.
// `title` is the event title before the exercise name, in the page's language.
function planCalendar(items, time, title, now) {
  var stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  var clock = time.replace(':', '') + '00';
  var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Sports Injury Helper//Rehab plan//EN', 'CALSCALE:GREGORIAN'];
  items.forEach(function (item) {
    var first = firstDueDay(item);
    if (!first) return;
    var rule = 'RRULE:FREQ=WEEKLY;BYDAY=' + item.days.map(function (day) { return ICS_WEEKDAYS[day]; }).join(',');
    if (item.end) rule += ';UNTIL=' + icsDate(item.end) + 'T235959';
    var summary = title + ': ' + item.name + (item.amount ? ' ' + item.amount : '');
    lines.push(
      'BEGIN:VEVENT',
      'UID:rehab-' + item.id + '-' + item.createdAt + '@injury-helper',
      'DTSTAMP:' + stamp,
      'DTSTART:' + icsDate(first) + 'T' + clock,
      'DURATION:PT15M',
      rule,
      'SUMMARY:' + icsText(summary),
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:' + icsText(summary),
      'TRIGGER:PT0M',
      'END:VALARM',
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

// ---- Storage in this browser ----

var PLAN_DATABASE = 'injury-helper-plan';

function openPlanDatabase() {
  return openDatabase(PLAN_DATABASE, [
    {name: 'items', options: {keyPath: 'id', autoIncrement: true}},
    {name: 'done', options: {keyPath: 'key'}}
  ]);
}

function planRequest(storeName, mode, makeRequest) {
  return databaseRequest(openPlanDatabase, storeName, mode, makeRequest);
}

var planStore = {
  all: function () { return planRequest('items', 'readonly', function (store) { return store.getAll(); }); },
  save: function (item) { return planRequest('items', 'readwrite', function (store) { return store.put(item); }); },
  remove: function (id) { return planRequest('items', 'readwrite', function (store) { return store.delete(id); }); },
  // Swaps the stages added earlier for this injury for new ones, in one
  // transaction, so adding twice never leaves two copies. Typed exercises stay.
  replaceRehab: function (injuryId, items) {
    return planRequest('items', 'readwrite', function (store) {
      var request = store.getAll();
      request.onsuccess = function () {
        request.result.forEach(function (item) {
          if (item.ref && item.ref.injury === injuryId) store.delete(item.id);
        });
        items.forEach(function (item) { store.add(item); });
      };
      return request;
    });
  },
  doneOn: function (dateString) {
    return planRequest('done', 'readonly', function (store) { return store.getAll(); }).then(function (marks) {
      return marks.filter(function (mark) { return mark.date === dateString; }).map(function (mark) { return mark.itemId; });
    });
  },
  setDone: function (itemId, dateString, done) {
    return planRequest('done', 'readwrite', function (store) {
      var key = doneKey(itemId, dateString);
      return done ? store.put({key: key, itemId: itemId, date: dateString}) : store.delete(key);
    });
  }
};
