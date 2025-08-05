---
title: "V jakém jazyce programovat?"
headline: "Jazyk zdrojového kódu"
description: "Jakým jazykem programovat. Česky, nebo anglicky?"
date: "2015-01-04"
last_modification: "2015-01-16"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---

<p>Při programování nového projektu/skriptu čelí programátor mimo jiné otázce, <b>jakým jazykem</b> psát kód. Jestli použít svůj mateřský jazyk nebo psát v <b>universálnější angličtině</b>.</p>

<p>V českém prostředí jde tedy o to, zda psát zdrojové kódy <b>česky nebo anglicky</b>. Oba přístupy mají své výhody i nevýhody.</p>


<h2 id="srozumitelnost">Srozumitelnost</h2>

<p>Podobně jako je pro česky hovořícího člověka snazší číst v češtině obyčejný text, tak i <b>český zdrojový kód</b> bude lépe čitelný.</p>



<h3 id="klicova-slova">Odlišení klíčových slov</h3>

<p>Programovací jazyky obvykle obsahují tzv. <b>vyhrazená klíčová slova</b>, která mají nějakou speciální funkci.</p>

<p>Když programátor píše vlastní kód (názvy proměnných a funkcí) česky, získá několik výhod:</p>

<ol>
  <li>
    <p>V podstatě <b>nehrozí kolise</b> při pojmenovávání identifikátorů, kdy by použil název již existující <b>vestavěné funkce</b>.</p>
    
    <p>Pokud například v PHP bude potřeba vytvořit funkci pro přepnutí, nejde ji pojmenovat <code>switch</code>:</p>
    
    <pre><code>function switch() {
  // kód
}</code></pre>
    
    <p><i>Switch</i> je v PHP vyhrazené slovo, takže tento kód <b>skončí chybou</b>, která není úplně vypovídající:</p>
    
    <pre><code>Parse error: syntax error, unexpected T_SWITCH, expecting T_STRING</code></pre>
    
    <p>JavaScript je na tom s <b>popisem chyby</b> trochu lépe:</p>
    
    <pre><code>Syntax error while loading: expected identifier, got keyword 'switch'</code></pre>
    
    <p>Někdy tomu dokáže předejít <b>barvení kódu nebo editor</b>, ale bez toho se jedná o hodně nepříjemný druh chyb.</p>
  </li>
  
  
  <li>
    <p>Druhá výhoda je <b>odlišení vlastního kódu</b>, kdy se jde řídit jednoduchým pravidlem, že „co je česky, to jsem napsal“.</p>
    
    <p>Je tedy na první pohled jasné, že daná funkce není vestavěná a podobně.</p>
  </li>
</ol>


<h3 id="diakritika">Diakritika</h3>

<p>Přestože v programovacích jazycích většinou není problém používat v názvech i <b>diakritiku</b>, s ohledem na editory to není moc rozumné. Může potom špatně fungovat <b>barvení kódu</b>, napovídání identifikátorů a podobně</p>

<div class="internal-content">
  <ul>
    <li><a href="/zvlastni-znaky-class">Diakritika v názvu CSS třídy</a></li>
    
    <li><a href="http://kod.djpw.cz/onjb">Živá ukázka podpory diakritiky</a> – HTML, CSS, JavaScript</li>
  </ul>
</div>

<h2 id="musi-umet">Programátor musí umět anglicky</h2>

<p>Poměrně rozšířený názor je, že programátor <b>stejně musí umět anglicky</b>. Osobně se domnívám, že nemusí. Minimálně v začátcích nebo pokud nepotřebuje sledovat <b>nejnovější trendy</b> / <b>marginální oblasti</b>, existují kvalitní zdroje i v češtině.</p>

<p>Kromě toho jsou typické <b>skupiny lidí</b>, které dají jednoznačně přednost češtině:</p>

<ul>
  <li>Hodně mladí lidé, co ještě anglicky neumí.</li>
  
  <li>Starší lidé, co se anglicky nikdy neučili.</li>
</ul>



<h2 id="universalnost">Universálnost</h2>

<p>Velká výhoda <b>psaní kódu v angličtině</b> je potom oproti češtině v o hodně větší skupině lidí, která bude kódu rozumět.</p>

<p>To se může hodit při rozšiřování nebo prodeji programu do zahraničí.</p>

<p>Universálnost a srozumitelnost pro velkou skupinu lidí může být ale i nevýhoda. Použití minoritního jazyku je do jisté míry <b>obfuskace aplikace</b> (<i>obfuscate</i> – zatemnit), která zkomplikuje nečesky rozumějícím provádět <i>reversní inženýrství</i>.</p>





<h2 id="rozhodovani">Jak se rozhodnout</h2>

<p>Na základě bodů výše nevypadá rozhodnutí mezi češtinou a angličtinou jako takový problém.</p>

<p>Bohužel nikdy dopředu není možné říct, jak se <b>program bude používat</b> a zákon schválnosti praví, že to bude nakonec úplně jinak, než to vypadalo.</p>





<h2 id="preklad">Přeložení zdrojového kódu</h2>

<p>I při volbě „nevhodného“ jazyku nemusí být situace úplně ztracená. Programátorská IDE mívají nástroj pro hromadné změny názvů identifikátorů.</p>

<p>Většinou se taková možnost nachází po něčím jako <i>Refactor</i> → <i>Rename</i>. Příklad z <b>NetBeans</b> po kliknutí pravým tlačítkem na název proměnné:</p>

<p><img src="/files/jazyk-kodu/prejmenovani.png" alt="Přejmenování proměnné v NetBeans" class="border"></p>








