const dbRef = firebase.database().ref();
const usersRef = dbRef.child('tblDonatedItems');
const moneyRef = dbRef.child('tblDonatedMoney');
let adminnotseen = 0;
usersRef.on("child_added",snap=>{
    if(snap.child("isAdminNotified").val()==="0"){
        adminnotseen+=1;

        console.log(snap.key)
    }else if(snap.child("isAdminNotified").val()==="1"){

    }

});
moneyRef.on("child_added",snap=>{
    if(snap.child("isAdminNotified").val()==="0"){
        adminnotseen+=1;
        document.getElementById('notifcount').innerText = adminnotseen;
        console.log(snap.key)
    }else if(snap.child("isAdminNotified").val()==="1"){

    }
});
