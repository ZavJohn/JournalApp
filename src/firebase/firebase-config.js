import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUSlT6KmTYZsampgPBmiCT-DZNhWlYaj8",
  authDomain: "react-app-cursos-b2e2f.firebaseapp.com",
  projectId: "react-app-cursos-b2e2f",
  storageBucket: "react-app-cursos-b2e2f.appspot.com",
  messagingSenderId: "491318129828",
  appId: "1:491318129828:web:fae547c2ac24dfdcaa6231"
};
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}