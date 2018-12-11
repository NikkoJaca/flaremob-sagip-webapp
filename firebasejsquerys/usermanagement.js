// // Firebase Database Reference and the child
// //push
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('tblUsers');
// var table1 = $('#User').DataTable({
//     // bSort: false,
//     // _aSortData:true,
//     // "scrollY":        "300px",
//     "scrollCollapse": true,
//     // "info":           true,
//     "paging": true,
//     dom: 'Bfrtip',
//     buttons: [
//         {extend: 'copy', attr: {id: 'allan'}}, 'csv', 'excel', {
//             extend: 'pdf',
//
//         }, 'print'
//     ]
//     ,"columnDefs": [ {
//         "targets": [ 4 ],
//         // "visible": false
//         "searchable": false
//     }]
//     // "columnDefs": [ {
//     //     "targets": -1,
//     //     "data": null,
//     //     "defaultContent": "<button id='edituser' class='edit-user btn btn-warning m-2' data-toggle='modal' data-target='#adminUserEditModalWindow' onClick='editButtonClicked()'>Edit</button>  <button id='delete123' class='edit-user btn btn-danger m-2' onclick='delete123()'>Delete</button>"
//     // } ]
// });
var table1 = $('#User').DataTable({
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
    buttons: [
        {
            text: 'Update',
            action: function ( e, dt, node, config ) {
                alert( 'Button activated' );
            },
            attr: {
                id: 'seldata'
            }
        }

    ],
    "pageLength": 5
    ,"columnDefs": [ {
        "targets": [ 4,5,6,7,8 ],
        "visible": false,
        "searchable": false
    }]
});

