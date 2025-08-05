---
title: "Vícenásobné CSS pozadí"
headline: "Více obrázků na pozadí"
description: "Jak v CSS jednomu elementu přiřadit více obrázků na pozadí."
date: "2013-11-18"
last_modification: "2013-11-18"
status: 1
tags: ["css", "hotova-reseni", "napady", "obrazky"]
format: "html"
---

<p>Při vytváření graficky složitějších webů se můžeme dostat do situace, kdy pro dosažení požadovaného vzhledu potřebujeme <b>více než jeden obrázek</b> na pozadí.</p>

<p>Více obrázků je potřeba zejména tehdy, když se <code>&lt;div></code> s obrázkovým pozadím má <b>roztahovat dle obsahu</b>.</p>

<p><img src="/files/vice-obrazku/ramecek.png" alt="Obrázek s rámečkem" class="border"></p>

<p>Budeme-li tento obrázek chtít použít jako <code>background</code> nějakého elementu a umožnit roztahování dle <b>délky obsahu</b>. Budeme ho muset <b>rozřezat</b>:</p>

<ol>
  <li>V případě, že bude stačit <b>natahování do výšky</b>, na vrchní část, shora dolů opakující se prostředek a spodek.</li>
  <li>V případě <b>natahování do šířky i výšky</b> potom obdobně ještě na levou část, opakující se prostředek a pravou část.</li>
</ol>

<p>Pro potřebu ukázky ignoruji, že zrovna takto <b>jednoduchý rámeček</b> by šel řešit <b>čistě v CSS</b>.</p>

<h2 id="reseni">Řešení</h2>
<p>Máme tedy tři obrázky, které budeme <b>nastavovat jako pozadí</b>.</p>
<table>
  <tr>
    <th>Vršek</th>
    <td><img src="/files/vice-obrazku/ramecek-vrsek.png" alt="Vrchní část"></td>
    <td><code>no-repeat</code></td>
  </tr>
  <tr>
    <th>Střed</th>
    <td><img src="/files/vice-obrazku/ramecek-stred.png" alt="Střední část"></td>
    <td><code>repeat-y</code></td>
  </tr>  
  <tr>
    <th>Spodek</th>
    <td><img src="/files/vice-obrazku/ramecek-spodek.png" alt="Spodní část"></td>
    <td><code>no-repeat</code></td>
  </tr>
</table>

<h2 id="multiple-backgrounds">Multiple backgrounds</h2>
<p>Od <b>IE 9</b> fungují tzv. <b>Multiple backgrounds</b>, které umožňují jako hodnotu CSS vlastnosti <code>background</code> čárkami oddělit <b>více pozadí najednou</b>.</p>

<p>Zápis je možné provádět buď přímo do sdružené vlastnosti <code>background</code>.</p>
<pre><code>background: #fff url(prvni.jpg) no-repeat center center, #000 url(druhy.jpg) repeat-x bottom center</code></pre>

<p>Nebo rozepsaně:</p>
<pre><code>background-color: #fff, #000;
background-image: url(prvni.jpg), url(druhy.jpg);
background-repeat: no-repeat, repeat-x;
background-position: center center, bottom center;
</code></pre>

<div class="live" style="background: #fff">
  <style>
    .ramecek {width: 160px; padding: 10px 20px; 
      background: 
        url(/files/vice-obrazku/ramecek-vrsek.png) no-repeat left top, 
        url(/files/vice-obrazku/ramecek-spodek.png) no-repeat left bottom, 
        url(/files/vice-obrazku/ramecek-stred.png) repeat-y}
  </style>
  <div class="ramecek">
    <p>Obsah s obrázkovým rámečkem. Rámeček je řešen přes <i>Multiple backgrounds</i>.</p>
    <p><button onclick="this.parentNode.parentNode.appendChild(this.parentNode.parentNode.getElementsByTagName('p')[0].cloneNode(true))">Přidat obsah</button></p>
  </div>
</div>

<h2 id="vice-divu">Více <code>&lt;div></code>ů</h2>
<p>Pro prohlížeče <b>IE 8</b> a starší je nutné použít jinou techniku. Obalit obsah, kde chceme <b>vícenásobné pozadí</b>, do více obalů, kde každý z nich bude mít <b>jednu část pozadí</b>.</p>

<div class="live" style="background: #fff">
  <style>
    .ramecek-stred {background: url(/files/vice-obrazku/ramecek-stred.png) repeat-y; width: 200px}
    .ramecek-vrsek {background: url(/files/vice-obrazku/ramecek-vrsek.png) no-repeat left top}
    .ramecek-spodek {background: url(/files/vice-obrazku/ramecek-spodek.png) no-repeat left bottom; padding: 10px 20px}
  </style>
  <div class="ramecek-stred">
    <div class="ramecek-vrsek">
      <div class="ramecek-spodek">
        <p>Obsah s obrázkovým rámečkem. Rámeček je řešen přes tři vnořené <code>&lt;div></code>y.</p>
        <p><button onclick="this.parentNode.parentNode.appendChild(this.parentNode.parentNode.getElementsByTagName('p')[0].cloneNode(true))">Přidat obsah</button></p>
      </div>
    </div>
  </div>
</div>

<p>Trochu záludné na tomto řešení je, že <b>rozměry</b> je nutné zadávat pro první obal, ale <code>padding</code> zase pro ten poslední (nejvnitřnější).</p>

<h2 id="posicovani">Posicování</h2>
<p>Kromě <b>zanořených</b> elementů s pozadím, se dá neopakující se obrázky umístit do <code>&lt;div></code>ů a <a href="/position#absolute">absolutně naposicovat</a>.</p>

<div class="live" style="background: #fff">
  <style>
    .ramecek-obal {background: url(/files/vice-obrazku/ramecek-stred.png) repeat-y; width: 160px; padding: 10px 20px; position: relative;}
    .posicovany {background: url(/files/vice-obrazku/ramecek-vrsek.png); position: absolute; top: 0; left: 0; width: 200px; height: 20px;}
    .spodek {background: url(/files/vice-obrazku/ramecek-spodek.png); top: auto; bottom: 0}
  </style>
  <div class="ramecek-obal">
    <p>Obsah s obrázkovým rámečkem. Rámeček je řešen přes absolutně posicovaný vršek a spodek.</p>
    <p><button onclick="this.parentNode.parentNode.appendChild(this.parentNode.parentNode.getElementsByTagName('p')[0].cloneNode(true))">Přidat obsah</button></p>
    <div class="posicovany"></div><div class="posicovany spodek"></div>
  </div>
</div>