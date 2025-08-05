---
title: "CSS sprite"
headline: "CSS sprite"
description: "Spojení všech obrázků do jednoho (CSS sprite) zrychlí načítání webu. Hotový generátor v PHP."
date: "2013-11-22"
last_modification: "2013-12-10"
status: 1
tags: ["css", "hotova-reseni", "php"]
format: "html"
---

<p>Tzv. <b>CSS sprite</b> je technika pro <b>zrychlení webu</b>, kdy se (pokud možno) všechny obrázky na stránce vloží do <b>jednoho společného obrázku</b>. Úspora je v snížení <b>HTTP požadavků</b>, které zvlášť u připojení s dlouhou odezvou výrazně <b>zpomalují načítání</b>.</p>

<p>Je pomalejší načíst <b>X malých obrázků</b> než <b>jeden velký</b> (sprite).</p>

<h2 id="data-url">Data URL (<code>data:image/gif;base64,…</code>)</h2>
<p>Jiná možnost, jak ušetřit HTTP požadavky, je vkládat obrázky přes <a href="/data-uri">pseudo-protokol <code>data:*</code></a>.</p>

<p>Obrázek může zakódovat <a href="http://dopiaza.org/tools/datauri/index.php">online generátor</a> nebo pár řádků PHP s využitím funkce <code>base64_encode</code>:</p>

<pre><code>&lt;?php 
$obrazek = file_get_contents("logo.png");
echo "&lt;img src='data:image/png;base64," . 
      base64_encode($obrazek) . 
      "'>";</code></pre>

<div class="live">
  <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAAAjBAMAAABMRATBAAAAA3NCSVQICAjb4U/gAAAAMFBMVEX///////////////////////////////////////////////////////////////9Or7hAAAAAEHRSTlMAESIzRFVmd4iZqrvM3e7/dpUBFQAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNi8yNi8xM6K0vh0AAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAAAdZJREFUeJxjYBgFAwNY30+af5U4pSLOOKWk/v8QIM6Q/f8diFNIjCEsHh1A0IpkIpNrR0eLC0ygSwEmrhIBVBjigmkIY81/CPgAE2fMgopAuMz/N0AYbOuh4gUYhsj8/9teDgJwqbr//7aDRSBcrv8/weHDfP//LbBwuQGGIfP/T0D1Jef/fwnIfL/f/xtANO//n5hBAjXkPXrw1v+/iMxlvL9x/XMQgx/hYQxD/qMbcv9/ADKX/b+BFDgU8LkE3RBmWIBCgd4vBsb9TxnAYXJDgUhDWP7/ReHPB3pO5h9Ijfj7/3+acRkCBQ9ghvxGMfM90CtM58AWsc77//9mAHZDTu8GgwVYDeH5A4pfZWgmiLj//98UoryDYkj+FxRZ5t7//68QYwhywDK+34DqfAbL/5Bkg9cQoIACgsPxT4EBDcT//0zYkPn/FyA4dj/QzQAmOmQfQgw5/z8BVZHM/1+IsmT/RQZ0UP//IYYh8f9fOKEoYtz//2UKkDYBZnlW5NTrAsp4JjWoWQtiCMt+9KKAFSbiwMD2C6GcBSr6bxKSGUzv/4PzNFM6SjoBucV9NkigXICBCcmRTOWrQaLtDgih6N3n/2MGGokg+vzp5QqUGjIKhjUAADNkFiqIw6ikAAAAAElFTkSuQmCC'>
</div>

<p><b>Nevýhoda</b> tohoto řešení je, že:</p>

<ul>
  <li>není funkční v <b>IE 7</b> (v <b>IE 8</b> je limit 32 kB),</li>
  <li>takto vložený obsah se <b>nebude kešovat</b>.</li>
</ul>

<p>Nyní zpět k CSS spritům…</p>

