---
title: "Responsivní menu"
headline: "Responsivní navigace"
description: "Jak udělat elegantní navigaci pro zobrazení na malých obrazovkách."
date: "2014-05-30"
last_modification: "2014-06-22"
status: 1
tags: ["css", "hotova-reseni", "menu", "responsive"]
format: "html"
---

<p>Při tvorbě <a href="/responsive">responsivního designu</a> čelíme výzvě, jak vyřešit navigaci (menu).</p>

<p>V případě, kdy je <b>menu nad obsahem</b>, to může být zvlášť u <b>delších navigací</b> nevhodné, protože návštěvník bude muset odrolovat celou nabídku, aby se dostal na samotný obsah.</p>

<p>Podobně nepraktická bude i opačná situace, kdy bude krkolomné se dostat skrz obsah k menu.</p>

<p>První možnost, která se používala hlavně v minulosti, je umístit na začátek prosté <b>odkazy na různé kotvy</b> typu <i>přeskočit na obsah</i>, <i>přeskočit na menu</i> a podobně.</p>

<p>Dnes se častěji navigace <i>zabalují</i> do jediného tlačítka, které menu po kliknutí vysune, zobrazí přes celou stránku nebo vysune ze strany.</p>

<p>Nejjednodušší typy chování jsou zachyceny na následujícím videu.</p>

<p><a href="https://www.youtube.com/watch?v=6HT-yirOGoo" class="yt">Responsivní navigace</a></p>

<h2 id="rozbaleni">Rozbalení menu</h2>

<ol>
  <li><p>Do obalu navigace se umístí ve výchozí podobě skryté tlačítko <i>≡ Menu</i>.</p></li>
  <li><p>Pomocí <a href="/mobilni-web#media-queries">media queries</a> se u menších obrazovek toto tlačítko zobrazí a naopak skryje menu.</p></li>
  <li><p>A nakonec se s využitím <a href="/prepinani-trid">přepínání třídy JavaScriptem</a> bude toto menu po klikání na tlačítko <i>Menu</i> zobrazovat/skrývat.</p></li>
</ol>

<p><a href="https://kod.djpw.cz/jqdb">Samostatná živá ukázka</a> (projeví se při šířce do 480 px)</p>

<p>Samotný HTML kód navigace je tedy společný pro mobily i desktop, odlišnou podobu mu může zařídit <b>změna CSS</b>.</p>

<p>Pokud by bylo příliš pracné původní styl pro velké obrazovky <i>přebíjet</i> v <a href="/media"><code>@media</code> podmínce</a>, stačí JavaScriptem <b>kompletně vyměnit třídu</b> společného obalového elementu (ne ji jen přidávat/odebírat).</p>

<h2 id="efekt-rozbaleni">Efekt rozbalení</h2>

<p>Výše uvedená ukázka zajišťuje jen základní funkci <a href="/zobrazit-skryt">zobrazit/skrýt</a>. Jak by šlo vykouzlit nějaké lepší efekty?</p>

<h3 id="absolutni">Absolutní posicování</h3>

<p>S využitím <a href="/position#absolute">absolutní posice</a> menu (a relativní posice u obalu) může navigace překrývat obsah. Podobně jako <a href="/klikaci-menu">rozklikávací menu</a>.</p>

<h3 id="fullscreen">Menu přes celou obrazovku</h3>

<p>Roztáhnout navigaci na celou obrazovku jde nejsnáze <a href="/position-fixed">fixním posicováním</a>:</p>

<pre><code>.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}</code></pre>

<p>V takovém případě je nutné nezapomenout na možnost <b>okno s navigací zavřít</b>. Například původní tlačítko naposicovat nahoru s popiskem <i>Zavřít</i>.</p>

<p><a href="https://kod.djpw.cz/wzdb">Samostatná živá ukázka</a> (pro 480 px na šířku)</p>

<h3 id="odtlaceni">„Odtlačení“ obsahu</h3>

<p>Dalším populárním efektem je situace, kdy po kliknutí na tlačítko <i>Menu</i> <b>navigace přijede ze strany</b> a odstrčí hlavní obsah.</p>

<p>Zde je možný postup přidávat při kliknutí třídu přímo pro <code>&lt;body></code> (<a href="/documentelement-body">document.body</a> v JS).</p>

<ol>
  <li>
    <p>Po přidání třídy se <b>odsune obsah</b>. Třeba relativním posicováním obalu stránky (např. <code>position: relative; left: 90%</code>).</p>
    <p>Zároveň se objeví menu široké 90 % (<code>width: 90%</code>).</p>
    
    <p>Docílit <b>plynulých přechodů</b> pomůže CSS vlasnost <a href="/transition"><code>transition</code></a>/<a href="/animation"><code>animation</code></a>.</p>
  </li>
  
  <li>
    <p>Jiná možnost je mít před hlavním sloupcem stránky ještě jeden – zatím s nulovou šířkou (budou <a href="/float">obtékané</a>). A odsunutí nasimulovat jeho roztahováním.</p>
  </li>
</ol>


<p><a href="https://kod.djpw.cz/zzdb">Samostatná živá ukázka odtlačení</a> (pro 480 px na šířku)</p>

<p>Vylepšit <b>ovladatelnost stránky</b> při odsouvání obsahu lze umístěním klikací plochy nad zbytek obsahu, který je vidět. A po kliknutí na tuto plochu zase menu <b>zasunout zpátky</b>.</p>