<div class="modal-dialog modal-md">
    
    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header modal-color">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" style="color:white;">Other Donations</h4>
        </div>
        <div class="modal-body modal-image">
            <form class="form-horizontal" action="/action_page.php">

                <input type="text" class="form-control" id="other_t" placeholder="What item are you going to donate?" name="otherm_quantity">
        
                    <div class="form-group">
                        <table class="table table-hover">
                        <thead>
                            <th class="col-md-3">Quantity</th>
                            <th class="col-md-2">Unit</th>
                            <th class="col-md-3">Description</th>
                        </thead>
                            <tbody>
                                <tr>                          
                                    <td><input type="number" class="form-control" id="other_q" placeholder="How many?" name="other_q"></td>
                                    <td>Pieces</td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="other_d" placeholder="Brand, Grams, mL,  size, etc." name="other_d"></textarea></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
            </form>
        </div>
        <div class="modal-footer modal-color">
            <button type="button" class="btn modal-button" onclick="others()" id="donate_others" value="others">Pledge</button>
        </div>
    </div>

</div>
