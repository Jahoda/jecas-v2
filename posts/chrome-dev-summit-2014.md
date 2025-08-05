---
title: "Chrome Dev Summit 2014"
headline: "Chrome Dev Summit 2014"
description: "Výběr zajímavostí z Chrome Dev Summit."
date: "2014-11-19"
last_modification: "2014-11-20"
status: 1
tags: ["google", "konference", "webove-prohlizece"]
format: "html"
---

<p><a href="https://developer.chrome.com/devsummit/">Chrome Dev Summit</a> je možné <b>sledovat online</b>. Záznam celého prvního dne je <a href="https://www.youtube.com/watch?v=0b9ZE1V4uRk">tady</a>.</p>


<h2 id="mobile-friendly">Indikace mobile-friendly</h2>

<p>Stránky ve výsledcích vyhledávání jsou označeny popiskem „Mobile-friendly“, jestliže stránka splňuje některé požadavky responsivních webů.</p>

<p>Více v samostatném článku <a href="/google-mobile-friendly">Google označí stránky vhodné pro mobil</a>.</p>



<h2 id="plynuly-prechod">Plynulý přechod mezi dvěma stránkami</h2>

<p>Pro <a href="/plynuly-prechod">animovaný přechod</a> mezi dvěma stránkami je připravována funkce <b>Navigation Transitions</b>. Ta umožní určit elementy, které mají zůstat při přechodu mezi stránkami. Poslouží k tomu <code>&lt;meta></code> značka:</p>

<pre><code>&lt;meta name="<b>transition-elements</b>" content="{CSS selektory}"></code></pre>

<p>Styly pro animaci při příchodu a odchodu ze stránky potom mají nové <code>rel</code> atributy.</p>


<h3 id="odchod">Odchod ze stránky</h3>

<pre><code>&lt;link rel="<b>transition-exiting-stylesheet</b>" href="fade_out.css"></code></pre>

<h3 id="prichod">Příchod na stránku</h3>

<pre><code>&lt;link rel="<b>transition-entering-stylesheet</b>" href="fade_in.css"></code></pre>



<div class="external-content">
  <ul>
    <li><a href="https://docs.google.com/document/d/17jg1RRL3RI969cLwbKBIcoGDsPwqaEdBxafGNYGwiY4/edit#heading=h.pcll678prpwu">Navigation Transitions specification</a></li>
  </ul>
</div>


<h2 id="prohlizec-animaci">Prohlížeč animací</h2>

<p>Do jádra <b>Blink</b> (používá <b>Chrome</b> a nová <b>Opera</b>) byl přidán prohlížeč CSS animací.</p>

<p>Každou animaci je možné zastavit/spustit uprostřed běhu. Jednotlivé fáze si ručně procházet a dokonce si zvýraznit ovlivněné elementy.</p>











<p><img src="/files/chrome-dev-summit-2014/prohlizeni-animaci.png" alt="" class="border"></p>



<div class="external-content">
  <ul>
    <li><a href="http://src.chromium.org/viewvc/blink?view=revision&revision=183847">Devtools Animations: Basic animation inspection &amp; control in Styles pane

</a></li>
  </ul>
</div>


<h2 id="material-design">Material design framework</h2>

<p><a href="http://www.google.com/design/spec/material-design/introduction.html" class="button">Web</a></p>












<p><img src="/files/chrome-dev-summit-2014/material.png" alt="Material design" class="border"></p>

<p>Připravená sada nástrojů pro snadné vytváření relativně dobře vypadajících responsivních webových aplikací. Obsahuje spoustu obsahu od ikon, barvev, tlačítek až po před-připravené layouty.</p>




<h2 id="prebarveni-listy">Přebarvení lišty v prohlížeči</h2>

<p>Speciálním <code>&lt;meta></code> tagem půjde v mobilní versi <b>Chrome</b> nastavit barva záhlaví prohlížeče, aby ladila se zbytkem stránky:</p>

<pre><code>&lt;meta name="theme-color" content="#0D6AB7"></code></pre>

<p>Optimální rozměry jsou 192 × 192 pixelů. Zobrazená ikona se vezme z:</p>

<pre><code>&lt;link rel="icon" sizes="192x192" href="highres.png"></code></pre>





<h2 id="plynulost-animaci">Plynulost animací</h2>

<p>Průběh animace lze rozdělit do 3 částí:</p>

<ol>
  <li>uživatel animaci vyvolá například kliknutím a <b>čeká na spuštění</b>,</li>
  
  <li>animace probíhá,</li>
  
  <li>uživatel si uvědomí, že <b>animace skončila</b>.</li>
</ol>













<p><img src="/files/chrome-dev-summit-2014/prubeh-animace.png" alt="Průběh animace" class="border"></p>

<p>Při vytváření animací jde využít toho, že plynulá animace (vysoké FPS) stačí pouze v kroku 2. Toho jde využít tak, že náročné operace (výpočty) proběhnou <b>před a po dokončení</b> pohybu.</p>

<p>Před animací je tedy dobré provést <a href="/vykreslovani#prekreslovani">překreslení stránky</a>. Například zjištěním hodnoty <code>offset*</code>, která překreslení spustí.</p>



<h2 id="imports">HTML imports</h2>

<p>HTML importy umožnují vkládat tzv. <i>widgety</i>. Řeší to problém, kdy je v jedné stránce připojeno několik různých hotových řešení, která se nepřehledně ladí a snadno si mohou přebíjet CSS vlastnosti.</p>

<p>Importy umí vytvořit pro vkládanou šablonu nová <i>scope</i>.</p>

<p>Více v samostatném článku <a href="/html-imports">HTML Imports</a> a o značce <a href="/template"><code>&lt;template></code></a>.</p>
