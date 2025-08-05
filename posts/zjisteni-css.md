---
title: "Zjištění CSS hodnot v JavaScriptu"
headline: "Zjištění výsledného CSS v JavaScriptu"
description: "Jak v JavaScriptu zjistit výslednou hodnotu libovolné CSS vlastnosti určitého elementu."
date: "2014-01-24"
last_modification: "2014-10-03"
status: 1
tags: ["css", "hotova-reseni", "js"]
format: "html"
---

<p>V některých případech je potřeba v JS <i>spočítat</i> výsledné hodnoty CSS vlastností nějakého elementu. To se může hodit třeba při tvorbě <b>universálního JS + CSS řešení</b>, kdy nelze spoléhat na výchozí CSS, ale zase je nemůžeme natvrdo přenastavit.</p>

<p>Zatímco pro nastavování CSS vlastností z JavaScriptu stačí jen z názvů CSS vlastností vhodit spojovník a následující písmeno zvětšit:</p>

<pre><code>element.style.cssVlastnost = "její hodnota";
element.style.backgroundColor = "red";</code></pre>

<p>Nebo veškeré CSS zapsat do <code>cssText</code>u.</p>

<pre><code>element.style.cssText = "
  css-vlastnost: 'její hodnota'; 
  background-color: 'red'
";</code></pre>

<p>Při <b>čtení stylu</b> skriptem je to komplikovanější.</p>

<pre><code>&lt;style>
  div {color: red}
&lt;style>
&lt;div>&lt;/div>
&lt;script>
  alert(
    document.getElementsByTagName("div")[0].style.color
  );
&lt;/script></code></pre>

<p>Tento kód nevyhodí v <code>alert</code>u hodnotu <code>red</code>, jak by se mohlo očekávat. <a href="http://kod.djpw.cz/tlbb">Ukázka</a>.</p>

<h2 id="reseni">Řešení</h2>
<p>Co tedy s tím? Existují vlastnosti <code>getComputedStyle</code> a do <b>IE 8</b> <code>currentStyle</code>. Ve starších <b>IE</b> je ještě drobná odlišnost v tom, že potřebuje název CSS vlastnosti v <i>camelCase</i> a ne <i>se-spojovníkem</i>.</p>

<p>Funkce sjednocující prohlížeče může vypadat následovně:</p>

<!--<pre><code>function getStyle(oElm, strCssRule) {
  var strValue = "";
  if (document.defaultView &amp;&amp; document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}</code></pre>-->

<pre><code>function getStyle(oElm){
    return window.getComputedStyle ? getComputedStyle(oElm, "") : oElm.currentStyle;
}</code></pre>

<h3 id="pouzit">Použití</h3>
<pre><code>var div = document.getElementsByTagName("div")[0];
var sktuecnyRamecek = getStyle(div).border;</code></pre>

<!--
<p><a href="http://kod.djpw.cz/wlbb">Živá ukázka</a>.</p>
-->

<p><a href="http://kod.djpw.cz/gobb">Živá ukázka</a></p>

