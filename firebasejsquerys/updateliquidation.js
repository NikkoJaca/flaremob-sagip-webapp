var config = {
    apiKey: "AIzaSyAsREyRj2u1GDG1sKF1gyAE476u5pp2PxQ",
    authDomain: "flaremob-b55d8.firebaseapp.com",
    databaseURL: "https://flaremob-b55d8.firebaseio.com",
    projectId: "flaremob-b55d8",
    storageBucket: "flaremob-b55d8.appspot.com",
    messagingSenderId: "27793888698"
};
firebase.initializeApp(config);
var database = firebase.database().ref();
const auth = firebase.auth();

var table1 = $('#luquidation').DataTable({
    // bSort: false,
    // _aSortData:true,
    // "scrollY":        "300px",
    "scrollCollapse": true,
    // "info":           true,
    "paging": true,
    dom: 'Bfrtip',
    select: {
        style: 'single'
    },
    
    "pageLength": 3
});

// buttons: [
//     {
//         text: 'Update',
//         action: function ( e, dt, node, config ) {
//             alert( 'Button activated' );
//         },
//         attr: {
//             id: 'seldata'
//         }
//     }

// ],

$('#luquidation tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
        var row =table1.row(this).data();
        let st = row[3];
        let st2 = st.replace('PHP','');
        let st3 = st2.replace(/[*+,?^${}()|[\]\\]/g,'');
        // console.log(row[0]+' '+parseInt(st3));
        document.getElementById("amountdonated").value = parseFloat(st3);
        document.getElementById("donorid").value = row[1];
    }
    else {
        table1.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }


} );
let database2 = firebase.database();
let ref2 = database2.ref('tblDonatedMoney');
let ref3 = database2.ref();
let ref4 = database2.ref();

ref2.on('child_added',snap=>{
    console.log(snap.child("donorId").val());
    ref3.child('tblUsers').orderByChild('donorId').equalTo(snap.child("donorId").val()).once("value",function (snap2) {

        snap2.forEach(function (data) {
            if(snap2.val()){
                console.log(data.child("userId").val());
                let uid = String(data.child("userId").val());
                ref4.child('tblUsers').child(uid).once("value",function (snap3) {
                    // console.log(snap3.val());
                    // console.log(snap3.child('userFname').val());
                    let st = snap.child("totalMoneyDonation").val();
                let st2 = parseInt(st.replace('Php ',''));
                let g = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(st2);
                let fname = snap3.child('userFname').val();
                let lname = snap3.child('userLname').val();
                let name = fname+' '+lname;
                let dataset = [snap.child('dateTimePledge').val(),snap.child("donorId").val(),name, g];
                table1.rows.add([dataset]).draw();



                    // snap3.forEach(function (data2) {
                    //     if(snap3.val()){
                    //         console.log(data2.val());
                    //         ref5.child('').child(uid).child('userFname').once("value",function (snap4) {
                    //
                    //         })
                    //     }
                    // })
                });
            }
        })
    });
});

// ref2.on('child_added',snap =>{
//
//     ref3.child('tblUsers').orderByChild('donorId').equalTo(snap.child("donorId").val()).once("value", function(snapshot) {
//         snapshot.forEach(function(data) {
//             if(snapshot.val()){
//                 console.log(snapshot.val());
//                 let st = snap.child("totalMoneyDonation").val();
//                 let st2 = parseInt(st.replace('Php ',''));
//                 let g = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(st2);
//                 let fname = data.child('userFname').val();
//                 let lname = data.child('userLname').val();
//                 let name = fname+' '+lname;
//                 let dataset = [snap.child("donorId").val(),name,snap.child('datetimePledge').val(), g];
//                 table1.rows.add([dataset]).draw();
//             }
//         });
//
//
//
//     });
// });


// function updateluiqui() {
//     var database = firebase.database().ref("tblLiquidation");
//     let array = [];
//     const auth = firebase.auth();
//     // let valuecheck = [];
//     var spent = document.getElementById('spent').value;
//
//     // let image = document.getElementById('spent').value;
//     let breakdown = document.getElementById('breakdown5').value;
//     database.push({
//         TotalSpent:spent,
//         imgrecipt:"sample",
//         breakdown:breakdown
//     });
//     // $("input:checkbox[name=someSwitchOption002]:checked").each(function(){
//     //     valuecheck.push($(this).val());
//     // });
//     // liquidation.orderByChild('amountDonated').on('child_added',snap=>{
//     //     console.log(snap.key);
//     //     let total = parseInt(snap.child('amountDonated').val())-spent ;
//     //     console.log(total);
//     // });
//     // liquidation.orderByChild("datetimePledge").limitToFirst(5).once("value")
//     //     .then(function (snap) {
//     //         console.log(snap.val());
//     //     })
//
// }

