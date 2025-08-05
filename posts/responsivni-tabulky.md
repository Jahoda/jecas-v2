---
title: "Responsivní tabulky"
headline: "Responsivní tabulky"
description: "Co udělat s tabulkami, aby se rozumně zobrazovaly na mobilech/tabletech."
date: "2013-11-07"
last_modification: "2013-11-24"
status: 1
tags: ["css", "responsive", "tabulky"]
format: "html"
---

<!--
<style>
  /* reset rozlamování tabulek */
  table {display: table}
  td, th {display: table-cell}
  tr {display: table-row}
  thead {display: table-header-group}
  tbody {display: table-row-group}
  tfooter {display: table-footer-group}
</style>-->

<p>Přestože éra <b>tabulkových layoutů</b> a jejich nahrazení <code>&lt;div></code>y (<b>CSS layouty</b>) způobila u mnoha tvůrců <b>tabulkový odpor</b>, pořád stará dobrá tabulka <b>má na stránce místo</b>.</p>

<p>Problém ale nastává při snaze vytvořit <a href="/mobilni-web">responsivní web</a>. Na malou obrazovku se těžko <b>vícesloupcová</b> tabulka vejde. Co stím?</p>

<h2 id="zjednoduseni">Zjednodušení tabulky</h2>
<p>První možnost je zkusit tabulku zjednodušit, tj. některé <b>sloupce vypustit</b> nebo texty odkazů/tlačítek nahradit obrázky (ikonami). Ideálně s co nejmenší <b>ztrátou informací</b>.</p>

<p>Vezmeme-li si jako příklad <b>tabulku uživatelů</b>.</p>

<div class="live">
  <style>
    .vypnout-popis th:nth-child(3), .vypnout-popis td:nth-child(3) {display: none;}
    .zjednodusit td:nth-child(5) .ico {display: inline-block;}
    .ico, .zjednodusit td:nth-child(5) .txt {display: none;}
  </style>
  <table style="background: #fff" id="zjednodusit">
    <tr>
      <th>Jméno</th><th>E-mail</th><th>Popis</th><th>Funkce</th><th>Akce</th>
    </tr>
    <tr>
      <td>Běžný Uživatel</td>
      <td>bezny@uzivatel.cz</td>
      <td>Popis běžného uživatele.</td>
      <td>Uživatel</td>    
      <td><button><span class="ico">×</span><span class="txt">Smazat</span></button><button><span class="ico">E</span><span class="txt">Upravit</span></button></td>
    </tr>
    <tr>
      <td>Franta Fytopuf</td>
      <td>franta@fytopuf.cz</td>
      <td>Popis běžného fytopufu.</td>
      <td>Rostlinář</td>
      <td><button><span class="ico">×</span><span class="txt">Smazat</span></button><button><span class="ico">E</span><span class="txt">Upravit</span></button></td>
    </tr>  
    <tr>
      <td>Nejlepší Trenér</td>
      <td>strouhanka@kobercovka.cz</td>
      <td>Dlouhý popis nejlepšího trenéra.</td>
      <td>Reservoár</td>    
      <td><button><span class="ico">×</span><span class="txt">Smazat</span></button><button><span class="ico">E</span><span class="txt">Upravit</span></button></td>
    </tr>  
    <tr>
      <td>Žerou Děti</td>
      <td>junior@plzen-wd40.cz</td>
      <td>Popis</td>
      <td>Klaun</td>
      <td><button><span class="ico">×</span><span class="txt">Smazat</span></button><button><span class="ico">E</span><span class="txt">Upravit</span></button></td>
    </tr>  
  </table>  
</div>
<script>
  var zjednodusit = document.getElementById("zjednodusit");
</script>

<ul>
  <li><i>Popis</i> můžeme na malé obrazovce <button onclick="toggle(zjednodusit, 'vypnout-popis')">oželet</button> (<a href="http://kod.djpw.cz/dis-">ukázka</a> – zmenšit pod 500px).</li>
  <li><i>Funkci</i> lze znázornit <b>podbarvením buňky</b> anebo <b>ikonou</b>.</li>
  <li>Obdobně <i>akce</i> mohou být na mobilu <button onclick="toggle(zjednodusit, 'zjednodusit')">representovány</button> jen <b>menší ikonou</b>.</li>
</ul>

<p>„Vypnout“ nebo přestylovat celé sloupce jde nejlépe <i>po staru</i> <b>nastavením tříd</b> pro všechny buňky nebo přes <a href="/css-selektory#n-ty-potomek">selektor n-tého potomka</a> (více o <a href="/stylovani-tabulky">stylování tabulek</a> je na samostatné stránce).</p>

<pre><code>th:nth-child(3), td:nth-child(3) {display: none;}</code></pre>

<p>Výše uvedený kód pro <i>zmizení</i> třetího <b>sloupce</b> sice bude fungovat až od <b>IE 9</b>, ale to nás při optimalisaci pro <a href="/prohlizece#mobily">mobilní zařízení</a> nemusí moc trápit. Starší IE je na mobilech <b>raritní</b>.</p>

<h2 id="posuvnik">Horizontální posuvník</h2>
<p>Asi nejjednodušší řešení je u tabulky, která se na obrazovku <b>nevejde</b>, zobrazit posuvník. Zabrání se tak <b>rozpadnutí stránky</b>, ale použitelnost <b>nebude nejelepší</b>.</p>

<p>Stačí k tomu tabulku obalit <code>&lt;div></code>em s <code>max-width: 100%; overflow: auto</code>:</p>

