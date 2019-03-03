const dbRef = firebase.database().ref();
const usersRef = dbRef.child('tblDonatedItems');
usersRef.on("child_added",snap=>{

});

usersRef.orderByChild("isAdminNotified").equalTo("0").on("child_added",snap=>{
    console.log(snap.key);
});