<?php

$content = file_get_contents("http://www.lotto.pl/lotto/wyniki-i-wygrane");

preg_match('#<table class="ostatnie-wyniki-table" cellpadding="0" cellspacing="0">(.*)<\/table>#', $content, $result);
echo $result[0];
