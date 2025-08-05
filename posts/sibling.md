---
title: "Předchozí/další element v JavaScriptu"
headline: "Předchozí/další element v JavaScriptu"
description: "Získání následujícího nebo předchozího sourozence pomocí <code>nextSibling</code> a <code>previousSibling</code>."
date: "2015-03-15"
last_modification: "2015-05-24"
status: 1
tags: ["js", "napady"]
format: "html"
---


<h2 id="next">Následující sourozenec <code>nextSibling</code></h2>

<p>Při vyhledávání elementů pomocí JavaScriptu slouží <code>nextSibling</code> pro získání <b>následujícího sourozence</b>.</p>

<p>Problém je, že jako následující sourozenec je brán kromě HTML elementů i textový obsah.</p>


<p>Bude-li existovat násludjící kód:</p>

<pre><code>&lt;div class="prvni">1&lt;/div>
&lt;div class="druhy">2&lt;/div></code></pre>



<p>JavaScriptová konstrukce využívající <code>nexSibling</code> nezachytí element <code>.druhy</code>:</p>

<pre><code>document.querySelector(".prvni").<b>nextSibling</b>;</code></pre>

<p>V tomto případě budou zachyceny <b>bílé znaky</b> mezi elementy.</p>

<p>Dostat se na element <code>.druhy</code> by znamenalo:</p>

<ol>
  <li>
    <p>Použít <code>nextSibling</code> dvakrát:</p>
    
    <pre><code>document.querySelector(".prvni").<b>nextSibling.nextSibling</b>;</code></pre>
  </li>
  
  <li>
    <p>Zrušit bílé znaky mezi HTML značkami.</p>
    
    <pre><code>&lt;div class="prvni">1&lt;/div>&lt;div class="druhy">2&lt;/div></code></pre>
  </li>
</ol>




<h2 id="nextElementSibling">Následující element – <code>nextElementSibling</code></h2>

<p>Situaci, kdy <code>nextSibling</code> vrátí bílé znaky, řeší <code>next<b>Element</b>Sibling</code>, který bere v potaz pouze HTML elementy.</p>

<pre><code>document.querySelector(".prvni").<b>nextElementSibling</b>;</code></pre>

<p>Vlastnost <code>nextElementSibling</code> funguje od <b>IE 9</b> a pro starší prohlížeče jde doskriptovat s využitím <code>nextSibling</code>.</p>

<pre><code>var nextElementSibling = function(el) {
    do {
        el = el.nextSibling;
    } while (el &amp;&amp; el.nodeType !== 1);
    return el;
};</code></pre>






<p>Použití:</p>

<pre><code>var druhy = nextElementSibling(
  document.querySelector(".prvni")
);</code></pre>

<p><a href="http://kod.djpw.cz/mjnb">Živá ukázka</a></p>








<h2 id="prev">Předchozí – <code>previousSibling</code> a <code>previousElementSibling</code></h2>

<p>Metody pro získání předchozího sourozence nebo předchozího elementu fungují obdobně jako <code>next*Sibling</code>.</p>

<pre><code>document.querySelector(".druhy").<b>previousSibling</b>;</code></pre>

<p>Případně pro získání předchozího <b>elementu</b>.</p>


<pre><code>document.querySelector(".druhy").<b>previousElementSibling</b>;</code></pre>






<h2 id="jquery">Další/předchozí v jQuery</h2>

<p>V <b>jQuery</b> existují pro předchozí a další element klíčová slova <code>prev</code> a <code>next</code> a fungují jako <code>nextElementSibling</code>/<code>previousElementSibling</code>.</p>

<p>Následující:</p>

<pre><code>$(".prvni").next();</code></pre>

<p>Předchozí:</p>

<pre><code>$(".druhy").prev();</code></pre>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling">NonDocumentTypeChildNode.nextElementSibling</a></li>
</ul>