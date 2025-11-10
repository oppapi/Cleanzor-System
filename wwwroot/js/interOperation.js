import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, setPersistence, browserLocalPersistence, browserSessionPersistence, signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { 
  getFirestore, doc, setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { 
  getDatabase, ref, onValue
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

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

export async function loginUser(email, password, rememberMe = true) {
  const auth = getAuth(window.firebaseApp);
  try {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      await signOut(auth);  
      return { Success: false, ErrorCode: "auth/email-not-verified" };
    }
    return { Success: true, ErrorCode: null };
  } catch (error) {
    return { Success: false, ErrorCode: error.code || "unknown-error" };
  }
}

export async function rememberLoginUser(email, password) {
  const auth = getAuth(window.firebaseApp);
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      await signOut(auth);
      return { Success: false, ErrorCode: "auth/email-not-verified" };
    }
    return { Success: true, ErrorCode: null };
  } catch (error) {
    return { Success: false, ErrorCode: error.code || "unknown-error" };
  }
}

export async function forgotPassword(email) {
  const auth = getAuth(window.firebaseApp);
  try {
    await sendPasswordResetEmail(auth, email);
    return { Success: true, ErrorCode: null };
  } catch (error) {
    return { Success: false, ErrorCode: error.code || "unknown-error" };
  }
}

window.signOutFirebase = async function () {
  const auth = getAuth(window.firebaseApp);
  await signOut(auth);
};

window.getFirebaseUserEmail = () => {
  return new Promise((resolve) => {
    const auth = getAuth(window.firebaseApp);
    auth.onAuthStateChanged((user) => {
      resolve(user ? user.email : null);
    });
  });
};

export async function registerUser(fullname, email, username, password) {
  const auth = getAuth(window.firebaseApp);
  const db = getFirestore(window.firebaseApp);
  const user = auth.currentUser;
  if (!user) {
    return { Success: false, ErrorCode: "auth/no-current-user" };
  }
  try {
    await setDoc(
      doc(db, "CleanzorUsers", user.uid),
      {
        fullname,
        email,
        username,
        updatedAt: new Date()
      },
      { merge: true }
    );
    return { Success: true, ErrorCode: null };
  } catch (error) {
    return { Success: false, ErrorCode: error.code || "unknown-error" };
  }
}

window.storeSignupData = (fullname, email, username) => {
  localStorage.setItem("signupData", JSON.stringify({ fullname, email, username }));
};

window.getSignupData = () => {
  const data = localStorage.getItem("signupData");
  return data ? JSON.parse(data) : null;
};

window.clearStorageData = () => {
  localStorage.removeItem("signupData");
  localStorage.removeItem("robotData");
  sessionStorage.clear();
};

window.listenToSensorData = function () {
  const db = getDatabase(window.firebaseApp);
  const sensorRef = ref(db, "robotData");

  onValue(sensorRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      console.log("🔥 Firebase Update:", data);
      window.RobotSensorData = data;
      localStorage.setItem("robotData", JSON.stringify(data));
    } else {
      console.log("⚠️ No data found at RobotSensors/status");
    }
  });
};

window.storeAccountData = (email, password) => {
    localStorage.setItem("accountData", JSON.stringify({ email, password }));
};

window.getAccountData = () => {
    const data = localStorage.getItem("accountData");
    return data ? JSON.parse(data) : null;
};

window.clearAccountData = () => {
    localStorage.removeItem("accountData");
};


window.signupUser = signupUser;
window.loginUser = loginUser;
window.registerUser = registerUser;
window.rememberLoginUser = rememberLoginUser;
window.forgotPassword = forgotPassword;
window.listenToSensorData = listenToSensorData;
window.fetchSensorDataOnce = fetchSensorDataOnce;