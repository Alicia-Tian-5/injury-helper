// Shared cases: limits, form checking and filtering. Nothing here talks to
// Firebase (see firebase-cases.js), so it can be tested on its own. The
// limits must match firestore.rules, which enforces them on the server.

var CASE_FIELDS = {
  nickname: {max: 30, required: false},
  story: {min: 10, max: 1000, required: true},
  treatment: {max: 1000, required: false},
  recovery: {max: 200, required: false},
  lesson: {max: 500, required: false}
};

// Trim every field and keep only the known ones, ready to save.
function caseFromForm(input, language) {
  var c = {injury: String(input.injury || ''), lang: language};
  Object.keys(CASE_FIELDS).forEach(function (field) {
    c[field] = String(input[field] || '').trim();
  });
  return c;
}

// Problems with a case, as {field, problem} where problem is 'missing',
// 'tooShort' or 'tooLong'. An empty list means it can be posted.
function caseProblems(c) {
  var problems = [];
  if (!findInjury(c.injury)) problems.push({field: 'injury', problem: 'missing'});
  Object.keys(CASE_FIELDS).forEach(function (field) {
    var limits = CASE_FIELDS[field];
    var length = c[field].length;
    if (limits.required && length === 0) problems.push({field: field, problem: 'missing'});
    else if (limits.min && length > 0 && length < limits.min) problems.push({field: field, problem: 'tooShort'});
    else if (length > limits.max) problems.push({field: field, problem: 'tooLong'});
  });
  return problems;
}

// Cases for one injury id, or all of them for ''. Keeps the given order.
function filterCases(cases, injuryId) {
  if (!injuryId) return cases;
  return cases.filter(function (c) { return c.injury === injuryId; });
}

// "2026-10-26" style, the same in both languages.
function formatCaseDate(date) {
  if (!date) return '';
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}
