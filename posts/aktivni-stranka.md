---
title: "Je stránka aktivní?"
headline: "Je stránka aktivní?"
description: "Zjišťování, jestli je stránka aktivní a zda návštěvník něco dělá."
date: "2014-01-19"
last_modification: "2014-04-05"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Na stránce, kde funguje <a href="/ajax">AJAXové</a> <b>automatické načítání obsahu</b> (typicky kontrola, zda něco nového nepřibylo) může být užitečné zjišťovat, zda je <b>stránka aktivní</b> nebo ne.</p>

<p>A podle toho následně upravovat <b>frekvenci kontrol</b> nového obsahu; při evidování <b>online statusu</b> považovat uživatele za <i>nečinného</i> a podobně.</p>



<h2 id="reseni">Hotové řešení</h2>

<div class="external-content">
  <ul>
  <li><a href="http://serkanyersen.github.io/ifvisible.js/">Ifvisible.js</a> — hotový nástroj pro testování „nečinnosti“ / aktivované stránky</li>
</ul>
</div>

<p>Na nejnižší úrovni jde <a href="/aktivovani-okna">aktivování/deaktivování</a> detekovat na základě JS událostí <code>blur</code> a <code>focus</code>.</p>