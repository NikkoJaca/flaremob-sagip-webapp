$(document).ready(function () {
    //TRIAL 1
    let array = [];
    const rootref = firebase.database().ref().child('tblDonatedMoney');
    // rootref.on('value', snap => {
    //     snap.forEach(childSnap =>{
    //         childSnap.child('cash_amount').forEach(grandChildSnap => {
    //             array.push(parseInt(grandChildSnap.val().amount));
    //         });
    //     });
    //     let total = array.reduce((a,b)=> a + b,0);
    //     console.log(total);
    //     console.log(array);
    // });
    //TRIAL 2
    // EDITED
    rootref.on('child_added', snap => {
        // let dataSet = [
        //     snap.child("cash_amount").val()];
        // console.log(parseInt(dataSet));
        array.push(parseInt(snap.child("cash_amount").val()))
        let total = array.reduce((a,b)=> a + b,0);
        document.getElementById('numberofmdonation').innerText = total;
        // console.log(total);
        // console.log(array);
    });



//        End
});