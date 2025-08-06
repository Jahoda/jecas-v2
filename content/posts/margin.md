---
title: "Margin"
headline: "Margin v CSS"
description: "CSS vlastnost <code>margin</code> slouží k vytvoření odsazení kolem elementu, který má <code>margin</code> nastavený."
date: "2014-01-13"
last_modification: "2014-02-09"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Samotný zápis „<code>margin</code>“ je sloučení vlastností pro jednotlivé strany:</p>

<ul>
  <li><code>margin-top</code> — odsazení shora</li>
  <li><code>margin-right</code> — odsazení zprava</li>
  <li><code>margin-bottom</code> — odsazení zdola</li>
  <li><code>margin-left</code> — odsazení zleva</li>
</ul>

<p>Při používání sloučeného názvu (<code>margin</code>) se rozměry uvádějí odshora ve směru hodinových ručiček.</p>

<pre><code>p {margin: 5px 4px 3px 2px}
/* symbolicky: top, right, bottom, left */</code></pre>

<p>Výše uvedený zápis nastaví odstavcům (<code>&lt;p></code>) horní odsazení na <code>5px</code>, zprava odsazení <code>4px</code> a tak dále.</p>

<p>Mimochodem, odpovídající <b>nezkrácený</b> zápis by vypadal následovně.</p>

<pre><code>p {
  margin-top: 5px;
  margin-right: 4px;
  margin-bottom: 3px;
  margin-left: 2px;
}</code></pre>

<p>Zadáním <b>jen dvou hodnot</b> je možné nastavit stejné odsazení shora + zdola (<code>5px</code>) a zprava + zleva (<code>10px</code>):</p>

<pre><code>p {margin: 5px 10px}</code></pre>

<p>A konečně zadání hodnoty jedné nastaví stejné odsazení (<code>10px</code>) pro všechny strany najednou.</p>

<pre><code>p {margin: 10px}</code></pre>

<p>Co se stane při zadání <b>tří hodnot</b>? Ta poslední (pro levé odsazení – <code>margin-left</code>) se nastaví na stejnou hodnotu jako <code>margin-right</code> (pravé odsazení). Následující zápisy jsou tedy stejné.</p>

<pre><code>.prvni {margin: 1em <i>2em</i> 3em}
.druhy {margin: 1em <i>2em</i> 3em <b>2em</b>}</code></pre>

<h2 id="centrovani">Centrování <code>margin</code>em</h2>
<p>Kromě vytváření odsazení kolem elementů má vlastnost <code>margin</code> další využití — v <a href="/centrovani">centrování</a>. Stačí k tomu nastavit šířku a pravý i levý <code>margin</code> nastavit na hodnotu <code>auto</code>.</p> 
  
<pre><code>.centrovany-blok {
  margin: auto; 
  width: 300px;
}</code></pre>

<p>Uvedený kód rovnou <b>vynuluje případný horní a dolní</b> <code>margin</code>, protože hodnota <code>auto</code> se pro <code>margin-top</code>/<code>margin-bottom</code> projeví jako nula. <a href="https://kod.djpw.cz/oubb">Ukázka</a>.</p>

<h2 id="vychozi-hodnoty">Výchozí hodnoty</h2>
<p>Hodně elementů má nějakou nenulovou výchozí hodnotu <code>margin</code>u, která může způsobovat problémy ve <b>správném zobrazení</b>. Proto se někdy hodí <a href="/css-reset">resetování a sjednocování</a> napříč prohlížeči.</p>

<h3 id="priblizne-vychozi-hodnoty">Přibližné výchozí hodnoty</h3>
<table>
  <tr>
    <th>Značky</th>
    <th>Hodnoty</th>
  </tr>
  <tr><td><code>body</code></td><td><code>margin: 8px</code></td></tr>
  <tr><td><code>h1</code></td><td><code>margin: .67em 0</code></td></tr>
  <tr><td><code>h2</code></td><td><code>margin: .75em 0</code></td></tr>
  <tr><td><code>h3</code></td><td><code>margin: .83em 0</code></td></tr>
  <tr><td><code>h4, p,
blockquote, ul,
fieldset, form,
ol, dl, dir,
menu</code></td><td><code>margin: 1.12em 0</code></td></tr>
  <tr><td><code>blockquote</code></td><td><code>margin-left: 40px; margin-right: 40px</code></td></tr>
    <tr><td><code>ol, ul, dir,
menu, dd    </code></td><td><code>margin-left: 40px</code></td></tr>
    <tr><td><code>ol ul, ul ol,
ul ul, ol ol</code></td><td><code>margin-top: 0px; margin-bottom: 0px</code></td></tr>
</table>