<h2 id="jak-funguje">Jak to funguje?</h2>
<ol>
  <li>Všechny typově stejné obrázky (GIF, PNG, JPG) se spojí do jednoho.</li>
  <li>V <b>CSS</b> se vytvoří element s nastavenými rozměry dle obrázku a výřezem ze <i>spritu</i>. Zobrazení správného obrázku zajistí <code>background-position</code>.</li>
  <li>Do <b>HTML kódu</b> se vloží místo značky <code>&lt;img></code> nějaký <code>&lt;span></code>/<code>&lt;div></code> (v CSS frameworcích je často k vidění i značka <code>&lt;i></code>) s přiřazeným <i>výřezem</i> velkého obrázku.</li>
</ol>

<p>Případně se části obrázků mohou nastavovat přímo jako pozadí elementů, ale vyžaduje to promyšlenější spojení jednotlivých obrázků.</p>

<div class="side">
  <p>Příklad CSS sprite z <b>YouTube</b> a <b>Facebooku</b>:</p>
  
  <p>
    <img src="/files/css-sprite/yt-sprite.png" alt="CSS sprite na YouTube" class="border left">
    <img src="/files/css-sprite/fb-sprite.png" alt="CSS sprite na Facebooku" class="border">
  </p>
</div>  

<h3>Posice obrázku</h3>
<p>Obrázky na pozadí jsou nadefinovány v kaskádových stylech. Ideálně jednou společnou třídou pro všechny CSS obrázky. Konkrétní třída potom nastaví jen <code>background-position</code>.</p>

<h4>CSS</h4>

<pre><code>.obrazek {
  background: url(css-sprite.png); 
  width: 16px; 
  height: 16px; 
  display: block;
}
.logo {
  background-position: 0 0;
}</code></pre>

<h4>HTML kód</h4>
<pre><code>&lt;span class='obrazek logo'>&lt;/span></code></pre>

<h3 id="opakovani">Opakování obrázku</h3>
<p>Vytvoření CSS spritu se trochu komplikuje, když se má nějaký obrázek na stránce <b>opakovat</b>.</p>

<ul>
  <li>Má-li se obrázek opakovat vodorovně (<code>repeat-x</code>) musí být přes celou <b>šířku</b> CSS spritu.</li>
  <li>V případě opakování svisle (<code>repeat-y</code>) naopak musí být opakující se obrázek přes <b>celou výšku</b>.</li>
</ul>

<h2 id="prikad">Příklad</h2>
<p>Následující spirte je z <a href="http://diskuse.jakpsatweb.cz">diskuse</a>.</p>

<p>Při zjišťování souřadnic pro <code>background-position</code> si je třeba uvědomit, že posice <b>[0, 0]</b> je na obrázku vlevo nahoře. Pro další obrázky je proto nutné zadávat <b>záporné hodnoty</b>.</p>

<pre><code>.ikona {
  background-position: <i>-</i><b>počet px zleva</b> <i>-</i><b>počet px shora</b>
}</code></pre>

<p>Hodnoty můžou být i <b>kladné</b>, ale musí se použít <i>složitý</i> výpočet (odečíst posici od šířky/výšky spritu):</p>

<pre><code>.ikona {
  background-position: šířka<i>-</i><b>počet px zleva</b> výška<i>-</i><b>počet px shora</b>
}</code></pre>

<p>Nevýhoda kladných hodnot v <code>background-position</code> spočívá v závislosti na rozměru sloučeného obrázku. Když se ten změní (přidá se do něj další obrázek), bude se posice <b>muset přepočítat</b>. Záporné hodnoty tímto netrpí.</p>

<p><a href="#"><img style="cursor: crosshair" src="/files/css-sprite/djpw-sprite.png" alt="CSS sprite z diskuse JPW" class="border" ismap></a></p>

<div class="live">
  <style>
    .ico {width: 16px; height: 16px; display: inline-block; background: url(/files/css-sprite/djpw-sprite.png)} /* Rozměry spritu: 389 × 150 px */
    .empty {background-position: -17px -73px}
    .sticky {background-position: 321px 77px} /* alternativně: -68px -73px */ 
  </style>
  <p>Některé <i>hotové</i> ikony: <span class="ico sticky"></span>
    <span class="ico empty"></span>
  </p>
</div>

