---
title: "Vložení videa z Facebooku"
headline: "Vložení videa z Facebooku na web"
description: "Jak na vlastní stránku vložit video z Facebooku."
date: "2014-11-21"
last_modification: "2014-11-21"
status: 1
tags: ["facebook", "hotova-reseni", "lazy-loading", "video"]
format: "html"
---

<p>Pokud chceme na vlastní web vložit Facebook video, existuje k tomu <a href="https://www.facebook.com/video.php?v=796588687069516">na stránce s videem</a> možnost <i>Embed post</i>.</p>

<p><img src="/files/facebook-video/embed-post.png" alt="Embedování videa" class="border"></p>

<p>To nám připraví HTML kód a JavaScript, který připojí Facebook SDK, které <i>oživí</i> video.</p>

<pre><code>&lt;div id="fb-root">&lt;/div>
&lt;script>
(function(d, s, id) { 
  var js, fjs = d.getElementsByTagName(s)[0]; 
  if (d.getElementById(id)) return; 
  js = d.createElement(s); 
  js.id = id; 
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1"; 
  fjs.parentNode.insertBefore(js, fjs); 
}(document, 'script', 'facebook-jssdk'));
&lt;/script>
&lt;div class="fb-post" 
data-href="https://www.facebook.com/video.php?v=<b>796588687069516</b>" 
  data-width="466"
>
  &lt;div class="fb-xfbml-parse-ignore">
    &lt;a href="https://www.facebook.com/video.php?v=<b>796588687069516</b>">Post&lt;/a> by &lt;a href="https://www.facebook.com/jecas.cz">Je čas&lt;/a>.
  &lt;/div>
&lt;/div>
</code></pre>

<p>Po vložení na stránku to vypadá takto (<a href="https://kod.djpw.cz/yuhb">živá ukázka</a>):</p>

<p><img src="/files/facebook-video/vysledek.png" alt="Ukázka embedování videa" class="border"></p>

<p>Nevýhoda tohoto postupu je, že výše uvedený kód vytvoří <b>34 HTTP požadavků</b> a <b>stáhne cca 0,5 MB dat</b>.</p>


<h2 id="iframe">Vložení jako <code>&lt;iframe></code></h2>

<p>Na rozdíl od <a href="/youtube">YouTube</a> není snadno k disposici možnost vložit video na vlastní web pomocí <code>&lt;iframe></code>. Naštěstí se ale k universálnímu kódu pro <code>&lt;iframe></code> dá dopátrat skrze <i>Graph API</i>.</p>

<pre><code>&lt;iframe 
  src="https://www.facebook.com/video/embed?video_id=<b>796588687069516</b>"
  width="480" height="270" frameborder="0"
>
&lt;/iframe></code></pre>

<p><a href="https://kod.djpw.cz/avhb">Samostatná ukázka</a></p>

<p>URL stránky vložitelné do <i>frame</i> je tedy: <code>https://www.facebook.com/video/embed?video_id=<b>796588687069516</b></code></p>

<p>Tento způsob je sice o trochu úspornější než předchozí – 22 požadavků a 0,43 MB, ale pořád to není žádná sláva.</p>

<p>Výhoda ale spočívá v tom, že s <code>&lt;iframe></code>m půjde snáze provést <a href="/lazy-loading"><i>lazy loading</i></a>.</p>


<h2 id="lazy-loading">Lazy loading</h2>

<p>Podobně jako u <a href="/js-youtube-lazy-loading">videí z YouTube</a> můžeme vytvořit na stránce atrapu, která <code>&lt;iframe></code> s videem načte až <b>na vyžádání</b>.</p>

<p>Bohužel v tomto případě půjde obtížněji získat <b>náhled videa</b>. Neexistuje nějaká universální adresa, kde by stačilo <b>změnit ID</b> a obrázek by byl na světě. URL obrázku jde získat jedině přes <a href="https://developers.facebook.com/tools/explorer/?method=GET&path=796588687069516&version=v2.2">Graph API</a>.</p>

<p><img src="/files/facebook-video/url-obrazku.png" alt="Získání URL obrázku" class="border"></p>



<h2 id="automaticke-prehravani">Automatické přehrávání Facebook videa</h2>

<p>Spustit video rovnou při načtení není normálně dosažitelné. Jde ale využít <b>mobilní verse</b>, kde to funkční je (<a href="https://kod.djpw.cz/bvhb">ukázka</a>).</p>

<pre><code>&lt;iframe 
  src="https://<i>m</i>.facebook.com/video/video.php?v=<b>796588687069516</b>" 
  frameborder="0" 
  allowfullscreen
>
&lt;/iframe></code></pre>