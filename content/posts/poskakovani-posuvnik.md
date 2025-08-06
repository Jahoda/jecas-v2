---
title: "Poskakování kvůli scrollbaru"
headline: "Poskakování stránky kvůli posuvníku"
description: "Jak zabránit, aby obsah stránky poskakoval v závislosti na posuvníku."
date: "2014-12-14"
last_modification: "2023-08-06"
status: 1
tags: ["css", "hotova-reseni", "napady", "scroll"]
format: "html"
---

<p>Pokud je obsah stránky <a href="/centrovani#margin-auto">centrovaný</a> a některé stránky <b>jsou krátké</b>, takže se neobjeví <b>svislý posuvník</b> (zpravidla na pravé straně), způsobí přechod mezi dlouhou stránkou (s posuvníkem) a krátkou (bez posuvníku) <b>nepěkné poskočení.</b></p>

<p>U webových aplikací k podobné situaci často dochází, když se obsah stahuje asynchronně a během načítání se tak výška stránky změní.</p>

<p>Existují dvě bezpracné možnosti jako vytvářet stránky <b>delší</b> (vyšší) nebo:</p>

<blockquote cite="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=149954#8">
  <p>Neřešit.</p>
  <p><cite><a href="http://plavacek.net">Plaváček</a></cite></p>
</blockquote>







<h2 id="cls">CLS</h2>

<p>CLS je zkratka <i lang="en">Cumulative Layout Shift</i> pro metriku označující neočekávané <b>poskakování layoutu</b>.</p>

<p>Tuto nepříjemnou věc může způsobovat řada věcí – posuvník může být jedna z nich.</p>

<p>Jde o to, že zobrazivší se posuvník během načítání zmenší dostupnou šířku. Tím dost často dojde k potřebě stávající obsah překreslit.</p>

<p>Tento problém se týká hlavně <b>webových aplikací</b> / <a href="/spa">SPA</a> a průběžného načítání.</p>

<p>U klasického webu generovaného čistě na serveru má zpravidla prohlížeč obsah dostupný rovnou, takže dokáže rovnou rozhodnout, jestli (ne)bude posuvník potřeba.</p>

<div class="external-content">
  <ul>
    <li>
      Web.dev: <a href="https://web.dev/cls/">Cumulative Layout Shift</a>
    </li>
  </ul>
</div>








<h2 id="min-height">Minimální výška</h2>

<p>Vlastností <code>min-height</code> lze zadat minimální výšku obsahu na hodnotu, která posuvník vytvoří. Může to být ale <b>matoucí/nepříjemné pro uživatele</b>, protože mohou kvůli tomu <b>zbytečně rolovat</b>.</p>

<p><a href="https://kod.djpw.cz/frib">Živá ukázka</a></p>






<h2 id="overflow">Přidání posuvníku</h2>

<p>Jednoduchou konstrukcí jde přidat posuvník i v případech, že není potřeba – <b>bude neaktivní</b> (zašedlý).</p>

<p>Má to trochu nevýhodu, že je potom na stránce posuvník vždy a může ji to trochu hyzdit.</p>

<pre><code>html {
  overflow-y: scroll;
}</code></pre>

<p><a href="https://kod.djpw.cz/erib">Živá ukázka</a></p>











<h2 id="scrollbar-gutter">CSS vlastnost <code>scrollbar-gutter</code></h2>

<p>Poměrně nová CSS vlastnost <code>scrollbar-gutter</code> (nepodporuje ji <b>Safari</b>) dokáže upravit přístup prohlížeče k posuvníku.</p>

<p>Zvlášť užitečná je hodnota <code>stable</code>:</p>

<pre><code>html {
  scrollbar-gutter: stable;
}</code></pre>









<p>Tím se zajistí, že prohlížeč pro daný element <b>vždy</b> vyhradí místo pro posuvník.</p>


<p><a href="https://kod.djpw.cz/exjd">Živá ukázka</a></p>

<p>Trochu problém u ní je, že v případě aplikování přímo pro <code>&lt;html></code> logicky vyhrazuje místo u ní.</p>

<p>Chová se to dost podobně, jako by se přidalo vnitřní odsazení přes <code>padding</code>.</p>

<p>Pokud se tedy pozadí stránky nastavuje až v nějakém vnořeném elementu, výsledek může být visuálně dost podobný jako neaktivní posuvník.</p>

<p><a href="https://kod.djpw.cz/fxjd">Živá ukázka</a></p>

<div class="external-content">
  <ul>
    <li>
      MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter">scrollbar-gutter</a>
    </li>
  </ul>
</div>


<h2 id="js-posuvnik">Vlastní posuvník</h2>

