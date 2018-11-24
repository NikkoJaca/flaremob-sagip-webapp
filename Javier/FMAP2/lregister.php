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
            <div class="card-header" style="color:red;">Register to Flaremob: Alisto!</div>

			<div class="card-body">

				<div class="form-group">
				<input type="text" class="form-control" id="fname" align="center" placeholder="First Name">
                </div>	
                
                <div class="form-group">
				<input type="text" class="form-control" id="lname" align="center" placeholder="Last Name">
                </div>	
                
                <div class="form-group">
				<input type="text" class="form-control" id="organization" align="center" placeholder="Organization">
                </div>	
                
                <div class="form-group">
				<input type="text" class="form-control" id="position" align="center" placeholder="Position">
                </div>	
                
                <div class="form-group">
				<input type="number" class="form-control" id="contact" align="center" placeholder="Contact Number">
                </div>	
                
                <div class="form-group">
				<input type="email" class="form-control" id="emailadd" align="center" placeholder="Email Address">
                </div>	
                
                <div class="form-group">
				<input type="password" class="form-control" id="password" align="center" placeholder="Password">
                </div>	

				<button type="button" class="btn btn-danger" onclick="signup()" id="signup">Sign Up</button>				
			
			</div> 
			<div class="card-footer" align="center">
				<a  href="login.php"><button type="button" class="btn btn-outline-danger btn-block">Already have an account? Click this!</button></a>
			</div>
		</div>
	</div>
</center>
<script src="./myapp.js"></script>

</body>
</html>