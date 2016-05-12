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

Ostatnie losowanie to : <br><br>
<div id="losowane"></div>

<button onclick="test()">KLICK</button>





<p><b>Start typing a name in the input field below:</b></p>
<form> 
First name: <input type="text" onkeyup="pokaz()">
</form>
<p>Suggestions: <span id="txtHint"></span></p>


<h1>COJESTT</h1>


<div id="content"> <?php include 'include.php';?></div>






<script src="http://code.jquery.com/jquery-2.2.3.min.js"></script>

<script src="losy.json"></script>
<script src="javascript.js"></script>

  </body>
</html>