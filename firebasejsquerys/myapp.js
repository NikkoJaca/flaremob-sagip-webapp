var config = {
  apiKey: "AIzaSyAsREyRj2u1GDG1sKF1gyAE476u5pp2PxQ",
  authDomain: "flaremob-b55d8.firebaseapp.com",
  databaseURL: "https://flaremob-b55d8.firebaseio.com",
  projectId: "flaremob-b55d8",
  storageBucket: "flaremob-b55d8.appspot.com",
  messagingSenderId: "27793888698"
};
firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database().ref();
const auth = firebase.auth();
// Get a reference to the database service
var donatedItems = database.child("tblDonatedItems/");
var donatedMoney = database.child("tblDonatedMoney/");
var liquidation = database.child("tblLiquidation");

var evacNeeds = firebase.database().ref().child("tblEvacNeeds");
var donation = firebase.database().ref().child("tblDonatedItems");

let ref5 = firebase.database().ref('tblBrgyOff');
let ref6 = firebase.database().ref('tblUsers');
let ref7 = firebase.database().ref('tblDonors');

var table1 = $('#evac_table').DataTable({
  "bPaginate": false,
  "bLengthChange": false,
  "bFilter": true,
  "bInfo": false,
  "searching": false,
  "pageLength": 3});

evacNeeds.on("child_added", snap=>{
  
    var evaccenter = snap.child("evacplace").val();
    var famcount = snap.child("evacFamilyCount").val();
    var needs = snap.child("evacitems").val();

    var userid = snap.child("userid").val();  

    var dataset = [evaccenter,famcount,needs];

    table1.rows.add([dataset]).draw();
  
  });

  var table2 = $('#donation_table').DataTable({
    "scrollCollapse": true,
    "pageLength": 3,    
    "paging": true,
    dom: 'Bfrtip',
    buttons: [
        {extend: 'copy', attr: {id: 'allan'}}, 'csv', 'excel', {
            extend: 'pdf',

        }, 'print'
    ]
});

// donation.on('child_added', snap => {
//     var dataSet = [
//         snap.child("itemCategory").val()+"-"+snap.child("itemSubCategory").val(),
//         snap.child("itemQty").val()+" "+snap.child("itemUnit").val(), 
//         snap.child("itemDescription").val(),
//         snap.child("itemPledgeDate").val()];
//     // console.log(dataSet);
//     table2.rows.add([dataSet]).draw();
// });

//LOGIN
const saveButton = document.querySelector("#saveButton");

function login(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    if (document.querySelector("#loginemail").value == "admin" && document.querySelector("#loginpassword").value == "admin"){
        window.location = "../flaremob-sagip-webapp/index.html";
    } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function () {
            return firebase.auth().signInWithEmailAndPassword(document.querySelector("#loginemail").value,document.querySelector("#loginpassword").value);
        })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        // firebase.auth().signInWithEmailAndPassword(document.querySelector("#loginemail").value, document.querySelector("#loginpassword").value).catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     alert("Username and/or Password is invalid!");
        //     console.log("Login Failed", errorMessage);
        //     console.log(user);
        //
        //     // alert("Login Success", errorMessage);
        // });
    }

    //   const promise = auth.signInWithEmailAndPassword(document.querySelector("#loginemail").value, document.querySelector("#loginpassword").value);
    //   promise.catch(e=> console.log(e.message));

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let n = false;
          ref5.child(user.uid).once('value',snap =>{
            if(snap.val()) {
                window.location = "../flaremob-sagip-webapp/index.html";
            }
          });
          ref6.child(user.uid).once('value',snap =>{
            if(snap.val()){
                window.location = "../flaremob-sagip-webapp/pledging.html";
            }

          });
          ref7.child(user.uid).once('value',snap =>{
              if(snap.val()){
                  window.location = "../flaremob-sagip-webapp/pledging.html";
              }

          });

            console.log(user.uid);
        }
        else {

        }
    });

}



