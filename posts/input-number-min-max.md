---
title: "Různá šířka číselného pole s min/max"
headline: "Různá šířka <code>&lt;input type=number></code> s <code>min</code>/<code>max</code>"
description: "Proč má <code>&lt;input type=number></code> různou výchozí šířku v závislosti na <code>min</code>/<code>max</code> atributech."
date: "2025-03-25"
last_modification: "2025-03-25"
status: 1
tags: ["css", "formulare", "stylovani"]
format: "html"
---

<p>I přes značné posuny je stylování HTML formulářů stále jednou z největších výzev.</p>

<p>Do hry zde vstupují <b>výchozí styly</b> prohlížeče a operačního systému.</p>

<p>Jedna taková specialita je různá šířka číselného pole.</p>

<p>Prohlížeč se snaží podle omezeného rozmezí čísel chytře určovat šířku <code>&lt;input></code>u.</p>

<p>Může to způsobovat dost divné stavy, když se právě atributy <code>min</code> a <code>max</code> používají pro validaci na straně klienta.</p>

<p>Zvlášť v případě, kdy jsou dynamické, může docházet k nepěknému poskakování.</p>


<p>Jak je vidět na ukázce, v závislosti na minimální/maximální hodnotě prohlížeč přizpůsobuje šířku políčka.</p>

<div class="live">
  <input type="number" min="0" max="100"> (min 0, max 100)
  
  <br>
  
  <input type="number" min="0" max="10000"> (min 0, max 10000)
  
  <br>
  
  <input type="number" min="0" max="1.7976931348623157e308"> (min 0, max 1.7976931348623157e308) 
  
  <br>
  
  <input type="number" max="10000"> (max 10000)
  
  <br>
  
  <input type="text"> (text)
</div>

<p><a href="https://kod.djpw.cz/onnd">Samostatná živá ukázka</a></p>


<p>Dělá to pouze při vyplnění obou atributů.</p>



<h2 id="reseni">Řešení</h2>

<p>Bohužel 100% universální a uspokojivé řešení neznám.</p>

<p>V některých případech to <b>nemusí vadit</b>.</p>


<p>Ono obecně nastavovat šířku políčka podle očekávaného obsahu je rozumné pro lepší pochopení formuláře ze strany uživatele.</p>

<p>Vadí-li to, asi nejsnazší je nastavit políčku pevnou šířku (<code>width</code>).</p>

<p>Výchozí šířka <code>&lt;input></code>u je ale proměnlivá napříč prohlížeči. Pro stejnou šířku s textovými políčky (<code>&lt;input type=text></code>) je tak potřeba explicitně nastavit šířku i pro ně.</p>

<p>V macOS pozoruji následující výchozí rozměry textových políček:</p>

<ul>
  <li><b>Safari</b> – 148 × 19 px</li>
  <li><b>Chrome</b>, <b>Edge</b>, <b>Brave</b> – 153 × 21 px</li>
  <li><b>Firefox</b> – 189 × 21 px</li>
</ul>


<h3 id="dostupna-sirka">Dostupná šířka</h3>

<p>Cesta k sjednocení může být i nastavení šířky na dostupnou a následné omezení, aby políčko nebylo zbytečně široké.</p>

<pre><code>input {
    width: -webkit-fill-available;
    max-width: 8ch;
}</code></pre>






<p>Jednotka <code>ch</code> zde representuje šířku číslice <code>0</code> v aktuálním fontu políčka. Jde tak přibližně docílit šířky dle očekávaného počtu číslic.</p>

<p>Atribut <code>size</code> totiž u číselného políčka nic nedělá.</p>


<h3 id="podle-obsahu">Šířka podle obsahu</h3>

<p>Docela zajímavá je vlastnost <code>field-sizing: content</code>, kdy se šířka obsahu přizpůsobuje šířce obsahu.</p>

<p>Může to jít hezky zkombinovat s minimální šířkou. Ale funguje jen v <b>Chrome</b>.</p>

<pre><code>input {
    field-sizing: content;
    min-width: 8ch;
}</code></pre>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>
    StackOverflow:
    <a href="https://stackoverflow.com/questions/33283901/input-number-max-attribute-resizes-field">input number max attribute resizes field</a>
  </li>
  
  <li>
    MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing">field-sizing</a>
  </li>
</ul>