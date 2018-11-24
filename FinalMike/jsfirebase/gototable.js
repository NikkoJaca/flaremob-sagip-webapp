$(document).ready(function () {

    database5 = firebase.database();
    var itemss = database5.ref('donatedItems');

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

    itemss.on('child_added', snap => {
        var dataSet = [
            snap.child("donorId").val(), snap.child("itemDesc").val(), snap.child("itemName").val(),
            snap.child("itemPledgeDate").val(), snap.child("itemQty").val(), snap.child("itemUnit").val(),
            snap.child("itemStatus").val()];
        // console.log(dataSet);
        table1.rows.add([dataSet]).draw();
    });
    // Setup - add a text input to each footer cell
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
