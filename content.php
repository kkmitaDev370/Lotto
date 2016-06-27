<?php

$content = file_get_contents("http://www.lotto.pl/lotto/wyniki-i-wygrane");

preg_match('/<table class="ostatnie-wyniki-table" cellpadding="0" cellspacing="0">(.*?)<\/table>/s', $content, $EURmatch);


echo $EURmatch[1];





/*

 <div id="content">
 <?php 
 $url = 'http://www.lotto.pl/lotto/wyniki-i-wygrane';
 $content = file_get_contents($url);
 echo $content;
 ?>
</div> 


*/