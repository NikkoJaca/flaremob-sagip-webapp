

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    //shit
    //    test
    }
    else{
        window.location = "../login.html";
        console.log(user);
    }

});
