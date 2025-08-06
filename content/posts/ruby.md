---
title: "HTML značka ruby"
headline: "HTML značka <code>&lt;ruby></code>"
description: "HTML značka <code>&lt;ruby></code> slouží k označení výslovností symbolů východních asijských znaků."
date: "2016-01-29"
last_modification: "2016-01-29"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Uvnitř elementu <code>&lt;ruby></code> se používá celá řada dalších značek:</p>



<h2 id="rt"><code>&lt;rt></code></h2>

<p>Text přiřazený k symbolu se obaluje do značky <code>&lt;rt></code> a v podporovaných prohlížečích se potom zobrazí nad symbolem.</p>

<div class="live">
<ruby>
  漢 <rt>Kan</rt>
  字 <rt>ji</rt>
</ruby></div>


<h2 id="rp"><code>&lt;rp></code></h2>

<p>Jako fallback pro prohlížeče neznalé ruby existuje značka <code>&lt;rp></code>. Do ní jde umístit obsah, který se v podporovaných prohlížečích nezobrazí, ale v nepodporovaných ano.</p>

<p>Díky tomu se text přiřazený k symbolu může zobrazit třeba v závorce:</p>

<pre><code>&lt;ruby>
  漢 <b>&lt;rp>(&lt;/rp></b> &lt;rt>Kan&lt;/rt>&lt;rp>)&lt;/rp>
  字 &lt;rp>(&lt;/rp>&lt;rt>ji&lt;/rt>&lt;rp>)&lt;/rp>
&lt;/ruby></code></pre>






<h2 id="rb"><code>&lt;rb></code></h2>

<p>Značku <code>&lt;rb></code> je možné použít pro označení symbolu.</p>


<h2 id="rtc"><code>&lt;rtc></code></h2>

<p>Slouží pro umístění anotace. Specifikace uvádí následující příklad:</p>

<pre><code>&lt;ruby>
  &lt;rb>旧&lt;rb>金&lt;rb>山
  &lt;rt>jiù&lt;rt>jīn&lt;rt>shān
  &lt;rtc>San Francisco
&lt;/ruby></code></pre>







<p>Ten se v podporovaných prohlížečích (např. <b>Firefox 44</b>) zobrazí následovně (<a href="https://kod.djpw.cz/eztb">ukázka</a>):</p>

<p><img src="/files/ruby/rtc-zobrazeni.png" alt="Zobrazení se značkou RTC" class="border"></p>






<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
  <ul>
    <li>W3C specifikace: <a href="http://www.w3.org/TR/html5/text-level-semantics.html#the-ruby-element">The <code>ruby</code> element</a></li>
  </ul>
</div>