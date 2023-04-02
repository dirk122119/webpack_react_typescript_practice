import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: process.env.Firebase_apiKey,
    authDomain:process.env.Firebase_authDomain,
    projectId: process.env.Firebase_projectId,
    storageBucket: process.env.Firebase_storageBucket,
    messagingSenderId: process.env.Firebase_messagingSenderId,
    appId: process.env.Firebase_appId
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db}