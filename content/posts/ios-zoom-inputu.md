---
title: "Automatické zoomování inputů na iOS"
headline: "Automatické zoomování inputů na iOS"
description: "Jak se vypořádat s automatickým přibližováním stránky u formulářových prvků na iPhonech."
date: "2016-04-19"
last_modification: "2016-05-30"
status: 1
tags: ["css", "responsive", "webove-prohlizece"]
format: "html"
---

<p>I v případě responsivní stránky s řádně nastavenou <a href="/meta-viewport"><code>&lt;meta name="viewport"></code></a> značkou může nastat nepříjemná situace.</p>



<pre><code>&lt;meta name="viewport" content="width=device-width,initial-scale=1"></code></pre>



<p>Na iOS v iPhone se po označení políčka <code>&lt;input></code>, <code>&lt;textarea></code> nebo <code>&lt;select></code> celá stránka přiblíží.</p>

<p><img src="/files/ios-zoom-inputu/auto-zoom.gif" alt="Automatické zoomování" class="border"></p>














<p><b>Důvod?</b> Formulářová políčka mají výchozí <a href="/font#size">velikost textu</a> menší než běžný text. Výchozí velikost textu bývá 16 px, ale formulářových políček jen <b>13 px</b>.</p>

<p>Na iPhone jsou všechna políčka s textem pod 16 px zvětšována.</p>




<h2 id="velikost">Velikost na 16 px</h2>


<p>Možné řešení, které ale ovlivní zobrazování stránky, je nastavit velikost prvků alespoň na 16 px. Není nutné používat přímo jednotky <code>px</code>. Jde použít klidně procenta nebo <code>em</code>, pokud výsledek bude 16 pixelů a víc.</p>

<p>Docela elegantní je klíčové slovo <code>initial</code>. Následující kód by měl problém vyřešit:</p>

<pre><code>input, 
textarea,
select {
  font-size: initial;
}</code></pre>









<h3 id="problemy">Možné problémy</h3>

<p>Asi největší nevýhoda je, že oprava nechtěného zoomování <b>změní vzhled</b>.</p>

<p>Mají-li formulářové prvky počítány odsazení nebo rámečky v jednotkách <code>em</code>, změna velikosti písma ovlivní i odsazení. To může být dobře i špatně.</p>






<h2 id="zakazat">Zákaz zoomování</h2>


<p>Nejsnazší řešení je zkrátka zakázat možnost manipulovat s velikostí stránky.</p>


<p>Jde toho docílit <code>&lt;meta></code> tagem <code>viewport</code>:</p>

<pre><code>&lt;meta name="viewport" 
  content="width=device-width, initial-scale=1.0, <b>maximum-scale=1.0, user-scalable=0</b>"
></code></pre>









<p>Má to ale dost velký problém. <b>Zákaz zoomování</b> je jeden ze způsobů, jak zničit mobilní uživatele.</p>

<p>Existují případy, kdy návštěvník ocení, že mu půjde stránka zvětšit.</p>

<div class="external-content">
  <ul>
    <li>Jak zničit mobilní uživatele podruhé: <a href="http://www.vzhurudolu.cz/blog/48-znicit-mobilistu-2#10-zakazte-jim-zoomovani">Zakažte jim zoomování</a></li>
  </ul>
</div>

<h2 id="js">Dočasný zákaz zoomu</h2>

<p>Asi jediná možnost, jak zoomování zabránit bez zvětšování písma je dočasně zakázat zoom.</p>

<p>Když se zoomování stránky zakáže značkou <i lang="en">viewport</i> při události <a href="/udalosti-mysi#ontouchstart"><code>ontouchend</code></a> u formulářového pole, podaří se zazoomování zabránit.</p>

<p>K úvaze je, kdy opět vrátit původní viewport a umožnit tak opět zoomování.</p>

<p>Tato událost nemůže nastat těsně po <i>zablokování</i> (automatický zoom by se stejně projevil), takže se nabízí nejspíš:</p>

<ol>
  <li>
    <p>Událost <code>onblur</code> (opuštění políčka).</p>
  </li>
  <li>
    <p>Použít <a href="/odpocitavani#js">časovač</a> <code>setTimeout</code>, který pár stovek <a href="/ms">milisekund</a> po konci dotyku vrátí původní viewport.</p>
  </li>
</ol>

<p>U <code>onblur</code>u je problém, že právě vyplňování políčka může být důvod k přiblížení – uživatel se například potřebuje přesně trefit mezi určitá písmena.</p>

<p>Jako relativně funkční doba časovače se zdá 500 ms:</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/jzwb">Živá ukázka</a> – zabránění automatickému zoomu políčka</li>
  </ul>
</div>

<p>Bohužel na základě testů se toto zakazování na skutečných zařízeních <b>chová dost nepředvídatelně</b> a není 100%.</p>


<h2 id="zaver">Závěr</h2>

<p>Ostatní zařízení tuto přibližovací <i>vlastnost</i> nemají.</p>

<p>Přestože je automatické zoomování na iOS možné JavaScriptem blokovat (byť nespolehlivě), jistější postup je jako obvykle použít CSS a při návrhu webu počítat s tím, že formulářové prvky budou alespoň 16 pixelů velké.</p>

<p>Zákaz zoomu je potom asi nejhorší možné řešení.</p>