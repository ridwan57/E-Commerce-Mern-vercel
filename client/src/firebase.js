import firebase from "firebase/app"
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBS7Gi4aU2rXZ2Tjy9XUYSaLgaW8HlqgnA",
    authDomain: "e-commerce-mern-dbf46.firebaseapp.com",
    projectId: "e-commerce-mern-dbf46",
    storageBucket: "e-commerce-mern-dbf46.appspot.com",
    messagingSenderId: "129077110402",
    appId: "1:129077110402:web:3ba530ea06be501fccf69b",
    measurementId: "G-R7KHNYMLJ4"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();