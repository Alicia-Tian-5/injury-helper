// Getting ready to see a doctor: words to describe how the injury feels,
// turned into a short note for the doctor in the language they read; what to
// bring; what the doctor may ask; and what to ask them. Everything is kept on
// this device. Uses riskText from risk-check.js.

var DOCTOR_VISIT_KEY = 'injury-helper-doctor-visit';

var DV_SIDES = [
  {id: 'left', name: riskText('Left side', 'Lado izquierdo', 'Côté gauche', 'Слева', 'الجهة اليسرى', '左侧')},
  {id: 'right', name: riskText('Right side', 'Lado derecho', 'Côté droit', 'Справа', 'الجهة اليمنى', '右侧')},
  {id: 'both', name: riskText('Both sides', 'Ambos lados', 'Des deux côtés', 'С обеих сторон', 'الجهتان', '两侧')}
];

var DV_PARTS = [
  {id: 'head', name: riskText('Head', 'Cabeza', 'Tête', 'Голова', 'الرأس', '头')},
  {id: 'neck', name: riskText('Neck', 'Cuello', 'Cou', 'Шея', 'الرقبة', '脖子')},
  {id: 'shoulder', name: riskText('Shoulder', 'Hombro', 'Épaule', 'Плечо', 'الكتف', '肩膀')},
  {id: 'elbow', name: riskText('Elbow', 'Codo', 'Coude', 'Локоть', 'المرفق', '手肘')},
  {id: 'wrist', name: riskText('Wrist', 'Muñeca', 'Poignet', 'Запястье', 'الرسغ', '手腕')},
  {id: 'hand', name: riskText('Hand or fingers', 'Mano o dedos', 'Main ou doigts', 'Кисть или пальцы', 'اليد أو الأصابع', '手或手指')},
  {id: 'ribs', name: riskText('Chest or ribs', 'Pecho o costillas', 'Poitrine ou côtes', 'Грудь или рёбра', 'الصدر أو الأضلاع', '胸口或肋骨')},
  {id: 'lowerBack', name: riskText('Lower back', 'Zona lumbar', 'Bas du dos', 'Поясница', 'أسفل الظهر', '腰')},
  {id: 'hip', name: riskText('Hip or groin', 'Cadera o ingle', 'Hanche ou aine', 'Бедро (тазобедренный сустав) или пах', 'الورك أو أعلى الفخذ من الداخل', '胯部或腹股沟')},
  {id: 'thighFront', name: riskText('Front of the thigh', 'Parte delantera del muslo', 'Avant de la cuisse', 'Передняя поверхность бедра', 'مقدمة الفخذ', '大腿前侧')},
  {id: 'thighBack', name: riskText('Back of the thigh', 'Parte trasera del muslo', 'Arrière de la cuisse', 'Задняя поверхность бедра', 'خلف الفخذ', '大腿后侧')},
  {id: 'knee', name: riskText('Knee', 'Rodilla', 'Genou', 'Колено', 'الركبة', '膝盖')},
  {id: 'shin', name: riskText('Shin', 'Espinilla', 'Tibia', 'Голень (спереди)', 'مقدمة الساق', '小腿前侧')},
  {id: 'calf', name: riskText('Calf', 'Pantorrilla', 'Mollet', 'Икра', 'ربلة الساق', '小腿肚')},
  {id: 'ankle', name: riskText('Ankle', 'Tobillo', 'Cheville', 'Голеностоп', 'الكاحل', '脚踝')},
  {id: 'foot', name: riskText('Foot or toes', 'Pie o dedos del pie', 'Pied ou orteils', 'Стопа или пальцы ног', 'القدم أو أصابعها', '脚或脚趾')}
];

var DV_SPREADS = [
  {id: 'point', name: riskText('I can point to it with one finger', 'Puedo señalarlo con un dedo', 'Je peux le montrer avec un doigt', 'Могу показать одним пальцем', 'أستطيع الإشارة إليه بإصبع واحد', '能用一根手指指出具体位置')},
  {id: 'area', name: riskText('A wider area hurts', 'Duele una zona más amplia', 'Une zone plus large fait mal', 'Болит более широкая область', 'منطقة أوسع تؤلمني', '一大片都疼，指不出具体的点')}
];

