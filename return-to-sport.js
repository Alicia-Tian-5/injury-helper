// Return to sport check: a few yes / no questions and an optional one-leg
// hop test that say whether someone with a leg injury is ready to play
// again. It is a self-check for reference only; the page says so with
// every result. Uses YES_NO from triage.js.

// Leg injuries get the questions; broken bones and dislocated joints need a
// doctor's check instead, so they get no questions.
var RTS_SELF_CHECK_INJURIES = ['ankle', 'patella', 'sprain', 'strain'];
var RTS_DOCTOR_INJURIES = ['fracture', 'dislocation'];
var RTS_INJURIES = RTS_SELF_CHECK_INJURIES.concat(RTS_DOCTOR_INJURIES);

// Each question comes with what to work on when the answer is "no".
var RTS_QUESTIONS = [
  {
    id: 'walk',
    text: {en: 'Can you walk and go up and down stairs without pain?', es: '¿Puedes caminar y subir y bajar escaleras sin dolor?', fr: 'Peux-tu marcher et monter et descendre les escaliers sans douleur ?', ru: 'Можешь ходить и подниматься и спускаться по лестнице без боли?', ar: 'هل تستطيع المشي وصعود الدرج ونزوله دون ألم؟', zh: '走路、上下楼梯都不疼了吗？'},
    work: {en: 'Keep doing your rehab exercises and everyday walking. Wait until stairs no longer hurt before running.', es: 'Sigue con tus ejercicios de rehabilitación y caminando a diario. Espera a que las escaleras ya no duelan antes de correr.', fr: 'Continue tes exercices de rééducation et la marche au quotidien. Attends que les escaliers ne fassent plus mal avant de courir.', ru: 'Продолжай упражнения реабилитации и обычную ходьбу. Не начинай бегать, пока лестница не перестанет вызывать боль.', ar: 'واصل تمارين التأهيل والمشي اليومي. انتظر حتى يزول ألم الدرج قبل أن تبدأ الجري.', zh: '继续做康复训练和日常走路。等上下楼梯不疼了，再开始跑步。'}
  },
  {
    id: 'swelling',
    text: {en: 'Has the swelling gone completely?', es: '¿Ha desaparecido por completo la hinchazón?', fr: 'Le gonflement a-t-il complètement disparu ?', ru: 'Отёк полностью прошёл?', ar: 'هل زال التورم تمامًا؟', zh: '肿已经完全消了吗？'},
    work: {en: 'Swelling means it is still healing. Ice and raise it after activity, and see a doctor if it does not go down.', es: 'La hinchazón significa que aún se está curando. Pon hielo y eleva la zona después de la actividad, y ve al médico si no baja.', fr: 'Le gonflement veut dire que ça guérit encore. Mets de la glace et surélève après l’effort, et consulte un médecin s’il ne diminue pas.', ru: 'Отёк значит, что травма ещё заживает. После нагрузки прикладывай лёд и держи ногу повыше; если отёк не спадает, обратись к врачу.', ar: 'التورم يعني أن الإصابة ما زالت تلتئم. ضع الثلج وارفع المكان بعد النشاط، وراجع الطبيب إذا لم يخف.', zh: '还肿说明还在恢复。运动后冰敷、垫高；如果一直不消，去看医生。'}
  },
  {
    id: 'motion',
    text: {en: 'Can the injured leg straighten and bend as fully as the other one?', es: '¿La pierna lesionada se estira y se dobla tanto como la otra?', fr: 'La jambe blessée se tend-elle et se plie-t-elle autant que l’autre ?', ru: 'Травмированная нога разгибается и сгибается так же полностью, как другая?', ar: 'هل تستطيع الساق المصابة أن تنفرد وتنثني بالكامل مثل الأخرى؟', zh: '受伤的腿能像另一条腿一样完全伸直、弯曲吗？'},
    work: {en: 'Do gentle stretches to bend and straighten it every day until both sides match.', es: 'Haz estiramientos suaves para doblarla y estirarla cada día hasta que ambos lados se igualen.', fr: 'Fais chaque jour des étirements doux pour la plier et la tendre, jusqu’à ce que les deux côtés soient pareils.', ru: 'Каждый день делай мягкие упражнения на сгибание и разгибание, пока обе стороны не сравняются.', ar: 'قم كل يوم بتمارين إطالة لطيفة لثنيها وفردها حتى يتساوى الجانبان.', zh: '每天做轻柔的屈伸拉伸，直到两边一样。'}
  },
  {
    id: 'balance',
    text: {en: 'Can you stand on the injured leg alone for 30 seconds without losing balance?', es: '¿Puedes estar 30 segundos sobre la pierna lesionada sin perder el equilibrio?', fr: 'Peux-tu tenir 30 secondes sur la jambe blessée sans perdre l’équilibre ?', ru: 'Можешь простоять 30 секунд на одной травмированной ноге, не теряя равновесия?', ar: 'هل تستطيع الوقوف على الساق المصابة وحدها 30 ثانية دون أن تفقد توازنك؟', zh: '受伤的腿单腿站 30 秒，站得稳吗？'},
    work: {en: 'Practice standing on one leg: first holding a wall, then without, then with your eyes closed.', es: 'Practica estar sobre una pierna: primero apoyándote en la pared, luego sin apoyo y luego con los ojos cerrados.', fr: 'Entraîne-toi à tenir sur une jambe : d’abord en te tenant au mur, puis sans, puis les yeux fermés.', ru: 'Тренируй стойку на одной ноге: сначала держась за стену, потом без опоры, потом с закрытыми глазами.', ar: 'تدرّب على الوقوف على ساق واحدة: أولًا مستندًا إلى الحائط، ثم دون سند، ثم مغمض العينين.', zh: '练单腿站：先扶着墙，再不扶，最后闭上眼睛站。'}
  },
  {
    id: 'hop',
    text: {en: 'Can you hop 10 times in place on the injured leg without pain?', es: '¿Puedes saltar 10 veces en el sitio sobre la pierna lesionada sin dolor?', fr: 'Peux-tu sauter 10 fois sur place sur la jambe blessée sans douleur ?', ru: 'Можешь подпрыгнуть 10 раз на месте на травмированной ноге без боли?', ar: 'هل تستطيع القفز 10 مرات في مكانك على الساق المصابة دون ألم؟', zh: '受伤的腿单腿原地跳 10 下，不疼吗？'},
    work: {en: 'Build up with calf raises and small jumps on both legs before hopping on one.', es: 'Empieza con elevaciones de talones y saltos pequeños con las dos piernas antes de saltar con una.', fr: 'Progresse avec des montées sur la pointe des pieds et de petits sauts à deux pieds avant de sauter sur une jambe.', ru: 'Сначала подъёмы на носки и небольшие прыжки на двух ногах, потом прыжки на одной.', ar: 'ابدأ برفع الكعبين وقفزات صغيرة على الساقين قبل القفز على ساق واحدة.', zh: '先练提踵和双脚小跳，再练单脚跳。'}
  },
  {
    id: 'cutting',
    text: {en: 'Can you jog, stop suddenly and change direction without pain or fear?', es: '¿Puedes trotar, frenar de golpe y cambiar de dirección sin dolor ni miedo?', fr: 'Peux-tu trottiner, t’arrêter net et changer de direction sans douleur ni peur ?', ru: 'Можешь бежать трусцой, резко останавливаться и менять направление без боли и страха?', ar: 'هل تستطيع الهرولة والتوقف فجأة وتغيير الاتجاه دون ألم أو خوف؟', zh: '能慢跑、急停、变向，都不疼也不怕吗？'},
    work: {en: 'Start with jogging in a straight line, then slow zigzags, then speed up over a few weeks.', es: 'Empieza trotando en línea recta, luego zigzags lentos, y ve aumentando la velocidad durante unas semanas.', fr: 'Commence par trottiner en ligne droite, puis des zigzags lents, puis accélère sur quelques semaines.', ru: 'Начни с бега по прямой, потом медленный зигзаг, и за несколько недель ускоряйся.', ar: 'ابدأ بالهرولة في خط مستقيم، ثم بخطوات متعرجة ببطء، ثم زد السرعة خلال بضعة أسابيع.', zh: '先直线慢跑，再慢慢跑"之"字形，几周内逐渐加快。'}
  },
  {
    id: 'cleared',
    onlyFor: ['patella'],
    text: {en: 'Has a doctor or physiotherapist said you can go back?', es: '¿Un médico o fisioterapeuta te ha dicho que puedes volver?', fr: 'Un médecin ou un kiné t’a-t-il dit que tu pouvais reprendre ?', ru: 'Врач или физиотерапевт сказал, что тебе можно возвращаться?', ar: 'هل قال لك طبيب أو أخصائي علاج طبيعي إنك تستطيع العودة؟', zh: '医生或康复师说过你可以回去了吗？'},
    work: {en: 'A kneecap that has slipped out once can slip out again. Ask your doctor or physio to check you before you go back.', es: 'Una rótula que se ha salido una vez puede volver a salirse. Pide a tu médico o fisio que te revise antes de volver.', fr: 'Une rotule qui s’est déboîtée une fois peut se déboîter à nouveau. Demande à ton médecin ou à ton kiné de te vérifier avant de reprendre.', ru: 'Надколенник, который однажды вывихнулся, может вывихнуться снова. Попроси врача или физиотерапевта проверить тебя перед возвращением.', ar: 'الرضفة التي خرجت من مكانها مرة قد تخرج مرة أخرى. اطلب من طبيبك أو أخصائي العلاج الطبيعي فحصك قبل العودة.', zh: '髌骨脱位过一次，就有可能再脱。回去之前，请医生或康复师帮你检查一下。'}
  }
];

