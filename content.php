<?php

$content = file_get_contents("http://www.lotto.pl/lotto/wyniki-i-wygrane");

preg_match('#<table class="ostatnie-wyniki-table" cellpadding="0" cellspacing="0">([0-9\.]*)</table>#Uis', $content, $EURmatch);


echo $EURmatch[0];




