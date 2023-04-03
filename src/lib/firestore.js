import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: process.env.Firebase_apiKey,
    authDomain:process.env.Firebase_authDomain,
    projectId: process.env.Firebase_projectId,
    storageBucket: process.env.Firebase_storageBucket,
    messagingSenderId: process.env.Firebase_messagingSenderId,
    appId: process.env.Firebase_appId,
    measurementId:process.env.Firebase_measurementId
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {db}