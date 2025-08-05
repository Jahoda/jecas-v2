---
title: "Výpis souborů ze složky"
headline: "Výpis souborů ve složce"
description: "Jak v PHP vypsat a podle názvu či data seřadit obsah složky."
date: "2014-07-31"
last_modification: "2014-09-04"
status: 1
tags: ["hotova-reseni", "php"]
format: "html"
---

<p>Pro zjednodušení práce se často hodí si PHP skriptem automaticky <b>vypsat obsah složky</b> (typicky třeba pro výpis obrázků a vytvoření galerie). Hodí se k tomu funkce <code>glob</code>. Její výhoda je, že v názvu cesty je možné <b>používat masku</b>.</p>

<pre><code>foreach (glob("soubory/*.jpg") as $soubor) {
    echo $soubor . "&lt;br>\n";
}</code></pre>

<p>Uvedený kód vypíše všechny soubory s příponou JPG v adresáři <code>soubory</code>. Výpis pouze JPG zajišťuje právě výraz „<code><b>*</b>.jpg</code>“.</p>



<h2 id="razeni-nazev">Řazení dle názvu</h2>

<p>Ve výchozím použití funkce <code>glob</code> zároveň <b>položky abecedně seřadí</b>.</p>



<h2 id="razeni-datum">Seřazení podle stáří</h2>

<p>Často je ale nutné soubory řadit podle <b>kalendářního data</b>. K tomu stačí jednoduchá vlastní funkce, která porovná <code>filetime</code> (datum změny) souborů.</p>

<pre><code><b>$soubory</b> = glob("soubory/*.jpg");
// Řazení od nejnovějšího
usort(<b>$soubory</b>, function($a, $b) {
  return filemtime($a) &lt; filemtime($b);
});
// Výpis
foreach ($soubory as $soubor) {
  echo $soubor . "&lt;br>\n";
}</code></pre>

<p>V případě, že nechceme vypisovat <b>cestu souboru</b>, nejjednodušší je využít funkci <code>basename</code>:</p>

<pre><code>echo basename($soubor);</code></pre>

<p>Pokud se nemá vypisovat ani <b>přípona</b>, stačí ji uvést do parametru:</p>
<pre><code>echo basename($soubor, '<b>.jpg</b>');</code></pre>



<h2 id="obracene">Obrácené řazení</h2>

<p>Mají-li se soubory řadit obráceně, existuje několik způsobů, jak toho docílit.</p>

<ol>
  <li>
    <p>Funkcí <code>array_reverse</code> pole získané funkcí <code>glob</code> s názvy souborů <b>otočit</b>.</p>
    <pre><code>$soubory = array_reverse($soubory);</code></pre>
  </li>
  
  <li>
    <p>Ve vlastní funkci pro řazení (v případě, že se k řazení používá datum) <b>otočit nerovnost</b> mezi hodnotami získanými funkcí <code>filemtime</code>.</p>
  </li>
  
  <li>
    <p>Místo cyklu <code>foreach</code> použít <code>for</code>, který projede položky <i>od konce</i>.</p>
    
    <p>Když je kvůli něčemu stejně potřeba zjistit <b>počet souborů</b>, není to o tolik komplikovanější.</p>
    
    <pre><code>$pocetPolozek = count($soubory);
for ($i = $pocetPolozek; $i > 0; $i--) {
  echo basename($soubory[$i - 1], ".txt") . "&lt;br>\n";
}</code></pre>
    
    <p>Nicméně může tento kód být <b>hůře pochopitelný</b> a je komplikovanější pro změnu řazení, takže bych se mu raději vyhnul.</p>
  </li>
</ol>


<h2 id="db">Databáse?</h2>

<p>Vytváření např. <b>fotogalerií</b> pomocí výše uvedeného vypsání složky je dobré předem zvážit. Při rozšiřování takové aplikace velmi brzy narazíme na <b>strop rozšiřitelnosti</b>.</p>

<p>Třeba prostý požadavek na možnost libovolně seřadit obrázky bude čistě se soubory relativně komplikovaný.</p>

<p>Nabízí se tedy rovnou <b>DB použít</b>, pro každý soubor mít záznam v příslušné tabulce a výpisy řešit na úrovni <b>SQL</b>. Skript pro procházení složek se ale může hodit pro prvotní naplnění databáse těmito záznamy.</p>