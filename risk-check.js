// Injury risk self-check: a few questions about sport, past injuries and
// habits, and the body areas most likely to get hurt with what to do about
// each. Past injuries count most, since an injured spot is the likeliest to
// be hurt again. Uses YES_NO from triage.js.

// Texts are written in the order en, es, fr, ru, ar, zh.
function riskText(en, es, fr, ru, ar, zh) {
  return {en: en, es: es, fr: fr, ru: ru, ar: ar, zh: zh};
}

var RISK_SPORTS = [
  {id: 'basketball', name: riskText('Basketball or volleyball', 'Baloncesto o voleibol', 'Basket ou volley', 'Баскетбол или волейбол', 'كرة السلة أو الكرة الطائرة', '篮球、排球'), areas: {ankle: 2, knee: 2}},
  {id: 'soccer', name: riskText('Soccer', 'Fútbol', 'Football', 'Футбол', 'كرة القدم', '足球'), areas: {ankle: 2, knee: 2, hamstring: 2}},
  {id: 'running', name: riskText('Running', 'Correr', 'Course à pied', 'Бег', 'الجري', '跑步'), areas: {knee: 2, shin: 2}},
  {id: 'racket', name: riskText('Badminton, tennis or another racket sport', 'Bádminton, tenis u otro deporte de raqueta', 'Badminton, tennis ou autre sport de raquette', 'Бадминтон, теннис или другой вид с ракеткой', 'الريشة الطائرة أو التنس أو رياضة مضرب أخرى', '羽毛球、网球等球拍运动'), areas: {shoulder: 2, elbow: 2, ankle: 1}},
  {id: 'gym', name: riskText('Gym or weightlifting', 'Gimnasio o pesas', 'Musculation ou haltérophilie', 'Тренажёрный зал или тяжёлая атлетика', 'الصالة الرياضية أو رفع الأثقال', '健身、举重'), areas: {lowerBack: 2, shoulder: 2}},
  {id: 'other', name: riskText('Something else', 'Otro', 'Autre chose', 'Другое', 'شيء آخر', '其他'), areas: {}}
];

var RISK_PAST_INJURIES = [
  {id: 'ankleSprain', name: riskText('Sprained ankle', 'Esguince de tobillo', 'Entorse de la cheville', 'Растяжение голеностопа', 'التواء الكاحل', '崴过脚'), area: 'ankle'},
  {id: 'kneecap', name: riskText('Kneecap dislocation', 'Luxación de rótula', 'Luxation de la rotule', 'Вывих надколенника', 'خلع الرضفة', '髌骨脱位'), area: 'knee'},
  {id: 'knee', name: riskText('Other knee injury (ligament, meniscus)', 'Otra lesión de rodilla (ligamento, menisco)', 'Autre blessure au genou (ligament, ménisque)', 'Другая травма колена (связки, мениск)', 'إصابة أخرى في الركبة (رباط، غضروف هلالي)', '其他膝盖伤（韧带、半月板）'), area: 'knee'},
  {id: 'strain', name: riskText('Pulled hamstring (back of the thigh)', 'Distensión del isquiotibial (parte trasera del muslo)', 'Élongation des ischio-jambiers (arrière de la cuisse)', 'Растяжение задней поверхности бедра', 'شدّ في العضلة الخلفية للفخذ', '大腿后侧拉伤'), area: 'hamstring'},
  {id: 'shoulder', name: riskText('Shoulder injury', 'Lesión de hombro', 'Blessure à l’épaule', 'Травма плеча', 'إصابة في الكتف', '肩膀受伤'), area: 'shoulder'},
  {id: 'back', name: riskText('Lower back injury', 'Lesión lumbar', 'Blessure au bas du dos', 'Травма поясницы', 'إصابة أسفل الظهر', '腰伤'), area: 'lowerBack'}
];
var RISK_NO_PAST_INJURY = 'none';
var RISK_NO_PAST_INJURY_NAME = riskText('None of these', 'Ninguna', 'Aucune', 'Ничего из этого', 'لا شيء من هذا', '都没有');