<div style="max-width: 450px">
  <div class="live no-source" style="max-width: 100%; overflow: auto;">
    <table style="background: #fff;">
      <tr>
        <th>Jméno</th><th>E-mail</th><th>Popis</th><th>Funkce</th><th>Akce</th>
      </tr> 
      <tr>
        <td>Nejlepší Trenér</td>
        <td>strouhanka@kobercovka.cz</td>
        <td>Dlouhý popis nejlepšího trenéra.</td>
        <td>Reservoár</td>    
        <td><button><span class="ico">×</span><span class="txt">Smazat</span></button><button><span class="ico">E</span><span class="txt">Upravit</span></button></td>
      </tr>  
      <tr>
        <td>Žerou Děti</td>
        <td>junior@plzen-wd40.cz</td>
        <td>Popis</td>
        <td>Klaun</td>
        <td><button><span class="ico">×</span><span class="txt">Smazat</span></button><button><span class="ico">E</span><span class="txt">Upravit</span></button></td>
      </tr>  
    </table>  
  </div>
</div>

<h2 id="rozlamani">„Rozlámání“ tabulky</h2>
<p>Pokud <b>zjednodušení</b> není možné nebo dostatečné, nezbývá než tabulku zrušit. Zkrátka ji <i>rozlámat</i> do podoby, že jednotlivé řádky budou <b>pod sebou</b>.</p>

<div class="live">
  <style>
    .rozlamat th {display: none;}
    .rozlamat td, .rozlamat tr, .rozlamat thead, .rozlamat tbody, table.rozlamat {display: block;}
    
    .popisky td:before {position: absolute; left: 5px; top: 0; width: 40%;}
    .popisky td {position: relative; padding-left: 50%}
    
    .popisky td:nth-of-type(1):before {content: "Jméno"}
	.popisky td:nth-of-type(2):before {content: "E-mail"}
	.popisky td:nth-of-type(3):before {content: "Popis"}
	.popisky td:nth-of-type(4):before {content: "Funkce"}
	.popisky td:nth-of-type(5):before {content: "Akce"}
  </style>
  <table style="background: #fff;" id="rozlamat">
    <tr>
      <th>Jméno</th><th>E-mail</th><th>Popis</th><th>Funkce</th><th>Akce</th>
    </tr>
    <tr>
      <td>Běžný Uživatel</td>
      <td>bezny@uzivatel.cz</td>
      <td>Popis běžného uživatele.</td>
      <td>Uživatel</td>    
      <td><button><span class="ico">×</span><span class="txt">Smazat</span></button><button><span class="ico">E</span><span class="txt">Upravit</span></button></td>
    </tr>
    <tr>
      <td>Franta Fytopuf</td>
      <td>franta@fytopuf.cz</td>
      <td>Popis běžného fytopufu.</td>
      <td>Rostlinář</td>
      <td><button><span class="ico">×</span><span class="txt">Smazat</span></button><button><span class="ico">E</span><span class="txt">Upravit</span></button></td>
    </tr>   
  </table>  
</div>
<script>
  var rozlamat = document.getElementById("rozlamat");
</script>

<p>Zrušení tabulky je možné <button onclick="toggle(rozlamat, 'rozlamat')">provést</button> třeba nastavením <code>display: block</code> pro všechny tabulkové elementy (<a href="/html-znacky#volitelne">nezapomínat na <code>&lt;tbody></code></a>).</p>

<pre><code>@media screen and (max-width: 600px) {
  /* rozlámání tabulek */
  td, th, tr, thead, tbody, tfoot, table {display: block} 
}</code></pre>

<h3 id="popisky">Doplnění popisků</h3>
<p>Pokud by srozumitelnost tabulky byla bez popisků nedostatečná, můžeme je <button onclick="toggle(rozlamat, 'popisky')">přidat</button> CSS vlastností <a href="/content-attr"><code>content</code></a>.</p>

<p>A to buď CSS deklarací ve stylu:</p>
<pre><code>.popisky td:nth-of-type(1):before {content: "Popis první buňky"}
.popisky td:nth-of-type(2):before {content: "Popis druhé buňky"}</code></pre>

<p>Nebo přiřazením popisků do <a href="/vlastni-html-znacky">vlastních atributů</a> všech buněk a následné dolování přes <code>content: attr(vlastni-atribut)</code>. To by mohlo zajistit i <a href="http://kod.djpw.cz/lts">pár řádku JavaScriptu</a>.</p>

<h2 id="transformace">Transformace tabulky</h2>
<p>Poslední možnost je tabulku projít skriptem a převést ji třeba na <b>definiční seznam</b> (značka <code>&lt;dl></code>), případně ji převést už na straně serveru při <a href="/mobilni-web#detekce">detekci</a> mobilního prohlížeče.</p>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://elvery.net/demo/responsive-tables/">Elvery.net</a> – Responsive Tables Demo</li>
  <li><a href="http://zurb.com/playground/playground/responsive-tables/index.html">Zurb.com</a> – Responsive Tables</li>
  <li><a href="http://css-tricks.com/examples/ResponsiveTables/responsive.php">CSS-Tricks</a> – Responsive Table</li>
  <li><a href="http://codepen.io/geoffyuen/pen/FCBEg">RWD List to Table</a></li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/ancient-sumerians-knew-html-tables/">The Ancient Sumerians, Tablet Computing and HTML Tables</a></li>
</ul>