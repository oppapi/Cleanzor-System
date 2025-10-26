import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,  // Added this import (was missing)
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Signup function (unchanged)
export async function signupUser(email, password) {
  const auth = getAuth(window.firebaseApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    return { Success: true, ErrorCode: null };
  } catch (error) {
    return { Success: false, ErrorCode: error.code || "unknown-error" };
  }
}

// Login function (fixed persistence import and error code)
export async function loginUser(email, password) {
  const auth = getAuth(window.firebaseApp);

  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      return { Success: false, ErrorCode: "auth/email-not-verified" };  // Fixed: Changed from "auth/invalid-email-verified" to match Firebase standard
    }

    return { Success: true, ErrorCode: null };
  } catch (error) {
    return { Success: false, ErrorCode: error.code || "unknown-error" };
  }
}

// Sign out (unchanged)
window.signOutFirebase = async function () {
    const auth = getAuth(window.firebaseApp);
    await signOut(auth);
}

// FIXED: Now waits for Firebase to load before returning email
window.getFirebaseUserEmail = () => {
    return new Promise((resolve) => {
        const auth = getAuth(window.firebaseApp);
        auth.onAuthStateChanged((user) => {
            resolve(user ? user.email : null);
        });
    });
};

// Expose functions to window (signupUser and loginUser are optional if called directly)
window.signupUser = signupUser;
window.loginUser = loginUser;