// Injury questions, how answers map to an urgency level, and the advice for
// each level. Every piece of text is {en, zh}. No page code here, so the
// assessment rules can be tested on their own (see tests.html).

// Urgency levels, most urgent first.
var LEVELS = {
  emergency: {
    rank: 0,
    label: {en: 'Emergency', zh: '紧急'},
    summary: {
      en: 'Call emergency services or go to the emergency room now.',
      zh: '立刻拨打急救电话或去急诊。'
    }
  },
  today: {
    rank: 1,
    label: {en: 'See a doctor today', zh: '今天就医'},
    summary: {
      en: 'This needs an X-ray or exam today. Do not wait to see if it gets better.',
      zh: '今天就需要拍片或检查，不要等着看会不会好转。'
    }
  },
  soon: {
    rank: 2,
    label: {en: 'See a doctor within a few days', zh: '几天内就医'},
    summary: {
      en: 'Take care of it yourself for now, and book a visit in the next few days.',
      zh: '先自己处理，几天内去医院看一下。'
    }
  },
  selfCare: {
    rank: 3,
    label: {en: 'Self-care and watch', zh: '自己处理，继续观察'},
    summary: {
      en: 'Most likely a mild injury. See a doctor if it is not clearly better in a week.',
      zh: '大概率是轻度损伤。如果一周内没有明显好转，再去看医生。'
    }
  }
};

// Answers and first-aid steps that several injuries share.
var YES_NO = [
  {value: 'yes', text: {en: 'Yes', zh: '是'}},
  {value: 'no', text: {en: 'No', zh: '否'}}
];
var STOP = {en: 'Stop playing right away. Do not try to play through it.', zh: '马上停止运动，不要硬撑着继续。'};
var ICE = {en: 'Ice for 15–20 minutes every 2–3 hours, with a cloth between the ice and the skin.', zh: '冰敷 15–20 分钟，每 2–3 小时一次。冰袋外面包一层毛巾，不要直接贴皮肤。'};
var COMPRESS = {en: 'Wrap with an elastic bandage, firm but not tight. Loosen it if it tingles or turns pale.', zh: '用弹力绷带包扎，紧但不要太紧。如果发麻或发白，就松一点。'};
var ELEVATE = {en: 'Raise the injured part above the level of the heart when you can.', zh: '尽量把受伤部位垫高到比心脏高。'};
var NO_HEAT = {en: 'For the first 2–3 days: no heat, no massage, no alcohol. They increase swelling.', zh: '前 2–3 天不要热敷、不要按摩、不要喝酒，这些会让肿胀更严重。'};
var NO_PUSH_BACK = {en: 'Do not push the joint back yourself, and do not let others try.', zh: '不要自己把关节推回去，也不要让别人帮你推。'};
var CALL_EMERGENCY = {en: 'Call 911 (US) / 120 (China), or go to the emergency room (ER) now.', zh: '马上打 120（中国）/ 911（美国），或者直接去急诊。'};

