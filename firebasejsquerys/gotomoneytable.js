$(document).ready(function () {

    database5 = firebase.database();


    var itemss = database5.ref('tblLiquidation');
    let money = database5.ref('tblDonatedMoney');
    var storage = firebase.storage();
    var table1 = $('#donationcash').DataTable({
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

            }, 'print',

        ]
    });


    // liquidation.push({
    //     datetimePledge: getDate(),
    //     amountDonated: document.getElementById("cash_amount").value,
    //     imageUrl:"",
    //     amountLeft:0,
    //     amountSpent:0,
    //     breakdown:""
    // });
    let total = 0;
    let rev = 0;
    itemss.on('child_added',snap=>{
        let imagesrc = snap.child("imageUrl").val();
        let image = '<img id="Img" name="Img" src='+imagesrc+'width="200dp" height="200dp"/>';
        let g = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(snap.child('amountSpent').val());
        // let dataset = [image,snap.child('breakdown').val(),g];
        let dataset = [snap.child("datetimePledge").val(),image,snap.child("breakdown").val(),g];
        table1.rows.add([dataset]).draw();
    });
});
var table2 = $('#DonatedMoney').DataTable({
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

        }, 'print',

    ]
});
let database2 = firebase.database();
let ref2 = database2.ref('tblDonatedMoney');
let ref3 = database2.ref();
let ref4 = database2.ref();
ref2.on('child_added',snap=>{
    console.log(snap.child("donorId").val());
    let donorid = snap.child("donorId").val();
    ref3.child("tblUsers").child(donorid).once("value",function (snap2) {
       if(snap2.val()){
           console.log(snap2.child("userFname").val()+" "+snap2.child("userLname").val());
           let g = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(snap.child("totalMoneyDonation").val());
           let fname = snap2.child('userFname').val();
           let lname = snap2.child('userLname').val();
           let name = fname+' '+lname;
           let imagesrc = snap.child("imageUrl").val();
           let image = '<img id="Img" name="Img" src='+imagesrc+'width="200dp" height="200dp"/>';
           // let dataset = [image,name,snap.child('dateTimePledge').val(), g];
           let dataset = [snap.child('dateTimePledge').val(),image,name,g];
           table2.rows.add([dataset]).draw();
       }
    });
});
// ref2.on('child_added',snap=>{
//     console.log(snap.child("donorId").val());
//     ref3.child('tblDonors').orderByChild('donorId').equalTo(snap.child("donorId").val()).once("value",function (snap2) {
//         snap2.forEach(function (data) {
//             if(snap2.val()){
//                 console.log(data.child("userId").val());
//                 let uid = String(data.child("userId").val());
//                 ref4.child('tblUsers').child(uid).once("value",function (snap3) {
//                     // console.log(snap3.val());
//                     // console.log(snap3.child('userFname').val());
//                     let st = snap.child("totalMoneyDonation").val();
//                     let st2 = parseInt(st.replace('Php ',''));
//                     let g = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(st2);
//                     let fname = snap3.child('userFname').val();
//                     let lname = snap3.child('userLname').val();
//                     let name = fname+' '+lname;
//                     let imagesrc = snap.child("imageUrl").val();
//                     let image = '<img id="Img" name="Img" src='+imagesrc+'width="200dp" height="200dp"/>';
//                     let dataset = [image,name,snap.child('dateTimePledge').val(), g];
//                     table2.rows.add([dataset]).draw();
//
//
//
//                     // snap3.forEach(function (data2) {
//                     //     if(snap3.val()){
//                     //         console.log(data2.val());
//                     //         ref5.child('').child(uid).child('userFname').once("value",function (snap4) {
//                     //
//                     //         })
//                     //     }
//                     // })
//                 });
//             }
//         })
//     });
// });
    // money.once('value').then(function (snap) {
    //     snap.forEach(function (csnap) {
    //        console.log(csnap.child("dateTimePledge").val());
    //                     let rem = csnap.child("totalMoneyDonation").val();
    //                     let re = rem.replace("Php ","");
    //                     let r = parseInt(re);
    //                     itemss.push({
    //                         amountDonated:r,
    //                         amountLeft:0,
    //                         amountSpent:0,
    //                         breakdown:'',
    //                         dateTimePledge:csnap.child("dateTimePledge").val(),
    //                         imageUrl:''
    //
    //                     });
    //        //  itemss.orderByChild('dateTimePledge').on('child_added',
    //        //      function (snapshot) {
    //        //          console.log(snapshot.val());
    //        //      })
    //     });
    //
    // });

    // money.on('child_added',snap=>{
    //     itemss.once('child_added',snap2 =>{
    //         if(snap2.child("dateTimePledge").val()!=null || snap2.child("dateTimePledge").val()!=="not defined"){
    //             // let rem = snap.child("totalMoneyDonation").val();
    //             // let re = rem.replace("Php ","");
    //             // let r = parseInt(re);
    //             // itemss.push({
    //             //     amountDonated:r,
    //             //     amountLeft:0,
    //             //     amountSpent:0,
    //             //     breakdown:'',
    //             //     dateTimePledge:snap.child("dateTimePledge").val(),
    //             //     imageUrl:''
    //             //
    //             // });
    //             console.log(snap.child("dateTimePledge").val());
    //             console.log(snap2.child("dateTimePledge").val());
    //
    //
    //                 // total = rev+r;
    //                 // rev = total;
    //                 // console.log(total);
    //                 // alert("MAMA MO TUMAMA");
    //                 // console.log(snap2.child("dateTimePledge").val());
    //         }
    //     });
    // });

