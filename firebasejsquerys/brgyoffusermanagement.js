// Firebase Database Reference and the child
//push
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('tblBrgyOff');
var table1 = $('#User').DataTable({
    // bSort: false,
    // _aSortData:true,
    // "scrollY":        "300px",
    "scrollCollapse": true,
    // "info":           true,
    "paging": true,
    dom: 'Bfrtip',
    buttons: [
        {extend: 'copy', attr: {id: 'allan'}}, 'csv', 'excel', {
            extend: 'pdf',

        }, 'print'
    ],
    "columnDefs": [ {
        "targets": -1,
        "data": null
        // "defaultContent": "<button id='edituser' class='edit-user btn btn-warning m-2' data-toggle='modal' data-target='#adminUserEditModalWindow' onClick='editButtonClicked()'>Edit</button>  <button id='delete123' class='edit-user btn btn-danger m-2' onclick='delete123()'>Delete</button>"
    } ]
});

function testOnclickOnStaticDataTable(){
    alert('It worked!');
}
readUserData();

function readUserData() {
    const userListUI = document.getElementById("user-list");
    usersRef.on('value',snap =>{
        userListUI.innerHTML = "";
        snap.forEach(childSnap=>{
            let key = childSnap.key,
                value = childSnap.val();

            let $li = document.createElement("li");
            // edit icon
            let editIconUI = document.createElement("button");
            editIconUI.class = "edit-user";
            editIconUI.id = "edituser";
            editIconUI.innerHTML = "Edit";
            editIconUI.classList.add("btn");
            editIconUI.classList.add("btn-warning");
            editIconUI.classList.add("m-2");
            editIconUI.style.verticalAlign = "middle";
            editIconUI.setAttribute("userid", key);
            editIconUI.addEventListener("click", editButtonClicked);

            // delete icon
            let deleteIconUI = document.createElement("button");
            deleteIconUI.class = "delete-user";
            deleteIconUI.innerHTML = "Delete";
            deleteIconUI.classList.add("btn");
            deleteIconUI.classList.add("btn-danger");
            deleteIconUI.classList.add("m-2");
            deleteIconUI.setAttribute("userid", key);
            deleteIconUI.addEventListener("click", deleteButtonClicked);

            // $li.innerHTML = value.offFname + " "+value.offLname + " || Email Address: "+ value.offEmail;
            // $li.append(editIconUI);
            // $li.append(deleteIconUI);


            // $li.setAttribute("user-key", key);
            // $li.addEventListener("click", userClicked);
            // userListUI.append($li);
            let name = value.offFname + " "+value.offLname ;

            let editButtonOnTable = "<button id='edituser' userid='"+key+"' class='edit-user btn btn-warning m-2' data-toggle='modal' data-target='#adminUserEditModalWindow' onClick='editButtonClicked'>Edit</button>";
            let dataset = [name,value.offEmail,value.offBday,editButtonOnTable];
            console.log(dataset);
            table1.rows.add([dataset]).draw();
        })
    });
}
function edit123(){

}
function delete123(){

}
$('#User tbody').on( 'click', 'edit123', function () {
    var data = table1.row( $(this).parents('tr') ).data();
    alert("HEY");
} );
function userClicked(e) {


    var userID = e.target.getAttribute("user-key");

    const userRef = dbRef.child('tblBrgyOff/' + userID);
    const userDetailUI = document.getElementById("user-detail");

    userRef.on("value", snap => {

        userDetailUI.innerHTML = "";

        snap.forEach(childSnap => {
            var $p = document.createElement("p");
            $p.innerHTML = childSnap.key  + " - " +  childSnap.val();
            userDetailUI.append($p);
        })

    });


}

function deleteButtonClicked(e) {
    let g = confirm("Your about to delete this user are you sure?");
    if(g){
        e.stopPropagation();

        var userID = e.target.getAttribute("userid");

        const userRef = dbRef.child('tblBrgyOff/' + userID);

        userRef.remove();
    }


}

function editButtonClicked(e) {

    document.getElementById('edit-user-module').style.display = "block";

    //set user id to the hidden input field
    document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

    const userRef = dbRef.child('tblBrgyOff/' + e.target.getAttribute("userid"));

    // set data to the user field
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");


    userRef.on("value", snap => {

        for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

            var key = editUserInputsUI[i].getAttribute("data-key");
            editUserInputsUI[i].value = snap.val()[key];
        }

    });




    const saveBtn = document.querySelector("#edit-user-btn");
    saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {

    const userID = document.querySelector(".edit-userid").value;
    const userRef = dbRef.child('tblBrgyOff/' + userID);

    var editedUserObject = {};

    const editUserInputsUI = document.querySelectorAll(".edit-user-input");

    editUserInputsUI.forEach(function(textField) {
        let key = textField.getAttribute("data-key");
        let value = textField.value;
        editedUserObject[textField.getAttribute("data-key")] = textField.value
    });



    userRef.update(editedUserObject);

    document.getElementById('edit-user-module').style.display = "none";


}