// Optional one-leg hop for distance: the injured leg should reach at least
// this share of the other leg.
var RTS_HOP_MIN_PERCENT = 90;
var RTS_HOP_MAX_CM = 400;

var RTS_HOP_WORK = {en: 'Your injured leg hopped {0}% as far as the other. Most guides look for at least 90%. Keep building one-leg strength (step-ups, one-leg squats) and test again in a week or two.', es: 'Tu pierna lesionada saltó un {0}% de lo que salta la otra. La mayoría de las guías piden al menos un 90%. Sigue fortaleciendo cada pierna por separado (subir a un escalón, sentadillas a una pierna) y repite la prueba en una o dos semanas.', fr: 'Ta jambe blessée a sauté {0} % de la distance de l’autre. La plupart des recommandations demandent au moins 90 %. Continue à renforcer chaque jambe (montées sur une marche, squats sur une jambe) et refais le test dans une ou deux semaines.', ru: 'Травмированная нога прыгнула на {0}% от другой. Обычно ориентируются минимум на 90%. Продолжай укреплять каждую ногу отдельно (зашагивания на ступеньку, приседания на одной ноге) и повтори тест через неделю-две.', ar: 'قفزت ساقك المصابة {0}% من مسافة الساق الأخرى. معظم الإرشادات تطلب 90% على الأقل. واصل تقوية كل ساق وحدها (الصعود على درجة، والقرفصاء على ساق واحدة) وأعد الاختبار بعد أسبوع أو أسبوعين.', zh: '受伤的腿跳了另一条腿的 {0}%。一般要求至少 90%。继续练单腿力量（上台阶、单腿蹲），一两周后再测一次。'};

