
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

// Get a reference to the database service
    var donatedItems = database.child("tblDonatedItems/");
    var donatedMoney = database.child("tblDonatedMoney/");


//LOGIN
    const saveButton = document.querySelector("#saveButton");

    function login() {

// console.log("test button" + emaillogin);

        firebase.auth().signInWithEmailAndPassword(document.querySelector("#loginemail").value, document.querySelector("#loginpassword").value).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Login Failed", errorMessage);
            alert("Login Failed", errorMessage);

        });

    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "index.html";
        }
    });


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

        firebase.auth().onAuthStateChanged(function (user) {
            var user = firebase.auth().currentUser;
            var donorId = DateTimeNow(9);

            if (user) {
                var uid = String(user.uid);
                userRef.push({
                    userId: uid,
                    userFname: fname.value,
                    userLname: lname.value,
                    userOrg: organization.value,
                    userCnum: contact.value,
                    userEmail: emailadd.value,
                    userPass: password.value,
                    userPhase: phase.value,
                    userBday: birthday.value,
                    donorId: uid
                }).then(function () {
                    alert("Successfully created account!");
                    window.location.href = "index.html";
                }).catch(function (error) {
                    alert("Failed!", error);
                });

                donorRef.push({
                    donorId: uid,
                    donorOrg: organization.value,
                    userId: uid
                }).then(function () {
                    console.log("Status saved!");
                }).catch(function (error) {
                    console.log("Failed!", error);
                });

            } else {
                console.log("No User signed in!");
            }
        });

        firebase.auth().createUserWithEmailAndPassword(emailadd.value, password.value).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Failure in creating account!", errorMessage);
        });
    }


    document.getElementById("logout").addEventListener('click', e => {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
            window.location.href = "index.html";
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    });


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

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {
                    if (document.getElementById("cg").checked == true) {
                        donatedItems.push({
                            donorId: uid,
                            itemCategory: "Food",
                            itemSubCategory: "Canned Goods",
                            itemDesc: cgdesc,
                            imgName: "",
                            itemUnit: "Pieces",
                            itemQty: cgquant,
                            itemPledgeDate: getDate(),
                            itemStatus: 1,
                            delPick: "",
                            delDrop: getDate(),
                            srcLoc: "Nangka Baranggay Hall",
                            srcLat: 14.67,
                            srcLng: 121.11,
                            delStatus: 0,
                            tLocId: "",
                            vhcId: ""
                        }).then(function () {
                            console.log("Status saved!");
                        }).catch(function (error) {
                            console.log("Failed!", error);
                        });
                    }
                    if (document.getElementById("in").checked == true) {
                        donatedItems.push({
                            donorId: uid,
                            itemCategory: "Food",
                            itemSubCategory: "Instant Noodles",
                            itemDesc: indesc,
                            imgName: "",
                            itemUnit: "Pieces",
                            itemQty: inquant,
                            itemPledgeDate: getDate(),
                            itemStatus: 1,
                            delPick: "",
                            delDrop: getDate(),
                            srcLoc: "Nangka Baranggay Hall",
                            srcLat: 14.67,
                            srcLng: 121.11,
                            delStatus: 0,
                            tLocId: "",
                            vhcId: ""
                        }).then(function () {
                            console.log("Status saved!");
                        }).catch(function (error) {
                            alert("Failed!", error);
                        });
                    }
                    if (document.getElementById("r").checked == true) {
                        donatedItems.push({
                            donorId: uid,
                            itemCategory: "Food",
                            itemSubCategory: "Rice",
                            itemDesc: rdesc,
                            imgName: "",
                            itemUnit: runit,
                            itemQty: rquant,
                            itemPledgeDate: getDate(),
                            itemStatus: 1,
                            delPick: "",
                            delDrop: getDate(),
                            srcLoc: "Nangka Baranggay Hall",
                            srcLat: 14.67,
                            srcLng: 121.11,
                            delStatus: 0,
                            tLocId: "",
                            vhcId: ""
                        }).then(function () {
                            console.log("Status saved!");
                        }).catch(function (error) {
                            alert("Failed!", error);
                        });
                    }
                    if (document.getElementById("of").checked == true) {
                        donatedItems.push({
                            donorId: uid,
                            itemCategory: "Food",
                            itemSubCategory: "Other Food",
                            itemDesc: ofdesc,
                            imgName: "",
                            itemUnit: "Pieces",
                            itemQty: ofquant,
                            itemPledgeDate: getDate(),
                            itemStatus: 1,
                            delPick: "",
                            delDrop: getDate(),
                            srcLoc: "Nangka Baranggay Hall",
                            srcLat: 14.67,
                            srcLng: 121.11,
                            delStatus: 0,
                            tLocId: "",
                            vhcId: ""
                        }).then(function () {
                            console.log("Status saved!");
                        }).catch(function (error) {
                            alert("Failed!", error);
                        });
                    }
                    window.location.reload();
                }
                else {
                    console.log("No User signed in!");
                }

            });
        } else {
            window.alert("Cancelled");
        }

        console.log("Pledge successful");
    }


    function others() {
        var other_t = document.getElementById('other_t').value;
        var other_q = document.getElementById('other_q').value;
        var other_d = document.getElementById('other_d').value;
        var confMsg = confirm("Are you sure you want to pledge these items?");

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {
                    donatedItems.push({
                        donorId: uid,
                        itemCategory: "Other Donations",
                        itemSubCategory: other_t,
                        itemDesc: other_d,
                        imgName: "",
                        itemUnit: "Pieces",
                        itemQty: other_q,
                        itemPledgeDate: getDate(),
                        itemStatus: 1,
                        delPick: "",
                        delDrop: getDate(),
                        srcLoc: "Nangka Baranggay Hall",
                        srcLat: 14.67,
                        srcLng: 121.11,
                        delStatus: 0,
                        tLocId: "",
                        vhcId: ""
                    }).then(function () {
                        console.log("Status saved!");
                        window.location.reload();
                    }).catch(function (error) {
                        console.log("Failed!", error);
                    });

                    window.location.reload();

                } else {
                    console.log("No User signed in!");
                }
            });
        } else {
            window.alert("Cancelled");
        }

    }

    var selectedFile = null;
    var extFile = null;
    var selectedFile = null;
    var extFile = null;

    function openImage(event) {
        selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("VehicleImg");
        imgtag.title = selectedFile.name; //gets the file name

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        }

        var fileName = imgtag.title;
        var idxDot = fileName.lastIndexOf(".") + 1;
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            if (selectedFile.size > 2097152) {
                alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
                FileOpenReset();
            } else {
                if (imgtag.title != 'no_image.png') {
                    reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
                    //alert('new image selected.');
                    txtCompareName.value = imgtag.title;
                } else {
                    alert('Please choose an image other than the default image.');
                    FileOpenReset();
                }
            }
        } else {
            alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
            FileOpenReset();
        }

        function FileOpenReset() {
            document.getElementById('ImageOpen').value = '';
            document.getElementById('VehicleImg').src = 'no_image.png';
        }
    }

    function UploadImage() {
        var FBStore = firebase.storage().ref();

        var metaData = {contentType: 'image/' + extFile, name: txtCompareName.value};
        var confMsg = confirm("Are you sure you want to pledge these items?");

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {

                    var refFBStore = FBStore.child('upload_img/' + txtCompareName.value).put(selectedFile, metaData)
                        .then(snapshot => {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            span1.innerHTML = 'Progress: ' + progress;
                            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                        })

                        .then(downloadURL => {
                            donatedMoney.push({
                                dm_id: DateTimeNow(9),
                                donor_id: uid,
                                cash_amount: document.getElementById("cash_amount").value,
                                moneyPledgeDate: getDate(),
                                proofImg: downloadURL
                            }).then(function () {
                                console.log("Donated money saved!");
                            }).catch(function (error) {
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
                } else {
                    alert("No user signed in!");
                }
            });
        } else {
            alert("Cancelled!");
        }

    }


    function WaterOpenImage(event) {
        selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("WaterImg");
        imgtag.title = selectedFile.name; //gets the file name

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        }

        var fileName = imgtag.title;
        var idxDot = fileName.lastIndexOf(".") + 1;
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            if (selectedFile.size > 2097152) {
                alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
                FileOpenReset();
            } else {
                if (imgtag.title != 'no_image.png') {
                    reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
                    //alert('new image selected.');
                    watertxtCompareName.value = imgtag.title;
                } else {
                    alert('Please choose an image other than the default image.');
                    FileOpenReset();
                }
            }
        } else {
            alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
            FileOpenReset();
        }

        function FileOpenReset() {
            document.getElementById('WaterImageOpen').value = '';
            document.getElementById('WaterImg').src = 'no_image.png';
        }
    }

    function water() {
        var FBStore = firebase.storage().ref();

        var metaData = {contentType: 'image/' + extFile, name: watertxtCompareName.value};
        var confMsg = confirm("Are you sure you want to pledge these items?");

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {

                    var refFBStore = FBStore.child('donatedItems/' + watertxtCompareName.value).put(selectedFile, metaData)
                        .then(snapshot => {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            span1.innerHTML = 'Progress: ' + progress;
                            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                        })

                        .then(downloadURL => {
                            if (document.getElementById("bw").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Water",
                                    itemSubCategory: document.getElementById("bw").value,
                                    itemDesc: document.getElementById("bw_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Bottles",
                                    itemQty: document.getElementById("bw_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("jq").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Water",
                                    itemSubCategory: document.getElementById("jq").value,
                                    imgName: "",
                                    itemDesc: document.getElementById("jw_d").value,
                                    itemUnit: "Jug",
                                    itemQty: document.getElementById("jw_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
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
                } else {
                    alert("No user signed in!");
                }
            });
        } else {
            alert("Cancelled!");
        }

    }

    function ClothesOpenImage(event) {
        selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("ClothesImg");
        imgtag.title = selectedFile.name; //gets the file name

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        }

        var fileName = imgtag.title;
        var idxDot = fileName.lastIndexOf(".") + 1;
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            if (selectedFile.size > 2097152) {
                alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
                FileOpenReset();
            } else {
                if (imgtag.title != 'no_image.png') {
                    reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
                    //alert('new image selected.');
                    clothestxtCompareName.value = imgtag.title;
                } else {
                    alert('Please choose an image other than the default image.');
                    FileOpenReset();
                }
            }
        } else {
            alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
            FileOpenReset();
        }

        function FileOpenReset() {
            document.getElementById('ClothesImageOpen').value = '';
            document.getElementById('ClothesImg').src = 'no_image.png';
        }
    }

    function clothes() {
        var FBStore = firebase.storage().ref();

        var metaData = {contentType: 'image/' + extFile, name: clothestxtCompareName.value};
        var confMsg = confirm("Are you sure you want to pledge these items?");

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {

                    var refFBStore = FBStore.child('donatedItems/' + clothestxtCompareName.value).put(selectedFile, metaData)
                        .then(snapshot => {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            span1.innerHTML = 'Progress: ' + progress;
                            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                        })

                        .then(downloadURL => {
                            donatedItems.push({
                                donorId: uid,
                                itemCategory: "Clothes",
                                itemSubCategory: "",
                                itemDesc: document.getElementById("cl_d").value,
                                imgName: downloadURL,
                                itemUnit: "Pieces",
                                itemQty: document.getElementById("cl_q").value,
                                itemPledgeDate: getDate(),
                                itemStatus: 1,
                                delPick: "",
                                delDrop: getDate(),
                                srcLoc: "Nangka Baranggay Hall",
                                srcLat: 14.67,
                                srcLng: 121.11,
                                delStatus: 0,
                                tLocId: "",
                                vhcId: ""
                            }).then(function () {
                                console.log("Status saved!");
                            }).catch(function (error) {
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
                } else {
                    alert("No user signed in!");
                }
            });
        } else {
            alert("Cancelled!");
        }

    }


    function FoodOpenImage(event) {
        selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("FoodImg");
        imgtag.title = selectedFile.name; //gets the file name

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        }

        var fileName = imgtag.title;
        var idxDot = fileName.lastIndexOf(".") + 1;
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            if (selectedFile.size > 2097152) {
                alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
                FileOpenReset();
            } else {
                if (imgtag.title != 'no_image.png') {
                    reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
                    //alert('new image selected.');
                    foodtxtCompareName.value = imgtag.title;
                } else {
                    alert('Please choose an image other than the default image.');
                    FileOpenReset();
                }
            }
        } else {
            alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
            FileOpenReset();
        }

        function FileOpenReset() {
            document.getElementById('FoodImageOpen').value = '';
            document.getElementById('FoodImg').src = 'no_image.png';
        }
    }

    function food() {
        var FBStore = firebase.storage().ref();

        var metaData = {contentType: 'image/' + extFile, name: foodtxtCompareName.value};
        var confMsg = confirm("Are you sure you want to pledge these items?");

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {

                    var refFBStore = FBStore.child('donatedItems/' + foodtxtCompareName.value).put(selectedFile, metaData)
                        .then(snapshot => {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            span1.innerHTML = 'Progress: ' + progress;
                            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                        })

                        .then(downloadURL => {
                            if (document.getElementById("cg").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Food",
                                    itemSubCategory: "Canned Goods",
                                    itemDesc: document.getElementById("cg_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Pieces",
                                    itemQty: document.getElementById("cg_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("in").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Food",
                                    itemSubCategory: "Instant Noodles",
                                    itemDesc: document.getElementById("in_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Pieces",
                                    itemQty: document.getElementById("in_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    alert("Failed!", error);
                                });
                            }
                            if (document.getElementById("r").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Food",
                                    itemSubCategory: "Rice",
                                    itemDesc: document.getElementById("r_d").value,
                                    imgName: downloadURL,
                                    itemUnit: document.getElementById("r_u").value,
                                    itemQty: document.getElementById("r_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    alert("Failed!", error);
                                });
                            }
                            if (document.getElementById("of").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Food",
                                    itemSubCategory: "Other Food",
                                    itemDesc: document.getElementById("of_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Pieces",
                                    itemQty: document.getElementById("of_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    alert("Failed!", error);
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
                } else {
                    alert("No user signed in!");
                }
            });
        } else {
            alert("Cancelled!");
        }

    }

    function MedicineOpenImage(event) {
        selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("MedicineImg");
        imgtag.title = selectedFile.name; //gets the file name

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        }

        var fileName = imgtag.title;
        var idxDot = fileName.lastIndexOf(".") + 1;
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            if (selectedFile.size > 2097152) {
                alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
                FileOpenReset();
            } else {
                if (imgtag.title != 'no_image.png') {
                    reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
                    //alert('new image selected.');
                    medicinetxtCompareName.value = imgtag.title;
                } else {
                    alert('Please choose an image other than the default image.');
                    FileOpenReset();
                }
            }
        } else {
            alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
            FileOpenReset();
        }

        function FileOpenReset() {
            document.getElementById('MedicineImageOpen').value = '';
            document.getElementById('MedicineImg').src = 'no_image.png';
        }
    }

    function medicine() {
        var FBStore = firebase.storage().ref();

        var metaData = {contentType: 'image/' + extFile, name: medicinetxtCompareName.value};
        var confMsg = confirm("Are you sure you want to pledge these items?");

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {

                    var refFBStore = FBStore.child('donatedItems/' + medicinetxtCompareName.value).put(selectedFile, metaData)
                        .then(snapshot => {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            span1.innerHTML = 'Progress: ' + progress;
                            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                        })

                        .then(downloadURL => {
                            if (document.getElementById("otccap").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Medicine",
                                    itemSubCategory: document.getElementById("otccap").value,
                                    itemDesc: document.getElementById("otccap_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Boxes",
                                    itemQty: document.getElementById("otccap_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("otctab").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Medicine",
                                    itemSubCategory: document.getElementById("otctab").value,
                                    itemDesc: document.getElementById("otctab_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Boxes",
                                    itemQty: document.getElementById("otctab_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                    window.location.reload();
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("otcsyr").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Medicine",
                                    itemSubCategory: document.getElementById("otcsyr").value,
                                    itemDesc: document.getElementById("otcsyr_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Bottles",
                                    itemQty: document.getElementById("otcsyr_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                    window.location.reload();
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("om").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Medicine",
                                    itemSubCategory: document.getElementById("om").value,
                                    itemDesc: document.getElementById("om_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Pieces",
                                    itemQty: document.getElementById("om_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                    window.location.reload();
                                }).catch(function (error) {
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
                } else {
                    alert("No user signed in!");
                }
            });
        } else {
            alert("Cancelled!");
        }

    }


    function ToiletriesOpenImage(event) {
        selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("ToiletriesImg");
        imgtag.title = selectedFile.name; //gets the file name

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        }

        var fileName = imgtag.title;
        var idxDot = fileName.lastIndexOf(".") + 1;
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            if (selectedFile.size > 2097152) {
                alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
                FileOpenReset();
            } else {
                if (imgtag.title != 'no_image.png') {
                    reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
                    //alert('new image selected.');
                    toiletriestxtCompareName.value = imgtag.title;
                } else {
                    alert('Please choose an image other than the default image.');
                    FileOpenReset();
                }
            }
        } else {
            alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
            FileOpenReset();
        }

        function FileOpenReset() {
            document.getElementById('ToiletriesImageOpen').value = '';
            document.getElementById('ToiletriesImg').src = 'no_image.png';
        }
    }


    function toiletries() {
        var FBStore = firebase.storage().ref();

        var metaData = {contentType: 'image/' + extFile, name: toiletriestxtCompareName.value};
        var confMsg = confirm("Are you sure you want to pledge these items?");

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {

                    var refFBStore = FBStore.child('donatedItems/' + toiletriestxtCompareName.value).put(selectedFile, metaData)
                        .then(snapshot => {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            span1.innerHTML = 'Progress: ' + progress;
                            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                        })

                        .then(downloadURL => {
                            if (document.getElementById("sha").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Toiletries",
                                    itemSubCategory: document.getElementById("sha").value,
                                    itemDesc: document.getElementById("sha_d").value,
                                    imgName: downloadURL,
                                    itemUnit: document.getElementById("sha_u").value,
                                    itemQty: document.getElementById("sha_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("soap").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Toiletries",
                                    itemSubCategory: document.getElementById("soap").value,
                                    itemDesc: document.getElementById("soap_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Bars",
                                    itemQty: document.getElementById("soap_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("tb").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Toiletries",
                                    itemSubCategory: document.getElementById("tb").value,
                                    itemDesc: document.getElementById("tb_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Pieces",
                                    itemQty: document.getElementById("tb_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("tp").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Toiletries",
                                    itemSubCategory: document.getElementById("tp").value,
                                    itemDesc: document.getElementById("tp_d").value,
                                    imgName: downloadURL,
                                    itemUnit: document.getElementById("tp_u").value,
                                    itemQty: document.getElementById("tp_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("deo").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Toiletries",
                                    itemSubCategory: document.getElementById("deo").value,
                                    itemDesc: document.getElementById("deo_d").value,
                                    imgName: downloadURL,
                                    itemUnit: document.getElementById("deo__u").value,
                                    itemQty: document.getElementById("deo_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("sn").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Toiletries",
                                    itemSubCategory: document.getElementById("sn").value,
                                    itemDesc: document.getElementById("sn_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Packs",
                                    itemQty: document.getElementById("sn_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
                                    console.log("Failed!", error);
                                });
                            }
                            if (document.getElementById("ot").checked == true) {
                                donatedItems.push({
                                    donorId: uid,
                                    itemCategory: "Toiletries",
                                    itemSubCategory: document.getElementById("ot").value,
                                    itemDesc: document.getElementById("ot_d").value,
                                    imgName: downloadURL,
                                    itemUnit: "Pieces",
                                    itemQty: document.getElementById("ot_q").value,
                                    itemPledgeDate: getDate(),
                                    itemStatus: 1,
                                    delPick: "",
                                    delDrop: getDate(),
                                    srcLoc: "Nangka Baranggay Hall",
                                    srcLat: 14.67,
                                    srcLng: 121.11,
                                    delStatus: 0,
                                    tLocId: "",
                                    vhcId: ""
                                }).then(function () {
                                    console.log("Status saved!");
                                }).catch(function (error) {
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
                } else {
                    alert("No user signed in!");
                }
            });
        } else {
            alert("Cancelled!");
        }

    }


    function OthersOpenImage(event) {
        selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("OthersImg");
        imgtag.title = selectedFile.name; //gets the file name

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        }

        var fileName = imgtag.title;
        var idxDot = fileName.lastIndexOf(".") + 1;
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            if (selectedFile.size > 2097152) {
                alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
                FileOpenReset();
            } else {
                if (imgtag.title != 'no_image.png') {
                    reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
                    //alert('new image selected.');
                    otherstxtCompareName.value = imgtag.title;
                } else {
                    alert('Please choose an image other than the default image.');
                    FileOpenReset();
                }
            }
        } else {
            alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
            FileOpenReset();
        }

        function FileOpenReset() {
            document.getElementById('OthersImageOpen').value = '';
            document.getElementById('OthersImg').src = 'no_image.png';
        }
    }

    function others() {
        var FBStore = firebase.storage().ref();

        var metaData = {contentType: 'image/' + extFile, name: otherstxtCompareName.value};
        var confMsg = confirm("Are you sure you want to pledge these items?");

        if (confMsg) {
            firebase.auth().onAuthStateChanged(function (user) {
                var user = firebase.auth().currentUser;
                var uid = String(user.uid);

                if (user) {

                    var refFBStore = FBStore.child('donatedItems/' + otherstxtCompareName.value).put(selectedFile, metaData)
                        .then(snapshot => {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            span1.innerHTML = 'Progress: ' + progress;
                            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                        })

                        .then(downloadURL => {
                            donatedItems.push({
                                donorId: uid,
                                itemCategory: "Other Donations",
                                itemSubCategory: document.getElementById("other_t").value,
                                itemDesc: document.getElementById("other_d").value,
                                imgName: downloadURL,
                                itemUnit: "Pieces",
                                itemQty: document.getElementById("other_q").value,
                                itemPledgeDate: getDate(),
                                itemStatus: 1,
                                delPick: "",
                                delDrop: getDate(),
                                srcLoc: "Nangka Baranggay Hall",
                                srcLat: 14.67,
                                srcLng: 121.11,
                                delStatus: 0,
                                tLocId: "",
                                vhcId: ""

                            }).then(function () {
                                console.log("Status saved!");
                                window.location.reload();
                            }).catch(function (error) {
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
                } else {
                    alert("No user signed in!");
                }
            });
        } else {
            alert("Cancelled!");
        }

    }

    function getDate() {
        var datetoday = new Date();
        var year = datetoday.getFullYear(); // 0
        var mon = datetoday.getMonth() + 1; // 1
        var dayno = datetoday.getDate(); // 2
        var hour = datetoday.getHours(); // 3
        var min = datetoday.getMinutes(); // 4
        var sec = datetoday.getSeconds(); // to be used in option 8
        var milsec = datetoday.getMilliseconds();

        if (mon < 9) {
            mon = "0" + mon;
        }
        if (dayno < 9) {
            dayno = "0" + dayno;
        }
        if (hour < 9) {
            hour = "0" + hour;
        }
        if (min < 9) {
            min = "0" + min;
        }
        if (sec < 9) {
            sec = "0" + sec;
        }
        return year + "-" + mon + "-" + dayno + " " + hour + ":" + min + ":" + sec;
    }


    function DateTimeNow(Zero29) {
        var datetoday = new Date();
        var year = datetoday.getFullYear(); // 0
        var mon = datetoday.getMonth() + 1; // 1
        var dayno = datetoday.getDate(); // 2
        var hour = datetoday.getHours(); // 3
        var min = datetoday.getMinutes(); // 4
        var sec = datetoday.getSeconds(); // to be used in option 8
        var milsec = datetoday.getMilliseconds();

        if (mon < 10) {
            mon = '0' + String(mon);
        }
        if (dayno < 10) {
            dayno = '0' + String(dayno);
        }
        if (hour < 10) {
            hour = '0' + String(hour);
        }
        if (min < 10) {
            min = '0' + String(min);
        }
        if (sec < 10) {
            sec = '0' + String(sec);
        }
        if (milsec < 10) {
            milsec = '00' + String(milsec);
        }
        else if (milsec < 100) {
            milsec = '0' + String(milsec);
        }

        var date = String(year + '-' + mon + '-' + dayno); // 5
        var YearMon = String(year + '-' + mon); // 6
        var time = String(hour + ':' + min); // 7
        var ISDateTime = String(date + ' ' + time + ':' + sec);
        var AutoID = String(year + '' + mon + '' + dayno + '' + hour + '' + min + '' + sec + '' + milsec);

        if (Zero29 == 0) {
            return year;
        } else if (Zero29 == 1) {
            return mon;
        } else if (Zero29 == 2) {
            return dayno;
        } else if (Zero29 == 3) {
            return hour;
        } else if (Zero29 == 4) {
            return min;
        } else if (Zero29 == 5) {
            return date; //returns YYYY-MM-DD
        } else if (Zero29 == 6) {
            return YearMon; //returns YYYY-MM
        } else if (Zero29 == 7) {
            return time; //returns hh:mm
        } else if (Zero29 == 8) {
            return ISDateTime; //returns YYYY-MM-DD hh:mm:ss
        } else if (Zero29 == 9) {
            return AutoID; //returns YYYYMMDDhhmmssiii
        } else {
            return date + ' ' + time;
        } //returns YYYY-MM-DD hh:mm
    }