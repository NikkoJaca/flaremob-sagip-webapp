db = firebase.database();
var itemss = db.ref('tblEvacNeeds');
var refs = db.ref('tblTargetLoc');

var table1 = $('#needs').DataTable({
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
let uidloc;
let clocid;
itemss.on('child_added', snap => {
    // console.log(snap.child("tLocId").val());
    uidloc = snap.child("tLocId").val();
    itemneeds = [];
    itemneeds.push( snap.child("evacitems").val());
    console.log(itemneeds);
        var dataSet = [
            itemneeds, snap.child("evacFamilyCount").val(),
            snap.child("evacplace").val()];
        // console.log(dataSet);
        table1.rows.add([dataSet]).draw();



});

    // console.log(uidloc);
//
// ref.on('child_added', get5 => {
//     uidloc = get5.key;
//     itemss.on('child_added', snap => {
//     // clocid = snap.child("tLocId");
//     console.log(uidloc);
//     // console.log(clocid)
//     // console.log(get5.child("tLocName").val());
//     if(toString(uidloc)==toString(snap.child("tLocId"))){
//         console.log("NAME OF EVAC");
//         console.log(get5.child("tLocName").val());
//         console.log("END NAME OF EVAC");
//     // var dataSet = [
//     //     snap.child("evacItems").val(), snap.child("evacNeed").val(),
//     //     get.child("tLocName")];
//     // // console.log(dataSet);
//     // table1.rows.add([dataSet]).draw();
//     }
//     });
// });