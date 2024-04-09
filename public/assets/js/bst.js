import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHFj9oABXSxiWm7u1yPOvyhXQw_FRp5Lw",
    authDomain: "project-plato-eb365.firebaseapp.com",
    databaseURL: "https://project-plato-eb365-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-plato-eb365",
    storageBucket: "project-plato-eb365.appspot.com",
    messagingSenderId: "753582080609",
    appId: "1:753582080609:web:98b2db93e63a500a56e020",
    measurementId: "G-KHJXGLJM4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
console.log("db:", db);

// Contains test data for 2 quizes
const creationDate = new Date();
const modificationDate = new Date();

// Update the modification date before saving the quiz to Firestore
modificationDate.setSeconds(modificationDate.getSeconds() + 1);
// newQuiz.modificationDate = modificationDate;

const quizzes = [
    {
        id: 0,
        QuizGroupId: '8001',
        Title: 'Introduction to Programming Quiz',
        Description: 'A quiz about the basics of programming',
        Banner: 'https://example.com/programming-banner.jpg',
        embedded_text: '<p>This quiz covers the basics of programming, including variables, data types, and control flow.</p>',
        Difficulty: 'Beginner',
        Created_at: creationDate,
        Modified_at: modificationDate,
        GroupId_Subject: 'Reading Exersise',
        Questions: [
            {
                QuestionId: '1',
                Text: 'What is a variable in programming?',
                Options: ['A container for data', 'A type of data', 'A function', 'A loop'],
                CorrectOption: 0,
                Type: 'Multiple Choice',
                Hint: 'Think about how you store and manipulate data in a program',
                ScoreWithoutHints: 0,
                ScoreWithHints: 0
            },
            {
                QuestionId: '2',
                Text: 'Which of the following is a data type in JavaScript?',
                Options: ['Number', 'String', 'Boolean', 'All of the above'],
                CorrectOption: 3,
                Type: 'Multiple Choice',
                Hint: 'Consider the different types of data that can be used in a program',
                ScoreWithoutHints: 0,
                ScoreWithHints: 0
            },
            {
                QuestionId: '3',
                Text: 'What is a conditional statement in programming?',
                Options: ['A statement that executes code based on a condition', 'A statement that loops through code', 'A statement that assigns a value to a variable', 'A statement that defines a function'],
                CorrectOption: 0,
                Type: 'Multiple Choice',
                Hint: 'Think about how you make decisions in a program',
                ScoreWithoutHints: 0,
                ScoreWithHints: 0
            }
        ]
    },
    {
        id: 1,
        QuizGroupId: '8002',
        Title: 'Intermediate Programming Quiz',
        Description: 'A quiz about intermediate programming concepts',
        Banner: 'https://example.com/programming-banner.jpg',
        embedded_text: '<p>This quiz covers intermediate programming concepts, including functions, arrays, and objects.</p>',
        Difficulty: 'Intermediate',
        Created_at: creationDate,
        Modified_at: modificationDate,
        GroupId_Subject: 'Reading Exersise',
        Questions: [
            {
                QuestionId: 1,
                Text: 'What is a function in programming?',
                Options: ['A block of code that performs a specific task', 'A data type', 'A variable', 'A loop'],
                CorrectOption: 0,
                Type: 'Multiple Choice',
                Hint: 'Think about how you can reuse code in a program',
                ScoreWithoutHints: 0,
                ScoreWithHints: 0
            },
            {
                QuestionId: '2',
                Text: 'What is an array in programming?',
                Options: ['A collection of values', 'A data type', 'A function', 'A loop'],
                CorrectOption: 0,
                Type: 'Multiple Choice',
                Hint: 'Think about how you can store and manipulate multiple values in a program',
                ScoreWithoutHints: 0,
                ScoreWithHints: 0
            },
            {
                QuestionId: '3',
                Text: 'What is an object in programming?',
                Options: ['A collection of properties and methods', 'Adata type', 'A function', 'A loop'],
                CorrectOption: 0,
                Type: 'Multiple Choice',
                Hint: 'Think about how you can represent complex data structures in a program',
                ScoreWithoutHints: 0,
                ScoreWithHints: 0
            }
        ]
    }
];

// Temporary function for uploading a quiz filled with test data and sends it to Firestore
async function updateQuizzes() {
    try {
        const quizzesRef = collection(db, "quizzes");

        // Loop through the quizzes array and create a document for each quiz
        for (const quiz of quizzes) {
            const quizId = (quiz.id || 0).toString();
            const quizDocRef = doc(quizzesRef, quizId);

            // Try to get the document
            const quizDocSnap = await getDoc(quizDocRef);

            // If the document doesn't exist, create it
            if (!quizDocSnap.exists()) {
                console.log("Creating new quiz document...", quizId);
                await setDoc(quizDocRef, quiz);
                console.log("Quiz document created!");
            }
        }

        console.log("All quiz documents updated!");

    } catch (error) {
        console.error("Error updating quizzes document:", error);
    }
};


