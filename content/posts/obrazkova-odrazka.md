---
title: "Obrázková odrážka"
headline: "Obrázek jako odrážka"
description: "V CSS je možné přidat textu (seznamu) obrázkovou odrážku, jaké to má úskalí a risika?"
date: "2013-09-23"
last_modification: "2013-09-27"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>Kaskádové styly používají k obrázkové odrážce vlastnost <code>list-style-image</code> s adresou obrázku zadaného do <code>url()</code>.</p>

<pre><code>element {list-style-image: url(odrazka.png)}</code></pre>

<script>
  function prohodit(element, trida) {
    element.className = element.className == trida ? "" : trida;
  }
</script>
<div class="live">
  <style>
    .inside {list-style-position: inside}
  </style>
  <ul style="list-style-image: url(/files/obrazkova-odrazka/odrazka.png)">
    <li>Text s obrázkovou odrážkou,<br> může být i<br>víceřádkový.
    <li>U obrázkové odrážky vytvořené přes <code>list-style-image</code> lze měnit umístění.
    <li>Prohodit umístění odrážky (<code>list-style-position</code>)<br>
    <button onclick='prohodit(this.parentNode.parentNode, "inside")'>Přepnout umístění</button>
    </li>
  </ul>
</div>

<p>Jak je vidět, nastavit přesnou posici obrázku pro <code>list-style-image</code> odrážku není možné. Dosáhnout přibližného zarovnání lze docílit nastavením <code>line-height</code> shodného s výškou obrázkové odrážky. Jelikož je ale možné <b>text na webu zvětšovat</b>, za moc toto řešení nestojí.</p>

<h2 id="background">Normální pozadí (<code>background-image</code>)</h2>
<p>Z výše popsaných důvodů se nabízí používat <b>obyčejné obrázkové pozadí</b>:</p>
<ul>
  <li><p>Seznamu <code>&lt;ul&gt;</code> nebo <code>&lt;ol&gt;</code> se <b>odrážky zruší</b>:
    <pre><code>ul {list-style: none}</code></pre></li>
  <li><p>Položkám se přidá levý <code>padding</code> o šířce obrázku + něco málo navíc jako odsazení:</p>
    <pre><code>li {padding-left: 30px}</code></pre>
  </li>
  <li>Položkám ne nastaví neopakující se <b>obrázek</b> (<code>no-repeat</code>):
    <pre><code>li {background: url(odrazka.png) <b>no-repeat</b>}</code></pre></li>
</ul>

<div class="live">
  <style>  
    .odrazka {list-style: none; padding-left: 10px}
    .odrazka li {padding-left: 30px; background: url(/files/obrazkova-odrazka/odrazka.png) no-repeat}
    
    .uprostred li {background-position: center left}
    .dole li {background-position: bottom left}
  </style>
  <ul class="odrazka">
    <li>Text s obrázkovou odrážkou,<br> může být i<br>víceřádkový.
    <li>U obrázkové odrážky vytvořené přes <code>background</code> lze měnit umístění.
    <li>Změnit umístění odrážky (<code>background-position</code>)<br>
    <button onclick='this.parentNode.parentNode.className="odrazka uprostred"'>Vycentrovat</button>
      <button onclick='this.parentNode.parentNode.className="odrazka dole"'>Dolů</button>
      <button onclick='this.parentNode.parentNode.className="odrazka"'>Nahoru</button>
    </li>
  </ul>
</div>

<h2 id="posicovani">CSS sprite a absolutní posicování</h2>
<p>Máme-li na stránce kvůli <b>rychlejšímu načítání obrázky spojené do jednoho</b> (tzv. <i>CSS sprite</i>) a nechceme-li odrážku vyčlenit do zvlášť souboru, nezbývá než posicovat.</p>

<pre><code>&lt;ul&gt;
  &lt;li&gt;&lt;span class="<b>css-obrazek</b> odrazka"&gt;&lt;/span&gt; Text
&lt;/ul&gt;
</code></pre>

<pre><code>li {position: relative; padding-left: 30px}
.odrazka {position: absolute; left: 0; top: 0}</code></pre>

<p>Pro vycentrování doprostřed řádku stačí použít <a href="/centrovani#absolute">běžné centrování</a>, kdy se odrážka umístí na <code>50%</code> a polovina výšky obrázku se odečte záporným <code>margin</code>em.</p>