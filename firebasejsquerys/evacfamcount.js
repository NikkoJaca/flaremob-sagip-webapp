
  var database = firebase.database().ref();
  const auth = firebase.auth();

  var posts = firebase.database().ref().child("Resident Allocation");
  var total_family_count = 0;

  var alloc = $('#alloc').DataTable({
    "bPaginate": true,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "searching": true,
    "pageLength": 8});
  
    posts.on("child_added", snap=>{
    
      var famName = snap.child("FamilyName").val();
      var famCount = parseInt(snap.child("FamilyCount").val());
      var famMembers = snap.child("FamilyMembers").numChildren();  

      if (famCount!=0){
        total_family_count += famCount;
      }
        
      var dataset = [famName,famCount,famMembers];
  
      alloc.rows.add([dataset]).draw();
    
    });
  