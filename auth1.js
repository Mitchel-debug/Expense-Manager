// // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyBK2kRr4DD92wFmay9FNhfekXZewz_ZS8c",
//     authDomain: "expense-tracker2-9aa1a.firebaseapp.com",
//     projectId: "expense-tracker2-9aa1a",
//     storageBucket: "expense-tracker2-9aa1a.appspot.com",
//     messagingSenderId: "576396074226",
//     appId: "1:576396074226:web:c967343827990cf6d6446b",
//     measurementId: "G-980W75KEEE"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const db = firebase.database().ref();
// const auth = firebase.auth();

// //signup
// function register(){
//     const signupForm = document.querySelector("#signup-form");
//     signupForm.addEventListener("submit", (e) => {
//         e.preventDefault();

//         //Get user info
//         const email = signupForm["signup-email"].value;
//         const password = signupForm["signup-password"].value;

//         //Signup the user
//         auth.createUserWithEmailAndPassword(email, password).then(cred => {
//             console.log(cred.user);

//         })


//     })
// }
// // firebase.auth().onAuthStateChanged((user) => {
// //     if (user) {
// //       // User is signed in, see docs for a list of available properties
// //       // https://firebase.google.com/docs/reference/js/firebase.User
// //       var uid = user.uid;
// //       window.location.href = "index2.html";
// //       // ...


// //     } else {
// //       // User is signed out
// //       // ...
// //       alert("No credentials");
// //     }
// // });

// function login(){
//     const userEmail = document.getElementById("signup-email").value;
//     const userPass = document.getElementById("signup-password").value;

//     firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
//         .then((userCredential) => {
//             // Signed in
//             var user = userCredential.user;
//             console.log(user)
//             // ...
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             window.alert("Error: " + errorMessage);
//         });
// }