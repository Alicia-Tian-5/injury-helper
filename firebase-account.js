// Email and password sign-in with Firebase Authentication, handed to the
// page through window.accountStore. Firebase keeps the sign-in in this
// browser; the page decides when it is too old (account.js).
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendEmailVerification, sendPasswordResetEmail, signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {app} from './firebase-app.js';

const auth = getAuth(app);

// Only what the page needs to know about the user.
function userInfo(user) {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    lastSignIn: user.metadata.lastSignInTime
  };
}

async function signUp(email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(credential.user);
}

async function signIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function resendVerification() {
  await sendEmailVerification(auth.currentUser);
}

// Asks Firebase again, for after the person pressed the link in the email.
async function refresh() {
  if (auth.currentUser) await auth.currentUser.reload();
  return userInfo(auth.currentUser);
}

// Emails from Firebase follow the page's language.
function setLanguage(code) {
  auth.languageCode = code;
}

window.accountStore = {
  signUp,
  signIn,
  resendVerification,
  refresh,
  setLanguage,
  signOut: () => signOut(auth),
  resetPassword: (email) => sendPasswordResetEmail(auth, email)
};
onAuthStateChanged(auth, (user) => window.onAccountChange(userInfo(user)));
