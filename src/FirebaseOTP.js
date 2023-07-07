import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNJQJaUH5knv3Zwt6EODV79FkB0MHaQS4",
  authDomain: "khleang-e5f23.firebaseapp.com",
  projectId: "khleang-e5f23",
  storageBucket: "khleang-e5f23.appspot.com",
  messagingSenderId: "590227270823",
  appId: "1:590227270823:web:9fefba8f4af305ff46bf82"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);