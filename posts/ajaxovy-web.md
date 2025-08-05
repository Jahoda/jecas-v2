---
title: "Web v AJAXu"
headline: "AJAXová stránka"
description: "Jak vytvořit obsahový web, kde se obsah bude načítat bez obnovení celé stránky pomocí AJAXu."
date: "2014-12-16"
last_modification: "2014-12-16"
status: 0
tags: []
format: "html"
---

<p>Pro zlepšení <b>uživatelského dojmu</b> z webu může posloužit načítání stránek <a href="/ajax">AJAXem</a>. Smysl to může mít i u běžného <b>obsahového webu</b>.</p>

<p>Díky <b>načtení obsahu AJAXem</b> může být přechod mezi stránkami <b>rychlejší</b>.</p>

<ol>
  <li>Stačí přenášet jen obsah, <b>který se mění</b>.</li>
  
  <li>Překreslovat se bude jen <b>část stránky</b>, která se změnila. Namísto kompletního <a href="/vykreslovani">vykreslení stránky</a> od nuly.</li>
</ol>

<p>Na prvním bodu většinou ani moc nezáleží – velikost výsledných HTML kódů se obvykle pohybují v <b>desítkách kilobytů</b>, což příliš velký prostor pro úsporu <b>nepřináší</b>. Překreslování jen <b>změněné části</b> ale většinou velmi znatelně přechod po webu <b>zrychlí</b>.</p>


<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Zásadní věc je podpora <a href="/zmena-url">změny URL JavaScriptem</a> pomocí <code>history.pushState</code> – <b>IE 10+</b>.</p>

<p>To umožní i při obsloužení změny obsahu AJAXem <b>změnit URL</b> do podoby, která se může načíst i bez JS. Bez této funkce bych se do <b>obsahového webu</b> načítající stránky AJAXem <b>nepouštěl</b>.</p>

<p>Je sice jakž takž možné použít tzv. <i>hashbang</i> – <code>#!</code>, ale je značně <b>problematické načítat</b> takovou stránku, když na ni někdo s <i>hashbangem</i> odkáže – nejdřív se totiž musí načíst obsah bez <i>hashbangu</i> (server na obsah za <code>#</code> nevidí) a až potom JavaScriptem načít <b>pořadovaný obsah</b>.</p>

<p>U JS aplikací, kde se všechen obsah vytváří až v JS, toto nevadí, ale u obsahového webu je to nešikovné řešení.</p>








<h2 id="nacitani">Signalisace načítání</h2>

<p>Je dobré znázornit, že se po kliknutí na odkaz něco děje. Při klasickém přecházení mezi stránkami to automaticky <b>řeší prohlížeč</b>. Při změně obsahu AJAXem to musíme řešit vlastní signalisací.</p>

<p><b>Znázorňovat načítání</b> nemusí být dobré <b>ihned po kliknutí</b>. Pokud web funguje normálně, mělo by načtení obsahu <b>být tak rychlé</b> (desítky až nízké stovky milisekund), že by znázornění načítání stejně jen probliklo.</p>

<p>Uživatelé bývají zvyklí, že se po kliknutí na odkaz <b>chvíli nic neděje</b>, nabízí se tedy načítání znázorňovat třeba až <b>0,5 vteřiny</b> od vyvolání akce.</p>





<h2 id="prednacitani">Přednačítání</h2>

<p>Zrychlit dojem z webu může ještě <b>přednačítání</b>. Celý proces změny obsahu rozložíme do dvou kroků.</p>

<ol>
  <li><b>stažení/zpracování</b> obsahu,</li>
  
  <li><b>zobrazení</b> obsahu</li>
</ol>

<p>Má to svoje výhody i nevýhody. Umožní to <b>rychlejší změnu obsahu</b>, ale může <b>plýtvat daty</b> (načte se něco, co uživatel nakonec nebude chtít zobrazit).</p>

<p>Rozumné může být přednačtení při najetí myší (<a href="/udalosti-mysi#onmouseover"><code>onmouseover</code></a>) nebo stisknutí tlačítka (<a href="/udalosti-mysi#onmousedown"><code>onmousedown</code></a>). Zvlášť při stisknutí tlačítka myši nad odkazem je <b>vysoká šance</b>, že uživatel dokončí kliknutí (neodjede myší pryč) a můžeme tak získat třeba <b>100 milisekund</b>, které běžné kliknutí trvá (stisknutí a uvolnění tlačítka). Tedy v době dokončení kliknutí už mít načteno.</p>


<h2 id="hotova-reseni">Jiná hotová řešení</h2>

<ul>
  <li><a href="http://instantclick.io/preloading">InstantClick</a></li>
  
  <li><a href="https://github.com/rails/turbolinks">Turbolinks</a></li>
  
  <li><a href="https://github.com/ftlabs/fastclick">FastClick</a> – sníží zdržení po kliknutí na mobilních zařízeních</li>
</ul>