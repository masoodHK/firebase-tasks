const config = {
    apiKey: "AIzaSyDk7jQRCY2FTnDDtu3TR7mg8nSz9EvSsfw",
    authDomain: "tts-tutorial.firebaseapp.com",
    databaseURL: "https://tts-tutorial.firebaseio.com",
    projectId: "tts-tutorial",
    storageBucket: "tts-tutorial.appspot.com",
    messagingSenderId: "652997654572"
};
firebase.initializeApp(config);
const auth = firebase.auth()
const database = firebase.database()
// const inputField = document.getElementById('inputField');
// const myName = document.getElementById('myName');

var user;

// inputField.onkeyup = event => {
//     user.set({
//         name: event.target.value
//     });
// }

// user.on('value', snapshot => myName.innerText = snapshot.val().name);


function register(){

    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmpassword').value;
    
    if(confirmPassword === password){
        let userInfo = {
            email,
            username,
            password
        }
        auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(() => {
            user = auth.currentUser
            database.ref('users/' + user.uid).set(userInfo)
            user.updateProfile({
                displayName: userInfo.username,
            })
            setTimeout(() => {
                location = 'index.html';
            }, 5000)
        }).catch((err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(`${err}`)
        });
    }
    return false
}
function login(){
    let email = document.getElementsByClassName('input')[0].value;
    let password = document.getElementsByClassName('input')[1].value;
    auth.signInWithEmailAndPassword(email, password).then(() => {
            setTimeout(() => {
                location = 'index.html';
            }, 5000)
        })
        .catch((err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            if (errorCode) {
                console.log('Error:' + errorCode);
            } else {
                console.log(errorMessage);
            }
            console.log(`Error: ${err}`)
        });
    return false
}
function changeState (){
    let nav = document.getElementsByClassName('navbar-start')[0];
    auth.onAuthStateChanged(user => {
        if(user){
            nav.innerHTML = `
                <a class="navbar-item">Welcome: ${user.displayName}</a>
                <div class="navbar-item">
                    <button class="button is-danger is-outlined" onclick="signOut()">Sign Out</button>
                </div>
            `;
        }
    });
}
function signOut(){
    auth.signOut().then(() => {
        location = "index.html";
    }).catch(error => {
        console.log(error);
    })
}
function addTasks(){
    const taskName = document.getElementsByClassName('input')[0].value;
    const priority = document.getElementsByClassName('input')[1].value;
    database.ref(`users/${auth.currentUser.uid}/tasks/`).push().set({
        taskName,
        priority,
        timestamp: (new Date()).getTime()
    })
    return false;
}
(function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();
changeState()