<p>Jedno z možných řešení je si <b>posuvník zajišťovat po svém</b> — prostým vhodně ostylovaným <code>&lt;div></code>em, který bude absolutně posicovaný, takže nebude ovlivňovat <b>vykreslení obsahu</b>.</p>

<div class="internal-content">
  <ul>
    <li>Vlastní vzhled scrollbaru: <a href="/styl-posuvniku#js">Posuvník v JavaScriptu</a></li>
  </ul>
</div>

<p>Nestandardní <i>scrollbar</i> ale nemusí být pro návštěvníky úplně ideální.</p>

<blockquote cite="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=149954#10">
  <p>I kdyby měla náhrada vyřešené rolování kolečkem, klávesnicí i dotykem (se zachováním setrvačnosti) a autoscroll, nikdy nebude respektovat uživatelské nastavení, jako je třeba velikost a plynulost posunu. Dojem, že na stránce je cosi divného, je pak silnější, než kdyby obsahový blok cukal o pár pixelů do strany.</p>
  
  <p><cite><a href="http://webylon.info">Chamurappi</a></cite></p>
</blockquote>










<h2 id="odecteni">Odečtení šířky</h2>

<p>S využitím jednotky <code>vw</code> (<i>viewport</i> — rozměry okna) a počítání <a href="/calc"><code>calc</code></a> je možné dopočítat šířku posuvníku a nastavit ji jako levý <code>margin</code> <b>čistě v CSS</b>. Řešení je funkční od <b>IE 9</b>.</p>

<pre><code>html {
    margin-left: calc(100vw - 100%);
}</code></pre>

<p>Bude to fungovat tak, že v případě <b>krátké stránky</b> bude levý margin nulový (šířka <i>viewportu</i> se bude rovnat šířce elementu <code>&lt;html></code>).</p>

<p>V případě <b>dlouhé stránky</b> bude <i>viewport</i> šírší o šířku posuvníku. O tuto šířku se potom dlouhá stránka <i>odšťouchne</i> zleva.</p>

<p><a href="https://kod.djpw.cz/jrib-">Živá ukázka</a></p>











<h2 id="sirka-posuvniku">Změření šířky posuvníku</h2>

<p>Je-li potřeba dynamicky reagovat na šířku posuvníku, docela elegantní řešení je změřit šířku JavaScriptem a nastavit ji do <a href="/var">CSS proměnné</a>.</p>

<p>Posuvník totiž dokáže být v různých prohlížečích a systémech <b>různě široký</b>.</p>

<p>V <b>macOS</b> navíc ještě mění svou šířku na základě toho, jestli je či není připojena myš.</p>

<pre><code>function setScrollbarWidthVariable() {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    document.body.appendChild(div);
    let scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
}

setScrollbarWidthVariable()</code></pre>


<p>Tento kód nastaví proměnnou <code>scrollbar-width</code>, která bude kdekoliv dostupná k použití:</p>

<pre><code>.cokoliv {
  width: var(--scrollbar-width);
}</code></pre>

<p><a href="https://kod.djpw.cz/hxjd">Živá ukázka</a></p>


















<h2 id="modal">Poskakování obsahu za modálem</h2>

<p>Při zobrazování obsahu v modálu se typicky pro celou stránku vypíná scrollování, protože modál bude mít scrollbar vlastní.</p>

<pre><code>.is-modal-open {
  overflow: hidden;
}</code></pre>







<p>Zde je opět vhodné odšťouchnout obsah, aby neposkaoval. Třeba průhledným <code>border</code>em:</p>

<pre><code>.is-modal-open {
  overflow: hidden;
  border-right: var(--scrollbar-width) solid transparent;
}</code></pre>

<!--

<h2 id="odstouchnuti">Odšťouchnutí</h2>

<p><b>Chamurappi</b> vytvořil jednoduchý JavaScript, který <b>změří šířku posuvníku</b> a přidá ji u krátkých stránek jako pravé <a href="/margin">odsazení</a> (<code>margin-right</code>).</p>

<p><a href="https://kod.djpw.cz/hrib">Živá ukázka</a></p>

<h2 id="mobilni-zarizeni">Mobilní zařízení</h2>

<p>Při <i>odšťouchávání</i> je nutné dát pozor při vytvářneí <a href="/responsivni-web">responsivní podoby webu</a>, kde nejspíš budeme chtít obsah přes celou šířku a odšťouchnutí by bylo nežádoucí. Pokud je <b>centrovaný obsah</b> široký <code>900px</code>, stačí kód, který odsunutí zajistí obalit <a href="/mobilni-web#media-queries"><code>@media</code> pravidlem</a>, aby se při menší šířce <b>neaplikoval</b>:</p>

<pre><code>@media (min-width: 900px) {
}</code></pre>
-->