//REGISTRATION
const register = document.querySelector("#register");

function signup() {
  const fname = document.querySelector("#fname");
  const lname = document.querySelector("#lname");
  const organization = document.querySelector("#organization");
  const contact = document.querySelector("#contact");
  const emailadd = document.querySelector("#emailadd");
  const password = document.querySelector("#password");
  const phase = document.querySelector("#phase");
  const birthday = document.querySelector("#birthday");
  
  console.log("Saving user account...");
  var userRef = database.child("tblUsers/"); 
  var donorRef = database.child("tblDonors/");    
  
  firebase.auth().createUserWithEmailAndPassword(emailadd.value, password.value).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Failure in creating account!", errorMessage);
    console.log(errorMessage);
  }).then;

  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    var donorId = DateTimeNow(9);
                  
    if (user) {

      var uid = String(user.uid);
      var userRef2 = database.child("tblDonors/");
        userRef2.child(uid).set({
              donorId:uid,
              donorFname: fname.value,
              donorLname: lname.value,
              donorOrg: organization.value,
              donorCnum: contact.value,
              donorEmail: emailadd.value,
              donorPass: password.value,
              donorImageUrl:"",
              // userPhase: phase.value,
              donorBday: birthday.value
        }).then(function(){
          alert("Successfully created account!");
          location.replace("../flaremob-sagip-webapp/pledging.html");
        }).catch(function(error) {
          alert("Failed!", error);
        });

        donorRef.push({
          donorId: uid,
          donorOrg: organization.value,
          userId: uid
        }).then(function(){
          console.log("Status saved!");
        }).catch(function(error) {
          console.log("Failed!", error);
        });
  
    } else {
      console.log("No User signed in!");
    }
  });
}


function logout(){
  firebase.auth().signOut().then(function() {
    var user = firebase.auth().currentUser;
    alert(user);
    alert('Signed Out');
    window.location.href = "../flaremob-sagip-webapp/login.html";
  }, function(error) {
    console.error('Sign Out Error', error);
  });
}  

var selectedFile = null;
var extFile = null;
var selectedFile = null;
var extFile = null;

function openImage(event){
  selectedFile = event.target.files[0]; 
  var reader = new FileReader();

  var imgtag = document.getElementById("VehicleImg");
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
        txtCompareName.value=imgtag.title;
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
    document.getElementById('ImageOpen').value='';
    document.getElementById('VehicleImg').src='no_image.png';
  }
}

