function Preload(){
    clearFields();
    tBodyAreaList.innerHTML='';
    SearchFirebase(null,0,tBodyAreaList);
}

function RowSelect(row){
    var content=row.cells;

    clearFields();

    txtADFKey.value=content[0].innerHTML;
    txtADFAreaNumber.value=content[1].innerHTML;
    txtADFAreaNumberRetainer.value=content[1].innerHTML;

    //Streets data
    var StreetStringLength=content[2].innerHTML.length;
    var SSLFrontTrim=content[2].innerHTML.slice(4,StreetStringLength); //alert(SSLFrontTrim);
    var SSLRearTrim=SSLFrontTrim.substring(0,SSLFrontTrim.length-5); //alert(SSLRearTrim);
    var StreetCount=SSLRearTrim.split("<li>").length; //alert(SSLRearTrim+"\n"+StreetCount);
    var SplitStreetKeys=content[3].innerHTML.split(",");
    for(var i=0;i<StreetCount;i++){
        AddSelectOption(1,txtADFStreets,slcADFStreets,SplitStreetKeys[i],SSLRearTrim.split("<li>")[i]);
        //AddSelectOption(txtADFStreets,slcADFStreets,txtADFStreets.value,txtADFStreets.value);
    }

    //Subdivision data
    var SubdivisionStringLength=content[4].innerHTML.length;
    var SubSLFrontTrim=content[4].innerHTML.slice(4,SubdivisionStringLength); //alert(SSLFrontTrim);
    var SubSLRearTrim=SubSLFrontTrim.substring(0,SubSLFrontTrim.length-5); //alert(SSLRearTrim);
    var SubdivisionCount=SubSLRearTrim.split("<li>").length; //alert(SSLRearTrim+"\n"+StreetCount);
    var SplitSubdivisionKeys=content[5].innerHTML.split(",");
    for(var i=0;i<SubdivisionCount;i++){
        AddSelectOption(1,txtADFSubdivision,slcADFSubdivision,SplitSubdivisionKeys[i],SubSLRearTrim.split("<li>")[i]);
    }
}

function clearFields(){
    frmDriverDetailFields.reset();
    slcADFStreets.innerHTML='';
    slcADFSubdivision.innerHTML='';
    //tBodyAreaList.innerHTML='';
    Ctr=0;
}

var Ctr=0;
function AddAreaNumber(){
    txtADFAreaNumber.value=Ctr++;
}
function MinusAreaNumber(){
    if(txtADFAreaNumber.value>0){
        txtADFAreaNumber.value=txtADFAreaNumber.value-1;
        Ctr--;
    }
}

//var DidUserRemoveAnOption=false;
function RemoveSelectOption(OutObjID){ //InObjID,OutObjID){
    //if(InObjID.value!='' || InObjID.value!=null){
        var TheSelectObject=document.getElementById(OutObjID); //"slcADFStreets");
        TheSelectObject.remove(TheSelectObject.selectedIndex);

        TheSelectObject.focus();
    //}
}
function AddSelectOption(Action,InObjID,OutObjID,objVal,objStr){
    //if(InObjID.value!='' || InObjID.value!=null || InObjID.value!=' ' || InObjID.value!=" "){
    //if(document.getElementById(InObjID).value!='' || document.getElementById(InObjID).value!=null){
        //document.getElementById(OutObjID).innerHTML+='<option value="'+objVal+'">'+objStr+'</option>';

        /* document.getElementById(InObjID).value='';
        document.getElementById(InObjID).focus();
    }else{
        document.getElementById(InObjID).value='';
        document.getElementById(InObjID).focus();
    } */
    //alert(document.getElementById(InObjID).value.length);
//alert(document.forms["frmDriverDetailFields"]["txtADFStreets"].value!='');
//alert(document.getElementById("txtADFStreets").value+"\n"+document.getElementById("txtADFSubdivision").value);

    if(Action==0){
        if(document.getElementById("txtADFStreets").value!='' || document.getElementById("txtADFSubdivision").value!=''){
            OutObjID.innerHTML+='<option value="'+objVal+'">'+objStr.trim()+'</option>';
            InObjID.value='';
            InObjID.focus();
        }else{
            InObjID.value='';
            InObjID.focus();
        }
    }else if(Action==1){
        OutObjID.innerHTML+='<option value="'+objVal+'">'+objStr.trim()+'</option>';
        InObjID.value='';
        InObjID.focus();
    }
    
}