var ANKLE_SPRAIN = {
  id: 'ankle',
  name: {en: 'Ankle sprain', zh: '脚踝扭伤'},
  hint: {en: 'Rolled or twisted ankle', zh: '崴脚、脚踝扭到'},
  questions: [
    {
      id: 'deformity',
      text: {
        en: 'Does the ankle look out of shape, or is the foot numb, cold or pale?',
        zh: '脚踝看起来变形了吗？或者脚发麻、发凉、发白？'
      },
      options: [
        {value: 'yes', text: {en: 'Yes', zh: '是'}},
        {value: 'no', text: {en: 'No', zh: '没有'}}
      ]
    },
    {
      id: 'walk',
      text: {
        en: 'Can you take four steps on the injured foot?',
        zh: '受伤的脚能走四步吗？'
      },
      options: [
        {value: 'yes', text: {en: 'Yes, almost normally', zh: '能，差不多正常'}},
        {value: 'pain', text: {en: 'Yes, but it hurts or I limp', zh: '能，但很疼或一瘸一拐'}},
        {value: 'no', text: {en: 'No', zh: '不能'}}
      ]
    },
    {
      id: 'bonePain',
      text: {
        en: 'Press the bony bumps on either side of the ankle, and the bone on the outer edge of the foot halfway to the little toe. Does pressing on bone hurt?',
        zh: '按一按脚踝两侧突出的骨头，以及脚外侧中间（往小脚趾方向）的骨头。按骨头的时候疼吗？'
      },
      options: [
        {value: 'yes', text: {en: 'Yes', zh: '疼'}},
        {value: 'no', text: {en: 'No, only the soft part hurts', zh: '不疼，只有软的地方疼'}}
      ]
    },
    {
      id: 'swelling',
      text: {en: 'How much swelling or bruising is there?', zh: '肿胀或淤青有多严重？'},
      options: [
        {value: 'mild', text: {en: 'Little or none', zh: '很轻或没有'}},
        {value: 'moderate', text: {en: 'Clearly swollen', zh: '明显肿了'}},
        {value: 'severe', text: {en: 'Very swollen or bruised', zh: '肿得很厉害或大片淤青'}}
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
    {en: 'Stop playing. Do not "walk it off".', zh: '马上停止运动，不要硬撑着继续走。'},
    {en: 'Ice for 15–20 minutes every 2–3 hours, with a cloth between the ice and the skin.', zh: '冰敷 15–20 分钟，每 2–3 小时一次。冰袋外面包一层毛巾，不要直接贴皮肤。'},
    {en: 'Wrap with an elastic bandage from the toes up. Loosen it if the toes tingle or turn pale.', zh: '用弹力绷带从脚趾往上包扎。如果脚趾发麻或发白，就松一点。'},
    {en: 'Raise the ankle above the level of the heart when sitting or lying down.', zh: '坐着或躺着时，把脚踝垫高到比心脏高。'},
    {en: 'For the first 2–3 days: no heat, no massage, no alcohol. They increase swelling.', zh: '前 2–3 天不要热敷、不要按摩、不要喝酒，这些会让肿胀更严重。'}
  ],
  where: {
    emergency: [
      {en: 'Emergency room (ER) now. Call 911 (US) / 120 (China) if you cannot get there safely.', zh: '马上去急诊。如果没办法安全到达，打 120（中国）/ 911（美国）。'},
      {en: 'Do not try to straighten the ankle yourself.', zh: '不要自己尝试把脚踝掰正。'}
    ],
    today: [
      {en: 'Today: urgent care or the ER for an X-ray, to rule out a broken bone.', zh: '今天去急诊或骨科门诊拍 X 光片，排除骨折。'},
      {en: 'Use crutches or have someone help you. Do not put weight on it until it has been checked.', zh: '用拐杖或让别人扶着，检查之前不要让受伤的脚承重。'}
    ],
    soon: [
      {en: 'Within a few days: a sports medicine doctor or orthopedics.', zh: '几天内挂运动医学科或骨科。'},
      {en: 'Go sooner if the pain gets worse or you cannot walk on it.', zh: '如果越来越疼或者没法走路，要提前去。'}
    ],
    selfCare: [
      {en: 'No visit needed right now.', zh: '现在不需要去医院。'},
      {en: 'If it is not clearly better in a week, see a sports medicine doctor.', zh: '如果一周内没有明显好转，挂运动医学科。'}
    ]
  },
  rehabNote: {
    en: 'If a doctor has not ruled out a fracture yet, wait for their go-ahead before starting.',
    zh: '如果还没排除骨折，要等医生同意后再开始。'
  },
  rehab: [
    {
      when: {en: 'Days 0–3', zh: '第 0–3 天'},
      goal: {en: 'Calm the swelling', zh: '消肿'},
      moves: [
        {en: 'Rest, ice and raise the ankle (see above).', zh: '休息、冰敷、抬高（见上面）。'},
        {en: 'Ankle pumps: point and flex the foot 20 times, several times a day, only where it does not hurt.', zh: '勾脚绷脚：每次 20 下，一天几次，只在不疼的范围内做。'}
      ]
    },
    {
      when: {en: 'Days 3–14', zh: '第 3–14 天'},
      goal: {en: 'Move normally again', zh: '恢复正常活动'},
      moves: [
        {en: 'Walk normally as far as pain allows.', zh: '在疼痛允许的范围内正常走路。'},
        {en: 'Trace the alphabet in the air with your toes.', zh: '用脚趾在空中写字母。'},
        {en: 'Resistance band: push the foot down, up, in and out, 10–15 times each.', zh: '弹力带练习：脚往下、往上、往里、往外各推 10–15 下。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', zh: '第 2–6 周'},
      goal: {en: 'Strength and balance', zh: '力量和平衡'},
      moves: [
        {en: 'Stand on the injured foot for 30 seconds. When easy, close your eyes.', zh: '单脚站在受伤的脚上 30 秒，觉得容易了就闭上眼睛做。'},
        {en: 'Heel raises: 3 sets of 15.', zh: '提踵：3 组，每组 15 下。'},
        {en: 'Start light jogging once walking does not hurt.', zh: '走路不疼以后，开始慢跑。'}
      ]
    },
    {
      when: {en: 'Back to sport', zh: '恢复运动'},
      goal: {en: 'Ready when you can hop on the injured foot without pain', zh: '受伤的脚能单脚跳且不疼，就可以恢复运动'},
      moves: [
        {en: 'Hopping, side-to-side jumps, quick changes of direction.', zh: '单脚跳、左右跳、快速变向。'},
        {en: 'Tape or a brace for the first few months back.', zh: '恢复运动的前几个月，用肌贴或护踝保护。'}
      ]
    }
  ]
};

var PATELLA_DISLOCATION = {
  id: 'patella',
  name: {en: 'Kneecap dislocation', zh: '髌骨脱位'},
  hint: {en: 'Kneecap slipped out to the side', zh: '膝盖骨滑到侧面去了'},
  questions: [
    {
      id: 'inPlace',
      text: {
        en: 'Is the kneecap still out of place (a bump on the outer side, the knee stuck bent)?',
        zh: '膝盖骨现在还在外面吗？（膝盖外侧鼓起来，腿伸不直）'
      },
      options: [
        {value: 'out', text: {en: 'Yes, still out', zh: '是，还在外面'}},
        {value: 'back', text: {en: 'No, it went back by itself', zh: '没有，已经自己回去了'}},
        {value: 'unsure', text: {en: 'Not sure', zh: '不确定'}}
      ]
    },
    {
      id: 'swelling',
      text: {en: 'Did the knee swell up a lot within a few hours?', zh: '几小时内膝盖肿得很厉害吗？'},
      options: [
        {value: 'yes', text: {en: 'Yes', zh: '是'}},
        {value: 'no', text: {en: 'No, only a little', zh: '没有，只肿了一点'}}
      ]
    },
    {
      id: 'locking',
      text: {
        en: 'Does the knee lock, catch, or feel like something loose is inside?',
        zh: '膝盖会卡住、弹响，或者感觉里面有东西松了吗？'
      },
      options: [
        {value: 'yes', text: {en: 'Yes', zh: '会'}},
        {value: 'no', text: {en: 'No', zh: '不会'}}
      ]
    },
    {
      id: 'before',
      text: {en: 'Has your kneecap dislocated before?', zh: '以前髌骨脱位过吗？'},
      options: [
        {value: 'first', text: {en: 'No, this is the first time', zh: '没有，这是第一次'}},
        {value: 'again', text: {en: 'Yes, it has happened before', zh: '有，以前发生过'}}
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
    {en: 'Stop playing and sit or lie down.', zh: '马上停止运动，坐下或躺下。'},
    {en: 'Do not push the kneecap back yourself, and do not let others try.', zh: '不要自己把膝盖骨推回去，也不要让别人帮你推。'},
    {en: 'Support the knee in the position that hurts least, with a pillow or rolled jacket.', zh: '用枕头或卷起来的衣服垫着，让膝盖保持在最不疼的姿势。'},
    {en: 'Ice for 15–20 minutes with a cloth between the ice and the skin.', zh: '冰敷 15–20 分钟，冰袋外面包一层毛巾。'},
    {en: 'Do not walk on it. Use crutches or get help.', zh: '不要用这条腿走路，用拐杖或让别人扶。'}
  ],
  where: {
    emergency: [
      {en: 'Emergency room (ER) now. Call 911 (US) / 120 (China) if you cannot get there without walking on the leg.', zh: '马上去急诊。如果不走路就没法到医院，打 120（中国）/ 911（美国）。'},
      {en: 'A doctor will put the kneecap back and take an X-ray.', zh: '医生会把膝盖骨复位，并拍 X 光片。'}
    ],
    today: [
      {en: 'Today: the ER or orthopedics for an X-ray. Big swelling or locking can mean a piece of bone or cartilage broke off.', zh: '今天去急诊或骨科拍 X 光片。肿得厉害或膝盖卡住，可能是有骨头或软骨碎片掉下来了。'},
      {en: 'You may need an MRI. Ask to be seen by sports medicine or a knee specialist.', zh: '可能需要做核磁共振（MRI）。可以要求挂运动医学科或膝关节专科。'}
    ],
    soon: [
      {en: 'Within 1–2 days: orthopedics or sports medicine, even if the knee feels fine. It still needs an X-ray.', zh: '1–2 天内挂骨科或运动医学科，就算膝盖感觉没事也要去，还是需要拍 X 光片。'}
    ]
  },
  // Extra advice that depends on a specific answer rather than the level.
  extraWhere: function (a) {
    if (a.before !== 'again') return [];
    return [{
      en: 'Because it has happened before, ask a sports medicine surgeon whether surgery to stabilize the kneecap makes sense.',
      zh: '因为不是第一次了，可以问问运动医学科的医生，是否需要做稳定髌骨的手术。'
    }];
  },
  rehabNote: {
    en: 'Start only after a doctor has checked the knee. Timing varies a lot; follow your doctor or physical therapist.',
    zh: '要等医生检查过膝盖以后再开始。每个人恢复时间差别很大，以医生或康复师的安排为准。'
  },
  rehab: [
    {
      when: {en: 'Weeks 0–2', zh: '第 0–2 周'},
      goal: {en: 'Protect the knee, keep the thigh working', zh: '保护膝盖，保持大腿肌肉不萎缩'},
      moves: [
        {en: 'Wear the brace and use crutches as the doctor says.', zh: '按医生说的戴护具、用拐杖。'},
        {en: 'Quad sets: tighten the front of the thigh for 5 seconds, 20 times.', zh: '股四头肌收缩：绷紧大腿前侧 5 秒，做 20 次。'},
        {en: 'Straight leg raises lying down: 3 sets of 10.', zh: '躺着直腿抬高：3 组，每组 10 下。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', zh: '第 2–6 周'},
      goal: {en: 'Bend the knee again', zh: '恢复弯曲角度'},
      moves: [
        {en: 'Bend the knee a little more each day, only as far as it does not hurt.', zh: '每天多弯一点，只弯到不疼的位置。'},
        {en: 'Glute bridges and side-lying leg raises to strengthen the hips.', zh: '臀桥、侧躺抬腿，加强髋部力量。'},
        {en: 'Stationary bike with low resistance.', zh: '低阻力骑固定自行车。'}
      ]
    },
    {
      when: {en: 'Weeks 6–12', zh: '第 6–12 周'},
      goal: {en: 'Build strength', zh: '增强力量'},
      moves: [
        {en: 'Mini squats, step-ups, wall sits.', zh: '小幅度深蹲、上台阶、靠墙静蹲。'},
        {en: 'Stand on the injured leg for 30 seconds.', zh: '受伤的腿单脚站 30 秒。'}
      ]
    },
    {
      when: {en: 'Month 3 onward', zh: '第 3 个月以后'},
      goal: {en: 'Back to sport when the injured leg is about as strong as the other and your doctor agrees', zh: '受伤的腿力量接近另一条腿，并且医生同意后，再恢复运动'},
      moves: [
        {en: 'Jogging, then jumping and quick changes of direction.', zh: '先慢跑，再练跳跃和快速变向。'},
        {en: 'Keep doing hip and thigh strength work, which helps stop it from happening again.', zh: '继续练髋部和大腿力量，可以减少再次脱位。'}
      ]
    }
  ]
};

var OTHER_SPRAIN = {
  id: 'sprain',
  name: {en: 'Other sprain', zh: '其他部位扭伤'},
  hint: {en: 'Knee, wrist, thumb, elbow…', zh: '膝盖、手腕、拇指、手肘……'},
  questions: [
    {
      id: 'deformity',
      text: {en: 'Does the joint look out of shape, or is the hand or foot beyond it numb, cold or pale?', zh: '关节看起来变形了吗？或者远端的手脚发麻、发凉、发白？'},
      options: YES_NO
    },
    {
      id: 'use',
      text: {en: 'Can you use it (stand on the leg, grip with the hand)?', zh: '还能用吗？（腿能站、手能握）'},
      options: [
        {value: 'yes', text: {en: 'Yes, almost normally', zh: '能，差不多正常'}},
        {value: 'pain', text: {en: 'Yes, but it hurts', zh: '能，但很疼'}},
        {value: 'no', text: {en: 'No', zh: '不能'}}
      ]
    },
    {
      id: 'pop',
      text: {en: 'Did you hear or feel a "pop" when it happened, or does the joint give way?', zh: '受伤时听到或感觉到“啪”的一声吗？或者关节会突然软掉、站不稳？'},
      options: YES_NO
    },
    {
      id: 'swelling',
      text: {en: 'How much swelling or bruising is there?', zh: '肿胀或淤青有多严重？'},
      options: [
        {value: 'mild', text: {en: 'Little or none', zh: '很轻或没有'}},
        {value: 'moderate', text: {en: 'Clearly swollen', zh: '明显肿了'}},
        {value: 'severe', text: {en: 'Very swollen within hours', zh: '几小时内肿得很厉害'}}
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
    emergency: [CALL_EMERGENCY, {en: 'Do not try to straighten the joint yourself.', zh: '不要自己尝试把关节掰正。'}],
    today: [
      {en: 'Today: urgent care or the ER for an X-ray, to rule out a broken bone.', zh: '今天去急诊或骨科门诊拍 X 光片，排除骨折。'},
      {en: 'Support it with a sling or crutches until it has been checked.', zh: '检查之前，用三角巾吊着手臂或用拐杖，不要让它受力。'}
    ],
    soon: [
      {en: 'Within a few days: a sports medicine doctor or orthopedics.', zh: '几天内挂运动医学科或骨科。'},
      {en: 'A pop with fast swelling, especially in the knee, can mean a torn ligament such as the ACL. Ask whether you need an MRI.', zh: '“啪”的一声加上很快肿起来，尤其是在膝盖，可能是韧带撕裂（比如前交叉韧带）。问医生是否需要做核磁共振（MRI）。'}
    ],
    selfCare: [
      {en: 'No visit needed right now.', zh: '现在不需要去医院。'},
      {en: 'If it is not clearly better in a week, see a sports medicine doctor.', zh: '如果一周内没有明显好转，挂运动医学科。'}
    ]
  },
  rehabNote: {en: 'A torn knee ligament needs its own plan from a doctor or physical therapist.', zh: '如果是膝盖韧带撕裂，需要医生或康复师单独制定计划。'},
  rehab: [
    {
      when: {en: 'Days 0–3', zh: '第 0–3 天'},
      goal: {en: 'Calm the swelling', zh: '消肿'},
      moves: [
        {en: 'Rest, ice and raise it (see above).', zh: '休息、冰敷、抬高（见上面）。'},
        {en: 'Gently move the joint where it does not hurt, several times a day.', zh: '在不疼的范围内轻轻活动关节，一天几次。'}
      ]
    },
    {
      when: {en: 'Days 3–14', zh: '第 3–14 天'},
      goal: {en: 'Get the full range of motion back', zh: '恢复活动范围'},
      moves: [
        {en: 'Bend and straighten the joint a little further each day.', zh: '每天多弯一点、多伸直一点。'},
        {en: 'Use it for daily tasks as pain allows.', zh: '在疼痛允许的范围内，日常生活正常使用。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', zh: '第 2–6 周'},
      goal: {en: 'Strength and control', zh: '力量和控制'},
      moves: [
        {en: 'Resistance band exercises in every direction the joint moves, 3 sets of 10–15.', zh: '用弹力带往关节能动的每个方向练习，每个方向 3 组，每组 10–15 下。'},
        {en: 'Balance work: single-leg stance for the knee, weight-bearing on hands for the wrist.', zh: '平衡练习：膝盖练单脚站，手腕练撑地承重。'}
      ]
    },
    {
      when: {en: 'Back to sport', zh: '恢复运动'},
      goal: {en: 'Ready when it is pain-free and about as strong as the other side', zh: '不疼了、力量接近另一侧，就可以恢复运动'},
      moves: [
        {en: 'Sport-specific drills at increasing speed.', zh: '做专项动作练习，逐渐加快速度。'},
        {en: 'Tape or a brace for the first weeks back.', zh: '恢复运动的前几周，用肌贴或护具保护。'}
      ]
    }
  ]
};

var MUSCLE_STRAIN = {
  id: 'strain',
  name: {en: 'Muscle strain', zh: '拉伤'},
  hint: {en: 'Pulled muscle or tendon: thigh, calf, groin…', zh: '肌肉或肌腱拉伤：大腿、小腿、腹股沟……'},
  questions: [
    {
      id: 'achilles',
      text: {en: 'Is it at the back of the ankle (Achilles tendon), and you cannot rise up on your toes on that leg?', zh: '是脚后跟上方（跟腱）的位置，而且这条腿踮不起脚尖吗？'},
      options: YES_NO
    },
    {
      id: 'gap',
      text: {en: 'Can you see or feel a dent or gap in the muscle?', zh: '肌肉上能看到或摸到凹陷、断开的地方吗？'},
      options: YES_NO
    },
    {
      id: 'use',
      text: {en: 'Can you walk or use the muscle?', zh: '还能走路或使用这块肌肉吗？'},
      options: [
        {value: 'yes', text: {en: 'Yes, almost normally', zh: '能，差不多正常'}},
        {value: 'pain', text: {en: 'Yes, but it hurts', zh: '能，但很疼'}},
        {value: 'no', text: {en: 'No', zh: '不能'}}
      ]
    },
    {
      id: 'bruise',
      text: {en: 'How much swelling or bruising is there?', zh: '肿胀或淤青有多严重？'},
      options: [
        {value: 'mild', text: {en: 'Little or none', zh: '很轻或没有'}},
        {value: 'clear', text: {en: 'Clearly swollen or bruised', zh: '明显肿了或有淤青'}},
        {value: 'severe', text: {en: 'Large bruise spreading', zh: '大片淤青在扩散'}}
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
  firstAid: [STOP, ICE, COMPRESS, ELEVATE, NO_HEAT, {en: 'Do not stretch it hard for the first few days.', zh: '前几天不要用力拉伸受伤的肌肉。'}],
  where: {
    today: [
      {en: 'Today: urgent care, the ER, or orthopedics. A complete tear (especially the Achilles) may need early treatment.', zh: '今天去急诊或骨科。完全断裂（尤其是跟腱）可能需要尽早处理。'},
      {en: 'Use crutches and keep weight off it until it has been checked.', zh: '检查之前用拐杖，不要让它受力。'}
    ],
    soon: [
      {en: 'Within a few days: a sports medicine doctor or a physical therapist.', zh: '几天内挂运动医学科，或找康复师（物理治疗师）。'}
    ],
    selfCare: [
      {en: 'No visit needed right now.', zh: '现在不需要去医院。'},
      {en: 'If it is not clearly better in 1–2 weeks, see a sports medicine doctor.', zh: '如果 1–2 周内没有明显好转，挂运动医学科。'}
    ]
  },
  rehabNote: {en: 'Strains come back easily if you return too fast. Move on only when the current stage is pain-free.', zh: '拉伤恢复太快很容易再次受伤。当前阶段完全不疼了，再进入下一阶段。'},
  rehab: [
    {
      when: {en: 'Days 0–3', zh: '第 0–3 天'},
      goal: {en: 'Protect it', zh: '保护'},
      moves: [
        {en: 'Rest, ice and gentle walking if it does not hurt.', zh: '休息、冰敷，不疼的话可以慢慢走路。'},
        {en: 'Tighten the muscle gently without moving (5 seconds, 10 times).', zh: '不动关节，轻轻收紧这块肌肉（5 秒，10 次）。'}
      ]
    },
    {
      when: {en: 'Days 3–14', zh: '第 3–14 天'},
      goal: {en: 'Light movement and stretching', zh: '轻度活动和拉伸'},
      moves: [
        {en: 'Gentle stretches held 20–30 seconds, never into pain.', zh: '轻柔拉伸，每次 20–30 秒，不要拉到疼。'},
        {en: 'Light exercise like a stationary bike or swimming.', zh: '骑固定自行车或游泳这类轻运动。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', zh: '第 2–6 周'},
      goal: {en: 'Rebuild strength', zh: '恢复力量'},
      moves: [
        {en: 'Thigh: bridges, then slow hamstring curls. Calf: heel raises. Groin: squeezing a ball between the knees.', zh: '大腿：臀桥，再做慢速腿弯举。小腿：提踵。腹股沟：双膝夹球。'},
        {en: 'Jog, then run faster, as long as it stays pain-free.', zh: '先慢跑，不疼的话再逐渐加速。'}
      ]
    },
    {
      when: {en: 'Back to sport', zh: '恢复运动'},
      goal: {en: 'Ready when you can sprint and change direction without pain', zh: '能全速冲刺、变向都不疼，就可以恢复运动'},
      moves: [
        {en: 'Keep doing strength work twice a week to prevent it happening again.', zh: '每周继续做两次力量训练，防止再次拉伤。'},
        {en: 'Warm up properly before every session.', zh: '每次运动前好好热身。'}
      ]
    }
  ]
};

var OTHER_DISLOCATION = {
  id: 'dislocation',
  name: {en: 'Other dislocation', zh: '其他关节脱位'},
  hint: {en: 'Shoulder, elbow, finger…', zh: '肩膀、手肘、手指……'},
  questions: [
    {
      id: 'part',
      text: {en: 'Which joint?', zh: '哪个关节？'},
      options: [
        {value: 'shoulder', text: {en: 'Shoulder or elbow', zh: '肩膀或手肘'}},
        {value: 'finger', text: {en: 'Finger or toe', zh: '手指或脚趾'}}
      ]
    },
    {
      id: 'inPlace',
      text: {en: 'Is the joint still out of place?', zh: '关节现在还错位着吗？'},
      options: [
        {value: 'out', text: {en: 'Yes, still out', zh: '是，还错位着'}},
        {value: 'back', text: {en: 'No, it went back', zh: '没有，已经回去了'}},
        {value: 'unsure', text: {en: 'Not sure', zh: '不确定'}}
      ]
    },
    {
      id: 'numb',
      text: {en: 'Is the arm, hand or finger beyond it numb, cold or pale?', zh: '远端的手臂、手或手指发麻、发凉、发白吗？'},
      options: YES_NO
    },
    {
      id: 'before',
      text: {en: 'Has this joint dislocated before?', zh: '这个关节以前脱位过吗？'},
      options: [
        {value: 'first', text: {en: 'No, this is the first time', zh: '没有，这是第一次'}},
        {value: 'again', text: {en: 'Yes, it has happened before', zh: '有，以前发生过'}}
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
    {en: 'Keep it still in the position that hurts least. Support an arm with a sling or against the body.', zh: '保持在最不疼的姿势不要动。手臂可以用三角巾吊起来，或者贴着身体托住。'},
    {en: 'Take off rings or watches before it swells.', zh: '趁还没肿，摘掉戒指和手表。'},
    ICE
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'A doctor will put the joint back and take an X-ray.', zh: '医生会把关节复位，并拍 X 光片。'}],
    today: [
      {en: 'Today: urgent care or the ER to put it back and take an X-ray, since a small bone can break too.', zh: '今天去急诊复位并拍 X 光片，因为小骨头也可能一起骨折。'}
    ],
    soon: [
      {en: 'Within 1–2 days: orthopedics or sports medicine, even if it feels fine. It still needs an X-ray.', zh: '1–2 天内挂骨科或运动医学科，就算感觉没事也要去，还是需要拍 X 光片。'}
    ]
  },
  extraWhere: function (a) {
    if (a.before !== 'again') return [];
    return [{
      en: 'Because it has happened before, ask a sports medicine surgeon whether surgery to stabilize the joint makes sense.',
      zh: '因为不是第一次了，可以问问运动医学科的医生，是否需要做稳定关节的手术。'
    }];
  },
  rehabNote: {en: 'Start only after a doctor has checked it. A finger usually takes weeks; a shoulder takes months.', zh: '要等医生检查过以后再开始。手指一般要几周，肩膀要几个月。'},
  rehab: [
    {
      when: {en: 'Weeks 0–2', zh: '第 0–2 周'},
      goal: {en: 'Let it settle', zh: '让关节稳定下来'},
      moves: [
        {en: 'Shoulder: sling as the doctor says; move the hand and wrist. Finger: tape it to the next finger.', zh: '肩膀：按医生说的戴三角巾，活动手和手腕。手指：和旁边的手指绑在一起。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', zh: '第 2–6 周'},
      goal: {en: 'Get movement back', zh: '恢复活动范围'},
      moves: [
        {en: 'Shoulder: let the arm swing like a pendulum, then slide the hand up a wall.', zh: '肩膀：手臂自然下垂、像钟摆一样晃动，然后练手沿着墙往上爬。'},
        {en: 'Finger: bend and straighten gently many times a day.', zh: '手指：一天多次轻轻弯曲、伸直。'}
      ]
    },
    {
      when: {en: 'Weeks 6–12', zh: '第 6–12 周'},
      goal: {en: 'Build strength', zh: '增强力量'},
      moves: [
        {en: 'Shoulder: resistance band rotations in and out, shoulder blade squeezes.', zh: '肩膀：弹力带内旋、外旋，夹肩胛骨。'},
        {en: 'Finger: squeeze a soft ball.', zh: '手指：捏软球。'}
      ]
    },
    {
      when: {en: 'Back to sport', zh: '恢复运动'},
      goal: {en: 'Ready when it is strong and stable and your doctor agrees', zh: '力量够了、关节稳定，并且医生同意后，再恢复运动'},
      moves: [
        {en: 'Start with non-contact drills. Tape a finger for the first weeks.', zh: '先做没有身体接触的练习。手指在前几周要贴扎保护。'}
      ]
    }
  ]
};

var FRACTURE = {
  id: 'fracture',
  name: {en: 'Broken bone', zh: '骨折'},
  hint: {en: 'A bone might be cracked or broken', zh: '骨头可能裂了或断了'},
  questions: [
    {
      id: 'open',
      text: {en: 'Is a bone poking through the skin, is the limb bent the wrong way, or is the hand or foot beyond it numb, cold or pale?', zh: '骨头刺破皮肤了吗？肢体弯成了不正常的形状吗？或者远端的手脚发麻、发凉、发白？'},
      options: YES_NO
    },
    {
      id: 'spine',
      text: {en: 'Is it the neck, back, hip or thigh?', zh: '伤的是脖子、背、髋部或大腿吗？'},
      options: YES_NO
    },
    {
      id: 'bonePain',
      text: {en: 'Does pressing on one spot of the bone hurt sharply?', zh: '按骨头上的某一个点，会剧烈疼痛吗？'},
      options: YES_NO
    },
    {
      id: 'use',
      text: {en: 'Can you move it or put weight on it?', zh: '还能活动，或者能承重吗？'},
      options: [
        {value: 'yes', text: {en: 'Yes, almost normally', zh: '能，差不多正常'}},
        {value: 'no', text: {en: 'No, or only with a lot of pain', zh: '不能，或者非常疼'}}
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
    {en: 'Do not move the injured part. If the neck or back might be hurt, do not move the person at all.', zh: '不要移动受伤的部位。如果可能伤到脖子或背，完全不要移动伤者。'},
    {en: 'Splint it in the position you found it, using something stiff (a board, rolled magazine), covering the joint above and below.', zh: '用硬的东西（木板、卷起来的杂志）按原来的姿势固定，要连同上下两个关节一起固定。'},
    {en: 'If bone is through the skin, cover it with a clean cloth. Do not push it back.', zh: '如果骨头刺破了皮肤，用干净的布盖住，不要把它推回去。'},
    ICE,
    {en: 'Do not eat or drink until a doctor says so, in case surgery is needed.', zh: '医生同意之前不要吃东西、喝水，以防需要手术。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Wait for the ambulance rather than moving the person yourself.', zh: '等救护车来，不要自己搬动伤者。'}],
    today: [
      {en: 'Today: urgent care or the ER for an X-ray.', zh: '今天去急诊或骨科拍 X 光片。'},
      {en: 'Keep it splinted on the way. Have someone drive you.', zh: '路上保持固定，让别人开车送你去。'}
    ],
    soon: [
      {en: 'Probably not broken, but if pain is still there in a few days, see orthopedics for an X-ray.', zh: '大概率没有骨折。但如果几天后还疼，挂骨科拍 X 光片。'}
    ]
  },
  rehabNote: {en: 'Only after a doctor confirms the bone is healing. Most bones take 6–12 weeks.', zh: '要等医生确认骨头在愈合以后。大部分骨折需要 6–12 周愈合。'},
  rehab: [
    {
      when: {en: 'In the cast or brace', zh: '打石膏或戴护具期间'},
      goal: {en: 'Keep the rest of the body working', zh: '保持身体其他部位的活动'},
      moves: [
        {en: 'Move the joints that are not in the cast, like the fingers or toes.', zh: '活动没被石膏固定的关节，比如手指、脚趾。'},
        {en: 'Train the uninjured parts if your doctor agrees.', zh: '医生同意的话，可以锻炼没受伤的部位。'}
      ]
    },
    {
      when: {en: 'Cast off', zh: '拆石膏以后'},
      goal: {en: 'Get movement back', zh: '恢复活动范围'},
      moves: [
        {en: 'Gentle range-of-motion exercises, ideally with a physical therapist.', zh: '做轻柔的关节活动练习，最好在康复师指导下做。'}
      ]
    },
    {
      when: {en: 'Weeks after', zh: '之后几周'},
      goal: {en: 'Rebuild strength', zh: '恢复力量'},
      moves: [
        {en: 'Strength work for the muscles around the bone, increasing slowly.', zh: '锻炼骨头周围的肌肉，慢慢加量。'}
      ]
    },
    {
      when: {en: 'Back to sport', zh: '恢复运动'},
      goal: {en: 'When your doctor confirms the bone has healed', zh: '医生确认骨头愈合以后'},
      moves: [
        {en: 'Build back up gradually. Contact sports usually come last.', zh: '慢慢恢复训练量。有身体对抗的运动通常最后才恢复。'}
      ]
    }
  ]
};

var CONCUSSION = {
  id: 'concussion',
  name: {en: 'Head injury (concussion)', zh: '脑震荡'},
  hint: {en: 'A hit to the head', zh: '头部被撞'},
  questions: [
    {
      id: 'danger',
      text: {en: 'Any of these: passed out, vomiting more than once, a headache that keeps getting worse, a seizure, weak or numb arms or legs, slurred speech, getting more confused or drowsy?', zh: '有没有以下任何一种：昏迷过、吐了不止一次、头越来越疼、抽搐、手脚无力或发麻、说话不清、越来越糊涂或想睡？'},
      options: YES_NO
    },
    {
      id: 'neck',
      text: {en: 'Is there neck pain, or tingling in the arms or legs?', zh: '脖子疼吗？或者手脚有刺痛感？'},
      options: YES_NO
    },
    {
      id: 'symptoms',
      text: {en: 'Any headache, dizziness, nausea, blurry vision, feeling foggy, or trouble remembering what happened?', zh: '有没有头疼、头晕、恶心、看东西模糊、脑子发懵，或者想不起刚才发生了什么？'},
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
    {en: 'Stop playing and do not go back in today, even if you feel fine.', zh: '马上停止运动，今天不要再上场，就算感觉没事也不行。'},
    {en: 'If the neck might be hurt, do not move the person.', zh: '如果可能伤到脖子，不要移动伤者。'},
    {en: 'Someone should stay with the injured person for the next few hours and watch for the danger signs above.', zh: '接下来几个小时要有人陪着，留意上面提到的危险信号。'},
    {en: 'Rest. No alcohol. Ask a doctor before taking pain medicine.', zh: '休息，不要喝酒。吃止痛药之前先问医生。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Keep the head and neck still until help arrives.', zh: '救护人员到之前，保持头和脖子不动。'}],
    today: [
      {en: 'Today: a doctor (urgent care, the ER, or sports medicine) to check for a concussion.', zh: '今天去看医生（急诊或运动医学科），检查是不是脑震荡。'},
      {en: 'Go to the ER right away if any danger sign appears later.', zh: '之后如果出现任何危险信号，马上去急诊。'}
    ],
    selfCare: [
      {en: 'No visit needed right now, but watch closely for 24–48 hours.', zh: '现在不需要去医院，但接下来 24–48 小时要密切观察。'},
      {en: 'See a doctor if any symptom appears, and go to the ER for any danger sign.', zh: '出现任何症状就去看医生，出现危险信号马上去急诊。'}
    ]
  },
  rehabNote: {en: 'Spend at least 24 hours on each step. If symptoms come back, go back one step. Return to contact sport only with a doctor\'s OK.', zh: '每一步至少 24 小时。如果症状又出现了，退回上一步。要等医生同意才能恢复有身体对抗的运动。'},
  rehab: [
    {
      when: {en: 'Days 1–2', zh: '第 1–2 天'},
      goal: {en: 'Rest the brain', zh: '让大脑休息'},
      moves: [
        {en: 'Light daily activity only. Short breaks from screens and reading.', zh: '只做轻度日常活动，少看屏幕、少读书。'}
      ]
    },
    {
      when: {en: 'Step 2', zh: '第 2 步'},
      goal: {en: 'Light exercise', zh: '轻度运动'},
      moves: [
        {en: 'Walking or a stationary bike, as long as symptoms do not get worse.', zh: '散步或骑固定自行车，只要症状不加重。'}
      ]
    },
    {
      when: {en: 'Step 3', zh: '第 3 步'},
      goal: {en: 'Sport drills without contact', zh: '没有身体接触的专项练习'},
      moves: [
        {en: 'Running and ball drills, no heading and no contact.', zh: '跑步、球类练习，不顶球、不对抗。'}
      ]
    },
    {
      when: {en: 'Back to sport', zh: '恢复运动'},
      goal: {en: 'Full practice, then games, after a doctor clears you', zh: '医生同意后，先参加完整训练，再参加比赛'},
      moves: [
        {en: 'Full-contact practice first, then return to games.', zh: '先做有身体接触的完整训练，再恢复比赛。'}
      ]
    }
  ]
};

var BRUISE = {
  id: 'bruise',
  name: {en: 'Bruise', zh: '撞伤淤青'},
  hint: {en: 'Hit by a ball, knee or elbow', zh: '被球、膝盖、手肘撞到'},
  questions: [
    {
      id: 'tense',
      text: {en: 'Is the area rock-hard and tight, with pain that keeps getting worse, or numbness and tingling?', zh: '受伤的地方变得硬邦邦、绷得很紧，疼得越来越厉害，或者发麻、刺痛吗？'},
      options: YES_NO
    },
    {
      id: 'trunk',
      text: {en: 'Was it a hit to the chest, belly or lower back, with trouble breathing, belly pain or blood in the urine?', zh: '是胸口、肚子或腰被撞，并且呼吸困难、肚子疼或者尿里有血吗？'},
      options: YES_NO
    },
    {
      id: 'use',
      text: {en: 'Can you move it normally?', zh: '还能正常活动吗？'},
      options: [
        {value: 'yes', text: {en: 'Yes', zh: '能'}},
        {value: 'pain', text: {en: 'Yes, but it hurts', zh: '能，但很疼'}},
        {value: 'no', text: {en: 'No', zh: '不能'}}
      ]
    },
    {
      id: 'swelling',
      text: {en: 'How big is the swelling?', zh: '肿得有多大？'},
      options: [
        {value: 'small', text: {en: 'Small', zh: '一小块'}},
        {value: 'large', text: {en: 'Large', zh: '一大片'}}
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
    {en: 'For a bruised thigh, keep the knee bent as far as is comfortable while icing for the first day.', zh: '如果是大腿被撞，第一天冰敷时让膝盖尽量弯着（不疼的程度）。'},
    NO_HEAT
  ],
  where: {
    emergency: [CALL_EMERGENCY],
    today: [
      {en: 'Today: urgent care or the ER for an X-ray, in case a bone is broken.', zh: '今天去急诊或骨科拍 X 光片，以防骨折。'}
    ],
    soon: [
      {en: 'Within a few days: a sports medicine doctor, especially if a hard lump stays in the muscle.', zh: '几天内挂运动医学科，尤其是肌肉里一直有硬块的话。'}
    ],
    selfCare: [
      {en: 'No visit needed. Bruises usually fade in 1–2 weeks.', zh: '不需要去医院。淤青一般 1–2 周会消退。'}
    ]
  },
  rehabNote: {en: 'Never massage a deep bruise hard; it can cause bone to form in the muscle.', zh: '深层淤青不要用力按摩，可能导致肌肉里长出骨化的硬块。'},
  rehab: [
    {
      when: {en: 'Days 0–2', zh: '第 0–2 天'},
      goal: {en: 'Limit bleeding under the skin', zh: '减少皮下出血'},
      moves: [
        {en: 'Rest, ice and compression (see above).', zh: '休息、冰敷、加压包扎（见上面）。'}
      ]
    },
    {
      when: {en: 'Days 2–7', zh: '第 2–7 天'},
      goal: {en: 'Get movement back', zh: '恢复活动'},
      moves: [
        {en: 'Gentle stretching and walking. Warmth is fine now.', zh: '轻柔拉伸和散步。这时可以热敷了。'}
      ]
    },
    {
      when: {en: 'Weeks 1–3', zh: '第 1–3 周'},
      goal: {en: 'Rebuild strength', zh: '恢复力量'},
      moves: [
        {en: 'Light strength exercises for the bruised muscle, then jogging.', zh: '对受伤的肌肉做轻度力量练习，然后慢跑。'}
      ]
    },
    {
      when: {en: 'Back to sport', zh: '恢复运动'},
      goal: {en: 'Ready when movement and strength are back to normal', zh: '活动范围和力量恢复正常，就可以恢复运动'},
      moves: [
        {en: 'Wear padding over the spot for a while.', zh: '一段时间内在受伤部位戴护垫。'}
      ]
    }
  ]
};

var WOUND = {
  id: 'wound',
  name: {en: 'Cuts and scrapes', zh: '擦伤、割伤'},
  hint: {en: 'Skin broken, bleeding', zh: '皮肤破了、流血'},
  questions: [
    {
      id: 'bleeding',
      text: {en: 'Is blood spurting, or is it still bleeding after 10 minutes of firm pressure?', zh: '血是喷出来的吗？或者用力按压 10 分钟后还在流血？'},
      options: YES_NO
    },
    {
      id: 'deep',
      text: {en: 'Is it deep or gaping, longer than about 1–2 cm, or on the face or over a joint?', zh: '伤口深或者张开着、长度超过 1–2 厘米，或者在脸上、关节上吗？'},
      options: YES_NO
    },
    {
      id: 'dirty',
      text: {en: 'Is it very dirty, from something rusty, or with dirt you cannot rinse out?', zh: '伤口很脏、是被生锈的东西弄伤的，或者有冲不掉的脏东西吗？'},
      options: YES_NO
    },
    {
      id: 'infected',
      text: {en: 'If it happened days ago: is it getting redder, warmer, more swollen, or oozing pus?', zh: '如果是几天前受的伤：伤口越来越红、发热、更肿，或者流脓吗？'},
      options: [
        {value: 'no', text: {en: 'No / it just happened', zh: '没有 / 刚受伤'}},
        {value: 'yes', text: {en: 'Yes', zh: '是'}}
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
    {en: 'Press firmly on the wound with a clean cloth for 10 minutes without lifting it.', zh: '用干净的布用力按住伤口 10 分钟，中间不要松开看。'},
    {en: 'Rinse it under clean running water and remove dirt.', zh: '用干净的流动水冲洗伤口，把脏东西冲掉。'},
    {en: 'Cover with a clean bandage. A thin layer of antibiotic ointment helps.', zh: '用干净的纱布或创可贴盖好，可以薄涂一层抗生素药膏。'},
    {en: 'If something is stuck deep in the wound, leave it in and pad around it.', zh: '如果有东西扎在伤口深处，不要拔出来，在周围垫上纱布固定。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Keep pressing on the wound until help arrives.', zh: '救护人员到之前，一直按住伤口。'}],
    today: [
      {en: 'Today, within 6–8 hours if possible: urgent care or the ER for cleaning and stitches.', zh: '今天去，最好在 6–8 小时内：去急诊或外科清创、缝针。'},
      {en: 'Ask about a tetanus shot if your last one was more than 5 years ago.', zh: '如果上次打破伤风针已经超过 5 年，问医生要不要打。'}
    ],
    selfCare: [
      {en: 'No visit needed. Keep it clean and covered.', zh: '不需要去医院，保持伤口干净、盖好。'},
      {en: 'See a doctor if it gets redder, warmer or oozes pus.', zh: '如果伤口越来越红、发热或流脓，去看医生。'}
    ]
  },
  rehabNote: {en: 'Most scrapes heal in 1–2 weeks.', zh: '大部分擦伤 1–2 周能长好。'},
  rehab: [
    {
      when: {en: 'Days 0–2', zh: '第 0–2 天'},
      goal: {en: 'Keep it clean', zh: '保持干净'},
      moves: [
        {en: 'Change the bandage daily or when it gets wet or dirty.', zh: '每天换药，弄湿或弄脏了也要换。'}
      ]
    },
    {
      when: {en: 'Days 2–7', zh: '第 2–7 天'},
      goal: {en: 'Watch for infection', zh: '留意感染'},
      moves: [
        {en: 'Check for spreading redness, heat, pus or fever.', zh: '检查有没有红肿扩散、发热、流脓或发烧。'}
      ]
    },
    {
      when: {en: 'Healing', zh: '愈合期'},
      goal: {en: 'Let the skin close', zh: '让皮肤长好'},
      moves: [
        {en: 'Do not pick the scab. Stitches come out after 5–14 days, at a clinic.', zh: '不要抠痂。缝的针一般 5–14 天后去医院拆。'}
      ]
    },
    {
      when: {en: 'Back to sport', zh: '恢复运动'},
      goal: {en: 'When the wound is closed, or well covered', zh: '伤口长好，或者能被保护好以后'},
      moves: [
        {en: 'Cover it during sport, and avoid swimming pools until it has closed.', zh: '运动时盖好伤口，长好之前不要去游泳池。'}
      ]
    }
  ]
};

var CRAMP = {
  id: 'cramp',
  name: {en: 'Muscle cramp', zh: '抽筋'},
  hint: {en: 'Muscle suddenly locks tight', zh: '肌肉突然绷紧、抽搐'},
  questions: [
    {
      id: 'heat',
      text: {en: 'Is the person also confused, very hot, or vomiting?', zh: '同时有意识不清、身体很烫，或者呕吐吗？'},
      options: YES_NO
    },
    {
      id: 'swollen',
      text: {en: 'Is the leg swollen, red and warm, and does it hurt even at rest?', zh: '腿肿、发红、发热，而且不动的时候也疼吗？'},
      options: YES_NO
    },
    {
      id: 'eased',
      text: {en: 'Did it ease within about 10 minutes of stretching?', zh: '拉伸后大约 10 分钟内缓解了吗？'},
      options: YES_NO
    },
    {
      id: 'often',
      text: {en: 'Does this happen to you often?', zh: '经常抽筋吗？'},
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
    {en: 'Stop and gently stretch the muscle. For a calf, straighten the knee and pull the toes toward you.', zh: '停下来，轻轻拉伸抽筋的肌肉。小腿抽筋就把腿伸直，把脚尖往自己方向拉。'},
    {en: 'Rub the muscle gently.', zh: '轻轻揉一揉这块肌肉。'},
    {en: 'Drink water, or a sports drink if you have been sweating a lot.', zh: '喝水；如果出了很多汗，喝运动饮料。'},
    {en: 'Warmth helps soreness afterwards.', zh: '之后如果肌肉酸痛，可以热敷。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'This may be heat stroke: see Heat illness and start cooling now.', zh: '这可能是中暑：看“中暑”那一类，马上开始降温。'}],
    today: [
      {en: 'Today: a doctor or the ER, to check for a blood clot in the leg.', zh: '今天去看医生或急诊，检查腿里是不是有血栓。'}
    ],
    soon: [
      {en: 'Within a few days: a general or sports medicine doctor, to check for a cause.', zh: '几天内去看全科或运动医学科，查一下原因。'}
    ],
    selfCare: [
      {en: 'No visit needed.', zh: '不需要去医院。'}
    ]
  },
  rehabNote: {en: 'Cramps usually pass quickly; these steps help prevent the next one.', zh: '抽筋一般很快就好，下面这些方法可以预防下一次。'},
  rehab: [
    {
      when: {en: 'Right after', zh: '刚缓解以后'},
      goal: {en: 'Let the muscle recover', zh: '让肌肉恢复'},
      moves: [
        {en: 'Light stretching. Stop for the day if it keeps coming back.', zh: '轻柔拉伸。如果反复抽筋，今天就不要再练了。'}
      ]
    },
    {
      when: {en: 'Next 1–2 days', zh: '之后 1–2 天'},
      goal: {en: 'Ease soreness', zh: '缓解酸痛'},
      moves: [
        {en: 'Light activity, gentle stretching, drink enough.', zh: '轻度活动、轻柔拉伸、多喝水。'}
      ]
    },
    {
      when: {en: 'Prevention', zh: '预防'},
      goal: {en: 'Stop it happening again', zh: '防止再次抽筋'},
      moves: [
        {en: 'Warm up properly and stretch the calves and thighs.', zh: '好好热身，拉伸小腿和大腿。'},
        {en: 'Drink before and during long or hot sessions.', zh: '长时间或高温下运动，运动前和运动中都要喝水。'},
        {en: 'Build up training gradually.', zh: '训练量慢慢增加。'}
      ]
    }
  ]
};

var OVERUSE = {
  id: 'overuse',
  name: {en: 'Overuse pain', zh: '劳损'},
  hint: {en: 'Pain that built up over time: shins, Achilles, knee, elbow…', zh: '慢慢累积的疼：胫骨、跟腱、膝盖、手肘……'},
  questions: [
    {
      id: 'boneSpot',
      text: {en: 'Is there one spot on a bone that hurts to press and gets worse with every step or jump?', zh: '骨头上有一个点按着疼，而且每走一步、每跳一下都更疼吗？'},
      options: YES_NO
    },
    {
      id: 'rest',
      text: {en: 'Does it hurt even at rest or at night?', zh: '休息或晚上睡觉时也疼吗？'},
      options: YES_NO
    },
    {
      id: 'limp',
      text: {en: 'Does the pain change how you move (limping, holding back)?', zh: '疼得让你改变了动作吗？（一瘸一拐、不敢用力）'},
      options: YES_NO
    },
    {
      id: 'weeks',
      text: {en: 'How long has it hurt?', zh: '疼了多久？'},
      options: [
        {value: 'short', text: {en: 'Less than 2 weeks', zh: '不到 2 周'}},
        {value: 'long', text: {en: '2 weeks or more', zh: '2 周或更久'}}
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
    {en: 'Cut back the activity that hurts. Pain during exercise should stay at 3 out of 10 or less.', zh: '减少引起疼痛的运动。运动时疼痛不要超过 3 分（满分 10 分）。'},
    {en: 'Switch to something that does not hurt, like cycling or swimming.', zh: '换成不疼的运动，比如骑车、游泳。'},
    {en: 'Ice after activity can ease the pain.', zh: '运动后冰敷可以减轻疼痛。'},
    {en: 'Think about what changed: more training, new shoes, a harder surface?', zh: '想一想最近有什么变化：训练量加大了？换了鞋？场地变硬了？'}
  ],
  where: {
    soon: [
      {en: 'Within a few days: a sports medicine doctor or a physical therapist.', zh: '几天内挂运动医学科，或找康复师（物理治疗师）。'},
      {en: 'One painful spot on a bone can be a stress fracture: stop running and jumping until it is checked.', zh: '骨头上一个点疼可能是应力性骨折：检查之前不要跑跳。'}
    ],
    selfCare: [
      {en: 'No visit needed yet.', zh: '暂时不需要去医院。'},
      {en: 'If it is not better after 2 weeks of lighter training, see a sports medicine doctor.', zh: '如果减少训练 2 周后还没好转，挂运动医学科。'}
    ]
  },
  rehabNote: {en: 'Overuse injuries heal with the right amount of load, not complete rest.', zh: '劳损靠的是合适的训练量来恢复，而不是完全不动。'},
  rehab: [
    {
      when: {en: 'Weeks 1–2', zh: '第 1–2 周'},
      goal: {en: 'Calm it down', zh: '让疼痛平息'},
      moves: [
        {en: 'Lower the load and cross-train without pain.', zh: '减少训练量，换成不疼的运动来保持体能。'}
      ]
    },
    {
      when: {en: 'Weeks 2–6', zh: '第 2–6 周'},
      goal: {en: 'Load the tissue slowly', zh: '慢慢给组织加负荷'},
      moves: [
        {en: 'Achilles: slow heel raises and lowers. Knee: wall sits. Elbow: slow wrist lifts with a light weight.', zh: '跟腱：慢速提踵、慢慢放下。膝盖：靠墙静蹲。手肘：拿轻重量慢慢抬手腕。'}
      ]
    },
    {
      when: {en: 'Weeks 6–12', zh: '第 6–12 周'},
      goal: {en: 'Build back up', zh: '逐步恢复训练'},
      moves: [
        {en: 'Return to your sport, adding no more than about 10% more each week.', zh: '回到原来的运动，每周增加的量不超过约 10%。'}
      ]
    },
    {
      when: {en: 'Keep it away', zh: '预防复发'},
      goal: {en: 'Stop it coming back', zh: '防止再次劳损'},
      moves: [
        {en: 'Strength training twice a week, rest days, and good shoes.', zh: '每周两次力量训练，安排休息日，穿合适的鞋。'}
      ]
    }
  ]
};

var HEAT_ILLNESS = {
  id: 'heat',
  name: {en: 'Heat illness', zh: '中暑'},
  hint: {en: 'Dizzy, sick or faint in the heat', zh: '天热运动后头晕、恶心、虚弱'},
  questions: [
    {
      id: 'mind',
      text: {en: 'Is the person confused, acting strangely, slurring words, fainting, or having a seizure?', zh: '伤者意识不清、行为反常、说话不清、晕倒或抽搐吗？'},
      options: YES_NO
    },
    {
      id: 'vomit',
      text: {en: 'Are they vomiting or unable to keep drinks down?', zh: '在呕吐，或者喝不下水吗？'},
      options: YES_NO
    },
    {
      id: 'better',
      text: {en: 'After 30 minutes resting somewhere cool and drinking, are they getting better?', zh: '在凉快的地方休息、喝水 30 分钟后，有没有好转？'},
      options: [
        {value: 'yes', text: {en: 'Yes, getting better', zh: '有，在好转'}},
        {value: 'no', text: {en: 'No, or getting worse', zh: '没有，或者更严重了'}}
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
    {en: 'Stop exercising and move to shade or air conditioning.', zh: '停止运动，到阴凉处或有空调的地方。'},
    {en: 'Take off extra clothing and gear.', zh: '脱掉多余的衣服和护具。'},
    {en: 'Cool down fast: cold water on the skin, fanning, ice packs on the neck, armpits and groin. If confused, cool first (cold water tub if possible) while waiting for help.', zh: '尽快降温：往皮肤上浇冷水、扇风，在脖子、腋下、大腿根放冰袋。如果意识不清，等救护车时先降温（有条件的话泡冷水）。'},
    {en: 'If fully alert, sip water or a sports drink. Do not give drinks to someone who is confused.', zh: '如果意识清醒，小口喝水或运动饮料。意识不清的人不要喂水。'},
    {en: 'If dizzy, lie down and raise the legs.', zh: '如果头晕，躺下并把腿垫高。'}
  ],
  where: {
    emergency: [CALL_EMERGENCY, {en: 'Likely heat stroke. Keep cooling until help arrives.', zh: '很可能是热射病（重度中暑），救护车到之前一直降温。'}],
    today: [
      {en: 'Today: urgent care or the ER. They may need fluids through a drip.', zh: '今天去急诊，可能需要输液。'}
    ],
    selfCare: [
      {en: 'No visit needed. Rest for the rest of the day.', zh: '不需要去医院，今天剩下的时间好好休息。'},
      {en: 'Go to the ER at once if confusion or fainting appears.', zh: '如果出现意识不清或晕倒，马上去急诊。'}
    ]
  },
  rehabNote: {en: 'After heat stroke, return to exercise only when a doctor says so.', zh: '如果是热射病（重度中暑），要等医生同意才能恢复运动。'},
  rehab: [
    {
      when: {en: 'Days 0–1', zh: '第 0–1 天'},
      goal: {en: 'Rest and rehydrate', zh: '休息、补水'},
      moves: [
        {en: 'No exercise. Drink until your urine is pale yellow.', zh: '不运动。多喝水，直到尿液是淡黄色。'}
      ]
    },
    {
      when: {en: 'Days 1–3', zh: '第 1–3 天'},
      goal: {en: 'Light activity in the cool', zh: '在凉爽环境中轻度活动'},
      moves: [
        {en: 'Short, easy sessions indoors or in the early morning.', zh: '在室内或清晨做短时间的轻松运动。'}
      ]
    },
    {
      when: {en: 'Weeks 1–2', zh: '第 1–2 周'},
      goal: {en: 'Get used to the heat again', zh: '重新适应高温'},
      moves: [
        {en: 'Over 10–14 days, slowly make sessions in the heat longer and harder.', zh: '用 10–14 天，慢慢延长在高温下运动的时间和强度。'}
      ]
    },
    {
      when: {en: 'Prevention', zh: '预防'},
      goal: {en: 'Stop it happening again', zh: '防止再次中暑'},
      moves: [
        {en: 'Drink before and during exercise, avoid the hottest hours, take breaks in the shade.', zh: '运动前和运动中都要喝水，避开最热的时段，在阴凉处休息。'}
      ]
    }
  ]
};

// The big categories shown first. A category with several injuries asks
// which one before showing questions. Each has an icon and a color (hue,
// 0-360) so the cards are easy to tell apart and the page feels warmer.
var CATEGORIES = [
  {id: 'sprain', icon: '🦶', hue: 28, name: {en: 'Sprain', zh: '扭伤'}, hint: {en: 'Ligaments: ankle, knee, wrist', zh: '韧带：脚踝、膝盖、手腕'}, injuries: [ANKLE_SPRAIN, OTHER_SPRAIN]},
  {id: 'strain', icon: '💪', hue: 8, name: {en: 'Strain', zh: '拉伤'}, hint: {en: 'Muscles and tendons', zh: '肌肉、肌腱'}, injuries: [MUSCLE_STRAIN]},
  {id: 'dislocation', icon: '🦵', hue: 268, name: {en: 'Dislocation', zh: '脱位'}, hint: {en: 'A joint popped out', zh: '关节错位'}, injuries: [PATELLA_DISLOCATION, OTHER_DISLOCATION]},
  {id: 'fracture', icon: '🦴', hue: 210, name: {en: 'Broken bone', zh: '骨折'}, hint: {en: 'Cracked or broken', zh: '骨头裂了或断了'}, injuries: [FRACTURE]},
  {id: 'concussion', icon: '🤕', hue: 330, name: {en: 'Head injury', zh: '脑震荡'}, hint: {en: 'A hit to the head', zh: '头部被撞'}, injuries: [CONCUSSION]},
  {id: 'bruise', icon: '⚽', hue: 190, name: {en: 'Bruise', zh: '撞伤淤青'}, hint: {en: 'Hit by a ball or body', zh: '被球或人撞到'}, injuries: [BRUISE]},
  {id: 'wound', icon: '🩹', hue: 350, name: {en: 'Cuts and scrapes', zh: '擦伤割伤'}, hint: {en: 'Skin broken, bleeding', zh: '皮肤破了、流血'}, injuries: [WOUND]},
  {id: 'cramp', icon: '⚡', hue: 45, name: {en: 'Cramp', zh: '抽筋'}, hint: {en: 'Muscle locks tight', zh: '肌肉突然绷紧'}, injuries: [CRAMP]},
  {id: 'overuse', icon: '🔁', hue: 150, name: {en: 'Overuse pain', zh: '劳损'}, hint: {en: 'Built up over time', zh: '慢慢累积的疼'}, injuries: [OVERUSE]},
  {id: 'heat', icon: '☀️', hue: 36, name: {en: 'Heat illness', zh: '中暑'}, hint: {en: 'Dizzy or sick in the heat', zh: '天热头晕、恶心'}, injuries: [HEAT_ILLNESS]}
];

var INJURIES = CATEGORIES.reduce(function (all, c) { return all.concat(c.injuries); }, []);

// Signs that need emergency help whatever the injury, shown at the top.
var RED_FLAGS = [
  {en: 'A bone is visibly out of place or poking through the skin', zh: '骨头明显错位，或者刺破皮肤'},
  {en: 'The foot or hand is numb, cold, pale or blue', zh: '手脚发麻、发凉、发白或发紫'},
  {en: 'A hit to the head, then confusion, vomiting or passing out', zh: '头部被撞以后，出现意识不清、呕吐或昏迷'},
  {en: 'Confused or collapsing after exercising in the heat', zh: '天热运动后意识不清或晕倒'},
  {en: 'Pain too strong to move at all', zh: '疼得完全动不了'}
];

// Comfort for the feelings that come with each stage of recovery, the same
// for every injury. Shown after the rehab advice.
var COMFORT_STAGES = [
  {
    when: {en: 'Right after the injury', zh: '刚受伤的时候'},
    words: {
      en: 'Feeling scared, angry or asking "why me" is normal. Your body is not failing you; it has already started to heal.',
      zh: '害怕、生气、觉得"为什么偏偏是我"，都很正常。你的身体没有辜负你，它已经开始修复了。'
    },
    tryThis: {en: 'Tell one person how you feel today, not only how the injury feels.', zh: '今天跟一个人说说你的心情，不只是伤口的情况。'}
  },
  {
    when: {en: 'In the middle of recovery', zh: '恢复到一半的时候'},
    words: {
      en: 'Progress can feel slow, and watching others train while you can\'t is hard. Slow days are still part of getting better.',
      zh: '进步可能感觉很慢，看着别人训练自己却不能上场，很难受。慢的日子也是在变好。'
    },
    tryThis: {en: 'Write down one small thing you could do today that you could not do last week.', zh: '记下一件今天能做到、上周还做不到的小事。'}
  },
  {
    when: {en: 'Getting ready to play again', zh: '准备回到运动的时候'},
    words: {
      en: 'Being afraid of getting hurt again is common, even when your body is ready. Confidence comes back one session at a time.',
      zh: '害怕再次受伤很常见，哪怕身体已经准备好了。信心会一次一次训练慢慢回来。'
    },
    tryThis: {en: 'Start with an easy session you know you can finish, and notice that you did it.', zh: '先从一次肯定能完成的轻松训练开始，并告诉自己：我做到了。'}
  }
];

// Where to talk to a counselor. `href` opens the phone or the website.
var COUNSELING = [
  {
    name: {en: 'UIUC Counseling Center', zh: '伊利诺伊大学心理咨询中心'},
    detail: {en: 'Free for students · 217-333-3704', zh: '学生免费 · 217-333-3704'},
    links: [
      {label: {en: 'Call', zh: '打电话'}, href: 'tel:+12173333704'},
      {label: {en: 'Website', zh: '官网'}, href: 'https://counselingcenter.illinois.edu/'}
    ]
  },
  {
    name: {en: '988 Lifeline (US)', zh: '988 心理危机热线（美国）'},
    detail: {en: 'Call or text 988, any time', zh: '电话或短信 988，全天 24 小时'},
    links: [
      {label: {en: 'Call', zh: '打电话'}, href: 'tel:988'},
      {label: {en: 'Text', zh: '发短信'}, href: 'sms:988'}
    ]
  },
  {
    name: {en: 'Psychological help line (China)', zh: '全国心理援助热线（中国）'},
    detail: {en: '12356', zh: '12356'},
    links: [
      {label: {en: 'Call', zh: '打电话'}, href: 'tel:12356'}
    ]
  }
];

// Kinds of places to search for on a map, from most to least urgent.
// `query` is the search text sent to the map, in that map's language.
var HOSPITAL_KINDS = [
  {
    name: {en: 'Emergency room', zh: '急诊'},
    when: {en: 'Bone out of place, numbness, head injury, or pain you cannot bear.', zh: '骨头错位、发麻、头部受伤，或者疼得受不了。'},
    query: {en: 'emergency room', zh: '医院急诊'}
  },
  {
    name: {en: 'Urgent care', zh: '社区医院 / 门诊'},
    when: {en: 'Needs a doctor today but is not an emergency.', zh: '今天需要看医生，但不是急症。'},
    query: {en: 'urgent care', zh: '社区卫生服务中心'}
  },
  {
    name: {en: 'Orthopedics / sports medicine', zh: '骨科 / 运动医学科'},
    when: {en: 'Joint, ligament or bone problems that need a specialist.', zh: '关节、韧带、骨头的问题，需要专科医生。'},
    query: {en: 'sports medicine orthopedics', zh: '骨科 运动医学'}
  },
  {
    name: {en: 'Physical therapy', zh: '康复理疗'},
    when: {en: 'Getting strength and movement back after the injury.', zh: '受伤后恢复力量和活动度。'},
    query: {en: 'physical therapy', zh: '康复理疗'}
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