// A past injury counts more than the sport itself, even for someone who
// trains often.
var RISK_PAST_INJURY_POINTS = 4;
// Training four or more times a week adds this much to the sport's areas.
var RISK_OFTEN_POINTS = 1;
var RISK_AREAS_SHOWN = 3;

var RISK_QUESTIONS = [
  {id: 'sport', text: riskText('What sport do you mostly play?', '¿Qué deporte practicas más?', 'Quel sport pratiques-tu le plus ?', 'Каким спортом ты занимаешься чаще всего?', 'ما الرياضة التي تمارسها أكثر؟', '你主要练什么运动？'),
   options: RISK_SPORTS.map(function (sport) { return {value: sport.id, text: sport.name}; })},
  {id: 'times', text: riskText('How many times a week do you train or play?', '¿Cuántas veces por semana entrenas o juegas?', 'Combien de fois par semaine t’entraînes-tu ou joues-tu ?', 'Сколько раз в неделю ты тренируешься или играешь?', 'كم مرة في الأسبوع تتدرب أو تلعب؟', '你每周练几次？'),
   options: [
     {value: 'few', text: riskText('Once or less', 'Una vez o menos', 'Une fois ou moins', 'Один раз или реже', 'مرة واحدة أو أقل', '1 次或更少')},
     {value: 'some', text: riskText('2–3 times', '2–3 veces', '2 à 3 fois', '2–3 раза', '2–3 مرات', '2–3 次')},
     {value: 'often', text: riskText('4 times or more', '4 veces o más', '4 fois ou plus', '4 раза и чаще', '4 مرات أو أكثر', '4 次或更多')}
   ]},
  {id: 'past', multiple: true, text: riskText('Which of these injuries have you had before? Choose all that apply.', '¿Cuáles de estas lesiones has tenido antes? Elige todas las que correspondan.', 'Lesquelles de ces blessures as-tu déjà eues ? Choisis toutes celles qui s’appliquent.', 'Какие из этих травм у тебя уже были? Выбери все подходящие.', 'أيّ هذه الإصابات أُصبت بها من قبل؟ اختر كل ما ينطبق.', '你以前受过哪些伤？可以多选。'),
   options: RISK_PAST_INJURIES.map(function (injury) { return {value: injury.id, text: injury.name}; })
     .concat({value: RISK_NO_PAST_INJURY, text: RISK_NO_PAST_INJURY_NAME})},
  {id: 'warmup', text: riskText('Do you warm up before you play?', '¿Calientas antes de jugar?', 'T’échauffes-tu avant de jouer ?', 'Ты разминаешься перед игрой?', 'هل تقوم بالإحماء قبل أن تلعب؟', '运动前你会热身吗？'),
   options: [
     {value: 'always', text: riskText('Every time', 'Siempre', 'À chaque fois', 'Каждый раз', 'في كل مرة', '每次都会')},
     {value: 'sometimes', text: riskText('Sometimes', 'A veces', 'Parfois', 'Иногда', 'أحيانًا', '有时候')},
     {value: 'rarely', text: riskText('Rarely', 'Casi nunca', 'Rarement', 'Редко', 'نادرًا', '很少')}
   ]},
  {id: 'sleep', text: riskText('Do you usually sleep at least 7 hours?', '¿Sueles dormir al menos 7 horas?', 'Dors-tu en général au moins 7 heures ?', 'Обычно ты спишь не меньше 7 часов?', 'هل تنام عادةً 7 ساعات على الأقل؟', '你平时一般能睡够 7 小时吗？'), options: YES_NO},
  {id: 'jump', text: riskText('In the last month, did you suddenly train much more than before (a new team, getting ready for a match)?', 'En el último mes, ¿de repente entrenaste mucho más que antes (un equipo nuevo, preparar un partido)?', 'Le mois dernier, t’es-tu soudain entraîné beaucoup plus qu’avant (nouvelle équipe, préparation d’un match) ?', 'За последний месяц ты вдруг стал тренироваться намного больше, чем раньше (новая команда, подготовка к матчу)?', 'في الشهر الماضي، هل زدت تدريبك فجأة كثيرًا عن قبل (فريق جديد، أو استعداد لمباراة)؟', '最近一个月，训练量突然比以前多了很多吗？（比如进了新队、备战比赛）'), options: YES_NO},
  {id: 'rest', text: riskText('Do you take at least one full rest day a week?', '¿Descansas por completo al menos un día a la semana?', 'Prends-tu au moins un jour de repos complet par semaine ?', 'У тебя есть хотя бы один полный день отдыха в неделю?', 'هل تأخذ يوم راحة كاملًا واحدًا على الأقل في الأسبوع؟', '你每周至少有一整天休息吗？'), options: YES_NO}
];

