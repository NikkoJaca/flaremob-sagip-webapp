var config = {
  apiKey: "AIzaSyC8soYRO3h0rz-uraxBXjGb-QyFPUnw15U",
  authDomain: "flaremob-alisto1.firebaseapp.com",
  databaseURL: "https://flaremob-alisto1.firebaseio.com",
  projectId: "flaremob-alisto1",
  storageBucket: "flaremob-alisto1.appspot.com",
  messagingSenderId: "184613341230"
};

firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database().ref();
var FBStore=firebase.storage().ref();  

// Get a reference to the database service
var userRef = database.child("users/");  
var donatedItems = database.child("donatedItems/");
var donatedMoney = database.child("donatedMoney/");


//LOGIN
const loginemail = document.querySelector("#loginemail");
const loginpassword = document.querySelector("#loginpassword");
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", function() {
const emaillogin = loginemail.value;
const pwordlogin = loginpassword.value;
console.log("test button");

  firebase.auth().signInWithEmailAndPassword(emaillogin, pwordlogin).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Login Failed", errorMessage);
  });

})

//REGISTRATION
const register = document.querySelector("#register");

function signup() {
  const fname = document.querySelector("#fname");
  const lname = document.querySelector("#lname");
  const organization = document.querySelector("#organization");
  const position = document.querySelector("#position");
  const contact = document.querySelector("#contact");
  const emailadd = document.querySelector("#emailadd");
  const password = document.querySelector("#password");
  console.log("Saving user account...");
  
  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
                  
    if (user) {
      var uid = String(user.uid);
      var userRef = database.child("users/"+uid);     
      if (fname.value!=""&&lname.value!=""&&organization.value!=""&&position.value!=""&&contact.value!=""&&emailadd.value!=""&&password.value!=""){
        userRef.push({
              userFname: fname.value,
              userLname: lname.value,
              userOrg: organization.value,
              userOccupation: position.value,
              userCnum: contact.value,
              userEmail: emailadd.value,
              userPass: password.value  
        }).then(function(){
          console.log("Status saved!");
        }).catch(function(error) {
          console.log("Failed!", error);
        });
      }
      else{
        console.log("Please fill up all fields!", error);
      }
  
    } else {
      console.log("No User signed in!");
    }
  });
  
  firebase.auth().createUserWithEmailAndPassword(emailadd.value, password.value).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Failure in creating account!", errorMessage);
  });
}

function clothes() {
  var quant = document.getElementById('cl_q').value;
  var desc = document.getElementById('cl_d').value;

  var confMsg = confirm("Are you sure you want to pledge these items?");  

  if(confMsg){    
    firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;
      var uid = String(user.uid);
      
      if (user) {
          donatedItems.push({
              donorId: uid,
              itemName: "Clothes",
              itemDesc: desc,
              itemUnit: "Pieces",
              itemQty: quant,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();                        
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    
      } else {
        console.log("No User signed in!");
      }
    });
  }else{
    window.alert("Cancelled");    
  }

}

