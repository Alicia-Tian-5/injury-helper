// Recovery report for the doctor: the recovery log and the rehab plan added
// up over all records, ready to show at a check-up or print. Needs
// recovery-log.js and rehab-plan.js.

// The first and last daily score of each pain field, from painTrend points.
// A field nobody scored is left out.
function painSummary(points) {
  var summary = {};
  LOG_PAIN_FIELDS.forEach(function (field) {
    var scores = points.filter(function (point) { return point[field] !== null; })
      .map(function (point) { return point[field]; });
    if (scores.length > 0) summary[field] = {first: scores[0], last: scores[scores.length - 1], days: scores.length};
  });
  return summary;
}

// For each exercise that has started by `today`: on how many of its planned
// days up to today it was ticked, out of how many it was planned. A tick on
// a day it was not planned does not count. `marks` are the plan's done marks.
function exerciseCounts(items, marks, today) {
  return items.filter(function (item) { return item.start <= today; }).map(function (item) {
    var last = item.end && item.end < today ? item.end : today;
    var due = 0;
    for (var day = item.start; day <= last; day = addDays(day, 1)) {
      if (isDueOn(item, day)) due++;
    }
    var done = marks.filter(function (mark) {
      return mark.itemId === item.id && mark.date <= last && isDueOn(item, mark.date);
    }).length;
    return {item: item, done: done, due: due};
  });
}

// Everything the report shows. Records run oldest first, as a doctor reads a
// history; the range runs from the earliest record or exercise to today.
// Null when there is nothing to report yet.
function recoveryReport(entries, items, marks, today) {
  var exercises = exerciseCounts(items, marks, today);
  if (entries.length === 0 && exercises.length === 0) return null;
  var records = sortLogEntries(entries).reverse();
  var starts = records.map(function (entry) { return entry.date; })
    .concat(exercises.map(function (count) { return count.item.start; }))
    .sort();
  var points = painTrend(entries);
  return {
    from: starts[0],
    to: today,
    pain: painSummary(points),
    painPoints: points,
    exercises: exercises,
    records: records
  };
}
