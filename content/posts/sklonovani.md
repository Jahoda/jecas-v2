---
title: "Skloňování"
headline: "České skloňování"
description: "Jak v JS, PHP nebo CSS správně vytvořit skloňování slov pro české prostředí."
date: "2015-01-26"
last_modification: "2015-01-27"
status: 1
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<p>Pokud se má na stránce automaticky vypisovat něco ve stylu „5 nových komentářů“, je třeba <b>řešit skloňování</b>.</p>

<p>Bez správného ohýbání slov by web mohly hyzdit texty typu:</p>

<ul>
  <li>2 nových komentářů</li>
  <li>Nových komentářů: 1</li>
</ul>



<h2 id="cestina">Skloňování počtu v češtině</h2>

<p>Zatímco angličtina rozlišuje mezi jedničkou a vším ostatním (<i>1 comment</i> vs. <i>2 comment<b>s</b></i>), čeština je v tomto komplikovanější.</p>

<ul>
  <li><i>1 komentář</i></li>
  <li><i>2, 3, 4 komentáře</i></li>
  <li><i>5</i> a více <i>komentářů</i></li>
</ul>

<p>Při psaní českého textu aplikace jsou proto potřeba <b>tři různé tvary</b>.</p>




<h2 id="js">Skloňování v JavaScriptu</h2>

<p>Funkce zajišťující správné skloňování musí zvolit česky korektní tvar na základě <b>počtu</b>. Aby funkce fungovala i pro <b>záporná čísla</b> převádí se počet na číslo <b>kladné</b> – absolutní hodnotu (<code>Math.abs</code>).</p>

<pre><code>function sklonovani(pocet, slova) {
  pocet = Math.abs(pocet);
  if (pocet == 1) return slova[0];
  if (pocet &lt; 5 &amp;&amp; pocet > 0) return slova[1];
  return slova[2];
}</code></pre>

<p>Použití je následovné (tvary pro jednotlivé počty se předávají jako pole):</p>

<pre><code>var pocetKomentaru = 5;
alert(
  sklonovani(
    <b>pocetKomentaru</b>, 
    ['komentář', 'komentáře', 'komentářů']
  )
);</code></pre>


<div class="live no-source">
<input type="number" oninput="pocet(this)" value="0" size="5"><span style="margin-left: .5em">webů</span>
<script>
function sklonovani(pocet, slova) {
  pocet = Math.abs(pocet);
  if (pocet == 1) return slova[0];
  if (pocet < 5 && pocet > 0) return slova[1];
  return slova[2];
}
function pocet(el) {
    el.nextSibling.innerHTML = sklonovani(
        el.value, 
        ['web', 'weby', 'webů']
    );
}
</script>
</div>

<p><a href="https://kod.djpw.cz/bxjb">Samostatná ukázka</a></p>


<h2 id="php">Skloňování slov v PHP</h2>

<p>PHP a JS jsou si hodně podobné.</p>

<div class="internal-content">
  <ul>
    <li><a href="/php2js">Převedení PHP do JavaScriptu</a></li>
  </ul>
</div>


<p>Skloňující funkce tedy bude velmi podobná jako v JavaScriptu.</p>

<pre><code>function sklonovani($pocet, $slova) {
  $pocet = abs($pocet);
  if ($pocet == 1) return $slova[0];
  if ($pocet &lt; 5 &amp;&amp; $pocet > 0) return $slova[1];
  return $slova[2];
}</code></pre>



<p>Použití:</p>

<pre><code>echo sklonovani(
  3, // tři komentáře 
  array('komentář', 'komentáře', 'komentářů')
);</code></pre>




<h2 id="css">Správný tvar slov v CSS</h2>

<p>I v prostém HTML/CSS jde skloňování nouzově vyřešit.</p>

<p>Dá-li se zajistit výpis počtu do CSS třídy, správného tvaru slov se docílí vypsáním v CSS vlastností <a href="/content"><code>content</code></a>.</p>


<div class="internal-content">
  <ul>
    <li><a href="/programovani-css">Skloňování v CSS</a></li>
  </ul>
</div>