var RISK_AREAS = {
  ankle: {
    name: riskText('Ankle', 'Tobillo', 'Cheville', 'Голеностоп', 'الكاحل', '脚踝'),
    tips: [
      riskText('Balance on one leg for 30 seconds, 3 times a day on each side. Make it harder with your eyes closed or standing on a pillow.', 'Mantén el equilibrio sobre una pierna 30 segundos, 3 veces al día en cada lado. Hazlo más difícil con los ojos cerrados o sobre un cojín.', 'Tiens en équilibre sur une jambe 30 secondes, 3 fois par jour de chaque côté. Rends-le plus dur les yeux fermés ou sur un coussin.', 'Стой на одной ноге по 30 секунд, 3 раза в день на каждую сторону. Усложняй: с закрытыми глазами или на подушке.', 'قف متوازنًا على ساق واحدة 30 ثانية، 3 مرات يوميًا لكل جانب. اجعلها أصعب بإغماض عينيك أو بالوقوف على وسادة.', '单腿站 30 秒，每边每天 3 次。想加难度就闭上眼睛，或者站在枕头上。'),
      riskText('Calf raises: 3 sets of 15.', 'Elevaciones de talones: 3 series de 15.', 'Montées sur la pointe des pieds : 3 séries de 15.', 'Подъёмы на носки: 3 подхода по 15.', 'رفع الكعبين: 3 مجموعات من 15 مرة.', '提踵：3 组，每组 15 个。'),
      riskText('If you have sprained it before, wear an ankle brace or tape for games.', 'Si ya te lo has torcido antes, usa tobillera o vendaje en los partidos.', 'Si tu t’es déjà fait une entorse, mets une chevillère ou un strap pour les matchs.', 'Если уже было растяжение, на игры надевай бандаж или тейп.', 'إذا سبق أن التوى كاحلك، فارتدِ دعامة أو شريطًا لاصقًا في المباريات.', '以前崴过脚的话，比赛时戴护踝或者贴扎。')
    ]
  },
  knee: {
    name: riskText('Knee', 'Rodilla', 'Genou', 'Колено', 'الركبة', '膝盖'),
    tips: [
      riskText('Strengthen the front of the thigh and the hips: wall sits, side-lying leg raises and glute bridges, 3 sets each.', 'Fortalece la parte delantera del muslo y la cadera: sentadilla en la pared, elevaciones de pierna de lado y puente de glúteos, 3 series de cada uno.', 'Renforce l’avant de la cuisse et les hanches : chaise contre le mur, élévations de jambe sur le côté et pont fessier, 3 séries de chaque.', 'Укрепляй переднюю поверхность бедра и ягодицы: «стульчик» у стены, подъёмы ноги лёжа на боку, ягодичный мостик, по 3 подхода.', 'قوِّ مقدمة الفخذ والوركين: الجلوس على الحائط، ورفع الساق جانبيًا، وجسر الأرداف، 3 مجموعات لكلٍّ منها.', '练大腿前侧和臀部：靠墙静蹲、侧躺抬腿、臀桥，各做 3 组。'),
      riskText('When you land from a jump, bend your knees and keep them over your toes, not falling inward.', 'Al caer de un salto, dobla las rodillas y mantenlas sobre la punta de los pies, sin que se vayan hacia dentro.', 'Quand tu retombes d’un saut, plie les genoux et garde-les au-dessus des orteils, sans qu’ils rentrent vers l’intérieur.', 'При приземлении после прыжка сгибай колени и держи их над носками, не давай им заваливаться внутрь.', 'عند الهبوط من قفزة، اثنِ ركبتيك وأبقهما فوق أصابع قدميك دون أن تميلا إلى الداخل.', '跳起落地时膝盖弯曲，膝盖对着脚尖方向，不要往里扣。')
    ],
    // Only for someone whose kneecap has slipped out before.
    kneecapTip: riskText('Your kneecap has slipped out before, so it can happen again. Wear a kneecap brace for sport, and strengthen the inner thigh muscle with straight-leg raises every day.', 'Tu rótula ya se salió una vez, así que puede volver a pasar. Usa una rodillera rotuliana para el deporte y fortalece el músculo interno del muslo con elevaciones de pierna recta cada día.', 'Ta rotule s’est déjà déboîtée, donc ça peut recommencer. Porte une genouillère rotulienne pour le sport et renforce l’intérieur de la cuisse avec des élévations jambe tendue chaque jour.', 'Надколенник у тебя уже вывихивался, значит, это может повториться. Надевай бандаж для надколенника на спорт и каждый день укрепляй внутреннюю мышцу бедра подъёмами прямой ноги.', 'خرجت رضفتك من مكانها من قبل، لذا قد يتكرر ذلك. ارتدِ دعامة للرضفة أثناء الرياضة، وقوِّ عضلة الفخذ الداخلية برفع الساق مستقيمة كل يوم.', '你以前髌骨脱位过，有可能再脱。运动时戴髌骨护具，每天做直腿抬高，练大腿内侧的肌肉。')
  },
  hamstring: {
    name: riskText('Back of the thigh', 'Parte trasera del muslo', 'Arrière de la cuisse', 'Задняя поверхность бедра', 'الجزء الخلفي من الفخذ', '大腿后侧'),
    tips: [
      riskText('Warm it up well: leg swings and a few sprints that get faster each time.', 'Caliéntala bien: balanceos de pierna y unos sprints cada vez más rápidos.', 'Échauffe-la bien : balancements de jambe et quelques sprints de plus en plus rapides.', 'Хорошо разогревай её: махи ногами и несколько ускорений, каждое быстрее предыдущего.', 'قم بإحمائها جيدًا: أرجحة الساقين وبضع ركضات سريعة تزداد سرعتها كل مرة.', '充分热身：前后摆腿，再做几次逐渐加速的冲刺。'),
      riskText('Strengthen it 2–3 times a week with glute bridges and Nordic curls (kneeling with your feet held, lower yourself forward slowly).', 'Fortalécela 2–3 veces por semana con puentes de glúteos y curl nórdico (de rodillas con los pies sujetos, baja hacia delante despacio).', 'Renforce-la 2 à 3 fois par semaine avec des ponts fessiers et des Nordic curls (à genoux, pieds tenus, descends lentement vers l’avant).', 'Укрепляй её 2–3 раза в неделю: ягодичный мостик и «нордические сгибания» (стоя на коленях с зафиксированными стопами, медленно наклоняйся вперёд).', 'قوِّها 2–3 مرات في الأسبوع بجسر الأرداف وتمرين «النوردك» (اجثُ على ركبتيك مع تثبيت قدميك، وانزل للأمام ببطء).', '每周 2–3 次练力量：臀桥、北欧挺（跪着让人压住脚踝，身体慢慢往前倒）。')
    ]
  },
  shin: {
    name: riskText('Lower leg and Achilles tendon', 'Pierna y tendón de Aquiles', 'Bas de la jambe et tendon d’Achille', 'Голень и ахиллово сухожилие', 'أسفل الساق ووتر أخيل', '小腿和跟腱'),
    tips: [
      riskText('Add distance slowly, about 10% a week at most.', 'Aumenta la distancia poco a poco, como mucho un 10% por semana.', 'Augmente la distance doucement, environ 10 % par semaine au maximum.', 'Увеличивай дистанцию постепенно, не больше чем на 10% в неделю.', 'زِد المسافة ببطء، بنحو 10% في الأسبوع على الأكثر.', '跑量慢慢加，每周最多加 10% 左右。'),
      riskText('Replace worn-out running shoes, and run on grass or a track some of the time.', 'Cambia las zapatillas gastadas y corre a veces sobre césped o pista.', 'Remplace les chaussures usées et cours de temps en temps sur l’herbe ou sur piste.', 'Меняй изношенные кроссовки и иногда бегай по траве или стадиону.', 'استبدل أحذية الجري البالية، واجرِ أحيانًا على العشب أو المضمار.', '跑鞋磨损了就换，有时候在草地或塑胶跑道上跑。'),
      riskText('Calf raises, 3 sets of 15, keep the calf and Achilles strong.', 'Elevaciones de talones, 3 series de 15, para mantener fuertes la pantorrilla y el Aquiles.', 'Montées sur la pointe des pieds, 3 séries de 15, pour garder le mollet et le tendon d’Achille solides.', 'Подъёмы на носки, 3 подхода по 15, укрепляют икры и ахиллово сухожилие.', 'رفع الكعبين، 3 مجموعات من 15، يحافظ على قوة السمانة ووتر أخيل.', '提踵 3 组，每组 15 个，让小腿和跟腱更有力。')
    ]
  },
  shoulder: {
    name: riskText('Shoulder', 'Hombro', 'Épaule', 'Плечо', 'الكتف', '肩膀'),
    tips: [
      riskText('Strengthen the muscles around the shoulder blade with a resistance band: rows and turning the arm outward.', 'Fortalece los músculos alrededor del omóplato con una banda elástica: remos y rotación del brazo hacia fuera.', 'Renforce les muscles autour de l’omoplate avec un élastique : tirages et rotations du bras vers l’extérieur.', 'Укрепляй мышцы вокруг лопатки с резиновой лентой: тяги и вращение руки наружу.', 'قوِّ العضلات حول لوح الكتف بشريط مطاطي: تمارين السحب وتدوير الذراع للخارج.', '用弹力带练肩胛周围的肌肉：划船、手臂外旋。'),
      riskText('Before hard throws, serves or lifts, warm up with arm circles and a few light swings.', 'Antes de lanzar, sacar o levantar fuerte, calienta con círculos de brazos y unos golpes suaves.', 'Avant de lancer, servir ou soulever fort, échauffe-toi avec des cercles de bras et quelques mouvements légers.', 'Перед сильными бросками, подачами или подъёмами разомнись: круги руками и несколько лёгких махов.', 'قبل الرمي أو الإرسال أو الرفع بقوة، قم بالإحماء بتدوير الذراعين وبضع حركات خفيفة.', '大力投、扣杀、发球或举重之前，先做手臂绕圈和几下轻轻的挥动。')
    ]
  },
  elbow: {
    name: riskText('Elbow', 'Codo', 'Coude', 'Локоть', 'المرفق', '手肘'),
    tips: [
      riskText('Strengthen the forearm with wrist curls using a light weight.', 'Fortalece el antebrazo con flexiones de muñeca con poco peso.', 'Renforce l’avant-bras avec des flexions du poignet avec un poids léger.', 'Укрепляй предплечье сгибаниями запястья с лёгким весом.', 'قوِّ الساعد بثني الرسغ مع وزن خفيف.', '用小哑铃做手腕屈伸，练前臂力量。'),
      riskText('Ask a coach to check your stroke. A grip that is too small or strings that are too tight add strain.', 'Pide a un entrenador que revise tu golpe. Un mango demasiado fino o un cordaje demasiado tenso cargan más el codo.', 'Demande à un entraîneur de vérifier ton geste. Un manche trop fin ou un cordage trop tendu ajoutent de la contrainte.', 'Попроси тренера проверить технику удара. Слишком тонкая ручка или слишком тугие струны добавляют нагрузку.', 'اطلب من مدرب أن يتحقق من ضربتك. المقبض الصغير جدًا أو الأوتار المشدودة جدًا يزيدان الضغط.', '请教练看看你的挥拍动作。拍柄太细、拍线太紧都会加重手肘负担。')
    ]
  },
  lowerBack: {
    name: riskText('Lower back', 'Zona lumbar', 'Bas du dos', 'Поясница', 'أسفل الظهر', '腰'),
    tips: [
      riskText('Learn each lift with a light weight first, and keep your back straight when you lift.', 'Aprende cada ejercicio con poco peso primero y mantén la espalda recta al levantar.', 'Apprends chaque mouvement avec un poids léger d’abord, et garde le dos droit en soulevant.', 'Сначала осваивай каждое упражнение с лёгким весом и держи спину прямой при подъёме.', 'تعلّم كل تمرين رفع بوزن خفيف أولًا، وأبقِ ظهرك مستقيمًا عند الرفع.', '每个动作先用轻重量学对，举的时候背要挺直。'),
      riskText('Strengthen your core with planks and side planks.', 'Fortalece el abdomen con planchas frontales y laterales.', 'Renforce ta sangle abdominale avec des gainages de face et de côté.', 'Укрепляй мышцы корпуса: планка и боковая планка.', 'قوِّ عضلات الجذع بتمرين البلانك والبلانك الجانبي.', '练核心：平板支撑、侧平板支撑。')
    ]
  }
};

