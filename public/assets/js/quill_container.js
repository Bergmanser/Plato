import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Main Config for Project Plato
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

Quill.register("modules/imageUploader", ImageUploader);

// Assuming you have a Quill instance called "quill"
const quill = new Quill('#quill-container', {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['image']
        ],
        imageUploader: {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("image", file);

                    fetch(
                        "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
                        {
                            method: "POST",
                            body: formData
                        }
                    )
                        .then((response) => response.json())
                        .then((result) => {
                            console.log(result);
                            resolve(result.data.url);
                        })
                        .catch((error) => {
                            reject("Upload failed");
                            console.error("Error:", error);
                        });
                });
            }
        }
    },
    theme: 'snow'
});

// When you want to save the contents to Firestore
const delta = quill.getContents();
const html = quill.root.innerHTML;

// Save the HTML to Firestore
const quizData = {
    title: 'My Quiz',
    content: html
};

// // Assuming you have a Firestore collection called "quizzes"
// const quizzesRef = firebase.firestore().collection('quizzes');
// quizzesRef.add(quizData)
//     .then(() => {
//         console.log('Quiz saved to Firestore');
//     })
//     .catch((error) => {
//         console.error('Error saving quiz to Firestore:', error);
//     });



//         import { Quill } from "quill";
//         import { QuillImageUploader } from 'quill-image-uploader';

//         const uploader = new QuillImageUploader({
//         uploadEndpoint: '/upload-image',
//         quill: quill,
// });


//         Quill.register("modules/imageUploader", ImageUploader);
  
//         console.log("script");
//         document.addEventListener("DOMContentLoaded", function () {
//           const fullToolbarOptions = [
//             [{ header: [1, 2, 3, false] }],
//             ["bold", "italic"],
//             ["clean"],
//             ["image"]
//           ];
  
//           console.log("Dom loaded");
  
//           var quill = new Quill("#editor", {
//             theme: "snow",
//             modules: {
//               toolbar: {
//                 container: fullToolbarOptions
//               },
//               imageUploader: {
//                 upload: (file) => {
//                   return new Promise((resolve, reject) => {
//                     const formData = new FormData();
//                     formData.append("image", file);
  
//                     fetch(
//                       "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
//                       {
//                         method: "POST",
//                         body: formData
//                       }
//                     )
//                       .then((response) => response.json())
//                       .then((result) => {
//                         console.log(result);
//                         resolve(result.data.url);
//                       })
//                       .catch((error) => {
//                         reject("Upload failed");
//                         console.error("Error:", error);
//                       });
//                   });
//                 }
//               }
//             }
//           });
  
//           console.log(quill);
//         });
     
//       // Sources:
//       // https://github.com/NoelOConnell/quill-image-uploader
//       // https://codesandbox.io/p/sandbox/mutable-tdd-lrsvh?file=%2Findex.html%3A16%2C7

//       // ClassicEditor.create(document.querySelector('#quill-container'), {
//       //   // Add any desired options here
//       // })
//       // .catch(error => {
//       //   console.error(error);
//       // });

//     //   Quill.register("modules/imageUploader", ImageUploader);
  
//     //     console.log("script");
//     //     document.addEventListener("DOMContentLoaded", function () {
//     //       const fullToolbarOptions = [
//     //         [{ header: [1, 2, 3, false] }],
//     //         ["bold", "italic"],
//     //         ["clean"],
//     //         ["image"]
//     //       ];
  
//     //       console.log("Dom loaded");
  
//     //       var quill = new Quill("#editor", {
//     //         theme: "snow",
//     //         modules: {
//     //           toolbar: {
//     //             container: fullToolbarOptions
//     //           },
//     //           imageUploader: {
//     //             upload: (file) => {
//     //               return new Promise((resolve, reject) => {
//     //                 const formData = new FormData();
//     //                 formData.append("image", file);
  
//     //                 fetch(
//     //                   "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
//     //                   {
//     //                     method: "POST",
//     //                     body: formData
//     //                   }
//     //                 )
//     //                   .then((response) => response.json())
//     //                   .then((result) => {
//     //                     console.log(result);
//     //                     resolve(result.data.url);
//     //                   })
//     //                   .catch((error) => {
//     //                     reject("Upload failed");
//     //                     console.error("Error:", error);
//     //                   });
//     //               });
//     //             }
//     //           }
//     //         }
//     //       });
  
//     //       console.log(quill);
//     //     });