function UploadImage(){
  var FBStore=firebase.storage().ref();  
  
  var metaData={contentType: 'image/'+extFile, name:txtCompareName.value};
  var confMsg = confirm("Are you sure you want to pledge these items?");  
  
    if(confMsg){    
      firebase.auth().onAuthStateChanged(function(user) {
        var user = firebase.auth().currentUser;
        var uid = String(user.uid);
        
        if (user) {
            liquidation.push({
                datetimePledge: getDate(),
                amountDonated: document.getElementById("cash_amount").value,
                imageUrl:"",
                amountLeft:0,
                amountSpent:0,
                breakdown:""
            });
            var refFBStore=FBStore.child('upload_img/'+txtCompareName.value).put(selectedFile,metaData)
            .then(snapshot => {
              var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
              span1.innerHTML='Progress: '+progress;
              return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
          })

          .then(downloadURL => {
            donatedMoney.push({
              donorId: uid,
              totalMoneyDonation: document.getElementById("cash_amount").value,
              datetimePledge: getDate(),
              imageUrl: downloadURL
            }).then(function(){
              console.log("Donated money saved!");
            }).catch(function(error) {
              console.log("Failed!", error);
            });
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


      function ClothesOpenImage(event){
        selectedFile = event.target.files[0]; 
        var reader = new FileReader();
      
        var imgtag = document.getElementById("ClothesImg");
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
              clothestxtCompareName.value=imgtag.title;
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
          document.getElementById('ClothesImageOpen').value='';
          document.getElementById('ClothesImg').src='no_image.png';
        }
      }
  
      function clothes(){
        var FBStore=firebase.storage().ref();  
        
        var metaData={contentType: 'image/'+extFile, name:clothestxtCompareName.value};
        var confMsg = confirm("Are you sure you want to pledge these items?");  
        
          if(confMsg){    
            firebase.auth().onAuthStateChanged(function(user) {
              var user = firebase.auth().currentUser;
              var uid = String(user.uid);
              
              if (user) {
                
                  var refFBStore=FBStore.child('donatedItems/'+clothestxtCompareName.value).put(selectedFile,metaData)
                  .then(snapshot => {
                    var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                    span1.innerHTML='Progress: '+progress;
                    return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                })
      
                .then(downloadURL => {
                    donatedItems.push({
                      donorId: uid,
                      itemCategory: "Clothes",              
                      itemSubCategory: "",
                      itemDescription: document.getElementById("cl_d").value,
                      imageUrl: downloadURL,              
                      itemUnit: "Pieces",
                      itemQty: document.getElementById("cl_q").value,
                      itemPledgeDate: getDate(),
                      itemStatus: 0,
                      delPick: "",
                      delDrop: "",
                      srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                      srcLat: "14.673341",
                      srcLng: "121.1086335",
                      delStatus: 0,
                      tLocId: "",
                      vhcId:""
                    }).then(function(){
                      console.log("Status saved!");
                    }).catch(function(error) {
                      console.log("Failed!", error);
                    });
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


    function FoodOpenImage(event){
      selectedFile = event.target.files[0]; 
      var reader = new FileReader();
    
      var imgtag = document.getElementById("FoodImg");
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
            foodtxtCompareName.value=imgtag.title;
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
        document.getElementById('FoodImageOpen').value='';
        document.getElementById('FoodImg').src='no_image.png';
      }
    }

    function food(){
      var FBStore=firebase.storage().ref();  
      
      var metaData={contentType: 'image/'+extFile, name:foodtxtCompareName.value};
      var confMsg = confirm("Are you sure you want to pledge these items?");  
      
        if(confMsg){    
          firebase.auth().onAuthStateChanged(function(user) {
            var user = firebase.auth().currentUser;
            var uid = String(user.uid);
            
            if (user) {
              
                var refFBStore=FBStore.child('donatedItems/'+foodtxtCompareName.value).put(selectedFile,metaData)
                .then(snapshot => {
                  var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                  span1.innerHTML='Progress: '+progress;
                  return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
              })
    
              .then(downloadURL => {
                if(document.getElementById("cg").checked==true){
                  if (document.getElementById("cg_d").value != "" && document.getElementById("cg_q").value != "") {                  
                    
                  donatedItems.push({
                      donorId: uid,
                      itemCategory: "Food",
                      itemSubCategory: "Canned Goods",
                      itemDescription: document.getElementById("cg_d").value,
                      imageUrl: downloadURL,                
                      itemUnit: "Pieces",
                      itemQty: document.getElementById("cg_q").value,
                      itemPledgeDate: getDate(),
                      itemStatus: 0,
                      delPick: "",
                      delDrop: "",
                      srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                      srcLat: "14.673341",
                      srcLng: "121.1086335",
                      delStatus: 0,
                      tLocId: "",
                      vhcId:""
                  }).then(function(){
                    console.log("Status saved!");
                  }).catch(function(error) {
                    console.log("Failed!", error);
                  });
                }else{
                  alert("Please complete the fields");                
                }
              }
              if(document.getElementById("in").checked==true){
                if (document.getElementById("in_d").value != "" && document.getElementById("in_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Food",
                    itemSubCategory: "Instant Noodles",
                    itemDescription: document.getElementById("in_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Pieces",
                    itemQty: document.getElementById("in_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  alert("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("r").checked==true){
                if (document.getElementById("r_d").value != "" && document.getElementById("r_q").value != "" && document.getElementById("r_u").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Food",              
                    itemSubCategory: "Rice",
                    itemDescription: document.getElementById("r_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: document.getElementById("r_u").value,
                    itemQty: document.getElementById("r_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  alert("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("of").checked==true){
                if (document.getElementById("of_d").value != "" && document.getElementById("of_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Food",
                    itemSubCategory: "Other Food",
                    itemDescription: document.getElementById("of_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Pieces",
                    itemQty: document.getElementById("of_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  alert("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
                
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

    function MedicineOpenImage(event){
      selectedFile = event.target.files[0]; 
      var reader = new FileReader();
    
      var imgtag = document.getElementById("MedicineImg");
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
            medicinetxtCompareName.value=imgtag.title;
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
        document.getElementById('MedicineImageOpen').value='';
        document.getElementById('MedicineImg').src='no_image.png';
      }
    }

    function medicine(){
      var FBStore=firebase.storage().ref();  
      
      var metaData={contentType: 'image/'+extFile, name:medicinetxtCompareName.value};
      var confMsg = confirm("Are you sure you want to pledge these items?");  
      
        if(confMsg){    
          firebase.auth().onAuthStateChanged(function(user) {
            var user = firebase.auth().currentUser;
            var uid = String(user.uid);
            
            if (user) {
              
                var refFBStore=FBStore.child('donatedItems/'+medicinetxtCompareName.value).put(selectedFile,metaData)
                .then(snapshot => {
                  var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                  span1.innerHTML='Progress: '+progress;
                  return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
              })
    
              .then(downloadURL => {
                if(document.getElementById("otccap").checked==true){
                  if (document.getElementById("otccap_d").value != "" && document.getElementById("otccap_q").value != "") {                  
                    
                  donatedItems.push({
                      donorId: uid,
                      itemCategory: "Medicine",
                      itemSubCategory: document.getElementById("otccap").value,
                      itemDescription: document.getElementById("otccap_d").value,
                      imageUrl: downloadURL,                
                      itemUnit: "Boxes",
                      itemQty: document.getElementById("otccap_q").value,
                      itemPledgeDate: getDate(),
                      itemStatus: 0,
                      delPick: "",
                      delDrop: "",
                      srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                      srcLat: "14.673341",
                      srcLng: "121.1086335",
                      delStatus: 0,
                      tLocId: "",
                      vhcId:""
                  }).then(function(){
                    console.log("Status saved!");
                  }).catch(function(error) {
                    console.log("Failed!", error);
                  });
                }else{
                  alert("Please complete the fields");                
                }
              }
              if(document.getElementById("otctab").checked==true){
                if (document.getElementById("otctab_d").value != "" && document.getElementById("otctab_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Medicine",
                    itemSubCategory: document.getElementById("otctab").value,
                    itemDescription: document.getElementById("otctab_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Boxes",
                    itemQty: document.getElementById("otctab_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                  window.location.reload();            
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("otcsyr").checked==true){
                if (document.getElementById("otcsyr_d").value != "" && document.getElementById("otcsyr_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Medicine",
                    itemSubCategory: document.getElementById("otcsyr").value,
                    itemDescription: document.getElementById("otcsyr_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Bottles",
                    itemQty: document.getElementById("otcsyr_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                  window.location.reload();            
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("om").checked==true){
                if (document.getElementById("om_d").value != "" && document.getElementById("om_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Medicine",
                    itemSubCategory: document.getElementById("om").value,
                    itemDescription: document.getElementById("om_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Pieces",
                    itemQty: document.getElementById("om_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                  window.location.reload();            
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
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


    function ToiletriesOpenImage(event){
      selectedFile = event.target.files[0]; 
      var reader = new FileReader();
    
      var imgtag = document.getElementById("ToiletriesImg");
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
            toiletriestxtCompareName.value=imgtag.title;
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
        document.getElementById('ToiletriesImageOpen').value='';
        document.getElementById('ToiletriesImg').src='no_image.png';
      }
    }


    function toiletries(){
      var FBStore=firebase.storage().ref();  
      
      var metaData={contentType: 'image/'+extFile, name:toiletriestxtCompareName.value};
      var confMsg = confirm("Are you sure you want to pledge these items?");  
      
        if(confMsg){    
          firebase.auth().onAuthStateChanged(function(user) {
            var user = firebase.auth().currentUser;
            var uid = String(user.uid);
            
            if (user) {
              
                var refFBStore=FBStore.child('donatedItems/'+toiletriestxtCompareName.value).put(selectedFile,metaData)
                .then(snapshot => {
                  var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                  span1.innerHTML='Progress: '+progress;
                  return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
              })
    
              .then(downloadURL => {
                if(document.getElementById("sha").checked==true){
                  if (document.getElementById("sha_d").value != "" && document.getElementById("sha_u").value != ""&& document.getElementById("sha_q").value != "") {                  
                    
                  donatedItems.push({
                      donorId: uid,
                      itemCategory: "Toiletries",
                      itemSubCategory: document.getElementById("sha").value,
                      itemDescription: document.getElementById("sha_d").value,
                      imageUrl: downloadURL,                
                      itemUnit: document.getElementById("sha_u").value,
                      itemQty: document.getElementById("sha_q").value,
                      itemPledgeDate: getDate(),
                      itemStatus: 0,
                      delPick: "",
                      delDrop: "",
                      srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                      srcLat: "14.673341",
                      srcLng: "121.1086335",
                      delStatus: 0,
                      tLocId: "",
                      vhcId:""
                  }).then(function(){
                    console.log("Status saved!");
                  }).catch(function(error) {
                    console.log("Failed!", error);
                  });
                }else{
                  alert("Please complete the fields");                
                }
              }
              if(document.getElementById("soap").checked==true){
                if (document.getElementById("soap_d").value != "" && document.getElementById("soap_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Toiletries",              
                    itemSubCategory: document.getElementById("soap").value,
                    itemDescription: document.getElementById("soap_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Bars",
                    itemQty: document.getElementById("soap_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("tb").checked==true){
                if (document.getElementById("tb_d").value != "" && document.getElementById("tb_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Toiletries",              
                    itemSubCategory: document.getElementById("tb").value,
                    itemDescription: document.getElementById("tb_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Pieces",
                    itemQty: document.getElementById("tb_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("tp").checked==true){
                if (document.getElementById("tp_d").value != "" && document.getElementById("tp_u").value != ""&& document.getElementById("tp_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Toiletries",              
                    itemSubCategory: document.getElementById("tp").value,
                    itemDescription: document.getElementById("tp_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: document.getElementById("tp_u").value,
                    itemQty: document.getElementById("tp_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("deo").checked==true){
                if (document.getElementById("deo_d").value != "" && document.getElementById("deo_q").value != "" && document.getElementById("deo_u").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Toiletries",              
                    itemSubCategory: document.getElementById("deo").value,
                    itemDescription: document.getElementById("deo_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: document.getElementById("deo_u").value,
                    itemQty: document.getElementById("deo_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("sn").checked==true){
                if (document.getElementById("sn_d").value != "" && document.getElementById("sn_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Toiletries",              
                    itemSubCategory: document.getElementById("sn").value,
                    itemDescription: document.getElementById("sn_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Packs",
                    itemQty: document.getElementById("sn_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
              }
              if(document.getElementById("ot").checked==true){
                if (document.getElementById("ot_d").value != "" && document.getElementById("ot_q").value != "") {                  
                  
                donatedItems.push({
                    donorId: uid,
                    itemCategory: "Toiletries",              
                    itemSubCategory: document.getElementById("ot").value,
                    itemDescription: document.getElementById("ot_d").value,
                    imageUrl: downloadURL,              
                    itemUnit: "Pieces",
                    itemQty: document.getElementById("ot_q").value,
                    itemPledgeDate: getDate(),
                    itemStatus: 0,
                    delPick: "",
                    delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                    delStatus: 0,
                    tLocId: "",
                    vhcId:""
                }).then(function(){
                  console.log("Status saved!");
                }).catch(function(error) {
                  console.log("Failed!", error);
                });
              }else{
                alert("Please complete the fields");                
              }
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


    function OthersOpenImage(event){
      selectedFile = event.target.files[0]; 
      var reader = new FileReader();
    
      var imgtag = document.getElementById("OthersImg");
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
            otherstxtCompareName.value=imgtag.title;
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
        document.getElementById('OthersImageOpen').value='';
        document.getElementById('OthersImg').src='no_image.png';
      }
    }

    function others(){
      var FBStore=firebase.storage().ref();  
      
      var metaData={contentType: 'image/'+extFile, name:otherstxtCompareName.value};
      var confMsg = confirm("Are you sure you want to pledge these items?");  
      
        if(confMsg){    
          firebase.auth().onAuthStateChanged(function(user) {
            var user = firebase.auth().currentUser;
            var uid = String(user.uid);
            
            if (user) {
              
                var refFBStore=FBStore.child('donatedItems/'+otherstxtCompareName.value).put(selectedFile,metaData)
                .then(snapshot => {
                  var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                  span1.innerHTML='Progress: '+progress;
                  return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
              })
    
              .then(downloadURL => {
                if (document.getElementById("other_t").value != "" && document.getElementById("other_d").value != "" && document.getElementById("other_d").value !="") {                                    
                donatedItems.push({
                  donorId: uid,
                  itemCategory: "Other Donations",
                  itemSubCategory: document.getElementById("other_t").value,
                  itemDescription: document.getElementById("other_d").value,
                  imageUrl: downloadURL,              
                  itemUnit: "Pieces",
                  itemQty: document.getElementById("other_q").value,
                  itemPledgeDate: getDate(),
                  itemStatus: 0,
                  delPick: "",
                  delDrop: "",
                    srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                    srcLat: "14.673341",
                    srcLng: "121.1086335",
                  delStatus: 0,
                  tLocId: "",
                  vhcId:""
                  
              }).then(function(){
                console.log("Status saved!");
                window.location.reload();            
              }).catch(function(error) {
                console.log("Failed!", error);
              });
            }else{
              alert("Please complete the fields");                
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
function PackOpenImage(event){
    selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById("PackImg");
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
                packtxtCompareName.value=imgtag.title;
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
        document.getElementById('PackImageOpen').value='';
        document.getElementById('PackImg').src='no_image.png';
    }
}

function prepacked(){
    var checkboxes = document.getElementsByName('packeddonation[]');
    var vals = " Each pack contains: ";
    for (var i=0, n=checkboxes.length;i<n;i++)
    {
        if (checkboxes[i].checked && i!=n)
        {
            vals += ","+checkboxes[i].value;
        }else if (checkboxes[i].checked && i==n){
            vals += checkboxes[i].value;
        }
    }
    if (vals) vals = vals.substring(1);
    alert(vals);

    var FBStore=firebase.storage().ref();

    var metaData={contentType: 'image/'+extFile, name:packtxtCompareName.value};
    var confMsg = confirm("Are you sure you want to pledge these items?");

    if(confMsg){
        firebase.auth().onAuthStateChanged(function(user) {
            var user = firebase.auth().currentUser;
            var uid = String(user.uid);

            if (user) {

                var refFBStore=FBStore.child('donatedItems/'+packtxtCompareName.value).put(selectedFile,metaData)
                    .then(snapshot => {
                        var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                        span1.innerHTML='Progress: '+progress;
                        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                    })

                    .then(downloadURL => {
                        donatedItems.push({
                            donorId: uid,
                            itemCategory: "Packed Donation",
                            itemSubCategory: "",
                            itemDescription: vals,
                            imageUrl: downloadURL,
                            itemUnit: "Packs",
                            itemQty: document.getElementById("packquant").value,
                            itemPledgeDate: getDate(),
                            itemStatus: 0,
                            delPick: "",
                            delDrop: "",
                            srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                            srcLat: "14.673341",
                            srcLng: "121.1086335",
                            delStatus: 0,
                            tLocId: "",
                            vhcId:""

                        }).then(function(){
                            console.log("Status saved!");
                            window.location.reload();
                        }).catch(function(error) {
                            console.log("Failed!", error);
                        });
                        console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                        window.location.reload();
                        return downloadURL;
                    }).catch(error => {
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

function WaterOpenImage(event){
    selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById("WaterImg");
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
                watertxtCompareName.value=imgtag.title;
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
        document.getElementById('WaterImageOpen').value='';
        document.getElementById('WaterImg').src='no_image.png';
    }
}

function water(){
    var FBStore=firebase.storage().ref();

    var metaData={contentType: 'image/'+extFile, name:watertxtCompareName.value};
    var confMsg = confirm("Are you sure you want to pledge these items?");

    if(confMsg){
        firebase.auth().onAuthStateChanged(function(user) {
            var user = firebase.auth().currentUser;
            var uid = String(user.uid);

            if (user) {

                var refFBStore=FBStore.child('donatedItems/'+watertxtCompareName.value).put(selectedFile,metaData)
                    .then(snapshot => {
                        var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                        span1.innerHTML='Progress: '+progress;
                        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                    })

                    .then(downloadURL => {
                        if(document.getElementById("bw").checked==true){
                            donatedItems.push({
                                donorId: uid,
                                itemCategory: "Water",
                                itemSubCategory: document.getElementById("bw").value,
                                itemDescription: document.getElementById("bw_d").value,
                                imageUrl: downloadURL,
                                itemUnit: "Bottles",
                                itemQty: document.getElementById("bw_q").value,
                                itemPledgeDate: getDate(),
                                itemStatus: 1,
                                delPick: "",
                                delDrop: "",
                                srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                                srcLat: "14.673341",
                                srcLng: "121.1086335",
                                delStatus: 0,
                                tLocId: "",
                                vhcId:""
                            }).then(function(){
                                console.log("Status saved!");
                            }).catch(function(error) {
                                console.log("Failed!", error);
                            });
                        }
                        if(document.getElementById("jq").checked==true){
                            donatedItems.push({
                                donorId: uid,
                                itemCategory: "Water",
                                itemSubCategory: document.getElementById("jq").value,
                                imageUrl: downloadURL,
                                itemDescription: document.getElementById("jq_d").value,
                                itemUnit: "Jug",
                                itemQty: document.getElementById("jq_q").value,
                                itemPledgeDate: getDate(),
                                itemStatus: 1,
                                delPick: "",
                                delDrop: "",
                                srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                                srcLat: "14.673341",
                                srcLng: "121.1086335",
                                delStatus: 0,
                                tLocId: "",
                                vhcId:""
                            }).then(function(){
                                console.log("Status saved!");
                            }).catch(function(error) {
                                console.log("Failed!", error);
                            });
                        }
                        if(document.getElementById("pergallon").checked==true){
                            donatedItems.push({
                                donorId: uid,
                                itemCategory: "Water",
                                itemSubCategory: document.getElementById("pergallon").value,
                                imageUrl: downloadURL,
                                itemDescription: document.getElementById("gallons_d").value,
                                itemUnit: "Gallons",
                                itemQty: document.getElementById("gallons_q").value,
                                itemPledgeDate: getDate(),
                                itemStatus: 1,
                                delPick: "",
                                delDrop: "",
                                srcLoc: "Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines",
                                srcLat: "14.673341",
                                srcLng: "121.1086335",
                                delStatus: 0,
                                tLocId: "",
                                vhcId:""
                            }).then(function(){
                                console.log("Status saved!");
                            }).catch(function(error) {
                                console.log("Failed!", error);
                            });
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
    return year+"-"+mon+"-"+dayno+" "+hour+":"+min;
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
