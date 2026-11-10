// The Firebase project this site uses, shared by the shared cases and the
// sign-in. The config is not a secret: Firebase web configs are public by
// design; firestore.rules and the sign-in settings decide what visitors may do.
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';

export const app = initializeApp({
  apiKey: 'AIzaSyBlGN64tBtHhPlVzbLt2omQ-IfsI_UyiW8',
  authDomain: 'recovery-2e4be.firebaseapp.com',
  projectId: 'recovery-2e4be',
  storageBucket: 'recovery-2e4be.firebasestorage.app',
  messagingSenderId: '480404365541',
  appId: '1:480404365541:web:1669ef7e1fcef20298740c'
});
