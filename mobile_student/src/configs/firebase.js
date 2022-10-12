import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyADhDlGnp1FboIG7-eHjWiE0EKiZ0RhD1c",
  authDomain: "hacktiphasedua.firebaseapp.com",
  projectId: "hacktiphasedua",
  storageBucket: "hacktiphasedua.appspot.com",
  messagingSenderId: "494795330968",
  appId: "1:494795330968:web:c658830c1eec8fc98c47ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
