import { auth } from "./FirebaseConfig.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


const ForgottenPassword_form = document.querySelector('#ForgottenPassword_form')
const ForgottenPassword_email = document.querySelector('#ForgottenPassword_email')

alertify.set('notifier', 'position', 'top-center');

ForgottenPassword_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    sendPasswordResetEmail(auth, ForgottenPassword_email.value)
      .then(() => {
    
        alertify.success('Success Send Please check mail');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alertify.error(errorMessage);

        // ..
      });

})

