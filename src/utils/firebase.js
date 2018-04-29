import firebase from 'firebase';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyBbn9KeCZQQDwr7oR8Rsbw5Ou-hIi2Qo7M",
    authDomain: "blog-ed0c3.firebaseapp.com",
    databaseURL: "https://blog-ed0c3.firebaseio.com",
    projectId: "blog-ed0c3",
    storageBucket: "",
    messagingSenderId: "111250641955"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
export {firebase, db};