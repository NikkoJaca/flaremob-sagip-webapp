function Preload(){
    clearFields();
    tBodyDriverList.innerHTML='';
    SearchFirebase(null,0,tBodyDriverList);

    txtDDFLastName.focus();
}

function RowSelect(row){
    var content=row.cells;

    txtDDFKey.value=content[0].innerHTML;
    txtDDFLastName.value=content[1].innerHTML;
    txtDDFFirstName.value=content[2].innerHTML;
    txtDDFEMailAdd.value=content[3].innerHTML;
    txtDDFEMailAddAuth.value=content[3].innerHTML;
    txtDDFPassword.value=content[4].innerHTML;
    txtDDFLicenseNumber.value=content[5].innerHTML;

    if(content[6].innerHTML!=''){
        txtDDFImageURL.value=content[6].innerHTML;
        imgDriver.src=content[6].innerHTML;
    }else{
        txtDDFImageURL.value='';
        imgDriver.src='img/driver_250x302.png';
    }

    
}

function clearFields(){
    imgDriver.src='img/driver_250x302.png';
    frmDriverDetailFields.reset();
    txtDDFLastName.focus();
}
function actionCreate(){
    if(txtDDFEMailAdd.value!='' && txtDDFFirstName.value!='' && txtDDFLastName.value!='' && txtDDFLicenseNumber.value!='' && txtDDFPassword.value!=''){
        //if(selectedFile==null){
            var ConfirmResult=confirm('This action will create new driver record.\nClick \'OK\' to continue.');

            if(ConfirmResult==true){
                var PSV=txtDDFEMailAdd.value+'+'+txtDDFFirstName.value+'+'+txtDDFLastName.value+'+'+txtDDFLicenseNumber.value+'+'+txtDDFPassword.value+'+'+txtDDFKey.value+'+'+"";
                SearchFirebase(PSV,1,txtSearchResult);

                setTimeout(function(){
                    if(txtSearchResult.value==0){
                        if(selectedFile==null){
                            var PSV2=txtDDFEMailAdd.value+'+'+txtDDFFirstName.value+'+'+txtDDFLastName.value+'+'+txtDDFLicenseNumber.value+'+'+txtDDFPassword.value; //+'+'+txtDDFKey.value; //+'+'+txtDDFImageURL.value;
                            RecordFirebase(PSV2,0);
                        }else{ //the user has an image/picture to upload
                            UploadPicture(txtDDFImageFile.value,selectedFile,0,PSV);
                        }
                        
                    }else if(txtSearchResult.value==1){
                        alert('The details you entered was already in the table');
                    }
                },1000);
            }
        //}else{ //the user has an image/picture to upload
            
        //}
        
    }else{ alert('Please complete the fields before clicking.');}
}
function actionUpdate(){
    if(txtDDFEMailAdd.value!='' && txtDDFFirstName.value!='' && txtDDFLastName.value!='' && txtDDFLicenseNumber.value!='' && txtDDFPassword.value!='' && txtDDFKey.value!=''){
        var ConfirmResult=confirm('This action will update the driver\'s record.\nClick \'OK\' to continue.');

        if(ConfirmResult==true){
            if(selectedFile==null){
                var PSV2=txtDDFEMailAdd.value+'+'+txtDDFFirstName.value+'+'+txtDDFLastName.value+'+'+txtDDFLicenseNumber.value+'+'+txtDDFPassword.value+'+'+txtDDFKey.value+'+'+txtDDFImageURL.value;
                RecordFirebase(PSV2,1);
            }else{ //the user has an image/picture to upload
                var PSV=txtDDFEMailAdd.value+'+'+txtDDFFirstName.value+'+'+txtDDFLastName.value+'+'+txtDDFLicenseNumber.value+'+'+txtDDFPassword.value+'+'+txtDDFKey.value; //+'+'+txtDDFImageURL.value;
                UploadPicture(txtDDFImageFile.value,selectedFile,1,PSV);
            }
            
        }
    }else{ alert('Please complete the fields before clicking.');}
}