function IsAreaNoUnique(Filter){
    var BooleResult;
    //if(document.getElementById("txtADFAreaNumber").value==document.getElementById("txtADFAreaNumberRetainer").value){
        //txtADFAreaNumberRetainer.value==txtADFAreaNumber.value){
        if(arrAreaNumber.indexOf(Filter)>-1){
            BooleResult=false;
        }else{
            if(document.getElementById("txtADFAreaNumber").value!=document.getElementById("txtADFAreaNumberRetainer").value){
                BooleResult=true;
            }else{
                BooleResult=false;
            }
        }
    /* }else{
        BooleResult=false;
    } */

    return BooleResult;
}
function actionCreate(Action){

    if(txtADFAreaNumber.value!='' && slcADFStreets.innerHTML!='' && slcADFSubdivision.innerHTML!=''){
        //alert(IsAreaNoUnique(txtADFAreaNumber.value)); //SearchFirebase(txtADFAreaNumber.value,1,null);
        //setTimeout(function(){
            if(Action==0 && IsAreaNoUnique(txtADFAreaNumber.value)==true){
                var ConfirmResult;

                ConfirmResult=confirm('This action will create new area record.\nClick \'OK\' to continue.');
                if(ConfirmResult==true){
                    txtADFKey.value="A"+DateTimeNow(9);    
                    CommonCode();
                }

            }else if(Action==1 && IsAreaNoUnique(document.getElementById("txtADFAreaNumber").value)==true){
                ConfirmResult=confirm('This action will update the area\'s record.\nClick \'OK\' to continue.');
                if(ConfirmResult==true){
                    var FBDB=firebase.database();
                    FBDB.ref('tblLocations').child(txtADFKey.value).remove();
                    CommonCode();
                }
            }else{
                alert('The area number you entered already exist.');

                txtADFAreaNumber.focus();
            }
        //},700);
    }else{ alert('Please complete the fields before clicking.');}

    function CommonCode(){
        var FBDB=firebase.database();
        var refFBDB=FBDB.ref('tblLocations').child(txtADFKey.value); //.child('areaNumber');
        var AreaNumberData={areaNumber:txtADFAreaNumber.value};

        refFBDB.set(AreaNumberData,function(error){
            if(!error){

                setTimeout(function(){
                    for(var i=0;i<document.getElementById('slcADFStreets').length;i++){
                        InsertStreets(document.getElementById('slcADFStreets').options[i].text);
                    }
                },1700);

                setTimeout(function(){
                    for(var i=0;i<document.getElementById('slcADFSubdivision').length;i++){
                        InsertSubdivisions(document.getElementById('slcADFSubdivision').options[i].text);
                    }
                },1700);

                setTimeout(function(){
                    if(InsertStreetsResult==true && InsertSubdivisionResult==true){

                        if(Action==0){
                            alert("Area data successfully recorded.");
                        }else if(Action==1){
                            alert("Area data successfully updated.");
                        }

                        Preload();
                    }
                },3000);

            }else{
                alert("Data insertion unable to push through. Data not recorded.");
            }
        });
    }
}

var InsertStreetsResult=false;
function InsertStreets(StreetName){
    var FBDB=firebase.database();
    var StreetUID="St"+DateTimeNow(9);
    var refFBDB=FBDB.ref('tblLocations').child(txtADFKey.value).child('Streets').child(StreetUID);
    var StreetsData={streetName:StreetName};

        refFBDB.set(StreetsData,function(error){
            if(!error){
                InsertStreetsResult=true;
            }
        });
}

var InsertSubdivisionResult=false;
function InsertSubdivisions(SubdivisionName){
    var FBDB=firebase.database();
    var SubdivisionUID="Sub"+DateTimeNow(9);
    var refFBDB=FBDB.ref('tblLocations').child(txtADFKey.value).child('Subdivision').child(SubdivisionUID);
    var SubdivisionData={subdivisionName:SubdivisionName};

    refFBDB.set(SubdivisionData,function(error){
        if(!error){
            InsertSubdivisionResult=true;
        }
    });
}

function actionUpdate(){
    actionCreate(1);
}

function removeAreaRecord(){
    var ConfirmResult=confirm('This action will delete the record of the selected area.\nClick \'OK\' to continue.');

    if(ConfirmResult==true){
        var FBDB=firebase.database();
        FBDB.ref('tblLocations').child(txtADFKey.value).remove().then(function(){
            alert('Area record successfully removed.');

            Preload();
        });
    }
    
}

