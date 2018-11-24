//build the news feed first
var tblPostsKeys = [];
//get the keys first

function objArrKeysTblPosts(snapshot) {
    var obj = snapshot.val();
    var arrKeys = [];
    Object.keys(obj).forEach(function (key, index) {
        arrKeys[index] = key;
    });
    return arrKeys;
}

function getArrTblPostsKeys() {
    return firebase.database().ref().child('tblPosts').once('value').then(objArrKeysTblPosts);
}

// function queryNewsFeed(key) {
//     console.log(key);
//     return firebase.database().ref('tblPosts').child('' + key).once('value');
// }


// function getNewsFeedPromise(snapshot) {
//     var snapshotObj = snapshot.val();
//     console.log(snapshotObj);
//     return snapshotObj;
// }

getArrTblPostsKeys().then(function (keys) {
    tblPostsKeys = keys;
    var keysMaxLength = keys.length;
    console.log('No. of keys: ' + keys.length);
    var i;

    for (i = keysMaxLength - 1; i >= 0; i--) {
        firebase.database().ref('tblPosts').child('' + tblPostsKeys[i]).once('value', function (snapshot2) {
            var currentPostKey = snapshot2.key;
            var imageSectionID = 'imageSection' + currentPostKey;
            var imageUserProfileID = 'imageUserProfile' + currentPostKey;
            if (snapshot2.val() != null) {
                var postDate = snapshot2.child('postDate').val();
                var evacCount = snapshot2.child('evacCount').val();
                var evacItem = '' + snapshot2.child('evacItem').val();
                var evacPlace = snapshot2.child('evacPlace').val();

                if (evacCount != null) {
                    $('#feedItems').append('<div class="card card- mb-3">' +
                        '<div class="card-body">' +
                        '<div class="font-italic font-bold"><span class="fa fa-building fa-3x img-thumbnail rounded-circle" style="vertical-align: middle;"></span> Evacuation Center Announcement<hr></div>' +
                        '<h6 class="card-title mb-1"> ' + evacPlace + '</h6>' +
                        '<p class="card-text small">The evacuation center located at ' + evacPlace + 'is accomodating ' + evacCount + ' families and is in need of ' + evacItem + '.</p>' +
                        '</div>' +
                        '<hr class="my-0">' +
                        '<div class="card-footer small text-muted align-items-end">' + postDate + '</div>' +
                        '</div>');
                }
                if (snapshot2.child('postTitle').val() != null || snapshot2.child('postDesc').val() != null || snapshot2.child('postName').val() != null ||
                    snapshot2.child('postLname').val() != null) {
                    var postTitle = snapshot2.child('postTitle').val();
                    var postDesc = snapshot2.child('postDesc').val();
                    var postName = snapshot2.child('postName').val();
                    var postLname = snapshot2.child('postLname').val();
                    var userImageURL = snapshot2.child('userImage').val();
                    var imageUrl = snapshot2.child('imageUrl').val();



                    if (postName == 'SAGIP Flood Alerts') {
                        $('#feedItems').append('<div class="card card- mb-3">' +
                            '<div class="card-body">' +
                            '<div class="font-italic font-bold"><span class="img-thumbnail rounded-circle fa fa-warning fa-3x" style="vertical-align: middle;"></span> ' +
                            postName + '<hr></div>' +
                            '<h6 class="card-title mb-1">' + postTitle + '</h6>' +
                            '<p class="card-text small">' + postDesc + '</p>' +
                            '</div>' +
                            '<hr class="my-0">' +
                            '<div class="card-footer small text-muted align-items-end">' + postDate + '</div>' +
                            '</div>');
                    } else {
                        $('#feedItems').append('<div class="card mb-3">' +
                            '<div class="card-body">' +
                            '<div class="font-italic font-bold"><span id="' + imageUserProfileID + '" class=""></span> ' +
                            postName + ' ' + postLname + '<hr></div>' +
                            '<h6 class="card-title mb-1">' + postTitle + '</h6>' +
                            '<p class="card-text small">' + postDesc + '</p>' +
                            '<div id="' + imageSectionID + '"></div>' +
                            '</div>' +
                            '<hr class="my-0">' +
                            '<div class="card-footer small text-muted">' + postDate + '</div>' +
                            '</div>');
                    }

                    if (userImageURL != null) {
                        $('#' + imageUserProfileID).append('<img class="img-thumbnail rounded-circle img-fluid" style="height:80px; width:80px" src="' + userImageURL + '">');
                    }

                    if (imageUrl != null || imageUrl != undefined) {
                        $('#' + imageSectionID).append('<br><img class="img-fluid" src="' + imageUrl + '">');
                    }
                }
            }
        })
    }
})

