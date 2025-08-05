---
title: "Diakritika v názvu třídy"
headline: "Speciální znaky v atributu <code>class</code>"
description: "Co takhle psát názvy tříd v HTML a CSS hezky česky s diakritikou. Funguje to?"
date: "2013-06-13"
last_modification: "2013-06-13"
status: 1
tags: ["css", "html"]
format: "html"
---

<p>V dnešních prohlížečích fungují jako názvy tříd prakticky všechny znaky s výjimkou těch, které se používají jako řídicí v CSS (<code>.#{}(),;/*~></code> a podobně).

<p>Ve standardním režimu jsou ještě nefunkční <b>názvy tříd začínající číslicí</b>. V quirku v Explorerech a starších Operách funguje i to.

<pre><code>&lt;style>
.růžovoučký {background: pink; font-size: small}
&lt;/style>
&lt;p class=růžovoučký>Růžovoučký odstaveček</code></pre>

<style>
.content .růžovoučký {background: pink; font-size: small}
</style>
<p class='live růžovoučký'>Růžovoučký odstaveček

<p>Lepší bizarnosti ale začínají s dalšími speciálními znaky:
<ol><li>Co třeba stylové pojmenování třídy stylující částku v EUR?
<pre><code>.€ {color: blue}</code></pre>
<li>Nebo pojmenování stylu pro vypsání teploty?
<pre><code>&lt;span class=<b>°C</b>>21 °C&lt;/span></code></pre>
<li>Proč používat pro zarovnání zdlouhavé třídy <code>left</code> nebo <code>right</code>?
<pre><code>.<b>←</b> {text-align: left}
.<b>→</b> {text-align: right}</code></pre>
<li>Podtrhávání odteď zásadně:
<pre><code>.<b>_</b> {text-decoration: underline}</code></pre>
<li>A třída pro citace může vypadat:
<pre><code>&lt;p class=<b>„“</b>>Citovaný text.</code></pre>
<li>A nakonec třeba třída bez třídy (pomocí nedělitelné mezery):
<pre><code>. {padding: 1em}</code></pre>
<pre><code>&lt;p class= >Odstavec s paddingem.</code></pre>
</ol>

<p>Přestože to hezky funguje, asi není ideální takto třídy zapisovat. Jednak to může zaskočit HTML/CSS editor při obarvování syntaxe a jednak to může zaskočit člověka, co bude s kódem chtít pracovat, obzvláště nebude-li umět zapsat některé <a href="/ceska-klavesnice">speciální znaky</a>.

<h2 id=test>Test</h2>
<p>Pokud daná třída funguje, <font color=green>bude zelená</font>.
<style type='text/css'>
.zlutoucka {color: green}
.1 {color: green}
.1zlutoucka {color: green}
.žluťoučká {color: green}
.1žluťoučká {color: green}
.1_žluťoučká—třída {color: green}
.zlut666oucka {color: green}
.žluťo„uč“ká—třída {color: green}
.žluťoučká-třída {color: green}
._žluťoučká—třída {color: green}
. {color: green;}
.→ {color: green;}
.~ {color: green;}
._ {color: green;}
.° C {color: green;}
.€ {color: green;}
.÷× {color: green;}
.= {color: green;}
.. {color: green;}
.# {color: green;}
.() {color: green;}
</style>

<ul>
<li class='zlutoucka'>Zadaná třída je „<code>zlutoucka</code>“.  
<li class='1'>Zadaná třída je „<code>1</code>“.
<li class='1zlutoucka'>Zadaná třída je „<code>1zlutoucka</code>“.
<li class='žluťoučká'>Zadaná třída je „<code>žluťoučká</code>“.
<li class='1žluťoučká'>Zadaná třída je „<code>1žluťoučká</code>“.
<li class='1_žluťoučká—třída'>Zadaná třída je „<code>1_žluťoučká—třída</code>“.
<li class='zlut666oucka'>Zadaná třída je „<code>zlut666oucka</code>“.
<li class='žluťo„uč“ká—třída'>Zadaná třída je „<code>žluťo„uč“ká—třída</code>“.
<li class='žluťoučká-třída'>Zadaná třída je „<code>žluťoučká-třída</code>“.
<li class='→'>Zadaná třída je „<code>→</code>“.
<li class= >Zadaná třída je „<code> </code>“ (tvrdá mezera).
<li class=.>Zadaná třída je „<code>.</code>“.
<li class='()'>Zadaná třída je „<code>()</code>“.
<li class='~'>Zadaná třída je „<code>~</code>“.
<li class='='>Zadaná třída je „<code>=</code>“.
<li class='_'>Zadaná třída je „<code>_</code>“.
<li class='° C'>Zadaná třída je „<code>° C</code>“.
<li class='€'>Zadaná třída je „<code>€</code>“.
<li class='÷×'>Zadaná třída je „<code>÷×</code>“.
<li class='_žluťoučká—třída'>Zadaná třída je „<code>_žluťoučká—třída</code>“.
<li class=#>Zadaná třída je „<code>#</code>“.
</ul>