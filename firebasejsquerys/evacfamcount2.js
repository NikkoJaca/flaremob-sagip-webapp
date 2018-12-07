var database = firebase.database().ref();
const auth = firebase.auth();

var posts = firebase.database().ref().child("tblUsers");
var residents = firebase.database().ref().child("tblResidence");
var residents2 = firebase.database().ref().child("tblResidence");


var alloc = $('#alloc').DataTable({
    "bPaginate": true,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "searching": true,
    "pageLength": 8});
  
    posts.on("child_added", snap=>{
    
      var fname = snap.child("userFname").val();
      var lname = snap.child("userLname").val();
      var name = fname + " " + lname;

      var address = snap.child("userAddress").val();

      var evacId = snap.child("userEvacId").val();

      var evacAssign = "";

      if (evacId === "TLOC20181023070849440"){
        evacAssign = "Nangka High School"
      }
      else if (evacId === "TLOC20181023071503704"){
        evacAssign = "Ateneoville"
      }
      else if(evacId === "TLOC20181023070504196"){
        evacAssign = "Nangka Elementary School";
      }

      var evacStatus = snap.child("evacStatus").val();

      // if (posts.hasChild("evacStatus")){
          if (evacStatus == 0){
              evacStatus = "Have not evacuated";
          }
          else if (evacStatus == 1){
              evacStatus = "Evacuated";
          }else{
              evacStatus = "Have not evacuated";
          }
/*      }else{
          evacStatus = "Have not evacuated";
      }*/

      var dataset = [name, address, evacAssign, evacStatus];

      alloc.rows.add([dataset]).draw();
    
    });

    var dataset2 =[];
    var key = "";
    var famMembers = [];                

    var famAlloc = $('#famalloc').DataTable({
      "bPaginate": true,
      "bLengthChange": false,
      "bFilter": true,
      "bInfo": false,
      "searching": true,
      "pageLength": 8});

    
      residents.on("child_added", snap=>{
        var famname = snap.child("familyName").val();
        var famcount = snap.child("familyCount").val();
        key = snap.key;
        var familyMembers = residents.child(key).child("FamilyMembers");
        famMembers = [];            
        

        familyMembers.on("child_added", snap2=>{
          var famname = snap2.child("fmName").val();
          var famstatus = snap2.child("fmStatus").val();
          var fam = famname + " : " + famstatus;
            famMembers.push(famname);            
          
        });
        

        dataset2 = [famname, famcount, famMembers];
        famAlloc.rows.add([dataset2]).draw();        
        
      });
      console.log(famMembers);

      

      
    