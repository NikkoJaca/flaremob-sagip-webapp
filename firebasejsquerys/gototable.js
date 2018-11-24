$(document).ready(function () {



    var table1 = $('#itemtable').DataTable({
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
        ]
    });
    var table2 = $('#approve').DataTable({
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
        ]
    });
    database5 = firebase.database();
    var itemss = database5.ref('tblDonatedItems');
    var userref = database5.ref('tblUsers');
    var donoref = database5.ref('tblDonors');
    var locref = database5.ref('tblTargetLoc');
    var ref2 = database5.ref('tblEvacHeads');
    itemss.on("child_added",snap=>{
        if(String(snap.child("delStatus").val())==="0"){
            userref.child(snap.child("donorId").val()).once("value",snap2=>{
                if(String(snap.child("tLocId").val())){
                    if(String(snap.child("tLocId").val())){
                        locref.child(String(snap.child("tLocId").val())).once('value',snap4=>{
                            let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                            if(snap2.child("userFname").val()|| snap2.child("userLname").val()!==null) {
                                let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                    snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                    , snap.child("itemUnit").val(), "Pickup", snap4.child("tLocName").val()];
                                console.log(dataset);
                                table1.rows.add([dataset]).draw();
                            }else{
                                donoref.child(snap.child("donorId").val()).once("value",snap3=> {
                                    let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                    let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                        snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                        , snap.child("itemUnit").val(), "Pickup",  snap4.child("tLocName").val()];
                                    console.log(dataset);
                                    table1.rows.add([dataset]).draw();
                                });
                            }
                        });
                    }
                }else{
                    let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                    if(snap2.child("userFname").val()|| snap2.child("userLname").val()!==null) {
                        let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                            , snap.child("itemUnit").val(), "Pickup", "No Location Selected"];
                        console.log(dataset);
                        table1.rows.add([dataset]).draw();
                    }else{
                        donoref.child(snap.child("donorId").val()).once("value",snap3=> {
                            let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                            let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                , snap.child("itemUnit").val(), "Pickup", "No Location Selected"];
                            console.log(dataset);
                            table1.rows.add([dataset]).draw();
                        });
                    }
                }
            });
        }else if(String(snap.child("delStatus").val())==="1"){
                userref.child(snap.child("donorId").val()).once("value",snap2=> {
                    if (String(snap.child("tLocId").val())) {
                        if (String(snap.child("tLocId").val())) {
                            locref.child(String(snap.child("tLocId").val())).once('value', snap4 => {
                                let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                                if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                                    let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                        snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                        , snap.child("itemUnit").val(), "Delivered", snap4.child("tLocName").val()];
                                    console.log(dataset);
                                    table1.rows.add([dataset]).draw();
                                } else {
                                    donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                                        let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                        let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                            , snap.child("itemUnit").val(), "Delivered", snap4.child("tLocName").val()];
                                        console.log(dataset);
                                        table1.rows.add([dataset]).draw();
                                    });
                                }
                            });
                        }
                    } else {
                        let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                        if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                            let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                , snap.child("itemUnit").val(), "Delivered", "No Location Selected"];
                            console.log(dataset);
                            table1.rows.add([dataset]).draw();
                        } else {
                            donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                                let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                    snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                    , snap.child("itemUnit").val(), "Delivered", "No Location Selected"];
                                console.log(dataset);
                                table1.rows.add([dataset]).draw();
                            });
                        }
                    }
                });
        }else if(String(snap.child("delStatus").val())==="2"){
            userref.child(snap.child("donorId").val()).once("value",snap2=> {
                if (String(snap.child("tLocId").val())) {
                    if (String(snap.child("tLocId").val())) {
                        locref.child(String(snap.child("tLocId").val())).once('value', snap4 => {
                            let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                            if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                                let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                    snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                    , snap.child("itemUnit").val(), "Cancelled", snap4.child("tLocName").val()];
                                console.log(dataset);
                                table1.rows.add([dataset]).draw();
                            } else {
                                donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                                    let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                    let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                        snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                        , snap.child("itemUnit").val(), "Cancelled", snap4.child("tLocName").val()];
                                    console.log(dataset);
                                    table1.rows.add([dataset]).draw();
                                });
                            }
                        });
                    }
                } else {
                    let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                    if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                        let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                            , snap.child("itemUnit").val(), "Cancelled", "No Location Selected"];
                        console.log(dataset);
                        table1.rows.add([dataset]).draw();
                    } else {
                        donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                            let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                            let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                , snap.child("itemUnit").val(), "Cancelled", "No Location Selected"];
                            console.log(dataset);
                            table1.rows.add([dataset]).draw();
                        });
                    }
                }
            });
        }else if(String(snap.child("delStatus").val())==="3"){
            userref.child(snap.child("donorId").val()).once("value",snap2=> {
                if (String(snap.child("tLocId").val())) {
                    if (String(snap.child("tLocId").val())) {
                        locref.child(String(snap.child("tLocId").val())).once('value', snap4 => {
                            let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                            if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                                let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                    snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                    , snap.child("itemUnit").val(), "On going Delivery", snap4.child("tLocName").val()];
                                console.log(dataset);
                                table1.rows.add([dataset]).draw();
                            } else {
                                donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                                    let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                    let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                        snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                        , snap.child("itemUnit").val(), "On going Delivery", snap4.child("tLocName").val()];
                                    console.log(dataset);
                                    table1.rows.add([dataset]).draw();
                                });
                            }
                        });
                    }
                } else {
                    let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                    if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                        let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                            , snap.child("itemUnit").val(), "On going Delivery", "No Location Selected"];
                        console.log(dataset);
                        table1.rows.add([dataset]).draw();
                    } else {
                        donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                            let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                            let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                , snap.child("itemUnit").val(), "On going Delivery", "No Location Selected"];
                            console.log(dataset);
                            table1.rows.add([dataset]).draw();
                        });
                    }
                }
            });
        }

    });

    itemss.on("child_added",snap=>{
        if(String(snap.child("delStatus").val())==="0"){
            userref.child(snap.child("donorId").val()).once("value",snap2=>{
                if(String(snap.child("tLocId").val())){
                    if(String(snap.child("tLocId").val())){
                        locref.child(String(snap.child("tLocId").val())).once('value',snap4=>{
                            let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                            if(snap2.child("userFname").val()|| snap2.child("userLname").val()!==null) {
                                let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                    snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                    , snap.child("itemUnit").val(), "Pickup", snap4.child("tLocName").val(),""];
                                console.log(dataset);
                                table2.rows.add([dataset]).draw();
                            }else{
                                donoref.child(snap.child("donorId").val()).once("value",snap3=> {
                                    let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                    let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                        snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                        , snap.child("itemUnit").val(), "Pickup",  snap4.child("tLocName").val(),""];
                                    console.log(dataset);
                                    table2.rows.add([dataset]).draw();
                                });
                            }
                        });
                    }
                }else{
                    let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                    if(snap2.child("userFname").val()|| snap2.child("userLname").val()!==null) {
                        let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                            , snap.child("itemUnit").val(), "Pickup", "No Location Selected",""];
                        console.log(dataset);
                        table2.rows.add([dataset]).draw();
                    }else{
                        donoref.child(snap.child("donorId").val()).once("value",snap3=> {
                            let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                            let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                , snap.child("itemUnit").val(), "Pickup", "No Location Selected",""];
                            console.log(dataset);
                            table2.rows.add([dataset]).draw();
                        });
                    }
                }
            });
        }else if(String(snap.child("delStatus").val())==="1"){
            userref.child(snap.child("donorId").val()).once("value",snap2=> {
                if (String(snap.child("tLocId").val())) {
                    if (String(snap.child("tLocId").val())) {
                        locref.child(String(snap.child("tLocId").val())).once('value', snap4 => {
                            let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                            if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                                ref2.child(String(snap.child("donationPointPerson").val())).once("value",snap5=> {
                                    let name3 = snap5.child("echFname").val() + " " + snap5.child("echLname").val();
                                    let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                        snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                        , snap.child("itemUnit").val(), "Delivered", snap4.child("tLocName").val(),name3];
                                    console.log(dataset);
                                    table2.rows.add([dataset]).draw();
                                });

                            } else {
                                donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                                    let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                    ref2.child(String(snap.child("donationPointPerson").val())).once("value",snap5=> {
                                        let name3 = snap5.child("echFname").val() + " " + snap5.child("echLname").val();
                                        let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                            , snap.child("itemUnit").val(), "Delivered", snap4.child("tLocName").val(),name3];
                                        console.log(dataset);
                                        table2.rows.add([dataset]).draw();
                                    });
                                });
                            }
                        });
                    }
                } else {
                    let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                    if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                        let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                            , snap.child("itemUnit").val(), "Delivered", "No Location Selected",""];
                        console.log(dataset);
                        table2.rows.add([dataset]).draw();
                    } else {
                        donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                            let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                            let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                , snap.child("itemUnit").val(), "Delivered", "No Location Selected",""];
                            console.log(dataset);
                            table2.rows.add([dataset]).draw();
                        });
                    }
                }
            });
        }else if(String(snap.child("delStatus").val())==="2"){
            userref.child(snap.child("donorId").val()).once("value",snap2=> {
                if (String(snap.child("tLocId").val())) {
                    if (String(snap.child("tLocId").val())) {
                        locref.child(String(snap.child("tLocId").val())).once('value', snap4 => {
                            let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                            if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                                let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                    snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                    , snap.child("itemUnit").val(), "Cancelled", snap4.child("tLocName").val(),""];
                                console.log(dataset);
                                table2.rows.add([dataset]).draw();
                            } else {
                                donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                                    let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                    let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                        snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                        , snap.child("itemUnit").val(), "Cancelled", snap4.child("tLocName").val(),""];
                                    console.log(dataset);
                                    table2.rows.add([dataset]).draw();
                                });
                            }
                        });
                    }
                } else {
                    let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                    if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                        let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                            , snap.child("itemUnit").val(), "Cancelled", "No Location Selected",""];
                        console.log(dataset);
                        table2.rows.add([dataset]).draw();
                    } else {
                        donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                            let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                            let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                , snap.child("itemUnit").val(), "Cancelled", "No Location Selected",""];
                            console.log(dataset);
                            table2.rows.add([dataset]).draw();
                        });
                    }
                }
            });
        }else if(String(snap.child("delStatus").val())==="3"){
            userref.child(snap.child("donorId").val()).once("value",snap2=> {
                if (String(snap.child("tLocId").val())) {
                    if (String(snap.child("tLocId").val())) {
                        locref.child(String(snap.child("tLocId").val())).once('value', snap4 => {
                            let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                            if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                                let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                                    snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                    , snap.child("itemUnit").val(), "On going Delivery", snap4.child("tLocName").val(),""];
                                console.log(dataset);
                                table2.rows.add([dataset]).draw();
                            } else {
                                donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                                    let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                                    let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                        snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                        , snap.child("itemUnit").val(), "On going Delivery", snap4.child("tLocName").val(),""];
                                    console.log(dataset);
                                    table2.rows.add([dataset]).draw();
                                });
                            }
                        });
                    }
                } else {
                    let name = snap2.child("userFname").val() + " " + snap2.child("userLname").val();
                    if (snap2.child("userFname").val() || snap2.child("userLname").val() !== null) {
                        let dataset = [snap.child("itemPledgeDate").val(), name, snap.child("itemCategory").val(),
                            snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                            , snap.child("itemUnit").val(), "On going Delivery", "No Location Selected",""];
                        console.log(dataset);
                        table2.rows.add([dataset]).draw();
                    } else {
                        donoref.child(snap.child("donorId").val()).once("value", snap3 => {
                            let name2 = snap3.child("donorFname").val() + " " + snap3.child("donorLname").val();
                            let dataset = [snap.child("itemPledgeDate").val(), name2, snap.child("itemCategory").val(),
                                snap.child("itemSubCategory").val(), snap.child("itemDescription").val(), snap.child("itemQty").val()
                                , snap.child("itemUnit").val(), "On going Delivery", "No Location Selected",""];
                            console.log(dataset);
                            table2.rows.add([dataset]).draw();
                        });
                    }
                }
            });
        }

    });


    // itemss.on("child_added",snap=>{
    //     let dataset = [snap.child("itemPledgeDate").val(),"",snap.child("itemCategory").val(),
    //         snap.child("").val(),snap.child("").val(),snap.child("").val(),snap.child("").val(),
    //         snap.child("").val(),snap.child("").val(),snap.child("").val()];
    // });
    // itemss.on("child_added",snap=>{
    //     if(String(snap.child("tLocId").val())==""){
    //         userref.child(snap.child("donorId").val()).once("value",suser=>{
    //             let fname = suser.child("userFname").val();
    //             let lname = suser.child("userLname").val();
    //             let name = fname+" "+lname;
    //             var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                 , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                 , "Pickup"//status
    //                 , snap.child("itemPledgeDate").val(),  "No location selected","No Evacuation Head Selected"];
    //             // console.log(dataSet);
    //             table1.rows.add([dataSet]).draw();
    //         });
    //
    //     }
    //     // console.log(snap.val());
    //     // console.log(snap.child("tLocId").val());
    //     let locuid = snap.child("tLocId").val();
    //     ref.on("value",snap2=>{
    //         // console.log(snap2.val());
    //         let location_name = snap2.child(locuid).child("tLocName").val();
    //         let del_status = snap.child("delStatus").val();
    //             if (del_status === "0") {
    //                 //check
    //                 console.log("Check");
    //                 if(locuid){
    //                     console.log("Check2");
    //                     userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                         let fname = suser.child("userFname").val();
    //                         let lname = suser.child("userLname").val();
    //                         let name = fname + " " + lname;
    //                         var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                             , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                             , "Pickup"//status
    //                             , snap.child("itemPledgeDate").val(), location_name];
    //                         // console.log(dataSet);
    //                         table1.rows.add([dataSet]).draw();
    //                     });
    //                 }
    //
    //             } else if (del_status === "1") {
    //                 userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //                     var dataSet = [name, snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                         , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                         , "Delivered"//status
    //                         , snap.child("itemPledgeDate").val(), location_name];
    //                     // console.log(dataSet);
    //                     table1.rows.add([dataSet]).draw();
    //                 });
    //             } else if (del_status === "2") {
    //                 userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //                     var dataSet = [name, snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                         , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                         , "Cancelled"//status
    //                         , snap.child("itemPledgeDate").val(), location_name];
    //                     // console.log(dataSet);
    //                     table1.rows.add([dataSet]).draw();
    //                 });
    //             } else if (del_status === "3") {
    //                 userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //
    //                     var dataSet = [name, snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                         , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                         , "On going Delivery"//status
    //                         , snap.child("itemPledgeDate").val(), location_name];
    //                     // console.log(dataSet);
    //                     table1.rows.add([dataSet]).draw();
    //                 });
    //             } else if(locuid=""){
    //                 userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //                     var dataSet = [name, snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                         , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                         , "No Action Taken"//status
    //                         , snap.child("itemPledgeDate").val(), "No location Selected"];
    //                     // console.log(dataSet);
    //                     table1.rows.add([dataSet]).draw();
    //                 });
    //             }
    //
    //
    //     });
    // });
    // itemss.on('child_added', snap => {
    //     // console.log(data.val())
    //
    //     // console.log(snap.child("itemStatus").val());
    //     let status = snap.child("delStatus").val();
    //     let tloc_id = snap.child("tLocId").val();
    //     // console.log(status);
    //     // console.log(tloc_id);
    //     if(status=='0'){
    //         let locid = snap.child('tLocId').val();
    //         ref.once('value',snap2=>{
    //             snap2.forEach(function (childsnap2) {
    //                 if(childsnap2.child("tLocId").val()==locid){
    //                     var dataSet = [
    //                         snap.child("itemCategory").val(), snap.child("itemSubCategory").val(),
    //                         snap.child("itemDescription").val(),
    //                         snap.child("itemQty").val(), snap.child("itemUnit").val(),
    //                         "Not Delivered",snap.child("itemPledgeDate").val(),childsnap2.child("tLocName").val()];
    //                     // console.log(dataSet);
    //                     table1.rows.add([dataSet]).draw();
    //                 }else {
    //                     var dataSet = [
    //                         snap.child("itemCategory").val(), snap.child("itemSubCategory").val(),
    //                         snap.child("itemDescription").val(),
    //                         snap.child("itemQty").val(), snap.child("itemUnit").val(),
    //                         "Not Delivered",snap.child("itemPledgeDate").val(),"N/A"];
    //                     // console.log(dataSet);
    //                     table1.rows.add([dataSet]).draw();
    //                 }
    //             });
    //         });
    //
    //     }else if(status=='1')
    //     {
    //         let locid = snap.child('tLocId').val();
    //         ref.once('value',snap2=>{
    //             snap2.forEach(function (childsnap2) {
    //
    //                 if(childsnap2.child("tLocId").val()==locid){
    //                     var dataSet = [
    //                         snap.child("itemCategory").val(), snap.child("itemSubCategory").val(),
    //                         snap.child("itemDescription").val(),
    //                         snap.child("itemQty").val(), snap.child("itemUnit").val(),
    //                         "Not Delivered",snap.child("itemPledgeDate").val(),childsnap2.child("tLocName").val()];
    //                     // console.log(dataSet);
    //                     table1.rows.add([dataSet]).draw();
    //                 }else {
    //                     var dataSet = [
    //                         snap.child("itemCategory").val(), snap.child("itemSubCategory").val(),
    //                         snap.child("itemDescription").val(),
    //                         snap.child("itemQty").val(), snap.child("itemUnit").val(),
    //                         "Not Delivered",snap.child("itemPledgeDate").val(),"N/A"];
    //                     // console.log(dataSet);
    //                     table1.rows.add([dataSet]).draw();
    //                 }
    //             });
    //         });
    //
    //
    //         // document.getElementById('deliverymade').innerText = numofitems;
    //     }
    //
    // });
    // console.log(itemss);
    // Setup - add a text input to each footer cell

    // itemss.on("child_added",snap=>{
    //     if(String(snap.child("tLocId").val())===""){
    //         if(String(snap.child("donationPointPerson").val())){
    //             userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                 let fname = suser.child("userFname").val();
    //                 let lname = suser.child("userLname").val();
    //                 let name = fname + " " + lname;
    //                 var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                     , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                     , "Pickup"//status
    //                     , snap.child("itemPledgeDate").val(), "No location selected", ""];
    //                 // console.log(dataSet);
    //                 table2.rows.add([dataSet]).draw();
    //             });
    //         }else{
    //             userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                 let fname = suser.child("userFname").val();
    //                 let lname = suser.child("userLname").val();
    //                 let name = fname + " " + lname;
    //             ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=>{
    //                 console.log(snap3.child("echFname").val());
    //             });
    //             var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                 , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                 , "Pickup"//status
    //                 , snap.child("itemPledgeDate").val(),  "No location selected",snap.child("donationPointPerson").val()];
    //             // console.log(dataSet);
    //             table2.rows.add([dataSet]).draw();
    //         }
    //             )};
    //
    //     }
    //     // console.log(snap.val());
    //     // console.log(snap.child("tLocId").val());
    //     let locuid = snap.child("tLocId").val();
    //     ref.on("value",snap2=>{
    //         // console.log(snap2.val());
    //         let location_name = snap2.child(locuid).child("tLocName").val();
    //         let del_status = String(snap.child("delStatus").val());
    //         if (del_status === "0") {
    //             //check
    //             console.log("Check");
    //             if(locuid){
    //                 if(ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=>{
    //                     // console.log(snap3.child("echFname").val()+" "+snap3.child("echLname").val());
    //                 }))
    //                 {userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //                     ref2.child(snap.child("donationPointPerson").val()).once("value", snap3 => {
    //                         let name = String(snap3.child("echFname").val() + " " + snap3.child("echLname").val());
    //                         console.log("Check2");
    //                         var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                             , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                             , "Pickup"//status
    //                             , snap.child("itemPledgeDate").val(), location_name, name];
    //                         // console.log(dataSet);
    //                         table2.rows.add([dataSet]).draw();
    //                     });
    //                 });
    //                 }else{
    //                     if(snap.child("").val()==="0"){
    //                         userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                             let fname = suser.child("userFname").val();
    //                             let lname = suser.child("userLname").val();
    //                             let name = fname + " " + lname;
    //                             var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                                 , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                                 , "Pickup"//status
    //                                 , snap.child("itemPledgeDate").val(), location_name, "No Evacuation Head Selected"];
    //                             // console.log(dataSet);
    //                             table2.rows.add([dataSet]).draw();
    //                         });
    //                     }else if(snap.child("").val()==="1"){
    //                         userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                             let fname = suser.child("userFname").val();
    //                             let lname = suser.child("userLname").val();
    //                             let name = fname + " " + lname;
    //                             var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                                 , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                                 , "Delivered"//status
    //                                 , snap.child("itemPledgeDate").val(), location_name, "No Evacuation Head Selected"];
    //                             // console.log(dataSet);
    //                             table2.rows.add([dataSet]).draw();
    //                         });
    //                     }else if(snap.child("").val()==="2"){
    //                         userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                             let fname = suser.child("userFname").val();
    //                             let lname = suser.child("userLname").val();
    //                             let name = fname + " " + lname;
    //                             var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                                 , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                                 , "Cancelled"//status
    //                                 , snap.child("itemPledgeDate").val(), location_name, "No Evacuation Head Selected"];
    //                             // console.log(dataSet);
    //                             table2.rows.add([dataSet]).draw();
    //                         });
    //                     }else if(snap.child("").val()==="3"){
    //                         userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                             let fname = suser.child("userFname").val();
    //                             let lname = suser.child("userLname").val();
    //                             let name = fname + " " + lname;
    //                             var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                                 , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                                 , " On going Delivery"//status
    //                                 , snap.child("itemPledgeDate").val(), location_name, "No Evacuation Head Selected"];
    //                             // console.log(dataSet);
    //                             table2.rows.add([dataSet]).draw();
    //                         });
    //                     }
    //
    //
    //                 }
    //
    //
    //
    //
    //             }
    //
    //         } else if (del_status === "1") {
    //             if(locuid){
    //                 if(ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=>{
    //                     // console.log(snap3.child("echFname").val()+" "+snap3.child("echLname").val());
    //                 }))
    //                 {userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //                     ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=> {
    //                         let name = String(snap3.child("echFname").val() + " " + snap3.child("echLname").val());
    //                         console.log("Check2");
    //                         var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                             , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                             , "Pickup"//status
    //                             , snap.child("itemPledgeDate").val(), location_name, name];
    //                         // console.log(dataSet);
    //                         table2.rows.add([dataSet]).draw();
    //                     });
    //                     });
    //
    //                 }else{
    //                     userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                         let fname = suser.child("userFname").val();
    //                         let lname = suser.child("userLname").val();
    //                         let name = fname + " " + lname;
    //                         var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                             , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                             , "Pickup"//status
    //                             , snap.child("itemPledgeDate").val(), location_name, "No Evacuation Head Selected"];
    //                         // console.log(dataSet);
    //                         table2.rows.add([dataSet]).draw();
    //                     });
    //                 }
    //
    //
    //
    //
    //             }
    //         } else if (del_status === "2") {
    //             if(locuid){
    //                 if(ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=>{
    //                     // console.log(snap3.child("echFname").val()+" "+snap3.child("echLname").val());
    //                 }))
    //                 {
    //                     userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                         let fname = suser.child("userFname").val();
    //                         let lname = suser.child("userLname").val();
    //                         let name = fname + " " + lname;
    //                     ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=> {
    //                         let name = String(snap3.child("echFname").val() + " " + snap3.child("echLname").val());
    //                         console.log("Check2");
    //                         var dataSet = [name, snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                             , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                             , "Cancelled"//status
    //                             , snap.child("itemPledgeDate").val(), location_name, name];
    //                         // console.log(dataSet);
    //                         table2.rows.add([dataSet]).draw();
    //                     });
    //
    //                     });
    //
    //                 }else{
    //                     userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                         let fname = suser.child("userFname").val();
    //                         let lname = suser.child("userLname").val();
    //                         let name = fname + " " + lname;
    //                         var dataSet = [name, snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                             , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                             , "Cancelled"//status
    //                             , snap.child("itemPledgeDate").val(), location_name, "No Evacuation Head Selected"];
    //                         // console.log(dataSet);
    //                         table2.rows.add([dataSet]).draw();
    //                     });
    //                 }
    //
    //
    //
    //
    //             }
    //         } else if (del_status === "3") {
    //             if(locuid){
    //                 if(ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=>{
    //                     // console.log(snap3.child("echFname").val()+" "+snap3.child("echLname").val());
    //                 }))
    //                 {
    //                     userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                         let fname = suser.child("userFname").val();
    //                         let lname = suser.child("userLname").val();
    //                         let name = fname + " " + lname;
    //                     ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=> {
    //                         let name = String(snap3.child("echFname").val() + " " + snap3.child("echLname").val());
    //                         console.log("Check2");
    //                         var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                             , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                             , "Pickup"//status
    //                             , snap.child("itemPledgeDate").val(), location_name, name];
    //                         // console.log(dataSet);
    //                         table2.rows.add([dataSet]).draw();
    //                     });
    //                     });
    //
    //                 }else{userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //                     var dataSet = [name, snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                         , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                         , "Pickup"//status
    //                         , snap.child("itemPledgeDate").val(), location_name, "No Evacuation Head Selected"];
    //                     // console.log(dataSet);
    //                     table2.rows.add([dataSet]).draw();
    //                 });
    //                 }
    //
    //
    //
    //
    //             }
    //         } else if(locuid=""){
    //             if(ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=>{
    //                 // console.log(snap3.child("echFname").val()+" "+snap3.child("echLname").val());
    //             }))
    //             {
    //                 userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //                 ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=> {
    //                     let name = String(snap3.child("echFname").val() + " " + snap3.child("echLname").val());
    //                     console.log("Check2");
    //                     var dataSet = [name,snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                         , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                         , "Pickup"//status
    //                         , snap.child("itemPledgeDate").val(), "", name];
    //                     // console.log(dataSet);
    //                     table2.rows.add([dataSet]).draw();
    //                 });
    //                 });
    //
    //             }else{
    //                 userref.child(snap.child("donorId").val()).once("value",suser=> {
    //                     let fname = suser.child("userFname").val();
    //                     let lname = suser.child("userLname").val();
    //                     let name = fname + " " + lname;
    //                     var dataSet = [name, snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //                         , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //                         , "Pickup"//status
    //                         , snap.child("itemPledgeDate").val(), "", "No Evacuation Head Selected"];
    //                     // console.log(dataSet);
    //                     table2.rows.add([dataSet]).draw();
    //                 });
    //             }
    //             // var dataSet = [snap.child("itemCategory").val(), snap.child("itemSubCategory").val()
    //             //     , snap.child("itemDescription").val(), snap.child("itemQty").val(), snap.child("itemUnit").val()
    //             //     , "No Action Taken"//status
    //             //     , snap.child("itemPledgeDate").val(), "No location seen",""];
    //             // // console.log(dataSet);
    //             // table2.rows.add([dataSet]).draw();
    //             // ref2.child(snap.child("donationPointPerson").val()).once("value",snap3=>{
    //             //     console.log(snap3.child("echFname").val()+" "+snap3.child("echLname").val());
    //             // });
    //         }
    //
    //
    //     });
    // });


    $('#approve tfoot th').each( function (i) {
        var title = $('#approve thead th').eq( $(this).index() ).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" data-index="'+i+'" />' );
    } );

    $( table2.table().container() ).on( 'keyup', 'tfoot input', function () {
        table2
            .column( $(this).data('index') )
            .search( this.value )
            .draw();
    } );
    $('#itemtable tfoot th').each( function (i) {
        var title = $('#itemtable thead th').eq( $(this).index() ).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" data-index="'+i+'" />' );
    } );

    $( table1.table().container() ).on( 'keyup', 'tfoot input', function () {
        table1
            .column( $(this).data('index') )
            .search( this.value )
            .draw();
    } );

});