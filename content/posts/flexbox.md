---
title: "CSS flex"
headline: "Flexboxy"
description: "Flexibilní stylování boxů je jednoduší a schopnější alternativa k obtékání (<code>float</code>), ale zatím hudba budoucnosti…"
date: "2013-06-20"
last_modification: "2013-06-20"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<h2>Float</h2>
<p>Je-li potřeba umístit nějaké prvky <b>vedle sebe</b>, většinou se k tomu používá <a href="/float">obtékání elementů</a>. Přidá se <code>float: left/right</code>, nastaví se šířka (<code>width</code>) a jednotlivé prvky se tak dostanou vedle sebe. (Pod nimi se potom obtékání ukončí – <code>clear: both</code>.)

<div class=live>
<p style='float: left; width: 50%; background: #ccc'>&lt;p style='float: left; width: 50%; background: #ccc'></p>
<p style='float: right; width: 50%; background: yellow'>&lt;p style='float: left; width: 50%; background: yellow'></p>
<span style='clear: both; display: block'></span>
</div>

<style>
.tldr .live, .tldr .demo div {display: none}
</style>

<div>
<h2 id=flex>Flex</h2>
<p>Totéž se dá vyřešit vlastnostmi kolem <code>flex</code>. Funguje to ovšem zatím <b>jen od Exploreru 10</b>. Kromě Opery ve všech prohlížečích (ve Firefoxu, Chrome i IE 10) jen s prefixy (<code>-moz-</code> a <code>-webkit-</code>, <code>-ms-</code>) a pomalu v každém prohlížeči pod jiným názvem. Ve Firefoxu funguje jen něco.
<p>Nepoužíváte-li proto zmíněné prohlížeče, můžete si ukázky s klidem vypnout.</p>
<span id="flexbox-toggle"></span>
<script>
var btn = document.createElement('button');
btn.textContent = 'Zobrazit/skrýt ukázky';
btn.onclick = function() { this.parentNode.parentNode.className = this.parentNode.parentNode.className == '' ? 'tldr' : ''; };
document.getElementById('flexbox-toggle').appendChild(btn);
</script>

<div class='live code'>
&lt;div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox'>
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox'>
<p style='width: 50%; background: #ccc'>&lt;p style='width: 50%; background: #ccc'></p>
<p style='width: 50%; background: yellow'>&lt;p style='width: 50%; background: yellow'></p>
</div>&lt;/div>
</div>

<p>Výhoda je, že se nemusí uvádět šířka, přizpůsobí se obsahu.

<div class='live code'>
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox'>
<p style='width: 50%; background: #ccc'>&lt;p style='width: 50%; background: #ccc'></p>
<p style='background: yellow'>&lt;p style='background: yellow'></p>
</div>
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox'>
<p style='background: #ccc'>&lt;p style='background: #ccc'></p>
<p style='background: yellow'>&lt;p style='background: yellow'></p>
</div>
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox'>
<p style='background: #ccc; width: 40%'>&lt;p style='background: #ccc; width: 40%'></p>
<p style='background: yellow'>&lt;p style='background: yellow'></p>
<p style='background: #ccc'>&lt;p style='background: #ccc'></p>
</div>
</div>

<h3 id=flex-direction><code>flex-direction</code>: Sloupce nebo řádky</h3>
<p>Vlastnost <code>flex-direction</code> se nastavuje pro flex-obal (tj. rodiče (<code>display: flex</code>) flex-položek) a určuje způsob uspořádání.
<table>
<tr>
<th>Hodnota<th>Význam
<tr><td><code>flex-direction: row</code><td>v řádku – výchozí
<tr><td><code>flex-direction: row-reverse</code><td>v řádku v obráceném pořadí
<tr><td><code>flex-direction: column</code><td>v sloupci
<tr><td><code>flex-direction: column-reverse</code><td>v sloupci v obráceném pořadí
</table>

