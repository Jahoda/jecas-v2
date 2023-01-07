<?php

define("NAZEV_WEBU", "Ukázková stránka");
define("HLAVNI_STRANA", "Hlavní stránka");


function redir() {
	$redir = str_replace(array("index.php", ".php"), "", $_SERVER['REQUEST_URI']);
	 if ($_SERVER['REQUEST_URI'] != $redir) {
	 	header("Location: $redir", 301);
	 }
}


function head($title, $description = "") {
	redir();
?>
<!doctype html>
<meta charset="utf-8">
<title><?=empty($title) ? NAZEV_WEBU : $title . " – " . NAZEV_WEBU ?></title>
<?php if (!empty($description)) {?>
<meta name="description" content="<?=description?>">
<?php }?>
                                                              
<link rel="stylesheet" type="text/css" href="http://jecas.cz/d/cssloader-47e70356d8e2-screen.css">

<style>
.active {font-weight: bold; text-decoration: none; color: #000}
</style>

<div class=wrap>
<a href="./" class=header>
  <span class='inner'>Ukázková stránka</span>
</a>



<div class=container>

<?php menu($title) ?>

<hr>

<div class=content>
<?php
}



function footer() {
?>

<hr>
<p>Ukázkový web, 2013
    
<p>Vztahuje se k návodu, jak <a href="http://jecas.cz/include">složit web v PHP</a>.

</div>
</div>
</div>

<?php
}


function menu($title) {
  $title = (empty($title)) ? HLAVNI_STRANA : $title;
?>
  <div class=menu>
<?php
  $menu = array(
    HLAVNI_STRANA => "",
    "Druhá stránka" => "druha",
    "Třetí stránka" => "treti",
    
  );
  foreach ($menu as $nazev => $odkaz) { ?>
    <a href="./<?=$odkaz?>"<?=($nazev == $title) ? " class='active'" : ""?>><?=$nazev?></a>
<?php } ?>
  </div>
<?php } ?>
