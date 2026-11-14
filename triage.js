// Injury questions, how answers map to an urgency level, and the advice for
// each level. Every piece of text is {en, es, fr, ru, ar, zh}. A rehab stage with `days`
// [from, to] runs from day `from` to the day before `to`, counted from the
// injury; stages without it depend on how the body is doing, not the date.
// No page code here, so the assessment rules can be tested on their own (see
// tests.html).

// Urgency levels, most urgent first.
var LEVELS = {
  emergency: {
    rank: 0,
    label: {en: 'Emergency', es: 'Emergencia', fr: 'Urgence', ru: 'Экстренно', ar: 'طوارئ', zh: '紧急'},
    summary: {
      en: 'Call emergency services or go to the emergency room now.',
      es: 'Llama a emergencias o ve a urgencias ahora.',
      fr: 'Appelle les urgences ou va aux urgences maintenant.',
      ru: 'Звони в экстренные службы или езжай в приёмное отделение прямо сейчас.',
      ar: 'اتصل بالطوارئ أو اذهب إلى قسم الطوارئ الآن.',
      zh: '立刻拨打急救电话或去急诊。'
    }
  },
  today: {
    rank: 1,
    label: {en: 'See a doctor today', es: 'Ve al médico hoy', fr: 'Voir un médecin aujourd’hui', ru: 'К врачу сегодня', ar: 'راجع طبيبًا اليوم', zh: '今天就医'},
    summary: {
      en: 'This needs an X-ray or exam today. Do not wait to see if it gets better.',
      es: 'Necesita una radiografía o una revisión hoy. No esperes a ver si mejora.',
      fr: 'Il faut une radio ou un examen aujourd’hui. N’attends pas de voir si ça s’améliore.',
      ru: 'Нужен рентген или осмотр сегодня. Не жди, пока станет лучше.',
      ar: 'هذا يحتاج إلى أشعة سينية أو فحص اليوم. لا تنتظر لترى إن كان سيتحسن.',
      zh: '今天就需要拍片或检查，不要等着看会不会好转。'
    }
  },
  soon: {
    rank: 2,
    label: {en: 'See a doctor within a few days', es: 'Ve al médico en unos días', fr: 'Voir un médecin dans les prochains jours', ru: 'К врачу в ближайшие дни', ar: 'راجع طبيبًا خلال أيام قليلة', zh: '几天内就医'},
    summary: {
      en: 'Take care of it yourself for now, and book a visit in the next few days.',
      es: 'Por ahora cuídalo tú, y pide cita para los próximos días.',
      fr: 'Soigne-toi toi-même pour l’instant, et prends rendez-vous dans les prochains jours.',
      ru: 'Пока позаботься о себе сам и запишись к врачу на ближайшие дни.',
      ar: 'اعتنِ به بنفسك الآن، واحجز موعدًا خلال الأيام القليلة القادمة.',
      zh: '先自己处理，几天内去医院看一下。'
    }
  },
  selfCare: {
    rank: 3,
    label: {en: 'Self-care and watch', es: 'Cuidados en casa y vigilar', fr: 'Soins à la maison et surveillance', ru: 'Лечись сам и наблюдай', ar: 'عناية ذاتية ومراقبة', zh: '自己处理，继续观察'},
    summary: {
      en: 'Most likely a mild injury. See a doctor if it is not clearly better in a week.',
      es: 'Lo más probable es que sea una lesión leve. Ve al médico si no mejora claramente en una semana.',
      fr: 'Sans doute une blessure légère. Consulte un médecin si ce n’est pas nettement mieux dans une semaine.',
      ru: 'Скорее всего, лёгкая травма. Обратись к врачу, если через неделю не станет заметно лучше.',
      ar: 'على الأرجح إصابة خفيفة. راجع طبيبًا إذا لم تتحسن بوضوح خلال أسبوع.',
      zh: '大概率是轻度损伤。如果一周内没有明显好转，再去看医生。'
    }
  }
};

