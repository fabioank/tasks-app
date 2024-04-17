import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCR0OBUwnlsZwhXnGjkd3YknvChqttgoDM",
    authDomain: "curso-57ea3.firebaseapp.com",
    projectId: "curso-57ea3",
    storageBucket: "curso-57ea3.appspot.com",
    messagingSenderId: "53744112406",
    appId: "1:53744112406:web:0802c4209bc3f76cc2b637",
    measurementId: "G-MD1Y80LVE3"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth};