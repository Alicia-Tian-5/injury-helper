// Group chat in 心理安慰: one room per injury, where signed-in people talk
// under a nickname. Messages live in Firebase Firestore (firebase-chat.js);
// firestore.rules checks the same limits as this file.

var GROUP_TEXT_MAX = 500;
var NICKNAME_MAX = 20;
var GROUP_MESSAGES_SHOWN = 100;

// Spaces at the ends are dropped and runs of spaces inside become one, so a
// nickname cannot look empty or push the message aside.
function cleanNickname(name) {
  return String(name || '').trim().replace(/\s+/g, ' ');
}

// 'missing', 'tooLong' or null when the nickname can be used.
function nicknameProblem(name) {
  if (name.length === 0) return 'missing';
  if (name.length > NICKNAME_MAX) return 'tooLong';
  return null;
}

// 'missing', 'tooLong' or null when the message can be sent. Expects trimmed text.
function groupMessageProblem(text) {
  if (text.length === 0) return 'missing';
  if (text.length > GROUP_TEXT_MAX) return 'tooLong';
  return null;
}

// Oldest first, without the ones this person reported. Messages still on
// their way to the server have no time yet and go last.
function visibleMessages(messages, hiddenIds) {
  return messages.filter(function (message) { return hiddenIds.indexOf(message.id) < 0; })
    .slice().sort(function (a, b) {
      if (a.createdAt === null) return b.createdAt === null ? 0 : 1;
      if (b.createdAt === null) return -1;
      return a.createdAt - b.createdAt;
    });
}
