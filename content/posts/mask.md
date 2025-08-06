---
title: "CSS mask"
headline: "CSS vlastnost <code>mask</code>"
description: "Vlastnost <code>mask</code> dokáže vytvářet elementy s texturou nebo nepravidelnými tvary."
date: "2014-10-17"
last_modification: "2015-02-14"
status: 1
tags: ["css", "css-vlastnosti", "obrazky"]
format: "html"
---

<p>Má-li být na stránce nějaký <b>obsah nepravidelných tvarů</b> (něco jiného než obdélník), existují možnosti:</p>

<ul>
  <li><a href="/border-radius"><code>border-radius</code></a> – zaoblené rohy, kterými jde vytvořit i kruh</li>
  
  <li><a href="/clip"><code>clip</code></a> – pomocí funkce <code>polygon</code> jde vytvořit nejrůznější oříznutí (<b>Chrome 24</b>+, <b>Opera 15</b>+)</li>
</ul>

<p>CSS vlasnost <code>mask</code> se hodí pro vytvoření například obrázku s nepravidelným okrajem.</p>

<p><img src="/files/mask/vysledek.png" alt="Obrázek s nepravidelným okrajem" class="border"></p>






















<p>Takový obrázek je sice možné <i>natvrdo</i> nakreslit, ale má to značné nevýhody:</p>

<ul>
  <li>Každý obrázek se bude muset odpovídajícím způsobem <b>upravit</b>.</li>
  
  <li>Při <b>změně tvaru</b> bude nutné všechny obrázky <b>přegenerovat</b>.</li>
  
  <li>Kombinovat na jednom obrázku souvislé plochy jedné barvy (okolí) a malé plochy různých barev (fotka) je nevýhoda z hlediska <a href="/optimalisace-obrazku">datové optimalisace obrázků</a>. Ve formátu JPG bude přechod nekvalitní, v případě PNG bude datová velikost enormní.</li>
</ul>




<h2 id="prekryti">Překrytí</h2>

<p>Lepší řešení bez <code>mask</code> je tedy naposicování samotného okraje přes původní obrázek.</p>

<p><button onclick="toggle(document.querySelector('.obrazek-maska span'), 'skryt')">Zobrazit/skrýt „masku“</button></p>

<div class="live">
  <style>
    .obrazek-maska {
      position: relative;
    }
    .obrazek-maska span {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(/files/mask/prekryv.png);
      background-size: 100%;
    }
    .obrazek-maska span.skryt {
      display: none;
    }
  </style>
  <p class="obrazek-maska">
    <img src="/files/mask/obrazek.jpg" alt="Příklad obrázku" class="border">
    <span></span>
  </p>
</div>






<p>V hodně případech si jde s takovým postupem vystačit, bohužel trpí docela vážným nedostatkem – okraj <b>nemůže být průhledný</b> – musí tam být nějaká barva, aby překryla obrázek. V případě webu s jednobarevným pozadím to nevadí, ale jinak to není ideální.</p>




<h2 id="oriznuti-mask">Oříznutí pomocí <code>mask</code></h2>

<p>Vlastnost <code>mask</code> všechny tyto problémy řeší. Bohužel v <b>IE</b> není podporována vůbec, ve <b>Firefoxu</b> podporuje pouze <a href="/svg">SVG</a> a v <b>Chrome</b>/<b>Opeře</b>/<b>Safari</b> funguje částečně.</p>

<p>Kromě SVG a jiných obrázků jde použít i <a href="/gradient">CSS gradient</a>.</p>


<h3 id="zapis">Zápis</h3>

<p>CSS vlastnost <code>mask</code> je zkratkou pro různé další <code>mask-*</code> vlastnosti.</p>

<pre><code>element {
  mask: url(maska.png);
}</code></pre>

<ul>
  <li><code>mask-type</code> – může mít hodnoty <code>alpha</code> a <code>luminance</code>, které stanovují způsob, kterým se určí obsah, který zůstane vidět (zdá se mi, že nic nedělá)</li>
  
  <li><code>mask-image</code> – obrázek, který se použije jako maska</li>
  <li><code>mask-size</code> – velikost masky (funguje podobně jako <a href="/obrazkove-pozadi"><code>background-size</code></a>)</li>
  <li><code>mask-position</code>, <code>mask-repeat</code> – stejné jako u <code>background-*</code></li>  
  
  <li><code>mask-border</code> – obdoba <a href="/border-image"><code>border-image</code></a></li>
</ul>

<p><a href="https://kod.djpw.cz/wjkb">Živá ukázka</a> (funguje jen v <b>Chrome</b>, nové <b>Opeře</b> apod.)</p>





<h2 id="textura">Textura</h2>

<p>Kromě „oříznutí“ obsahu lze využít masku i k <i>živému</i> <b>překrytí texturou</b>.</p>

<p><img src="/files/mask/textura.png" alt="Obrázek překrytý texturou" class="border"></p>

<p>Výsledek v podporovaných prohlížečích:</p>

<p><img src="/files/mask/obrazek-textura.jpg" alt="Obrázek překrytý texturou" class="border"></p>

<p><a href="https://kod.djpw.cz/bkkb">Živá ukázka</a></p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>  
  <li>Viget: <a href="http://viget.com/inspire/easy-textures-with-css-masks">Easy Textures with CSS Masks</a></li>
  
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/masking/adobe/">CSS Masking</a></li>
  
  <li>CSS-Tricks: <a href="http://css-tricks.com/clipping-masking-css/">Clipping and Masking in CSS</a></li>
  
  <li>Adobe Web Platform Team: <a href="http://blogs.adobe.com/webplatform/2014/01/16/making-the-web-sweeter/">Praktické použití <code>mask</code></a></li>  
</ul>