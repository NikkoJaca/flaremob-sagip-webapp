$( document ).ready(function() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

        }
        else{
            window.location = "../alisto/login.html";
            console.log(user);
        }

    });
});