// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBDClcnGjO-6cyDxMDSgVPaYHAs-psCGDY',
  authDomain: 'to-do-4e671.firebaseapp.com',
  projectId: 'to-do-4e671',
  storageBucket: 'to-do-4e671.appspot.com',
  messagingSenderId: '186480657388',
  appId: '1:186480657388:web:c8fb8c861e8e7b5e11b6c9',
  measurementId: 'G-ZY1CPX83FP',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const analytics = getAnalytics(app);
