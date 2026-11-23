// The first-visit tour: pick a language, say whether you are hurt right now,
// then one step for each part of the site with its tab outlined. Shown once
// per device on the home page; "How to use this site" on the home page shows
// it again. Uses riskText from risk-check.js.

var TOUR_SEEN_KEY = 'injury-helper-tour-seen';

// `tabs` are the views whose tabs are outlined; `go` is the view the "Go
// there now" button opens. The first two steps have buttons instead of text.
var TOUR_STEPS = [
  {id: 'language', tabs: [],
    title: riskText('Welcome! First, choose your language', '¡Hola! Primero, elige tu idioma', 'Bienvenue ! D’abord, choisis ta langue', 'Привет! Сначала выбери язык', 'أهلًا بك! اختر لغتك أولًا', '欢迎！先选你的语言'),
    text: riskText('You can change it any time with the Language button at the top.', 'Puedes cambiarlo cuando quieras con el botón Language de arriba.', 'Tu peux la changer à tout moment avec le bouton Language en haut.', 'Его можно сменить в любой момент кнопкой Language вверху.', 'يمكنك تغييرها في أي وقت من زر Language في الأعلى.', '之后随时可以点最上面的 Language 按钮再换。')},
  {id: 'choose', tabs: [],
    title: riskText('Right now, you are…', 'Ahora mismo…', 'En ce moment…', 'Сейчас ты…', 'الآن أنت…', '你现在是……'),
    text: riskText('If you are hurt, we will go straight to the check. Otherwise, a quick look around takes under a minute.', 'Si te has lesionado, vamos directo a la autoevaluación. Si no, un vistazo rápido lleva menos de un minuto.', 'Si tu es blessé, on va directement au test. Sinon, un petit tour prend moins d’une minute.', 'Если ты травмирован, сразу перейдём к проверке. Если нет, короткий обзор займёт меньше минуты.', 'إذا كنت مصابًا فسننتقل مباشرة إلى الفحص. وإلا، فجولة سريعة تستغرق أقل من دقيقة.', '如果你受伤了，我们直接去自测；不然，花不到一分钟带你转一圈。')},
  {id: 'assess', tabs: ['assess'], go: 'assess',
    title: riskText('Hurt? Start with a quick check', '¿Lesionado? Empieza con una autoevaluación rápida', 'Blessé ? Commence par un test rapide', 'Травма? Начни с быстрой проверки', 'مصاب؟ ابدأ بفحص سريع', '受伤了？先测一下'),
    text: riskText('Answer a few questions to see how urgent it is, and three things: what to do right now, where to go, and how to recover.', 'Responde unas preguntas para saber qué tan urgente es, y tres cosas: qué hacer ahora, adónde ir y cómo recuperarte.', 'Réponds à quelques questions pour savoir si c’est urgent, et trois choses : quoi faire maintenant, où aller et comment récupérer.', 'Ответь на несколько вопросов и узнай, насколько это срочно, а ещё три вещи: что делать сейчас, куда обратиться и как восстанавливаться.', 'أجب عن بضعة أسئلة لتعرف مدى الإلحاح، وثلاثة أمور: ماذا تفعل الآن، وإلى أين تذهب، وكيف تتعافى.', '回答几个问题，告诉你有多紧急，以及三件事：现在该做什么、该去哪里看、之后怎么康复。')},
  {id: 'hospitals', tabs: ['hospitals'], go: 'hospitals',
    title: riskText('Where to go, and what to say', 'Adónde ir y qué decir', 'Où aller, et quoi dire', 'Куда идти и что сказать', 'إلى أين تذهب، وماذا تقول', '去哪看、怎么说'),
    text: riskText('Find sports medicine and orthopaedic clinics by city. “Getting ready to see a doctor” helps you put the pain into words and makes a note to show the doctor.', 'Busca clínicas de medicina deportiva y traumatología por ciudad. «Prepararte para ir al médico» te ayuda a describir el dolor y prepara una nota para enseñar al médico.', 'Trouve des services de médecine du sport et d’orthopédie par ville. « Se préparer à voir un médecin » t’aide à décrire la douleur et prépare une note à montrer au médecin.', 'Ищи спортивную медицину и травматологию по городу. «Подготовка к визиту к врачу» поможет описать боль словами и составит записку для врача.', 'ابحث عن عيادات الطب الرياضي والعظام حسب المدينة. «الاستعداد لزيارة الطبيب» يساعدك على وصف الألم ويكتب ملاحظة تعرضها على الطبيب.', '按城市找运动医学科和骨科。"看医生前准备"帮你把疼的感觉说清楚，生成一段可以直接给医生看的话。')},
  {id: 'recovery', tabs: ['log', 'comfort'],
    title: riskText('While you recover: keep track, and you are not alone', 'Mientras te recuperas: lleva un registro, y no estás solo', 'Pendant la récupération : garde une trace, et tu n’es pas seul', 'Пока восстанавливаешься: веди записи, и ты не один', 'أثناء التعافي: دوّن تقدمك، ولست وحدك', '康复路上，记下来，也有人陪'),
    text: riskText('The recovery log plans your rehab, records pain and photos, makes a report for your doctor and checks when you can play again (sign in so nothing is lost). On hard days, chat with the AI or find people with the same injury in group chat.', 'El registro de recuperación planifica tu rehabilitación, guarda el dolor y las fotos, prepara un informe para tu médico y comprueba cuándo puedes volver a jugar (inicia sesión para no perder nada). En los días difíciles, habla con la IA o busca a gente con la misma lesión en el chat de grupo.', 'Le carnet de récupération planifie ta rééducation, note la douleur et les photos, prépare un rapport pour ton médecin et vérifie quand tu peux rejouer (connecte-toi pour ne rien perdre). Les jours difficiles, parle avec l’IA ou retrouve des gens avec la même blessure dans le chat de groupe.', 'Дневник восстановления составит план реабилитации, сохранит боль и фото, сделает отчёт для врача и проверит, когда можно вернуться к игре (войди, чтобы ничего не потерять). В тяжёлые дни поговори с ИИ или найди людей с такой же травмой в групповом чате.', 'سجل التعافي يخطط لتأهيلك، ويسجل الألم والصور، ويعد تقريرًا لطبيبك، ويتحقق متى يمكنك العودة للعب (سجّل الدخول حتى لا تفقد شيئًا). في الأيام الصعبة، تحدّث مع الذكاء الاصطناعي أو ابحث عن أشخاص لديهم الإصابة نفسها في الدردشة الجماعية.', '康复记录可以排康复计划、记疼痛和照片、生成给医生的报告、测能不能回场（需要登录，记录不会丢）。心情不好时，可以和 AI 聊聊，或者去群聊找同样受伤的人。')},
  {id: 'learn', tabs: ['learn'], go: 'learn',
    title: riskText('The best recovery is not getting hurt', 'La mejor recuperación es no lesionarse', 'La meilleure récupération, c’est de ne pas se blesser', 'Лучшее восстановление — не получить травму', 'أفضل تعافٍ هو ألا تُصاب', '最好的康复是不受伤'),
    text: riskText('See where you are most likely to get hurt, warm up along with a timer, log your training, check your gear and shoes, and see if today’s weather is good for sport.', 'Descubre dónde es más probable que te lesiones, calienta con un temporizador, registra tu entrenamiento, revisa tu equipo y calzado, y mira si el tiempo de hoy es bueno para hacer deporte.', 'Vois où tu risques le plus de te blesser, échauffe-toi avec un minuteur, note ton entraînement, vérifie ton équipement et tes chaussures, et regarde si la météo du jour convient au sport.', 'Узнай, где ты рискуешь травмироваться больше всего, разминайся под таймер, веди дневник тренировок, проверь экипировку и обувь и посмотри, подходит ли сегодняшняя погода для спорта.', 'اعرف أين يُرجّح أن تُصاب، وقم بالإحماء مع مؤقت، وسجّل تدريبك، وافحص معداتك وحذاءك، وانظر هل طقس اليوم مناسب للرياضة.', '测测你容易伤在哪、跟着热身、记训练量、看装备和鞋、看今天的天气适不适合运动。')}
];

// The tour opens by itself only the first time, and only on the home page:
// someone opening a link to another page already knows what they came for.
function shouldShowTour(seen, view) {
  return !seen && view === 'home';
}

function tourWasSeen() {
  try { return localStorage.getItem(TOUR_SEEN_KEY) === 'yes'; } catch (e) { return false; }
}

function markTourSeen() {
  try { localStorage.setItem(TOUR_SEEN_KEY, 'yes'); } catch (e) { /* storage blocked: shown again next visit */ }
}