var arrAreaKey=[];
var arrAreaNumber=[];
var IsAreaNoUnique;
function SearchFirebase(Filter,Action,objID){
    var FBDB=firebase.database();

    if(Action==0){ //display all record
        var refFBDB=FBDB.ref('tblLocations');
        refFBDB.once('value',function(data){
            if(data.exists()){
                var TheTable=data.val();
                var TheRows=Object.keys(TheTable);

                objID.innerHTML='';
                arrAreaKey=[];
                arrAreaNumber=[];

                for(var i=0;i<TheRows.length;i++){
                    var k=TheRows[i];

                    /* objID.innerHTML+='<tr id="'+k+'" onclick="RowSelect(this);" style="cursor:pointer;">'+
                    '<td>'+k+'</td>'+
                    '<td style="font-weight:bold;">'+TheTable[k].areaNumber+'</td>'+
                    '<td>'+TheTable[k].Streets+'</td>'+
                    '<td>'+TheTable[k].Subdivision+'</td></tr>'; */

                    objID.innerHTML+='<tr id="'+k+'" onclick="RowSelect(this);" style="cursor:pointer;">'+
                    '<td>'+k+'</td>'+
                    '<td style="font-weight:bold;">'+TheTable[k].areaNumber+'</td>'+
                    '<td id="cell2-'+k+'">please wait...</td>'+ //Street data
                    '<td id="cell3-'+k+'" class="hide"></td>'+ //Street key
                    '<td id="cell4-'+k+'">please wait...</td>'+ //Subdivision data
                    '<td id="cell5-'+k+'" class="hide"></td></tr>'; //Subdivision key

                    arrAreaKey.push(k);
                    arrAreaNumber.push(TheTable[k].areaNumber);
                }

                setTimeout(function(){ //data retrieval for cell2+k
                    for(var i=0;i<arrAreaKey.length;i++){ //alert(arrAreaKey[i]);
                        /* RetrieveStreets("cell2-"+arrAreaKey[i]);
                        RetrieveSubdivision("cell4-"+arrAreaKey[i]); */
                        RetrieveStreets("cell2-"+arrAreaKey[i],"cell3-"+arrAreaKey[i]);
                        RetrieveSubdivision("cell4-"+arrAreaKey[i],"cell5-"+arrAreaKey[i]);
                    }
                    
                },1300);
            }else{
                objID.innerHTML='<tr><td colspan="4" style="text-align:center;">There are no records to show</td></tr>';
            }
        },function(error){
            objID.innerHTML='<tr><td colspan="6">'+error+'</td></tr>';
        });

        function RetrieveStreets(objID1,objID2){
            var AreaKey=objID1.split("-")[1]; //alert(AreaKey);
            var refFBDB=FBDB.ref('tblLocations').child(AreaKey).child('Streets');
            refFBDB.once('value',function(data){
                if(data.exists()){ //alert(data.exists());
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    document.getElementById(objID1).innerHTML='';

                    for(var i=0;i<TheRows.length;i++){
                        var k=TheRows[i];
                        document.getElementById(objID1).innerHTML+="<li>"+TheTable[k].streetName;
                        if(document.getElementById(objID2).innerHTML==''){
                            document.getElementById(objID2).innerHTML=k;
                        }else{
                            document.getElementById(objID2).innerHTML+=","+k;
                        }
                    }
                }else{
                    document.getElementById(objID1).innerHTML='There are no records to show';
                }
            },function(error){
                document.getElementById(objID1).innerHTML=error;
            });
        }
        function RetrieveSubdivision(objID1,objID2){
            var AreaKey=objID1.split("-")[1]; //alert(AreaKey);
            var refFBDB=FBDB.ref('tblLocations').child(AreaKey).child('Subdivision');
            refFBDB.once('value',function(data){
                if(data.exists()){ //alert(data.exists());
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    document.getElementById(objID1).innerHTML='';

                    for(var i=0;i<TheRows.length;i++){
                        var k=TheRows[i];
                        document.getElementById(objID1).innerHTML+="<li>"+TheTable[k].subdivisionName;
                        if(document.getElementById(objID2).innerHTML==''){
                            document.getElementById(objID2).innerHTML=k;
                        }else{
                            document.getElementById(objID2).innerHTML+=","+k;
                        }
                    }
                }else{
                    document.getElementById(objID1).innerHTML='There are no records to show';
                }
            },function(error){
                document.getElementById(objID1).innerHTML=error;
            });
        }
    
    }else if(Action==1){ //checks if area's areaNumber is unique
        var refFBDB=FBDB.ref('tblLocations').orderByChild('areaNumber').equalTo(Filter);
        refFBDB.once('value',function(data){
            if(data.exists()){
                IsAreaNoUnique=false;
            }else{
                IsAreaNoUnique=true;
            }
        });
    }else if(Action==2){
        var TheChild=Filter.split('+')[0];
        var TheFilter=Filter.split('+')[1];
        var refFBDB=FBDB.ref('tblDrivers').orderByChild(TheChild).startAt(TheFilter).endAt(TheFilter+'\uf8ff');
        refFBDB.once('value',function(data){
            if(data.exists()){
                var TheTable=data.val();
                var TheRows=Object.keys(TheTable);

                objID.innerHTML='';

                for(var i=0;i<TheRows.length;i++){
                    var k=TheRows[i];

                    objID.innerHTML+='<tr id="'+k+'" onclick="RowSelect(this);" style="cursor:pointer;">'+
                    '<td>'+k+'</td>'+
                    '<td style="font-weight:bold;">'+TheTable[k].drvLname+'</td>'+
                    '<td style="font-weight:bold;">'+TheTable[k].drvFname+'</td>'+
                    '<td>'+TheTable[k].drvEmailAdd+'</td>'+
                    '<td>'+TheTable[k].drvPassword+'</td>'+
                    '<td>'+TheTable[k].drvLicenseNum+'</td>'+
                    '<td class="hide">'+TheTable[k].imageUrl+'</td></tr>';
                }
            }else{
                objID.innerHTML='<tr><td colspan="6" style="text-align:center;">Your search turned zero (0) result.</td></tr>';
            }
        },function(error){
            objID.innerHTML='<tr><td colspan="6">'+error+'</td></tr>';
        });
    }
}

