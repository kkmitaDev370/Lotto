<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Arden</title>

    <link href="style.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>



<big><b><?php include 'connect.php';?> <br> <br></b></big>
<!-- <button onclick="post_losy()">Wyslij losy</button>
<div id="post_losy"></div> -->






<div class="container">
  <div class="row">
    <div class="col-md-12">
      



      <h1>Losowanie na dziś to: </h1>

      <div class="show_losy">
        <div id="display_losy">
        </div>
        <div id="display_losy_ile">
        </div>
      </div>

<div class="clear"></div>

<div id="last_losowanie">
  Ostatnie losowanie to : <br>

</div>
<br>




<!-- 

<table id="table">
  <tr>
    <th>Liczba</th>
    <th>Ile razy</th>
  </tr>
  <tr>
  </tr>
</table>
<br>
<table id="table2">
  <tr>
    <th>Liczba</th>
    <th>Ile razy</th>
  </tr>
  <tr>
  </tr>
</table>

 -->












    </div>
  </div>
</div>









<div id="content"> <?php include 'include.php';?></div>

<script src="http://code.jquery.com/jquery-2.2.3.min.js"></script>
<script src="javascript.js"></script>
  </body>
</html>