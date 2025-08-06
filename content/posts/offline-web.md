---
title: "Offline webová stránka"
headline: "Offline webová stránka"
description: "Jak umožnit návštěvníkům stažení celé webové stránky pro prohlížení offline, umístění na CD apod."
date: "2013-12-23"
last_modification: "2013-12-24"
status: 1
tags: ["hotova-reseni", "js", "napady", "offline", "php"]
format: "html"
---

<p>Pro vytvoření verse webu ke stažení existuje několik možností.</p>

<h2 id="stahovaci-programy">Stahovací programy</h2>
<p>Asi nejjednodušší možnost je využití stahovacího programu, který prošmejdí celý web a uloží z něj statickou kopii <b>sestávající z HTML souborů</b>.</p>

<p>Osvědčený je třeba nástroj <b>HTTrack</b>.</p>

<p><a href="http://www.httrack.com/" class="button">Web programu HTTrack</a></p>

<p>Takto je možné stáhnout prakticky libovolný statický i <b>dynamický</b> web.</p>

<h2 id="staticke-stranky">Statické stránky</h2>
<p>Je-li celý web ve statických HTML stránkách, je situace prostá. Stačí obsah zkopírovat a máme <b>offline versi</b>.</p>

<h2 id="dynamicke-stranky">Dynamické stránky</h2>
<p>U webu generovaného dynamicky nějakou serverovou technologií třeba z databáse je potom postup trochu komplikovanější. Tedy v případě, že chceme generovat <b>aktuální obsah pro stažení</b> (a nepoužít tedy HTTrack).</p>

<h3 id="vygenerovani-statickych-stranek">Vygenerování statických stránek</h3>
<p>V případě, že dynamická stránka <b>HTML výstup cachuje</b> do statických souborů, je rovněž hotovo. V opačném případě se hodí generování statické offline stránky ke kešování využít.</p>

<p>Zachytit a uložit obsah jde v PHP následovně:</p>
<pre><code>ob_start();
echo "Nějaký výpis";
file_put_contents("nazev-souboru.html", ob_get_clean());</code></pre>

<p>Hotové řešení včetně balení do <a href="http://php.vrana.cz/verze-ke-stazeni.php">ZIP archivu</a>.</p>

<h2 id="jeden-soubor">Celý web v jednom souboru</h2>
<p>Docela zajímavá myšlenka je umístit celý web do <b>jednoho souboru HTML</b>. Jak na to?</p>

<ul>
  <li>Skripty a styly vložit jako interní.</li>
  <li>Obrázky vložit přes <a href="/data-uri">pseudoprotokol <code>data</code></a>.</li>
  <li>Všechen obsah umístit do JavaScriptového objektu.</li>
  <li>Přepsat adresy na volání JS funkce, která bude z objektu s daty načítat jednotlivé stránky.</li>
</ul>

<p><a href="http://jecas.cz/files/download/jecas.cz.html" class="button">Ukázka tohoto webu</a> </p>

<ul>
  <li><a href="https://kod.djpw.cz/fhv">Zjednodušená ukázka principu</a></li>
  <li><a href="https://github.com/Jahoda/web-jeden-soubor">Zdrojový PHP kód</a></li>  
</ul>

<p>Nevýhoda tohoto postupu je, že se úplně nekamarádí s ukázkami v JavaScriptu na jednotlivých stránkách. Nicméně to u standardního webu nemusí vadit.</p>

<ul>
  <li>Zprovoznit „tlačítko zpět“ (ukládání do historie) <a href="/zmena-url">jde pomocí <code>history.pushState</code></a>.</li>
  <li>Okamžité vyhledávání/filtrování by šlo udělat přímo v JS.</li>
</ul>

<h2 id="cache-manifest">Cache manifest v HTML 5</h2>
<p>HTML 5 přináší tzv. <a href="http://en.wikipedia.org/wiki/Cache_manifest_in_HTML5">cache manifest</a>. Tím je možné prohlížeči naznačit, že si má uvedené URL pamatovat a při nedostupném připojení (offline režimu) je zobrazovat z cache.</p>