//     itemss.on('child_added', snap => {
//         // console.log(snap.child("imageUrl").val());
//         // var httpsReference = storage.refFromURL(snap.child("imageUrl").val());
//         // let img =
//
//        console.log(snap.child("TotalSpent").val());
//         // let g ='<img style="height:100px; width:auto " src="'+snap.child("TotalSpent/BreaknTotal/imgrecipt").val()+'">';
//         // let dataSet = [g,snap.child("TotalSpent/BreaknTotal/breakdown").val(),snap.child("TotalSpent").val()];
//         // table1.rows.add([dataSet]).draw();
//             // var content = '';
//             // snap.forEach(function(){
//             //     content +='<tr>';
//             //     content += '<td>' + snap.child("imageUrl").val() + '</td>';
//             //     content += '<td>' + snap.child("breakdown").val() + '</td>';
//             //     content += '</tr>';
//             //
//             // });
//             // $('#donationcash').append(content);
//             // $('#itemtable').DataTable({
//             //     // bSort: false,
//             //     // _aSortData:true,
//             //     // "scrollY":        "300px",
//             //     "scrollCollapse": true,
//             //     // "info":           true,
//             //     "paging": true,
//             //     dom: 'Bfrtip',
//             //     buttons: [
//             //         {extend: 'copy', attr: {id: 'allan'}}, 'csv', 'excel', {
//             //             extend: 'pdf',
//             //
//             //         }, 'print'
//             //     ]
//             // });
//
//
//
//         // httpsReference.getDownloadURL().then(function(url) {
//         //     // `url` is the download URL for 'images/stars.jpg'
//         //
//         //     // This can be downloaded directly:
//         //     var xhr = new XMLHttpRequest();
//         //     xhr.responseType = 'blob';
//         //     xhr.onload = function(event) {
//         //         var blob = xhr.response;
//         //     };
//         //     xhr.open('GET', url);
//         //     xhr.send();
//         //
//         //
//         //
//         // //
//         // //     // Or inserted into an <img> element:
//         // //     var img = document.getElementById('gg');
//         // //     // img.src = url;
//         // //     var dataSet= [img.src = url];
//         // //     console.log(dataSet);
//         // //     table1.rows.add([dataSet]).draw();
//         // }).catch(function(error) {
//         //     // Handle any errors
//         // });
//         // var dataSet = [
//         //     snap.child("imageUrl").val()];
//         // let url = snap.child("imageUrl").val();
//         // var dataSet= [url];
//         // console.log(dataSet);
//         // table1.rows.add([dataSet]).draw();
//     });
//     console.log(itemss);
//
//     // Setup - add a text input to each footer cell
//     // $('#itemtable tfoot th').each( function (i) {
//     //     var title = $('#itemtable thead th').eq( $(this).index() ).text();
//     //     $(this).html( '<input type="text" placeholder="Search '+title+'" data-index="'+i+'" />' );
//     // } );
//     //
//     // $( table1.table().container() ).on( 'keyup', 'tfoot input', function () {
//     //     table1
//     //         .column( $(this).data('index') )
//     //         .search( this.value )
//     //         .draw();
//     // } );
//
// });