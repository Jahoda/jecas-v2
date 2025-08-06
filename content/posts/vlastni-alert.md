---
title: "Vlastní alert"
headline: "Vlastní hláška <code>alert</code>"
description: "Jak si v JavaScriptu vytvořit vlastní hlášky jako je výchozí <code>alert</code>."
date: "2013-12-19"
last_modification: "2017-02-17"
status: 1
tags: ["hotova-reseni", "js", "webove-animace"]
format: "html"
---

<p>V <b>JavaScriptové aplikaci</b> bývá často potřeba uživatele informovat o nějaké akci, která proběhla <a href="/ajax">AJAXem</a> na pozadí.</p>

<div class="live">
  <button onclick="alert('Text hlášky')">Zobrazit hlášku</button>
</div>

<p>To není úplně špatné, ale někdy je výchozí podoba <code>alert</code>u moc agresívní. Pokud vyskočí, <b>nejde zpravidla dále na stránce nic dělat</b>. (S tím souvisí i jedna vlastnost <code>alert</code>u, která nejde nahradit, to jest <b>pozastavení skriptů</b>.)</p>

<h2 id="prepsani-alertu">Přepsání <code>alert</code>u</h2>
<p>První možnost je funkci <code>alert</code> nahradit, jeho překrytí může vypadat zhruba takto:</p>

<pre><code>window.alert = function (hlaska) {
  // nějaké vypsání hlášky
}</code></pre>

<p>Nepřijde mi to ale moc chytré. Není-li problém všude na stránce volat vlastní funkci, je vhodnější si originální <code>alert</code> ponechat.</p>

<h2 id="hlaska">Vlastní hláška</h2>
<p>Jak si vlastní hlášku vyrobit.</p>

<style>
  /* reset */ 
  #hlaska {margin: 0; font-size: 100%}
</style>
<div class="live">
<style>
#hlaska {background: #DA3F94; color: #fff; position: fixed; width: 50%; left: 50%; margin-left: -25%; padding: .5em; top: -3em; transition: top 1s}
#hlaska.zobrazit {top: 0}
</style>
  
<div id="hlaska"></div>
<button onclick="hlaska('Text vlastní hlášky', 5)">Hláška</button>
<script>
function hlaska(text, vycistit) {
  var casovac;
  vycistit = (typeof vycistit === "undefined") ? 3 : vycistit;
  var h = document.getElementById("hlaska");
  if (h.className == "zobrazit" && h.innerHTML == text) return;
  
  h.innerHTML = text;
  h.className = "zobrazit";

  clearTimeout(casovac);
  casovac = setTimeout(function() {
    h.className = "";
  }, vycistit * 1000)
}
</script>
</div>

<ol>
  <li>Na stránku se přidá prázdný <code>&lt;div></code>, který bude mít ID, aby ho JavaScript <a href="/queryselector">našel</a>.</li>
  <li>Tento element se vhodně nastyluje. Například se může <a href="/position#fixed">fixně naposicovat</a> k horní straně okna a třeba ještě <a href="/centrovani#absolute">vycentrovat</a>.</li>
  <li><a href="/zobrazit-skryt">Skrývání/zobrazování</a> potom bude řešené <a href="/prepinani-trid">přepínáním tříd</a> (je možné provést i <a href="/animace-skryt">plynulé skrývání</a>).</li>
  <li>Vlastní JS funkce potom nastaví dle parametru obsah (<code>innerHTML</code>) a přepne třídu.</li>
  <li>Automatické <b>schování hlášky</b> po nějaké době může zajistit <a href="/odpocitavani">časovač</a> <code>setTimeout</code>.</li>
</ol>

<p>Použití je prosté. První parametr je text. Druhý je volitelný a určuje <b>čas, po kterém se hláška skryje</b> (ve vteřinách):</p>
<pre><code>hlaska('Text první hlášky', 5);</code></pre>


<p><a href="https://kod.djpw.cz/eny">Samostatná ukázka</a></p>

<h2 id="prepsani-zachovani">Přepsání i zachování výchozího <code>alert</code>u</h2>
<p>Pan <b>Kubo2</b> přišel s dobrou připomínkou, že není problém výchozí <code>alert</code> přepsat vlastní hláškou, ale zároveň si ho <b>nejprve uložit</b> do proměnné.</p>

<p>Potom můžeme vytvářet <i>hezké</i> hlášky funkcí pojmenovanou <code>alert</code>, ale mít původní <code>alert</code> stále k disposici.</p>

<p>Snad jediné risiko je, že na tuto změnu chování zapomeneme nebo bude kód pro někoho jiného méně srozumitelný.</p>

<pre><code>function hlaska(text) {
  // vlastní hláška
}
// Uložíme si originální alert
var puvodniAlert = window.alert;
// Přepíšeme ho vlastní funkcí
window.alert = hlaska;
</code></pre>

<p><a href="https://kod.djpw.cz/bgab">Ukázka</a></p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://github.com/limonte/sweetalert2">sweetAlert 2</a> – vlastní alert s plynulou animací</li>
</ul>