async function getQuizById(quizDocRef) {
    const quizDocSnap = await getDoc(quizDocRef);

    if (quizDocSnap.exists()) {
        const quizDocData = quizDocSnap.data();
        // Process the quiz document data as needed
        return quizDocData;
    } else {
        console.log(`No quiz found with ID ${quizDocRef.id}`);
        return null;
    }
}

/* Binary Search Tree logic related to searching relevant quiz data*/
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            const searchTree = function (node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }

    generate(numNodes = 4096) {
        for (let i = 0; i < numNodes; i++) {
            this.add(i);
        }
    };

    find(value) {
        if (this.root === null) {
            return null;
        }
        return this._find(this.root, value);
    }

    _find(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            return this._find(node.left, value);
        } else if (value > node.value) {
            return this._find(node.right, value);
        } else {
            return node;
        }
    }

    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
}

// findMin() {
//     let current = this.root;
//     while (current.left !== null) {
//         current = current.left;
//     }
//     return current.data;
// }
// findMax() {
//     let current = this.root;
//     while (current.right !== null) {
//         current = current.right;
//     }
//     return current.data;
// }

// isPresent(data) {
//     let current = this.root;
//     while (current) {
//         if (data === current.data) {
//             return true;
//         }
//         if (data < current.data) {
//             current = current.left;
//         } else {
//             current = current.right;
//         }
//     }
//     return false;
// }
// remove(data) {
//     const removeNode = function (node, data) {
//         if (node == null) {
//             return null;
//         }
//         if (data == node.data) {
//             // node has no children 
//             if (node.left == null && node.right == null) {
//                 return null;
//             }
//             // node has no left child 
//             if (node.left == null) {
//                 return node.right;
//             }
//             // node has no right child 
//             if (node.right == null) {
//                 return node.left;
//             }
//             // node has two children 
//             var tempNode = node.right;
//             while (tempNode.left !== null) {
//                 tempNode = tempNode.left;
//             }
//             node.data = tempNode.data;
//             node.right = removeNode(node.right, tempNode.data);
//             return node;
//         } else if (data < node.data) {
//             node.left = removeNode(node.left, data);
//             return node;
//         } else {
//             node.right = removeNode(node.right, data);
//             return node;
//         }
//     }
//     this.root = removeNode(this.root, data);
// }
// isBalanced() {
//     return (this.findMinHeight() >= this.findMaxHeight() - 1)
// }
// findMinHeight(node = this.root) {
//     if (node == null) {
//         return -1;
//     };
//     let left = this.findMinHeight(node.left);
//     let right = this.findMinHeight(node.right);
//     if (left < right) {
//         return left + 1;
//     } else {
//         return right + 1;
//     };
// }
// findMaxHeight(node = this.root) {
//     if (node == null) {
//         return -1;
//     };
//     let left = this.findMaxHeight(node.left);
//     let right = this.findMaxHeight(node.right);
//     if (left > right) {
//         return left + 1;
//     } else {
//         return right + 1;
//     };
// }


let quizIdInput;

// Cals the updateQuizzes function
updateQuizzes();
const runBtn = document.getElementById("run-btn");
runBtn.addEventListener("click", async () => {

    const quizIdInput = Number(document.getElementById("quiz-id-input").value);

    // Creates Binary Search Tree
    const bst = new BST();
    bst.generate();

    bst.add(1024);
    bst.add(3072);
    bst.add(256);
    bst.add(768);
    bst.add(2304);
    bst.add(767);
    bst.add(3);

    console.log("quizIdInput:", quizIdInput);
    const node = bst.find(quizIdInput);

    if (node) {
        console.log(`Node with value ${node.data} found!`);

        // Use the Firebase Firestore API to retrieve the quiz data for the node
        const quizDocRef = doc(db, "quizzes", `${quizIdInput}`);
        const quizData = await getQuizById(quizDocRef);

        console.log("Quiz data retrieved correctly:", quizData);

        if (quizData === null) {
            console.log("The retrieved quiz data is empty.");
        }
    } else {
        console.log(`Quiz with Id ${quizIdInput} not found in the BST`);
    }
});


// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {

        // Runs BST and Quiz retrieval code
        console.log('Current User Email:', user.email);
        // Cals the updateQuizzes function

    } else {
        // Redirect the user to the 'login_parent_tvt.html' page if the user is not logged in
        window.location.href = "login_parent_tvt.html";
    }
});


