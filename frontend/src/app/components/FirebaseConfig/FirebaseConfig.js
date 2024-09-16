import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"

function FirebaseConfig(){

    const firebaseConfig = {
        apiKey: "AIzaSyB0axzTgZTI7zaRp8IKFSZrqoZy0vO7d6k",
        authDomain: "pric-assesmment.firebaseapp.com",
        projectId: "pric-assesmment",
        storageBucket: "pric-assesmment.appspot.com",
        messagingSenderId: "685587779098",
        appId: "1:685587779098:web:1843afb5e6c6eeb2c38ba3",
        measurementId: "G-LE4WP28E2L"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      return getDatabase(app)
}

export default FirebaseConfig;