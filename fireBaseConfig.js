// firebase.js

import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBPOlYgc-GIpUIjAqBRbSSX7iFkwTevRY",
  authDomain: "chat-d9670.firebaseapp.com",
  projectId: "chat-d9670",
  storageBucket: "chat-d9670.appspot.com",
  messagingSenderId: "591063611333",
  appId: "1:591063611333:web:4dc89f94e518e24ac0fdac"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersref = collection(db, 'users');
export const roomref = collection(db, 'rooms');
