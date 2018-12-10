

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    //shit
    }
    else{
        window.location = "../login.html";
        console.log(user);
    }

});
