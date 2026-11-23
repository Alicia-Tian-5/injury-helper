// Gear and shoes guide: what to wear for each sport (same list as
// RISK_SPORTS in risk-check.js), and a short check for whether your shoes
// need replacing. Uses riskText from risk-check.js and YES_NO from triage.js.

var GEAR_GUIDE = {
  basketball: {
    shoes: [
      riskText('Wear basketball shoes with a firm heel, a grippy sole and good side support. Running shoes are too soft at the sides for jumping and cutting.', 'Usa zapatillas de baloncesto con talón firme, suela que agarre y buen apoyo lateral. Las de correr son demasiado blandas por los lados para saltar y cambiar de dirección.', 'Porte des chaussures de basket au talon ferme, à semelle adhérente et bon maintien latéral. Les chaussures de course sont trop souples sur les côtés pour sauter et changer de direction.', 'Носи баскетбольные кроссовки с жёсткой пяткой, цепкой подошвой и хорошей боковой поддержкой. Беговые слишком мягкие по бокам для прыжков и резких смен направления.', 'البس حذاء كرة سلة بكعب ثابت ونعل غير زلق ودعم جانبي جيد. أحذية الجري لينة جدًا من الجانبين للقفز وتغيير الاتجاه.', '穿后跟稳、鞋底防滑、侧面支撑好的篮球鞋。跑鞋两侧太软，不适合起跳和变向。'),
      riskText('Lace them all the way to the top so your heel does not lift.', 'Átalas hasta arriba para que el talón no se levante.', 'Lace-les jusqu’en haut pour que le talon ne se soulève pas.', 'Зашнуровывай до самого верха, чтобы пятка не поднималась.', 'اربطها حتى الأعلى حتى لا يرتفع كعبك.', '鞋带系到最上面一个孔，脚跟不要在鞋里晃。')
    ],
    protect: [
      riskText('If you have sprained an ankle, wear an ankle brace or tape for at least 6 months when you play.', 'Si te has hecho un esguince de tobillo, usa tobillera o vendaje al menos 6 meses cuando juegues.', 'Si tu t’es déjà fait une entorse, porte une chevillère ou un strapping au moins 6 mois quand tu joues.', 'Если было растяжение голеностопа, играй в бандаже или с тейпом минимум 6 месяцев.', 'إذا سبق أن التوى كاحلك، فالبس دعامة أو رباطًا للكاحل 6 أشهر على الأقل عند اللعب.', '崴过脚的人，打球时戴护踝或打绷带，至少坚持半年。'),
      riskText('After a kneecap dislocation, a knee brace that holds the kneecap in place helps.', 'Tras una luxación de rótula, ayuda una rodillera que sujete la rótula.', 'Après une luxation de la rotule, une genouillère qui maintient la rotule aide.', 'После вывиха надколенника помогает наколенник, который фиксирует коленную чашечку.', 'بعد خلع الرضفة، تساعد دعامة ركبة تثبت الرضفة في مكانها.', '髌骨脱位过的人，戴能固定髌骨的护膝（中间有洞、周围有垫圈的那种）。'),
      riskText('Wipe wet or dusty spots on the court before playing; slipping is a common cause of knee injuries.', 'Seca las zonas mojadas o con polvo de la pista antes de jugar; resbalar es una causa común de lesiones de rodilla.', 'Essuie les zones mouillées ou poussiéreuses du terrain avant de jouer ; glisser est une cause fréquente de blessure au genou.', 'Перед игрой вытри мокрые или пыльные места на площадке: подскальзывание — частая причина травм колена.', 'امسح الأماكن المبللة أو المغبرة في الملعب قبل اللعب؛ فالانزلاق سبب شائع لإصابات الركبة.', '场地有水或灰先擦干净，滑倒是膝盖受伤的常见原因。')
    ]
  },
  soccer: {
    shoes: [
      riskText('Match the studs to the ground: firm-ground studs on grass, artificial-grass or turf shoes on artificial pitches, flat soles on hard courts.', 'Elige los tacos según el campo: tacos para césped natural, botas de césped artificial o multitacos en sintético, suela plana en pista dura.', 'Adapte les crampons au terrain : moulés pour l’herbe, chaussures synthétique ou stabilisé sur terrain artificiel, semelle plate sur sol dur.', 'Подбирай шипы под покрытие: для натурального газона — FG, для искусственного — AG или TF, для твёрдого зала — плоская подошва.', 'اختر النعل حسب الأرض: مسامير للعشب الطبيعي، وحذاء للعشب الصناعي على الملاعب الصناعية، ونعل مسطح على الأرض الصلبة.', '按场地选鞋钉：天然草用 FG 长钉，人造草用 AG 或 TF 碎钉，硬地用平底。钉太长在人造草上容易"卡住"伤膝盖。'),
      riskText('Leave about a finger’s width in front of your longest toe.', 'Deja más o menos un dedo de espacio delante del dedo más largo.', 'Laisse environ un doigt d’espace devant ton orteil le plus long.', 'Оставь примерно палец свободного места перед самым длинным пальцем ноги.', 'اترك مسافة بعرض إصبع تقريبًا أمام أطول أصابع قدمك.', '最长的脚趾前面留大约一指宽。')
    ],
    protect: [
      riskText('Always wear shin guards, even in a casual game.', 'Lleva siempre espinilleras, aunque sea un partido informal.', 'Porte toujours des protège-tibias, même pour un match entre amis.', 'Всегда надевай щитки, даже в товарищеской игре.', 'البس واقيات الساق دائمًا، حتى في مباراة ودية.', '一定戴护腿板，哪怕是随便踢踢。'),
      riskText('If you have sprained an ankle, wear an ankle brace or tape for at least 6 months.', 'Si te has hecho un esguince de tobillo, usa tobillera o vendaje al menos 6 meses.', 'Si tu t’es déjà fait une entorse, porte une chevillère ou un strapping au moins 6 mois.', 'Если было растяжение голеностопа, играй в бандаже или с тейпом минимум 6 месяцев.', 'إذا سبق أن التوى كاحلك، فالبس دعامة أو رباطًا للكاحل 6 أشهر على الأقل.', '崴过脚的人戴护踝或打绷带，至少半年。')
    ]
  },
  running: {
    shoes: [
      riskText('Choose running shoes that feel comfortable straight away. Try them on in the afternoon, when your feet are a little bigger.', 'Elige zapatillas de correr que sean cómodas desde el principio. Pruébatelas por la tarde, cuando el pie está un poco más hinchado.', 'Choisis des chaussures de course confortables dès le premier essai. Essaie-les l’après-midi, quand le pied est un peu plus gonflé.', 'Выбирай беговые кроссовки, удобные сразу. Примеряй их днём, когда стопа немного увеличивается.', 'اختر حذاء جري مريحًا من أول لبسة. جرّبه بعد الظهر حين تكون القدم أكبر قليلًا.', '选一穿上就舒服的跑鞋，下午去试，那时候脚会稍微肿一点。'),
      riskText('Replace running shoes after about 500–800 km.', 'Cambia las zapatillas de correr cada 500–800 km más o menos.', 'Change tes chaussures de course après environ 500 à 800 km.', 'Меняй беговые кроссовки примерно через 500–800 км.', 'استبدل حذاء الجري بعد نحو 500–800 كم.', '跑鞋大约跑 500–800 公里换一双。'),
      riskText('Run a few short runs in new shoes before a long one.', 'Haz algunas carreras cortas con zapatillas nuevas antes de una larga.', 'Fais quelques sorties courtes avec des chaussures neuves avant une longue.', 'Пробеги несколько коротких пробежек в новой обуви перед длинной.', 'اجرِ بضع مرات لمسافات قصيرة بالحذاء الجديد قبل أي جري طويل.', '新鞋先短距离跑几次，再拿去跑长距离。')
    ],
    protect: [
      riskText('At night, wear bright or reflective clothes.', 'De noche, lleva ropa de colores vivos o reflectante.', 'La nuit, porte des vêtements clairs ou réfléchissants.', 'Ночью надевай яркую или светоотражающую одежду.', 'في الليل، البس ملابس زاهية أو عاكسة للضوء.', '晚上跑步穿亮色或带反光条的衣服。'),
      riskText('Run on softer, even ground (track, park paths) when you can, especially if your shins hurt.', 'Corre en superficies más blandas y lisas (pista, caminos de parque) cuando puedas, sobre todo si te duelen las espinillas.', 'Cours sur un sol plus souple et régulier (piste, allées de parc) quand tu peux, surtout si tes tibias font mal.', 'По возможности бегай по мягкому ровному покрытию (стадион, дорожки в парке), особенно если болят голени.', 'اجرِ على أرض أنعم ومستوية (مضمار، ممرات الحدائق) متى أمكن، خاصة إذا كانت ساقاك تؤلمانك.', '能选就选软一点、平整的地面（塑胶跑道、公园步道），小腿前面疼的时候尤其要注意。')
    ]
  },
  racket: {
    shoes: [
      riskText('Wear indoor court shoes (badminton or tennis shoes) with a grippy sole and side support, not running shoes.', 'Usa zapatillas de pista (de bádminton o tenis) con suela que agarre y apoyo lateral, no zapatillas de correr.', 'Porte des chaussures de salle (badminton ou tennis) à semelle adhérente et bon maintien latéral, pas des chaussures de course.', 'Носи обувь для корта (для бадминтона или тенниса) с цепкой подошвой и боковой поддержкой, а не беговые кроссовки.', 'البس حذاء ملاعب (للريشة الطائرة أو التنس) بنعل غير زلق ودعم جانبي، لا حذاء جري.', '穿羽毛球鞋或网球鞋：鞋底防滑、侧面支撑好，不要穿跑鞋打球。')
    ],
    protect: [
      riskText('A grip that fits your hand and strings that are not too tight help prevent tennis elbow.', 'Un grip del tamaño de tu mano y un cordaje no demasiado tenso ayudan a prevenir el codo de tenista.', 'Un manche à la taille de ta main et un cordage pas trop tendu aident à éviter le tennis-elbow.', 'Ручка по размеру ладони и не слишком тугая натяжка струн помогают избежать «локтя теннисиста».', 'مقبض بحجم يدك وأوتار غير مشدودة جدًا يساعدان على تجنب مرفق التنس.', '握把粗细合适、拍线不要拉得太紧，可以减少网球肘。'),
      riskText('Protective glasses are worth it for squash, and for doubles badminton near the net.', 'Las gafas protectoras valen la pena en squash y en bádminton de dobles cerca de la red.', 'Des lunettes de protection valent le coup au squash et en double de badminton près du filet.', 'Защитные очки стоит носить в сквоше и в парном бадминтоне у сетки.', 'النظارات الواقية مفيدة في الإسكواش، وفي زوجي الريشة الطائرة قرب الشبكة.', '打壁球，或者羽毛球双打站网前，戴护目镜更安全。')
    ]
  },
  gym: {
    shoes: [
      riskText('For squats and lifting, wear shoes with a flat, firm sole, not soft running shoes.', 'Para sentadillas y pesas, usa calzado de suela plana y firme, no zapatillas de correr blandas.', 'Pour les squats et la musculation, porte des chaussures à semelle plate et ferme, pas des chaussures de course souples.', 'Для приседаний и работы с весом носи обувь с плоской жёсткой подошвой, а не мягкие беговые кроссовки.', 'للقرفصاء ورفع الأثقال، البس حذاء بنعل مسطح وصلب، لا حذاء جري لينًا.', '深蹲、举重穿鞋底平而硬的鞋，不要穿很软的跑鞋。')
    ],
    protect: [
      riskText('Use safety bars or ask someone to spot you on heavy bench presses and squats.', 'Usa barras de seguridad o pide a alguien que te asista en press de banca y sentadillas pesadas.', 'Utilise les barres de sécurité ou demande à quelqu’un de t’assurer pour les développés couchés et squats lourds.', 'На тяжёлых жимах лёжа и приседаниях используй страховочные упоры или проси кого-то подстраховать.', 'استخدم قضبان الأمان أو اطلب من أحد مساعدتك في تمارين الضغط على المقعد والقرفصاء الثقيلة.', '大重量卧推和深蹲时用保护杠，或者请人在旁边保护。'),
      riskText('A lifting belt is only for near-maximum weights; for everyday sets, rely on your own core.', 'El cinturón de pesas es solo para pesos casi máximos; en las series normales, confía en tu propio core.', 'La ceinture n’est utile que près de tes charges maximales ; pour les séries habituelles, compte sur ta sangle abdominale.', 'Пояс нужен только на весах, близких к максимальным; в обычных подходах опирайся на собственный корпус.', 'حزام الأثقال للأوزان القريبة من الحد الأقصى فقط؛ وفي المجموعات العادية اعتمد على عضلات جذعك.', '护腰（举重腰带）只在接近极限重量时用，平时靠自己的核心力量。')
    ]
  },
  other: {
    shoes: [
      riskText('Wear shoes made for your sport, and replace them when the sole is worn smooth.', 'Usa calzado hecho para tu deporte y cámbialo cuando la suela esté lisa.', 'Porte des chaussures faites pour ton sport et change-les quand la semelle est lisse.', 'Носи обувь для своего вида спорта и меняй её, когда подошва стёрлась.', 'البس حذاء مصممًا لرياضتك، واستبدله عندما يصبح النعل أملس.', '穿这项运动专用的鞋，鞋底磨平了就换。')
    ],
    protect: [
      riskText('Wear the gear your sport calls for: a helmet for cycling, and a helmet, wrist guards and knee pads for skating.', 'Lleva el equipo que pide tu deporte: casco para la bici; casco, muñequeras y rodilleras para patinar.', 'Porte l’équipement de ton sport : un casque à vélo ; casque, protège-poignets et genouillères en patins ou skate.', 'Используй защиту своего вида спорта: шлем на велосипеде; шлем, защиту запястий и наколенники на роликах и скейте.', 'البس معدات رياضتك: خوذة لركوب الدراجة، وخوذة وواقيات للمعصم والركبة للتزلج.', '按项目戴护具：骑车戴头盔；轮滑、滑板戴头盔、护腕和护膝。')
    ]
  }
};

