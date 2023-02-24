const { initializeApp } = require("firebase/app");
const { getStorage } = require ("firebase/storage");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {

  apiKey: "AIzaSyAafeXdtlCZy-HA-Adg0gT9CRf-fucQSZ0",

  authDomain: "test-9a12d.firebaseapp.com",

  projectId: "test-9a12d",

  storageBucket: "test-9a12d.appspot.com",

  messagingSenderId: "1079572523851",

  appId: "1:1079572523851:web:0b2ccccb0019a59d9396ce"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


module.exports = { storage, db }