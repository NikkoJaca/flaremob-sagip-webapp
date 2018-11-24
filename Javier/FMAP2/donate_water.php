<div class="modal-dialog modal-lg">
    
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header modal-color">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="color:white;">Donate Water</h4>
            </div>
            <div class="modal-body modal-image">
                <form class="form-horizontal" action="/action_page.php">
            
                        <div class="form-group">
                            <table class="table table-hover">
                            <thead>
                                <th class="col-md-3">Type</th>
                                <th class="col-md-2">Quantity</th>
                                <th class="col-md-2">Unit</th>
                                <th class="col-md-3">Description</th>
                            </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'bw_q','bw_d')" value="Drinking Water (Bottled)" name="water[]" id="bw">Drinking Water (Bottled)</label></div>
                                        </td>                          
                                        <td><input type="text" class="form-control" id="bw_q" placeholder="How many?" name="bw_q" disabled></td>
                                        <td>Bottles</td>
                                        <td>
                                            <div class="col-sm-12"><textarea class="form-control" rows="3" id="bw_d" placeholder="Brand, Grams, mL,  size, etc." name="bw_d" disabled></textarea></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'jq_q','jq_d')" value="Drinking Water (Large Containers)" name="water[]" id="jq">Drinking Water (Large Containers)</label></div>
                                        </td>                          
                                        <td><input type="text" class="form-control" id="jq_q" placeholder="How many?" name="jq_q" disabled></td>
                                        <td>Jugs</td>
                                        <td>
                                            <div class="col-sm-12"><textarea class="form-control" rows="3" id="jq_d" placeholder="Brand, Grams, mL,  size, etc." name="jq_d" disabled></textarea></div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
        
                </form>
            </div>
            <div class="modal-footer modal-color">
                <button type="button" class="btn modal-button" onclick="water()">Pledge</button>
            </div>
        </div>
    
    </div>
