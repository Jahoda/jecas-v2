---
title: "Záznamy z SQL za poslední hodinu, den, měsíc"
headline: "Záznamy z SQL za poslední hodinu, den, měsíc"
description: "Jak vybrat z SQL databáse záznamy za poslední minutu, hodinu, den, týden, měsíc atd."
date: "2014-05-02"
last_modification: "2014-05-02"
status: 1
tags: ["sql"]
format: "html"
---

<p>Při psaní aplikace <b>využívající databási</b> (např. MySQL) se dřív nebo později setkáme s potřebou vypisovat data za určité období do minulosti.</p>

<p>Vytvořit si požadované <b>datum pro porovnávání</b> je sice možné například v PHP, ale jako <b>elegantnější řešení</b> se mi jeví použití <code>SUBDATE</code>, <code>NOW</code> a <code>INTERVAL</code> přímo v SQL.</p>

<p>Funkce <code>SUBDATE</code> odečte od aktuálního data (<code>NOW</code>) stanovený interval.</p>

<p>Interval se zadává pomocí čísla a klíčového slova pro časový úsek (<code>MINUTE</code>, <code>HOUR</code>, <code>DAY</code>, <code>YEAR</code>). Pozor, klíčové slovo je <b>vždy v jednotném čísle</b>, tedy ne <code>DAY<b>S</b></code>, <code>HOUR<b>S</b></code> a podobně.</p>

<h2 id="minuta">Za poslední minutu</h2>
<pre><code>SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL <b>1 MINUTE</b>)</code></pre>

<h2 id="hodina">Za poslední hodinu</h2>
<pre><code>SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL <b>1 HOUR</b>)</code></pre>

<h2 id="den">Za poslední den (24 hodin)</h2>
<pre><code>SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL <b>1 DAY</b>)</code></pre>

<h2 id="mesic">Za poslední měsíc</h2>
<pre><code>SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL <b>1 MONTH</b>)</code></pre>

<h2 id="rok">Za poslední rok</h2>
<pre><code>SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL <b>1 YEAR</b>)</code></pre>

<p>V případě, že je potřeba vypsat záznamy <i>za poslední měsíc</i> a tabulka obsahuje i <b>záznamy s datem v budoucnosti</b> (vyšším než aktuálním) – třeba u článků, které mají teprve vyjít, je potřeba <b>použít <code>BETWEEN</code></b>.</p>

<pre><code>SELECT * FROM tabulka
WHERE datum BETWEEN <b>NOW()</b> AND SUBDATE(NOW(), INTERVAL <b>1 DAY</b>)</code></pre>


<h2 id="nasledujici-den">Následující den</h2>

<p>Někdy je naopak potřeba vypsat záznamy, které mají datum v <b>následujícím období</b>. I tady už je nutné použít <code>BETWEEN</code> a záporný <code>INTERVAL</code>.</p>

<pre><code>SELECT * FROM tabulka
WHERE datum BETWEEN <b>NOW()</b> AND SUBDATE(NOW(), INTERVAL <b>-1 DAY</b>)</code></pre>