$('#User tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
        var row =table1.row(this).data();
        // let st = row[4];
        console.log(row[1]);
        console.log(row[2]);
        console.log(row[4]);
        console.log(row[5]);
        console.log(row[6]);
        console.log(row[7]);
        console.log(row[8]);
        document.getElementById("Email").value = row[1];
        document.getElementById("Bday").value = row[2];
        document.getElementById("AdminID").value = row[4];
        document.getElementById("Fname").value = row[5];
        document.getElementById("Lname").value = row[6];
        document.getElementById("ImgUrl").value = row[7];
        document.getElementById("Password").value = row[8];
        document.getElementById("cnum").value =  String(row[9]);


    }
    else {
        table1.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }


} );
// $('#luquidation tbody').on( 'click', 'tr', function () {
//     if ( $(this).hasClass('selected') ) {
//         $(this).removeClass('selected');
//         var row1=table1.row(this).data();
//         let st = row1[4];
//         console.log(row1[3]);
//         document.getElementById("FName").value = row1[4];
//     //    FName
//     }
//     else {
//         table1.$('tr.selected').removeClass('selected');
//         $(this).addClass('selected');
//     }
//
//
// } );
var row20 =table1.row(0).data();
console.log(row20);
readUserData();
//Updated Update shit
function readUserData() {
    usersRef.on('value',snap =>{
        snap.forEach(childSnap=>{
            let key = childSnap.key, value = childSnap.val();
            let name = value.userFname + " "+value.userLname ;
            let editButtonOnTable = "<button id='edituser' userid='"+key+"' class='edit-user btn btn-warning m-2' data-toggle='modal' data-target='#adminUserEditModalWindow' onClick='editButtonClicked'>Edit</button>";
            let deleteButtonOnTable = "<button id='deleteuser'  userid='"+key+"' class='edit-user btn btn-danger m-2' data-toggle='modal' data-target='#adminUserEditModalWindow' onClick='deleteButtonClicked'>Delete</button>";
            let dataset1 = [name,value.userEmail,value.userBday,editButtonOnTable,key,value.userFname,value.userLname,value.userImageUrl,value.userPass,value.userCnum];
            table1.rows.add([dataset1]).draw();
        })
    });
}
//test
function editButtonClicked(){
    let email =document.getElementById("Email").value ;
    let bday = document.getElementById("Bday").value ;
    let id = document.getElementById("AdminID").value;
    let fname = document.getElementById("Fname").value ;
    let lname = document.getElementById("Lname").value;
    let imgurl = document.getElementById("ImgUrl").value;
    let pass = document.getElementById("Password").value;
    let cnum = document.getElementById("cnum").value;
    if(email||bday||id||fname||lname||imgurl||pass||cnum !==""){
        usersRef.child(id).update({
            userFname:fname,
            userLname:lname,
            userEmail:email,
            userBday:bday,
            userImageUrl:imgurl,
            userPass:pass,
            userCnum:cnum

        });
        location.reload();
    }
}
// Trial 1
// function testOnclickOnStaticDataTable(){
//     alert('It worked!');
// }
// readUserData();
//
// function readUserData() {
//     const userListUI = document.getElementById("user-list");
//     usersRef.on('value',snap =>{
//         userListUI.innerHTML = "";
//         snap.forEach(childSnap=>{
//             let key = childSnap.key,
//                 value = childSnap.val();
//
//             let $li = document.createElement("li");
//             // edit icon
//             let editIconUI = document.createElement("button");
//             editIconUI.class = "edit-user";
//             editIconUI.id = "edituser";
//             editIconUI.innerHTML = "Edit";
//             editIconUI.classList.add("btn");
//             editIconUI.classList.add("btn-warning");
//             editIconUI.classList.add("m-2");
//             editIconUI.style.verticalAlign = "middle";
//             editIconUI.setAttribute("userid", key);
//             editIconUI.addEventListener("click", editButtonClicked);
//
//             // delete icon
//             let deleteIconUI = document.createElement("button");
//             deleteIconUI.class = "delete-user";
//             deleteIconUI.innerHTML = "Delete";
//             deleteIconUI.classList.add("btn");
//             deleteIconUI.classList.add("btn-danger");
//             deleteIconUI.classList.add("m-2");
//             deleteIconUI.setAttribute("userid", key);
//             deleteIconUI.addEventListener("click", deleteButtonClicked);
//
//             $li.innerHTML = value.offFname + " "+value.offLname + " || Email Address: "+ value.offEmail;
//             $li.append(editIconUI);
//             $li.append(deleteIconUI);
//
//
//             $li.setAttribute("user-key", key);
//             $li.addEventListener("click", userClicked);
//             userListUI.append($li);
//             let name = value.offFname + " "+value.offLname ;
//
//             let editButtonOnTable = "<button id='edituser' userid='"+key+"' class='edit-user btn btn-warning m-2' data-toggle='modal' data-target='#adminUserEditModalWindow' onClick='editButtonClicked'>Edit</button>"
//             let dataset = [name,value.offEmail,value.offBday,editButtonOnTable,key];
//             console.log(dataset);
//             table1.rows.add([dataset]).draw();
//         })
//     });
// }
// function edit123(){
//
// }
// function delete123(){
//
// }
// $('#User tbody').on( 'click', 'edit123', function () {
//     var data = table1.row( $(this).parents('tr') ).data();
//     alert("HEY");
// } );
// function userClicked(e) {
//
//
//     var userID = e.target.getAttribute("user-key");
//
//     const userRef = dbRef.child('tblBrgyOff/' + userID);
//     const userDetailUI = document.getElementById("user-detail");
//
//     userRef.on("value", snap => {
//
//         userDetailUI.innerHTML = "";
//
//         snap.forEach(childSnap => {
//             var $p = document.createElement("p");
//             $p.innerHTML = childSnap.key  + " - " +  childSnap.val();
//             userDetailUI.append($p);
//         })
//
//     });
//
//
// }
//
// function deleteButtonClicked(e) {
//     let g = confirm("Your about to delete this user are you sure?");
//     if(g){
//         e.stopPropagation();
//
//         var userID = e.target.getAttribute("userid");
//
//         const userRef = dbRef.child('tblBrgyOff/' + userID);
//
//         userRef.remove();
//     }
//
//
// }
//
// function editButtonClicked(e) {
//
//     document.getElementById('edit-user-module').style.display = "block";
//
//     //set user id to the hidden input field
//     // document.querySelector(".edit-userid").value = e.target.getAttribute("userid");
//
//     const userRef = dbRef.child('tblBrgyOff/' + e.target.getAttribute("userid"));
//     $('#User tbody').on( 'click', 'tr', function () {
//         if ( $(this).hasClass('selected') ) {
//             $(this).removeClass('selected');
//             var row =table1.row(this).data();
//             document.querySelector(".edit-userid").value = row[4];
//             const editUserInputsUI = document.querySelectorAll(".edit-user-input");
//             console.log(row[3]);
//             //edituser
//             userRef.on("value", snap => {
//
//                 for(var i = 0, len = editUserInputsUI.length; i < len; i++) {
//
//                     var key = editUserInputsUI[i].getAttribute("data-key");
//                     editUserInputsUI[i].value = snap.val()[key];
//                 }
//
//             });
//         }
//         else {
//             table1.$('tr.selected').removeClass('selected');
//             $(this).addClass('selected');
//         }
//
//
//     });
//     // set data to the user field
//
//
//
//
//
//     const saveBtn = document.querySelector("#edit-user-btn");
//     saveBtn.addEventListener("click", saveUserBtnClicked)
// }
//
//
// function saveUserBtnClicked(e) {
//
//     const userID = document.querySelector(".edit-userid").value;
//     const userRef = dbRef.child('tblBrgyOff/' + userID);
//
//     var editedUserObject = {};
//
//     const editUserInputsUI = document.querySelectorAll(".edit-user-input");
//
//     editUserInputsUI.forEach(function(textField) {
//         let key = textField.getAttribute("data-key");
//         let value = textField.value;
//         editedUserObject[textField.getAttribute("data-key")] = textField.value
//     });
//
//
//
//     userRef.update(editedUserObject);
//
//     document.getElementById('edit-user-module').style.display = "none";
//
//
// }