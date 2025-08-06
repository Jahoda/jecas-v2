---
title: "Automatická datová optimalisace obrázků"
headline: "Hromadné datové zmenšení obrázků"
description: "Chceme-li zrychlit načítání své stránky, datová optimalisace obrázků může pomoci."
date: "2013-08-16"
last_modification: "2016-03-28"
status: 1
tags: ["hotova-reseni", "napady", "zrychlovani"]
format: "html"
---

<h2>PageSpeed Insights</h2>
<p>Problematické obrázky, tj. co by se daly zmenšit, najdeme nástrojem <a href="http://developers.google.com/speed/pagespeed/insights/">PageSpeed Insights</a>, pokud by nějaké šlo datově srazit, objeví se následující:</p>

<p><img class="border" src="/files/optimalisace-obrazku/summary.png" alt="Popis obrázků k optimalisaci"></p>

















<h2 id="tiny">TinyPNG / TinyJPG</h2>

<p>Možnost datově zmenšit obrázek bez <b>ztráty kvality</b> nabízí i TinyPNG / TinyJPG.</p>

<p>
  <a href="https://tinypng.com/" class="button">TinyPNG</a>
  <a href="https://tinyjpg.com/" class="button">TinyJPG</a>
</p>

<p><img class="border" src="/files/optimalisace-obrazku/tinypng.png" alt="Optimalisace počtu barev v obrázku"></p>
























<p>Příjemné na těchto službách je, že nabízejí <a href="https://tinypng.com/developers">API pro vývojáře</a>.</p>

<p>Optimalisaci obrázků tak jde <b>zautomatisovat</b> v redakčním systému. 500 obrázků měsíčně je zdarma.</p>

<h2 id="optimizilla">Optimizilla.com</h2>

<p>Umožňuje nastavit, kolik barev obrázek potřebuje.</p>

<p><a href="http://optimizilla.com" class="button">Web Optimizilla.com</a></p>


<p>Má trochu pomalejší odezvu.</p>

<p><img class="border" src="/files/optimalisace-obrazku/optimizilla.png" alt="Optimalisace počtu barev v obrázku"></p>




























<h2 id="kraken">Kraken.io</h2>

<p>Zajímavý nástroj hlavně v <a href="https://kraken.io/pro">placené versi</a>. Za 5 dolarů měsíčně nabízí funkce jako hromadné zmenšování obrázků na základě <b>zadaných URL</b>, automatické zmenšení všech obrázků na stránce, API či plugin do <b>Wordpressu</b>.</p>

<p><a class="button" href="https://kraken.io/web-interface">Kraken.io</a></p>


<p><img class="border" src="/files/optimalisace-obrazku/kraken.png" alt="Hromadné zmenšení"></p>




























<h2 id="pngquant">pngquant</h2>

<p>Knihovna pro optimalisaci obrázků, kterou používá TinyPNG nebo Kraken.io.</p>

<p><a href="http://pngquant.org/" class="button">pngquant</a></p>

<p>Ke stažení je i podoba pro spouštění z <b>příkazové řádky</b>.</p>




<h2 id="hromadna">Hromadná optimalisace na Windows</h2>

<p>U rozsáhlého projektu může být zdlouhavé používat online služby nebo si psát skripty, které lokální soubory optimalisují.</p>

<p>Na <a href="/windows">Windows</a> se mi osvědčil následující postup:</p>



<h3 id="pnggoo">Program PNGoo</h3>

<p>Jedná se o GUI ke komprimačnímu nástroji pngquant.</p>

<p><a href="https://pngquant.org/PNGoo.0.1.1.zip" class="button">Stáhnout PNGoo</a></p>

<p>Po rozbalení a spuštění programu se zobrazí okno programu, kam stačí přidat soubory a spustit proces kliknutím na <i>Go!</i>.</p>

<p><img src="/files/optimalisace-obrazku/pngoo.png" alt="PNGoo" class="border"></p>































<h3 id="vyber">Výběr souborů</h3>

