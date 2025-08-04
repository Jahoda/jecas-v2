---
title: "Automatický lazy-loading YouTube videí"
headline: "Hotové řešení lazy-loadingu YouTube videí"
description: "Hotové řešení v JavaScriptu načítání videí z YouTube, až když jsou potřeba."
date: "2013-08-07"
last_modification: "2013-08-07"
status: 1
tags: ["Lazy loading", "JavaScript", "Hotová řešení", "YouTube", "Video"]
---

Pokud je na stránce více videí z YouTube, značně to **zbrzdí rychlost načítání**, případně mohou YouTube videa při načítání **zasekávat prohlížení stránky**. A uživatel hromadné načtení nejspíš moc neocení, takže se nabízí využít [lazy-loading](/youtube-lazy-loading).

## Hotové řešení

V článku [Lazy loading YouTube videí](/youtube-lazy-loading) je popsána tvorba makety YouTube přehrávače v CSS a donačtení skutečného přehrávače při najetí myši.

### Co hotové řešení dělá?

Projde na stránce všechny odkazy na YouTube videa s třídou `yt` a nahradí je atrapou, která při najetí myší donačte originál.

```
&lt;a class="**yt**" href="http://www.youtube.com/watch?v=m_t4_6eHFdk"&gt;Název videa&lt;/a&gt;
```

[Ukázka na webu o hře Saints Row](http://saintsrow.cz/videa) [Živá ukázka](http://kod.djpw.cz/smb)

### CSS

```
.yt {background: #000 center 65%}
.yt, .yt a {width: 640px; height: 385px; display: block; border: 0;}
.yt a {background: transparent url("[yt-control.png](/files/yt/yt-control.png)") left bottom no-repeat; position: relative; text-decoration: none; color: #fff;}
.yt a span {display: block; width: 96%; position: absolute; top: 0; left: 0; background: #000; color: #fff; font: .8em Arial; padding: 1.2% 2%; opacity: .75;}
.yt a:hover {background-color: transparent}
.yt iframe {border: 0;}
```

### JavaScript

```
/* Načtení originálu */
function youTube() {
	var ifr = document.createElement("iframe");
	ifr.width = 640;
	ifr.height = 385;
	ifr.src = "http://www.youtube.com/embed/" + getYtCode(this.href);
	this.parentNode.appendChild(ifr);
	this.parentNode.removeChild(this);
}

/* Vytažení kódu videa */
function getYtCode(url) {
    return url.match(/\?v=([A-z0-9_-]*)/)[1];
}

/* Procházení odkazy a přilepení funkčnosti */
var a = document.links;
for (var i = 0; i &lt; a.length; i++) {
  if (a[i].className == "yt") {
    a[i].className = "";
    var div = document.createElement("div");
    div.className = "yt";
    div.style.backgroundImage = "url(http://img.youtube.com/vi/" + getYtCode(a[i].href) + "/sddefault.jpg)";
    a[i].parentNode.insertBefore(div, a[i]);   
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(a[i].innerHTML));
    a[i].innerHTML = "";
    a[i].appendChild(span);
    div.appendChild(a[i]);
    a[i].onmouseover = youTube;
  }
}
```

## Nahrazení starých kódů

Pokud již na stránce jsou videa vložená klasicky značkou `&lt;iframe&gt;`, provedeme jednoduché nahrazení **regulárním výrazem**:

```
&lt;iframe.*embed/([A-z0-9_-]*).*&lt;/iframe>
```

Na:
```
&lt;a class="yt" href="http://www.youtube.com/watch?v=$1">Video&lt;/a>
```