function SearchFirebase(Filter,Action,objID){
    var FBDB=firebase.database();

    if(Action==0){ //display all record
        var refFBDB=FBDB.ref('tblDrivers');
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
                objID.innerHTML='<tr><td colspan="6">There are no records to show</td></tr>';
            }
        },function(error){
            objID.innerHTML='<tr><td colspan="6">'+error+'</td></tr>';
        });
    
    }else if(Action==1){ //cheacks if driver's details are unique
        var refFBDB=FBDB.ref('tblDrivers');
        refFBDB.once('value',function(data){
            if(data.exists()){
                var TheTable=data.val();
                var TheRows=Object.keys(TheTable);

                for(var i=0;i<TheRows.length;i++){
                    var k=TheRows[i];

                    if(TheTable[k].drvEmailAdd==Filter.split('+')[0] || TheTable[k].drvFname==Filter.split('+')[1] ||
                    TheTable[k].drvLname==Filter.split('+')[2] || TheTable[k].drvLicenseNum==Filter.split('+')[3]){
                        objID.value=1; //meaning, the record exists
                    }else{ objID.value=0;}
                }

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
        

    }else if(Action==1){ //updates a existing record
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

function DisplayMessageResult(Result,Msg){
    if(Result==1){ //affirmative
        /* divConfirmModal.style.display="block"; */
        divConfirmMsg.style.backgroundColor="#c1ffc6";
        spanMsgResult.innerHTML=Msg;
    }else if(Result==0){
        /* divConfirmModal.style.display="block"; */
        divConfirmMsg.style.backgroundColor="#ff7070";
        spanMsgResult.innerHTML=Msg;
    }

    divConfirmMsg.style.visibility="visible";
    divMainDisplay.style.pointerEvents="none";
}
function DisplayConfirmModalInitialUISettings(){
    /* divConfirmModal.style.display="none"; */
    divMainDisplay.style.pointerEvents="auto";
    divConfirmMsg.style.backgroundColor="#fff";
    divConfirmMsg.style.visibility="hidden";
    spanMsgResult.innerHTML='';

    Preload();
}


var selectedFile;
	var extFile = '';
	function openImage(event,Me,ImageDisplayTo,FileNameDisplayTo){
		selectedFile = event.target.files[0];
		var reader = new FileReader();

		var imgtag = ImageDisplayTo; //document.getElementById("VehicleImg");
		imgtag.title = selectedFile.name; //gets the file name

		reader.onload = function(event) {
		imgtag.src = event.target.result; 
		}

		var fileName=imgtag.title;
		var idxDot = fileName.lastIndexOf(".") + 1;
		extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
		if (extFile=="jpg" || extFile=="jpeg"){
			if (selectedFile.size>2097152){
				alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
				FileOpenReset();
			}else{
				if (imgtag.title!='v-inverted2_img_500x500.png'){
					reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
					//alert('new image selected.');
					//document.getElementById('txtStep1ImageUrl').value=imgtag.title;
					FileNameDisplayTo.value=imgtag.title;
				}else{
					alert('Please choose an image other than the default image.');
					FileOpenReset();
				}
			}
		}else{
			alert('Please choose a file with a file extension of JPG or JPEG');
			FileOpenReset();
		}

		function FileOpenReset(){
			Me.value=''; //document.getElementById('ImageOpen').value='';
			ImageDisplayTo.src=''; //document.getElementById('VehicleImg').src='img/v-inverted2_img_500x500.png';
		}
    }


    function UploadPicture(ImageName,selectedFile,Action,PSV){ //ImageName(w/ file type) will be the DateTimeNow(9) on creating a new record
        var FBStore=firebase.storage();
		var FileType=ImageName.split('.')[1];
		var NewFileName=String(txtDDFLicenseNumber.value)+'.'+FileType;
        var metaData={contentType: 'image/'+FileType, name:NewFileName};//ImageName}; //extFile, name:ImageName};
		var refFBStore=FBStore.ref('driver_pictures/'+NewFileName).put(selectedFile,metaData);
		var IsError='';
        
        refFBStore.on('state_changed',function(data){
			var progress=(data.bytesTransferred / data.totalBytes)*100;
			/* ResultUISettings(2);
			spanResult.innerHTML='Please wait... '+progress; */
            //spanMsg.innerHTML='Progress: '+progress;
        },function(error){
			IsError=error;
            //spanUploadMsg.innerHTML='Error on uploading the picture. '+error;//0; //won't show
        },function(){
			//spanUploadMsg.innerHTML='Picture succesfully uploaded.';//1; //won't show
			if(IsError==''){
				refFBStore.snapshot.ref.getDownloadURL().then(function(TheURL){
                    txtDDFImageURL.value=TheURL;

                    setTimeout(function(){
						//var NewPSV=PSV+'+'+TheURL; //alert(NewPSV);
                        //txtDDFImageURL.value=TheURL;
                        RecordFirebase(PSV+'+'+TheURL,Action);
                    },4700);
					
				});
			}
            
        });
    }
    
    function SearchDriver(){
        if(txtDDSearch.value!=''&&slcDDSearch.value!=''){
            SearchFirebase(slcDDSearch.value+'+'+txtDDSearch.value,2,tBodyDriverList);
        }else{
            SearchFirebase(null,0,tBodyDriverList);
        }
    }