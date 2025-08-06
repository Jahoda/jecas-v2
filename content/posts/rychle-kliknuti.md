---
title: "Rychlé kliknutí a vyvolání události"
headline: "Rychlé kliknutí a vyvolání události"
description: "Jak zajistit, aby ovládací prvky uživatelského rozhraní reagovaly správně i na rychlé kliknutí."
date: "2014-01-27"
last_modification: "2014-01-28"
status: 1
tags: ["hotova-reseni", "js", "js-udalosti", "napady"]
format: "html"
---

<h2 id="problem">Problém</h2>

<p>Ovládací prvky běžných JS aplikací zpravidla provádějí nějakou <a href="/udalosti-mysi">událost při kliknutí myši</a> (<code>onclick</code>).</p>

<div class="live">
  <p onclick="alert('Kliknuto')" style="background: #efefef">Kliknout</p>
</div>

<p>Co nepěkného se může stát? V situaci, kdy uživatel bude chtít kliknout na více věcí v <b>rychlém sledu</b>, se snadno stane, že pohyb myši v momentě kliknutí událost <code>onclick</code> <b>nespustí</b>.</p>

<p>Toto může nastat ve třech <b>reálných</b> případech:</p>

<ol>
  <li>uživatel tlačítko myši stlačí, potom si uvědomí, že <b>kliknout nechce</b>, a tak odjede pryč, aby akci nevyvolal,</li>
  <li>uživatel je tak rychlý, že chce na prvky klikat <i>za jízdy</i>, tudíž akci nevyvolá,</li>
  <li>uživatel má problémy s přesností a kliknutí bez (lehkého) posunu myši je pro něj <b>obtížné</b>.</li>
</ol>

<p>Kromě bodu 1 jsou to situace <b>nežádoucí</b>. A nepomůže ani použití tlačítka (<code>&lt;button></code>) nebo odkazu.</p>

<div class="live">
  <a class="button" href="javascript:alert('Kliknuto')">Kliknout odkazem</a>
  <button onclick="alert('Kliknuto')">Kliknout tlačítkem</button>
</div>


<h2 id="reseni">Řešení</h2>
<p>Odstranit tento problém umí událost <code>onmousedown</code>.</p>

<div class="live">
  <a class="button" href="javascript://akce" onmousedown="alert('Kliknuto')">Kliknout odkazem</a>
  <button onmousedown="alert('Kliknuto')">Kliknout tlačítkem</button>
</div>

<p>Výhodné to může být i v rychlosti aplikace (<code>onmousedown</code> člověk provede běžně o desítky milisekund dříve než <code>onclick</code>). Problém ale je v <i>rozmyslení si kliknutí</i>.</p>

<p>Docela funkční mi přijde postup, kdy se při <code>onmousedown</code> požadovaná akce připraví do <code>onmouseup</code> (puštění tlačítka nad elementem) a <code>onmouseout</code> (odjetí myší z elementu). A z <code>onmouseout</code> se akce po nějaké době (cca 80 milisekund) vyhodí <a href="/odpocitavani">časovačem</a>.</p>

<p><a href="https://kod.djpw.cz/ymbb">Živá ukázka</a> srovnávající oba přístupy.</p>

<p>Pokud se výsledek akce má získávat <a href="/ajax">AJAXem</a>, nabízí se požadavek na soubor zavolat již při <code>onmousedown</code>, ale zobrazit až při <i>potvrzení</i> kliknutí (<code>onmouseup</code>/<code>onmouseout</code>).</p>

<div class="live">
  <script>
    function kliknout(el, callback) {
      el.onmouseup = el.onmouseout = function() {
        callback();
        el.onmouseup = el.onmouseout = null;
      } 
      setTimeout(function() {
        el.onmouseout = null;
      }, 80);
    }
  </script>
  <button onmousedown="kliknout(this, function(){alert('Kliknuto')})">Chytře klikající tlačítko</button>
</div>