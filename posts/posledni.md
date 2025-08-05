---
title: "Poslední komentáře"
headline: "Poslední komentáře"
description: "Poslední komentáře pod články na jecas.cz."
date: "2014-05-06"
last_modification: "2014-05-06"
status: 0
tags: []
format: "html"
---

<style>
  .meta {display: none;}  
  
.dsq-widget-list .dsq-widget-avatar {border-radius: 50%; margin-right: 0.5em}
.dsq-widget-comment {display: block; margin: 1em 0 .5em 2.5em; padding: .8em; background: #efefef}
.dsq-widget-list {padding: 0}
.dsq-widget-meta {margin-left: 2.5em; text-align: right}
</style>


<div id="diskuse"></div>
<script>
  var vystup = "<dl>";
  function prispevky(data) {
    for (zaznam in data.response) {
      vystup += "<dt>" + data.response[zaznam].author.name + "<dd>" + data.response[zaznam].message;
    }
    document.getElementById("diskuse").innerHTML = vystup + "</dl>";
  }
</script>

<script src="https://disqus.com/api/3.0/forums/listPosts.json?forum=jecas&api_key=BwcwyR03Y19LVAHRVIq0Uly6e0L0QOjaIlrpEaUSoAu8hnUZ8iKJoNllOXT2bSue&callback=prispevky"></script>


<script type="text/javascript" src="http://jecas.disqus.com/recent_comments_widget.js?num_items=25&hide_avatars=0&avatar_size=40&excerpt_length=200"></script>