// The four steps back after all checks pass.
var RTS_STAGES = [
  {en: 'Train on your own: running, drills and ball work, no contact.', es: 'Entrena por tu cuenta: correr, ejercicios técnicos y con balón, sin contacto.', fr: 'Entraîne-toi seul : course, exercices et ballon, sans contact.', ru: 'Тренируйся сам: бег, упражнения и работа с мячом, без контакта.', ar: 'تدرّب وحدك: جري وتمارين مهارية وبالكرة، دون احتكاك.', zh: '自己练：跑步、专项动作和球感练习，不对抗。'},
  {en: 'Team practice without contact.', es: 'Entrenamiento con el equipo sin contacto.', fr: 'Entraînement avec l’équipe sans contact.', ru: 'Тренировки с командой без контакта.', ar: 'تدريب مع الفريق دون احتكاك.', zh: '跟队训练，但不对抗。'},
  {en: 'Full team practice, with contact.', es: 'Entrenamiento completo con el equipo, con contacto.', fr: 'Entraînement complet avec l’équipe, avec contact.', ru: 'Полноценные тренировки с командой, с контактом.', ar: 'تدريب كامل مع الفريق، مع الاحتكاك.', zh: '全队训练，包括对抗。'},
  {en: 'Matches.', es: 'Partidos.', fr: 'Matchs.', ru: 'Матчи.', ar: 'المباريات.', zh: '比赛。'}
];