// Answers and first-aid steps that several injuries share.
var YES_NO = [
  {value: 'yes', text: {en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', ar: 'نعم', zh: '是'}},
  {value: 'no', text: {en: 'No', es: 'No', fr: 'Non', ru: 'Нет', ar: 'لا', zh: '否'}}
];
var STOP = {en: 'Stop playing right away. Do not try to play through it.', es: 'Deja de jugar ahora mismo. No intentes seguir con dolor.', fr: 'Arrête de jouer tout de suite. N’essaie pas de continuer malgré la douleur.', ru: 'Сразу прекрати игру. Не пытайся играть через боль.', ar: 'توقف عن اللعب فورًا. لا تحاول مواصلة اللعب رغم الألم.', zh: '马上停止运动，不要硬撑着继续。'};
var ICE = {en: 'Ice for 15–20 minutes every 2–3 hours, with a cloth between the ice and the skin.', es: 'Pon hielo 15–20 minutos cada 2–3 horas, con un paño entre el hielo y la piel.', fr: 'Glace 15 à 20 minutes toutes les 2 à 3 heures, avec un tissu entre la glace et la peau.', ru: 'Лёд на 15–20 минут каждые 2–3 часа, через ткань между льдом и кожей.', ar: 'ضع الثلج 15–20 دقيقة كل 2–3 ساعات، مع قطعة قماش بين الثلج والجلد.', zh: '冰敷 15–20 分钟，每 2–3 小时一次。冰袋外面包一层毛巾，不要直接贴皮肤。'};
var COMPRESS = {en: 'Wrap with an elastic bandage, firm but not tight. Loosen it if it tingles or turns pale.', es: 'Venda con una venda elástica, firme pero no apretada. Aflójala si hormiguea o se pone pálido.', fr: 'Mets une bande élastique, ferme mais pas serrée. Desserre-la si ça picote ou si ça devient pâle.', ru: 'Наложи эластичный бинт, плотно, но не туго. Ослабь его, если покалывает или кожа бледнеет.', ar: 'لفّ المكان برباط مطاطي، بإحكام دون شدّ زائد. أرخِه إذا شعرت بوخز أو شحب لون الجلد.', zh: '用弹力绷带包扎，紧但不要太紧。如果发麻或发白，就松一点。'};
var ELEVATE = {en: 'Raise the injured part above the level of the heart when you can.', es: 'Cuando puedas, levanta la zona lesionada por encima del corazón.', fr: 'Surélève la partie blessée au-dessus du niveau du cœur quand tu peux.', ru: 'Держи травмированную часть выше уровня сердца, когда можешь.', ar: 'ارفع الجزء المصاب فوق مستوى القلب متى استطعت.', zh: '尽量把受伤部位垫高到比心脏高。'};
var NO_HEAT = {en: 'For the first 2–3 days: no heat, no massage, no alcohol. They increase swelling.', es: 'Los primeros 2–3 días: nada de calor, masajes ni alcohol. Aumentan la hinchazón.', fr: 'Pendant les 2 à 3 premiers jours : pas de chaleur, pas de massage, pas d’alcool. Ils augmentent le gonflement.', ru: 'Первые 2–3 дня: никакого тепла, массажа и алкоголя. Они усиливают отёк.', ar: 'في أول 2–3 أيام: لا حرارة، ولا تدليك، ولا كحول. فهي تزيد التورم.', zh: '前 2–3 天不要热敷、不要按摩、不要喝酒，这些会让肿胀更严重。'};
var NO_PUSH_BACK = {en: 'Do not push the joint back yourself, and do not let others try.', es: 'No vuelvas a meter la articulación en su sitio tú mismo, y no dejes que otros lo intenten.', fr: 'Ne remets pas l’articulation en place toi-même, et ne laisse personne essayer.', ru: 'Не вправляй сустав сам и не давай другим пытаться.', ar: 'لا تُرجع المفصل إلى مكانه بنفسك، ولا تدع غيرك يحاول.', zh: '不要自己把关节推回去，也不要让别人帮你推。'};
var CALL_EMERGENCY = {en: 'Call 911 (US) / 120 (China), or go to the emergency room (ER) now.', es: 'Llama al 911 (EE. UU.) / 120 (China), o ve a urgencias ahora.', fr: 'Appelle le 911 (États-Unis) / 120 (Chine), ou va aux urgences maintenant.', ru: 'Звони 911 (США) / 120 (Китай) или езжай в приёмное отделение прямо сейчас.', ar: 'اتصل بـ 911 (الولايات المتحدة) / 120 (الصين)، أو اذهب إلى قسم الطوارئ الآن.', zh: '马上打 120（中国）/ 911（美国），或者直接去急诊。'};

var ANKLE_SPRAIN = {
  id: 'ankle',
  name: {en: 'Ankle sprain', es: 'Esguince de tobillo', fr: 'Entorse de la cheville', ru: 'Растяжение связок голеностопа', ar: 'التواء الكاحل', zh: '脚踝扭伤'},
  hint: {en: 'Rolled or twisted ankle', es: 'Tobillo torcido o doblado', fr: 'Cheville tordue ou retournée', ru: 'Подвернул или вывернул лодыжку', ar: 'انقلاب الكاحل أو التواؤه', zh: '崴脚、脚踝扭到'},
  questions: [
    {
      id: 'deformity',
      text: {
        en: 'Does the ankle look out of shape, or is the foot numb, cold or pale?',
        es: '¿El tobillo se ve deformado, o el pie está dormido, frío o pálido?',
        fr: 'La cheville est-elle déformée, ou le pied est-il engourdi, froid ou pâle ?',
        ru: 'Лодыжка выглядит деформированной, или стопа онемела, холодная или бледная?',
        ar: 'هل يبدو الكاحل مشوّه الشكل، أو القدم مخدّرة أو باردة أو شاحبة؟',
        zh: '脚踝看起来变形了吗？或者脚发麻、发凉、发白？'
      },
      options: [
        {value: 'yes', text: {en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', ar: 'نعم', zh: '是'}},
        {value: 'no', text: {en: 'No', es: 'No', fr: 'Non', ru: 'Нет', ar: 'لا', zh: '没有'}}
      ]
    },
    {
      id: 'walk',
      text: {
        en: 'Can you take four steps on the injured foot?',
        es: '¿Puedes dar cuatro pasos con el pie lesionado?',
        fr: 'Peux-tu faire quatre pas sur le pied blessé ?',
        ru: 'Можешь сделать четыре шага на травмированной ноге?',
        ar: 'هل تستطيع أن تمشي أربع خطوات على القدم المصابة؟',
        zh: '受伤的脚能走四步吗？'
      },
      options: [
        {value: 'yes', text: {en: 'Yes, almost normally', es: 'Sí, casi con normalidad', fr: 'Oui, presque normalement', ru: 'Да, почти как обычно', ar: 'نعم، بشكل شبه طبيعي', zh: '能，差不多正常'}},
        {value: 'pain', text: {en: 'Yes, but it hurts or I limp', es: 'Sí, pero me duele o cojeo', fr: 'Oui, mais ça fait mal ou je boite', ru: 'Да, но больно или хромаю', ar: 'نعم، لكن مع ألم أو عرج', zh: '能，但很疼或一瘸一拐'}},
        {value: 'no', text: {en: 'No', es: 'No', fr: 'Non', ru: 'Нет', ar: 'لا', zh: '不能'}}
      ]
    },
    {
      id: 'bonePain',
      text: {
        en: 'Press the bony bumps on either side of the ankle, and the bone on the outer edge of the foot halfway to the little toe. Does pressing on bone hurt?',
        es: 'Presiona los bultos de hueso a cada lado del tobillo, y el hueso del borde externo del pie a mitad de camino hacia el dedo pequeño. ¿Duele al presionar el hueso?',
        fr: 'Appuie sur les bosses osseuses de chaque côté de la cheville, et sur l’os du bord extérieur du pied, à mi-chemin du petit orteil. Est-ce qu’appuyer sur l’os fait mal ?',
        ru: 'Надави на костные выступы по обе стороны лодыжки и на кость по внешнему краю стопы, на полпути к мизинцу. Больно ли, когда давишь на кость?',
        ar: 'اضغط على النتوءين العظميين على جانبي الكاحل، وعلى العظم في الحافة الخارجية للقدم في منتصف الطريق إلى الإصبع الصغير. هل يؤلمك الضغط على العظم؟',
        zh: '按一按脚踝两侧突出的骨头，以及脚外侧中间（往小脚趾方向）的骨头。按骨头的时候疼吗？'
      },
      options: [
        {value: 'yes', text: {en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', ar: 'نعم', zh: '疼'}},
        {value: 'no', text: {en: 'No, only the soft part hurts', es: 'No, solo duele la parte blanda', fr: 'Non, seule la partie molle fait mal', ru: 'Нет, болит только мягкая часть', ar: 'لا، الجزء الطري فقط هو الذي يؤلم', zh: '不疼，只有软的地方疼'}}
      ]
    },
    {
      id: 'swelling',
      text: {en: 'How much swelling or bruising is there?', es: '¿Cuánta hinchazón o moratón hay?', fr: 'Quel est le gonflement ou le bleu ?', ru: 'Насколько сильный отёк или синяк?', ar: 'ما مقدار التورم أو الكدمات؟', zh: '肿胀或淤青有多严重？'},
      options: [
        {value: 'mild', text: {en: 'Little or none', es: 'Poco o nada', fr: 'Peu ou pas du tout', ru: 'Слабый или нет', ar: 'قليل أو لا شيء', zh: '很轻或没有'}},
        {value: 'moderate', text: {en: 'Clearly swollen', es: 'Claramente hinchado', fr: 'Nettement gonflé', ru: 'Заметный отёк', ar: 'متورم بوضوح', zh: '明显肿了'}},
        {value: 'severe', text: {en: 'Very swollen or bruised', es: 'Muy hinchado o amoratado', fr: 'Très gonflé ou avec un gros bleu', ru: 'Сильный отёк или синяк', ar: 'متورم جدًا أو مُكدَّم', zh: '肿得很厉害或大片淤青'}}
      ]
    }
  ],
  // Bone tenderness or not being able to walk four steps are the signs
  // doctors use to decide an ankle needs an X-ray (the Ottawa ankle rules).
  assess: function (a) {
    if (a.deformity === 'yes') return 'emergency';
    if (a.walk === 'no' || a.bonePain === 'yes') return 'today';
    if (a.walk === 'pain' || a.swelling !== 'mild') return 'soon';
    return 'selfCare';
  },
  firstAid: [
    {en: 'Stop playing. Do not "walk it off".', es: 'Deja de jugar. No intentes "caminarlo" para que se pase.', fr: 'Arrête de jouer. N’essaie pas de « marcher pour faire passer ».', ru: 'Прекрати игру. Не пытайся «расходить».', ar: 'توقف عن اللعب. لا تحاول «المشي عليه حتى يزول».', zh: '马上停止运动，不要硬撑着继续走。'},
    {en: 'Ice for 15–20 minutes every 2–3 hours, with a cloth between the ice and the skin.', es: 'Pon hielo 15–20 minutos cada 2–3 horas, con un paño entre el hielo y la piel.', fr: 'Glace 15 à 20 minutes toutes les 2 à 3 heures, avec un tissu entre la glace et la peau.', ru: 'Лёд на 15–20 минут каждые 2–3 часа, через ткань между льдом и кожей.', ar: 'ضع الثلج 15–20 دقيقة كل 2–3 ساعات، مع قطعة قماش بين الثلج والجلد.', zh: '冰敷 15–20 分钟，每 2–3 小时一次。冰袋外面包一层毛巾，不要直接贴皮肤。'},
    {en: 'Wrap with an elastic bandage from the toes up. Loosen it if the toes tingle or turn pale.', es: 'Venda con una venda elástica desde los dedos hacia arriba. Aflójala si los dedos hormiguean o se ponen pálidos.', fr: 'Mets une bande élastique en partant des orteils. Desserre-la si les orteils picotent ou deviennent pâles.', ru: 'Наложи эластичный бинт от пальцев вверх. Ослабь его, если пальцы покалывает или они бледнеют.', ar: 'لفّ الكاحل برباط مطاطي بدءًا من أصابع القدم صعودًا. أرخِه إذا شعرت بوخز في الأصابع أو شحب لونها.', zh: '用弹力绷带从脚趾往上包扎。如果脚趾发麻或发白，就松一点。'},
    {en: 'Raise the ankle above the level of the heart when sitting or lying down.', es: 'Levanta el tobillo por encima del corazón cuando estés sentado o acostado.', fr: 'Surélève la cheville au-dessus du niveau du cœur quand tu es assis ou allongé.', ru: 'Держи лодыжку выше уровня сердца, когда сидишь или лежишь.', ar: 'ارفع الكاحل فوق مستوى القلب عند الجلوس أو الاستلقاء.', zh: '坐着或躺着时，把脚踝垫高到比心脏高。'},
    {en: 'For the first 2–3 days: no heat, no massage, no alcohol. They increase swelling.', es: 'Los primeros 2–3 días: nada de calor, masajes ni alcohol. Aumentan la hinchazón.', fr: 'Pendant les 2 à 3 premiers jours : pas de chaleur, pas de massage, pas d’alcool. Ils augmentent le gonflement.', ru: 'Первые 2–3 дня: никакого тепла, массажа и алкоголя. Они усиливают отёк.', ar: 'في أول 2–3 أيام: لا حرارة، ولا تدليك، ولا كحول. فهي تزيد التورم.', zh: '前 2–3 天不要热敷、不要按摩、不要喝酒，这些会让肿胀更严重。'}
  ],
  where: {
    emergency: [
      {en: 'Emergency room (ER) now. Call 911 (US) / 120 (China) if you cannot get there safely.', es: 'Urgencias ahora. Llama al 911 (EE. UU.) / 120 (China) si no puedes llegar de forma segura.', fr: 'Urgences maintenant. Appelle le 911 (États-Unis) / 120 (Chine) si tu ne peux pas y aller en sécurité.', ru: 'В приёмное отделение прямо сейчас. Звони 911 (США) / 120 (Китай), если не можешь безопасно туда добраться.', ar: 'قسم الطوارئ الآن. اتصل بـ 911 (الولايات المتحدة) / 120 (الصين) إذا لم تستطع الوصول بأمان.', zh: '马上去急诊。如果没办法安全到达，打 120（中国）/ 911（美国）。'},
      {en: 'Do not try to straighten the ankle yourself.', es: 'No intentes enderezar el tobillo tú mismo.', fr: 'N’essaie pas de redresser la cheville toi-même.', ru: 'Не пытайся выпрямить лодыжку сам.', ar: 'لا تحاول تقويم الكاحل بنفسك.', zh: '不要自己尝试把脚踝掰正。'}
    ],
    today: [
      {en: 'Today: urgent care or the ER for an X-ray, to rule out a broken bone.', es: 'Hoy: una clínica de atención inmediata o urgencias para una radiografía, para descartar una fractura.', fr: 'Aujourd’hui : un centre de soins sans rendez-vous ou les urgences pour une radio, pour écarter une fracture.', ru: 'Сегодня: травмпункт или приёмное отделение для рентгена, чтобы исключить перелом.', ar: 'اليوم: عيادة الرعاية العاجلة أو قسم الطوارئ لصورة أشعة، لاستبعاد الكسر.', zh: '今天去急诊或骨科门诊拍 X 光片，排除骨折。'},
      {en: 'Use crutches or have someone help you. Do not put weight on it until it has been checked.', es: 'Usa muletas o pide ayuda. No apoyes peso hasta que lo revisen.', fr: 'Utilise des béquilles ou fais-toi aider. Ne t’appuie pas dessus avant qu’on l’ait examinée.', ru: 'Используй костыли или попроси помощи. Не наступай на ногу, пока её не осмотрят.', ar: 'استخدم العكازات أو اطلب من أحد مساعدتك. لا تضع وزنك عليه حتى يُفحص.', zh: '用拐杖或让别人扶着，检查之前不要让受伤的脚承重。'}
    ],
    soon: [
      {en: 'Within a few days: a sports medicine doctor or orthopedics.', es: 'En unos días: un médico de medicina deportiva o traumatología.', fr: 'Dans les prochains jours : un médecin du sport ou un orthopédiste.', ru: 'В ближайшие дни: спортивный врач или травматолог-ортопед.', ar: 'خلال أيام قليلة: طبيب الطب الرياضي أو جراحة العظام.', zh: '几天内挂运动医学科或骨科。'},
      {en: 'Go sooner if the pain gets worse or you cannot walk on it.', es: 'Ve antes si el dolor empeora o no puedes caminar.', fr: 'Vas-y plus tôt si la douleur augmente ou si tu ne peux pas marcher.', ru: 'Иди раньше, если боль усиливается или ты не можешь наступать на ногу.', ar: 'اذهب أبكر إذا ازداد الألم أو لم تستطع المشي عليه.', zh: '如果越来越疼或者没法走路，要提前去。'}
    ],
    selfCare: [
      {en: 'No visit needed right now.', es: 'Ahora no hace falta ir al médico.', fr: 'Pas besoin de consulter pour l’instant.', ru: 'Сейчас к врачу идти не нужно.', ar: 'لا حاجة إلى زيارة الآن.', zh: '现在不需要去医院。'},
      {en: 'If it is not clearly better in a week, see a sports medicine doctor.', es: 'Si no mejora claramente en una semana, ve a un médico de medicina deportiva.', fr: 'Si ce n’est pas nettement mieux dans une semaine, consulte un médecin du sport.', ru: 'Если через неделю не станет заметно лучше, обратись к спортивному врачу.', ar: 'إذا لم يتحسن بوضوح خلال أسبوع، فراجع طبيب الطب الرياضي.', zh: '如果一周内没有明显好转，挂运动医学科。'}
    ]
  },
  rehabNote: {
    en: 'If a doctor has not ruled out a fracture yet, wait for their go-ahead before starting.',
    es: 'Si un médico aún no ha descartado una fractura, espera a que te dé el visto bueno antes de empezar.',
    fr: 'Si un médecin n’a pas encore écarté une fracture, attends son accord avant de commencer.',
    ru: 'Если врач ещё не исключил перелом, дождись его разрешения, прежде чем начинать.',
    ar: 'إذا لم يستبعد الطبيب الكسر بعد، فانتظر موافقته قبل أن تبدأ.',
    zh: '如果还没排除骨折，要等医生同意后再开始。'
  },
  rehab: [
    {
      when: {en: 'Days 0–3', es: 'Días 0–3', fr: 'Jours 0 à 3', ru: 'Дни 0–3', ar: 'الأيام 0–3', zh: '第 0–3 天'},
      days: [0, 3],
      goal: {en: 'Calm the swelling', es: 'Calmar la hinchazón', fr: 'Calmer le gonflement', ru: 'Снять отёк', ar: 'تهدئة التورم', zh: '消肿'},
      moves: [
        {en: 'Rest, ice and raise the ankle (see above).', es: 'Reposo, hielo y tobillo elevado (ver arriba).', fr: 'Repos, glace et cheville surélevée (voir plus haut).', ru: 'Покой, лёд и приподнятая лодыжка (см. выше).', ar: 'الراحة والثلج ورفع الكاحل (انظر أعلاه).', zh: '休息、冰敷、抬高（见上面）。'},
        {en: 'Ankle pumps: point and flex the foot 20 times, several times a day, only where it does not hurt.', es: 'Bombeo de tobillo: estira y flexiona el pie 20 veces, varias veces al día, solo hasta donde no duela.', fr: 'Pompes de cheville : pointe et ramène le pied 20 fois, plusieurs fois par jour, seulement là où ça ne fait pas mal.', ru: 'Движения стопой: тяни носок от себя и на себя 20 раз, несколько раз в день, только там, где не больно.', ar: 'ضخّ الكاحل: مدّ القدم وثنِها 20 مرة، عدة مرات في اليوم، فقط في المدى الذي لا يؤلم.', zh: '勾脚绷脚：每次 20 下，一天几次，只在不疼的范围内做。'}
      ]
    },
    {
      when: {en: 'Days 3–14', es: 'Días 3–14', fr: 'Jours 3 à 14', ru: 'Дни 3–14', ar: 'الأيام 3–14', zh: '第 3–14 天'},
      days: [3, 14],
      goal: {en: 'Move normally again', es: 'Volver a moverse con normalidad', fr: 'Bouger normalement à nouveau', ru: 'Снова двигаться как обычно', ar: 'الحركة الطبيعية من جديد', zh: '恢复正常活动'},
      moves: [
        {en: 'Walk normally as far as pain allows.', es: 'Camina con normalidad hasta donde el dolor lo permita.', fr: 'Marche normalement autant que la douleur le permet.', ru: 'Ходи как обычно, насколько позволяет боль.', ar: 'امشِ بشكل طبيعي بقدر ما يسمح الألم.', zh: '在疼痛允许的范围内正常走路。'},
        {en: 'Trace the alphabet in the air with your toes.', es: 'Dibuja el abecedario en el aire con los dedos del pie.', fr: 'Dessine l’alphabet dans l’air avec tes orteils.', ru: 'Рисуй пальцами ноги алфавит в воздухе.', ar: 'ارسم حروف الأبجدية في الهواء بأصابع قدمك.', zh: '用脚趾在空中写字母。'},
        {en: 'Resistance band: push the foot down, up, in and out, 10–15 times each.', es: 'Banda elástica: empuja el pie hacia abajo, arriba, adentro y afuera, 10–15 veces cada uno.', fr: 'Élastique : pousse le pied vers le bas, le haut, l’intérieur et l’extérieur, 10 à 15 fois chaque.', ru: 'Резиновая лента: дави стопой вниз, вверх, внутрь и наружу, по 10–15 раз.', ar: 'شريط المقاومة: ادفع القدم إلى الأسفل والأعلى والداخل والخارج، 10–15 مرة لكل اتجاه.', zh: '弹力带练习：脚往下、往上、往里、往外各推 10–15 下。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', es: 'Semanas 2–6', fr: 'Semaines 2 à 6', ru: 'Недели 2–6', ar: 'الأسابيع 2–6', zh: '第 2–6 周'},
      days: [14, 42],
      goal: {en: 'Strength and balance', es: 'Fuerza y equilibrio', fr: 'Force et équilibre', ru: 'Сила и равновесие', ar: 'القوة والتوازن', zh: '力量和平衡'},
      moves: [
        {en: 'Stand on the injured foot for 30 seconds. When easy, close your eyes.', es: 'Apóyate sobre el pie lesionado 30 segundos. Cuando sea fácil, cierra los ojos.', fr: 'Tiens-toi sur le pied blessé pendant 30 secondes. Quand c’est facile, ferme les yeux.', ru: 'Стой на травмированной ноге 30 секунд. Когда станет легко, закрой глаза.', ar: 'قف على القدم المصابة 30 ثانية. عندما يصبح ذلك سهلًا، أغمض عينيك.', zh: '单脚站在受伤的脚上 30 秒，觉得容易了就闭上眼睛做。'},
        {en: 'Heel raises: 3 sets of 15.', es: 'Elevaciones de talones: 3 series de 15.', fr: 'Montées sur la pointe des pieds : 3 séries de 15.', ru: 'Подъёмы на носки: 3 подхода по 15.', ar: 'رفع الكعبين: 3 مجموعات من 15.', zh: '提踵：3 组，每组 15 下。'},
        {en: 'Start light jogging once walking does not hurt.', es: 'Empieza a trotar suave cuando caminar ya no duela.', fr: 'Commence un footing léger dès que la marche ne fait plus mal.', ru: 'Начни лёгкий бег, когда ходьба перестанет болеть.', ar: 'ابدأ الهرولة الخفيفة عندما لا يعود المشي مؤلمًا.', zh: '走路不疼以后，开始慢跑。'}
      ]
    },
    {
      when: {en: 'Back to sport', es: 'Volver al deporte', fr: 'Retour au sport', ru: 'Возвращение в спорт', ar: 'العودة إلى الرياضة', zh: '恢复运动'},
      goal: {en: 'Ready when you can hop on the injured foot without pain', es: 'Listo cuando puedas saltar sobre el pie lesionado sin dolor', fr: 'Prêt quand tu peux sauter à cloche-pied sur le pied blessé sans douleur', ru: 'Готов, когда можешь прыгать на травмированной ноге без боли', ar: 'جاهز عندما تستطيع القفز على القدم المصابة دون ألم', zh: '受伤的脚能单脚跳且不疼，就可以恢复运动'},
      moves: [
        {en: 'Hopping, side-to-side jumps, quick changes of direction.', es: 'Saltos a la pata coja, saltos de lado a lado, cambios rápidos de dirección.', fr: 'Sauts à cloche-pied, sauts latéraux, changements de direction rapides.', ru: 'Прыжки на одной ноге, прыжки в стороны, быстрые смены направления.', ar: 'القفز على قدم واحدة، والقفز من جانب إلى جانب، وتغيير الاتجاه بسرعة.', zh: '单脚跳、左右跳、快速变向。'},
        {en: 'Tape or a brace for the first few months back.', es: 'Vendaje o tobillera durante los primeros meses de vuelta.', fr: 'Strapping ou chevillère pendant les premiers mois de reprise.', ru: 'Тейп или бандаж в первые месяцы после возвращения.', ar: 'شريط لاصق أو دعامة في الأشهر الأولى بعد العودة.', zh: '恢复运动的前几个月，用肌贴或护踝保护。'}
      ]
    }
  ]
};

var PATELLA_DISLOCATION = {
  id: 'patella',
  name: {en: 'Kneecap dislocation', es: 'Luxación de rótula', fr: 'Luxation de la rotule', ru: 'Вывих надколенника', ar: 'خلع الرضفة', zh: '髌骨脱位'},
  hint: {en: 'Kneecap slipped out to the side', es: 'La rótula se salió hacia un lado', fr: 'La rotule a glissé sur le côté', ru: 'Коленная чашечка сместилась вбок', ar: 'انزلقت الرضفة إلى الجانب', zh: '膝盖骨滑到侧面去了'},
  questions: [
    {
      id: 'inPlace',
      text: {
        en: 'Is the kneecap still out of place (a bump on the outer side, the knee stuck bent)?',
        es: '¿La rótula sigue fuera de su sitio (un bulto en la parte externa, la rodilla atascada doblada)?',
        fr: 'La rotule est-elle encore déplacée (une bosse sur le côté extérieur, le genou bloqué plié) ?',
        ru: 'Коленная чашечка всё ещё не на месте (шишка с внешней стороны, колено застряло в согнутом положении)?',
        ar: 'هل ما زالت الرضفة خارج مكانها (نتوء في الجانب الخارجي، والركبة عالقة وهي مثنية)؟',
        zh: '膝盖骨现在还在外面吗？（膝盖外侧鼓起来，腿伸不直）'
      },
      options: [
        {value: 'out', text: {en: 'Yes, still out', es: 'Sí, sigue fuera', fr: 'Oui, encore déplacée', ru: 'Да, всё ещё не на месте', ar: 'نعم، ما زالت خارج مكانها', zh: '是，还在外面'}},
        {value: 'back', text: {en: 'No, it went back by itself', es: 'No, volvió sola a su sitio', fr: 'Non, elle est revenue toute seule', ru: 'Нет, встала на место сама', ar: 'لا، عادت وحدها', zh: '没有，已经自己回去了'}},
        {value: 'unsure', text: {en: 'Not sure', es: 'No lo sé', fr: 'Je ne sais pas', ru: 'Не уверен', ar: 'لست متأكدًا', zh: '不确定'}}
      ]
    },
    {
      id: 'swelling',
      text: {en: 'Did the knee swell up a lot within a few hours?', es: '¿La rodilla se hinchó mucho en pocas horas?', fr: 'Le genou a-t-il beaucoup gonflé en quelques heures ?', ru: 'Сильно ли распухло колено за несколько часов?', ar: 'هل تورمت الركبة كثيرًا خلال ساعات قليلة؟', zh: '几小时内膝盖肿得很厉害吗？'},
      options: [
        {value: 'yes', text: {en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', ar: 'نعم', zh: '是'}},
        {value: 'no', text: {en: 'No, only a little', es: 'No, solo un poco', fr: 'Non, seulement un peu', ru: 'Нет, совсем немного', ar: 'لا، قليلًا فقط', zh: '没有，只肿了一点'}}
      ]
    },
    {
      id: 'locking',
      text: {
        en: 'Does the knee lock, catch, or feel like something loose is inside?',
        es: '¿La rodilla se bloquea, se engancha o parece que hay algo suelto dentro?',
        fr: 'Le genou se bloque-t-il, accroche-t-il, ou as-tu l’impression qu’un morceau bouge à l’intérieur ?',
        ru: 'Колено блокируется, заедает, или кажется, что внутри что-то болтается?',
        ar: 'هل تنقفل الركبة أو تعلق، أو تشعر كأن شيئًا مفكوكًا بداخلها؟',
        zh: '膝盖会卡住、弹响，或者感觉里面有东西松了吗？'
      },
      options: [
        {value: 'yes', text: {en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', ar: 'نعم', zh: '会'}},
        {value: 'no', text: {en: 'No', es: 'No', fr: 'Non', ru: 'Нет', ar: 'لا', zh: '不会'}}
      ]
    },
    {
      id: 'before',
      text: {en: 'Has your kneecap dislocated before?', es: '¿Se te ha salido la rótula antes?', fr: 'Ta rotule s’est-elle déjà luxée avant ?', ru: 'У тебя раньше уже был вывих коленной чашечки?', ar: 'هل خُلعت رضفتك من قبل؟', zh: '以前髌骨脱位过吗？'},
      options: [
        {value: 'first', text: {en: 'No, this is the first time', es: 'No, es la primera vez', fr: 'Non, c’est la première fois', ru: 'Нет, это впервые', ar: 'لا، هذه أول مرة', zh: '没有，这是第一次'}},
        {value: 'again', text: {en: 'Yes, it has happened before', es: 'Sí, ya me pasó antes', fr: 'Oui, c’est déjà arrivé', ru: 'Да, такое уже было', ar: 'نعم، حدث ذلك من قبل', zh: '有，以前发生过'}}
      ]
    }
  ],
  // A kneecap dislocation always needs a doctor, even after it pops back,
  // because it can chip bone or cartilage. Big fast swelling or locking are
  // signs that it did.
  assess: function (a) {
    if (a.inPlace === 'out' || a.inPlace === 'unsure') return 'emergency';
    if (a.swelling === 'yes' || a.locking === 'yes') return 'today';
    return 'soon';
  },
  firstAid: [
    {en: 'Stop playing and sit or lie down.', es: 'Deja de jugar y siéntate o acuéstate.', fr: 'Arrête de jouer et assieds-toi ou allonge-toi.', ru: 'Прекрати игру и сядь или ляг.', ar: 'توقف عن اللعب واجلس أو استلقِ.', zh: '马上停止运动，坐下或躺下。'},
    {en: 'Do not push the kneecap back yourself, and do not let others try.', es: 'No vuelvas a meter la rótula tú mismo, y no dejes que otros lo intenten.', fr: 'Ne remets pas la rotule en place toi-même, et ne laisse personne essayer.', ru: 'Не вправляй коленную чашечку сам и не давай другим пытаться.', ar: 'لا تُرجع الرضفة إلى مكانها بنفسك، ولا تدع غيرك يحاول.', zh: '不要自己把膝盖骨推回去，也不要让别人帮你推。'},
    {en: 'Support the knee in the position that hurts least, with a pillow or rolled jacket.', es: 'Sujeta la rodilla en la posición que menos duela, con una almohada o una chaqueta enrollada.', fr: 'Soutiens le genou dans la position la moins douloureuse, avec un oreiller ou une veste roulée.', ru: 'Поддержи колено в положении, где меньше всего болит, подушкой или свёрнутой курткой.', ar: 'اسنِد الركبة في الوضع الأقل ألمًا، بوسادة أو سترة ملفوفة.', zh: '用枕头或卷起来的衣服垫着，让膝盖保持在最不疼的姿势。'},
    {en: 'Ice for 15–20 minutes with a cloth between the ice and the skin.', es: 'Pon hielo 15–20 minutos con un paño entre el hielo y la piel.', fr: 'Glace 15 à 20 minutes avec un tissu entre la glace et la peau.', ru: 'Лёд на 15–20 минут через ткань между льдом и кожей.', ar: 'ضع الثلج 15–20 دقيقة مع قطعة قماش بين الثلج والجلد.', zh: '冰敷 15–20 分钟，冰袋外面包一层毛巾。'},
    {en: 'Do not walk on it. Use crutches or get help.', es: 'No camines con ella. Usa muletas o pide ayuda.', fr: 'Ne marche pas dessus. Utilise des béquilles ou fais-toi aider.', ru: 'Не наступай на ногу. Используй костыли или попроси помощи.', ar: 'لا تمشِ عليها. استخدم العكازات أو اطلب المساعدة.', zh: '不要用这条腿走路，用拐杖或让别人扶。'}
  ],
  where: {
    emergency: [
      {en: 'Emergency room (ER) now. Call 911 (US) / 120 (China) if you cannot get there without walking on the leg.', es: 'Urgencias ahora. Llama al 911 (EE. UU.) / 120 (China) si no puedes llegar sin caminar con esa pierna.', fr: 'Urgences maintenant. Appelle le 911 (États-Unis) / 120 (Chine) si tu ne peux pas y aller sans marcher sur la jambe.', ru: 'В приёмное отделение прямо сейчас. Звони 911 (США) / 120 (Китай), если не можешь добраться туда, не наступая на ногу.', ar: 'قسم الطوارئ الآن. اتصل بـ 911 (الولايات المتحدة) / 120 (الصين) إذا لم تستطع الوصول دون المشي على الساق.', zh: '马上去急诊。如果不走路就没法到医院，打 120（中国）/ 911（美国）。'},
      {en: 'A doctor will put the kneecap back and take an X-ray.', es: 'Un médico volverá a colocar la rótula y hará una radiografía.', fr: 'Un médecin remettra la rotule en place et fera une radio.', ru: 'Врач вправит коленную чашечку и сделает рентген.', ar: 'سيُرجع الطبيب الرضفة إلى مكانها ويجري صورة أشعة.', zh: '医生会把膝盖骨复位，并拍 X 光片。'}
    ],
    today: [
      {en: 'Today: the ER or orthopedics for an X-ray. Big swelling or locking can mean a piece of bone or cartilage broke off.', es: 'Hoy: urgencias o traumatología para una radiografía. Mucha hinchazón o bloqueo puede significar que se rompió un trozo de hueso o cartílago.', fr: 'Aujourd’hui : les urgences ou l’orthopédie pour une radio. Un gros gonflement ou un blocage peut vouloir dire qu’un morceau d’os ou de cartilage s’est détaché.', ru: 'Сегодня: приёмное отделение или травматолог-ортопед для рентгена. Сильный отёк или блокировка могут значить, что откололся кусочек кости или хряща.', ar: 'اليوم: قسم الطوارئ أو جراحة العظام لصورة أشعة. التورم الكبير أو انقفال الركبة قد يعني انفصال قطعة من العظم أو الغضروف.', zh: '今天去急诊或骨科拍 X 光片。肿得厉害或膝盖卡住，可能是有骨头或软骨碎片掉下来了。'},
      {en: 'You may need an MRI. Ask to be seen by sports medicine or a knee specialist.', es: 'Puede que necesites una resonancia magnética. Pide que te vea medicina deportiva o un especialista de rodilla.', fr: 'Tu auras peut-être besoin d’une IRM. Demande à voir un médecin du sport ou un spécialiste du genou.', ru: 'Возможно, понадобится МРТ. Попроси, чтобы тебя посмотрел спортивный врач или специалист по коленям.', ar: 'قد تحتاج إلى تصوير بالرنين المغناطيسي. اطلب أن يفحصك طبيب الطب الرياضي أو أخصائي الركبة.', zh: '可能需要做核磁共振（MRI）。可以要求挂运动医学科或膝关节专科。'}
    ],
    soon: [
      {en: 'Within 1–2 days: orthopedics or sports medicine, even if the knee feels fine. It still needs an X-ray.', es: 'En 1–2 días: traumatología o medicina deportiva, aunque la rodilla se sienta bien. Igual necesita una radiografía.', fr: 'Dans 1 à 2 jours : orthopédie ou médecine du sport, même si le genou va bien. Il faut quand même une radio.', ru: 'В течение 1–2 дней: травматолог-ортопед или спортивный врач, даже если колено в порядке. Рентген всё равно нужен.', ar: 'خلال 1–2 يوم: جراحة العظام أو الطب الرياضي، حتى لو بدت الركبة بخير. ما زالت تحتاج إلى صورة أشعة.', zh: '1–2 天内挂骨科或运动医学科，就算膝盖感觉没事也要去，还是需要拍 X 光片。'}
    ]
  },
  // Extra advice that depends on a specific answer rather than the level.
  extraWhere: function (a) {
    if (a.before !== 'again') return [];
    return [{
      en: 'Because it has happened before, ask a sports medicine surgeon whether surgery to stabilize the kneecap makes sense.',
      es: 'Como ya te pasó antes, pregunta a un cirujano de medicina deportiva si conviene una operación para estabilizar la rótula.',
      fr: 'Comme c’est déjà arrivé, demande à un chirurgien du sport si une opération pour stabiliser la rotule serait utile.',
      ru: 'Раз такое уже было, спроси спортивного хирурга, есть ли смысл в операции, чтобы стабилизировать коленную чашечку.',
      ar: 'لأن ذلك حدث من قبل، اسأل جرّاح الطب الرياضي إن كانت جراحة لتثبيت الرضفة مناسبة لك.',
      zh: '因为不是第一次了，可以问问运动医学科的医生，是否需要做稳定髌骨的手术。'
    }];
  },
  rehabNote: {
    en: 'Start only after a doctor has checked the knee. Timing varies a lot; follow your doctor or physical therapist.',
    es: 'Empieza solo después de que un médico revise la rodilla. Los tiempos varían mucho; sigue a tu médico o fisioterapeuta.',
    fr: 'Commence seulement après qu’un médecin a examiné le genou. Les délais varient beaucoup ; suis ton médecin ou ton kiné.',
    ru: 'Начинай только после осмотра колена врачом. Сроки очень разные; следуй указаниям врача или реабилитолога.',
    ar: 'ابدأ فقط بعد أن يفحص الطبيب الركبة. التوقيت يختلف كثيرًا؛ اتبع طبيبك أو أخصائي العلاج الطبيعي.',
    zh: '要等医生检查过膝盖以后再开始。每个人恢复时间差别很大，以医生或康复师的安排为准。'
  },
  rehab: [
    {
      when: {en: 'Weeks 0–2', es: 'Semanas 0–2', fr: 'Semaines 0 à 2', ru: 'Недели 0–2', ar: 'الأسابيع 0–2', zh: '第 0–2 周'},
      days: [0, 14],
      goal: {en: 'Protect the knee, keep the thigh working', es: 'Proteger la rodilla, mantener el muslo activo', fr: 'Protéger le genou, faire travailler la cuisse', ru: 'Защитить колено, сохранить работу бедра', ar: 'احمِ الركبة، وأبقِ الفخذ يعمل', zh: '保护膝盖，保持大腿肌肉不萎缩'},
      moves: [
        {en: 'Wear the brace and use crutches as the doctor says.', es: 'Usa la rodillera y las muletas como diga el médico.', fr: 'Porte l’attelle et utilise les béquilles comme le médecin l’a dit.', ru: 'Носи ортез и используй костыли, как сказал врач.', ar: 'البس الدعامة واستخدم العكازات كما يقول الطبيب.', zh: '按医生说的戴护具、用拐杖。'},
        {en: 'Quad sets: tighten the front of the thigh for 5 seconds, 20 times.', es: 'Contracciones de cuádriceps: aprieta la parte delantera del muslo 5 segundos, 20 veces.', fr: 'Contractions du quadriceps : serre l’avant de la cuisse 5 secondes, 20 fois.', ru: 'Напряжение квадрицепса: напрягай переднюю поверхность бедра на 5 секунд, 20 раз.', ar: 'شدّ عضلة الفخذ: شدّ مقدمة الفخذ 5 ثوانٍ، 20 مرة.', zh: '股四头肌收缩：绷紧大腿前侧 5 秒，做 20 次。'},
        {en: 'Straight leg raises lying down: 3 sets of 10.', es: 'Elevaciones de pierna recta acostado: 3 series de 10.', fr: 'Élévations jambe tendue, allongé : 3 séries de 10.', ru: 'Подъёмы прямой ноги лёжа: 3 подхода по 10.', ar: 'رفع الساق المستقيمة مستلقيًا: 3 مجموعات من 10.', zh: '躺着直腿抬高：3 组，每组 10 下。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', es: 'Semanas 2–6', fr: 'Semaines 2 à 6', ru: 'Недели 2–6', ar: 'الأسابيع 2–6', zh: '第 2–6 周'},
      days: [14, 42],
      goal: {en: 'Bend the knee again', es: 'Volver a doblar la rodilla', fr: 'Plier à nouveau le genou', ru: 'Снова сгибать колено', ar: 'ثني الركبة من جديد', zh: '恢复弯曲角度'},
      moves: [
        {en: 'Bend the knee a little more each day, only as far as it does not hurt.', es: 'Dobla la rodilla un poco más cada día, solo hasta donde no duela.', fr: 'Plie le genou un peu plus chaque jour, seulement tant que ça ne fait pas mal.', ru: 'Сгибай колено каждый день чуть больше, только пока не больно.', ar: 'اثنِ الركبة أكثر قليلًا كل يوم، فقط إلى الحد الذي لا يؤلم.', zh: '每天多弯一点，只弯到不疼的位置。'},
        {en: 'Glute bridges and side-lying leg raises to strengthen the hips.', es: 'Puentes de glúteo y elevaciones de pierna de lado para fortalecer las caderas.', fr: 'Ponts fessiers et élévations de jambe sur le côté pour renforcer les hanches.', ru: 'Ягодичный мостик и подъёмы ноги лёжа на боку для укрепления бёдер.', ar: 'جسر الأرداف ورفع الساق على الجانب لتقوية الوركين.', zh: '臀桥、侧躺抬腿，加强髋部力量。'},
        {en: 'Stationary bike with low resistance.', es: 'Bicicleta estática con poca resistencia.', fr: 'Vélo d’appartement avec peu de résistance.', ru: 'Велотренажёр с малым сопротивлением.', ar: 'دراجة ثابتة بمقاومة منخفضة.', zh: '低阻力骑固定自行车。'}
      ]
    },
    {
      when: {en: 'Weeks 6–12', es: 'Semanas 6–12', fr: 'Semaines 6 à 12', ru: 'Недели 6–12', ar: 'الأسابيع 6–12', zh: '第 6–12 周'},
      days: [42, 84],
      goal: {en: 'Build strength', es: 'Ganar fuerza', fr: 'Gagner en force', ru: 'Набрать силу', ar: 'بناء القوة', zh: '增强力量'},
      moves: [
        {en: 'Mini squats, step-ups, wall sits.', es: 'Mini sentadillas, subir escalones, sentadilla en la pared.', fr: 'Mini-squats, montées de marche, chaise contre le mur.', ru: 'Неглубокие приседания, шаги на ступеньку, стульчик у стены.', ar: 'قرفصاء صغيرة، وصعود الدرج، والجلوس على الحائط.', zh: '小幅度深蹲、上台阶、靠墙静蹲。'},
        {en: 'Stand on the injured leg for 30 seconds.', es: 'Apóyate sobre la pierna lesionada 30 segundos.', fr: 'Tiens-toi sur la jambe blessée pendant 30 secondes.', ru: 'Стой на травмированной ноге 30 секунд.', ar: 'قف على الساق المصابة 30 ثانية.', zh: '受伤的腿单脚站 30 秒。'}
      ]
    },
    {
      when: {en: 'Month 3 onward', es: 'Desde el mes 3', fr: 'À partir du 3e mois', ru: 'С 3-го месяца', ar: 'من الشهر 3 فصاعدًا', zh: '第 3 个月以后'},
      goal: {en: 'Back to sport when the injured leg is about as strong as the other and your doctor agrees', es: 'Vuelve al deporte cuando la pierna lesionada tenga casi la misma fuerza que la otra y tu médico esté de acuerdo', fr: 'Retour au sport quand la jambe blessée est à peu près aussi forte que l’autre et que ton médecin est d’accord', ru: 'Возвращение в спорт, когда травмированная нога почти так же сильна, как другая, и врач согласен', ar: 'العودة إلى الرياضة عندما تصبح الساق المصابة قوية تقريبًا مثل الأخرى ويوافق طبيبك', zh: '受伤的腿力量接近另一条腿，并且医生同意后，再恢复运动'},
      moves: [
        {en: 'Jogging, then jumping and quick changes of direction.', es: 'Trotar, después saltos y cambios rápidos de dirección.', fr: 'Footing, puis sauts et changements de direction rapides.', ru: 'Бег, затем прыжки и быстрые смены направления.', ar: 'الهرولة، ثم القفز وتغيير الاتجاه بسرعة.', zh: '先慢跑，再练跳跃和快速变向。'},
        {en: 'Keep doing hip and thigh strength work, which helps stop it from happening again.', es: 'Sigue trabajando la fuerza de cadera y muslo; ayuda a que no vuelva a pasar.', fr: 'Continue le renforcement des hanches et des cuisses : ça aide à éviter que ça recommence.', ru: 'Продолжай укреплять бёдра и мышцы ног, это помогает избежать повторения.', ar: 'واصل تمارين تقوية الورك والفخذ، فهي تساعد على منع تكرار الإصابة.', zh: '继续练髋部和大腿力量，可以减少再次脱位。'}
      ]
    }
  ]
};

var OTHER_SPRAIN = {
  id: 'sprain',
  name: {en: 'Other sprain', es: 'Otro esguince', fr: 'Autre entorse', ru: 'Другое растяжение', ar: 'التواء آخر', zh: '其他部位扭伤'},
  hint: {en: 'Knee, wrist, thumb, elbow…', es: 'Rodilla, muñeca, pulgar, codo…', fr: 'Genou, poignet, pouce, coude…', ru: 'Колено, запястье, большой палец, локоть…', ar: 'الركبة، الرسغ، الإبهام، المرفق…', zh: '膝盖、手腕、拇指、手肘……'},
  questions: [
    {
      id: 'deformity',
      text: {en: 'Does the joint look out of shape, or is the hand or foot beyond it numb, cold or pale?', es: '¿La articulación se ve deformada, o la mano o el pie de más allá está dormido, frío o pálido?', fr: 'L’articulation est-elle déformée, ou la main ou le pied au-delà est-il engourdi, froid ou pâle ?', ru: 'Сустав выглядит деформированным, или кисть или стопа за ним онемела, холодная или бледная?', ar: 'هل يبدو المفصل مشوّه الشكل، أو اليد أو القدم بعده مخدّرة أو باردة أو شاحبة؟', zh: '关节看起来变形了吗？或者远端的手脚发麻、发凉、发白？'},
      options: YES_NO
    },
    {
      id: 'use',
      text: {en: 'Can you use it (stand on the leg, grip with the hand)?', es: '¿Puedes usarla (apoyarte en la pierna, agarrar con la mano)?', fr: 'Peux-tu t’en servir (tenir debout sur la jambe, serrer avec la main) ?', ru: 'Можешь им пользоваться (стоять на ноге, сжимать рукой)?', ar: 'هل تستطيع استخدامه (الوقوف على الساق، الإمساك باليد)؟', zh: '还能用吗？（腿能站、手能握）'},
      options: [
        {value: 'yes', text: {en: 'Yes, almost normally', es: 'Sí, casi con normalidad', fr: 'Oui, presque normalement', ru: 'Да, почти как обычно', ar: 'نعم، بشكل شبه طبيعي', zh: '能，差不多正常'}},
        {value: 'pain', text: {en: 'Yes, but it hurts', es: 'Sí, pero duele', fr: 'Oui, mais ça fait mal', ru: 'Да, но больно', ar: 'نعم، لكنه يؤلم', zh: '能，但很疼'}},
        {value: 'no', text: {en: 'No', es: 'No', fr: 'Non', ru: 'Нет', ar: 'لا', zh: '不能'}}
      ]
    },
    {
      id: 'pop',
      text: {en: 'Did you hear or feel a "pop" when it happened, or does the joint give way?', es: '¿Oíste o sentiste un "pop" cuando pasó, o la articulación falla?', fr: 'As-tu entendu ou senti un « pop » au moment de la blessure, ou l’articulation lâche-t-elle ?', ru: 'Ты слышал или почувствовал «щелчок» в момент травмы, или сустав подкашивается?', ar: 'هل سمعت أو شعرت بـ«طقّة» عند حدوث الإصابة، أو هل يخذلك المفصل؟', zh: '受伤时听到或感觉到“啪”的一声吗？或者关节会突然软掉、站不稳？'},
      options: YES_NO
    },
    {
      id: 'swelling',
      text: {en: 'How much swelling or bruising is there?', es: '¿Cuánta hinchazón o moratón hay?', fr: 'Quel est le gonflement ou le bleu ?', ru: 'Насколько сильный отёк или синяк?', ar: 'ما مقدار التورم أو الكدمات؟', zh: '肿胀或淤青有多严重？'},
      options: [
        {value: 'mild', text: {en: 'Little or none', es: 'Poco o nada', fr: 'Peu ou pas du tout', ru: 'Слабый или нет', ar: 'قليل أو لا شيء', zh: '很轻或没有'}},
        {value: 'moderate', text: {en: 'Clearly swollen', es: 'Claramente hinchado', fr: 'Nettement gonflé', ru: 'Заметный отёк', ar: 'متورم بوضوح', zh: '明显肿了'}},
        {value: 'severe', text: {en: 'Very swollen within hours', es: 'Muy hinchado en pocas horas', fr: 'Très gonflé en quelques heures', ru: 'Сильный отёк за несколько часов', ar: 'متورم جدًا خلال ساعات', zh: '几小时内肿得很厉害'}}
      ]
    }
  ],
  // A pop or giving way can mean a torn ligament (in the knee, often the ACL),
  // which needs an exam but is not an emergency.
  assess: function (a) {
    if (a.deformity === 'yes') return 'emergency';
    if (a.use === 'no') return 'today';
    if (a.pop === 'yes' || a.use === 'pain' || a.swelling !== 'mild') return 'soon';
    return 'selfCare';
  },
  firstAid: [STOP, ICE, COMPRESS, ELEVATE, NO_HEAT],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Do not try to straighten the joint yourself.', es: 'No intentes enderezar la articulación tú mismo.', fr: 'N’essaie pas de redresser l’articulation toi-même.', ru: 'Не пытайся выпрямить сустав сам.', ar: 'لا تحاول تقويم المفصل بنفسك.', zh: '不要自己尝试把关节掰正。'}],
    today: [
      {en: 'Today: urgent care or the ER for an X-ray, to rule out a broken bone.', es: 'Hoy: una clínica de atención inmediata o urgencias para una radiografía, para descartar una fractura.', fr: 'Aujourd’hui : un centre de soins sans rendez-vous ou les urgences pour une radio, pour écarter une fracture.', ru: 'Сегодня: травмпункт или приёмное отделение для рентгена, чтобы исключить перелом.', ar: 'اليوم: عيادة الرعاية العاجلة أو قسم الطوارئ لصورة أشعة، لاستبعاد الكسر.', zh: '今天去急诊或骨科门诊拍 X 光片，排除骨折。'},
      {en: 'Support it with a sling or crutches until it has been checked.', es: 'Sujétala con un cabestrillo o usa muletas hasta que la revisen.', fr: 'Soutiens-la avec une écharpe ou des béquilles jusqu’à ce qu’on l’ait examinée.', ru: 'Поддерживай его косынкой или костылями, пока его не осмотрят.', ar: 'اسنِده بحمّالة ذراع أو عكازات حتى يُفحص.', zh: '检查之前，用三角巾吊着手臂或用拐杖，不要让它受力。'}
    ],
    soon: [
      {en: 'Within a few days: a sports medicine doctor or orthopedics.', es: 'En unos días: un médico de medicina deportiva o traumatología.', fr: 'Dans les prochains jours : un médecin du sport ou un orthopédiste.', ru: 'В ближайшие дни: спортивный врач или травматолог-ортопед.', ar: 'خلال أيام قليلة: طبيب الطب الرياضي أو جراحة العظام.', zh: '几天内挂运动医学科或骨科。'},
      {en: 'A pop with fast swelling, especially in the knee, can mean a torn ligament such as the ACL. Ask whether you need an MRI.', es: 'Un pop con hinchazón rápida, sobre todo en la rodilla, puede significar un ligamento roto como el LCA. Pregunta si necesitas una resonancia.', fr: 'Un « pop » avec un gonflement rapide, surtout au genou, peut signaler une rupture de ligament comme le LCA. Demande si tu as besoin d’une IRM.', ru: 'Щелчок с быстрым отёком, особенно в колене, может означать разрыв связки, например передней крестообразной. Спроси, нужна ли МРТ.', ar: 'الطقّة مع تورم سريع، خصوصًا في الركبة، قد تعني تمزق رباط مثل الرباط الصليبي الأمامي. اسأل إن كنت تحتاج إلى رنين مغناطيسي.', zh: '“啪”的一声加上很快肿起来，尤其是在膝盖，可能是韧带撕裂（比如前交叉韧带）。问医生是否需要做核磁共振（MRI）。'}
    ],
    selfCare: [
      {en: 'No visit needed right now.', es: 'Ahora no hace falta ir al médico.', fr: 'Pas besoin de consulter pour l’instant.', ru: 'Сейчас к врачу идти не нужно.', ar: 'لا حاجة إلى زيارة الآن.', zh: '现在不需要去医院。'},
      {en: 'If it is not clearly better in a week, see a sports medicine doctor.', es: 'Si no mejora claramente en una semana, ve a un médico de medicina deportiva.', fr: 'Si ce n’est pas nettement mieux dans une semaine, consulte un médecin du sport.', ru: 'Если через неделю не станет заметно лучше, обратись к спортивному врачу.', ar: 'إذا لم يتحسن بوضوح خلال أسبوع، فراجع طبيب الطب الرياضي.', zh: '如果一周内没有明显好转，挂运动医学科。'}
    ]
  },
  rehabNote: {en: 'A torn knee ligament needs its own plan from a doctor or physical therapist.', es: 'Un ligamento de rodilla roto necesita un plan propio de un médico o fisioterapeuta.', fr: 'Une rupture d’un ligament du genou demande un programme à part, fait par un médecin ou un kiné.', ru: 'При разрыве связки колена нужен отдельный план от врача или реабилитолога.', ar: 'تمزق رباط الركبة يحتاج إلى خطة خاصة من طبيب أو أخصائي علاج طبيعي.', zh: '如果是膝盖韧带撕裂，需要医生或康复师单独制定计划。'},
  rehab: [
    {
      when: {en: 'Days 0–3', es: 'Días 0–3', fr: 'Jours 0 à 3', ru: 'Дни 0–3', ar: 'الأيام 0–3', zh: '第 0–3 天'},
      days: [0, 3],
      goal: {en: 'Calm the swelling', es: 'Calmar la hinchazón', fr: 'Calmer le gonflement', ru: 'Снять отёк', ar: 'تهدئة التورم', zh: '消肿'},
      moves: [
        {en: 'Rest, ice and raise it (see above).', es: 'Reposo, hielo y elevación (ver arriba).', fr: 'Repos, glace et surélévation (voir plus haut).', ru: 'Покой, лёд и приподнятое положение (см. выше).', ar: 'الراحة والثلج والرفع (انظر أعلاه).', zh: '休息、冰敷、抬高（见上面）。'},
        {en: 'Gently move the joint where it does not hurt, several times a day.', es: 'Mueve la articulación con suavidad donde no duela, varias veces al día.', fr: 'Bouge doucement l’articulation là où ça ne fait pas mal, plusieurs fois par jour.', ru: 'Осторожно двигай суставом там, где не больно, несколько раз в день.', ar: 'حرّك المفصل برفق في المدى الذي لا يؤلم، عدة مرات في اليوم.', zh: '在不疼的范围内轻轻活动关节，一天几次。'}
      ]
    },
    {
      when: {en: 'Days 3–14', es: 'Días 3–14', fr: 'Jours 3 à 14', ru: 'Дни 3–14', ar: 'الأيام 3–14', zh: '第 3–14 天'},
      days: [3, 14],
      goal: {en: 'Get the full range of motion back', es: 'Recuperar todo el movimiento', fr: 'Retrouver toute l’amplitude', ru: 'Вернуть полный объём движений', ar: 'استعادة مدى الحركة الكامل', zh: '恢复活动范围'},
      moves: [
        {en: 'Bend and straighten the joint a little further each day.', es: 'Dobla y estira la articulación un poco más cada día.', fr: 'Plie et tends l’articulation un peu plus loin chaque jour.', ru: 'Сгибай и разгибай сустав каждый день чуть дальше.', ar: 'اثنِ المفصل ومدّه أكثر قليلًا كل يوم.', zh: '每天多弯一点、多伸直一点。'},
        {en: 'Use it for daily tasks as pain allows.', es: 'Úsala en las tareas diarias según lo permita el dolor.', fr: 'Sers-t’en pour les gestes du quotidien autant que la douleur le permet.', ru: 'Пользуйся им в обычных делах, насколько позволяет боль.', ar: 'استخدمه في المهام اليومية بقدر ما يسمح الألم.', zh: '在疼痛允许的范围内，日常生活正常使用。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', es: 'Semanas 2–6', fr: 'Semaines 2 à 6', ru: 'Недели 2–6', ar: 'الأسابيع 2–6', zh: '第 2–6 周'},
      days: [14, 42],
      goal: {en: 'Strength and control', es: 'Fuerza y control', fr: 'Force et contrôle', ru: 'Сила и контроль', ar: 'القوة والتحكم', zh: '力量和控制'},
      moves: [
        {en: 'Resistance band exercises in every direction the joint moves, 3 sets of 10–15.', es: 'Ejercicios con banda elástica en todas las direcciones en que se mueve la articulación, 3 series de 10–15.', fr: 'Exercices à l’élastique dans tous les sens où l’articulation bouge, 3 séries de 10 à 15.', ru: 'Упражнения с резиновой лентой во всех направлениях, в которых двигается сустав, 3 подхода по 10–15.', ar: 'تمارين شريط المقاومة في كل اتجاه يتحرك فيه المفصل، 3 مجموعات من 10–15.', zh: '用弹力带往关节能动的每个方向练习，每个方向 3 组，每组 10–15 下。'},
        {en: 'Balance work: single-leg stance for the knee, weight-bearing on hands for the wrist.', es: 'Trabajo de equilibrio: apoyo en una pierna para la rodilla, apoyar peso en las manos para la muñeca.', fr: 'Équilibre : appui sur une jambe pour le genou, appui sur les mains pour le poignet.', ru: 'Равновесие: стойка на одной ноге для колена, опора на руки для запястья.', ar: 'تمارين التوازن: الوقوف على ساق واحدة للركبة، وحمل الوزن على اليدين للرسغ.', zh: '平衡练习：膝盖练单脚站，手腕练撑地承重。'}
      ]
    },
    {
      when: {en: 'Back to sport', es: 'Volver al deporte', fr: 'Retour au sport', ru: 'Возвращение в спорт', ar: 'العودة إلى الرياضة', zh: '恢复运动'},
      goal: {en: 'Ready when it is pain-free and about as strong as the other side', es: 'Listo cuando no duela y tenga casi la misma fuerza que el otro lado', fr: 'Prêt quand il n’y a plus de douleur et que c’est à peu près aussi fort que l’autre côté', ru: 'Готов, когда нет боли и сила почти как с другой стороны', ar: 'جاهز عندما يكون بلا ألم وقويًا تقريبًا مثل الجانب الآخر', zh: '不疼了、力量接近另一侧，就可以恢复运动'},
      moves: [
        {en: 'Sport-specific drills at increasing speed.', es: 'Ejercicios propios de tu deporte cada vez más rápidos.', fr: 'Exercices propres à ton sport, de plus en plus vite.', ru: 'Упражнения для твоего вида спорта с нарастающей скоростью.', ar: 'تمارين خاصة برياضتك بسرعة متزايدة.', zh: '做专项动作练习，逐渐加快速度。'},
        {en: 'Tape or a brace for the first weeks back.', es: 'Vendaje o rodillera/muñequera las primeras semanas de vuelta.', fr: 'Strapping ou attelle pendant les premières semaines de reprise.', ru: 'Тейп или ортез в первые недели после возвращения.', ar: 'شريط لاصق أو دعامة في الأسابيع الأولى بعد العودة.', zh: '恢复运动的前几周，用肌贴或护具保护。'}
      ]
    }
  ]
};

var MUSCLE_STRAIN = {
  id: 'strain',
  name: {en: 'Muscle strain', es: 'Distensión muscular', fr: 'Élongation ou déchirure musculaire', ru: 'Растяжение мышцы', ar: 'شدّ عضلي', zh: '拉伤'},
  hint: {en: 'Pulled muscle or tendon: thigh, calf, groin…', es: 'Tirón de músculo o tendón: muslo, pantorrilla, ingle…', fr: 'Muscle ou tendon tiré : cuisse, mollet, aine…', ru: 'Потянул мышцу или сухожилие: бедро, икра, пах…', ar: 'شدّ في عضلة أو وتر: الفخذ، الساق، أصل الفخذ…', zh: '肌肉或肌腱拉伤：大腿、小腿、腹股沟……'},
  questions: [
    {
      id: 'achilles',
      text: {en: 'Is it at the back of the ankle (Achilles tendon), and you cannot rise up on your toes on that leg?', es: '¿Es en la parte de atrás del tobillo (tendón de Aquiles) y no puedes ponerte de puntillas con esa pierna?', fr: 'Est-ce à l’arrière de la cheville (tendon d’Achille), et tu ne peux pas te mettre sur la pointe des pieds sur cette jambe ?', ru: 'Это сзади лодыжки (ахиллово сухожилие), и ты не можешь подняться на носок на этой ноге?', ar: 'هل هو في مؤخرة الكاحل (وتر العرقوب)، ولا تستطيع الوقوف على أطراف أصابعك على تلك الساق؟', zh: '是脚后跟上方（跟腱）的位置，而且这条腿踮不起脚尖吗？'},
      options: YES_NO
    },
    {
      id: 'gap',
      text: {en: 'Can you see or feel a dent or gap in the muscle?', es: '¿Puedes ver o notar un hundimiento o hueco en el músculo?', fr: 'Vois-tu ou sens-tu un creux ou un trou dans le muscle ?', ru: 'Видишь или чувствуешь вмятину или провал в мышце?', ar: 'هل ترى أو تتحسس انخفاضًا أو فجوة في العضلة؟', zh: '肌肉上能看到或摸到凹陷、断开的地方吗？'},
      options: YES_NO
    },
    {
      id: 'use',
      text: {en: 'Can you walk or use the muscle?', es: '¿Puedes caminar o usar el músculo?', fr: 'Peux-tu marcher ou utiliser le muscle ?', ru: 'Можешь ходить или пользоваться мышцей?', ar: 'هل تستطيع المشي أو استخدام العضلة؟', zh: '还能走路或使用这块肌肉吗？'},
      options: [
        {value: 'yes', text: {en: 'Yes, almost normally', es: 'Sí, casi con normalidad', fr: 'Oui, presque normalement', ru: 'Да, почти как обычно', ar: 'نعم، بشكل شبه طبيعي', zh: '能，差不多正常'}},
        {value: 'pain', text: {en: 'Yes, but it hurts', es: 'Sí, pero duele', fr: 'Oui, mais ça fait mal', ru: 'Да, но больно', ar: 'نعم، لكنه يؤلم', zh: '能，但很疼'}},
        {value: 'no', text: {en: 'No', es: 'No', fr: 'Non', ru: 'Нет', ar: 'لا', zh: '不能'}}
      ]
    },
    {
      id: 'bruise',
      text: {en: 'How much swelling or bruising is there?', es: '¿Cuánta hinchazón o moratón hay?', fr: 'Quel est le gonflement ou le bleu ?', ru: 'Насколько сильный отёк или синяк?', ar: 'ما مقدار التورم أو الكدمات؟', zh: '肿胀或淤青有多严重？'},
      options: [
        {value: 'mild', text: {en: 'Little or none', es: 'Poco o nada', fr: 'Peu ou pas du tout', ru: 'Слабый или нет', ar: 'قليل أو لا شيء', zh: '很轻或没有'}},
        {value: 'clear', text: {en: 'Clearly swollen or bruised', es: 'Claramente hinchado o amoratado', fr: 'Nettement gonflé ou avec un bleu', ru: 'Заметный отёк или синяк', ar: 'متورم أو مُكدَّم بوضوح', zh: '明显肿了或有淤青'}},
        {value: 'severe', text: {en: 'Large bruise spreading', es: 'Moratón grande que se extiende', fr: 'Grand bleu qui s’étend', ru: 'Большой расползающийся синяк', ar: 'كدمة كبيرة تنتشر', zh: '大片淤青在扩散'}}
      ]
    }
  ],
  // A torn Achilles or a gap in the muscle can mean a complete tear, which
  // sometimes needs surgery soon.
  assess: function (a) {
    if (a.achilles === 'yes' || a.gap === 'yes' || a.use === 'no') return 'today';
    if (a.use === 'pain' || a.bruise !== 'mild') return 'soon';
    return 'selfCare';
  },
  firstAid: [STOP, ICE, COMPRESS, ELEVATE, NO_HEAT, {en: 'Do not stretch it hard for the first few days.', es: 'No lo estires con fuerza los primeros días.', fr: 'N’étire pas fort pendant les premiers jours.', ru: 'Первые несколько дней не растягивай сильно.', ar: 'لا تمدّها بقوة في الأيام الأولى.', zh: '前几天不要用力拉伸受伤的肌肉。'}],
  where: {
    today: [
      {en: 'Today: urgent care, the ER, or orthopedics. A complete tear (especially the Achilles) may need early treatment.', es: 'Hoy: una clínica de atención inmediata, urgencias o traumatología. Una rotura completa (sobre todo del Aquiles) puede necesitar tratamiento pronto.', fr: 'Aujourd’hui : un centre de soins sans rendez-vous, les urgences ou l’orthopédie. Une rupture complète (surtout du tendon d’Achille) peut demander un traitement rapide.', ru: 'Сегодня: травмпункт, приёмное отделение или травматолог-ортопед. Полный разрыв (особенно ахиллова сухожилия) может требовать раннего лечения.', ar: 'اليوم: عيادة الرعاية العاجلة أو قسم الطوارئ أو جراحة العظام. التمزق الكامل (خصوصًا وتر العرقوب) قد يحتاج إلى علاج مبكر.', zh: '今天去急诊或骨科。完全断裂（尤其是跟腱）可能需要尽早处理。'},
      {en: 'Use crutches and keep weight off it until it has been checked.', es: 'Usa muletas y no apoyes peso hasta que lo revisen.', fr: 'Utilise des béquilles et ne mets pas de poids dessus avant qu’on l’ait examiné.', ru: 'Используй костыли и не нагружай ногу, пока её не осмотрят.', ar: 'استخدم العكازات ولا تضع وزنك عليها حتى تُفحص.', zh: '检查之前用拐杖，不要让它受力。'}
    ],
    soon: [
      {en: 'Within a few days: a sports medicine doctor or a physical therapist.', es: 'En unos días: un médico de medicina deportiva o un fisioterapeuta.', fr: 'Dans les prochains jours : un médecin du sport ou un kiné.', ru: 'В ближайшие дни: спортивный врач или реабилитолог.', ar: 'خلال أيام قليلة: طبيب الطب الرياضي أو أخصائي علاج طبيعي.', zh: '几天内挂运动医学科，或找康复师（物理治疗师）。'}
    ],
    selfCare: [
      {en: 'No visit needed right now.', es: 'Ahora no hace falta ir al médico.', fr: 'Pas besoin de consulter pour l’instant.', ru: 'Сейчас к врачу идти не нужно.', ar: 'لا حاجة إلى زيارة الآن.', zh: '现在不需要去医院。'},
      {en: 'If it is not clearly better in 1–2 weeks, see a sports medicine doctor.', es: 'Si no mejora claramente en 1–2 semanas, ve a un médico de medicina deportiva.', fr: 'Si ce n’est pas nettement mieux dans 1 à 2 semaines, consulte un médecin du sport.', ru: 'Если через 1–2 недели не станет заметно лучше, обратись к спортивному врачу.', ar: 'إذا لم تتحسن بوضوح خلال 1–2 أسبوع، فراجع طبيب الطب الرياضي.', zh: '如果 1–2 周内没有明显好转，挂运动医学科。'}
    ]
  },
  rehabNote: {en: 'Strains come back easily if you return too fast. Move on only when the current stage is pain-free.', es: 'Las distensiones vuelven fácilmente si regresas demasiado rápido. Pasa a la siguiente etapa solo cuando la actual no duela.', fr: 'Ces blessures reviennent facilement si tu reprends trop vite. Passe à l’étape suivante seulement quand l’étape actuelle ne fait plus mal.', ru: 'Растяжения легко повторяются, если вернуться слишком быстро. Переходи дальше, только когда текущий этап проходит без боли.', ar: 'الشدّ العضلي يعود بسهولة إذا رجعت بسرعة. انتقل إلى المرحلة التالية فقط عندما تصبح الحالية بلا ألم.', zh: '拉伤恢复太快很容易再次受伤。当前阶段完全不疼了，再进入下一阶段。'},
  rehab: [
    {
      when: {en: 'Days 0–3', es: 'Días 0–3', fr: 'Jours 0 à 3', ru: 'Дни 0–3', ar: 'الأيام 0–3', zh: '第 0–3 天'},
      days: [0, 3],
      goal: {en: 'Protect it', es: 'Protegerlo', fr: 'Le protéger', ru: 'Защитить', ar: 'احمِها', zh: '保护'},
      moves: [
        {en: 'Rest, ice and gentle walking if it does not hurt.', es: 'Reposo, hielo y caminar suave si no duele.', fr: 'Repos, glace et marche douce si ça ne fait pas mal.', ru: 'Покой, лёд и спокойная ходьба, если не больно.', ar: 'الراحة والثلج والمشي الخفيف إن لم يؤلم.', zh: '休息、冰敷，不疼的话可以慢慢走路。'},
        {en: 'Tighten the muscle gently without moving (5 seconds, 10 times).', es: 'Aprieta el músculo suavemente sin moverlo (5 segundos, 10 veces).', fr: 'Contracte doucement le muscle sans bouger (5 secondes, 10 fois).', ru: 'Мягко напрягай мышцу, не двигаясь (5 секунд, 10 раз).', ar: 'شدّ العضلة برفق دون حركة (5 ثوانٍ، 10 مرات).', zh: '不动关节，轻轻收紧这块肌肉（5 秒，10 次）。'}
      ]
    },
    {
      when: {en: 'Days 3–14', es: 'Días 3–14', fr: 'Jours 3 à 14', ru: 'Дни 3–14', ar: 'الأيام 3–14', zh: '第 3–14 天'},
      days: [3, 14],
      goal: {en: 'Light movement and stretching', es: 'Movimiento suave y estiramientos', fr: 'Mouvements légers et étirements', ru: 'Лёгкие движения и растяжка', ar: 'حركة خفيفة وإطالة', zh: '轻度活动和拉伸'},
      moves: [
        {en: 'Gentle stretches held 20–30 seconds, never into pain.', es: 'Estiramientos suaves de 20–30 segundos, nunca hasta el dolor.', fr: 'Étirements doux tenus 20 à 30 secondes, jamais jusqu’à la douleur.', ru: 'Мягкая растяжка с удержанием 20–30 секунд, никогда до боли.', ar: 'إطالات لطيفة تثبت فيها 20–30 ثانية، دون الوصول إلى الألم أبدًا.', zh: '轻柔拉伸，每次 20–30 秒，不要拉到疼。'},
        {en: 'Light exercise like a stationary bike or swimming.', es: 'Ejercicio ligero como bicicleta estática o natación.', fr: 'Exercice léger comme le vélo d’appartement ou la natation.', ru: 'Лёгкая нагрузка, например велотренажёр или плавание.', ar: 'تمارين خفيفة مثل الدراجة الثابتة أو السباحة.', zh: '骑固定自行车或游泳这类轻运动。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', es: 'Semanas 2–6', fr: 'Semaines 2 à 6', ru: 'Недели 2–6', ar: 'الأسابيع 2–6', zh: '第 2–6 周'},
      days: [14, 42],
      goal: {en: 'Rebuild strength', es: 'Recuperar la fuerza', fr: 'Reconstruire la force', ru: 'Восстановить силу', ar: 'إعادة بناء القوة', zh: '恢复力量'},
      moves: [
        {en: 'Thigh: bridges, then slow hamstring curls. Calf: heel raises. Groin: squeezing a ball between the knees.', es: 'Muslo: puentes, después curl de isquiotibiales lento. Pantorrilla: elevaciones de talones. Ingle: apretar una pelota entre las rodillas.', fr: 'Cuisse : ponts, puis flexions lentes des ischio-jambiers. Mollet : montées sur la pointe des pieds. Aine : serrer un ballon entre les genoux.', ru: 'Бедро: мостик, затем медленные сгибания на заднюю поверхность. Икра: подъёмы на носки. Пах: сжимание мяча между коленями.', ar: 'الفخذ: الجسر، ثم ثني أوتار الركبة ببطء. الساق: رفع الكعبين. أصل الفخذ: ضغط كرة بين الركبتين.', zh: '大腿：臀桥，再做慢速腿弯举。小腿：提踵。腹股沟：双膝夹球。'},
        {en: 'Jog, then run faster, as long as it stays pain-free.', es: 'Trota, después corre más rápido, siempre que no duela.', fr: 'Footing, puis course plus rapide, tant que ça reste sans douleur.', ru: 'Бег трусцой, затем быстрее, пока остаётся без боли.', ar: 'هرول، ثم اركض أسرع، ما دام ذلك بلا ألم.', zh: '先慢跑，不疼的话再逐渐加速。'}
      ]
    },
    {
      when: {en: 'Back to sport', es: 'Volver al deporte', fr: 'Retour au sport', ru: 'Возвращение в спорт', ar: 'العودة إلى الرياضة', zh: '恢复运动'},
      goal: {en: 'Ready when you can sprint and change direction without pain', es: 'Listo cuando puedas esprintar y cambiar de dirección sin dolor', fr: 'Prêt quand tu peux sprinter et changer de direction sans douleur', ru: 'Готов, когда можешь бежать с ускорением и менять направление без боли', ar: 'جاهز عندما تستطيع العدو السريع وتغيير الاتجاه دون ألم', zh: '能全速冲刺、变向都不疼，就可以恢复运动'},
      moves: [
        {en: 'Keep doing strength work twice a week to prevent it happening again.', es: 'Sigue con ejercicios de fuerza dos veces por semana para que no vuelva a pasar.', fr: 'Continue le renforcement deux fois par semaine pour éviter que ça recommence.', ru: 'Продолжай силовые упражнения дважды в неделю, чтобы травма не повторилась.', ar: 'واصل تمارين القوة مرتين في الأسبوع لمنع تكرار الإصابة.', zh: '每周继续做两次力量训练，防止再次拉伤。'},
        {en: 'Warm up properly before every session.', es: 'Calienta bien antes de cada sesión.', fr: 'Échauffe-toi bien avant chaque séance.', ru: 'Хорошо разминайся перед каждой тренировкой.', ar: 'قم بالإحماء جيدًا قبل كل تمرين.', zh: '每次运动前好好热身。'}
      ]
    }
  ]
};

var OTHER_DISLOCATION = {
  id: 'dislocation',
  name: {en: 'Other dislocation', es: 'Otra luxación', fr: 'Autre luxation', ru: 'Другой вывих', ar: 'خلع آخر', zh: '其他关节脱位'},
  hint: {en: 'Shoulder, elbow, finger…', es: 'Hombro, codo, dedo…', fr: 'Épaule, coude, doigt…', ru: 'Плечо, локоть, палец…', ar: 'الكتف، المرفق، الإصبع…', zh: '肩膀、手肘、手指……'},
  questions: [
    {
      id: 'part',
      text: {en: 'Which joint?', es: '¿Qué articulación?', fr: 'Quelle articulation ?', ru: 'Какой сустав?', ar: 'أي مفصل؟', zh: '哪个关节？'},
      options: [
        {value: 'shoulder', text: {en: 'Shoulder or elbow', es: 'Hombro o codo', fr: 'Épaule ou coude', ru: 'Плечо или локоть', ar: 'الكتف أو المرفق', zh: '肩膀或手肘'}},
        {value: 'finger', text: {en: 'Finger or toe', es: 'Dedo de la mano o del pie', fr: 'Doigt ou orteil', ru: 'Палец руки или ноги', ar: 'إصبع اليد أو القدم', zh: '手指或脚趾'}}
      ]
    },
    {
      id: 'inPlace',
      text: {en: 'Is the joint still out of place?', es: '¿La articulación sigue fuera de su sitio?', fr: 'L’articulation est-elle encore déplacée ?', ru: 'Сустав всё ещё не на месте?', ar: 'هل ما زال المفصل خارج مكانه؟', zh: '关节现在还错位着吗？'},
      options: [
        {value: 'out', text: {en: 'Yes, still out', es: 'Sí, sigue fuera', fr: 'Oui, encore déplacée', ru: 'Да, всё ещё не на месте', ar: 'نعم، ما زالت خارج مكانها', zh: '是，还错位着'}},
        {value: 'back', text: {en: 'No, it went back', es: 'No, volvió a su sitio', fr: 'Non, elle est revenue en place', ru: 'Нет, встал на место', ar: 'لا، عاد إلى مكانه', zh: '没有，已经回去了'}},
        {value: 'unsure', text: {en: 'Not sure', es: 'No lo sé', fr: 'Je ne sais pas', ru: 'Не уверен', ar: 'لست متأكدًا', zh: '不确定'}}
      ]
    },
    {
      id: 'numb',
      text: {en: 'Is the arm, hand or finger beyond it numb, cold or pale?', es: '¿El brazo, la mano o el dedo de más allá está dormido, frío o pálido?', fr: 'Le bras, la main ou le doigt au-delà est-il engourdi, froid ou pâle ?', ru: 'Рука, кисть или палец за ним онемели, холодные или бледные?', ar: 'هل الذراع أو اليد أو الإصبع بعده مخدّر أو بارد أو شاحب؟', zh: '远端的手臂、手或手指发麻、发凉、发白吗？'},
      options: YES_NO
    },
    {
      id: 'before',
      text: {en: 'Has this joint dislocated before?', es: '¿Se te ha salido esta articulación antes?', fr: 'Cette articulation s’est-elle déjà luxée avant ?', ru: 'У этого сустава раньше уже был вывих?', ar: 'هل خُلع هذا المفصل من قبل؟', zh: '这个关节以前脱位过吗？'},
      options: [
        {value: 'first', text: {en: 'No, this is the first time', es: 'No, es la primera vez', fr: 'Non, c’est la première fois', ru: 'Нет, это впервые', ar: 'لا، هذه أول مرة', zh: '没有，这是第一次'}},
        {value: 'again', text: {en: 'Yes, it has happened before', es: 'Sí, ya me pasó antes', fr: 'Oui, c’est déjà arrivé', ru: 'Да, такое уже было', ar: 'نعم، حدث ذلك من قبل', zh: '有，以前发生过'}}
      ]
    }
  ],
  // A shoulder or elbow that is still out needs the ER; a finger can wait a
  // few hours. Numbness means a nerve or blood vessel may be pinched.
  assess: function (a) {
    if (a.numb === 'yes') return 'emergency';
    if (a.inPlace !== 'back') return a.part === 'finger' ? 'today' : 'emergency';
    return 'soon';
  },
  firstAid: [
    STOP,
    NO_PUSH_BACK,
    {en: 'Keep it still in the position that hurts least. Support an arm with a sling or against the body.', es: 'Mantenla quieta en la posición que menos duela. Sujeta el brazo con un cabestrillo o pegado al cuerpo.', fr: 'Garde-la immobile dans la position la moins douloureuse. Soutiens un bras avec une écharpe ou contre le corps.', ru: 'Держи его неподвижно в положении, где меньше всего болит. Поддержи руку косынкой или прижми к телу.', ar: 'أبقِه ثابتًا في الوضع الأقل ألمًا. اسنِد الذراع بحمّالة أو إلى الجسم.', zh: '保持在最不疼的姿势不要动。手臂可以用三角巾吊起来，或者贴着身体托住。'},
    {en: 'Take off rings or watches before it swells.', es: 'Quítate anillos o relojes antes de que se hinche.', fr: 'Enlève bagues et montre avant que ça gonfle.', ru: 'Сними кольца или часы, пока не появился отёк.', ar: 'انزع الخواتم أو الساعة قبل أن يتورم.', zh: '趁还没肿，摘掉戒指和手表。'},
    ICE
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'A doctor will put the joint back and take an X-ray.', es: 'Un médico volverá a colocar la articulación y hará una radiografía.', fr: 'Un médecin remettra l’articulation en place et fera une radio.', ru: 'Врач вправит сустав и сделает рентген.', ar: 'سيُرجع الطبيب المفصل إلى مكانه ويجري صورة أشعة.', zh: '医生会把关节复位，并拍 X 光片。'}],
    today: [
      {en: 'Today: urgent care or the ER to put it back and take an X-ray, since a small bone can break too.', es: 'Hoy: una clínica de atención inmediata o urgencias para colocarla y hacer una radiografía, porque también puede romperse un hueso pequeño.', fr: 'Aujourd’hui : un centre de soins sans rendez-vous ou les urgences pour la remettre en place et faire une radio, car un petit os peut aussi être cassé.', ru: 'Сегодня: травмпункт или приёмное отделение, чтобы вправить и сделать рентген, ведь может сломаться и маленькая косточка.', ar: 'اليوم: عيادة الرعاية العاجلة أو قسم الطوارئ لإرجاعه وإجراء صورة أشعة، لأن عظمة صغيرة قد تنكسر أيضًا.', zh: '今天去急诊复位并拍 X 光片，因为小骨头也可能一起骨折。'}
    ],
    soon: [
      {en: 'Within 1–2 days: orthopedics or sports medicine, even if it feels fine. It still needs an X-ray.', es: 'En 1–2 días: traumatología o medicina deportiva, aunque se sienta bien. Igual necesita una radiografía.', fr: 'Dans 1 à 2 jours : orthopédie ou médecine du sport, même si ça va bien. Il faut quand même une radio.', ru: 'В течение 1–2 дней: травматолог-ортопед или спортивный врач, даже если всё в порядке. Рентген всё равно нужен.', ar: 'خلال 1–2 يوم: جراحة العظام أو الطب الرياضي، حتى لو بدا بخير. ما زال يحتاج إلى صورة أشعة.', zh: '1–2 天内挂骨科或运动医学科，就算感觉没事也要去，还是需要拍 X 光片。'}
    ]
  },
  extraWhere: function (a) {
    if (a.before !== 'again') return [];
    return [{
      en: 'Because it has happened before, ask a sports medicine surgeon whether surgery to stabilize the joint makes sense.',
      es: 'Como ya te pasó antes, pregunta a un cirujano de medicina deportiva si conviene una operación para estabilizar la articulación.',
      fr: 'Comme c’est déjà arrivé, demande à un chirurgien du sport si une opération pour stabiliser l’articulation serait utile.',
      ru: 'Раз такое уже было, спроси спортивного хирурга, есть ли смысл в операции, чтобы стабилизировать сустав.',
      ar: 'لأن ذلك حدث من قبل، اسأل جرّاح الطب الرياضي إن كانت جراحة لتثبيت المفصل مناسبة لك.',
      zh: '因为不是第一次了，可以问问运动医学科的医生，是否需要做稳定关节的手术。'
    }];
  },
  rehabNote: {en: 'Start only after a doctor has checked it. A finger usually takes weeks; a shoulder takes months.', es: 'Empieza solo después de que un médico la revise. Un dedo suele tardar semanas; un hombro, meses.', fr: 'Commence seulement après qu’un médecin l’a examinée. Un doigt prend en général des semaines ; une épaule, des mois.', ru: 'Начинай только после осмотра врачом. Палец обычно восстанавливается неделями, плечо — месяцами.', ar: 'ابدأ فقط بعد أن يفحصه الطبيب. الإصبع يحتاج عادةً إلى أسابيع؛ والكتف إلى أشهر.', zh: '要等医生检查过以后再开始。手指一般要几周，肩膀要几个月。'},
  rehab: [
    {
      when: {en: 'Weeks 0–2', es: 'Semanas 0–2', fr: 'Semaines 0 à 2', ru: 'Недели 0–2', ar: 'الأسابيع 0–2', zh: '第 0–2 周'},
      days: [0, 14],
      goal: {en: 'Let it settle', es: 'Dejar que se asiente', fr: 'Laisser se calmer', ru: 'Дать успокоиться', ar: 'دعه يستقر', zh: '让关节稳定下来'},
      moves: [
        {en: 'Shoulder: sling as the doctor says; move the hand and wrist. Finger: tape it to the next finger.', es: 'Hombro: cabestrillo como diga el médico; mueve la mano y la muñeca. Dedo: sujétalo con cinta al dedo de al lado.', fr: 'Épaule : écharpe comme le médecin l’a dit ; bouge la main et le poignet. Doigt : attache-le au doigt d’à côté avec du strap.', ru: 'Плечо: косынка, как сказал врач; двигай кистью и запястьем. Палец: прибинтуй его тейпом к соседнему.', ar: 'الكتف: حمّالة الذراع كما يقول الطبيب؛ حرّك اليد والرسغ. الإصبع: اربطه بالإصبع المجاور بشريط لاصق.', zh: '肩膀：按医生说的戴三角巾，活动手和手腕。手指：和旁边的手指绑在一起。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', es: 'Semanas 2–6', fr: 'Semaines 2 à 6', ru: 'Недели 2–6', ar: 'الأسابيع 2–6', zh: '第 2–6 周'},
      days: [14, 42],
      goal: {en: 'Get movement back', es: 'Recuperar el movimiento', fr: 'Retrouver le mouvement', ru: 'Вернуть движение', ar: 'استعادة الحركة', zh: '恢复活动范围'},
      moves: [
        {en: 'Shoulder: let the arm swing like a pendulum, then slide the hand up a wall.', es: 'Hombro: deja que el brazo se balancee como un péndulo, después desliza la mano hacia arriba por una pared.', fr: 'Épaule : laisse le bras se balancer comme un pendule, puis fais glisser la main vers le haut le long d’un mur.', ru: 'Плечо: дай руке качаться как маятник, затем двигай ладонь вверх по стене.', ar: 'الكتف: دع الذراع تتأرجح مثل البندول، ثم حرّك اليد صعودًا على الحائط.', zh: '肩膀：手臂自然下垂、像钟摆一样晃动，然后练手沿着墙往上爬。'},
        {en: 'Finger: bend and straighten gently many times a day.', es: 'Dedo: dóblalo y estíralo con suavidad muchas veces al día.', fr: 'Doigt : plie et tends doucement, plusieurs fois par jour.', ru: 'Палец: мягко сгибай и разгибай много раз в день.', ar: 'الإصبع: اثنِه ومدّه برفق مرات كثيرة في اليوم.', zh: '手指：一天多次轻轻弯曲、伸直。'}
      ]
    },
    {
      when: {en: 'Weeks 6–12', es: 'Semanas 6–12', fr: 'Semaines 6 à 12', ru: 'Недели 6–12', ar: 'الأسابيع 6–12', zh: '第 6–12 周'},
      days: [42, 84],
      goal: {en: 'Build strength', es: 'Ganar fuerza', fr: 'Gagner en force', ru: 'Набрать силу', ar: 'بناء القوة', zh: '增强力量'},
      moves: [
        {en: 'Shoulder: resistance band rotations in and out, shoulder blade squeezes.', es: 'Hombro: rotaciones hacia dentro y hacia fuera con banda elástica, juntar los omóplatos.', fr: 'Épaule : rotations vers l’intérieur et l’extérieur avec un élastique, serrer les omoplates.', ru: 'Плечо: вращения внутрь и наружу с резиновой лентой, сведение лопаток.', ar: 'الكتف: تدوير إلى الداخل والخارج بشريط المقاومة، وضمّ لوحَي الكتف.', zh: '肩膀：弹力带内旋、外旋，夹肩胛骨。'},
        {en: 'Finger: squeeze a soft ball.', es: 'Dedo: aprieta una pelota blanda.', fr: 'Doigt : serre une balle souple.', ru: 'Палец: сжимай мягкий мячик.', ar: 'الإصبع: اضغط كرة لينة.', zh: '手指：捏软球。'}
      ]
    },
    {
      when: {en: 'Back to sport', es: 'Volver al deporte', fr: 'Retour au sport', ru: 'Возвращение в спорт', ar: 'العودة إلى الرياضة', zh: '恢复运动'},
      goal: {en: 'Ready when it is strong and stable and your doctor agrees', es: 'Listo cuando esté fuerte y estable y tu médico esté de acuerdo', fr: 'Prêt quand c’est fort et stable et que ton médecin est d’accord', ru: 'Готов, когда сустав сильный и стабильный и врач согласен', ar: 'جاهز عندما يكون قويًا وثابتًا ويوافق طبيبك', zh: '力量够了、关节稳定，并且医生同意后，再恢复运动'},
      moves: [
        {en: 'Start with non-contact drills. Tape a finger for the first weeks.', es: 'Empieza con ejercicios sin contacto. Venda el dedo las primeras semanas.', fr: 'Commence par des exercices sans contact. Mets un strap au doigt les premières semaines.', ru: 'Начни с упражнений без контакта. В первые недели тейпируй палец.', ar: 'ابدأ بتمارين بلا احتكاك. اربط الإصبع بشريط لاصق في الأسابيع الأولى.', zh: '先做没有身体接触的练习。手指在前几周要贴扎保护。'}
      ]
    }
  ]
};

var FRACTURE = {
  id: 'fracture',
  name: {en: 'Broken bone', es: 'Hueso roto', fr: 'Fracture', ru: 'Перелом', ar: 'كسر في العظم', zh: '骨折'},
  hint: {en: 'A bone might be cracked or broken', es: 'Un hueso puede estar fisurado o roto', fr: 'Un os est peut-être fêlé ou cassé', ru: 'Кость, возможно, треснула или сломана', ar: 'قد تكون عظمة مشروخة أو مكسورة', zh: '骨头可能裂了或断了'},
  questions: [
    {
      id: 'open',
      text: {en: 'Is a bone poking through the skin, is the limb bent the wrong way, or is the hand or foot beyond it numb, cold or pale?', es: '¿Sale un hueso por la piel, el brazo o la pierna está doblado hacia donde no debe, o la mano o el pie de más allá está dormido, frío o pálido?', fr: 'Un os sort-il de la peau, le membre est-il tordu dans le mauvais sens, ou la main ou le pied au-delà est-il engourdi, froid ou pâle ?', ru: 'Кость торчит из кожи, конечность согнута не в ту сторону, или кисть или стопа за ней онемела, холодная или бледная?', ar: 'هل تبرز عظمة من الجلد، أو الطرف منحنٍ في الاتجاه الخطأ، أو اليد أو القدم بعده مخدّرة أو باردة أو شاحبة؟', zh: '骨头刺破皮肤了吗？肢体弯成了不正常的形状吗？或者远端的手脚发麻、发凉、发白？'},
      options: YES_NO
    },
    {
      id: 'spine',
      text: {en: 'Is it the neck, back, hip or thigh?', es: '¿Es el cuello, la espalda, la cadera o el muslo?', fr: 'Est-ce le cou, le dos, la hanche ou la cuisse ?', ru: 'Это шея, спина, таз или бедро?', ar: 'هل هو في الرقبة أو الظهر أو الورك أو الفخذ؟', zh: '伤的是脖子、背、髋部或大腿吗？'},
      options: YES_NO
    },
    {
      id: 'bonePain',
      text: {en: 'Does pressing on one spot of the bone hurt sharply?', es: '¿Duele mucho al presionar un punto del hueso?', fr: 'Est-ce qu’appuyer sur un point précis de l’os fait très mal ?', ru: 'Больно ли резко, когда давишь на одну точку кости?', ar: 'هل يؤلم الضغط على نقطة واحدة من العظم ألمًا حادًا؟', zh: '按骨头上的某一个点，会剧烈疼痛吗？'},
      options: YES_NO
    },
    {
      id: 'use',
      text: {en: 'Can you move it or put weight on it?', es: '¿Puedes moverlo o apoyar peso?', fr: 'Peux-tu le bouger ou mettre du poids dessus ?', ru: 'Можешь пошевелить или опереться?', ar: 'هل تستطيع تحريكه أو وضع وزنك عليه؟', zh: '还能活动，或者能承重吗？'},
      options: [
        {value: 'yes', text: {en: 'Yes, almost normally', es: 'Sí, casi con normalidad', fr: 'Oui, presque normalement', ru: 'Да, почти как обычно', ar: 'نعم، بشكل شبه طبيعي', zh: '能，差不多正常'}},
        {value: 'no', text: {en: 'No, or only with a lot of pain', es: 'No, o solo con mucho dolor', fr: 'Non, ou seulement avec beaucoup de douleur', ru: 'Нет, или только с сильной болью', ar: 'لا، أو فقط مع ألم شديد', zh: '不能，或者非常疼'}}
      ]
    }
  ],
  // An open or displaced fracture, or a broken neck, back, hip or thigh,
  // needs an ambulance. Anything else that might be broken needs an X-ray.
  assess: function (a) {
    if (a.open === 'yes' || a.spine === 'yes') return 'emergency';
    if (a.bonePain === 'yes' || a.use === 'no') return 'today';
    return 'soon';
  },
  firstAid: [
    {en: 'Do not move the injured part. If the neck or back might be hurt, do not move the person at all.', es: 'No muevas la parte lesionada. Si el cuello o la espalda pueden estar lesionados, no muevas a la persona en absoluto.', fr: 'Ne bouge pas la partie blessée. Si le cou ou le dos peut être touché, ne déplace pas du tout la personne.', ru: 'Не двигай травмированную часть. Если могут быть повреждены шея или спина, вообще не перемещай человека.', ar: 'لا تحرّك الجزء المصاب. إذا كان هناك احتمال إصابة الرقبة أو الظهر، فلا تحرّك الشخص إطلاقًا.', zh: '不要移动受伤的部位。如果可能伤到脖子或背，完全不要移动伤者。'},
    {en: 'Splint it in the position you found it, using something stiff (a board, rolled magazine), covering the joint above and below.', es: 'Inmovilízalo en la posición en que lo encontraste con algo rígido (una tabla, una revista enrollada), cubriendo la articulación de arriba y la de abajo.', fr: 'Immobilise-la dans la position où tu l’as trouvée, avec quelque chose de rigide (une planche, un magazine roulé), en prenant l’articulation au-dessus et en dessous.', ru: 'Зафиксируй в том положении, в каком нашёл, чем-то жёстким (доской, свёрнутым журналом), захватив сустав выше и ниже.', ar: 'ثبّته بجبيرة في الوضع الذي وجدته فيه، باستخدام شيء صلب (لوح، مجلة ملفوفة)، بحيث تغطي المفصل الذي فوقه والذي تحته.', zh: '用硬的东西（木板、卷起来的杂志）按原来的姿势固定，要连同上下两个关节一起固定。'},
    {en: 'If bone is through the skin, cover it with a clean cloth. Do not push it back.', es: 'Si el hueso sale por la piel, cúbrelo con un paño limpio. No lo empujes hacia dentro.', fr: 'Si l’os sort de la peau, couvre-le avec un tissu propre. Ne le remets pas en place.', ru: 'Если кость вышла через кожу, накрой её чистой тканью. Не вправляй.', ar: 'إذا كانت العظمة خارجة من الجلد، فغطّها بقطعة قماش نظيفة. لا تدفعها إلى الداخل.', zh: '如果骨头刺破了皮肤，用干净的布盖住，不要把它推回去。'},
    ICE,
    {en: 'Do not eat or drink until a doctor says so, in case surgery is needed.', es: 'No comas ni bebas hasta que un médico lo diga, por si hace falta operar.', fr: 'Ne mange et ne bois rien avant l’avis d’un médecin, au cas où il faudrait opérer.', ru: 'Не ешь и не пей, пока врач не разрешит, на случай если нужна операция.', ar: 'لا تأكل ولا تشرب حتى يسمح الطبيب، تحسبًا للحاجة إلى جراحة.', zh: '医生同意之前不要吃东西、喝水，以防需要手术。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Wait for the ambulance rather than moving the person yourself.', es: 'Espera a la ambulancia en vez de mover tú a la persona.', fr: 'Attends l’ambulance plutôt que de déplacer la personne toi-même.', ru: 'Жди скорую, а не перемещай человека сам.', ar: 'انتظر سيارة الإسعاف بدلًا من نقل الشخص بنفسك.', zh: '等救护车来，不要自己搬动伤者。'}],
    today: [
      {en: 'Today: urgent care or the ER for an X-ray.', es: 'Hoy: una clínica de atención inmediata o urgencias para una radiografía.', fr: 'Aujourd’hui : un centre de soins sans rendez-vous ou les urgences pour une radio.', ru: 'Сегодня: травмпункт или приёмное отделение для рентгена.', ar: 'اليوم: عيادة الرعاية العاجلة أو قسم الطوارئ لصورة أشعة.', zh: '今天去急诊或骨科拍 X 光片。'},
      {en: 'Keep it splinted on the way. Have someone drive you.', es: 'Mantenlo inmovilizado en el camino. Que otra persona conduzca.', fr: 'Garde l’attelle pendant le trajet. Fais-toi conduire par quelqu’un.', ru: 'Не снимай шину по дороге. Пусть кто-то тебя отвезёт.', ar: 'أبقِ الجبيرة في الطريق. اطلب من أحد أن يوصلك بالسيارة.', zh: '路上保持固定，让别人开车送你去。'}
    ],
    soon: [
      {en: 'Probably not broken, but if pain is still there in a few days, see orthopedics for an X-ray.', es: 'Probablemente no está roto, pero si el dolor sigue en unos días, ve a traumatología para una radiografía.', fr: 'Sans doute pas cassé, mais si la douleur est toujours là dans quelques jours, va en orthopédie pour une radio.', ru: 'Скорее всего, не перелом, но если боль не пройдёт через несколько дней, сходи к травматологу-ортопеду на рентген.', ar: 'على الأرجح ليس مكسورًا، لكن إن بقي الألم بعد أيام قليلة، فراجع جراحة العظام لصورة أشعة.', zh: '大概率没有骨折。但如果几天后还疼，挂骨科拍 X 光片。'}
    ]
  },
  rehabNote: {en: 'Only after a doctor confirms the bone is healing. Most bones take 6–12 weeks.', es: 'Solo después de que un médico confirme que el hueso se está curando. La mayoría de los huesos tardan 6–12 semanas.', fr: 'Seulement après qu’un médecin a confirmé que l’os se consolide. La plupart des os prennent 6 à 12 semaines.', ru: 'Только после того, как врач подтвердит, что кость срастается. Большинство костей срастается 6–12 недель.', ar: 'فقط بعد أن يؤكد الطبيب أن العظم يلتئم. معظم العظام تحتاج إلى 6–12 أسبوعًا.', zh: '要等医生确认骨头在愈合以后。大部分骨折需要 6–12 周愈合。'},
  rehab: [
    {
      when: {en: 'In the cast or brace', es: 'Con yeso o férula', fr: 'Dans le plâtre ou l’attelle', ru: 'В гипсе или ортезе', ar: 'في الجبس أو الدعامة', zh: '打石膏或戴护具期间'},
      goal: {en: 'Keep the rest of the body working', es: 'Mantener activo el resto del cuerpo', fr: 'Faire travailler le reste du corps', ru: 'Сохранить работу остального тела', ar: 'أبقِ بقية الجسم يعمل', zh: '保持身体其他部位的活动'},
      moves: [
        {en: 'Move the joints that are not in the cast, like the fingers or toes.', es: 'Mueve las articulaciones que no están en el yeso, como los dedos de las manos o de los pies.', fr: 'Bouge les articulations qui ne sont pas dans le plâtre, comme les doigts ou les orteils.', ru: 'Двигай суставами, которые не в гипсе, например пальцами рук или ног.', ar: 'حرّك المفاصل التي ليست في الجبس، مثل أصابع اليد أو القدم.', zh: '活动没被石膏固定的关节，比如手指、脚趾。'},
        {en: 'Train the uninjured parts if your doctor agrees.', es: 'Entrena las partes no lesionadas si tu médico está de acuerdo.', fr: 'Entraîne les parties non blessées si ton médecin est d’accord.', ru: 'Тренируй неповреждённые части тела, если врач согласен.', ar: 'درّب الأجزاء غير المصابة إذا وافق طبيبك.', zh: '医生同意的话，可以锻炼没受伤的部位。'}
      ]
    },
    {
      when: {en: 'Cast off', es: 'Sin yeso', fr: 'Plâtre retiré', ru: 'Гипс снят', ar: 'إزالة الجبس', zh: '拆石膏以后'},
      goal: {en: 'Get movement back', es: 'Recuperar el movimiento', fr: 'Retrouver le mouvement', ru: 'Вернуть движение', ar: 'استعادة الحركة', zh: '恢复活动范围'},
      moves: [
        {en: 'Gentle range-of-motion exercises, ideally with a physical therapist.', es: 'Ejercicios suaves de movilidad, mejor con un fisioterapeuta.', fr: 'Exercices doux d’amplitude, idéalement avec un kiné.', ru: 'Мягкие упражнения на объём движений, лучше с реабилитологом.', ar: 'تمارين لطيفة لمدى الحركة، ويفضَّل مع أخصائي علاج طبيعي.', zh: '做轻柔的关节活动练习，最好在康复师指导下做。'}
      ]
    },
    {
      when: {en: 'Weeks after', es: 'Semanas después', fr: 'Les semaines suivantes', ru: 'Следующие недели', ar: 'الأسابيع التالية', zh: '之后几周'},
      goal: {en: 'Rebuild strength', es: 'Recuperar la fuerza', fr: 'Reconstruire la force', ru: 'Восстановить силу', ar: 'إعادة بناء القوة', zh: '恢复力量'},
      moves: [
        {en: 'Strength work for the muscles around the bone, increasing slowly.', es: 'Ejercicios de fuerza para los músculos alrededor del hueso, aumentando poco a poco.', fr: 'Renforcement des muscles autour de l’os, en augmentant lentement.', ru: 'Силовые упражнения для мышц вокруг кости, нагрузку увеличивай медленно.', ar: 'تمارين قوة للعضلات المحيطة بالعظم، تزداد ببطء.', zh: '锻炼骨头周围的肌肉，慢慢加量。'}
      ]
    },
    {
      when: {en: 'Back to sport', es: 'Volver al deporte', fr: 'Retour au sport', ru: 'Возвращение в спорт', ar: 'العودة إلى الرياضة', zh: '恢复运动'},
      goal: {en: 'When your doctor confirms the bone has healed', es: 'Cuando tu médico confirme que el hueso se ha curado', fr: 'Quand ton médecin confirme que l’os est consolidé', ru: 'Когда врач подтвердит, что кость срослась', ar: 'عندما يؤكد طبيبك أن العظم التأم', zh: '医生确认骨头愈合以后'},
      moves: [
        {en: 'Build back up gradually. Contact sports usually come last.', es: 'Vuelve poco a poco. Los deportes de contacto suelen ser lo último.', fr: 'Reprends progressivement. Les sports de contact viennent en général en dernier.', ru: 'Возвращайся постепенно. Контактные виды спорта обычно в последнюю очередь.', ar: 'عُد تدريجيًا. رياضات الاحتكاك تأتي عادةً في النهاية.', zh: '慢慢恢复训练量。有身体对抗的运动通常最后才恢复。'}
      ]
    }
  ]
};

var CONCUSSION = {
  id: 'concussion',
  name: {en: 'Head injury (concussion)', es: 'Golpe en la cabeza (conmoción)', fr: 'Blessure à la tête (commotion)', ru: 'Травма головы (сотрясение)', ar: 'إصابة الرأس (ارتجاج)', zh: '脑震荡'},
  hint: {en: 'A hit to the head', es: 'Un golpe en la cabeza', fr: 'Un choc à la tête', ru: 'Удар по голове', ar: 'ضربة على الرأس', zh: '头部被撞'},
  questions: [
    {
      id: 'danger',
      text: {en: 'Any of these: passed out, vomiting more than once, a headache that keeps getting worse, a seizure, weak or numb arms or legs, slurred speech, getting more confused or drowsy?', es: '¿Alguno de estos: desmayo, vomitar más de una vez, un dolor de cabeza que empeora, una convulsión, brazos o piernas débiles o dormidos, hablar arrastrando las palabras, cada vez más confusión o somnolencia?', fr: 'L’un de ces signes : perte de connaissance, vomissements plus d’une fois, mal de tête qui s’aggrave, convulsions, bras ou jambes faibles ou engourdis, difficulté à parler, confusion ou somnolence qui augmente ?', ru: 'Что-то из этого: потеря сознания, рвота больше одного раза, головная боль, которая всё усиливается, судороги, слабость или онемение рук или ног, невнятная речь, нарастающая спутанность или сонливость?', ar: 'هل حدث أي مما يلي: فقدان الوعي، تقيؤ أكثر من مرة، صداع يزداد سوءًا، نوبة تشنج، ضعف أو خدر في الذراعين أو الساقين، تلعثم في الكلام، ازدياد الارتباك أو النعاس؟', zh: '有没有以下任何一种：昏迷过、吐了不止一次、头越来越疼、抽搐、手脚无力或发麻、说话不清、越来越糊涂或想睡？'},
      options: YES_NO
    },
    {
      id: 'neck',
      text: {en: 'Is there neck pain, or tingling in the arms or legs?', es: '¿Hay dolor de cuello u hormigueo en brazos o piernas?', fr: 'Y a-t-il une douleur au cou, ou des picotements dans les bras ou les jambes ?', ru: 'Есть боль в шее или покалывание в руках или ногах?', ar: 'هل هناك ألم في الرقبة، أو وخز في الذراعين أو الساقين؟', zh: '脖子疼吗？或者手脚有刺痛感？'},
      options: YES_NO
    },
    {
      id: 'symptoms',
      text: {en: 'Any headache, dizziness, nausea, blurry vision, feeling foggy, or trouble remembering what happened?', es: '¿Hay dolor de cabeza, mareo, náuseas, visión borrosa, sensación de niebla mental o problemas para recordar lo que pasó?', fr: 'Mal de tête, vertiges, nausée, vision floue, impression d’être dans le brouillard, ou difficulté à se souvenir de ce qui s’est passé ?', ru: 'Есть головная боль, головокружение, тошнота, нечёткое зрение, ощущение тумана в голове или трудно вспомнить, что произошло?', ar: 'هل هناك صداع، أو دوار، أو غثيان، أو تشوش في الرؤية، أو شعور بالضبابية، أو صعوبة في تذكّر ما حدث؟', zh: '有没有头疼、头晕、恶心、看东西模糊、脑子发懵，或者想不起刚才发生了什么？'},
      options: YES_NO
    }
  ],
  // Danger signs can mean bleeding in the brain; neck pain can mean a spine
  // injury. Any symptom at all means a concussion is likely.
  assess: function (a) {
    if (a.danger === 'yes' || a.neck === 'yes') return 'emergency';
    if (a.symptoms === 'yes') return 'today';
    return 'selfCare';
  },
  firstAid: [
    {en: 'Stop playing and do not go back in today, even if you feel fine.', es: 'Deja de jugar y no vuelvas hoy, aunque te sientas bien.', fr: 'Arrête de jouer et ne reprends pas aujourd’hui, même si tu te sens bien.', ru: 'Прекрати игру и не возвращайся сегодня, даже если чувствуешь себя хорошо.', ar: 'توقف عن اللعب ولا تعد اليوم، حتى لو شعرت أنك بخير.', zh: '马上停止运动，今天不要再上场，就算感觉没事也不行。'},
    {en: 'If the neck might be hurt, do not move the person.', es: 'Si el cuello puede estar lesionado, no muevas a la persona.', fr: 'Si le cou peut être touché, ne déplace pas la personne.', ru: 'Если может быть повреждена шея, не перемещай человека.', ar: 'إذا كان هناك احتمال إصابة الرقبة، فلا تحرّك الشخص.', zh: '如果可能伤到脖子，不要移动伤者。'},
    {en: 'Someone should stay with the injured person for the next few hours and watch for the danger signs above.', es: 'Alguien debe quedarse con la persona lesionada las próximas horas y vigilar las señales de peligro de arriba.', fr: 'Quelqu’un doit rester avec la personne blessée pendant les heures qui suivent et surveiller les signes de danger ci-dessus.', ru: 'Кто-то должен побыть с пострадавшим несколько следующих часов и следить за опасными признаками выше.', ar: 'يجب أن يبقى أحد مع المصاب خلال الساعات القليلة القادمة ويراقب علامات الخطر أعلاه.', zh: '接下来几个小时要有人陪着，留意上面提到的危险信号。'},
    {en: 'Rest. No alcohol. Ask a doctor before taking pain medicine.', es: 'Descansa. Nada de alcohol. Pregunta a un médico antes de tomar analgésicos.', fr: 'Repos. Pas d’alcool. Demande à un médecin avant de prendre un antidouleur.', ru: 'Отдых. Никакого алкоголя. Спроси врача, прежде чем принимать обезболивающее.', ar: 'الراحة. لا كحول. اسأل طبيبًا قبل تناول مسكّن للألم.', zh: '休息，不要喝酒。吃止痛药之前先问医生。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Keep the head and neck still until help arrives.', es: 'Mantén quietos la cabeza y el cuello hasta que llegue la ayuda.', fr: 'Garde la tête et le cou immobiles jusqu’à l’arrivée des secours.', ru: 'Держи голову и шею неподвижно, пока не приедет помощь.', ar: 'أبقِ الرأس والرقبة ثابتين حتى تصل المساعدة.', zh: '救护人员到之前，保持头和脖子不动。'}],
    today: [
      {en: 'Today: a doctor (urgent care, the ER, or sports medicine) to check for a concussion.', es: 'Hoy: un médico (atención inmediata, urgencias o medicina deportiva) para revisar si hay conmoción.', fr: 'Aujourd’hui : un médecin (centre de soins sans rendez-vous, urgences ou médecine du sport) pour vérifier s’il y a une commotion.', ru: 'Сегодня: врач (травмпункт, приёмное отделение или спортивный врач), чтобы проверить на сотрясение.', ar: 'اليوم: طبيب (عيادة الرعاية العاجلة أو قسم الطوارئ أو الطب الرياضي) لفحص الارتجاج.', zh: '今天去看医生（急诊或运动医学科），检查是不是脑震荡。'},
      {en: 'Go to the ER right away if any danger sign appears later.', es: 'Ve a urgencias enseguida si aparece alguna señal de peligro más tarde.', fr: 'Va tout de suite aux urgences si un signe de danger apparaît plus tard.', ru: 'Сразу езжай в приёмное отделение, если позже появится любой опасный признак.', ar: 'اذهب إلى قسم الطوارئ فورًا إذا ظهرت أي علامة خطر لاحقًا.', zh: '之后如果出现任何危险信号，马上去急诊。'}
    ],
    selfCare: [
      {en: 'No visit needed right now, but watch closely for 24–48 hours.', es: 'Ahora no hace falta ir al médico, pero vigila de cerca durante 24–48 horas.', fr: 'Pas besoin de consulter pour l’instant, mais surveille de près pendant 24 à 48 heures.', ru: 'Сейчас к врачу идти не нужно, но внимательно наблюдай 24–48 часов.', ar: 'لا حاجة إلى زيارة الآن، لكن راقب جيدًا خلال 24–48 ساعة.', zh: '现在不需要去医院，但接下来 24–48 小时要密切观察。'},
      {en: 'See a doctor if any symptom appears, and go to the ER for any danger sign.', es: 'Ve al médico si aparece algún síntoma, y a urgencias ante cualquier señal de peligro.', fr: 'Consulte un médecin si un symptôme apparaît, et va aux urgences au moindre signe de danger.', ru: 'Обратись к врачу при любом симптоме и езжай в приёмное отделение при любом опасном признаке.', ar: 'راجع طبيبًا إذا ظهر أي عرض، واذهب إلى قسم الطوارئ عند أي علامة خطر.', zh: '出现任何症状就去看医生，出现危险信号马上去急诊。'}
    ]
  },
  rehabNote: {en: 'Spend at least 24 hours on each step. If symptoms come back, go back one step. Return to contact sport only with a doctor\'s OK.', es: 'Pasa al menos 24 horas en cada paso. Si vuelven los síntomas, retrocede un paso. Vuelve al deporte de contacto solo con el visto bueno de un médico.', fr: 'Reste au moins 24 heures à chaque étape. Si les symptômes reviennent, reviens une étape en arrière. Ne reprends les sports de contact qu’avec l’accord d’un médecin.', ru: 'Оставайся на каждом шаге не меньше 24 часов. Если симптомы возвращаются, вернись на шаг назад. К контактному спорту возвращайся только с разрешения врача.', ar: 'اقضِ 24 ساعة على الأقل في كل خطوة. إذا عادت الأعراض، فارجع خطوة إلى الوراء. لا تعد إلى رياضات الاحتكاك إلا بموافقة الطبيب.', zh: '每一步至少 24 小时。如果症状又出现了，退回上一步。要等医生同意才能恢复有身体对抗的运动。'},
  rehab: [
    {
      when: {en: 'Days 1–2', es: 'Días 1–2', fr: 'Jours 1 à 2', ru: 'Дни 1–2', ar: 'اليومان 1–2', zh: '第 1–2 天'},
      days: [0, 2],
      goal: {en: 'Rest the brain', es: 'Descansar el cerebro', fr: 'Reposer le cerveau', ru: 'Отдых для мозга', ar: 'راحة الدماغ', zh: '让大脑休息'},
      moves: [
        {en: 'Light daily activity only. Short breaks from screens and reading.', es: 'Solo actividad diaria ligera. Descansos cortos de pantallas y lectura.', fr: 'Seulement des activités quotidiennes légères. De courtes pauses d’écran et de lecture.', ru: 'Только лёгкие повседневные дела. Короткие перерывы от экранов и чтения.', ar: 'نشاط يومي خفيف فقط. استراحات قصيرة من الشاشات والقراءة.', zh: '只做轻度日常活动，少看屏幕、少读书。'}
      ]
    },
    {
      when: {en: 'Step 2', es: 'Paso 2', fr: 'Étape 2', ru: 'Шаг 2', ar: 'الخطوة 2', zh: '第 2 步'},
      goal: {en: 'Light exercise', es: 'Ejercicio ligero', fr: 'Exercice léger', ru: 'Лёгкая нагрузка', ar: 'تمارين خفيفة', zh: '轻度运动'},
      moves: [
        {en: 'Walking or a stationary bike, as long as symptoms do not get worse.', es: 'Caminar o bicicleta estática, siempre que los síntomas no empeoren.', fr: 'Marche ou vélo d’appartement, tant que les symptômes ne s’aggravent pas.', ru: 'Ходьба или велотренажёр, пока симптомы не усиливаются.', ar: 'المشي أو الدراجة الثابتة، ما دامت الأعراض لا تسوء.', zh: '散步或骑固定自行车，只要症状不加重。'}
      ]
    },
    {
      when: {en: 'Step 3', es: 'Paso 3', fr: 'Étape 3', ru: 'Шаг 3', ar: 'الخطوة 3', zh: '第 3 步'},
      goal: {en: 'Sport drills without contact', es: 'Ejercicios de tu deporte sin contacto', fr: 'Exercices de sport sans contact', ru: 'Спортивные упражнения без контакта', ar: 'تمارين رياضية بلا احتكاك', zh: '没有身体接触的专项练习'},
      moves: [
        {en: 'Running and ball drills, no heading and no contact.', es: 'Correr y ejercicios con balón, sin cabezazos ni contacto.', fr: 'Course et exercices avec ballon, sans jeu de tête et sans contact.', ru: 'Бег и упражнения с мячом, без игры головой и без контакта.', ar: 'الجري وتمارين الكرة، دون ضرب الكرة بالرأس ودون احتكاك.', zh: '跑步、球类练习，不顶球、不对抗。'}
      ]
    },
    {
      when: {en: 'Back to sport', es: 'Volver al deporte', fr: 'Retour au sport', ru: 'Возвращение в спорт', ar: 'العودة إلى الرياضة', zh: '恢复运动'},
      goal: {en: 'Full practice, then games, after a doctor clears you', es: 'Entrenamiento completo y después partidos, cuando un médico te dé el alta', fr: 'Entraînement complet, puis matchs, après le feu vert d’un médecin', ru: 'Полная тренировка, затем игры, после разрешения врача', ar: 'تدريب كامل، ثم المباريات، بعد أن يسمح لك الطبيب', zh: '医生同意后，先参加完整训练，再参加比赛'},
      moves: [
        {en: 'Full-contact practice first, then return to games.', es: 'Primero entrenamiento con contacto completo, después vuelta a los partidos.', fr: 'D’abord l’entraînement avec contact, puis le retour en match.', ru: 'Сначала тренировка с контактом, затем возвращение в игры.', ar: 'تدريب كامل مع الاحتكاك أولًا، ثم العودة إلى المباريات.', zh: '先做有身体接触的完整训练，再恢复比赛。'}
      ]
    }
  ]
};

var BRUISE = {
  id: 'bruise',
  name: {en: 'Bruise', es: 'Contusión', fr: 'Contusion', ru: 'Ушиб', ar: 'كدمة', zh: '撞伤淤青'},
  hint: {en: 'Hit by a ball, knee or elbow', es: 'Golpe de un balón, una rodilla o un codo', fr: 'Touché par un ballon, un genou ou un coude', ru: 'Удар мячом, коленом или локтем', ar: 'ضربة بكرة أو ركبة أو مرفق', zh: '被球、膝盖、手肘撞到'},
  questions: [
    {
      id: 'tense',
      text: {en: 'Is the area rock-hard and tight, with pain that keeps getting worse, or numbness and tingling?', es: '¿La zona está dura como una piedra y tensa, con dolor que no para de empeorar, o adormecimiento y hormigueo?', fr: 'La zone est-elle dure comme de la pierre et tendue, avec une douleur qui s’aggrave, ou des engourdissements et picotements ?', ru: 'Место твёрдое как камень и напряжённое, боль всё усиливается, или есть онемение и покалывание?', ar: 'هل المكان صلب جدًا ومشدود، مع ألم يزداد سوءًا، أو خدر ووخز؟', zh: '受伤的地方变得硬邦邦、绷得很紧，疼得越来越厉害，或者发麻、刺痛吗？'},
      options: YES_NO
    },
    {
      id: 'trunk',
      text: {en: 'Was it a hit to the chest, belly or lower back, with trouble breathing, belly pain or blood in the urine?', es: '¿Fue un golpe en el pecho, el vientre o la parte baja de la espalda, con dificultad para respirar, dolor de vientre o sangre en la orina?', fr: 'Est-ce un choc à la poitrine, au ventre ou au bas du dos, avec du mal à respirer, une douleur au ventre ou du sang dans les urines ?', ru: 'Это удар в грудь, живот или поясницу, и трудно дышать, болит живот или есть кровь в моче?', ar: 'هل كانت الضربة على الصدر أو البطن أو أسفل الظهر، مع صعوبة في التنفس أو ألم في البطن أو دم في البول؟', zh: '是胸口、肚子或腰被撞，并且呼吸困难、肚子疼或者尿里有血吗？'},
      options: YES_NO
    },
    {
      id: 'use',
      text: {en: 'Can you move it normally?', es: '¿Puedes moverlo con normalidad?', fr: 'Peux-tu le bouger normalement ?', ru: 'Можешь двигать как обычно?', ar: 'هل تستطيع تحريكه بشكل طبيعي؟', zh: '还能正常活动吗？'},
      options: [
        {value: 'yes', text: {en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', ar: 'نعم', zh: '能'}},
        {value: 'pain', text: {en: 'Yes, but it hurts', es: 'Sí, pero duele', fr: 'Oui, mais ça fait mal', ru: 'Да, но больно', ar: 'نعم، لكنه يؤلم', zh: '能，但很疼'}},
        {value: 'no', text: {en: 'No', es: 'No', fr: 'Non', ru: 'Нет', ar: 'لا', zh: '不能'}}
      ]
    },
    {
      id: 'swelling',
      text: {en: 'How big is the swelling?', es: '¿Qué tamaño tiene la hinchazón?', fr: 'Quelle est la taille du gonflement ?', ru: 'Насколько большой отёк?', ar: 'ما حجم التورم؟', zh: '肿得有多大？'},
      options: [
        {value: 'small', text: {en: 'Small', es: 'Pequeña', fr: 'Petit', ru: 'Небольшой', ar: 'صغير', zh: '一小块'}},
        {value: 'large', text: {en: 'Large', es: 'Grande', fr: 'Grand', ru: 'Большой', ar: 'كبير', zh: '一大片'}}
      ]
    }
  ],
  // Rock-hard swelling with growing pain can be compartment syndrome, which
  // cuts off blood flow; a hard hit to the trunk can injure organs.
  assess: function (a) {
    if (a.tense === 'yes' || a.trunk === 'yes') return 'emergency';
    if (a.use === 'no') return 'today';
    if (a.use === 'pain' || a.swelling === 'large') return 'soon';
    return 'selfCare';
  },
  firstAid: [
    STOP,
    ICE,
    COMPRESS,
    {en: 'For a bruised thigh, keep the knee bent as far as is comfortable while icing for the first day.', es: 'Para una contusión en el muslo, mantén la rodilla doblada todo lo que sea cómodo mientras pones hielo el primer día.', fr: 'Pour une contusion de la cuisse, garde le genou plié autant que c’est confortable pendant le glaçage le premier jour.', ru: 'При ушибе бедра в первый день держи колено согнутым, насколько удобно, пока прикладываешь лёд.', ar: 'لكدمة الفخذ، أبقِ الركبة مثنية بقدر ما هو مريح أثناء وضع الثلج في اليوم الأول.', zh: '如果是大腿被撞，第一天冰敷时让膝盖尽量弯着（不疼的程度）。'},
    NO_HEAT
  ],
  where: {
    emergency: [CALL_EMERGENCY],
    today: [
      {en: 'Today: urgent care or the ER for an X-ray, in case a bone is broken.', es: 'Hoy: una clínica de atención inmediata o urgencias para una radiografía, por si hay un hueso roto.', fr: 'Aujourd’hui : un centre de soins sans rendez-vous ou les urgences pour une radio, au cas où un os serait cassé.', ru: 'Сегодня: травмпункт или приёмное отделение для рентгена, на случай перелома.', ar: 'اليوم: عيادة الرعاية العاجلة أو قسم الطوارئ لصورة أشعة، في حال وجود كسر.', zh: '今天去急诊或骨科拍 X 光片，以防骨折。'}
    ],
    soon: [
      {en: 'Within a few days: a sports medicine doctor, especially if a hard lump stays in the muscle.', es: 'En unos días: un médico de medicina deportiva, sobre todo si queda un bulto duro en el músculo.', fr: 'Dans les prochains jours : un médecin du sport, surtout si une bosse dure reste dans le muscle.', ru: 'В ближайшие дни: спортивный врач, особенно если в мышце остаётся твёрдое уплотнение.', ar: 'خلال أيام قليلة: طبيب الطب الرياضي، خصوصًا إذا بقيت كتلة صلبة في العضلة.', zh: '几天内挂运动医学科，尤其是肌肉里一直有硬块的话。'}
    ],
    selfCare: [
      {en: 'No visit needed. Bruises usually fade in 1–2 weeks.', es: 'No hace falta ir al médico. Los moratones suelen desaparecer en 1–2 semanas.', fr: 'Pas besoin de consulter. Les bleus disparaissent en général en 1 à 2 semaines.', ru: 'К врачу идти не нужно. Синяки обычно проходят за 1–2 недели.', ar: 'لا حاجة إلى زيارة. الكدمات تختفي عادةً خلال 1–2 أسبوع.', zh: '不需要去医院。淤青一般 1–2 周会消退。'}
    ]
  },
  rehabNote: {en: 'Never massage a deep bruise hard; it can cause bone to form in the muscle.', es: 'Nunca masajees con fuerza una contusión profunda; puede hacer que se forme hueso dentro del músculo.', fr: 'Ne masse jamais fort une contusion profonde : ça peut faire se former de l’os dans le muscle.', ru: 'Никогда не массируй сильно глубокий ушиб: в мышце может образоваться костная ткань.', ar: 'لا تدلّك الكدمة العميقة بقوة أبدًا؛ فقد يؤدي ذلك إلى تكوّن عظم داخل العضلة.', zh: '深层淤青不要用力按摩，可能导致肌肉里长出骨化的硬块。'},
  rehab: [
    {
      when: {en: 'Days 0–2', es: 'Días 0–2', fr: 'Jours 0 à 2', ru: 'Дни 0–2', ar: 'الأيام 0–2', zh: '第 0–2 天'},
      days: [0, 2],
      goal: {en: 'Limit bleeding under the skin', es: 'Limitar el sangrado bajo la piel', fr: 'Limiter le saignement sous la peau', ru: 'Уменьшить кровоизлияние под кожей', ar: 'الحدّ من النزف تحت الجلد', zh: '减少皮下出血'},
      moves: [
        {en: 'Rest, ice and compression (see above).', es: 'Reposo, hielo y compresión (ver arriba).', fr: 'Repos, glace et compression (voir plus haut).', ru: 'Покой, лёд и давящая повязка (см. выше).', ar: 'الراحة والثلج والضغط (انظر أعلاه).', zh: '休息、冰敷、加压包扎（见上面）。'}
      ]
    },
    {
      when: {en: 'Days 2–7', es: 'Días 2–7', fr: 'Jours 2 à 7', ru: 'Дни 2–7', ar: 'الأيام 2–7', zh: '第 2–7 天'},
      days: [2, 7],
      goal: {en: 'Get movement back', es: 'Recuperar el movimiento', fr: 'Retrouver le mouvement', ru: 'Вернуть движение', ar: 'استعادة الحركة', zh: '恢复活动'},
      moves: [
        {en: 'Gentle stretching and walking. Warmth is fine now.', es: 'Estiramientos suaves y caminar. Ahora ya se puede aplicar calor.', fr: 'Étirements doux et marche. La chaleur est permise maintenant.', ru: 'Мягкая растяжка и ходьба. Теперь можно тепло.', ar: 'إطالة لطيفة ومشي. الدفء مناسب الآن.', zh: '轻柔拉伸和散步。这时可以热敷了。'}
      ]
    },
    {
      when: {en: 'Weeks 1–3', es: 'Semanas 1–3', fr: 'Semaines 1 à 3', ru: 'Недели 1–3', ar: 'الأسابيع 1–3', zh: '第 1–3 周'},
      days: [7, 21],
      goal: {en: 'Rebuild strength', es: 'Recuperar la fuerza', fr: 'Reconstruire la force', ru: 'Восстановить силу', ar: 'إعادة بناء القوة', zh: '恢复力量'},
      moves: [
        {en: 'Light strength exercises for the bruised muscle, then jogging.', es: 'Ejercicios de fuerza ligeros para el músculo golpeado, después trotar.', fr: 'Exercices de force légers pour le muscle touché, puis footing.', ru: 'Лёгкие силовые упражнения для ушибленной мышцы, затем бег трусцой.', ar: 'تمارين قوة خفيفة للعضلة المكدومة، ثم الهرولة.', zh: '对受伤的肌肉做轻度力量练习，然后慢跑。'}
      ]
    },
    {
      when: {en: 'Back to sport', es: 'Volver al deporte', fr: 'Retour au sport', ru: 'Возвращение в спорт', ar: 'العودة إلى الرياضة', zh: '恢复运动'},
      goal: {en: 'Ready when movement and strength are back to normal', es: 'Listo cuando el movimiento y la fuerza vuelvan a la normalidad', fr: 'Prêt quand le mouvement et la force sont revenus à la normale', ru: 'Готов, когда движения и сила вернулись в норму', ar: 'جاهز عندما تعود الحركة والقوة إلى طبيعتهما', zh: '活动范围和力量恢复正常，就可以恢复运动'},
      moves: [
        {en: 'Wear padding over the spot for a while.', es: 'Lleva protección acolchada sobre la zona durante un tiempo.', fr: 'Porte une protection sur la zone pendant un moment.', ru: 'Какое-то время носи защиту на этом месте.', ar: 'البس واقيًا فوق المكان لفترة.', zh: '一段时间内在受伤部位戴护垫。'}
      ]
    }
  ]
};

var WOUND = {
  id: 'wound',
  name: {en: 'Cuts and scrapes', es: 'Cortes y raspones', fr: 'Coupures et éraflures', ru: 'Порезы и ссадины', ar: 'الجروح والخدوش', zh: '擦伤、割伤'},
  hint: {en: 'Skin broken, bleeding', es: 'Piel abierta, sangrado', fr: 'Peau ouverte, saignement', ru: 'Кожа повреждена, кровь', ar: 'جلد مجروح، ونزيف', zh: '皮肤破了、流血'},
  questions: [
    {
      id: 'bleeding',
      text: {en: 'Is blood spurting, or is it still bleeding after 10 minutes of firm pressure?', es: '¿La sangre sale a chorros, o sigue sangrando después de 10 minutos de presión firme?', fr: 'Le sang gicle-t-il, ou ça saigne encore après 10 minutes de pression ferme ?', ru: 'Кровь бьёт струёй или всё ещё идёт после 10 минут сильного давления?', ar: 'هل يتدفق الدم، أو ما زال ينزف بعد 10 دقائق من الضغط القوي؟', zh: '血是喷出来的吗？或者用力按压 10 分钟后还在流血？'},
      options: YES_NO
    },
    {
      id: 'deep',
      text: {en: 'Is it deep or gaping, longer than about 1–2 cm, or on the face or over a joint?', es: '¿Es profunda o abierta, de más de 1–2 cm, o en la cara o sobre una articulación?', fr: 'Est-ce profond ou béant, plus long qu’environ 1 à 2 cm, ou sur le visage ou une articulation ?', ru: 'Рана глубокая или зияет, длиннее примерно 1–2 см, или на лице или над суставом?', ar: 'هل الجرح عميق أو مفتوح، أو أطول من 1–2 سم تقريبًا، أو على الوجه أو فوق مفصل؟', zh: '伤口深或者张开着、长度超过 1–2 厘米，或者在脸上、关节上吗？'},
      options: YES_NO
    },
    {
      id: 'dirty',
      text: {en: 'Is it very dirty, from something rusty, or with dirt you cannot rinse out?', es: '¿Está muy sucia, la hizo algo oxidado, o tiene tierra que no sale al enjuagar?', fr: 'Est-ce très sale, causé par quelque chose de rouillé, ou avec de la saleté que tu n’arrives pas à rincer ?', ru: 'Рана очень грязная, от чего-то ржавого или с грязью, которую не получается смыть?', ar: 'هل هو متسخ جدًا، أو من شيء صدئ، أو فيه أوساخ لا تستطيع غسلها؟', zh: '伤口很脏、是被生锈的东西弄伤的，或者有冲不掉的脏东西吗？'},
      options: YES_NO
    },
    {
      id: 'infected',
      text: {en: 'If it happened days ago: is it getting redder, warmer, more swollen, or oozing pus?', es: 'Si pasó hace días: ¿se está poniendo más roja, más caliente, más hinchada o sale pus?', fr: 'Si c’est arrivé il y a quelques jours : est-ce que ça devient plus rouge, plus chaud, plus gonflé, ou ça suinte du pus ?', ru: 'Если это случилось несколько дней назад: рана краснеет, становится горячее, сильнее опухает или из неё сочится гной?', ar: 'إذا حدث قبل أيام: هل يزداد احمرارًا أو سخونة أو تورمًا، أو يخرج منه صديد؟', zh: '如果是几天前受的伤：伤口越来越红、发热、更肿，或者流脓吗？'},
      options: [
        {value: 'no', text: {en: 'No / it just happened', es: 'No / acaba de pasar', fr: 'Non / ça vient d’arriver', ru: 'Нет / это только что случилось', ar: 'لا / حدث للتو', zh: '没有 / 刚受伤'}},
        {value: 'yes', text: {en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', ar: 'نعم', zh: '是'}}
      ]
    }
  ],
  // Bleeding that will not stop is an emergency. A deep cut needs stitches
  // within hours, and a dirty one may need a tetanus shot.
  assess: function (a) {
    if (a.bleeding === 'yes') return 'emergency';
    if (a.deep === 'yes' || a.dirty === 'yes' || a.infected === 'yes') return 'today';
    return 'selfCare';
  },
  firstAid: [
    {en: 'Press firmly on the wound with a clean cloth for 10 minutes without lifting it.', es: 'Presiona firmemente la herida con un paño limpio durante 10 minutos sin levantarlo.', fr: 'Appuie fermement sur la plaie avec un tissu propre pendant 10 minutes sans le soulever.', ru: 'Сильно прижми рану чистой тканью на 10 минут, не отпуская.', ar: 'اضغط بقوة على الجرح بقطعة قماش نظيفة 10 دقائق دون رفعها.', zh: '用干净的布用力按住伤口 10 分钟，中间不要松开看。'},
    {en: 'Rinse it under clean running water and remove dirt.', es: 'Enjuágala con agua limpia corriente y quita la suciedad.', fr: 'Rince-la sous l’eau courante propre et enlève la saleté.', ru: 'Промой её под чистой проточной водой и убери грязь.', ar: 'اغسله تحت ماء جارٍ نظيف وأزل الأوساخ.', zh: '用干净的流动水冲洗伤口，把脏东西冲掉。'},
    {en: 'Cover with a clean bandage. A thin layer of antibiotic ointment helps.', es: 'Cúbrela con un apósito limpio. Una capa fina de pomada antibiótica ayuda.', fr: 'Couvre avec un pansement propre. Une fine couche de pommade antibiotique aide.', ru: 'Закрой чистой повязкой. Помогает тонкий слой антибактериальной мази.', ar: 'غطّه بضمادة نظيفة. طبقة رقيقة من مرهم مضاد حيوي تساعد.', zh: '用干净的纱布或创可贴盖好，可以薄涂一层抗生素药膏。'},
    {en: 'If something is stuck deep in the wound, leave it in and pad around it.', es: 'Si hay algo clavado profundo en la herida, déjalo y pon acolchado alrededor.', fr: 'Si quelque chose est enfoncé profondément dans la plaie, laisse-le et mets un rembourrage autour.', ru: 'Если в ране глубоко что-то застряло, не вынимай и обложи вокруг мягким.', ar: 'إذا علق شيء عميقًا في الجرح، فاتركه مكانه وضع حشوة حوله.', zh: '如果有东西扎在伤口深处，不要拔出来，在周围垫上纱布固定。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Keep pressing on the wound until help arrives.', es: 'Sigue presionando la herida hasta que llegue la ayuda.', fr: 'Continue d’appuyer sur la plaie jusqu’à l’arrivée des secours.', ru: 'Продолжай прижимать рану, пока не приедет помощь.', ar: 'واصل الضغط على الجرح حتى تصل المساعدة.', zh: '救护人员到之前，一直按住伤口。'}],
    today: [
      {en: 'Today, within 6–8 hours if possible: urgent care or the ER for cleaning and stitches.', es: 'Hoy, si es posible en 6–8 horas: una clínica de atención inmediata o urgencias para limpiarla y poner puntos.', fr: 'Aujourd’hui, si possible dans les 6 à 8 heures : un centre de soins sans rendez-vous ou les urgences pour nettoyer et recoudre.', ru: 'Сегодня, по возможности в течение 6–8 часов: травмпункт или приёмное отделение, чтобы обработать и зашить.', ar: 'اليوم، خلال 6–8 ساعات إن أمكن: عيادة الرعاية العاجلة أو قسم الطوارئ للتنظيف والخياطة.', zh: '今天去，最好在 6–8 小时内：去急诊或外科清创、缝针。'},
      {en: 'Ask about a tetanus shot if your last one was more than 5 years ago.', es: 'Pregunta por la vacuna del tétanos si la última fue hace más de 5 años.', fr: 'Demande un rappel antitétanique si le dernier date de plus de 5 ans.', ru: 'Спроси о прививке от столбняка, если последняя была больше 5 лет назад.', ar: 'اسأل عن حقنة الكزاز إذا كانت آخر حقنة قبل أكثر من 5 سنوات.', zh: '如果上次打破伤风针已经超过 5 年，问医生要不要打。'}
    ],
    selfCare: [
      {en: 'No visit needed. Keep it clean and covered.', es: 'No hace falta ir al médico. Mantenla limpia y cubierta.', fr: 'Pas besoin de consulter. Garde-la propre et couverte.', ru: 'К врачу идти не нужно. Держи рану чистой и закрытой.', ar: 'لا حاجة إلى زيارة. أبقِه نظيفًا ومغطى.', zh: '不需要去医院，保持伤口干净、盖好。'},
      {en: 'See a doctor if it gets redder, warmer or oozes pus.', es: 'Ve al médico si se pone más roja, más caliente o sale pus.', fr: 'Consulte un médecin si ça devient plus rouge, plus chaud ou si du pus sort.', ru: 'Обратись к врачу, если она краснеет, становится горячее или из неё идёт гной.', ar: 'راجع طبيبًا إذا ازداد احمرارًا أو سخونة أو خرج منه صديد.', zh: '如果伤口越来越红、发热或流脓，去看医生。'}
    ]
  },
  rehabNote: {en: 'Most scrapes heal in 1–2 weeks.', es: 'La mayoría de los raspones se curan en 1–2 semanas.', fr: 'La plupart des éraflures guérissent en 1 à 2 semaines.', ru: 'Большинство ссадин заживает за 1–2 недели.', ar: 'معظم الخدوش تلتئم خلال 1–2 أسبوع.', zh: '大部分擦伤 1–2 周能长好。'},
  rehab: [
    {
      when: {en: 'Days 0–2', es: 'Días 0–2', fr: 'Jours 0 à 2', ru: 'Дни 0–2', ar: 'الأيام 0–2', zh: '第 0–2 天'},
      days: [0, 2],
      goal: {en: 'Keep it clean', es: 'Mantenerla limpia', fr: 'La garder propre', ru: 'Держать в чистоте', ar: 'أبقِه نظيفًا', zh: '保持干净'},
      moves: [
        {en: 'Change the bandage daily or when it gets wet or dirty.', es: 'Cambia el apósito cada día o cuando se moje o ensucie.', fr: 'Change le pansement chaque jour, ou quand il est mouillé ou sale.', ru: 'Меняй повязку каждый день или когда она намокла или испачкалась.', ar: 'غيّر الضمادة يوميًا أو عندما تبتل أو تتسخ.', zh: '每天换药，弄湿或弄脏了也要换。'}
      ]
    },
    {
      when: {en: 'Days 2–7', es: 'Días 2–7', fr: 'Jours 2 à 7', ru: 'Дни 2–7', ar: 'الأيام 2–7', zh: '第 2–7 天'},
      days: [2, 7],
      goal: {en: 'Watch for infection', es: 'Vigilar la infección', fr: 'Surveiller l’infection', ru: 'Следить за инфекцией', ar: 'راقب العدوى', zh: '留意感染'},
      moves: [
        {en: 'Check for spreading redness, heat, pus or fever.', es: 'Revisa si hay enrojecimiento que se extiende, calor, pus o fiebre.', fr: 'Vérifie s’il y a une rougeur qui s’étend, de la chaleur, du pus ou de la fièvre.', ru: 'Проверяй, нет ли расползающегося покраснения, жара, гноя или температуры.', ar: 'تحقق من احمرار ينتشر أو سخونة أو صديد أو حمى.', zh: '检查有没有红肿扩散、发热、流脓或发烧。'}
      ]
    },
    {
      when: {en: 'Healing', es: 'Cicatrización', fr: 'Cicatrisation', ru: 'Заживление', ar: 'الالتئام', zh: '愈合期'},
      goal: {en: 'Let the skin close', es: 'Dejar que la piel se cierre', fr: 'Laisser la peau se refermer', ru: 'Дать коже закрыться', ar: 'دع الجلد ينغلق', zh: '让皮肤长好'},
      moves: [
        {en: 'Do not pick the scab. Stitches come out after 5–14 days, at a clinic.', es: 'No te quites la costra. Los puntos se quitan a los 5–14 días, en una clínica.', fr: 'N’arrache pas la croûte. Les points sont retirés après 5 à 14 jours, dans un cabinet médical.', ru: 'Не сдирай корочку. Швы снимают через 5–14 дней в поликлинике.', ar: 'لا تنزع القشرة. تُزال الغرز بعد 5–14 يومًا، في العيادة.', zh: '不要抠痂。缝的针一般 5–14 天后去医院拆。'}
      ]
    },
    {
      when: {en: 'Back to sport', es: 'Volver al deporte', fr: 'Retour au sport', ru: 'Возвращение в спорт', ar: 'العودة إلى الرياضة', zh: '恢复运动'},
      goal: {en: 'When the wound is closed, or well covered', es: 'Cuando la herida esté cerrada o bien cubierta', fr: 'Quand la plaie est refermée, ou bien couverte', ru: 'Когда рана закрылась или хорошо закрыта повязкой', ar: 'عندما ينغلق الجرح، أو يكون مغطى جيدًا', zh: '伤口长好，或者能被保护好以后'},
      moves: [
        {en: 'Cover it during sport, and avoid swimming pools until it has closed.', es: 'Cúbrela durante el deporte y evita las piscinas hasta que se cierre.', fr: 'Couvre-la pendant le sport, et évite les piscines jusqu’à ce qu’elle soit refermée.', ru: 'Закрывай её во время спорта и не ходи в бассейн, пока она не затянется.', ar: 'غطّه أثناء الرياضة، وتجنب المسابح حتى ينغلق.', zh: '运动时盖好伤口，长好之前不要去游泳池。'}
      ]
    }
  ]
};

var CRAMP = {
  id: 'cramp',
  name: {en: 'Muscle cramp', es: 'Calambre muscular', fr: 'Crampe', ru: 'Судорога', ar: 'تشنج عضلي', zh: '抽筋'},
  hint: {en: 'Muscle suddenly locks tight', es: 'El músculo se agarrota de golpe', fr: 'Un muscle se contracte d’un coup', ru: 'Мышцу внезапно свело', ar: 'العضلة تنقبض فجأة بشدة', zh: '肌肉突然绷紧、抽搐'},
  questions: [
    {
      id: 'heat',
      text: {en: 'Is the person also confused, very hot, or vomiting?', es: '¿La persona además está confundida, muy caliente o vomitando?', fr: 'La personne est-elle aussi confuse, très chaude ou en train de vomir ?', ru: 'Человек ещё и в замешательстве, очень горячий или его рвёт?', ar: 'هل الشخص أيضًا مرتبك، أو حرارته مرتفعة جدًا، أو يتقيأ؟', zh: '同时有意识不清、身体很烫，或者呕吐吗？'},
      options: YES_NO
    },
    {
      id: 'swollen',
      text: {en: 'Is the leg swollen, red and warm, and does it hurt even at rest?', es: '¿La pierna está hinchada, roja y caliente, y duele incluso en reposo?', fr: 'La jambe est-elle gonflée, rouge et chaude, et fait-elle mal même au repos ?', ru: 'Нога опухшая, красная и горячая, и болит даже в покое?', ar: 'هل الساق متورمة وحمراء ودافئة، وتؤلم حتى أثناء الراحة؟', zh: '腿肿、发红、发热，而且不动的时候也疼吗？'},
      options: YES_NO
    },
    {
      id: 'eased',
      text: {en: 'Did it ease within about 10 minutes of stretching?', es: '¿Se alivió en unos 10 minutos de estiramiento?', fr: 'Est-ce que ça s’est calmé en environ 10 minutes d’étirement ?', ru: 'Прошло ли примерно за 10 минут растяжки?', ar: 'هل خفّ خلال 10 دقائق تقريبًا من الإطالة؟', zh: '拉伸后大约 10 分钟内缓解了吗？'},
      options: YES_NO
    },
    {
      id: 'often',
      text: {en: 'Does this happen to you often?', es: '¿Te pasa a menudo?', fr: 'Ça t’arrive souvent ?', ru: 'Это часто с тобой бывает?', ar: 'هل يحدث لك هذا كثيرًا؟', zh: '经常抽筋吗？'},
      options: YES_NO
    }
  ],
  // Cramps with confusion or a high temperature can be heat stroke. A swollen,
  // red, warm leg can be a blood clot, which is not a cramp at all.
  assess: function (a) {
    if (a.heat === 'yes') return 'emergency';
    if (a.swollen === 'yes') return 'today';
    if (a.eased === 'no' || a.often === 'yes') return 'soon';
    return 'selfCare';
  },
  firstAid: [
    {en: 'Stop and gently stretch the muscle. For a calf, straighten the knee and pull the toes toward you.', es: 'Para y estira el músculo con suavidad. Para la pantorrilla, estira la rodilla y tira de los dedos del pie hacia ti.', fr: 'Arrête-toi et étire doucement le muscle. Pour un mollet, tends le genou et tire les orteils vers toi.', ru: 'Остановись и мягко растяни мышцу. Для икры выпрями колено и потяни носок на себя.', ar: 'توقف وأطِل العضلة برفق. لعضلة الساق، مدّ الركبة واسحب أصابع القدم نحوك.', zh: '停下来，轻轻拉伸抽筋的肌肉。小腿抽筋就把腿伸直，把脚尖往自己方向拉。'},
    {en: 'Rub the muscle gently.', es: 'Frota el músculo con suavidad.', fr: 'Masse doucement le muscle.', ru: 'Мягко разотри мышцу.', ar: 'دلّك العضلة برفق.', zh: '轻轻揉一揉这块肌肉。'},
    {en: 'Drink water, or a sports drink if you have been sweating a lot.', es: 'Bebe agua, o una bebida deportiva si has sudado mucho.', fr: 'Bois de l’eau, ou une boisson de l’effort si tu as beaucoup transpiré.', ru: 'Выпей воды или спортивный напиток, если сильно вспотел.', ar: 'اشرب الماء، أو مشروبًا رياضيًا إذا كنت تعرّقت كثيرًا.', zh: '喝水；如果出了很多汗，喝运动饮料。'},
    {en: 'Warmth helps soreness afterwards.', es: 'El calor ayuda con las molestias después.', fr: 'La chaleur aide contre les courbatures ensuite.', ru: 'Потом тепло помогает от ноющей боли.', ar: 'الدفء يخفف الألم بعد ذلك.', zh: '之后如果肌肉酸痛，可以热敷。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'This may be heat stroke: see Heat illness and start cooling now.', es: 'Puede ser un golpe de calor: mira Enfermedad por calor y empieza a enfriar ahora.', fr: 'C’est peut-être un coup de chaleur : vois Malaise dû à la chaleur et commence à refroidir maintenant.', ru: 'Это может быть тепловой удар: смотри «Перегрев» и сразу начинай охлаждать.', ar: 'قد تكون هذه ضربة شمس: انظر «أمراض الحر» وابدأ التبريد الآن.', zh: '这可能是中暑：看“中暑”那一类，马上开始降温。'}],
    today: [
      {en: 'Today: a doctor or the ER, to check for a blood clot in the leg.', es: 'Hoy: un médico o urgencias, para descartar un coágulo de sangre en la pierna.', fr: 'Aujourd’hui : un médecin ou les urgences, pour vérifier s’il y a un caillot de sang dans la jambe.', ru: 'Сегодня: врач или приёмное отделение, чтобы проверить, нет ли тромба в ноге.', ar: 'اليوم: طبيب أو قسم الطوارئ، لفحص وجود جلطة دموية في الساق.', zh: '今天去看医生或急诊，检查腿里是不是有血栓。'}
    ],
    soon: [
      {en: 'Within a few days: a general or sports medicine doctor, to check for a cause.', es: 'En unos días: un médico de cabecera o de medicina deportiva, para buscar la causa.', fr: 'Dans les prochains jours : un médecin généraliste ou du sport, pour chercher une cause.', ru: 'В ближайшие дни: терапевт или спортивный врач, чтобы найти причину.', ar: 'خلال أيام قليلة: طبيب عام أو طبيب الطب الرياضي، لمعرفة السبب.', zh: '几天内去看全科或运动医学科，查一下原因。'}
    ],
    selfCare: [
      {en: 'No visit needed.', es: 'No hace falta ir al médico.', fr: 'Pas besoin de consulter.', ru: 'К врачу идти не нужно.', ar: 'لا حاجة إلى زيارة.', zh: '不需要去医院。'}
    ]
  },
  rehabNote: {en: 'Cramps usually pass quickly; these steps help prevent the next one.', es: 'Los calambres suelen pasar rápido; estos pasos ayudan a prevenir el siguiente.', fr: 'Les crampes passent en général vite ; ces étapes aident à éviter la prochaine.', ru: 'Судороги обычно быстро проходят; эти шаги помогут избежать следующей.', ar: 'التشنجات تزول عادةً بسرعة؛ هذه الخطوات تساعد على منع التشنج التالي.', zh: '抽筋一般很快就好，下面这些方法可以预防下一次。'},
  rehab: [
    {
      when: {en: 'Right after', es: 'Justo después', fr: 'Juste après', ru: 'Сразу после', ar: 'بعدها مباشرة', zh: '刚缓解以后'},
      days: [0, 1],
      goal: {en: 'Let the muscle recover', es: 'Dejar que el músculo se recupere', fr: 'Laisser le muscle récupérer', ru: 'Дать мышце восстановиться', ar: 'دع العضلة تتعافى', zh: '让肌肉恢复'},
      moves: [
        {en: 'Light stretching. Stop for the day if it keeps coming back.', es: 'Estiramientos ligeros. Para por hoy si sigue volviendo.', fr: 'Étirements légers. Arrête pour la journée si ça revient sans cesse.', ru: 'Лёгкая растяжка. Закончи на сегодня, если судорога возвращается снова и снова.', ar: 'إطالة خفيفة. توقف لبقية اليوم إذا ظل يعود.', zh: '轻柔拉伸。如果反复抽筋，今天就不要再练了。'}
      ]
    },
    {
      when: {en: 'Next 1–2 days', es: 'Los próximos 1–2 días', fr: 'Les 1 à 2 jours suivants', ru: 'Следующие 1–2 дня', ar: 'خلال 1–2 يوم التاليين', zh: '之后 1–2 天'},
      days: [1, 3],
      goal: {en: 'Ease soreness', es: 'Aliviar las molestias', fr: 'Soulager les courbatures', ru: 'Снять ноющую боль', ar: 'تخفيف الألم', zh: '缓解酸痛'},
      moves: [
        {en: 'Light activity, gentle stretching, drink enough.', es: 'Actividad ligera, estiramientos suaves, bebe lo suficiente.', fr: 'Activité légère, étirements doux, bois assez.', ru: 'Лёгкая активность, мягкая растяжка, пей достаточно.', ar: 'نشاط خفيف، وإطالة لطيفة، واشرب كفايتك.', zh: '轻度活动、轻柔拉伸、多喝水。'}
      ]
    },
    {
      when: {en: 'Prevention', es: 'Prevención', fr: 'Prévention', ru: 'Профилактика', ar: 'الوقاية', zh: '预防'},
      goal: {en: 'Stop it happening again', es: 'Evitar que vuelva a pasar', fr: 'Éviter que ça recommence', ru: 'Чтобы не повторилось', ar: 'منع تكراره', zh: '防止再次抽筋'},
      moves: [
        {en: 'Warm up properly and stretch the calves and thighs.', es: 'Calienta bien y estira pantorrillas y muslos.', fr: 'Échauffe-toi bien et étire les mollets et les cuisses.', ru: 'Хорошо разминайся и растягивай икры и бёдра.', ar: 'قم بالإحماء جيدًا وأطِل عضلات الساق والفخذ.', zh: '好好热身，拉伸小腿和大腿。'},
        {en: 'Drink before and during long or hot sessions.', es: 'Bebe antes y durante las sesiones largas o con calor.', fr: 'Bois avant et pendant les séances longues ou par temps chaud.', ru: 'Пей до и во время долгих или жарких тренировок.', ar: 'اشرب قبل التمارين الطويلة أو الحارة وأثناءها.', zh: '长时间或高温下运动，运动前和运动中都要喝水。'},
        {en: 'Build up training gradually.', es: 'Aumenta el entrenamiento poco a poco.', fr: 'Augmente l’entraînement progressivement.', ru: 'Увеличивай нагрузку постепенно.', ar: 'زد التدريب تدريجيًا.', zh: '训练量慢慢增加。'}
      ]
    }
  ]
};

var OVERUSE = {
  id: 'overuse',
  name: {en: 'Overuse pain', es: 'Dolor por sobrecarga', fr: 'Douleur de surmenage', ru: 'Боль от перегрузки', ar: 'ألم الإجهاد المتكرر', zh: '劳损'},
  hint: {en: 'Pain that built up over time: shins, Achilles, knee, elbow…', es: 'Dolor que fue apareciendo con el tiempo: espinillas, Aquiles, rodilla, codo…', fr: 'Une douleur qui s’est installée avec le temps : tibias, tendon d’Achille, genou, coude…', ru: 'Боль, которая накопилась со временем: голени, ахиллово сухожилие, колено, локоть…', ar: 'ألم تراكم مع الوقت: قصبة الساق، وتر العرقوب، الركبة، المرفق…', zh: '慢慢累积的疼：胫骨、跟腱、膝盖、手肘……'},
  questions: [
    {
      id: 'boneSpot',
      text: {en: 'Is there one spot on a bone that hurts to press and gets worse with every step or jump?', es: '¿Hay un punto en un hueso que duele al presionarlo y empeora con cada paso o salto?', fr: 'Y a-t-il un point sur un os qui fait mal quand on appuie et qui s’aggrave à chaque pas ou saut ?', ru: 'Есть ли точка на кости, которая болит при надавливании и хуже с каждым шагом или прыжком?', ar: 'هل هناك نقطة واحدة على العظم تؤلم عند الضغط وتسوء مع كل خطوة أو قفزة؟', zh: '骨头上有一个点按着疼，而且每走一步、每跳一下都更疼吗？'},
      options: YES_NO
    },
    {
      id: 'rest',
      text: {en: 'Does it hurt even at rest or at night?', es: '¿Duele incluso en reposo o por la noche?', fr: 'Est-ce que ça fait mal même au repos ou la nuit ?', ru: 'Болит даже в покое или ночью?', ar: 'هل يؤلم حتى أثناء الراحة أو في الليل؟', zh: '休息或晚上睡觉时也疼吗？'},
      options: YES_NO
    },
    {
      id: 'limp',
      text: {en: 'Does the pain change how you move (limping, holding back)?', es: '¿El dolor cambia tu forma de moverte (cojear, contenerte)?', fr: 'La douleur change-t-elle ta façon de bouger (boiterie, retenue) ?', ru: 'Боль меняет то, как ты двигаешься (хромаешь, бережёшь ногу)?', ar: 'هل يغيّر الألم طريقة حركتك (عرج، تحفّظ في الحركة)؟', zh: '疼得让你改变了动作吗？（一瘸一拐、不敢用力）'},
      options: YES_NO
    },
    {
      id: 'weeks',
      text: {en: 'How long has it hurt?', es: '¿Cuánto tiempo hace que duele?', fr: 'Depuis combien de temps as-tu mal ?', ru: 'Как давно болит?', ar: 'منذ متى يؤلمك؟', zh: '疼了多久？'},
      options: [
        {value: 'short', text: {en: 'Less than 2 weeks', es: 'Menos de 2 semanas', fr: 'Moins de 2 semaines', ru: 'Меньше 2 недель', ar: 'أقل من أسبوعين', zh: '不到 2 周'}},
        {value: 'long', text: {en: '2 weeks or more', es: '2 semanas o más', fr: '2 semaines ou plus', ru: '2 недели или больше', ar: 'أسبوعان أو أكثر', zh: '2 周或更久'}}
      ]
    }
  ],
  // One painful spot on a bone can be a stress fracture. Pain at rest, limping
  // or pain lasting weeks means it is not settling on its own.
  assess: function (a) {
    if (a.boneSpot === 'yes' || a.rest === 'yes' || a.limp === 'yes' || a.weeks === 'long') return 'soon';
    return 'selfCare';
  },
  firstAid: [
    {en: 'Cut back the activity that hurts. Pain during exercise should stay at 3 out of 10 or less.', es: 'Reduce la actividad que duele. El dolor durante el ejercicio debe quedarse en 3 de 10 o menos.', fr: 'Réduis l’activité qui fait mal. La douleur pendant l’effort doit rester à 3 sur 10 ou moins.', ru: 'Сократи то, что вызывает боль. Боль во время нагрузки должна быть не больше 3 из 10.', ar: 'خفّف النشاط الذي يؤلم. يجب أن يبقى الألم أثناء التمرين 3 من 10 أو أقل.', zh: '减少引起疼痛的运动。运动时疼痛不要超过 3 分（满分 10 分）。'},
    {en: 'Switch to something that does not hurt, like cycling or swimming.', es: 'Cámbiate a algo que no duela, como bicicleta o natación.', fr: 'Passe à quelque chose qui ne fait pas mal, comme le vélo ou la natation.', ru: 'Переключись на то, что не болит, например велосипед или плавание.', ar: 'انتقل إلى نشاط لا يؤلم، مثل ركوب الدراجة أو السباحة.', zh: '换成不疼的运动，比如骑车、游泳。'},
    {en: 'Ice after activity can ease the pain.', es: 'Poner hielo después de la actividad puede aliviar el dolor.', fr: 'De la glace après l’activité peut soulager la douleur.', ru: 'Лёд после нагрузки может облегчить боль.', ar: 'الثلج بعد النشاط قد يخفف الألم.', zh: '运动后冰敷可以减轻疼痛。'},
    {en: 'Think about what changed: more training, new shoes, a harder surface?', es: 'Piensa en qué cambió: ¿más entrenamiento, zapatillas nuevas, una superficie más dura?', fr: 'Pense à ce qui a changé : plus d’entraînement, de nouvelles chaussures, un sol plus dur ?', ru: 'Подумай, что изменилось: больше тренировок, новая обувь, более жёсткое покрытие?', ar: 'فكّر فيما تغيّر: تدريب أكثر، حذاء جديد، أرضية أصلب؟', zh: '想一想最近有什么变化：训练量加大了？换了鞋？场地变硬了？'}
  ],
  where: {
    soon: [
      {en: 'Within a few days: a sports medicine doctor or a physical therapist.', es: 'En unos días: un médico de medicina deportiva o un fisioterapeuta.', fr: 'Dans les prochains jours : un médecin du sport ou un kiné.', ru: 'В ближайшие дни: спортивный врач или реабилитолог.', ar: 'خلال أيام قليلة: طبيب الطب الرياضي أو أخصائي علاج طبيعي.', zh: '几天内挂运动医学科，或找康复师（物理治疗师）。'},
      {en: 'One painful spot on a bone can be a stress fracture: stop running and jumping until it is checked.', es: 'Un punto doloroso en un hueso puede ser una fractura por estrés: deja de correr y saltar hasta que lo revisen.', fr: 'Un point douloureux sur un os peut être une fracture de fatigue : arrête de courir et de sauter jusqu’à ce qu’on l’ait examiné.', ru: 'Одна болезненная точка на кости может быть стрессовым переломом: перестань бегать и прыгать, пока её не осмотрят.', ar: 'النقطة المؤلمة الواحدة على العظم قد تكون كسرًا إجهاديًا: توقف عن الجري والقفز حتى يُفحص.', zh: '骨头上一个点疼可能是应力性骨折：检查之前不要跑跳。'}
    ],
    selfCare: [
      {en: 'No visit needed yet.', es: 'Todavía no hace falta ir al médico.', fr: 'Pas encore besoin de consulter.', ru: 'Пока к врачу идти не нужно.', ar: 'لا حاجة إلى زيارة بعد.', zh: '暂时不需要去医院。'},
      {en: 'If it is not better after 2 weeks of lighter training, see a sports medicine doctor.', es: 'Si no mejora después de 2 semanas de entrenamiento más suave, ve a un médico de medicina deportiva.', fr: 'Si ce n’est pas mieux après 2 semaines d’entraînement allégé, consulte un médecin du sport.', ru: 'Если после 2 недель облегчённых тренировок не станет лучше, обратись к спортивному врачу.', ar: 'إذا لم يتحسن بعد 2 أسبوع من التدريب الأخف، فراجع طبيب الطب الرياضي.', zh: '如果减少训练 2 周后还没好转，挂运动医学科。'}
    ]
  },
  rehabNote: {en: 'Overuse injuries heal with the right amount of load, not complete rest.', es: 'Las lesiones por sobrecarga se curan con la carga justa, no con reposo total.', fr: 'Les blessures de surmenage guérissent avec la bonne charge, pas avec un repos complet.', ru: 'Травмы от перегрузки заживают при правильной нагрузке, а не при полном покое.', ar: 'إصابات الإجهاد المتكرر تلتئم بالحمل المناسب، لا بالراحة التامة.', zh: '劳损靠的是合适的训练量来恢复，而不是完全不动。'},
  rehab: [
    {
      when: {en: 'Weeks 1–2', es: 'Semanas 1–2', fr: 'Semaines 1 à 2', ru: 'Недели 1–2', ar: 'الأسابيع 1–2', zh: '第 1–2 周'},
      days: [0, 14],
      goal: {en: 'Calm it down', es: 'Calmarlo', fr: 'Calmer la douleur', ru: 'Успокоить', ar: 'تهدئته', zh: '让疼痛平息'},
      moves: [
        {en: 'Lower the load and cross-train without pain.', es: 'Baja la carga y haz otro deporte sin dolor.', fr: 'Baisse la charge et fais un autre sport sans douleur.', ru: 'Снизь нагрузку и занимайся другим спортом без боли.', ar: 'خفّف الحمل ومارس تدريبًا بديلًا دون ألم.', zh: '减少训练量，换成不疼的运动来保持体能。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', es: 'Semanas 2–6', fr: 'Semaines 2 à 6', ru: 'Недели 2–6', ar: 'الأسابيع 2–6', zh: '第 2–6 周'},
      days: [14, 42],
      goal: {en: 'Load the tissue slowly', es: 'Cargar el tejido poco a poco', fr: 'Charger le tissu lentement', ru: 'Нагружать ткань медленно', ar: 'حمّل النسيج ببطء', zh: '慢慢给组织加负荷'},
      moves: [
        {en: 'Achilles: slow heel raises and lowers. Knee: wall sits. Elbow: slow wrist lifts with a light weight.', es: 'Aquiles: subir y bajar talones despacio. Rodilla: sentadilla en la pared. Codo: levantar la muñeca despacio con un peso ligero.', fr: 'Achille : montées et descentes lentes sur la pointe des pieds. Genou : chaise contre le mur. Coude : levées lentes du poignet avec un poids léger.', ru: 'Ахиллово сухожилие: медленные подъёмы и опускания на носках. Колено: стульчик у стены. Локоть: медленные подъёмы кисти с лёгким весом.', ar: 'وتر العرقوب: رفع الكعبين وإنزالهما ببطء. الركبة: الجلوس على الحائط. المرفق: رفع الرسغ ببطء بوزن خفيف.', zh: '跟腱：慢速提踵、慢慢放下。膝盖：靠墙静蹲。手肘：拿轻重量慢慢抬手腕。'}
      ]
    },
    {
      when: {en: 'Weeks 6–12', es: 'Semanas 6–12', fr: 'Semaines 6 à 12', ru: 'Недели 6–12', ar: 'الأسابيع 6–12', zh: '第 6–12 周'},
      days: [42, 84],
      goal: {en: 'Build back up', es: 'Volver a aumentar', fr: 'Reprendre progressivement', ru: 'Вернуться к нагрузке', ar: 'إعادة البناء', zh: '逐步恢复训练'},
      moves: [
        {en: 'Return to your sport, adding no more than about 10% more each week.', es: 'Vuelve a tu deporte, sin aumentar más de un 10% aproximadamente cada semana.', fr: 'Reprends ton sport en n’ajoutant pas plus d’environ 10 % par semaine.', ru: 'Возвращайся в свой спорт, добавляя не больше примерно 10% в неделю.', ar: 'عُد إلى رياضتك، دون أن تزيد أكثر من 10% تقريبًا كل أسبوع.', zh: '回到原来的运动，每周增加的量不超过约 10%。'}
      ]
    },
    {
      when: {en: 'Keep it away', es: 'Mantenerlo a raya', fr: 'Ne pas rechuter', ru: 'Не допустить возвращения', ar: 'أبعِده', zh: '预防复发'},
      goal: {en: 'Stop it coming back', es: 'Evitar que vuelva', fr: 'Éviter le retour de la douleur', ru: 'Чтобы боль не вернулась', ar: 'منع عودته', zh: '防止再次劳损'},
      moves: [
        {en: 'Strength training twice a week, rest days, and good shoes.', es: 'Entrenamiento de fuerza dos veces por semana, días de descanso y buen calzado.', fr: 'Renforcement deux fois par semaine, jours de repos et bonnes chaussures.', ru: 'Силовые тренировки дважды в неделю, дни отдыха и хорошая обувь.', ar: 'تمارين قوة مرتين في الأسبوع، وأيام راحة، وحذاء جيد.', zh: '每周两次力量训练，安排休息日，穿合适的鞋。'}
      ]
    }
  ]
};

var HEAT_ILLNESS = {
  id: 'heat',
  name: {en: 'Heat illness', es: 'Enfermedad por calor', fr: 'Malaise dû à la chaleur', ru: 'Перегрев', ar: 'أمراض الحر', zh: '中暑'},
  hint: {en: 'Dizzy, sick or faint in the heat', es: 'Mareo, malestar o desmayo con el calor', fr: 'Vertige, nausée ou malaise à la chaleur', ru: 'Головокружение, тошнота или обморок на жаре', ar: 'دوار أو غثيان أو إغماء في الحر', zh: '天热运动后头晕、恶心、虚弱'},
  questions: [
    {
      id: 'mind',
      text: {en: 'Is the person confused, acting strangely, slurring words, fainting, or having a seizure?', es: '¿La persona está confundida, actúa de forma extraña, arrastra las palabras, se desmaya o tiene una convulsión?', fr: 'La personne est-elle confuse, se comporte-t-elle bizarrement, parle-t-elle mal, s’évanouit-elle ou a-t-elle des convulsions ?', ru: 'Человек в замешательстве, странно себя ведёт, говорит невнятно, теряет сознание или у него судороги?', ar: 'هل الشخص مرتبك، أو يتصرف بغرابة، أو يتلعثم في الكلام، أو يُغمى عليه، أو لديه نوبة تشنج؟', zh: '伤者意识不清、行为反常、说话不清、晕倒或抽搐吗？'},
      options: YES_NO
    },
    {
      id: 'vomit',
      text: {en: 'Are they vomiting or unable to keep drinks down?', es: '¿Está vomitando o no puede retener líquidos?', fr: 'Vomit-elle ou n’arrive-t-elle pas à garder les boissons ?', ru: 'Его рвёт, или он не может удержать в себе питьё?', ar: 'هل يتقيأ أو لا يستطيع الاحتفاظ بالمشروبات؟', zh: '在呕吐，或者喝不下水吗？'},
      options: YES_NO
    },
    {
      id: 'better',
      text: {en: 'After 30 minutes resting somewhere cool and drinking, are they getting better?', es: 'Después de 30 minutos descansando en un lugar fresco y bebiendo, ¿está mejorando?', fr: 'Après 30 minutes de repos au frais en buvant, est-ce que ça va mieux ?', ru: 'После 30 минут отдыха в прохладе с питьём становится лучше?', ar: 'بعد 30 دقيقة من الراحة في مكان بارد والشرب، هل يتحسن؟', zh: '在凉快的地方休息、喝水 30 分钟后，有没有好转？'},
      options: [
        {value: 'yes', text: {en: 'Yes, getting better', es: 'Sí, está mejorando', fr: 'Oui, ça va mieux', ru: 'Да, становится лучше', ar: 'نعم، يتحسن', zh: '有，在好转'}},
        {value: 'no', text: {en: 'No, or getting worse', es: 'No, o está empeorando', fr: 'Non, ou ça empire', ru: 'Нет, или становится хуже', ar: 'لا، أو يزداد سوءًا', zh: '没有，或者更严重了'}}
      ]
    }
  ],
  // Confusion in the heat means heat stroke: the body is overheating and it
  // can be fatal. Vomiting or no improvement means fluids are needed.
  assess: function (a) {
    if (a.mind === 'yes') return 'emergency';
    if (a.vomit === 'yes' || a.better === 'no') return 'today';
    return 'selfCare';
  },
  firstAid: [
    {en: 'Stop exercising and move to shade or air conditioning.', es: 'Deja de hacer ejercicio y ve a la sombra o a un lugar con aire acondicionado.', fr: 'Arrête l’effort et va à l’ombre ou dans un endroit climatisé.', ru: 'Прекрати нагрузку и уйди в тень или под кондиционер.', ar: 'توقف عن التمرين وانتقل إلى الظل أو إلى مكان مكيّف.', zh: '停止运动，到阴凉处或有空调的地方。'},
    {en: 'Take off extra clothing and gear.', es: 'Quítate la ropa y el equipo que sobren.', fr: 'Enlève les vêtements et l’équipement en trop.', ru: 'Сними лишнюю одежду и снаряжение.', ar: 'اخلع الملابس والمعدات الزائدة.', zh: '脱掉多余的衣服和护具。'},
    {en: 'Cool down fast: cold water on the skin, fanning, ice packs on the neck, armpits and groin. If confused, cool first (cold water tub if possible) while waiting for help.', es: 'Enfría rápido: agua fría sobre la piel, abanicar, bolsas de hielo en el cuello, las axilas y las ingles. Si está confundida, enfría primero (bañera con agua fría si es posible) mientras esperas ayuda.', fr: 'Refroidis vite : eau froide sur la peau, éventail, poches de glace sur le cou, les aisselles et l’aine. En cas de confusion, refroidis d’abord (bain d’eau froide si possible) en attendant les secours.', ru: 'Охлаждай быстро: холодная вода на кожу, обмахивание, пакеты со льдом на шею, подмышки и пах. Если человек в замешательстве, сначала охлаждай (холодная ванна, если можно), пока ждёте помощь.', ar: 'برّد الجسم بسرعة: ماء بارد على الجلد، وتهوية، وأكياس ثلج على الرقبة والإبطين وأصل الفخذين. إذا كان مرتبكًا، فابدأ بالتبريد أولًا (حوض ماء بارد إن أمكن) أثناء انتظار المساعدة.', zh: '尽快降温：往皮肤上浇冷水、扇风，在脖子、腋下、大腿根放冰袋。如果意识不清，等救护车时先降温（有条件的话泡冷水）。'},
    {en: 'If fully alert, sip water or a sports drink. Do not give drinks to someone who is confused.', es: 'Si está totalmente alerta, que beba a sorbos agua o una bebida deportiva. No des de beber a alguien que está confundido.', fr: 'Si la personne est bien réveillée, fais-lui boire de petites gorgées d’eau ou de boisson de l’effort. Ne donne rien à boire à quelqu’un de confus.', ru: 'Если человек в полном сознании, пусть пьёт воду или спортивный напиток маленькими глотками. Не давай пить тому, кто в замешательстве.', ar: 'إذا كان واعيًا تمامًا، فليرتشف الماء أو مشروبًا رياضيًا. لا تعطِ مشروبات لشخص مرتبك.', zh: '如果意识清醒，小口喝水或运动饮料。意识不清的人不要喂水。'},
    {en: 'If dizzy, lie down and raise the legs.', es: 'Si hay mareo, acuéstate y levanta las piernas.', fr: 'En cas de vertige, allonge-toi et surélève les jambes.', ru: 'При головокружении ляг и подними ноги.', ar: 'إذا شعر بالدوار، فليستلقِ ويرفع ساقيه.', zh: '如果头晕，躺下并把腿垫高。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Likely heat stroke. Keep cooling until help arrives.', es: 'Probablemente es un golpe de calor. Sigue enfriando hasta que llegue la ayuda.', fr: 'Sans doute un coup de chaleur. Continue de refroidir jusqu’à l’arrivée des secours.', ru: 'Похоже на тепловой удар. Продолжай охлаждать, пока не приедет помощь.', ar: 'على الأرجح ضربة شمس. واصل التبريد حتى تصل المساعدة.', zh: '很可能是热射病（重度中暑），救护车到之前一直降温。'}],
    today: [
      {en: 'Today: urgent care or the ER. They may need fluids through a drip.', es: 'Hoy: una clínica de atención inmediata o urgencias. Puede que necesite suero por vía intravenosa.', fr: 'Aujourd’hui : un centre de soins sans rendez-vous ou les urgences. Une perfusion peut être nécessaire.', ru: 'Сегодня: травмпункт или приёмное отделение. Может понадобиться капельница.', ar: 'اليوم: عيادة الرعاية العاجلة أو قسم الطوارئ. قد يحتاج إلى سوائل عبر الوريد.', zh: '今天去急诊，可能需要输液。'}
    ],
    selfCare: [
      {en: 'No visit needed. Rest for the rest of the day.', es: 'No hace falta ir al médico. Descansa el resto del día.', fr: 'Pas besoin de consulter. Repos pour le reste de la journée.', ru: 'К врачу идти не нужно. Отдыхай до конца дня.', ar: 'لا حاجة إلى زيارة. استرح بقية اليوم.', zh: '不需要去医院，今天剩下的时间好好休息。'},
      {en: 'Go to the ER at once if confusion or fainting appears.', es: 'Ve a urgencias enseguida si aparece confusión o desmayo.', fr: 'Va tout de suite aux urgences si une confusion ou un évanouissement apparaît.', ru: 'Сразу езжай в приёмное отделение, если появится замешательство или обморок.', ar: 'اذهب إلى قسم الطوارئ فورًا إذا ظهر ارتباك أو إغماء.', zh: '如果出现意识不清或晕倒，马上去急诊。'}
    ]
  },
  rehabNote: {en: 'After heat stroke, return to exercise only when a doctor says so.', es: 'Después de un golpe de calor, vuelve al ejercicio solo cuando un médico lo diga.', fr: 'Après un coup de chaleur, ne reprends l’exercice qu’avec l’accord d’un médecin.', ru: 'После теплового удара возвращайся к тренировкам только с разрешения врача.', ar: 'بعد ضربة الشمس، لا تعد إلى التمرين إلا عندما يسمح الطبيب.', zh: '如果是热射病（重度中暑），要等医生同意才能恢复运动。'},
  rehab: [
    {
      when: {en: 'Days 0–1', es: 'Días 0–1', fr: 'Jours 0 à 1', ru: 'Дни 0–1', ar: 'الأيام 0–1', zh: '第 0–1 天'},
      days: [0, 1],
      goal: {en: 'Rest and rehydrate', es: 'Descansar e hidratarse', fr: 'Repos et réhydratation', ru: 'Отдых и восполнение жидкости', ar: 'الراحة وتعويض السوائل', zh: '休息、补水'},
      moves: [
        {en: 'No exercise. Drink until your urine is pale yellow.', es: 'Nada de ejercicio. Bebe hasta que la orina sea amarillo claro.', fr: 'Pas d’exercice. Bois jusqu’à ce que ton urine soit jaune pâle.', ru: 'Никаких тренировок. Пей, пока моча не станет светло-жёлтой.', ar: 'لا تمارين. اشرب حتى يصبح لون البول أصفر فاتحًا.', zh: '不运动。多喝水，直到尿液是淡黄色。'}
      ]
    },
    {
      when: {en: 'Days 1–3', es: 'Días 1–3', fr: 'Jours 1 à 3', ru: 'Дни 1–3', ar: 'الأيام 1–3', zh: '第 1–3 天'},
      days: [1, 3],
      goal: {en: 'Light activity in the cool', es: 'Actividad ligera en un lugar fresco', fr: 'Activité légère au frais', ru: 'Лёгкая активность в прохладе', ar: 'نشاط خفيف في مكان بارد', zh: '在凉爽环境中轻度活动'},
      moves: [
        {en: 'Short, easy sessions indoors or in the early morning.', es: 'Sesiones cortas y fáciles bajo techo o a primera hora de la mañana.', fr: 'Séances courtes et faciles, à l’intérieur ou tôt le matin.', ru: 'Короткие лёгкие тренировки в помещении или рано утром.', ar: 'تمارين قصيرة وسهلة في الداخل أو في الصباح الباكر.', zh: '在室内或清晨做短时间的轻松运动。'}
      ]
    },
    {
      when: {en: 'Weeks 1–2', es: 'Semanas 1–2', fr: 'Semaines 1 à 2', ru: 'Недели 1–2', ar: 'الأسابيع 1–2', zh: '第 1–2 周'},
      days: [3, 14],
      goal: {en: 'Get used to the heat again', es: 'Volver a acostumbrarse al calor', fr: 'Se réhabituer à la chaleur', ru: 'Снова привыкнуть к жаре', ar: 'التعوّد على الحر من جديد', zh: '重新适应高温'},
      moves: [
        {en: 'Over 10–14 days, slowly make sessions in the heat longer and harder.', es: 'Durante 10–14 días, alarga y endurece poco a poco las sesiones con calor.', fr: 'Sur 10 à 14 jours, rends peu à peu les séances à la chaleur plus longues et plus intenses.', ru: 'За 10–14 дней постепенно делай тренировки на жаре длиннее и тяжелее.', ar: 'على مدى 10–14 يومًا، اجعل التمارين في الحر أطول وأصعب ببطء.', zh: '用 10–14 天，慢慢延长在高温下运动的时间和强度。'}
      ]
    },
    {
      when: {en: 'Prevention', es: 'Prevención', fr: 'Prévention', ru: 'Профилактика', ar: 'الوقاية', zh: '预防'},
      goal: {en: 'Stop it happening again', es: 'Evitar que vuelva a pasar', fr: 'Éviter que ça recommence', ru: 'Чтобы не повторилось', ar: 'منع تكراره', zh: '防止再次中暑'},
      moves: [
        {en: 'Drink before and during exercise, avoid the hottest hours, take breaks in the shade.', es: 'Bebe antes y durante el ejercicio, evita las horas de más calor, haz pausas a la sombra.', fr: 'Bois avant et pendant l’effort, évite les heures les plus chaudes, fais des pauses à l’ombre.', ru: 'Пей до и во время нагрузки, избегай самых жарких часов, делай перерывы в тени.', ar: 'اشرب قبل التمرين وأثناءه، وتجنب أشد الساعات حرًا، وخذ استراحات في الظل.', zh: '运动前和运动中都要喝水，避开最热的时段，在阴凉处休息。'}
      ]
    }
  ]
};

// The big categories shown first. A category with several injuries asks
// which one before showing questions. Each has an icon and a color (hue,
// 0-360) so the cards are easy to tell apart and the page feels warmer.
var CATEGORIES = [
  {id: 'sprain', name: {en: 'Sprain', es: 'Esguince', fr: 'Entorse', ru: 'Растяжение связок', ar: 'التواء', zh: '扭伤'}, hint: {en: 'Ligaments: ankle, knee, wrist', es: 'Ligamentos: tobillo, rodilla, muñeca', fr: 'Ligaments : cheville, genou, poignet', ru: 'Связки: голеностоп, колено, запястье', ar: 'الأربطة: الكاحل، الركبة، الرسغ', zh: '韧带：脚踝、膝盖、手腕'}, injuries: [ANKLE_SPRAIN, OTHER_SPRAIN]},
  {id: 'strain', name: {en: 'Strain', es: 'Distensión', fr: 'Élongation', ru: 'Растяжение мышцы', ar: 'شدّ عضلي', zh: '拉伤'}, hint: {en: 'Muscles and tendons', es: 'Músculos y tendones', fr: 'Muscles et tendons', ru: 'Мышцы и сухожилия', ar: 'العضلات والأوتار', zh: '肌肉、肌腱'}, injuries: [MUSCLE_STRAIN]},
  {id: 'dislocation', name: {en: 'Dislocation', es: 'Luxación', fr: 'Luxation', ru: 'Вывих', ar: 'خلع', zh: '脱位'}, hint: {en: 'A joint popped out', es: 'Una articulación se salió', fr: 'Une articulation est sortie', ru: 'Сустав выскочил', ar: 'مفصل خرج من مكانه', zh: '关节错位'}, injuries: [PATELLA_DISLOCATION, OTHER_DISLOCATION]},
  {id: 'fracture', name: {en: 'Broken bone', es: 'Hueso roto', fr: 'Fracture', ru: 'Перелом', ar: 'كسر في العظم', zh: '骨折'}, hint: {en: 'Cracked or broken', es: 'Fisurado o roto', fr: 'Fêlure ou fracture', ru: 'Трещина или перелом', ar: 'شرخ أو كسر', zh: '骨头裂了或断了'}, injuries: [FRACTURE]},
  {id: 'concussion', name: {en: 'Head injury', es: 'Golpe en la cabeza', fr: 'Blessure à la tête', ru: 'Травма головы', ar: 'إصابة الرأس', zh: '脑震荡'}, hint: {en: 'A hit to the head', es: 'Un golpe en la cabeza', fr: 'Un choc à la tête', ru: 'Удар по голове', ar: 'ضربة على الرأس', zh: '头部被撞'}, injuries: [CONCUSSION]},
  {id: 'bruise', name: {en: 'Bruise', es: 'Contusión', fr: 'Contusion', ru: 'Ушиб', ar: 'كدمة', zh: '撞伤淤青'}, hint: {en: 'Hit by a ball or body', es: 'Golpe de un balón o de otra persona', fr: 'Touché par un ballon ou un joueur', ru: 'Удар мячом или телом', ar: 'ضربة بكرة أو بجسم', zh: '被球或人撞到'}, injuries: [BRUISE]},
  {id: 'wound', name: {en: 'Cuts and scrapes', es: 'Cortes y raspones', fr: 'Coupures et éraflures', ru: 'Порезы и ссадины', ar: 'الجروح والخدوش', zh: '擦伤割伤'}, hint: {en: 'Skin broken, bleeding', es: 'Piel abierta, sangrado', fr: 'Peau ouverte, saignement', ru: 'Кожа повреждена, кровь', ar: 'جلد مجروح، ونزيف', zh: '皮肤破了、流血'}, injuries: [WOUND]},
  {id: 'cramp', name: {en: 'Cramp', es: 'Calambre', fr: 'Crampe', ru: 'Судорога', ar: 'تشنج', zh: '抽筋'}, hint: {en: 'Muscle locks tight', es: 'El músculo se agarrota', fr: 'Le muscle se contracte d’un coup', ru: 'Мышцу свело', ar: 'العضلة تنقبض بشدة', zh: '肌肉突然绷紧'}, injuries: [CRAMP]},
  {id: 'overuse', name: {en: 'Overuse pain', es: 'Dolor por sobrecarga', fr: 'Douleur de surmenage', ru: 'Боль от перегрузки', ar: 'ألم الإجهاد المتكرر', zh: '劳损'}, hint: {en: 'Built up over time', es: 'Apareció con el tiempo', fr: 'Installée avec le temps', ru: 'Накопилась со временем', ar: 'تراكم مع الوقت', zh: '慢慢累积的疼'}, injuries: [OVERUSE]},
  {id: 'heat', name: {en: 'Heat illness', es: 'Enfermedad por calor', fr: 'Malaise dû à la chaleur', ru: 'Перегрев', ar: 'أمراض الحر', zh: '中暑'}, hint: {en: 'Dizzy or sick in the heat', es: 'Mareo o malestar con el calor', fr: 'Vertige ou malaise à la chaleur', ru: 'Головокружение или плохо на жаре', ar: 'دوار أو غثيان في الحر', zh: '天热头晕、恶心'}, injuries: [HEAT_ILLNESS]}
];

var INJURIES = CATEGORIES.reduce(function (all, c) { return all.concat(c.injuries); }, []);

// Signs that need emergency help whatever the injury, shown at the top.
var RED_FLAGS = [
  {en: 'A bone is visibly out of place or poking through the skin', es: 'Un hueso está claramente fuera de su sitio o sale por la piel', fr: 'Un os est visiblement déplacé ou sort de la peau', ru: 'Кость явно не на месте или торчит из кожи', ar: 'عظمة خارجة من مكانها بوضوح أو بارزة من الجلد', zh: '骨头明显错位，或者刺破皮肤'},
  {en: 'The foot or hand is numb, cold, pale or blue', es: 'El pie o la mano está dormido, frío, pálido o morado', fr: 'Le pied ou la main est engourdi, froid, pâle ou bleu', ru: 'Стопа или кисть онемела, холодная, бледная или синяя', ar: 'القدم أو اليد مخدّرة أو باردة أو شاحبة أو زرقاء', zh: '手脚发麻、发凉、发白或发紫'},
  {en: 'A hit to the head, then confusion, vomiting or passing out', es: 'Un golpe en la cabeza, y después confusión, vómitos o desmayo', fr: 'Un choc à la tête, puis confusion, vomissements ou perte de connaissance', ru: 'Удар по голове, а потом замешательство, рвота или потеря сознания', ar: 'ضربة على الرأس، ثم ارتباك أو تقيؤ أو فقدان وعي', zh: '头部被撞以后，出现意识不清、呕吐或昏迷'},
  {en: 'Confused or collapsing after exercising in the heat', es: 'Confusión o desmayo después de hacer ejercicio con calor', fr: 'Confus ou qui s’effondre après un effort à la chaleur', ru: 'Замешательство или падение после нагрузки на жаре', ar: 'ارتباك أو انهيار بعد التمرين في الحر', zh: '天热运动后意识不清或晕倒'},
  {en: 'Pain too strong to move at all', es: 'Dolor tan fuerte que no se puede mover nada', fr: 'Douleur trop forte pour bouger du tout', ru: 'Боль такая сильная, что невозможно пошевелиться', ar: 'ألم شديد يمنع أي حركة', zh: '疼得完全动不了'}
];

// Comfort for the feelings that come with each stage of recovery, the same
// for every injury. Shown after the rehab advice.
var COMFORT_STAGES = [
  {
    when: {en: 'Right after the injury', es: 'Justo después de la lesión', fr: 'Juste après la blessure', ru: 'Сразу после травмы', ar: 'بعد الإصابة مباشرة', zh: '刚受伤的时候'},
    words: {
      en: 'Feeling scared, angry or asking "why me" is normal. Your body is not failing you; it has already started to heal.',
      es: 'Sentir miedo, rabia o preguntarte "¿por qué a mí?" es normal. Tu cuerpo no te está fallando; ya ha empezado a curarse.',
      fr: 'Avoir peur, être en colère ou se demander « pourquoi moi » est normal. Ton corps ne te lâche pas ; il a déjà commencé à guérir.',
      ru: 'Страх, злость или вопрос «почему я» — это нормально. Твоё тело тебя не подводит: оно уже начало заживать.',
      ar: 'الشعور بالخوف أو الغضب أو التساؤل «لماذا أنا؟» أمر طبيعي. جسمك لا يخذلك؛ لقد بدأ يتعافى بالفعل.',
      zh: '害怕、生气、觉得"为什么偏偏是我"，都很正常。你的身体没有辜负你，它已经开始修复了。'
    },
    tryThis: {en: 'Tell one person how you feel today, not only how the injury feels.', es: 'Cuéntale hoy a una persona cómo te sientes, no solo cómo está la lesión.', fr: 'Dis à une personne comment tu te sens aujourd’hui, pas seulement comment va la blessure.', ru: 'Расскажи сегодня одному человеку, как ты себя чувствуешь, а не только как травма.', ar: 'أخبر شخصًا واحدًا اليوم بما تشعر به، لا بحال الإصابة فقط.', zh: '今天跟一个人说说你的心情，不只是伤口的情况。'}
  },
  {
    when: {en: 'In the middle of recovery', es: 'En mitad de la recuperación', fr: 'Au milieu de la récupération', ru: 'В середине восстановления', ar: 'في منتصف التعافي', zh: '恢复到一半的时候'},
    words: {
      en: 'Progress can feel slow, and watching others train while you can\'t is hard. Slow days are still part of getting better.',
      es: 'El progreso puede parecer lento, y ver a otros entrenar mientras tú no puedes es duro. Los días lentos también son parte de mejorar.',
      fr: 'Les progrès peuvent sembler lents, et voir les autres s’entraîner quand tu ne peux pas, c’est dur. Les jours lents font aussi partie de la guérison.',
      ru: 'Прогресс может казаться медленным, и тяжело смотреть, как другие тренируются, а ты не можешь. Медленные дни — тоже часть выздоровления.',
      ar: 'قد يبدو التقدم بطيئًا، ومشاهدة الآخرين يتدربون وأنت لا تستطيع أمر صعب. الأيام البطيئة أيضًا جزء من التحسن.',
      zh: '进步可能感觉很慢，看着别人训练自己却不能上场，很难受。慢的日子也是在变好。'
    },
    tryThis: {en: 'Write down one small thing you could do today that you could not do last week.', es: 'Escribe una cosa pequeña que hoy puedes hacer y la semana pasada no.', fr: 'Note une petite chose que tu as pu faire aujourd’hui et que tu ne pouvais pas faire la semaine dernière.', ru: 'Запиши одну маленькую вещь, которую ты смог сделать сегодня, а на прошлой неделе не мог.', ar: 'اكتب شيئًا صغيرًا واحدًا استطعت فعله اليوم ولم تستطع فعله الأسبوع الماضي.', zh: '记下一件今天能做到、上周还做不到的小事。'}
  },
  {
    when: {en: 'Getting ready to play again', es: 'Preparándote para volver a jugar', fr: 'Se préparer à rejouer', ru: 'Готовишься снова играть', ar: 'الاستعداد للعب من جديد', zh: '准备回到运动的时候'},
    words: {
      en: 'Being afraid of getting hurt again is common, even when your body is ready. Confidence comes back one session at a time.',
      es: 'Tener miedo de volver a lesionarte es común, incluso cuando tu cuerpo está listo. La confianza vuelve sesión a sesión.',
      fr: 'Avoir peur de se blesser à nouveau est courant, même quand le corps est prêt. La confiance revient une séance à la fois.',
      ru: 'Бояться снова травмироваться — обычно, даже когда тело готово. Уверенность возвращается от тренировки к тренировке.',
      ar: 'الخوف من الإصابة مرة أخرى شائع، حتى عندما يكون جسمك جاهزًا. الثقة تعود تمرينًا بعد تمرين.',
      zh: '害怕再次受伤很常见，哪怕身体已经准备好了。信心会一次一次训练慢慢回来。'
    },
    tryThis: {en: 'Start with an easy session you know you can finish, and notice that you did it.', es: 'Empieza con una sesión fácil que sepas que puedes terminar, y date cuenta de que lo hiciste.', fr: 'Commence par une séance facile que tu es sûr de finir, et remarque que tu l’as fait.', ru: 'Начни с лёгкой тренировки, которую точно сможешь закончить, и заметь, что ты это сделал.', ar: 'ابدأ بتمرين سهل تعرف أنك تستطيع إنهاءه، ولاحظ أنك فعلته.', zh: '先从一次肯定能完成的轻松训练开始，并告诉自己：我做到了。'}
  }
];

// Where to talk to a counselor. `href` opens the phone or the website.
var COUNSELING = [
  {
    name: {en: 'UIUC Counseling Center', es: 'Centro de Consejería de UIUC', fr: 'UIUC Counseling Center', ru: 'UIUC Counseling Center', ar: 'UIUC Counseling Center', zh: '伊利诺伊大学心理咨询中心'},
    detail: {en: 'Free for students · 217-333-3704', es: 'Gratis para estudiantes · 217-333-3704', fr: 'Gratuit pour les étudiants · 217-333-3704', ru: 'Бесплатно для студентов · 217-333-3704', ar: 'مجاني للطلاب · 217-333-3704', zh: '学生免费 · 217-333-3704'},
    links: [
      {label: {en: 'Call', es: 'Llamar', fr: 'Appeler', ru: 'Позвонить', ar: 'اتصال', zh: '打电话'}, href: 'tel:+12173333704'},
      {label: {en: 'Website', es: 'Sitio web', fr: 'Site web', ru: 'Сайт', ar: 'الموقع الإلكتروني', zh: '官网'}, href: 'https://counselingcenter.illinois.edu/'}
    ]
  },
  {
    name: {en: '988 Lifeline (US)', es: 'Línea 988 (EE. UU.)', fr: '988 Lifeline (États-Unis)', ru: '988 Lifeline (США)', ar: '988 Lifeline (الولايات المتحدة)', zh: '988 心理危机热线（美国）'},
    detail: {en: 'Call or text 988, any time', es: 'Llama o envía un mensaje al 988, a cualquier hora', fr: 'Appelle ou écris au 988, à toute heure', ru: 'Звони или пиши на 988, круглосуточно', ar: 'اتصل أو راسل 988، في أي وقت', zh: '电话或短信 988，全天 24 小时'},
    links: [
      {label: {en: 'Call', es: 'Llamar', fr: 'Appeler', ru: 'Позвонить', ar: 'اتصال', zh: '打电话'}, href: 'tel:988'},
      {label: {en: 'Text', es: 'Mensaje', fr: 'SMS', ru: 'Написать', ar: 'رسالة نصية', zh: '发短信'}, href: 'sms:988'}
    ]
  },
  {
    name: {en: 'Psychological help line (China)', es: 'Línea de ayuda psicológica (China)', fr: 'Ligne d’aide psychologique (Chine)', ru: 'Линия психологической помощи (Китай)', ar: 'خط الدعم النفسي (الصين)', zh: '全国心理援助热线（中国）'},
    detail: {en: '12356', es: '12356', fr: '12356', ru: '12356', ar: '12356', zh: '12356'},
    links: [
      {label: {en: 'Call', es: 'Llamar', fr: 'Appeler', ru: 'Позвонить', ar: 'اتصال', zh: '打电话'}, href: 'tel:12356'}
    ]
  }
];

// Kinds of places to search for on a map, from most to least urgent.
// `query` is the search text sent to the map, in that map's language.
var HOSPITAL_KINDS = [
  {
    name: {en: 'Emergency room', es: 'Urgencias', fr: 'Urgences', ru: 'Приёмное отделение', ar: 'قسم الطوارئ', zh: '急诊'},
    when: {en: 'Bone out of place, numbness, head injury, or pain you cannot bear.', es: 'Hueso fuera de su sitio, adormecimiento, golpe en la cabeza o dolor insoportable.', fr: 'Os déplacé, engourdissement, blessure à la tête, ou douleur insupportable.', ru: 'Кость не на месте, онемение, травма головы или невыносимая боль.', ar: 'عظمة خارج مكانها، أو خدر، أو إصابة في الرأس، أو ألم لا يُحتمل.', zh: '骨头错位、发麻、头部受伤，或者疼得受不了。'},
    query: {en: 'emergency room', es: 'emergency room', fr: 'emergency room', ru: 'emergency room', ar: 'emergency room', zh: '医院急诊'}
  },
  {
    name: {en: 'Urgent care', es: 'Atención inmediata', fr: 'Centre de soins sans rendez-vous', ru: 'Травмпункт', ar: 'عيادة الرعاية العاجلة', zh: '社区医院 / 门诊'},
    when: {en: 'Needs a doctor today but is not an emergency.', es: 'Necesita un médico hoy, pero no es una emergencia.', fr: 'Il faut un médecin aujourd’hui, mais ce n’est pas une urgence.', ru: 'Нужен врач сегодня, но это не экстренный случай.', ar: 'تحتاج إلى طبيب اليوم لكنها ليست حالة طارئة.', zh: '今天需要看医生，但不是急症。'},
    query: {en: 'urgent care', es: 'urgent care', fr: 'urgent care', ru: 'urgent care', ar: 'urgent care', zh: '社区卫生服务中心'}
  },
  {
    name: {en: 'Orthopedics / sports medicine', es: 'Traumatología / medicina deportiva', fr: 'Orthopédie / médecine du sport', ru: 'Травматология-ортопедия / спортивная медицина', ar: 'جراحة العظام / الطب الرياضي', zh: '骨科 / 运动医学科'},
    when: {en: 'Joint, ligament or bone problems that need a specialist.', es: 'Problemas de articulaciones, ligamentos o huesos que necesitan un especialista.', fr: 'Problèmes d’articulation, de ligament ou d’os qui demandent un spécialiste.', ru: 'Проблемы с суставами, связками или костями, которым нужен специалист.', ar: 'مشكلات المفاصل أو الأربطة أو العظام التي تحتاج إلى أخصائي.', zh: '关节、韧带、骨头的问题，需要专科医生。'},
    query: {en: 'sports medicine orthopedics', es: 'sports medicine orthopedics', fr: 'sports medicine orthopedics', ru: 'sports medicine orthopedics', ar: 'sports medicine orthopedics', zh: '骨科 运动医学'}
  },
  {
    name: {en: 'Physical therapy', es: 'Fisioterapia', fr: 'Kinésithérapie', ru: 'Реабилитация', ar: 'العلاج الطبيعي', zh: '康复理疗'},
    when: {en: 'Getting strength and movement back after the injury.', es: 'Recuperar la fuerza y el movimiento después de la lesión.', fr: 'Retrouver la force et le mouvement après la blessure.', ru: 'Вернуть силу и движение после травмы.', ar: 'استعادة القوة والحركة بعد الإصابة.', zh: '受伤后恢复力量和活动度。'},
    query: {en: 'physical therapy', es: 'physical therapy', fr: 'physical therapy', ru: 'physical therapy', ar: 'physical therapy', zh: '康复理疗'}
  }
];

// Map search links for a kind of place. The map app uses the visitor's own
// location, so this page never asks for it.
function mapLinks(kind) {
  return {
    google: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(kind.query.en + ' near me'),
    amap: 'https://uri.amap.com/search?keyword=' + encodeURIComponent(kind.query.zh)
  };
}

// Questions a photo can help answer, per injury. `ask` is what the AI looks
// for. `allow` limits which answers it may fill in: a photo can show a
// warning sign but cannot rule one out (numbness, for example, is invisible).
var PHOTO_CHECKS = {
  ankle: [
    {question: 'deformity', ask: 'Is the ankle clearly out of shape or bent the wrong way?', allow: ['yes']},
    {question: 'swelling', ask: 'How swollen or bruised is the ankle?'}
  ],
  sprain: [
    {question: 'deformity', ask: 'Is the joint clearly out of shape or bent the wrong way?', allow: ['yes']},
    {question: 'swelling', ask: 'How swollen or bruised is the joint?'}
  ],
  strain: [
    {question: 'gap', ask: 'Is there a visible dent or gap in the muscle?', allow: ['yes']},
    {question: 'bruise', ask: 'How much swelling or bruising is visible?'}
  ],
  patella: [
    {question: 'inPlace', ask: 'Is the kneecap visibly out of place, sitting toward the outer side of the knee?', allow: ['out']}
  ],
  dislocation: [
    {question: 'inPlace', ask: 'Is the joint visibly out of place or deformed?', allow: ['out']}
  ],
  fracture: [
    {question: 'open', ask: 'Is bone visible through the skin, or is the limb bent the wrong way?', allow: ['yes']}
  ],
  bruise: [
    {question: 'swelling', ask: 'How big is the swollen or bruised area?'}
  ],
  wound: [
    {question: 'deep', ask: 'Is the wound deep or gaping, or longer than about 1–2 cm?'},
    {question: 'dirty', ask: 'Is there visible dirt, gravel or debris in the wound?'},
    {question: 'infected', ask: 'Does the wound look infected: spreading redness, swelling or pus?', allow: ['yes']}
  ]
};

function photoChecks(injury) {
  return PHOTO_CHECKS[injury.id] || [];
}

function findQuestion(injury, id) {
  return injury.questions.filter(function (q) { return q.id === id; })[0];
}

// Answer values the AI may fill in for one photo check.
function photoAllowedValues(injury, check) {
  return check.allow || findQuestion(injury, check.question).options.map(function (o) { return o.value; });
}

// The JSON shape the AI's answer must follow: a short description, whether
// the photo shows an injury at all, and one value (or "unknown") per check.
function photoSchema(injury) {
  var properties = {isInjury: {type: 'boolean'}, description: {type: 'string'}};
  photoChecks(injury).forEach(function (check) {
    properties[check.question] = {type: 'string', enum: photoAllowedValues(injury, check).concat(['unknown'])};
  });
  return {type: 'object', properties: properties, required: Object.keys(properties)};
}

function photoPrompt(injury, outputLanguage) {
  var lines = photoChecks(injury).map(function (check) {
    var question = findQuestion(injury, check.question);
    var values = photoAllowedValues(injury, check).map(function (value) {
      var option = question.options.filter(function (o) { return o.value === value; })[0];
      return '"' + value + '" (' + option.text.en + ')';
    });
    return '- ' + check.question + ': ' + check.ask + ' Answer ' + values.join(' or ') + ', or "unknown" if the photo does not clearly show it.';
  });
  return 'This photo may show a sports injury: ' + injury.name.en + '.\n' +
    'Set isInjury to false if it does not show a body part.\n' +
    'In description, write one or two short sentences in ' + (outputLanguage === 'zh' ? 'Simplified Chinese' : 'English') +
    ' about what is visible (swelling, bruising, shape, wounds). Do not diagnose.\n' +
    'Then answer:\n' + lines.join('\n');
}

// Fill in unanswered questions from the AI's result. Answers the person gave
// are never overwritten. Returns the ids that were filled.
function applyPhotoResult(injury, answers, result) {
  if (!result || !result.isInjury) return [];
  var filled = [];
  photoChecks(injury).forEach(function (check) {
    var value = result[check.question];
    if (answers[check.question] || photoAllowedValues(injury, check).indexOf(value) === -1) return;
    answers[check.question] = value;
    filled.push(check.question);
  });
  return filled;
}

function findInjury(id) {
  for (var i = 0; i < INJURIES.length; i++) {
    if (INJURIES[i].id === id) return INJURIES[i];
  }
  return null;
}

// Question ids that have no answer yet.
function missingAnswers(injury, answers) {
  return injury.questions
    .filter(function (q) { return !answers[q.id]; })
    .map(function (q) { return q.id; });
}

// The urgency level plus all advice for a fully answered injury.
function buildAdvice(injury, answers) {
  var level = injury.assess(answers);
  var extra = injury.extraWhere ? injury.extraWhere(answers) : [];
  return {
    level: level,
    firstAid: injury.firstAid,
    where: injury.where[level].concat(extra),
    rehabNote: injury.rehabNote,
    rehab: injury.rehab
  };
}