// Habits worth changing, each with what to do.
var RISK_HABITS = {
  warmup: riskText('Warm up for about 10 minutes before every session. "Warm up with me" in Sports health takes you through it.', 'Calienta unos 10 minutos antes de cada sesión. «Calienta conmigo», en Salud deportiva, te guía paso a paso.', 'Échauffe-toi environ 10 minutes avant chaque séance. « Échauffe-toi avec moi », dans Santé sportive, te guide pas à pas.', 'Разминайся около 10 минут перед каждой тренировкой. «Разминка вместе со мной» в разделе о здоровье проведёт тебя по шагам.', 'قم بالإحماء نحو 10 دقائق قبل كل تمرين. «قم بالإحماء معي» في قسم الرياضة والصحة يرشدك خطوة بخطوة.', '每次运动前热身 10 分钟左右，"运动健康知识"里的"跟着热身"会一步步带你做。'),
  sleep: riskText('Aim for 7–9 hours of sleep. Tired muscles get hurt more easily.', 'Intenta dormir 7–9 horas. Los músculos cansados se lesionan más fácilmente.', 'Vise 7 à 9 heures de sommeil. Les muscles fatigués se blessent plus facilement.', 'Старайся спать 7–9 часов. Уставшие мышцы травмируются легче.', 'احرص على النوم 7–9 ساعات. العضلات المتعبة تُصاب بسهولة أكبر.', '尽量睡 7–9 小时，累的肌肉更容易受伤。'),
  jump: riskText('You trained much more than usual this month. Add about 10% a week, and take an easier week when you feel worn out.', 'Este mes entrenaste mucho más de lo habitual. Aumenta alrededor de un 10% por semana y haz una semana más suave cuando te sientas agotado.', 'Tu t’es beaucoup plus entraîné que d’habitude ce mois-ci. Augmente d’environ 10 % par semaine et fais une semaine plus légère quand tu te sens épuisé.', 'В этом месяце ты тренировался намного больше обычного. Прибавляй примерно по 10% в неделю и делай лёгкую неделю, когда чувствуешь усталость.', 'تدرّبت هذا الشهر أكثر بكثير من المعتاد. زِد بنحو 10% في الأسبوع، وخذ أسبوعًا أخف عندما تشعر بالإرهاق.', '这个月训练量加得太猛了。每周最多加 10% 左右，觉得很累的时候安排一周轻松点的训练。'),
  rest: riskText('Take at least one or two full rest days a week so your body can recover.', 'Descansa por completo al menos uno o dos días por semana para que el cuerpo se recupere.', 'Prends au moins un ou deux jours de repos complet par semaine pour que ton corps récupère.', 'Отдыхай полностью хотя бы один-два дня в неделю, чтобы тело восстанавливалось.', 'خذ يوم راحة كاملًا أو يومين على الأقل في الأسبوع ليتعافى جسمك.', '每周至少完全休息一到两天，让身体恢复。')
};

