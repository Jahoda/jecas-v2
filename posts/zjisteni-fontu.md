---
title: "Jak zjistit název fontu"
headline: "Co je to za font?"
description: "Jak určit, jak se jmenuje písmo na obrázku nebo webu."
date: "2014-06-17"
last_modification: "2016-11-21"
status: 1
tags: ["napady", "pisma"]
format: "html"
---

<p>Často chceme zjistit, <b>jaké písmo webová stránka používá</b> nebo jaký font je například na obrázku.</p>

<h2 id="obrazek">Zjištění fontu z obrázku</h2>

<p>Pro určení použitého fontu na základě obrázku existuje dobře funkční nástroj:</p>


<h3 id="whatthefont">WhatTheFont</h3>
<p><a href="http://www.myfonts.com/WhatTheFont/" class="button">WhatTheFont</a></p>

<p>Obrázek pro identifikaci písma je možné <b>nahrát z disku</b> nebo zadat URL z umístění na webu a následně ověřit, jestli se podařilo správně identifikovat <b>na obrázku použitá písmena</b>.</p>

<p><img src="/files/zjisteni-fontu/upresneni-znaku.png" alt="Ruční upřesnění znaků" class="border"></p>

<p>Nástroj WhatTheFont pracuje velmi spolehlivě, ale samozřejmě se může stát, že písmo nenajde. Navíc v řadě případů nabídne více písem a <b>finální určení proběhne ručně</b>. Občas ale může být kvůli své popularitě přetížený.</p>



















<h3 id="matcherator">Fontspring Matcherator</h3>

<p><a href="https://www.fontspring.com/matcherator" class="button">Fontspring Matcherator</a></p>

<p>Velmi spolehlivý nástroj pro určení fontu. Obrázek s písmem k rozpoznání jde vložit pomocí URL nebo nahrát z disku.</p>

<h2 id="web">Font použitý na stránce</h2>

<p>Určení písma, kterým je napsán text webu, je potom z principu věci 100%.</p>

<p>Do prohlížeče <b>Chrome</b> existují šikovné doplňky / pro ostatní prohlížeče jako <i>bookmarklet</i>.</p>

<h3 id="type-sample">Type Sample</h3>
<p><a href="http://www.typesample.com" class="button">Type Sample</a></p>

<p>Po aktivování režimu prohlížení (kliknutí na bookmarklet / ikonu pluginu) se při najetí nad element <b>objeví použitý font</b>.</p>

<p><img src="/files/zjisteni-fontu/type-sample.png" alt="Zobrazení použitého písma" class="border"></p>

<p>Když se na obsah klikne, je navíc možné daným písmem zkusit napsat <b>vlastní text</b>. To se může hodit třeba pro ověření, zda <b>font umí češtinu</b> v případě anglického webu a podobně.</p>

<p><img src="/files/zjisteni-fontu/type-sample-vlastni.png" alt="Otestování písma" class="border"></p>


<h3 id="ninja">Fontface Ninja</h3>
<p><a href="http://fontface.ninja/" class="button">Fontface Ninja</a></p>

<p>Velmi podobný je i nástroj <b>Fontface Ninja</b>, který umí i některé fonty <b>stáhnout</b>.</p>

<p>Občas má ale problémy správné písmo určit, třeba na této stránce.</p>

<p><img src="/files/zjisteni-fontu/font-face-ninja.png" alt="Fontface Ninja" class="border"></p>

<h3 id="jinde-zpusoby">Jiné způsoby</h3>
<ol>
  <li>
    <p>Teoreticky je možné použité písmo vyčíst <b>přímo z CSS souborů</b>, ale kvůli dědičnosti to může být oříšek.</p></li>
    <pre><code>body {
  font-family: "Název písma";
}</code></pre>
  <li>
    <p>U netradičních písem (např. <a href="/ceska-pisma">Google fontů</a>) jde vypozorovat font na základě jeho připojení v sekci <code>&lt;head></code>:</p>

<pre><code>&lt;link href='http://fonts.googleapis.com/css?family=Nazev+pisma' rel='stylesheet'></code></pre>
  </li>
  <li>
    <p>Další způsob je s použitím <a href="/vyvojarske-nastroje">vývojářských nástrojů</a> monitorovat část Síť/Network s stahování písem (záložka <i>Fonts</i>).</p>

<p><img src="/files/zjisteni-fontu/devtools-fonts.png" alt="Zobrazení načtených písem" class="border"></p>
  </li>
  <li>
    <p>S využitím <b>vývojářských nástrojů</b> je nakonec snadné zjistit písmo i po kliknutí pravým tlačítkem na text a volbou <i>Zkontrolovat prvek</i> a v pravé částí si vybrat <i>spočítané</i> (Computed) styly. A tam najít CSS vlastnost <code>font-family</code>.</p>

<p><img src="/files/zjisteni-fontu/devtools-computed.png" alt="Zobrazení výsledného písma" class="border"></p>

<p>Zjistit <a href="/zjisteni-css">„spočítané“ hodnoty CSS</a> umí i pár řádků JavaScriptu.</p>
  </li>
  
  <li>
    <p>Ve <b>vývojářských nástrojích Firefoxu</b> je u prozkoumávání prvků stránky přímo volba <i>Písma</i>, která rovnou zjistí použitý font. Napíše i informaci, jestli je písmo <i>systémové</i> nebo <i>vzdálené</i> (např. <i>Google Font</i>). Tato funkce umí i vypsat všechny písma použitá na stránce.</p>
    
    <p><img src="/files/zjisteni-fontu/firefox-pisma.png" alt="Zjištění použitého fontu ve Firefoxu" class="border"></p>
  </li>
</ol>