// Weather reminder: today's weather for a city or the visitor's location,
// from Open-Meteo (free, no key), and what it means for playing sport. The
// location is only used for the request and is rounded to about 1 km; it is
// never saved. Uses riskText from risk-check.js.

var WEATHER_HOT_FEELS = 32;
var WEATHER_COLD_FEELS = 5;
var WEATHER_RAIN_CHANCE = 50;
var WEATHER_WINDY_KMH = 40;
var WEATHER_HIGH_UV = 6;

var WEATHER_TIPS = {
  hot: [
    riskText('Avoid training between about 11 am and 4 pm; go early in the morning or in the evening.', 'Evita entrenar entre las 11 y las 16 más o menos; ve temprano por la mañana o por la tarde-noche.', 'Évite de t’entraîner entre 11 h et 16 h environ ; va tôt le matin ou le soir.', 'Не тренируйся примерно с 11 до 16 часов; выбирай раннее утро или вечер.', 'تجنب التدريب بين الساعة 11 صباحًا و4 عصرًا تقريبًا؛ تدرّب في الصباح الباكر أو المساء.', '避开中午 11 点到下午 4 点，改到早上或傍晚练。'),
    riskText('Drink before you feel thirsty, and take breaks in the shade.', 'Bebe antes de tener sed y descansa a la sombra.', 'Bois avant d’avoir soif et fais des pauses à l’ombre.', 'Пей до того, как захочется, и отдыхай в тени.', 'اشرب قبل أن تشعر بالعطش، وخذ استراحات في الظل.', '不渴也要喝水，休息时找阴凉的地方。'),
    riskText('Dizziness, a headache, feeling sick or no longer sweating are signs of heat illness: stop, cool down in the shade and drink. Call emergency services if it does not get better quickly.', 'Mareo, dolor de cabeza, náuseas o dejar de sudar son señales de golpe de calor: para, refréscate a la sombra y bebe. Llama a emergencias si no mejora pronto.', 'Vertiges, mal de tête, nausées ou plus de transpiration sont des signes de coup de chaleur : arrête, rafraîchis-toi à l’ombre et bois. Appelle les secours si ça ne passe pas vite.', 'Головокружение, головная боль, тошнота или прекращение потоотделения — признаки теплового удара: остановись, охладись в тени и пей. Если быстро не проходит, вызывай скорую.', 'الدوار أو الصداع أو الغثيان أو توقف التعرق علامات ضربة حرارة: توقف وتبرد في الظل واشرب. اتصل بالطوارئ إذا لم تتحسن بسرعة.', '头晕、头痛、恶心或者不再出汗，是中暑的信号：马上停下，到阴凉处降温、喝水。很快没好转就打急救电话。')
  ],
  cold: [
    riskText('Warm up for longer, about 15 minutes; cold muscles and tendons tear more easily.', 'Calienta más tiempo, unos 15 minutos; los músculos y tendones fríos se rompen con más facilidad.', 'Échauffe-toi plus longtemps, environ 15 minutes ; les muscles et tendons froids se déchirent plus facilement.', 'Разминайся дольше, около 15 минут: холодные мышцы и сухожилия легче рвутся.', 'أطل الإحماء إلى نحو 15 دقيقة؛ فالعضلات والأوتار الباردة تتمزق بسهولة أكبر.', '热身时间加长到 15 分钟左右，肌肉和肌腱冷的时候更容易拉伤。'),
    riskText('Wear layers you can take off, and keep your hands, ears and knees warm.', 'Ponte varias capas que puedas quitarte, y abriga manos, orejas y rodillas.', 'Porte plusieurs couches que tu peux enlever, et garde mains, oreilles et genoux au chaud.', 'Одевайся слоями, которые можно снять, и держи в тепле руки, уши и колени.', 'البس طبقات يمكنك خلعها، وأبقِ يديك وأذنيك وركبتيك دافئة.', '穿几层可以脱的衣服，手、耳朵和膝盖要保暖。'),
    riskText('Change out of sweaty clothes straight after training.', 'Cámbiate la ropa sudada justo después de entrenar.', 'Change tes vêtements mouillés de sueur juste après l’entraînement.', 'Сразу после тренировки переоденься из мокрой одежды.', 'غيّر ملابسك المبللة بالعرق مباشرة بعد التدريب.', '练完马上换掉汗湿的衣服。')
  ],
  rain: [
    riskText('Wet ground and courts are slippery, and slipping is a common way to sprain an ankle or hurt a knee. Train indoors if you can.', 'El suelo y las pistas mojadas resbalan, y resbalar es una forma común de torcerse el tobillo o lesionarse la rodilla. Entrena bajo techo si puedes.', 'Le sol et les terrains mouillés glissent, et glisser est une façon courante de se tordre la cheville ou de se blesser au genou. Entraîne-toi en salle si tu peux.', 'Мокрые площадки скользкие, а подскальзывание — частая причина растяжения голеностопа и травм колена. По возможности тренируйся в зале.', 'الأرض والملاعب المبللة زلقة، والانزلاق طريقة شائعة لالتواء الكاحل أو إصابة الركبة. تدرّب في الداخل إن أمكن.', '地面和球场湿了会滑，滑倒是崴脚、伤膝盖的常见原因。能去室内就去室内练。'),
    riskText('Outdoors, slow down on turns and wear shoes with a good grip.', 'Al aire libre, frena en los giros y usa calzado que agarre bien.', 'Dehors, ralentis dans les virages et porte des chaussures qui accrochent bien.', 'На улице снижай скорость на поворотах и надевай обувь с хорошим сцеплением.', 'في الخارج، خفف السرعة عند الالتفاف والبس حذاء جيد التماسك.', '在室外的话，转身变向放慢一点，穿防滑好的鞋。')
  ],
  wind: [
    riskText('Strong wind today: watch out for falling branches, and ball and racket sports outdoors will be harder to control.', 'Hoy hay viento fuerte: cuidado con las ramas que caen; los deportes de pelota y raqueta al aire libre serán más difíciles de controlar.', 'Vent fort aujourd’hui : attention aux branches qui tombent, et les sports de balle ou de raquette dehors seront plus durs à contrôler.', 'Сегодня сильный ветер: берегись падающих веток, а игры с мячом и ракеткой на улице будет труднее контролировать.', 'رياح قوية اليوم: احذر الأغصان المتساقطة، وسيصعب التحكم في رياضات الكرة والمضرب في الخارج.', '今天风大：小心树枝掉落，室外球类和球拍运动也更难控制。')
  ],
  uv: [
    riskText('Strong sun: use sunscreen, wear a cap and sunglasses, and look for shade around midday.', 'Sol fuerte: usa protector solar, gorra y gafas de sol, y busca sombra hacia el mediodía.', 'Soleil fort : mets de la crème solaire, une casquette et des lunettes de soleil, et cherche l’ombre vers midi.', 'Сильное солнце: используй солнцезащитный крем, кепку и очки, около полудня держись в тени.', 'شمس قوية: استخدم واقي الشمس والبس قبعة ونظارة شمسية، وابحث عن الظل وقت الظهيرة.', '紫外线强：涂防晒，戴帽子和墨镜，中午前后找阴凉。')
  ]
};

