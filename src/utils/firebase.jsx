import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvBrjAstdPGCjvLna04ZOqSa5cZbFVU8M",
    authDomain: "bharathgo-ee557.firebaseapp.com",
    projectId: "bharathgo-ee557",
    storageBucket: "bharathgo-ee557.firebasestorage.app",
    messagingSenderId: "789137785630",
    appId: "1:789137785630:web:58acc36b528130b0f13f0f",
    measurementId: "G-MTQ6LY27VH"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
