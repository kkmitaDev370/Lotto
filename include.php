<?php 



$url = 'http://www.lotto.pl/lotto/wyniki-i-wygrane';
$content = file_get_contents($url);
echo $content;
 
?>