function roundCoordinate(value) {
  return Math.round(value * 100) / 100;
}

function weatherSearchUrl(city, language) {
  return 'https://geocoding-api.open-meteo.com/v1/search?count=1&format=json&language=' + encodeURIComponent(language) + '&name=' + encodeURIComponent(city);
}

// Open-Meteo only finds a city name written in the search language, so
// "上海" is not found in English. Try the page language first, then the
// language the name is written in, then English.
function weatherSearchLanguages(city, pageLanguage) {
  var written = /[\u4e00-\u9fff]/.test(city) ? 'zh' : /[\u0400-\u04ff]/.test(city) ? 'ru' : /[\u0600-\u06ff]/.test(city) ? 'ar' : 'en';
  return [pageLanguage, written, 'en'].filter(function (code, i, all) { return all.indexOf(code) === i; });
}

function weatherForecastUrl(latitude, longitude) {
  return 'https://api.open-meteo.com/v1/forecast?latitude=' + roundCoordinate(latitude) + '&longitude=' + roundCoordinate(longitude) +
    '&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=auto&forecast_days=1';
}

// The first place a city search found, as {name, latitude, longitude}, or
// null when nothing was found. The region and country are added to the name
// when they say something more ("Springfield, Illinois, United States", but
// "上海, 中国" rather than "上海, 上海市, 中国").
function weatherPlaceFromSearch(json) {
  var place = json && json.results && json.results[0];
  if (!place || typeof place.latitude !== 'number' || typeof place.longitude !== 'number') return null;
  var parts = [place.name];
  [place.admin1, place.country].forEach(function (part) {
    var repeats = parts.some(function (shown) { return part && (part.indexOf(shown) === 0 || shown.indexOf(part) === 0); });
    if (part && !repeats) parts.push(part);
  });
  return {name: parts.join(', '), latitude: place.latitude, longitude: place.longitude};
}

// Today's numbers from a forecast, or null if any are missing. Rain chance
// can be missing in some places, so it counts as 0.
function weatherDayFromForecast(json) {
  var daily = json && json.daily;
  if (!daily) return null;
  function first(key) { return daily[key] && typeof daily[key][0] === 'number' ? daily[key][0] : null; }
  var day = {
    max: first('temperature_2m_max'),
    min: first('temperature_2m_min'),
    feelsMax: first('apparent_temperature_max'),
    feelsMin: first('apparent_temperature_min'),
    rainChance: first('precipitation_probability_max') || 0,
    wind: first('wind_speed_10m_max'),
    uv: first('uv_index_max')
  };
  if ([day.max, day.min, day.feelsMax, day.feelsMin, day.wind, day.uv].indexOf(null) >= 0) return null;
  return day;
}

// Which reminders apply today, in order: hot, cold, rain, wind, uv. An empty
// list means a good day for sport.
function weatherWarnings(day) {
  var warnings = [];
  if (day.feelsMax >= WEATHER_HOT_FEELS) warnings.push('hot');
  if (day.feelsMin <= WEATHER_COLD_FEELS) warnings.push('cold');
  if (day.rainChance >= WEATHER_RAIN_CHANCE) warnings.push('rain');
  if (day.wind >= WEATHER_WINDY_KMH) warnings.push('wind');
  if (day.uv >= WEATHER_HIGH_UV) warnings.push('uv');
  return warnings;
}