// Each kind of pain has a plain explanation, so the visitor can recognise it.
var DV_PAIN_TYPES = [
  {id: 'sharp', name: riskText('Sharp, stabbing', 'Aguda, punzante', 'Aiguë, en coup de poignard', 'Острая, колющая', 'حاد، طاعن', '刺痛'),
    explain: riskText('Like a needle or knife; sudden and pointed.', 'Como una aguja o un cuchillo; repentino y localizado.', 'Comme une aiguille ou un couteau ; soudaine et précise.', 'Как иглой или ножом: резко и в одной точке.', 'كأنه إبرة أو سكين؛ مفاجئ ومركز.', '像被针扎、被刀戳，一下一下很尖锐。')},
  {id: 'dull', name: riskText('Dull, deep', 'Sorda, profunda', 'Sourde, profonde', 'Тупая, глубокая', 'خفيف ممتد وعميق', '钝痛'),
    explain: riskText('A heavy, deep pain that is hard to pin down.', 'Un dolor pesado y profundo, difícil de localizar.', 'Une douleur lourde et profonde, difficile à situer.', 'Тяжёлая глубокая боль, которую трудно точно показать.', 'ألم ثقيل وعميق يصعب تحديد مكانه.', '闷闷地疼，在里面，说不清是哪个点。')},
  {id: 'aching', name: riskText('Aching, sore', 'Molestia, dolorido', 'Courbature, endolori', 'Ноющая, ломящая', 'وجع ممتد وتيبّس', '酸胀'),
    explain: riskText('Sore and tired, like after a hard workout.', 'Dolorido y cansado, como después de un entrenamiento duro.', 'Endolori et fatigué, comme après une grosse séance.', 'Ноет и устаёт, как после тяжёлой тренировки.', 'متعب ومتوجع، كأنه بعد تمرين شاق.', '又酸又胀，像练狠了之后那种感觉。')},
  {id: 'burning', name: riskText('Burning', 'Ardor', 'Brûlure', 'Жгучая', 'حارق', '灼烧感'),
    explain: riskText('Hot or burning, like a burn.', 'Caliente o ardiente, como una quemadura.', 'Chaude ou brûlante, comme une brûlure.', 'Горячая, жжёт, как ожог.', 'سخونة أو حرقة، كأنه حرق.', '火辣辣的，像被烫到。')},
  {id: 'numb', name: riskText('Numb or tingling', 'Entumecimiento u hormigueo', 'Engourdissement ou fourmillements', 'Онемение или покалывание', 'خدر أو تنميل', '发麻或刺麻'),
    explain: riskText('Less feeling, or pins and needles.', 'Menos sensibilidad, o como hormigas.', 'Moins de sensations, ou des picotements.', 'Чувствительность снижена или будто бегают мурашки.', 'إحساس أقل، أو وخز كالدبابيس.', '感觉变迟钝，或者像有蚂蚁在爬。')},
  {id: 'throbbing', name: riskText('Throbbing', 'Pulsátil', 'Lancinante, qui bat', 'Пульсирующая', 'نابض', '跳着疼'),
    explain: riskText('Pulses in time with your heartbeat.', 'Late al ritmo del corazón.', 'Bat au rythme du cœur.', 'Пульсирует в такт сердцу.', 'ينبض مع دقات قلبك.', '跟着心跳一下一下地疼。')},
  {id: 'odd', name: riskText('Not quite pain: feels wrong or unstable inside', 'No es dolor exactamente: se nota raro o inestable por dentro', 'Pas vraiment une douleur : ça semble bizarre ou instable à l’intérieur', 'Не совсем боль: внутри странно или неустойчиво', 'ليس ألمًا تمامًا: إحساس غريب أو عدم ثبات في الداخل', '说不上疼，就是里面怪怪的、不踏实'),
    explain: riskText('Many people feel this after a joint injury; it is worth telling the doctor.', 'Mucha gente lo nota tras una lesión de articulación; vale la pena decírselo al médico.', 'Beaucoup le ressentent après une blessure articulaire ; ça vaut la peine de le dire au médecin.', 'Так бывает после травмы сустава; об этом стоит сказать врачу.', 'يشعر به كثيرون بعد إصابة مفصل؛ يستحق أن تخبر الطبيب به.', '关节受伤后很多人有这种感觉，值得告诉医生。')}
];

