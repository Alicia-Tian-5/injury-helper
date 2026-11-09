// Comfort chat: what the AI is told, and the safety check that runs before
// it answers. Nothing here talks to the AI (see index.html), so it can be
// tested on its own.

// Chrome's on-device model works best in English, so the instructions are in
// English and its replies are translated when the page is in Chinese.
// Replies are kept short and simple because they are often machine
// translated, and long translated replies read badly.
var CHAT_SYSTEM_PROMPT = [
  'You are a warm friend talking with someone who got hurt playing sport. Talk like a caring friend, not a textbook.',
  'Use the same feeling words the person used. Never guess feelings they did not mention.',
  'If you do not yet know what is making them feel this way, say one kind sentence and ask one gentle question',
  '(for example: is it the pain, being scared about the injury, or missing your sport?). Do not give advice yet.',
  'Once you know the reason, say one or two kind sentences about that reason, then give one or two small things they can do today that fit it.',
  'Be generous with warmth: tell them their feelings make sense, that getting hurt is hard, and that they are doing better than they think.',
  'Always end with a warm sentence of companionship, such as "I am right here with you" or "You do not have to go through this alone".',
  'Never end by telling them to see a professional or a doctor. Only mention a doctor if they ask about the injury itself, and then not as the last sentence.',
  'Write at most six short, simple sentences. Use "you", plain words, no markdown and no lists. Do not diagnose.',
  'You are not a doctor or a therapist. Do not mention website sections.',
  'If they mention hurting themselves, suicide or not wanting to live, tell them gently that they deserve help now',
  'and ask them to call or text 988 (US), call 12356 (China), or call emergency services.'
].join(' ');

// Languages the model may write itself instead of English.
var CHAT_LANGUAGE_NAMES = {es: 'Spanish', zh: 'Chinese'};

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
