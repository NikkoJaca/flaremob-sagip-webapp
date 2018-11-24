
	var arrMarkers = []; 
	var arrVIDs=[];
	var poly=null;
	var nearestVehicle=null;
	var globalFmrIndex=null;
	var leastValue=null;
	var posNangkaBrgyHall={lat:14.673334097027062,lng:121.10863365232944};
	var posNBH='';
    var Step4TLocCoordinates={};
	var Step4TLocNA={};
	var TLocMarker=null;
	var Step3MarkerCopy;
	var infContent='';
	var Step3ClickedPlaceMarkerPosition;
	var pacMarkers = [];
	var Step3PacMarker=null;
    var arrTLocMarker=[];
    var arrLiveDeliveryMarkers=[]; //for child_added and child_changed event
    var arrLiveDeliveryVehicleMarkers=[]; //for storing the markers(position) of live vehicles
    var arrLiveDeliveryVehicleVID=[]; //keys of vehicle coming from tblLiveVeCoordinates
    var gblMapBrgyNangka;
	var IsDeliveryVehicleExisting=false;
	var arrBrgyHallMarker=[];

function initMap(){
	var posBrgyNangka = {lat:14.6686733,lng:121.1091784};
    var mapBrgyNangka = new google.maps.Map(document.getElementById('map'), {
        center:posBrgyNangka,
		zoom: 15
    });
    gblMapBrgyNangka=mapBrgyNangka;

	var infoWindow = new google.maps.InfoWindow;
	var Step3InfoWindow=new google.maps.InfoWindow;
    var TLocInfoWindow=new google.maps.InfoWindow;
    var Step31InfoWindow=new google.maps.InfoWindow;

    SearchFirebase2(null,0,null);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//the block of codes below are for Step1 tblItemList detail modification map marker and infowindow initiation
	google.maps.event.addDomListener(tBodyItemList, 'click', function(evt){
		//alert('yah i heared you !');
		pacMarkers.forEach(function(marker) {
			marker.setMap(null);}); //makes the marker display to 'no map'
		pacMarkers = []; //clears the array

//alert(idTxtSLLat.value==``); //alert('idTxtSLLat.value: '+idTxtSLLat.value+'\nidTxtSLLng.value: '+idTxtSLLng.value);
		if(idTxtSLLat.value!=``){ //||idTxtSLLat.value!=""||idTxtSLLat.value!=null){ alert('passed 1');
			if(idTxtSLLng.value!=``){ //||idTxtSLLng.value!=""||idTxtSLLng.value!=null){ alert('passed 2');

				var DelSrcLatLng={lat:parseFloat(idTxtSLLat.value),lng:parseFloat(idTxtSLLng.value)};
				var Step1ModifyMarkerSettings={position:DelSrcLatLng,map: mapBrgyNangka};
				Step3PacMarker = new google.maps.Marker(Step1ModifyMarkerSettings);
				mapBrgyNangka.panTo(DelSrcLatLng);//TLocMarker.getPosition()); //centers the map point-of-view
				pacMarkers.push(Step3PacMarker);
				
				//var Step3SrcLoc=SplitStr(idTxtSourceLoc.value,' | '); //alert('yah i heared you !');
				//Step3InfContent='<div><strong>'+Step3SrcLoc[0]+'</strong><br />'+Step3SrcLoc[1]+'</div>'; 
				Step3InfContent=idTxtSourceLoc.value;
				Step3InfoWindow.setContent(Step3InfContent);
				Step3InfoWindow.open(mapBrgyNangka,Step3PacMarker);
				////////////////////end of Step3 source location marker & info window initiation////////////////////
				//alert(vtxtVIDRec);
				for(var i=0;i<idSlcTLoc.options.length;i++){//alert(idSlcTLoc.options[i].value==vtxtVIDRec);
					if(idSlcTLoc.options[i].value==vtxtVIDRec){ idSlcTLoc.options[i].selected=true;}break;
				}
				//let's leave this feature for awhile .. :/

				/* arrTLocMarker.forEach(function(marker) {
					marker.setMap(null);}); //makes the marker display to 'no map'
				arrTLocMarker = []; //clears the array
				
				var TLocMarkerSettings={position:Step4TLocCoordinates,map: mapBrgyNangka};
				TLocMarker = new google.maps.Marker(TLocMarkerSettings);
				mapBrgyNangka.panTo(Step4TLocCoordinates);//TLocMarker.getPosition()); //centers the map point-of-view
				arrTLocMarker.push(TLocMarker);

				var path = [Step3PacMarker.position, TLocMarker.position];
						poly.setMap(mapBrgyNangka); //alert(nearestVehicle==null);
						poly.setPath(path); //pathDefault);

						var PickUpLocToDropOffLoc=calcDistance(Step3MarkerCopy.position,TLocMarker.position);//Step4TLocCoordinates);
						var TLocHtml = '<div><strong>'+Step4TLocNA['Name']+'</strong><br><text>'+Step4TLocNA['Add']+'</text>'+
						'<br><b style="color:#006699;opacity:0.7;">'+PickUpLocToDropOffLoc+
						' Km away from given pickup location.</b></div>';
						BindInfoWindow (TLocMarker, mapBrgyNangka, TLocInfoWindow, TLocHtml);
						TLocInfoWindow.setContent(TLocHtml);
						TLocInfoWindow.open(mapBrgyNangka, TLocMarker); */
			}
		}
		
	});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//the block of codes below are for Step4 Target Location map marker and infowindow initiation

	google.maps.event.addDomListener(document.getElementById('idSlcTLoc'), 'change', function(evt) {
		arrTLocMarker.forEach(function(marker) {
			marker.setMap(null);}); //makes the marker display to 'no map'
		arrTLocMarker = []; //clears the array
		
		var TLocMarkerSettings={position:Step4TLocCoordinates,map: mapBrgyNangka};
		TLocMarker = new google.maps.Marker(TLocMarkerSettings);
		mapBrgyNangka.panTo(Step4TLocCoordinates);//TLocMarker.getPosition()); //centers the map point-of-view
		arrTLocMarker.push(TLocMarker);

        if(nearestVehicle==null){ //if there's no live barangay vehicle
        var TLocHtml;

			if(Step3MarkerCopy!=null){ //marker coming from pacMarker / address search
				var path = [Step3MarkerCopy.position, TLocMarker.position];
				poly.setMap(mapBrgyNangka); //alert(nearestVehicle==null);
				poly.setPath(path); //pathDefault);

				var PickUpLocToDropOffLoc=calcDistance(Step3MarkerCopy.position,TLocMarker.position);//Step4TLocCoordinates);
				TLocHtml = '<div><strong>'+Step4TLocNA['Name']+'</strong><br><text>'+Step4TLocNA['Add']+'</text>'+
				'<br><b style="color:#006699;opacity:0.7;">'+PickUpLocToDropOffLoc+
				' Km away from given pickup location.</b></div>';
				/* BindInfoWindow (TLocMarker, mapBrgyNangka, TLocInfoWindow, TLocHtml);
				TLocInfoWindow.setContent(TLocHtml);
				TLocInfoWindow.open(mapBrgyNangka, TLocMarker);	 */
			}else{
				TLocHtml = '<div><strong>'+Step4TLocNA['Name']+'</strong><br><text>'+Step4TLocNA['Add']+'</text></div>';
				/* BindInfoWindow (TLocMarker, mapBrgyNangka, TLocInfoWindow, TLocHtml);
				TLocInfoWindow.setContent(TLocHtml);
				TLocInfoWindow.open(mapBrgyNangka, TLocMarker); */
			}
		}else{
            var path = [nearestVehicle.position, TLocMarker.position];
			poly.setMap(mapBrgyNangka); //alert(nearestVehicle==null);
			poly.setPath(path); //pathDefault);

			var PickUpLocToDropOffLoc=calcDistance(nearestVehicle.position,TLocMarker.position);//Step4TLocCoordinates);
			TLocHtml = '<div><strong>'+Step4TLocNA['Name']+'</strong><br><text>'+Step4TLocNA['Add']+'</text>'+
			'<br><b style="color:#006699;opacity:0.7;">'+PickUpLocToDropOffLoc+
			' Km away from the chosen vehicle.</b></div>';
        }

        BindInfoWindow (TLocMarker, mapBrgyNangka, TLocInfoWindow, TLocHtml);
		TLocInfoWindow.setContent(TLocHtml);
		TLocInfoWindow.open(mapBrgyNangka, TLocMarker);
	});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//shows nangka brgy hall map marker if there's no available/online delivery vehicle
/* setTimeout(function(){
    if(arrLiveDeliveryVehicleMarkers.length<1){
        var markerOptions ={
            position:posNangkaBrgyHall,
            map:mapBrgyNangka,
            //label:'delivery',
            draggable:false
        };
        //new google.maps.Marker(markerOptions);
		var marker = new google.maps.Marker(markerOptions);
		arrBrgyHallMarker.push(marker);
        posNBH=marker.position;
        var html = '<div><strong>Nangka Brgy. Hall</strong><br><text>No delivery vehicle online at this time.</text></div>';
        BindInfoWindow (marker, mapBrgyNangka, infoWindow, html);
        infoWindow.setContent(html);
        infoWindow.open(mapBrgyNangka, marker);
    }else{
        IsDeliveryVehicleExisting=true;
    }
},3700); */
////////////////////////////////////////////////////////

//https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
//////////////////////// start of maps api search box ////////////////////////
	// Create the search box and link it to the UI element.
	var input = document.getElementById('pacInput');
	var searchBox = new google.maps.places.SearchBox(input); //hindi nagre-renew eto kaya pag nag-re initialized, nawawala yung input sa map
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
            }// will not continue to read the below codes if place has no geometry
            
            if(IsDeliveryVehicleExisting==true){ //identifies the nearest vehicle marker in the map
                FindTheNearestLiveDeliveryVehicle(place.geometry.location);
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
				position: place.geometry.location
			};
			//var TheMarker=new google.maps.Marker(markerSettings);
			Step3PacMarker=new google.maps.Marker(markerSettings);
			Step3MarkerCopy=Step3PacMarker; //TheMarker;
			pacMarkers.push(Step3PacMarker); //TheMarker);

			var Step3InfContent='';
			var rawCoord=place.geometry.location; //alert(rawCoord);
			//var pathDefault = [rawCoord, posNangkaBrgyHall];
			//var result=calcDistance(rawCoord,posNBH);
			var splitLatLng=String(rawCoord).split(',');
			var subLat=splitLatLng[0].substr(1); //trims the parenthesis on index 1
			var subLng=splitLatLng[1].substr(1).slice(0,-1); //trims the white space on index 1 and slices the parenthesis on the other end
			
			if(lnkStep3.className=="tablinks active"){
				idTxtSourceLoc.value=place.name+' | '+place.formatted_address;
				idTxtSLLat.value=subLat;
                idTxtSLLng.value=subLng;//alert(rawCoord);//nearestVehicle);                
				//var infContent='';

				if(idDPick.value==DateTimeNow(5)){ //if set Date of pick up is today
				if(nearestVehicle!=null){ //alert(nearestVehicle!=null);
					//if(idDPick.value==DateTimeNow(5)){ //if set Date of pick up is today
						//nearestVehicle=arrMarkers[formerIndex].position;
						var path = [rawCoord, nearestVehicle.position]; //arrMarkers[formerIndex].position];
						poly.setMap(mapBrgyNangka);
						poly.setPath(path);

						Step3InfContent='<div><img src="' + place.icon + '" height="16" width="16"> '
						+ '<strong>' + place.name + '</strong><br>' + place.formatted_address + 
						'<br><b style="color:#006699;opacity:0.7;">'+leastValue+
						' Km away from the nearest Barangay vehicle.</b></div>';

						//infoWindow.setContent(Step3InfContent);
						//infoWindow.open(mapBrgyNangka,TheMarker);//pacMarkers[0]);

						setTimeout(function() {
							var ConfirmResult=confirm('The nearest vehicle is '+leastValue+' Km away. Would you like to use this vehicle?');
                            if(ConfirmResult==true){//alert(arrLiveDeliveryVehicleVID[globalFmrIndex]);
                                Step31PickupDate.value=idDPick.value; //DateTimeNow(5);
                                idSlcVID.value=String(arrLiveDeliveryVehicleVID[globalFmrIndex]);
                                lnkStep31.click(); //ValidateStep3(0); // or lnkStep31.click()

                                setTimeout(function(){
                                    btnStep31Search.click();
                                },700);

							}else{
                                poly.setMap(null);
								idSlcVID.value='';
							}	
						}, 1000); //1000 = 1 sec.	
					//}
				}else{
					//poly.setMap(mapBrgyNangka);
					//poly.setPath(pathDefault);
					
					Step3InfContent='<div><img src="' + place.icon + '" height="16" width="16"> '
					+ '<strong>' + place.name + '</strong><br>' + place.formatted_address+'</div>'; //+ 
					//'<br><b style="color:#006699;opacity:0.7;">'+result+
					//' Km away from Nangka Barangay Hall.</b></div>';
				} //alert('not here');
				}else{
					Step3InfContent='<div><img src="' + place.icon + '" height="16" width="16"> '
					+ '<strong>' + place.name + '</strong><br>' + place.formatted_address+'</div>';
				}
			}else{
				//poly.setMap(mapBrgyNangka);
				//poly.setPath(pathDefault);

				Step3InfContent='<div><img src="' + place.icon + '" height="16" width="16"> '
				+ '<strong>' + place.name + '</strong><br>' + place.formatted_address+'</div>'; //+ 
				//'<br><b style="color:#006699;opacity:0.7;">'+result+
				//' Km away from Nangka Barangay Hall.</b></div>';
			} 

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




//////////////////////// start of fetching and pointing of live delivery vehicle /////////////////////////
/* Step3InfoWindow.setContent(Step3InfContent);
Step3InfoWindow.open(mapBrgyNangka,nearestVehicle); */
                /* var path = [rawCoord, nearestVehicle]; //arrMarkers[formerIndex].position];
                poly.setMap(mapBrgyNangka);
                poly.setPath(path); */

                /* Step3InfContent='<div><img src="' + place.icon + '" height="16" width="16"> '
                + '<strong>' + place.name + '</strong><br>' + place.formatted_address + 
                '<br><b style="color:#006699;opacity:0.7;">'+leastValue+
                ' Km away from the nearest Barangay vehicle.</b></div>'; */

                //infoWindow.setContent(Step3InfContent);
                //infoWindow.open(mapBrgyNangka,TheMarker);//pacMarkers[0]);

                /* setTimeout(function() {
                    var ConfirmResult=confirm('The nearest vehicle is '+leastValue+' Km away. Would you like to use this vehicle?');
                    if(ConfirmResult==true){
                        idSlcVID.value=String(arrVIDs[globalFmrIndex]);
                    }else{
                        idSlcVID.value='';
                    }	
                }, 1000); //1000 = 1 sec.	
            }
        }else{
            //poly.setMap(mapBrgyNangka);
            //poly.setPath(pathDefault);
            
            Step3InfContent='<div><img src="' + place.icon + '" height="16" width="16"> '
            + '<strong>' + place.name + '</strong><br>' + place.formatted_address //+ 
            //'<br><b style="color:#006699;opacity:0.7;">'+result+
            //' Km away from Nangka Barangay Hall.</b></div>';
        }
    } */
//////////////////////// end of fetching and pointing of live delivery vehicle ///////////////////////