// firebase.database().ref().child('tblPosts').once('value', function (snapshot) {

//     var keysMaxLength;
//     //place snapshot inside an obj
//     var obj = snapshot.val();
//     console.log(tblPostsKeys);

//     //build keys for every news feed posts, pass it to data array
//     Object.keys(obj).forEach(function (key, index) {
//         tblPostsKeys[index] = key;
//         keysMaxLength = tblPostsKeys.length;
//     });

//     console.log(keysMaxLength);
//     console.log(tblPostsKeys);

//     //manual iteration according to no. of keys collected - using forEach loop breaks, manual for-loop recommended
//     var i;
//     for (i = keysMaxLength - 1; i >= 0; i--) {
//         firebase.database().ref('tblPosts').child('' + tblPostsKeys[i]).once('value', function (snapshot2) {
//             console.log(tblPostsKeys[i]);
//             var imageSectionID = 'imageSection' + tblPostsKeys[i];
//             var imageUserProfileID = 'imageUserProfile' + tblPostsKeys[i];
//             // console.log(snapshot.child("postDesc").val());
//             if (snapshot2.val() != null) {
//                 if (snapshot2.child('postTitle').val() != null || snapshot2.child('postDesc').val() != null || snapshot2.child('postName').val() != null ||
//                     snapshot2.child('postLname').val() != null) {
//                     var postTitle = snapshot2.child('postTitle').val();
//                     var postDesc = snapshot2.child('postDesc').val();
//                     var postDate = snapshot2.child('postDate').val();
//                     var postName = snapshot2.child('postName').val();
//                     var postLname = snapshot2.child('postLname').val();
//                     var userImageURL = snapshot2.child('userImage').val();
//                     var imageUrl = snapshot2.child("imageUrl").val();

//                     if (postName == 'SAGIP Flood Alerts') {
//                         $('#feedItems').append('<div class="card card- mb-3">' +
//                             '<div class="card-body">' +
//                             '<div class="font-italic font-bold"><span class="img-thumbnail rounded-circle fa fa-warning fa-3x"></span> ' +
//                             postName + '<hr></div>' +
//                             '<h6 class="card-title mb-1">' + postTitle + '</h6>' +
//                             '<p class="card-text small">' + postDesc + '</p>' +
//                             '</div>' +
//                             '<hr class="my-0">' +
//                             '<div class="card-footer small text-muted align-items-end">' + postDate + '</div>' +
//                             '</div>');
//                     } else {
//                         $('#feedItems').append('<div class="card mb-3">' +
//                             '<div class="card-body">' +
//                             '<div class="font-italic font-bold"><span id="' + imageUserProfileID + '" class=""></span> ' +
//                             postName + ' ' + postLname + '<hr></div>' +
//                             '<h6 class="card-title mb-1">' + postTitle + '</h6>' +
//                             '<p class="card-text small">' + postDesc + '</p>' +
//                             '<div id="' + imageSectionID + '"></div>' +
//                             '</div>' +
//                             '<hr class="my-0">' +
//                             '<div class="card-footer small text-muted">' + postDate + '</div>' +
//                             '</div>');
//                     }

//                     if (userImageURL != null) {
//                         $('#' + imageUserProfileID).append('<img class="img-thumbnail rounded-circle img-fluid" style="height:80px; width:80px" src="' + userImageURL + '">');
//                     }

//                     if (imageUrl != null || imageUrl != undefined) {
//                         $('#' + imageSectionID).append('<br><img class="img-fluid" src="' + imageUrl + '">');
//                     }
//                 }
//             }
//         });
//     }
// });