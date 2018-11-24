var config = {
    apiKey: "AIzaSyC8soYRO3h0rz-uraxBXjGb-QyFPUnw15U",
    authDomain: "flaremob-alisto1.firebaseapp.com",
    databaseURL: "https://flaremob-alisto1.firebaseio.com",
    projectId: "flaremob-alisto1",
    storageBucket: "flaremob-alisto1.appspot.com",
    messagingSenderId: "184613341230"
  };
  
  firebase.initializeApp(config);
var FBStore=firebase.storage();
var selectedFile = null;
var extFile = null;

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
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
        if (selectedFile.size>2097152){
            alert('The file size of the image that you selected exceeds 2MB. Please choose an image with lower file size.');
            FileOpenReset();
        }else{
            if (imgtag.title!='no_image.png'){
                reader.readAsDataURL(selectedFile); //loads the image/result to idVehicleImg
                //alert('new image selected.');
                txtCompareName.value=imgtag.title;
            }else{
                alert('Please choose an image other than the default image.');
                FileOpenReset();
            }
        }
    }else{
        alert('Please choose a file with a file extension of JPG, JPEG or, PNG');
        FileOpenReset();
    }

    function FileOpenReset(){
        document.getElementById('ImageOpen').value='';
        document.getElementById('VehicleImg').src='no_image.png';
    }
}

function UploadImage(){
    var metaData={contentType: 'image/'+extFile, name:txtCompareName.value};
    var refFBStore=FBStore.ref('upload_img/'+txtCompareName.value).put(selectedFile,metaData);
    
    refFBStore.on('state_changed',function(data){
        var progress=(data.bytesTransferred / data.totalBytes)*100;
        span1.innerHTML='Progress: '+progress;
    },function(error){
        span1.innerHTML='Error: '+error.code;
    },function(){
        span1.innerHTML='Image '+txtCompareName.value+' was successfully uploaded.';
    });
}