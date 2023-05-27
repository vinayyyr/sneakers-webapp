import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxs00_TQ3ar5kCIoS5qz8rOvpFOxmN4ns",
  authDomain: "ecommerce-17d61.firebaseapp.com",
  databaseURL: "https://ecommerce-17d61-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecommerce-17d61",
  storageBucket: "ecommerce-17d61.appspot.com",
  messagingSenderId: "1063702413504",
  appId: "1:1063702413504:web:783d4ca242ff80ab32ed25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
export default fireDb



  