---
title: "Nová stránka v JavaScriptu"
headline: "Nová stránka v JavaScriptu"
description: "Jak v JavaScriptu vytvořit novou HTML stránku."
date: "2015-02-13"
last_modification: "2015-10-02"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p id="prvni-odstavec">V některých případech se může hodit vytvořit skriptem novou stránku. Je sice možné měnit <a href="/dom">DOM</a> té stávající, ale to způsobí <b>přepsání původního obsahu</b> a s tím spojenou <b>nemožnost návratu</b>.</p>


<div class="live">
  <script>
    function novaStranka(html) {
      var stranka = window.open("", "_self");
      var tlacitkoZpet = '<p><button onclick="history.back()">Zpět</button></p>';
      stranka.document.write(html + tlacitkoZpet);
    }
  </script>
  <button onclick="novaStranka(document.getElementById('prvni-odstavec').innerHTML)">
    Otevřít předchozí odstavec do nové stránky
  </button>
</div>

<p>Po různém testování jsem došel k následujícímu kódu:</p>

<pre><code>var html = "&lt;p>HTML obsah stránky&lt;/p>";
var stranka = window.open("", "_self");
stranka.document.write(html);</code></pre>

<p><a href="https://kod.djpw.cz/ojkb-">Živá ukázka</a></p>

<p>Bohužel v prohlížečích <b>Chrome</b> a <b>Opera</b> nefunguje funkce zpět. V <b>IE</b>/<a href="/microsoft-edge"><b>Edge</b></a>, <b>Firefoxu</b> a staré <b>Opeře</b> řešení funguje, jak má.</p>

<p>Akce <i>Zpět</i> (JS akce <code>history.back()</code>) v prohlížečích vycházejících z jádra <b>Blink</b> nevede na stránku, ze které se nová stránka vytvořila, ale už na tu předchozí.</p>

<p>Případně není vůbec kam jít zpět:</p>

<p><img src="/files/nova-stranka/neaktivni.png" alt="Neaktivní ikona pro funkci Zpět" class="border"></p>








<p>Jediná možnost, jak se <i>vrátit</i>, je tak pomocí <i>reloadu</i>:</p>

<pre><code><code>location.reload()</code></code></pre>

<p>V takovém případě už je ale rovnou možné <b>přepsat DOM původní stránky</b>:</p>






<h2 id="prepsani">Přepsání celého obsahu stránky</h2>

<p>Pokud je cílem, aby <b>zůstal společný obsah</b> stránky jako hlavička, navigace a podobně, jde změnit pouze obsahový <code>&lt;div></code>:</p>

<pre><code>document.<b>getElementById("obsah")</b>.innerHTML = "HTML kód";</code></pre>

<p>Pro změnu celého obsahu při zachování stylů a skriptů připojených v <code>&lt;head></code> je ideální přepsat <code>&lt;body></code>:</p>

<pre><code>document.<b>body</b>.innerHTML = "HTML kód";</code></pre>

<p>Kompletní změnu zajistí přepsání <code>documentElement</code>u (značka <code>&lt;html></code>):</p>

<pre><code>document.<b>documentElement</b>.innerHTML = "HTML kód";</code></pre>

<div class="internal-content">
  <ul>
    <li><a href="/documentelement-body">Elementy <code>documentElement</code> a <code>body</code> v JavaScriptu</a></li>
  </ul>
</div>


<h2 id="history">Objekt <code>history</code> a <code>pushState</code></h2>

<p>V <b>Chrome</b> a nové <b>Opeře</b> je nejspíš jediná možnost, jak docílit nové stránky s možností návratu, použít <code>history.pushState</code>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zmena-url">Změna URL bez obnovení stránky</a></li>
  </ul>
</div>

<p>Takové řešení funguje až od <b>IE 10</b> a je pracnější na realisaci, ale dokáže zajistit, že různý obsah bude na různých URL, což je čistší řešení, než když toho na jedné URL může být víc – například kvůli <b>odkazování</b>.</p>



<h2 id="nove">Nové okno</h2>

<p>Další možnost je obsah otevřít v <a href="/nove-okno">novém vyskakovacím okně</a> – to půjde alespoň zavřít. Takový postup se často využívá pro přípravu stránky k tisku:</p>

<div class="internal-content">
  <ul>
    <li>Vytisknutí stránky: <a href="/tisk#js">Zvláštní stránka vytvořená JavaScriptem</a></li>
  </ul>
</div>