var DV_WHENS = [
  {id: 'rest', name: riskText('At rest', 'En reposo', 'Au repos', 'В покое', 'أثناء الراحة', '休息不动时')},
  {id: 'walking', name: riskText('Walking', 'Al caminar', 'En marchant', 'При ходьбе', 'عند المشي', '走路时')},
  {id: 'stairs', name: riskText('On stairs', 'En las escaleras', 'Dans les escaliers', 'На лестнице', 'على الدرج', '上下楼时')},
  {id: 'squatting', name: riskText('Squatting or kneeling', 'Al agacharme o arrodillarme', 'En m’accroupissant ou à genoux', 'Когда приседаю или стою на коленях', 'عند القرفصاء أو الركوع', '蹲下或跪下时')},
  {id: 'sport', name: riskText('During sport', 'Al hacer deporte', 'Pendant le sport', 'Во время спорта', 'أثناء الرياضة', '运动时')},
  {id: 'night', name: riskText('At night', 'Por la noche', 'La nuit', 'Ночью', 'في الليل', '夜里')},
  {id: 'morning', name: riskText('When I get up in the morning', 'Al levantarme por la mañana', 'Au lever le matin', 'Утром, когда встаю', 'عند الاستيقاظ صباحًا', '早上起床时')}
];

// What a pain score means, so two people mean the same thing by "6".
var DV_SCORE_MEANINGS = [
  {upTo: 0, text: riskText('no pain', 'sin dolor', 'aucune douleur', 'боли нет', 'لا ألم', '不疼')},
  {upTo: 3, text: riskText('I notice it, but it does not stop me walking or sleeping', 'lo noto, pero no me impide caminar ni dormir', 'je la sens, mais elle ne m’empêche pas de marcher ni de dormir', 'чувствую, но она не мешает ходить и спать', 'ألاحظه، لكنه لا يمنعني من المشي أو النوم', '能感觉到，但不影响走路和睡觉')},
  {upTo: 6, text: riskText('hard to ignore; it gets in the way of everyday things', 'difícil de ignorar; me estorba en las cosas de cada día', 'difficile à ignorer ; elle gêne au quotidien', 'трудно не замечать; мешает в повседневных делах', 'يصعب تجاهله؛ يعيق أموري اليومية', '很难忽略，影响日常活动')},
  {upTo: 9, text: riskText('I cannot concentrate, and it is hard to sleep', 'no puedo concentrarme y me cuesta dormir', 'je n’arrive pas à me concentrer et j’ai du mal à dormir', 'не могу сосредоточиться, трудно спать', 'لا أستطيع التركيز، ويصعب علي النوم', '疼得没法集中注意力，很难睡着')},
  {upTo: 10, text: riskText('the worst pain I can imagine', 'el peor dolor que puedo imaginar', 'la pire douleur imaginable', 'самая сильная боль, какую можно представить', 'أسوأ ألم يمكنني تخيله', '能想象到的最疼')}
];