var selectedFile = null;
var extFile = null;
var selectedFile = null;
var extFile = null;
function AdminOpenImage(event){
    selectedFile = event.target.files[0]; 
    var reader = new FileReader();
  
    var imgtag = document.getElementById("AdminImg");
    imgtag.title = selectedFile.name; //gets the file name
  
    reader.onload = function(event) {
    imgtag.src = event.target.result;
    }
  
    var fileName=imgtag.title;
    var idxDot = fileName.lastIndexOf(".") + 1;
    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      if (selectedFile.size>2097152){
        alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
        FileOpenReset();
      }else{
        if (imgtag.title!='no_image.png'){
          reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
          //alert('new image selected.');
          admintxtCompareName.value=DateTimeNow(9);
        }else{
          alert('Please choose an image other than the default image.');
          FileOpenReset();
        }
      }
    }else{
      alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
      FileOpenReset();
    }
  
    function FileOpenReset(){
      document.getElementById('AdminImageOpen').value='';
      document.getElementById('AdminImg').src='no_image.png';
    }
  }

  function updateluiqui(){
    var FBStore=firebase.storage().ref();

    var metaData={contentType: 'image/'+extFile, name:admintxtCompareName.value};
    var confMsg = confirm("Are you sure your data is correct?");
      let breakdown = document.getElementById('breakdown5').value;
      let spent = document.getElementById('spent').value;
      let donor_id = document.getElementById('donorid').value;
      let amountdonated = document.getElementById('amountdonated').value;
      let amountLeft = parseFloat(amountdonated) - parseFloat(spent);

      if(confMsg){
        firebase.auth().onAuthStateChanged(function(user) {
          var user = firebase.auth().currentUser;
          var uid = String(user.uid);

          if (user) {

              var refFBStore=FBStore.child('liquidation/'+admintxtCompareName.value).put(selectedFile,metaData)
              .then(snapshot => {
                var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                span1.innerHTML='Progress: '+progress;
                return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
            })

            .then(downloadURL => {

				// let image = document.getElementById('spent').value;

                if(breakdown || spent || donor_id || amountdonated){
                    if(amountLeft<0){
                        var database = firebase.database().ref("tblLiquidation");

                        database.push({
                            breakdown:breakdown,
                            amountSpent:spent,
                            donorId:donor_id,
                            amountLeft:0,
                            amountDonated:amountdonated,
                            imageUrl:downloadURL,
                            datetimePledge:getDate()

                        }).then(function() {
                            alert("Successfully created account!");
                        });
                    }else{
                        var database = firebase.database().ref("tblLiquidation");

                        database.push({
                            breakdown:breakdown,
                            amountSpent:spent,
                            donorId:donor_id,
                            amountLeft:amountLeft,
                            amountDonated:amountdonated,
                            imageUrl:downloadURL,
                            datetimePledge:getDate()


                        }).then(function() {
                            alert("Successfully created account!");
                        });
                    }
                }else{
                    alert("Fill up blank/s");
                }


              console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
              window.location.reload();
              return downloadURL;
            })

            .catch(error => {
              // Use to signal error if something goes wrong.
              console.log(`Failed to upload file and get link - ${error}`);
            });
          }else{
            alert("No user signed in!");
          }
        });
      }else{
        alert("Cancelled!");
      }

    }


function getDate(){
    var datetoday=new Date();
    var year=datetoday.getFullYear(); // 0
    var mon=datetoday.getMonth()+1; // 1
    var dayno=datetoday.getDate(); // 2
    var hour=datetoday.getHours(); // 3
    var min=datetoday.getMinutes(); // 4
    var sec=datetoday.getSeconds(); // to be used in option 8
    var milsec=datetoday.getMilliseconds();

    if (mon<10){
        mon = "0"+mon;
    }
    if (dayno<10){
        dayno = "0"+dayno;
    }
    if (hour<10){
        hour = "0"+hour;
    }
    if (min<10){
        min = "0"+min;
    }
    if (sec<10){
        sec = "0"+sec;
    }
    return year+"-"+mon+"-"+dayno+" "+hour+":"+min+":"+sec;
}


function DateTimeNow(Zero29){
    var datetoday=new Date();
    var year=datetoday.getFullYear(); // 0
    var mon=datetoday.getMonth(); // 1
    var dayno=datetoday.getDate(); // 2
    var hour=datetoday.getHours(); // 3
    var min=datetoday.getMinutes(); // 4
    var sec=datetoday.getSeconds(); // to be used in option 8
    var milsec=datetoday.getMilliseconds();

    if (mon<10){mon='0'+String(mon);}
    if (dayno<10){dayno='0'+String(dayno);}
    if (hour<10){hour='0'+String(hour);}
    if (min<10){min='0'+String(min);}
    if (sec<10){sec='0'+String(sec);}
    if (milsec<10){milsec='00'+String(milsec);}
    else if(milsec<100){milsec='0'+String(milsec);}

    var date=String(year+'-'+mon+'-'+dayno); // 5
    var YearMon=String(year+'-'+mon); // 6
    var time=String(hour+':'+min); // 7
    var ISDateTime=String(date+' '+time+':'+sec);
    var AutoID=String(year+''+mon+''+dayno+''+hour+''+min+''+sec+''+milsec);

    if (Zero29==0){ return year;
    }else if(Zero29==1){ return mon;
    }else if(Zero29==2){ return dayno;
    }else if(Zero29==3){ return hour;
    }else if(Zero29==4){ return min;
    }else if(Zero29==5){ return date; //returns YYYY-MM-DD
    }else if(Zero29==6){ return YearMon; //returns YYYY-MM
    }else if(Zero29==7){ return time; //returns hh:mm
    }else if(Zero29==8){ return ISDateTime; //returns YYYY-MM-DD hh:mm:ss
    }else if(Zero29==9){ return AutoID; //returns YYYYMMDDhhmmssiii
    }else{ return date+' '+time;} //returns YYYY-MM-DD hh:mm
}
