<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	 <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>RSS čtečka</title>
	<link rel="stylesheet" href="bootstrap.min.css" />
	<script><?php readfile("app.js")?></script>
</head>
<body>
	
</body>
</html>

<div class="container">
	<div class="jumbotron">
	  <h1>RSS čtečka v PHP</h1>
	  <p>Jednoduchá RSS čtečka napsaná v PHP s trochou JavaScriptu.</p>
	</div>

<div class="feed-list">
<?php 

$import = simplexml_load_file("opera-newsfeeds.opml");

foreach($import->body->outline as $feed){
    ?>
    <div class="feed-list--item">
    	<div class="page-header">
			<h2><a href="<?=$feed['xmlUrl']?>"><?=$feed['title']?></a></h2>
		</div><!-- /.page-header -->
	</div>

    <?php
}
?>
</div>
</div><!-- /.container -->
<script>
var feeds = document.querySelectorAll(".feed-list a");
var feedsLength = feeds.length;
for (var i = 0; i < feedsLength; i++) {
	feeds[i].onclick = (function(el) {
		return function() {
			Feed.fetchUrl(el.parentNode.parentNode, encodeURIComponent(el.href))	
			return false;				
		}
	})(feeds[i]);
};
</script>
