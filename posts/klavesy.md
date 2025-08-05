---
title: "Klávesové zkratky v JS"
headline: "Ovládání webu klávesami v JavaScriptu"
description: "Odchytávání stisknutých kláves a vytváření klávesových zkratek v JavaScriptu."
date: "2014-03-05"
last_modification: "2014-03-18"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Ve webových aplikacích se občas hodí umožnit uživatelům některé funkce ovládat z <b>klávesnice</b>. Většinou by to neměl být jediný způsob, jak danou funkci použít, ale spíš usnadňující doplněk.</p>

<h2 id="odchytavani">Odchytávání kláves</h2>

<p>Zjišťovat, co uživatel stisk za klávesu, je většinou nejvhodnější přes <code>document.onkeydown</code>. Pro určení konkrétní klávesy se musí pro některé prohlížeče předat objekt <code>event</code> a sjednotit ho s <code>window.event</code>.</p>

<pre><code>document.onkeydown = function(e) {
  var event = window.event || e;
  var kod = event.keyCode;
  alert(kod);
}</code></pre>

<div class="live nosource">
  <p>Kód poslední stisklé klávesy: <tt>(něco stiskněte)</tt></p>
<script>
  document.onkeydown = function(e) {
  var event = window.event || e;
  var kod = event.keyCode;
  document.getElementsByTagName("tt")[0].innerHTML = (kod);
}
</script>
</div>

<p>Nyní stačí při požadovaném kódu provádět příslušnou akci.</p>

<h2 id="kody-klaves">Číselné kódy kláves</h2>

<p>Často používané <b>kódy kláves</b>.</p>

<table>
  <tr>
    <th>Kód</th>
    <th>Klávesa</th>
  </tr>
  <tr>
    <td><code>27</code></td>
    <td><kbd>Esc</kbd></td>
  </tr>
  <tr>
    <td><code>37</code></td>
    <td><kbd>←</kbd></td>
  </tr>
  <tr>
    <td><code>39</code></td>
    <td><kbd>→</kbd></td>
  </tr>
  <tr>
    <td><code>38</code></td>
    <td><kbd>↑</kbd></td>
  </tr>
  <tr>
    <td><code>40</code></td>
    <td><kbd>↓</kbd></td>
  </tr>
  <tr>
    <td><code>116</code></td>
    <td><kbd>F5</kbd></td>
  </tr>
  <tr>
    <td><code>13</code></td>
    <td><kbd>Enter</kbd></td>
  </tr>
  <tr>
    <td><code>32</code></td>
    <td><kbd>Space</kbd> (mezerník)</td>
  </tr>
  <tr>
    <td><code>8</code></td>
    <td><kbd>Backspace</kbd></td>
  </tr>
  <tr>
    <td><code>46</code></td>
    <td><kbd>Delete</kbd></td>
  </tr> 
  <tr>
    <td><code>9</code></td>
    <td><kbd>Tab</kbd></td>
  </tr>   
</table>

<h2 id="shift-ctrl">Klávesy <kbd>Shift</kbd>, <kbd>Ctrl</kbd> a <kbd>Alt</kbd></h2>

<p>Pro vytváření klávesových zkratek existují další speciální vlastnosti objektu <code>event</code>.</p>

<table>
  <tr>
    <th>Kód</th>
    <th>Klávesa</th>
    <th>Vlastnost</th>
  </tr>
  <tr>
    <td><code>16</code></td>
    <td><kbd>Shift</kbd></td>
    <td><code>event.shiftKey</code></td>
  </tr>
  <tr>
    <td><code>17</code></td>
    <td><kbd>Ctrl</kbd></td>
    <td><code>event.metaKey || event.ctrlKey</code> (sjednocení pro Mac OS)</td>
  </tr>
  <tr>
    <td><code>18</code></td>
    <td><kbd>Alt</kbd></td>
    <td><code>event.altKey</code></td>
  </tr>
</table>

<p>Pro odchytávání <b>složených klávesových zkratek</b> potom stačí něco jako:</p>

<pre><code>if (event.keyCode == 83 &amp;&amp; (event.metaKey || event.ctrlKey)) {
// Zkratka Ctrl + S
}</code></pre>

<p>Tedy hlídat číslo klávesy a zároveň <i>speciální</i> klávesu.</p>

<h2 id="formulare">Formulářová pole</h2>

<p>Někdy <b>je žádoucí</b>, aby některé klávesové zkratky <b>nefungovaly při psaní ve formuláři</b>. Bylo by docela nepraktické, kdyby například ovládání fotogalerie šipkami blokovalo přesun kursoru v <a href="/input"><code>&lt;input></code>u</a>. Nebo při stisknutí klávesy <kbd>S</kbd> se provedla příslušná akce místo napsání znaku.</p>

<p>Řešení je zjišťovat <i>cílový</i> element. Opět se způsob liší napříč prohlížeči.</p>

<pre><code>var target = event.srcElement || event.target;</code></pre>

<p>Použití:</p>

<pre><code>if (target.tagName == "INPUT") {
  // jsme v &lt;input>u
}</code></pre>

<p><a href="http://kod.djpw.cz/rkcb">Živá ukázka</a> povolení zpracování zkratky <kbd>Ctrl</kbd> + <kbd>S</kbd> mimo formulářová políčka.</p>

<h2 id="vice-zkratek">Přidávání více zkratek</h2>
<p>Při používání více zkratek je vhodné vymyslet nějaký <b>elegantnější postup</b>. Třeba si vytvořit JS objekt se všemi zkratkami a jejich akcemi a ten předat funkci, která bude požadované funkce volat podle čísla klávesy.</p>

<pre><code>var zkratky = {
  27 : function() {
    // ESC
  },
  37 : function() {
    // Left
  }
};
// Volání funkce při document.onkeydown
zkratky[kodKlavesy]();</code></pre>

<p><a href="http://kod.djpw.cz/clcb">Živá ukázka</a>.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://bitwalker.github.io/keys.js/">Keys.js</a></li>
  <li><a href="http://osvaldas.info/keyboard-shortcuts-for-pagination">Keyboard Shortcuts for Pagination</a></li>
  
  <li><a href="https://github.com/mightyiam/combokeys">Combokeys</a> – snadná implementace klávesových zkratek pro JS akce</li>
</ul>