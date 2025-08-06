---
title: "Atribut media"
headline: "HTML atribut <code>media</code>"
description: "HTML atribut <code>media</code> funguje u značky <code>&lt;a></code> podobně jako Media Queries v CSS."
date: "2014-05-21"
last_modification: "2014-05-27"
status: 1
tags: ["html", "html-atributy"]
format: "html"
---

<pre><code>&lt;a href="odkaz" <b>media</b>="<i>max-width: 480px</i>">
  Odkaz bude vidět jen při šířce do 480 px
&lt;/a></code></pre>

<p>Hodnota HTML atributu <code>media</code> bude obdobná jako u <a href="/mobilni-web#media-queries">CSS pravidla <code>@media</code></a> a měla by i tak fungovat.</p>

<p><a href="https://kod.djpw.cz/cndb">Živá ukázka</a></p>


<h2 id="podpora">Podpora</h2>

<p>Bohužel zatím neznám prohlížeč, kde by atribut <code>media</code> fungoval.</p>


<h2 id="vyuziti">Využití</h2>

<p>Do jisté míry by takto šly řešit <a href="/responsivni-obrazky">responsivní obrázky</a> a jejich <b>datová optimalisace</b>. Na stránce by bylo víc obrázků s obrázky a <i>media queries</i> by zařídily zobrazení (načtení) jen toho, který <b>nejlépe vyhovuje</b> cílovému zařízení.</p>

<pre><code>&lt;a href="maly-obrazek.png" media="<b>max</b>-width: 480px">
  &lt;img src="maly-obrazek.png">
&lt;/a>
&lt;a href="velky-obrazek.png" media="<b>min</b>-width: 480px">
  &lt;img src="velky-obrazek.png">
&lt;/a>
</code></pre>

<p>Taktéž by tento mechanismus mohl sloužit k <i>opodmínkování</i> odkazu na <b>mobilní versi webu</b> nebo naopak na <i>velký</i> web.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-media">Atribut media u značky <code>&lt;a></code></a></li>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries">CSS media queries</a></li>
</ul>