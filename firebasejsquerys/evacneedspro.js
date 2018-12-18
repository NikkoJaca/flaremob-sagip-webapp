$(document).ready(function () {
    let locations10 = firebase.database().ref("tblTargetLoc");
    locations10.on("child_added", snap => {
        console.log(snap.key);
        console.log(snap.child("tLocName").val());
        let lockey = snap.key;
        let locname = snap.child("tLocName").val();
        let evaccenter = document.getElementById('evaccenter');
        evaccenter.options[evaccenter.options.length] = new Option(locname, lockey);

    });
    // let str1 = "ThIs Is A Test On HOW tO counT UppeR CaSE";
    // alert(str1.replace(/[^A-Z]/g, "").length);
});

function submit() {
    // var config = {
    //     apiKey: "AIzaSyAsREyRj2u1GDG1sKF1gyAE476u5pp2PxQ",
    //     authDomain: "flaremob-b55d8.firebaseapp.com",
    //     databaseURL: "https://flaremob-b55d8.firebaseio.com",
    //     projectId: "flaremob-b55d8",
    //     storageBucket: "flaremob-b55d8.appspot.com",
    //     messagingSenderId: "27793888698"
    // };
    // firebase.initializeApp(config);
    // Get a reference to the database service
    var database = firebase.database().ref();
    var evacneeds = database.child("tblEvacNeeds/");
    let valuecheck = [];
    let final = "";
    //start of problem

    //end of start of problem
    var famcount = document.getElementById('familycount').value;
    var getevac = document.getElementById('evaccenter').value;

    if (famcount <= 0) {
        alert("Please indicate all of the required fields with appropriate values.");
    } else {
        $("input:checkbox[name=someSwitchOption001]:checked").each(function () {
            valuecheck.push($(this).val());
        });
        //start of problem2
        let locations10 = firebase.database().ref("tblTargetLoc");
        locations10.on("child_added", snap => {
            var str = snap.child("tLocName").val();
            var sL = str.length;
            var i = 0;
            let arr = [];
            for (; i < sL; i++) {
                if (str.charAt(i) === str.charAt(i).toUpperCase()) {
                    if (str.charAt(i) !== " ") {
                        console.log('uppercase:', str.charAt(i));
                        arr.push(str.charAt(i));
                        console.log(arr);
                    }

                }
            }
            let joinedar = arr.join();
            console.log(joinedar.replace(/[, ]+/g, "").trim());
            let final = joinedar.replace(/[, ]+/g, "").trim();
            console.log(arr.join());
            locations10.child(getevac).once("value", snap3 => {
                console.log(snap3.child("tLocName").val());
                if (snap3.child("tLocName").val() === str) {
                    evacneeds.child(final).set({
                        evacFamilyCount: famcount,
                        evacitems: valuecheck,
                        evacplace: str
                    });
                }
            });
        });
        alert("Evacuation needs has been successfully set!");
        $("#evac_needs").modal("hide");
        //end of problem2
    }







    // alert(valuecheck);
    // alert(famcount);
    // alert(getevac);
    // let locations10 = firebase.database().ref("tblTargetLoc");
    // locations10.on("child_added", snap => {
    //
    // });
    // if(getevac=="Nangka Elementary School"){
    //     evacneeds.child("NES").set({
    //         evacFamilyCount: famcount,
    //         evacitems: valuecheck,
    //         evacplace: getevac
    //     });
    // }else if(getevac=="St. Mary Elementary School"){
    //     evacneeds.child("SMES").set({
    //         evacFamilyCount: famcount,
    //         evacitems: valuecheck,
    //         evacplace: getevac
    //     });
    // }else if(getevac=="Ateneoville Covered Court"){
    //     evacneeds.child("ACC").set({
    //         evacFamilyCount: famcount,
    //         evacitems: valuecheck,
    //         evacplace: getevac
    //     });
    // }

    // evacneeds.push({
    //
    // });
}
// function submit(){
//     // firebase.auth().onAuthStateChanged(function (user) {
//     //     //$("input:checkbox[name=type]:checked").each(function(){
//     //     //     yourArray.push($(this).val());
//     //     // });
//     //     //var checkedValue = document.querySelector('.messageCheckbox:checked').value;
//     //
//     //
//     //     if (user){
//     //
//     //     }else {
//     //         window.location = "../alisto/login.html";
//     //     }
//     // });


//     // console.log(valuecheck);
//     // console.log(famcount);
//     // console.log(getevac);
//     evacneeds.push({
//         evacFamilyCount:famcount,
//         evacitems:valuecheck,
//         evacplace:getevac
//     });
//     alert("Evac Need submit");
//
// }