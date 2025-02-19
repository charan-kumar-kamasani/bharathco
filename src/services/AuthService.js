import { auth } from "./firebase";
import { sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";

export const sendLoginLink = async (email) => {
  try {
    const actionCodeSettings = {
      url: "http://localhost:5173/",
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    alert("Login link sent to your email. Check your inbox.");
  } catch (error) {
    console.error("Error sending login link:", error.message);
  }
};

export const completeSignIn = async () => {
  try {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please enter your email for confirmation:");
      }

      const result = await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem("emailForSignIn");
      return result.user;
    }
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};