function RecordFirebase(PSV,Action){
    var FBDB=firebase.database(); //alert(PSV.split('+')[6]);

    var TheData={drvEmailAdd:String(PSV.split('+')[0]),
    drvFname:PSV.split('+')[1],
    drvLname:PSV.split('+')[2],
    drvLicenseNum:PSV.split('+')[3],
    drvPassword:PSV.split('+')[4],
    imageUrl:PSV.split('+')[7]};
    /* alert('drvEmailAdd: '+String(PSV.split('+')[0])+'\n'+
    'drvFname: '+PSV.split('+')[1]+'\n'+
    'drvLname: '+PSV.split('+')[2]+'\n'+
    'drvLicenseNum: '+PSV.split('+')[3]+'\n'+
    'drvPassword: '+PSV.split('+')[4]+'\n'+
    'Split 5: '+PSV.split('+')[5]+'\n'+
    'Split 6: '+PSV.split('+')[6]+'\n'+
    'imageUrl: '+PSV.split('+')[7]); */
    if(Action==0){//alert(PSV.split('+')[0]+', '+PSV.split('+')[1]+', '+PSV.split('+')[2]+', '+PSV.split('+')[3]+', '+PSV.split('+')[4]+', '+PSV.split('+')[5]); //creates a new record
        var IsAuthError=false;

        //authenticates the email add before pushing the driver's detail
        //var AuthResult = 
        firebase.auth().createUserWithEmailAndPassword(String(PSV.split('+')[0]),String(PSV.split('+')[4])).catch(function(error){
            /* var errorCode=error.code;
            var errorMessage=error.message; */

            //alert('Failure in creating account.', errorMessage);
            IsAuthError=false;
        });

        //setTimeout(function(){ //alert(AuthResult); //returns object [Object]
            if(IsAuthError==false){
                var refFBDB=FBDB.ref('tblDrivers');
                refFBDB.push(TheData,function(error){
                    if(!error){
                        DisplayMessageResult(1,'Record successfully created.');
                    }else{
                        DisplayMessageResult(0,error);
                    } 
                });
            }else{
                alert('Failure in authenticating driver\'s email address and password.\nDriver record not created.');
            }
        //},1500);
        

    }else if(Action==1){ //updates an existing record
        var TheData={drvEmailAdd:String(PSV.split('+')[0]),
        drvFname:PSV.split('+')[1],
        drvLname:PSV.split('+')[2],
        drvLicenseNum:PSV.split('+')[3],
        drvPassword:PSV.split('+')[4],
        imageUrl:PSV.split('+')[6]};

        if(txtDDFEMailAddAuth.value!=txtDDFEMailAdd.value){
            firebase.auth().createUserWithEmailAndPassword(String(PSV.split('+')[0]),String(PSV.split('+')[4])).catch(function(error){
                var errorCode=error.code;
                var errorMessage=error.message;
    
                alert('Failure in creating account.', errorMessage);
            });
        }
        /* alert('drvEmailAdd: '+String(PSV.split('+')[0])+'\n'+
        'drvFname: '+PSV.split('+')[1]+'\n'+
        'drvLname: '+PSV.split('+')[2]+'\n'+
        'drvLicenseNum: '+PSV.split('+')[3]+'\n'+
        'drvPassword: '+PSV.split('+')[4]+'\n'+
        'Split 5: '+PSV.split('+')[5]+'\n'+
        'Split 6: '+PSV.split('+')[6]+'\n'+
        'imageUrl: '+PSV.split('+')[7]); */
        var refFBDB=FBDB.ref('tblDrivers').child(PSV.split('+')[5]);
        refFBDB.update(TheData,function(error){
            if(!error){
                DisplayMessageResult(1,'Record successfully modified.');
            }else{
                DisplayMessageResult(0,error);
            } 
        });

    }
}

    function DateTimeNow(Zero29){
        var datetoday=new Date();
        var year=datetoday.getFullYear(); // 0
        var mon=datetoday.getMonth()+1; // 1
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