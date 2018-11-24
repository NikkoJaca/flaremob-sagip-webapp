<!DOCTYPE html>
<html lang="en">
    <head>

    </head>

    <body>
    <div class="modal-dialog modal-md">
        
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header modal-color">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="color:white;">Donate Money</h4>
                </div>
                <div class="modal-body modal-image">
                    <div class="row">
                        <div class="col-md-6"><input type="number" class="form-control" id="cash_amount" placeholder="How much do you want to donate?" name="cash_amount"></div>
                        <div class="col-md-6"><h4>Php</h4></div>

                    </div>
                    <span id="span1"></span>
                    <img id="VehicleImg" name="VehicleImg" src="no_image.png" width="500dp" height="300dp"/><br>
                    <input type="file" id="ImageOpen" name="ImageOpen" onchange="openImage(event);" accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG" />
                    <input type="text" id="txtCompareName" />
                </div>
                <div class="modal-footer modal-color">
                <button id="btnUpload" class="btn btn-modal"onclick="UploadImage();">Upload</button>
                </div>
            </div>
        
        </div>
    </body>
</html>