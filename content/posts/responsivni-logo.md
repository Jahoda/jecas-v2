---
title: "Responsivní logo"
headline: "Responsivní logo stránky"
description: "Jak vytvořit logo, které se bude přizpůsobovat velikosti stránky."
date: "2014-11-15"
last_modification: "2016-02-19"
status: 1
tags: ["css", "obrazky", "responsive"]
format: "html"
---

<p>Existují tři základní způsoby, <b>jak na stránku vložit logo</b>:</p>

<ol>
  <li>Jako obrázek značkou <code>&lt;img></code>.</li>  
  <li>Pomocí CSS pozadí (vlastnost <code>background</code>).</li>
  <li>Vytvořit logo fontem.</li>
</ol>



<h2 id="img">Obrázek <code>&lt;img></code></h2>

<p>Použít běžný obrázek je asi nejjednodušší. Zároveň je triviální řešení situace, kdy se obrázek nenačte – jde použít atribut <code>alt</code>.</p>

<pre><code>&lt;img src="logo.png" <b>alt="Název"</b>></code></pre>

<p>Nenačtený obrázek jde do jisté míry i stylovat:</p>

<div class="live">
  <style>
    .neexistujici {
      background: #DA3F94;
      font-size: 40px;
      color: #8ECCF0;
    }
  </style>
  <img class="neexistujici" width="250" height="50" src="/files/neexistujici-obrazek.png" alt="Neexistující">
</div>

<p><b>Výhoda</b> skutečného obrázku je kromě snadné realisace i v tom, že jde o <b>skutečný obrázek</b>, takže si ho:</p>

<ol>
  <li>všimnou <a href="/seo"><b>vyhledávače</b></a>,</li>
  <li>dokáží ho najít nástroje pro <b>sdílení na sociálních sítích</b>,</li>
  <li>nezmizí při <a href="/tisk"><b>tisku</b></a>,</li>
  <li>uživatelé si ho dokáží <b>snadno zkopírovat/uložit</b></li>
</ol>

<p>Většina z toho jde řešit i při jiném řešení, ale tady je to rovnou bez extra práce navíc.</p>

<p>Zásadní <b>nevýhoda</b> loga vloženého značkou <code>&lt;img></code> je ale v tom, že s ním <b>nejde nic moc dělat</b>. Při tvorbě <a href="/responsive">responsivního webu</a> se někdy může hodit vyměnit logo za jiné, které se lépe vejde do dostupného prostoru.</p>

<p>Teoreticky by šlo vložit <code>&lt;img></code> značek několik a pomocí pravidla <code>@media</code> mezi nimi přepínat, problém je ale v tom, že <b>není možné jednoduše zabránit stažení</b> obrázku zapsaného do <code>&lt;img></code>, i když je skrytý pomocí CSS.</p>

<p>Obrázky vložené značkou <code>&lt;img></code> se stahují vždy:</p>

<div class="internal-content">
  <ul>
    <li><a href="/zacatek-stahovani-obrazku">Kdy začne stahování <code>&lt;img></code> obrázku</a></li>
  </ul>
</div>


<h2 id="picture">Značka <code>&lt;picture></code></h2>

<p>HTML značka <code>&lt;picture></code> právě řeší problém <code>&lt;img></code> pro načítání různých obrázků v závislosti na šířce s využitím <a href="/html-media">atributu <code>media</code></a>:</p>


<pre><code>&lt;picture>
  &lt;<b>source</b> media="(min-width: 45em)" srcset="logo-velke.png">
  &lt;<b>source</b> media="(min-width: 32em)" srcset="logo-stredni.png">
  &lt;<i>img</i> src="logo.png" alt="Popis obrázku">
&lt;/picture></code></pre>






<p><a href="http://caniuse.com/#feat=picture">Podporují</a> ji prohlížeče <a href="/microsoft-edge"><b>MS Edge</b></a>, <b>Chrome 38+</b>, <b>Firefox 33+</b>, <b>Opera 25+</b>.</p>

<p>Nefunkčnost v <b>IE</b> nemusí tolik vadit, protože mobilní <b>IE</b>, kde je responsivní logo převážně potřeba (na desktopu tolik ne), nejsou tolik rozšířeny. Navíc se v nepodporovaných prohlížečích zobrazí obrázek v <code>&lt;img></code> a zbytek bude ignorován.</p>