function food() {
  var cgquant = document.getElementById('cg_q').value;
  var cgdesc = document.getElementById('cg_d').value;
  var inquant = document.getElementById('in_q').value;
  var indesc = document.getElementById('in_d').value;
  var rquant = document.getElementById('r_q').value;
  var runit = document.getElementById('r_u').value;  
  var rdesc = document.getElementById('r_d').value;
  var ofquant = document.getElementById('of_q').value;
  var ofdesc = document.getElementById('of_d').value;
  var confMsg = confirm("Are you sure you want to pledge these items?");

  if(confMsg){
    firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;
      var uid = String(user.uid);

      if (user) {
        if(document.getElementById("cg").checked==true){
            donatedItems.push({
                donorId: uid,
                item_id: DateTimeNow(9),
                itemName: "Canned Goods",
                itemDesc: cgdesc,
                itemUnit: "Pieces",
                itemQty: cgquant,
                itemPledgeDate: getDate(),
                itemStatus: 1
            }).then(function(){
              console.log("Status saved!");
            }).catch(function(error) {
              console.log("Failed!", error);
            });
        }
        if(document.getElementById("in").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: "Instant Noodles",
              item_id: DateTimeNow(9),              
              itemDesc: indesc,
              itemUnit: "Pieces",
              itemQty: inquant,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("r").checked==true){
          donatedItems.push({
              donorId: uid,
              item_id: DateTimeNow(9),              
              itemName: "Rice",
              itemDesc: rdesc,
              itemUnit: runit,
              itemQty: rquant,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("of").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: "Other Food",
              itemDesc: ofdesc,
              item_id: DateTimeNow(9),              
              itemUnit: "Pieces",
              itemQty: ofquant,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        window.location.reload();                    
      }
      else {
        console.log("No User signed in!");
      }

    });
  }else{
    window.alert("Cancelled");
  }

  console.log("Pledge successful");
}

function medicine() {
  var otccap_q = document.getElementById('otccap_q').value;
  var otccap_d = document.getElementById('otccap_d').value;

  var otctab_q = document.getElementById('otctab_q').value;
  var otctab_d = document.getElementById('otctab_d').value;

  var otcsyr_q = document.getElementById('otcsyr_q').value;
  var otcsyr_d = document.getElementById('otcsyr_d').value;

  var rquant = document.getElementById('otccap_q').value;
  var rdesc = document.getElementById('otccap_d').value;

  var vitcap_q = document.getElementById('vitcap_q').value;
  var vitcap_d = document.getElementById('vitcap_d').value;

  var vittab_q = document.getElementById('vittab_q').value;
  var vittab_d = document.getElementById('vittab_d').value;

  var vitsyr_q = document.getElementById('vitsyr_q').value;
  var vitsyr_d = document.getElementById('vitsyr_d').value;

  var cc_q = document.getElementById('cc_q').value;
  var cc_d = document.getElementById('cc_d').value;

  var wc_q = document.getElementById('wc_q').value;
  var wc_d = document.getElementById('wc_d').value;

  var om_q = document.getElementById('om_q').value;
  var om_d = document.getElementById('om_d').value;

  var confMsg = confirm("Are you sure you want to pledge these items?");

  if(confMsg){
    firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;
      var uid = String(user.uid);

      if (user) {
        if(document.getElementById("otccap").checked==true){
            donatedItems.push({
                donorId: uid,
                itemName: document.getElementById("otccap").value,
                itemDesc: otccap_d,
                item_id: DateTimeNow(9),                
                itemUnit: "Boxes",
                itemQty: otccap_q,
                itemPledgeDate: getDate(),
                itemStatus: 1
            }).then(function(){
              console.log("Status saved!");
            }).catch(function(error) {
              console.log("Failed!", error);
            });
        }
        if(document.getElementById("otctab").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("otctab").value,
              itemDesc: otctab_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Boxes",
              itemQty: otctab_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("otcsyr").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("otcsyr").value,
              itemDesc: otcsyr_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Bottles",
              itemQty: otcsyr_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("vitcap").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("vitcap").value,
              itemDesc: vitcap_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Boxes",
              itemQty: vitcap_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("vittab").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("vittab").value,
              itemDesc: ofdesc,
              item_id: DateTimeNow(9),              
              itemUnit: "Boxes",
              itemQty: ofquant,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("vitsyr").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("vitsyr").value,
              itemDesc: vitsyr_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Bottles",
              itemQty: vitsyr_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("cc").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("cc").value,
              itemDesc: cc_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Pieces",
              itemQty: cc_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("wc").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("wc").value,
              itemDesc: wc_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Pieces",
              itemQty: wc_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("om").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("om").value,
              itemDesc: om_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Pieces",
              itemQty: om_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        window.location.reload();                    
      }
      else {
        console.log("No User signed in!");
      }

    });
  }else{
    window.alert("Cancelled");
  }

  console.log("Pledge successful");
}

function others() {
  var other_t = document.getElementById('other_t').value;
  var other_q = document.getElementById('other_q').value;
  var other_d = document.getElementById('other_d').value;  
  var confMsg = confirm("Are you sure you want to pledge these items?");  

  if(confMsg){    
    firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;
      var uid = String(user.uid);
      
      if (user) {
          donatedItems.push({
              donorId: uid,
              itemName: "Other Donation",
              title: other_t,
              item_id: DateTimeNow(9),              
              itemDesc: other_d,
              itemUnit: "Pieces",
              itemQty: other_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
            window.location.reload();            
          }).catch(function(error) {
            console.log("Failed!", error);
          });

          window.location.reload();                      
    
      } else {
        console.log("No User signed in!");
      }
    });
  }else{
    window.alert("Cancelled");    
  }

}

