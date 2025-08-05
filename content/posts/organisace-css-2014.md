---
title: "Jak organisuji CSS v roce 2014"
headline: "Jak organisuji CSS v roce 2014"
description: "Jak píšu a organisuji CSS v roce 2014."
date: "2014-11-25"
last_modification: "2014-11-25"
status: 0
tags: []
format: "html"
---

<p>Reakce na článek <b>Martina Michálka</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.vzhurudolu.cz/blog/29-organizace-css-2014">Organizace CSS, verze 2014</a></li>
  </ul>
</div>

<p>TLDR: Možná to někoho překvapí, ale v podstatě nijak.</p>

<p>Proč?</p>


<h2 id="soubory">Organisace souborů</h2>

<p>V první řadě je třeba si zopdpovědět otázku, proč vlastně kasakádové styly <b>členit</b> do podadresářů a více souborů.</p>

<p>V zásadě jediné důvody, proč se vyplatí mít styly rozdělené, je u většího projektu:</p>

<ol>
  <li><b>práce ve více lidech</b>,</li>
  <li><b>přehlednost ve versovacím systému</b></li>
</ol>

<p>Je určitě příjemnější, když se v <i>commitu</i> ukáže, že se změnil soubor <code>tlacitka.css</code> místo <code>styl.css</code>. Stejně tak neustále řešit <i>mergeování</i> v <code>styl.css</code> při práci ve více lidech není žádný med.</p>

<p>Pokud tedy na něčem pracuji sám nebo CSS neversuji používám klidně jediný soubor. S přehledností není problém, protože stejně člověk hledá potřebné části CSS podle selektorů ve veškerém CSS, ne na základě souborů.</p>

<p>I když styly dělím do více souborů, <b>složkám</b> se vyhýbám úplně, protože způsobují problémy s <b>relativními cestami</b>. Více souborů se používá pouze pro <b>vývoj</b> a ve finále se ze všech souborů udělá jeden <a href="/slouceni-js-css">zmačkaný soubor</a> (v <b>Nette</b> používám <a href="http://addons.nette.org/janmarek/webloader">WebLoader</a>).</p>

<p>Ve vývojovém režimu se používají soubory z:</p>

<pre><code>/css/styl.css
/css/menu.css
/css/tlacitka.css</code></pre>

<p>V ostrém provozu potom:</p>

<pre><code>/cache/spojeny.css</code></pre>

<p>V případě, že by spojený CSS soubor byl hodně velký, jeho „kritickou část“ vkládám přímo do hlavičky HTML stránky, do značky <code>&lt;style></code>, aby čekání na CSS soubor <b>nezdržovalo načítání</b>.</p>

<p>Relativní adresy na obrázky do složky <code>/obrazky/</code> bezproblémů fungují (<code>../obrazky/obrazek.jpg</code>). Aby správně fungovaly i se zanořenými složkami, musely by se adresy převádět.</p>

<p>Možná to umí řešit <b>CSS preprocesory</b>…</p>















<h2 id="preprocesory">CSS preprocesory</h2>

<p>… ty ale nepoužívám. Proč? Mají přece spoustu výhod.</p>


<h3 id="promenne">Proměnné</h3>

<p>Dá se bez nich obejít. V <a href="/sublime-text">Sublime Text</a> není problém snadno označit stejné hodnoty a najednou je přepsat.</p>

<p>Jindy si jde vystačit s čistým CSS. Pokud budu chtít nadpisy, odkazy a tlačítka napsané super písmem, použiji:</p>

<pre><code>h1, a, button {
  font-family: Super písmo;
}</code></pre>






<h3 id="nesting">Nesting</h3>

<p>Nesting je vlastnost, která umožňuje do sebe zanořovat jednotlivé deklarace.</p>

<pre><code>.polozky {
  color: blue;

  .polozka {
    color: red;
  }
}</code></pre>

<p>Výsledek bude:</p>

<pre><code>.polozky {color: blue}
.polozky .polozka {color: red}</code></pre>

<p>Opět to není funkce, bez které by se nedalo žít, navíc to není úplně dobrý postup. Samoúčelně <b>posilovat selektory</b> (<code>.polozky .polozka</code>) není dobré.</p>













<h3 id="skladani">Skládání souborů</h3>

<p>Řeším vlastním PHP skriptem / rozšířením v Nette.</p>



<h3 id="mixiny">Mixiny</h3>

<p>Používají se k vytvoření jakési funkce, které se předají argumenty a ona vrátí blok kódu. Ukázkový příklad je pro používání CSS vlastností potřebujících <a href="/css-prefixy">prefixy</a>.</p>

<p>Stačí napsat něco jako <code>border-radius(10px)</code> a vygeneruje se:</p>

<pre><code>-webkit-border-radius: 10px;
-moz-border-radius: 10px;
-ms-border-radius: 10px;
border-radius: 10px;</code></pre>

<p>To je hezké, ale podobně poslouží snippety v Sublime Text a upravovat <b>více hodnot najednou</b> není podobně jako u náhrady proměnných problém ani tady.</p>









<h3 id="extend">Rozšíření/dědičnost</h3>

<p>Pomocí něčeho jako <code>@extend</code> je možné do pravidel jednoho selektoru zakomponovat pravidla jiného.</p>

<pre><code>.prvni {color: red}
.druhy {
  @extend .prvni;
  font-weight: bold;
}</code></pre>

<p>Z toho vznikne:</p>

<pre><code>.prvni, .druhy {color: red}
.druhy {
  font-weight: bold;
}</code></pre>

<p>Zde mi není moc jasné, jakou to má přinášet výhodu, když zápis využívající <code>@extend</code> je delší.</p>









<h3 id="operace">Matematické operace</h3>

<p>To je docela hezká vlastnost (od <b>IE 9</b> funguje přímo v CSS vlastnost <a href="/calc"><code>calc</code></a>).</p>

<p>Hodně by se hodila tak před 10 lety, když se dělaly weby s <b>pevným layoutem v pixelech</b> a nešlo napříč prohlížeči používat okrajový box model ve standardním režimu.</p>

<p>Ale <a href="/responsivni-web#kalkulacka">převod pixelů na em</a> při určování break-pointů by se hodil i dnes.</p>






<h3 id="funkce">Funkce</h3>

<p>Asi nejhezčí věci, co preprocesory nabízí, jsou <b>funkce pro úpravy barev</b>.</p>


<p>Použitím jednoduché funkce jde barvy <b>zesvětlit, ztmavit, invertovat</b> a podobně. Dá se tím dosáhnout stavu, kdy se pro web nadefinuje jedna nebo dvě hlavní barvy a zbytek odstínů se od toho <b>odvodí</b>.</p>

<p>V Sublime Text si jde sice pohodlně <b>upravovat barvy</b> prostřednictvím <a href="/pluginy-sublime-text#pluginy">palety</a>, ale dosáhnout výše uvedeného je prakticky nemožné.</p>



<h3 id="cykly">Cykly</h3>

<p>S některými preprocesory je možné generovat kód pomocí <b>cyklů</b>.</p>

<ul>
  <li><a href="http://philipwalton.com/articles/side-effects-in-css/">Side Effects in CSS</a></li>
  
  <li><a href="http://csswizardry.com/2015/03/can-css-be-too-modular/">Can CSS Be Too Modular?</a></li>
  
  <li><a href="https://github.com/sezgi/CSS-Best-Practices">CSS Best Practices</a></li>
</ul>