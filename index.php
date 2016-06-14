<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lotto</title>

    <link href="style.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link rel="shortcut icon" href="http://lottocdn.directtraffic.pl/sites/default/files/basic_favicon_1.ico" type="image/x-icon" /> 
  </head>
  <body>



<big><b><?php include 'connect.php';?> <br> <br></b></big>



<div class="container">
  <div class="row">
    <div class="col-md-12">
      


      <h1>Losowanie na dziś to: </h1>
      <br>

      <div class="show_losy">
        <div id="display_losy">
        </div>
        <div id="display_losy_ile">
        </div>
      </div>

<div class="clear"></div>

<div id="last_losowanie" class="windows">
  Ostatnie losowanie to : <br>
</div>
<div id="losowanie_length" class="windows">
  Ilość losowań w bazie : <br>
</div>




    </div>
  </div>
</div>

<div id="content">
  <?php 
  $url = 'http://www.lotto.pl/lotto/wyniki-i-wygrane';
  $content = file_get_contents($url);
  echo $content;
  ?>
</div>

<script src="http://code.jquery.com/jquery-2.2.3.min.js"></script>
<script src="javascript.js"></script>
  </body>
</html>