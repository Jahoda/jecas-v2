---
title: "Stylování inputu range"
headline: "Stylování <code>&lt;input type=range></code>"
description: "Jak docílit vlastního vzhledu range „slideru“."
date: "2014-11-07"
last_modification: "2023-03-13"
status: 1
tags: ["formulare", "stylovani"]
format: "html"
---

<p>Formulářový prvek <a href="/input"><code>&lt;input></code></a> dokáže s různými podobami atributu <code>type</code> nabývat různých podob.</p>

<p>Jedna z nich je i <code>&lt;input type=range></code>:</p>

<div class="live">
  <input type="range">
</div>




<p>Výchozí vzhled se liší dle prohlížečů, ale vypadá nějak takto (Chrome, Firefox, Safari):</p>

<p><img src="/files/input-range/vychozi-vzhled-inputu-range.png" alt="Výchozí vzhled inputu range" class="border"></p>


<p><img src="/files/input-range/range-ve-firefoxu.png" alt="Range ve Firefoxu" class="border"></p>


<p><img src="/files/input-range/range-v-safari.png" alt="Range v Safari" class="border"></p>









<h2 id="accent-color">Vlastnost <code>accent-color</code></h2>

<p>V Chrome a Firefoxu, dokáže <code>accent-color</code> obarvit <code>&lt;input type=range></code>. V Safari bohužel ne.</p>

<div class="live">
  <input type="range" style="accent-color: #DA3F94">
</div>


<p>Pokud stačí vzhled táhla sjednotit jen barveně se zbytkem stránky, může to být rychlé a snadné řešení.</p>







<h2 id="pokrocile">Pokročilejší stylování</h2>

<p>Nestačí-li tato drobná změna, existují další možnosti.</p>

<p>Pro <b>Chrome</b> a <b>Safari</b> jde použít následující selektory:</p>

<ul>
  <li>
    <p><code>input[type=range]::-webkit-slider-thumb</code> – style ukazatele</p>
  </li>
  <li>
    <p><code>input[type=range]::-webkit-slider-runnable-track</code> – styl pozadí</p>
  </li>
</ul>

<p>Podmínkou, aby stylování fungovalo je <i>vypnout</i> <a href="/appearance"><code>appearance</code></a>:</p>

<pre><code>input[type=range],
input[type=range]::-webkit-slider-runnable-track,
input[type=range]::-webkit-slider-thumb {
    appearance: none;
}</code></pre>

<p>Výsledek potom může být následující:</p>

<div class="live">
  <style>
    .custom-range input[type=range],
    .custom-range input[type=range]::-webkit-slider-runnable-track,
    .custom-range input[type=range]::-webkit-slider-thumb {
        appearance: none;
    }
    
    .custom-range input[type=range] {
      background: transparent;
    }

    .custom-range input[type=range]::-webkit-slider-runnable-track {
        background: #DCDCDC;
        border-radius: 12px;
        height: 12px;
    }

    .custom-range input[type=range]::-moz-range-track {
        background: #DCDCDC;
        border-radius: 12px;
        height: 12px;
    }    

    .custom-range input[type=range]::-webkit-slider-thumb {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        border: 5px solid #fff;
        background: #00B873;
        box-shadow: 0 0 0 1px #DCDCDC;
        position: relative;
        top: -8px;
    }  

    .custom-range input[type=range]::-moz-range-thumb {
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        border: 5px solid #fff;
        background: #00B873;
        box-shadow: 0 0 0 1px #DCDCDC;
        position: relative;
        top: -8px;
    }      
  </style>
  <div class="custom-range">
    <input type="range" style="width: 150px">
  </div>
</div>

<p><a href="http://kod.djpw.cz/izid">Samostatná živá ukázka</a></p>

<p>Ukázka <b>nefunguje</b> ve <b>Firefoxu</b>, ten má pro stylování vlastní selektory:</p>

<ul>
  <li>
    <p><code>input[type=range]::-moz-range-track</code></p>
  </li>
  
  <li>
    <p><code>input[type=range]::-moz-range-thumb</code></p>
  </li>
</ul>

<p>Pozor, není možné je spojit dohromady. Pokus o něco jako:</p>

<pre><code>input[type=range]::-moz-range-track,
input[type=range]::-webkit-slider-runnable-track {
}</code></pre>

<p>Způsobí nefunkčnost v <b>Chrome</b> a <b>Safari</b>.</p>


