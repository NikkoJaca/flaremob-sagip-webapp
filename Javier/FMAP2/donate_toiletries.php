
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header modal-color">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="color:white;">Donate Toiletries</h4>    
            </div>

            <div class="modal-body">

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
                                        <div class="checkbox"><label><input type="checkbox" onclick="enableField(this,'sha_q','sha_u','sha_d')" value="Shampoo" name="toiletries[]" id="sha" >Shampoo</label></div>
                                    </td>                                
                                    <td><input type="text" class="form-control" id="sha_q" placeholder="How many?" name="sha_q" disabled></td>
                                    <td>
                                        <div class="form-group">
                                        <select class="form-control" id="sha_u" disabled>
                                            <option value="Packs">Packs</option>
                                            <option value="Bottles">Bottles</option>
                                        </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="sha_d" placeholder="Brand, Grams, mL,  size, etc." name="sha_d" disabled></textarea></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'soap_q','soap_d')" value="Soap" name="toiletries[]" id="soap">Soap</label></div>
                                    </td>                                  
                                    <td><input type="text" class="form-control" id="soap_q" placeholder="How many?" name="soap_q" disabled></td>
                                    <td>Bars</td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="soap_d" placeholder="Brand, Grams, mL,  size, etc." name="soap_d" disabled></textarea></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'tb_q','tb_d')" value="Toothbrush" name="toiletries[]" id="tb">Toothbrush</label></div>
                                    </td>                                  
                                    <td><input type="text" class="form-control" id="tb_q" placeholder="How many?" name="tb_q" disabled></td>
                                    <td>Pieces</td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="tb_d" placeholder="Brand, Grams, mL,  size, etc." name="tb_d" disabled></textarea></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="checkbox"><label><input type="checkbox" onclick="enableField(this,'tp_q','tp_u','tp_d')" value="Tootpaste" name="toiletries[]" id="tp">Toothpaste</label></div>
                                    </td>                                  
                                    <td><input type="text" class="form-control" id="tp_q" placeholder="How many?" name="tp_q" disabled></td>
                                    <td>
                                        <div class="form-group">
                                        <select class="form-control" id="tp_u" disabled>
                                            <option value="Tubes">Tubes</option>
                                            <option value="Packs">Packs</option>
                                        </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="tp_d" placeholder="Brand, Grams, mL,  size, etc." name="tp_d" disabled></textarea></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="checkbox"><label><input type="checkbox" onclick="enableField(this,'deo_q','deo_u','deo_d')" value="Deodorant" name="toiletries[]" id="deo">Deodorant</label></div>
                                    </td>                                  
                                    <td><input type="text" class="form-control" id="deo_q" placeholder="How many?" name="deo_q" disabled></td>
                                    <td>
                                        <div class="form-group">
                                        <select class="form-control" id="deo_u" disabled>
                                            <option value="Packs">Packs</option>
                                            <option value="Roll-on">Roll-on</option>
                                            <option value="Stick">Stick</option>
                                        </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="deo_d" placeholder="Brand, Grams, mL,  size, etc." name="deo_d" disabled></textarea></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'sn_q','sn_d')" value="Sanitary Napkin" name="toiletries[]" id="sn">Sanitary Napkin</label></div>
                                    </td>                                  
                                    <td><input type="text" class="form-control" id="sn_q" placeholder="How many?" name="sn_q" disabled></td>
                                    <td>Packs</td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="sn_d" placeholder="Brand, Grams, mL,  size, etc." name="sn_d" disabled></textarea></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'ot_q','ot_d')" value="Other Toiletries" name="toiletries[]" id="ot">Other Toiletries</label></div>
                                    </td>                                  
                                    <td><input type="text" class="form-control" id="ot_q" placeholder="How many?" name="ot_q" disabled></td>
                                    <td>Pieces</td>
                                    <td>
                                        <div class="col-sm-12"><textarea class="form-control" rows="3" id="ot_d" placeholder="Brand, Grams, mL,  size, etc." name="ot_d" disabled></textarea></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>

            </div>

            <div class="modal-footer modal-color">
            <button type="button" class="btn modal-button" onclick="toiletries()" id="donate_others" value="others">Pledge</button>
            </div>    
        </div>
    </div>
</div>
