// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// const categories = 
const textElement = document.querySelector("#text")
const amountElem = document.querySelector("#amount")
const category2 = document.getElementById("category");
const buttonref = document.querySelector(".upbtn");
buttonref.addEventListener("click", updateDB);

let history = document.querySelector(".history");
const db = firebase.database().ref();
const auth = firebase.auth();
var currentUser = {}
let delete_button;
var div;

// buttonref.setAttribute("id", currentUser.uid)
function createPost(text, categorical, amount, id){
    div = document.createElement("div")
    div.setAttribute("id", "transaction");

    let p = document.createElement("p");
    p.setAttribute("id", "p1");
    p.setAttribute("class", "ptag");
    let p2 = document.createElement("p");
    p2.setAttribute("id", "p2");
    p2.setAttribute("class", "ptag");
    let p3 = document.createElement("p");
    p3.setAttribute("id", "p3");
    p3.setAttribute("class", "ptag");
    let but = document.createElement("input")
    but.type = "hidden";

    delete_button = document.createElement('button')
    delete_button.setAttribute('class', 'delete-btn') ;
    delete_button.setAttribute('id', id) ;
    delete_button.innerHTML = 'x'

    if (amount > 0) {
        div.className += ' transaction--plus';
        let balanceTag = document.querySelector("#balance");
        // stringer = moneyPlus.innerHTML;
        // search = "$";
        // const indexOfFirst = stringer.indexOf(search);
        let currBalance = balanceTag.innerHTML.substring(1);
        let currBalance2 = parseInt(currBalance, 10);
        let am = parseInt(amount, 10); 
        let newBalance = currBalance2 + am;
        // let newUserBal = {
        //     userBalance: newBalance
        // }
        balanceTag.innerHTML = "$" + newBalance
    }
    else {
        div.className += ' transaction--minus';
            let balanceTag = document.querySelector("#balance");
            let currBalance = balanceTag.innerHTML.substring(1);
            currBalance = parseInt(currBalance, 10);
            amount = parseInt(amount, 10);
            newBalance = currBalance + amount;
            balanceTag.innerHTML = "$" + newBalance;
            money = document.getElementById("money-minus")
            moneyMinus = $('#money-minus').text();
            const searchTerm = '$';
            const indexOfFirst = moneyMinus.indexOf(searchTerm);

            let currMoney = moneyMinus.substring(indexOfFirst + 1)
            console.log(currMoney);
            let currBal = parseInt(currMoney, 10);
            amo = parseInt(amount, 10);
            let amon = currBal + amo
            money.innerHTML = amon;
    }


    p.textContent = text;
    p2.textContent = "Category: " + categorical;
    p3.textContent = amount;
    but = id;
    div.appendChild(delete_button)
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(p3);
    console.log(div.className)
    if (history.innerHTML === ""){
        console.log(true);
    }
    history.insertBefore(div, history.firstChild);
    // history.appendChild(div);

}

const transact = document.querySelector("#transaction")
// starCountRef.on('value', (snapshot) => {
//   const data = snapshot.val();
var condition = firebase.database().ref("heroes/");
condition.on('child_added', (snapshot) => {
    const datas = snapshot.val();
    console.log(datas);
    if(datas.userId == currentUser.uid){
        createPost(datas.Text, datas.Categories, datas.Amount, datas.id);
        
    }
    else{
        console.log("Idk");
    }
})

$(document).on("click", ".delete-btn", function(){
    console.log("clicked")
    var heroID = $(this).attr("id")
    console.log(heroID);
    firebase.database().ref("users/" + currentUser.uid + /heroes/ + heroID).remove()
    firebase.database().ref("heroes/" + heroID).remove()
    var dell = $(this).parent("div")
    dell.remove()
    // window.onload = function(){
    //     transact.remove()
    // }
})

// let del = document.querySelector(".delete-btn")
// del.onclick = function(){
//     transact.remove();
// }


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      var email = user.email;
      currentUser = user;
      writeUserData(user)
      console.log("Hello, user is signed in")


//       var condition = firebase.database().ref('users/' + currentUser.uid + /heroes/ + value.userId);
//       condition.on('value', (snapshot) => {
//       const data = snapshot.val();
//       console.log(data)
// });
      // ...
    } else {
      // User is signed out
      // ...
    }
});

// $( document ).ready(function() {
//     console.log( "testing.." );
//     var user = firebase.auth().currentUser;
//     console.log(user);
// });

function updateDB(e){
    e.preventDefault();
    const text = textElement.value;
    const amount = amountElem.value;
    const categ = category2.value;

    textElement.value = ""
    amountElem.value = '';
    var userIdent = currentUser.uid;

    let value = {
        id: text + Date.now(),
        userId: currentUser.uid,
        userEmail: currentUser.email,
        Text: text,
        Amount: amount,
        Categories: categ
    }
    firebase.database().ref("heroes/" + value.id).update(value)
    firebase.database().ref("users/" + currentUser.uid + /heroes/ + value.id).update(value)


    // createPost(value.Text, value.Categories, value.Amount);

    // console.log("$" + value.Amount)
    // const balance = document.getElementById("balance");
    // balance.innerHTML = "$" + value.Amount;
}

const incomeInput = document.getElementById("incomeInput");
$(document).on("click", ".changeIncome", function(){
    // var dataname = $(this).attr("id", currentUser.uid)
    incomeInput.setAttribute("id", currentUser.uid)
    console.log("edit is clicked");
    const user = incomeInput.id
    // console.log(currentUser.uid)

    const income2 = incomeInput.value;
    incomeInput.value = ""
    let income = {
        userIncome: income2
    }
    const balance = document.getElementById("balance");
    balance.innerHTML = "$" +  income2;  
    incomeDiv.innerHTML = "$" + income.userIncome;

    //Change this to heroes + user
    firebase.database().ref("heroes/").update(income);
    firebase.database().ref("users/" + currentUser.uid + /heroes/).update(income);


})

incomeDiv = document.getElementById("money-plus")

// var addIncome = firebase.database().ref('heroes/');
// addIncome.on('value', (snapshot) => {
//   const data = snapshot.val();
//   data.key = snapshot.key;
//   console.log(data);
//   incomeDiv.innerHTML = "$" + data.userIncome;
// });

// var makeIncome = firebase.database().ref().child("heroes");
// //might wanna change this to value
// makeIncome.on('value', function (snapshot){
//     snapshot.forEach(function(childsnapshot){
//         var item = childsnapshot.val();
//         item.key = childsnapshot.key;
//         console.log(item.userIncome)
//         // console.log(item.key)
//     })
// //   const data = snapshot.val();

// });

$(document).on("click", "#logout", function(){
    auth.signOut().then(cred => {
        firebase.database().ref("heroes").update({
            userIncome: 0.00
        })
        window.location.href = "index.html";
    });
    console.log("logged out")
})

const date = new Date();
let month = date.getMonth() + 1;
let day = date.getDay() + 15;
let year = date.getFullYear();
let current_date = "date created: " + month + "/" + day + '/' + year;
document.querySelector(".date").innerHTML = current_date

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
    rec_date = document.createElement('p');
    rec_date.className = 'date'
    rec_date.innerHTML = current_date
    description = document.createElement('p');
    description.className = 'plan__description';
    description.innerHTML = "Your expenses are going great, you're on the right path!";

    plan.appendChild(card);
    card.appendChild(header);
    header.appendChild(h3);
    header.appendChild(rec_date)
    header.appendChild(description)

    body = document.querySelector('body');

    body.appendChild(plan)

})
