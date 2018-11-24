    var arrDeliveryMarkers = [];arrDeliveryVID=[];arrDeliveryPlateNo=[];arrDeliveryVIDRow=[];arrQuickInfoVehicle=[];arrQuickInfoVID=[];
    var arrLogDeliveryVID=[];arrA5LogDeliveryMarkers=[];
	var poly=null;
	var nearestVehicle=null;
    var leastValue=null;
    var arrInitMapObj=[];
    var arrInitMapObjSrcLoc=[];
    var arrInitMapObjTLoc=[];
    var arrLiveDeliveryMarkers=[];
    var arrRowIndex=[]; var RowIndexCtr=0;
    var IsLnkLiveDeliveryClicked=false;
    //var DeliveryMarker;
    //var infoWindow = new google.maps.InfoWindow;
    var mapBrgyNangka;
    var markers=[];
    var SrcLocInfoWindow;
    var AddCarInfoWindow;
    var arrTLocMarkers=[];
    var TLocInfoWindow; 

	function initMap(){
    var positionBrgyNangka = {lat:14.6686733,lng:121.1091784};
    mapBrgyNangka = new google.maps.Map(document.getElementById('map'), {
        center:positionBrgyNangka,
		zoom: 15
    });

				/* var markerOptions ={ //it worked ..
					position    : positionBrgyNangka,
					map         : mapBrgyNangka,
					label: 'dummy',
					draggable   : false
				};
				// adds the marker
				var DeliveryVehicleMarker = new google.maps.Marker(markerOptions); */

    var infoWindow = new google.maps.InfoWindow;
    var DeliveryMarker=new google.maps.Marker;
    var SrcLocMarker = new google.maps.Marker;
    var TLocMarker = new google.maps.Marker;
    SrcLocInfoWindow= new google.maps.InfoWindow;
    TLocInfoWindow= new google.maps.InfoWindow;
    AddCarInfoWindow= new google.maps.InfoWindow;
    TLocInfoWindow= new google.maps.InfoWindow;

    
    arrInitMapObj=[mapBrgyNangka,infoWindow,BindInfoWindow,RowClick,DeliveryMarker];
    arrInitMapObjSrcLoc=[mapBrgyNangka,SrcLocInfoWindow,BindInfoWindow,RowClick,SrcLocMarker];
    arrInitMapObjTLoc=[mapBrgyNangka,TLocInfoWindow,BindInfoWindow,RowClick,TLocMarker];



    //eradicates every object displayed on map
    google.maps.event.addDomListener(btnGlobalReset, 'click', function(evt){
        /* arrSrcLocMarkers
        arrTLocMarkers
        arrA5LogDeliveryMarkers */


        for(var i=0;i<arrSrcLocMarkers.length;i++){
            arrSrcLocMarkers[i].setMap(null);
        }
        for(var i=0;i<arrTLocMarkers.length;i++){
            arrTLocMarkers[i].setMap(null);
        }
        for(var i=0;i<arrA5LogDeliveryMarkers.length;i++){
            arrA5LogDeliveryMarkers[i].setMap(null);
        }
        for(var i=0;i<arrDeliveryMarkers.length;i++){
            arrDeliveryMarkers[i].setMap(null);
        }

        /* var arrGlobalReset=[arrSrcLocMarkers,arrTLocMarkers,arrA5LogDeliveryMarkers];

        for(var i=0;i<arrGlobalReset.length;i++){
            var GRObject=arrGlobalReset[i];

            for(var ii=0;ii<GRObject.length;ii++){
                alert(GRObject(ii).label); //(ii).setMap(null); //ayaw talaga :v
            } //alert(GRObject.length);
        } */
    });

    //eradicates source loc & target loc markers displayed on map
    google.maps.event.addDomListener(btnSrcTargtReset, 'click', function(evt){
        for(var i=0;i<arrSrcLocMarkers.length;i++){
            arrSrcLocMarkers[i].setMap(null);
        }
        for(var i=0;i<arrTLocMarkers.length;i++){
            arrTLocMarkers[i].setMap(null);
        }
    });

    google.maps.event.addDomListener(btnSrcLocReset, 'click', function(evt){
        for(var i=0;i<arrSrcLocMarkers.length;i++){
            arrSrcLocMarkers[i].setMap(null);
        }
    });

    google.maps.event.addDomListener(btnTargetLocReset, 'click', function(evt){
        //DeliveryVehicleMarker.setMap(null); //it worked naman :v
        for(var i=0;i<arrTLocMarkers.length;i++){ //alert(arrTLocMarkers.length);
            arrTLocMarkers[i].setMap(null);
        }
        //TLocMarker.setMap(null); //ayaw.. :v
    });

    //eradicates every object displayed on map
    google.maps.event.addDomListener(btnRowIndex, 'click', function(){ //alert('hello!');
        google.maps.event.trigger(arrDeliveryMarkers[arrDeliveryVID.indexOf(txtRowIndex.value)],'click');
		AddCarInfoWindow.open (mapBrgyNangka, DeliveryMarker);
    });


    function FeedLiveNLogDelivery(PickDate,Action){
        if(PickDate!=''){
            arrInitMapObj.push(PickDate);
        }
        
        SearchFirebase(arrInitMapObj,Action,null);
    }return{ FeedLiveNLogDelivery:FeedLiveNLogDelivery}; //so that we can call this inner function later on like this: (new initMap()).FeedLiveNLogDelivery();


	poly = new google.maps.Polyline({
          strokeColor: '#3366cc',
          strokeOpacity: 0.5,
          strokeWeight: 4,
          map: mapBrgyNangka
        });
		
	function RowClick(i){//alert(i);
			google.maps.event.trigger(arrDeliveryMarkers[i],'click');
			infoWindow.open (mapBrgyNangka, DeliveryMarker);
		}
    
    function BindInfoWindow (marker, map, infoWindow, html){
		google.maps.event.addListener (marker,'click', function(){
			infoWindow.setContent (html);
			infoWindow.open (map, marker);
		});
    }

    }//end of initMap()




    
    //NAGLOLOKO KUNG NAKA-DECLARE NA YUNG RowClick()
    //var RowClick=arrInitMapObj[3];
    function AddCarMarker(data){//alert(data.val);

        if(txtAction.value==0){
            var BindInfoWindow=arrInitMapObj[2];
            //var RowClick=arrInitMapObj[3]; //sumasapi sa isang row o nagiging single row yung record kung naka-declare to :v
            var DeliveryCoordinates={lat:parseFloat(data.val().lat),lng:parseFloat(data.val().lng)};
            
            //marker options/settings
            var markerOptions ={
                position    : DeliveryCoordinates,
                map         : mapBrgyNangka,
                label: 'delivery',
                draggable   : false
            };
            // adds the marker
            var DeliveryMarker = new google.maps.Marker(markerOptions);
            //arrLiveDeliveryMarkers.push(DeliveryMarker);
            arrLiveDeliveryMarkers[data.val().vhcId]=DeliveryMarker;
            arrDeliveryMarkers.push(DeliveryMarker); //alert('html');

            setTimeout(function(){
                // adds info window content
                var IndexOfResult=arrQuickInfoVID.indexOf(data.val().vhcId);
                var VehicleDetails=arrQuickInfoVehicle[IndexOfResult]; //alert(VehicleDetails); //SFF-267+Isuzu+Elf NKR
                var html = '<div><strong>'+VehicleDetails.split('+')[0]+'</strong> ('+VehicleDetails.split('+')[1]+' '+VehicleDetails.split('+')[2]+')<br><text>'+data.val().timeStamp+'</text></div>';
                BindInfoWindow (DeliveryMarker, mapBrgyNangka, AddCarInfoWindow, html);

                //listens to tBodyDelivery row clicks
                /* var tr = document.getElementById(data.val().vhcId); //list of vehicles
                google.maps.event.addDomListener (tr,'click',(function(i){//alert(i);
                        return function(){
                            RowClick(i); //ayaw magpakita ng row 0 :v
                        }
                    })(i)
                ); */

                /* function RowClick(i){//alert(i);
                    google.maps.event.trigger(arrDeliveryMarkers[i],'click');
                    infoWindow.open (mapBrgyNangka, DeliveryMarker);
                } */
            },1000);
            

            btnTargetLocReset.click(); //won't eradicate on map
            btnSrcLocReset.click();

            if(IsLnkLiveDeliveryClicked==true){
                lnkLiveDelivery.click();
            }
        }
    }
    
    //listen to tblLiveVeCoordinates for live vehicle delivery
    var LiveDeliveryFBDB=firebase.database();
    var refLDFBDB=LiveDeliveryFBDB.ref('tblLiveVeCoordinates');

    //creates/shows marker on the map for every new live vehicle on delivery
    refLDFBDB.on('child_added',function(data){ AddCarMarker(data);});

    //updates the coordinates of the marker/vehicle on the map
    refLDFBDB.on('child_changed',function(data){
        arrLiveDeliveryMarkers[data.val().vhcId].setMap(null); //vhcId as marker identifier in arrLiveDeliveryMarks array
        AddCarMarker(data);});

    //delivery vehicle goes offline, removes the marker identified as vhcId
    refLDFBDB.on('child_removed',function(data){
        arrLiveDeliveryMarkers[data.val().vhcId].setMap(null);

        btnTargetLocReset.click(); //won't eradicate !
        btnSrcLocReset.click();
        lnkLiveDelivery.click();
        IsLnkLiveDeliveryClicked==false;
    });
	
	

	function calcDistance(p1, p2){
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }

    function MainTabLiveDelivery(){
        txtAction.value=0;
        //arrDeliveryVID=[]; //arrDeliveryMarkers=[];
        arrLogDeliveryVID=[];
        arrSrcLocMarkers=[];
        divLogDelivery.style.display="none";
        ClearTheTables();

        if(arrA5LogDeliveryMarkers.length>0){
            initMap();
        }

        //(new initMap()).FeedLiveNLogDelivery('',2);
        setTimeout(function(){
            SearchFirebase(arrInitMapObj,2,null);
        },700);
        
        clickTabLink(event);
    }
    function MainTabLogDelivery(){
        txtAction.value=1;
        //arrDeliveryVID=[]; //arrDeliveryMarkers=[];
        arrLogDeliveryVID=[];
        arrSrcLocMarkers=[];
        divLogDelivery.style.display="";
        dateLogDeliveryPickDate.value="";
        ClearTheTables();
        clickTabLink(event);
    }
    function ValidateLogDeliveryPickDate(){
        if(dateLogDeliveryPickDate.value!=''){
            
            if(txtLogDeliveryPickDateRetainer.value!=dateLogDeliveryPickDate.value){ //prevents database traffic by not searching the same date again
                arrDeliveryMarkers=[];arrDeliveryVID=[];
                ClearTheTables(); //alert('arrInitMapObj: '+arrInitMapObj);
                //(new initMap()).FeedLiveNLogDelivery(dateLogDeliveryPickDate.value,3);
                //arrInitMapObj.push(String(dateLogDeliveryPickDate.value));
                SearchFirebase(String(dateLogDeliveryPickDate.value),3,null);   
            }

        }else{ alert('Specify the pickup date first before clicking.');} // setTimeout(function(){alert(arrDeliveryVID);},1000);

        txtLogDeliveryPickDateRetainer.value=dateLogDeliveryPickDate.value;
    }
    function ClearTheTables(){
        tBodyDelivery.innerHTML='';
        tBodyItems.innerHTML='';
    }
	function ShowDelivery(row){ //alert(row.id); //arrLogDeliveryVID[row.rowIndex-1]);
		var content=row.cells;
		var input,filter,table,tr,td,i;

        input=content[4].innerHTML; //gets the content of the 1st column of idTable1
		table=document.getElementById('tBodyItems'); //idTable2');
		tr=table.getElementsByTagName('tr');

		for (i=0;i<tr.length;i++){
			td=tr[i].getElementsByTagName('td')[8]; //0 - the first column, this should match the content of the first column of the idTable1
			if (td){ //if there's a data in the row
				if (td.innerHTML.indexOf(input) > -1) { //if the input matched a td
					tr[i].style.display = ""; //displays matched
				} else {
					tr[i].style.display = "none"; //will not display mismatch(es)
				}
			}
        }
        
        //when row clicked, map will display the markers
        if(txtAction.value==1){ //alert(txtAction.value);
            //arrDeliveryMarkers=[]; arrDeliveryMarkers.length=0; //clears the existing markers on the map. prevents over crowding
            initMap(); //using the method setMap(null) to marker won't clear the markers on the map so i have to re-initialize
            var Filter=row.id+' '+dateLogDeliveryPickDate.value; //alert(Filter);
            SearchFirebase(Filter,5,null);
            //(new initMap()).DisplayTravelMarkers(Filter);
        }

        GetRowIndex(row);
    }
    function GetRowIndex(row){
        txtRowIndex.value=row.id; //.rowIndex;

        setTimeout(function(){
            btnRowIndex.click();
        },200);
    }
    function ShowAllDelivery(){
        var table=document.getElementById('tBodyItems'); //idTable2');
        var tr=table.getElementsByTagName('tr');
        for(var i=0;i<tr.length;i++){
            tr[i].style.display = "";
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

    var TLocCounter=0;
    var arrLiveDeliveryTLocCoords=[];
    var arrSrcLocMarkers=[];
    //var arrTLocMarkers=[];
    function SearchFirebase(Filter,Action,objID){
        var FBDB=firebase.database();
        var refFBDB;

        if(Action==0){ //searches by date(YYYY-MM-DD) for tBodyDelivery
            var BindInfoWindow=arrInitMapObj[2];
            var FilterVID=Filter.split(' ')[0];
            var FilterDate=Filter.split(' ')[1];
            var FilterPlateNo=Filter.split(' ')[2];
            var IsError;
            var arrNoOfTLoc=[];
            
            var refFBDB=FBDB.ref('tblDonatedItems').orderByChild('delPick').startAt(FilterDate).endAt(FilterDate+'\uf8ff');

            /* if(txtAction.value==0){
                refFBDB.on('value',RetrieveData,RetrieveError);
            }else if(txtAction.value==1){ */
                refFBDB.once('value',RetrieveData,RetrieveError);
            //}

            function RetrieveData(data){
                //arrInitMapObjSrcLoc=[mapBrgyNangka,SrcLocInfoWindow,BindInfoWindow,RowClick,SrcLocMarker];
                var mapBrgyNangka=arrInitMapObjSrcLoc[0];
                var SrcLocInfoWindow=arrInitMapObjSrcLoc[1];
                var BindInfoWindow=arrInitMapObjSrcLoc[2];
                var RowClick=arrInitMapObjSrcLoc[3];
                var SrcLocMarker=arrInitMapObjSrcLoc[4];
                var TheTable=data.val();
                var TheRows=Object.keys(TheTable);
                var ItemQuickDesc='';

                arrSrcLocMarkers=[];
                //btnSrcTargtReset.click();

                for(var i=0;i<TheRows.length;i++){
                    var k=TheRows[i];

                    var arrDeliveryVIDResult;
                    if(txtAction.value==0){ //alert('Array: '+arrDeliveryVID+'\nvhcId: '+TheTable[k].vhcId);
                        arrDeliveryVIDResult=arrDeliveryVID.indexOf(TheTable[k].vhcId); //this will identify the element by ID
                    }else if(txtAction.value==1){
                        arrDeliveryVIDResult=arrLogDeliveryVID.indexOf(TheTable[k].vhcId); //this will identify the element by ID
                    }
                    

                    if(TheTable[k].itemSubCategory!=''){ //masks the itemSubCategory if null
                        ItemQuickDesc=TheTable[k].itemSubCategory;
                    }else{
                        ItemQuickDesc=TheTable[k].itemDescription;
                    }

                    if(TheTable[k].vhcId==FilterVID){
                        TLocCounter++;//TLocCounter=TLocCounter+1;//alert(TLocCounter);

                        const tdNoOfItemsID='tdNoOfItems'+String(arrDeliveryVIDResult);
                        const tdNoOfSrcLocID='tdNoOfSrcLoc'+String(arrDeliveryVIDResult);
                        const tdNoOfTLocID='tdNoOfTLoc'+String(arrDeliveryVIDResult);//alert('<li>'+TheTable[k].itemQty+' '+TheTable[k].itemUnit+' of '+ItemQuickDesc+'</li>\n'+'<li>'+TheTable[k].srcLoc+'</li>');

                        document.getElementById(tdNoOfItemsID).innerHTML+='<li>'+TheTable[k].itemQty+' '+TheTable[k].itemUnit+' of '+ItemQuickDesc+'</li>';
                        document.getElementById(tdNoOfSrcLocID).innerHTML+='<li>'+TheTable[k].srcLoc+'</li>';
                        document.getElementById(tdNoOfTLocID).innerHTML+='<li id="TLocLi'+TLocCounter+'">'+TheTable[k].tLocId+'</li>';
                        arrNoOfTLoc.push(String('TLocLi'+TLocCounter+' '+TheTable[k].tLocId));

                        //the block of code below creates the marker of source location
                        var SrcLocCoord={lat:parseFloat(TheTable[k].srcLat),lng:parseFloat(TheTable[k].srcLng)};
                        var markerOptions={
                            position: SrcLocCoord,
                            map: mapBrgyNangka,
                            label: 'pickup',
                            draggable: false,
                            icon: {
                                path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                fillColor: '#ff2121', //3da1ff',
                                fillOpacity: 1,
                                scale: 7,
                                strokeColor: '#ff2121',
                                /* strokeWeight: 14 */
                            }
                        };
                        // adds the marker
                        SrcLocMarker = new google.maps.Marker(markerOptions);
                        arrSrcLocMarkers.push(SrcLocMarker);

                        // adds info window content
                        var html = '<div><strong>'+TheTable[k].srcLoc+'</strong></div>';
                        BindInfoWindow (SrcLocMarker, mapBrgyNangka, SrcLocInfoWindow, html); //alert('does..');
                    }
                    
                }//alert(arrNoOfTLoc);
            }

            function RetrieveError(error){
                IsError=error;

                document.getElementById(FilterVID).innerHTML='<td><b>'+FilterVID+'</b></td><td colspan="3">'+error+'</td>';
            }

            //retrieves target location details to mask the 'No. of Target Loc'
            setTimeout(function(){
                if(IsError==null){
                    var mapBrgyNangka=arrInitMapObjTLoc[0];
                    var TLocInfoWindow=arrInitMapObjTLoc[1];
                    var BindInfoWindow=arrInitMapObjTLoc[2];
                    var RowClick=arrInitMapObjTLoc[3];
                    var TLocMarker=arrInitMapObjTLoc[4];
                    //var arrRetrievedTLocID=[];
    
                    refFBDB=FBDB.ref('tblTargetLoc');
                    refFBDB.once('value',function(data){
                        var TheTable=data.val();
                        var TheRows=Object.keys(TheTable);

                        arrTLocMarkers=[];

                        for(var i=0;i<arrNoOfTLoc.length;i++){
                            var arrNOTLObjID=arrNoOfTLoc[i].split(' ')[0]; 
                            var arrNOTLTLocID=arrNoOfTLoc[i].split(' ')[1];

                            for(var ii=0;ii<TheRows.length;ii++){
                                var k=TheRows[ii];

                                if(k==arrNOTLTLocID){
                                    document.getElementById(arrNOTLObjID).innerHTML=TheTable[k].tLocName+' | '+TheTable[k].tLocAddress;

                                    //the block of code below creates the marker of source location
                                    var TLocCoord={lat:parseFloat(TheTable[k].tLocLat),lng:parseFloat(TheTable[k].tLocLng)};
                                    var markerOptions={
                                        position: TLocCoord,
                                        map: mapBrgyNangka,
                                        label: 'drop off',
                                        draggable: false,
                                        icon: {
                                            path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                            fillColor: '#2377ff', //41e835',
                                            fillOpacity: 1,
                                            scale: 7,
                                            strokeColor: '#2377ff', //41e835',
                                            /* strokeWeight: 14 */
                                        }
                                    }; //alert('olah!'); //went in for live tab but not for log tab :(
                                    // adds the marker
                                    TLocMarker = new google.maps.Marker(markerOptions);
                                    arrTLocMarkers.push(TLocMarker);
                                    //arrSrcLocMarkers.push(TLocMarker);

                                    // adds info window content
                                    var html = '<div><strong>'+TheTable[k].tLocName+'</strong><br>'+
                                    TheTable[k].tLocAddress+'</div>';
                                    BindInfoWindow (TLocMarker, mapBrgyNangka, TLocInfoWindow, html); //alert('does..');
                                }
                            }
                        }
                        
                    },function(error){ /* no handle */});
                }
            },1000);

            //i removed the vehicle picture in TBodyDelivery 'coz it triplicates every interval
            //downloads the vehicle picture
            /* setTimeout(function(){
                refFBDB=FBDB.ref('tblVehicle').child(FilterVID);//.child('vhcPnum').equalTo(FilterPlateNo);
                refFBDB.once('value',function(data){
                    var TheTable=data.val();
                    var imgTagID=String(FilterPlateNo)+String(FilterPlateNo);
                    var GetInnerText=document.getElementById(FilterPlateNo).innerHTML;
                    document.getElementById(FilterPlateNo).innerHTML='<img id="'+imgTagID+'" src="" class="smallImage">'+GetInnerText;
                    
                    DownloadPicture('vehicle_pictures',TheTable.imgName,document.getElementById(imgTagID));    
                    
                },function(error){//no handle
                });
            },1000); */
            
        }else if(Action==1){ //populates tBodyItems
            var FilterVID=Filter.split(' ')[0];
            var FilterDate=Filter.split(' ')[1];
            var FilterPlateCut=Filter.split(' ')[2];
            var IsError='';
            var refFBDB=FBDB.ref('tblDonatedItems').orderByChild('delPick').startAt(FilterDate).endAt(FilterDate+'\uf8ff');
            refFBDB.on('value',function(data){
                if(data.exists()){
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    for(var i=0;i<TheRows.length;i++){
                        var k=TheRows[i];
                        var DeliveryStatus='';
                        var Donation=TheTable[k].itemQty+' '+TheTable[k].itemUnit+' of '+TheTable[k].itemDescription;

                        if(TheTable[k].delStatus==0){
                            DeliveryStatus='Picking up';
                        }else if(TheTable[k].delStatus==1){
                            DeliveryStatus='Droping off';
                        }else if(TheTable[k].delStatus==2){
                            DeliveryStatus='Cancelled';
                        }else if(TheTable[k].delStatus==3){
                            DeliveryStatus='On going';
                        }

                        if(TheTable[k].vhcId==FilterVID){
                            objID.innerHTML+='<tr><td style="font-weight:bold;">'+TheTable[k].donorId+'</td>'+
                            '<td>please wait...</td>'+ //donor organization
                            //'<td>'+Donation+'</td>'+
                            '<td><img src="'+TheTable[k].imageUrl+'" class="smallImage"></td>'+
                            '<td>'+Donation+'</td>'+
                            //'<td>'+TheTable[k].srcLoc+'</td>'+
                            //'<td>'+TheTable[k].tLocId+'</td>'+ //drop off loc (name | address)
                            '<td>'+TheTable[k].itemPledgeDate+'</td>'+
                            '<td>'+TheTable[k].delPick+'</td>'+
                            '<td>'+TheTable[k].delDrop+'</td>'+
                            '<td>'+DeliveryStatus+'</td>'+
                            '<td class="hide">'+FilterPlateCut+'</td>'+ 
                            '</tr>'; //the use of this hidden string is to compare it to other rows. string that don't
                            //match with the row on tBodyDelivery will be hidden. rows that matches the string, on the
                            //other hand, will be shown
                        }
                    }
                }
            },function(error){ IsError=error;});

            if(IsError==''){
                //get donor details from tblUsers
                setTimeout(function(){ //alert('uh!');
                    refFBDB=FBDB.ref('tblUsers');
                    refFBDB.once('value',function(data){
                        if(data.exists()){
                            var TheTable=data.val();
                            var TheRows=Object.keys(TheTable); //alert(objID.rows[0].cells[0].innerHTML);

                            for(var i=0;i<objID.rows.length;i++){
                                var tBodyItemsDonorID=objID.rows[i].cells[0].innerHTML;//alert(tBodyItemsDonorID);

                                for(var ii=0;ii<TheRows.length;ii++){
                                    var k=TheRows[ii];//alert(k+' == '+tBodyItemsDonorID);//alert(k);
                                    //alert(k+' == '+tBodyItemsDonorID+' is '+k==tBodyItemsDonorID);
                                    if(TheTable[k].donorId==tBodyItemsDonorID){
                                        objID.rows[i].cells[0].innerHTML=TheTable[k].userFname+' '+TheTable[k].userLname;
                                        //objID.rows[i].cells[1].innerHTML=TheTable[k].userOrg;

                                        //fetch donorOrg from tblDonors
                                        //setTimeout(function(){
                                            var HoldQueryResult="";
                                            refFBDB=FBDB.ref('tblDonors').orderByChild('donorId').equalTo(TheTable[k].donorId);
                                            refFBDB.once('value',function(data){
                                                if(data.exists()){
                                                    var TheNewTable=data.val();
                                                    var TheNewRows=Object.keys(TheNewTable); //alert(objID.rows[0].cells[0].innerHTML);
                                                    //objID.rows[i].cells[1].innerHTML=TheNewTable[TheNewRows[0]].donorOrg;
                                                    HoldQueryResult=TheNewTable[TheNewRows[0]].donorOrg;
                                                }else{
                                                    HoldQueryResult="N/A";
                                                }
                                            });
                                        //},700);

                                        setTimeout(function(){
                                            //variable i increments by 1 when called inside the setTimeout so, we need to subtract by 1
                                            objID.rows[i-1].cells[1].innerHTML=HoldQueryResult;
                                            //document.getElementById("tBodyItems").rows[i-1].cells[1].innerHTML=HoldQueryResult;
                                        },700);
                                    }
                                }
                            }
                        }else{ //get donor details from tblDonors if data does not exist in tblUsers
                            refFBDB=FBDB.ref('tblDonors');
                            refFBDB.once('value',function(data){
                                if(data.exists()){
                                    var TheTable=data.val();
                                    var TheRows=Object.keys(TheTable); //alert(objID.rows[0].cells[0].innerHTML);

                                    for(var i=0;i<objID.rows.length;i++){
                                        var tBodyItemsDonorID=objID.rows[i].cells[0].innerHTML;//alert(tBodyItemsDonorID);

                                        for(var ii=0;ii<TheRows.length;ii++){
                                            var k=TheRows[ii];//alert(k+' == '+tBodyItemsDonorID);//alert(k);
                                            //alert(k+' == '+tBodyItemsDonorID+' is '+k==tBodyItemsDonorID);
                                            if(k==tBodyItemsDonorID){
                                                objID.rows[i].cells[0].innerHTML=TheTable[k].donorFname+' '+TheTable[k].userLname;
                                                objID.rows[i].cells[1].innerHTML=TheTable[k].donorOrg;
                                            }
                                        }
                                    }
                                }
                            });
                        }
                        
                    },function(error){ /* no handle */});
                    
                },2000);

                //get target location details
                setTimeout(function(){
                    refFBDB=FBDB.ref('tblTargetLoc');
                    refFBDB.once('value',function(data){
                        var TheTable=data.val();
                        var TheRows=Object.keys(TheTable); //alert(objID.rows[0].cells[0].innerHTML);

                        for(var i=0;i<objID.rows.length;i++){
                            var tBodyItemsTLocID=objID.rows[i].cells[4].innerHTML;//alert(tBodyItemsDonorID);

                            for(var ii=0;ii<TheRows.length;ii++){
                                var k=TheRows[ii];

                                if(k==tBodyItemsTLocID){
                                    objID.rows[i].cells[4].innerHTML=TheTable[k].tLocName+' '+TheTable[k].tLocAddress;
                                }
                            }
                        }
                    },function(error){});
                    
                },2000);
            }
            
        }else if(Action==2){ //search for live vehicle coordinates.
            var mapBrgyNangka=Filter[0];
            var infoWindow=Filter[1];
            var BindInfoWindow=Filter[2];
            var RowClick=Filter[3];
            //var FilterDate=Filter[4];
            var refFBDB=FBDB.ref('tblLiveVeCoordinates');

            refFBDB.once('value',function(data){ //alert(data.exists());
                ClearTheTables();
                if(data.exists()){ //alert(data.exists());
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    arrDeliveryVID=[];

                    for(var i=0;i<TheRows.length;i++){
                        var k=TheRows[i];

                        var vVID = TheTable[k].vhcId;
                        arrDeliveryVID.push(String(vVID));
                        //arrRowIndex.push(parseInt(RowIndexCtr++));

                        /* if(TheTable[k].travelId!=''||TheTable[k].travelId!=""){ //alert(TheTable[k].travelId);
                            var vTravelId=TheTable[k].travelId;
                            var vTimeStamp = TheTable[k].timeStamp;
                            //var vPoint = {lat:parseFloat(TheTable[k].lat),lng:parseFloat(TheTable[k].lng)};
                            //var vVID = TheTable[k].vhcId;
                            var vTravelIdLen=vTravelId.length;
                            var EndPos=vTravelIdLen-14;
                            var vPlateNo=vTravelId.substring(0,EndPos); //alert(vPlateNo);

                            //arrDeliveryVID.push(String(vVID));

                            var td0ID=vPlateNo.replace('-',''); */
                            //if(tBodyDelivery.innerHTML!=''){
                                var IndexOfResult=arrQuickInfoVID.indexOf(vVID);//arrQuickInfoVID.indexOf(vVID);
                                var VehicleDetails=arrQuickInfoVehicle[IndexOfResult];
                                var vTimeStamp = TheTable[k].timeStamp;
                                var vPlateNo=VehicleDetails.split('+')[0];
                                var td0ID=vPlateNo.replace('-','');
                                tBodyDelivery.innerHTML+='<tr id="'+vVID+'" style="cursor:pointer;" onclick="ShowDelivery(this);">'+
                                '<td id="'+td0ID+'" style="text-align:center;font-weight:bold;">'+vPlateNo+'</td>'+
                                '<td id="tdNoOfItems'+i+'"></td>'+
                                '<td id="tdNoOfSrcLoc'+i+'"></td>'+
                                '<td id="tdNoOfTLoc'+i+'"></td>'+
                                '<td class="hide">'+td0ID+'</td></tr>';//alert(tBodyDelivery.innerHTML);
                            /* }else if(tBodyDelivery.innerHTML==''){
                                tBodyDelivery.innerHTML='<tr id="'+vVID+'" style="cursor:pointer;" onclick="ShowDelivery(this);">'+
                                '<td id="'+td0ID+'" style="text-align:center;font-weight:bold;">'+vPlateNo+'</td>'+
                                '<td id="tdNoOfItems'+i+'"></td>'+
                                '<td id="tdNoOfSrcLoc'+i+'"></td>'+
                                '<td id="tdNoOfTLoc'+i+'"></td>'+
                                '<td class="hide">'+td0ID+'</td></tr>';//alert(tBodyDelivery.innerHTML);
                            } */

                            //listens to tBodyDelivery row clicks
                            /* var tr = document.getElementById(vVID); //list of vehicles
                            google.maps.event.addDomListener (tr,'click',(function(i){
                                    return function(){
                                        RowClick(i); //ayaw magpakita ng row 0 :v
                                    }
                                })(i)
                            ); */
//alert(arrDeliveryVID);
                            //fill the tables with data
                            var GetDateFromTimeStamp=vTimeStamp.split(' ')[0];
                            var FilterData=vVID+' '+GetDateFromTimeStamp+' '+td0ID; //alert(FilterData);
                            SearchFirebase(FilterData,0,tBodyDelivery);//DateTimeNow(5),0,tBodyDelivery);
                            SearchFirebase(FilterData,1,tBodyItems);
                            SearchFirebase(vVID,7,null);
                        /* }else{ //alert(arrQuickInfoVID+'\n'+arrQuickInfoVehicle);
                            var vVID = TheTable[k].vhcId;

                            var IndexOfResult=arrQuickInfoVID.indexOf(vVID);//arrQuickInfoVID.indexOf(vVID);
                            var VehicleDetails=arrQuickInfoVehicle[IndexOfResult];
                            var vTimeStamp = TheTable[k].timeStamp;
                            var vPlateNo=VehicleDetails.split('+')[0];
                            var td0ID=vPlateNo.replace('-','');
                            //if(tBodyDelivery.innerHTML!=''){
                                tBodyDelivery.innerHTML+='<tr id="'+vVID+'" onclick="GetRowIndex(this);">'+
                                '<td id="'+td0ID+'" style="text-align:center;font-weight:bold;">'+vPlateNo+' (idle)</td>'+
                                '<td></td>'+
                                '<td></td>'+
                                '<td></td>'+
                                '<td class="hide">'+td0ID+'</td></tr>'; */ //alert(tBodyDelivery.innerHTML);
                            /* }else if(tBodyDelivery.innerHTML==''){
                                tBodyDelivery.innerHTML='<tr id="'+vVID+'" onclick="GetRowIndex(this);">'+
                                '<td id="'+td0ID+'" style="text-align:center;font-weight:bold;">'+vPlateNo+' (idle)</td>'+
                                '<td></td>'+
                                '<td></td>'+
                                '<td></td>'+
                                '<td class="hide">'+td0ID+'</td></tr>';//alert(tBodyDelivery.innerHTML);
                            } */
                            
                        //}
                        

                    }
                }else{
                    var msgNoExistData='There are no live delivery event to show.';
                    tBodyDelivery.innerHTML='<tr><td colspan="4" style="text-align:center;font-weight:bold;">'+msgNoExistData+'</td></tr>';
                    tBodyItems.innerHTML='';
                }

            },function(error){});
        }else if(Action==3){ //search for log vehicle VIDs with regards to the given date
            var arrUnfilteredVID=[];

            refFBDB=FBDB.ref('tblLogVeCoordinates').orderByChild('timeStamp').startAt(Filter).endAt(Filter+'\uf8ff');
            refFBDB.once('value',function(data){ //alert(data.exists());
                if(data.exists()){
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    for(var i=0;i<TheRows.length;i++){
                        var k=TheRows[i];
                        arrUnfilteredVID.push(TheTable[k].vhcId); //influx of VIDs from tblLogVeCorrdinates
                        arrLogDeliveryVID = Array.from(new Set(arrUnfilteredVID));//alert(arrDeliveryVID);
                    } //alert(arrUnfilteredVID.length);

                    setTimeout(function(){
                        SearchFirebase(Filter,4,tBodyDelivery);
                    },1000);

                }else{
                    var msgNoExistData='There are no delivery event to show on this date.';
                    tBodyDelivery.innerHTML='<tr><td colspan="4" style="text-align:center;font-weight:bold;">'+msgNoExistData+'</td></tr>';
                    tBodyItems.innerHTML='';
                }

            },function(error){
                tBodyDelivery.innerHTML='<tr><td colspan="4" style="text-align:center;font-weight:bold;">'+error+'</td></tr>';
                tBodyItems.innerHTML='';
            });

        }else if(Action==4){ //searches for vehicle plate number to be displayed in tBodyDelivery
            refFBDB=FBDB.ref('tblVehicle');//.orderByChild('timeStamp').startAt(FilterDate).endAt(FilterDate+'\uf8ff');
            refFBDB.once('value',function(data){ //alert(data.exists());
                if(data.exists()){ //alert(arrDeliveryVID);
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    for(var i=0;i<TheRows.length;i++){
                        var k=TheRows[i]; //alert(k);
                        var IndexOfResult=arrLogDeliveryVID.indexOf(k);//alert(arrDeliveryVID+' '+k+' = '+IndexOfResult);
                        if(IndexOfResult>-1){//alert('indexOf result: '+IndexOfResult+'\nPlate number: '+TheTable[k].vhcPnum)
                            var td0ID=(TheTable[k].vhcPnum).replace('-','');

                            objID.innerHTML+='<tr id="'+k+'" style="cursor:pointer;" onclick="ShowDelivery(this);">'+
                            '<td id="'+td0ID+'" style="text-align:center;"><b>'+TheTable[k].vhcPnum+'</b></td>'+
                            '<td id="tdNoOfItems'+IndexOfResult+'"></td>'+
                            '<td id="tdNoOfSrcLoc'+IndexOfResult+'"></td>'+
                            '<td id="tdNoOfTLoc'+IndexOfResult+'"></td>'+
                            '<td class="hide">'+td0ID+'</td></tr>'; //alert(objID.innerHTML);

                            //fill the tables with data
                            var FilterData=k+' '+Filter+' '+td0ID;//alert(FilterData);
                            SearchFirebase(FilterData,0,tBodyDelivery);
                            SearchFirebase(FilterData,1,tBodyItems);
                        }
                    }

                        /* var markerOptions ={
                            position    : vPoint,
                            map         : mapBrgyNangka,
                            label: vPlateNo,
                            draggable   : false
                        };

                        // adds the marker
                        DeliveryMarker = new google.maps.Marker(markerOptions);
                        arrDeliveryMarkers.push(DeliveryMarker);

                        // adds info window content
                        var html = '<div><strong>'+vPlateNo+'</strong><br><text>'+vTimeStamp+'</text></div>';
                        BindInfoWindow (DeliveryMarker, mapBrgyNangka, infoWindow, html);

                        //listens to tBodyDelivery row clicks
                        var tr = document.getElementById(vVID); //list of vehicles
                        google.maps.event.addDomListener (tr,'click',(function(i){
                                return function(){
                                    RowClick(i); //ayaw magpakita ng row 0 :v
                                }
                            })(i)
                        ); */

                        

                    //}
                }else{
                    var msgNoExistData='There are no delivery event to show on this date.';
                    tBodyDelivery.innerHTML='<tr><td colspan="4" style="text-align:center;font-weight:bold;">'+msgNoExistData+'</td></tr>';
                    tBodyItems.innerHTML='';
                }
            },function(error){
                tBodyDelivery.innerHTML='<tr><td colspan="4" style="text-align:center;font-weight:bold;">'+error+'</td></tr>';
                tBodyItems.innerHTML='';
            });
        }else if(Action==5){//search by date and vehicle ID. push the markers in an array then display it on map
            var mapBrgyNangka=arrInitMapObj[0]; //Filter[0];
            var infoWindow=arrInitMapObj[1]; //Filter[1];
            var BindInfoWindow=arrInitMapObj[2]; //Filter[2];
            //var RowClick=Filter[3];
            var DeliveryMarker=arrInitMapObj[4]; //Filter[4];
            var FilterVID=Filter.split(' ')[0];
            var FilterDate=Filter.split(' ')[1];
            var IsError='';
            var refFBDB=FBDB.ref('tblLogVeCoordinates').orderByChild('timeStamp').startAt(FilterDate).endAt(FilterDate+'\uf8ff');
            refFBDB.once('value',function(data){
                if(data.exists()){
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    arrA5LogDeliveryMarkers=[];

                    for(var i=0;i<TheRows.length;i++){//arrDeliveryMarkers=[]; arrDeliveryMarkers.length=0;//hindi talaga nabubura :(
                        var k=TheRows[i];

                        if(TheTable[k].vhcId==FilterVID){
                            var vTimeStamp = TheTable[k].timeStamp;
                            var vPoint = {lat:parseFloat(TheTable[k].lat),lng:parseFloat(TheTable[k].lng)}; //alert(vPoint.lat);
                            /* var vTravelId=TheTable[k].travelId
                            var vTravelIdLen=vTravelId.length;
                            var EndPos=vTravelIdLen-14;
                            var vPlateNo=vTravelId.substring(0,EndPos); */
                            var IndexOfResult=arrQuickInfoVID.indexOf(FilterVID);//arrQuickInfoVID.indexOf(vVID);
                                var VehicleDetails=arrQuickInfoVehicle[IndexOfResult];
                                var vTimeStamp = TheTable[k].timeStamp;
                                var vPlateNo=VehicleDetails.split('+')[0]; //alert(vPlateNo);
                                //var td0ID=vPlateNo.replace('-','');
                            var markerOptions ={
                                position    : vPoint,
                                map         : mapBrgyNangka,
                                label: vPlateNo,
                                draggable   : false
                            };
    
                            // adds the marker
                            DeliveryMarker = new google.maps.Marker(markerOptions);
                            arrA5LogDeliveryMarkers.push(DeliveryMarker);
    
                            // adds info window content
                            var html = '<div><strong>'+vPlateNo+'</strong><br><text>'+vTimeStamp+'</text></div>';
                            BindInfoWindow (DeliveryMarker, mapBrgyNangka, infoWindow, html);
                        }
                    }
                }else{ }
            },function(error){
                IsError=error;
            });

            setTimeout(function(){
                if(IsError==''){
                    var FilterData=FilterVID+'+'+FilterDate;
                    SearchFirebase(FilterData,8,null); //searches for source loc/lat/lng then, create markers and display it on map
                }
            },1000);
        }else if(Action==6){ //paunang dunong sa sasakyang makikita sa mapa na walang travelId
            var refFBDB=FBDB.ref('tblVehicle');//.child(Filter);
            refFBDB.once('value',function(data){
                if(data.val()){
                    var TheTable=data.val();
                    var TheRows=Object.keys(TheTable);

                    arrQuickInfoVID=[];
                    arrQuickInfoVehicle=[];

                    //arrQuickInfoVID.push(String(Filter));
                    //arrQuickInfoVehicle.push(TheTable.vhcPnum+'+'+TheTable.vhcMake+'+'+TheTable.vhcModel);
                    for(var i=0;i<TheRows.length;i++){
                        var k=TheRows[i];

                        arrQuickInfoVID.push(k);//TheTable[k].vhcId);
                        arrQuickInfoVehicle.push(String(TheTable[k].vhcPnum+'+'+TheTable[k].vhcMake+'+'+TheTable[k].vhcModel));
                    }//alert(arrQuickInfoVID);
                }
            });
        }else if(Action==7){ //feeds current vehicle status from tblLivePost
            const FormerInnerText=tBodyDelivery.rows.namedItem(Filter).cells[0].innerHTML;
            var refFBDB=FBDB.ref('tblLivePost').child(Filter);
            refFBDB.on('value',function(data){
                var DataVal=data.val();
                var TaskStatMask;
                

                if(DataVal.taskStatus==0){
                    TaskStatMask='idle';
                }else if(DataVal.taskStatus==1){
                    TaskStatMask='pick up';
                }else if(DataVal.taskStatus==2){
                    TaskStatMask='on going';
                }

                tBodyDelivery.rows.namedItem(Filter).cells[0].innerHTML=FormerInnerText+' ('+TaskStatMask+')';
            });
        }else if(Action==8){ //searches for source loc and target loc then create markers of it
            var FilterVID=Filter.split('+')[0];
            var FilterDate=Filter.split('+')[1];
            var arrA8TLocID=[];
            var refFBDB=FBDB.ref('tblDonatedItems').orderByChild('delPick').startAt(FilterDate).endAt(FilterDate+'\uf8ff');
            refFBDB.once('value',function(data){
                var TheTable=data.val();
                var TheRows=Object.keys(TheTable);
                var mapBrgyNangka=arrInitMapObjSrcLoc[0];
                var SrcLocInfoWindow=arrInitMapObjSrcLoc[1];
                var BindInfoWindow=arrInitMapObjSrcLoc[2];
                var RowClick=arrInitMapObjSrcLoc[3];
                var SrcLocMarker=arrInitMapObjSrcLoc[4];

                arrSrcLocMarkers=[];
                arrA8TLocID=[];

                for(var i=0;i<TheRows.length;i++){
                    var k=TheRows[i];

                    if(TheTable[k].vhcId==FilterVID){
                        arrA8TLocID.push(String(TheTable[k].tLocId));
                        var SrcLocCoord={lat:parseFloat(TheTable[k].srcLat),lng:parseFloat(TheTable[k].srcLng)};
                        var markerOptions={
                            position: SrcLocCoord,
                            map: mapBrgyNangka,
                            label: 'pickup',
                            draggable: false,
                            icon: {
                                path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                fillColor: '#ff2121', //3da1ff',
                                fillOpacity: 1,
                                scale: 7,
                                strokeColor: '#ff2121', //3da1ff',
                                /* strokeWeight: 14 */
                            }
                        };
                        // adds the marker
                        SrcLocMarker = new google.maps.Marker(markerOptions);
                        arrSrcLocMarkers.push(SrcLocMarker);

                        // adds info window content
                        var html = '<div><strong>'+TheTable[k].srcLoc+'</strong></div>';
                        BindInfoWindow (SrcLocMarker, mapBrgyNangka, SrcLocInfoWindow, html);
                    }
                } //alert(arrA8TLocMarkers);
            }); //alert(arrSrcLocMarkers.length);

            //arrays the target location data
            var arrTLocCoords=[];
            var arrTLocID=[];
            var arrTLocData=[];
            setTimeout(function(){
                    refFBDB=FBDB.ref('tblTargetLoc');
                    refFBDB.once('value',function(data){
                        var TheTable=data.val();
                        var TheRows=Object.keys(TheTable);

                        for(var i=0;i<TheRows.length;i++){
                            var k=TheRows[i];

                            arrTLocID.push(String(k));
                            arrTLocCoords.push(String(TheTable[k].tLocLat+' '+TheTable[k].tLocLng));
                            arrTLocData.push(String(TheTable[k].tLocName+'+'+TheTable[k].tLocAddress));
                        }

                    },function(error){ /* no handle */});
            },1000);

            //creates marker for target location/evacuation
            setTimeout(function(){
                var mapBrgyNangka=arrInitMapObjTLoc[0];
                var TLocInfoWindow=arrInitMapObjTLoc[1];
                var BindInfoWindow=arrInitMapObjTLoc[2];
                var RowClick=arrInitMapObjTLoc[3];
                var TLocMarker=arrInitMapObjTLoc[4];

                arrTLocMarkers=[];

                        for(var ii=0;ii<arrA8TLocID.length;ii++){
                            var IndexOfResult=arrTLocID.indexOf(arrA8TLocID[ii]); //alert(arrA8TLocID[ii]+'\n'+arrTLocID.length);

                            if(IndexOfResult>-1){ //the culprit!
                                var TheLat=arrTLocCoords[IndexOfResult].split(' ')[0];
                                var TheLng=arrTLocCoords[IndexOfResult].split(' ')[1];

                                //the block of code below creates the marker of target location
                                var TLocCoord={lat:parseFloat(TheLat),lng:parseFloat(TheLng)};
                                var markerOptions={
                                    position: TLocCoord,
                                    map: mapBrgyNangka,
                                    label: 'drop off',
                                    draggable: false,
                                    icon: {
                                        path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                        fillColor: '#2377ff', //41e835',
                                        fillOpacity: 1,
                                        scale: 7,
                                        strokeColor: '#2377ff', //41e835',
                                        /* strokeWeight: 14 */
                                    }
                                };
                                // adds the marker
                                TLocMarker = new google.maps.Marker(markerOptions);
                                arrTLocMarkers.push(TLocMarker);

                                // adds info window content
                                var TheName=arrTLocData[IndexOfResult].split('+')[0];
                                var TheAddress=arrTLocData[IndexOfResult].split('+')[1];
                                var html = '<div><strong>'+TheName+'</strong><br>'+
                                TheAddress+'</div>';
                                BindInfoWindow (TLocMarker, mapBrgyNangka, TLocInfoWindow, html); //alert('does..');
                            }
                        }
            },2500);
        }
    }

    function DownloadPicture(FolderName,ImageName,objID){
        var FBStore=firebase.storage();
        var refFBStore=FBStore.ref(FolderName+'/'+ImageName);

        refFBStore.getDownloadURL().then(function(url){
            objID.src=url;//alert(objID.innerHTML);
            /* if(objID!=null){
                objID.src=url;
            }else{
                return url;
            } */
            //alert(objID);
        }).catch(function(error){
            //no handle ..
        });
    }

    function clickTabLink(evt) {
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
    }
    
    function PreLoad(){
        SearchFirebase(null,6,null);

        setTimeout(function(){
            lnkLiveDelivery.click();
            IsLnkLiveDeliveryClicked=true;
        },1000);

    }