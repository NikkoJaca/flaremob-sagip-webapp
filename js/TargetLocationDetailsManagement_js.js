
			var mapBrgyNangka = null;
			var infoWindow = null; //new google.maps.InfoWindow;
            var NewEstablishmentMarker=null;
            var pacMarkers = [];
            var Step3PacMarker=null;

			function initMap(){
				infoWindow = new google.maps.InfoWindow;
				var posBrgyNangka = {lat:14.6686733,lng:121.1091784};
				mapBrgyNangka = new google.maps.Map(document.getElementById('map'), {
				center:posBrgyNangka,
				zoom: 15
                });
                
                var Step3InfoWindow=new google.maps.InfoWindow;

                //https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
                //////////////////////// start of maps api search box ////////////////////////
                    // Create the search box and link it to the UI element.
                    var input = document.getElementById('pacInput');
                    var searchBox = new google.maps.places.SearchBox(input);
                    mapBrgyNangka.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                    // Bias the SearchBox results towards current map's viewport.
                    mapBrgyNangka.addListener('bounds_changed', function() {
                        searchBox.setBounds(mapBrgyNangka.getBounds());
                    });

                    //var pacMarkers = [];

                    // Listen for the event fired when the user selects a prediction and retrieve
                    // more details for that place.
                    searchBox.addListener('places_changed', function() {
                        var places = searchBox.getPlaces();

                        if (places.length == 0) {
                        return;
                        }

                        // Clear out the old markers.
                        pacMarkers.forEach(function(marker) {
                        marker.setMap(null);
                        });
                        pacMarkers = [];

                        // For each place, get the icon, name and location.
                        var bounds = new google.maps.LatLngBounds();
                        places.forEach(function(place) {
                            if (!place.geometry) {
                                console.log("Returned place contains no geometry");
                                return;
                            }

                            var icon = {
                                url: place.icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(25, 25)
                            };

                            // Create a marker for each place.
                            var markerSettings={
                                map: mapBrgyNangka,
                                icon: icon,
                                title: place.name,
								position: place.geometry.location,
								dragable:true
                            };
                            //var TheMarker=new google.maps.Marker(markerSettings);
                            Step3PacMarker=new google.maps.Marker(markerSettings);
                            //Step3MarkerCopy=Step3PacMarker; //TheMarker;
                            pacMarkers.push(Step3PacMarker); //TheMarker);

                            var Step3InfContent='';
                            var rawCoord=place.geometry.location;
                            //var pathDefault = [rawCoord, posNangkaBrgyHall];
                            //var result=calcDistance(rawCoord,posNBH);
                            var splitLatLng=String(rawCoord).split(',');
                            var subLat=splitLatLng[0].substr(1); //trims the parenthesis on index 1
                            var subLng=splitLatLng[1].substr(1).slice(0,-1); //trims the white space on index 1 and slices the parenthesis on the other end
                            

                                txtPlateNo.value=place.name;
                                txtColor.value=place.formatted_address;
                                txtMake.value=subLat;
                                txtModel.value=subLng;
                                //var infContent='';
                                
                                
                                    Step3InfContent='<div><img src="' + place.icon + '" height="16" width="16"> '
                                    + '<strong>' + place.name + '</strong><br>' + place.formatted_address //+ 
                                    //'<br><b style="color:#006699;opacity:0.7;">'+result+
                                    //' Km away from Nangka Barangay Hall.</b></div>';
                

                            Step3InfoWindow.setContent(Step3InfContent);
                            Step3InfoWindow.open(mapBrgyNangka,Step3PacMarker); //TheMarker);//pacMarkers[0]);

                            if (place.geometry.viewport) {
                                // Only geocodes have viewport.
                                bounds.union(place.geometry.viewport);
                            } else {
                                bounds.extend(rawCoord); //place.geometry.location);
                            }
                        });
                        mapBrgyNangka.fitBounds(bounds);
                    });
                    
                //////////////////////// end of maps api search box ////////////////////////


				var clickHandler = new ClickEventHandler(mapBrgyNangka);

			}
			var ClickEventHandler = function(map) {
				//this.origin=origin;
				this.map = map;
				//this.infowindow = new google.maps.InfoWindow;
				this.placesService = new google.maps.places.PlacesService(map);

				// Listen for clicks on the map.
				this.map.addListener('click', this.handleClick.bind(this));
			}

			ClickEventHandler.prototype.handleClick = function(event){
				CreateAMarker(event.latLng);
				
				txtMake.value=TrimRawCoord(event.latLng,0); //alert(event.latLng);
				txtModel.value=TrimRawCoord(event.latLng,1);
				
				event.stop();
				if(event.placeId){
					this.getPlaceInformation(event.placeId,event.latLng);
				}

				
			}
			ClickEventHandler.prototype.getPlaceInformation = function(placeID){
				this.placesService.getDetails({placeId: placeID}, function(place, status){
					txtPlateNo.value=place.name; //place name
					txtColor.value=place.formatted_address;//address

				var html='';
				if(status === 'OK'){
					html='<text><b>Establishment:</b> '+txtPlateNo.value+'<br><b>Address:</b> '+txtColor.value+'</text>';
				}else{
					html='<text><b>Establishment:</b>Not available<br><b>Address:</b>Not available</text>';
				}
				PopInfoWindow(html);
				});
			}

			function TrimRawCoord(Coord,WhichIndex){
				var rawCoord=String(Coord);
				var splitLatLng=rawCoord.split(',');
				var subLat=splitLatLng[0].substr(1); //trims the parenthesis on index 1
				var subLng=splitLatLng[1].substr(1).slice(0,-1); //trims the white space on index 1 and slices the parenthesis on the other end
				if(WhichIndex==0){
					return subLat;
				}else if(WhichIndex==1){
					return subLng;
				}else{ return splitLatLng;}
			}

			var arrMarkers=[];
			function CreateAMarker(GMapsLatLng){
				var MarkerOptions={
					position:GMapsLatLng,
					map:mapBrgyNangka,
					dragable:true //false
				}
				//var NewEstablishmentMarker=new google.maps.Marker(MarkerOptions);
				NewEstablishmentMarker=new google.maps.Marker(MarkerOptions);
				arrMarkers.push(NewEstablishmentMarker);

				//this block removes the marker on the 1st chance of click then, retains the new click/marker
				if(arrMarkers.length>1){
					for(var i=0;i<arrMarkers.length-1;i++){
						arrMarkers[i].setMap(null);
					}
				}
			}

			function rowSelect(row){
				clearFields();
				var content=row.cells;
				document.getElementById('txtVID').value=content[0].innerHTML;
				document.getElementById('txtPlateNo').value=content[1].innerHTML;
				document.getElementById('txtColor').value=content[2].innerHTML;
				document.getElementById('txtMake').value=content[3].innerHTML;
				document.getElementById('txtModel').value=content[4].innerHTML;
				document.getElementById('slcSvcStat').value=content[5].innerHTML;
				txtUID.value=content[0].innerHTML;

				if (content[7].innerHTML!=''){
					document.getElementById('VehicleImg').src=content[7].innerHTML; //'upload_img/'+content[6].innerHTML;
					document.getElementById('txtFileName').value=content[7].innerHTML;
					//DownloadPicture('evacuation_pictures',txtFileName.value,VehicleImg);
				}

				if(content[8].innerHTML!=''){
					var CSV=content[8].innerHTML.split(",");

					for(var i=0;i<CSV.length;i++){
						var StrCSV=CSV[i];
						
					
						if(txtLocation.value==''){
							txtLocation.value=StrCSV.split("+")[1];
						}else{
							txtLocation.value+=","+StrCSV.split("+")[1];
						}

						if(txtLocationID.value==''){
							txtLocationID.value=StrCSV.split("+")[0];
						}else{
							txtLocationID.value+=","+StrCSV.split("+")[0];
						}
					}
				}

				var TLocLatLng=new google.maps.LatLng(txtMake.value,txtModel.value);
				CreateAMarker(TLocLatLng);
				PopInfoWindow('<text><b>Establishment:</b> '+txtPlateNo.value+'<br><b>Address:</b> '+txtColor.value+'</text>');
			}
			function PopInfoWindow(Content){
				infoWindow=new google.maps.InfoWindow;
				infoWindow.setContent(Content);
				infoWindow.open(mapBrgyNangka,NewEstablishmentMarker);
			}
			
			function clearFields(){
				document.getElementById('frmVDetails').reset();
				document.getElementById('VehicleImg').src='img/establishment_img_500x500.png';
				spanMsg.innerHTML='';
				//alert(document.getElementById('idVehicleImg').src);
			}
			function ClearLocationFields(){
				txtLocation.value='';
				txtLocationID.value='';
			}
			
			function actionCreate(){
				document.getElementById('txtVID').value='NULL';

				if (IsNotEmpty()==true){
					var result=confirm('This action will create a new record. Click OK to continue.');
					if (result==true){
						document.getElementById('txtAction').value='0';
						SearchFirebase(txtPlateNo.value,3,spanMsg); //output should be 0 to proceed

						setTimeout(function(){
							if(spanMsg.innerHTML==0){
								//PrimaryKeyGen('tblTargetLoc',txtVID);
								txtVID.value='TLOC'+String(DateTimeNow(9));
								//setTimeout(function(){
									//if(txtVID.value.length==7){
										//RecordFirebase(txtAction.value);
										var TheData={};
										if (ImageOpen.value==''){ //$file_tmp==''){
											TheData={tLocId:txtVID.value,
												tLocName:txtPlateNo.value,tLocAddress:txtColor.value,
												tLocLat:txtMake.value,tLocLng:txtModel.value,tLocIsPartner:slcSvcStat.value,
												imageUrl:''};

											var FBDB=firebase.database();
											var refFBDB=FBDB.ref('tblTargetLoc').child(txtVID.value);
											refFBDB.set(TheData,function(error){
												if(!error){
													InsertLocationDetails();
													//spanMsg.innerHTML=1;
													alert('Record successfully created.');
													clearFields(); //sets everything to default
													btnSearch.click(); //clicks the Search button
												}else{ //spanMsg.innerHTML=0;
													alert('Error on record creation. Record not created.');
												}
											});

										}else{ //if there's a file to upload
											var ImageName=txtVID.value+'.'+extFile;
											UploadPicture(ImageName,selectedFile);
											
											//data recording..
											setTimeout(function(){ //alert(txtImageURL.value);
												if(txtImageURL.value!=0){
													TheData={tLocId:txtVID.value,
														tLocName:txtPlateNo.value,tLocAddress:txtColor.value,
														tLocLat:txtMake.value,tLocLng:txtModel.value,tLocIsPartner:slcSvcStat.value,
														imageUrl:txtImageURL.value};

													var FBDB=firebase.database();
													var refFBDB=FBDB.ref('tblTargetLoc').child(txtVID.value);
													refFBDB.set(TheData,function(error){
														if(!error){
															InsertLocationDetails();
															//spanMsg.innerHTML=1;
															alert('Record successfully created.');
															clearFields(); //sets everything to default
														btnSearch.click(); //clicks the Search button
														}else{ //spanMsg.innerHTML=0;
															alert('Error on record creation. Record not created.');
														}
													});
												}else{ alert('Unable to upload picture. Record not created.');}

											},5700);
										}

							}else{
								alert('An existing record found. Your data cannot be recorded.');
							}
						},2700);
						
					}
				}
				spanMsg.innerHTML='';
			}

			function InsertLocationDetails(){
				var FBDB=firebase.database();

				for(var i=0;i<txtLocationID.value.split(",").length;i++){
					var refFBDB=FBDB.ref('tblTargetLoc').child(txtVID.value).child("Area").child(txtLocationID.value.split(",")[i]);
					var TheData={areaNumber:txtLocation.value.split(",")[i]};
					refFBDB.set(TheData,function(error){
						if(!error){
							//alert('Record successfully created.');
						}else{ //spanMsg.innerHTML=0;
							//alert('Error on record creation. Record not created.');
						}
					});
				}
				
			}
			function DeleteLocationDetails(){
				var FBDB=firebase.database();
				FBDB.ref('tblTargetLoc').child(txtVID.value).child("Area").remove();
			}
			
			function actionUpdate(){
				//var message=null;
				if(document.getElementById('slcSvcStat').value==0){
					if (IsNotEmpty()==true){
						var result=confirm('It is highly recommended that every detail created on the first chance should not be edited especially the Establishment Name and the Address. By doing so, any underlying data connected to this Establishment will be questionable.\nContinue?');
						if (result==true){
							//SearchFirebase(txtPlateNo.value,3,spanMsg); //checks if record is unique, 0 to proceed
							
							//setTimeout(function(){
							//	if(spanMsg.innerHTML==0){
									//document.getElementById('txtAction').value=1;
									//RecordFirebase(txtAction.value);

									//this block of code brought here coz of some sort of 'ghost' bug. it just won't work when
									//encapsulated in RecordFirebase fucking cunt !
									var TheData={};
									if (ImageOpen.value==''){ //no file to upload
										if(txtFileName.value==''){ //record has no picture
											TheData={
												tLocId:txtVID.value,tLocName:txtPlateNo.value,tLocAddress:txtColor.value,
												tLocLat:txtMake.value,tLocLng:txtModel.value,tLocIsPartner:slcSvcStat.value,
												imageUrl:''};
										}else if(txtFileName.value!=''){ //record has a picture
											TheData={
												tLocId:txtVID.value,tLocName:txtPlateNo.value,tLocAddress:txtColor.value,
												tLocLat:txtMake.value,tLocLng:txtModel.value,tLocIsPartner:slcSvcStat.value,
												imageUrl:txtFileName.value};											
										}

										var FBDB=firebase.database();
											var refFBDB=FBDB.ref('tblTargetLoc').child(txtVID.value);
											refFBDB.set(TheData,function(error){
												if(!error){
													DeleteLocationDetails();
													InsertLocationDetails();

													//spanMsg.innerHTML=1;
													alert('Record successfully updated.');
													clearFields(); //sets everything to default
													btnSearch.click(); //clicks the Search button
												}else{ //spanMsg.innerHTML=0;
													alert('Error on record modification. Record not updated.');
												}
											});


									}else if(ImageOpen.value!=''){ //has a file to upload
										var ImageName=String(txtVID.value)+'.'+extFile;
										UploadPicture(ImageName,selectedFile);
									
										setTimeout(function(){
											if(txtImageURL.value!=0){
												TheData={
													tLocId:txtVID.value,tLocName:txtPlateNo.value,tLocAddress:txtColor.value,
													tLocLat:txtMake.value,tLocLng:txtModel.value,tLocIsPartner:slcSvcStat.value,
													imageUrl:txtImageURL.value};
													
												var FBDB=firebase.database();
												var refFBDB=FBDB.ref('tblTargetLoc').child(txtUID.value);
												refFBDB.update(TheData,function(error){
													if(!error){
														DeleteLocationDetails();
														InsertLocationDetails();

														alert('Record successfully updated.'); //shows an alert message
														clearFields(); //sets everything to default
														btnSearch.click(); //clicks the Search button
													}else{
														alert(spanMsg.innerHTML+' An existing record found. Your record cannot be updated.'); //shows an alert message
													}
												});
											}

										},6700);
									}

							//	}else{
							//		alert('An existing record found. Your data cannot be recorded.');
							//	}
							//},700);
						}
					}
				}else{
					if (IsNotEmpty()==true){
						var result=confirm('This action will no longer make the establishment as an evacuation center for Brangay Nangka.\nClick OK to continue.');
						if (result==true){
							document.getElementById('txtAction').value=2;

							SearchFirebase(txtVID.value,txtAction.value,spanMsg);

							setTimeout(function(){
								if(spanMsg.innerHTML==0){ // the establishment is retirable right away
									
									//RecordFirebase(txtAction.value);
									var TheData={ vhcIsPartner:1}; //1 means no longer a partner

									refFBDB=FBDB.ref('tblTargetLoc').child(txtUID.value);
									refFBDB.update(TheData,function(error){
										if(!error){
											spanMsg.innerHTML=1;
										}else{ spanMsg.innerHTML=0;}
									});

									setTimeout(function(){
										if(spanMsg.innerHTML==1){ //record modification is successfull
											alert('Establishment no longer being used as evacuation center.'); //show an alert message
											clearFields(); //set everything to default
											btnSearch.click(); //click the Search button
										}else if(spanMsg.innerHTML==0){ //record modification failed
											alert('An error occured on record modification. Your record was not modified.'); //show an alert message
										}
									},1000);
								}else{ alert('This establishment will be a recieving end of an ongoing delivery. Establishment Partner status cannot be updated for now.');}

							},1000);
						}
					}
				}
				spanMsg.innerHTML='';
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
						if (imgtag.title!='establishment_img_500x500.png'){
							reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
							//alert('new image selected.');
							document.getElementById('txtCompareFileName').value=imgtag.title;
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
					document.getElementById('VehicleImg').src='img/establishment_img_500x500.png';
					//DownloadPicture('web_img','establishment_img_500x500.png',VehicleImg);
				}
			}
			
			function IsNotEmpty(){
				var vtxtVID=document.forms["frmVDetails"]["txtVID"].value;
				var vtxtPlateNo=document.forms["frmVDetails"]["txtPlateNo"].value;
				var vtxtColor=document.forms["frmVDetails"]["txtColor"].value;
				var vtxtMake=document.forms["frmVDetails"]["txtMake"].value;
				var vtxtModel=document.forms["frmVDetails"]["txtModel"].value;
				
				if(vtxtVID=='',vtxtPlateNo=='',vtxtColor=='',vtxtMake=='',vtxtModel==''){
					alert('Fill up all the fields before submitting.');
					return false;
				}else{
					return true;
				}
			}
			
			function removePicture(){
				txtFileNameDelete.value=txtFileName.value;
				document.getElementById('txtRmvPic').value='1';
				document.getElementById('txtFileName').value='';
				document.getElementById('txtCompareName').value=''
				document.getElementById('VehicleImg').src='img/establishment_img_500x500.png';
				//DownloadPicture('web_img','establishment_img_500x500.png',VehicleImg);
				document.getElementById('ImageOpen').value=null;
			}
			function SearchBox(){
				var SearchFilter='';
				if(slcVSearch.value==''){
					//getData(SearchFilter,0,'tBody');
					SearchFirebase(SearchFilter,0,tBody);
					txtVSearch.value=null;
				}else{
					if(slcVSearch.value=='tLocId'){
                        SearchFilter=txtVSearch.value;
                        SearchFirebase(SearchFilter,4,tBody);
					}else if(slcVSearch.value=='tLocName'){
                        SearchFilter="tLocName="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='tLocAddress'){
                        SearchFilter="tLocAddress="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='tLocLat'){
                        SearchFilter="tLocLat="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='tLocLng'){
                        SearchFilter="tLocLng="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}else if(slcVSearch.value=='tLocIsPartner'){
                        SearchFilter="tLocIsPartner="+txtVSearch.value;
                        SearchFirebase(SearchFilter,1,tBody);
					}
					//getData(SearchFilter,1,'tBody');
					//SearchFirebase(SearchFilter,1,tBody);
				}
				//alert(SearchFilter);
			}

			function openTab(evt, tabID) {
				// Declare all variables
				var i, tabcontent, tablinks;

				// Get all elements with class="tabcontent" and hide them
				tabcontent = document.getElementsByClassName("tabcontent");
				for (i = 0; i < tabcontent.length; i++) {
					tabcontent[i].style.display = "none";
				}

				// Get all elements with class="tablinks" and set the class from "active" to "" making
				tablinks = document.getElementsByClassName("maintablinks");
				for (i = 0; i < tablinks.length; i++) {
					tablinks[i].className = tablinks[i].className.replace(" active", "");
				}

				// Show the current tab, and add an "active" class to the button that opened the tab
				tabID.style.display = "block"; 
				evt.currentTarget.className += " active";
			}
					
			function SearchFirebase(Filter,Action,objID){
				var FBDB=firebase.database();
				var refFBDB='';

				if(Action==0){ //display all records
					refFBDB=FBDB.ref('tblTargetLoc'); //.orderByChild('TLOC_ID');
					//refFBDB.once('value',RetrieveData,RetrieveError);

				}else if(Action==1){ //display specific search
					var TheColumn=SplitStr(Filter,'=')[0];
					var TheFilter=SplitStr(Filter,'=')[1];

					if(TheColumn=='tLocName' || TheColumn=='tLocAddress' || TheColumn=='tLocLat' || TheColumn=='tLocLng'){
						refFBDB=FBDB.ref('tblTargetLoc').orderByChild(TheColumn).startAt(TheFilter).endAt(TheFilter+'\uf8ff');
					}else if(TheColumn=='tLocIsPartner'){
						refFBDB=FBDB.ref('tblTargetLoc').orderByChild(TheColumn).equalTo(TheFilter);
					}/* else if(TheColumn=='tLocId'){
                        refFBDB=FBDB.ref('tblTargetLoc').child(txtVID.value);
                    } */

					//refFBDB.once('value',RetrieveData,RetrieveError);

				}else if(Action==2){ //sql statement to check if the target location/evacuation centre is retirable right away. no ongoing delivery should be hit
					refFBDB=FBDB.ref('tblDelivery').orderByChild('tLocId').equalTo(Filter).limitToLast(1);
					//refFBDB.once('value',RetrieveData,RetrieveError);
					/*$sql_statement="SELECT MAX(TLOC_ID) FROM tbldelivery WHERE TLOC_ID='".$FilterCSV[0]."' 
					AND DATE_FORMAT(DATETIME_PICK,'%Y%m%d')=DATE_FORMAT(NOW(),'%Y%m%d')";*/
				}else if(Action==3){ //check if data is unique before creating a record
					refFBDB=FBDB.ref('tblTargetLoc').orderByChild('tLocName').equalTo(Filter);
					//refFBDB.once('value',RetrieveData,RetrieveError);
				}else if(Action==4){
                        refFBDB=FBDB.ref('tblTargetLoc').child(Filter);
                }else if(Action==5){ //retrieves location area number
					refFBDB=FBDB.ref('tblLocations');
				}/* else if(Action==6){ //retrieves area per target location key
					refFBDB=FBDB.ref('tblTargetLoc');
				} */

				refFBDB.once('value',RetrieveData,RetrieveError);

				function RetrieveData(data){
					if(Action==0 || Action==1){
						if(data.exists()){
							var TheTable=data.val();
							var TheRows=Object.keys(TheTable); 
							var IsPartnerMask='';

							objID.innerHTML='';
							for(var i=0;i<TheRows.length;i++){
								var k=TheRows[i];

								if(TheTable[k].tLocIsPartner==0){
									IsPartnerMask='Yes';
								}else if(TheTable[k].tLocIsPartner==1){
									IsPartnerMask='No';
								}

								objID.innerHTML+='<tr id="'+k+'" onclick="rowSelect(this);" style="cursor: pointer;">'+
								'<td>'+k+'</td>'+
								'<td style="font-weight:bold;">'+TheTable[k].tLocName+'</td>'+
								'<td>'+TheTable[k].tLocAddress+'</td>'+
								'<td>'+TheTable[k].tLocLat+'</td>'+
								'<td>'+TheTable[k].tLocLng+'</td>'+
								'<td class="hide">'+TheTable[k].tLocIsPartner+'</td>'+
								'<td>'+IsPartnerMask+'</td>'+
								'<td class="hide">'+TheTable[k].imageUrl+'</td>'+
								'<td class="hide"></td></tr>';

								RetrieveAreaDetails(k,objID,i);
								//var TargetDisplay=document.getElementById("tBody").rows[0].cells[9];alert(TargetDisplay);
							}
						}if(!data.exists()){
							objID.innerHTML='<tr><td colspan="8" style="text-align:center;"><b>Your search turned 0 result.</b></td></tr>';	
						}
					}else if(Action==2){
						if(data.exists()){
							var TheTable=data.val();
							var TheRows=Object.keys(TheTable); 

							objID.innerHTML='';
							var CheckDate=SplitStr(TheTable[TheRow[0]].delPick,' ');
							if(CheckDate[0]==DateTimeNow(5)){ //matches the date to know if the establishment is retirable
								objID.innerHTML=1; //date today matched - cannot be retired for now
							}else{
								objID.innerHTML=0; //can retire
							}
						}else{
							objID.innerHTML=0;	
						}
					}else if(Action==3){
						if(data.exists()){
							objID.innerHTML=1; //there's a matched data(NAME) in tblTargetLoc
						}else if(!data.exists()){
							objID.innerHTML=0; //establishment NAME is unique;
						}
					}else if(Action==4){
                        if(data.exists()){
                            var DataVal=data.val();
                            var IsPartnerMask;
                            alert(DataVal);
                            if(DataVal.tLocIsPartner==0){
                                IsPartnerMask='A partner';
                            }else if(DataVal.tLocIsPartner==1){
                                IsPartnerMask='No longer';
                            }

                            objID.innerHTML='<tr id="'+Filter+'" onclick="rowSelect(this);" style="cursor: pointer;">'+
                            '<td>'+Filter+'</td>'+
                            '<td style="font-weight:bold;">'+DataVal.tLocName+'</td>'+
                            '<td>'+DataVal.tLocAddress+'</td>'+
                            '<td>'+DataVal.tLocLat+'</td>'+
                            '<td>'+DataVal.tLocLng+'</td>'+
                            '<td class="hide">'+DataVal.tLocIsPartner+'</td>'+
                            '<td>'+IsPartnerMask+'</td>'+
                            '<td class="hide">'+DataVal.imageUrl+'</td>'+
                            '<td class="hide">'+Filter+'</td></tr>';   
                        }else{ objID.innerHTML='<tr><td colspan="8" style="text-align:center;"><b>Your search turned 0 result.</b></td></tr>';	}
                    }else if(Action==5){
						if(data.exists()){
							var TheTable=data.val();
							var TheRows=Object.keys(TheTable);

							objID.innerHTML='';

							for(var i=0;i<TheRows.length;i++){
								var k=TheRows[i];

								objID.innerHTML+='<option value="'+k+'">'+TheTable[k].areaNumber+'</option>';
							}
						}
					}
				}

				function RetrieveError(error){
					objID.innerHTML='<tr><td colspan="8">Error: '+error+'</td></tr>';
				}
			}

			function RetrieveAreaDetails(TLocID,TableID,RowIndex){
				var FBDB=firebase.database();
				var refFBDB=FBDB.ref('tblTargetLoc').child(TLocID).child("Area");
				refFBDB.once('value',function(data){
					if(data.exists()){
						var TheTable=data.val();
						var TheRows=Object.keys(TheTable);
						var TargetDisplay=document.getElementById("tBody").rows[RowIndex].cells[8];

						for(var i=0;i<TheRows.length;i++){
							var k=TheRows[i];

							if(TargetDisplay.innerHTML==''){
								TargetDisplay.innerHTML=k+"+"+TheTable[k].areaNumber;
							}else{
								TargetDisplay.innerHTML+=","+k+"+"+TheTable[k].areaNumber;
							}
						}
					}
				});						
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
				var refFBStore=FBStore.ref('evacuation_pictures/'+ImageName).put(selectedFile,metaData);
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

			function DoCSVLocationID(){
				var SlcObjSI=document.getElementById('slcLocation').selectedIndex;
				var SlcObjOpt=document.getElementById('slcLocation').options;

				if(txtLocation.value==''){
					txtLocation.value=SlcObjOpt[SlcObjSI].text;
				}else{
					txtLocation.value+=","+SlcObjOpt[SlcObjSI].text;
				}

				if(txtLocationID.value==''){
					txtLocationID.value=SlcObjOpt[SlcObjSI].value;
				}else{
					txtLocationID.value+=","+SlcObjOpt[SlcObjSI].value;
				}
				
			}

			function RecordFirebase(Action){/*
				var FBDB=firebase.database();
				var refFBDB='';

				if(Action==0){
					//check if record exist..
					SearchFirebase(txtPlateNo.value,3,txtIsDataUnique);//txtIsDataUnique holds the call back

					if(txtIsDataUnique.value==0){//$rowcount==0){ //there should be no rows, meaning record is unique
						// set the file name of the picture to 'TLOC' + YY + 00000
						var TheData={};
						if (ImageOpen.value==''){ //$file_tmp==''){
							TheData={
								TLOC_ID:txtVID.value,
								NAME:txtPlateNo.value,
								ADDRESS:txtColor.value,
								LAT:txtMake.value,
								LNG:txtModel.value,
								IS_PARTNER:slcSvcStat.value,
								IMG_NAME:''
							};
						}else{
							var ImageName='TLOC'+String(txtVID.value)+'.'+extFile;
							TheData={
								TLOC_ID:txtVID.value,
								NAME:txtPlateNo.value,
								ADDRESS:txtColor.value,
								LAT:txtMake.value,
								LNG:txtModel.value,
								IS_PARTNER:slcSvcStat.value,
								IMG_NAME:ImageName
							};
							UploadPicture(ImageName,selectedFile);
						}

						//data recording..
						refFBDB=FBDB.ref('tblTargetLoc');
						refFBDB.push(TheData,function(error){
							if(!error){
								spanMsg.innerHTML=1;
							}else{ spanMsg.innerHTML=0;}
						});
					}
				}else if(Action==1){ // update a record
					//checks if record exist..
					//SearchFirebase(txtPlateNo.value,3,txtIsDataUnique);
					//var TheData={};
					//if(txtIsDataUnique.value==0){
						if (ImageOpen.value==''){ //no file to upload
							if(txtFileName.value==''){ //record has no picture
								var TheData={
								TLOC_ID:txtVID.value,
								NAME:txtPlateNo.value,
								ADDRESS:txtColor.value,
								LAT:txtMake.value,
								LNG:txtModel.value,
								IS_PARTNER:slcSvcStat.value,
								IMG_NAME:''};

								var FBDB=firebase.database();
								var refFBDB=FBDB.ref('tblTargetLoc').child(txtUID.value);
								refFBDB.update(TheData,function(error){
									if(!error){
										spanMsg.innerHTML=1;
									}else{ spanMsg.innerHTML=0;}
								});
							}else if(txtFileName.value!=''){ //record has a picture
								TheData={
								TLOC_ID:txtVID.value,
								NAME:txtPlateNo.value,
								ADDRESS:txtColor.value,
								LAT:txtMake.value,
								LNG:txtModel.value,
								IS_PARTNER:slcSvcStat.value,
								IMG_NAME:txtFileName.value};

								
							}
						}else if(ImageOpen.value!=''){ //has a file to upload
							var ImageName='TLOC'+String(txtVID.value)+'.'+extFile;
							TheData={
								TLOC_ID:txtVID.value,
								NAME:txtPlateNo.value,
								ADDRESS:txtColor.value,
								LAT:txtMake.value,
								LNG:txtModel.value,
								IS_PARTNER:slcSvcStat.value,
								IMG_NAME:ImageName};
							UploadPicture(ImageName,selectedFile);
						}

						//data updating..
						//var FBDB=firebase.database();
						//var refFBDB=FBDB.ref('tblTargetLoc').child(txtUID.value);
						/*refFBDB.update(TheData,function(error){
							if(!error){
								//spanMsg.innerHTML=1;
								alert('updated!');
							}else{ alert('not updated ..');}//spanMsg.innerHTML=0;}
						});
						//refFBDB.update(TheData);
					//}else{ spanMsg.innerHTML=0;}
					
				}else if(Action==2){ // retire an evacuation center from being a partner
					TheData={
						IS_PARTNER:1}; //1 means no longer a partner

					refFBDB=FBDB.ref('tblTargetLoc').child(txtUID.value);
					refFBDB.update(TheData,function(error){
						if(!error){
							spanMsg.innerHTML=1;
						}else{ spanMsg.innerHTML=0;}
					});*/
			}
