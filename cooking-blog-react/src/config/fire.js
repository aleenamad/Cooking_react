import firebase from 'firebase/app';
import key from './key.js';


const fire_config = {
    apiKey: key,
    authDomain: "cooking-blog-56a96.firebaseapp.com",
    databaseURL: "https://cooking-blog-56a96.firebaseio.com",
    projectId: "cooking-blog-56a96",
    storageBucket: "cooking-blog-56a96.appspot.com",
    messagingSenderId: "901701697829"
  };
firebase.initializeApp(fire_config);

export default firebase;
