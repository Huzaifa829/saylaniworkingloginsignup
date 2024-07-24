// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyCj9dhnsWQocHOMEr3ezQvLKNtftNPdQfo",
  authDomain: "saylaniworkingloginsignup.firebaseapp.com",
  projectId: "saylaniworkingloginsignup",
  storageBucket: "saylaniworkingloginsignup.appspot.com",
  messagingSenderId: "770805039181",
  appId: "1:770805039181:web:9bd91ab53418998ea41c04",
  measurementId: "G-ZLZ55HJVGK"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);