var DV_OTHERS = [
  {id: 'givingWay', name: riskText('It gives way or feels unstable', 'Se me va o se nota inestable', 'Ça lâche ou ça semble instable', 'Подкашивается или неустойчиво', 'ينثني فجأة أو أشعر بعدم الثبات', '打软腿、不稳')},
  {id: 'locking', name: riskText('It locks or will not straighten', 'Se bloquea o no se estira del todo', 'Ça se bloque ou ne s’étend pas complètement', 'Заклинивает или не разгибается', 'يتصلب أو لا يستقيم', '卡住、伸不直')},
  {id: 'clicking', name: riskText('Clicking or popping', 'Chasquidos o crujidos', 'Des claquements ou craquements', 'Щелчки или хруст', 'طقطقة أو فرقعة', '有响声')},
  {id: 'swelling', name: riskText('Swelling', 'Hinchazón', 'Gonflement', 'Отёк', 'تورم', '肿')},
  {id: 'warmth', name: riskText('Warm to the touch', 'Está caliente al tacto', 'Chaud au toucher', 'Горячее на ощупь', 'دافئ عند اللمس', '摸起来发热')},
  {id: 'bruising', name: riskText('Bruising', 'Moratón', 'Bleu', 'Синяк', 'كدمة', '淤青')},
  {id: 'weak', name: riskText('Weak, hard to put weight on', 'Débil, me cuesta apoyar peso', 'Faible, difficile de mettre du poids dessus', 'Слабость, трудно опереться', 'ضعف، يصعب تحميل الوزن عليه', '没力气、不敢吃重')}
];

// Labels for the note to the doctor, kept here so the note can be made in any
// of the six languages whatever the page language is.
var DV_NOTE_LABELS = {
  injury: riskText('Injury (from a self-check)', 'Lesión (según una autoevaluación)', 'Blessure (d’après une auto-évaluation)', 'Травма (по самопроверке)', 'الإصابة (حسب فحص ذاتي)', '伤情（自测结果）'),
  where: riskText('Where', 'Dónde', 'Où', 'Где', 'المكان', '部位'),
  since: riskText('Since', 'Desde', 'Depuis le', 'С', 'منذ', '开始时间'),
  types: riskText('Kind of pain', 'Tipo de dolor', 'Type de douleur', 'Характер боли', 'نوع الألم', '疼痛类型'),
  when: riskText('Worst', 'Peor', 'Pire', 'Сильнее всего', 'يشتد', '最疼的时候'),
  score: riskText('Pain score', 'Intensidad del dolor', 'Intensité de la douleur', 'Сила боли', 'شدة الألم', '疼痛程度'),
  others: riskText('Also', 'Además', 'Aussi', 'Также', 'أيضًا', '其他感觉')
};

var DV_BRING = [
  {id: 'id', name: riskText('ID and health insurance card', 'Documento de identidad y tarjeta sanitaria', 'Pièce d’identité et carte d’assurance maladie', 'Документ и полис медицинского страхования', 'الهوية وبطاقة التأمين الصحي', '身份证件和医保卡')},
  {id: 'photos', name: riskText('Photos from when it happened or when it was most swollen', 'Fotos de cuando pasó o de cuando estaba más hinchado', 'Photos du moment de la blessure ou quand c’était le plus gonflé', 'Фото сразу после травмы или когда отёк был сильнее всего', 'صور من وقت الإصابة أو عندما كان التورم في أشده', '受伤当时或者肿得最厉害时的照片')},
  {id: 'meds', name: riskText('The medicines you take, or a list of them', 'Los medicamentos que tomas, o una lista', 'Tes médicaments, ou leur liste', 'Лекарства, которые ты принимаешь, или их список', 'أدويتك أو قائمة بها', '正在吃的药，或者药名清单')},
  {id: 'scans', name: riskText('Earlier X-rays, scans and doctor’s notes', 'Radiografías, pruebas e informes anteriores', 'Radios, examens et comptes rendus précédents', 'Прежние снимки, исследования и заключения врачей', 'الأشعة والفحوص وتقارير الأطباء السابقة', '以前的片子、检查报告和病历')},
  {id: 'clothes', name: riskText('Loose clothes, so the injured part is easy to show', 'Ropa holgada, para enseñar fácilmente la zona', 'Des vêtements amples, pour montrer facilement la zone', 'Свободную одежду, чтобы легко показать место травмы', 'ملابس واسعة ليسهل كشف المكان المصاب', '宽松的衣服，方便露出受伤的地方')},
  {id: 'report', name: riskText('The report for your doctor from this site (if you keep a recovery log)', 'El informe para tu médico de esta web (si llevas un registro)', 'Le rapport pour ton médecin de ce site (si tu tiens un carnet)', 'Отчёт для врача с этого сайта (если ведёшь дневник)', 'تقرير الطبيب من هذا الموقع (إذا كنت تحتفظ بسجل)', '本网站的"给医生的报告"（如果你记了康复记录）')}
];