// The result for the answers ({questionId: value}; `past` is a list), as
// {status: 'missing', ids} or {status: 'done', areas, habits}. Each area is
// {id, sport: true|false, pastInjuries: [ids], tips}, highest risk first.
function riskCheckResult(answers) {
  var missing = RISK_QUESTIONS.filter(function (q) {
    var answer = answers[q.id];
    return q.multiple ? !(answer && answer.length > 0) : !answer;
  }).map(function (q) { return q.id; });
  if (missing.length > 0) return {status: 'missing', ids: missing};

  var sport = RISK_SPORTS.filter(function (s) { return s.id === answers.sport; })[0];
  var past = answers.past.filter(function (id) { return id !== RISK_NO_PAST_INJURY; });
  var scores = {};
  Object.keys(sport.areas).forEach(function (area) {
    scores[area] = sport.areas[area] + (answers.times === 'often' ? RISK_OFTEN_POINTS : 0);
  });
  RISK_PAST_INJURIES.forEach(function (injury) {
    if (past.indexOf(injury.id) >= 0) scores[injury.area] = (scores[injury.area] || 0) + RISK_PAST_INJURY_POINTS;
  });
  // Ties keep the order of RISK_AREAS, so the result never changes at random.
  var order = Object.keys(RISK_AREAS);
  var areas = Object.keys(scores).filter(function (area) { return scores[area] >= 2; })
    .sort(function (a, b) { return scores[b] - scores[a] || order.indexOf(a) - order.indexOf(b); })
    .slice(0, RISK_AREAS_SHOWN)
    .map(function (area) {
      var tips = RISK_AREAS[area].tips.slice();
      if (area === 'knee' && past.indexOf('kneecap') >= 0) tips.unshift(RISK_AREAS.knee.kneecapTip);
      return {
        id: area,
        sport: Boolean(sport.areas[area]),
        pastInjuries: RISK_PAST_INJURIES.filter(function (injury) { return injury.area === area && past.indexOf(injury.id) >= 0; })
          .map(function (injury) { return injury.id; }),
        tips: tips
      };
    });

  var habits = [];
  if (answers.warmup !== 'always') habits.push('warmup');
  if (answers.sleep === 'no') habits.push('sleep');
  if (answers.jump === 'yes') habits.push('jump');
  if (answers.rest === 'no') habits.push('rest');
  return {status: 'done', areas: areas, habits: habits};
}

// Choosing "none" clears the past injuries, and choosing an injury clears
// "none". Returns the new list.
function toggleRiskPastInjury(list, id) {
  if (list.indexOf(id) >= 0) return list.filter(function (item) { return item !== id; });
  if (id === RISK_NO_PAST_INJURY) return [id];
  return list.filter(function (item) { return item !== RISK_NO_PAST_INJURY; }).concat(id);
}
