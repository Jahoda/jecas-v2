---
title: "Automatický lazy-loading YouTube videí"
headline: "Hotové řešení lazy-loadingu YouTube videí"
description: "Hotové řešení v JavaScriptu načítání videí z YouTube, až když jsou potřeba."
date: "2013-08-07"
last_modification: "2013-08-07"
status: 1
tags: ["hotova-reseni", "js", "lazy-loading", "video", "youtube"]
format: "html"
---

<p>Pokud je na stránce více videí z YouTube, značně to <b>zbrzdí rychlost načítání</b>, případně mohou YouTube videa při načítání <b>zasekávat prohlížení stránky</b>. A uživatel hromadné načtení nejspíš moc neocení, takže se nabízí využít <a href="/youtube-lazy-loading">lazy-loading</a>.</p>

<h2>Hotové řešení</h2>
<p>V článku <a href="/youtube-lazy-loading">Lazy loading YouTube videí</a> je popsána tvorba makety YouTube přehrávače v CSS a donačtení skutečného přehrávače při najetí myši.</p>

<h3>Co hotové řešení dělá?</h3>
<p>Projde na stránce všechny odkazy na YouTube videa s třídou <code>yt</code> a nahradí je atrapou, která při najetí myší donačte originál.</p>
<pre><code>&lt;a class="<b>yt</b>" href="http://www.youtube.com/watch?v=m_t4_6eHFdk"&gt;Název videa&lt;/a&gt;</code></pre>
<p><a href="http://saintsrow.cz/videa" class="button">Ukázka na webu o hře Saints Row</a> <a href="https://kod.djpw.cz/smb" class="button">Živá ukázka</a></p>

<h3>CSS</h3>
<pre><code>.yt {background: #000 center 65%}
.yt, .yt a {width: 640px; height: 385px; display: block; border: 0;}
.yt a {background: transparent url("<a href="/files/yt/yt-control.png">yt-control.png</a>") left bottom no-repeat; position: relative; text-decoration: none; color: #fff;}
.yt a span {display: block; width: 96%; position: absolute; top: 0; left: 0; background: #000; color: #fff; font: .8em Arial; padding: 1.2% 2%; opacity: .75;}
.yt a:hover {background-color: transparent}
.yt iframe {border: 0;}</code></pre>

<h3>JavaScript</h3>
<pre><code>/* Načtení originálu */
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
}</code></pre>

<h2 id=nahrazeni>Nahrazení starých kódů</h2>
<p>Pokud již na stránce jsou videa vložená klasicky značkou <code>&lt;iframe&gt;</code>, provedeme jednoduché nahrazení <b>regulárním výrazem</b>:</p>
<pre><code>&lt;iframe.*embed/([A-z0-9_-]*).*&lt;/iframe></code></pre>
Na:
<pre><code>&lt;a class="yt" href="http://www.youtube.com/watch?v=$1">Video&lt;/a></code></pre>