<p>Řešení je tak kód zduplikovat nebo použít nějaký <a href="/preprocesory">CSS preprocesor</a>, co problém s duplicitou vyřeší.</p>

<p><a href="http://kod.djpw.cz/lzid">Samostatná živá ukázka</a> – funkční v <b>Chrome</b>, <b>Firefoxu</b>, <b>Safari</b>, <b>Edge</b></p>


<div class="external-content">
  <ul>
    <li>
      <a href="https://range-input-css.netlify.app">range-input.css</a> – generátor CSS pro vlastní styl range
    </li>
  </ul>
</div>


<h2 id="ie">Internet Explorer</h2>

<p>Potřebujete-li řešit stylování i v <b>IE</b>, jde to tam přes další <a href="/css-prefixy">prefixované</a> vlastnosti:</p>

<pre><code>input[type=range]::-ms-track {}
input[type=range]::-ms-fill-lower {}
input[type=range]::-ms-fill-upper {}
input[type=range]::-ms-thumb {}</code></pre>



<h2 id="dalsi">Další stylování</h2>

<p>Ještě pár věcí jde <i>vymáčknout</i> z CSS pro stylování range:</p>


<h3 id="vertikalni">Vertikální</h3>

<div class="live">
  <input type="range" orient="vertical" style="appearance: slider-vertical">
</div>


<h3 id="popisky">Popisky</h3>

<p>Přes <a href="/datalist"><code>&lt;datalist></code></a> jde dodělat popisky:</p>

<div class="live">
  <div>
    <datalist id="values">
      <option value="0"></option>
      <option value="25"></option>
      <option value="50"></option>
      <option value="75"></option>
      <option value="100"></option>
    </datalist>    
    <input type="range" style="width: 150px" list="values">
  </div>
</div>

<p><a href="http://kod.djpw.cz/pzid">Samostatná živá ukázka</a></p>

<p>Zdá se ale, že pokročilejší stylování obsahu v <code>&lt;datalist></code> není možné v <b>Safari</b>.</p>


<h2 id="shadow-dom">Shadow DOM</h2>

<p>Pro stylování range (a i obecně) si doporučuji zapnout ve <a href="/vyvojarske-nastoje">vývojářských nástrojích</a> <b>Shadow DOM</b>.</p>

<p>Do nastavení se jde dostat klávesou <kbd>F1</kbd> při otevřených DevTools.</p>

<p><img src="/files/input-range/shadow-dom.png" alt="Shadow DOM" class="border"></p>

<p>Výsledek to má tento:</p>

<p><img src="/files/input-range/zobrazeni-shadow-domu.png" alt="Zobrazení Shadow DOMu" class="border"></p>



<h2 id="js">JavaScript</h2>

<p>Nestačí-li tyto možnosti stylování, nezbývá, než použít JS.</p>

<p>Doporučil bych v takovém případě vycházet z nativního <code>&lt;input type=range></code> a JavaScriptem pouze doplnit potřebnou funkcionalitu.</p>

<p>Možná se to nezdá, ale prvek range má poměrně dost funkcionality, kterou by bylo třeba doprogramovat. Focus, ovládání klávesnicí atd.</p>


<p>Osvědčené čistě JS řešení je <a href="https://github.com/leongersen/noUiSlider">noUiSlider</a>:</p>

<p><img src="/files/input-range/nouislider.png" alt="noUiSlider" class="border"></p>

<p>Docela zajímavě vypadá <a href="https://github.com/yairEO/ui-range">UI-Range</a>, který se snaží většinu věcí řešit přes CSS.</p>


<p><img src="/files/input-range/ui-range.png" alt="UI-Range" class="border"></p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range">&lt;input type="range"></a>
  </li>
  <li>
    <a href="http://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/">Styling Cross-Browser Compatible Range Inputs with CSS</a>
  </li>
  <li>
    <a href="http://brennaobrien.com/blog/2014/05/style-input-type-range-in-every-browser.html">How to Style Input Type Range in Chrome, Firefox, and IE</a>
  </li>
  
<li><a href="https://github.com/darlanrod/input-range-scss">Styling Cross-Browser Compatible Range Inputs with Sass / SCSS</a></li>
  
  <li><a href="https://sipsandbits.com/2020/10/21/create-a-nice-looking-input-range-with-only-css/">Create a nice-looking input range with only CSS!!</a></li>
</ul>



