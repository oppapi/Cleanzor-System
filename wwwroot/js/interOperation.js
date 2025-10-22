import { getAuth, sendSignInLinkToEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const actionCodeSettings = {
  url: 'http://localhost:5209',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  }
};

export async function signupUser(email, password) {
    const auth = getAuth();

    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);

        window.localStorage.setItem('emailForSignIn', email);

        return {
            Success: true,
            Message: "Verification link sent to your email. Please check your inbox to complete registration.",
            Uid: null,
            ErrorCode: null,
            ErrorMessage: null
        };

    } catch (error) {
        return {
            Success: false,
            Message: null,
            Uid: null,
            ErrorCode: error.code,
            ErrorMessage: error.message
        };
    }
}

export async function loginUser(email, password) {
    const auth = getAuth();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return {
            Success: true, Uid: user.uid, ErrorCode: null, ErrorMessage: null
        };
    } catch (error) {
        return {
            Success: false, Uid: null, ErrorCode: error.code, ErrorMessage: error.message
        };
    }
}

window.signupUser = signupUser;