DisposePoly(Step3InfoWindow);

		function DisposePoly(TheInfoWindow){ //disposes poly when infoWindow closes. applicable only for event coming from Search Box
			google.maps.event.addListener (TheInfoWindow,'closeclick', function(){
				//alert('uhh ..');
				poly.setMap(null);
			});
		}
		/* function BindInfoWindow (marker, map, infoWindow, html){
			google.maps.event.addListener (marker,'click', function(){
				infoWindow.setContent (html);
				infoWindow.open (map, marker);
			});
		} */
	
	
		//var clickHandler = new ClickEventHandler(mapBrgyNangka, posBrgyNangka);
		
		//the polyline settings used in finding the nearest vehicle
		poly = new google.maps.Polyline({
          strokeColor: '#3366cc',
          strokeOpacity: 0.5,
          strokeWeight: 4,
          map: mapBrgyNangka
        });
		


		function AddCarMarker(data){//alert(data.val);
			/* var NangkaBrgyHallMarker=new google.maps.Marker;

			NangkaBrgyHallMarker.setMap(null); */

			/* if(arrLiveDeliveryVehicleMarkers.length<1){
				IsDeliveryVehicleExisting=false;

				var markerOptions ={
					position:posNangkaBrgyHall,
					map:mapBrgyNangka,
					//label:'delivery',
					draggable:false
				};
				//new google.maps.Marker(markerOptions);
				var NangkaBrgyHallMarker = new google.maps.Marker(markerOptions);
				posNBH=marker.position;
				var html = '<div><strong>Nangka Brgy. Hall</strong><br><text>No delivery vehicle online at this time.</text></div>';
				BindInfoWindow (NangkaBrgyHallMarker, mapBrgyNangka, infoWindow, html);alert('good?');
				infoWindow.setContent(html);
				infoWindow.open(mapBrgyNangka, NangkaBrgyHallMarker);
			} *///else{
				IsDeliveryVehicleExisting=true;

				var DeliveryVehicleCoordinates={lat:parseFloat(data.val().lat),lng:parseFloat(data.val().lng)};
				//marker options/settings
				var markerOptions ={
					position    : DeliveryVehicleCoordinates,
					map         : mapBrgyNangka,
					label: 'delivery',
					draggable   : false
				};
				// adds the marker
				var DeliveryVehicleMarker = new google.maps.Marker(markerOptions);
				var ACMVID=String(data.val().vhcId);

				arrLiveDeliveryMarkers[data.val().vhcId]=DeliveryVehicleMarker;
				arrLiveDeliveryVehicleMarkers.push(DeliveryVehicleMarker);
				arrLiveDeliveryVehicleVID.push(ACMVID);

				var IndexOfResult=arrAddCarMarkerVID.indexOf(ACMVID);
				var PSVVeDetails=arrAddCarMarkerVDetails[IndexOfResult].split('+');

				// adds info window content
				var html = '<div><strong>'+PSVVeDetails[0]+' </strong>| '+PSVVeDetails[1]+' '+PSVVeDetails[2]+'<br><text>'+data.val().timeStamp+'</text></div>';
				//alert(html);
				BindInfoWindow (DeliveryVehicleMarker,mapBrgyNangka,Step31InfoWindow,html);

				/* Step31InfoWindow.setContent(html);
				Step31InfoWindow.open(mapBrgyNangka, DeliveryVehicleMarker); */
			
				//listens to tBodyDelivery row clicks
				/* var tr = document.getElementById(vVID); //list of vehicles
				google.maps.event.addDomListener (tr,'click',(function(i){
					return function(){
						RowClick(i); //ayaw magpakita ng row 0 :v
					}
				})(i)
			
				); */
			//}
        }
        
        //listen to tblLiveVeCoordinates for live vehicle delivery
        var LiveVehicleFBDB=firebase.database();
        var refLiveVehicle=LiveVehicleFBDB.ref('tblLiveVeCoordinates');
        
        //creates/shows marker on the map for every new live vehicle on delivery
        refLiveVehicle.on('child_added',function(data){ AddCarMarker(data);});
        
        //updates the coordinates of the marker/vehicle on the map
        refLiveVehicle.on('child_changed',function(data){
            arrLiveDeliveryMarkers[data.val().vhcId].setMap(null); //vhcId as marker identifier in arrLiveDeliveryMarks array
            AddCarMarker(data);});
        
        //delivery vehicle goes offline, removes the marker identified as vhcId
        refLiveVehicle.on('child_removed',function(data){
            arrLiveDeliveryMarkers[data.val().vhcId].setMap(null);
            var IndexOfResult=arrLiveDeliveryVehicleVID.indexOf(String(data.val().vhcId));
			arrLiveDeliveryVehicleVID.slice(IndexOfResult); //removes the VID from pool
			
			if(arrLiveDeliveryVehicleMarkers.length<1){
				IsDeliveryVehicleExisting=false;

				var markerOptions ={
					position:posNangkaBrgyHall,
					map:mapBrgyNangka,
					//label:'delivery',
					draggable:false
				};
				//new google.maps.Marker(markerOptions);
				var NangkaBrgyHallMarker = new google.maps.Marker(markerOptions);
				posNBH=marker.position;
				var html = '<div><strong>Nangka Brgy. Hall</strong><br><text>No delivery vehicle online at this time.</text></div>';
				BindInfoWindow (NangkaBrgyHallMarker, mapBrgyNangka, infoWindow, html); //alert('good?');
				infoWindow.setContent(html);
				infoWindow.open(mapBrgyNangka, NangkaBrgyHallMarker);
				//CHECK IF MARKER DISAPPEARS WHEN arrLiveDeliveryVehicleMarkers has child
				//FOR SURE, IT WON'T
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////////////////////////////////

			}
        });

    function BindInfoWindow (marker, map, infoWindow, html){
        google.maps.event.addListener (marker,'click', function(){
            infoWindow.setContent (html);
            infoWindow.open (map, marker);
        });
    }



} //end of mapIni



//the function below will be used for step31 when loaded
function FindNearestVehicle(){

	if(IsDeliveryVehicleExisting==true){ //alert(IsDeliveryVehicleExisting==true);
	if(idTxtSLLat.value!=""&&idTxtSLLng.value!=""){
		var rawCoord=new google.maps.LatLng(parseFloat(idTxtSLLat.value),parseFloat(idTxtSLLng.value));
		//identifies the nearest vehicle marker in the map
		FindTheNearestLiveDeliveryVehicle(rawCoord);

		setTimeout(function(){
			var path = [rawCoord, nearestVehicle.position]; //arrMarkers[formerIndex].position];
			poly.setMap(gblMapBrgyNangka);
			poly.setPath(path);

			if(nearestVehicle!=null){
				if(idDPick.value==DateTimeNow(5)){ //if set Date of pick up is today
					//nearestVehicle=arrMarkers[formerIndex].position;
					
		
						/* Step3InfContent='<div><strong>' + idTxtSourceLoc.value + '</strong>' + 
						'<br /><b style="color:#006699;opacity:0.7;">'+leastValue+
						' Km away from the nearest Barangay vehicle.</b></div>'; */
		
						//infoWindow.setContent(Step3InfContent);
						//infoWindow.open(mapBrgyNangka,TheMarker);//pacMarkers[0]);
		
						setTimeout(function() {
							var ConfirmResult=confirm('The nearest vehicle is '+leastValue+' Km away. Would you like to use this vehicle?');
							if(ConfirmResult==true){//alert(arrLiveDeliveryVehicleVID[globalFmrIndex]);
								Step31PickupDate.value=idDPick.value; //DateTimeNow(5);
								idSlcVID.value=String(arrLiveDeliveryVehicleVID[globalFmrIndex]);
								//lnkStep31.click(); //ValidateStep3(0); // or lnkStep31.click()
		
								setTimeout(function(){
									btnStep31Search.click();
								},700);
		
							}else{
								poly.setMap(null);
								idSlcVID.value='';
							}	
						}, 1000); //1000 = 1 sec.
					
				}
			}/* else{
				//poly.setMap(mapBrgyNangka);
				//poly.setPath(pathDefault);
				
				Step3InfContent='<div><img src="' + place.icon + '" height="16" width="16"> '
				+ '<strong>' + place.name + '</strong><br>' + place.formatted_address //+ 
				//'<br><b style="color:#006699;opacity:0.7;">'+result+
				//' Km away from Nangka Barangay Hall.</b></div>';
			} */

		},1000);
	}
	}
}

function FindTheNearestLiveDeliveryVehicle(PickupCoordinates){
    var arrCollectedDistance=[];
    var arrCollectedDistanceCopy=[]; //to defy the sort()

			if (arrLiveDeliveryVehicleMarkers.length!=0){ //arrMarkers.length!=0){
				//sums the collected distance of the vehicles currently having their delivery
				for(var i=0;i<arrLiveDeliveryVehicleMarkers.length;i++){ //arrMarkers.length;i++){
                    var calcDistanceResult=calcDistance(PickupCoordinates,arrLiveDeliveryVehicleMarkers[i].position);
                    arrCollectedDistance.push(calcDistanceResult);
                    arrCollectedDistanceCopy.push(calcDistanceResult);
				}
				
				leastValue=arrCollectedDistance.sort(function(a, b){return a - b})[0]; //sorts the splits to get the least value, the nearest vehicle

				//matches the leastValue to the contents of cltdD to identify which of the markers(vehicle) is the nearest
				var formerIndex=null;
				for(var i=0;i<arrCollectedDistanceCopy.length;i++){ //cltdD.length-1;i++){
					if(leastValue==arrCollectedDistanceCopy[i]){ //cltdD.split(',')[i]){
						formerIndex=i;
					};
                }; //alert(formerIndex);
                globalFmrIndex=formerIndex;

                //this block draws a polyline from PickupCoordinates to the nearest vehicle
                //alert(arrLiveDeliveryVehicleMarkers);
                //alert(arrLiveDeliveryVehicleMarkers[formerIndex].position);
                nearestVehicle=arrLiveDeliveryVehicleMarkers[formerIndex]; //.position; //arrMarkers[formerIndex].position;
                //alert(nearestVehicle);
				/* var path = [PickupCoordinates, nearestVehicle]; //arrMarkers[formerIndex].position];
				poly.setMap(gblMapBrgyNangka);
				poly.setPath(path);
				//poly.setMap(null);
			}else if(arrLiveDeliveryVehicleMarkers.length==0){ //arrMarkers.length==0){
				var pathDefault = [PickupCoordinates, posNangkaBrgyHall];
				poly.setMap(gblMapBrgyNangka); //this.map);
				poly.setPath(pathDefault); */
				//alert(event.latLng);
			}else{nearestVehicle==null;}
}

var arrAddCarMarkerVID=[];arrAddCarMarkerVDetails=[];
function SearchFirebase2(Filter,Action,objID){
    var FBDB=firebase.database();

    if(Action==0){ //retrieves vehicle details
        var refFBDB=FBDB.ref('tblVehicle');
        refFBDB.once('value',function(data){
            var TheTable=data.val();
            var TheRows=Object.keys(TheTable);

            for(var i=0;i<TheRows.length;i++){
                var k=TheRows[i];

                arrAddCarMarkerVID.push(String(k));
                arrAddCarMarkerVDetails.push(String(TheTable[k].vhcPnum+'+'+TheTable[k].vhcMake+'+'+TheTable[k].vhcModel));
            }

            /* setTimeout(function(){
                //place an indexOf here
            },700); */
        });
    }
}

	
	//this block is no longer for table row purposes,
	//this block is called when a place marker is clicked
	function PopVehicleInfo(i){
		google.maps.event.trigger(arrMarkers[i],'click');
		//alert('formerIndex '+i);
		infoWindow.open (mapBrgyNangka, marker);
	}
	function CloseVehicleInfo(i){ //won't close so, function not called
		google.maps.event.trigger(arrMarkers[i],'click');
		infoWindow.close(); //(mapBrgyNangka, marker);
	}

	function calcDistance(p1, p2){
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }
	
/* 	var ClickEventHandler = function(map, origin) {
		this.origin = origin;
		this.map = map;
		this.directionsService = new google.maps.DirectionsService;
		this.directionsDisplay = new google.maps.DirectionsRenderer;
		this.infowindow = new google.maps.InfoWindow;
		this.directionsDisplay.setMap(map);
		this.placesService = new google.maps.places.PlacesService(map);

		// Listen for clicks on the map.
		this.map.addListener('click', this.handleClick.bind(this));
	};

	var placeCoord='';
	ClickEventHandler.prototype.handleClick = function(event){
		placeCoord=event.latLng;
		//console.log('You clicked on: ' + event.latLng);
		//alert('You clicked on: ' + event.latLng); //have this for your Source latlng
		//alert('Place ID: '+event.placeId); //using the placeId, get the place name if available
		// If the event has a placeId, use it.
		if (event.placeId) {
			//console.log('You clicked on place:' + event.placeId);
			//alert('You clicked on place:' + event.placeId);
			// Calling e.stop() on the event prevents the default info window from
			// showing.
			// If you call stop here when there is no placeId you will prevent some
			// other map click event handlers from receiving the event.

			//this block gets the coords of the clicked place marker  
			var rawCoord=String(event.latLng);
			var splitLatLng=rawCoord.split(',');
			var subLat=splitLatLng[0].substr(1); //trims the parenthesis on index 1
			var subLng=splitLatLng[1].substr(1).slice(0,-1); //trims the white space on index 1 and slices the parenthesis on the other end
			//alert(subLat+subLng);
			//document.getElementById('idTxtSourceLoc').value=event.placeId.name;
			document.getElementById('idTxtSLLat').value=subLat;
			document.getElementById('idTxtSLLng').value=subLng;
			
			var cltdD='';
			if (arrMarkers.length!=0){
				//sums the collected distance of the vehicles currently having their delivery
				for(var i=0;i<arrMarkers.length;i++){
					if(i<arrMarkers.length-1){
						cltdD=cltdD+calcDistance(event.latLng,arrMarkers[i].position)+',';
					}else{
						cltdD=cltdD+calcDistance(event.latLng,arrMarkers[i].position);
					}
				}
				
				var arrDSplitSort=cltdD.split(',').sort(); //sorts the splits to get the least value, the nearest vehicle
				//alert(arrDSplitSort[0]); //displays the least value
				leastValue=arrDSplitSort[0];
				
				//matches the leastValue to the contents of cltdD to identify which of the markers(vehicle) is the nearest
				var formerIndex=null;
				for(var i=0;i<cltdD.length-1;i++){
					if(leastValue==cltdD.split(',')[i]){
						formerIndex=i;
					};
				};
				//alert(leastValue+"'s former index is "+formerIndex);

				//this block draws a polyline from clicked place marker to the nearest vehicle
				nearestVehicle=arrMarkers[formerIndex].position;
				var path = [event.latLng, nearestVehicle]; //arrMarkers[formerIndex].position];
				poly.setMap(this.map); //mapBrgyNangka);
				poly.setPath(path);
				//poly.setMap(null);
			}else if(arrMarkers.length==0){
				var pathDefault = [event.latLng, posNangkaBrgyHall];
				poly.setMap(this.map);
				poly.setPath(pathDefault);
				//alert(event.latLng);
			}
			
			
			event.stop();
			//this.calculateAndDisplayRoute(event.placeId);
			this.getPlaceInformation(event.placeId,event.latLng);
			
			globalFmrIndex=formerIndex;

			PopVehicleInfo(formerIndex); //pops the infowindow of the nearest vehicle
    	}
  	} */


/*	ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeID) {
    	var me = this;
    	this.directionsService.route({
    	origin: this.origin, //{placeId: placeID}, //this.origin,
    	destination: {placeId: placeID}, //nearestVehicle,//{placeId: placeID},
    	travelMode: 'DRIVING' //'WALKING'
    	},function(response, status){
			if(status === 'OK'){
				me.directionsDisplay.setDirections(response);
			}else {
				window.alert('Directions request failed due to ' + status);
			}
    	});
	};
*/

