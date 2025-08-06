---
title: "Mezera v PSČ"
headline: "Mezera v PSČ"
description: "Jak a zda vůbec automaticky odsazovat uživatelem zadané znaky PSČ do formulářového políčka."
date: "2014-04-28"
last_modification: "2015-07-24"
status: 1
tags: ["formulare", "hotova-reseni", "napady"]
format: "html"
---

<p>Při zadávání poštovního směrovacího čísla může někoho napadnout, že by se jednotlivé číslice mohly <b>automaticky odsazovat</b>.</p>

<p>Obyvyklý formát PSČ sestává ze tří čísel, mezery a dalších dvou čísel. Například:</p>

<p class="live">
  155 00
</p>

<p><small>(Více informací o poštovních směrovacích číslech je k nalezení na <a href="http://cs.wikipedia.org/wiki/Poštovní_směrovací_číslo">Wikipedii</a>.)</small></p>

<p>Z technického hlediska není problém automaticky po zadání třetího znaku přidat mezeru.</p>

<div class="live">
  <script>
    function pridatMezeru(el) {
      if (el.value.length == 3) {
        el.value += " ";
      }
    }
  </script>
  <label>PSČ: <input type="text" onkeyup="pridatMezeru(this)"></label>
</div>

<p>Najednou ale zjišťujeme, že je to zcela <b>nedostatečné</b> – je potřeba řešit následující případy a otázky:</p>

<ol>
  <li>Automatickou mezeru by mělo být <b>možné smazat</b>.</li>
  <li>Když člověk zadá třetí číslo chybně a bude ho chtít <b>smazat</b> klávesou <kbd>Backspace</kbd>, má se mazat číslo, nebo mezera?</li>
  <li>Co s obsahem <b>vloženým ze schránky</b> nebo vybraným z uložených hodnot v prohlížeči?</li>
  <li>Nebude uživatele plést, že se mu pole <b>mění pod rukama</b>?</li>
</ol>

<p>Něco je řešitelné <a href="http://digitalbush.com/projects/masked-input-plugin/">inteligentnějším scriptem</a>.</p>

<div class="live">
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
<script src="http://digitalbush.com/wp-content/uploads/2013/01/jquery.maskedinput-1.3.1.min_.js"></script>
<label>PSČ: <input type="text" id="psc"></label>
<script>
$("#psc").mask("999 99", {placeholder: " "});
</script>
</div>

<p><a href="https://kod.djpw.cz/aobb">Samostatná ukázka</a></p>

<p>Je dobré si <b>určit přínos</b>, který automatické vložení mezery přináší. Asi by to mělo být <b>minimalisování chyb při zadávání</b>, kdy vložení mezery celé <i>PSČ</i> zpřehlední.</p>

<p>Zavedení doplňování mezery nám rozdělí uživatele do dvou skupin:</p>

<ol style="list-style: upper-alpha">
  <li>Díky automatickému doplnění mezery si <b>všimnou překlepu</b> a PSČ tak bude v méně případech omylem špatně vyplněné.</li>
  
  <li>Nestandardní chování a <i>měnění pod rukama</i> bude uživatele <b>obtěžovat</b>.</li>
</ol>

<p>A ta klíčová otázka je, <b>které skupině dát přednost</b>. Či zda vůbec není zvláštní políčko pro PSČ <a href="/chyby-formularu#hodne-policek">nadbytečné</a>. Existenci poštovního směrovacího čísla je navíc možné relativně snadno ověřit oproti databási PSČ, která je dostupná na webu <a href="http://www.ceskaposta.cz/ke-stazeni/zakaznicke-vystupy">České pošty</a>.</p>

<p>Otázku automatického vkládání mezer můžeme řešit ale i např. při zadávání <b>telefonního čísla</b>, které už ověřovat moc nejde. Nepříjemné chování, kdy se obsah <code>&lt;input></code>u mění pod rukama, vyřeší i <i>přeformátování</i> až při opuštění políčka (JS událost <code>onblur</code>) – bohužel toho si zase ale uživatel už <b>nemusí všimnout</b>…</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    <p><a href="https://github.com/estelle/input-masking">Input Masking</a> – zobrazení požadovaného formátu přímo v <code>&lt;input></code>u</p>
    
    <p><img src="/files/psc-mezera/maska.png" alt="Maska v políčku" class="border"></p>
  </li>
  
  <li><a href="https://github.com/filamentgroup/politespace">Politespace</a> (<a href="http://filamentgroup.github.io/politespace/demo/demo.html">demo</a>) – přidání mezery při opuštění formulářového pole (<code>onblur</code>)</li>
  
  <li><a href="http://numeraljs.com/">Numeral.js</a> – nástroj pro formátování a manipulování s číslicemi</li>
  
  <li><a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=8&amp;topic=154566">Debata na DJPW o vhodnosti přidávání mezery</a></li>
</ul>