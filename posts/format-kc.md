---
title: "Formátování měny v Kč"
headline: "Formátování měny v Kč"
description: "Jak formátovat peněžní částku v korunách se všemi náležitostmi."
date: "2016-02-12"
last_modification: "2016-02-12"
status: 0
tags: []
format: "html"
---

<p>Při počítání finančních částek bývá rozdíl mezi číslem získaným v programovacím jazyce a vhodnou podobou pro presentování uživatelům.</p>


<p>Částku spočítanou skriptem ve tvaru:</p>

<pre><code>1016.5</code></pre>

<p>By bylo lepší zobrazovat (třeba) jako:</p>

<pre><code>1 016,50 Kč</code></pre>

<p>Pro zobrazování částky v korunách platí následující pravidla:</p>


<ol>
  <li>
    <p>Bývá zvykem po <b>3 znacích oddělovat</b> číslice mezerou. Tedy oddělit tisíce, miliony, miliardy a podobně.</p>
  </li>
  <li>
    <p>V češtině se pro oddělení <b>desetinných míst</b> používá čárka místo tečky běžné v programování nebo některých jiných jazycích.</p>
  </li>
  <li>
    <p>Je-li částka i v <b>haléřích</b>, má obsah za desetinnou čárkou <b>2 desetinná místa</b>.</p>
  </li>
  <li>
    <p>Zkratka pro koruny <code>Kč</code> se píše s <b>velkým počátečním písmenem</b>.</p>
  </li>
  <li>
    <p>Aby se uprostřed částky nezalomil řádek, mezery se používají tzv. <a href="/ceska-klavesnice#nbsp">pevné</a> (<code>&amp;nbsp;</code>).</p>
  </li>
</ol>

<h2 id="js">Formátování Kč v JavaScriptu</h2>


<pre><code>var koruny = function(castka) {
  castka = castka.toFixed(0).replace(/./g, function(c, i, a) {
      return ((a.length - i) % 3 === 0) ? ' ' + c : c;
  });
  return castka;
};</code></pre>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://www.sitepoint.com/localizing-dates-currency-and-numbers-with-php-intl/">Localizing Dates, Currency, and Numbers with Php-Intl</a> – jak v PHP lokalisovat kalendářní data, měnu a čísla</li>
</ul>