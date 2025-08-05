---
title: "Zaokrouhlení času"
headline: "Zaokrouhlení času"
description: "Jak v PHP zaokrouhlit čas na celé pětiminuty, čtvrthodiny nebo půlhodiny."
date: "2016-02-26"
last_modification: "2016-03-05"
status: 1
tags: ["hotova-reseni", "php"]
format: "html"
---

<p>Při vypisování času může být běžný aktuální čas zbytečně přesný.</p>

<div class="live no-source">Čas: 15.13</div>



<p>Návštěvník si potom řekne, proč autor raději s vydáním článku dvě minuty neposečkal, aby bylo datum vydání v hezčí podobě „15.15“.</p>



<p>Naštěstí jde autorovu ukvapenost <i>opravit</i> krátkou PHP funkcí, která čas zaokrouhlí:</p>

<!--<pre><code>function roundedTime($time, $roundTo) {
  $time = strtotime($time);
  $delta = $time % ($roundTo * 60);
  $rounded = ($delta > ((floor($roundTo / 2)) * 60)) ? 
    $time + ($roundTo * 60) - ($delta) : 
    $time - ($delta);
  return date("H.i", $rounded);	
}</code></pre>-->
<pre><code>function roundedTime($time, $roundTo) {
  $time = strtotime($time);
  $time = round($time / ($roundTo * 60)) * ($roundTo * 60);
  return date("H.i", $time);	
}</code></pre>









<p>Aktuální čas zaokrouhlený po pěti minutách se vypíše následovně:</p>

<pre><code>echo roundedTime(date('H.i'), 5)</code></pre>



<p>Jak to funguje?</p>

<ol>
  <li>
    <p>Předaný čas se převede na vteřiny (<code>strtotime</code>).</p>
  </li>
  <li>
    <p>Počet vteřin se vydělí dobou, na kterou se zaokrouhluje.</p>
  </li>
  <li>
    <p>Tato doba se zaokrouhlí a následně zpátky vynásobí tím samým číslem.</p>
  </li>
  <li>
    <p>Výsledný čas se zformátuje a vrátí.</p>
  </li>
</ol>

<p>Funkci <code>roundedTime</code> jde zadat i jiný počet minut (třeba 10, 15 nebo 30).</p>

<p><small>Děkuji <b>Janu Rennerovi</b> za vylepšení původní funkce.</small></p>