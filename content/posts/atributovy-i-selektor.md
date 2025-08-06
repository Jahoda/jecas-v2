---
title: "Atributový case-insensitive selektor"
headline: "Atributový case-insensitive selektor"
description: "Pomocí příznaku <code>i</code> jde zapsat atributový selektor nezávislý na velikosti písmen."
date: "2016-03-17"
last_modification: "2016-03-19"
status: 1
tags: ["css", "selektory-css"]
format: "html"
---

<p>Při stylování HTML pomocí CSS musí odpovídat velikosti písmen v HTML atributu a CSS selektoru.</p>

<p>Element <code>&lt;div class="trida"></code> jde zaměřit selektorem <code>.trida</code>, ale už ne třeba přes <code>.TRIDA</code>. Toto chování jde v případě <a href="/css-selektory#atributovy">atributového selektoru</a> změnit:</p>

<pre><code>div[class="TrIdA" <b>i</b>] {
  /* styly */
}</code></pre>



<p>Výše uvedené styly se v podporovaných prohlížečích aplikují na <code>&lt;div class="trida"></code>, <code>&lt;div class="TRIDA"></code> a podobně.</p>

<p><a href="https://kod.djpw.cz/nmvb">Živá ukázka</a></p>





<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Příznak <code>i</code> začaly podporovat prohlížeče <b>Chrome 49</b> a <b>Opera 36</b>.</p>



<h3 id="kompatibilita">Zpětná kompatibilita</h3>

<p>V nepodporovaných prohlížečích se tato konstrukce chová jako syntaktická chyba a celá deklarace se zahodí. Vše se zahodí i v případě, že se k selektoru napíše něco podporovaného:</p>

<pre><code>div[class="TRIda" i],
.trida {
    color: red;
}</code></pre>





<p>Ani v tomto případě nebude mít <code>&lt;div class="trida"></code> červenou barvu.</p>




<h2 id="vyuziti">Využití</h2>

<p>Na první pohled se nezávislost na velikosti písmen u atributového selektoru zdá jako poměrně nepotřebná věc. Těžko najít důvod proč by dodržování jednotné velikosti písmen bylo problematické.</p>


<p>V případě jednoduchého <a href="/css-vyhledavani">vyhledávání/filtrování dat v CSS</a>, kdy jsou klíčová slova v <code>data-*</code> atributu a filtruje se pomocí CSS selektoru, může ale příznak <code>i</code> usnadnit trochu práce:</p>

<pre><code>[data-slova*="fytopuf" i]</code></pre>



<p>Výše uvedený selektor zaměří element:</p>

<pre><code>&lt;span data-slova="Fytopuf je nejlepší"></code></pre>



<p>A stejně tak i:</p>

<pre><code>&lt;span data-slova="Kupte si fytopuf"></code></pre>



<h3 id="hack">Hack</h3>

<p>Druhá možnost je <a href="/hacky">hackování</a> chování prohlížečů. K selektoru s <code>i</code> jde uvést pravidla, která budou nepodporované prohlížeče ignorovat.</p>