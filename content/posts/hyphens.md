---
title: "CSS hyphens"
headline: "CSS <code>hyphens</code>"
description: "Vlastnosti <code>hyphens</code> ovlivňuje rozdělování slov spojovníkem na konci řádku."
date: "2013-11-29"
last_modification: "2013-11-29"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>V HTML je možné určitými znaky vytvořit uprostřed slova místo, kde se může <b>zalomit řádek</b> uprostřed slova.</p>

<ul>
  <li>entitou <code>&amp;shy;</code>,</li>
  <li>číselnou entitou <code>&amp;#173;</code>,</li>
  <li>číselnou entitou <code>&amp;#8203;</code>,</li>
  <li>další mezery jsou na <a href="http://en.wikipedia.org/wiki/Space_(punctuation)#Spaces_in_Unicode">Wikipedii</a>.</li>
</ul>

<pre><code>&lt;p>
  Text odstavce, který se může za<b>&amp;shy;</b>lo<b>&amp;shy;</b>mit uprostřed slova „zalomit“.
&lt;/p></code></pre>

<p>CSS vlastnost <code>hyphens</code> může nabývat hodnoty:</p>

<dl>
  <dt id="none"><code>none</code></dt>
  <dd>Prohlížeč bude <i>příležitosti k zalomení</i> (např. entitu <code>&amp;shy;</code> uprostřed slova) ignorovat.</dd>

  <dt id="manual"><code>manual</code></dt>
  <dd><b>Výchozí</b> hodnota. Slova se zalamují v místech, kde je <i>příležitost</i> vytvořená zalamovací entitou.</dd>

  <dt id="auto"><code>auto</code></dt>
  <dd>Prohlížeč může slovo rozdělit spojovníkem, kde <b>uzná za vhodné</b>. Prohlížeče, které umí rozdělovat slo-va po slabikách, při nastavení <code>hyphens: auto</code> toto rozdělování <i>zapnou</i> i bez nutnosti zanést kód <b>rozdělovacími entitami</b>.</dd>  
</dl>

<p>Zajímavá je kombinace <code>hyphens: auto</code> s <code>text-align: justify</code> (zarovnání do bloku). Výsledný text vypadá lépe, protože <b>zalamování slov</b> nevytváří takové <i>řeky</i> (nepěkně velké mezery mezi slovy).</p>

<h2 id="podpora">Podpora</h2>
<p>Momentálně nejlepší podpora (s <a href="/css-prefixy">prefixy</a>) pro český text je v <b>IE 10</b> a <b><a href="/ie11">IE 11</a></b>. <b>Opera</b> a <b>Chrome</b> nastavení <code>hyphens</code>, zdá se, ignoruje. A ve <b>Firefoxu</b> se u češtiny chová <code>manual</code> i <code>auto</code> stejně (v jiných jazycích rozdělovat umí).</p>

<p><a href="http://kod.djpw.cz/kwt">Živá ukázka</a> (zdroj <a href="/lipsum"><i>českého</i> lipsum textu</a>), varianta <a href="http://kod.djpw.cz/pwt">zarovnaná do bloku</a>.</p>

<h2 id="doporuceni">Doporučení</h2>
<p>Příliš nedoporučuji <b>zanášet kód entitami pro rozdělování</b>. Může to způsobit problém při <b>hledání slov na stránce</b>, při <b>kopírování textu</b> nebo (možná) u <b>vyhledávačů</b> (související diskuse <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=13&amp;topic=104038">Má někdo zkušenosti s entitou shy?</a>).</p>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li>W3C: <a href="http://dev.w3.org/csswg/css-text/#hyphens">CSS specifikace <code>hyphens</code></a></li>
  <li><a href="http://code.google.com/p/hyphenator/">Hyphenator</a> (JS doplňující entity <code>&amp;shy;</code>)</li>
</ul>