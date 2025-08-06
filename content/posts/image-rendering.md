---
title: "Image-rendering"
headline: "Image-rendering"
description: "CSS vlastnost <code>image-rendering</code> ovlivňuje způsob, kterým se v prohlížeči zvětšují/zmenšují obrázky."
date: "2014-10-15"
last_modification: "2015-03-13"
status: 1
tags: ["css", "css-vlastnosti", "obrazky"]
format: "html"
---

<p>V případě, že obrázek na stránce má jiné než <b>skutečné rozměry</b>, které mu byly nastaveny v grafickém editoru, musejí se <a href="/webove-prohlizece">webové prohlížeče</a> vypořádat se změnou velikosti.</p>

<p>Pro změnu velikosti obrázků existuje řada algoritmů:</p>

<blockquote>
  <p>Různé editory i různé prohlížeče používají různé algoritmy pro zmenšení obrázků. Jednodušší algoritmy jsou rychlejší a na fotografie je optimální jiný algoritmus, než na perokresbu, proto lepší grafické editory umožňují volbu algoritmu pro zmenšení.</p>
  <p class="autor">– <a href="http://teststranek.kvalitne.cz/">Bubák</a></p>
</blockquote>







<p>Příklad různých algoritmů pro změnu velikosti v programu Irfan View.</p>

<p>
  <img src="/files/image-rendering/filtry.png" alt="Filtry v Irfan View" class="border">
</p>










<p>Pro obdobný ruční výběr algoritmu <b>v prohlížečích</b> slouží právě vlastnost <code>image-rendering</code>.</p>



<h2 id="vyuziti">Využití</h2>

<p>Jiné než výchozí hodnoty se zdají být vhodné spíš pro <a href="http://en.wikipedia.org/wiki/Pixel_art">pixel art</a>, ale mohou se hodit i pro obrázek s <b>QR kódem</b>.</p>

<figure>
  <img src="/files/image-rendering/qr-kody.png" alt="Zvětšení QR kódu s image-rendering" class="border">
  <figcaption>Srovnání zvětšení malého QR kódu s ruzně nastaveným renderováním</figcaption>
</figure>








<p>Pro fotografie a většinu obrázků je nejlepší <b>výchozí chování</b>, které prohlížeče používají i bez explicitního použití <code>image-rendering</code>u.</p>


<figure>
  <img src="/files/image-rendering/fotka.png" alt="Zvětšení fotografie s image-rendering" class="border">
  <figcaption>Srovnání zvětšení malé fotografie s ruzně nastaveným renderováním</figcaption>
</figure>













<h3 id="kde">Kde se dá úprava renderování použít?</h3>

<p>Vlastnost <code>image-rendering</code> je aplikována na:</p>

<ol>
  <li>obrázky v <code>&lt;img></code>,</li>
  <li>kreslicí plátno <a href="/canvas"><code>&lt;canvas></code></a>,</li>
  
  <li>pozadí elementů <code>background-image</code></li>
</ol>





<h2 id="hodnoty">Způsoby renderování obrázku</h2>

<h3 id="auto"><code>image-rendering: auto</code></h3>

<p>Výchozí chování. Při zvětšení obrázek působí rozmazaně, ale nejsou přímo patrné jednotlivé pixely. Pro fotografie se jedná o nejlepší (nebo možná spíš nejméně špatný) způsob – ideální je mít obrázek v <b>dostatečném rozlišení</b>.</p>

<p>Nevýhoda tohoto algoritmu nastává u obrázků s ostrými barevnými přechody, které budou rozmazané.</p>

<p>Takto vypadá čtvereček s kolečkem uprostřed <img src="/files/image-rendering/ctverecek.png" alt="čtvereček" style="display: inline"> o rozměrech 10 × 10 při desetinásobném zvětšení.</p>

<div class="live">
  <p>
    <img src="/files/image-rendering/ctverecek.png" width="100">
  </p>  
</div>








<h3 id="pixelated"><code>image-rendering: pixelated</code></h3>

<p>Alternativou je hodnota <code>pixelated</code>, která docílí toho, že výsledek bude vypadat jako by pouze sestával z větších pixelů.</p>

<p>Zápis <code>image-rendering: pixelated</code> funguje pouze v <b>Chrome</b>/<b>Opeře</b>. I v ostatních prohlížečích je ale možné dosáhnout stejného vzhledu.</p>

<ul>
  <li><b>IE</b> používá konstrukci <code>-ms-interpolation-mode: nearest-neighbor</code></li>
  <li>Ve staré <b>Opeře</b>, <b>Firefoxu</b> a starším <b>Chrome</b>/<b>Safari</b> funguje stejně jako <code>pixelated</code> hodnota <code>crisp-edges</code>:
    <pre><code>image-rendering: -moz-crisp-edges;
image-rendering: -o-crisp-edges;
image-rendering: -webkit-optimize-contrast;</code></pre>
  </li>
</ul>

<p>Na výsledném obrázku jsou patrné jednotlivé pixely. Dříve tento způsob používaly prohlížeče jako výchozí, kvůli úspoře výkonu.</p>

<div class="live">
  <style>
    .pixely {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: pixelated;
      -ms-interpolation-mode: nearest-neighbor;  
    }</style>
  <p>
    <img class="pixely" src="/files/image-rendering/ctverecek.png" width="100">
  </p>  
</div>

<p><a href="https://kod.djpw.cz/nllb">Samostatná ukázka</a></p>

<h3 id="crisp-edges"><code>image-rendering: crisp-edges</code></h3>

<p>Nakonec existuje ještě hodnota <code>crisp-edges</code>, která sice v některých prohlížečích funguje, chová se ale stejně jako <code>pixelated</code>.</p>

<p>Podle návrhu CSS specifikace by měla pixely na sebe <i>napojit</i>, aby nebylo vidět jednotlivé kostičky, což by se asi nejvíc hodilo právě pro ten <b>pixel art</b>.</p>

<p>
  <img class="border" src="/files/image-rendering/srovnani.png">
</p>
























<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>HTML5Rocks: <a href="http://updates.html5rocks.com/2015/01/pixelated">image-rendering: pixelated</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering">image-rendering</a></li>
  
  <li>Specifikace W3: <a href="http://dev.w3.org/csswg/css-images-3/#the-image-rendering">Determing How To Scale an Image: the ‘image-rendering’ property</a></li>
  
  <li>Can I Use: <a href="http://caniuse.com/#feat=css-crisp-edges">Podpora v prohlížečích</a></li>
</ul>