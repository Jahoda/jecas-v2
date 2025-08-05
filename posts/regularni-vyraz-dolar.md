---
title: "Znak $ v regulárním výrazu"
headline: "Znak dolaru v regulárním výrazu"
description: "Jak zapsat znak dolaru v regulárním výrazu v PHP."
date: "2014-03-26"
last_modification: "2014-03-28"
status: 1
tags: ["php", "regexp"]
format: "html"
---

<p>Znak dolaru (<code>$</code>) má v regulárních výrazech zvláštní význam. Značí konec řetězce nebo konec řádku.</p>

<div class="internal-content">
  <p><b>Zapsat</b> na <a href="/ceska-klavesnice">české klávesnici</a> jde klávesovou zkratkou <kbd>Pravý Alt</kbd> + <kbd>ů</kbd>.</p>
</div>

<p>V případě, že je cílem najít v textu něco s dolarem, nabízí se znak <code>$</code> <b>escapovat</b> (<code>\$</code>).</p>

<pre><code>$vysledek = preg_match("~<b>\$</b>~", "0.50 $"); // true</code></pre>

<p>Výsledek bude dle očekávání kladný. Když znak dolaru v testovaném řetězci nebude, měl by výsledek vrátit <code>false</code>.</p>

<pre><code>$vysledek = preg_match("~\$~", "0.50 €"); // <b>true</b></code></pre>

<p>Jenže vrací také <code>true</code>. Proč? PHP řetězce v dvojitých <i>uvozovkách</i> zpracovává tak, že se escapování dolaru vypustí. Domnívám se, že je to z toho důvodu, že dolar má v ouvozovkovaném řetězci význam jako označení případné proměnné.</p>

<pre><code>$promenna = "kobercovka";
echo "Vypisuji $promenna"; // Vypisuji kobercovka
echo "Vypisuji \$promenna"; // Vypisuji $promenna</code></pre>

<p>A to escapování se před předání do funkce <code>preg_match</code> ztratí.</p>
  
<p>Řešení je naštěstí prosté, používat v regulárních výrazech <b>jednoduché uvozovky</b>.</p>

<pre><code>$vysledek = preg_match(<b>'</b>~\$~<b>'</b>, "0.50 €"); // false
$vysledek = preg_match(<b>'</b>~\$~<b>'</b>, "0.50 $"); // true</code></pre>

<p>A nebo přidat další <b>zpětné lomítko</b> pro escapování dolaru.</p>

<pre><code>$vysledek = preg_match("~<b>\\</b>$~", "0.50 €"); // false</code></pre>


<h2 id="odkazy">Odkazy jinam</h2>

<div class="internal-content">
  <ul>
    <li><a href="/uvozovky#php">Uvozovky v PHP</a> – rozdíl mezi jednoduchými a dvojitými uvozovkami</li>
  </ul>
</div>