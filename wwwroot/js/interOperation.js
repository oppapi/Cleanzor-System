import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

export async function signupUser(email, password) {
    const auth = getAuth();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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