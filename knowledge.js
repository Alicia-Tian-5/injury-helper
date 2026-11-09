// Sports health knowledge: preventing injuries and first-aid basics. Each
// part has topics that open one at a time, so the page is not a wall of text.
// Like the injury advice in triage.js, this is general guidance, not a
// diagnosis.

var KNOWLEDGE = [
  {
    id: 'prevent',
    title: {en: 'Preventing injuries', es: 'Prevenir lesiones', zh: '预防受伤'},
    topics: [
      {
        title: {en: 'Warm up before you play', es: 'Calienta antes de jugar', zh: '运动前怎么热身'},
        points: [
          {en: 'Start with 5–10 minutes of easy movement, such as a light jog or jumping jacks, until you feel warm and slightly out of breath.',
           es: 'Empieza con 5–10 minutos de movimiento suave, como trotar despacio o hacer saltos de tijera, hasta que sientas calor y te falte un poco el aire.',
           zh: '先做 5–10 分钟轻松的活动，比如慢跑、开合跳，做到身体发热、微微喘气。'},
          {en: 'Then do moving stretches: leg swings, walking lunges, high knees and arm circles, about 10 of each.',
           es: 'Después haz estiramientos en movimiento: balanceos de pierna, zancadas caminando, rodillas arriba y círculos con los brazos, unas 10 veces cada uno.',
           zh: '再做动态拉伸：前后摆腿、弓步走、高抬腿、手臂绕圈，每个做 10 次左右。'},
          {en: 'Finish with the moves of your sport at rising speed: short sprints, jumps, dribbling or practice swings.',
           es: 'Termina con los movimientos de tu deporte cada vez más rápido: sprints cortos, saltos, regates o golpes de práctica.',
           zh: '最后做一些本项目的动作，逐渐加快：短距离冲刺、跳跃、运球或挥拍。'},
          {en: 'Save long, still stretches for after exercise; holding a stretch for a long time right before playing does not prevent injuries.',
           es: 'Deja los estiramientos largos y quietos para después del ejercicio; mantener un estiramiento mucho tiempo justo antes de jugar no previene lesiones.',
           zh: '长时间不动的静态拉伸留到运动后做；运动前长时间拉着不动并不能预防受伤。'}
        ]
      },
      {
        title: {en: 'Cool down and stretch afterwards', es: 'Vuelve a la calma y estira después', zh: '运动后怎么拉伸'},
        points: [
          {en: 'Walk or jog slowly for about 5 minutes so your heart rate comes down gradually.',
           es: 'Camina o trota despacio unos 5 minutos para que el corazón baje el ritmo poco a poco.',
           zh: '先慢走或慢跑 5 分钟左右，让心跳慢慢降下来。'},
          {en: 'Stretch calves, the backs and fronts of your thighs, hips and shoulders, holding each stretch for 20–30 seconds.',
           es: 'Estira pantorrillas, la parte de atrás y de delante de los muslos, caderas y hombros, manteniendo cada estiramiento 20–30 segundos.',
           zh: '拉伸小腿、大腿前侧和后侧、髋部和肩膀，每个动作保持 20–30 秒。'},
          {en: 'Stretch to a gentle pull, never to pain, and keep breathing slowly.',
           es: 'Estira hasta sentir un tirón suave, nunca hasta que duela, y sigue respirando despacio.',
           zh: '拉到有轻微牵拉感就好，不要拉到疼，保持慢慢呼吸。'}
        ]
      },
      {
        title: {en: 'Common injuries in each sport and how to avoid them', es: 'Lesiones comunes en cada deporte y cómo evitarlas', zh: '常见运动容易伤到哪里、怎么防'},
        points: [
          {en: 'Basketball and volleyball: ankle sprains and knee injuries. Land on both feet with your knees bent, wear shoes with good grip, and use an ankle brace or tape if you have sprained it before.',
           es: 'Baloncesto y voleibol: esguinces de tobillo y lesiones de rodilla. Aterriza con los dos pies y las rodillas dobladas, usa zapatillas con buen agarre y una tobillera o vendaje si ya te lo torciste antes.',
           zh: '篮球、排球：容易崴脚、伤膝盖。落地时双脚着地、膝盖弯曲；穿防滑的球鞋；以前崴过脚的可以戴护踝或贴扎。'},
          {en: 'Soccer: ankle and knee ligaments, hamstring strains. Warm up the backs of your thighs well and wear shin guards.',
           es: 'Fútbol: ligamentos de tobillo y rodilla, distensiones de isquiotibiales. Calienta bien la parte de atrás de los muslos y usa espinilleras.',
           zh: '足球：容易伤脚踝、膝盖韧带，拉伤大腿后侧。充分热身大腿后侧，戴护腿板。'},
          {en: 'Running: shin pain, knee pain, Achilles problems. Add no more than about 10% to your weekly distance, and replace worn-out shoes.',
           es: 'Correr: dolor en la espinilla, dolor de rodilla, problemas del tendón de Aquiles. No aumentes más de un 10% aproximadamente la distancia semanal y cambia las zapatillas gastadas.',
           zh: '跑步：容易小腿前侧疼、膝盖疼、跟腱问题。每周跑量增加不超过 10% 左右，鞋底磨损了要换。'},
          {en: 'Tennis, badminton and other racket sports: elbow, shoulder and ankle. Learn good technique and strengthen your forearm and shoulder.',
           es: 'Tenis, bádminton y otros deportes de raqueta: codo, hombro y tobillo. Aprende una buena técnica y fortalece el antebrazo y el hombro.',
           zh: '网球、羽毛球等球拍运动：容易伤手肘、肩膀和脚踝。学好正确的动作，加强前臂和肩膀的力量。'},
          {en: 'Gym and weights: lower back and shoulders. Learn the right form, start light, and have a spotter for heavy lifts.',
           es: 'Gimnasio y pesas: zona lumbar y hombros. Aprende la técnica correcta, empieza con poco peso y pide a alguien que te asista en levantamientos pesados.',
           zh: '健身、举重：容易伤腰和肩膀。先学对动作，从轻重量开始，做大重量时请人保护。'}
        ]
      },
      {
        title: {en: 'When to rest', es: 'Cuándo descansar', zh: '什么时候该休息'},
        points: [
          {en: 'Pain that gets worse while you play, or is still there the next day, is a reason to stop and rest.',
           es: 'Si el dolor empeora mientras juegas o sigue al día siguiente, es momento de parar y descansar.',
           zh: '运动中越来越疼，或者第二天还在疼，就该停下来休息。'},
          {en: 'Limping, changing the way you move to avoid pain, or swelling all mean the body needs time.',
           es: 'Cojear, cambiar tu forma de moverte para evitar el dolor o tener hinchazón significan que el cuerpo necesita tiempo.',
           zh: '走路一瘸一拐、为了躲开疼痛改变动作、出现肿胀，都说明身体需要时间恢复。'},
          {en: 'Take at least one or two rest days each week, and sleep enough: tired muscles get hurt more easily.',
           es: 'Descansa al menos uno o dos días por semana y duerme lo suficiente: los músculos cansados se lesionan más fácilmente.',
           zh: '每周至少休息一到两天，睡够觉；疲劳的肌肉更容易受伤。'},
          {en: '"No pain, no gain" does not apply to joint pain. Come back gradually after an injury instead of all at once.',
           es: '"Sin dolor no hay ganancia" no vale para el dolor de articulaciones. Después de una lesión, vuelve poco a poco y no de golpe.',
           zh: '"不疼不长进"不适用于关节疼。受伤后要循序渐进地恢复，不要一下子回到原来的强度。'}
        ]
      }
    ]
  },
  {
    id: 'firstAid',
    title: {en: 'First-aid basics', es: 'Primeros auxilios básicos', zh: '急救常识'},
    topics: [
      {
        title: {en: 'The first 48 hours after an injury', es: 'Las primeras 48 horas después de una lesión', zh: '受伤后头 48 小时该做什么'},
        points: [
          {en: 'Protect and rest: stop playing and do not put weight on or use the injured part. Use crutches if walking hurts.',
           es: 'Protege y descansa: deja de jugar y no apoyes peso ni uses la zona lesionada. Usa muletas si te duele al caminar.',
           zh: '保护和休息：马上停止运动，受伤的部位不要承重、不要用力。走路疼就用拐杖。'},
          {en: 'Ice: 15–20 minutes every 2–3 hours, with a cloth between the ice and your skin. Never put ice directly on skin.',
           es: 'Hielo: 15–20 minutos cada 2–3 horas, con un paño entre el hielo y la piel. Nunca pongas el hielo directamente sobre la piel.',
           zh: '冰敷：每 2–3 小时敷 15–20 分钟，冰和皮肤之间隔一层毛巾，不要直接贴在皮肤上。'},
          {en: 'Compress: wrap an elastic bandage firmly but not tightly. Loosen it at once if fingers or toes go numb, tingle, turn cold, pale or blue.',
           es: 'Comprime: pon una venda elástica firme pero no apretada. Aflójala enseguida si los dedos de las manos o los pies se duermen, hormiguean, se enfrían o se ponen pálidos o morados.',
           zh: '加压包扎：用弹力绷带包紧但不要太紧。如果手指或脚趾发麻、刺痛、变凉、发白或发紫，马上松开。'},
          {en: 'Elevate: raise the injured part above the level of your heart when you can, for example on pillows.',
           es: 'Eleva: cuando puedas, levanta la zona lesionada por encima del corazón, por ejemplo sobre almohadas.',
           zh: '抬高：尽量把受伤部位抬到比心脏高的位置，比如用枕头垫高。'},
          {en: 'Avoid heat, alcohol, hard massage and running on it for the first 48 hours; they can make swelling worse.',
           es: 'Evita el calor, el alcohol, los masajes fuertes y correr con la lesión durante las primeras 48 horas; pueden aumentar la hinchazón.',
           zh: '头 48 小时避免热敷、喝酒、用力按摩和继续跑跳，它们会让肿胀更严重。'}
        ]
      },
      {
        title: {en: 'Danger signs: call emergency services now', es: 'Señales de peligro: llama a emergencias ya', zh: '危险信号：出现了马上打急救电话'},
        points: [
          {en: 'A limb that looks clearly bent the wrong way, or bone through the skin.',
           es: 'Un brazo o una pierna claramente doblados hacia donde no deben, o un hueso que sale por la piel.',
           zh: '手脚明显变形、弯向不正常的方向，或者骨头露出皮肤。'},
          {en: 'A hand or foot that is numb, cold, pale or cannot move.',
           es: 'Una mano o un pie dormidos, fríos, pálidos o que no se pueden mover.',
           zh: '手或脚麻木、发凉、发白，或者完全动不了。'},
          {en: 'After a hit to the head: passing out, confusion, repeated vomiting, a headache that gets worse, or pupils of different sizes.',
           es: 'Después de un golpe en la cabeza: desmayo, confusión, vómitos repetidos, dolor de cabeza que empeora o pupilas de distinto tamaño.',
           zh: '头被撞后：昏过去、意识不清、反复呕吐、头越来越疼，或者两边瞳孔大小不一样。'},
          {en: 'A possible neck or back injury: do not move the person; keep them still until help arrives.',
           es: 'Una posible lesión de cuello o espalda: no muevas a la persona; mantenla quieta hasta que llegue la ayuda.',
           zh: '可能伤到脖子或后背：不要搬动伤者，让伤者保持不动，等急救人员来。'},
          {en: 'Bleeding that does not stop after 10 minutes of firm pressure.',
           es: 'Un sangrado que no para después de 10 minutos de presión firme.',
           zh: '用力按压 10 分钟后还止不住的出血。'},
          {en: 'Trouble breathing, chest pain, or in the heat: confusion, fainting, or hot skin that has stopped sweating.',
           es: 'Dificultad para respirar, dolor en el pecho o, con calor: confusión, desmayo o piel caliente que ya no suda.',
           zh: '呼吸困难、胸口疼；或者在高温下意识混乱、晕倒、皮肤很烫却不出汗。'},
          {en: 'Emergency numbers: 120 (China) · 911 (US).',
           es: 'Números de emergencia: 120 (China) · 911 (EE. UU.).',
           zh: '急救电话：120（中国）· 911（美国）。'}
        ]
      },
      {
        title: {en: 'What to keep in your sports bag', es: 'Qué llevar en la bolsa de deporte', zh: '运动包里该备哪些急救用品'},
        points: [
          {en: 'Instant cold packs and an elastic bandage.', es: 'Bolsas de frío instantáneo y una venda elástica.', zh: '速冷冰袋和弹力绷带。'},
          {en: 'Adhesive bandages in several sizes, sterile gauze and athletic tape.', es: 'Tiritas de varios tamaños, gasas estériles y cinta deportiva.', zh: '各种大小的创可贴、无菌纱布和运动胶布。'},
          {en: 'Antiseptic wipes or saline to clean scrapes, small scissors and disposable gloves.', es: 'Toallitas antisépticas o suero fisiológico para limpiar raspones, tijeras pequeñas y guantes desechables.', zh: '清洁伤口用的消毒湿巾或生理盐水、小剪刀和一次性手套。'},
          {en: 'Water and an electrolyte drink, especially on hot days.', es: 'Agua y una bebida con electrolitos, sobre todo en días de calor.', zh: '水和电解质饮料，天热时尤其重要。'},
          {en: 'Your own medicines (such as an asthma inhaler) and a card with emergency contacts, allergies and medical conditions.',
           es: 'Tus propios medicamentos (como un inhalador para el asma) y una tarjeta con contactos de emergencia, alergias y problemas de salud.',
           zh: '自己需要的药（比如哮喘喷雾），以及一张写着紧急联系人、过敏和病史的卡片。'}
        ]
      }
    ]
  }
];
