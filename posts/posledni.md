---
title: "Poslední komentáře"
headline: "Poslední komentáře"
description: "Poslední komentáře pod články na jecas.cz."
date: "2014-05-06"
last_modification: "2014-05-06"
status: 0
tags: []
---

.meta {display: none;}  
  
.dsq-widget-list .dsq-widget-avatar {border-radius: 50%; margin-right: 0.5em}
.dsq-widget-comment {display: block; margin: 1em 0 .5em 2.5em; padding: .8em; background: #efefef}
.dsq-widget-list {padding: 0}
.dsq-widget-meta {margin-left: 2.5em; text-align: right}

  var vystup = "";
  function prispevky(data) {
    for (zaznam in data.response) {
      vystup += "" + data.response[zaznam].author.name + "" + data.response[zaznam].message;
    }
    document.getElementById("diskuse").innerHTML = vystup + "";
  }