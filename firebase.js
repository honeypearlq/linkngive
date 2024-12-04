import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  Timestamp,
  doc,
  updateDoc,
  getDoc,
  collection,
  addDoc,
  deleteDoc,  // Ensure deleteDoc is exported here
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

// Export services and utility functions
export { db, auth, Timestamp, doc, updateDoc, getDoc, collection, addDoc, deleteDoc };