<p>Podpora může chybět hlavně v <b>Safari 9.2</b> a starších na <b>iOS</b>.</p>



<h2 id="pozadi">CSS <code>background</code></h2>

<p>V současnosti s nejlepší podporou řeší responsivní logo <b>pozadí</b> – CSS vlastnost <code>background</code>.</p>

<p>Do HTML kódu se vloží prázdný element:</p>

<pre><code>&lt;div class="logo">&lt;/div></code></pre>



<p>Případně rovnou odkaz, protože <b>logo by mělo být klikací</b> (odkazovat na hlavní stranu).</p>

<pre><code>&lt;a class="logo" href="./">&lt;/a></code></pre>

<p>A logo se nastaví jako pozadí:</p>

<pre><code>.logo {
  display: inline-block;
  width: 250px;
  height: 50px;
  background: url(logo.png);
}</code></pre>










<h3 id="media">Media queries</h3>

<p>Přepnutí loga při <b>menší šířce</b> se zajistí díky <a href="/media">media queries</a>:</p>

<pre><code>@media (max-width: 45em) {
  .logo {
    background: url(logo-mensi.png);
  }
}
@media (max-width: 35em) {
  .logo {
    background: url(logo-nejmensi.png);
  }
}</code></pre>











<h3 id="sprite">CSS sprite</h3>

<p>Díky tomu, že je logo <b>nastavené jako pozadí</b>, jde navíc zakomponovat do <a href="/css-sprite">CSS spritu</a> pro snížení počtu stahovaných souborů.</p>


<h3 id="alternativni-text">Alternativní text</h3>

<p>Problém tohoto přístupu s <b>prázdným elementem</b> je v absenci <b>alternativního textového obsahu</b>.</p>

<p>To jde vyřešit různě:</p>

<ul>
  <li>Atributem <a href="/aria#label"><code>aria-label</code></a>.</li>  

  <li>Umístěním textu do loga a jeho následným skrytím.</li>  

  <li>Umístěním textu do loga a následným <b>překrytím</b> <a href="/position#absolute">absolutně</a> posicovaným obrázkem přes původní text, tzv. <a href="/obrazek-text#optimalni">image replacement</a>. To je asi nejlepší řešení, které obstojně funguje i při <b>nenačtení obrázků</b>.</li>
</ul>


<h2 id="text">Textové logo</h2>

<p>Vůbec nejpohodlnější pro následné vytváření responsivního loga je textovou část <i>nakreslit</i> v CSS.</p>

<p>Obyčejnému textu jde v CSS přidat řadu efektů, aby <b>vypadal atraktivně</b>:</p>

<div class="internal-content">
  <ul>
    <li>Text v obrázku: <a href="/obrazek-text#vzhled-textu">Vzhled textu v CSS</a></li>
  </ul>
</div>

<p>Tento postup jde použít ale jen v případě, že logo sestává z nějakého symbolu + textu napsaného běžným fontem.</p>

<p>Realisovat logo pomocí <a href="/font-ikony">font ikony</a> a načítat kvůli němu zvláštní font přes <a href="/font-face"><code>@font-face</code></a> by ale už možná bylo zbytečné.</p>

<p>Textové logo má navíc další výhodu v tom, že z něj jde snadno kopírovat text – například <b>název webu</b>.</p>



<h2 id="svg">SVG</h2>

<p>Pro většinu log se hodí použít <a href="/svg">vektorový formát SVG</a>. Ten zajišťuje perfektní ostrost loga nezávisle na jeho rozměrech a často i nízkou datovou náročnost.</p>

<p>V závislosti na způsobu <a href="/svg#vlozeni">vložení</a> může jít SVG logo i snadno přebarvovat (stejně jako textové logo).</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>9elements: <a href="https://medium.com/9elements/building-a-responsive-image-e4c6229fa1f6">Building a responsive image</a> – responsivní SVG logo</li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/rethinking-icon-logo-design-responsive-web/">Rethinking Icon and Logo Design for the Responsive Web</a></li>
  
  <li><a href="http://viget.com/inspire/responsive-logos-part-1-tips-for-adapting-logos-for-small-screens">Responsive Logos, Part 1: Tips for Adapting Logos for Small Screens</a></li>
</ul>