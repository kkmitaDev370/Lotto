<?php 


 



$test = $_REQUEST["zmienna"];





$myfile = fopen("losy.json", "w") or die("Unable to open file!");

fwrite($myfile, $test);
fclose($myfile);





echo $test;

?>






