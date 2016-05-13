<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Arden</title>
  </head>
  <body>

<style>
	#content {
		visibility: hidden;
	}
</style>


<h1>losy</h1>

<big><b><?php include 'connect.php';?> <br> <br></b></big>


Ostatnie losowanie to : <br>
<div id="losowane"></div>




<button onclick="post_losy()">Wyslij losy</button>
<div id="post_losy"></div>

<br><br>

<button onclick="get_losy()">Wez losy</button>
<div id="get_losy"></div>



<div id="content"> <?php include 'include.php';?></div>


<script src="http://code.jquery.com/jquery-2.2.3.min.js"></script>
<script src="javascript.js"></script>
  </body>
</html>