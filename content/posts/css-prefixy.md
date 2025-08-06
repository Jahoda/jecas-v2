---
title: "CSS prefixy"
headline: "CSS prefixy"
description: "Některé CSS vlastnosti se zapisují s prefixy. Proč tomu tak je a jak prefixy zapisovat."
date: "2013-09-11"
last_modification: "2016-05-08"
status: 1
tags: ["css", "webove-prohlizece"]
format: "html"
---

<p>Jedná se o zápisy typu <code>-moz-</code>, <code>-webkit-</code>, <code>-ms-</code> nebo <code>-o-</code> před samotnými CSS vlastnostmi.</p>



<h2>K čemu je to dobré</h2>

<p>Při <b>vývoji</b> jednotlivých prohlížečů se přidávají různé nové vlastnosti. Protože se může zjistit, že by nová vlastnost měla fungovat <b>ve finální podobě jinak</b>, nejprve se přidá ve zkušební podobě s prefixem.</p>

<ol>
  <li>
    <p>Nehrozí potom tolik, že finální podoba dané vlastnosti <b>rozbije již dříve vytvořený web</b>.</p>
  </li>
  <li>
    <p>Pro autora webu je prefix <b>varování</b>, že se může něco změnit.</p>
  </li>
  <li>
    <p>Na první pohled je jasné, který prohlížeč danou vlastnost podporuje.</p>
  </li>
</ol>



<h2 id="css">Prefixy v CSS</h2>

<dl>
  <dt>Internet Explorer</dt>
  <dd><p>Používá od verse 9 prefix <code>-ms-</code>.</p></dd>
  
  <dt>Firefox</dt>
  <dd><p>Používá prefix <code>-moz-</code>.</p></dd>
  
  <dt>Webkit/Blink</dt>
  <dd><p>Prohlížeče s jádrem Blink (<b>Chrome</b>, <b>Safari</b>, <b>Opera</b> od verse 15) používají prefix <code>-webkit-</code>.</p></dd>
  
  <dt>Opera</dt>
  <dd><p>Starší verse (<a href="/opera"><b>Opera 12</b></a>) používají prefix <code>-o-</code>. Nicméně Opera u drtivé většiny vlastností, kde ostatní používají prefixy, žádný prefix nepotřebuje.</p></dd>
</dl>

<p>Pokud je potřeba zapsat nějakou <i>CSS novinku</i> pro všechny prohlížeče, dost nepěkně nám kód nabobtná.</p>

<p>Příklad oprefixovaného zápisu <a href="/rotace">rotační transformace</a>.</p>

<pre><code>-webkit-transform: rotate(-90deg);
-moz-transform: rotate(-90deg);
-ms-transform: rotate(-90deg);
-o-transform: rotate(-90deg);
transform: rotate(-90deg);</code></pre>
















<h2 id="poradi">Pořadí vlastností</h2>

<p>Existuje dilema ohledně volby pořadí CSS vlastností s a bez prefixu.</p>

<p>Na jednu stranu dává smysl umístit vlastnost bez prefixu jako poslední, aby přepsala experimentální implementace s prefixy a podporující prohlížeče tak použili optimální variantu.</p>


<p>Na stranu druhou je <b>použití neprefixované vlastnosti jako poslední</b> menším krokem do neznáma. Pokud by se změnilo chování finální vlastnosti bez prefixu oproti té s prefixem, mohl by se v novějších prohlížečích web rozbít.</p>




<h2 id="js">Prefixy v JavaScriptu</h2>

<p>Mají-li se nastavovat vlastnosti funkční jen s prefixy prostřednictvím JS, stačí převést vlastnost s prefixem dle obvyklé konvence:</p>

<ol>
  <li><b>písmeno za pomlčkou</b> (spojovníkem) se <b>zapíše velké</b>,</li>
  <li><b>pomlčka se vypustí</b></li>
</ol>



<p>Tedy jako se z <code>background-color</code> udělá <code>backgroundColor</code>, analogicky z <code>-webkit-transform</code> bude <code>WebkitTransform</code>.</p>

<p>Aby to nebylo tak jednoduché, tak <b>Internet Explorer</b> první písmeno na začátku nezvětšuje, takže v něm funguje <code>msTransform</code>.</p>

<p>JS zápis výše uvedeného CSS by mohl vypadat následovně.</p>

<pre><code>element.style.WebkitTransform =
element.style.MozTransform =
element.style.<b>m</b>sTransform =
element.style.oTransform =
element.style.transform = "rotate(-90deg)";</code></pre>











<p>Lze si vypomoci hotovými knihovnami, které <b>sjednocují výše uvedený zápis</b>, nebo se, pokud je to jen trochu možné, <b>snažit skriptem nastavovat jen třídu</b> a styly nastavit přímo v CSS — tam nám může pomoci se psaním prefixů <a href="/sublime-text#snippet">snippet</a> nebo CSS preprocesor.</p>




<h2 id="hotova-reseni">Hotová řešení</h2>
<dl>
  <dt><a href="http://leaverou.github.io/prefixfree/#">Prefix free</a>
  <dd><p>Stačí připojit jeden JS soubor a připojené CSS bude automaticky oprefixováno.</p>
  
  <dt><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></dt>
  
  <dd>
    <p>Automatické doplnění potřebných prefixů v různých programovacích jazycích.</p>
  </dd>
  
  <dt><a href="http://lesshat.com/">LESS Hat</a></dt>
  
  <dd><p>Předpřipravené oprefixované vlastnosti pro CSS preprocesor <a href="http://lesscss.org/">LESS</a>.</p>
    <p>Vytvořit <a href="/blur">rozmazání</a> je potom otázka zápisu:</p>
    <pre><code>div {
 .blur(5px);
}</code></pre>
    
    
    
    <p><b>Výsledek:</b></p>
    <pre><code>div {
 -webkit-filter: blur(5px);
 -moz-filter: blur(5px);
 -ms-filter: blur(5px);
 filter: blur(5px);
}</code></pre>
  </dd>
</dl>















<div class="external-content">
  <ul>
      <li>David Walsh: <a href="http://davidwalsh.name/goodbye-vendor-prefixes">Say Goodbye to Vendor Prefixes</a></li>
  </ul>
</div>



<h2 id="budoucnost">Budoucnost prefixů</h2>

<p>Lze očekávat, že se do budoucna bude od používání prefixů ustupovat. Místo toho by měly fungovat obyčejné názvy CSS vlastností, jejichž funkci bude nutné zapnout v nastavení, než se stanou standardně podporovanými.</p>

<div class="external-content">
  <ul>
    <li>WebKit: <a href="https://webkit.org/blog/6131/updating-our-prefixing-policy/">Updating Our Prefixing Policy</a> – upouštění od prefixů</li>

  </ul>  
</div>

<!--<h2 id="odkazy">Odkazy jinam</h2>-->

