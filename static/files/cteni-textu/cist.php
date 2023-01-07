<?php 
$url = "http://translate.google.com/translate_tts?tl=cs&q=" 
      . urlencode($_GET["str"]);
$data = file_get_contents($url);
header("Content-Type: audio/mpeg");
file_put_contents(md5($url) . ".mpeg", $data);
echo $data;