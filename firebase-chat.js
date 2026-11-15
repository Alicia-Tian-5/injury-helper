// Group chat rooms, nicknames, friends, private chats and blocking in Firebase
// Firestore, handed to the page through window.groupChatStore. Only signed-in
// people with a verified email can read or post (firestore.rules); Firestore
// sends the sign-in from firebase-account.js.
import {
  getFirestore, collection, doc, query, where, orderBy, limit, onSnapshot, addDoc, getDoc, setDoc,
  deleteDoc, writeBatch, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {app} from './firebase-app.js';

const database = getFirestore(app);

function messages(room) {
  return collection(database, 'rooms', room, 'messages');
}

function privateMessages(friendshipId) {
  return collection(database, 'friendships', friendshipId, 'messages');
}

function millis(timestamp) {
  return timestamp ? timestamp.toMillis() : null;
}

// Calls onMessages with the newest messages of a room or a private chat
// whenever they change, until the returned function is called.
function listenNewest(collectionRef, count, onMessages, onError) {
  const newest = query(collectionRef, orderBy('createdAt', 'desc'), limit(count));
  return onSnapshot(newest, (snapshot) => {
    onMessages(snapshot.docs.map((snap) => {
      const data = snap.data({serverTimestamps: 'none'});
      return {id: snap.id, uid: data.uid, nickname: data.nickname, text: data.text, createdAt: millis(data.createdAt)};
    }));
  }, onError);
}

function listen(room, count, onMessages, onError) {
  return listenNewest(messages(room), count, onMessages, onError);
}

async function send(room, message) {
  await addDoc(messages(room), {...message, createdAt: serverTimestamp()});
}

// ---- Nicknames, so friends can be shown by name on any device ----

async function saveNickname(uid, nickname) {
  await setDoc(doc(database, 'profiles', uid), {nickname});
}

async function loadNickname(uid) {
  const snap = await getDoc(doc(database, 'profiles', uid));
  return snap.exists() ? snap.data().nickname : null;
}

// ---- Friend requests and friendships ----

function request(fromUid, toUid) {
  return doc(database, 'friendRequests', fromUid + '_' + toUid);
}

function friendship(friendshipId) {
  return doc(database, 'friendships', friendshipId);
}

// Calls onChange with {incoming, outgoing} requests whenever either changes.
function listenRequests(uid, onChange, onError) {
  const lists = {incoming: [], outgoing: []};
  const loaded = {incoming: false, outgoing: false};
  const stops = ['incoming', 'outgoing'].map((side) => {
    const field = side === 'incoming' ? 'to' : 'from';
    return onSnapshot(query(collection(database, 'friendRequests'), where(field, '==', uid)), (snapshot) => {
      lists[side] = snapshot.docs.map((snap) => ({from: snap.data().from, to: snap.data().to}));
      loaded[side] = true;
      if (loaded.incoming && loaded.outgoing) onChange({incoming: lists.incoming, outgoing: lists.outgoing});
    }, onError);
  });
  return () => stops.forEach((stop) => stop());
}

async function sendRequest(fromUid, toUid) {
  await setDoc(request(fromUid, toUid), {from: fromUid, to: toUid, createdAt: serverTimestamp()});
}

async function declineRequest(fromUid, toUid) {
  await deleteDoc(request(fromUid, toUid));
}

// Becomes friends and removes the request, and this person's own request to
// the same friend if both asked, all at once.
async function acceptRequest(fromUid, myUid, friendshipId, alsoAsked) {
  const batch = writeBatch(database);
  batch.set(friendship(friendshipId), {members: friendshipId.split('_'), createdAt: serverTimestamp()});
  batch.delete(request(fromUid, myUid));
  if (alsoAsked) batch.delete(request(myUid, fromUid));
  await batch.commit();
}

function listenFriendships(uid, onChange, onError) {
  const mine = query(collection(database, 'friendships'), where('members', 'array-contains', uid));
  return onSnapshot(mine, (snapshot) => {
    onChange(snapshot.docs.map((snap) => {
      const data = snap.data({serverTimestamps: 'none'});
      return {id: snap.id, members: data.members, lastSender: data.lastSender || null, lastMessageAt: millis(data.lastMessageAt)};
    }));
  }, onError);
}

async function removeFriend(friendshipId) {
  await deleteDoc(friendship(friendshipId));
}

// ---- Blocking ----

function block(blockerUid, blockedUid) {
  return doc(database, 'blocks', blockerUid + '_' + blockedUid);
}

function listenBlocks(uid, onChange, onError) {
  return onSnapshot(query(collection(database, 'blocks'), where('blocker', '==', uid)), (snapshot) => {
    onChange(snapshot.docs.map((snap) => snap.data().blocked));
  }, onError);
}

// Blocks someone and, all at once, ends the friendship and removes the
// requests between the two. `existing` says which of those exist, since
// removing one that does not exist is refused.
async function blockUser(myUid, otherUid, existing) {
  const batch = writeBatch(database);
  batch.set(block(myUid, otherUid), {blocker: myUid, blocked: otherUid, createdAt: serverTimestamp()});
  if (existing.friendshipId) batch.delete(friendship(existing.friendshipId));
  if (existing.incoming) batch.delete(request(otherUid, myUid));
  if (existing.outgoing) batch.delete(request(myUid, otherUid));
  await batch.commit();
}

async function unblockUser(myUid, otherUid) {
  await deleteDoc(block(myUid, otherUid));
}

function listenPrivate(friendshipId, count, onMessages, onError) {
  return listenNewest(privateMessages(friendshipId), count, onMessages, onError);
}

// The message, plus who wrote last and when, for the friend's unread dot.
async function sendPrivate(friendshipId, uid, text) {
  const batch = writeBatch(database);
  batch.set(doc(privateMessages(friendshipId)), {uid, text, createdAt: serverTimestamp()});
  batch.update(friendship(friendshipId), {lastSender: uid, lastMessageAt: serverTimestamp()});
  await batch.commit();
}

// Reports go where only the site owner can read them, in the Firebase console.
async function report(room, messageId, reporter) {
  await addDoc(collection(database, 'reports'), {room, messageId, reporter, createdAt: serverTimestamp()});
}

window.groupChatStore = {
  listen, send, report, saveNickname, loadNickname, listenRequests, sendRequest, declineRequest, acceptRequest,
  listenFriendships, removeFriend, listenPrivate, sendPrivate, listenBlocks, blockUser, unblockUser
};
window.onGroupChatReady();
