            function rowSelect(row){
				clearFields();
				var content=row.cells;
				document.getElementById('txtVID').value=content[0].innerHTML;
				document.getElementById('txtPlateNo').value=content[1].innerHTML;
				document.getElementById('txtColor').value=content[2].innerHTML;
				document.getElementById('txtMake').value=content[3].innerHTML;
				document.getElementById('txtModel').value=content[4].innerHTML;
				document.getElementById('txtDescription').value=content[5].innerHTML;
				document.getElementById('txtType').value=content[6].innerHTML;
				document.getElementById('slcSvcStat').value=content[7].innerHTML;

				if (content[9].innerHTML!=''){
					document.getElementById('VehicleImg').src=content[9].innerHTML; //'upload_img/'+content[8].innerHTML;
					document.getElementById('txtFileName').value=content[9].innerHTML;
					//DownloadPicture('vehicle_pictures',txtFileName.value,VehicleImg);
				}
				txtUID.value=content[10].innerHTML; //txtUID and txtVID are all the same
			}
			
			function clearFields(){
				document.getElementById('frmVDetails').reset();
				document.getElementById('VehicleImg').src='img/v-inverted2_img_500x500.png';
				spanMsg.innerHTML='';
				//alert(document.getElementById('idVehicleImg').src);
			}
			
			function actionCreate(){
				document.getElementById('txtVID').value='NULL';

				if (IsNotEmpty()==true){
					var result=confirm('This action will create a new record. Click OK to continue.');
					if (result==true){
						document.getElementById('txtAction').value='0';

						//checks if record exist..
						SearchFirebase(txtPlateNo.value,3,spanMsg);

						setTimeout(function(){
							if(spanMsg.innerHTML==0){ // PLATE_NO is unique
								//PrimaryKeyGen('tblVehicle',txtVID);
								txtVID.value='V'+String(DateTimeNow(9)); // primary key new format
								//setTimeout(function(){
									//if(txtVID.value!=''){
										RecordFirebase(0);
									
										setTimeout(function(){
											if(spanMsg.innerHTML==1){ //new record creation is successfull
												alert('Record successfully created.'); //show an alert message
												clearFields(); //set everything to default
												btnSearch.click(); //click the Search button
											}else if(spanMsg.innerHTML==0){ //record creation failed
												alert('Error on record creation. Record not created.'); //show an alert message
											}
										},5700);
									//}else{
									//	alert('Unable to generate a new record(vehicle) ID.');
									//}
								//},700);
							}else{ alert('Vehicle\'s Plate number already exist.');}
						},1700);
					}
				}
			}
			
			function actionUpdate(){
				if(slcSvcStat.value==0){ //just a detail update
					if (IsNotEmpty()==true){
						var result=confirm('It is highly recommended that every detail created on the first chance should not be edited especially the Plate Number. By doing so, any underlying data connected to this vehicle will be questionable. Continue?');
						if (result==true){
							document.getElementById('txtAction').value='1';
							//document.forms[0].submit();
							//storeData(frmVDetails,spanMsg);
							//checks if record exist..
							//SearchFirebase(txtPlateNo.value,3,spanMsg);
							//setTimeout(function(){ alert(spanMsg.innerHTML);
								//if(spanMsg.innerHTML=0){
									RecordFirebase(1);

									setTimeout(function(){//alert(spanMsg.innerHTML);
										if(spanMsg.innerHTML==1){ //record modification is successfull
											alert('Record successfully updated.'); //show an alert message
											clearFields(); //set everything to default
											btnSearch.click(); //click the Search button
										}else if(spanMsg.innerHTML==0){ //record modification failed
											alert('An error occured on record modification. Record not modified.');
										}
									},6700);
								//}else{//SAM-2073
								//	alert('An existing record found. Your record cannot be updated.'); //show an alert message
								//}
							//},700);
						}
					}
				}else{ //retires the vehicle
					if (IsNotEmpty()==true){
						var result=confirm('This action will change the Service status of the vehicle from active to retired. Click OK to continue.');
						if (result==true){
							document.getElementById('txtAction').value='2';
							//getData(txtVID.value,txtAction.value,spanMsg);

							SearchFirebase(txtVID.value,2,spanMsg);

							setTimeout(function(){
								if(spanMsg.innerHTML==0){
									//storeData(frmVDetails,spanMsg);
									RecordFirebase(2);

									setTimeout(function(){
										if(spanMsg.innerHTML==1){ //record modification is successfull
											alert('Vehicle Service status successfully updated.'); //show an alert message
											clearFields(); //set everything to default
											btnSearch.click(); //click the Search button
										}else if(spanMsg.innerHTML==0){ //record modification failed
											alert('An error occured on record modification. Your record was not modified.'); //show an alert message
										}
									},700);
								}else{ alert('This vehicle has an ongoing delivery. Vehicle Service status cannot be updated for now.');}

							},700);
						}
					}
				}
				
			}
			
			var selectedFile;
			var extFile = '';
			function openImage(event){
				selectedFile = event.target.files[0];
				var reader = new FileReader();

				var imgtag = document.getElementById("VehicleImg");
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
							document.getElementById('txtCompareName').value=imgtag.title;
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
					document.getElementById('ImageOpen').value='';
					document.getElementById('VehicleImg').src='img/v-inverted2_img_500x500.png';
				}
			}
			
			function IsNotEmpty(){
				var vtxtVID=document.forms["frmVDetails"]["txtVID"].value;
				var vtxtPlateNo=document.forms["frmVDetails"]["txtPlateNo"].value;
				var vtxtColor=document.forms["frmVDetails"]["txtColor"].value;
				var vtxtMake=document.forms["frmVDetails"]["txtMake"].value;
				var vtxtModel=document.forms["frmVDetails"]["txtModel"].value;
				var vtxtType=document.forms["frmVDetails"]["txtType"].value;
				
				if(vtxtVID=='',vtxtPlateNo=='',vtxtColor=='',vtxtMake=='',vtxtModel=='',vtxtType==''){
					alert('Fill up all the fields before submitting.');
					return false;
				}else{
					return true;
				}
			}
			
			function removePicture(){
				document.getElementById('txtRmvPic').value='1';
				document.getElementById('txtFileName').value='';
				document.getElementById('txtCompareName').value=''
				document.getElementById('VehicleImg').src='img/v-inverted2_img_500x500.png';
				document.getElementById('ImageOpen').value='';
			}
			function SearchBox(){
                //0 - search all
                //1 - search specific
                //4 - search UID
				var SearchFilter='';
				if(slcVSearch.value==''){
					//getData(SearchFilter,0,'tBody');
					SearchFirebase(SearchFilter,0,tBody);
					txtVSearch.value=null;
				}else{
					if(slcVSearch.value=='vhcId'){
                        SearchFilter=txtVSearch.value;
                        SearchFirebase(SearchFilter,4,tBody);
					}else if(slcVSearch.value=='vhcPnum'){
                        SearchFilter="vhcPnum="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='vhcColor'){
                        SearchFilter="vhcColor="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='vhcMake'){
                        SearchFilter="vhcMake="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='vhcModel'){
                        SearchFilter="vhcModel="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='vhcType'){
                        SearchFilter="vhcType="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='vhcState'){
                        SearchFilter="vhcState="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}
					//getData(SearchFilter,1,'tBody');
					//SearchFirebase(SearchFilter,1,tBody);
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
			function SplitStr(Str,Splitter){
				var Splitted=Str.split(Splitter);
				return Splitted;
			}
			
			function DownloadPicture(FolderName,ImageName,objID){
				var FBStore=firebase.storage();
				var refFBStore=FBStore.ref(FolderName+'/'+ImageName);

				refFBStore.getDownloadURL().then(function(url){
					objID.src=url;
				}).catch(function(error){
					//no handle ..
				});
			}
			function UploadPicture(ImageName,selectedFile){ //ImageName(w/ file type) will be the DateTimeNow(9) on creating a new record
				var FBStore=firebase.storage();
				var FileType=SplitStr(ImageName,',')[1];
				var metaData={contentType: 'image/'+extFile, name:ImageName};
				var refFBStore=FBStore.ref('vehicle_pictures/'+ImageName).put(selectedFile,metaData);
				var UploadResult='';
				
				refFBStore.on('state_changed',function(data){
					//var progress=(data.bytesTransferred / data.totalBytes)*100;
					//spanMsg.innerHTML='Progress: '+progress;
				},function(error){
					//spanUploadMsg.innerHTML='Error on uploading the picture. '+error;//0; //won't show
					UploadResult=0;
					spanMsg.innerHTML=UploadResult;
				},function(){
					//spanUploadMsg.innerHTML='Picture succesfully uploaded.';//1; //won't show
					refFBStore.snapshot.ref.getDownloadURL().then(function(TheURL){
						//setTimeout(function(){
							UploadResult=TheURL;
							txtImageURL.value=UploadResult;
						//},4700);
						
					});
				});
			}


			function SearchFirebase(Filter,Action,objID){
				var FBDB=firebase.database();
				var refFBDB;

				if(Action==0){ //display all records in the table
					refFBDB=FBDB.ref('tblVehicle');
					//refFBDB.once('value',RetrieveData,RetrieveError);
				}else if(Action==1){ //display specific search
					var TheColumn=SplitStr(Filter,'=')[0];
					var TheFilter=SplitStr(Filter,'=')[1];

					if(slcVSearch.value=='vhcState'){
						refFBDB=FBDB.ref('tblVehicle').orderByChild(TheColumn).equalTo(TheFilter);
					}else if(slcVSearch.value=='vhcColor' || slcVSearch.value=='vhcPnum' || slcVSearch.value=='vhcMake' || slcVSearch.value=='vhcModel' || slcVSearch.value=='vhcType'){
						refFBDB=FBDB.ref('tblVehicle').orderByChild(TheColumn).startAt(TheFilter).endAt(TheFilter+'\uf8ff');
					}/* else if(slcVSearch.value=='vhcId'){
                        refFBDB=FBDB.ref('tblVehicle').child(TheFilter);
                    } */
				}else if(Action==2){ //sql statement to check if the vehicle is retirable right away. no ongoing delivery should be hit
					refFBDB=FBDB.ref('tblDelivery').orderByChild('vhcId').equalTo(Filter).limitToLast(1);
					//$sql_statement="SELECT MAX(DLV_ID) FROM tbldelivery WHERE V_ID='".$FilterCSV[0]."' AND DATE_FORMAT(DATETIME_PICK,'%Y-%m-%d')=DATE_FORMAT(NOW(),'%Y-%m-%d')";
				}else if(Action==3){ //check if data is unique before creating a record
					refFBDB=FBDB.ref('tblVehicle').orderByChild('vhcPnum').equalTo(Filter);
                }else if(Action==4){
                    refFBDB=FBDB.ref('tblVehicle').child(Filter);
                }

				refFBDB.once('value',RetrieveData,RetrieveError);

				function RetrieveData(data){
					if(Action==0 || Action==1){
						if(data.exists()){
							var TheTable=data.val();
							var TheRows=Object.keys(TheTable);
							objID.innerHTML='';

							for(var i=0;i<TheRows.length;i++){
								var k=TheRows[i];
								
								var SvcStat='';
								if(TheTable[k].vhcState==0){
									SvcStat='Active in service';
								}else if(TheTable[k].vhcState==1){
									SvcStat='No longer active';
								}

								objID.innerHTML+='<tr id="'+k+'" onclick="rowSelect(this);" style="cursor: pointer;">'+
								'<td>'+k+'</td>'+
								'<td>'+TheTable[k].vhcPnum+'</td>'+
								'<td>'+TheTable[k].vhcColor+'</td>'+
								'<td>'+TheTable[k].vhcMake+'</td>'+
								'<td>'+TheTable[k].vhcModel+'</td>'+
								'<td>'+TheTable[k].vhcDescription+'</td>'+
								'<td>'+TheTable[k].vhcType+'</td>'+
								'<td class="hide">'+TheTable[k].vhcState+'</td>'+
								'<td>'+SvcStat+'</td>'+
								'<td class="hide">'+TheTable[k].imageUrl+'</td>'+
								'<td class="hide">'+k+'</td></tr>';
							}
						}else{
							tBody.innerHTML='<tr><td colspan="8" style="text-align:center"><b>Your search turned 0 result</b></td></tr>';
						}
					}else if(Action==2){
						if(data.exists()){
							var TheTable=data.val();
							var TheRows=Object.keys(TheTable); 

							objID.innerHTML='';
							var CheckDate=SplitStr(TheTable[TheRow[0]].delPick,' ');
							if(CheckDate[0]==DateTimeNow(5)){ //matches the date to know if the vehicle is retirable
								objID.innerHTML=1; //date today matched - cannot be retired for now
							}else{
								objID.innerHTML=0; //can retire
							}
						}else{
							objID.innerHTML=0; //can retire
						}
					}else if(Action==3){
						if(data.exists()){
							objID.innerHTML=1; //there's a matched data(PLATE_NO) in tblVehicle
						}else if(!data.exists()){
							objID.innerHTML=0; //vehicle PLATE_NO is unique;
						}
					}else if(Action==4){
                        var TheData=data.val();
                        var SvcStat='';
                            
                        if(TheData.vhcState==0){
							SvcStat='Serviceable';
						}else if(TheData.vhcState==1){
							SvcStat='Not serviceable';
						}
                        
                        objID.innerHTML='<tr id="'+Filter+'" onclick="rowSelect(this);" style="cursor: pointer;">'+
                        '<td>'+Filter+'</td>'+
                        '<td>'+TheData.vhcPnum+'</td>'+
                        '<td>'+TheData.vhcColor+'</td>'+
                        '<td>'+TheData.vhcMake+'</td>'+
						'<td>'+TheData.vhcModel+'</td>'+
						'<td>'+TheTable[k].vhcDescription+'</td>'+
                        '<td>'+TheData.vhcType+'</td>'+
                        '<td class="hide">'+TheData.vhcState+'</td>'+
                        '<td>'+SvcStat+'</td>'+
                        '<td class="hide">'+TheData.imgName+'</td>'+
                        '<td class="hide">'+Filter+'</td></tr>';
                    }
				}
				function RetrieveError(error){
					tBody.innerHTML='<tr><td colspan="8">'+error+'</td></tr>';
				}
			}
			
			function RecordFirebase(Action){
				var FBDB=firebase.database();
				var refFBDB='';
                var TheData={};
                spanMsg.innerHTML='';

				if(Action==0){
					//var ImageName='';
					//sql statement selection based on whether the user uploads a file or not
										
					if (ImageOpen.value==''){ //no file chosen
						TheData={vhcPnum:txtPlateNo.value,vhcColor:txtColor.value,
						vhcMake:txtMake.value,vhcModel:txtModel.value,vhcDescription:txtDescription.value
						,vhcType:txtType.value,vhcState:slcSvcStat.value,imageUrl:""};
						
						refFBDB=FBDB.ref('tblVehicle').child(txtVID.value);
						refFBDB.set(TheData,function(error){
							if(!error){
								spanMsg.innerHTML=1;
							}else{ spanMsg.innerHTML=0;}
						});
					}else{ //there's a file
						var ImageName=String(txtVID.value)+'.'+extFile;
						UploadPicture(ImageName,selectedFile);

						setTimeout(function(){
							if(txtImageURL.value!=0){
								TheData={vhcPnum:txtPlateNo.value,vhcColor:txtColor.value,
								vhcMake:txtMake.value,vhcModel:txtModel.value,vhcDescription:txtDescription.value,
								vhcType:txtType.value,vhcState:slcSvcStat.value,imageUrl:txtImageURL.value};

								refFBDB=FBDB.ref('tblVehicle').child(txtVID.value);
								refFBDB.set(TheData,function(error){
									if(!error){
										spanMsg.innerHTML=1;
									}else{ spanMsg.innerHTML=0;}
								});
							}else{
								//alert("An error occured on uploading the vehicle photo. Vehicle record not created.");
								spanMsg.innerHTML=0;
							}
						},5000);
					}
				
				}else if(Action==1){
					var ImageName='';
					if (ImageOpen.value==''){ //no file to upload
						if(txtFileName.value==''){ //record has no picture
							TheData={vhcPnum:txtPlateNo.value,vhcColor:txtColor.value,
							vhcMake:txtMake.value,vhcModel:txtModel.value,vhcDescription:txtDescription.value,
							vhcType:txtType.value,vhcState:slcSvcStat.value,imageUrl:""};
						}else if(txtFileName.value!=''){ //record has a picture
							TheData={vhcPnum:txtPlateNo.value,vhcColor:txtColor.value,
							vhcMake:txtMake.value,vhcModel:txtModel.value,vhcDescription:txtDescription.value,
							vhcType:txtType.value,vhcState:slcSvcStat.value,imageUrl:txtFileName.value};											
						}

						refFBDB=FBDB.ref('tblVehicle').child(txtUID.value); //alert('RecordFirebase section @ Action 1-1');
						refFBDB.update(TheData,function(error){
							if(!error){
								spanMsg.innerHTML=1;
							}else{ spanMsg.innerHTML=0;}
						});

					}else if(ImageOpen.value!=''){ //has a file to upload
						ImageName=String(txtVID.value)+'.'+extFile;
						UploadPicture(ImageName,selectedFile);

						setTimeout(function(){
							if(txtImageURL.value!=0){
								TheData={vhcPnum:txtPlateNo.value,vhcColor:txtColor.value,
									vhcMake:txtMake.value,vhcModel:txtModel.value,vhcDescription:txtDescription.value,
									vhcType:txtType.value,vhcState:slcSvcStat.value,imageUrl:txtImageURL.value};
	
								refFBDB=FBDB.ref('tblVehicle').child(txtUID.value);
								refFBDB.update(TheData,function(error){
									if(!error){
										spanMsg.innerHTML=1;
									}else{ spanMsg.innerHTML=0;}
								});
							}else{
								spanMsg.innerHTML=0;
							}
							
						},6000);

					}

					/* if(ImageOpen.value!=''){
						setTimeout(function(){

							refFBDB=FBDB.ref('tblVehicle').child(txtUID.value);
							refFBDB.update(TheData,function(error){
								if(!error){
									spanMsg.innerHTML=1;
								}else{ spanMsg.innerHTML=0;}
							});

							setTimeout(function(){
								UploadPicture(ImageName,selectedFile);
							},1700);

						},700);

					}else{ refFBDB=FBDB.ref('tblVehicle').child(txtUID.value); //alert('RecordFirebase section @ Action 1-1');
						refFBDB.update(TheData,function(error){
							if(!error){
								spanMsg.innerHTML=1;
							}else{ spanMsg.innerHTML=0;}
						});//alert('RecordFirebase section @ spanMsg.innerHTML='+spanMsg.innerHTML);
					} */

					ImageName='';
					
				}else if(Action==2){
					TheData={vhcState:1};
					refFBDB=FBDB.ref('tblVehicle').child(txtUID.value);
					refFBDB.update(TheData,function(error){
							if(!error){
								spanMsg.innerHTML=1;
							}else{ spanMsg.innerHTML=0;}
						});
				}
			}