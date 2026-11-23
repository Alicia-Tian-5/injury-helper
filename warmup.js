// Warm-up follow-along: a short routine for each sport, one move at a time
// with a countdown. The timer itself is a plain state object that moves on
// one second per tick, so it can be tested without waiting. Sport names come
// from RISK_SPORTS in risk-check.js, so the two lists stay the same.

var WARMUP_MOVES = {
  jogInPlace: {
    name: riskText('Easy jog in place', 'Trote suave en el sitio', 'Footing léger sur place', 'Лёгкий бег на месте', 'هرولة خفيفة في المكان', '原地慢跑'),
    how: riskText('Jog gently on the spot, landing softly on the balls of your feet, until you feel warm.', 'Trota suave en el sitio, apoyando con suavidad la parte delantera del pie, hasta entrar en calor.', 'Trottine doucement sur place en te posant en douceur sur l’avant du pied, jusqu’à te sentir chaud.', 'Мягко беги на месте, приземляясь на переднюю часть стопы, пока не согреешься.', 'هرول بهدوء في مكانك وانزل بخفة على مقدمة القدم حتى تشعر بالدفء.', '在原地轻轻地跑，前脚掌轻轻落地，跑到身体发热。')
  },
  jumpingJacks: {
    name: riskText('Jumping jacks', 'Saltos de tijera', 'Jumping jacks', 'Прыжки «звёздочкой»', 'القفز مع فتح الذراعين والساقين', '开合跳'),
    how: riskText('Jump your feet apart while raising your arms overhead, then jump back. Keep a steady rhythm.', 'Salta abriendo las piernas y subiendo los brazos, luego vuelve a cerrar. Mantén un ritmo constante.', 'Saute en écartant les pieds et en levant les bras, puis reviens. Garde un rythme régulier.', 'Прыжком расставь ноги и подними руки над головой, затем вернись. Держи ровный темп.', 'اقفز مع فتح القدمين ورفع الذراعين فوق الرأس، ثم عد. حافظ على إيقاع ثابت.', '跳起时双脚分开、双手举过头顶，再跳回并拢，保持匀速。')
  },
  legSwings: {
    name: riskText('Leg swings', 'Balanceos de pierna', 'Balancements de jambe', 'Махи ногами', 'تأرجح الساق', '前后摆腿'),
    how: riskText('Hold a wall and swing one leg forward and back, a little higher each time. Switch legs halfway.', 'Apóyate en una pared y balancea una pierna adelante y atrás, cada vez un poco más alto. Cambia a mitad de tiempo.', 'Tiens-toi à un mur et balance une jambe d’avant en arrière, un peu plus haut à chaque fois. Change à mi-temps.', 'Держись за стену и маши одной ногой вперёд и назад, каждый раз чуть выше. На середине смени ногу.', 'استند إلى جدار وأرجح ساقًا إلى الأمام والخلف، أعلى قليلًا في كل مرة. بدّل الساق في منتصف الوقت.', '扶着墙，一条腿前后摆动，一次比一次高一点。时间过半换另一条腿。')
  },
  walkingLunges: {
    name: riskText('Walking lunges', 'Zancadas caminando', 'Fentes marchées', 'Выпады в ходьбе', 'الطعنات أثناء المشي', '弓步走'),
    how: riskText('Step forward into a lunge, front knee over your foot and not caving in, then step through with the other leg.', 'Da un paso largo y baja en zancada, con la rodilla delantera sobre el pie sin irse hacia dentro, y avanza con la otra pierna.', 'Fais un grand pas en fente, genou avant au-dessus du pied sans rentrer vers l’intérieur, puis avance l’autre jambe.', 'Шагни вперёд в выпад: переднее колено над стопой и не заваливается внутрь, затем шагни другой ногой.', 'تقدم بخطوة إلى وضع الطعنة، الركبة الأمامية فوق القدم ولا تميل للداخل، ثم تقدم بالساق الأخرى.', '向前迈一大步下蹲，前膝对着脚尖、不要往里扣，再换另一条腿往前走。')
  },
  highKnees: {
    name: riskText('High knees', 'Rodillas arriba', 'Montées de genoux', 'Высокое поднимание коленей', 'رفع الركبتين', '高抬腿'),
    how: riskText('Run on the spot bringing your knees up to hip height, pumping your arms.', 'Corre en el sitio subiendo las rodillas a la altura de la cadera y moviendo los brazos.', 'Cours sur place en montant les genoux à hauteur de hanche, en t’aidant des bras.', 'Беги на месте, поднимая колени до уровня бёдер и работая руками.', 'اركض في مكانك مع رفع الركبتين إلى مستوى الورك وتحريك الذراعين.', '原地跑，膝盖抬到和胯一样高，手臂跟着摆。')
  },
  buttKicks: {
    name: riskText('Butt kicks', 'Talones al glúteo', 'Talons-fesses', 'Захлёст голени', 'ركل الكعبين للخلف', '后踢腿'),
    how: riskText('Jog on the spot kicking your heels up towards your bottom.', 'Trota en el sitio llevando los talones hacia los glúteos.', 'Trottine sur place en ramenant les talons vers les fesses.', 'Беги на месте, захлёстывая пятки к ягодицам.', 'هرول في مكانك مع رفع الكعبين نحو المؤخرة.', '原地小跑，脚后跟往屁股方向踢。')
  },
  armCircles: {
    name: riskText('Arm circles', 'Círculos con los brazos', 'Moulinets de bras', 'Круги руками', 'تدوير الذراعين', '手臂绕圈'),
    how: riskText('Arms out to the sides, make circles from small to big. Change direction halfway.', 'Con los brazos a los lados, haz círculos de pequeños a grandes. Cambia de sentido a mitad de tiempo.', 'Bras tendus sur les côtés, fais des cercles de petits à grands. Change de sens à mi-temps.', 'Руки в стороны, делай круги от маленьких к большим. На середине смени направление.', 'افرد ذراعيك جانبًا وارسم دوائر من صغيرة إلى كبيرة. غيّر الاتجاه في منتصف الوقت.', '双臂侧平举，从小圈画到大圈。时间过半换方向。')
  },
  sideShuffle: {
    name: riskText('Side shuffles', 'Desplazamientos laterales', 'Pas chassés latéraux', 'Приставные шаги в сторону', 'خطوات جانبية', '侧滑步'),
    how: riskText('Knees bent, shuffle a few steps to one side and back without crossing your feet.', 'Con las rodillas flexionadas, desplázate unos pasos a un lado y vuelve sin cruzar los pies.', 'Genoux fléchis, fais quelques pas chassés d’un côté puis reviens, sans croiser les pieds.', 'Колени согнуты, сделай несколько приставных шагов в сторону и обратно, не скрещивая ноги.', 'مع ثني الركبتين، تحرك بخطوات جانبية إلى جهة ثم عد دون أن تتقاطع قدماك.', '屈膝，像防守一样向一侧滑几步再滑回来，两脚不要交叉。')
  },
  softJumps: {
    name: riskText('Jump and land softly', 'Salta y aterriza suave', 'Sauter et atterrir en douceur', 'Прыжки с мягким приземлением', 'القفز والهبوط بلطف', '轻跳轻落'),
    how: riskText('Small jumps straight up. Land quietly with bent knees pointing over your toes, not inwards.', 'Saltos pequeños hacia arriba. Aterriza en silencio con las rodillas flexionadas apuntando a los pies, no hacia dentro.', 'Petits sauts verticaux. Atterris sans bruit, genoux fléchis dans l’axe des pieds, pas vers l’intérieur.', 'Небольшие прыжки вверх. Приземляйся тихо на согнутые колени, направленные по линии стоп, а не внутрь.', 'قفزات صغيرة إلى الأعلى. اهبط بهدوء والركبتان مثنيتان باتجاه أصابع القدم لا إلى الداخل.', '原地小跳。落地要轻，膝盖弯曲、对着脚尖，不要往里扣。')
  },
  strides: {
    name: riskText('Build-up runs', 'Carreras progresivas', 'Accélérations progressives', 'Ускорения', 'جري متدرج السرعة', '加速跑'),
    how: riskText('If you have room, run 20–30 metres starting easy and getting faster, then walk back. Otherwise run fast on the spot.', 'Si tienes espacio, corre 20–30 metros empezando suave y acelerando, y vuelve caminando. Si no, corre rápido en el sitio.', 'Si tu as la place, cours 20 à 30 mètres en partant doucement puis en accélérant, et reviens en marchant. Sinon, cours vite sur place.', 'Если есть место, пробеги 20–30 метров, начиная медленно и ускоряясь, и вернись шагом. Если нет, быстро беги на месте.', 'إن كان لديك مكان، اجرِ 20–30 مترًا تبدأ ببطء ثم تسرع، وعد مشيًا. وإلا فاجرِ بسرعة في مكانك.', '有场地就跑 20–30 米，由慢到快，再走回来；没有场地就原地快跑。')
  },
  splitStep: {
    name: riskText('Split steps', 'Pasos de preparación (split step)', 'Pas d’allègement (split step)', 'Сплит-степ', 'خطوة الاستعداد', '分腿垫步'),
    how: riskText('Small hop landing with feet apart on the balls of your feet, then move a step in any direction, as before a shot.', 'Pequeño salto cayendo con los pies separados sobre la parte delantera, y luego un paso en cualquier dirección, como antes de un golpe.', 'Petit saut en retombant pieds écartés sur l’avant du pied, puis un pas dans n’importe quelle direction, comme avant une frappe.', 'Небольшой подскок с приземлением на носки, ноги врозь, затем шаг в любую сторону, как перед ударом.', 'قفزة صغيرة تهبط فيها والقدمان متباعدتان على مقدمتيهما، ثم خطوة في أي اتجاه كما قبل الضربة.', '小跳一下，双脚分开、前脚掌落地，然后向任意方向迈一步，就像准备接球。')
  },
  shadowSwings: {
    name: riskText('Practice swings', 'Golpes en el aire', 'Frappes à vide', 'Имитация ударов', 'ضربات تجريبية في الهواء', '空拍挥拍'),
    how: riskText('Swing your racket, or just your arm, without a ball: slow at first, then closer to full speed.', 'Haz golpes con la raqueta, o solo con el brazo, sin pelota: primero despacio, luego casi a velocidad real.', 'Fais des frappes avec ta raquette, ou juste le bras, sans balle : lentement d’abord, puis presque à pleine vitesse.', 'Делай удары ракеткой или просто рукой без мяча: сначала медленно, потом почти в полную силу.', 'لوّح بالمضرب، أو بذراعك فقط، دون كرة: ببطء أولًا ثم بسرعة قريبة من الحقيقية.', '不用球，拿着拍子（或者空手）挥拍，先慢后快，接近正常速度。')
  },
  squats: {
    name: riskText('Bodyweight squats', 'Sentadillas sin peso', 'Squats au poids du corps', 'Приседания без веса', 'القرفصاء بوزن الجسم', '徒手深蹲'),
    how: riskText('Feet shoulder-width apart, sit back and down as far as is comfortable, knees over toes, then stand up.', 'Pies a la anchura de los hombros, baja llevando la cadera atrás hasta donde estés cómodo, rodillas sobre los pies, y sube.', 'Pieds écartés de la largeur des épaules, descends en reculant les hanches aussi bas que confortable, genoux dans l’axe des pieds, puis remonte.', 'Ноги на ширине плеч, опускайся, отводя таз назад, насколько удобно, колени по линии стоп, затем встань.', 'القدمان بعرض الكتفين، انزل بإرجاع الورك للخلف قدر ما يريحك، والركبتان فوق أصابع القدم، ثم قف.', '双脚与肩同宽，屁股往后坐、往下蹲到舒服的深度，膝盖对着脚尖，再站起来。')
  },
  gluteBridges: {
    name: riskText('Glute bridges', 'Puentes de glúteo', 'Ponts fessiers', 'Ягодичный мостик', 'جسر الأرداف', '臀桥'),
    how: riskText('Lie on your back with knees bent, squeeze your bottom and lift your hips, hold one second, lower slowly.', 'Túmbate boca arriba con las rodillas flexionadas, aprieta los glúteos y sube la cadera, aguanta un segundo y baja despacio.', 'Allongé sur le dos, genoux fléchis, serre les fessiers et monte le bassin, tiens une seconde, redescends lentement.', 'Лёжа на спине с согнутыми коленями, напряги ягодицы и подними таз, задержись на секунду, медленно опусти.', 'استلقِ على ظهرك مع ثني الركبتين، شد الأرداف وارفع الورك، اثبت ثانية، ثم انزل ببطء.', '躺下屈膝，夹紧臀部把胯往上顶，停一秒，再慢慢放下。')
  },
  pushUps: {
    name: riskText('Easy push-ups', 'Flexiones suaves', 'Pompes faciles', 'Лёгкие отжимания', 'تمارين ضغط سهلة', '轻松俯卧撑'),
    how: riskText('Push-ups against a wall, a bench or on your knees: slow and controlled, not to exhaustion.', 'Flexiones contra una pared, un banco o de rodillas: lentas y controladas, sin llegar al agotamiento.', 'Pompes contre un mur, un banc ou sur les genoux : lentes et contrôlées, sans aller jusqu’à l’épuisement.', 'Отжимания от стены, скамьи или с колен: медленно и подконтрольно, не до отказа.', 'تمارين ضغط على الجدار أو مقعد أو على الركبتين: ببطء وتحكم، دون الوصول إلى الإنهاك.', '扶墙、扶凳子或跪姿做俯卧撑，慢慢做、控制好，不要做到力竭。')
  }
};

