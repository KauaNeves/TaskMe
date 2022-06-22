import firebase from 'firebase/compat/app'

import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBpMgznfIfVxC-kPEl-AmjLFP2_mTlNdv0",
    authDomain: "my-app-c5a9a.firebaseapp.com",
    databaseURL: "https://my-app-c5a9a-default-rtdb.firebaseio.com",
    projectId: "my-app-c5a9a",
    storageBucket: "my-app-c5a9a.appspot.com",
    messagingSenderId: "762537741604",
    appId: "1:762537741604:web:f977d0e703872e3f82b7b1"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }