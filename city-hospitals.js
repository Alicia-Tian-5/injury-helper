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
        department: {en: 'Sports Medicine (Institute of Sports Medicine)', zh: '运动医学科（运动医学研究所）'},
        knownFor: {en: 'Knee ligaments (ACL), meniscus, kneecap dislocation, shoulder and ankle injuries',
                   zh: '膝关节韧带（前交叉韧带）、半月板、髌骨脱位、肩关节和踝关节损伤'}
      },
      {
        name: {en: 'Beijing Jishuitan Hospital', zh: '北京积水潭医院'},
        department: {en: 'Sports Injury and Trauma Orthopedics', zh: '运动损伤科、创伤骨科'},
        knownFor: {en: 'Fractures, knee and shoulder sports injuries', zh: '骨折、膝关节和肩关节运动损伤'}
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
        department: {en: 'Sports Medicine', zh: '运动医学科'},
        knownFor: {en: 'Shoulder, knee and ankle sports injuries; arthroscopic surgery', zh: '肩、膝、踝关节运动损伤，关节镜微创手术'}
      },
      {
        name: {en: 'Shanghai Sixth People\'s Hospital', zh: '上海市第六人民医院'},
        department: {en: 'Orthopedics and Sports Medicine', zh: '骨科、运动医学科'},
        knownFor: {en: 'Fractures, knee and shoulder injuries', zh: '骨折、膝关节和肩关节损伤'}
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
        department: {en: 'Orthopedics and Sports Medicine', zh: '骨科、运动医学科'},
        knownFor: {en: 'Joint and ligament injuries, especially the knee', zh: '关节和韧带损伤，特别是膝关节'}
      },
      {
        name: {en: 'Guangdong Provincial Orthopedic Hospital (Third Affiliated Hospital of Southern Medical University)',
               zh: '广东省骨科医院（南方医科大学第三附属医院）'},
        department: {en: 'Orthopedics', zh: '骨科'},
        knownFor: {en: 'A hospital focused on bones and joints: fractures, joint and sports injuries', zh: '以骨科为主的医院：骨折、关节和运动损伤'}
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
        department: {en: 'Sports Medicine and Rehabilitation', zh: '运动医学与康复科'},
        knownFor: {en: 'Knee, hip, shoulder and ankle injuries, and sports injuries in young athletes',
                   zh: '膝、髋、肩、踝关节损伤，以及青少年运动损伤'}
      },
      {
        name: {en: 'Shenzhen Hospital of Southern Medical University', zh: '南方医科大学深圳医院'},
        department: {en: 'International Sports Medicine Rehabilitation Centre', zh: '国际运动医学康复中心'},
        knownFor: {en: 'Rehab after sports injuries', zh: '运动损伤后的康复'}
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
        department: {en: 'Orthopedics (Sports Medicine Center)', zh: '骨科（运动医学中心）'},
        knownFor: {en: 'Knee and shoulder ligament injuries, arthroscopic surgery', zh: '膝关节、肩关节韧带损伤，关节镜手术'}
      },
      {
        name: {en: 'Sichuan Provincial Orthopedic Hospital (Chengdu Sports Hospital)', zh: '四川省骨科医院（成都体育医院）'},
        department: {en: 'Sports injuries and orthopedics', zh: '运动创伤科、骨科'},
        knownFor: {en: 'Long history of treating athletes: sprains, strains, fractures and rehab',
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
        department: {en: 'Sports Medicine (knee and ankle ward, shoulder and elbow ward)', zh: '运动医学科（膝踝病区、肩肘病区）'},
        knownFor: {en: 'A hospital known for orthopedics: knee, ankle, shoulder and elbow sports injuries, foot and ankle surgery',
                   zh: '以骨科为特色的医院：膝、踝、肩、肘关节运动损伤，足踝外科'}
      },
      {
        name: {en: 'Xijing Hospital (First Affiliated Hospital of the Air Force Medical University)', zh: '西京医院（空军军医大学第一附属医院）'},
        department: {en: 'Orthopedics', zh: '骨科'},
        knownFor: {en: 'Joint injuries, fractures and sports injuries', zh: '关节损伤、骨折和运动损伤'}
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
        department: {en: 'Orthopedics and Sports Medicine (Midwest Orthopaedics at Rush)', zh: '骨科与运动医学（Midwest Orthopaedics at Rush）'},
        knownFor: {en: 'Team doctors for professional teams; knee, shoulder and elbow injuries',
                   zh: '多支职业球队的队医；膝、肩、肘关节损伤'}
      },
      {
        name: {en: 'Northwestern Memorial Hospital', zh: '西北纪念医院（Northwestern Medicine）'},
        department: {en: 'Orthopaedics and Sports Medicine', zh: '骨科与运动医学'},
        knownFor: {en: 'Ligament, joint and fracture care', zh: '韧带、关节损伤和骨折'}
      }
    ]
  },
  {
    id: 'newyork',
    country: 'us',
    name: {en: 'New York', zh: '纽约'},
    aliases: ['new york', 'new york city', 'nyc', 'ny', 'manhattan', '纽约', '纽约市'],
    hospitals: [
      {
        name: {en: 'Hospital for Special Surgery (HSS)', zh: '特种外科医院（HSS）'},
        department: {en: 'Sports Medicine', zh: '运动医学'},
        knownFor: {en: 'One of the top hospitals for orthopedics in the US: knee, shoulder, ankle, every kind of sports injury',
                   zh: '美国顶尖的骨科医院之一：膝、肩、踝，各类运动损伤'}
      },
      {
        name: {en: 'NYU Langone Orthopedic Hospital', zh: '纽约大学朗格尼骨科医院'},
        department: {en: 'Sports Medicine', zh: '运动医学'},
        knownFor: {en: 'Knee, shoulder and hip injuries, and rehab', zh: '膝、肩、髋关节损伤和康复'}
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
        department: {en: 'Orthopedics, sports medicine and physical therapy (2300 S. First St., Champaign)',
                     zh: '骨科、运动医学和康复理疗（2300 S. First St., Champaign）'},
        knownFor: {en: 'Healthcare provider for Fighting Illini athletics; all kinds of sports injuries',
                   zh: '伊利诺伊大学校队的合作医院；各类运动损伤'}
      },
      {
        name: {en: 'McKinley Health Center (University of Illinois)', zh: 'McKinley 健康中心（伊利诺伊大学）'},
        department: {en: 'Student health; physical therapy and athletic training at the ARC', zh: '学生医疗；在 ARC 体育馆有康复理疗和运动防护'},
        knownFor: {en: 'First stop for UIUC students; can refer you to a specialist', zh: '伊利诺伊大学学生看病的第一站，可以帮你转诊到专科'}
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
