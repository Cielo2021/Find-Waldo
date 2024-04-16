import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function ConnectToDatabase() {
    // Firebase configuration 
    const firebaseConfig = {
        apiKey: "AIzaSyAtbpj5UtIZB96cSnI8Vr_gJOoSqVYxtKM",
        authDomain: "find-waldo-ca3be.firebaseapp.com",
        projectId: "find-waldo-ca3be",
        storageBucket: "find-waldo-ca3be.appspot.com",
        messagingSenderId: "301990307240",
        appId: "1:301990307240:web:1ae26c2f2ac468ba00a99d",
        measurementId: "G-CKT8135BW9"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and return a reference to the Firestore instance
    return getFirestore(app);
}





