---
title: "Co je to polyfill?"
headline: "Co je to polyfill?"
description: "Polyfillem se rozumí automatické alternativní řešení, které dokáže zajistit funkčnost něčeho nepodporovaného."
date: "2014-11-07"
last_modification: "2015-11-12"
status: 1
tags: ["js", "webove-prohlizece"]
format: "html"
---

<p>Typicky se jedná o JavaScriptový kód, který pro nepodporovaný prohlížeč <b>automaticky doplní určitou funkčnost</b>, aniž by programátor musel něco dělat.</p>

<p>Technicky vzato polyfill použije nějaké horší, ale v daném prohlížeči nejlepší možné, řešení k dosažení výsledku.</p>



<h2 id="vyhody-nevyhody">Výhody a nevýhody</h2>

<p>Hlavní výhodou je použití nejlepšího možného standardisovaného řešení v nových prohlížečích bez ztráty času vytvářením dalších řešení pro nepodporované prohlížeče.</p>

<p>Největším risikem použití JS polyfillu je fakt, že daná funkce může být kvůli tomu v horších prohlížečích <b>závislá na JavaScriptu</b>, ač by šla konservativnějším řešením vytvořit jen v HTML/CSS.</p>

<p>Zde může nastat paradoxní situace, kdy pro vyšší výkon novějších rychlejších prohlížečů (zpravidla běžících na rychlejším HW) je zvoleno náročnější řešení pro staré pomalé prohlížeče na starém hardwaru.</p>

<p>Extrémní jsou potom situace, kdy se polyfill používá pro věci, co se teprve budou implementovat do prohlížečů.</p>





<h2 id="priklad">Modelový příklad polyfillu</h2>

<p>V prohlížečích <b>IE 6–8</b> nejde udělat <b>kulaté rohy</b> pomocí CSS vlastnosti <a href="/border-radius"><code>border-radius</code></a>.</p>

<p>Na výběr je následující:</p>

<ol>  
  <li>
    <p>Počítat s tím, že vytvořit čistě v CSS kulaté rohy pro tyto prohlížeče nejde, a proto se <b>v grafickém návrhu oblým rohům vyhnout</b>.</p>
  </li>

  <li>
    <p>Řídit se tím, že stránka <b>nemusí vypadat ve všech prohlížečích stejně</b>, a kulaté rohy ve starších prohlížečích oželet a v nových použít <code>border-radius</code>.</p>
  </li>

  
  <li>
    <p>Zvolit konservativní <b>řešení pomocí obrázků</b>, které bude bezproblémově fungovat i ve starých prohlížečích, jen ty nové nedostanou nejlepší možné řešení, jaké by mohly. Což není takový problém, protože jsou rychlé a běží typicky na lepším HW.</p>
  </li>
  
  <li>
    <p>Vyvinout dvě řešení – jedno pro nové prohlížeče přes <code>border-radius</code> a druhé pomocí obrázků pro ty staré.</p>
  </li>
  
  <li>
    <p>Použít polyfill <a href="http://code.google.com/p/curved-corner/downloads/detail?name=border-radius.htc"><code>border-radius.htc</code></a>, který u elementu s kulatými rohy zjistí hodnotu jeho <code>border-radius</code>u (pomocí <a href="/zjisteni-css"><code>getComputedStyle</code></a>) a kulatý roh nakreslí pomocí VML (<i>Vector Markup Language</i> – předchůdce SVG od Microsoftu).</p>
  </li>
</ol>

<p>S ohledem na různé vlivy se potom vyplatí použít některý z přístupů. Volba se typicky liší projekt od projektu.</p>


<h2 id="priklady">Příklady</h2>

<ul>
  <li><a href="/localstorage#ie7">Polyfill <code>localStorage</code> pro <b>IE 7</b></a></li>
  
  <li><a href="https://gist.github.com/eirikbacker/2864711/946225eb3822c203e8d6218095d888aac5e1748e">addEventListener polyfill pro <b>IE 6+</b></a></li>
  
  
</ul>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills">HTML5 Cross Browser Polyfills</a></li>
  
  <li><a href="http://cdn.polyfill.io/v1/docs/">Polyfill service</a> – na základě názvu prohlížeče doplní chybějící funkce</li>
  
  <li>Martin Michálek: <a href="http://www.vzhurudolu.cz/prirucka/polyfill">Polyfill</a></li>
  
  <li>Mozilla Hacks: <a href="https://hacks.mozilla.org/2014/11/an-easier-way-of-using-polyfills/">An easier way of using polyfills</a></li>
  
  <li>Todd Motto: <a href="http://toddmotto.com/polyfills-suck-use-a-featurefill-instead/">Polyfills suck, use a featurefill instead</a> – používání polyfillů ve vlastních knihovnách bez ovlivňování okolí</li>
  
  <li>The new code: <a href="http://thenewcode.com/18/Understanding-HTML5-Polyfills-Shivs-and-Shims">Understanding HTML5 Polyfills, Shivs and Shims</a></li>
</ul>