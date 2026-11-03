// Reads and posts shared cases in Firebase Firestore, then hands them to the
// page through window.caseStore. The config below is not a secret: Firebase
// web configs are public by design, and firestore.rules decides what
// visitors may do.
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore, collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBlGN64tBtHhPlVzbLt2omQ-IfsI_UyiW8',
  authDomain: 'recovery-2e4be.firebaseapp.com',
  projectId: 'recovery-2e4be',
  storageBucket: 'recovery-2e4be.firebasestorage.app',
  messagingSenderId: '480404365541',
  appId: '1:480404365541:web:1669ef7e1fcef20298740c'
};

// Only the newest cases are read; filtering by injury happens in the page.
const CASES_TO_LOAD = 100;

let database = null;
function cases() {
  if (!database) database = getFirestore(initializeApp(firebaseConfig));
  return collection(database, 'cases');
}

async function loadCases() {
  const snapshot = await getDocs(query(cases(), orderBy('createdAt', 'desc'), limit(CASES_TO_LOAD)));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {...data, id: doc.id, createdAt: data.createdAt ? data.createdAt.toDate() : null};
  });
}

async function postCase(sharedCase) {
  await addDoc(cases(), {...sharedCase, createdAt: serverTimestamp()});
}

window.caseStore = {configured: firebaseConfig !== null, loadCases, postCase};
window.onCaseStoreReady();
