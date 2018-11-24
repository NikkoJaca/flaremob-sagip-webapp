$(document).ready(function () {
    //TRIAL 1
    let array = [];
    let array2 = [];
    let count = 0;
    const rootref = firebase.database().ref().child('tblLiquidation');
    const rootref2 = firebase.database().ref().child('tblDonatedMoney');
    const add = (a,b) => a + b;
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
        // console.log(snap.child("total_money_denomination").val())
        // array.push(snap.child("amountDonated").val());
        // array.push(snap.child("amountSpent").val());
        // array.push(parseInt(toString(snap.child("total_money_denomination").val())))
        // let total = array.reduce((a,b)=> a + b,0);
        rootref2.on('child_added',snap2 => {
            console.log("DONATED MONEY");
            let st = snap2.child("totalMoneyDonation").val();
            let st2 = parseInt(st.replace('Php ',''));
            array2.push(parseInt(st.replace('Php ','')));
            const sum = array2.reduce(add);
            console.log('SUMMARY OF SUM');
            console.log(sum);
            console.log("END DONATED MONEY");
        });
        let uid = snap.key;
        // console.log(uid);
        var query = firebase.database().ref("tblLiquidation");
        // var query2 = firebase.database().ref("tblDonatedMoney");
        // var uref = query2.child("totalMoneyDonation");
        // uref.once("value",function (snap2) {
        //     snap2.forEach(function (child) {
        //         console.log(child.val())
        //     })
        // });
        // let donated = snap.child(("amountDonated")).val();
        // // console.log("Donated Money");
        // // console.log(donated);
        // let spent = snap.child(("amountSpent")).val();
        // // console.log("Spent");
        // // console.log(spent);
        // let total = donated - spent;
        // console.log("Total");
        // console.log(total);
        // console.log(array2);
        const sum2 = array2.reduce(add);
        // query.update({Totalmoneyspent:parseInt(snap.child("TotalSpent").val())});

        array.push(parseInt(snap.child("amountSpent").val()));
        let balance = array.reduce((a,b)=> a + b,0);
        // console.log("Balance");
        // console.log(balance);
        let g = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(balance);
        console.log(g);
        document.getElementById('fundsspent').innerText = g;
        // console.log(total);
        // console.log(array);
        // let total1 = sum2 - balance;
        // let g2 = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(balance);
        // console.log(total1);
        // document.getElementById('moneybalance').innerText = g2;
    });




});