var DV_DOCTOR_ASKS = [
  {q: riskText('How did it happen?', '¿Cómo pasó?', 'Comment c’est arrivé ?', 'Как это произошло?', 'كيف حدث ذلك؟', '怎么受伤的？'),
    tip: riskText('Say what you were doing and which way the joint went: “I landed on someone’s foot and my ankle rolled inwards.”', 'Di qué estabas haciendo y hacia dónde se fue la articulación: «Caí sobre el pie de otro y el tobillo se me torció hacia dentro».', 'Dis ce que tu faisais et dans quel sens l’articulation est partie : « J’ai atterri sur le pied de quelqu’un et ma cheville a tourné vers l’intérieur. »', 'Расскажи, что ты делал и куда ушёл сустав: «Приземлился на чужую ногу, и стопа подвернулась внутрь».', 'قل ماذا كنت تفعل وفي أي اتجاه تحرك المفصل: «هبطت على قدم لاعب آخر فالتوى كاحلي إلى الداخل».', '说清楚当时在做什么、关节往哪个方向歪了，比如"起跳落地踩到别人的脚，脚踝往里崴"。')},
  {q: riskText('Did you hear or feel a pop?', '¿Oíste o sentiste un chasquido?', 'As-tu entendu ou senti un claquement ?', 'Был ли щелчок — слышный или ощутимый?', 'هل سمعت أو شعرت بفرقعة؟', '当时有没有听到或感觉到"啪"的一声？'),
    tip: riskText('A pop can mean a ligament or tendon tear, so mention it even if you are not sure.', 'Un chasquido puede indicar una rotura de ligamento o tendón, así que dilo aunque no estés seguro.', 'Un claquement peut signaler une rupture de ligament ou de tendon, alors dis-le même si tu n’es pas sûr.', 'Щелчок может означать разрыв связки или сухожилия, поэтому скажи, даже если не уверен.', 'قد تعني الفرقعة تمزق رباط أو وتر، فاذكرها حتى لو لم تكن متأكدًا.', '响声可能说明韧带或肌腱撕裂，不确定也要说。')},
  {q: riskText('Could you keep playing, and can you walk on it now?', '¿Pudiste seguir jugando? ¿Puedes apoyar y caminar ahora?', 'As-tu pu continuer à jouer, et peux-tu marcher dessus maintenant ?', 'Смог ли ты продолжить игру и можешь ли сейчас наступать?', 'هل استطعت مواصلة اللعب، وهل تستطيع المشي عليه الآن؟', '当时还能继续打吗？现在能不能走路、吃重？'),
    tip: riskText('Be specific: “I had to stop at once; now I can walk slowly but not run.”', 'Sé concreto: «Tuve que parar enseguida; ahora puedo caminar despacio pero no correr».', 'Sois précis : « J’ai dû arrêter tout de suite ; maintenant je marche lentement mais je ne peux pas courir. »', 'Конкретно: «Сразу пришлось остановиться; сейчас хожу медленно, бегать не могу».', 'كن محددًا: «اضطررت للتوقف فورًا؛ الآن أمشي ببطء لكن لا أستطيع الجري».', '说具体一点，比如"当时马上就下场了，现在能慢慢走，但不能跑"。')},
  {q: riskText('When did it swell, and how fast?', '¿Cuándo se hinchó y con qué rapidez?', 'Quand est-ce que ça a gonflé, et à quelle vitesse ?', 'Когда появился отёк и как быстро?', 'متى تورم، وبأي سرعة؟', '什么时候肿起来的？肿得快不快？'),
    tip: riskText('Swelling within an hour or two can mean bleeding inside the joint.', 'Una hinchazón en una o dos horas puede indicar sangrado dentro de la articulación.', 'Un gonflement en une ou deux heures peut signaler un saignement dans l’articulation.', 'Отёк в течение часа-двух может означать кровоизлияние в сустав.', 'التورم خلال ساعة أو ساعتين قد يعني نزيفًا داخل المفصل.', '一两个小时内就肿起来，可能是关节里面出血，要告诉医生。')},
  {q: riskText('Have you hurt this place before?', '¿Te habías lesionado antes en este sitio?', 'T’es-tu déjà blessé à cet endroit ?', 'Травмировал ли ты это место раньше?', 'هل أصبت هذا المكان من قبل؟', '这个地方以前伤过吗？'),
    tip: riskText('Give the year and what the doctor said then.', 'Di el año y lo que dijo el médico entonces.', 'Donne l’année et ce que le médecin avait dit.', 'Назови год и что тогда сказал врач.', 'اذكر السنة وما قاله الطبيب حينها.', '说一下是哪一年、当时医生怎么说的。')},
  {q: riskText('What have you done for it so far?', '¿Qué has hecho hasta ahora?', 'Qu’as-tu fait jusqu’ici ?', 'Что ты уже сделал?', 'ماذا فعلت له حتى الآن؟', '到现在做过哪些处理？'),
    tip: riskText('Ice, a brace, rest, painkillers (name and dose), and whether they helped.', 'Hielo, férula o tobillera, reposo, analgésicos (nombre y dosis) y si ayudaron.', 'Glace, attelle, repos, antidouleurs (nom et dose), et si ça a aidé.', 'Лёд, бандаж, покой, обезболивающие (название и доза) и помогло ли.', 'الثلج، الدعامة، الراحة، المسكنات (الاسم والجرعة)، وهل ساعدت.', '冰敷、护具、休息、吃了什么止痛药（药名和剂量），有没有用。')}
];

