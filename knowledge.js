// Sports health knowledge: preventing injuries and first-aid basics. Each
// part has topics that open one at a time, so the page is not a wall of text.
// Like the injury advice in triage.js, this is general guidance, not a
// diagnosis.

var KNOWLEDGE = [
  {
    id: 'prevent',
    title: {en: 'Preventing injuries', es: 'Prevenir lesiones', fr: 'Prévenir les blessures', ru: 'Профилактика травм', zh: '预防受伤'},
    topics: [
      {
        title: {en: 'Warm up before you play', es: 'Calienta antes de jugar', fr: 'S’échauffer avant de jouer', ru: 'Разминка перед игрой', zh: '运动前怎么热身'},
        points: [
          {en: 'Start with 5–10 minutes of easy movement, such as a light jog or jumping jacks, until you feel warm and slightly out of breath.',
           es: 'Empieza con 5–10 minutos de movimiento suave, como trotar despacio o hacer saltos de tijera, hasta que sientas calor y te falte un poco el aire.',
           fr: 'Commence par 5 à 10 minutes de mouvement facile, comme un footing léger ou des jumping jacks, jusqu’à te sentir chaud et un peu essoufflé.',
           ru: 'Начни с 5–10 минут лёгкого движения, например лёгкого бега или прыжков «звёздочкой», пока не согреешься и слегка не запыхаешься.',
           zh: '先做 5–10 分钟轻松的活动，比如慢跑、开合跳，做到身体发热、微微喘气。'},
          {en: 'Then do moving stretches: leg swings, walking lunges, high knees and arm circles, about 10 of each.',
           es: 'Después haz estiramientos en movimiento: balanceos de pierna, zancadas caminando, rodillas arriba y círculos con los brazos, unas 10 veces cada uno.',
           fr: 'Puis fais des étirements en mouvement : balancements de jambes, fentes en marchant, montées de genoux et moulinets de bras, environ 10 de chaque.',
           ru: 'Затем сделай динамическую растяжку: махи ногами, выпады в ходьбе, высокое поднимание коленей и круги руками, примерно по 10 каждого.',
           zh: '再做动态拉伸：前后摆腿、弓步走、高抬腿、手臂绕圈，每个做 10 次左右。'},
          {en: 'Finish with the moves of your sport at rising speed: short sprints, jumps, dribbling or practice swings.',
           es: 'Termina con los movimientos de tu deporte cada vez más rápido: sprints cortos, saltos, regates o golpes de práctica.',
           fr: 'Termine par les gestes de ton sport à vitesse croissante : sprints courts, sauts, dribbles ou frappes d’essai.',
           ru: 'Закончи движениями своего вида спорта с нарастающей скоростью: короткие ускорения, прыжки, ведение мяча или пробные удары.',
           zh: '最后做一些本项目的动作，逐渐加快：短距离冲刺、跳跃、运球或挥拍。'},
          {en: 'Save long, still stretches for after exercise; holding a stretch for a long time right before playing does not prevent injuries.',
           es: 'Deja los estiramientos largos y quietos para después del ejercicio; mantener un estiramiento mucho tiempo justo antes de jugar no previene lesiones.',
           fr: 'Garde les longs étirements immobiles pour après l’effort ; tenir longtemps un étirement juste avant de jouer ne prévient pas les blessures.',
           ru: 'Оставь долгую статичную растяжку на после тренировки: долгое удержание растяжки прямо перед игрой не защищает от травм.',
           zh: '长时间不动的静态拉伸留到运动后做；运动前长时间拉着不动并不能预防受伤。'}
        ]
      },
      {
        title: {en: 'Cool down and stretch afterwards', es: 'Vuelve a la calma y estira después', fr: 'Retour au calme et étirements après', ru: 'Заминка и растяжка после', zh: '运动后怎么拉伸'},
        points: [
          {en: 'Walk or jog slowly for about 5 minutes so your heart rate comes down gradually.',
           es: 'Camina o trota despacio unos 5 minutos para que el corazón baje el ritmo poco a poco.',
           fr: 'Marche ou trottine lentement pendant environ 5 minutes pour que le cœur ralentisse progressivement.',
           ru: 'Ходи или медленно беги около 5 минут, чтобы пульс снижался постепенно.',
           zh: '先慢走或慢跑 5 分钟左右，让心跳慢慢降下来。'},
          {en: 'Stretch calves, the backs and fronts of your thighs, hips and shoulders, holding each stretch for 20–30 seconds.',
           es: 'Estira pantorrillas, la parte de atrás y de delante de los muslos, caderas y hombros, manteniendo cada estiramiento 20–30 segundos.',
           fr: 'Étire les mollets, l’arrière et l’avant des cuisses, les hanches et les épaules, en tenant chaque étirement 20 à 30 secondes.',
           ru: 'Растягивай икры, заднюю и переднюю поверхность бёдер, таз и плечи, удерживая каждую растяжку 20–30 секунд.',
           zh: '拉伸小腿、大腿前侧和后侧、髋部和肩膀，每个动作保持 20–30 秒。'},
          {en: 'Stretch to a gentle pull, never to pain, and keep breathing slowly.',
           es: 'Estira hasta sentir un tirón suave, nunca hasta que duela, y sigue respirando despacio.',
           fr: 'Étire jusqu’à une légère tension, jamais jusqu’à la douleur, et respire lentement.',
           ru: 'Тянись до лёгкого натяжения, никогда до боли, и дыши медленно.',
           zh: '拉到有轻微牵拉感就好，不要拉到疼，保持慢慢呼吸。'}
        ]
      },
      {
        title: {en: 'Common injuries in each sport and how to avoid them', es: 'Lesiones comunes en cada deporte y cómo evitarlas', fr: 'Blessures courantes dans chaque sport et comment les éviter', ru: 'Частые травмы в разных видах спорта и как их избежать', zh: '常见运动容易伤到哪里、怎么防'},
        points: [
          {en: 'Basketball and volleyball: ankle sprains and knee injuries. Land on both feet with your knees bent, wear shoes with good grip, and use an ankle brace or tape if you have sprained it before.',
           es: 'Baloncesto y voleibol: esguinces de tobillo y lesiones de rodilla. Aterriza con los dos pies y las rodillas dobladas, usa zapatillas con buen agarre y una tobillera o vendaje si ya te lo torciste antes.',
           fr: 'Basket et volley : entorses de la cheville et blessures du genou. Atterris sur les deux pieds avec les genoux pliés, porte des chaussures qui accrochent bien, et utilise une chevillère ou un strapping si tu t’es déjà fait une entorse.',
           ru: 'Баскетбол и волейбол: растяжения голеностопа и травмы колена. Приземляйся на обе ноги с согнутыми коленями, носи обувь с хорошим сцеплением и используй бандаж или тейп на голеностоп, если раньше уже было растяжение.',
           zh: '篮球、排球：容易崴脚、伤膝盖。落地时双脚着地、膝盖弯曲；穿防滑的球鞋；以前崴过脚的可以戴护踝或贴扎。'},
          {en: 'Soccer: ankle and knee ligaments, hamstring strains. Warm up the backs of your thighs well and wear shin guards.',
           es: 'Fútbol: ligamentos de tobillo y rodilla, distensiones de isquiotibiales. Calienta bien la parte de atrás de los muslos y usa espinilleras.',
           fr: 'Football : ligaments de la cheville et du genou, élongations des ischio-jambiers. Échauffe bien l’arrière des cuisses et porte des protège-tibias.',
           ru: 'Футбол: связки голеностопа и колена, растяжения задней поверхности бедра. Хорошо разогревай заднюю поверхность бёдер и носи щитки.',
           zh: '足球：容易伤脚踝、膝盖韧带，拉伤大腿后侧。充分热身大腿后侧，戴护腿板。'},
          {en: 'Running: shin pain, knee pain, Achilles problems. Add no more than about 10% to your weekly distance, and replace worn-out shoes.',
           es: 'Correr: dolor en la espinilla, dolor de rodilla, problemas del tendón de Aquiles. No aumentes más de un 10% aproximadamente la distancia semanal y cambia las zapatillas gastadas.',
           fr: 'Course à pied : douleur aux tibias, au genou, problèmes du tendon d’Achille. N’ajoute pas plus d’environ 10 % à ta distance par semaine, et remplace les chaussures usées.',
           ru: 'Бег: боль в голенях, боль в колене, проблемы с ахилловым сухожилием. Добавляй к недельному километражу не больше примерно 10% и меняй изношенную обувь.',
           zh: '跑步：容易小腿前侧疼、膝盖疼、跟腱问题。每周跑量增加不超过 10% 左右，鞋底磨损了要换。'},
          {en: 'Tennis, badminton and other racket sports: elbow, shoulder and ankle. Learn good technique and strengthen your forearm and shoulder.',
           es: 'Tenis, bádminton y otros deportes de raqueta: codo, hombro y tobillo. Aprende una buena técnica y fortalece el antebrazo y el hombro.',
           fr: 'Tennis, badminton et autres sports de raquette : coude, épaule et cheville. Apprends une bonne technique et renforce l’avant-bras et l’épaule.',
           ru: 'Теннис, бадминтон и другие виды с ракеткой: локоть, плечо и голеностоп. Учись правильной технике и укрепляй предплечье и плечо.',
           zh: '网球、羽毛球等球拍运动：容易伤手肘、肩膀和脚踝。学好正确的动作，加强前臂和肩膀的力量。'},
          {en: 'Gym and weights: lower back and shoulders. Learn the right form, start light, and have a spotter for heavy lifts.',
           es: 'Gimnasio y pesas: zona lumbar y hombros. Aprende la técnica correcta, empieza con poco peso y pide a alguien que te asista en levantamientos pesados.',
           fr: 'Salle de sport et musculation : bas du dos et épaules. Apprends la bonne posture, commence léger, et fais-toi assurer pour les charges lourdes.',
           ru: 'Тренажёрный зал и штанга: поясница и плечи. Учись правильной технике, начинай с лёгкого веса и проси страховать на тяжёлых подходах.',
           zh: '健身、举重：容易伤腰和肩膀。先学对动作，从轻重量开始，做大重量时请人保护。'}
        ]
      },
      {
        title: {en: 'When to rest', es: 'Cuándo descansar', fr: 'Quand se reposer', ru: 'Когда отдыхать', zh: '什么时候该休息'},
        points: [
          {en: 'Pain that gets worse while you play, or is still there the next day, is a reason to stop and rest.',
           es: 'Si el dolor empeora mientras juegas o sigue al día siguiente, es momento de parar y descansar.',
           fr: 'Une douleur qui augmente pendant le jeu, ou qui est encore là le lendemain, est une raison de s’arrêter et de se reposer.',
           ru: 'Боль, которая усиливается во время игры или остаётся на следующий день, — повод остановиться и отдохнуть.',
           zh: '运动中越来越疼，或者第二天还在疼，就该停下来休息。'},
          {en: 'Limping, changing the way you move to avoid pain, or swelling all mean the body needs time.',
           es: 'Cojear, cambiar tu forma de moverte para evitar el dolor o tener hinchazón significan que el cuerpo necesita tiempo.',
           fr: 'Boiter, changer sa façon de bouger pour éviter la douleur, ou un gonflement : tout ça veut dire que le corps a besoin de temps.',
           ru: 'Хромота, изменение движений, чтобы избежать боли, или отёк — всё это значит, что телу нужно время.',
           zh: '走路一瘸一拐、为了躲开疼痛改变动作、出现肿胀，都说明身体需要时间恢复。'},
          {en: 'Take at least one or two rest days each week, and sleep enough: tired muscles get hurt more easily.',
           es: 'Descansa al menos uno o dos días por semana y duerme lo suficiente: los músculos cansados se lesionan más fácilmente.',
           fr: 'Prends au moins un ou deux jours de repos par semaine, et dors assez : les muscles fatigués se blessent plus facilement.',
           ru: 'Отдыхай хотя бы один-два дня в неделю и высыпайся: уставшие мышцы травмируются легче.',
           zh: '每周至少休息一到两天，睡够觉；疲劳的肌肉更容易受伤。'},
          {en: '"No pain, no gain" does not apply to joint pain. Come back gradually after an injury instead of all at once.',
           es: '"Sin dolor no hay ganancia" no vale para el dolor de articulaciones. Después de una lesión, vuelve poco a poco y no de golpe.',
           fr: '« Pas de douleur, pas de progrès » ne s’applique pas aux douleurs articulaires. Après une blessure, reprends progressivement plutôt que d’un coup.',
           ru: '«Без боли нет результата» не относится к боли в суставах. После травмы возвращайся постепенно, а не сразу.',
           zh: '"不疼不长进"不适用于关节疼。受伤后要循序渐进地恢复，不要一下子回到原来的强度。'}
        ]
      }
    ]
  },
  {
    id: 'firstAid',
    title: {en: 'First-aid basics', es: 'Primeros auxilios básicos', fr: 'Les bases des premiers secours', ru: 'Основы первой помощи', zh: '急救常识'},
    topics: [
      {
        title: {en: 'The first 48 hours after an injury', es: 'Las primeras 48 horas después de una lesión', fr: 'Les 48 premières heures après une blessure', ru: 'Первые 48 часов после травмы', zh: '受伤后头 48 小时该做什么'},
        points: [
          {en: 'Protect and rest: stop playing and do not put weight on or use the injured part. Use crutches if walking hurts.',
           es: 'Protege y descansa: deja de jugar y no apoyes peso ni uses la zona lesionada. Usa muletas si te duele al caminar.',
           fr: 'Protéger et reposer : arrête de jouer et ne mets pas de poids sur la partie blessée, ne t’en sers pas. Utilise des béquilles si marcher fait mal.',
           ru: 'Защити и дай покой: прекрати игру и не нагружай и не используй травмированную часть. Используй костыли, если больно ходить.',
           zh: '保护和休息：马上停止运动，受伤的部位不要承重、不要用力。走路疼就用拐杖。'},
          {en: 'Ice: 15–20 minutes every 2–3 hours, with a cloth between the ice and your skin. Never put ice directly on skin.',
           es: 'Hielo: 15–20 minutos cada 2–3 horas, con un paño entre el hielo y la piel. Nunca pongas el hielo directamente sobre la piel.',
           fr: 'Glace : 15 à 20 minutes toutes les 2 à 3 heures, avec un tissu entre la glace et la peau. Ne mets jamais la glace directement sur la peau.',
           ru: 'Лёд: 15–20 минут каждые 2–3 часа, через ткань между льдом и кожей. Никогда не клади лёд прямо на кожу.',
           zh: '冰敷：每 2–3 小时敷 15–20 分钟，冰和皮肤之间隔一层毛巾，不要直接贴在皮肤上。'},
          {en: 'Compress: wrap an elastic bandage firmly but not tightly. Loosen it at once if fingers or toes go numb, tingle, turn cold, pale or blue.',
           es: 'Comprime: pon una venda elástica firme pero no apretada. Aflójala enseguida si los dedos de las manos o los pies se duermen, hormiguean, se enfrían o se ponen pálidos o morados.',
           fr: 'Compression : mets une bande élastique ferme mais pas serrée. Desserre-la tout de suite si les doigts ou les orteils s’engourdissent, picotent, deviennent froids, pâles ou bleus.',
           ru: 'Давящая повязка: наложи эластичный бинт плотно, но не туго. Сразу ослабь, если пальцы немеют, покалывают, становятся холодными, бледными или синими.',
           zh: '加压包扎：用弹力绷带包紧但不要太紧。如果手指或脚趾发麻、刺痛、变凉、发白或发紫，马上松开。'},
          {en: 'Elevate: raise the injured part above the level of your heart when you can, for example on pillows.',
           es: 'Eleva: cuando puedas, levanta la zona lesionada por encima del corazón, por ejemplo sobre almohadas.',
           fr: 'Surélévation : place la partie blessée au-dessus du niveau du cœur quand tu peux, par exemple sur des oreillers.',
           ru: 'Приподними: держи травмированную часть выше уровня сердца, когда можешь, например на подушках.',
           zh: '抬高：尽量把受伤部位抬到比心脏高的位置，比如用枕头垫高。'},
          {en: 'Avoid heat, alcohol, hard massage and running on it for the first 48 hours; they can make swelling worse.',
           es: 'Evita el calor, el alcohol, los masajes fuertes y correr con la lesión durante las primeras 48 horas; pueden aumentar la hinchazón.',
           fr: 'Évite la chaleur, l’alcool, les massages forts et la course pendant les 48 premières heures ; ils peuvent aggraver le gonflement.',
           ru: 'Первые 48 часов избегай тепла, алкоголя, сильного массажа и бега на травмированной ноге: они могут усилить отёк.',
           zh: '头 48 小时避免热敷、喝酒、用力按摩和继续跑跳，它们会让肿胀更严重。'}
        ]
      },
      {
        title: {en: 'Danger signs: call emergency services now', es: 'Señales de peligro: llama a emergencias ya', fr: 'Signes de danger : appelle les urgences maintenant', ru: 'Опасные признаки: звони в экстренные службы сейчас', zh: '危险信号：出现了马上打急救电话'},
        points: [
          {en: 'A limb that looks clearly bent the wrong way, or bone through the skin.',
           es: 'Un brazo o una pierna claramente doblados hacia donde no deben, o un hueso que sale por la piel.',
           fr: 'Un membre clairement tordu dans le mauvais sens, ou un os qui sort de la peau.',
           ru: 'Конечность явно согнута не в ту сторону, или кость торчит из кожи.',
           zh: '手脚明显变形、弯向不正常的方向，或者骨头露出皮肤。'},
          {en: 'A hand or foot that is numb, cold, pale or cannot move.',
           es: 'Una mano o un pie dormidos, fríos, pálidos o que no se pueden mover.',
           fr: 'Une main ou un pied engourdi, froid, pâle ou qui ne bouge plus.',
           ru: 'Кисть или стопа онемела, холодная, бледная или не двигается.',
           zh: '手或脚麻木、发凉、发白，或者完全动不了。'},
          {en: 'After a hit to the head: passing out, confusion, repeated vomiting, a headache that gets worse, or pupils of different sizes.',
           es: 'Después de un golpe en la cabeza: desmayo, confusión, vómitos repetidos, dolor de cabeza que empeora o pupilas de distinto tamaño.',
           fr: 'Après un choc à la tête : perte de connaissance, confusion, vomissements répétés, mal de tête qui s’aggrave, ou pupilles de tailles différentes.',
           ru: 'После удара по голове: потеря сознания, замешательство, повторная рвота, усиливающаяся головная боль или зрачки разного размера.',
           zh: '头被撞后：昏过去、意识不清、反复呕吐、头越来越疼，或者两边瞳孔大小不一样。'},
          {en: 'A possible neck or back injury: do not move the person; keep them still until help arrives.',
           es: 'Una posible lesión de cuello o espalda: no muevas a la persona; mantenla quieta hasta que llegue la ayuda.',
           fr: 'Une blessure possible au cou ou au dos : ne déplace pas la personne ; garde-la immobile jusqu’à l’arrivée des secours.',
           ru: 'Возможная травма шеи или спины: не перемещай человека; держи его неподвижно, пока не приедет помощь.',
           zh: '可能伤到脖子或后背：不要搬动伤者，让伤者保持不动，等急救人员来。'},
          {en: 'Bleeding that does not stop after 10 minutes of firm pressure.',
           es: 'Un sangrado que no para después de 10 minutos de presión firme.',
           fr: 'Un saignement qui ne s’arrête pas après 10 minutes de pression ferme.',
           ru: 'Кровотечение, которое не останавливается после 10 минут сильного давления.',
           zh: '用力按压 10 分钟后还止不住的出血。'},
          {en: 'Trouble breathing, chest pain, or in the heat: confusion, fainting, or hot skin that has stopped sweating.',
           es: 'Dificultad para respirar, dolor en el pecho o, con calor: confusión, desmayo o piel caliente que ya no suda.',
           fr: 'Du mal à respirer, une douleur à la poitrine, ou à la chaleur : confusion, évanouissement, ou peau chaude qui ne transpire plus.',
           ru: 'Трудно дышать, боль в груди, или на жаре: замешательство, обморок или горячая кожа, которая перестала потеть.',
           zh: '呼吸困难、胸口疼；或者在高温下意识混乱、晕倒、皮肤很烫却不出汗。'},
          {en: 'Emergency numbers: 120 (China) · 911 (US).',
           es: 'Números de emergencia: 120 (China) · 911 (EE. UU.).',
           fr: 'Numéros d’urgence : 120 (Chine) · 911 (États-Unis).',
           ru: 'Экстренные номера: 120 (Китай) · 911 (США).',
           zh: '急救电话：120（中国）· 911（美国）。'}
        ]
      },
      {
        title: {en: 'What to keep in your sports bag', es: 'Qué llevar en la bolsa de deporte', fr: 'Quoi garder dans ton sac de sport', ru: 'Что держать в спортивной сумке', zh: '运动包里该备哪些急救用品'},
        points: [
          {en: 'Instant cold packs and an elastic bandage.', es: 'Bolsas de frío instantáneo y una venda elástica.', fr: 'Des poches de froid instantané et une bande élastique.', ru: 'Пакеты мгновенного охлаждения и эластичный бинт.', zh: '速冷冰袋和弹力绷带。'},
          {en: 'Adhesive bandages in several sizes, sterile gauze and athletic tape.', es: 'Tiritas de varios tamaños, gasas estériles y cinta deportiva.', fr: 'Des pansements de plusieurs tailles, des compresses stériles et du strap.', ru: 'Пластыри разных размеров, стерильная марля и спортивный тейп.', zh: '各种大小的创可贴、无菌纱布和运动胶布。'},
          {en: 'Antiseptic wipes or saline to clean scrapes, small scissors and disposable gloves.', es: 'Toallitas antisépticas o suero fisiológico para limpiar raspones, tijeras pequeñas y guantes desechables.', fr: 'Des lingettes antiseptiques ou du sérum physiologique pour nettoyer les éraflures, de petits ciseaux et des gants jetables.', ru: 'Антисептические салфетки или физраствор для промывания ссадин, маленькие ножницы и одноразовые перчатки.', zh: '清洁伤口用的消毒湿巾或生理盐水、小剪刀和一次性手套。'},
          {en: 'Water and an electrolyte drink, especially on hot days.', es: 'Agua y una bebida con electrolitos, sobre todo en días de calor.', fr: 'De l’eau et une boisson électrolytique, surtout les jours chauds.', ru: 'Вода и напиток с электролитами, особенно в жаркие дни.', zh: '水和电解质饮料，天热时尤其重要。'},
          {en: 'Your own medicines (such as an asthma inhaler) and a card with emergency contacts, allergies and medical conditions.',
           es: 'Tus propios medicamentos (como un inhalador para el asma) y una tarjeta con contactos de emergencia, alergias y problemas de salud.',
           fr: 'Tes propres médicaments (comme un inhalateur pour l’asthme) et une carte avec tes contacts d’urgence, tes allergies et tes problèmes de santé.',
           ru: 'Твои собственные лекарства (например, ингалятор от астмы) и карточка с экстренными контактами, аллергиями и заболеваниями.',
           zh: '自己需要的药（比如哮喘喷雾），以及一张写着紧急联系人、过敏和病史的卡片。'}
        ]
      }
    ]
  }
];
