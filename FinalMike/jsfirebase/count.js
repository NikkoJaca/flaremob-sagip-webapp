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
var ref3 = database.ref('tblDelivery');

ref.on('value',gotData,errData);
ref2.on('value',gotData2,errData);
ref3.on('value',gotData3,errData);


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
function gotData3(data) {
    // console.log(data.val())
    var name = data.val();
    var keys = Object.keys(name);
    // console.log(keys)
    var numofitems = keys.length;
    // console.log(numofitems);
    document.getElementById('deliverymade').innerText = numofitems;
}
function errData(err) {
    console.log('Error!');
    console.log(err);
}