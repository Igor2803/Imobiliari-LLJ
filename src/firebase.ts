// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAY4LKfVagysxs2PIrr2c3tvsRmTGA-fcE",
    authDomain: "sistema-fc10d.firebaseapp.com",
    projectId: "sistema-fc10d",
    storageBucket: "sistema-fc10d.appspot.com",
    messagingSenderId: "415389433843",
    appId: "1:415389433843:web:95be77776000aa99f41c86",
    measurementId: "G-D8Y15NKSWN"
  };
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
