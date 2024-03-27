// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
// import { getFirestore, collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyCHFj9oABXSxiWm7u1yPOvyhXQw_FRp5Lw",
//     authDomain: "project-plato-eb365.firebaseapp.com",
//     databaseURL: "https://project-plato-eb365-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "project-plato-eb365",
//     storageBucket: "project-plato-eb365.appspot.com",
//     messagingSenderId: "753582080609",
//     appId: "1:753582080609:web:98b2db93e63a500a56e020",
//     measurementId: "G-KHJXGLJM4Y"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
// const db = getFirestore(app);
// console.log("db:", db);

// const quizForm = document.getElementById('quiz-form');
// const questionsContainer = document.getElementById('questions');
// document.getElementById("add-question-button").addEventListener("click", addQuestion);

// let questionId = 1;

// // Check if the user is logged in
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log('Current User Email:', user.email);
//         function addQuestion() {
//             const question = document.createElement('div');
//             question.id = `question-${questionId}`;
//             question.innerHTML = `
//         <h2>Question ${questionId}</h2>
//         <input type="text" id="question-text-${questionId}" placeholder="Question text" required />
//         <select id="question-type-${questionId}" required>
//           <option value="multiple-choice">Multiple Choice</option>
//           <option value="true-or-false">True or False</option>
//           <option value="other">Other</option>
//         </select>
//         <div id="question-options-${questionId}"></div>
//         <button type="button" onclick="addOption(${questionId})">Add Option</button>
//         <button type="button" onclick="removeQuestion(${questionId})">Remove Question</button>
//         <input type="text" id="question-hint-${questionId}" placeholder="Hint" required />
//       `;
//             questionsContainer.appendChild(question);
//             addOption(questionId);
//             questionId++;
//         }

//         function addOption(questionId) {
//             const question = document.getElementById(`question-${questionId}`);
//             const optionsContainer = document.getElementById(`question-options-${questionId}`);
//             const option = document.createElement('div');
//             option.innerHTML = `
//         <input type="text" id="question-option-text-${questionId}-0" placeholder="Option text" required />
//         <input type="radio" name="question-option-correct-${questionId}" value="0" required />
//       `;
//             for (let i = 1; i < 4; i++) {
//                 option.innerHTML += `
//           <input type="text" id="question-option-text-${questionId}-${i}" placeholder="Option text" />
//           <input type="radio" name="question-option-correct-${questionId}" value="${i}" />
//         `;
//             }
//         };

//     } else {
//         // Redirect the user to the 'login_parent_tvt.html' page if the user is not logged in
//         window.location.href = "login_parent_tvt.html";
//     }
// });

