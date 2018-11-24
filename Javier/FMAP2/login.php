<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

<script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-functions.js"></script>

<style>
	.card{
		margin-top:8%;
		width:60%;
	}
	.btn-danger{
		width:50%;
	}
</style>
</head>

<body style="background-image:url(bgweb.png); background-attachment: fixed;">
<center>
	<div class="container">
		<div class="card">
			<div class="card-header" style="color:red;">Login to Flaremob: Alisto!</div>
			<div class="card-body">
				<div class="form-group">
				<label for="loginemail">Email:</label>
				<input type="email" class="form-control" id="loginemail" align="center">
				</div>	

				<div class="form-group">
				<label for="pword">Password:</label>
				<input type="password" class="form-control" id="loginpassword" align="center">
				</div>	
				<button type="button" class="btn btn-danger" id="saveButton">Login</button>
			</div> 
			<div class="card-footer" align="center">
				<a  href="lregister.php"><button type="button" class="btn btn-outline-danger btn-block">Not yet registered? Click this!</button></a>
			</div>
		</div>
	</div>
</center>
<script src="./myapp.js"></script>

</body>
</html>