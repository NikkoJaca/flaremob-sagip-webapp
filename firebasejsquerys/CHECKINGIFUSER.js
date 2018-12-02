$( document ).ready(function() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

        }
        else{
            window.location = "../flaremob-sagip-webapp/login.html";
            console.log(user);
        }

    });
});