// Reads and posts shared cases in Firebase Firestore, then hands them to the
// page through window.caseStore. firestore.rules decides what visitors may do.
import {
  getFirestore, collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {app} from './firebase-app.js';

// Only the newest cases are read; filtering by injury happens in the page.
const CASES_TO_LOAD = 100;

let database = null;
function cases() {
  if (!database) database = getFirestore(app);
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

window.caseStore = {configured: true, loadCases, postCase};
window.onCaseStoreReady();
