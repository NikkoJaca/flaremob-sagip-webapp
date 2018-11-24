$(document).ready(function () {
    //TRIAL 1
    let array = [];
    const rootref = firebase.database().ref().child('tblDonatedMoney');
    const rootref2 = firebase.database().ref().child('tblLiquidation/BreaknTotal');
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
    rootref2.on('child_added',snap=>{
        let luqui = snap.child('TotalSpent');
    });
    rootref.on('child_added', snap => {
        // let dataSet = [
        //     snap.child("cash_amount").val()];
        // console.log(parseInt(dataSet));
        // console.log(snap.child("total_money_denomination").val())
        console.log(snap.child("totalMoneyDonation").val());
        let st = snap.child("totalMoneyDonation").val();
        array.push(parseInt(st.replace('Php ','')));
        // array.push(parseInt(toString(snap.child("total_money_denomination").val())))
        let total1 = array.reduce((a,b)=> a + b,0);
        // console.log("BALANCE");
        // console.log(total);
        // console.log("BALANCE");
        let g = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(total1);
        document.getElementById('numberofmdonation').innerText = g;
        // console.log(total);
        // console.log(array);
    });



//        End
});