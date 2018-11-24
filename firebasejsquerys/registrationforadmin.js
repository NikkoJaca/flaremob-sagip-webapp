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
// function addtobrgy() {
//     let firstname = document.getElementById("fname").value;
//     let lastname = document.getElementById("lname").value;
//     let contactnum = document.getElementById("contact").value;
//     let email = document.getElementById("emailadd").value;
//     let password = document.getElementById("password").value;
//     let birthday = document.getElementById("birthday").value;
//     var admins = database.child("tblBrgyOff/");
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .catch(function(error) {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             alert("Failure in creating account!", errorMessage);
//             console.log(errorMessage);
//         });
//     admins.push({
//         offFname:firstname,
//         offLname:lastname,
//         offCnum:contactnum,
//         offEmail:email,
//         offBday:birthday,
//         offPassword:password
//     }).then(function() {
//         alert("Successfully created account!");
//     });
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

  function addtobrgy(){
    var FBStore=firebase.storage().ref();  
    
    var metaData={contentType: 'image/'+extFile, name:admintxtCompareName.value};
    var confMsg = confirm("Are you sure your data is correct?");  
    
      if(confMsg){    
        firebase.auth().onAuthStateChanged(function(user) {
          var user = firebase.auth().currentUser;
          // var uid = String(user.uid);
          
          if (user) {
            
              var refFBStore=FBStore.child('adminPictures/'+admintxtCompareName.value).put(selectedFile,metaData)
              .then(snapshot => {
                var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                span1.innerHTML='Progress: '+progress;
                return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
            })
  
            .then(downloadURL => {
                let firstname = document.getElementById("fname").value;
                let lastname = document.getElementById("lname").value;
                let contactnum = document.getElementById("contact").value;
                let email = document.getElementById("emailadd").value;
                let password = document.getElementById("password").value;
                let birthday = document.getElementById("birthday").value;
                var admins = database.child("tblBrgyOff/");
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(function(error) {
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
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // console.log("Login Failed", errorMessage);
                    console.log(user);
                    // alert("Login Success", errorMessage);
                });
                firebase.auth().onAuthStateChanged(function(user) {
                    var user = firebase.auth().currentUser;
                    if(user) {
                        var uid = String(user.uid);
                        console.log(uid);
                        firebase.database().ref('tblBrgyOff').child(uid).set({
                            offFname:firstname,
                            offLname:lastname,
                            offCnum:contactnum,
                            offEmail:email,
                            offBday:birthday,
                            offPassword:password,
                            offImgUrl:downloadURL

                        });


                    }
                });

                // admins.push({
                //     offFname:firstname,
                //     offLname:lastname,
                //     offCnum:contactnum,
                //     offEmail:email,
                //     offBday:birthday,
                //     offPassword:password,
                //     offImgUrl:downloadURL
                // }).then(function() {
                //     alert("Successfully created account!");
                // });
              console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
              // window.location.reload();
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

