// Group chat rooms in Firebase Firestore, handed to the page through
// window.groupChatStore. Only signed-in people with a verified email can read
// or post (firestore.rules); Firestore sends the sign-in from firebase-account.js.
import {
  getFirestore, collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {app} from './firebase-app.js';

const database = getFirestore(app);

function messages(room) {
  return collection(database, 'rooms', room, 'messages');
}

// Calls onMessages with the newest messages whenever the room changes, until
// the returned function is called.
function listen(room, count, onMessages, onError) {
  const newest = query(messages(room), orderBy('createdAt', 'desc'), limit(count));
  return onSnapshot(newest, (snapshot) => {
    onMessages(snapshot.docs.map((doc) => {
      const data = doc.data({serverTimestamps: 'none'});
      return {
        id: doc.id,
        uid: data.uid,
        nickname: data.nickname,
        text: data.text,
        createdAt: data.createdAt ? data.createdAt.toMillis() : null
      };
    }));
  }, onError);
}

async function send(room, message) {
  await addDoc(messages(room), {...message, createdAt: serverTimestamp()});
}

// Reports go where only the site owner can read them, in the Firebase console.
async function report(room, messageId, reporter) {
  await addDoc(collection(database, 'reports'), {room, messageId, reporter, createdAt: serverTimestamp()});
}

window.groupChatStore = {listen, send, report};
window.onGroupChatReady();