// The questions for one injury, or none when it needs a doctor's check.
function rtsQuestions(injuryId) {
  if (RTS_SELF_CHECK_INJURIES.indexOf(injuryId) < 0) return [];
  return RTS_QUESTIONS.filter(function (question) {
    return !question.onlyFor || question.onlyFor.indexOf(injuryId) >= 0;
  });
}

// A typed distance as a number of centimetres, null when left empty, or
// NaN when it is not a sensible distance.
function rtsHopDistance(text) {
  var trimmed = String(text == null ? '' : text).trim();
  if (trimmed === '') return null;
  var number = Number(trimmed);
  return number > 0 && number <= RTS_HOP_MAX_CM ? number : NaN;
}

// How far the injured leg hopped as a whole percent of the other leg.
function rtsHopPercent(injured, other) {
  return Math.round(injured / other * 100);
}

// The result for an injury, the answers ({questionId: 'yes' | 'no'}) and the
// two typed hop distances. One of:
//   {status: 'doctor'}        broken bone or dislocation: ask a doctor
//   {status: 'missing', ids}  unanswered questions
//   {status: 'badHop'}        a distance is not sensible, or only one is filled
//   {status: 'notYet', failed: [ids], hopPercent}  something to work on first
//   {status: 'stepByStep'}    all clear, but no hop test: go back in stages
//   {status: 'ready', hopPercent}   all clear including the hop test
function returnToSportResult(injuryId, answers, hopInjuredText, hopOtherText) {
  if (RTS_DOCTOR_INJURIES.indexOf(injuryId) >= 0) return {status: 'doctor'};
  var questions = rtsQuestions(injuryId);
  var missing = questions.filter(function (q) { return answers[q.id] !== 'yes' && answers[q.id] !== 'no'; })
    .map(function (q) { return q.id; });
  if (missing.length > 0) return {status: 'missing', ids: missing};
  var injured = rtsHopDistance(hopInjuredText);
  var other = rtsHopDistance(hopOtherText);
  if (Number.isNaN(injured) || Number.isNaN(other) || (injured === null) !== (other === null)) return {status: 'badHop'};
  var hopPercent = injured === null ? null : rtsHopPercent(injured, other);
  var failed = questions.filter(function (q) { return answers[q.id] === 'no'; }).map(function (q) { return q.id; });
  if (hopPercent !== null && hopPercent < RTS_HOP_MIN_PERCENT) failed.push('hopDistance');
  if (failed.length > 0) return {status: 'notYet', failed: failed, hopPercent: hopPercent};
  if (hopPercent === null) return {status: 'stepByStep'};
  return {status: 'ready', hopPercent: hopPercent};
}
