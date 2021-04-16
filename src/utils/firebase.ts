import 'firebase/auth'
import 'firebase/firestore'

import firebase from 'firebase/app'

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
});


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseApp)
}

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