<h3 id="hover">Efekt po najetí</h3>
<p>U <code>:hover</code> efektů (po najetí myši) nabízí posunutí pozadí CSS spritu výhodu, že se <b>nemusí stahovat další obrázek</b> a nehrozí tak případná prodleva, než se tak stane.</p>

<h2 id="automaticke-vytvoreni">Automatický CSS sprite</h2>
<p>Vytvořit a udržovat obrázky v CSS sprite je přece jenom o něco složitější, než je klasický postup samostatných obrázků.</p>

<p>V případě <b>ručního vytváření</b> je vhodné separátní obrázky seskupit do spritu až <b>při dokončování stránky</b>. Nebo vytváření CSS spritů <b>zautomatisovat</b>…</p>

<h3 id="online-generator">Online generátor CSS spritů</h3>
<p>První možnost je využít nějakou online službu, kam se nahrají obrázky, a ta automaticky připraví potřebný CSS sprite, CSS definice a HTML kódy pro jednotlivé obrázky.</p>

<p><a href="http://draeton.github.io/stitches/" class="button">Sprite sheet generator Stitches</a></p>

<h3 id="bookmarklet">SpriteMe bookmarklet</h3>
<p>Web <a href="http://spriteme.org/">SpriteMe</a> umí projít už existující web a navrhnout, co by šlo předělat do spritů. A vytvoří potřebné obrázky i CSS definice.</p>

<h3 id="compass">Compass</h3>
<p>CSS rozšíření Compass umožňuje mj. i <a href="http://compass-style.org/help/tutorials/spriting/">automatickou tvrobu CSS spritů</a>.</p>

<h3 id="page-speed-module">PageSpeed Module (<code>mod_pagespeed</code>)</h3>
<p>Rozšíření webového serveru Apache, které se snaží <b>zrychlit stránky</b>. Jedna část se přímo zabývá <a href="https://developers.google.com/speed/pagespeed/module/filter-image-sprite">automatickým vytvářením CSS spritů</a> z <b>PNG a GIF</b> obrázků.</p>

<p>Bohužel mi není známo, že by tento modul nějaký český hosting podporoval.</p>

<p><a href="https://developers.google.com/speed/pagespeed/module" class="button">PageSpeed Module</a></p>

<h2 id="php">Generování spritů v PHP</h2>
<p>Při vytváření webů v PHP by se hodilo i generování CSS spritů přímo v PHP.</p>

<h3 id="php-generator">Je čas CSS sprite generátor</h3>
<p>Napsal jsem jednoduchý generátor CSS spritů v PHP, který je možné <b>stáhnout</b>:</p>
<p><a href="/files/css-sprite/php-generator.rar" class="button">Download</a></p>

<p>Skript potřebné HTML, CSS a spojený obrázek automaticky vygeneruje. Testováno jen pro <b>PNG obrázky</b> (měla by fungovat i <b>průhlednost</b>).</p>

<h4>Postup</h4>
<p>Týká se <b>vývoje stránky</b>. V ostrém provozu stačí překopírovat vygenerované CSS mezi ostatní styly:</p>
<ul>
  <li><p>Skript <code>css-sprite.php</code> se umístit do složky s obrázky.</p></li>
  <li><p>Zároveň se přilinkuje jako <b>CSS soubor</b>:</p>
    <pre><code>&lt;link rel="stylesheet" href="./<b>css-sprite.php</b>"></code></pre></li>
  <li><p>Nyní by následující kód měl vložit obrázek (příslušný výřez ze spritu).</p>
  <pre><code>&lt;div class="image nazev-obrazku-bez-pripony">&lt;/div></code></pre></li>
  <li><p>Výsledný spirte se ukládá to téže složky pod názvem <code>sprite.png</code>.</p></li>
</ul>

<p>Hotový vygenerovaný obrázkový sprite by možná ještě šlo následně <a href="/optimalisace-obrazku">datově optimalisovat</a>.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.spritecow.com/">Sprite Cow</a> – pohodlný způsob, jak spojené obrázky <i>rozřezat</i></li>
</ul>