/*   ClickEventHandler.prototype.getPlaceInformation = function(placeID) {
    var me = this;
	
    this.placesService.getDetails({placeId: placeID}, function(place, status) {
		
		document.getElementById('idTxtSourceLoc').value=place.name+' | '+place.formatted_address;
		
      if (status === 'OK') {
        me.infowindow.close();
        me.infowindow.setPosition(place.geometry.location);
		
		var infContent='';
		if(nearestVehicle!=null){
			infContent='<div><img src="' + place.icon + '" height="16" width="16"> '
            + '<strong>' + place.name + '</strong><br>' + place.formatted_address + 
			'<br><b style="color:#006699;opacity:0.7;">'+leastValue+
			' Km away from the nearest Barangay vehicle.</b></div>';
		}else{ 
			var result=calcDistance(placeCoord,posNBH);
			infContent='<div><img src="' + place.icon + '" height="16" width="16"> '
            + '<strong>' + place.name + '</strong><br>' + place.formatted_address + 
			'<br><b style="color:#006699;opacity:0.7;">'+result+
			' Km away from Nangka Barangay Hall.</b></div>';
		};
        me.infowindow.setContent(infContent);
        me.infowindow.open(me.map);
		//alert(lnkStep3.className);
		if(nearestVehicle!=null){
			if (lnkStep3.className=="tablinks active"){
				
				setTimeout(function() {
					var ConfirmResult=confirm('The nearest vehicle is '+leastValue+' Km away. Would you like to use this vehicle?');
					if(ConfirmResult==true){
						document.getElementById('idSlcVID').value=String(arrVIDs[globalFmrIndex]);
					}else{
						document.getElementById('idSlcVID').value='';
					}	
				}, 1000); //1000 = 1 sec.
			}
		}

		google.maps.event.addListener(me.infowindow,'closeclick',function(){
			poly.setMap(null);
		});
      }
    });
  }; */

	

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
	
	////////////////////////////////////////////////
	/* var vtxtItemCategoryRec=null;
	var vtxtItemSubCategoryRec=null;
	var vtxtItemDescriptionRec=null;
	var vtxtItemUnitRec=null;
	var vtxtItemQtyRec=null;
	var vtxtItemStatRec=null;
	var vtxtItemPledgeDateRec=null;
	var vtxtDonorIdRec=null;
	var vtxtImageUrlRec=null;
	var vtxtDTPickRec=null;
	var vtxtDTDropRec=null;
	var vtxtSLocRec=null;
	var vtxtSLLatRec=null;
	var vtxtSLLngRec=null; */
	var vtxtDlvStatRec=null;
	//var vtxtTLocIDRec=null;
	var vtxtVIDRec=null;
	var vtxtDIUID=null;
	////////////////////////////////////////////////
	function rowSelect(row,whichTable){
		var content=row.cells;

		if (txtAction.value==0){ //0 - choosing an item for delivery in tBodyStep1DIItemList.
			txtStep1DIItemID.value=content[0].innerHTML;
			idTxtSelectedItem.value=content[1].innerHTML+' | '+content[2].innerHTML;

			slcStep1DIDlvStat.value=0;

			txtStep1DIDonorID.value=content[3].innerHTML;
            txtStep1DIImageURL.value=content[4].innerHTML;
            txtStep1DIItemCategory.value=content[5].innerHTML;
			txtStep1DIItemDescription.value=content[6].innerHTML;
			txtStep1DIItemPledgeDate.value=content[7].innerHTML;
			txtStep1DIItemQty.value=content[8].innerHTML;
			txtStep1DIItemStatus.value=content[9].innerHTML;
			txtStep1DIItemSubCategory.value=content[10].innerHTML;
			txtStep1DIItemUnit.value=content[11].innerHTML;

			/* if (whichTable==0){ //tBodyItemList
				var selectedItem=content[1].innerHTML+', '+content[2].innerHTML;

				document.getElementById('idTxtItemID').value=content[0].innerHTML;
				document.getElementById('idTxtSelectedItem').value=selectedItem;
				document.getElementById('idSlcDlvStat').value=0;
			}else if(whichTable==1){
				document.getElementById('idSlcVID').value=content[0].innerHTML;
			} */
		}else if(txtAction.value==1 || txtAction.value==2){ //1 - item detail modification; 2 - delivery cancellation
			if (whichTable==0){
				var DTPick=SplitStr(content[7].innerHTML,' '); //alert('DateTime Pick: '+content[7].innerHTML); //ang lumabas at coords imbis na time
				var DTDrop=SplitStr(content[9].innerHTML,' '); //alert('DateTime Drop: '+content[9].innerHTML);

				if(content[15].innerHTML!=''||content[15].innerHTML!=null){
					Step1DisplayItemSubCategory(content[15].innerHTML,txtStep1ModifyItemSubCategory);
				}
				if(content[18].innerHTML!=''||content[18].innerHTML!=null){
					Step1DisplayItemUnit(content[18].innerHTML,txtStep1ModifyItemUnit);
				}
				

				txtStep1ModifyItemCategory.value=content[15].innerHTML; //alert('txtStep1ModifyItemCategory.value: '+content[15].innerHTML);
                txtStep1ModifyItemSubCategory.value=content[18].innerHTML; //alert('txtStep1ModifyItemSubCategory.value: '+content[18].innerHTML);
                txtStep1ModifyItemDescription.value=content[3].innerHTML; //alert('txtStep1ModifyItemDescription.value: '+content[3].innerHTML);
                txtStep1ModifyItemUnit.value=content[19].innerHTML; //alert('txtStep1ModifyItemUnit.value: '+content[19].innerHTML);
                txtStep1ModifyItemQty.value=content[16].innerHTML; //alert('txtStep1ModifyItemQty.value: '+content[16].innerHTML);
				idSlcItemStat.value=content[17].innerHTML; //alert('idSlcItemStat.value: '+content[17].innerHTML);
				idSlcDlvStat.value=content[13].innerHTML; //alert('idSlcDlvStat.value: '+content[13].innerHTML);
				txtStep1ModifyItemPledgeDate.value=content[5].innerHTML; //alert('txtStep1ModifyItemPledgeDate.value: '+content[5].innerHTML);
                txtStep1ModifyDonorId.value=content[12].innerHTML; //alert('txtStep1ModifyDonorId.value: '+content[12].innerHTML);
                txtStep1ModifyImageUrl.value=content[14].innerHTML; //alert('txtStep1ModifyImageUrl.value: '+content[14].innerHTML);
				txtStep1ModifyKey.value=content[24].innerHTML; //alert('txtStep1ModifyKey.value: '+content[24].innerHTML);
				DonatedItemImage.src=content[14].innerHTML; //alert('DonatedItemImage.src: '+content[14].innerHTML);
				Step31PickupDate.value=DTPick[0]; //alert('Step31PickupDate.value: '+DTPick[0]);

				document.getElementById('idDPick').value=DTPick[0]; //alert('idDPick.value: '+DTPick[0]);
				document.getElementById('idDDrop').value=DTDrop[0]; //alert('idDDrop.value: '+DTDrop[0]);
				//document.getElementById('idTPick').value=DTPick[1];
				//document.getElementById('idTDrop').value=DTDrop[1];
				Step2SlcTPick.value=DTPick[1]; //alert('Step2SlcTPick.value: '+DTPick[1]);
				Step2SlcTDrop.value=DTDrop[1]; //alert('Step2SlcTDrop.value: '+DTDrop[1]);
				document.getElementById('idTxtDateRetainer').value=content[5].innerHTML; //alert('idTxtDateRetainer.value: '+content[5].innerHTML); //DateTime_Pledged - user date/time input must not be lower than
				document.getElementById('idTxtSourceLoc').value=content[6].innerHTML; //alert('idTxtSourceLoc.value: '+content[6].innerHTML);
				document.getElementById('idTxtSLLat').value=content[20].innerHTML; //alert('idTxtSLLat.value: '+content[20].innerHTML);
				document.getElementById('idTxtSLLng').value=content[21].innerHTML; //alert('idTxtSLLng.value: '+content[21].innerHTML);
				document.getElementById('idSlcVID').value=content[23].innerHTML; //alert('idSlcVID.value: '+content[23].innerHTML);
				document.getElementById('txtVIDRetainer').value=content[23].innerHTML; //alert('txtVIDRetainer.value: '+content[23].innerHTML);
				document.getElementById('idSlcTLoc').value=String(content[22].innerHTML); //alert('idSlcTLoc.value: '+content[22].innerHTML);
				Step31HoldSlcVIDValue.value=content[23].innerHTML;
				Step31DTPickRetainer.value=content[7].innerHTML;
				Step31DTDropRetainer.value=content[9].innerHTML;

				//idSlcTLoc.value=String(content[22].innerHTML);
				//document.getElementById('slcSample').value=String(content[22].innerHTML);
				//alert(idSlcTLoc.value); //==='20180831193533129');
				//alert("content[22].innerHTML = "+content[22].innerHTML);
				//alert("idSlcTLoc.value = "+idSlcTLoc.value);


				/* vtxtItemCategoryRec=content[15].innerHTML;
				vtxtItemSubCategoryRec=content[18].innerHTML;
				vtxtItemDescriptionRec=content[3].innerHTML;
				vtxtItemUnitRec=content[19].innerHTML;
				vtxtItemQtyRec=content[16].innerHTML;
				vtxtItemStatRec=content[17].innerHTML;
				vtxtItemPledgeDateRec=content[5].innerHTML;
				vtxtDonorIdRec=content[12].innerHTML;
				vtxtImageUrlRec=content[14].innerHTML;
				vtxtDTPickRec=content[7].innerHTML;
				vtxtDTDropRec=content[9].innerHTML;
				vtxtSLocRec=content[6].innerHTML;
				vtxtSLLatRec=content[20].innerHTML;
				vtxtSLLngRec=content[21].innerHTML; */
				
				vtxtDlvStatRec=content[13].innerHTML;
				
				//vtxtTLocIDRec=content[22].innerHTML;

				var IsVehicle=content[23].innerHTML==="";
				//if(content[23].innerHTML!=="" || content[23].innerHTML!=='' || content[23].innerHTML!==null || content[23].innerHTML!==``){ //alert('hello!');
				if(IsVehicle==false){
					vtxtVIDRec=content[23].innerHTML;
				}
				//}

				vtxtDIUID=content[24].innerHTML; //use this to update a delivery record
				//alert(content[18].innerHTML);

				//Step31LookForDeliveryEvents();
			}
		}
	}
	function TransferValueAfterValidation(Action){ //a function for updating a record, passing the values to 'record' fields
		if (Action==0){ //0 - transfer the values to the frmStep4 inputs
			txtItemCategoryRec.value=txtStep1ModifyItemCategory.value;
            txtItemSubCategoryRec.value=txtStep1ModifyItemSubCategory.value;
            txtItemDescriptionRec.value=txtStep1ModifyItemDescription.value;
            txtItemUnitRec.value=txtStep1ModifyItemUnit.value;
            txtItemQtyRec.value=txtStep1ModifyItemQty.value;
            txtItemStatusRec.value=idSlcItemStat.value;
            txtDelStatusRec.value=idSlcDlvStat.value;
            txtItemPledgeDateRec.value=txtStep1ModifyItemPledgeDate.value;
            txtDonorIdRec.value=txtStep1ModifyDonorId.value;
            txtStep1ImageUrlRec.value=txtStep1ModifyImageUrl.value;
			//txtDTPickRec.value=idDPick.value+' '+idTPick.value;
			//txtDTDropRec.value=idDDrop.value+' '+idTDrop.value;
			txtDTPickRec.value=idDPick.value+' '+Step2SlcTPick.value;
			txtDTDropRec.value=idDDrop.value+' '+Step2SlcTDrop.value;
			txtSLocRec.value=idTxtSourceLoc.value;
			txtSLLatRec.value=idTxtSLLat.value;
			txtSLLngRec.value=idTxtSLLng.value;
			//txtDlvStatRec.value=//vtxtDlvStatRec;
			txtTLocIDRec.value=idSlcTLoc.value;
			txtVIDRec.value=idSlcVID.value;

		}else if(Action==1){
			frmStep4.reset();
			/* txtItemCategoryRec.value='';
            txtItemSubCategoryRec.value='';
            txtItemDescriptionRec.value='';
            txtItemUnitRec.value='';
            txtItemQtyRec.value='';
            txtItemStatusRec.value='';
            txtDelStatusRec.value='';
            txtItemPledgeDateRec.value='';
            txtDonorIdRec.value='';
            txtStep1ImageUrlRec.value='';
			txtDTPickRec.value='';
			txtDTDropRec.value='';
			txtSLocRec.value='';
			txtSLLatRec.value='';
			txtSLLngRec.value='';
			//txtDlvStatRec.value=//vtxtDlvStatRec;
			txtTLocIDRec.value='';
			txtVIDRec.value=''; */
		}
	}
	function Step1DisplayItemSubCategory(SlcValue,objID){ //alert(SlcValue+' is equal to Food = '+(SlcValue=='Food'));
		objID.innerHTML='<option value="">Choose an item sub category</option>';
		txtStep1ItemUnit.innerHTML='<option value="">Choose an item unit</option>';

		if(SlcValue=='Clothes' || SlcValue=='Others'){
			objID.innerHTML='<option value="">Not applicable</option>';
			txtStep1ItemUnit.innerHTML='<option value="">Choose an item unit</option>'+
			'<option value="Pieces">Pieces</option>';
		}else if(SlcValue=='Food'){
			objID.innerHTML+='<option value="Canned Goods">Canned Goods</option>'+
			'<option value="Instant Noodles">Instant Noodles</option>'+
			'<option value="Rice">Rice</option>'+
			'<option value="Other Food">Other Food</option>';
		}else if(SlcValue=='Medicine'){
			objID.innerHTML+='<option value="Capsule">Capsule</option>'+
			'<option value="Tablet">Tablet</option>'+
			'<option value="Syrup">Syrup</option>'+
			'<option value="Others">Others</option>';
		}else if(SlcValue=='Toiletries'){
			objID.innerHTML+='<option value="Shampoo">Shampoo</option>'+
			'<option value="Soap">Soap</option>'+
			'<option value="Toothbrush">Toothbrush</option>'+
			'<option value="Toothpaste">Toothpaste</option>'+
			'<option value="Deodorant">Deodorant</option>'+
			'<option value="Sanitary Napkins">Sanitary Napkins</option>'+
			'<option value="Other Toiletries">Other Toiletries</option>';
		}else if(SlcValue=='Water'){
			objID.innerHTML+='<option value="Drinking Water">Drinking Water</option>'; //(Bottled)</option>'+
			/* '<option value="Drinking Water">Drinking Water (Large Containers)</option>'; */
		}else if(SlcValue==''){
			objID.innerHTML='<option value="">Choose an item sub category</option>';
		}
	}
	function Step1DisplayItemUnit(SlcValue,objID){ //alert(SlcValue);
		objID.innerHTML='<option value="">Choose an item unit</option>';

		if(SlcValue=='' || SlcValue=='Canned Goods' || SlcValue=='Instant Noodles' || SlcValue=='Other Food' || SlcValue=='Others' || SlcValue=='Toothbrush' || SlcValue=='Other Toiletries'){
			objID.innerHTML+='<option value="Pieces">Pieces</option>';
		}else if(SlcValue=='Rice'){
			objID.innerHTML+='<option value="Sacks">Sacks</option>'+
			'<option value="Kilos">Kilos</option>';
		}else if(SlcValue=='Capsule' || SlcValue=='Tablet'){
			objID.innerHTML+='<option value="Boxes">Boxes</option>';
		}else if(SlcValue=='Syrup'){
			objID.innerHTML+='<option value="Bottle">Bottle</option>';
		}else if(SlcValue=='Shampoo'){
			objID.innerHTML+='<option value="Packs">Packs</option>'+
			'<option value="Bottles">Bottles</option>';
		}else if(SlcValue=='Soap'){
			objID.innerHTML+='<option value="Bars">Bars</option>';
		}else if(SlcValue=='Toothpaste'){
			objID.innerHTML+='<option value="Packs">Packs</option>'+
			'<option value="Tubes">Tubes</option>';
		}else if(SlcValue=='Deodorant'){
			objID.innerHTML+='<option value="Packs">Packs</option>'+
			'<option value="Roll-on">Roll-on</option>'+
			'<option value="Stick">Stick</option>';
		}else if(SlcValue=='Sanitary Napkins'){
			objID.innerHTML+='<option value="Packs">Packs</option>';
		}else if(SlcValue=='Drinking Water'){
			objID.innerHTML+='<option value="Bottles">Bottles</option>'+
			'<option value="Jugs">Jugs</option>';
		/* }else if(SlcValue=='Drinking Water'){
			objID.innerHTML+='<option value="Jugs">Jugs</option>'; */
		}else if(SlcValue==''){
			objID.innerHTML='<option value="">Choose an item unit</option>';
		}
	}
		
	function SplitStr(Str,Splitter){
		var Splitted=Str.split(Splitter);
		return Splitted;
	}

	function openTab(evt, tabID) {
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and set the class into "active" making
		// the style pause to active class
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(tabID).style.display = "block";
		evt.currentTarget.className += " active";
	}
	function SlcDlvStatUISettings(SlcVal){ //we'll no longer use this..
		if (SlcVal==1){
			spanStep4CommitBtn.style.visibility='hidden'; //pointerEvents='none';
		}else{
			spanStep4CommitBtn.style.visibility='visible'; //pointerEvents='auto';
		}
	}
	function DropOffUISettings(Result){
		if (Result=='1'){
			divMsgWrapperStep1.style.backgroundColor='#c1ffc6';
		}else if(Result=='0'){ 
			divMsgWrapperStep1.style.backgroundColor='#ff7070';
		}
		CoreDropOffUISettings(1);
		TransferValueAfterValidation(1);
	}
	function CoreDropOffUISettings(Invert){
		if (Invert=='1'){
			divMsgWrapperStep1.style.visibility='visible';
			stepTabs.style.pointerEvents='none';
			Step1ModifyADelivery.style.pointerEvents='none';
			divTab2Step1.style.pointerEvents='none';
		}else if(Invert=='0'){
			divMsgWrapperStep1.style.visibility='hidden';
			stepTabs.style.pointerEvents='auto';
			Step1ModifyADelivery.style.pointerEvents='auto';
			divTab2Step1.style.pointerEvents='auto';
		}
	}
	function LoadDoMainTab(){ //for confirmation message of Dropoff and Cancel a delivery
		CoreDropOffUISettings(0);
		if (txtAction.value==1){
			DoMainTab2(1);
		}else if(txtAction.value==2){
			DoMainTab3(1);
		}
	}

	var HoldSearchFBDelPick;
	function ValidateStep1(action){
    //action 0 - loads the next tab
	//action 1 - returns boole (true)
	//txtAction 0 - validation for donated item coming from server (walk-in donor / to be delivered by brgy)
	//txtAction 1 - validates when 'Create/Modify a record' is clicked
	//txtAction 2 - validation for cancelling a delivery
    
		var valDIUID=document.getElementById('txtStep1ModifyKey').value;
		var valDlvStat=document.getElementById('idSlcDlvStat').value;
		var DTNow=DateTimeNow();
		if (txtAction.value==0){
			if(txtStep1DIItemID.value!=''){
				if(slcStep1DIDlvStat.value==0 && slcStep1DIDlvStat.value!=''){
					if (action==0){
						openTab(event,'Step2');
						LoadStep2(1);
					}else if(action==1){
						return true;
					}
				}else{ alert('Set the delivery status to \'pick up\' before clicking \'Next\'.');}
			}else{ alert('Please choose an item before clicking \'Next\'.');}
			
		}else if(txtAction.value==1){
			if(valDIUID!=''){
				//combinations of what user can do with valDlvStat
				// 0 to 0 - edits detail
				// 0 to 1 - from pickup to dropoff
				// 0 to 2 - from pickup to cancel, this action is covered under DoMainTab3 (Cancel a delivery)
				// 0 to 3 - from pickup to on going
				// 1 to 0 - from dropoff to pickup, no such thing
				// 1 to 1 - no such thing
				// 1 to 2 - from dropoff to cancel, no such thing
				// 1 to 3 - from dropoff to ongoing, no such thing
				// 2 to 0 - from cancelled to pickup, no such thing
				// 2 to 1 - from cancelled to dropoff, no such thing
				// 2 to 2 - no such thing
				// 2 to 3 - from cancelled to on going, no such thing
				// 3 to 0 - from on going to pickup, no such thing
				// 3 to 1 - from on going to dropoff
				// 3 to 2 - from on going to cancel, no such thing
				// 3 to 3 - no such thing

				if(vtxtDlvStatRec==0 && valDlvStat=='0'){ //the user edits the detail of a delivery on picking up
					if (action==0){
						openTab(event,'Step2');
						LoadStep2(1);
					}else if(action==1){
						return true;
					}

				}else if(vtxtDlvStatRec==0 && valDlvStat=='1'){ //the user edits the detail of a delivery from picking up into dropping off 
					//var DTPick=idDPick.value+' '+idTPick.value;
					var DTPick=idDPick.value+' '+Step2SlcTPick.value;
					if (DTNow>=DTPick){ //know if the delivery session is done 
						var confirmResult=confirm('This action will mark the delivery session as done at '+DTNow+'\nClick OK to continue.');

						if (confirmResult==true){
							//check if the item was already delivered to prevent re-stamping the record
							//getData(txtDLVIDRec.value,3,'txtDlvCurrentStat');
							//SearchFirebase(valDIUID,3,txtDlvCurrentStat);

							//setTimeout(function(){
								//if (txtDlvCurrentStat.innerHTML==0){ //delivery item stat is picking up
									TransferValueAfterValidation(0);
//var PSV=txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+DTNow+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+idSlcDlvStat.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value+'+'+vtxtApprovalStat;
									var PSV=txtItemCategoryRec.value+'+'+
									txtItemSubCategoryRec.value+'+'+
									txtItemDescriptionRec.value+'+'+
									txtItemUnitRec.value+'+'+
									txtItemQtyRec.value+'+'+
									txtItemStatusRec.value+'+'+
									txtDelStatusRec.value+'+'+
									txtItemPledgeDateRec.value+'+'+
									txtDonorIdRec.value+'+'+
									txtStep1ImageUrlRec.value+'+'+
									txtDTPickRec.value+'+'+
									txtDTDropRec.value+'+'+
									txtSLocRec.value+'+'+
									txtSLLatRec.value+'+'+
									txtSLLngRec.value+'+'+
									txtVIDRec.value+'+'+
									txtTLocIDRec.value;

									//storeData(PSV,'1a','spanMsg');
									RecordFirebase(PSV,2,spanMsg);

									setTimeout(function(){
										if (spanMsg.innerHTML==1){ // 1 = success
											DropOffUISettings(1);
											spanResultStep1.innerHTML='The Item successfully dropped off.';
										}else if(spanMsg.innerHTML==0){ // 0 = fail
											DropOffUISettings(0);
											spanResultStep1.innerHTML='An error occured during data modification. No record modified.';
										}
									},1000);
								/* }else if(txtDlvCurrentStat.innerHTML==1){ //delivery status 1 = drop off or done/delivered
									alert('This item was already delivered/dropped off.');
								}else if(txtDlvCurrentStat.innerHTML==2){
									alert('The delivery of this item was already cancelled.');
								}else if(txtDlvCurrentStat.innerHTML==3){
									alert('This item is currently on deliver.');
								}
							},1000); */

						}
					}else{alert('Dropoff date and time must not be sooner than the Pickup date and time.');}

				//this action is covered under DoMainTab3
				/* }else if(vtxtDlvStatRec==0 && valDlvStat==2){ //from pickup to cancel
					var confirmResult=confirm('This action is irreversible. Are you sure you want to cancel the delivery of this item?');

							if(confirmResult==true){
								var PSV=txtItemCategoryRec.value+'+'+
								txtItemSubCategoryRec.value+'+'+
								txtItemDescriptionRec.value+'+'+
								txtItemUnitRec.value+'+'+
								txtItemQtyRec.value+'+'+
								txtItemStatusRec.value+'+'+
								txtDelStatusRec.value+'+'+
								txtItemPledgeDateRec.value+'+'+
								txtDonorIdRec.value+'+'+
								txtStep1ImageUrlRec.value+'+'+
								txtDTPickRec.value+'+'+
								txtDTDropRec.value+'+'+
								txtSLocRec.value+'+'+
								txtSLLatRec.value+'+'+
								txtSLLngRec.value+'+'+
								txtVIDRec.value+'+'+
								txtTLocIDRec.value;

								RecordFirebase(PSV,4,spanMsg);

								setTimeout(function(){
									if (spanMsg.innerHTML==1){ // 1 = success
										DropOffUISettings(1);
										spanResultStep1.innerHTML='The Item delivery status is now \'on going\'.';
									}else if(spanMsg.innerHTML==0){ // 0 = fail
										DropOffUISettings(0);
										spanResultStep1.innerHTML='An error occured during data modification. No record modified.';
									}
								},1000);
							} */

				}else if(vtxtDlvStatRec==0 && valDlvStat==3){ // from pickup to on going
					SearchFirebase(valDIUID,1,HoldSearchFBDelPick);// compare date & time pick and DateTimeNow(). offset or not, allow the user to modify the status. this action is irreversible 

					setTimeout(function(){
						//if(HoldSearchFBDelPick > DateTimeNow()){
							var confirmResult=confirm('The designated pickup date and time of the donated item is '+HoldSearchFBDelPick+'.\n'+
							'Date and time now is '+DateTimeNow()+'.\n'+
							'Continue anyway?');

							if(confirmResult==true){
								var PSV=txtItemCategoryRec.value+'+'+
								txtItemSubCategoryRec.value+'+'+
								txtItemDescriptionRec.value+'+'+
								txtItemUnitRec.value+'+'+
								txtItemQtyRec.value+'+'+
								txtItemStatusRec.value+'+'+
								txtDelStatusRec.value+'+'+
								txtItemPledgeDateRec.value+'+'+
								txtDonorIdRec.value+'+'+
								txtStep1ImageUrlRec.value+'+'+
								txtDTPickRec.value+'+'+
								txtDTDropRec.value+'+'+
								txtSLocRec.value+'+'+
								txtSLLatRec.value+'+'+
								txtSLLngRec.value+'+'+
								txtVIDRec.value+'+'+
								txtTLocIDRec.value;

								RecordFirebase(PSV,4,spanMsg);

								setTimeout(function(){
									if (spanMsg.innerHTML==1){ // 1 = success
										DropOffUISettings(1);
										spanResultStep1.innerHTML='The Item delivery status is now \'on going\'.';
									}else if(spanMsg.innerHTML==0){ // 0 = fail
										DropOffUISettings(0);
										spanResultStep1.innerHTML='An error occured during data modification. No record modified.';
									}
								},1000);
							}
						//}
						
					},1000);
				//1 to 0 --> 3 to 0
				}else if(vtxtDlvStatRec==1 && valDlvStat==0){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==1 && valDlvStat==1){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==1 && valDlvStat==2){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==1 && valDlvStat==3){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==2 && valDlvStat==0){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==2 && valDlvStat==1){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==2 && valDlvStat==2){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==2 && valDlvStat==3){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==3 && valDlvStat==0){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==3 && valDlvStat==1){ //from on going to dropoff
					var confirmResult=confirm('This action is irreversible. This action will set the delivery status from \'on going\' to \'dropoff\'.\nPlease click \'OK\' to continue.');

							if(confirmResult==true){
								var PSV=txtItemCategoryRec.value+'+'+
								txtItemSubCategoryRec.value+'+'+
								txtItemDescriptionRec.value+'+'+
								txtItemUnitRec.value+'+'+
								txtItemQtyRec.value+'+'+
								txtItemStatusRec.value+'+'+
								txtDelStatusRec.value+'+'+
								txtItemPledgeDateRec.value+'+'+
								txtDonorIdRec.value+'+'+
								txtStep1ImageUrlRec.value+'+'+
								txtDTPickRec.value+'+'+
								txtDTDropRec.value+'+'+
								txtSLocRec.value+'+'+
								txtSLLatRec.value+'+'+
								txtSLLngRec.value+'+'+
								txtVIDRec.value+'+'+
								txtTLocIDRec.value;

								RecordFirebase(PSV,5,spanMsg);

								setTimeout(function(){
									if (spanMsg.innerHTML==1){ // 1 = success
										DropOffUISettings(1);
										spanResultStep1.innerHTML='The Item delivery was successfully dropped off.';
									}else if(spanMsg.innerHTML==0){ // 0 = fail
										DropOffUISettings(0);
										spanResultStep1.innerHTML='An error occured during data modification. No record modified.';
									}
								},1000);
							}

				}else if(vtxtDlvStatRec==3 && valDlvStat==2){ alert('This action is not applicable.');
				}else if(vtxtDlvStatRec==3 && valDlvStat==3){ alert('This action is not applicable.');
				}else{alert('Please choose a delivery status before clicking \'Next.\'');}
			}else{alert('Choose an item first before clicking \'Next.\'');}
		
		}else if(txtAction.value==2){
			if(txtStep1ModifyKey.value!=''){ //vtxtDIUID!=''){
				if (valDlvStat==2){
					var confirmResult=confirm('This action will cancel the delivery of the item.\nClick OK to continue.');
					if (confirmResult==true){
						//alert('do the ajax way');
						//getData(txtDLVIDRec.value,3,'txtDlvCurrentStat'); //check if the delivery status of the item is for pick up
						SearchFirebase(vtxtDIUID,3,txtDlvCurrentStat);

						setTimeout(function(){							
//var PSV=txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+txtDTDropRec.value+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+idSlcDlvStat.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value+'+'+vtxtApprovalStat;
						TransferValueAfterValidation(0);

							if (txtDlvCurrentStat.innerHTML==0){ //delivery item stat is picking up
								if (DTNow<txtDTPickRec.value){ //check if current date and time is less than the date and time of Pick up
									
									var PSV=txtItemCategoryRec.value+'+'+
									txtItemSubCategoryRec.value+'+'+
									txtItemDescriptionRec.value+'+'+
									txtItemUnitRec.value+'+'+
									txtItemQtyRec.value+'+'+
									txtItemStatusRec.value+'+'+
									txtDelStatusRec.value+'+'+
									txtItemPledgeDateRec.value+'+'+
									txtDonorIdRec.value+'+'+
									txtStep1ImageUrlRec.value+'+'+
									txtDTPickRec.value+'+'+
									txtDTDropRec.value+'+'+
									txtSLocRec.value+'+'+
									txtSLLatRec.value+'+'+
									txtSLLngRec.value+'+'+
									txtVIDRec.value+'+'+
									txtTLocIDRec.value;

									//storeData(PSV,'2','spanMsg');
									RecordFirebase(PSV,2,spanMsg);

									setTimeout(function(){
										if (spanMsg.innerHTML==1){ // 1 = success
											DropOffUISettings(1);
											spanResultStep1.innerHTML='Item delivery successfully cancelled.';
										}else if(spanMsg.innerHTML==0){ // 0 = fail
											DropOffUISettings(0);
											spanResultStep1.innerHTML='An error occured during data modification. No record modified.';
										}

									},2500);
								}else{alert('Item delivery cannot be cancelled, the delivery is on going.');}
							}else if(txtDlvCurrentStat.innerHTML==1){alert('The Item you choose was already delivered.');
							}else if(txtDlvCurrentStat.innerHTML==2){alert('The Item you choose was already cancelled.');
							}else if(txtDlvCurrentStat.innerHTML==3){alert('The Item you choose is currently on its way to designated evacuation centre.');
							}else if(txtDlvCurrentStat.innerHTML==4){alert('An error occured while updating the record. Delivery cancelation not successfull.');}
						},1000);
					}
				}else{ alert('Set the Delivery status to \'Cancel\' to cancel the delivery of an Item.');}
			}else{ alert('Choose an item first before clicking \'Next.\'');}
		}
		
	}
	function ValidateStep2(action){ //0 - initial validation, 1 - final validation @Step4
		var valDPick=String(document.getElementById('idDPick').value);
		//var valTPick=String(document.getElementById('idTPick').value);
		var valDDrop=String(document.getElementById('idDDrop').value);
		//var valTDrop=String(document.getElementById('idTDrop').value);
		var valTPick=Step2SlcTPick.value;
		var valTDrop=Step2SlcTDrop.value;
		
		//on txtAction=0, idTxtDateRetainer value is the date and time of DTPick
		//on txtAction=1, idTxtDateRetainer value is the DTPledged
		var DateRetain=new Date(document.getElementById('idTxtDateRetainer').value);
		var DateTimePick=new Date(valDPick+' '+valTPick);
		var DateTimeDrop=new Date(valDDrop+' '+valTDrop);
		
		//
			if(DateTimePick>=DateRetain){ 
				//alert('valid date & time for pick up.');
				if(DateTimeDrop>=DateTimePick){
					//alert('valid date & time for drop off.');
					if (txtAction.value==0){
						if (action==0){
							document.getElementById('idTxtValidateRetainer').value=1;
							openTab(event,'Step3');
							document.getElementById('lnkStep3').click();
						}else if(action==1){
							return true;
						}
					}else if(txtAction.value==1){
						if((valDDrop+' '+valTDrop)>=txtDateNowRetainer.value){ //drop off date and time is within or ahead of the date today
							if (action==0){
								document.getElementById('idTxtValidateRetainer').value=1;
								openTab(event,'Step3');
								document.getElementById('lnkStep3').click();
							}else if(action==1){
								return true;}
						}else{alert('Drop off date and time must not be set backwards.');}
					}
				}else{alert('Drop off date and time must not be sooner than the date and time of Pick up.');}
			}else{
				if (txtAction.value==0){
					alert('Pick up date and time must not be set backwards.');
				}else if(txtAction.value==1){
					alert('Pick up date and time must not be sooner than the date and time the item was pledged.');
				}
			}
	}
	function ValidateStep3(action){
		//var valSourceLoc=String(document.getElementById('idTxtSourceLoc').value);
		/*var valLat=String(document.getElementById('idTxtSLLat').value);
		var valLng=String(document.getElementById('idTxtSLLng').value);*/
		//var valVID=String(document.getElementById('idSlcVID').value);

		if (idTxtSourceLoc.value!=''){
			//if (valVID!=''){
				if (action==0){
					openTab(event,'Step31');
					document.getElementById('lnkStep31').click();
					Step31LookForDeliveryEvents();
					//btnStep31Search.click();

					if(txtAction.value==1 && idSlcVID.value==''){
						FindNearestVehicle();
					}
				}else if(action==1){
					return true;
				}
			//}else {alert('Please choose a vehicle to deliver.');}
		}else {alert('Please have a Pick up location.');}
	}
	function ValidateStep31(action){ //alert(Step31CheckForCollisionValue.value);
		if (Step31HoldSlcVIDValue.value!=''){ //alert(Step31HoldSlcVIDValue.value); //no vehicle chosen
			if(Step31PickupDate.value==idDPick.value){ //alert(Step31PickupDate.value);//check if pickup dates are equal

				/* if(txtAction.value==1 && txtStep1ModifyKey!=''){ //bypass event collision checking
					Step31CheckForCollisionValue.value=1;
				} *//* else if(txtAction.value==0 && txtStep1ModifyKey==''){
					Step31CheckForCollisionValue.value=1;
				} */
				
				//alert(Step31CheckForCollisionValue.value);
				/* if(Step31CheckForCollisionValue.value==1){ //alert(Step31CheckForCollisionValue.value);

					var confirmResult=confirm('The pickup date and time that you set collides with an existing delivery event.\nContinue anyway?');
					if(confirmResult==true){
						if (action==0){
							openTab(event,'Step4');
							document.getElementById('lnkStep4').click();
						}else if(action==1){
							return true;
						}
						//ValidateStep31CommonCode();
					}else{ idSlcVID.value=''; Step31HoldSlcVIDValue.value='';}
				}else */ if(Step31CheckForCollisionValue.value==0){
					if (action==0){
						openTab(event,'Step4');
						document.getElementById('lnkStep4').click();
					}else if(action==1){
						return true;
					}
					//ValidateStep31CommonCode();
				}else{
					alert('The pickup date and time that you set collides with an existing delivery event.');
				}

			}else{ alert('Pickup date on Step 4 is not equal to the one on Step 2.');}
		}else {alert('Please choose a vehicle to deliver.');}

		function ValidateStep31CommonCode(){ //won't work
			if (action==0){
				openTab(event,'Step4');
				document.getElementById('lnkStep4').click();
			}else if(action==1){
				return true;
			}
		}
	}
	function ValidateStep4(){

		if (ValidateStep1(1)==true){
            txtItemCategoryRec.value=txtStep1DIItemCategory.value;
            txtItemSubCategoryRec.value=txtStep1DIItemSubCategory.value;
			txtItemDescriptionRec.value=txtStep1DIItemDescription.value;
			txtItemUnitRec.value=txtStep1DIItemUnit.value;
            txtItemQtyRec.value=txtStep1DIItemQty.value;
            txtItemStatusRec.value=txtStep1DIItemStatus.value;
            txtDelStatusRec.value=slcStep1DIDlvStat.value; //alert(slcStep1DIDlvStat.value);
            txtItemPledgeDateRec.value=txtStep1DIItemPledgeDate.value;
            txtDonorIdRec.value=txtStep1DIDonorID.value;
            txtStep1ImageUrlRec.value=txtStep1DIImageURL.value;

			/* txtItemIDRec.value=idTxtItemID.value;
			txtDlvStatRec.value=idSlcDlvStat.value; */
			if (ValidateStep2(1)==true){
				txtDTPickRec.value=String(idDPick.value+' '+Step2SlcTPick.value);//idTPick.value); //valDTPick;
				txtDTDropRec.value=String(idDDrop.value+' '+Step2SlcTDrop.value);//idTDrop.value); //valDTDrop;

				if (ValidateStep3(1)==true){
					txtSLocRec.value=idTxtSourceLoc.value;
					txtSLLatRec.value=idTxtSLLat.value;
					txtSLLngRec.value=idTxtSLLng.value;

					if(ValidateStep31(1)==true){
						txtVIDRec.value=Step31HoldSlcVIDValue.value;

						if (idSlcTLoc.value!=''){
							txtTLocIDRec.value=idSlcTLoc.value; //valTLocID;

							var confirmResult=null;
	
							if (txtAction.value==0){
								
								confirmResult=confirm('This action will create a new Delivery record. Please click \'OK\' to continue');
								if (confirmResult==true){

										var PSV=txtItemCategoryRec.value+'+'+
										txtItemSubCategoryRec.value+'+'+
										txtItemDescriptionRec.value+'+'+
										txtItemUnitRec.value+'+'+
										txtItemQtyRec.value+'+'+
										txtItemStatusRec.value+'+'+
										txtDelStatusRec.value+'+'+
										txtItemPledgeDateRec.value+'+'+
										txtDonorIdRec.value+'+'+
										txtStep1ImageUrlRec.value+'+'+
										txtDTPickRec.value+'+'+
										txtDTDropRec.value+'+'+
										txtSLocRec.value+'+'+
										txtSLLatRec.value+'+'+
										txtSLLngRec.value+'+'+
										txtVIDRec.value+'+'+
										txtTLocIDRec.value;

										RecordFirebase(PSV,0,spanMsg);
	
										setTimeout(function(){
											if (spanMsg.innerHTML==1){ // 1 = success
												ResultUISettings(1);
												spanResult.innerHTML='Record successfully created.';
											}else if(spanMsg.innerHTML==0){ // 0 = fail
												ResultUISettings(0);
												spanResult.innerHTML='An error occured on record creation. No record created.';
											}
										},1000);
								}
							}else if(txtAction.value==1){
								//getData(txtVIDRetainer.value,2,'spanMsg'); //check if the existing delivery record is not on its way yet 
								SearchFirebase(txtVIDRetainer.value,2,'spanMsg');
	
								setTimeout(function(){
									if (spanMsg.innerHTML==0){
										//var PSV=txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+txtDTDropRec.value+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+txtDlvStatRec.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value+'+1';
										//alert(PSV);
	
										confirmResult=confirm('This action will modify an existing Delivery record. Please click \'OK\' to continue');
										
										if (confirmResult==true){//alert(selectedFile==null);
											//storeData(PSV,1,'spanMsg');
											if(selectedFile!=null){ //ImageOpenModify.value!=null){ //the user will upload a photo

												//UploadPicture(txtStep1ImageUrl.value,selectedFile,txtStep1ImageUrlRec,1);
												UploadPicture(txtStep1ModifyImageUrl.value,selectedFile,txtStep1ModifyImageUrl,1);
			
												setTimeout(function(){
													ModifyADeliveryCommonCode();
												},4000);
											}else if(selectedFile==null){
												ModifyADeliveryCommonCode();
											}
										}
	
									}else {alert('The item you choose is currently on deliver or was already delivered. Item detail modification is no longer allowed.');}
								},1000);
								
								function ModifyADeliveryCommonCode(){
									TransferValueAfterValidation(0);
												var PSV=txtItemCategoryRec.value+'+'+
												txtItemSubCategoryRec.value+'+'+
												txtItemDescriptionRec.value+'+'+
												txtItemUnitRec.value+'+'+
												txtItemQtyRec.value+'+'+
												txtItemStatusRec.value+'+'+
												txtDelStatusRec.value+'+'+
												txtItemPledgeDateRec.value+'+'+
												txtDonorIdRec.value+'+'+
												txtStep1ImageUrlRec.value+'+'+
												txtDTPickRec.value+'+'+
												txtDTDropRec.value+'+'+
												txtSLocRec.value+'+'+
												txtSLLatRec.value+'+'+
												txtSLLngRec.value+'+'+
												txtVIDRec.value+'+'+
												txtTLocIDRec.value;
	
												RecordFirebase(PSV,1,spanMsg);
	
												setTimeout(function(){ //alert('went in!');
													if (spanMsg.innerHTML=='1'){ // 1 = success
														ResultUISettings(1);
														spanResult.innerHTML='Record successfully modified.';
													}else if(spanMsg.innerHTML=='0'){ // 0 = fail
														ResultUISettings(0);
														spanResult.innerHTML='An error occured on updating the record. Record not modified.';
													}
												},2500);
								}
							}
						}//else {alert('Please choose a Drop off location.');}
					}//else{alert('Please choose a vehicle to deliver.');}
				}
			}
		}	
	}

	function SearchFirebase(Filter,Action,objID){ 
		var FBDB=firebase.database();
		var refFBDB='';

		if(Action==0){ // searches records in tblDonatedItems, itemStatus is either 'to be delivered by brgy' or 'to be delivered by donor'
			var arrVehicleID=[],arrVehicleIDRow=[],arrTargetLoc=[],arrTargetLocRow=[];arrDonorID=[];
			var IsError=false,IsEmpty=false;

			refFBDB=FBDB.ref('tblDonatedItems').orderByChild('delPick').startAt(String(Filter)).endAt(String(Filter)+'\uf8ff');
			refFBDB.on('value',function(data){

				//////////////////////////////////////////////////////////////////////////////////////////////////////
				/* var TheTable=data.val();
				var TheRows=Object.keys(TheTable); alert(Filter);
				for(var i=0;i<TheRows.length;i++){
					var k=TheRows[i];
					alert(TheTable[k].delPick);
				} */
				//////////////////////////////////////////////////////////////////////////////////////////////////////
				

				if(data.exists()){
					var TheTable=data.val();
					var TheRows=Object.keys(TheTable);

					objID.innerHTML='';
					arrVehicleID=[],arrVehicleIDRow=[],arrTargetLoc=[],arrTargetLocRow=[];arrDonorID=[];

					for(var i=0;i<TheRows.length;i++){
						var k=TheRows[i];
						var ItemStatusMask,Category,Volume,DeliveryStatusMask,Vehicle;
						
						if(TheTable[k].itemStatus==0){ ItemStatusMask='to be delivered by barangay';}
						else{ ItemStatusMask='to be delivered by donor';}

						if(TheTable[k].delStatus==0){ DeliveryStatusMask='for Pickup';}
						else if(TheTable[k].delStatus==1){ DeliveryStatusMask='Dropped off';}
						else if(TheTable[k].delStatus==2){ DeliveryStatusMask='Cancelled';}
						else if(TheTable[k].delStatus==3){ DeliveryStatusMask='On going';}

						if(TheTable[k].vhcId!=''){
							arrVehicleID.push(String(TheTable[k].vhcId));
							arrVehicleIDRow.push(String(i));
							Vehicle='please wait...';
						}else{
							if(TheTable[k].itemStatus==0){
								Vehicle='No chosen barangay vehicle yet.';
							}else{
								Vehicle='donor\'s vehicle';
							}
						}

						arrTargetLoc.push(String(TheTable[k].tLocId));
						arrTargetLocRow.push(String(i));
						arrDonorID.push(String(TheTable[k].donorId));

						Category=TheTable[k].itemCategory+' / '+TheTable[k].itemSubCategory;
						Volume=TheTable[k].itemQty+' '+TheTable[k].itemUnit;

						objID.innerHTML+='<tr style="cursor:pointer;" onclick="rowSelect(this,0);">'+
							'<td>'+TheTable[k].donorId+'</td>'+ //<!--donorId should be a join-->
                            '<td>'+ItemStatusMask+'</td>'+ //<!--itemStatus mask -->
                            '<td>'+Category+'</td>'+ //<!--itemCat / itemSubCat-->
                            '<td>'+TheTable[k].itemDescription+'</td>'+ //<!--itemDesc-->
                            '<td>'+Volume+'</td>'+ //<!--itemQty itemUnit-->
                            '<td>'+TheTable[k].itemPledgeDate+'</td>'+ //<!--itemPledgeDate-->
                            '<td>'+TheTable[k].srcLoc+'</td>'+ //<!--srcLoc-->
                            '<td>'+TheTable[k].delPick+'</td>'+ //<!--delPick can be null-->
                            '<td id="TLOC'+i+'">please wait...</td>'+ //Dropoff location</p></th><!--tLocId join-->
                            '<td>'+TheTable[k].delDrop+'</td>'+ //<!--delDrop can be null-->
                            '<td>'+DeliveryStatusMask+'</td>'+ //<!--delStatus mask-->
                            '<td id="VID'+i+'">'+Vehicle+'</td>'+ //<!--vhcId mask, can be null-->
                            '<td class="hide">'+TheTable[k].donorId+'</td>'+
                            '<td class="hide">'+TheTable[k].delStatus+'</td>'+
                            '<td class="hide">'+TheTable[k].imageUrl+'</td>'+
                            '<td class="hide">'+TheTable[k].itemCategory+'</td>'+
                            '<td class="hide">'+TheTable[k].itemQty+'</td>'+
                            '<td class="hide">'+TheTable[k].itemStatus+'</td>'+
                            '<td class="hide">'+TheTable[k].itemSubCategory+'</td>'+
                            '<td class="hide">'+TheTable[k].itemUnit+'</td>'+
                            '<td class="hide">'+TheTable[k].srcLat+'</td>'+
                            '<td class="hide">'+TheTable[k].srcLng+'</td>'+
                            '<td class="hide">'+TheTable[k].tLocId+'</td>'+
							'<td class="hide">'+TheTable[k].vhcId+'</td>'+
							'<td class="hide">'+k+'</td></tr>';
					}
				}else{
					objID.innerHTML='<tr><td colspan="12" style="padding-left:400px;">There are no records to show.</td></td>';
					IsEmpty=true;
				}
			},function(){ IsError=true;});

			setTimeout(function(){ //masks the donorId with the donor's first and last name
				if(!IsError){
					if(IsEmpty==false){
						var arrLocalUserID=[];arrLocalUserDetails=[];

						//this block fills the 2 arrays coming from tblUsers
						refFBDB=FBDB.ref('tblUsers');
						refFBDB.once('value',function(data){
							if(data.exists()){
								var TheTable=data.val();
								var TheRows=Object.keys(TheTable);

								arrLocalUserID=[];arrLocalUserDetails=[];

								for(var i=0;i<TheRows.length;i++){ //stores entire tblUsers key and its fname and lname
									var k=TheRows[i];

									arrLocalUserID.push(String(k));
									arrLocalUserDetails.push(String(TheTable[k].userFname+' '+TheTable[k].userLname));
								}

							}
						});

						//this block annexed the filling of donor data coming from tblDonors
						setTimeout(function(){
							refFBDB=FBDB.ref('tblDonors');
							refFBDB.once('value',function(data){
									
								if(data.exists()){
									var TheTable=data.val();
									var TheRows=Object.keys(TheTable);

									//arrLocalUserID=[];arrLocalUserDetails=[];

									for(var i=0;i<TheRows.length;i++){ //stores entire tblUsers key and its fname and lname
										var k=TheRows[i];

										arrLocalUserID.push(String(k));
										arrLocalUserDetails.push(String(TheTable[k].donorFname+' '+TheTable[k].donorLname));
									}
								}
							});
						},300);

						setTimeout(function(){ //renames the donorId per row
							for(var i=0;i<arrDonorID.length;i++){
								var IndexOfResult=arrLocalUserID.indexOf(arrDonorID[i]); //alert(IndexOfResult);
								var LocalUserDetailsResult=arrLocalUserDetails[IndexOfResult];
								
								objID.rows[i].cells[0].innerHTML=LocalUserDetailsResult;
							}
						},1000);
					}
				}
			},1000);

			//breathing time for firebase to fillup the arrays
			setTimeout(function(){

				//converts vehicle IDs into human readable format
				if(!IsError){
					if(IsEmpty==false){
						var arrRetrieveVID=[];arrRetrieveVIDDesc=[];

						refFBDB=FBDB.ref('tblVehicle'); //.orderByChild('vhcId').equalTo('');
						refFBDB.once('value',function(data){
							if(data.exists()){
								var TheTable=data.val();
								var TheRows=Object.keys(TheTable);

								for(var i=0;i<TheRows.length;i++){
									var k=TheRows[i];

									arrRetrieveVID.push(String(k));
									var VIDDesc=String(TheTable[k].vhcPnum+' | '+TheTable[k].vhcColor+' '+TheTable[k].vhcMake+' '+TheTable[k].vhcModel+', '+TheTable[k].vhcType);
									arrRetrieveVIDDesc.push(VIDDesc);
								}
							}//else{ document.getElementById('VID'+VehicleIDRow).innerHTML='data not found';}
						},function(error){});

						//breathing time for firebase to fillup the arrays
						setTimeout(function(){

							//matching the fetched data
							for(var i=0;i<arrVehicleID.length;i++){
								var IndexOfResult=arrRetrieveVID.indexOf(arrVehicleID[i]);

								if(IndexOfResult>-1){
									document.getElementById('VID'+arrVehicleIDRow[i]).innerHTML=arrRetrieveVIDDesc[IndexOfResult];
								}
							}
						},1000);
					}
				}

				//converts target location IDs into human readable format
				if(!IsError){
					if(IsEmpty==false){
						var arrRetrieveTLocID=[];arrRetrieveTLocNameAdd=[];

						refFBDB=FBDB.ref('tblTargetLoc');
						refFBDB.once('value',function(data){
							if(data.exists()){
								var TheTable=data.val();
								var TheRows=Object.keys(TheTable);

								for(var i=0;i<TheRows.length;i++){
									var k=TheRows[i];
									arrRetrieveTLocID.push(String(k));
									arrRetrieveTLocNameAdd.push(String(TheTable[k].tLocName+' | '+TheTable[k].tLocAddress));

								}
							}//else{ document.getElementById('TLOC'+TargetLocRow).innerHTML='data not found';}
						},function(error){});

						//breathing time for firebase to fillup the arrays
						setTimeout(function(){

							//matching the fetched data
							for(var i=0;i<arrTargetLoc.length;i++){
								var IndexOfResult=arrRetrieveTLocID.indexOf(arrTargetLoc[i]);
								if(IndexOfResult>-1){
									document.getElementById('TLOC'+arrTargetLocRow[i]).innerHTML=arrRetrieveTLocNameAdd[IndexOfResult];
								}
							}
						},1000);
					}
				}
			},1000);

		}else if(Action==1){ //searches for delPick 
			refFBDB=FBDB.ref('tblDonatedItems').child(Filter);
			refFBDB.once('value',function(data){

			var DataVal=data.val();
			objID=DataVal.delPick;});

		}else if(Action==2){ //2 - checks if a donated item's details are still modifyable. if delStatus is 'on going', details modification is no longer allowed
			refFBDB=FBDB.ref('tblLogVeCoordinates').orderByChild('logId').equalTo(Filter).limitToFirst(1);
			refFBDB.once('value',function(data){
				if(data.exists()){
					var TheTable=data.val();
					var TheRow=Object.keys(TheTable);
					var VIDTimestamp=TheTable[TheRow[0]].logTimestamp;

					if(VIDTimestamp>=DateTimeNow()){//ex: '2018-08-21 12:18:37'>='2018-08-21 12:18' = true
						objID.innerHTML=1; //no longer editable
					}else{ objID.innerHTML=0;} //delivery record is editable
				}else{ objID.innerHTML=1;}
			},function(error){
				objID.innerHTML=1;
			})
		}else if(Action==3){
			refFBDB=FBDB.ref('tblDonatedItems').child(Filter);
			refFBDB.once('value',function(data){
				if(data.val()){ //exists()){
					var TheTable=data.val();
					//var TheRow=Object.keys(TheTable);
					//0 - pick up, delivery on going/ not yet delivered
					//1 - drop off, delivered
					//2 - cancelled
					//3 - on going
					//4 - nothing found
					objID.innerHTML=TheTable.delStatus;
				}else{ objID.innerHTML=4;}
			},function(error){ objID.innerHTML=4;});
			
		}else if(Action==4){ //list of barangay vehicles in dropdown box on step3
			refFBDB=FBDB.ref('tblVehicle');
			refFBDB.once('value',function(data){
				if(data.exists()){
					var TheTable=data.val();
					var TheRows=Object.keys(TheTable);

					for(var i=0;i<TheRows.length;i++){
						var k=TheRows[i];
						var SvcStat=TheTable[k].vhcState;

						if(SvcStat==0){ // 0 - active in service
							var VEHICLE=TheTable[k].vhcColor +' '+TheTable[k].vhcMake +' '+TheTable[k].vhcModel+', '+TheTable[k].vhcType;
							objID.innerHTML+='<option value="'+k+'">'+TheTable[k].vhcPnum+' | '+VEHICLE+'</option>';
						}
					}
				}else{ objID.innerHTML='<option>No listed vehicle</option>';}
			},function(error){
				objID.innerHTML='<option>'+error+'</option>';
			});

		}else if(Action==5){ //list of target locations/ evacuation centres in dropdown box on step4
			refFBDB=FBDB.ref('tblTargetLoc'); 
			refFBDB.once('value',function(data){
				if(data.exists()){
					var TheTable=data.val();
					var TheRows=Object.keys(TheTable);

					for(var i=0;i<TheRows.length;i++){
						var k=TheRows[i];
						var IsPartner=TheTable[k].tLocIsPartner;

						if(IsPartner==0){ // 0 - a partner
							objID.innerHTML+='<option value='+k+'>'+TheTable[k].tLocName+' | '+TheTable[k].tLocAddress+'</option>';
							//Step4TLocCoords.innerHTML+='<tr><td>'+TheTable[k].tLocLat+','+TheTable[k].tLocLng+'</td></tr>';
							Step4TLocCoords.innerHTML+='<tr id='+k+'><td>'+TheTable[k].tLocLat+','+TheTable[k].tLocLng+'</td></tr>';
							Step4TLocNameAdd.innerHTML+='<tr id=NA'+k+'><td>'+TheTable[k].tLocName+'|'+TheTable[k].tLocAddress+'</td></tr>';

							//slcTLoc2.innerHTML+='<option value='+k+'>'+TheTable[k].tLocName+' | '+TheTable[k].tLocAddress+'</option>';
						}
					}
				}else{ objID.innerHTML='<option>No listed target location / evacuation centre</option>';}
			},function(error){
				objID.innerHTML='<option>'+error+'</option>';
			});
		}else if(Action==6){ //display delivery events
			var arrStep31TLocID=[];
			var arrStep31TableColumn=[];
			var arrStep31TableRow=[];
			var DeliveryEventCounter=0;
			//var RowCount=Step31TBody.getElementsByTagName('tr').length;
			var TheRow=Step31TBody.getElementsByTagName('tr');

			Step31TableReset();
			Step31TBody2.innerHTML='';

			refFBDB=FBDB.ref('tblDonatedItems').orderByChild('delPick').startAt(Filter).endAt(Filter+'\uf8ff');
			refFBDB.once('value',function(data){ //alert(data.exists());
				
				if(data.exists()){
					var TheTable=data.val();
					var TheRows=Object.keys(TheTable);

//alert(TheRow.length);
					//Step31TableReset();

					for(var i=0;i<TheRows.length;i++){
						var k=TheRows[i];

						if(TheTable[k].itemStatus==0){//if donated item is subject for delivery 

							if(TheTable[k].vhcId==idSlcVID.value){//Step31HoldSlcVIDValue.value){ //if vehicle matched

								if(TheTable[k].delDrop!=''){ //for-delivery items coming from mobile doesn't have dropoff date/time. what we need to query/have are those for-delivery items that already has a delDrop and vhcId
									//alert(k);
									DeliveryEventCounter=DeliveryEventCounter+1;
									Step31THeadRow1.colSpan=DeliveryEventCounter+1;//alert('DeliveryEventCounter: '+DeliveryEventCounter);

									Step31THeadRow2.innerHTML+='<th id="Step31THR'+DeliveryEventCounter+'">Delivery Event '+DeliveryEventCounter+'</th>';
									var GetPickTime=SplitStr(String(TheTable[k].delPick),' ')[1].replace(':','');//alert('GetPickTime: '+GetPickTime);
									var GetDropTime=SplitStr(String(TheTable[k].delDrop),' ')[1].replace(':','');//alert('GetDropTime: '+GetDropTime)
									var RowPick,RowDrop;

									//pre populating the new column so there'll be an address(rows[].cells[])
									PopulateTheNewColumn(TheRow);//alert('TheRow: '+TheRow);

									RowPick=DisplayRowPick(GetPickTime,DeliveryEventCounter,TheTable[k].srcLoc);//alert('RowPick: '+RowPick);
									RowDrop=DisplayRowDrop(GetDropTime,DeliveryEventCounter,TheTable[k].tLocId);//alert('RowDrop: '+RowDrop);

									//row index - column index + target location id
									//arrStep31TLocID.push(RowDrop+'-'+DeliveryEventCounter+'+'+TheTable[k].tLocId);
									arrStep31TLocID.push(String(TheTable[k].tLocId));
									arrStep31TableColumn.push(DeliveryEventCounter);
									arrStep31TableRow.push(RowDrop);

									if(txtAction.value==0){
										EventHighlighter(RowPick,RowDrop,DeliveryEventCounter,0);
										//alert('Action HL: '+txtAction.value);
									}else if(txtAction.value==1){

										if(k==txtStep1ModifyKey.value){
											EventHighlighter(RowPick,RowDrop,DeliveryEventCounter,1);

											//CheckForCollision(ATBMPickRow,ATBMDropRow,DeliveryEventCounter);
											//alert('Key== Action HL: '+txtAction.value);
										}else{
											EventHighlighter(RowPick,RowDrop,DeliveryEventCounter,0);
											//alert('Key!= Action HL: '+txtAction.value);
										}
									}

									Step31TBody2.innerHTML+='<tr><td>'+TheTable[k].srcLoc+'</td>'+
									'<td>'+TheTable[k].tLocId+'</td>'+
									'<td>'+TheTable[k].delPick+'</td>'+
									'<td>'+TheTable[k].delDrop+'</td></tr>';
								}
							}
						}
					}

					//if(idTPick.value!='' && idTDrop.value!='' && idTxtSourceLoc.value!='' && txtAction.value==0){
					if(Step2SlcTPick.value!='' && Step2SlcTDrop.value!='' && idTxtSourceLoc.value!='' && txtAction.value==0){
						//display the about-to-be-made delivery event in the table
						Step31THeadRow1.colSpan=DeliveryEventCounter+2;
						Step31THeadRow2.innerHTML+='<th id="Step31THR'+(DeliveryEventCounter+1)+'">Delivery Event (new)</th>';
						PopulateTheNewColumn(TheRow);
						//var ATBMPickRow=DisplayRowPick(String(idTPick.value).replace(':',''),DeliveryEventCounter+1,idTxtSourceLoc.value);
						//var ATBMDropRow=DisplayRowDrop(String(idTDrop.value).replace(':',''),DeliveryEventCounter+1,'No chosen target location yet.');
						var ATBMPickRow=DisplayRowPick(String(Step2SlcTPick.value).replace(':',''),DeliveryEventCounter+1,idTxtSourceLoc.value);
						var ATBMDropRow=DisplayRowDrop(String(Step2SlcTDrop.value).replace(':',''),DeliveryEventCounter+1,'No chosen target location yet.');
						EventHighlighter(ATBMPickRow,ATBMDropRow,DeliveryEventCounter+1,1);

						Step31TBody2.innerHTML+='<tr style="background-color:#74d2ed;"><td>'+idTxtSourceLoc.value+'</td>'+
							'<td>No chosen target location yet</td>'+
							'<td>'+idDPick.value+' '+Step2SlcTPick.value+'</td>'+
							'<td>'+idDDrop.value+' '+Step2SlcTDrop.value+'</td></tr>';

						//check for collision with existing delivery event(s) if there's any
						//alert(ATBMPickRow+'\n'); //+ATBMDropRow+'\n'); //+DeliveryEventCounter);
						CheckForCollision(ATBMPickRow,ATBMDropRow,DeliveryEventCounter);
					}else if(Step2SlcTPick.value!='' && Step2SlcTDrop.value!='' && idTxtSourceLoc.value!='' && txtAction.value==1){

						var Step31TargetLoc='';
						if(idSlcTLoc.value!=''){
							Step31TargetLoc=idSlcTLoc.options[idSlcTLoc.selectedIndex].text;
						}else{ Step31TargetLoc='No chosen target location yet.';
					
							Step31TBody2.innerHTML+='<tr style="background-color:#74d2ed;"><td>'+idTxtSourceLoc.value+'</td>'+
							'<td>'+idSlcTLoc.value+'</td>'+
							'<td>'+idDPick.value+' '+Step2SlcTPick.value+'</td>'+
							'<td>'+idDDrop.value+' '+Step2SlcTDrop.value+'</td></tr>';
						}

						//check for collision with existing delivery event(s) if there's any
						var GetCurrentDTPick=String(idDPick.value+' '+Step2SlcTPick.value);
						var GetCurrentDTDrop=String(idDDrop.value+' '+Step2SlcTDrop.value);
//alert('GetCurrentDTPick: '+GetCurrentDTPick+'\nStep31DTPickRetainer: '+Step31DTPickRetainer.value+'\nGetCurrentDTDrop: '+GetCurrentDTDrop+'\nStep31DTDropRetainer: '+Step31DTDropRetainer.value);
						if(GetCurrentDTPick!=Step31DTPickRetainer.value || GetCurrentDTDrop!=Step31DTDropRetainer.value){
							//display the about-to-be-made delivery event in the table
							Step31THeadRow1.colSpan=DeliveryEventCounter+2;
							Step31THeadRow2.innerHTML+='<th id="Step31THR'+(DeliveryEventCounter+1)+'">Delivery Event (selected)</th>';
							PopulateTheNewColumn(TheRow);
							//var ATBMPickRow=DisplayRowPick(String(idTPick.value).replace(':',''),DeliveryEventCounter+1,idTxtSourceLoc.value);
							//var ATBMDropRow=DisplayRowDrop(String(idTDrop.value).replace(':',''),DeliveryEventCounter+1,'No chosen target location yet.');

							var ATBMPickRow=DisplayRowPick(String(Step2SlcTPick.value).replace(':',''),DeliveryEventCounter+1,idTxtSourceLoc.value);
							var ATBMDropRow=DisplayRowDrop(String(Step2SlcTDrop.value).replace(':',''),DeliveryEventCounter+1,Step31TargetLoc);
							EventHighlighter(ATBMPickRow,ATBMDropRow,DeliveryEventCounter+1,1);

							CheckForCollision(ATBMPickRow,ATBMDropRow,DeliveryEventCounter);
						}
					}

				}else{ //if no existing delivery event found
					if(txtAction.value==0){
						if(ValidateStep2(1)==true){
							//display the about-to-be-made delivery event in the table
							DeliveryEventCounter=DeliveryEventCounter+1;//alert(DeliveryEventCounter);

							Step31THeadRow1.colSpan=DeliveryEventCounter+1;
							Step31THeadRow2.innerHTML+='<th id="Step31THR'+(DeliveryEventCounter)+'">Delivery Event (new)</th>';
							PopulateTheNewColumn(TheRow);

							Step31TBody2.innerHTML+='<tr style="background-color:#74d2ed;"><td>'+idTxtSourceLoc.value+'</td>'+
							'<td>No chosen target location yet</td>'+
							'<td>'+idDPick.value+' '+Step2SlcTPick.value+'</td>'+
							'<td>'+idDDrop.value+' '+Step2SlcTDrop.value+'</td></tr>';
							
							//var ATBMPickRow=DisplayRowPick(String(idTPick.value).replace(':',''),DeliveryEventCounter,idTxtSourceLoc.value);
							//var ATBMDropRow=DisplayRowDrop(String(idTDrop.value).replace(':',''),DeliveryEventCounter,'No chosen target location yet.');
							var ATBMPickRow=DisplayRowPick(String(Step2SlcTPick.value).replace(':',''),DeliveryEventCounter,idTxtSourceLoc.value);
							var ATBMDropRow=DisplayRowDrop(String(Step2SlcTDrop.value).replace(':',''),DeliveryEventCounter,'No chosen target location yet.');
							EventHighlighter(ATBMPickRow,ATBMDropRow,DeliveryEventCounter,1);
	
							//no need to check for collision since there are no existing delivery event(s) found
							Step31CheckForCollisionValue.value=0;
						}
					}else if(txtAction.value==1){
						//alert('No delivery event found on given pickup date.');
						Step31TableReset();
						Step31TBody2.innerHTML+='<tr>'+
							'<td colspan="4" style="text-align:center;">No delivery event found on given pickup date.</td></tr>';
					}

				}
			},function(error){
				//no handle
			});

			DeliveryEventCounter=0;

			
			/* function CheckForRowOverlap(RowStart,RowEnd,TheColumn){
				//var HitFirstChance;
				var arrOverlapResult=[];

				for(var i=RowEnd;i>=RowStart;i--){
					txAreaTest.value+=Step31TBody.rows[i].cells[TheColumn].style.backgroundColor+'\n';
					if(Step31TBody.rows[i].cells[TheColumn].style.backgroundColor!=''){
						//Step31CheckForRowOverlapValue.value=true;
						//arrOverlapResult.push(0); //0 - no background color
					//}else{
						//Step31CheckForRowOverlapValue.value=false;
						arrOverlapResult.push(1); //1 - has background color / hit!
						//alert('hit!');
					}
				}

				setTimeout(function(){
					if(arrOverlapResult.length>0){
						Step31CheckForRowOverlapValue.value=true;
					}else{
						Step31CheckForRowOverlapValue.value=false;
					}
//alert(HitFirstChance);
					//Step31CheckForRowOverlapValue.value='';
					arrOverlapResult=[];
				},100); */

				

				/* for(var i=RowEnd;i>=RowStart;i--){
					var cBox=Step31TBody.rows[i].cells[0].getElementsByTagName('input'); //alert(cBox);

					if(cBox[0].type=='checkbox'){
						if(cBox[0].checked==true){ break; //alert('checked');
							//return HitFirstChance=true;

							//if(HitFirstChance==true){
							//	break;
							//}
							
						}
					}
				} */

				//return HitFirstChance=true;
				//return HitFirstChance;
			//}
			function CheckForCollision(RowStart,RowEnd,MaxCol){
				var HitFirstChance=false;

				for(var ii=RowEnd;ii>=RowStart;ii--){
					for(var i=MaxCol;i>=0;i--){
						var TheBGColor=Step31TBody.rows[ii].cells[i].style.backgroundColor;

						if(TheBGColor!=''){
							HitFirstChance=true;
							Step31CheckForCollisionValue.value=1; //this input will be used in ValidateStep31()
							Step31TBody.rows[ii].style.backgroundColor='#fffd96';
							Step31TBody.rows[ii].style.opacity='0.4';
							//span1.innerHTML+='hit on row '+ii+', column '+i+'<br />';
							//tbl1.rows[ii].style.backgroundColor='#fffd96';
							//tbl1.rows[ii].style.opacity='0.7';
						}/* else{
							Step31CheckForCollisionValue.value=0; //no event collision
							//span1.innerHTML+='clean on row '+ii+', column '+i+'<br />';
						} */
					}
				}

				if(HitFirstChance==false){
					Step31CheckForCollisionValue.value=0;
				}
			}
			function PopulateTheNewColumn(TheRow){
				//pre populating the new column so there'll be an address(rows[].cells[])
				var j;
				for(j=0;j<TheRow.length;j++){
					TheRow[j].innerHTML+='<td></td>';
				}j=0;
			}
			function DisplayRowDrop(GetDropTime,DeliveryEventCounter,TLocID){
				var RowDrop;
				
				if(GetDropTime=='0000'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[0].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=0;
				}else if(GetDropTime=='0100'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[1].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=1;
				}else if(GetDropTime=='0200'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[2].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=2;
				}else if(GetDropTime=='0300'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[3].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=3;
				}else if(GetDropTime=='0400'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[4].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=4;
				}else if(GetDropTime=='0500'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[5].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=5;
				}else if(GetDropTime=='0600'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[6].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=6;
				}else if(GetDropTime=='0700'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[7].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=7;
				}else if(GetDropTime=='0800'){//alert(TheTable[k].srcLoc+', @Column '+DeliveryEventCounter);
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[8].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=8;
				}else if(GetDropTime=='0900'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[9].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=9;
				}else if(GetDropTime=='1000'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[10].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=10;
				}else if(GetDropTime=='1100'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[11].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=11;
				}else if(GetDropTime=='1200'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[12].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=12;
				}else if(GetDropTime=='1300'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[13].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=13;
				}else if(GetDropTime=='1400'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[14].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=14;
				}else if(GetDropTime=='1500'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[15].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=15;
				}else if(GetDropTime=='1600'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[16].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=16;
				}else if(GetDropTime=='1700'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[17].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=17;
				}else if(GetDropTime=='1800'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[18].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=18;
				}else if(GetDropTime=='1900'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[19].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=19;
				}else if(GetDropTime=='2000'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[20].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=20;
				}else if(GetDropTime=='2100'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[21].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=21;
				}else if(GetDropTime=='2200'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[22].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=22;
				}else if(GetDropTime=='2300'){
					if(DeliveryEventCounter!='' && TLocID!=''){
						Step31TBody.rows[23].cells[DeliveryEventCounter].innerHTML='<td>Dropoff location: '+TLocID+'</td>';
					}
					return RowDrop=23;
				}
			}
			function DisplayRowPick(GetPickTime,DeliveryEventCounter,srcLoc){//alert(GetPickTime+', '+DeliveryEventCounter+', '+srcLoc);
				var RowPick; //srcLoc

				if(GetPickTime=='0000'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[0].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=0;
				}else if(GetPickTime=='0100'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[1].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=1;
				}else if(GetPickTime=='0200'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[2].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=2;
				}else if(GetPickTime=='0300'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[3].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=3;
				}else if(GetPickTime=='0400'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[4].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=4;
				}else if(GetPickTime=='0500'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[5].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=5;
				}else if(GetPickTime=='0600'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[6].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=6;
				}else if(GetPickTime=='0700'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[7].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=7;
				}else if(GetPickTime=='0800'){//alert(TheTable[k].srcLoc+', @Column '+DeliveryEventCounter);
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[8].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=8;
				}else if(GetPickTime=='0900'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[9].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=9;
				}else if(GetPickTime=='1000'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[10].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=10;
				}else if(GetPickTime=='1100'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[11].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=11;
				}else if(GetPickTime=='1200'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[12].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=12;
				}else if(GetPickTime=='1300'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[13].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=13;
				}else if(GetPickTime=='1400'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[14].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=14;
				}else if(GetPickTime=='1500'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[15].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=15;
				}else if(GetPickTime=='1600'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[16].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=16;
				}else if(GetPickTime=='1700'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[17].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=17;
				}else if(GetPickTime=='1800'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[18].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=18;
				}else if(GetPickTime=='1900'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[19].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=19;
				}else if(GetPickTime=='2000'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[20].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=20;
				}else if(GetPickTime=='2100'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[21].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=21;
				}else if(GetPickTime=='2200'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[22].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=22;
				}else if(GetPickTime=='2300'){
					if(DeliveryEventCounter!='' && srcLoc!=''){
						Step31TBody.rows[23].cells[DeliveryEventCounter].innerHTML='<td>Pickup location: '+srcLoc+'</td>';
					}
					return RowPick=23;
				}
			}
			function EventHighlighter(RowPick,RowDrop,DeliveryEventCounter,WhichColor){//alert('RowPick: '+RowPick+'\nRowDrop: '+RowDrop+'\nCol: '+DeliveryEventCounter);
				var HLColor;
				if(WhichColor==0){ //the data comes from database so, the color is common.
					HLColor='#00557d';
				}else if(WhichColor==1){ //the data is about to be created so, the color is unique.
					HLColor='#0093bc';//007da0';
					document.getElementById('Step31THR'+DeliveryEventCounter).style.backgroundColor=HLColor;
					document.getElementById('Step31THR'+DeliveryEventCounter).style.opacity='0.7';
				}
//alert('pick: '+RowPick+'\ndrop: '+RowDrop+'\ncol: '+DeliveryEventCounter+'\ncolor: '+WhichColor);
				for (var i=RowDrop;i>=RowPick;i--){
					Step31TBody.rows[i].cells[DeliveryEventCounter].style.backgroundColor=HLColor;
					Step31TBody.rows[i].cells[DeliveryEventCounter].style.opacity='0.7';
					Step31TBody.rows[i].cells[DeliveryEventCounter].style.color='#fff';
					/* var cBox=Step31TBody.rows[i].cells[0].getElementsByTagName('input');
					if(cBox[0].type=='checkbox'){
						var CheckState=cBox[0].checked; //alert(CheckState);
						if(CheckState==false){
							cBox[0].checked=true; //alert('checked!');
						}else{ alert('should not check');}
					} */ //alert(Step31TBody.rows[i].cells[DeliveryEventCounter]);
				} //alert(HLColor);


				
				/* var i;//alert(RowDrop);
				for(i=0;i<=RowDrop;i++){
					Step31TBody.rows[RowPick+i].cells[DeliveryEventCounter].style.backgroundColor='#007da0';
					Step31TBody.rows[RowPick+i].cells[DeliveryEventCounter].style.opacity='0.7';
					Step31TBody.rows[RowPick+i].cells[DeliveryEventCounter].style.color='#fff';
				}i=0; */
			}

			//fill the Dropoff location <td>s from IDs into human readable format
			if(arrStep31TLocID!=null){ //alert(arrStep31TLocID!=null);
				var arrRetrieveTLocID=[];
				var arrRetrieveTLocNameAdd=[];

				refFBDB=FBDB.ref('tblTargetLoc'); //.child(String(arrStep31TLocID[i]));
				refFBDB.once('value',function(data){
					var TheTable=data.val();
					var TheRows=Object.keys(TheTable);

					for(var i=0;i<TheRows.length;i++){
						var k=TheRows[i];

						arrRetrieveTLocID.push(k);
						arrRetrieveTLocNameAdd.push(TheTable[k].tLocName+' | '+TheTable[k].tLocAddress);
					}
				},function(error){});

				setTimeout(function(){
					for(var i=0;i<arrStep31TLocID.length;i++){//alert('went in!');
						var IndexResult=arrRetrieveTLocID.indexOf(arrStep31TLocID[i]);
						//alert('LocID: '+arrStep31TLocID+'\nIndexResult: '+IndexResult+'\nRow: '+arrStep31TableRow[i]+'\nColumn: '+arrStep31TableColumn[i]+'\nName | Add: '+arrRetrieveTLocNameAdd[IndexResult]);
						if(IndexResult>-1){
							Step31TBody2.rows[i].cells[1].innerHTML=arrRetrieveTLocNameAdd[IndexResult];
						}
					}
					/* for(var i=0;i<arrStep31TLocID.length;i++){//alert('went in!');
						var IndexResult=arrRetrieveTLocID.indexOf(arrStep31TLocID[i]);
						//alert('LocID: '+arrStep31TLocID+'\nIndexResult: '+IndexResult+'\nRow: '+arrStep31TableRow[i]+'\nColumn: '+arrStep31TableColumn[i]+'\nName | Add: '+arrRetrieveTLocNameAdd[IndexResult]);
						if(IndexResult>-1){
							Step31TBody.rows[arrStep31TableRow[i]].cells[arrStep31TableColumn[i]].innerHTML='<td>Dropoff location: '+arrRetrieveTLocNameAdd[IndexResult]+'</td>';
						}
					} */
				},1500);//alert('firebase join passed.');
			}

		}else if(Action==7){ //retrieves user/donor ID
			var TheEMail=SplitStr(Filter,'+')[0];
			var ThePassword=SplitStr(Filter,'+')[1];

			refFBDB=FBDB.ref('tblUsers').orderByChild('userEmail').equalTo(TheEMail);
			refFBDB.once('value',function(data){ //alert('Data exists: '+data.exists());
				if(data.exists()){
					var TheTable=data.val();
					var TheRow=Object.keys(TheTable);

					if(TheTable[TheRow[0]].userPass==ThePassword){
						objID.value=TheTable[TheRow[0]].donorId;
						//return true;
					}else{ objID.value='';} //return false;}

				}else{ objID.value='';} //return false;}

			},function(error){ objID.value='';}); //return false;});
		}else if(Action==8){
            var arrNotifDonorID=[];arrNotifKey=[];

            refFBDB=FBDB.ref('tblDonatedItemsNotif');
            refFBDB.once('value',function(data){
                if(data.exists()){
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    for(var i=0;i<TheRows.length;i++){
                        var k=TheRows[i];

                        if(TheTable[k].notifDone==0){
                            arrNotifDonorID.push(TheTable[k].donorId);
                            arrNotifKey.push(k);
                        }
                    }
                }else{ objID.innerHTML='<tr><td colspan="12" style="text-align:center;font-weight:bold;">There are no records to show</td></tr>';}
            },function(error){
                objID.innerHTML='<tr><td colspan="12" style="text-align:center;">'+error+'</td></tr>';
            });
        }else if(Action==9){ //SearchFirebase(txtStep1DIStrDate.value,9,tBodyStep1DIItemList);
			refFBDB=FBDB.ref('tblDonatedItems').orderByChild('itemPledgeDate').startAt(Filter).endAt(Filter+'\uf8ff');
			refFBDB.once('value',function(data){
				if(data.exists()){
					var TheTable=data.val();
					var TheRows=Object.keys(TheTable);

					objID.innerHTML='';

					for(var i=0;i<TheRows.length;i++){
						var k=TheRows[i];

						if(TheTable[k].itemStatus==0||TheTable[k].itemStatus=='0'){ // itemStatus 0 - to be delivered by the barangay
//alert(TheTable[k].delStatus);
							if(TheTable[k].delStatus==0||TheTable[k].delStatus=="0"||TheTable[k].delStatus==``||TheTable[k].delStatus==""||TheTable[k].delStatus==null){ //only the delivery management module can assign a delivery status to any records that doesn't have one.
								objID.innerHTML+='<tr onclick="rowSelect(this,null);" style="cursor:pointer;"><td>'+k+
								'</td><td>'+TheTable[k].itemDescription+
								'</td><td>'+TheTable[k].itemCategory+'/'+TheTable[k].itemSubCategory+', '+TheTable[k].itemQty+' '+
								TheTable[k].itemUnit+'</td>'+
								'<td class="hide">'+TheTable[k].donorId+'</td>'+
								'<td class="hide">'+TheTable[k].imageUrl+'</td>'+
								'<td class="hide">'+TheTable[k].itemCategory+'</td>'+
								'<td class="hide">'+TheTable[k].itemDescription+'</td>'+
								'<td class="hide">'+TheTable[k].itemPledgeDate+'</td>'+
								'<td class="hide">'+TheTable[k].itemQty+'</td>'+
								'<td class="hide">'+TheTable[k].itemStatus+'</td>'+
								'<td class="hide">'+TheTable[k].itemSubCategory+'</td>'+
								'<td class="hide">'+TheTable[k].itemUnit+'</td></tr>';
							}/* else if(TheTable[k].delStatus==1||TheTable[k].delStatus==2||TheTable[k].delStatus==3){
								objID.innerHTML='<tr><td colspan="3" style="text-align:center;font-weight:bold">No donated item is set for delivery on the given date.</td></tr>';
							} */
						}/* else{
							objID.innerHTML='<tr><td colspan="3" style="text-align:center;font-weight:bold">No donated item is set for delivery on the given date.</td></tr>';
						} */
					}
				}else{
					objID.innerHTML='<tr><td colspan="3" style="text-align:center;font-weight:bold">No donated item is set for delivery on the given date.</td></tr>';
				}
			},function(error){
				objID.innerHTML='<tr><td colspan="3" style="text-align:center;">'+error+'</td></tr>';
			});
		}
    }

	function Step31TableReset(){
		Step31THeadRow1.colSpan='0';

		Step31THeadRow2.innerHTML='';
		Step31THeadRow2.innerHTML='<th style="width:50px;">Time</th>';

		Step31TBody.innerHTML='';
		Step31TBody.innerHTML=/* '<tr id="Step310800"><td><input type="checkbox" id="chkStep310800" />08:00</td></tr>'+
		'<tr id="Step310830"><td><input type="checkbox" id="chkStep310830" />08:30</td></tr>'+
		'<tr id="Step310900"><td><input type="checkbox" id="chkStep310900" />09:00</td></tr>'+
		'<tr id="Step310930"><td><input type="checkbox" id="chkStep310930" />09:30</td></tr>'+
		'<tr id="Step311000"><td><input type="checkbox" id="chkStep311000" />10:00</td></tr>'+
		'<tr id="Step311030"><td><input type="checkbox" id="chkStep311030" />10:30</td></tr>'+
		'<tr id="Step311100"><td><input type="checkbox" id="chkStep311100" />11:00</td></tr>'+
		'<tr id="Step311130"><td><input type="checkbox" id="chkStep311130" />11:30</td></tr>'+
		'<tr id="Step311200"><td><input type="checkbox" id="chkStep311200" />12:00</td></tr>'+
		'<tr id="Step311230"><td><input type="checkbox" id="chkStep311230" />12:30</td></tr>'+
		'<tr id="Step311300"><td><input type="checkbox" id="chkStep311300" />13:00</td></tr>'+
		'<tr id="Step311330"><td><input type="checkbox" id="chkStep311330" />13:30</td></tr>'+
		'<tr id="Step311400"><td><input type="checkbox" id="chkStep311400" />14:00</td></tr>'+
		'<tr id="Step311430"><td><input type="checkbox" id="chkStep311430" />14:30</td></tr>'+
		'<tr id="Step311500"><td><input type="checkbox" id="chkStep311500" />15:00</td></tr>'+
		'<tr id="Step311530"><td><input type="checkbox" id="chkStep311530" />15:30</td></tr>'+
		'<tr id="Step311600"><td><input type="checkbox" id="chkStep311600" />16:00</td></tr>'+
		'<tr id="Step311630"><td><input type="checkbox" id="chkStep311630" />16:30</td></tr>'+
		'<tr id="Step311700"><td><input type="checkbox" id="chkStep311700" />17:00</td></tr>'; */
		
		'<tr id="Step310800"><td>08:00</td></tr>'+
		'<tr id="Step310830"><td>08:30</td></tr>'+
		'<tr id="Step310900"><td>09:00</td></tr>'+
		'<tr id="Step310930"><td>09:30</td></tr>'+
		'<tr id="Step311000"><td>10:00</td></tr>'+
		'<tr id="Step311030"><td>10:30</td></tr>'+
		'<tr id="Step311100"><td>11:00</td></tr>'+
		'<tr id="Step311130"><td>11:30</td></tr>'+
		'<tr id="Step311200"><td>12:00</td></tr>'+
		'<tr id="Step311230"><td>12:30</td></tr>'+
		'<tr id="Step311300"><td>13:00</td></tr>'+
		'<tr id="Step311330"><td>13:30</td></tr>'+
		'<tr id="Step311400"><td>14:00</td></tr>'+
		'<tr id="Step311430"><td>14:30</td></tr>'+
		'<tr id="Step311500"><td>15:00</td></tr>'+
		'<tr id="Step311530"><td>15:30</td></tr>'+
		'<tr id="Step311600"><td>16:00</td></tr>'+
		'<tr id="Step311630"><td>16:30</td></tr>'+
		'<tr id="Step311700"><td>17:00</td></tr>';
	}
    function idSlcTLocSelectOpt(TLocID){
		if(TLocID!=''){
			var CoordRawString=document.getElementById(TLocID).innerHTML; //alert(CoordRawString);
			var CoordStr1=CoordRawString.replace('<td>','');
			var CoordStr2=CoordStr1.replace('</td>','');
			var Step4TLocLat=SplitStr(CoordStr2,',')[0]; //tLocLat
			var Step4TLocLng=SplitStr(CoordStr2,',')[1]; //tLocLng
			Step4TLocCoordinates={lat:parseFloat(Step4TLocLat),lng:parseFloat(Step4TLocLng)};
			//alert(Step4TLocCoordinates['lat']); //looking good!

			var CoordRawString=document.getElementById('NA'+TLocID).innerHTML;
			var CoordStr1=CoordRawString.replace('<td>','');
			var CoordStr2=CoordStr1.replace('</td>','');
			var Step4TLocName=SplitStr(CoordStr2,'|')[0]; //tLocLat
			var Step4TLocAdd=SplitStr(CoordStr2,'|')[1]; //tLocLng
			Step4TLocNA={Name:Step4TLocName,Add:Step4TLocAdd};
		}
    }
    
	function RecordFirebase(PSV,Action,objID){
		var FBDB=firebase.database();
		var refFBDB='';
		var valPSV=SplitStr(PSV,'+');
		var TheData={
			itemCategory:valPSV[0],
			itemSubCategory:valPSV[1],
			itemDescription:valPSV[2],
			itemUnit:valPSV[3],
			itemQty:valPSV[4],
			itemStatus:valPSV[5],
			delStatus:valPSV[6],
			itemPledgeDate:valPSV[7],
			donorId:valPSV[8],
			imageUrl:valPSV[9],
			delPick:valPSV[10],
			delDrop:valPSV[11],
			srcLoc:valPSV[12],
			srcLat:valPSV[13],
			srcLng:valPSV[14],
			vhcId:valPSV[15],
			tLocId:valPSV[16]
		};

		if(Action==0){ //creates a new delivery record
			refFBDB=FBDB.ref('tblDonatedItems').child(txtStep1DIItemID.value);
			refFBDB.update(TheData,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		}else if(Action==1){ //updates the details of a delivery record
			refFBDB=FBDB.ref('tblDonatedItems').child(vtxtDIUID);
			refFBDB.update(TheData,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		}else if(Action==2){ //drops the donated item. only DT Drop and Dlv Status need an update
			refFBDB=FBDB.ref('tblDonatedItems').child(vtxtDIUID);
			var Data={delDrop:valPSV[11],delStatus:valPSV[6]};
			refFBDB.update(Data,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		}else if(Action==3 || Action==4 || Action==5){ //the user cancels the delivery. only Dlv Status needs an update
			refFBDB=FBDB.ref('tblDonatedItems').child(vtxtDIUID);
			var Data={delStatus:valPSV[6]};
			refFBDB.update(Data,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		}/* else if(Action==4){ //the user changes the delivery status from 'pickup' to 'on going'. only Dlv Status needs an update
			refFBDB=FBDB.ref('tblDonatedItems').child(vtxtDIUID);
			var Data={delStatus:valPSV[6]};
			refFBDB.update(Data,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		} */
	}

	function ResultUISettings(Result){
		if (Result==1){
			divMsgWrapper.style.backgroundColor='#c1ffc6';
			CoreResultUISettings(0);
		}else if(Result==0){
			divMsgWrapper.style.backgroundColor='#ff7070';
			CoreResultUISettings(0);
		}else if(Result==2){
			divMsgWrapper.style.backgroundColor='#75b3ff';
			CoreResultUISettings(1);
		}
		
	}
	function CoreResultUISettings(Invert){
		if (Invert==0){
			divMsgWrapper.style.visibility='visible';
			tab4Done.style.visibility='visible';
			tab2Step4.style.visibility='hidden'; //nakakapunyeta, hindi itinago lahat!
			spanStep4CommitBtn.style.visibility='hidden'; //ayaw matago amputa !
			stepTabs.style.pointerEvents='none';
		}else if(Invert==1){
			divMsgWrapper.style.visibility='hidden';
			tab4Done.style.visibility='hidden';
			tab2Step4.style.visibility='visible';
			spanStep4CommitBtn.style.visibility='visible';
			stepTabs.style.pointerEvents='auto';
			//SlcDateSearch.click();
		}
	}
	function AfterResult(){ //initMap();
		CoreResultUISettings(1);

		if (txtAction.value==0){
			DoMainTab1(1);
			//CoreResultUISettings(1);
		}else if (txtAction.value==1){
			DoMainTab2(1);
			//CoreResultUISettings(1);
		}

		//initMap();
		arrMarkers=[]; pacMarkers=[]; arrTLocMarker=[]; //wala, di pa rin nabura :v
		DisposePoly();
	}

	function ResetStep1(){
		//document.getElementById('frmStep1').reset();
		frmStep1Temp.reset(); //REMOVE THIS
		frmStep1DISearch.reset();
		frmStep1ModifyFields.reset();
		tBodyItemList.innerHTML='';
		tBodyStep1DIItemList.innerHTML='';
		/* Step1DisplayItemSubCategory('',txtStep1ItemSubCategory); //REMOVE THIS
		Step1DisplayItemUnit('',txtStep1ItemUnit); */ //REMOVE THIS
		Step1DisplayItemSubCategory('',txtStep1ModifyItemSubCategory);
		Step1DisplayItemUnit('',txtStep1ModifyItemUnit);
		//idSlcDate.value=DateTimeNow(5);
		DonatedItemImage.src="img/present-3-512_2.png";
		VehicleImg.src="img/present-3-512_2.png"; //REMOVE THIS
		txtStep1ItemPledgeDate.value=DateTimeNow(8); //REMOVE THIS
		txtStep1DIItemID.value='';
		idTxtSelectedItem.value='';
		slcStep1DIDlvStat.value='';
	}
	function ResetStep2(){
		document.getElementById('idTxtValidateRetainer').value=0;
		LoadStep2(1);
	}
	function ResetStep3(){
		document.getElementById('frmStep3').reset();
		pacInput.value='';
		//bias/center the map to brgy nangka NOT DONE YET
	}
	function ResetStep31(){
		//alert('no code yet');
		//set the Step31THead to single column and set the Step31TBody to Time column only. also set the Step31PickupDate to null
		Step31PickupDate.value='';
		idSlcVID.value='';
		Step31HoldSlcVIDValue.value='';
		Step31TableReset();
	}
	function ResetStep4(){
		frmStep4.reset();
		slcTLoc2.value=''; //idSlcTLoc.value='';
		spanMsg.innerHTML='';
	}

	function Step31LookForDeliveryEvents(){
		//var Step31Date=SplitStr()
		if(Step31PickupDate.value!=''){
			Step31HoldSlcVIDValue.value=idSlcVID.value;
			SearchFirebase(Step31PickupDate.value,6,null);
		}else{ alert('Set a pickup date first before choosing a vehicle.');}
	}
    function SearchStep1(Action){
		if(Action==1){
			ResetStep1();
			//ResetStep2();
			document.getElementById('idDPick').value='';
			document.getElementById('idDDrop').value='';
			//document.getElementById('idTPick').value='';
			//document.getElementById('idTDrop').value='';
			Step2SlcTPick.value='';
			Step2SlcTDrop.value='';
			document.getElementById('idTxtValidateRetainer').value=0;
			LoadStep2(0);
			ResetStep3();
			var RetainTxtActionValue=txtAction.value;
			ResetStep4();
			txtAction.value=RetainTxtActionValue;

			if (idTxtStrDate.value!=''){
				SearchFirebase(idTxtStrDate.value,0,tBodyItemList); //alert(idTxtStrDate.value);
			}else{
				alert('Use the date picker first before clicking.');
			}
		}else if(Action==0){ //alert(txtStep1DIStrDate.value);
			if (txtStep1DIStrDate.value!=''){
				SearchFirebase(txtStep1DIStrDate.value,9,tBodyStep1DIItemList);
			}else{
				alert('Use the date picker first before clicking.');
			}
		}
    }

	function LoadStep1(){
		//slcStep1DIDate.value=DateTimeNow(6); //ayaw basahin yung value galing DateTimeNow() :v
		document.getElementById('idTxtValidateRetainer').value=0; //sets the Step2 validate checker ahead
		document.getElementById('idSlcDate').value=DateTimeNow(6);
		PlaceApos(DateTimeNow(6),idTxtStrDate);
		document.getElementById('lnkStep1').click();
	}
	function LoadStep2(IsSearch){
		//this if statement prevents loading a new value to the fields when the 'Step2 tab' is reloaded
		var IsValid=document.getElementById('idTxtValidateRetainer').value;
		if (txtAction.value==0){
			if(IsValid==0){ //not yet validated
				PopulateStep2DTFields();
			}
			/* var RetainDateTime=document.getElementById('idDPick').value+' '+document.getElementById('idTPick').value;
			document.getElementById('idTxtDateRetainer').value=RetainDateTime; */
			idTxtDateRetainer.value=idDPick.value+' '+Step2SlcTPick.value;
		}else if(txtAction.value==1){
			txtDateNowRetainer.value=DateTimeNow();
		}
		
		if (IsSearch==1){ //we need to have an if statement to prevent the loading of step2
			document.getElementById('lnkStep2').click();
		}
	}
	function LoadStep31(Invert){
		//idSlcVID.value='';
		Step31PickupDate.value=idDPick.value; //idTxtDateRetainer.value;
		/* if(Invert==0){
			map.style.display='block';
			divStep31VehicleDisplay.style.display='none';
		}else if(Invert==1){
			map.style.display='none';
			divStep31VehicleDisplay.style.display='block';
		} */
		
	}
	function PopulateStep2DTFields(){
		document.getElementById('idDPick').value=DateTimeNow(5);
		document.getElementById('idDDrop').value=DateTimeNow(5);
		//document.getElementById('idTPick').value=DateTimeNow(7);
		//document.getElementById('idTDrop').value=DateTimeNow(7);
		var Step2SlcOptions='<option value="00:00">00:00</option>'+
		'<option value="01:00">01:00</option>'+
		'<option value="02:00">02:00</option>'+
		'<option value="03:00">03:00</option>'+
		'<option value="04:00">04:00</option>'+
		'<option value="05:00">05:00</option>'+
		'<option value="06:00">06:00</option>'+
		'<option value="07:00">07:00</option>'+
		'<option value="08:00">08:00</option>'+
		'<option value="09:00">09:00</option>'+
		'<option value="10:00">10:00</option>'+
		'<option value="11:00">11:00</option>'+
		'<option value="12:00">12:00</option>'+
		'<option value="13:00">13:00</option>'+
		'<option value="14:00">14:00</option>'+
		'<option value="15:00">15:00</option>'+
		'<option value="16:00">16:00</option>'+
		'<option value="17:00">17:00</option>'+
		'<option value="18:00">18:00</option>'+
		'<option value="19:00">19:00</option>'+
		'<option value="20:00">20:00</option>'+
		'<option value="21:00">21:00</option>'+
		'<option value="22:00">22:00</option>'+
		'<option value="23:00">23:00</option>';

		Step2SlcTPick.innerHTML=Step2SlcOptions;
		Step2SlcTDrop.innerHTML=Step2SlcOptions;
	}

	function PlaceApos(givenValue,displayTo){
		var aposValue="'"+givenValue+"'";
		document.getElementById(displayTo).value=aposValue;
	}

	function clickTabLink(evt, tabLinkID) {
		// Declare all variables
		var i, tablinks;

		// Get all elements with class="tablinks" and set the class from "active" into blank,
		// making the style out of active class
		tablinks = document.getElementsByClassName("maintablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		evt.currentTarget.className += " active";
		
		lnkStep1.click();
	}

	function EmptyTheTable(tblID){
		var rowCount=tblID.rows.length;

		for (var i=rowCount-1;i>0;i--){
			tblID.deleteRow(i);
		}
	}

    function idSlcDlvStatSelectableOptions(Opt1,Opt2,Opt3,Opt4){ //makes idSlcDlvStat options selectable or not
        var opt=idSlcDlvStat.getElementsByTagName('option');
		opt[1].disabled=Opt1; //pickup
		opt[2].disabled=Opt2; //dropoff
		opt[3].disabled=Opt3; //cancelled
		opt[4].disabled=Opt4; //on going
		//opt[5].disabled=Opt5;
    }
	
	function DoMainTab1(IsFirst){
		clickTabLink(event,lnkCreate);
		stepTabs.style.pointerEvents='auto';
		Step1.style.height='500px';
        //idSlcDlvStatSelectableOptions(false,false,true,true,true);
        Step1ModifyADelivery.style.display='none';
		Step1CreateADelivery.style.display='none';//initial';
		Step1DeliverAnItem.style.display='initial';
		ResetStep1();
		PopulateStep2DTFields();
		ResetStep3();
		ResetStep31()
		ResetStep4();

		lnkCreate.click(); //we need to declaire this in order to set it into "active" class when clicked dynamically
		txtAction.value=0;
		Step1Desc.innerHTML="Choose an item in the table to fetch/deliver.";
		/* Step1DatePickerDesc.innerHTML="Select the year and the month of the donated item was pledged:";
		idSlcDate.type='month'; */
		txtActionWhichSQL.value=0; //we can't call inputs from another form when submitting/calling a php script.
		spanStep4CommitBtn.innerHTML="Create a Delivery record";
		spanStep4CommitBtn.style.visibility='visible';
		tab2Step4.style.left='690px';

		//we need to know if it's the first chance that the user inserts a record.
		//if not, tblItemList should not be emptied to avoid searching over again
		/* if (IsFirst=='0'){
			EmptyTheTable(tblItemList);
		}else if(IsFirst=='1'){
			SlcDateSearch.click();
		} */
	}
	function DoMainTab2(IsFirst){
		clickTabLink(event,lnkModify);
		stepTabs.style.pointerEvents='auto';
		Step1.style.height='1000px';
		idSlcDlvStatSelectableOptions(false,false,true,false); //,false);
		Step1ModifyADelivery.style.display='initial';
		Step1CreateADelivery.style.display='none';
		Step1DeliverAnItem.style.display='none';
		ResetStep1();
		PopulateStep2DTFields();
		ResetStep3();
		ResetStep31()
		ResetStep4();

		spanMsg.innerHTML='';
		lnkModify.click(); //we need to declaire this in order to set it into "active" class when clicked dynamically
		txtAction.value=1;
		Step1Desc.innerHTML="Choose a delivery item in the table to modify.";
		Step1DatePickerDesc.innerHTML="Specify the pickup date of the delivery: ";
		idSlcDate.type='date';
		txtActionWhichSQL.value=1; //we can't call inputs from another form when submitting/calling a php script.
		spanStep4CommitBtn.innerHTML="Modify the record";
		spanStep4CommitBtn.style.visibility='visible';
		tab2Step4.style.left='723px';
		tab2Step4.style.transform="translateX(-21px)";

		if (IsFirst==0){
			EmptyTheTable(tblItemList);
		}else if(IsFirst==1){
			SlcDateSearch.click();
		}
	}
	function DoMainTab3(IsFirst){
		clickTabLink(event,lnkModify);
		stepTabs.style.pointerEvents='auto';
		Step1.style.height='1000px';
		idSlcDlvStatSelectableOptions(true,true,false,true); //,true);
		Step1ModifyADelivery.style.display='initial';
		Step1CreateADelivery.style.display='none';
		Step1DeliverAnItem.style.display='none';
		ResetStep1();
		PopulateStep2DTFields();
		ResetStep3();
		ResetStep31()
		ResetStep4();

		spanMsg.innerHTML='';
		lnkCancel.click(); //we need to declaire this in order to set it into "active" class when clicked dynamically
		txtAction.value=2;
		Step1Desc.innerHTML="Choose a delivery item in the table to cancel.";
		Step1DatePickerDesc.innerHTML="Specify the date of the delivery: ";
		idSlcDate.type='date';
		txtActionWhichSQL.value=1; //we can't call inputs from another form when submitting/calling a php script.
		spanStep4CommitBtn.style.visibility='hidden'; //innerHTML="Modify the record";
		tab2Step4.style.left='723px';
		tab2Step4.style.transform="translateX(130px)";
		

		if (IsFirst=='0'){
			EmptyTheTable(tblItemList);
		}else if(IsFirst=='1'){
			SlcDateSearch.click();
		}
	}
	function PreLoad(){
		//frmStep4.style.display='none';
		LoadStep31(0);
		//stepTabs.style.pointerEvents='none'; //froze forever, dunno why.. :v so i moved it back to <body>
		SearchFirebase(null,4,idSlcVID); //populates dropdown box in step3
		SearchFirebase(null,5,idSlcTLoc); //populates dropdown box in step4
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
    
    function UploadPicture(ImageName,selectedFile,DisplayURLTo,Action){ //ImageName(w/ file type) will be the DateTimeNow(9) on creating a new record
        var FBStore=firebase.storage();
		var FileType=SplitStr(ImageName,'.')[1];
		var NewFileName=String(DateTimeNow(9))+'.'+FileType;
        var metaData={contentType: 'image/'+FileType, name:NewFileName};//ImageName}; //extFile, name:ImageName};
		var refFBStore=FBStore.ref('donatedItems/'+NewFileName).put(selectedFile,metaData);
		var IsError='';
        
        refFBStore.on('state_changed',function(data){
			var progress=(data.bytesTransferred / data.totalBytes)*100;
			ResultUISettings(2);
			spanResult.innerHTML='Please wait... '+progress;
            //spanMsg.innerHTML='Progress: '+progress;
        },function(error){
			IsError=error;
            //spanUploadMsg.innerHTML='Error on uploading the picture. '+error;//0; //won't show
        },function(){
			//spanUploadMsg.innerHTML='Picture succesfully uploaded.';//1; //won't show
			if(IsError==''){
				if(Action==0){
					refFBStore.snapshot.ref.getDownloadURL().then(function(TheURL){
						//DisplayURLTo.value=TheURL;
						//TransferValueAfterValidation(0);
	
						var PSV=txtItemCategoryRec.value+'+'+
											txtItemSubCategoryRec.value+'+'+
											txtItemDescriptionRec.value+'+'+
											txtItemUnitRec.value+'+'+
											txtItemQtyRec.value+'+'+
											txtItemStatusRec.value+'+'+
											txtDelStatusRec.value+'+'+
											txtItemPledgeDateRec.value+'+'+
											txtDonorIdRec.value+'+'+
											TheURL+'+'+ //txtStep1ImageUrlRec.value+'+'+
											txtDTPickRec.value+'+'+
											txtDTDropRec.value+'+'+
											txtSLocRec.value+'+'+
											txtSLLatRec.value+'+'+
											txtSLLngRec.value+'+'+
											txtVIDRec.value+'+'+
											txtTLocIDRec.value;
	
					RecordFirebase(PSV,Action,spanMsg);
		
											setTimeout(function(){
												if (spanMsg.innerHTML==1){ // 1 = success
													ResultUISettings(1);
													spanResult.innerHTML='Record successfully created.';
												}else if(spanMsg.innerHTML==0){ // 0 = fail
													ResultUISettings(0);
													spanResult.innerHTML='An error occured on record creation. No record created.';
												}
											},2700);
					
					});
				}else if(Action==1){
					refFBStore.snapshot.ref.getDownloadURL().then(function(TheURL){DisplayURLTo.value=TheURL;});
				}
			}
            
        });
	}

	function DonorLogin(GivenEMail,GivenPassword){
		if(GivenEMail.value!='' || GivenPassword.value!=''){
			SearchFirebase(GivenEMail.value+'+'+GivenPassword.value,7,txtStep1DonorId);
			
			setTimeout(function(){
				if(txtStep1DonorId.value!=''){
					
					ModalDonorLoginTitle.innerHTML='Donor verified';
					ModalDonorLoginTitle.style.color='#3bb545';

					setTimeout(function(){
						ResetDonorLogin();
					},1500);
				}else{
					InvalidLoginCommonCode();
				}
			},1500);

		}else{
			InvalidLoginCommonCode();
		}

		function InvalidLoginCommonCode(){
			ModalDonorLoginTitle.innerHTML='Invalid login details';
			ModalDonorLoginTitle.style.color='#e54747';
			GivenEMail.value='';
			GivenPassword.value='';
			GivenEMail.focus();
		}
	}
	function ResetDonorLogin(){
		txtStep1DonorLoginEMail.value='';
		txtStep1DonorLoginPassword.value='';
		ModalDonorLoginTitle.innerHTML='Identify the donor';
		ModalDonorLoginTitle.style.color='#000';
		ModalDonorLogin.style.display='none';
	}
	window.onclick = function(event) {
		if (event.target == ModalDonorLogin) {
			ResetDonorLogin();
		}
	}