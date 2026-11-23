// Training load log: each session is minutes times how hard it felt (1–10).
// The last 7 days are compared with the average week of the 4 weeks before;
// a jump of more than 30% is when injuries become more likely. Uses
// daysBetween from recovery-log.js and DATE_PATTERN from rehab-plan.js.
// Kept on this device only.

var TRAINING_KEY = 'injury-helper-training';
var TRAINING_MAX_MINUTES = 600;
var TRAINING_WEEKS_COMPARED = 4;
var TRAINING_MIN_WEEKS = 2;
var TRAINING_JUMP_RATIO = 1.3;

// What is wrong with a new session, as a list of field names (empty if
// nothing): a real date not after today, whole minutes 1–600, effort 1–10.
function trainingEntryProblems(dateText, minutesText, effortText, today) {
  var problems = [];
  if (!DATE_PATTERN.test(dateText) || dateText > today) problems.push('date');
  var minutes = Number(minutesText);
  if (minutesText === '' || !Number.isInteger(minutes) || minutes < 1 || minutes > TRAINING_MAX_MINUTES) problems.push('minutes');
  var effort = Number(effortText);
  if (effortText === '' || !Number.isInteger(effort) || effort < 1 || effort > 10) problems.push('effort');
  return problems;
}

function trainingLoad(entry) {
  return entry.minutes * entry.effort;
}

// Newest first.
function sortTrainingEntries(entries) {
  return entries.slice().sort(function (a, b) {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return b.createdAt - a.createdAt;
  });
}

// This week is today and the 6 days before. The weeks before count only as
// far back as the first record, so a new log is not compared with empty
// weeks. Returns one of:
//   {status: 'empty'}
//   {status: 'tooSoon', thisWeek}             fewer than 2 earlier weeks
//   {status: 'jump', thisWeek, average, percent}
//   {status: 'steady', thisWeek, average, percent}
function trainingLoadResult(entries, today) {
  if (entries.length === 0) return {status: 'empty'};
  var thisWeek = 0;
  var earlier = 0;
  var firstDate = today;
  entries.forEach(function (entry) {
    var daysAgo = daysBetween(entry.date, today);
    if (entry.date < firstDate) firstDate = entry.date;
    if (daysAgo < 7) thisWeek += trainingLoad(entry);
    else if (daysAgo < 7 * (TRAINING_WEEKS_COMPARED + 1)) earlier += trainingLoad(entry);
  });
  var weeks = Math.min(TRAINING_WEEKS_COMPARED, Math.floor(daysBetween(firstDate, today) / 7));
  if (weeks < TRAINING_MIN_WEEKS) return {status: 'tooSoon', thisWeek: thisWeek};
  var average = Math.round(earlier / weeks);
  var jump = average === 0 ? thisWeek > 0 : thisWeek > average * TRAINING_JUMP_RATIO;
  var percent = average === 0 ? null : Math.round((thisWeek / average - 1) * 100);
  return {status: jump ? 'jump' : 'steady', thisWeek: thisWeek, average: average, percent: percent};
}

function loadTrainingEntries() {
  try {
    var saved = JSON.parse(localStorage.getItem(TRAINING_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

// Returns false when the browser blocks storage (for example a private window).
function saveTrainingEntries(entries) {
  try {
    localStorage.setItem(TRAINING_KEY, JSON.stringify(entries));
    return true;
  } catch (e) {
    return false;
  }
}
