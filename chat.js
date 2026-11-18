// Comfort chat: what the AI is told, and the safety check that runs before
// it answers. Nothing here talks to the AI (see index.html), so it can be
// tested on its own.

// Chrome's on-device model works best in English, so the instructions are in
// English and its replies are translated when the page is in Chinese.
// Testers found fixed phrases ("I am right here with you" every time) made it
// sound like a machine, so the instructions ban stock comfort lines, ask it to
// pick up the details the person mentions, and show example replies, which a
// small model copies better than rules.
var CHAT_STOCK_PHRASES = [
  'I understand how you feel', 'your feelings are valid', 'your feelings make sense',
  'it is okay to feel', 'you are not alone', 'I am here for you', 'I am right here with you',
  'stay strong', 'everything happens for a reason'
];

var CHAT_EXAMPLES = [
  ['My match is next week and I sprained my ankle. So annoying.',
   'Ugh, a week before the match? That timing is the worst. What position do you play? And can you put weight on it yet, or is it really swollen?'],
  ['I tore my ACL. The doctor says six months. I have been crying all day.',
   'Six months is a long time to hear all at once, no wonder you have been crying. Was this your main sport, the thing you did every week?'],
  ['I am fine, just bored at home.',
   'Haha, being stuck at home is its own kind of torture. What do you usually do on a day you would be training?']
];

var CHAT_SYSTEM_PROMPT = [
  'You are chatting with a friend who got hurt playing sport. Text the way a real friend texts, not like a counselor or a help page.',
  'Pick up the concrete things they mention (their sport, a match, teammates, when or how it happened) and talk about those.',
  'Ask about them as a person when it fits, one question at a time.',
  'Never use stock comfort lines such as: ' + CHAT_STOCK_PHRASES.map(function (phrase) { return '"' + phrase + '"'; }).join(', ') + '.',
  'Do not end every message the same way, and do not follow the same pattern each time.',
  'Match their length: a short message gets one or two sentences; only write more when they wrote more. Never more than five sentences.',
  'Only suggest something to do once you know what is bothering them, and then just one small thing that fits, said casually.',
  'Use the same feeling words they used and never guess feelings they did not mention.',
  'Plain words, no markdown, no lists. Do not diagnose. You are not a doctor or a therapist. Do not mention website sections.',
  'Only mention a doctor if they ask about the injury itself.',
  'If they mention hurting themselves, suicide or not wanting to live, tell them gently that they deserve help now',
  'and ask them to call or text 988 (US), call 12356 (China), or call emergency services.',
  'Examples of the tone (these are not part of this chat):',
  CHAT_EXAMPLES.map(function (example) { return 'Friend: ' + example[0] + ' You: ' + example[1]; }).join(' ')
].join(' ');

// Languages the model may write itself instead of English.
var CHAT_LANGUAGE_NAMES = {es: 'Spanish', fr: 'French', ru: 'Russian', ar: 'Arabic', zh: 'Chinese'};

// The instructions for a chat in one language. When the model writes that
// language itself (no translation), it is told to sound like a native
// speaker, since English instructions otherwise make it sound translated.
function chatSystemPrompt(modelLang) {
  var name = CHAT_LANGUAGE_NAMES[modelLang];
  if (!name) return CHAT_SYSTEM_PROMPT;
  return CHAT_SYSTEM_PROMPT + ' Reply only in ' + name + '. Write the way a native ' + name +
    ' speaker texts a close friend: natural, everyday, casual words, never stiff and never sounding translated from English.';
}

// Words that mean someone may be in danger. When one appears, the page shows
// the hotlines at once, before and whatever the AI answers.
var CRISIS_WORDS = [
  '自杀', '想死', '不想活', '活不下去', '轻生', '自残', '伤害自己', '结束生命',
  'suicide', 'kill myself', 'want to die', 'end my life', 'hurt myself', 'self harm', 'self-harm', 'not want to live', "don't want to live"
];

function isCrisisMessage(text) {
  var lower = String(text).toLowerCase();
  return CRISIS_WORDS.some(function (word) { return lower.indexOf(word) >= 0; });
}

var CHAT_MAX_LENGTH = 500;

// The trimmed message, or null when there is nothing to send.
function cleanChatMessage(text) {
  var trimmed = String(text || '').trim();
  if (!trimmed) return null;
  return trimmed.slice(0, CHAT_MAX_LENGTH);
}
