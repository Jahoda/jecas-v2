---
title: "Facebook Like, Google Plus a Twitter tlačítka"
headline: "Tlačítka pro sdílení na sociálních sítích"
description: "Různé možnosti, jak mít na webu tlačítka pro sdílení na sociálních sítích."
date: "2013-05-25"
last_modification: "2013-05-25"
status: 1
tags: ["facebook", "google-plus", "lazy-loading", "twitter"]
format: "html"
---

<h2>Prosté vložení</h2>
<h3 id=facebook>Facebook</h3>
<p>Na <a href='https://developers.facebook.com/docs/reference/plugins/like/'>příslušné stránce</a> se získá kód pro vložení Facebook JavaScript SDK.
<p>A následně pro kód daného tlačítka.
<pre><code>&lt;div id="fb-root">&lt;/div>
&lt;script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/cs_CZ/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));&lt;/script>
&lt;div class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false">&lt;/div></code></pre>


<h3 id=twitter>Twitter</h3>
<p>Na <a href='https://twitter.com/about/resources/buttons#tweet'>stránce tlačítek</a> dostaneme tento kód:
<pre><code>&lt;a href="https://twitter.com/share" class="twitter-share-button">Tweet&lt;/a>
&lt;script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');&lt;/script></code></pre>

<h3 id=gplus>Google Plus</h3>
<p>U <a href='https://developers.google.com/+/web/+1button/'>Google +1 tlačítka</a> je situace obdobná:
<pre><code>&lt;div class="g-plusone" data-annotation="inline" data-width="300">&lt;/div>
&lt;script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
&lt;/script></code></pre>

<p>Je to celkem jednoduché, ale jak je to s rychlostí a počtem požadavků na externí JavaScripty, obrázky a podobně?

<table>
<tr>
<th>Síť <th>Počet HTTP požadavků <th>Přibližná doba načtení
<tr>
<td>Facebook <td>7 <td>0,7 s
<tr>
<td>Twitter <td>7 <td> 0,5 s
<tr>
<td>Google Plus <td>7 <td> 0,3 s
<tr>
<td><b>Celkem</b><td><b>21</b><td><b>1,5 s</b>
</table>

<p>To nejsou zrovna čísla, se kterými by se vyhrávala soutěž o nejrychlejší web.


<h2 id=odkazy>Použít odkazy</h2>
<p>… a případně je nějak hezky nastylovat:
<ul>
<li>pohrát si s CSS,
<li>použít nějakou z milionu dostupných obrázkových sad,
<li>použít <a href="/font-ikony">font-ikony</a>, například <a href='http://fortawesome.github.io/Font-Awesome/icons/#brand'>Font Awesome</a>
</ul>

<p>Adresy pro sdílení jsou následující.
<table>
<tr><th>Síť<th>Odkaz
<tr><td>Facebook<td><code>http://www.facebook.com/sharer.php?u=<b>http://example.com</b></code>
<tr><td>Twitter<td><code>http://twitter.com/share?text=<b>Text</b>&url=<b>http://example.com</b></code>
<tr><td>Google Plus<td><code>https://plus.google.com/share?url=<b>http://example.com</b></code>
</table>
<p>Stránka pro sdílení se může klidně zobrazovat v nějakém vyskakovacím okně (použití <a href='http://jecas.cz/magnific-popup'>lightboxu</a> a zobrazení v <code>&lt;iframe></code> je bohužel zakázáno).

<h2 id=na-vyzadani>Načtení po vyžádání</h2>
<p>Protože takové odkazy nejsou úplně plnohodnotné, zajímavý kompromis může být zobrazovat místo skutečných tlačítek jen jejich obrázkové <i>makety</i>. Tedy dát výše zmíněným odkazů pomocí obrázků styl originálních tlačítek, ta se načtou až při nějaké události (například <code>onmouseover</code> elementu s tlačítky). A nejspíš bude vhodné je do daného prostoru absolutně naposicovat / nastavit šířku a <code>overflow: hidden</code>, aby se zamezilo poskakování.


<!-- Kód ukázky -->
<div class="live">
  <script>
    function facebook()
    {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/cs_CZ/all.js#xfbml=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    }
    
    function twitter()
    {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    }
    
    function gplus()
    {
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }
  </script>
  <style>
    .share a {display: inline-block; width: 100px; text-align: center; padding: .5em; color: #fff; 
      text-decoration: none;}
    .share .fb-like {background: #4B67A1}
    .share .twitter-share-button {background: #00ACEE;}
    .share .g-plusone {background: #DD4B39}
  </style>

  <div id="fb-root"></div>
  <div class="share" onmouseover="facebook(); twitter(); gplus(); this.className = ''">
    <a href='http://www.facebook.com/sharer.php?u=http://jecas.cz/sdileci-tlacitka' class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false">Facebook</a>
    <a href="http://twitter.com/share?text=Odkaz&url=http://jecas.cz/sdileci-tlacitka" class="twitter-share-button">Tweet</a>
    <a href='https://plus.google.com/share?url=http://jecas.cz/sdileci-tlacitka' class="g-plusone" data-size="medium">Google +</a>
  </div>
</div>
<!-- / konec ukázky -->

<p>Je otázka, zda si s něčím takovým vyhrát, když lze očekávat, že v rámci ochrany před sledováním (skript pro tlačítko může monitorovat všechny návštěvníky, co na web přijdou) budou tato tlačítka prohlížeči blokována. A funkce těchto tlačítek <a href='http://www.mozilla.cz/zpravicky/firefox-ziskal-sdileni-odkazu/'>budou možná přímo v prohlížečích</a>.

<h2>Související</h2>
<ul>
<li><a href='http://www.paulund.co.uk/lazy-load-social-media'>Lazy Load Social Media Buttons</a>
  
  <li><a href="https://365tipu.wordpress.com/2015/07/21/tip202-jake-sdileci-prvky-umistit-na-web-proc-musi-byt-web-socialni/">TIP#202: Jaké sdílecí prvky umístit na web? Proč musí být web sociální?</a></li>
</ul>