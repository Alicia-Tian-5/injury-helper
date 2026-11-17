// Well-known hospitals for sports injuries in some cities, and what each is
// known for. The page cannot search the web, so this list is written by hand.
// Departments and hours change, so the page asks people to call first.

var CITY_HOSPITALS = [
  {
    id: 'beijing',
    country: 'cn',
    name: {en: 'Beijing', zh: '北京'},
    aliases: ['beijing', 'peking', '北京', '北京市'],
    hospitals: [
      {
        name: {en: 'Peking University Third Hospital', zh: '北京大学第三医院（北医三院）'},
        department: {en: 'Sports Medicine (Institute of Sports Medicine)', es: 'Medicina deportiva (Instituto de Medicina Deportiva)', fr: 'Médecine du sport (Institut de médecine du sport)', ru: 'Спортивная медицина (Институт спортивной медицины)', ar: 'الطب الرياضي (معهد الطب الرياضي)', zh: '运动医学科（运动医学研究所）'},
        knownFor: {en: 'Knee ligaments (ACL), meniscus, kneecap dislocation, shoulder and ankle injuries', es: 'Ligamentos de la rodilla (LCA), menisco, luxación de rótula, lesiones de hombro y tobillo', fr: 'Ligaments du genou (LCA), ménisque, luxation de la rotule, blessures de l’épaule et de la cheville', ru: 'Связки колена (передняя крестообразная), мениск, вывих надколенника, травмы плеча и голеностопа', ar: 'أربطة الركبة (الرباط الصليبي الأمامي)، والغضروف الهلالي، وخلع الرضفة، وإصابات الكتف والكاحل',
                   zh: '膝关节韧带（前交叉韧带）、半月板、髌骨脱位、肩关节和踝关节损伤'}
      },
      {
        name: {en: 'Beijing Jishuitan Hospital', zh: '北京积水潭医院'},
        department: {en: 'Sports Injury and Trauma Orthopedics', es: 'Lesiones deportivas y traumatología', fr: 'Orthopédie des blessures sportives et traumatologie', ru: 'Спортивная травматология и ортопедия', ar: 'جراحة العظام للإصابات الرياضية والرضوض', zh: '运动损伤科、创伤骨科'},
        knownFor: {en: 'Fractures, knee and shoulder sports injuries', es: 'Fracturas, lesiones deportivas de rodilla y hombro', fr: 'Fractures, blessures sportives du genou et de l’épaule', ru: 'Переломы, спортивные травмы колена и плеча', ar: 'الكسور، وإصابات الركبة والكتف الرياضية', zh: '骨折、膝关节和肩关节运动损伤'}
      }
    ]
  },
  {
    id: 'shanghai',
    country: 'cn',
    name: {en: 'Shanghai', zh: '上海'},
    aliases: ['shanghai', '上海', '上海市'],
    hospitals: [
      {
        name: {en: 'Huashan Hospital, Fudan University', zh: '复旦大学附属华山医院'},
        department: {en: 'Sports Medicine', es: 'Medicina deportiva', fr: 'Médecine du sport', ru: 'Спортивная медицина', ar: 'الطب الرياضي', zh: '运动医学科'},
        knownFor: {en: 'Shoulder, knee and ankle sports injuries; arthroscopic surgery', es: 'Lesiones deportivas de hombro, rodilla y tobillo; cirugía artroscópica', fr: 'Blessures sportives de l’épaule, du genou et de la cheville ; chirurgie arthroscopique', ru: 'Спортивные травмы плеча, колена и голеностопа; артроскопические операции', ar: 'إصابات الكتف والركبة والكاحل الرياضية؛ جراحة بالمنظار', zh: '肩、膝、踝关节运动损伤，关节镜微创手术'}
      },
      {
        name: {en: 'Shanghai Sixth People\'s Hospital', zh: '上海市第六人民医院'},
        department: {en: 'Orthopedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科、运动医学科'},
        knownFor: {en: 'Fractures, knee and shoulder injuries', es: 'Fracturas, lesiones de rodilla y hombro', fr: 'Fractures, blessures du genou et de l’épaule', ru: 'Переломы, травмы колена и плеча', ar: 'الكسور، وإصابات الركبة والكتف', zh: '骨折、膝关节和肩关节损伤'}
      }
    ]
  },
  {
    id: 'guangzhou',
    country: 'cn',
    name: {en: 'Guangzhou', zh: '广州'},
    aliases: ['guangzhou', 'canton', '广州', '广州市'],
    hospitals: [
      {
        name: {en: 'Third Affiliated Hospital of Sun Yat-sen University', zh: '中山大学附属第三医院'},
        department: {en: 'Orthopedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科、运动医学科'},
        knownFor: {en: 'Joint and ligament injuries, especially the knee', es: 'Lesiones de articulaciones y ligamentos, sobre todo de rodilla', fr: 'Blessures des articulations et des ligaments, surtout du genou', ru: 'Травмы суставов и связок, особенно колена', ar: 'إصابات المفاصل والأربطة، خصوصًا الركبة', zh: '关节和韧带损伤，特别是膝关节'}
      },
      {
        name: {en: 'Guangdong Provincial Orthopedic Hospital (Third Affiliated Hospital of Southern Medical University)',
               zh: '广东省骨科医院（南方医科大学第三附属医院）'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'A hospital focused on bones and joints: fractures, joint and sports injuries', es: 'Hospital centrado en huesos y articulaciones: fracturas, lesiones articulares y deportivas', fr: 'Un hôpital spécialisé dans les os et les articulations : fractures, blessures articulaires et sportives', ru: 'Больница, специализирующаяся на костях и суставах: переломы, травмы суставов и спортивные травмы', ar: 'مستشفى متخصص في العظام والمفاصل: الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '以骨科为主的医院：骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'shenzhen',
    country: 'cn',
    name: {en: 'Shenzhen', zh: '深圳'},
    aliases: ['shenzhen', '深圳', '深圳市'],
    hospitals: [
      {
        name: {en: 'Peking University Shenzhen Hospital', zh: '北京大学深圳医院'},
        department: {en: 'Sports Medicine and Rehabilitation', es: 'Medicina deportiva y rehabilitación', fr: 'Médecine du sport et rééducation', ru: 'Спортивная медицина и реабилитация', ar: 'الطب الرياضي والتأهيل', zh: '运动医学与康复科'},
        knownFor: {en: 'Knee, hip, shoulder and ankle injuries, and sports injuries in young athletes', es: 'Lesiones de rodilla, cadera, hombro y tobillo, y lesiones deportivas en jóvenes deportistas', fr: 'Blessures du genou, de la hanche, de l’épaule et de la cheville, et blessures sportives des jeunes athlètes', ru: 'Травмы колена, тазобедренного сустава, плеча и голеностопа, а также спортивные травмы у юных спортсменов', ar: 'إصابات الركبة والورك والكتف والكاحل، والإصابات الرياضية لدى الرياضيين الصغار',
                   zh: '膝、髋、肩、踝关节损伤，以及青少年运动损伤'}
      },
      {
        name: {en: 'Shenzhen Hospital of Southern Medical University', zh: '南方医科大学深圳医院'},
        department: {en: 'International Sports Medicine Rehabilitation Centre', es: 'Centro Internacional de Rehabilitación en Medicina Deportiva', fr: 'International Sports Medicine Rehabilitation Centre', ru: 'International Sports Medicine Rehabilitation Centre', ar: 'International Sports Medicine Rehabilitation Centre', zh: '国际运动医学康复中心'},
        knownFor: {en: 'Rehab after sports injuries', es: 'Rehabilitación después de lesiones deportivas', fr: 'Rééducation après les blessures sportives', ru: 'Реабилитация после спортивных травм', ar: 'التأهيل بعد الإصابات الرياضية', zh: '运动损伤后的康复'}
      }
    ]
  },
  {
    id: 'chengdu',
    country: 'cn',
    name: {en: 'Chengdu', zh: '成都'},
    aliases: ['chengdu', '成都', '成都市'],
    hospitals: [
      {
        name: {en: 'West China Hospital, Sichuan University', zh: '四川大学华西医院'},
        department: {en: 'Orthopedics (Sports Medicine Center)', es: 'Ortopedia (Centro de Medicina Deportiva)', fr: 'Orthopédie (Centre de médecine du sport)', ru: 'Травматология-ортопедия (Центр спортивной медицины)', ar: 'جراحة العظام (مركز الطب الرياضي)', zh: '骨科（运动医学中心）'},
        knownFor: {en: 'Knee and shoulder ligament injuries, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، وجراحة بالمنظار', zh: '膝关节、肩关节韧带损伤，关节镜手术'}
      },
      {
        name: {en: 'Sichuan Provincial Orthopedic Hospital (Chengdu Sports Hospital)', zh: '四川省骨科医院（成都体育医院）'},
        department: {en: 'Sports injuries and orthopedics', es: 'Lesiones deportivas y ortopedia', fr: 'Blessures sportives et orthopédie', ru: 'Спортивные травмы и ортопедия', ar: 'الإصابات الرياضية وجراحة العظام', zh: '运动创伤科、骨科'},
        knownFor: {en: 'Long history of treating athletes: sprains, strains, fractures and rehab', es: 'Larga experiencia tratando deportistas: esguinces, distensiones, fracturas y rehabilitación', fr: 'Longue expérience des soins aux athlètes : entorses, élongations, fractures et rééducation', ru: 'Давний опыт лечения спортсменов: растяжения связок и мышц, переломы и реабилитация', ar: 'تاريخ طويل في علاج الرياضيين: الالتواءات، والشدّ العضلي، والكسور، والتأهيل',
                   zh: '长期为运动员看病：扭伤、拉伤、骨折和康复'}
      }
    ]
  },
  {
    id: 'xian',
    country: 'cn',
    name: {en: 'Xi\'an', zh: '西安'},
    aliases: ['xian', 'xi an', 'xi\'an', 'xi’an', '西安', '西安市'],
    hospitals: [
      {
        name: {en: 'Xi\'an Honghui Hospital', zh: '西安市红会医院'},
        department: {en: 'Sports Medicine (knee and ankle ward, shoulder and elbow ward)', es: 'Medicina deportiva (unidad de rodilla y tobillo, unidad de hombro y codo)', fr: 'Médecine du sport (service genou et cheville, service épaule et coude)', ru: 'Спортивная медицина (отделение колена и голеностопа, отделение плеча и локтя)', ar: 'الطب الرياضي (جناح الركبة والكاحل، وجناح الكتف والمرفق)', zh: '运动医学科（膝踝病区、肩肘病区）'},
        knownFor: {en: 'A hospital known for orthopedics: knee, ankle, shoulder and elbow sports injuries, foot and ankle surgery', es: 'Hospital conocido por su ortopedia: lesiones deportivas de rodilla, tobillo, hombro y codo, cirugía de pie y tobillo', fr: 'Un hôpital connu pour l’orthopédie : blessures sportives du genou, de la cheville, de l’épaule et du coude, chirurgie du pied et de la cheville', ru: 'Больница, известная травматологией-ортопедией: спортивные травмы колена, голеностопа, плеча и локтя, хирургия стопы и голеностопа', ar: 'مستشفى معروف بجراحة العظام: إصابات الركبة والكاحل والكتف والمرفق الرياضية، وجراحة القدم والكاحل',
                   zh: '以骨科为特色的医院：膝、踝、肩、肘关节运动损伤，足踝外科'}
      },
      {
        name: {en: 'Xijing Hospital (First Affiliated Hospital of the Air Force Medical University)', zh: '西京医院（空军军医大学第一附属医院）'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Joint injuries, fractures and sports injuries', es: 'Lesiones articulares, fracturas y lesiones deportivas', fr: 'Blessures articulaires, fractures et blessures sportives', ru: 'Травмы суставов, переломы и спортивные травмы', ar: 'إصابات المفاصل، والكسور، والإصابات الرياضية', zh: '关节损伤、骨折和运动损伤'}
      }
    ]
  },
  {
    id: 'chongqing',
    country: 'cn',
    name: {en: 'Chongqing', zh: '重庆'},
    aliases: ['chongqing', 'chungking', '重庆', '重庆市'],
    hospitals: [
      {
        name: {en: 'Second Affiliated Hospital of Chongqing Medical University', zh: '重庆医科大学附属第二医院'},
        department: {en: 'Sports Medicine', es: 'Medicina deportiva', fr: 'Médecine du sport', ru: 'Спортивная медицина', ar: 'الطب الرياضي', zh: '运动医学科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      },
      {
        name: {en: 'Southwest Hospital (First Affiliated Hospital of the Army Medical University)', zh: '西南医院（陆军军医大学第一附属医院）'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'suzhou',
    country: 'cn',
    name: {en: 'Suzhou', zh: '苏州'},
    aliases: ['suzhou', '苏州', '苏州市'],
    hospitals: [
      {
        name: {en: 'First Affiliated Hospital of Soochow University', zh: '苏州大学附属第一医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Knee, ankle and shoulder sports injuries, arthroscopic surgery', es: 'Lesiones deportivas de rodilla, tobillo y hombro, cirugía artroscópica', fr: 'Blessures sportives du genou, de la cheville et de l’épaule, chirurgie arthroscopique', ru: 'Спортивные травмы колена, голеностопа и плеча, артроскопические операции', ar: 'إصابات الركبة والكاحل والكتف الرياضية، وجراحة بالمنظار', zh: '膝、踝、肩关节运动损伤，关节镜手术'}
      },
      {
        name: {en: 'Second Affiliated Hospital of Soochow University', zh: '苏州大学附属第二医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      }
    ]
  },
  {
    id: 'hangzhou',
    country: 'cn',
    name: {en: 'Hangzhou', zh: '杭州'},
    aliases: ['hangzhou', '杭州', '杭州市'],
    hospitals: [
      {
        name: {en: 'Second Affiliated Hospital, Zhejiang University School of Medicine', zh: '浙江大学医学院附属第二医院（浙大二院）'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Knee, ankle and shoulder sports injuries, arthroscopic surgery', es: 'Lesiones deportivas de rodilla, tobillo y hombro, cirugía artroscópica', fr: 'Blessures sportives du genou, de la cheville et de l’épaule, chirurgie arthroscopique', ru: 'Спортивные травмы колена, голеностопа и плеча, артроскопические операции', ar: 'إصابات الركبة والكاحل والكتف الرياضية، وجراحة بالمنظار', zh: '膝、踝、肩关节运动损伤，关节镜手术'}
      },
      {
        name: {en: 'Sir Run Run Shaw Hospital, Zhejiang University School of Medicine', zh: '浙江大学医学院附属邵逸夫医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Sports injuries, including a clinic for runners', es: 'Lesiones deportivas, con una consulta para corredores', fr: 'Blessures sportives, dont une consultation pour les coureurs', ru: 'Спортивные травмы, есть приём для бегунов', ar: 'الإصابات الرياضية، مع عيادة للعدّائين', zh: '运动损伤，设有马拉松门诊'}
      }
    ]
  },
  {
    id: 'wuhan',
    country: 'cn',
    name: {en: 'Wuhan', zh: '武汉'},
    aliases: ['wuhan', '武汉', '武汉市'],
    hospitals: [
      {
        name: {en: 'Union Hospital, Tongji Medical College, Huazhong University of Science and Technology', zh: '华中科技大学同济医学院附属协和医院（武汉协和医院）'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      },
      {
        name: {en: 'Zhongnan Hospital of Wuhan University', zh: '武汉大学中南医院'},
        department: {en: 'Orthopedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科、运动医学科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      }
    ]
  },
  {
    id: 'nanjing',
    country: 'cn',
    name: {en: 'Nanjing', zh: '南京'},
    aliases: ['nanjing', 'nanking', '南京', '南京市'],
    hospitals: [
      {
        name: {en: 'Nanjing Drum Tower Hospital', zh: '南京鼓楼医院'},
        department: {en: 'Sports Medicine and Adult Joint Reconstruction', es: 'Medicina deportiva y reconstrucción articular en adultos', fr: 'Médecine du sport et reconstruction articulaire de l’adulte', ru: 'Спортивная медицина и реконструкция суставов у взрослых', ar: 'الطب الرياضي وإعادة بناء المفاصل لدى البالغين', zh: '运动医学与成人重建外科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      },
      {
        name: {en: 'Jiangsu Province Hospital (First Affiliated Hospital of Nanjing Medical University)', zh: '江苏省人民医院（南京医科大学第一附属医院）'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'ningbo',
    country: 'cn',
    name: {en: 'Ningbo', zh: '宁波'},
    aliases: ['ningbo', '宁波', '宁波市'],
    hospitals: [
      {
        name: {en: 'Ningbo No. 6 Hospital', zh: '宁波市第六医院'},
        department: {en: 'Sports Medicine', es: 'Medicina deportiva', fr: 'Médecine du sport', ru: 'Спортивная медицина', ar: 'الطب الرياضي', zh: '运动医学科'},
        knownFor: {en: 'A hospital focused on bones and joints: fractures, joint and sports injuries', es: 'Hospital centrado en huesos y articulaciones: fracturas, lesiones articulares y deportivas', fr: 'Un hôpital spécialisé dans les os et les articulations : fractures, blessures articulaires et sportives', ru: 'Больница, специализирующаяся на костях и суставах: переломы, травмы суставов и спортивные травмы', ar: 'مستشفى متخصص في العظام والمفاصل: الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '以骨科为主的医院：骨折、关节和运动损伤'}
      },
      {
        name: {en: 'First Affiliated Hospital of Ningbo University', zh: '宁波大学附属第一医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'tianjin',
    country: 'cn',
    name: {en: 'Tianjin', zh: '天津'},
    aliases: ['tianjin', 'tientsin', '天津', '天津市'],
    hospitals: [
      {
        name: {en: 'Tianjin Hospital', zh: '天津市天津医院'},
        department: {en: 'Sports Medicine', es: 'Medicina deportiva', fr: 'Médecine du sport', ru: 'Спортивная медицина', ar: 'الطب الرياضي', zh: '运动医学科'},
        knownFor: {en: 'A hospital focused on bones and joints: fractures, joint and sports injuries', es: 'Hospital centrado en huesos y articulaciones: fracturas, lesiones articulares y deportivas', fr: 'Un hôpital spécialisé dans les os et les articulations : fractures, blessures articulaires et sportives', ru: 'Больница, специализирующаяся на костях и суставах: переломы, травмы суставов и спортивные травмы', ar: 'مستشفى متخصص في العظام والمفاصل: الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '以骨科为主的医院：骨折、关节和运动损伤'}
      },
      {
        name: {en: 'Tianjin Medical University General Hospital', zh: '天津医科大学总医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'qingdao',
    country: 'cn',
    name: {en: 'Qingdao', zh: '青岛'},
    aliases: ['qingdao', 'tsingtao', '青岛', '青岛市'],
    hospitals: [
      {
        name: {en: 'Affiliated Hospital of Qingdao University', zh: '青岛大学附属医院'},
        department: {en: 'Orthopedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科、运动医学科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      },
      {
        name: {en: 'Qingdao Municipal Hospital', zh: '青岛市市立医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'wuxi',
    country: 'cn',
    name: {en: 'Wuxi', zh: '无锡'},
    aliases: ['wuxi', '无锡', '无锡市'],
    hospitals: [
      {
        name: {en: 'Wuxi No. 9 People\'s Hospital', zh: '无锡市第九人民医院'},
        department: {en: 'Orthopedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科、运动医学科'},
        knownFor: {en: 'A hospital focused on bones and joints: fractures, joint and sports injuries', es: 'Hospital centrado en huesos y articulaciones: fracturas, lesiones articulares y deportivas', fr: 'Un hôpital spécialisé dans les os et les articulations : fractures, blessures articulaires et sportives', ru: 'Больница, специализирующаяся на костях и суставах: переломы, травмы суставов и спортивные травмы', ar: 'مستشفى متخصص في العظام والمفاصل: الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '以骨科为主的医院：骨折、关节和运动损伤'}
      },
      {
        name: {en: 'Wuxi People\'s Hospital', zh: '无锡市人民医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'changsha',
    country: 'cn',
    name: {en: 'Changsha', zh: '长沙'},
    aliases: ['changsha', '长沙', '长沙市'],
    hospitals: [
      {
        name: {en: 'Xiangya Hospital, Central South University', zh: '中南大学湘雅医院'},
        department: {en: 'Sports Medicine', es: 'Medicina deportiva', fr: 'Médecine du sport', ru: 'Спортивная медицина', ar: 'الطب الرياضي', zh: '运动医学科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      },
      {
        name: {en: 'Second Xiangya Hospital, Central South University', zh: '中南大学湘雅二医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'zhengzhou',
    country: 'cn',
    name: {en: 'Zhengzhou', zh: '郑州'},
    aliases: ['zhengzhou', '郑州', '郑州市'],
    hospitals: [
      {
        name: {en: 'First Affiliated Hospital of Zhengzhou University', zh: '郑州大学第一附属医院'},
        department: {en: 'Orthopedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科、运动医学科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      },
      {
        name: {en: 'Henan Provincial People\'s Hospital', zh: '河南省人民医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'fuzhou',
    country: 'cn',
    name: {en: 'Fuzhou', zh: '福州'},
    aliases: ['fuzhou', 'foochow', '福州', '福州市'],
    hospitals: [
      {
        name: {en: 'Fujian Medical University Union Hospital', zh: '福建医科大学附属协和医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      },
      {
        name: {en: 'First Affiliated Hospital of Fujian Medical University', zh: '福建医科大学附属第一医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'jinan',
    country: 'cn',
    name: {en: 'Jinan', zh: '济南'},
    aliases: ['jinan', 'tsinan', '济南', '济南市'],
    hospitals: [
      {
        name: {en: 'Qilu Hospital of Shandong University', zh: '山东大学齐鲁医院'},
        department: {en: 'Orthopedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科、运动医学科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      },
      {
        name: {en: 'Shandong Provincial Hospital', zh: '山东省立医院'},
        department: {en: 'Joint and Sports Medicine', es: 'Articulaciones y medicina deportiva', fr: 'Articulations et médecine du sport', ru: 'Суставы и спортивная медицина', ar: 'المفاصل والطب الرياضي', zh: '关节与运动医学科'},
        knownFor: {en: 'Knee, ankle and shoulder sports injuries, arthroscopic surgery', es: 'Lesiones deportivas de rodilla, tobillo y hombro, cirugía artroscópica', fr: 'Blessures sportives du genou, de la cheville et de l’épaule, chirurgie arthroscopique', ru: 'Спортивные травмы колена, голеностопа и плеча, артроскопические операции', ar: 'إصابات الركبة والكاحل والكتف الرياضية، وجراحة بالمنظار', zh: '膝、踝、肩关节运动损伤，关节镜手术'}
      }
    ]
  },
  {
    id: 'hefei',
    country: 'cn',
    name: {en: 'Hefei', zh: '合肥'},
    aliases: ['hefei', '合肥', '合肥市'],
    hospitals: [
      {
        name: {en: 'Anhui Provincial Hospital (First Affiliated Hospital of USTC)', zh: '安徽省立医院（中国科学技术大学附属第一医院）'},
        department: {en: 'Orthopedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科、运动医学科'},
        knownFor: {en: 'Knee and shoulder ligament injuries, meniscus, arthroscopic surgery', es: 'Lesiones de ligamentos de rodilla y hombro, menisco, cirugía artroscópica', fr: 'Blessures des ligaments du genou et de l’épaule, ménisque, chirurgie arthroscopique', ru: 'Травмы связок колена и плеча, мениск, артроскопические операции', ar: 'إصابات أربطة الركبة والكتف، والغضروف الهلالي، وجراحة بالمنظار', zh: '膝、肩关节韧带损伤，半月板，关节镜手术'}
      },
      {
        name: {en: 'First Affiliated Hospital of Anhui Medical University', zh: '安徽医科大学第一附属医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'foshan',
    country: 'cn',
    name: {en: 'Foshan', zh: '佛山'},
    aliases: ['foshan', '佛山', '佛山市'],
    hospitals: [
      {
        name: {en: 'Foshan Hospital of Traditional Chinese Medicine', zh: '佛山市中医院'},
        department: {en: 'Sports Medicine Center', es: 'Centro de Medicina Deportiva', fr: 'Centre de médecine du sport', ru: 'Центр спортивной медицины', ar: 'مركز الطب الرياضي', zh: '运动医学中心'},
        knownFor: {en: 'Sports injuries, especially knee ligaments; Chinese and Western medicine', es: 'Lesiones deportivas, sobre todo ligamentos de rodilla; medicina china y occidental', fr: 'Blessures sportives, surtout des ligaments du genou ; médecine chinoise et occidentale', ru: 'Спортивные травмы, особенно связки колена; китайская и западная медицина', ar: 'الإصابات الرياضية، خصوصًا أربطة الركبة؛ الطب الصيني والغربي', zh: '运动损伤，特别是膝关节韧带；中西医结合'}
      },
      {
        name: {en: 'First People\'s Hospital of Foshan', zh: '佛山市第一人民医院'},
        department: {en: 'Orthopedics', es: 'Ortopedia', fr: 'Orthopédie', ru: 'Травматология-ортопедия', ar: 'جراحة العظام', zh: '骨科'},
        knownFor: {en: 'Fractures, joint and sports injuries', es: 'Fracturas, lesiones articulares y deportivas', fr: 'Fractures, blessures articulaires et sportives', ru: 'Переломы, травмы суставов и спортивные травмы', ar: 'الكسور، وإصابات المفاصل والإصابات الرياضية', zh: '骨折、关节和运动损伤'}
      }
    ]
  },
  {
    id: 'chicago',
    country: 'us',
    name: {en: 'Chicago', zh: '芝加哥'},
    aliases: ['chicago', 'chicago il', '芝加哥'],
    hospitals: [
      {
        name: {en: 'Rush University Medical Center', zh: 'Rush 大学医学中心'},
        department: {en: 'Orthopedics and Sports Medicine (Midwest Orthopaedics at Rush)', es: 'Ortopedia y medicina deportiva (Midwest Orthopaedics at Rush)', fr: 'Orthopédie et médecine du sport (Midwest Orthopaedics at Rush)', ru: 'Травматология-ортопедия и спортивная медицина (Midwest Orthopaedics at Rush)', ar: 'جراحة العظام والطب الرياضي (Midwest Orthopaedics at Rush)', zh: '骨科与运动医学（Midwest Orthopaedics at Rush）'},
        knownFor: {en: 'Team doctors for professional teams; knee, shoulder and elbow injuries', es: 'Médicos de equipos profesionales; lesiones de rodilla, hombro y codo', fr: 'Médecins des équipes professionnelles ; blessures du genou, de l’épaule et du coude', ru: 'Врачи профессиональных команд; травмы колена, плеча и локтя', ar: 'أطباء فرق رياضية محترفة؛ إصابات الركبة والكتف والمرفق',
                   zh: '多支职业球队的队医；膝、肩、肘关节损伤'}
      },
      {
        name: {en: 'Northwestern Memorial Hospital', zh: '西北纪念医院（Northwestern Medicine）'},
        department: {en: 'Orthopaedics and Sports Medicine', es: 'Ortopedia y medicina deportiva', fr: 'Orthopédie et médecine du sport', ru: 'Травматология-ортопедия и спортивная медицина', ar: 'جراحة العظام والطب الرياضي', zh: '骨科与运动医学'},
        knownFor: {en: 'Ligament, joint and fracture care', es: 'Lesiones de ligamentos, articulaciones y fracturas', fr: 'Soins des ligaments, des articulations et des fractures', ru: 'Лечение связок, суставов и переломов', ar: 'علاج الأربطة والمفاصل والكسور', zh: '韧带、关节损伤和骨折'}
      }
    ]
  },
  {
    id: 'newyork',
    country: 'us',
    name: {en: 'New York', es: 'Nueva York', fr: 'New York', ru: 'Нью-Йорк', ar: 'نيويورك', zh: '纽约'},
    aliases: ['new york', 'new york city', 'nyc', 'ny', 'manhattan', '纽约', '纽约市'],
    hospitals: [
      {
        name: {en: 'Hospital for Special Surgery (HSS)', zh: '特种外科医院（HSS）'},
        department: {en: 'Sports Medicine', es: 'Medicina deportiva', fr: 'Médecine du sport', ru: 'Спортивная медицина', ar: 'الطب الرياضي', zh: '运动医学'},
        knownFor: {en: 'One of the top hospitals for orthopedics in the US: knee, shoulder, ankle, every kind of sports injury', es: 'Uno de los mejores hospitales de ortopedia de EE. UU.: rodilla, hombro, tobillo, todo tipo de lesiones deportivas', fr: 'L’un des meilleurs hôpitaux d’orthopédie des États-Unis : genou, épaule, cheville, tous les types de blessures sportives', ru: 'Одна из лучших ортопедических больниц США: колено, плечо, голеностоп, любые спортивные травмы', ar: 'من أفضل مستشفيات جراحة العظام في الولايات المتحدة: الركبة، والكتف، والكاحل، وكل أنواع الإصابات الرياضية',
                   zh: '美国顶尖的骨科医院之一：膝、肩、踝，各类运动损伤'}
      },
      {
        name: {en: 'NYU Langone Orthopedic Hospital', zh: '纽约大学朗格尼骨科医院'},
        department: {en: 'Sports Medicine', es: 'Medicina deportiva', fr: 'Médecine du sport', ru: 'Спортивная медицина', ar: 'الطب الرياضي', zh: '运动医学'},
        knownFor: {en: 'Knee, shoulder and hip injuries, and rehab', es: 'Lesiones de rodilla, hombro y cadera, y rehabilitación', fr: 'Blessures du genou, de l’épaule et de la hanche, et rééducation', ru: 'Травмы колена, плеча и тазобедренного сустава, а также реабилитация', ar: 'إصابات الركبة والكتف والورك، والتأهيل', zh: '膝、肩、髋关节损伤和康复'}
      }
    ]
  },
  {
    id: 'champaign',
    country: 'us',
    name: {en: 'Champaign–Urbana', zh: '香槟（Champaign–Urbana）'},
    aliases: ['champaign', 'urbana', 'champaign urbana', 'champaign il', 'urbana il', 'uiuc', '香槟', '厄巴纳'],
    hospitals: [
      {
        name: {en: 'Carle Orthopedics and Sports Medicine', zh: 'Carle 骨科与运动医学中心'},
        department: {en: 'Orthopedics, sports medicine and physical therapy (2300 S. First St., Champaign)', es: 'Ortopedia, medicina deportiva y fisioterapia (2300 S. First St., Champaign)', fr: 'Orthopédie, médecine du sport et kinésithérapie (2300 S. First St., Champaign)', ru: 'Травматология-ортопедия, спортивная медицина и реабилитация (2300 S. First St., Champaign)', ar: 'جراحة العظام، والطب الرياضي، والعلاج الطبيعي (2300 S. First St., Champaign)',
                     zh: '骨科、运动医学和康复理疗（2300 S. First St., Champaign）'},
        knownFor: {en: 'Healthcare provider for Fighting Illini athletics; all kinds of sports injuries', es: 'Proveedor médico de los equipos Fighting Illini; todo tipo de lesiones deportivas', fr: 'Prestataire de soins des équipes sportives Fighting Illini ; tous types de blessures sportives', ru: 'Медицинский партнёр спортивных команд Fighting Illini; любые спортивные травмы', ar: 'مقدّم الرعاية الصحية لفرق Fighting Illini الرياضية؛ كل أنواع الإصابات الرياضية',
                   zh: '伊利诺伊大学校队的合作医院；各类运动损伤'}
      },
      {
        name: {en: 'McKinley Health Center (University of Illinois)', zh: 'McKinley 健康中心（伊利诺伊大学）'},
        department: {en: 'Student health; physical therapy and athletic training at the ARC', es: 'Salud estudiantil; fisioterapia y entrenamiento atlético en el ARC', fr: 'Santé étudiante ; kinésithérapie et préparation physique à l’ARC', ru: 'Студенческая медицина; реабилитация и спортивная подготовка в ARC', ar: 'صحة الطلاب؛ العلاج الطبيعي والتدريب الرياضي في ARC', zh: '学生医疗；在 ARC 体育馆有康复理疗和运动防护'},
        knownFor: {en: 'First stop for UIUC students; can refer you to a specialist', es: 'Primera parada para estudiantes de UIUC; puede derivarte a un especialista', fr: 'Premier recours pour les étudiants de l’UIUC ; peut t’orienter vers un spécialiste', ru: 'Первое место, куда идти студентам UIUC; могут направить к специалисту', ar: 'المحطة الأولى لطلاب UIUC؛ يمكنهم تحويلك إلى أخصائي', zh: '伊利诺伊大学学生看病的第一站，可以帮你转诊到专科'}
      }
    ]
  }
];

// The city's name as typed, made easy to compare: lower case, single spaces
// and no punctuation, so "Chicago, IL" matches "chicago il".
function normalizeCity(text) {
  return String(text || '').toLowerCase()
    .replace(/[.,，。·'’\-–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// The city entry for what the visitor typed, or null when it is not listed.
function findCity(text) {
  var typed = normalizeCity(text);
  if (!typed) return null;
  return CITY_HOSPITALS.filter(function (city) {
    return city.aliases.some(function (alias) {
      return normalizeCity(alias) === typed || normalizeCity(alias + ' city') === typed;
    });
  })[0] || null;
}

var CITY_INPUT_MAX = 40;

// Map search links for one listed hospital. Chinese hospitals also get Amap,
// which works better in China.
function hospitalMapLinks(city, hospital) {
  var links = {google: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hospital.name.en + ', ' + city.name.en)};
  if (city.country === 'cn') links.amap = 'https://uri.amap.com/search?keyword=' + encodeURIComponent(hospital.name.zh.replace(/（.*）/, ''));
  return links;
}

// For a city that is not listed: search the map for sports medicine there.
function cityMapLinks(text) {
  var city = String(text).trim();
  return {
    google: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('sports medicine orthopedics in ' + city),
    amap: 'https://uri.amap.com/search?keyword=' + encodeURIComponent(city + ' 运动医学科')
  };
}
