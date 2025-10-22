// wwwroot/js/interOperation.js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

let signupStatus = "";

export async function signupUser(email, password) {
  const auth = getAuth();

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    signupStatus = "Signup successful!";
  } catch (err) {
    signupStatus = "Signup failed: " + err.code;
  }

  return signupStatus;
}