<h3 id=justify-content><code>justify-content</code>: Vodorovné zarovnání</h3>
<p>Vlastnost <code>justify-content</code> určí způsob rozmístění flex-položek ve flex-obalu, pokud nemají plnou šířku. <p>Dává smysl jen při zobrazení v řádku – <code>flex-direction: row(-reverse)</code>.
<style>
.demo div > div, .demo div > span {padding: 0 1em; background: yellow; border: 1px solid #000}
</style>
<table class='demo'>
<tr>
<th>Hodnota<th>Význam
<tr><td><code>justify-content: flex-start</code><td>zleva – výchozí
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox;     -webkit-box-direction: normal;
    -moz-box-direction: normal;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;'><div>První</div><div>Druhý</div><div>Třetí</div></div>
<tr><td><code>justify-content: flex-end</code><td>zprava
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox;     -webkit-box-pack: end;
    -moz-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;'><div>První</div><div>Druhý</div><div>Třetí</div></div>
<tr><td><code>justify-content: center</code><td>na střed
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox;     -webkit-box-pack: center;
    -moz-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;'><div>První</div><div>Druhý</div><div>Třetí</div></div>
<tr><td><code>justify-content: space-between</code><td>rozpočítají se flex-položky, aby se stejnoměrně rozprostřely po prostoru
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox;  -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;'><div>První</div><div>Druhý</div><div>Třetí</div></div>
<tr><td><code>justify-content: space-around</code><td>podobné jako předchozí, jen se nechá prostor i na krajích.
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox;     -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -webkit-justify-content: space-around;
    -ms-flex-pack: distribute;
    justify-content: space-around;'><div>První</div><div>Druhý</div><div>Třetí</div></div></tr>
</table>

<h3 id=align-items><code>align-items</code>: Zarovnání položek</h3>
<p>Vlastnost <code>align-items</code>, nastavovaná pro flex-obal, se chová odlišně při řádkové a sloupcové orientaci boxů (<code>flex-direction</code>).
<dl>
<dt>Při <code>flex-direction: row</code>
<dd>Určuje svislé zarovnání nebo roztažení elementu v řádce. Projeví se v případě, že nejsou všechny boxy stejně vysoké.

<dt>Při <code>flex-direction: column</code>
<dd>Určuje vodorovné zarovnání nebo roztažení.
</dl>
<table class='demo'>
<tr>
<th>Hodnota<th>Význam

<tr><td><code>align-items: flex-start</code><td>zleva/shora (záleží na <code>flex-direction</code>) – výchozí
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox; -webkit-box-direction: normal;
    -moz-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;     -webkit-box-align: start;
    -moz-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;'><div>První</div><div>Druhý</div><div>Třetí</div></div>

<tr><td><code>align-items: flex-end</code><td>zprava/zdola
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox; -webkit-box-direction: normal;
    -moz-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;     -webkit-box-align: end;
    -moz-box-align: end;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;'><div>První</div><div>Druhý</div><div>Třetí</div></div>

<tr><td><code>align-items: center</code><td>na střed
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox; -webkit-box-direction: normal;
    -moz-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;     -webkit-box-align: center;
    -moz-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;'><div>První</div><div>Druhý</div><div>Třetí</div></div>

<tr><td><code>align-items: baseline</code><td>přesně nevím, funguje dost podobně jako <code>flex-start</code>
<!--<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox; -webkit-box-direction: normal;
    -moz-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column; align-items: baseline'><div>První</div><div>Druhý</div><div>Třetí</div></div>-->

<tr><td><code>align-items: stretch</code><td>roztažení elementu
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox; -webkit-box-direction: normal;
    -moz-box-direction: normal;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;     -webkit-box-align: stretch;
    -moz-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;'><div>První</div><div>Druhý</div><div>Třetí</div></div>
</tr>
</table>

<h3 id=flex-wrap><code>flex-wrap</code>: Zalamování</h3>
<p>Pokud je ve flex-obalu tolik flex-položek, že už se nevejdou, je možné je pomocí <code>flex-wrap</code> zalomit.
<table>
<tr><th>Hodnota<th>Význam
<tr><td><code>flex-wrap: nowrap</code><td>nic se nezalomí
<tr><td><code>flex-wrap: wrap</code><td>zalomí se
<tr><td><code>flex-wrap: wrap-reverse</code><td>zalomí se v obráceném pořadí</tr>
</table>

<div class='live demo' style='width: 300px'>
<div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox; -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;'>
<div>První<br> element</div><div>Druhý</div><div>Třetí<br>element</div><div>Čtvrtý</div><div>Pátý</div><div>Šestý</div>
</div>
</div>


<h3 id=order>Pořadí elementů</h3>
<p>Hodně elegantní je možnost nastavování řazení. Stačí si je očíslovat vlastností <code>order</code> a mohou být v kódu libovolně uspořádány. Nastavuje se pro flex-položky.
<pre><code>&lt;p style="order: 1">Bude první
&lt;p style="order: 3">Bude třetí
&lt;p style="order: 2">Bude druhý
</code></pre>

<h3 id=align-self>Úprava zarovnání</h3>
<p>Jednotlivé flex-položky dědí zarovnání od flex-obalu. Vlastnost <code>align-self</code> umí nastavení flex-obalu přebít. Hodnoty jsou stejné jako u <code>align-item</code>, jen je navíc výchozí vlastnost <code>auto</code> (tj. řídit se nastavením obalu).

<h3 id=roztahovani>Poměry roztahování</h3>
<p>Vlastnostmi <code>flex-grow</code>, <code>flex-shrink</code> a <code>flex-basis</code> nebo zkráceně <code>flex: grow shrink basis</code> lze pro flex-položku nastavit, jak bude růst či ubývat vůči ostatním při přebytku, respektive nedostatku místa.
<p>Hodnota <code>flex-grow</code> a <code>flex-shrink</code> se nastavuje od 0 do 1 a udává <i>ochotu</i> při roztahování a zmenšování se.
<p>Pomocí <code>flex-basis</code> se nastaví výchozí šířka/výška (v závislosti na <code>flex-direction</code>), kterou by element rád měl, když se nebude muset zmenšovat nebo zvětšovat.

<h2 id=vyzkouset>Vyzkoušejte</h2>
<p>Pro lepší pochopení je ideální si flexibilní boxy vyzkoušet:
<ul>
  <li><a href="http://the-echoplex.net/flexyboxes">Flexy Boxes</a>
  <li><a href="http://demo.agektmr.com/flexbox/">Flexbox Playground</a>
</ul>

<h2 id=vyuziti>Využití</h2>
<p>Při dostatečné podpoře v prohlížečích bude možné takto:
<ul>
<li>stavět celý layout webu,
  <li>řešit komplikované úlohy jako <a href="/centrovani#neznama-sirka-vyska">centrování položek s neznámou šířkou</a>, stejně vysoké sloupce a jiné půjde velmi jednoduše,
<li>zjednoduší se přizpůsobování stránky šířce okna prohlížeče.
  </li></ul>
</div>

<h2 id=odkazy>Odkazy jinam</h2>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes">MDN: Using CSS flexible boxes</a></li>
<li><a href="http://dev.w3.org/csswg/css-flexbox/">W3C: CSS Flexible Box Layout Module</a></li>
<li><a href="http://www.sketchingwithcss.com/samplechapter/cheatsheet.html">The Ultimate Flexbox Cheat Sheet</a></li>
  <li><a href="http://css-tricks.com/boxes-fill-height-dont-squish/">Boxes That Fill Height (Or More) (and Don’t Squish)</a> — vyplnění výšky flexboxy</li>
  <li><a href="http://philipwalton.github.io/solved-by-flexbox/">Řešení různých problémů přes <code>flex</code></a></li>
  <li><a href="http://css-tricks.com/flexbox-bar-navigation/">Flex box navigace</a></li>
  <li><a href="http://www.planningforaliens.com/blog/2014/03/11/real-world-flexbox/">Flexbox in the real world</a></li>
  <li><a href="http://devbryce.com/site/flexbox/">Flexbox in 5 minutes</a></li>
  
  <li>SmashingNagazine: <a href="https://www.smashingmagazine.com/2016/02/the-flexbox-reading-list/">The Flexbox Reading List: Techniques and Tools</a></li>
  </ul>