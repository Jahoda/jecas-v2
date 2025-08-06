---
title: "Box-decoration-break"
headline: "Box-decoration-break"
description: "Vlastnost <code>box-decoration-break</code> upravuje chování stylu elementu při zalomení řádku."
date: "2014-10-14"
last_modification: "2014-10-15"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<h2 id="podpora">Podpora</h2>

<p>Funguje mimo <b>IE</b>, v některých ostatních prohlížečích jen s <a href="/css-prefixy">prefixy</a>.</p>


<h2 id="inline">Řádkové prvky</h2>

<p>Když nějakému <b>řádkovému prvku</b> (<code>display: inline</code>) přidáme rámeček, <a href="/box-shadow">stín</a> nebo <a href="/gradient">pozadí s přechodem</a>, může se v případě jeho zalomení stát ne úplně pěkná věc. Efekt se rozdělí na několik řádků.</p>

<div class="live" style="width: 200px;">
  <style>
    .dekorace {
      border: 1px solid #0D6AB7;
      border-radius: 5px;
      padding: .4em; 
      line-height: 250%;
      background: #fff;
      box-shadow: 5px 5px 5px #1081DD;
    }
  </style>
  <span class="dekorace">Text<br> s <i>dekorací</i> se zalomí do několika řádků.</span>
</div>

<p>Pokud není pravděpodobné, že v elementu se zvláštní dekorací bude něco hodně dlouhého, asi nejlepší řešení je <b>zrušit zalamování</b>:</p>

<pre><code>element {
  white-space: nowrap;
}</code></pre>

<p>Pro ostatní případy se může hodit právě <code>box-decoration-break</code>. Při nastavení na <code>clone</code> dekorační efekt <b>skončí na konci řádku</b>, aby na novém zase začal odznovu. Nerozlišuje se, jestli je zalomení <b>přirozené</b> nebo vyvolané značkou <code>&lt;br></code>.</p>



<h2 id="zapis">Zápis</h2>

<p>Hodnota <code>clone</code> způsobí zduplikování celého vzhledu na každý <b>jednotlivý řádek</b>, další možná hodnota je <code>slice</code>, která je výchozí – tj. jako by se <code>box-decoration-break</code> vůbec <b>nepoužilo</b>.</p>

<pre><code>element {
  /* dekorace */
  box-decoration-break: <b>clone</b>;
  -webkit-box-decoration-break: clone;
  -ms-box-decoration-break: clone;
  -o-box-decoration-break: clone;
}</code></pre>


<div class="live" style="width: 200px;">
  <style>
    .dekorace-clone {
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      -ms-box-decoration-break: clone;
      -o-box-decoration-break: clone;
    }
  </style>
  <span class="dekorace dekorace-clone">Text<br> s <i>dekorací</i> se zalomí do několika řádků.</span>
</div>

<p><a href="https://kod.djpw.cz/hlgb">Samostatná ukázka</a> (<a href="https://kod.djpw.cz/mlgb">ukázka s obrázkovým gradientem</a> – přechod začne odznovu na každém řádku)</p>

<p>V ideálním případě by se měla výše uvedená ukázka zobrazovat takto:</p>

<p><img src="/files/box-decoration-break/spravne.png" alt="Správné zobrazení box-decoration-break: clone" class="border"></p>

<p>Zajímavě se chová <b>IE</b>, který vykresluje nezávisle na vlastnosti <code>box-decoration-break</code> něco mezi <code>clone</code> a <code>slice</code>:</p>

<p><img src="/files/box-decoration-break/ie.png" alt="Zobrazení v IE" class="border"></p>



<h2 id="block">Blokové elementy</h2>

<p>Klonování efektu pomocí <code>box-decoration-break</code> jde použít i u blokových elementů – význam to má u <a href="/column">zobrazení ve sloupcích</a> (korektně funguje jen ve <b>Firefoxu</b>).</p>

<div class="live" style="width: 300px;">
  <style>
    .dekorace-obal {
      margin: 2em 0;
      -webkit-columns: 3;
      -moz-columns: 3;
      -ms-columns: 3;
      -o-columns: 3;
      columns: 3;
    }
    .dekorace-block {
      display: block;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      -ms-box-decoration-break: slice;
      -o-box-decoration-break: clone;      
    }
  </style>
  <div class="dekorace-obal">
    <span class="dekorace dekorace-block">Text s <i>dekorací</i> se zalomí do několika sloupců. Jak se bude efekt napojovat je možné ovlivnit.</span>
  </div>    
</div>

<p><a href="https://kod.djpw.cz/ilgb">Samostatná ukázka</a></p>

<p>Vypadat by to mělo následovně.</p>

<p><img src="/files/box-decoration-break/spravne-sloupce.png" alt="Správné zobrazení sloupců" class="border"></p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://devdocs.io/css/box-decoration-break">DevDocs</a></li>
  <li><a href="http://dev.w3.org/csswg/css-break/#break-decoration">W3C</a></li>
</ul>


<!-- obrázek: https://kod.djpw.cz/jlgb -->