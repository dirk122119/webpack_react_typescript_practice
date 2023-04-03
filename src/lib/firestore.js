import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export {db}