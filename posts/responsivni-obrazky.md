---
title: "Responsivní obrázky"
headline: "Responsivní obrázky"
description: "Co s obrázky na mobilních zařízeních?"
date: "2013-11-26"
last_modification: "2014-01-06"
status: 1
tags: ["hotova-reseni", "obrazky", "responsive"]
format: "html"
---

<p>Poradit si s <b>obrázky</b> (tím jsou myšleny obyčejné PNG/GIF/JPG obrázky vložené značkou <code>&lt;img></code> — ne například vektory/<a href="/svg">SVG</a>) je jedna z největších výzev při vytváření <a href="/responsive">responsivního designu</a>. Proč?</p>

<ol>
  <li>Obrázky mají fysicky dané <b>pevné rozměry</b> v pixelech. Tyto rozměry jsou často větší než obvyklá šířka mobilních obrazovek, což je <b>třeba</b> 480 pixelů.</li>
  <li>Při změně velikosti na jinou než výchozí, a to menší i větší, dojde ke <b>ztrátě kvality</b>.</li>
</ol>


<h2 id="max-width">Nastavit <code>max-width</code></h2>

<p>Nejprostší řešení je šířku obrázkům omezit na 100 %.</p>

<pre><code>img {
  max-width: 100%
}</code></pre>





<p>A je to. Je potřeba myslet na <a href="/box-model">box model</a>. V případě výchozího okrajového se přičte případný <code>padding</code> nebo <code>border</code> (<a href="http://kod.djpw.cz/iebb">ukázka</a>). Zároveň je nutné nechat dopočítat výšku podle té nové šířky. Takže spíš použít:</p>

<pre><code>img {
  max-width: 100%; 
  <b>box-sizing: border-box</b>; 
  <i>height: auto</i>
}</code></pre>





<p><b>Nevýhoda</b> tohoto postupu je zřejmá:</p>

<ol>
  <li><p>Bude se značně <b>plýtvat s daty</b>.</p></li>
  <li><p>Zmenšení/zvětšení v prohlížeči <b>nebude tak kvalitní</b>, jak by mohlo  být.</p></li>
  
  <li>
    <p>Prohlížeč nebude do načtení obrázku znát jeho rozměry a nepůjde mu tak <b>vyhradit přesné místo</b>. Stránka tedy může během načítání poskakovat.</p>
  <div class="internal-content">
    <ul>
      <li><p><a href="/rozmery-responsivniho-obrazku">Nastavení výšky responsivního obrázku</a> – nastavení výšky podle šířky</p></li>
    </ul>
  </div>
  </li>
</ol>



<h2 id="vice-obrazku">Více obrázků</h2>

<p>Druhé (a kromě jednoduchosti lepší) řešení spočívá ve vytvoření více obrázků s různými rozměry. To je nejlepší nějak zautomatisovat na straně serveru (<a href="http://php.vrana.cz/zmensovani-obrazku.php">řešení v PHP</a>).</p>

<p>Potom už stačí jen v <b>závislosti na zařízení</b> zobrazit ten vhodný rozměr.</p>

<h3 id="server">Řešení na straně serveru</h3>
<p><b>Hotové řešení</b> v PHP je například <a href="http://adaptive-images.com/">Adaptive Images</a>. Funguje to tak, že jednoduchý JavaScript uloží do cookie rozlišení obrazovky:</p>

<pre><code>document.cookie = 'resolution=' + 
  Math.max(screen.width, screen.height) +
  '; path=/';</code></pre>

<p>Potom se úpravou souboru <code>.htaccess</code> zajistí, aby požadavky na obrázky zpracovával PHP skript. Ten si vezme z cookie hodnotu rozlišení a podle toho vygeneruje obrázek. Různé velikosti obrázků se pro urychlení následně <b>ukládají do cache</b>.</p>

<p>Nevýhoda tohoto řešení může být v tom, že se na stejné adrese nachází různé velikosti téhož obrázku. A nejspíš bude taktéž problém v tom, že při změně rozměrů se zobrazí obrázek z cache, a tedy se špatnou velikostí.</p>

<h3 id="js">Řešení v JavaScriptu</h3>
<p>Když v redakčním systému zajistíme <b>generování různých velikostí</b>, můžeme je potom nastavovat JavaScriptem.</p>

<p>Využít jde podobného postupu jako při <a href="/lazy-loading-obrazky">lazy loadingu obrázků</a> — <code>&lt;noscript></code> značku, do které se umístí skutečný obrázek a poblíž ní vloží JavaScript zmenšeninu/zvětšeninu podle <b>aktuálního rozlišení</b>.</p>

<p>Tak funguje třeba <a href="https://github.com/scottjehl/picturefill">Picturefill</a>.</p>

<h3 id="detekce">Detekce mobilního prohlížeče</h3>
<p>Ještě je možnost <a href="/mobilni-web#detekce">detekovat mobilní prohlížeč</a> z hlavičky <code>user-agent</code> a o velikosti obrázku, který se má vložit, rozhodnout na straně serveru.</p>

<p>Zde může být problém, že jako mobilní bude určeno staré zařízení s rozlišením 320 × 240 i nové s rozlišením 1920 × 1080.</p>

<h2 id="lightbox">Lightbox</h2>
<p><a href="/magnific-popup">Lightbox</a> pro zobrazení plného obrázku je většinou lepší <b>na mobilních zařízeních zrušit</b>. Vyhneme se tak trapné situaci, kdy se po rozkliknutí náhledu zobrazí datově velký obrázek, který ale bude ve finále stejně velký nebo dokonce menší než náhled.</p>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li><a href="https://github.com/aFarkas/lazysizes">lazysizes</a> – JS knihovna umožňující zobrazit vhodný obrázek pro dané rozlišení</li>
  
  <li>Smashing Magazine: <a href="http://mobile.smashingmagazine.com/2014/02/03/one-solution-to-responsive-images/">One Solution To Responsive Images</a></li>
  
  <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2014/05/12/picturefill-2-0-responsive-images-and-the-perfect-polyfill/">Picturefill 2.0: Responsive Images And The Perfect Polyfill</a></li>
  
  <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2014/05/14/responsive-images-done-right-guide-picture-srcset/">Responsive Images Done Right: A Guide To &lt;picture> And srcset</a></li>
  
  <li><a href="http://sizersoze.org/">Sizer Soze</a> – spočítá, jak by responsivní obrázky snížily datový objem</li>
  
  <li><a href="http://www.webdesignerdepot.com/2015/08/the-state-of-responsive-images/">The state of responsive images in 2015</a></li>
</ul>