var GEAR_SHOE_QUESTIONS = [
  {id: 'tread', text: riskText('Is the tread worn smooth, or one side worn much more than the other?', '¿Está la suela lisa, o un lado mucho más gastado que el otro?', 'La semelle est-elle lisse, ou un côté beaucoup plus usé que l’autre ?', 'Протектор стёрся или одна сторона стёрта сильнее другой?', 'هل النعل أصبح أملس، أو أن جهة منه بالية أكثر بكثير من الأخرى؟', '鞋底花纹磨平了，或者一边磨得比另一边多很多？'),
    why: riskText('Worn tread grips less, and uneven wear tilts your foot.', 'Una suela gastada agarra menos, y el desgaste desigual inclina el pie.', 'Une semelle usée adhère moins, et une usure inégale fait pencher le pied.', 'Стёртый протектор хуже держит, а неровный износ наклоняет стопу.', 'النعل البالي أقل تماسكًا، والتآكل غير المتساوي يميل بقدمك.', '花纹磨平就不防滑，一边磨得多会让脚往一边歪。')},
  {id: 'midsole', text: riskText('Does the middle of the sole have deep creases, feel hard, or does the shoe lean when set on a table?', '¿La parte media de la suela tiene arrugas profundas, se nota dura, o la zapatilla se inclina sobre una mesa?', 'L’entresemelle a-t-elle des plis profonds, semble-t-elle dure, ou la chaussure penche-t-elle posée sur une table ?', 'На средней части подошвы глубокие складки, она стала жёсткой или кроссовок кренится, если поставить его на стол?', 'هل في وسط النعل تجاعيد عميقة، أو أصبح صلبًا، أو يميل الحذاء عند وضعه على طاولة؟', '鞋底中间那层有很多深的折痕、变硬了，或者把鞋放在桌上会歪？'),
    why: riskText('The cushioning has worn out, so more of each landing goes into your joints.', 'La amortiguación se ha gastado, así que más impacto de cada pisada llega a tus articulaciones.', 'L’amorti est usé, donc chaque impact passe davantage dans tes articulations.', 'Амортизация износилась, и больше удара при каждом шаге идёт в суставы.', 'التبطين تآكل، فيصل جزء أكبر من كل هبوط إلى مفاصلك.', '缓震已经坏了，每次落地的冲击更多地压到关节上。')},
  {id: 'age', text: riskText('Have you worn them often for more than a year, or run more than about 600 km in them?', '¿Las has usado a menudo durante más de un año, o has corrido más de unos 600 km con ellas?', 'Les portes-tu souvent depuis plus d’un an, ou as-tu couru plus de 600 km environ avec ?', 'Ты часто носишь их больше года или пробежал в них больше 600 км?', 'هل تلبسه كثيرًا منذ أكثر من سنة، أو جريت به أكثر من نحو 600 كم؟', '这双鞋经常穿已经超过一年，或者跑了 600 公里以上？'),
    why: riskText('Even shoes that look fine lose their support and cushioning with use.', 'Incluso unas zapatillas que parecen bien pierden sujeción y amortiguación con el uso.', 'Même des chaussures qui ont l’air bien perdent maintien et amorti à l’usage.', 'Даже внешне целая обувь со временем теряет поддержку и амортизацию.', 'حتى الحذاء الذي يبدو سليمًا يفقد دعمه وتبطينه مع الاستعمال.', '就算看起来还好，穿久了支撑和缓震也会变差。')},
  {id: 'aches', text: riskText('Lately, do your feet, shins or knees ache after training for no clear reason?', 'Últimamente, ¿te duelen los pies, las espinillas o las rodillas después de entrenar sin motivo claro?', 'Ces derniers temps, as-tu mal aux pieds, aux tibias ou aux genoux après l’entraînement sans raison claire ?', 'В последнее время после тренировок без явной причины болят стопы, голени или колени?', 'هل تؤلمك قدماك أو ساقاك أو ركبتاك مؤخرًا بعد التدريب دون سبب واضح؟', '最近练完以后脚、小腿或膝盖莫名其妙地酸痛？'),
    why: riskText('Tired shoes are a common cause. If new shoes do not help, check your training load above or see a doctor.', 'Unas zapatillas gastadas son una causa común. Si unas nuevas no ayudan, revisa tu carga de entrenamiento arriba o consulta a un médico.', 'Des chaussures fatiguées en sont souvent la cause. Si des neuves n’aident pas, regarde ta charge d’entraînement plus haut ou consulte un médecin.', 'Частая причина — изношенная обувь. Если новая не помогает, посмотри на нагрузку выше или обратись к врачу.', 'الحذاء البالي سبب شائع. إذا لم يساعد حذاء جديد، فراجع حمل تدريبك أعلاه أو استشر طبيبًا.', '鞋子旧了是常见原因。换了新鞋还疼，就看看上面的训练记录有没有加太猛，或者去看医生。')}
];

// Returns {status: 'missing', ids} until every question is answered, then
// {status: 'replace', reasons: [question ids answered yes]} or {status: 'ok'}.
function shoeCheckResult(answers) {
  var missing = GEAR_SHOE_QUESTIONS.filter(function (q) { return !answers[q.id]; }).map(function (q) { return q.id; });
  if (missing.length > 0) return {status: 'missing', ids: missing};
  var reasons = GEAR_SHOE_QUESTIONS.filter(function (q) { return answers[q.id] === 'yes'; }).map(function (q) { return q.id; });
  return reasons.length > 0 ? {status: 'replace', reasons: reasons} : {status: 'ok'};
}
