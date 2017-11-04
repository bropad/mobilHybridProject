import * as firebase from 'firebase';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyAWAtbtxZb17sX_kr-vJ5Cfzyi_goo5kXA",
    authDomain: "mobilhybrideepitech.firebaseapp.com",
    databaseURL: "https://mobilhybrideepitech.firebaseio.com",
    projectId: "mobilhybrideepitech",
    storageBucket: "mobilhybrideepitech.appspot.com",
    messagingSenderId: "778858405315"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;