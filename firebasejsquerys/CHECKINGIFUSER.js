$( document ).ready(function() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

        }
        else{
            window.location = "../login.html";
            console.log(user);
        }

    });
});