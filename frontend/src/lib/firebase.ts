// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASCP_1N7rTLPzNXnN4wGWv6Gky9tV9Lpw",
    authDomain: "respet-1d4dc.firebaseapp.com",
    projectId: "respet-1d4dc",
    storageBucket: "respet-1d4dc.appspot.com",
    messagingSenderId: "815650551533",
    appId: "1:815650551533:web:d05aeac58ed33161cc3ee4",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
