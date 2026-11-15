// Friends and private chats in 心理安慰: a request sent from a group chat
// message, accepted by the other person, then a chat only the two can read.
// Stored in Firebase Firestore (firebase-chat.js); firestore.rules checks
// who may do what. Needs group-chat.js.

// The id of two people's friendship: both account ids, smaller first, so
// either side finds the same one.
function friendshipId(uidA, uidB) {
  return uidA < uidB ? uidA + '_' + uidB : uidB + '_' + uidA;
}

function friendRequestId(fromUid, toUid) {
  return fromUid + '_' + toUid;
}

// The other person in a friendship.
function friendOf(friendship, myUid) {
  return friendship.members[0] === myUid ? friendship.members[1] : friendship.members[0];
}

// What the button under someone's group chat message offers: 'self' for
// your own message, 'friend' when already friends, 'sent' after you asked,
// 'incoming' when they asked you, otherwise 'add'.
function friendButtonState(uid, myUid, friendships, outgoing, incoming) {
  if (uid === myUid) return 'self';
  if (friendships.some(function (friendship) { return friendOf(friendship, myUid) === uid; })) return 'friend';
  if (outgoing.some(function (request) { return request.to === uid; })) return 'sent';
  if (incoming.some(function (request) { return request.from === uid; })) return 'incoming';
  return 'add';
}

// Whether the friend wrote something since this person last opened the
// chat. `lastRead` maps friendship ids to the time of the newest message seen.
function hasUnread(friendship, myUid, lastRead) {
  return Boolean(friendship.lastSender) && friendship.lastSender !== myUid &&
    friendship.lastMessageAt !== null && friendship.lastMessageAt > (lastRead[friendship.id] || 0);
}
