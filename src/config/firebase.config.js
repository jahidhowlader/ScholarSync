// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8duWMil4_4z2HrfH9vVf5BUXxrji2HZY",
  authDomain: "scholarsync-client.firebaseapp.com",
  projectId: "scholarsync-client",
  storageBucket: "scholarsync-client.appspot.com",
  messagingSenderId: "253223142738",
  appId: "1:253223142738:web:b5972fd490de77ea83e68b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);