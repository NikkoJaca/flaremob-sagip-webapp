$(document).ready(function () {
    let array = [];
    const rootref = firebase.database().ref().child('tblLiquidation');
    rootref.on('child_added', snap => {
        array.push(snap.child("amountLeft").val())
        let total = array.reduce((a,b)=> a + b,0);
        document.getElementById('moneybalance').innerText = total;
    });

});