---
title: "Zpožděně načítáné YouTube video"
headline: "Lazy loading YouTube videí"
description: "Jak načítat embedované video z YouTube, až když je potřeba."
date: "2013-06-19"
last_modification: "2013-06-19"
status: 1
tags: ["lazy-loading", "video", "youtube"]
format: "html"
---

<p>Máme-li na stránce více videí vložených například pomocí <code>&lt;iframe></code> z YouTube, značně to načítání zpomalí. Jeden takový <code>&lt;iframe></code> je cca 7 HTTP požadavků a 0,5 MB dat, což může načítání webu na mnoho <span class=help title='vteřin'>tisíců milisekund</span> otrávit.

<h2>Řešení</h2>
<p>Co takhle místo <code>&lt;iframe></code> zobrazit obrázek videa, přidat nějaké atrapy ovládacích prvků skutečného přehrávače – a ten zobrazit až po najetí myší (<code>onmouseover</code>)?

<h2 id=nahledy>Náhledy</h2>
<p>Obrázek (náhled) videa lze získat překvapivě snadno. Různé varianty obrázku videa se nacházejí na jednotných URL, kam stačí zadat jenom kód videa (to je část za <code>wathc?v=</code>: <code>youtube.com/watch?v=<b>m_t4_6eHFdk</b></code>).

<div class='tldr'>
<span id="yt-lazy-toggle"></span>
<script>
var btn = document.createElement('button');
btn.textContent = 'Zobrazit/skrýt ukázky';
btn.onclick = function() { this.parentNode.parentNode.className = this.parentNode.parentNode.className == '' ? 'tldr' : ''; };
document.getElementById('yt-lazy-toggle').appendChild(btn);
</script>
<dl>
<dt>miniaturní náhledy</dt>
<dd><pre><code>http://img.youtube.com/vi/<b>m_t4_6eHFdk</b>/<i>1</i>.jpg</code></pre>
<p>Generují se tři (začátek, prostředek a konec), tj čísla na konci 1–3. O rozměrech 120 × 90 pixelů.
<div class='live tldr'>
<img class=inline src='http://img.youtube.com/vi/m_t4_6eHFdk/1.jpg'>
<img class=inline src='http://img.youtube.com/vi/m_t4_6eHFdk/2.jpg'>
<img class=inline src='http://img.youtube.com/vi/m_t4_6eHFdk/3.jpg'>
</div>

<dt>náhledy v různých velikostech</dt>
<dd><p>320 × 180<pre><code>http://img.youtube.com/vi/<b>m_t4_6eHFdk</b>/<i>mqdefault</i>.jpg</code></pre>
<div class='live tldr'>
<img src='http://img.youtube.com/vi/m_t4_6eHFdk/mqdefault.jpg'></div>
<p>480 × 360<pre><code>http://img.youtube.com/vi/<b>m_t4_6eHFdk</b>/<i>hqdefault</i>.jpg</code></pre>
<div class='live tldr'><img src='http://img.youtube.com/vi/m_t4_6eHFdk/hqdefault.jpg'></div>
<p><b>640 × 480</b><pre><code>http://img.youtube.com/vi/<b>m_t4_6eHFdk</b>/<i>sddefault</i>.jpg</code></pre>
<div class='live tldr'><img src='http://img.youtube.com/vi/m_t4_6eHFdk/sddefault.jpg'></div>
<p>Rozměry podle maximálního rozlišení videa<pre><code>http://img.youtube.com/vi/<b>m_t4_6eHFdk</b>/<i>maxresdefault</i>.jpg</code></pre>
<div class='live tldr scroll'><img src='http://img.youtube.com/vi/m_t4_6eHFdk/maxresdefault.jpg'>
</div>
</dl>
</div>

<h3>Náhledy pomocí API</h3>
<p>Alternativní možnost k těmto adresám je získání URL obrázků pomocí YouTube API. Těžko ale soudit, co bude trvanlivější… Nicméně obrázky jsou zatím alespoň jednodušší na realisaci.

<h2 id=reseni>Živá ukázka a řešení</h2>
<p>V HTML a kaskádových stylech se vytvoří atrapa. JavaScript ji potom prohodí za skutečný přehrávač videa.
<!-- Kód ukázky -->
<style>
.yt, .yt a {width: 640px; height: 385px; display: block}
.yt a {background: transparent url("/files/yt/yt-control.png") left bottom no-repeat; position: relative; text-decoration: none; color: #fff;}
.yt a span {display: block; width: 96%; position: absolute; top: 0; left: 0; background: #000; color: #fff; font: .8em Arial; color: #fff; padding: 1.2% 2%; opacity: .75;}
.yt a:hover {background-color: transparent}
.yt iframe {border: 0;}
</style>

<script>
function yt(video) {
	var ifr = document.createElement("iframe");
	ifr.width = 640;
	ifr.height = 385;
	ifr.src = video.href.replace("watch?v=", "embed/");
	video.parentNode.appendChild(ifr);
	video.parentNode.removeChild(video);
}
</script>



<div class='yt' style='background: #000 url("http://img.youtube.com/vi/m_t4_6eHFdk/sddefault.jpg") center 65%'>
	<a onmouseover='yt(this)' href='http://www.youtube.com/watch?v=m_t4_6eHFdk'><span>Vylepšení stromových diskusí</span></a>
</div>
<!-- / konec ukázky -->

<p>HTML by mohlo vypadat takto:
<pre><code>&lt;div class='yt' style='background: #000 url("http://img.youtube.com/vi/<b>m_t4_6eHFdk</b>/sddefault.jpg") center 65%'>
	&lt;a onmouseover='yt(this)' href='http://www.youtube.com/watch?v=<b>m_t4_6eHFdk</b>'>&lt;span>Název videa&lt;/span>&lt;/a>
&lt;/div></code></pre>

<p>V CSS se potom vytvoří atrapa ovládacího prvku (pomocí obrázku).
<img class=border src="/files/yt/yt-control.png">
<p>Naposicuje se dolů a název videa ve <code>&lt;span></code>u v odkazu zase nahoru.

<p>Nakonec JavaScript zajistí, aby se v <code>div.yt</code> vytvořil <code>&lt;iframe></code> s videem a atrapa v podobě odkazu zmizela.

<pre><code>function yt(video) {
	var ifr = document.createElement("iframe");
	ifr.width = 640;
	ifr.height = 385;
	ifr.src = video.href.replace("watch?v=", "embed/");
	video.parentNode.appendChild(ifr);
	video.parentNode.removeChild(video);
}</code></pre>

<h2 id=auto>Automatisace</h2>
<p>Asi by se nikomu nechtělo vkládat ručně výše uvedené HTML, proto jsou dvě možnosti:
<ol>
<li>Na straně serveru při vložení URL na YouTube ji nahradit upravenou HTML skořápkou. (Nahrazení by <b>nemělo být</b> v žádném případě trvalé.)
  <li><p>Vkládat YT videa jako běžné odkazy, <a href="/js-youtube-lazy-loading">JavaScriptem je najít</a>, doplnit jim skořápku a navěsit funkci <code>yt</code>.</p>
    <p>
      <a href="/js-youtube-lazy-loading" class="button">Hotové řešení</a>
    </p>
</ol>
<p>Kromě toho by serverový skript mohl zajišťovat stažení náhledového obrázku z YT na vlastní server.

<!-- https?://(www.)?youtube.com/watch?[A-z0-9_\-\=\&\?]*v=([A-z0-9_\-]*) -->