function toiletries() {
  var sha_d = document.getElementById('sha_d').value;
  var sha_u = document.getElementById('sha_u').value;  
  var sha_q = document.getElementById('sha_q').value;

  var soap_d = document.getElementById('soap_d').value;
  var soap_q = document.getElementById('soap_q').value;

  var tb_d = document.getElementById('tb_d').value;
  var tb_q = document.getElementById('tb_q').value;

  var tp_d = document.getElementById('tp_d').value;
  var tp_u = document.getElementById('tp_u').value;  
  var tp_q = document.getElementById('tp_q').value;

  var deo_d = document.getElementById('deo_d').value;
  var deo_u = document.getElementById('deo_u').value;  
  var deo_q = document.getElementById('deo_q').value;

  var sn_d = document.getElementById('sn_d').value;
  var sn_q = document.getElementById('sn_q').value;

  var ot_d = document.getElementById('ot_d').value;
  var ot_q = document.getElementById('ot_q').value;
  
  var confMsg = confirm("Are you sure you want to pledge these items?");  

  if(confMsg){
    firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;
      var uid = String(user.uid);

      if (user) {
        if(document.getElementById("sha").checked==true){
            donatedItems.push({
                donorId: uid,
                itemName: document.getElementById("sha").value,
                itemDesc: sha_d,
                item_id: DateTimeNow(9),                
                itemUnit: sha_u,
                itemQty: sha_q,
                itemPledgeDate: getDate(),
                itemStatus: 1
            }).then(function(){
              console.log("Status saved!");
            }).catch(function(error) {
              console.log("Failed!", error);
            });
        }
        if(document.getElementById("soap").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("soap").value,
              itemDesc: soap_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Bars",
              itemQty: soap_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("tb").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("tb").value,
              itemDesc: tb_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Pieces",
              itemQty: tb_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("tp").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("tp").value,
              itemDesc: tp_d,
              item_id: DateTimeNow(9),              
              itemUnit: tp_u,
              itemQty: tp_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("deo").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("deo").value,
              itemDesc: deo_d,
              item_id: DateTimeNow(9),              
              itemUnit: deo_u,
              itemQty: deo_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("sn").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("sn").value,
              itemDesc: sn_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Packs",
              itemQty: sn_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("ot").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("ot").value,
              itemDesc: ot_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Pieces",
              itemQty: ot_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        window.location.reload();                    
      }
      else {
        console.log("No User signed in!");
      }

    });
  }else{
    window.alert("Cancelled");
  }


}

function water() {
  var bw_q = document.getElementById('bw_q').value;
  var bw_d = document.getElementById('bw_d').value;

  var jw_q = document.getElementById('jq_q').value;
  var jw_d = document.getElementById('jq_d').value;

  var confMsg = confirm("Are you sure you want to pledge these items?");  

  if(confMsg){    
    firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;
      var uid = String(user.uid);
      
      if (user) {
        if(document.getElementById("bw").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("bw").value,
              itemDesc: bw_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Bottles",
              itemQty: bw_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        if(document.getElementById("jq").checked==true){
          donatedItems.push({
              donorId: uid,
              itemName: document.getElementById("jq").value,
              itemDesc: jw_d,
              item_id: DateTimeNow(9),              
              itemUnit: "Jug",
              itemQty: jw_q,
              itemPledgeDate: getDate(),
              itemStatus: 1
          }).then(function(){
            console.log("Status saved!");
          }).catch(function(error) {
            console.log("Failed!", error);
          });
        }
        window.location.reload();                    
      } else {
        console.log("No User signed in!");
      }
    });
  }else{
    window.alert("Cancelled");    
  }

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
  var metaData={contentType: 'image/'+extFile, name:txtCompareName.value};
  var confMsg = confirm("Are you sure you want to pledge these items?");  
  
    if(confMsg){    
      firebase.auth().onAuthStateChanged(function(user) {
        var user = firebase.auth().currentUser;
        var uid = String(user.uid);
        
        if (user) {
            var refFBStore=FBStore.child('upload_img/'+txtCompareName.value).put(selectedFile,metaData)
            .then(snapshot => {
              var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
              span1.innerHTML='Progress: '+progress;
              return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
          })

          .then(downloadURL => {
            donatedMoney.push({
              dm_id: DateTimeNow(9),
              cash_amount: document.getElementById("cash_amount").value,
              moneyPledgeDate: getDate(),
              proofImg: downloadURL
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

  function getDate(){
    var datetoday=new Date();
    var year=datetoday.getFullYear(); // 0
    var mon=datetoday.getMonth()+1; // 1
    var dayno=datetoday.getDate(); // 2
    var hour=datetoday.getHours(); // 3
    var min=datetoday.getMinutes(); // 4
    var sec=datetoday.getSeconds(); // to be used in option 8
    var milsec=datetoday.getMilliseconds();

    return year+"-"+mon+"-"+dayno+" "+hour+":"+min+":"+sec;
  }
    
    
  function DateTimeNow(Zero29){
    var datetoday=new Date();
    var year=datetoday.getFullYear(); // 0
    var mon=datetoday.getMonth()+1; // 1
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
