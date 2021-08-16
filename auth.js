var firebaseConfig = {
    apiKey: "AIzaSyBu3o88ZXsrroHmf1PiFeWMSHhY9jo90oQ",
    authDomain: "expense-tracker-a7264.firebaseapp.com",
    projectId: "expense-tracker-a7264",
    storageBucket: "expense-tracker-a7264.appspot.com",
    messagingSenderId: "672380797363",
    appId: "1:672380797363:web:66d7ea25168cfe38d38bc6",
    measurementId: "G-1CEQ7SZ8KQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.database().ref();
const auth = firebase.auth();

// signup

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    //Signup the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);

    })


})