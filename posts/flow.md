---
title: "Flow"
headline: "Flow"
description: "Vlastnosti <code>flow-from</code> a <code>flow-into</code> umožňují pohodlně přeskupovat obsah mezi elementy."
date: "2013-10-13"
last_modification: "2014-05-30"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<pre><code>.prvni {
  flow-into: identifikator;
}
.druhy {
  flow-from: identifikator;
}</code></pre>

<p>Tento kód zajistí, že bez <b>změny HTML kódu</b> se obsah z elementu <code>.prvni</code> přesune od elementu <code>.druhy</code>.</p>


<h2 id="podpora">Podpora</h2>

<p>Momentální podpora je špatná. V <b>Chrome</b> nějaký čás <code>flow-*</code> fungovalo (ve versích 15–18). V novějších by se měla dát zapnout podpora v <code>about:flags</code> přes položku <i>experimentální funkce Web Platform</i> (<code>chrome://flags/#enable-experimental-web-platform-features</code>). Nicméně v <b>Chrome 35</b> to k úspěchu nevedlo.</p>

<p><b>Internet Explorer</b> 10 a <a href="/ie11">11</a> podporují <i>přetékání</i> mezi elementy pouze pro značku <code>&lt;iframe></code>.</p>


<h2 id="vyuziti">Využití</h2>

<p>Při dostatečné podpoře by to pomohlo hodně při vytváření <a href="/responsive">responsivního designu</a>. Typický problém, kdy se vícesloupcový layout přeskládává do jedné <i>nudle</i>. V takovém případě musí být celé sloupce souvisle pod sebou.</p>

<p>CSS vlastnosti <code>flow-*</code> umožní přeskládat obsah klidně na přeskáčku. Tj. kus z prvního sloupce, kus z druhého a podobně.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Webdesigner Depot: <a href="http://www.webdesignerdepot.com/2013/09/introducing-css-regions/">Introducing CSS Regions</a></li>
  
  <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2013/11/05/killer-responsive-layouts-with-css-regions/">Killer Responsive Layouts With CSS Regions</a></li>
</ul>
