---
title: "Dialog"
headline: "HTML značka <code>&lt;dialog></code>"
description: "K čemu je dobrá HTML značka <code>&lt;dialog></code>."
date: "2014-07-28"
last_modification: "2014-09-16"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Při interakci webové aplikace s uživatelem se často hodí používat <b>více vrstev</b>, tj. zobrazit nějaký obsah <i>nad stránkou</i>.</p>

<p>Pro takové řešení se vžil název <a href="/lightbox">lightbox</a>, HTML značka <code>&lt;dialog></code> by klasické <i>lightboxy</i> v JavaScriptu mohla nahradit.</p>

<p><img src="/files/dialog/otevreni-zavreni.gif" alt="Ukázka otevření a zavření dialogu" class="border"></p>


<h2 id="podpora">Podpora</h2>

<p>Funguje od <b>Chrome 37</b> a <b>Opery 24</b>. V ostatních a starších prohlížečích se projeví jako <a href="/vlastni-html-znacky">vlastní/neznámá HTML značka</a>, tedy se obsah normálně zobrazí.</p>

<p>Podle specifikace HTML 5.1 by ale měla být odstraněna:</p>

<div class="external-content">
  <ul>
    <li>HTML 5.1: 7. Web application APIs: <a href="https://www.w3.org/TR/html/webappapis.html#dialogs-implemented-using-separate-documents-with-showmodaldialog">Dialogs implemented using separate documents</a></li>
  </ul>
</div>








<p>Je tedy otázka, jestli má značka <code>&lt;dialog></code> budoucnost.</p>


<h2 id="zapis">Zápis</h2>

<pre><code>&lt;dialog>
  Obsah dialogu.
&lt;/dialog></code></pre>

<p>Výše uvedený kód v podporovaných prohlížečích zajistí, že obsah <b>bude skrytý</b> a čekat na otevření.</p>


<h2 id="js-api">JS API</h2>

<p>Aby <code>&lt;dialog></code> nečekal schovaný navždy, existují pro něj <b>dvě JS metody</b> pro otevření a zavření.</p>

<ul>
  <li><b>otevření</b> – <code>dialog.show()</code></li>
  <li><b>otevření modálního okna</b> – <code>dialog.showModal()</code></li>
  <li><b>zavření</b> – <code>dialog.close()</code></li>
</ul>

<div class="live">
<dialog>
  <p>Obsah dialogu</p>
  <button onclick="this.parentNode.close()">
    Zavřít
  </button>
</dialog>
<button onclick="document.querySelector('dialog').show()">
  Otevřít <code>show</code>
</button>
<button onclick="document.querySelector('dialog').showModal()">
  Otevřít <code>showModal</code>
</button>  
</div>

<p><a href="http://kod.djpw.cz/wrfb">Samostatná ukázka</a></p>

<p>Rozdíl mezi <code>show</code> a <code>showModal</code> je v:</p>

<ol>
  <li><b>umístění dialogu</b> – <code>showModal</code> vycentruje dialog vodorovně i svisle, <code>show</code> jen vodorovně, <b>svislá posice</b> se určí na základě umístění <code>&lt;dialog></code>u v kódu,</li>
  <li>možnost použít nativní <b>overlay</b> (překryvnou vrstvu) nad obsahem pod dialogem pomocí pseudoelementu <code>::backdrop</code>,</li>
  
  <li><b>přístupnosti okolního obsahu</b> – modální okno (<code>showModal</code>) neumožňuje pracovat s obsahem stránky mimo dialog,</li>
  
  <li>modální dialog jde najednou otevřít <b>pouze jeden</b>.</li>
</ol>



<h2 id="css">CSS</h2>

<p>Z pohledu CSS je <code>&lt;dialog></code> skryt pomocí <code>display: none</code>.</p>

<p>Při <i>otevření</i> – <code>dialog.show()</code> – dojde k nastavení příznaku <code>[open]</code>, který způsobí odkrytí (<code>display: block</code>) a <a href="/position#absolute">absolutní naposicování</a> dialogu na střed okna.</p>

<p><b>Odstraněním posicování</b> by se dalo docílit <a href="/zobrazit-skryt">běžného odkrývání textu</a>, ale proto existuje jiná značka – <a href="/details"><code>&lt;details></code></a>.</p>

<h3 id="selektory">Selektory</h3>

<p>Pro zaměření otevřeného dialogu tedy můžeme použít:</p>

<pre><code>dialog[open] {
  /* styly pro otevřené */
}</code></pre>

<p>A naopak s využitím <a href="/css-selektory#negace">selektoru negace</a>:</p>

<pre><code>dialog:not([open]) {
  /* styly pro zavřené */
}</code></pre>

<p>Tyto selektory se mohou hodit spíš k odlišení prohlížečů podporujících <code>&lt;dialog></code>. Stylovat totiž jinak můžeme přímo <code>dialog</code>, když do otevření stejně <b>nebude vidět</b>.</p>


<h3 id="backdrop">Překryvná vrstva <code>::backdrop</code></h3>

<p>Pomocí <code>dialog::backdrop</code> jde vytvořit <i>pod</i> dialogem například pseudo-element (vrstvu), která <b>překryje zbytek obsahu</b>, jak napovídá výchozí styl v prohlížeči.</p>

<pre><code>dialog::backdrop {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.0980392);
}</code></pre>

<p>Vrstvu <code>::backdrop</code> lze použít jen při otevření přes <code>show<b>Modal</b></code>, u samotné metody <code>show</code> použít nepůjde.</p>



<h2 id="vyuziti">Využití</h2>

<p>Momentálně značka <code>&lt;dialog></code> moc užitečná není. Pro nedostatečnou podporu stejně musíme zajistit požadovanou funkčnost přepínáním <a href="/prepinani-trid">tříd</a>/<a href="/toggle-data-atributy">data-atributů</a>.</p>

<p>Navíc použití <i>skutečného</i> dialogu nějak výrazně tvorbu „lightboxu“ (například s ohledem na <b>datovou velikost</b>) nezlepší.</p>



<h2 id="formular">Formulář v dialogu</h2>

<p>Další vlastností <code>&lt;dialog></code>u je použití speciálního <b>formuláře</b>.</p>

<p>Formulář bude mít jako <i>metodu</i> uvedeno <code>dialog</code>:</p>

<pre><code>&lt;form method="<b>dialog</b>">
  &lt;button <i>value="hodnota"</i>>
    Tlačítko
  &lt;/button>
&lt;/form></code></pre>

<p>Což způsobí, že <code>value</code> tlačítka půjde po kliknutí zjistit v události <code>onclose</code> z vlastnosti <code>returnValue</code>:</p>

<pre><code>&lt;dialog <i>onclose</i>="alert(this.<b>returnValue</b>)"></code></pre>

<p><a href="http://kod.djpw.cz/yrfb">Samostatná ukázka</a> / <a href="http://kod.djpw.cz/zrfb">Zadání a zpracování textové hodnoty</a></p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>HTML5Rocks.com: <a href="http://updates.html5rocks.com/2014/07/dialog-element-shipped-in-Chrome-37-Beta">dialog element: shipped in Chrome 37 Beta</a></li>
  
  <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2014/09/15/making-modal-windows-better-for-everyone/">Making Modal Windows Better For Everyone</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop">CSS pseudo-element ::backdrop</a></li>
  
  <li>Ukázka použití: <a href="http://demo.agektmr.com/dialog/">dialog element demo</a></li>
</ul>