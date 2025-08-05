---
title: "Ikona přehrávání v titulku"
headline: "Ikona přehrávání v <code>&lt;title></code>"
description: "Symbol přehrávání ▶ v titulku stránky jako je u videí na YouTube."
date: "2014-03-26"
last_modification: "2014-03-26"
status: 1
tags: ["hotova-reseni", "js", "youtube"]
format: "html"
---

<p>Při přehrávání videa na YT si je možné povšimnout šipky na začátku titulku. V případě, že má člověk otevřeno více záložek téže stránky, docela se to hodí. Je totiž ihned jasné, <b>která záložka něco přehrává</b>.</p>

<p>Tuto <b>šipku</b>/trojúhelník znázorňuje znak <code>▶</code>.</p>

<ol>
  <li><p>Symbol přehrávání můžeme umístit rovnou do kódu (poznámka: některé editory, třeba <a href="/sublime-text">Sublime Text</a>, s tím mohou mít problém, ale výsledek v prohlížeči by měl být OK).</p></li>
  <li><p>Použít <b>HTML entitu</b> <code>&amp;#9654;</code> nebo <code>&amp;#x25b6;</code>.</p></li>
  <li><p>V JS použít escape sekvenci <code>\u25b6</code>.</p></li>
</ol>

<h2 id="nastaveni">Nastavení ikony</h2>

<p>Nastavit tuto šipku JavaScriptem je potom možné změnou <code>document.title</code>.</p>

<pre><code>document.title = "▶" + document.title;</code></pre>

<p>Nebo:</p>

<pre><code>document.title = "\u25b6 " + document.title;</code></pre>

<p>Nebo:</p>

<pre><code>document.title = "&amp;#9654; " + document.title;</code></pre>

<h2 id="odstraneni">Odstranění šipky</h2>

<p>Při <i>zastavení</i> je na místě šipku smazat, to jde zajistit buď kompletním <b>přepsáním</b> <code>document.title</code>, nebo odstraněním šipky funkcí <code>replace</code>:</p>

<pre><code>document.title = document.title.replace("\u25b6 ", "");</code></pre>

<h2 id="ukazka">Ukázka</h2>

<p>Jednoduchá ukázka, která přidává/odebírá <i>šipku</i> z titulku (<code>document.title</code>).</p>

<div class="live">
  <script>
    function prepnoutPrehravani(el) {
      if (el.hasAttribute("data-vypnuto")) {
        document.title = "\u25b6 " + document.title;
        el.removeAttribute("data-vypnuto");
        el.innerHTML = "Vypnout";
      }
      else {
        document.title = document.title.replace("\u25b6 ", "");
        el.setAttribute("data-vypnuto", "");
        el.innerHTML = "Zapnout";
      }
    }
  </script>
  <button onclick="prepnoutPrehravani(this)" data-vypnuto>
    Zapnout
  </button>
</div>

<p>Manipulovat JavaScriptem s <code>&lt;title></code> je vůbec docela užitečné a není důvod se toho bát. Dá se tak snadno znázorňovat.</p>

<ol>
  <li>Již zmíněné <b>přehrávání videa/hudby</b>.</li>
  <li>Zobrazit <b>počet nepřečtených</b> zpráv/příspěvků (používá Facebook nebo Twitter).</li>
  <li>Signalisovat, že je na stránce <b>rozepsaný příspěvek</b> (používá <a href="http://djpw.cz">DJPW</a>).</li>
</ol>

