// Sign-in for the private sections (recovery log and comfort). Firebase
// checks the email and password (firebase-account.js); the records still stay
// only on this device. These are the rules the page follows: how long a
// sign-in lasts, which account owns this device's records, and what the
// sign-in form accepts.

var ACCOUNT_DAYS = 7;
var ACCOUNT_PASSWORD_MIN = 6;
var ACCOUNT_EMAIL_MAX = 100;
var ACCOUNT_PASSWORD_MAX = 100;
var LOCKED_VIEWS = ['log', 'comfort'];
var ACCOUNT_OWNER_KEY = 'injury-helper-owner';

// What the private sections show for this user (from Firebase, or null when
// nobody is signed in). `owner` is the account that owns this device's
// records, or null before anyone has signed in here.
//   signedOut    → the sign-in form
//   expired      → the sign-in form, after signing out a sign-in older than 7 days
//   unverified   → "check your email" until the link in it is pressed
//   otherAccount → this device's records belong to someone else
//   signedIn     → the section itself
function accountState(user, owner, now) {
  if (!user) return 'signedOut';
  if (now.getTime() - new Date(user.lastSignIn).getTime() > ACCOUNT_DAYS * 86400000) return 'expired';
  if (!user.emailVerified) return 'unverified';
  if (owner && owner.uid !== user.uid) return 'otherAccount';
  return 'signedIn';
}

function isLockedView(view) {
  return LOCKED_VIEWS.indexOf(view) >= 0;
}

// Problems with the sign-in form, as {field, problem} like logEntryProblems.
// `mode` is 'signIn', 'signUp' or 'reset' (only the email is needed).
function accountProblems(form, mode) {
  var problems = [];
  var email = form.email.trim();
  if (email === '') problems.push({field: 'email', problem: 'missing'});
  else if (email.length > ACCOUNT_EMAIL_MAX || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problems.push({field: 'email', problem: 'bad'});
  if (mode === 'reset') return problems;
  if (form.password === '') problems.push({field: 'password', problem: 'missing'});
  else if (form.password.length > ACCOUNT_PASSWORD_MAX) problems.push({field: 'password', problem: 'tooLong'});
  else if (mode === 'signUp' && form.password.length < ACCOUNT_PASSWORD_MIN) problems.push({field: 'password', problem: 'tooShort'});
  if (mode === 'signUp' && form.password !== form.confirm) problems.push({field: 'confirm', problem: 'different'});
  return problems;
}

// Firebase error codes to the page's message names. Wrong password and
// unknown email look the same on purpose, so nobody can test which emails
// have accounts.
var ACCOUNT_ERRORS = {
  'auth/invalid-credential': 'accountWrong',
  'auth/wrong-password': 'accountWrong',
  'auth/user-not-found': 'accountWrong',
  'auth/invalid-email': 'accountEmailBad',
  'auth/email-already-in-use': 'accountTaken',
  'auth/weak-password': 'accountPasswordShort',
  'auth/too-many-requests': 'accountTooMany',
  'auth/network-request-failed': 'accountOffline'
};

function accountErrorKey(code) {
  return ACCOUNT_ERRORS[code] || 'accountFailed';
}

// "alicia@gmail.com" → "a***@gmail.com", to say whose device this is
// without showing the whole address to whoever holds it.
function maskEmail(email) {
  var at = email.indexOf('@');
  if (at < 1) return '***';
  return email.charAt(0) + '***' + email.slice(at);
}

// The owner is kept next to the records (in this browser), so clearing site
// data clears both.
var accountOwner = {
  get: function () {
    try { return JSON.parse(localStorage.getItem(ACCOUNT_OWNER_KEY)); }
    catch (e) { return null; }
  },
  set: function (user) {
    try { localStorage.setItem(ACCOUNT_OWNER_KEY, JSON.stringify({uid: user.uid, email: user.email})); }
    catch (e) { /* storage blocked: the owner is asked again next time */ }
  }
};
