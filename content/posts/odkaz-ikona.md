---
title: "Ikonka vedle odkazu"
headline: "Ikona vedle odkazu"
description: "Jak přidat a zarovnat ikonku vedle odkazu, který má podtržení."
date: "2015-10-30"
last_modification: "2015-11-17"
status: 1
tags: ["css", "hotova-reseni", "odkazy"]
format: "html"
---

<p>Pro <a href="/oznaceni-odkazu">označení odkazu</a> se někdy používají ikony:</p>

<ul>
  <li>Označení <b>externího odkazu</b>.
    <p><img src="/files/odkaz-ikona/externi.png" alt="Označení externího odkazu" class="border"></p>
  </li>
  
  <li>Znázornění typu souboru (JPG, GIF, ZIP apod.)</li>
  
  <li>Označení <b>jazyku</b> odkazu.</li>
  
  <li>Označení webu, kam odkaz vede.
  <p><img src="/files/odkaz-ikona/web.png" alt="Označení odkazu ikonkou webu" class="border"></p>
  </li>
</ul>




<h2 id="ikonka">Přidání ikonky</h2>

<p>Ikonku jde přidat několika způsoby:</p>

<ol>
  <li>
    <p>Jako <b>pozadí odkazu</b>. Prostor pro obrázek s ikonou se potom připraví <code>padding</code>em:</p>
    
    <pre><code>a.ikonka {
  background: url(ikona.png) no-repeat right center;
  padding-right: 20px;
}</code></pre>
  </li>
  
  
  
  <li>
    <p><b>Prázdný element</b> – uvnitř <a href="/odkaz"><code>&lt;a></code></a> bude prázdný <code>&lt;span></code>:</p>
    
    <pre><code>&lt;a href="…">
  Text odkazu
  &lt;span class="ikona">&lt;/span>
&lt;/a></code></pre>
    
    
    
    
    
    <p>Ikona potom bude mít nastaveny rozměry a obrázek na pozadí.</p>
    
    <pre><code>.ikona {
  background: url(ikona.png);
  width: 16px;
  height: 16px;
}
</code></pre>
    
    
    
    
    
    <p>Výhoda tohoto postupu spočívá v tom, že je ikonku jednoduché přesunout před/za odkaz. Také je jednoduší pro element o přesných rozměrech připravit <a href="/css-sprite">CSS sprite</a>.</p>
    
    <p>Nevýhodou je nutnost upravit HTML kód.</p>
    
    <p>V případě ikony v <a href="/svg">SVG</a> není nutné používat rozměry v pixelech, ale ikona se může přizpůsobovat velikosti textu:</p>
    
        <pre><code>.ikona {
  background: url(ikona.svg);
  width: 1em;
  height: 1em;
  background-size: contain;
}
</code></pre>
  </li>
  
  
  
  <li>
    <p><b>Pseudo-element</b> <code>:before</code>/<code>:after</code> funguje jako prázdný element a nevyžaduje změnu HTML kódu.</p>
  </li>
  <li>
    <p><b>Obrázek</b> <code>&lt;img></code> je nejjednodušší řešení přidání ikonky.</p>
    
    <p>Někteří lidé zastávají názor, že do <code>&lt;img></code> ilustrační grafika nepatří, takže se jim takové řešení nelíbí.</p>
  </li>
</ol>



<h2 id="podtrzeni">Podtržení</h2>

<p>V případě, že odkaz s ikonkou <b>má být podtržen</b>, vzniká trochu nehezká situace, kdy je podtržení v mezeře mezi obrázkem/ikonou a textem.</p>

<div class="live">
  <style>
    .ikonka {
      background: url("/favicon.ico") center left no-repeat;
      background-size: 100%;
      display: inline-block;
      width: 16px;
      height: 16px;
    }
  </style>
  <p>Odkaz na <a href="http://jecas.cz"><span class="ikonka"></span> Je čas</a>.</p>
</div>

<p>Co s tím?</p>


<p>Pokud se prázdný element s ikonkou <b>vyčlení mimo obsah odkazu</b>, je po problému:</p>


<div class="live">
  <p>Odkaz na <span class="ikonka"></span> <a href="http://jecas.cz">Je čas</a>.</p>
</div>

<p>Toto řešení má ale problém jiný – <b>ikonka nebude klikací</b>. A to může vadit.</p>


<h3 id="odsazeni">Odsazení ikonky</h3>

<p>Asi nejsnazší řešení je zrušit mezeru v kódu a odsazení vytvořit CSS vlastností <a href="/margin"><code>margin</code></a>:</p>


<div class="live">
  <style>
    .ikonka-odsazeni {
      margin-right: .3em;
    }
  </style>
  <p>Odkaz na <a href="http://jecas.cz"><span class="ikonka ikonka-odsazeni"></span>Je čas</a>.</p>
</div>

<p>Ikonka už ale potřebuje zvláštní třídy pro odsazení zleva a zprava.</p>

<h3 id="pozadi">Pozadí odkazu</h3>

<p>Při vložení ikonky jako pozadí bez dalšího elementu bude podtržení jen pod textem.</p>

<div class="live">
  <style>
    .ikonka2 {
      background: url("/favicon.ico") center left no-repeat;
      background-size: contain;
      padding-left: 20px;  
    }
  </style>
  <p>Odkaz na <a href="http://jecas.cz" class="ikonka2">Je čas</a>.</p>
</div>


<h3 id="pseudo-element">Pseudo-element</h3>

<p>Ikonku jde vložit i pomocí <code>:before</code>/<code>:after</code>. Potom je opět nutné odsazení zajistit přes <code>margin</code>:</p>

<div class="live">
  <style>
    .ikonka-pe:before {
      background: url("/favicon.ico") center left no-repeat;
      background-size: 100%;
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: .3em;
    }
  </style>
  <p>Odkaz na <a href="http://jecas.cz" class="ikonka-pe">Je čas</a>.</p>
</div>

<div style="spadding-top: 15em"></div>
<h2 id="zarovnani">Zarovnání ikonky</h2>

<p>Pro svislé zarovnání ikonky na řádku existují dvě možnosti:</p>

<ol>
  <li><p>Zarovnání CSS vlastností <code>vertical-align</code>.</p></li>
  <li><p>„Ruční“ posun ikonky pomocí <a href="/position#relative"><code>position: relative</code></a>.</p></li>
</ol>

<p>Výchozí zarovnání řádkového prvku je na spodek řádku (<code>vertical-align: baseline</code>).</p>

<p><img src="/files/odkaz-ikona/zarovnani.png" alt="Zarovnání ikony na řádku" class="border"></p>


<p>Jak je vidět, pro ikonku nižší, než je výška řádku, je asi nejlepší možnost <code>vertical-align: middle</code>.</p>

<p>Kromě klíčových slov jde u <code>vertical-align</code> použít délkové jednotky – například <code>em</code>, které stanoví vzdálenost elementu od posice <code>baseline</code>.</p>

<p>Následující element tak bude lehce <b>nad</b> <i>baseline</i>:</p>

<pre><code>element {
  vertical-align: 0.2em;
}</code></pre>
<style>
  .live a {
    text-decoration: underline;
    border-bottom: 0;
  }</style>