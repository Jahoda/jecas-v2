---
title: "Object-fit"
headline: "Object-fit"
description: "CSS vlastnost <code>object-fit</code> umí přizpůsobit obrázek pevné velikosti."
date: "2015-01-21"
last_modification: "2018-09-13"
status: 1
tags: ["css", "css-vlastnosti", "obrazky"]
format: "html"
---

<p>Pokud na stránce má být něco jako <b>mřížka z obrázků</b> a obrázky jsou různě velké, vlastnost <code>object-fit</code> přináší jednoduché a elegantní řešení.</p>

<p>Bez <code>object-fit</code> si je někdy možné vystačit s nastavení pouze jednoho rozměru (šířky nebo výšky) s tím, že druhý se <b>dopočítá</b> – tak je možné alespoň <b>zachovat poměr stran</b>.</p>

<p><a href="http://kod.djpw.cz/dmoc">Živá ukázka</a></p>




<p>Pokud by se nastavil <b>pevný rozměr</b> pro každý obrázek, <b>deformace</b> by byla značná:</p>

<p><a href="http://kod.djpw.cz/emoc">Živá ukázka</a></p>
<!-- http://kod.djpw.cz/cmoc -->




<h2 id="vlastnost">Vlastnost <code>object-fit</code></h2>

<p>CSS vlastnost <code>object-fit</code> má několik hodnot – jsou hodně podobné jako <a href="/obrazkove-pozadi"><code>background-size</code></a>.</p>

<p>Za <code>&lt;img></code> obrázkem může prosvítat jeho pozadí nastavené standardně přes:</p>

<pre><code>img {background: <b>barva</b>}</code></pre>

<div class="live no-source">
  <script>
    function objectFit(hodnota) {
      var styl = ".obrazky img {object-fit: " + hodnota + "; -o-object-fit: " + hodnota + "; width: 180px; height: 150px}";
      document.getElementById("obrazky").innerHTML = styl;
    }
  </script>
  <style>
    .obrazky {overflow: hidden}
    .obrazky img {float: left; background: #efefef; outline: 1px solid #fff}
  </style>
  <style id="obrazky">    
    
  </style>
  <div class="obrazky">
    <img src="http://kod.djpw.cz/i/100x200">
    <img src="http://kod.djpw.cz/i/200x150">
    <img src="http://kod.djpw.cz/i/100x100">
  </div>
</div>

<dl>
  <dt id="fill"><code>object-fit: fill</code></dt> 
  <dd>
    <p><button onclick="objectFit('fill')">Nastavit</button> Obrázek se roztáhne (a případně zdeformuje) dle zadaných rozměrů. Jako při prostém nastavení <code>width</code> a <code>height</code>.</p>
    
  </dd>
  
  <dt id="contain"><code>object-fit: contain</code></dt>  
  <dd>
    <p><button onclick="objectFit('contain')">Nastavit</button> Obrázek si zachová poměr stran a roztáhne se tak, aby byl alespoň přes celou <b>jednu stranu</b>. Může se tedy zmenšit i zvětšit.</p>
  </dd> 
  
  <dt id="scale-down"><code>object-fit: scale-down</code></dt>  
  <dd>
    <p><button onclick="objectFit('scale-down')">Nastavit</button> Chová se hodně podobně jako <code>contain</code> – zachovává poměr stran, ale nezvětšuje obrázek <b>nad jeho skutečné rozměry</b>.</p>
  </dd>   
  
  <dt id="cover"><code>object-fit: cover</code></dt>  
  <dd>
    <p><button onclick="objectFit('cover')">Nastavit</button> Asi nejzajímavější hodnota. Přizpůsobí obrázek tak, že bude vyplněn <b>celý prostor</b>. Bude tedy zvětšen nebo zmenšen Kromě toho je obrázek zarovnán na střed.</p>
  </dd>   
  
  <dt id="none"><code>object-fit: none</code></dt>  
  <dd>
    <p><button onclick="objectFit('none')">Nastavit</button> Podobné chování jako <code>cover</code>, jen obrázek zůstane v <b>původní velikosti</b>.</p>
  </dd>     
</dl>

<p><a href="http://kod.djpw.cz/amoc">Samostatná živá ukázka</a> s použitím <code>object-fit: contain</code></p>


<h2 id="podpora">Podpora v prohlížečích</h2>

<ul>
  <li><b>Chrome 31</b>,</li>
  <li><b>Firefox 36</b>,</li>
  <li><b>Safari 7.1</b>,</li>
  <li><b>Edge 16</b> (pouze na značce <code>&lt;img></code>)</li>
  <li><b>Opera 12</b> s prefixem <code>-o-</code> (nefunguje úplně korektně)</li>
</ul>

<p>Pro starší prohlížeče existuje <a href="/polyfill">polyfill</a>, ale je poměrně datově velký.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/anselmh/object-fit">object-fit</a></li>
  </ul>
</div>

<p>Funkcionalitu <code>object-fit</code> lze s dobrou podporou v prohlížečích suplovat nahrazením <code>&lt;img></code> obrázku za CSS pozadí a <code>background-size</code>.</p>

<pre><code>&lt;style>
.obrazek {
  display: block;
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
}
&lt;/style>
&lt;div class="obrazek" style="background-image: url(obrazek.jpg)">&lt;/div></code></pre>



<p><a href="http://kod.djpw.cz/fmoc">Živá ukázka</a></p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="https://css-tricks.com/on-object-fit-and-object-position/">A Quick Overview of `object-fit` and `object-position`</a></li>
</ul>

<!--
<h2 id="bez">Řešení bez <code>object-fit</code></h2>

-i-l-u-s-t-r-a-c-e: http://kod.djpw.cz/gsjb
-->