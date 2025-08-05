---
title: "Zarovnání checkboxů a radiobuttonů"
headline: "Zarovnání checkboxů a radiobuttonů"
description: "Jak perfektně zarovnat popisek s checkboxem a radio přepínačem."
date: "2016-11-29"
last_modification: "2016-11-29"
status: 0
tags: []
format: "html"
---

<p>Ovládací prvky typu <a href="/input#type-checkbox"><code>checkbox</code></a> <span class="live"><input type="checkbox"></span> nebo <a href="/input#type-radio"><code>radio</code></a> <span class="live"><input type="radio"></span> jsou běžnou součástí webových formulářů. Hezky je zarovnat s popisky je ale docela oříšek.</p>




<h2 id="vychozi">Výchozí styly</h2>

<p>Jeden z možných a relativně úspěšných postupů je do stylů těchto <code>&lt;input></code>ů nezasahovat.</p>

<p>Výchozí styly prohlížečů zajišťují relativně zarovnané zobrazení – pokud se jedná o výchozí velikost písma (typicky 16 pixelů).</p>

<p>U většího/menšího písma ale zarovnání nesedí:</p>

<p><img src="/files/centrovani-checkbox-radio/velikost-pisma.png" alt="Různé velikosti písma" class="border"></p>


















<h3 id="jake">Jaké jsou výchozí styly?</h3>

<p>Zarovnání je zajištěno vlastností <a href="/margin"><code>margin</code></a>:</p>

<pre><code>input[type="checkbox" i] {
    margin: 3px 3px 3px 4px;
}</code></pre>







<p>Použití <code>margin</code>u v kombinaci s hodnotami v pixelech naznačují, že při změně velikosti písma přestane fungovat.</p>




<h3 id="centrovani-vychoziho">Centrování výchozího</h3>

<p>Vycentrovat svisle výchozí radio/checkbox není úplně snadné. Nejspolehlivější je vertikální centrování pomocí absolutního posicování.</p>

<p>Druhá možnost je vytvořit předpis pro několik základních velikostí písma a přesného zarovnání docílit <a href="/position#relative">relativním posicováním</a>.</p>




<h2 id="vlastni">Vlastní checkbox/radio</h2>

<p>Stoprocentní řešení je nepoužívat systémové prvky a checkboxy/radia si vytvořit kompletně vlastní.</p>


<ul>
  <li><a href="http://kod.djpw.cz/aedc">Živá ukázka</a> – různé velikosti </li>
  <li><a href="http://kod.djpw.cz/cedc">Živá ukázka</a></li>
</ul>