<p>Většinou budou PNG obrázky ve více složkách. Proto bude nutné si otevřít složku s projektem v průzkumníkovi a pomocí hledání <code>*.png</code> vyfiltrovat PNG obrázky.</p>

<p><img src="/files/optimalisace-obrazku/hledat-png.png" alt="Vyfiltrování PNG" class="border"></p>






















<p>Celý výsledek stačí pomocí <kbd>Ctrl</kbd> + <kbd>A</kbd> označit a přesunout myší do okna PNGoo.</p>

<p>Po kliknutí na <i>Go!</i> začne proces převodu, předtím se nabízí pro jistotu původní složku <b>zálohovat</b>, protože obrázky se ve výchozím nastavení přepíší.</p>

<p>Proces může v závislosti na počtu obrázku trvat hodně dlouho a program PNGoo průběh nijak nesignalisuje.</p>

<p>V případě úspěšného dokončení by mělo být možné pozorovat značnou datovou úsporu.</p>


<p><img src="/files/optimalisace-obrazku/zmenseni.png" alt="Výsledek zmenšení" class="border"></p>














<h2 id="zmena-velikosti">Změna rozměrů obrázků</h2>

<p>Kromě optimalisace pro snížení velikosti může pomoci i <b>zmenšení rozměrů</b>.</p>

<p>Pokud se obrázek bude zobrazovat ve velikosti 100 × 100 pixelů, zdá se zbytečné, aby měl třeba 1000 × 1000 px.</p>

<p>Dobře <b>hromadně zmenšovat</b> obrázky umí program <a href="/windows-programy#irfan-view">IrfanView</a>. Taktéž jde použít online službu:</p>

<div class="external-content">
  <ul>
    <li><a href="http://birme.net/">Batch Image Resizing Made Easy</a> – hromadná online úprava velikosti obrázků</li>
  </ul>
</div>

<p>Dříve platilo, že by měl mít obrázek takovou velikost, ve které se nakonec zobrazí. Situaci ale změnily displeje s <b>vyšší hustotou pixelů</b>, které jsou schopny větších rozměrů využít.</p>

<p>Najednou mají smysl i 2–4 větší obrázky.</p>

<p>Jelikož je zmenšení obrázku <b>nevratné</b>, není rozumné obrázek v původní velikosti smazat.</p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://medium.com/@duhroach/reducing-jpg-file-size-e5b27df3257c#.tkric6ffg">Reducing JPG File size</a> – jak dramaticky snížit velikost JPG obrázků bez (významné) ztráty kvality</li>
</ul>

<!--
<h2>Vyzobání adres</h2>

<p>Seznam si problematických obrázků si zkopírujeme a vyzobeme si jejich adresy — to lze provést třeba triviálním nahrazením <code>Los.*ing (http.*) cou.*</code> za <code>$1</code>. Nebo universálněji hledáním URL.</p>

<textarea id="nahradit" cols="100" rows="7" onclick="this.select()">Losslessly compressing http://jecas.cz/files/article/cernobily-obrazek.png could save 4.2KiB (57% reduction).
Losslessly compressing http://jecas.cz/images/rss.png could save 2.9KiB (90% reduction).
Losslessly compressing http://jecas.cz/images/home.png could save 2.7KiB (89% reduction).
Losslessly compressing http://jecas.cz/files/article/mobilni-web.png could save 2KiB (48% reduction).</textarea>
<script>var nahradit = document.getElementById("nahradit");</script>
<p>
  <button onclick="nahradit.value = nahradit.value.replace(/Los.*ing (http.*) cou.*/g, '$1');">Vyzobat adresy</button>
</p>













<p>Aplikace bude chvliku pracovat, načež stáhneme výsledný archiv, ideálně se zachováním adresářové struktury (<i>Keep directory structure</i>), takže jeho obsah potom stačí jen rozbalit na server a staré (neoptimalisované) obrázky <b>přepsat</b>.</p>

-->






