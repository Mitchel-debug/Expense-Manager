  
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
var currentUser = {}

// signup
$(".submit").click(function(){
    var userEmail = $("#signup-email").val();
    var userPass = $("#signup-password").val();
    console.log(userEmail + " " + userPass)
    createNewUser(userEmail, userPass)
})
$("#login").click(function(){
    var userEmail = $("#signup-email").val();
    var userPass = $("#signup-password").val();
    console.log( "Existing user: " + userEmail + " " + userPass)
    signIn(userEmail, userPass)
})

$("#logout").click(function(){
    auth.signOut();
    console.log("logged out")
})

function createNewUser(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
            window.location.href = "index2.html";
        })
        .catch(function(error){
            var errorCode = error.errorCode;
            var errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        })
}

function signIn(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(cred => {
            window.location.href = "index2.html"
        })
        .catch(function(error){
            var errorCode = error.errorCode;
            var errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        })
}

function writeUserData(user){
    firebase.database().ref("users/" + user.uid).set({
        uid: user.uid,
        email: user.email
    })
}
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      var isAnonymous = user.isAnonymous
      var email = user.email;
      currentUser = user;
      writeUserData(user)
      console.log(currentUser.email + " has logged in");
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
