// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqPmi4KashK83GXPoe9ng6ZLnu0TJVh0k",
  authDomain: "multimart-85dff.firebaseapp.com",
  projectId: "multimart-85dff",
  storageBucket: "multimart-85dff.appspot.com",
  messagingSenderId: "947771177973",
  appId: "1:947771177973:web:395bb6ad5243679e493ebc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

export const auth = getAuth(app)
export default app