// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBK2kRr4DD92wFmay9FNhfekXZewz_ZS8c",
    authDomain: "expense-tracker2-9aa1a.firebaseapp.com",
    projectId: "expense-tracker2-9aa1a",
    storageBucket: "expense-tracker2-9aa1a.appspot.com",
    messagingSenderId: "576396074226",
    appId: "1:576396074226:web:c967343827990cf6d6446b",
    measurementId: "G-980W75KEEE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// const categories = 
const textElement = document.querySelector("#text")
const amountElem = document.querySelector("#amount")
const category2 = document.getElementById("category");
const buttonref = document.querySelector("#button");
buttonref.addEventListener("click", updateDB);

let history = document.querySelector(".history");
const db = firebase.database().ref();

const auth = firebase.auth();

//signup
if(document.getElementsByClassName("submit").onclick == true){
    document.getElementsByTagName("main").style.display = "block"
    document.querySelector("signup-form").style.display = "none";
    console.log(uid);
}
else{
    document.querySelector("main").style.display = "none"
    document.querySelector("#signup-form").style.display = "block";
}
function register(){
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
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      document.querySelector("main").style.display = "block"
      document.querySelector("#signup-form").style.display = "none";
      // ...


    } else {
      // User is signed out
      // ...
      document.querySelector("main").style.display = "none"
      document.querySelector("#signup-form").style.display = "block";
    }
});

function login(){
    const userEmail = document.getElementById("signup-email").value;
    const userPass = document.getElementById("signup-password").value;

    auth.signInWithEmailAndPassword(userEmail, userPass).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        });
}


function createPost(text, categorical, amount){
    let div = document.createElement("div")
    div.setAttribute("class", "transaction");
    let p = document.createElement("p");
    p.setAttribute("id", "p1");
    let p2 = document.createElement("p");
    p2.setAttribute("id", "p2");
    let p3 = document.createElement("p");
    p3.setAttribute("id", "p3");
    let delete_button = document.createElement('button')
    delete_button.setAttribute('class', 'delete-btn') 
    delete_button.innerHTML = 'x'

    if (amount > 0) {
        div.className += ' transaction--plus';
    }
    else {
        div.className += ' transaction--minus';
    }


    p.textContent = text;
    p2.textContent = "Category: " + categorical;
    p3.textContent = amount;
    
    div.appendChild(delete_button)
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(p3);
    console.log(div.className)
    if (history.innerHTML === ""){
        console.log(true);
    }
    history.insertBefore(div, history.firstChild);

    // for(i = 0; i < 1; i++){
    //     console.log(history);
    // }
}

function deletePosts() {
    delete_button.addEventListener('click', function() {
        //I added this last night. this is where your would delete transactions and i wanted to make it for you early so here you go.
    })
}

function getPosts(){
    db.on("child_added", function(rowData){
        let row = rowData.val();
        createPost(
            row.Text,
            row.Categories,
            row.Amount
        );
    })
}

getPosts();
function updateDB(e){
    e.preventDefault();
    const text = textElement.value;
    const amount = amountElem.value;
    const categ = category2.value;

    textElement.value = ""
    amountElem.value = '';

    let value = {
        Text: text,
        Amount: amount,
        Categories: categ
    }

    db.push(value);
}



const date = new Date();
let month = date.getMonth() + 1;
let day = date.getDay() + 15;
let year = date.getFullYear();
document.querySelector(".date").innerHTML = "date created: " + month + "/" + day + '/' + year;

let button = document.querySelector('.btn-rec');

button.addEventListener('click', function() {
    plan = document.createElement('div')
    plan.className = 'plan';
    card = document.createElement('div');
    card.className = 'card';
    header = document.createElement('header');
    header.className = 'card__header';
    h3 = document.createElement('h3');
    h3.className = 'plan__name';
    h3.innerHTML = 'newRecommendation';
    // date = document.createElement('p');
    // date.className = 'date'
    // date.innerHTML = "date created: " + month + "/" + day + '/' + year;
    description = document.createElement('p');
    description.className = 'plan__description';

    header.appendChild(description)
    //header.appendChild(date)
    header.appendChild(h3);
    card.appendChild(header);
    plan.appendChild(card);

    body = document.querySelector('body');

    body.appendChild(plan)

})
