let tblDonatedItemsKeys = [];
let tblDonatedMoney = [];


function objArrKeysTblPosts(snapshot) {
    let obj = snapshot.val();
    let arrKeys = [];
    Object.keys(obj).forEach(function (key, index) {
        arrKeys[index] = key;
    });
    return arrKeys;
}
function objArrKeysTblmoney(snapshot) {
    let obj = snapshot.val();
    let arrKeys = [];
    Object.keys(obj).forEach(function (key, index) {
        arrKeys[index] = key;
    });
    return arrKeys;
}

function getArrTblPostsKeys() {
    return firebase.database().ref().child('tblDonatedItems').once('value').then(objArrKeysTblPosts);
}
function getArrTblPostsKeys1() {
    return firebase.database().ref().child('tblDonatedMoney').once('value').then(objArrKeysTblmoney);
}
getArrTblPostsKeys1().then(function (keys) {
    tblDonatedMoney = keys;
    let keysMaxLength = keys.length;
    console.log('No. of keys: ' + keys.length);
    let i;
    for (i = keysMaxLength - 1; i >= 0; i--) {

        firebase.database().ref('tblDonatedMoney').child('' + tblDonatedMoney[i]).once('value', function (snapshot2) {
            let donorid = snapshot2.child('donorId').val();
            let itemPledgeDate = snapshot2.child('dateTimePledge').val();
            let money = snapshot2.child('totalMoneyDonation').val();
            if(snapshot2.val()) {
                firebase.database().ref('tblDonatedMoney').child('' + tblDonatedMoney[i]).update({
                    isAdminNotified:"1"
                });
                firebase.database().ref('tblDonors').child(donorid).once('value', function (snapshot3) {
                    if (snapshot3.val()) {
                        let fname = snapshot3.child("donorFname").val();
                        let lname = snapshot3.child("donorLname").val();
                        let fullname = fname +' '+ lname;
                        let sentence = fullname + ' has donated PHP: '+money;

                        $('#feedItems').append('<div class="card card- mb-3">' +
                            '<div class="card-body">' +
                            '<div class="font-italic font-bold"><span class="fa fa-pencil fa-3x img-thumbnail rounded-circle" style="vertical-align: middle;"></span> '+fullname+' has donated Money<hr></div>' +
                            // '<p class="card-text small">The evacuation center located at ' + fullname + ' is accomodating ' + evacCount + ' families and is in need of ' + evacItem + '.</p>' +
                            '<p class="card-text small"> '+sentence+'</p>'+
                            '</div>' +
                            '<hr class="my-0">' +
                            '<div class="card-footer small text-muted align-items-end">' + itemPledgeDate + '</div>' +
                            '</div>');
                    }
                });
                firebase.database().ref('tblUsers').child(donorid).once('value', function (snapshot3) {
                    if(snapshot3.val()){
                        let fname = snapshot3.child("userFname").val();
                        let lname = snapshot3.child("userLname").val();
                        let fullname = fname +' '+ lname;
                        let sentence = fullname + ' has donated PHP: '+money;
                        $('#feedItems').append('<div class="card card- mb-3">' +
                            '<div class="card-body">' +
                            '<div class="font-italic font-bold"><span class="fa fa-pencil fa-3x img-thumbnail rounded-circle" style="vertical-align: middle;"></span> '+fullname+' has donated Money<hr></div>' +
                            // '<p class="card-text small">The evacuation center located at ' + fullname + ' is accomodating ' + evacCount + ' families and is in need of ' + evacItem + '.</p>' +
                            '<p class="card-text small"> '+sentence+'</p>'+
                            '</div>' +
                            '<hr class="my-0">' +
                            '<div class="card-footer small text-muted align-items-end">' + itemPledgeDate + '</div>' +
                            '</div>');
                    }
                });
                if(donorid===""){
                    let sentence = 'Anonymous has donated PHP: '+money;
                    $('#feedItems').append('<div class="card card- mb-3">' +
                        '<div class="card-body">' +
                        '<div class="font-italic font-bold"><span class="fa fa-pencil fa-3x img-thumbnail rounded-circle" style="vertical-align: middle;"></span> A User has donated Money<hr></div>' +
                        // '<p class="card-text small">The evacuation center located at ' + fullname + ' is accomodating ' + evacCount + ' families and is in need of ' + evacItem + '.</p>' +
                        '<p class="card-text small"> '+sentence+'</p>'+
                        '</div>' +
                        '<hr class="my-0">' +
                        '<div class="card-footer small text-muted align-items-end">' + itemPledgeDate + '</div>' +
                        '</div>');
                }

            }
        });
    }
});
getArrTblPostsKeys().then(function (keys) {
    tblDonatedItemsKeys = keys;
    let keysMaxLength = keys.length;
    console.log('No. of keys: ' + keys.length);
    let i;

    for (i = keysMaxLength - 1; i >= 0; i--) {
        firebase.database().ref('tblDonatedItems').child('' + tblDonatedItemsKeys[i]).once('value', function (snapshot2) {

            let currentKey = snapshot2.key;
            let donorid = snapshot2.child('donorId').val();
            let category = snapshot2.child('itemCategory').val();
            let description = snapshot2.child('itemDescription').val();
            let quantity = snapshot2.child('itemQty').val();
            let unit = snapshot2.child('itemUnit').val();
            let itemPledgeDate = snapshot2.child('itemPledgeDate').val();
            firebase.database().ref('tblDonatedItems').child(tblDonatedItemsKeys[i]).update({
                isAdminNotified:"1"
            });
            if(snapshot2.val()){
                firebase.database().ref('tblDonors').child(donorid).once('value', function (snapshot3) {
                    if(snapshot3.val()){
                        let fname = snapshot3.child("donorFname").val();
                        let lname = snapshot3.child("donorLname").val();
                        let fullname = fname +' '+ lname;
                        let sentence = fullname + ' has donated '+category+' Description: '+description +' '+quantity+' '+unit;
                        $('#feedItems').append('<div class="card card- mb-3">' +
                            '<div class="card-body">' +
                            '<div class="font-italic font-bold"><span class="fa fa-pencil fa-3x img-thumbnail rounded-circle" style="vertical-align: middle;"></span> '+fullname+' has donated '+category+'<hr></div>' +
                            // '<p class="card-text small">The evacuation center located at ' + fullname + ' is accomodating ' + evacCount + ' families and is in need of ' + evacItem + '.</p>' +
                            '<p class="card-text small"> '+sentence+'</p>'+
                            '</div>' +
                            '<hr class="my-0">' +
                            '<div class="card-footer small text-muted align-items-end">' + itemPledgeDate + '</div>' +
                            '</div>');
                    }
                });
                firebase.database().ref('tblUsers').child(donorid).once('value', function (snapshot3) {
                    if(snapshot3.val()){
                        let fname = snapshot3.child("userFname").val();
                        let lname = snapshot3.child("userLname").val();
                        let fullname = fname +' '+ lname;
                        let sentence = fullname + ' has donated '+category+' Description: '+description +' '+quantity+' '+unit;
                        $('#feedItems').append('<div class="card card- mb-3">' +
                            '<div class="card-body">' +
                            '<div class="font-italic font-bold"><span class="fa fa-pencil fa-3x img-thumbnail rounded-circle" style="vertical-align: middle;"></span> '+fullname+' has donated '+category+'<hr></div>' +
                            // '<p class="card-text small">The evacuation center located at ' + fullname + ' is accomodating ' + evacCount + ' families and is in need of ' + evacItem + '.</p>' +
                            '<p class="card-text small"> '+sentence+'</p>'+
                            '</div>' +
                            '<hr class="my-0">' +
                            '<div class="card-footer small text-muted align-items-end">' + itemPledgeDate + '</div>' +
                            '</div>');
                    }
                });
                if(donorid===""){
                    let sentence = 'Anonymous has donated '+category+' Description: '+description +' '+quantity+' '+unit;
                    $('#feedItems').append('<div class="card card- mb-3">' +
                        '<div class="card-body">' +
                        '<div class="font-italic font-bold"><span class="fa fa-pencil fa-3x img-thumbnail rounded-circle" style="vertical-align: middle;"></span> A User has donated '+category+'<hr></div>' +
                        // '<p class="card-text small">The evacuation center located at ' + fullname + ' is accomodating ' + evacCount + ' families and is in need of ' + evacItem + '.</p>' +
                        '<p class="card-text small"> '+sentence+'</p>'+
                        '</div>' +
                        '<hr class="my-0">' +
                        '<div class="card-footer small text-muted align-items-end">' + itemPledgeDate + '</div>' +
                        '</div>');
                }
            }

        });
    }
});

