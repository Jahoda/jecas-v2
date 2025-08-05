---
title: "Vylepšené stylování checkboxů"
headline: "Pokročilé stylování <code>checkbox</code>u"
description: "Díky <a href='/css-selektory#checked'>selektoru <code>:checked</code></a> lze v podporujících prohlížečích (Explorer 9 a novější) vytvářet zaškrtávací <code>&lt;input></code>y neotřelé podoby."
date: "2013-06-10"
last_modification: "2013-06-11"
status: 1
tags: ["css", "hotova-reseni", "stylovani"]
format: "html"
---

<p>Stačí k tomu pouze CSS. Kromě selektoru <code>:checked</code> se využívá <a href='/transition'>přechodů pomocí <code>transition</code></a> (IE 10+). Podobného efektu jako u <code>checkbox</code>u lze docílit i u <a href="/input#type-radio"><code>&lt;input type=radio></code></a>.

<!-- Kód ukázky -->
<style>
/* koule */
label.koule {width: 50px; height: 20px; display: block; border: 1px solid #000; border-radius: 25px; padding: 5px; cursor: pointer; background: #fff}
.koule .status {width: 20px; height: 20px; display: block; background: red; border-radius: 50%; transition: all .2s; }
input:checked + label.koule .status {background: green; margin-left: 30px}
input:focus + label.koule {outline: #000 dotted 1px}

/* zapnuto/vypnuto */
.zapvyp .status {width: 120px; display: block; border: 1px solid #000; cursor: pointer; background: #fff}
.zapvyp .indicator {width: 50px; display: block; background: green; transition: all .2s; padding: 5px; text-align: center; color: #fff; font-weight: bold; font-family: "Arial"; line-height: 100%}
.zapvyp .indicator:after {content: "ano";}

input:checked + label.zapvyp .indicator {background: red; margin-left: 60px;}
input:checked + label.zapvyp .indicator:after {content: "ne"}
input:focus + label.zapvyp > .status {outline: #000 dotted 1px}
</style>

<h2>Ukázky</h2>
<p class=live>(Jen pro test, že se řádně zaškrtává) <input type='checkbox' id='test'><label id='label' for='test' class='koule'><span class='status'></span></label>

<p class=live>
<input type='checkbox' id='test2' style='position: absolute; left: -9999px'><label id='label' for='test2' class='zapvyp'><span class='caption'>Souhlasíte?</span> <span class='status'><span class='indicator'></span></span></label>
<!-- / konec ukázky -->

<h2 id=jak>Jak to funguje?</h2>
<ol>
<li>Skryje se skutečný <code>checkbox</code>/<code>radio</code>,
<li><b>vedle</b> něj v kódu se umístí <i>atrapa</i>,
<li>atrapa <b>musí být</b> tvořena značkou <code>&lt;label></code> (nebo být uvnitř <code>&lt;label></code>u<!-- společně se zaškrtávátkem -->),
<li>lze ji při zaškrtnutí stylovat jako <code>input:checked + .atrapa {}</code>.
</ol>

<p>Podstatné je, aby se bylo <i>jak dostat</i> ze skutečného formulářového prvku na atrapu, tj. aby šlo použít selektor přímého (<code>E + F</code>) nebo <a href='http://jecas.cz/css-selektory#libovolny-sourozenec'>libovolného sourozence</a> (<code>E ~ F</code>).

<h2 id=problemy>Problémy</h2>
<p>Kromě toho, že je funkčnost zdejšího řešení zatím omezená napříč prohlížeči, je potřeba uvážit, zda uživatel pochopí, jak to celé funguje. <b><a href='http://webylon.info/'>Chamurappi</a></b> se na diskusi JPW <a href='http://diskuse.jakpsatweb.cz/?action=vthread&forum=7&topic=149325#7'>zajímavě vyjádřil</a> ohledně risik spojených s řádným pochopením těchto ovládacích prvků z pohledu uživatele. A zároveň dobře zformuloval konkrétní řešení pro starší prohlížeče (níže).

<h2 id=fallback>CSS a JS fallback</h2>
<p>Výše uvedená ukázka je relativně funkční od Exploreru 9 (s přechodovou animací od IE 10), pro starší prohlížeče ji tedy nezbývá než vypnout nebo funkčnost doplnit JavaScriptem.

<h3 id=css>CSS</h3>
<p>Stačí využít nějaký <a href='/css-selektory'>selektor</a>, který funguje shodně s <code>:checked</code> až od IE 9.
<p>Například by šlo použít <a href='/css-selektory#korenovy'>kořenový selektor</a> (<code>:root</code>).
<pre><code>.atrapa {display: none}
:root .atrapa {display: block}
:root input.checkbox-ke-skryti {display: none}</code></pre>

<h3 id=js>JavaScript</h3>
<p>Javascriptový fallback, který by atrapu nerušil, by vypadal tak, že by se přidal <code>onclick="this.className = this.checked ? 'checked' : '';"</code> a krom pseudotřídy <code>:checked</code> by se atrapa chytala i třídy <code>.checked</code>.</p>

<h3 id=kombinace>Kombinace</h2>
<p>Oba fallbacky je možné zkombinovat a atrapy vypínat jen v prohlížečích starších než IE 9 bez zapnutého JavaScriptu.
<pre><code>.atrapa {display: none}
:root .atrapa, 
<b>.js</b> .atrapa {display: block}

:root input.checkbox-ke-skryti, 
<b>.js</b> input.checkbox-ke-skryti {display: none}</code></pre>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="/vzhled-formularu">Stylování formulářů</a></li>
  <li><a href="http://fronteed.com/iCheck/">iCheck</a> — JS atrapa <code>radio</code> a <code>checkbox</code> <a href="/input"><code>&lt;input></code>ů</a></li>
  <li><a href="http://abpetkov.github.io/switchery/">Switchery</a> — JS atrapa checkboxů ve stylu iOS 7</li>
  
  <li><a href="http://codepen.io/mallendeo/pen/eLIiG">Různé efekty přepínání</a></li>
  
  <li><a href="http://codepen.io/maturo/pen/dxAhE">Switch Button #2</a></li>
</ul>

<!-- Ukázka: http://kod.djpw.cz/rjsb -->