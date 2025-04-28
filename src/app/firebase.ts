// /firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // ⬅️ IMPORTANTE: Firestore, no Database

const firebaseConfig = {
  apiKey: "AIzaSyAa28pUKYW9ddSdNfEKCSMHlKR6VIssfsk",
  authDomain: "cita-cleirys-y-sara.firebaseapp.com",
  projectId: "cita-cleirys-y-sara",
  storageBucket: "cita-cleirys-y-sara.appspot.com",
  messagingSenderId: "317574581352",
  appId: "1:317574581352:web:aaaa6927adf1902cf2ffdd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ⬅️ CAMBIAR A Firestore