// Each routine is a list of [move id, seconds]: easy movement first, then
// moving stretches, then the movements of the sport itself.
var WARMUP_ROUTINES = {
  basketball: [['jogInPlace', 120], ['legSwings', 60], ['walkingLunges', 60], ['highKnees', 45], ['sideShuffle', 60], ['softJumps', 45]],
  soccer: [['jogInPlace', 120], ['legSwings', 60], ['walkingLunges', 60], ['buttKicks', 45], ['sideShuffle', 45], ['strides', 60]],
  running: [['jogInPlace', 120], ['legSwings', 60], ['walkingLunges', 60], ['highKnees', 45], ['buttKicks', 45], ['strides', 60]],
  racket: [['jumpingJacks', 90], ['armCircles', 60], ['walkingLunges', 60], ['sideShuffle', 45], ['splitStep', 45], ['shadowSwings', 60]],
  gym: [['jumpingJacks', 90], ['armCircles', 45], ['squats', 60], ['gluteBridges', 60], ['walkingLunges', 60], ['pushUps', 45]],
  other: [['jogInPlace', 120], ['jumpingJacks', 60], ['legSwings', 60], ['walkingLunges', 60], ['armCircles', 45], ['highKnees', 45]]
};

function warmupRoutine(sportId) {
  return (WARMUP_ROUTINES[sportId] || []).map(function (step) { return {move: step[0], seconds: step[1]}; });
}

