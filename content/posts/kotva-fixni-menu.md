---
title: "Odkaz na kotvu a fixní menu"
headline: "Odkaz na kotvu a fixní hlavička"
description: "Při použití fixního menu/hlavičky se stane nepěkná věc, že při odkazu na kotvu je cíl skryt pod menu. Co s tím?"
date: "2014-01-06"
last_modification: "2014-01-10"
status: 1
tags: ["css", "fixed", "hotova-reseni", "js", "scroll"]
format: "html"
---

<p>Problém je v tom, že prohlížeč odroluje <b>přesně na kotvu</b> a její cíl (třeba nadpis) je tím pádem skryt pod fixním prvkem. <a href="http://kod.djpw.cz/syab">Živá ukázka</a> problému.</p>

<p><img src="/files/kotva-fixni-menu/kotva-fixni-hlavicka.gif" alt="Fixní hlavička překrývá cíl kotvy" class="border"></p>

<h2 id="reseni">Řešení</h2>
<ol>
  <li>
    <p>
      Přidat nadpisu, který má kotvu, vrchní <code>padding</code> ve výšce <b>fixního prvku</b> a elementu před stejný rozměr odečíst záporným <code>margin-bottom</code> (<a href="http://kod.djpw.cz/tyab">ukázka</a>).
    </p>
  </li>
  
  <li>
    <p>
      Do nadpisu umístit <b>další element</b>, který bude mít ID místo nadpisu. Tento element se <a href="/position#relative">relativně posune</a> o výšku fixní navigace nahoru (<a href="http://kod.djpw.cz/uyab">ukázka</a>).
    </p>
    <p>
      Pravděpodobně není možné použít <a href="/css-selektory#before-after"><code>::before</code>.</a>
    </p>
  </li>
  
  <li>Posun <b>zajistit JavaScriptem</b>.</li>
</ol>

<h2 id="js">JavaScriptové odsunutí</h2>
<p>Vyřešit překrývání fixní navigací může být rozumné i JavaScriptem — první ani druhé CSS řešení není úplně ideální:</p>

<ul>
  <li>Pravděpodobně bude nutné mít specifický HTML kód (generovat kotvy jako prázdné <code>&lt;span></code>y v druhém případě a mít čemu dát záporný <code>margin-bottom</code> v případě prvním).</li>
  <li>Spoléhá se na <b>konkrétní výšku</b>, což většinou nevěstí nic odbrého. Stačí když se menu roztáhne na dva řádky a přestane to fungovat.</li>
</ul>

<p>Co tedy udělá JS? Po kliknutí na odkaz spočítá výšku fixního menu (<code>offsetHeight</code>) a o tuto výšku <a href="/odrolovani">odroluje</a>.</p>

<p><a href="http://kod.djpw.cz/aibb">Živá ukázka</a></p>

<pre><code>function kotva(kotva) {
  location.hash = kotva.hash;
  var top = document.documentElement.scrollTop || document.body.scrollTop;
  top = top - document.getElementById("menu").offsetHeight;
  document.body.scrollTop = document.documentElement.scrollTop = top;  
  return false;
}</code></pre>

<!-- http://kod.djpw.cz/xyab 
<p>Poznámka: <b>IE 7</b> a starší vrátí po použítí <code>kotva.getAttribute("href")</code> absolutní adresu, ne jen <code>#kotvu</code>, jak by bylo žádoucí.</p> -->