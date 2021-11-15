import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore} from 'firebase/firestore';

export const app = firebase.initializeApp({
    apiKey: "AIzaSyBr3F-2Z353euT07fBR5YFfpkwsyfACJY8",
    authDomain: "react-test-29a73.firebaseapp.com",
    projectId: "react-test-29a73",
    storageBucket: "react-test-29a73.appspot.com",
    messagingSenderId: "1081410680428",
    appId: "1:1081410680428:web:056ab8fa444762d7634a49",
    measurementId: "G-P305TVJEB7"
})

export const db = getFirestore(app)