function warmupTotalMinutes(sportId) {
  var seconds = warmupRoutine(sportId).reduce(function (sum, step) { return sum + step.seconds; }, 0);
  return Math.round(seconds / 60);
}

// The timer: which move, how many seconds are left in it, paused or done.
function warmupStart(sportId) {
  var steps = warmupRoutine(sportId);
  return {sport: sportId, index: 0, left: steps[0].seconds, paused: false, done: false};
}

// Goes to the next move, or finishes after the last one.
function warmupSkip(timer) {
  var steps = warmupRoutine(timer.sport);
  var next = timer.index + 1;
  if (next >= steps.length) return {sport: timer.sport, index: timer.index, left: 0, paused: false, done: true};
  return {sport: timer.sport, index: next, left: steps[next].seconds, paused: timer.paused, done: false};
}

// One second passes. A paused or finished timer stays as it is.
function warmupTick(timer) {
  if (timer.paused || timer.done) return timer;
  if (timer.left > 1) return {sport: timer.sport, index: timer.index, left: timer.left - 1, paused: false, done: false};
  return warmupSkip(timer);
}

function warmupTogglePause(timer) {
  if (timer.done) return timer;
  return {sport: timer.sport, index: timer.index, left: timer.left, paused: !timer.paused, done: false};
}

// 90 -> "1:30"
function warmupClock(seconds) {
  var rest = seconds % 60;
  return Math.floor(seconds / 60) + ':' + (rest < 10 ? '0' : '') + rest;
}

// The days a whole warm-up was finished, kept on this device for check-ins.
var WARMUP_DAYS_KEY = 'injury-helper-warmup-days';

function loadWarmupDays() {
  try {
    var saved = JSON.parse(localStorage.getItem(WARMUP_DAYS_KEY));
    return Array.isArray(saved) ? saved.filter(function (date) { return DATE_PATTERN.test(date); }) : [];
  } catch (e) {
    return [];
  }
}

// Returns false when the browser blocks storage.
function saveWarmupDays(days) {
  try {
    localStorage.setItem(WARMUP_DAYS_KEY, JSON.stringify(days));
    return true;
  } catch (e) {
    return false;
  }
}

function addWarmupDay(date) {
  var days = loadWarmupDays();
  if (days.indexOf(date) < 0) days.push(date);
  return saveWarmupDays(days);
}
