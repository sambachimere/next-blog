//* FIREBASE V8
// import firebase from "firebase/app";
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
//------------------------------------------------------
//* FIREBASE V9
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCiSoX4044qMoescYEnOegmf1ypElBhfN4",
  authDomain: "fireship-blog-5fa02.firebaseapp.com",
  projectId: "fireship-blog-5fa02",
  storageBucket: "fireship-blog-5fa02.appspot.com",
  messagingSenderId: "596177980589",
  appId: "1:596177980589:web:f22680fa612f0516f38a24",
  measurementId: "G-PSJ93S6G1X"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

/** 
 * Gets a users/{uid} document with username
 * @param {string} username 
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! Firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
