function enableFields(cb,quantity,desc)
{
    if(cb.checked)
    {
        document.getElementById(quantity).disabled = false;
        document.getElementById(desc).disabled = false;
    }else{
        document.getElementById(quantity).disabled = true;
        document.getElementById(desc).disabled = true;
    }

}

function enableField(cb,quantity,unit,desc)
{
    if(cb.checked)
    {
        document.getElementById(quantity).disabled = false;
        document.getElementById(desc).disabled = false;
        document.getElementById(unit).disabled = false;        
    }else{
        document.getElementById(quantity).disabled = true;
        document.getElementById(desc).disabled = true;
        document.getElementById(unit).disabled = true;        
    }

}

$(document).ready(function(){
    var i=1;
   $("#add_row").click(function(){
    $('#addr'+i).html("<td>"+ (i+1) +"</td>"+
    "<td>"+
        "<div class='form-group'>"+
            "<select class='form-control' id='selFood"+i+"' onchange='onchanged()'>"+
            "<option value='Canned Goods'>Canned Goods</option>"+
            "<option value='Instant Noodles'>Instant Noodles</option>"+
            "<option value='Rice'>Rice</option>"+
            "<option value='Other Food'>Other Food</option>"+
            "</select>"+
        "</div>"+
    "</td>"+
    "<td><input type='number' class='form-control' id='quantityFood"+i+"' placeholder='How many?' name='quantityFood"+i+"'></td>"+
    "<td>Pieces</td>"+
    "<td><div class='col-sm-12'><textarea class='form-control' rows='3' id='descFood"+i+"' placeholder='Brand, Grams, mL,  size, etc.' name='descFood"+i+"'></textarea></div></td>"+
    "<script>"+
        "function onchanged(){"+
        "var e = document.getElementById('selFood"+i+"');"+
        "var strUser = e.options[e.selectedIndex].text; log.console(strUser);}</script>");

    $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
    i++; 
});
   $("#delete_row").click(function(){
       if(i>1){
       $("#addr"+(i-1)).html('');
       i--;
       }
   });

});
