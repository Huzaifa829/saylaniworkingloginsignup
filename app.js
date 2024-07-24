import { auth } from "./FirebaseConfig.js"
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// get data from signup
const signup_form = document.querySelector('#signup_form')
const signup_email = document.querySelector('#signup_email')
const signup_password = document.querySelector('#signup_password')
// const User_name = document.querySelector('#User_name')


// get data from login

const login_form = document.querySelector('#login_form')
const login_email = document.querySelector('#login_email')
const login_password = document.querySelector('#login_password')


// for transition

const chk = document.getElementById('chk');
const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const loginLabel = document.querySelector('.login label');
const signupLabel = document.querySelector('.signup label');



alertify.set('notifier', 'position', 'top-center');

signup_form.addEventListener('submit', (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alertify.success('Success Sign Up');
            login.style.transform = 'translateY(-500px)';
            loginLabel.style.transform = 'scale(1)';
            signupLabel.style.transform = 'scale(0.6)';
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alertify.error(errorMessage);
            // ..
        });
})
login_form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('workinf');
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alertify.success('Success Login In');
            window.location = 'quiz.html'
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alertify.error(errorMessage);
         
        });
})



chk.addEventListener('change', () => {
    if (chk.checked) {
        login.style.transform = 'translateY(-500px)';
        loginLabel.style.transform = 'scale(1)';
        signupLabel.style.transform = 'scale(0.6)';
    } else {
        login.style.transform = 'translateY(-180px)';
        loginLabel.style.transform = 'scale(0.6)';
        signupLabel.style.transform = 'scale(1)';
    }
});

