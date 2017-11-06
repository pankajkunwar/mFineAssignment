//Firebase Singleton, it will be imported everywhere
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBwkgNjxyeM3KeXUC8lQ5koWsBfGnH8CN0",
  authDomain: "mfineassignment.firebaseapp.com",
  databaseURL: "https://mfineassignment.firebaseio.com",
  storageBucket: "mfineassignment.appspot.com",
  messagingSenderId: "983596839758"
};
firebase.initializeApp(config);

export default firebase;
