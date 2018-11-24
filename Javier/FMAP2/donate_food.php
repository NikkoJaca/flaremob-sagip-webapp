<div class="modal-dialog  modal-lg">
<div class="modal-content">
    <div class="modal-header modal-color">
    <button type="button" class="close" data-dismiss="modal">&times;</button>
    <h4 class="modal-title" style="color:white;">Donate Food</h4>
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
                                <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'cg_q','cg_d')" value="Canned Goods" name="food[]" id="cg">Canned Goods</label></div>
                            </td>                                  
                            <td><input type="number" class="form-control" id="cg_q" placeholder="How many?" name="cg_q" disabled></td>
                            <td>Pieces</td>
                            <td>
                                <div class="col-sm-12"><textarea class="form-control" rows="3" id="cg_d" placeholder="Brand, Grams, mL,  size, etc." name="cg_d" disabled></textarea></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'in_q','in_d')" value="Instant Noodles" name="food[]" id="in">Instant Noodles</label></div>
                            </td>                                  
                            <td><input type="number" class="form-control" id="in_q" placeholder="How many?" name="in_q" disabled></td>
                            <td>Pieces</td>
                            <td>
                                <div class="col-sm-12"><textarea class="form-control" rows="3" id="in_d" placeholder="Brand, Grams, mL,  size, etc." name="in_d" disabled></textarea></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="checkbox"><label><input type="checkbox" onclick="enableField(this,'r_q','r_u','r_d')" value="Rice" name="food[]" id="r"> Rice</label></div>
                            </td>                                  
                            <td><input type="number" class="form-control" id="r_q" placeholder="How much?" name="r_q" disabled></td>
                            <td>
                                <div class="form-group">
                                <select class="form-control" id="r_u" disabled>
                                    <option value="Sacks">Sacks</option>
                                    <option value="Kilos">Kilos</option>
                                </select>
                                </div>
                            </td>
                            <td>
                                <div class="col-sm-12"><textarea class="form-control" rows="3" id="r_d" placeholder="Brand, Grams, mL, size, etc." name="r_d" disabled></textarea></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="checkbox"><label><input type="checkbox" onclick="enableFields(this,'of_q','of_d')" value="Other Food" name="food[]" id="of"> Other Food</label></div>
                            </td>
                            <td><input type="number" class="form-control" id="of_q" placeholder="How many?" name="of_q" disabled></td>
                            <td>Pieces</td>
                            <td>
                                <div class="col-sm-12"><textarea class="form-control" rows="3" id="of_d" placeholder="Brand, Grams, mL, size, etc." name="of_d" disabled></textarea></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

    </div>
    <div class="modal-footer modal-color">
    <button type="button" class="btn modal-button" onclick="food()" id="donate_food" >Pledge</button>
    </div>

    </form>
</div>
</div>
