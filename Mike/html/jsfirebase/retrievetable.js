database = firebase.database();
var ref = database.ref('tblDonatedItems');
ref.on('value',getdata,errData)

function getdata(data) {
    var name = data.val();
    var keys = Object.keys(name);
    // console.log(keys);
    bitems.innerHTML=null;
    hitems.innerHTML="<th>ITEM_ID</th><th>TITLE</th><th>DESCRIPTION</th><th>QUANTITY</th><th>UNIT</th><th>TYPE</th><th>DATETIME_PLEDGED</th><th>STATUS</th><th>DONOR_ID</th>";
    for(var i=0;i<keys.length;i++){
        var k=keys[i];
        bitems.innerHTML+='<tr><td>'+name[k].ITEM_ID+'</td>'+
            '<td>'+name[k].TITLE+'</td>'+
            '<td>'+name[k].DESCRIPTION+'</td>'+
            '<td>'+name[k].QUANTITY+'</td>'+
            '<td>'+name[k].UNIT+'</td>'+
            '<td>'+name[k].TYPE+'</td>'+
            '<td>'+name[k].DATETIME_PLEDGED+'</td>'+
            '<td>'+name[k].STATUS+'</td>'+
            '<td>'+name[k].DONOR_ID+'</td></tr>';
    }
}