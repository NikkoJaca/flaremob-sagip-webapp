<div class="modal-dialog modal-md">
    
    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header modal-color">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" style="color:white;">Donate Clothes</h4>
        </div>
        <div class="modal-body modal-image">
            <form class="form-horizontal" action="/action_page.php">
        
                    <div class="form-group">
                        <table class="table table-hover">
                        <thead>
                            <th class="col-md-3">Quantity</th>
                            <th class="col-md-2">Unit</th>
                            <th class="col-md-3">Description</th>
                        </thead>
                            <tbody>
                                <tr>                          
                                    <td><input type="text" class="form-control" id="cl_q" placeholder="How many?" name="cl_q"></td>
                                    <td>Pieces</td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="cl_d" placeholder="e.g. 50x Top, 50x pair of slippers" name="cl_d"></textarea></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
        </div>
        <div class="modal-footer modal-color">
            <button type="button" class="btn modal-button" onclick="clothes()" id="donate_clothes" value="clothes">Pledge</button>
        </div>
        </form>

    </div>

</div>
