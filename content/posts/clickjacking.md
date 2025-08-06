---
title: "Clickjacking na Facebooku"
headline: "Clickjacking na Facebooku"
description: "Jak funguje clickjacking na Facebooku a jak se proti němu bránit."
date: "2014-05-04"
last_modification: "2014-07-25"
status: 1
tags: ["facebook", "zabezpeceni"]
format: "html"
---

<p>Tento útok je populární hlavně na <b>Facebooku</b> u jeho <i>Like</i>/<i>To se mi líbí</i> tlačítka. Spočívá v tom, že se útočníkovi povede, aby návštěvník udělil stránce <i>Like</i>, aniž by o tom <b>věděl</b>.</p>

<p>Docílí se toho celkem snadno.</p>

<ol>
  <li>Na web se umístí typicky nějaké <b>video</b> s lákavým popiskem a náhledem.</li>
  
  <li>Do místa, kde se očekává, že nic netušící návštěvník klikne, se umístí <a href="/sdileci-tlacitka">Like tlačítko</a>. Toto místo je zpravidla nějaké tlačítko <i>Play</i>.</li>
  
  <li>Tento <i>Like box</i> se využitím <a href="/opacity">průhlednosti</a> <b>zneviditelní</b> (maximálně zprůhlední).</li>
  
  <li>Nyní si uživatel zkusí <b>pustit video</b>, ale místo toho se kliknutí promítne do <i>Like</i> tlačítka.</li>
  
  <li>V případě, že video na stránce skutečně existuje a po dalším kliknutí se spustí, si člověk vůbec <b>nemusí všimnout</b>, že je stránka podvodná. A nevědomky udělené <i>To se mi líbí</i> tak útočníkovi zůstane.</li>
</ol>

<p>Příklad takového videa – je možné pozorovat popisek <i>To se mi libí</i>, který pochází z neviditelného <i>Like</i> tlačítka.</p>

<p><img src="/files/clickjacking/priklad.jpg" alt="Příklad clickjackingu" class="border"></p>

<a href="https://kod.djpw.cz/noeb">Živá ukázka</a> zjednodušeného postupu clickjackingu.



<h2 id="risika">Risika</h2>

<p>Risika nachytání se nejsou příliš vysoká. Nejspíš vás maximálně někdo bude považovat za člověka, co kliká na každou ptákovinu.</p>




<h2 id="obrana">Obrana</h2>

<ol>
  <li>
    <p>Neklikat na <b>podezřelé odkazy</b> s šokujícími názvy.</p>
  </li>
  
  <li>
    <p>Když se dostaneme na takovou podezřelou stránku, podívat se před kliknutím, zda se při podržení myši nad videem <b>neobjevuje popisek</b> (<code>title</code>) z <i>Like</i> tlačítka.</p>
  </li>
  
  <li>
    <p>Po navštívení a kliknutí na něco na podezřelé stránce nebo čas od času si zkontrolovat <i>Activity log</i>/<i>Záznamy o aktivitách</i>, které jsou na stránce <b>vlastního profilu</b> vpravo dole nad <a href="/facebook-cover">cover obrázkem</a>.</p>
    
    <p><img src="/files/clickjacking/activity-log.png" alt="Záznamy o aktivitách" class="border"></p>
  </li>
  
  <li>
    <p>Stoprocentní, ale možná až nežádoucí obrana, je zablokovat všechna <i>To se mi líbí</i> tlačítka spolu s dalšími prvky Facebooku.</p>
    
    <p>Stačí zablokovat část URL <code>*connect.facebook.net*</code>.</p>
  </li>
</ol>



<h2 id="vlastni-stranky">Ochrana vlastních stránek</h2>

<p>Tento útok je použitelný i pro jiné weby, než je Facebook. Ochrana z posice tvůrce webu / webové aplikace tkví v <b>zakázání načítání stránky do rámů</b> (většinou <code>&lt;iframe></code>) – je k tomu možné použít hlavičku <code>X-FRAME-OPTIONS</code>.</p>

<p>Řešení v PHP:</p>

<pre><code>&lt;?php
header('X-Frame-Options: SAMEORIGIN');
?></code></pre>

<p>Proč tohle Facebook nedělá? Protože je na načtení v <code>&lt;iframe></code> závislý. Kdyby se jeho obsah nenačítal v <code>&lt;iframe></code>, měl by útočník ještě víc možností ke <b>zneužití</b>.</p>