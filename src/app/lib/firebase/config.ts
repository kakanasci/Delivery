// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMPLGW1e2oWmkOFhs_N7PwX8ab42_diAk",
  authDomain: "delivery-e8a74.firebaseapp.com",
  projectId: "delivery-e8a74",
  storageBucket: "delivery-e8a74.firebasestorage.app",
  messagingSenderId: "50052912797",
  appId: "1:50052912797:web:8b9ebb7571e450977c6674",
  measurementId: "G-HPNVS64P42"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
