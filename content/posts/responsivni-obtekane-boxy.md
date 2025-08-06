---
title: "Obtékané boxy s proměnlivou šířkou"
headline: "Obtékané boxy s proměnlivou šířkou"
description: "Jak udělat, aby se obtékané boxy přizpůsobovaly proměnlivé velikosti okna."
date: "2014-01-21"
last_modification: "2016-01-27"
status: 1
tags: ["css", "hotova-reseni", "responsive"]
format: "html"
---

<p>Při tvorbě responsivního webu, kdy se <a href="/sirka-stranky">šířka stránky</a> odvozuje od velikosti okna, je vhodné jednotlivým boxům nastavit rozměry v procentech. Díky tomu se optimálně využije dostupná šířka.</p>


<p>Pomocí <a href="/mobilni-web#media-queries">pravidel <code>@media</code></a> se potom zvyšováním procentuální šířky při menší dostupné šířce okna docílí postupného snižování počtu sloupců:</p>


<p><img src="/files/responsivni-obtekane-boxy/roztazeni.gif" alt="Přeskládání boxů při změně velikosti okna" class="border"></p>











<h2 id="reseni">Řešení</h2>

<h3 id="pet">5 sloupců</h3>

<p>Při maximální šířce budou na stránce 5 sloupců (100 % / 5 = 20 %):</p>

<pre><code>.box {
  float: left;
  width: 20%;
}</code></pre>







<h3 id="ctyri">4 sloupce</h3>

<p>Při zmenšení šířky se sníží počet sloupců na čtyři o šířce 25 procent (100 % / 4 = 25 %):</p>

<pre><code>@media screen and (max-width: <b>50em</b>) {
  .box {width: 25%}
}</code></pre>




<p>Šířka <code>@media</code> pravidla se zadává v jednotkách <code>em</code>, aby se případně dobře <b>přizpůsobovala velikosti písma</b>, kterou si návštěvník nastavil v operačním systému nebo prohlížeči.</p>

<p>Při použití pixelů by při zvětšením/zmenšení písma hodnoty neodpovídaly:</p>

<div class="internal-content">
  <ul>
    <li>Responsivní design webu: <a href="/responsivni-web#px">Rozměry media queries v pixelech</a></li>
  </ul>
</div>



<h3 id="tri">3 sloupce</h3>

<p>Při nastavování šířky pro 3 sloupce začne být menší problém dopočítat výslednou hodnotu, protože 100 % nejde třemi dělit beze zbytku.</p>

<p>Nejpřesnější možné hodnoty pro takové dělení jde nejspíš dosáhnout CSS funkcí <a href="/calc"><code>calc</code></a> funkční od <b>IE 9</b>:</p>

<pre><code>.box {
  width: calc(100% / 3);
}</code></pre>





<p>Pro starší prohlížeče založené na <b>Webkitu</b> potom ještě s <a href="/css-prefixy">prefixem <code>-webkit-</code></a>:</p>

<pre><code>.box {
  width: calc(100% / 3);
  width: <b>-webkit-</b>calc(100% / 3);
}
</code></pre>



<p>Jako záložní pro prohlížeče nepodporující <code>calc</code> jde navíc uvést hodnotu spočítanou na kalkulačce.</p>

<pre><code>.box {
  width: <b>33.3333333%</b>;
  width: calc(100% / 3);
  width: <b>-webkit-</b>calc(100% / 3);
}
</code></pre>




<p>Potom si člověk výsledek zobrazí v <b>IE</b> / <a href="/microsoft-edge"><b>MS Edge</b></a> a zjistí, že se při určitých šířkách mřížka špatně zobrazuje:</p>

<p><img src="/files/responsivni-obtekane-boxy/calc-ie.png" alt="Špatné zaokrouhlování v IE/Edge" class="border"></p>





<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/seqb-">Chyba zaokrouhlování procent u <code>calc</code> v IE/Edge</a></li>
  </ul>
</div>

<p>Zbavit se tohoto problému jde třeba odečtením setiny pixelu ve funkci <code>calc</code>. Výsledný kód dobře funkční i v <b>IE</b>:</p>


<pre><code>@media screen and (max-width: 40em) {
  .box {
    width: 33.3333333%; 
    width: calc(100% / 3 - 0.01px);
    width: -webkit-calc(100% / 3 <b>- 0.01px</b>);     
  }
}</code></pre>







<h3 id="dva-jeden">2 a 1 sloupec</h3>

<p>Pro jeden a dva sloupce je už nastavení šířky snadné:</p>