<h2 id="spojovani">„Slévání“ odsazení</h2>
<p><small>(Pozn.: podle <a href="http://www.plavacek.net"><b>Plaváčka</b></a> je tato situace v české CSS hantýrce známá spíš jako <b>slučování okrajů</b>.)</small></p>
<p>Zajímavá <i>vlastnost</i> <code>margin</code>u nastává v situaci, kdy jsou v kódu za sebou elementy, co mají nenulové horní a dolní odsazení.</p>

<p>Potom se výsledná velikost <i>mezery</i> slije. To funguje tak, že se pro odsazení vybere ta vyšší z dvou hodnot (v případě stejného odsazení zkrátka jen jedna). <a href="https://kod.djpw.cz/vsbb">Samostatná ukázka</a>.</p>

<p>Mezera mezi prvním a druhým odstavcem proto není 55 px (15 px + 40 px), ale jen čtyřicet.</p>

<div class="live">
  <style>
    .obal {background: green;}
    .odstavec {background: yellow; margin: 15px}
    .dva {margin: 40px}
  </style>
  <div class="obal">
    <p class="odstavec">První odstavec (<code>margin: 15px</code>)</p>
    <p class="odstavec dva">Druhý odstavec (<code>margin: 40px</code>)</p>
    <p class="odstavec">Třetí odstavec (<code>margin: 15px</code>)</p>
    <p class="odstavec">Čtvrtý odstavec (<code>margin: 15px</code>)</p>
  </div>
</div>

<p>Pro <b>odsazení na stranách toto neplatí</b>. U <a href="/float">obtékaných</a> elementů se sousední <code>margin</code>y <b>sečtou</b>:</p>

<p><img src="/files/margin/margin-obtekani.png" alt="Chování marginu na stranách u obtékaných elementů" class="border"></p>

<p>Červené čtevrečky na obrázku representují 15px odsazení odstavců 1, 2 a 4. Čtverečky modré potom 20px odsazení odstavce třetího. Jak je vidět, <code>margin</code> se normálně <b>sečte</b>.</p>

<h2 id="vyteceni">„Vytečení“ <code>margin</code>u</h2>

<p>Toto chování už je vidět na předchozí ukázce. Oč jde? V případě, že má první element <code>margin-top</code> (horní odsazení) nebo poslední element <code>margin-bottom</code> (spodní odsazení), přenese se toto odsazení na rodiče těchto elementů. Přesněji řečeno se opět <b>slije</b> (velikost odsazení bude rovna vyšší z hodnot <code>margin</code>ů rodiče a jeho prvního potomka).</p>

<p>Jak je vidět na <a href="https://kod.djpw.cz/ysbb">ukázce</a>, zelený element <code>.obal</code> má horní i dolní odsazení i přes <code>margin: 0</code>.</p>

<div class="live">
  <style>
    .prvni-obal {background: pink}
    .obal {background: green; margin: 0}
    .p {background: yellow; margin: 15px}    
    .cara {height: 5px; background: red;}
  </style>
  <div class="prvni-obal">
    <div class="cara"></div>
    <div class="obal">
      <div class="p">Odstavec.</div>
    </div>
    <div class="cara"></div>
  </div>
</div>

<p>Typicky se tento <i>problém</i> může projevovat na začátku stránky, kdy nadpis nebo i obyčejný <code>&lt;div></code> s <code>margin-top</code> stránku odsune. <a href="https://kod.djpw.cz/webb">Ukázka</a>.</p>

<p>Předávání <code>margin</code>u na rodiče nenastane v situaci, kdy <b>rodičovský element</b> bude mít <code>padding</code> nebo <code>border</code>.</p>

<p>Jiný způsob odstranění tohoto problému je změna <code>overflow</code> na hodnotu <code>auto</code> nebo <code>hidden</code>.  Margin potom zůstane uvnitř. <a href="https://kod.djpw.cz/etdb">Ukázka</a>.</p>

<h2 id="clear">Vlastnost <code>clear</code> a <code>margin</code></h2>

<p>Další zajímavé chování nastává u elementu, který <i>ukončuje</i> obtékání (<code>clear: both</code>). Neprojeví se u něj <code>margin-top</code>. Tedy alespoň v prohlížečích kromě <b>IE</b> (ten nemá s horním odsazením problém ani v <a href="/ie11">jedenácté versi</a>). Ostatní hodnoty <code>marginu</code> (<code>right</code>, <code>bottom</code> a <code>left</code>) se projeví standardně.</p>

<p></p>

<ul>
  <li><a href="https://kod.djpw.cz/atbb">Ukázka</a></li>
  <li><a href="http://diskuse.jakpsatweb.cz/?action=vthread&topic=65135&forum=7">Diskuse</a></li>
</ul>