// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAsaNbTThqKbIJpYdgRxCnGThw8PI05pyE",
  authDomain: "linkngive.firebaseapp.com",
  projectId: "linkngive",
  storageBucket: "linkngive.appspot.com", // Corrected the storage bucket domain
  messagingSenderId: "704189488176",
  appId: "1:704189488176:web:39f8b0c14cc0a79a0fe1f5",
  measurementId: "G-RH58FRYPKE" // Optional, won't be used in React Native
};

// Initialize Firebase
let app;
if (!initializeApp.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = initializeApp(firebaseConfig);
}

// Export any required services (e.g., authentication)
const auth = getAuth(app); // For Firebase Authentication

export { app, auth };
