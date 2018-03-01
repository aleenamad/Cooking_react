// import firebase from 'firebase';
import * as firebase from 'firebase';
import key from './key.js';



const config = {
    apiKey: key,
    authDomain: "cooking-blog-56a96.firebaseapp.com",
    databaseURL: "https://cooking-blog-56a96.firebaseio.com",
    projectId: "cooking-blog-56a96",
    storageBucket: "cooking-blog-56a96.appspot.com",
    messagingSenderId: "901701697829"
  };
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
export const provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/plus.login');

export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;
