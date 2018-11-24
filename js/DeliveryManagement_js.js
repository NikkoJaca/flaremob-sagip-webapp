
	var arrMarkers = []; 
	var arrVIDs=[];
	var poly=null;
	var nearestVehicle=null;
	var globalFmrIndex=null;
	var leastValue=null;
	var posNangkaBrgyHall={lat:14.673334097027062,lng:121.10863365232944};
	var posNBH='';
	//var infoWindow = new google.maps.InfoWindow;


function initMap(){
	var posBrgyNangka = {lat:14.6686733,lng:121.1091784};
    var mapBrgyNangka = new google.maps.Map(document.getElementById('map'), {
        center:posBrgyNangka,
		zoom: 15
    });
	var infoWindow = new google.maps.InfoWindow;

//remove this block when online vehicles are available
	var markerOptions ={
		position:posNangkaBrgyHall,
		map:mapBrgyNangka,
		//label:'delivery',
		draggable:false
	};
	//new google.maps.Marker(markerOptions);
	var marker = new google.maps.Marker(markerOptions);
	posNBH=marker.position;
	var html = '<div><strong>Nangka Brgy. Hall</strong><br><text>No delivery vehicle online at this time.</text></div>';
	BindInfoWindow (marker, mapBrgyNangka, infoWindow, html);
	infoWindow.setContent(html);
	infoWindow.open(mapBrgyNangka, marker);
////////////////////////////////////////////////////////

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

	var pacMarkers = [];

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
				position: place.geometry.location
			};
			var TheMarker=new google.maps.Marker(markerSettings);
			pacMarkers.push(TheMarker);

			var infContent='';
			var rawCoord=place.geometry.location;
			var pathDefault = [rawCoord, posNangkaBrgyHall];
			var result=calcDistance(rawCoord,posNBH);
			var splitLatLng=String(rawCoord).split(',');
			var subLat=splitLatLng[0].substr(1); //trims the parenthesis on index 1
			var subLng=splitLatLng[1].substr(1).slice(0,-1); //trims the white space on index 1 and slices the parenthesis on the other end
			
			if(lnkStep3.className=="tablinks active"){
				idTxtSourceLoc.value=place.name+' | '+place.formatted_address;
				idTxtSLLat.value=subLat;
				idTxtSLLng.value=subLng;
				//var infContent='';
				
				if(nearestVehicle!=null){
					if(idDPick.value==DateTimeNow(5)){ //if set Date of pick up is today
						nearestVehicle=arrMarkers[formerIndex].position;
						var path = [rawCoord, nearestVehicle]; //arrMarkers[formerIndex].position];
						poly.setMap(mapBrgyNangka);
						poly.setPath(path);

						infContent='<div><img src="' + place.icon + '" height="16" width="16"> '
						+ '<strong>' + place.name + '</strong><br>' + place.formatted_address + 
						'<br><b style="color:#006699;opacity:0.7;">'+leastValue+
						' Km away from the nearest Barangay vehicle.</b></div>';

						setTimeout(function() {
							var ConfirmResult=confirm('The nearest vehicle is '+leastValue+' Km away. Would you like to use this vehicle?');
							if(ConfirmResult==true){
								idSlcVID.value=String(arrVIDs[globalFmrIndex]);
							}else{
								idSlcVID.value='';
							}	
						}, 1000); //1000 = 1 sec.	
					}
				}else{
					poly.setMap(mapBrgyNangka);
					poly.setPath(pathDefault);
					
					infContent='<div><img src="' + place.icon + '" height="16" width="16"> '
					+ '<strong>' + place.name + '</strong><br>' + place.formatted_address + 
					'<br><b style="color:#006699;opacity:0.7;">'+result+
					' Km away from Nangka Barangay Hall.</b></div>';
				}
			}else{
				poly.setMap(mapBrgyNangka);
				poly.setPath(pathDefault);

				infContent='<div><img src="' + place.icon + '" height="16" width="16"> '
				+ '<strong>' + place.name + '</strong><br>' + place.formatted_address + 
				'<br><b style="color:#006699;opacity:0.7;">'+result+
				' Km away from Nangka Barangay Hall.</b></div>';
			}

			infoWindow.setContent(infContent);
			infoWindow.open(mapBrgyNangka,TheMarker);//pacMarkers[0]);

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

    /*downloadUrl ("xmlgps.php", function(data){
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName ("marker");
		//alert(markers.length);
		if(markers.length>0){
			//counts the marker tag in xml file and makes an infowindow each
			for (var i = 0; i < markers.length; i++){
				
				var vPlateNo = markers[i].getAttribute('plateno');
				var vDesc = markers[i].getAttribute('description');
				var vPoint = new google.maps.LatLng(
					parseFloat(markers[i].getAttribute('lat')),
					parseFloat(markers[i].getAttribute('lng')));
				var vVID = markers[i].getAttribute('vid');

				
				var markerOptions ={
					position: vPoint,
					map: mapBrgyNangka,
					label: 'delivery',
					draggable: false
				};

				// adds the marker
				var marker = new google.maps.Marker(markerOptions);
				arrMarkers.push(marker);

				//adds the VIDs to array
				arrVIDs.push(vVID);

/*				var tr = document.getElementById(vVID);
				google.maps.event.addDomListener (tr,'click',(function(i){
					//var row = i;
					return function(){
					RowClick(i);//row);
					}
				})(i)
				);
*/

				// adds info window content
	/*			var html = '<div><strong>'+vPlateNo+'</strong><br><text>'+vDesc+'</text></div>';
				BindInfoWindow (marker, mapBrgyNangka, infoWindow, html);
			}
			//alert(arrVIDs);
		}else{ //creates a marker of brgy nangka
			var markerOptions ={
				position:posNangkaBrgyHall,
				map:mapBrgyNangka,
				//label:'delivery',
				draggable:false
			};
			var marker = new google.maps.Marker(markerOptions);
			posNBH=marker.position;
			var html = '<div><strong>Nangka Brgy. Hall</strong><br><text>No delivery vehicle online at this time.</text></div>';
			BindInfoWindow (marker, mapBrgyNangka, infoWindow, html);
			infoWindow.setContent(html);
			infoWindow.open(mapBrgyNangka, marker);
			
		}
    });*/ //end of downloadURL call


		function BindInfoWindow (marker, map, infoWindow, html){
			google.maps.event.addListener (marker,'click', function(){
				infoWindow.setContent (html);
				infoWindow.open (map, marker);
			});
		}
	
	
		var clickHandler = new ClickEventHandler(mapBrgyNangka, posBrgyNangka);
		
		//the polyline settings used in finding the nearest vehicle
		poly = new google.maps.Polyline({
          strokeColor: '#3366cc',
          strokeOpacity: 0.5,
          strokeWeight: 4,
          map: mapBrgyNangka
        });
		
	
	
} //end of mapIni
	
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
	
	var ClickEventHandler = function(map, origin) {
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
  	}


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

  ClickEventHandler.prototype.getPlaceInformation = function(placeID) {
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
  };

	
	function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
      }

    function doNothing() {}
	
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
	var vtxtItemIDRec=null;
	var vtxtDTPickRec=null;
	var vtxtDTDropRec=null;
	var vtxtSLocRec=null;
	var vtxtSLLatRec=null;
	var vtxtSLLngRec=null;
	var vtxtDlvStatRec=null;
	var vtxtTLocIDRec=null;
	var vtxtVIDRec=null;
	var vtxtDLVIDRec=null;
	var vtxtDlvUID=null;
	////////////////////////////////////////////////
	function rowSelect(row,whichTable){
		var content=row.cells;

		if (txtAction.value==0){
			if (whichTable==0){ //tBodyItemList
				var selectedItem=content[1].innerHTML+', '+content[2].innerHTML;

				document.getElementById('idTxtItemID').value=content[0].innerHTML;
				document.getElementById('idTxtSelectedItem').value=selectedItem;
				document.getElementById('idSlcDlvStat').value=0;
			}else if(whichTable==1){
				document.getElementById('idSlcVID').value=content[0].innerHTML;
			}
		}else if(txtAction.value==1 || txtAction.value==2){
			if (whichTable==0){
				var selectedItem=content[1].innerHTML+', '+content[2].innerHTML;
				var DTPick=SplitStr(content[4].innerHTML,' ');
				var DTDrop=SplitStr(content[5].innerHTML,' ');

				document.getElementById('idTxtItemID').value=content[0].innerHTML;
				document.getElementById('idTxtSelectedItem').value=selectedItem;
				document.getElementById('idSlcDlvStat').value=content[3].innerHTML;
				document.getElementById('idDPick').value=DTPick[0];
				document.getElementById('idDDrop').value=DTDrop[0];
				document.getElementById('idTPick').value=DTPick[1];
				document.getElementById('idTDrop').value=DTDrop[1];
				document.getElementById('idTxtDateRetainer').value=content[11].innerHTML; //DateTime_Pledged - user date/time input must not be lower than
				document.getElementById('idTxtSourceLoc').value=content[6].innerHTML;
				document.getElementById('idTxtSLLat').value=content[7].innerHTML;
				document.getElementById('idTxtSLLng').value=content[8].innerHTML;
				document.getElementById('idSlcVID').value=content[10].innerHTML;
				document.getElementById('txtVIDRetainer').value=content[10].innerHTML;
                document.getElementById('idSlcTLoc').value=content[9].innerHTML;
				document.getElementById('txtDLVIDRec').value=content[12].innerHTML;

				vtxtItemIDRec=content[0].innerHTML;
				vtxtDTPickRec=content[4].innerHTML;
				vtxtDTDropRec=content[5].innerHTML;
				vtxtSLocRec=content[6].innerHTML;
				vtxtSLLatRec=content[7].innerHTML;
				vtxtSLLngRec=content[8].innerHTML;
				vtxtDlvStatRec=content[3].innerHTML;
				vtxtTLocIDRec=content[9].innerHTML;
				vtxtVIDRec=content[10].innerHTML;
				vtxtDLVIDRec=content[12].innerHTML;
				vtxtDlvUID=content[13].innerHTML; //use this to update a delivery record
				vtxtApprovalStat=content[13].innerHTML; //create another main tab for managing the donation coming from mobile
				// 0 - pending, the record is subject for server user approval. the server user will be the one to assign a
				//vehicle to fetch and deliver the donated item (on the place(pick up and drop off) set by the donor). 
				//1 - approved, the server user approves the pending donated item (for delivery or not, from mobile or from walk in).
				//2 - denied, the server user found no use of the pending donated item.


				//alert(vtxtDlvUID);
				/*if (txtAction.value==2){
					idSlcDlvStat.value=2;
				}*/
			}
		}
	}
	function DoStep1AValueTransfer(Action){
		if (Action==0){ //0 - transfer the values to the frmStep4 inputs
			txtItemIDRec.value=vtxtItemIDRec;
			txtDTPickRec.value=vtxtDTPickRec;
			txtDTDropRec.value=vtxtDTDropRec;
			txtSLocRec.value=vtxtSLocRec;
			txtSLLatRec.value=vtxtSLLatRec;
			txtSLLngRec.value=vtxtSLLngRec;
			txtDlvStatRec.value=vtxtDlvStatRec;
			txtTLocIDRec.value=vtxtTLocIDRec;
			txtVIDRec.value=vtxtVIDRec;
			txtDLVIDRec.value=vtxtDLVIDRec;
		}else if(Action==1){
			vtxtItemIDRec=null;
			vtxtDTPickRec=null;
			vtxtDTDropRec=null;
			vtxtSLocRec=null;
			vtxtSLLatRec=null;
			vtxtSLLngRec=null;
			vtxtDlvStatRec=null;
			vtxtTLocIDRec=null;
			vtxtVIDRec=null;
			vtxtDLVIDRec=null;
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
	function SlcDlvStatUISettings(SlcVal){
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
		DoStep1AValueTransfer(1);
	}
	function CoreDropOffUISettings(Invert){
		if (Invert=='1'){
			divMsgWrapperStep1.style.visibility='visible';
			stepTabs.style.pointerEvents='none';
			Step1Disabler.style.pointerEvents='none';
			divTab2Step1.style.pointerEvents='none';
		}else if(Invert=='0'){
			divMsgWrapperStep1.style.visibility='hidden';
			stepTabs.style.pointerEvents='auto';
			Step1Disabler.style.pointerEvents='auto';
			divTab2Step1.style.pointerEvents='auto';
		}
	}
	function LoadDoMainTab(){
		CoreDropOffUISettings(0);
		if (txtAction.value==1){
			DoMainTab2(1);
		}else if(txtAction.value==2){
			DoMainTab3(1);
		}
	}
	function ValidateStep1(action){
		var valItemID=document.getElementById('idTxtItemID').value;
		var valDlvStat=document.getElementById('idSlcDlvStat').value;
		var DTNow=DateTimeNow();
		if (txtAction.value==0){
			if(valItemID!=''){
				if(valDlvStat=='0'){
					if (action==0){
						openTab(event,'Step2');
						LoadStep2(1);
					}else if(action==1){
						return true;
					}
				}else{alert("Set the delivery status to 'Picking up' before clicking Next.");}
			}else{alert('Choose an item first before clicking Next.');}
		}else if(txtAction.value==1){
			if(valItemID!=''){
				if(valDlvStat=='0'){ //the user edits the detail of a delivery on picking up
					if (action==0){
						openTab(event,'Step2');
						LoadStep2(1);
					}else if(action==1){
						return true;
					}
				}else if(valDlvStat=='1'){ //the user edits the detail of a delivery from picking up into dropping off 
					var DTPick=idDPick.value+' '+idTPick.value;
					if (DTNow>=DTPick){ //know if the delivery session is done 
						var confirmResult=confirm('This action will mark the delivery session as done at '+DTNow+'\nClick OK to continue.');

						if (confirmResult==true){
							//check if the item was already delivered to prevent re-stamping the record
							//getData(txtDLVIDRec.value,3,'txtDlvCurrentStat');
							SearchFirebase(txtDLVIDRec.value,3,txtDlvCurrentStat);
							
							setTimeout(function(){
								if (txtDlvCurrentStat.innerHTML==0){ //delivery item stat is picking up
									DoStep1AValueTransfer(0);
var PSV=txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+DTNow+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+idSlcDlvStat.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value+'+'+vtxtApprovalStat;
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
								}else if(txtDlvCurrentStat.innerHTML==1){ //delivery status 1 = drop off or done/delivered
									alert('This item was already delivered/dropped off.');
								}else if(txtDlvCurrentStat.innerHTML==2){
									alert('The delivery of this item was already cancelled.');
								}
							},1000);

						}
					}else{alert('Drop off date and time must not be sooner than the Pick up date and time.');}
				}else{alert('Please choose a delivery status before clicking \'Next.\'');}
			}else{alert('Choose an item first before clicking \'Next.\'');}
		
		}else if(txtAction.value==2){
			if(valItemID!=''){
				if (valDlvStat==2){
					var confirmResult=confirm('This action will cancel the delivery of the item.\n Click OK to continue.');
					if (confirmResult==true){
						//alert('do the ajax way');
						//getData(txtDLVIDRec.value,3,'txtDlvCurrentStat'); //check if the delivery status of the item is for pick up
						SearchFirebase(txtDLVIDRec.value,3,txtDlvCurrentStat);

						setTimeout(function(){
							DoStep1AValueTransfer(0);
var PSV=txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+txtDTDropRec.value+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+idSlcDlvStat.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value+'+'+vtxtApprovalStat;
							if (txtDlvCurrentStat.innerHTML==0){ //delivery item stat is picking up
								if (DTNow<txtDTPickRec.value){ //check if current date and time is less than the date and time of Pick up
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
									},1000);
								}else{alert('Item delivery cannot be cancelled, the delivery is on going.');}
							}else if(txtDlvCurrentStat.innerHTML==1){alert('The Item you choose was already delivered.');
							}else if(txtDlvCurrentStat.innerHTML==2){alert('The Item you choose was already cancelled.');
							}else if(txtDlvCurrentStat.innerHTML==3){alert('The Item you choose is subject for approval.');
							}else if(txtDlvCurrentStat.innerHTML==4){alert('An error occured while updating the record. Delivery cancelation not successfull.');}
						},1000);
					}
				}else{ alert('Choose an item first before clicking \'Next.\'');}
			}else{ alert('Set the Delivery status to \'Cancel\' to cancel the delivery of an Item.');}
		}
		
	}
	function ValidateStep2(action){ //0 - initial validation, 1 - final validation @Step4
		var valDPick=String(document.getElementById('idDPick').value);
		var valTPick=String(document.getElementById('idTPick').value);
		var valDDrop=String(document.getElementById('idDDrop').value);
		var valTDrop=String(document.getElementById('idTDrop').value);
		
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
		var valSourceLoc=String(document.getElementById('idTxtSourceLoc').value);
		/*var valLat=String(document.getElementById('idTxtSLLat').value);
		var valLng=String(document.getElementById('idTxtSLLng').value);*/
		var valVID=String(document.getElementById('idSlcVID').value);

		if (valSourceLoc!=''){
			if (valVID!=''){
				if (action==0){
					openTab(event,'Step4');
					document.getElementById('lnkStep4').click();
				}else if(action==1){
					return true;
				}
			}else {alert('Please choose a vehicle to deliver.');}
		}else {alert('Please have a Pick up location.');}
	}
	function ValidateStep4(){

		if (ValidateStep1(1)==true){
			txtItemIDRec.value=idTxtItemID.value;
			txtDlvStatRec.value=idSlcDlvStat.value;
			if (ValidateStep2(1)==true){
				txtDTPickRec.value=String(idDPick.value+' '+idTPick.value); //valDTPick;
				txtDTDropRec.value=String(idDDrop.value+' '+idTDrop.value); //valDTDrop;

				if (ValidateStep3(1)==true){
					txtSLocRec.value=idTxtSourceLoc.value;
					txtSLLatRec.value=idTxtSLLat.value;
					txtSLLngRec.value=idTxtSLLng.value;
					txtVIDRec.value=idSlcVID.value;

					if (idSlcTLoc.value!=''){
						txtTLocIDRec.value=idSlcTLoc.value; //valTLocID;
						
						var confirmResult=null;
						//var PSV=txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+txtDTDropRec.value+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+txtDlvStatRec.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value;
						//var PSV=setTimeout(function(){txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+txtDTDropRec.value+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+txtDlvStatRec.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value;},1000);
//alert(PSV);
						if (txtAction.value==0){
							
							confirmResult=confirm('This action will create a new Delivery record. Please click \'OK\' to continue');
							if (confirmResult==true){
								//PrimaryKeyGen('tblDelivery',txtDLVIDRec);
								txtDLVIDRec.value=DateTimeNow(9);
								//setTimeout(function(){
									//delApprovalStat value is always '1' since the server user will be the one to decide if the donated item is acceptable or not.
									var PSV=txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+txtDTDropRec.value+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+txtDlvStatRec.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value+'+1';

									//storeData(PSV,0,'spanMsg');
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
								//},700);
							}
						}else if(txtAction.value==1){
							//getData(txtVIDRetainer.value,2,'spanMsg'); //check if the existing delivery record is not on its way yet 
							SearchFirebase(txtVIDRetainer.value,2,'spanMsg');

							setTimeout(function(){
							if (spanMsg.innerHTML=='0'){
								//delApprovalStat value is always 1.
								var PSV=txtItemIDRec.value+'+'+txtDTPickRec.value+'+'+txtDTDropRec.value+'+'+txtSLocRec.value+'+'+txtSLLatRec.value+'+'+txtSLLngRec.value+'+'+txtDlvStatRec.value+'+'+txtTLocIDRec.value+'+'+txtVIDRec.value+'+'+txtDLVIDRec.value+'+1';
								//alert(PSV);
								confirmResult=confirm('This action will modify an existing Delivery record. Please click \'OK\' to continue');
								if (confirmResult==true){
									//storeData(PSV,1,'spanMsg');
									RecordFirebase(PSV,1,spanMsg);

									setTimeout(function(){
										if (spanMsg.innerHTML=='1'){ // 1 = success
											ResultUISettings(1);
											spanResult.innerHTML='Record successfully modified.';
										}else if(spanMsg.innerHTML=='0'){ // 0 = fail
											ResultUISettings(0);
											spanResult.innerHTML='An error occured on updating the record. Record not modified.';
										}
									},1000);
								}
								
							}else {alert('The item you choose is currently on deliver or was already delivered. Item detail modification is no longer allowed.');}
							},1000);
						}
					}else {alert('Please choose a Drop off location.');}
				}
			}
		}	
	}
	/*function PrimaryKeyGen(TheTable,objID){ //YY + 0000i + i++
		var TheColumn='';
		if(TheTable=='tblDelivery'){
			TheColumn='delId';
		}else if(TheTable=='tblDonatedItems'){
			TheColumn='itemId';
		}else if(TheTable=='tblDonors'){
			TheColumn='donorId';
		}else if(TheTable=='tblLogVeCoordinates'){
			TheColumn='logId';
		}else if(TheTable=='tblTargetLoc'){
			TheColumn='tLocId';
		}else if(TheTable=='tblVehicle'){
			TheColumn='vhcId';
		}else{objID.value='error';}
		//alert(TheTable+', '+TheColumn);
		
		var FBDB=firebase.database();
		var refFBDB=FBDB.ref(TheTable).orderByChild(TheColumn).limitToLast(1);
		refFBDB.once('value',function(data){ //.once & .on methods are very secured. these methods doesn't allow
		//variable calls outside of them so, we need to redeclare the variable(s) after these methods.
		//in our case, these are the columns.

			var DateLast2Char=String(DateTimeNow(0)).slice(2,4); //ex: 2018 = 18
			if(data.exists()){ //if there's an existing ID
				var TheData=data.val();
				var TheRow=Object.keys(TheData);
				var TheValue='';
				var Get1st2Char='';
				var StrID='';

				if(TheColumn=='delId'){
					TheValue=String(TheData[TheRow[0]].delId);
					Get1st2Char=TheValue.slice(0,2); //ex: 180000007 = 18

					if(Get1st2Char==DateLast2Char){ //checks if the year is current
						objID.value=parseInt(TheData[TheRow[0]].delId)+1;
					}else if(Get1st2Char!=DateLast2Char){
						StrID=TheValue.replace(Get1st2Char,DateLast2Char);
						objID.value=parseInt(StrID)+1;
					}
				}else if(TheColumn=='itemId'){
					TheValue=String(TheData[TheRow[0]].itemId);
					Get1st2Char=TheValue.slice(0,2); //ex: 180000007 = 18

					if(Get1st2Char==DateLast2Char){ //checks if the year is current
						objID.value=parseInt(TheData[TheRow[0]].itemId)+1;
					}else if(Get1st2Char!=DateLast2Char){
						StrID=TheValue.replace(Get1st2Char,DateLast2Char);
						objID.value=parseInt(StrID)+1;
					}
				}else if(TheColumn=='donorId'){
					TheValue=String(TheData[TheRow[0]].donorId);
					Get1st2Char=TheValue.slice(0,2); //ex: 180000007 = 18

					if(Get1st2Char==DateLast2Char){ //checks if the year is current
						objID.value=parseInt(TheData[TheRow[0]].donorId)+1;
					}else if(Get1st2Char!=DateLast2Char){
						StrID=TheValue.replace(Get1st2Char,DateLast2Char);
						objID.value=parseInt(StrID)+1;
					}
				}else if(TheColumn=='logId'){
					TheValue=String(TheData[TheRow[0]].logId);
					Get1st2Char=TheValue.slice(0,2); //ex: 180000007 = 18

					if(Get1st2Char==DateLast2Char){ //checks if the year is current
						objID.value=parseInt(TheData[TheRow[0]].logId)+1;
					}else if(Get1st2Char!=DateLast2Char){
						StrID=TheValue.replace(Get1st2Char,DateLast2Char);
						objID.value=parseInt(StrID)+1;
					}
				}else if(TheColumn=='tLocId'){
					TheValue=String(TheData[TheRow[0]].tLocId);
					Get1st2Char=TheValue.slice(0,2); //ex: 180000007 = 18

					if(Get1st2Char==DateLast2Char){ //checks if the year is current
						objID.value=parseInt(TheData[TheRow[0]].tLocId)+1;
					}else if(Get1st2Char!=DateLast2Char){
						StrID=TheValue.replace(Get1st2Char,DateLast2Char);
						objID.value=parseInt(StrID)+1;
					}
				}else if(TheColumn=='vhcId'){
					TheValue=String(TheData[TheRow[0]].vhcId);
					Get1st2Char=TheValue.slice(0,2); //ex: 180000007 = 18

					if(Get1st2Char==DateLast2Char){ //checks if the year is current
						objID.value=parseInt(TheData[TheRow[0]].vhcId)+1;
					}else if(Get1st2Char!=DateLast2Char){
						StrID=TheValue.replace(Get1st2Char,DateLast2Char);
						objID.value=parseInt(StrID)+1;
					}
				}else{ objID.value='';}
			}else{
				objID.value=DateLast2Char+'00000';
			}
		},function(error){ objID.value='';});//objID.value='Error: '+error;});
	}*/
	function RetrieveItemIDDetails(ItemID,Col1,Col2,Col3){
		var FBDB=firebase.database();
		var refFBDB=FBDB.ref('tblDonatedItems').orderByChild('itemId').equalTo(ItemID);
		refFBDB.once('value',function(data){
			var TheTable=data.val();
			var TheRow=Object.keys(TheTable);
			Col1.innerHTML=TheTable[TheRow[0]].itemQty+' '+TheTable[TheRow[0]].itemUnit+' of '+TheTable[TheRow[0]].itemDesc;
			Col2.innerHTML=TheTable[TheRow[0]].itemType+' / '+TheTable[TheRow[0]].itemCategory;
			Col3.innerHTML=TheTable[TheRow[0]].itemPledgeDate;
		},function(error){
			Col1.innerHTML=error;
			Col2.innerHTML=error;
			Col3.innerHTML=error;
		});
	}

	function SearchFirebase(Filter,Action,objID){ 
		var FBDB=firebase.database();
		var refFBDB='';

		if(Action==0){
			var DlvItemID=[];
			var IsError=false; //,IsEmpty;

			refFBDB=FBDB.ref('tblDelivery');
			refFBDB.once('value',function(data){
				if(data.exists()){
					var TheTable=data.val();
					var TheRows=Object.keys(TheTable);

					for(var i=0;i<TheRows.length;i++){
						var k=TheRows[i];
//alert(TheTable[k].ITEM_ID);
						DlvItemID.push(TheTable[k].ITEM_ID);
					}
				} //else{ IsEmpty=true;}
			},function(){ IsError=true;});

			setTimeout(function(){
			if(!IsError){
				refFBDB=FBDB.ref('tblDonatedItems').orderByChild('itemPledgeDate').startAt(Filter).endAt(Filter+'\uf8ff');
				refFBDB.once('value',function(data){
					if(data.exists()){
						var TheTable=data.val();
						var TheRows=Object.keys(TheTable);

						objID.innerHTML='';
						for(var i=0;i<TheRows.length;i++){
							var k=TheRows[i];
//do a better segregation of delivered and pending-for-delivery status of donated items
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
							if(TheTable[k].itemStatus==0){ //0 - the donated item needs to fetch and deliver
								if(DlvItemID.indexOf(TheTable[k].itemId)==-1){
									var ITEM=TheTable[k].itemQty+' '+TheTable[k].itemUnit+' of '+TheTable[k].itemDesc;
									var DESCRIPTION=TheTable[k].itemType+' / '+TheTable[k].itemCategory;
	
									objID.innerHTML+='<tr id="'+TheTable[k].itemId+'" style="cursor: pointer;" onclick="rowSelect(this,0);">'+ 
									'<td style="padding-left:100px;">'+TheTable[k].itemId+'</td>'+
									'<td>'+ITEM+'</td>'+
									'<td style="padding-right:50px;">'+DESCRIPTION+'</td></tr>';
								}//else{

								//}
								
								//else{ objID.innerHTML+='<tr colspan="3"><td style="text-align:center;">No donated items found</td></tr>';}
							}//else{ objID.innerHTML='<tr colspan="3"><td style="text-align:center;">No donated items found</td></tr>';}
						}
					}else{ objID.innerHTML='<tr colspan="3"><td style="text-align:center;">No more donated items for delivery found</td></tr>';}
				},function(error){
					objID.innerHTML='<tr colspan="3"><td>'+error+'</td></tr>';
				});
			}
			},900);

		}else if(Action==1){ 
			refFBDB=FBDB.ref('tblDelivery').orderByChild('delPick').startAt(Filter).endAt(Filter+'\uf8ff');
			refFBDB.once('value',function(data){
				if(data.exists()){
					var TheTable=data.val();
					var TheRows=Object.keys(TheTable);

					objID.innerHTML='';
					for(var i=0;i<TheRows.length;i++){
						var k=TheRows[i];
						objID.innerHTML+='<tr style="cursor: pointer;" onclick="rowSelect(this,0);">'+
						'<td style="padding-left:100px;">'+TheTable[k].itemId+'</td>'+
						'<td>please wait...</td>'+
						'<td style="padding-right:50px;">please wait...</td>'+
						'<td class="hide">'+TheTable[k].delStatus+'</td>'+
						'<td class="hide">'+TheTable[k].delPick+'</td>'+
						'<td class="hide">'+TheTable[k].delDrop+'</td>'+
						'<td class="hide">'+TheTable[k].srcLoc+'</td>'+
						'<td class="hide">'+TheTable[k].srcLat+'</td>'+
						'<td class="hide">'+TheTable[k].srcLng+'</td>'+
						'<td class="hide">'+TheTable[k].tLocId+'</td>'+
						'<td class="hide">'+TheTable[k].vhcId+'</td>'+
						'<td class="hide"></td>'+
						'<td class="hide">'+TheTable[k].delId+'</td>'+
						'<td class="hide">'+k+'</td>'+
						'<td class="hide">'+TheTable[k].delApprovalStat+'</td></tr>';
					}
				}else{ objID.innerHTML='<tr colspan="3"><td style="text-align:center;">Your search turned 0 result</td></tr>';}
			},function(error){
				objID.innerHTML='<tr colspan="3"><td>'+error+'</td></tr>';
			});

		}else if(Action==2){
			refFBDB=FBDB.ref('tblLogVeCoordinates').orderByChild('logId').equalTo(Filter).limitToFirst(1);
			refFBDB.once('value',function(data){
				if(data.exists()){
					var TheTable=data.val();
					var TheRow=Object.keys(TheTable);
					var VIDTimestamp=TheTable[TheRow[0]].logTimestamp;

					if(VIDTimestamp>=DateTimeNow()){
						objID.innerHTML=0; //delivery record is editable
					}else{ objID.innerHTML=1;} //no longer editable
				}else{ objID.innerHTML=0;}
			},function(error){
				objID.innerHTML=1;
			})
		}else if(Action==3){
			refFBDB=FBDB.ref('tblDelivery').orderByChild('delId').equalTo(Filter);
			refFBDB.once('value',function(data){
				if(data.exists()){
					var TheTable=data.val();
					var TheRow=Object.keys(TheTable);
					//0 - delivery on going/ not yet delivered
					//1 - delivered
					//2 - cancelled
					//3 - resched
					objID.innerHTML=TheTable[TheRow[0]].delStatus;
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
							objID.innerHTML+='<option value='+TheTable[k].vhcId+'>'+TheTable[k].vhcPnum+' | '+VEHICLE+'</option>';
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
							objID.innerHTML+='<option value='+TheTable[k].tLocId+'>'+TheTable[k].tLocName+' | '+TheTable[k].tLocAddress+'</option>';
						}
					}
				}else{ objID.innerHTML='<option>No listed target location / evacuation centre</option>';}
			},function(error){
				objID.innerHTML='<option>'+error+'</option>';
			});
		}
	}

	function RecordFirebase(PSV,Action,objID){
		var FBDB=firebase.database();
		var refFBDB='';
		var valPSV=SplitStr(PSV,'+');
		var TheData={
			delId:valPSV[9],
			delPick:valPSV[1],
			delDrop:valPSV[2],
			srcLoc:valPSV[3],
			srcLat:valPSV[4],
			srcLng:valPSV[5],
			delStatus:valPSV[6],
			delApprovalStat:valPSV[10],
			tLocId:valPSV[7],
			itemId:valPSV[0],
			vhcId:valPSV[8]
		};

		if(Action==0){ //creates a new delivery record
			refFBDB=FBDB.ref('tblDelivery');
			refFBDB.push(TheData,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		}else if(Action==1){ //updates the details of a delivery record
			refFBDB=FBDB.ref('tblDelivery').child(vtxtDlvUID);
			refFBDB.update(TheData,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		}else if(Action==2){ //drops the donated item. only DT Drop and Dlv Status need an update
			refFBDB=FBDB.ref('tblDelivery').child(vtxtDlvUID);
			var Data={delDrop:valPSV[2],delStatus:valPSV[6]};
			refFBDB.update(Data,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		}else if(Action==3){ //the user cancels the delivery. only Dlv Status needs an update
			refFBDB=FBDB.ref('tblDelivery').child(vtxtDlvUID);
			var Data={delStatus:valPSV[6]};
			refFBDB.update(Data,function(error){
				if(!error){
					objID.innerHTML=1;
				}else{ objID.innerHTML=0;}
			});
		}
	}

	function ResultUISettings(Result){
		if (Result==1){
			divMsgWrapper.style.backgroundColor='#c1ffc6';
		}else if(Result==0){
			divMsgWrapper.style.backgroundColor='#ff7070';
		}
		CoreResultUISettings(0);
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
			SlcDateSearch.click();
		}
	}
	function AfterResult(){
		if (txtAction.value==0){
			DoMainTab1(1);
			//CoreResultUISettings(1);
		}else if (txtAction.value==1){
			DoMainTab2(1);
			//CoreResultUISettings(1);
		}
		CoreResultUISettings(1);
	}

	function ResetStep1(){
		document.getElementById('frmStep1').reset();
	}
	function ResetStep2(){
		document.getElementById('idTxtValidateRetainer').value=0;
		LoadStep2(1);
	}
	function ResetStep3(){
		document.getElementById('frmStep3').reset();
		pacInput.value='';
		//bias/center the map to brgy nangka
	}
	function ResetStep4(){
		frmStep4.reset();
		idSlcTLoc.value='';
		spanMsg.innerHTML='';
	}

    function SearchStep1(){
		ResetStep1();
		//ResetStep2();
		document.getElementById('idDPick').value='';
		document.getElementById('idDDrop').value='';
		document.getElementById('idTPick').value='';
		document.getElementById('idTDrop').value='';
		document.getElementById('idTxtValidateRetainer').value=0;
		LoadStep2(0);
		ResetStep3();
		var RetainTxtActionValue=txtAction.value;
		ResetStep4();
		txtAction.value=RetainTxtActionValue;

        if (idTxtStrDate.value!=''){
			//getData(idTxtStrDate.value,txtActionWhichSQL.value,'tBodyItemList');
			SearchFirebase(idTxtStrDate.value,txtActionWhichSQL.value,tBodyItemList);

			if(txtActionWhichSQL.value==1){
				//firebase just destroyed the timeout making it worked just once.. fuck !
				//it fucking worked in 2 snippets i made! fucking unreal !!
				setTimeout(function(){ //retrieving data(please wait...) through firing a click event
					for(var i=0;i<tBodyItemList.rows.length;i++){
						//tBodyItemList.rows[i].click(); //it's not the setTimeout the one got fucked up. this shit is the root of all culprit!
						RetrieveItemIDDetails(tBodyItemList.rows[i].cells[0].innerHTML,tBodyItemList.rows[i].cells[1],tBodyItemList.rows[i].cells[2],tBodyItemList.rows[i].cells[11]);
					}
				},3000);
			}
        }else{
            alert('Use the date picker first before clicking.');
        }
    }

	function LoadStep1(){
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
			var RetainDateTime=document.getElementById('idDPick').value+' '+document.getElementById('idTPick').value;
			document.getElementById('idTxtDateRetainer').value=RetainDateTime;
		}else if(txtAction.value==1){
			txtDateNowRetainer.value=DateTimeNow();
		}
		
		if (IsSearch==1){ //we need to have an if statement to prevent the loading of step2
			document.getElementById('lnkStep2').click();
		}
	}
	function PopulateStep2DTFields(){
		document.getElementById('idDPick').value=DateTimeNow(5);
		document.getElementById('idDDrop').value=DateTimeNow(5);
		document.getElementById('idTPick').value=DateTimeNow(7);
		document.getElementById('idTDrop').value=DateTimeNow(7);
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

    function DisableOptCancel(Boole){ //makes the option: cancel unselectable/unclickable
        var opt=idSlcDlvStat.getElementsByTagName('option');
        opt[3].disabled=Boole;
    }
	
	function DoMainTab1(IsFirst){
		clickTabLink(event,lnkCreate);
        stepTabs.style.pointerEvents='auto';
        DisableOptCancel(true);
		ResetStep1();
		PopulateStep2DTFields();
		ResetStep3();
		ResetStep4();
		
		lnkCreate.click(); //we need to declaire this in order to set it into "active" class when clicked dynamically
		txtAction.value=0;
		Step1Desc.innerHTML="Choose an item in the table to fetch/deliver.";
		Step1DatePickerDesc.innerHTML="Select the year and the month of the donated item was pledged:";
		idSlcDate.type='month';
		txtActionWhichSQL.value=0; //we can't call inputs from another form when submitting/calling a php script.
		spanStep4CommitBtn.innerHTML="Create a Delivery record";
		spanStep4CommitBtn.style.visibility='visible';
		tab2Step4.style.left='690px';

		//we need to know if it's the first chance that the user inserts a record.
		//if not, tblItemList should not be emptied to avoid searching over again
		if (IsFirst=='0'){
			EmptyTheTable(tblItemList);
		}else if(IsFirst=='1'){
			SlcDateSearch.click();
		}
	}
	function DoMainTab2(IsFirst){
		clickTabLink(event,lnkModify);
		stepTabs.style.pointerEvents='auto';
		DisableOptCancel(true);
		ResetStep1();
		PopulateStep2DTFields();
		ResetStep3();
		ResetStep4();

		spanMsg.innerHTML='';
		lnkModify.click(); //we need to declaire this in order to set it into "active" class when clicked dynamically
		txtAction.value=1;
		Step1Desc.innerHTML="Choose a delivery item in the table to modify.";
		Step1DatePickerDesc.innerHTML="Specify the date of the delivery: ";
		idSlcDate.type='date';
		txtActionWhichSQL.value=1; //we can't call inputs from another form when submitting/calling a php script.
		spanStep4CommitBtn.innerHTML="Modify the record";
		spanStep4CommitBtn.style.visibility='visible';
		tab2Step4.style.left='723px';

		if (IsFirst=='0'){
			EmptyTheTable(tblItemList);
		}
	}
	function DoMainTab3(IsFirst){
		clickTabLink(event,lnkModify);
        stepTabs.style.pointerEvents='auto';
        DisableOptCancel(false);
		ResetStep1();
		PopulateStep2DTFields();
		ResetStep3();
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
		

		if (IsFirst=='0'){
			EmptyTheTable(tblItemList);
		}else if(IsFirst=='1'){
			SlcDateSearch.click();
		}
	}
	function PreLoad(){
		//stepTabs.style.pointerEvents='none'; //froze forever, dunno why.. :v so i moved it back to <body>
		SearchFirebase(null,4,idSlcVID); //populates dropdown box in step3
		SearchFirebase(null,5,idSlcTLoc); //populates dropdown box in step4
	}
