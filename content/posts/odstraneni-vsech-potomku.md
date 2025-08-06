---
title: "Odstranění všech potomků HTML elementu"
headline: "Odstranění obsahu HTML elementu"
description: "Jak v JavaScriptu odstranit všechny potomky v určitém HTML elementu."
date: "2014-05-16"
last_modification: "2014-05-17"
status: 1
tags: ["hotova-reseni", "js", "napady"]
format: "html"
---

<p>Při vytváření HTML obsahu JavaScriptem se někdy může hodit <b>obsah celé značky vyprázdnit</b>.</p>

<pre><code>var element = document.getElementById("idecko");
element.innerHTML = "";</code></pre>

<p>Toto je asi nejjednodušší způsob, nicméně není nejrychlejší.</p>

<p><a href="http://jsperf.com/innerhtml-vs-removechild">Rychlejší postup</a> je odebírání přes metodu <code>removeChild</code>:</p>

<pre><code>while (element.firstChild) {
  element.removeChild(element.firstChild);
}</code></pre>

<p>Před snahou <b>odebírat všechny potomky</b> ještě může být dobré se zamyslet, jestli by nestačilo jenom měnit vlastnosti stávajících elmentů místo <b>odstraňování a vytváření komplet nových</b> (<code>createNode</code>/<code>appendChild</code>). To by mohlo být ještě rychlejší.</p>