// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('tblUsers');

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
            editIconUI.innerHTML = "Edit";
            editIconUI.classList.add("btn");
            editIconUI.classList.add("btn-warning");
            editIconUI.classList.add("m-2");
            editIconUI.style.verticalAlign = "middle";
            //margin-left : auto
            // margin-right : auto
            //float-md-right
            // pull-left
            editIconUI.setAttribute("userid", key);
            editIconUI.addEventListener("click", editButtonClicked);

            // delete icon
            let deleteIconUI = document.createElement("button");
            deleteIconUI.class = "delete-user";
            deleteIconUI.innerHTML = "Delete";
            deleteIconUI.classList.add("btn");
            deleteIconUI.classList.add("btn-danger");
            deleteIconUI.classList.add("m-2");
            deleteIconUI.style.verticalAlign = "middle";
            deleteIconUI.setAttribute("userid", key);
            deleteIconUI.addEventListener("click", deleteButtonClicked);

            $li.innerHTML = value.userFname + " "+value.userLname + " || Email Address: "+ value.userEmail;
            $li.append(editIconUI);
            $li.append(deleteIconUI);
            $li.setAttribute("user-key", key);
            $li.addEventListener("click", userClicked);
            userListUI.append($li);
        })
    });
}

function userClicked(e) {


    var userID = e.target.getAttribute("user-key");

    const userRef = dbRef.child('tblUsers/' + userID);
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

        const userRef = dbRef.child('tblUsers/' + userID);

        userRef.remove();
    }


}

function editButtonClicked(e) {

    document.getElementById('edit-user-module').style.display = "block";

    //set user id to the hidden input field
    document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

    const userRef = dbRef.child('tblUsers/' + e.target.getAttribute("userid"));

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
    const userRef = dbRef.child('tblUsers/' + userID);

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