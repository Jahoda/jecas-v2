---
title: "Stejně vysoké sloupce"
headline: "Sloupce stejně vysoké"
description: "Různé možnosti, jak zajistit automatické roztažení různě vysokých sloupců na stejnou výšku."
date: "2013-08-20"
last_modification: "2013-08-20"
status: 1
tags: ["css", "hotova-reseni", "layout"]
format: "html"
---

<h2 id="obrazek">Obrázkové pozadí</h2>
<p>Řešení spočívá v nastavení obrázkového pozadí (<a href="/files/stejne-vysoke-sloupce/opakujici.png">použitý obrázek</a>) společnému rodiči obou sloupců (sloupce jsou <a href="/float">obtékané</a>), obrázek na pozadí se <b>svisle opakuje</b> (<code>repeat-y</code>) a vytváří tak dojem skutečných sloupců.</p>

<!-- Kód ukázky #1 -->
<div class="live">
  <style>
    .obrazek {width: 500px}
    .obrazek .levy {float: left; width: 150px; background: #34A3E4}
    .obrazek .pravy {float: right; width: 350px; background: #E36FAF}
    .pozadi {background: url("/files/stejne-vysoke-sloupce/opakujici.png") repeat-y}
    .obrazek p {padding: 1em}
  </style>
  <div class="obrazek pozadi" id="pozadi">
    <div class="levy"><p>Krátký text</p></div>
    <div class="pravy"><p>Více</p>
    <p>krátkých</p>
    <p>odstavců</p>
    </div>
    <div style="clear: both"></div>
  </div>
</div>
<!-- konec ukázky #1 -->

<script>
  var obr = document.getElementById("pozadi");
</script>
<p>Podívejte se, jak to bude vypadat s a bez obrázku:</p>
<p><button onclick='obr.className = obr.className == "obrazek pozadi" ? "obrazek" : "obrazek pozadi"'>Přepnout obrázek</button></p>

<h2 id="ramecek">Rámeček mezi sloupci</h2>
<p>Pokud nepotřebujeme podbarvení sloupců, ale stačí oddělení rámečkem, vystačíme si i bez obrázků. A to tak, že levý i pravý sloupec bude mít nastaven levý, respektive pravý rámeček shodné barvy a jeden ze sloupců se o šířku rámečku posune, aby se rámečky překrývaly.</p>

<p>Posunutí lze vytvořit například <a href="/position#relative">relativním posicováním</a>.</p>
<pre><code>.levy {position: relative; left: 1px}</code></pre>

<!-- Kód ukázky #2 -->
<div class="live">
  <style>
    .sloupce {width: 500px}
    .sloupce .levy {float: left; width: 149px; border-right: 1px solid #000; position: relative; left: 1px}
    .sloupce .pravy {float: right; width: 349px; border-left: 1px solid #000}
    .sloupce p {padding: 1em}
  </style>
  <div class="sloupce">
    <div class="levy" id="levy"><p>Krátký text</p></div>
    <div class="pravy"><p>Více</p>
    <p>krátkých</p>
    <p>odstavců</p>
    </div>
    <div style="clear: both"></div>
  </div>
</div>
<!-- konec ukázky #2 -->

<script>
  var levy = document.getElementById("levy");
</script>
<p>Jak by to vypadalo s a bez posunutí:</p>
<p><button onclick='levy.style.left = ((levy.style.left == "0px") ? "1px" : "0px")'>Přepnout posunutí</button></p>

<h2 id="absolute">Absolutní posicování</h2>
<p>Dosáhnout shodně vysokých sloupců je možné i <a href="/position#absolute">absolutním posicováním</a>.</p>
<p>V případě, že <i>víme</i>, že jeden sloupec bude vždy vyšší než druhý. Necháme ten delší natáhnout rodiče a ten kratší roztáhneme absolutním posicováním a třeba <code><a href="/height">height</a>: 100%</code>.</p>

<!-- Kód ukázky #3 -->
<div class="live">
  <style>
    .posicovani {position: relative; width: 500px}
    .posicovani .levy {width: 150px; background: #34A3E4; position: absolute; height: 100%}
    .posicovani .pravy {float: right; width: 350px; background: #E36FAF}
    .posicovani p {padding: 1em}
  </style>
  <div class="posicovani" id="pozadi">
    <div class="levy"><p>Krátký text</p></div>
    <div class="pravy"><p>Více</p>
    <p>krátkých</p>
    <p>odstavců</p>
    </div>
    <div style="clear: both"></div>
  </div>
</div>
<!-- konec ukázky #3 -->

<h2 id="pseudo-elementy">Pseudo-elementy</h2>

<p>Simulovat sloupce je možné i pseudo-elementy (<code>before</code>/<code>after</code>). Kdy se pomocí <code>z-index</code>u umístí za sloupce absolutně posicované <i>barvy</i>, které se roztáhnou po celé výšce. Toto řešení funguje od <b>IE 8</b>.</p>

<p><a href="http://kod.djpw.cz/cocb">Samostatná ukázka</a>.</p>

<h2 id="js">Dopočítání výšky JavaScriptem</h2>
<p>Lze využít toho, že JS může přeměřit oba sloupce (<code>offsetHeight</code>) a vyšší hodnotu potom nižšímu sloupci nastavit. Nevýhoda může být, že takový rozměr přestane platit, pokud se na stránce bude s něčím manipulovat (třeba <a href="/zobrazit-skryt">skrývat a odkrývat</a>).</p>

<p>Sloupce, kterým se srovnává výška, <b>musí být jen obaly</b>, pokud jim přidáme v <a href="/box-model#content-box">obsahovém box modelu</a> (výchozí ve standardním režimu) <code>padding</code> nebo <code>border</code>, přestane toto řešení fungovat.</p>

<!-- Kód ukázky #4 -->
<div class="live">
  <style>
    .scriptem {width: 500px}
    .scriptem .levy {float: left; width: 150px; background: #34A3E4}
    .scriptem .pravy {float: right; width: 350px; background: #E36FAF}
    .scriptem p {padding: 1em}
  </style>
  <div class="scriptem">
    <div class="levy" id="prvni"><p>Krátký text</p></div>
    <div class="pravy" id="druhy"><p>Více</p>
    <p>krátkých</p>
    <p>odstavců</p>
    </div>
    <div style="clear: both"></div>
  </div>
</div>

<script>
function srovnatVysku(levy, pravy) {
  if (pravy.offsetHeight > levy.offsetHeight) {
    levy.style.height = pravy.offsetHeight + "px";
  }
  else {
    pravy.style.height = levy.offsetHeight + "px";
  }
}

srovnatVysku(document.getElementById("prvni"), document.getElementById("druhy"));
</script>
<!-- konec ukázky #4 -->

<script>
  function puvodniVyska(levy, pravy) {
    var pravyHtml = pravy.innerHTML;
    pravy.innerHTML = levy.innerHTML;
    levy.innerHTML = pravyHtml;
    
    levy.style.height = "auto";
    pravy.style.height = "auto";
}
</script>
<p><button onclick='puvodniVyska(document.getElementById("prvni"), document.getElementById("druhy"))'>Původní výšky &amp; prohodit</button> <button onclick='srovnatVysku(document.getElementById("prvni"), document.getElementById("druhy"))'>Srovnat</button></p>

<h2 id="flex">Flexboxy</h2>
<p>Jak je vidět, všechna řešení nejsou moc elegantní. Ovšem je tu naděje v podobě <a href="/flexbox">flexboxů</a> — problematická podpora napříč prohlížeči (k disposici až od <b>Internet Exploreru 10</b>), ale zatím celkem brání rozumnému používání.</p>