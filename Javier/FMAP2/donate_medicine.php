<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header modal-color">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" style="color:white;">Donate Medicine and Medical Supplies</h4>    
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
                                                <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this, 'otccap_q', 'otccap_d')" value="Over-the-Counter (OTC) Medicines (Capsule)" name="med[]" id="otccap">Over-the-Counter Medicines (Capsule)</label></div>
                                            </td>           
                                            <td><input type="number" class="form-control" id="otccap_q" placeholder="How many boxes?" name="otccap_q" disabled></td>
                                            <td>Boxes</td>
                                            <td>
                                                <div class="col-sm-12"><textarea class="form-control" rows="3" id="otccap_d" placeholder="Brand, Grams, mL,  size, etc." name="otccap_d" disabled></textarea></div>
                                            </td>
                                        </tr>
        
                                        <tr>
                                            <td>
                                                <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this, 'otctab_q','otctab_d')" value="Over-the-Counter (OTC) Medicines (Tablet)" name="med[]" id="otctab">Over-the-Counter Medicines (Tablet)</label></div>
                                            </td>           
                                            <td><input type="number" class="form-control" id="otctab_q" placeholder="How many boxes?" name="otctab_q" disabled></td>
                                            <td>Boxes</td>
                                            <td>
                                                <div class="col-sm-12"><textarea class="form-control" rows="3" id="otctab_d" placeholder="Brand, Grams, mL,  size, etc." name="otctab_d" disabled></textarea></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this, 'otcsyr_q', 'otcsyr_d')" value="Over-the-Counter (OTC) Medicines (Syrup)" name="med[]" id="otcsyr">Over-the-Counter Medicines (Syrup)</label></div>
                                            </td>           
                                            <td><input type="number" class="form-control" id="otcsyr_q" placeholder="How many bottles?" name="otcsyr_q" disabled></td>
                                            <td>Bottle</td>
                                            <td>
                                                <div class="col-sm-12"><textarea class="form-control" rows="3" id="otcsyr_d" placeholder="Brand, Grams, mL,  size, etc." name="otcsyr_d" disabled></textarea></div>
                                            </td>
                                        </tr>
        
                                        <tr>
                                        <td>
                                            <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this, 'vitcap_q', 'vitcap_d')" value="Vitamins and Nutritional Suppliments (Capsule)" name="med[]" id="vitcap">Vitamins and Nutritional Suppliments (Capsule)</label></div>
                                        </td>           
                                        <td><input type="number" class="form-control" id="vitcap_q" placeholder="How many boxes?" name="vitcap_q" disabled></td>
                                        <td>Boxes</td>
                                        <td>
                                            <div class="col-sm-12"><textarea class="form-control" rows="3" id="vitcap_d" placeholder="Brand, Grams, mL,  size, etc." name="vitcap_d" disabled></textarea></div>
                                        </td>
                                    </tr>
    
                                    <tr>
                                        <td>
                                            <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this, 'vittab_q', 'vittab_d')" value="Vitamins and Nutritional Suppliments (Tablet)" name="med[]" id="vittab">Vitamins and Nutritional Suppliments (Tablet)</label></div>
                                        </td>           
                                        <td><input type="number" class="form-control" id="vittab_q" placeholder="How many boxes?" name="vittab_q" disabled></td>
                                        <td>Boxes</td>
                                        <td>
                                            <div class="col-sm-12"><textarea class="form-control" rows="3" id="vittab_d" placeholder="Brand, Grams, mL,  size, etc." name="vittab_d" disabled></textarea></div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this, 'vitsyr_q', 'vitsyr_d')" value="Vitamins and Nutritional Suppliments (Syrup)" name="med[]" id="vitsyr">Vitamins and Nutritional Suppliments (Syrup)</label></div>
                                        </td>           
                                        <td><input type="number" class="form-control" id="vitsyr_q" placeholder="How many boxes?" name="vitsyr_q" disabled></td>
                                        <td>Bottle</td>
                                        <td>
                                            <div class="col-sm-12"><textarea class="form-control" rows="3" id="vitsyr_d" placeholder="Brand, Grams, mL,  size, etc." name="vitsyr_d" disabled></textarea></div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
        
                                <table class="table table-hover">
                                    <thead>
                                        <th class="col-md-4">Type</th>
                                        <th class="col-md-2">Quantity</th>
                                        <th class="col-md-2">Unit</th>
                                        <th class="col-md-4">Description</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><div class="checkbox"><label><input type="checkbox" value="Canes and Crutches" name="cc" onclick="enableFields(this, 'cc_q', 'cc_d')" id="cc">  Canes and Crutches</label></div></td>
                                            <td><input type="number" class="form-control" id="cc_q" placeholder="How many?" name="cc_q" disabled></td>
                                            <td>Pieces</td>
                                            <td colspan="2">
                                                <textarea class="form-control" rows="3" id="cc_d" placeholder="e.g. Brand, weight, etc." name="cc_d" disabled></textarea>
                                            </td>
                                        </tr>
        
                                        <tr>
                                            <td><div class="checkbox"><label><input type="checkbox" value="Wheelchairs" name="wc" onclick="enableFields(this, 'wc_q', 'wc_d')" id="wc"> Wheelchairs</label></div></td>
                                            <td><input type="number" class="form-control" id="wc_q" placeholder="How many?" name="wc_q" disabled></td>
                                            <td>Pieces</td>
                                            <td colspan="2">
                                                <textarea class="form-control" rows="3" id="wc_d" placeholder="e.g. Brand, weight, etc." name="wc_d"></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><div class="checkbox"><label><input type="checkbox" value="Other Medicine and Supplies" name="wc" onclick="enableFields(this, 'om_q', 'om_d')" id="om"> Others</label></div></td>
                                            <td><input type="number" class="form-control" id="om_q" placeholder="How many?" name="om_q" disabled></td>
                                            <td>Pieces</td>
                                            <td colspan="2">
                                                <textarea class="form-control" rows="3" id="om_d" placeholder="e.g. Brand, weight, etc." name="om_d" disabled></textarea>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

        </div>

        <div class="modal-footer modal-color">
        <button type="button" class="btn modal-button" onclick="medicine()" id="donate_food">Pledge</button>
        </div>   

        </form> 
    </div>
</div>
</div>
