---
title: "Identifikátor v HTML/CSS/JS"
headline: "HTML/CSS/JS identifikátor <code>id</code>"
description: "K čemu se hodí identifikátor, kdy ho používat a jaké znaky může obsahovat."
date: "2017-05-27"
last_modification: "2017-05-31"
status: 1
tags: ["css", "html", "html-atributy", "js", "selektory-css"]
format: "html"
---

<p>HTML atribut <code>id</code> má poměrně široké využití:</p>

<ol>
  <li>
    <p>Odkazování na části stránky pomocí #kotev:</p>
    
    <pre><code>&lt;a href="#<b>identifikator</b>">
  Odkaz
&lt;/a>
…
&lt;div id="<b>identifikator</b>">&lt;/div></code></pre>
  </li>
  
  
  
  
  
  <li>
    <p>Propojení dvojice značek přes <a href="/label-for"><code>&lt;label for></code></a>:</p>
    
    <pre><code>&lt;input id="<b>identifikátor</b>">
&lt;label for="<b>identifikátor</b>">
  Popisek tlačítka
&lt;/label></code></pre>
  </li>
  
  
  
  
  
  
  
  
  
  
  <li>
    <p>Znázornění vztahu při použití <a href="/aria"><code>aria-*</code> atributů</a>:</p>
    
    
    <pre><code>&lt;label for="policko&gt;
  Název pole
&lt;/label&gt;
&lt;input id="policko" <b>aria-describedby</b>="<i>popisek</i>"&gt;
&lt;i id="<i>popisek</i>&gt;Popisek políčka&lt;/i&gt;</code></pre>
  </li>
  
  
  
  
  
  
  
  
  
  <li>
    <p>Zaměření elementu <a href="/css-selektory#id-class">CSS selektorem</a>:</p>
    
    <pre><code>#<b>identifikator</b> {
    color: red;
}</code></pre>
  </li>
  
  
  
  
  
  
  <li>
    <p>Získání elementu v JavaScriptu metodou <a href="/getelement#id"><code>getElementById</code></a>:</p>
    
    <pre><code>var el = document.getElementById('identifikator');</code></pre>
    
    <p>V JS má <code>id</code> ještě jednu zajímavou vlastnost. Každý HTML element s identifikátorem je dostupný přímo přes proměnnou stejného názvu.</p>
    
    <pre><code>&lt;div id="identifikator">&lt;/div>
&lt;script>
  identifikator.innerHTML = 'Text';
&lt;/script></code></pre>
    
    <p>Do uvedeného <code>&lt;div></code>u se tak nastaví obsah „Text“ – <a href="http://kod.djpw.cz/ajhc">ukázka</a>.</p>
    
    <p>Obecně na to není moc dobré spoléhat, protože je velmi snadné si tuto proměnnou přepsat jiným obsahem.</p>
  </li>
</ol>













<h2 id="praxe">Použití identifikátorů v praxi</h2>

<p>Ačkoliv je s „<code>id</code>éčky“ možné dělat spoustu věcí, v praxi si jde vystačit s použitím pouze pro kotvy a provázání <code>&lt;label></code>ů s <a href="/formulare">formulářovými</a> prvky + provázání s atributy pro lepší přístupnost <code>aria-*</code>.</p>

<p>V <b>CSS</b> si jde vystačit jen s třídami. ID oproti nim nenabízejí nic navíc – kromě toho je selektor <code>#id</code> silnější než <code>.trida</code> – to bývá většinou nevýhodné, jelikož bývá přehlednější mít sílu selektorů co možná nejnižší.</p>


<p>Pro zaměření elementů v <b>JavaScriptu</b> je zase užitečné mít v HTML kódu jasně poznamenané, co se v JS používá, tj. využít třeba prostých tříd s prefixem <code>js-*</code>.</p>

<pre><code>&lt;div class="<b>js-identifikator</b>">
&lt;/div></code></pre>






<p>Při dodržení tohoto postupu se jde potom spolehnout na to, že pro CSS se používají jen třídy, pro JavaScript třídy s prefixem a identifikátory tak slouží pouze pro #odkazování a provázání elementů.</p>






<h2 id="znaky">Povolené znaky</h2>

<p>V HTML 5 se poměrně uvolnilo omezení znaků, které je možné v <code>id</code> atributu použít.</p>

<p>Existuji pouze dvě pravidla – v ID <b>nemůže být mezera</b> a musí mít <b>alespoň jeden znak</b>.</p>

<p>Není tedy problém používat libovolnou diakritiku a speciální znaky. Jediný problém může nastat v CSS, kde platí odlišná pravidla. Číslo na začátku ID se tak musí escapovat nebo použít atributový selektor.</p>

<pre><code>&lt;div id="1337">&lt;/div></code></pre>




<p>Výše uvedený element tak (ne)jde zaměřit:</p>



<pre><code>#1337 { /* nefunguje */ }
[id=1337] { /* atribut funguje */ }
#\31 337 { /* escapování funguje */ }</code></pre>









<p>Při používání ID ke stylování je tak lepší zachovat přísnější pravidla.</p>



<h3 id="css-escapovani">Escapování v CSS</h3>

<p>Je-li nevyhnutelné části selektoru v CSS escapovat, jde k tomu použít nějaký hotový nástroj:</p>

<div class="external-content">
  <ul>
    <li><a href="https://mothereff.in/css-escapes">CSS escapes</a> – hotové řešení escapování v CSS</li>
  </ul>
</div>


<h3 id="duplicitni">Duplicitní ID</h3>

<p>Ještě by každé <code>id</code> mělo být na stránce pouze jednou – jinak je stránka <a href="/validita">nevalidní</a>. V praxi je to spíš problém kvůli tomu, že první ID <i>vyhrává</i> a ta další jsou ignorována (vyjma CSS, kde není problém zaměřit více elementů se stejným identifikátorem).</p>


<h3 id="znaky-html4">Omezení v HTML 4</h3>

<p>Ve starších specifikacích HTML byly požadavky na znaky v identifikátorech mnohem přísnější. Podobně jako v <a href="/zvlastni-znaky-class">názvech CSS tříd</a> neměl identifikátor začínat číslicí.</p>

<p>Obsahovat mohl pouze písmena bez diakritiky, číslice, tečku, dvojtečku, spojovník a podtržítko.</p>

<div class="external-content">
  <ul>
    <li>W3C: <a href="https://www.w3.org/TR/html4/types.html#type-id">SGML basic types: <code>id</code></a> – povolené znaky v <code>id</code></li>
  </ul>
</div>

<p>V <b>prohlížečích</b> dlouhodobě funguje všechno, takže se toto omezení ukázalo jako zbytečně přísné.</p>