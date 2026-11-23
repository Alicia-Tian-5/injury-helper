// Site search: features, injuries, health topics and cities, matched by
// name, description and everyday words ("崴脚" finds the ankle sprain).
// Feature names and descriptions come from the page texts (T in index.html),
// so they stay the same as the cards they open. Uses INJURIES and CATEGORIES
// from triage.js, KNOWLEDGE from knowledge.js and CITY_HOSPITALS from
// city-hospitals.js.

var SEARCH_MAX_RESULTS = 8;
var SEARCH_LANGUAGES = ['en', 'es', 'fr', 'ru', 'ar', 'zh'];

// Each feature: the view it is on, the element to scroll to (none for the
// top of the view), its title and description keys in T, and everyday words.
var SEARCH_FEATURES = [
  {id: 'assess', view: 'assess', anchor: '', titleKey: 'navAssess', textKey: 'welcomeText',
    words: ['受伤', '急救', '自测', '怎么办', '疼', '痛', 'hurt', 'injury', 'injured', 'first aid', 'pain']},
  {id: 'chat', view: 'comfort', anchor: 'chatTitle', titleKey: 'chatTitle', textKey: 'chatIntro',
    words: ['难过', '心情', '焦虑', '害怕', '聊天', '聊聊', '人工智能', 'ai', 'sad', 'anxious', 'worried', 'talk', 'feeling down', 'triste', 'moral', 'грустно', 'حزين']},
  {id: 'group', view: 'comfort', anchor: 'groupCard', titleKey: 'groupTitle', textKey: 'groupIntro',
    words: ['群聊', '病友', '同样的伤', '聊天室', 'group', 'chat room', 'people like me']},
  {id: 'friends', view: 'comfort', anchor: 'friendsCard', titleKey: 'friendsTitle', textKey: 'friendsIntro',
    words: ['好友', '朋友', '私聊', 'friend', 'private chat']},
  {id: 'counseling', view: 'comfort', anchor: 'counselingTitle', titleKey: 'counselingTitle', textKey: 'comfortTitle',
    words: ['热线', '心理咨询', '心理医生', '不想活', '自杀', 'hotline', 'counselor', 'counselling', 'suicide', 'crisis', '988', '12356']},
  {id: 'cases', view: 'cases', anchor: 'casesCard', titleKey: 'casesTitle', textKey: 'casesIntro',
    words: ['案例', '经验', '故事', '分享', 'story', 'stories', 'experience', 'share']},
  {id: 'city', view: 'hospitals', anchor: 'cityTitle', titleKey: 'cityTitle', textKey: 'cityIntro',
    words: ['医院', '挂号', '看病', '城市', '骨科', '运动医学', 'hospital', 'clinic', 'orthopedic', 'sports medicine', 'hôpital', 'больница', 'مستشفى']},
  {id: 'nearby', view: 'hospitals', anchor: 'hospitalsTitle', titleKey: 'hospitalsTitle', textKey: 'hospitalsIntro',
    words: ['附近', '地图', '急诊', '诊所', '药店', 'urgent care', 'emergency room', 'er', 'map', 'nearby', 'pharmacy']},
  {id: 'doctorVisit', view: 'hospitals', anchor: 'dvCard', titleKey: 'dvTitle', textKey: 'dvIntro',
    words: ['看医生', '医生', '描述', '怎么说', '说不清', '就医', '问医生', 'doctor', 'describe', 'appointment', 'what to bring']},
  {id: 'report', view: 'log', anchor: 'reportCard', titleKey: 'reportTitle', textKey: 'reportIntro',
    words: ['报告', '医生', '打印', '复诊', 'doctor', 'report', 'print', 'check-up']},
  {id: 'plan', view: 'log', anchor: 'planCard', titleKey: 'planTitle', textKey: 'planIntro',
    words: ['康复计划', '康复训练', '康复动作', '练习', '提醒', '日历', 'rehab', 'exercise', 'exercises', 'reminder', 'plan', 'physio']},
  {id: 'log', view: 'log', anchor: 'logTitle', titleKey: 'logTitle', textKey: 'logIntro',
    words: ['康复记录', '记录', '日记', '照片', 'log', 'record', 'diary', 'photo', 'notes']},
  {id: 'trend', view: 'log', anchor: 'logListTitle', titleKey: 'logTrendTitle', textKey: 'logTrendHint',
    words: ['疼痛', '趋势', '折线图', '好转', '变化', 'pain', 'chart', 'trend', 'progress']},
  {id: 'returnToSport', view: 'log', anchor: 'rtsCard', titleKey: 'rtsTitle', textKey: 'rtsIntro',
    words: ['回场', '复出', '重返', '能打球', '能不能运动', '单腿跳', 'return to sport', 'play again', 'back to sport', 'hop test']},
  {id: 'backup', view: 'log', anchor: 'backupCard', titleKey: 'backupTitle', textKey: 'backupIntro',
    words: ['备份', '恢复', '换手机', '导出', 'backup', 'restore', 'export', 'new phone']},
  {id: 'risk', view: 'learn', anchor: 'riskCard', titleKey: 'riskTitle', textKey: 'riskIntro',
    words: ['预防', '容易伤', '风险', '膝盖受伤', '脚踝受伤', 'risk', 'prevent', 'prevention']},
  {id: 'warmup', view: 'learn', anchor: 'warmupCard', titleKey: 'warmupTitle', textKey: 'warmupIntro',
    words: ['热身', '拉伸', '倒计时', '计时', 'warm up', 'warm-up', 'warmup', 'stretch', 'timer', 'calentamiento', 'calentar', 'échauffement', 'разминка', 'الإحماء']},
  {id: 'training', view: 'learn', anchor: 'trainingCard', titleKey: 'trainingTitle', textKey: 'trainingIntro',
    words: ['训练量', '训练记录', '练太多', '加量', '运动量', 'training', 'load', 'workout log']},
  {id: 'gear', view: 'learn', anchor: 'gearCard', titleKey: 'gearTitle', textKey: 'gearIntro',
    words: ['装备', '鞋', '护具', '护膝', '护踝', '跑鞋', '球鞋', '膝盖保护', 'shoes', 'brace', 'gear', 'knee brace', 'ankle brace']},
  {id: 'weather', view: 'learn', anchor: 'weatherCard', titleKey: 'weatherTitle', textKey: 'weatherIntro',
    words: ['天气', '温度', '下雨', '太热', '太冷', '中暑', 'weather', 'rain', 'hot', 'cold', 'temperature']}
];

