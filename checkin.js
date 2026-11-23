// Check-ins and points: worked out from what the person already did, so
// nothing has to be claimed by hand and nothing can be counted twice. Each
// kind of action scores once a day; any of them makes the day a check-in.
// Points earn badges, nothing else. Uses isDueOn and itemsDueOn from
// rehab-plan.js, addDays from rehab-plan.js and riskText from risk-check.js.

var CHECKIN_ACTIONS = [
  {id: 'plan', points: 10, name: riskText('Did all of today’s rehab exercises', 'Hice todos los ejercicios de hoy', 'Fait tous les exercices du jour', 'Сделал все упражнения на сегодня', 'أنجزت كل تمارين اليوم', '完成今天的全部康复训练')},
  {id: 'log', points: 5, name: riskText('Wrote today’s record', 'Escribí el registro de hoy', 'Écrit la note du jour', 'Написал запись за сегодня', 'كتبت سجل اليوم', '写了今天的康复记录')},
  {id: 'warmup', points: 5, name: riskText('Finished a warm-up', 'Terminé un calentamiento', 'Terminé un échauffement', 'Закончил разминку', 'أنهيت الإحماء', '跟着热身做完一整套')},
  {id: 'training', points: 3, name: riskText('Logged a training session', 'Apunté un entrenamiento', 'Noté une séance', 'Записал тренировку', 'سجّلت حصة تدريب', '记了一次训练')}
];

var CHECKIN_BADGES = [
  {id: 'streak3', kind: 'streak', need: 3, icon: '🌱', name: riskText('Off to a start', 'Buen comienzo', 'Bien parti', 'Хорошее начало', 'بداية موفقة', '开个好头')},
  {id: 'streak7', kind: 'streak', need: 7, icon: '🔥', name: riskText('One full week', 'Una semana entera', 'Une semaine entière', 'Целая неделя', 'أسبوع كامل', '坚持一周')},
  {id: 'streak14', kind: 'streak', need: 14, icon: '💪', name: riskText('Two strong weeks', 'Dos semanas fuertes', 'Deux semaines solides', 'Две крепкие недели', 'أسبوعان قويان', '两周不放弃')},
  {id: 'streak30', kind: 'streak', need: 30, icon: '🏅', name: riskText('A whole month', 'Un mes entero', 'Un mois entier', 'Целый месяц', 'شهر كامل', '整整一个月')},
  {id: 'points100', kind: 'points', need: 100, icon: '⭐', name: riskText('100 points', '100 puntos', '100 points', '100 очков', '100 نقطة', '100 分')},
  {id: 'points300', kind: 'points', need: 300, icon: '🌟', name: riskText('Recovery regular', 'Constancia en la recuperación', 'Habitué de la récupération', 'Постоянство в восстановлении', 'مواظب على التعافي', '康复常客')},
  {id: 'points1000', kind: 'points', need: 1000, icon: '🏆', name: riskText('Recovery champion', 'Campeón de la recuperación', 'Champion de la récupération', 'Чемпион восстановления', 'بطل التعافي', '康复达人')}
];

// Days on which every exercise due that day was ticked. A day with nothing
// due does not count, so an empty plan earns nothing.
function planDoneDates(items, marks) {
  var ticked = {};
  marks.forEach(function (mark) {
    (ticked[mark.date] = ticked[mark.date] || []).push(mark.itemId);
  });
  return Object.keys(ticked).filter(function (date) {
    var due = itemsDueOn(items, date);
    return due.length > 0 && due.every(function (item) { return ticked[date].indexOf(item.id) >= 0; });
  });
}

// A planned rest day: the plan is running but nothing is due. It neither
// adds to nor breaks a streak.
function isPlanRestDay(items, date) {
  var running = items.some(function (item) { return date >= item.start && (!item.end || date <= item.end); });
  return running && itemsDueOn(items, date).length === 0;
}

// `activity` holds the dates of each action: {plan, log, warmup, training}
// (lists of YYYY-MM-DD), and `items` is the rehab plan for rest days.
// Returns the points of each day, the total, the current and best streak
// (today not done yet does not break it), and each badge with the day it was
// earned or how much is still needed.
function checkinSummary(activity, items, today) {
  var days = {};
  CHECKIN_ACTIONS.forEach(function (action) {
    (activity[action.id] || []).forEach(function (date) {
      if (date > today) return;
      var day = days[date] = days[date] || {points: 0, actions: []};
      if (day.actions.indexOf(action.id) >= 0) return;
      day.actions.push(action.id);
      day.points += action.points;
    });
  });
  var dates = Object.keys(days).sort();
  var total = 0;
  var streak = 0;
  var best = 0;
  var earned = {};
  if (dates.length > 0) {
    for (var date = dates[0]; date <= today; date = addDays(date, 1)) {
      if (days[date]) {
        streak += 1;
        total += days[date].points;
      } else if (date !== today && !isPlanRestDay(items, date)) {
        streak = 0;
      }
      best = Math.max(best, streak);
      CHECKIN_BADGES.forEach(function (badge) {
        var reached = badge.kind === 'streak' ? streak : total;
        if (!earned[badge.id] && reached >= badge.need) earned[badge.id] = date;
      });
    }
  }
  return {
    days: days,
    total: total,
    streak: streak,
    best: best,
    today: days[today] || {points: 0, actions: []},
    badges: CHECKIN_BADGES.map(function (badge) {
      var have = badge.kind === 'streak' ? streak : total;
      return {badge: badge, earned: earned[badge.id] || null, missing: Math.max(0, badge.need - have)};
    })
  };
}

// Badges earned that the person has not been shown yet.
function newBadges(summary, seenIds) {
  return summary.badges.filter(function (entry) { return entry.earned && seenIds.indexOf(entry.badge.id) < 0; });
}

// The days of a month (YYYY-MM) as weeks of 7, with null before the 1st and
// after the last day, starting on Monday.
function monthWeeks(month) {
  var first = month + '-01';
  var offset = (new Date(first + 'T12:00:00').getDay() + 6) % 7;
  var cells = [];
  for (var i = 0; i < offset; i++) cells.push(null);
  for (var date = first; date.slice(0, 7) === month; date = addDays(date, 1)) cells.push(date);
  while (cells.length % 7) cells.push(null);
  var weeks = [];
  for (var w = 0; w < cells.length; w += 7) weeks.push(cells.slice(w, w + 7));
  return weeks;
}
