import { auth } from "./FirebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

let questions_array = []
let arrayIndex = 0
let correctAnswers = 0
let wrongAnswers = 0


const quiz = document.querySelector('.quiz')
const next_btn = document.querySelector('#next-btn')



// getData from api 
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        // ...
    } else {
        // User is signed out
        // ...'
        window.location = '/'
    }
});
const getData = async () => {

    try {
        const res = await axios("https://the-trivia-api.com/v2/questions")
        questions_array = res.data
        // console.log(questions_array);
        questions_array.map((v, index) => {
            console.log(`${index + 1} ${v.correctAnswer}`);
        })
        RenderQuestion(arrayIndex)
    } catch (error) {
        // console.log(error);
    }
}
getData()

// rendering question on screen 


const RenderQuestion = (arrayIndex) => {
    let dataRender = questions_array[arrayIndex];
    let answers_array = [...dataRender.incorrectAnswers, dataRender.correctAnswer];
    answers_array = answers_array.sort(() => Math.random() - 0.5);

    // console.log('wroking');
    quiz.innerHTML = `
        <h2 id="question">Q ${arrayIndex + 1} : ${dataRender.question.text}</h2>
        <div id="answer-buttons">
            ${answers_array.map((item) => `<button class="btn">${item}</button>`).join('')}
        </div>

    `;
    const Check_answer_btn = document.querySelectorAll('#answer-buttons .btn')
    Check_answer_btn.forEach((button, index) => {
        button.addEventListener('click', e => CheckingAnswer(e, arrayIndex))
    })
}


// logic check answer 

function CheckingAnswer(e, index) {
    let selectedAwer = e.target.textContent
    let matchAnswer = questions_array[index]
    let Q_L = questions_array.length
    // console.log(matchAnswer);
    if (matchAnswer.correctAnswer == selectedAwer) {
        e.target.style.border = '2px solid green';
        e.target.style.boxShadow = 'inset 0 0 20px green';
        correctAnswers++
        checkingBtn(Q_L, index)
    }
    else {
        e.target.style.border = '2px solid red';
        e.target.style.boxShadow = 'inset 0 0 20px red';
        wrongAnswers++
        checkingBtn(Q_L, index)
    }

    document.querySelectorAll('#answer-buttons .btn').forEach(button => {
        button.disabled = true;
    });
}

// next btn logic call back function 

function checkingBtn(Q_L, index) {
    if (Q_L - 1 == index) {
        quiz.innerHTML += `<button id="next-btn">Result</button>`;
        document.querySelector('#next-btn').addEventListener('click', Result);
    } else {
        quiz.innerHTML += `<button id="next-btn">Next</button>`;
        document.querySelector('#next-btn').addEventListener('click', () => NextBtn(index));
    }
}
function NextBtn(index) {
    index++
    RenderQuestion(index)

}

// next to result page function and save data in local storage

function Result() {
    // console.log('working');
    localStorage.setItem('result', JSON.stringify({
        condition: true,
        correctanswers: correctAnswers,
        wronganswers: wrongAnswers,
        totalquestion: questions_array.length
    }))
    window.location = 'result.html'
}