// Everyday words for each injury in triage.js.
var SEARCH_INJURY_WORDS = {
  ankle: ['崴脚', '崴了', '扭到脚', '脚扭了', '脚踝', '踝', 'ankle', 'rolled', 'twisted ankle', 'tobillo', 'cheville', 'голеностоп', 'الكاحل'],
  patella: ['膝盖错位', '膝盖脱臼', '髌骨', '膝盖', 'kneecap', 'knee', 'patella', 'rodilla', 'genou', 'колено', 'الركبة'],
  sprain: ['扭伤', '韧带', '手腕', '扭到', 'wrist', 'ligament', 'twisted'],
  strain: ['拉伤', '肌肉', '大腿后侧', '腿后面', 'hamstring', 'pulled muscle', 'muscle', 'groin'],
  dislocation: ['脱臼', '肩膀脱臼', '错位', '手指脱臼', 'dislocated', 'shoulder', 'out of place'],
  fracture: ['骨折', '断了', '骨裂', 'broken', 'fracture', 'bone', 'crack'],
  concussion: ['脑震荡', '撞到头', '头被撞', '头疼', 'head', 'concussion', 'hit my head'],
  bruise: ['淤青', '撞伤', '青了', '被撞', 'bruise', 'bruised'],
  wound: ['擦伤', '流血', '割伤', '破皮', '伤口', 'cut', 'bleeding', 'scrape', 'graze', 'wound'],
  cramp: ['抽筋', '腿抽筋', 'cramp', 'charley horse'],
  overuse: ['劳损', '慢慢疼', '胫骨', '跑步膝', '肌腱炎', '网球肘', 'shin splints', 'overuse', 'tendon', 'tennis elbow', 'runner'],
  heat: ['中暑', '太热', '头晕', '晒', 'heat', 'heatstroke', 'dizzy']
};