var DV_ASK_COMMON = [
  riskText('What exactly is the injury, and how bad is it?', '¿Qué lesión es exactamente y qué tan grave es?', 'Quelle est exactement la blessure, et est-elle grave ?', 'Что именно за травма и насколько она серьёзна?', 'ما الإصابة بالضبط، وما مدى خطورتها؟', '我的伤具体叫什么？严重到什么程度？'),
  riskText('Do I need an X-ray or an MRI?', '¿Necesito una radiografía o una resonancia?', 'Ai-je besoin d’une radio ou d’une IRM ?', 'Нужен ли рентген или МРТ?', 'هل أحتاج إلى أشعة سينية أو رنين مغناطيسي؟', '需要拍 X 光或者做核磁吗？'),
  riskText('What should I do and avoid for now?', '¿Qué debo hacer y evitar por ahora?', 'Que dois-je faire et éviter pour l’instant ?', 'Что мне сейчас делать и чего избегать?', 'ماذا يجب أن أفعل وأتجنب الآن؟', '现在该做什么、不能做什么？'),
  riskText('Which signs mean I should come back sooner?', '¿Qué señales indican que debo volver antes?', 'Quels signes doivent me faire revenir plus tôt ?', 'При каких признаках прийти раньше?', 'ما العلامات التي تعني أن أعود أبكر؟', '出现哪些情况要提前回来复诊？'),
  riskText('When can I start rehab, and when can I play again?', '¿Cuándo puedo empezar la rehabilitación y cuándo volver a jugar?', 'Quand puis-je commencer la rééducation, et quand rejouer ?', 'Когда начинать реабилитацию и когда можно снова играть?', 'متى أبدأ التأهيل، ومتى أعود للعب؟', '什么时候可以开始康复训练？什么时候能回场？')
];

