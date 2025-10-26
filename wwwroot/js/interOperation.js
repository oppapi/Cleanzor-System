import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


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

export async function loginUser(email, password) {
  const auth = getAuth(window.firebaseApp);

  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      return { Success: false, ErrorCode: "auth/invalid-email-verified" };
    }

    return { Success: true, ErrorCode: null };
  } catch (error) {
    return { Success: false, ErrorCode: error.code || "unknown-error" };
  }
}

window.signOutFirebase = async function () {
    const auth = getAuth(window.firebaseApp);
    await signOut(auth);
}

window.getFirebaseUserEmail = () => {
    return new Promise((resolve) => {
        const auth = getAuth(window.firebaseApp);
        auth.onAuthStateChanged((user) => {
            resolve(user ? user.email : null);
        });
    });
};

window.signupUser = signupUser;
window.loginUser = loginUser;