// One entry per thing that can be found. `texts` is T from index.html.
// Each entry: {type, key, title, text, words, ...where it leads}, where
// title and text have a string for each language.
function buildSearchEntries(texts) {
  function fromTexts(key) {
    var all = {};
    SEARCH_LANGUAGES.forEach(function (code) { all[code] = (texts[code] && texts[code][key]) || texts.en[key] || ''; });
    return all;
  }
  var entries = SEARCH_FEATURES.map(function (feature) {
    return {type: 'feature', key: 'feature-' + feature.id, title: fromTexts(feature.titleKey), text: fromTexts(feature.textKey),
      words: feature.words, view: feature.view, anchor: feature.anchor};
  });
  INJURIES.forEach(function (injury) {
    entries.push({type: 'injury', key: 'injury-' + injury.id, title: injury.name, text: injury.hint || {},
      words: SEARCH_INJURY_WORDS[injury.id] || [], injury: injury.id});
  });
  KNOWLEDGE.forEach(function (part) {
    part.topics.forEach(function (topic, index) {
      var text = {};
      SEARCH_LANGUAGES.forEach(function (code) { text[code] = topic.points.map(function (point) { return point[code] || ''; }).join(' '); });
      entries.push({type: 'topic', key: 'topic-' + part.id + index, title: topic.title, text: text, words: [], topic: part.id + index});
    });
  });
  CITY_HOSPITALS.forEach(function (city) {
    entries.push({type: 'city', key: 'city-' + city.id, title: city.name, text: {}, words: city.aliases, city: city.id});
  });
  return entries;
}

function searchNormalize(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

// How well an entry matches, 0 for not at all. The name in the page
// language counts most, then everyday words, then the name in another
// language, then the description. A whole word inside the query also counts
// ("我崴脚了" finds "崴脚"), but only Chinese words or Latin words of 4 letters
// or more, so "ai" is not found inside "pain".
function wordFitsInQuery(word, query) {
  var long = /^[\x00-\x7f]+$/.test(word) ? word.length >= 4 : word.length >= 2;
  return long && query.indexOf(word) >= 0;
}

function searchScore(entry, query, code) {
  var title = searchNormalize(entry.title[code] || entry.title.en);
  if (title.indexOf(query) === 0) return 100;
  if (title.indexOf(query) > 0) return 80;
  if (wordFitsInQuery(title, query)) return 70;
  // A word that is exactly the query beats one that only contains it, so
  // "ankle" finds the ankle sprain before "ankle brace".
  var best = 0;
  entry.words.forEach(function (word) {
    word = searchNormalize(word);
    if (word === query) best = 65;
    else if (!best && (word.indexOf(query) >= 0 || wordFitsInQuery(word, query))) best = 60;
  });
  if (best) return best;
  var otherTitle = SEARCH_LANGUAGES.some(function (other) { return searchNormalize(entry.title[other]).indexOf(query) >= 0; });
  if (otherTitle) return 50;
  var text = SEARCH_LANGUAGES.filter(function (other) { return other === code || other === 'en'; })
    .some(function (other) { return searchNormalize(entry.text[other]).indexOf(query) >= 0; });
  return text ? 30 : 0;
}

// The best matches, at most 8, best first; ties keep the order of the
// entries (features, injuries, topics, cities). A single Latin letter is
// too short to search with; a single Chinese character is a word.
function searchSite(query, code, entries) {
  query = searchNormalize(query);
  if (!query || (query.length < 2 && /^[\x00-\x7f]$/.test(query))) return [];
  return entries
    .map(function (entry, order) { return {entry: entry, score: searchScore(entry, query, code), order: order}; })
    .filter(function (match) { return match.score > 0; })
    .sort(function (a, b) { return b.score - a.score || a.order - b.order; })
    .slice(0, SEARCH_MAX_RESULTS)
    .map(function (match) { return match.entry; });
}