// Extra questions for some injuries (ids from triage.js).
var DV_ASK_BY_INJURY = {
  ankle: [
    riskText('Is a ligament torn, and how badly?', '¿Hay algún ligamento roto, y cuánto?', 'Un ligament est-il déchiré, et à quel point ?', 'Порвана ли связка и насколько?', 'هل تمزق رباط، وبأي درجة؟', '韧带有没有撕裂？是几度？'),
    riskText('Should I wear an ankle brace, and for how long?', '¿Debo usar tobillera y durante cuánto tiempo?', 'Dois-je porter une chevillère, et combien de temps ?', 'Нужен ли бандаж на голеностоп и как долго?', 'هل يجب أن ألبس دعامة للكاحل، وإلى متى؟', '要不要戴护踝？戴多久？')
  ],
  patella: [
    riskText('How likely is it to dislocate again? Should I think about surgery?', '¿Qué probabilidad hay de que se vuelva a salir? ¿Debería pensar en operarme?', 'Quel risque qu’elle se luxe à nouveau ? Faut-il envisager une opération ?', 'Насколько вероятен повторный вывих? Стоит ли думать об операции?', 'ما احتمال أن تخرج مرة أخرى؟ هل أفكر في الجراحة؟', '以后再脱的可能性大吗？要不要考虑手术？'),
    riskText('Is there any damage to the cartilage? Do I need an MRI?', '¿Hay daño en el cartílago? ¿Necesito una resonancia?', 'Le cartilage est-il abîmé ? Ai-je besoin d’une IRM ?', 'Повреждён ли хрящ? Нужна ли МРТ?', 'هل تضرر الغضروف؟ هل أحتاج إلى رنين مغناطيسي؟', '软骨有没有受伤？需要做核磁吗？'),
    riskText('Which knee brace should I wear, and when?', '¿Qué rodillera debo usar y cuándo?', 'Quelle genouillère porter, et quand ?', 'Какой наколенник носить и когда?', 'أي دعامة ركبة ألبس، ومتى؟', '该戴哪种护膝？什么时候戴？')
  ],
  sprain: [
    riskText('Is a ligament torn, and how badly?', '¿Hay algún ligamento roto, y cuánto?', 'Un ligament est-il déchiré, et à quel point ?', 'Порвана ли связка и насколько?', 'هل تمزق رباط، وبأي درجة؟', '韧带有没有撕裂？是几度？')
  ],
  strain: [
    riskText('What grade is the strain? When can I start stretching?', '¿De qué grado es la distensión? ¿Cuándo puedo empezar a estirar?', 'De quel grade est l’élongation ? Quand puis-je commencer à m’étirer ?', 'Какая степень растяжения? Когда можно начинать растяжку?', 'ما درجة الشد؟ متى أبدأ الإطالة؟', '拉伤是几级？什么时候可以开始拉伸？')
  ],
  dislocation: [
    riskText('Were any nerves or blood vessels hurt?', '¿Se dañó algún nervio o vaso sanguíneo?', 'Des nerfs ou des vaisseaux ont-ils été touchés ?', 'Не повреждены ли нервы или сосуды?', 'هل تضررت أعصاب أو أوعية دموية؟', '神经或血管有没有受伤？'),
    riskText('How likely is it to happen again, and how do I prevent it?', '¿Qué probabilidad hay de que vuelva a pasar y cómo lo evito?', 'Quel risque de récidive, et comment l’éviter ?', 'Насколько вероятен повтор и как его предотвратить?', 'ما احتمال تكرارها، وكيف أمنع ذلك؟', '以后再脱的可能大吗？怎么预防？')
  ],
  fracture: [
    riskText('How long will the cast or splint stay on?', '¿Cuánto tiempo llevaré la escayola o férula?', 'Combien de temps vais-je garder le plâtre ou l’attelle ?', 'Сколько носить гипс или шину?', 'كم سيبقى الجبس أو الجبيرة؟', '石膏或夹板要打多久？'),
    riskText('When is the next X-ray to check it is healing?', '¿Cuándo es la próxima radiografía para ver si se está curando?', 'Quand est la prochaine radio pour vérifier la consolidation ?', 'Когда следующий снимок, чтобы проверить заживление?', 'متى الأشعة التالية للتأكد من الالتئام؟', '什么时候再拍片看愈合情况？')
  ],
  concussion: [
    riskText('When can I go back to school, screens and sport, step by step?', '¿Cuándo puedo volver a clase, a las pantallas y al deporte, paso a paso?', 'Quand puis-je reprendre les cours, les écrans et le sport, étape par étape ?', 'Когда, шаг за шагом, можно вернуться к учёбе, экранам и спорту?', 'متى أعود إلى الدراسة والشاشات والرياضة خطوة بخطوة؟', '什么时候能回去上课、看屏幕、运动？要分几步？'),
    riskText('Which symptoms mean I must come back at once?', '¿Qué síntomas significan que debo volver enseguida?', 'Quels symptômes doivent me faire revenir tout de suite ?', 'При каких симптомах нужно сразу вернуться?', 'ما الأعراض التي تعني أن أعود فورًا؟', '出现哪些症状必须马上回来？')
  ],
  overuse: [
    riskText('What in my training is causing it, and what should I change?', '¿Qué parte de mi entrenamiento lo causa y qué debo cambiar?', 'Qu’est-ce qui dans mon entraînement le cause, et que dois-je changer ?', 'Что в тренировках это вызывает и что изменить?', 'ما الذي في تدريبي يسببه، وماذا أغير؟', '是训练里的什么导致的？我该改哪里？')
  ]
};

