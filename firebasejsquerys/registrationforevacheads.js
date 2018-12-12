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
let select = document.getElementById("evacheadcenter");
let locations1 = firebase.database().ref("tblTargetLoc");
var myobject = {
    ValueA : 'Text A',
    ValueB : 'Text B',
    ValueC : 'Text C'
};
let locarray = [];
locations1.on("child_added",snap=>{
    console.log(snap.key);
    console.log(snap.child("tLocName").val());
    let lockey = snap.key;
    let locname = snap.child("tLocName").val();
    let evaccenter = document.getElementById('evacheadcenter');
    evaccenter.options[evaccenter.options.length] = new Option(locname, lockey);
    // locarray.push({
    //     lockey:lockey,
    //     locname:locname
    // });
    // console.log(locarray);
    // for (let key in locarray) {
    //
    //     $('#evacheadcenter').append('<option value=' + locarray[key] + '>' + key + '</option>');
    //
    // }
    // for(indexx in locarray) {
    //     select.options[select.options.length] = new Option(locarray[indexx], indexx);
    // }
});

// for(indexx in myobject) {
//     select.options[select.options.length] = new Option(myobject[indexx], indexx);
// }
// function addtoevachead() {
//     let firstname = document.getElementById("fname").value;
//     let lastname = document.getElementById("lname").value;
//     let contactnum = document.getElementById("contactnum").value;
//     let email = document.getElementById("emailadd").value;
//     let password = document.getElementById("password").value;
//     let tlocid = document.getElementById("evacheadcenter").value;
//     var evachead = database.child("tblEvacHeads/");
//     firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
//         var uid = String(user.uid);
//         var data ={
//                 evhid:uid,
//                 evhFname:firstname,
//                 echLname:lastname,
//                 echLicenseNum:contactnum,
//                 echEmailAdd:email,
//                 echPassword:password,
//                 echtlocid:tlocid
//         };
//         evachead.push(data);

//         // evachead.push({
//         //     evacuid:uid,
//         //     evhFname:firstname,
//         //     echLname:lastname,
//         //     echLicenseNum:contactnum,
//         //     echEmailAdd:email,
//         //     echPassword:password,
//         //     echtlocid:tlocid
//         // }).then(function() {
//         //     alert("Successfully created account!");
//         // });
//     }).catch(function(error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         alert("Failure in creating account!", errorMessage);
//         console.log(errorMessage);
//     });

// }


var selectedFile = null;
var extFile = null;
var selectedFile = null;
var extFile = null;
function EvacHeadOpenImage(event){
    selectedFile = event.target.files[0]; 
    var reader = new FileReader();
  
    var imgtag = document.getElementById("EvacHeadImg");
    imgtag.title = selectedFile.name; //gets the file name
  
    reader.onload = function(event) {
    imgtag.src = event.target.result;
    };
  
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
          evacHeadtxtCompareName.value=DateTimeNow(9);
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
      document.getElementById('EvacHeadImageOpen').value='';
      document.getElementById('EvacHeadImg').src='no_image.png';
    }
  }

  function addtoevachead(){
    var FBStore=firebase.storage().ref();  
    
    var metaData={contentType: 'image/'+extFile, name:evacHeadtxtCompareName.value};
    var confMsg = confirm("Are you sure your data is correct?");  
    
      if(confMsg){    

            
              var refFBStore=FBStore.child('evacHeadPictures/'+evacHeadtxtCompareName.value).put(selectedFile,metaData)
              .then(snapshot => {
                var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                span1.innerHTML='Progress: '+progress;
                return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
            })
  
            .then(downloadURL => {
                let firstname = document.getElementById("fname").value;
                let lastname = document.getElementById("lname").value;
                let contactnum = document.getElementById("contactnum").value;
                let email = document.getElementById("emailadd").value;
                let password = document.getElementById("passwordd").value;
                let tlocid = document.getElementById("evacheadcenter").value;
                var evachead = database.child("tblEvacHeads/");
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {            

                    // }).then(function() {
                    //     alert("Successfully created account!");
                    // });
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // alert("Failure in creating account!", errorMessage);
                    console.log(errorMessage);
                });
                // firebase.auth().signOut().then(function() {
                //     // window.location.href = "../alisto/login.html";
                // }, function(error) {
                //     console.error('Sign Out Error', error);
                // });
                firebase.auth().signOut().then(function() {
                    // window.location.href = "../alisto/login.html";
                }, function(error) {
                    console.error('Sign Out Error', error);
                });
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // console.log("Login Failed", errorMessage);
                    // console.log(user)
                    // alert("Login Success", errorMessage);
                });
                firebase.auth().onAuthStateChanged(function(user) {
                    var user = firebase.auth().currentUser;
                    if(user){
                        var uid = String(user.uid);
                        firebase.database().ref('tblEvacHeads/'+uid).set({
                            echcuid: uid,
                            echFname: firstname,
                            echLname: lastname,
                            echLicenseNum: contactnum,
                            echEmailAdd: email,
                            echPassword: password,
                            echtlocid: tlocid,
                            echImgUrl:downloadURL
                        },function (err) {
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Successful");
                                firebase.auth().signOut().then(function() {
                                    // window.location.href = "../alisto/login.html";
                                }, function(error) {
                                    console.error('Sign Out Error', error);
                                });
                            }
                        });
                        // evachead.push({
                        //     evacuid: uid,
                        //     evhFname: firstname,
                        //     echLname: lastname,
                        //     echLicenseNum: contactnum,
                        //     echEmailAdd: email,
                        //     echPassword: password,
                        //     echtlocid: tlocid
                        // });
                    }
                });

                // var data ={
                //         evhFname:firstname,
                //         echLname:lastname,
                //         echLicenseNum:contactnum,
                //         echEmailAdd:email,
                //         echPassword:password,
                //         echtlocid:tlocid,
                //         echImgUrl:downloadURL
                // };
                // evachead.push(data);
              console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
              // window.location.reload();
              return downloadURL;
            })
  
            .catch(error => {
              // Use to signal error if something goes wrong.
              console.log(`Failed to upload file and get link - ${error}`);
            });

      }else{
        alert("Cancelled!");      
      }
  
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
    