$(document).ready(function () {


    let item = firebase.database().ref("tblDonatedItems");
    item.orderByChild("srcLoc").equalTo("Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines")
        .on("child_added",snap=>{
            if(String(snap.child("delStatus").val())==="0"){
                if(snap.child("tLocId").val()===""){
                let key = snap.key;
                let itemtolocate = String(snap.child("itemCategory").val())+ " "+snap.child("itemSubCategory").val()
                +" | "+snap.child("itemDescription").val();
                let loc = document.getElementById('Listofgoods');
                console.log(itemtolocate);
                console.log(loc);
                loc.options[loc.options.length] = new Option(itemtolocate, key);
                }
            }
        });
    let loc = firebase.database().ref("tblTargetLoc");
    loc.on("child_added",snap=>{
        if(snap.child("tLocName").val()!=="Nangka Barangay Hall (Marikina)"){
            let key = snap.key;
            let location = snap.child("tLocName").val() + " || " + snap.child("tLocAddress").val();
            let list = document.getElementById('Location');
            console.log(location);
            console.log(list);
            list.options[list.options.length] = new Option(location, key);
        }
    });
});

var table1 = $('#currentInventory').DataTable({
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

var table2 = $('#Delivered').DataTable({
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

database = firebase.database();
let itemss = database.ref('tblDonatedItems');
let userref = database.ref('tblUsers');
let locref = database.ref('tblTargetLoc');

function inventoryupdate(){
    let goods = document.getElementById('Listofgoods').value;
    let location = document.getElementById('Location').value;

    let locref1 = database.ref('tblTargetLoc');
    let itemss1 = database.ref('tblDonatedItems');
    // console.log(goods);
    // console.log(location);
    if(goods){
        if(confirm("Is the data correct?")){
            itemss1.child(goods).update({
                delPick:getDate(),
                delStatus:"3",
                tLocId:location
            });
            let evac = database.ref('tblEvacNeeds');
            itemss1.child(goods).once('value',snapss=>{
                locref1.child(location).once('value',snaps=>{
                    evac.orderByChild("evacplace").equalTo(String(snaps.child("tLocName").val())).once("child_added",snap=>{
                        let total = parseInt(snap.child("evacFamilyCount").val()) - parseInt(snapss.child("itemQty").val());
                        console.log(total);
                        if(total>0){
                            evac.child(snap.key).update({
                                evacFamilyCount:String(total)
                            });
                        }else{
                            evac.child(snap.key).update({
                                evacFamilyCount:"0"
                            });
                        }


                    });
                });
            });

            document.location.reload(true);
        }


    }else if(goods||location !==""){
        alert("List should not be empty");
    }
    else{
        alert("Please Pick in the List")
    }

}


itemss.orderByChild("srcLoc").equalTo("Makabayan Street, Nangka, Marikina City, Metro Manila, Philippines").on("child_added",snap =>{
    // console.log(snap.child("itemCategory").val());

    if(String(snap.child("delStatus").val())==="0")
    {
        userref.child(String(snap.child("donorId").val())).once('value',snap2=>{
            if(String(snap.child("tLocId").val())){
                locref.child(String(snap.child("tLocId").val())).once('value',snap3=>{
                    let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                    let dataset = [snap.child("itemPledgeDate").val(),name,snap.child("itemCategory").val(),
                        snap.child("itemSubCategory").val(),snap.child("itemDescription").val(),snap.child("itemQty").val()
                        ,snap.child("itemUnit").val(),"Pickup",snap3.child("tLocName").val()];
                    console.log(dataset);
                    table1.rows.add([dataset]).draw();
                });
            }else{
                let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                let dataset = [snap.child("itemPledgeDate").val(),name,snap.child("itemCategory").val(),
                    snap.child("itemSubCategory").val(),snap.child("itemDescription").val(),snap.child("itemQty").val()
                    ,snap.child("itemUnit").val(),"Pickup","No Location Selected"];
                console.log(dataset);
                table1.rows.add([dataset]).draw();
            }
        });
    }
    else if(String(snap.child("delStatus").val())==="1")
    {
        userref.child(String(snap.child("donorId").val())).once('value',snap2=>{
            if(String(snap.child("tLocId").val())){
                locref.child(String(snap.child("tLocId").val())).once('value',snap3=>{
                    let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                    let dataset = [snap.child("itemPledgeDate").val(),name,snap.child("itemCategory").val(),
                        snap.child("itemSubCategory").val(),snap.child("itemDescription").val(),snap.child("itemQty").val()
                        ,snap.child("itemUnit").val(),"Delivered",snap3.child("tLocName").val()];
                    console.log(dataset);
                    table2.rows.add([dataset]).draw();
                });
            }else{
                let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                let dataset = [snap.child("itemPledgeDate").val(),name,snap.child("itemCategory").val(),
                    snap.child("itemSubCategory").val(),snap.child("itemDescription").val(),snap.child("itemQty").val()
                    ,snap.child("itemUnit").val(),"Delivered","No Location Selected"];
                console.log(dataset);
                table2.rows.add([dataset]).draw();
            }
        });
    }
    else if(String(snap.child("delStatus").val())==="2")
    {
        userref.child(String(snap.child("donorId").val())).once('value',snap2=>{
            if(String(snap.child("tLocId").val())){
                locref.child(String(snap.child("tLocId").val())).once('value',snap3=>{
                    let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                    let dataset = [snap.child("itemPledgeDate").val(),name,snap.child("itemCategory").val(),
                        snap.child("itemSubCategory").val(),snap.child("itemDescription").val(),snap.child("itemQty").val()
                        ,snap.child("itemUnit").val(),"Cancelled",snap3.child("tLocName").val()];
                    console.log(dataset);
                    table1.rows.add([dataset]).draw();
                });
            }else{
                let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                let dataset = [snap.child("itemPledgeDate").val(),name,snap.child("itemCategory").val(),
                    snap.child("itemSubCategory").val(),snap.child("itemDescription").val(),snap.child("itemQty").val()
                    ,snap.child("itemUnit").val(),"Cancelled","No Location Selected"];
                console.log(dataset);
                table1.rows.add([dataset]).draw();
            }
        });
    }
    else if(String(snap.child("delStatus").val())==="3")
    {
        userref.child(String(snap.child("donorId").val())).once('value',snap2=>{
            if(String(snap.child("tLocId").val())){
                locref.child(String(snap.child("tLocId").val())).once('value',snap3=>{
                    let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                    let dataset = [snap.child("itemPledgeDate").val(),name,snap.child("itemCategory").val(),
                        snap.child("itemSubCategory").val(),snap.child("itemDescription").val(),snap.child("itemQty").val()
                        ,snap.child("itemUnit").val(),"On going Delivery",snap3.child("tLocName").val()];
                    console.log(dataset);
                    table.rows.add([dataset]).draw();
                });
            }else{
                    let name = snap2.child("userFname").val() +" "+snap2.child("userLname").val();
                    let dataset = [snap.child("itemPledgeDate").val(),name,snap.child("itemCategory").val(),
                        snap.child("itemSubCategory").val(),snap.child("itemDescription").val(),snap.child("itemQty").val()
                        ,snap.child("itemUnit").val(),"On going Delivery","No Location Selected"];
                    console.log(dataset);
                    table1.rows.add([dataset]).draw();
            }
        });
    }
});


function getDate(){
    var datetoday=new Date();
    var year=datetoday.getFullYear(); // 0
    var mon=datetoday.getMonth()+1; // 1
    var dayno=datetoday.getDate(); // 2
    var hour=datetoday.getHours(); // 3
    var min=datetoday.getMinutes(); // 4
    var sec=datetoday.getSeconds(); // to be used in option 8
    var milsec=datetoday.getMilliseconds();

    if (mon<10){
        mon = "0"+mon;
    }
    if (dayno<10){
        dayno = "0"+dayno;
    }
    if (hour<10){
        hour = "0"+hour;
    }
    if (min<10){
        min = "0"+min;
    }
    if (sec<10){
        sec = "0"+sec;
    }
    return year+"-"+mon+"-"+dayno+" "+hour+":"+"00";
}


function DateTimeNow(Zero29){
    var datetoday=new Date();
    var year=datetoday.getFullYear(); // 0
    var mon=datetoday.getMonth(); // 1
    var dayno=datetoday.getDate(); // 2
    var hour=datetoday.getHours(); // 3
    var min=datetoday.getMinutes(); // 4
    var sec=datetoday.getSeconds(); // to be used in option 8
    var milsec=datetoday.getMilliseconds();

    if (mon<10){mon='0'+String(mon);}
    if (dayno<10){dayno='0'+String(dayno);}
    if (hour<10){hour='0'+String(hour);}
    if (min<10){min='0'+String(min);}
    if (sec<10){sec='0'+String(sec);}
    if (milsec<10){milsec='00'+String(milsec);}
    else if(milsec<100){milsec='0'+String(milsec);}

    var date=String(year+'-'+mon+'-'+dayno); // 5
    var YearMon=String(year+'-'+mon); // 6
    var time=String(hour+':'+min); // 7
    var ISDateTime=String(date+' '+time+':'+sec);
    var AutoID=String(year+''+mon+''+dayno+''+hour+''+min+''+sec+''+milsec);

    if (Zero29==0){ return year;
    }else if(Zero29==1){ return mon;
    }else if(Zero29==2){ return dayno;
    }else if(Zero29==3){ return hour;
    }else if(Zero29==4){ return min;
    }else if(Zero29==5){ return date; //returns YYYY-MM-DD
    }else if(Zero29==6){ return YearMon; //returns YYYY-MM
    }else if(Zero29==7){ return time; //returns hh:mm
    }else if(Zero29==8){ return ISDateTime; //returns YYYY-MM-DD hh:mm:ss
    }else if(Zero29==9){ return AutoID; //returns YYYYMMDDhhmmssiii
    }else{ return date+' '+time;} //returns YYYY-MM-DD hh:mm
}