function dvAskQuestions(injuryId) {
  return (DV_ASK_BY_INJURY[injuryId] || []).concat(DV_ASK_COMMON);
}

function dvScoreMeaning(score) {
  return DV_SCORE_MEANINGS.filter(function (meaning) { return score <= meaning.upTo; })[0].text;
}

// The note for the doctor in language `code`, as lines like
// "Where: Knee, Right side; I can point to it with one finger". Only parts the
// visitor answered are included; nothing answered gives no lines.
// `injuryName` is the injury's name object (from triage.js), or null.
function describeForDoctor(answers, code, injuryName) {
  var separator = code === 'zh' ? '、' : code === 'ar' ? '، ' : ', ';
  var colon = code === 'zh' ? '：' : code === 'fr' ? ' : ' : ': ';
  function names(list, ids) {
    return list.filter(function (item) { return ids.indexOf(item.id) >= 0; }).map(function (item) { return item.name[code]; });
  }
  function line(label, value) { return DV_NOTE_LABELS[label][code] + colon + value; }
  var lines = [];
  if (injuryName) lines.push(line('injury', injuryName[code]));
  var where = names(DV_PARTS, answers.part ? [answers.part] : []).concat(names(DV_SIDES, answers.side ? [answers.side] : []));
  var spread = names(DV_SPREADS, answers.spread ? [answers.spread] : []);
  if (where.length > 0 || spread.length > 0) lines.push(line('where', where.join(separator) + (where.length > 0 && spread.length > 0 ? (code === 'zh' ? '；' : '; ') : '') + spread.join('')));
  if (answers.since) lines.push(line('since', answers.since));
  var types = names(DV_PAIN_TYPES, answers.types || []);
  if (types.length > 0) lines.push(line('types', types.join(separator)));
  var whens = names(DV_WHENS, answers.when || []);
  if (whens.length > 0) lines.push(line('when', whens.join(separator)));
  if (answers.score !== '' && answers.score !== undefined && answers.score !== null) {
    var score = Number(answers.score);
    var meaning = dvScoreMeaning(score)[code];
    lines.push(line('score', score + '/10' + (code === 'zh' ? '（' + meaning + '）' : ' (' + meaning + ')')));
  }
  var others = names(DV_OTHERS, answers.others || []);
  if (others.length > 0) lines.push(line('others', others.join(separator)));
  return lines;
}

function dvEmptyAnswers() {
  return {injury: '', part: '', side: '', spread: '', since: '', types: [], when: [], score: '', others: [], bring: []};
}

// Saved answers merged over empty ones, so a missing or older save still works.
function loadDoctorVisit() {
  var answers = dvEmptyAnswers();
  try {
    var saved = JSON.parse(localStorage.getItem(DOCTOR_VISIT_KEY));
    if (saved && typeof saved === 'object') {
      Object.keys(answers).forEach(function (key) {
        if (Array.isArray(answers[key]) ? Array.isArray(saved[key]) : typeof saved[key] === 'string') answers[key] = saved[key];
      });
    }
  } catch (e) { /* storage blocked or broken: start empty */ }
  return answers;
}

function saveDoctorVisit(answers) {
  try {
    localStorage.setItem(DOCTOR_VISIT_KEY, JSON.stringify(answers));
    return true;
  } catch (e) {
    return false;
  }
}
