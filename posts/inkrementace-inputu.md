---
title: "Zvyšování hodnoty inputů"
headline: "Zvyšování hodnoty inputů"
description: "Jak zpříjemnit zadávání číselných hodnot nebo času do <code>&lt;input></code>ů tlačítky plus a mínus."
date: "2013-12-18"
last_modification: "2013-12-20"
status: 1
tags: ["formulare", "hotova-reseni", "js"]
format: "html"
---

<p>Má-li uživatel zadat na stránce nějaké číslo nebo čas, musí ho většinou <b>napsat ručně</b>. Existují různé postupy, jak zadávání zpříjemnit zjednodušením akcí pro <b>snižování nebo zvyšování hodnoty</b>.</p>

<h2 id="html-formulare">„Nové“ formulářové prvky</h2>
<p>Trochu si je možné pomoci rozšířenými typy <a href="/input">značky <code>&lt;input></code></a>.</p>

<dl>
  <dt id="input-type-number"><code>&lt;input type=number></code></dt>
  <dd>
    <p>Automaticky u něj podporované prohlížeče zobrazí tlačítka pro zvýšení/snížení o nastavený krok (atribut <code>step</code>).</p>
    <div class="live"><input type="number" value="1" step="0.1"></div>
  </dd>
  
  <dt id="input-type-time"><code>&lt;input type=time></code></dt>
  <dd>
    <p>Téhož jde v některých prohlížečích docílit i při zadávání času.</p>
    <div class="live"><input type="time" value="04:00"></div>
  </dd>
</dl>

<h2 id="plus-minus">Tlačítka +/−</h2>
<p>Kvůli slabší a nejednoznačné podpoře nativních formulářových plus/mínus tlačítek si je můžeme <b>vytvořit v JavaScriptu</b>.</p>

<p>Taková funkce volaná při <a href="/udalosti-mysi#onclick">kliknutí myši</a> (<code>onclick</code>) bude velmi prostá. Nejvíce kódu bude sloužit k převodu <code>value</code> na číslo a <b>zaokrouhlování</b> (<a href="http://kod.djpw.cz/pfy">ukázka</a>).</p>

<div class="live">
<input type="text" value="5" id="cislo">
<script>var cislo = document.getElementById("cislo");</script>
<button type="button" onclick="pridavat(cislo, 0.1)">+</button>
<button type="button" onclick="pridavat(cislo, -0.1)">−</button>
<script>
/* Zaokrouhlení */
function zaokrouhlit(cislo) {
	return (Math.round((cislo) * 10000) / 10000);	
}

/* Převedení na číslo */
function val(value) {
  return value * 1;
}

/* Přidat/odebrat hodnotu */
function pridavat(kam, kolik)  {
  kam.value = zaokrouhlit(val(kam.value) + kolik);
}
</script>
</div>

<h2 id="kolecko">Změna hodnoty kolečkem</h2>
<p>Aby se návštěvník <b>neuklikal k smrti</b>, pomůže <b>inkrementování</b>/<b>dekrementování</b> pomocí <a href="/udalosti-mysi#onmousewheel">točení kolečka</a>.</p>

<p>Změna hodnot <code>&lt;inputu></code>u kolečkem bude ale nejspíš <b>méně intuitivní</b> než tlačítka.</p>

<p><a href="http://kod.djpw.cz/vfy">Ukázka</a></p>

<div class="live">
<input type="text" value="0" id="pole-kolecko" onmousewheel="kolecko(event, this, 0.1); return false">
<script>
/* Zaokrouhlení */
function zaokrouhlit(cislo) {
	return (Math.round((cislo) * 10000) / 10000);	
}

/* Převedení na číslo */
function val(value) {
  return value * 1;
}

/* Úprava kolečkem */
function kolecko(e, pole, kolik) {
  e = e || window.event;
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  nalozit(pole, delta * kolik);
}

// Firefox
if (document.addEventListener) { 
  document.getElementById("pole-kolecko").addEventListener("DOMMouseScroll", function(event) {
    kolecko(event, this, 0.1);
    event.preventDefault();
  }, false);
}

function nalozit(kam, kolik) {
  kam.value = zaokrouhlit(val(kam.value) + kolik);
}
</script>
</div>

<h2 id="zrychlena-tlacitka">Tlačítka plus/mínus se zrychlením</h2>
<p>Vylepšit obyčejná tlačítka pro snižování nebo zvyšování hodnoty je možné <b>akcelerací</b>. Při stisknutém tlačítku (<code>onmousedown</code>) se bude hodnota stále upravovat a čím déle bude tlačítko stisknuté, tím to bude rychlejší (docílí se toho <a href="/odpocitavani">časovačem</a>). <a href="http://kod.djpw.cz/lfy">Ukázka</a> (sloučená varianta i s <a href="http://kod.djpw.cz/wfy">kolečkem</a>).</p>

<div class="live">
<input type="text" value="0" id="pole">
<script>var pole = document.getElementById("pole");</script>
<button type="button" onmousedown="nakladator(pole, 0.1)" onmouseup="stopNakladator()" onmouseout="stopNakladator()">+</button>
<button type="button" onmousedown="nakladator(pole, -0.1)" onmouseup="stopNakladator()" onmouseout="stopNakladator()">−</button>
<script>
/* Zaokrouhlení */
function zaokrouhlit(cislo) {
	return (Math.round((cislo) * 10000) / 10000);	
}

/* Převedení na číslo */
function val(value) {
  return value * 1;
}

var casovacNakladatoru;
var rychlost = puvodniRychlost = 300;
function nakladator(kam, kolik)  {
  kam.value = zaokrouhlit(val(kam.value) + kolik);
  casovacNakladatoru = setTimeout(function() {
    rychlost = rychlost * 0.9;
    nakladator(kam, kolik);
  }, rychlost)
}

function stopNakladator() {
  clearTimeout(casovacNakladatoru); 
  rychlost = puvodniRychlost;
}
</script>  
</div>

<!-- Nakladator http://kod.djpw.cz/yfy -->