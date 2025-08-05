---
title: "Rozbalovací nabídka <select>"
headline: "HTML značka <code>&lt;select&gt;</code>"
description: "Popis, možnosti a vylepšení rozbalovacího výběru, HTML značky <code>&lt;select&gt;</code>."
date: "2013-10-08"
last_modification: "2013-10-08"
status: 1
tags: ["formulare", "html", "html-tagy", "napady"]
format: "html"
---

<p>Značka <code>&lt;select&gt;</code> se běžně používá ve formulářích pro roletový výběr více položek. Jednotlivé položky se zapisují do <a href="/html-znacky#koncova-volitelna">nepovinně párových</a> značek <code>&lt;option&gt;</code>.</p>

<div class="live">Použít: 
  <select name="jmenoSelectu">
    <option value="nic">– vybrat –</option>
    <option value="hodnotaHTML">HTML</option>
    <option value="hodnotaCSS">CSS</option>
    <option value="hodnotaJS">JavaScript</option>
  </select>
</div>

<h2 id="rozbaleni-selectu">Rozbalení <code>&lt;select&gt;</code>u</h2>
<p>Rozbalovací seznamy bývají na stránkách podle mého názoru <b>často zneužívány</b>. Myslím tím situaci, kdy má rozbalovací výběr jen pár položek, ale je kvůli jejich odkrytí <b>nutno nejprve kliknout</b>. V takovém případě mi přijde vhodnější použít pár radio přepínačů (<code>&lt;input type=radio&gt;</code>).</p>

<div class="internal-content">
  <ul>
    <li><a href="/select-pouzitelnost">Proč nepoužívat selectbox</a></li>
  </ul>
</div>

<p>Kromě horší použitelnosti se značka <code>&lt;select&gt;</code> i <a href="/stylovani-selectu">hůře styluje</a>.</p>

<h3 id="rozbaleni-mysi">Rozbalení po najetí myší</h3>
<p>Trochu pomoci si teoreticky lze JavaScriptem a provést <b>rozbalení po najetí myši</b>. (Využívá se nastavení atributu <code>size</code> podle počtu vnořených položek spolu s <a href="/position#absolute">absolutním posicováním</a>.)</p>

<div class="live">
  <div style='position: relative'>Použít: 
<select onmouseover="this.size=this.length; this.focus()" onblur="this.size=1" style="position: absolute">
    <option value="nic">– vybrat –</option>
    <option onclick="this.parentNode.size=1" value="hodnotaHTML">HTML</option>
    <option onclick="this.parentNode.size=1" value="hodnotaCSS">CSS</option>
    <option onclick="this.parentNode.size=1" value="hodnotaJS">JavaScript</option>
  </select>
</div>
</div>

<p>Otázka je, jestli <b>je to skutečně pomoc</b> — narušení výchozího chování může být matoucí.</p>

<h2 id="vybrana-polozka">Získání vybrané položky JavaScriptem</h2>

<p>Možný důvod, proč tvůrci webů upřednostňují roletový výběr, je <b>jeho snadné zpracovávání JavaScriptem</b>. Získání vybrané volby je otázkou jednoduchého:</p>


<pre><code>document.getElementById('jmenoSelectu').value</code></pre>

<p>Případně:</p>

<pre><code>document.formular.jmenoSelectu.value</code></pre>

<p>U <code>&lt;input type=radio&gt;</code> je nutné projít cyklem všechny dané <code>&lt;input&gt;</code>y a hlídat u nich vlastnost <code>checked</code> (či použít nástroj typu jQuery — <code>$('input[name=jmeno]:checked').val()</code>).</p>



<h3 id="vybrany-element">Vybraný element</h3>

<p>Někdy je potřeba vybrat ze <code>&lt;select></code>u celý vybraný element <code>&lt;option></code>, to jde pomocí vlastnosti <code>selectedIndex</code>:</p>

<pre><code>function vybranyOption(select) {
  // první element „– vybrat –“ se bere jako nic
  if (select.selectedIndex == 0) return false;
  // vrátí se vybraný element
  return select.options[select.selectedIndex];
}</code></pre>
