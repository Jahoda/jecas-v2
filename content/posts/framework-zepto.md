---
title: "Framework Zepto.js"
headline: "JavaScriptový framework Zepto.js"
description: "Odlehčená JS knihovna nabízející základní funkce jQuery ve zmenšené podobě."
date: "2013-05-15"
last_modification: "2013-05-15"
status: 1
tags: ["js", "knihovny"]
format: "html"
---

<p><img src='/files/framework-zepto/zepto-logo.png' alt='Zepto.js' width='500'></p>







<p>Je-li potřeba na stránce při jejím <em>oživování</em>  využívat nějakou „nadstavbu“ JavaScriptu (typicky pro zkrácené zaměřování elementů pomocí <code>$("#id")</code>, používání AJAXu atd.) a stačí jen základní funkce z <a href="http://jquery.com/">knihovny jQuery</a>, může stejnou práci odvést <a href="http://zeptojs.com/">knihovna Zepto.js</a>.</p>


<p>Výhoda je, že knihovna Zepto (minifikovaná a gzipovaná) je až čtyřikrát menší než jQuery (minifikované a gzipované) a měla by tedy být rychlejší.

  
  
<p>Že má Zepto podobné API s jQuery dokládá například možnost zvolit mezi oběma knihovnami u <a href='/magnific-popup'>Magnific Popup lghtbox skriptu</a>.

  
  
<h2>Podpora Internet Exploreru</h2>

<p>Na tu Zepto vesele resignuje:
  
<blockquote>
<p><img src='/files/framework-zepto/no-ie.jpg'></p>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
<p>Jen pro moderní prohlížeče, knihovna Zepto zastává názor neopravovat chyby pravěkých „prohlížečů“</p></blockquote>
<p>Ostatně i 2.x verse jQuery je určena až pro IE 9 a novější.
<p>Nicméně to nemusí být problém, Internet Explorery dostanou místo Zepto frameworku staré dobré jQuery a díky kompatibilitě by mohl web běhat jako na drátkách napříč prohlížeči.

<h2>Pořád moc velké</h2>
<p>V případě, že využijeme jen některé části frameworku, je možné si <a href="http://github.e-sites.nl/zeptobuilder/">vygenerovat variantu jen s něčím</a>.</p>
<p>Nebo rovnou <b>používat čistý JavaScript</b>. Pro pohodlné vybírání elementů může posloužit <a href="/queryselector#dolar">metoda <code>querySelector</code></a> a třeba <a href="/ajax">AJAX</a> řeší pár řádků prostého JavaScriptu.</p>