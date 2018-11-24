<!DOCTYPE html>
<html>
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.min.css">
  
  <style>
    .btn {
    border: none;
    background-color: inherit;
    padding: 14px 28px;
    font-size: 16px;
    cursor: pointer;
    display: inline-block;
    }
  </style>
  <script src="./myfieldss.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-database.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-functions.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-storage.js"></script>

</head>
<body style="background-image:url(bgweb.png); background-attachment: fixed;">

<nav class="navbar navbar-custom">
<div class="container-fluid">
  <ul class="nav navbar-nav navbar-right">
    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
  </ul>
</div>
</nav>

<div class="container-fluid" style="margin-top:5%;">

    <div class="row">
    <div class="col-sm-3"><button type="button" class="btn" data-toggle="modal" data-target="#clothes"><img src="web/btn_clothes.png" style="width:98%; height:95%;" class="img-rounded" alt="clothes"></button></div>
    <div class="col-sm-3"><button type="button" class="btn" data-toggle="modal" data-target="#food"><img src="web/btn_food.png" style="width:98%; height:95%;" class="img-rounded" alt="food"></button></div>
    <div class="col-sm-3"><button type="button" class="btn" data-toggle="modal" data-target="#medicine"><img src="web/btn_medicine.png" style="width:98%; height:95%;" class="img-rounded" alt="medicine"></button></div>
    <div class="col-sm-3"><button type="button" class="btn" data-toggle="modal" data-target="#cash"><img src="web/btn_cash.png" style="width:98%; height:95%;" class="img-rounded" alt="water"></button></div>
    </div>

    <div class="row">
    <div class="col-sm-4"><button type="button" class="btn" data-toggle="modal" data-target="#toiletries"><img src="web/btn_toiletries.png" style="width:98%; height:95%;" class="img-rounded" alt="toiletries"></button></div>
    <div class="col-sm-4"><button type="button" class="btn" data-toggle="modal" data-target="#water"><img src="web/btn_water.png" style="width:98%; height:95%;" class="img-rounded" alt="water"></button></div>
    <div class="col-sm-4"><button type="button" class="btn" data-toggle="modal" data-target="#other"><img src="web/btn_others.png" style="width:98%; height:95%;" class="img-rounded" alt="others"></button></div>
    </div>
</div>

  <!-- Modal -->
  <div class="modal fade" id="clothes" role="dialog">
    <?php include('donate_clothes.php');?>
  </div>

  <div class="modal fade" id="food" role="dialog">
    <?php include('donate_food.php');?>
  </div>

  <div class="modal fade" id="medicine" role="dialog">
    <?php include('donate_medicine.php');?>
  </div>

  <div class="modal fade" id="toiletries" role="dialog">
    <?php include('donate_toiletries.php');?>
  </div>

  <div class="modal fade" id="water" role="dialog">
    <?php include('donate_water.php');?>
  </div>

  <div class="modal fade" id="cash" role="dialog">
    <?php include('donate_cash.php');?>
  </div>

  <div class="modal fade" id="other" role="dialog">
    <?php include('donate_others.php');?>
  </div>

  <script src="./myapp.js"></script>

</body>
</html>