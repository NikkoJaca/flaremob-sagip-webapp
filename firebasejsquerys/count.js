// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyC8soYRO3h0rz-uraxBXjGb-QyFPUnw15U",
//     authDomain: "flaremob-alisto1.firebaseapp.com",
//     databaseURL: "https://flaremob-alisto1.firebaseio.com",
//     projectId: "flaremob-alisto1",
//     storageBucket: "flaremob-alisto1.appspot.com",
//     messagingSenderId: "184613341230"
// };
// firebase.initializeApp(config);
//    https://flaremob-alisto1.firebaseio.com/tblDonors

// var upvotesRef = new Firebase('https://flaremob-alisto1.firebaseio.com/tblDonors');
// upvotesRef.transaction(function (current_value) {
//     return (current_value || 0) + 1;
//
// });
// var ref = firebase.app().database().ref();
// ref.once('tbldonors').then(function (snap) {
//    console.log('snap.val()',snap.val())
// });
// var ref = firebase.database().ref()
// ref.child("tbldonateditems").on("value", function(snapshot) {
//     alert(console.log("There are "+snapshot.numChildren()+" messages"));
// }
database = firebase.database();
var ref = database.ref('tblDonatedItems');
var ref2 = database.ref('tblDonors');
var ref3 = database.ref('tblDonatedItems');
let cref5 = database.ref('tblUsers');
let countnes=0;
let countacc=0;
let countnhs=0;
let count = 0;
cref5.on('child_added',function (snap) {
    let evacStatus = snap.child("evacStatus").val();

        if (evacStatus!=0){
            
            var evacId = snap.child("userEvacId").val();

            var evacAssign = "";

            if (evacId == "TLOC20181023070849440"){
                evacAssign = "Nangka High School"
                countnhs+=1;
                count += 1;
                
            }
            else if (evacId == "TLOC20181023071503704"){
                evacAssign = "Ateneoville"
                countacc+=1;
                count += 1;
                
            }
            else if(evacId == "TLOC20181023070504196"){
                evacAssign = "Nangka Elementary School";
                countnes+=1;
                count += 1;
                
            }else{
                evacAssign = "Not Assigned to any Evacuation Center";
            }
        }
      
      document.getElementById('totalevacueesindex').innerText = count;
    });

let delcount = 0;
ref.on('value',gotData,errData);
ref2.on('value',gotData2,errData);
// ref3.on('value',gotData3,errData);
ref3.on('child_added', snap => {
    let status = snap.child("delStatus").val();
    if(status=='1'){
        delcount +=1;
        console.log(delcount);
        document.getElementById('deliverymade').innerText = delcount;
    }
});


function gotData(data) {
    // console.log(data.val())
    var name = data.val();
    var keys = Object.keys(name);
    // console.log(keys)
    var numofitems = keys.length;
    // console.log(numofitems);
    document.getElementById('donateditem').innerText = numofitems;
}
function gotData2(data) {
    // console.log(data.val())
    var name = data.val();
    var keys = Object.keys(name);
    // console.log(keys)
    var numofitems = keys.length;
    // console.log(numofitems);
    document.getElementById('donors').innerText = numofitems;
}
// function gotData3(data) {
//     // console.log(data.val())
//     var name = data.val();
//     var keys = Object.keys(name);
//     // console.log(keys)
//     var numofitems = keys.length;
//     // console.log(numofitems);
//     document.getElementById('deliverymade').innerText = numofitems;
// }
function errData(err) {
    console.log('Error!');
    console.log(err);
}