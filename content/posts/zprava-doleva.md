---
title: "Zprava doleva"
headline: "Zprava doleva"
description: "HTML značky, HTML, atributy a CSS vlastnosti pro text psaný zprava doleva."
date: "2016-01-27"
last_modification: "2016-02-01"
status: 1
tags: ["css", "html", "html-tagy"]
format: "html"
---

<p>Běžný český nebo evropský kodér se s nimi setkat nemusí, ale v HTML a CSS existuje řada prvků určených pro jazyky psané zprava doleva.</p>



<h2 id="dir">Atribut <code>dir</code></h2>

<p>Jedná se o <a href="/obecne-atributy#dir">globální atribut</a> použitelný na kterékoliv blokové značce. U webů psaných zprava doleva se obvykle používá u značky <a href="/html-kostra#html"><code>&lt;html></code></a>.</p>



<p>Jeho použitím jde docílit, že obsah elementu bude vypisován:</p>

<div class="live">
  <p dir="rtl">Zprava doleva.</p>
</div>





<h2 id="bdi"><code>&lt;bdi></code></h2>

<p>Zkratka BDI znamená <i lang="en">Bi-Directional Isolation</i>.</p>

<p>Řádková značka hodící se k obalení slova, u kterého není známé, jestli se píše zleva doprava nebo zprava doleva.</p>

<p>Teoreticky by se tak měl obalovat každý uživatelem zadaný řetězec, který může být zapsán oběma směry.</p>


<p>Prohlížeče mají algoritmus pro <b>automatické rozpoznávání směru textu</b>. Bez použití <code>&lt;bdi></code> například pro obalení přezdívky uživatele může dojít k nežádoucímu jevu, kdy „přepnutí“ mezi oběma směry proběhne jinde, než by mělo.</p>

<div class="live">
  <ul>
   <li>Uživatel <b>fytopuf</b>: 5 příspěvků.
   <li>Uživatel <b>إيان</b>: 3 příspěvky.
  </ul>
</div>




<p>Bez použití <code>&lt;bdi></code> se dvojtečka a číslo zobrazí vlevo od přezdívky. S <code>&lt;bdi></code> se to nestane, protože obsah této značky bude isolován od okolí:</p>
<div class="live">
  <ul>
   <li>Uživatel <bdi><b>fytopuf</b></bdi>: 5 příspěvků.
   <li>Uživatel <bdi><b>إيان</b></bdi>: 3 příspěvky.
  </ul>
</div>




<p>Podporuje pouze <b>Chrome 16+</b> a <b>Firefox 10+</b>.</p>




<h2 id="bdo"><code>&lt;bdo></code></h2>

<p>Zkratka BDO znamená <i lang="en">Bi-Directional Override</i>. Podporuje atribut <code>dir</code> pro nastavení směru textu (<code>ltr</code>/<code>rtl</code>) nezávisle na algoritmu prohlížeče, který požadovaný směr hádá dle obsahu.</p>

<div class="live">
  <p>Uprostřed věty bude slovo <bdo dir="rtl">zprava</bdo> doleva.</p>
</div>




<p>Značka <code>&lt;bdo></code> je velmi dobře podporovaná.</p>


<p>V praxi by se mohla hodit v případech, kdy algoritmus prohlížeče špatně určí žádoucí směr.</p>

<p>Další možné využití je pro různé legrácky.</p>




<h2 id="css">CSS vlastnosti</h2>


<h3 id="direction">CSS <code>direction</code></h3>

<p>V CSS totéž dělá vlastnost <code>direction</code> to samé jako HTML atribut <code>dir</code>:</p>

<div class="live">
  <p style="direction: rtl">Zprava doleva.</p>
</div>




<h3 id="unicode-bidi"><code>unicode-bidi</code></h3>

<p>Pro dosažení výsledku značek <code>&lt;bdi></code> nebo <code>&lt;bdo></code> potom existuje CSS vlastnost <code>unicode-bidi</code>. Je možné ji kombinovat s <code>direction</code>:</p>


<ul>
  <li>
    <p><code>unicode-bidi: isolate</code> – ekvivalent značky <code>&lt;bdi></code>. Isoluje obsah, aby ho správně pochopil automatický algoritmus pro určování textu psaného zprava/zleva.</p>
  </li>
  
  <li>
    <p><code>unicode-bidi: bidi-override</code> – ekvivalent <code>&lt;bdo dir="rtl"></code>.</p>
    
    <pre><code>element {
  direction: rtl;
  unicode-bidi: bidi-override;
}</code></pre>
  </li>
</ul>



<p>Další hodnoty jsou popsány na MDN:</p>

<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi"><code>unicode-bidi</code></a></li>
  </ul>
</div>

<h3 id="text-align"><code>text-align</code></h3>

<p>V případě webu psaného zprava doleva by tomu mělo odpovídat i zarovnání textu vlastností <code>text-align</code>.</p>

<p>Pro vícejazyčné weby jde použít universální hodnoty <code>start</code> a <code>end</code> (místo <code>left</code> a <code>right</code> při psaní zleva doprava), které se přizpůsobí nastavenému směru.</p>

<p>Tyto hodnoty nepodporuje <a href="/microsoft-edge"><b>MS Edge</b></a>, všechny <b>IE</b> a stará <b>Opera 12</b>.</p>

<p><a href="https://kod.djpw.cz/fztb">Živá ukázka</a></p>