<pre><code>@media screen and (max-width: 30em) {
  .box {width: 50%}
}
@media screen and (max-width: 20em) {
  .box {width: 100%}
}</code></pre>


<div class="external-content">
  <ul>
    <li><p><a href="https://kod.djpw.cz/djqb-">Živá ukázka výsledku</a> – proměnlivý počet obtékaných boxů s šířkou v procentech</p></li>
  </ul>
</div>






<h2 id="vyska">Stejná výška</h2>

<p>Aby přeskládávání obtékaných boxů dobře fungovalo, je vhodné, když všechny boxy mají <b>stejnou výšku</b>.</p>

<p>Nastavovat obsahu pevnou výšku vlastností <a href="/height"><code>height</code></a> zpravidla nevěstí nic dobrého, protože při zvětšení písma nebo různě dlouhém obsahu mohou nastat problémy.</p>



<p>Přebytečný text jde třeba <a href="/oriznuti-radek">oříznout</a> po určitém počtu řádků.</p>

<p>Jsou-li v obtékaných boxech <a href="/obrazky">obrázky</a>, hodí se použít trik s dopočítáváním výšky podle šířky, aby při načítání stránka neposkakovala:</p>

<div class="internal-content">
  <ul>
    <li><a href="/rozmery-responsivniho-obrazku">Nastavení výšky responsivního obrázku</a></li>
  </ul>
</div>



<h3 id="ruzna">Různá výška</h3>

<p>Pan <a href="http://1-webdesign.cz/"><b>habendorf</b></a> doplnil řešení, co dělat v případě, kdy je nutné, aby boxy měly proměnlivou výšku.</p>

<p>Je k tomu potřeba použít na konci řádku CSS vlastnost <a href="/float#clear"><code>clear</code></a>. Problém je, že při různém počtu boxů na řádek není jasné, kde je konec řádku.</p>

<p>Takže se mezi jednotlivé boxy nastrkají elementy pro clearování, které se potom v příslušných <code>@media</code> pravidlech skryjí/zobrazí, když je to potřeba.</p>

<blockquote>
  <p>Jeden sloupec neřeším – tam netřeba floatovat. Za každej druhej blok vrazim něco (<code>br</code>, <code>hr</code>) <code>.cleaner .cleaner_2col</code>, za třetí <code>.cleaner .cleaner_3col</code> a za čtvrtej <code>.cleaner .cleaner_4col.</code></p>
  <p><code>.cleaner</code> si nadefinuju a ty <code>.cleaner_xcol</code> už jen <code>display: none</code> dle potřeby.</p>
</blockquote>






<p>V novějších prohlížečích si jde poradit bez změny HTML kódu pomocí pseudo-elementu <a href="/css-selektory#before-after"><code>:before</code>/<code>:after</code></a> (<b>IE8+</b>) a selektorů <a href="/css-selektory#n-ty-potomek"><code>:nth-child</code></a> (<b>IE9+</b>).</p>




<h2 id="justify">Zarovnání do bloku</h2>

<p>V případě položek, které mají mít fixní rozměry, je možné použít zarovnání do bloku:</p>

<pre><code>.obal {
  text-align: justify;
}
.polozka {
  display: inline-block;
  width: 100px;
}</code></pre>









<p>To zajistí vytvoření rozestupů mezi položkami, aby vyplnily celou šířku. Bohužel to neřeší poslední řádek, který se v případě, že na něj zbude méně položek, zobrazí odlišně.</p>

<p><a href="https://kod.djpw.cz/uasb">Živá ukázka</a> – zarovnání do bloku</p>





<h2 id="flex">Flexboxy?</h2>

<p>Dosáhnout podobného výsledku jde kromě obtékání i s <a href="/flexbox">flexboxy</a>.</p>


<p>Při nastavení <code>flex-wrap: wrap</code> pro obal jednotlivých boxů a <code>flex-grow: 1</code> spolu s pevnou šířkou (nikoliv v procentech) pro jednotlivé položky se dosáhne automatického  přizpůsobování položek dostupnému prostoru bez nutnosti nastavovat různou šířku v <code>@media</code> pravidlech.</p>

<p>Bude ale stejně potřeba řešit situaci, kdy na posledním řádku zbude počet boxů neodpovídající počtu sloupců.</p>

<p><a href="https://kod.djpw.cz/uytb">Živá ukázka</a></p>



<div class="external-content">
  <ul>
    <li>CSS Tricks: <a href="https://css-tricks.com/designing-a-product-page-layout-with-flexbox/">Designing A Product Page Layout with Flexbox</a></li>
  </ul>
</div>