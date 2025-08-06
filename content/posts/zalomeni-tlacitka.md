---
title: "Zalomení tlačítka na více řádků"
headline: "Zalomení tlačítka na více řádků"
description: "Jak zabránit nechtěnému zalomení tlačítka na více řádků."
date: "2015-07-23"
last_modification: "2015-09-25"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>Při formátování <a href="/odkaz-tlacitko">odkazu jako tlačítka</a> se může stát nepěkná věc, kdy se tlačítko roztáhne na více řádků:</p>


<div class="live" style="max-width: 20em">
  <style>
    .live a.jako-tlacitko {
      border-radius: 5px;
      padding: .5em;
      background: #0D6AB7;
      color: #fff;
    }
  </style>
  <p>Nějaký obsah následovaný <a href="#" class="jako-tlacitko">tlačítkem s hodně dlouhým textem</a></p>
</div>

<h2 id="reseni">Řešení</h2>

<h3 id="inline-block">Inline-block</h3>

<p>První možnost je nastavit hodnotu vlastnosti <a href="/display"><code>display</code></a> na <code>inline-block</code>:</p>


<div class="live" style="max-width: 20em">
  <style>
    .inline-block {
      display: inline-block;
    }
  </style>
  <p>Nějaký obsah následovaný <a href="#" class="jako-tlacitko inline-block">tlačítkem s hodně dlouhým textem</a></p>
</div>

<p>Řádkově-blokové zobrazení má i výchozí element <code>&lt;button></code>, proto tímto problémem na rozdíl od řádkového odkazu netrpí.</p>


<h3 id="white-space">Zakázat zalamování</h3>

<p>Vlastností <code>white-space</code> jde ovlivnit chování bílých znaků – například zrušit možnost zalomení pomocí hodnoty <code>nowrap</code>:</p>



<div class="live" style="max-width: 20em">
  <style>
    .white-space {
      white-space: nowrap;
    }
  </style>
  <p>Nějaký obsah následovaný <a href="#" class="jako-tlacitko white-space">tlačítkem s hodně dlouhým textem</a></p>
</div>

<p>Tento postup trochu zlobí ve staré <b>Opeře 12</b>, kde část tlačítka zůstala na předchozím řádku.</p>

<p><img src="/files/zalomeni-tlacitka/spatne-zalomeni.png" alt="Špatné zalomení tlačítka" class="border"></p>


<h3 id="tvrda-mezera">Tvrdá mezera</h3>

<p><a href="https://twitter.com/tiso"><b>Tibor Soviš</b></a> doplnil čistě HTML řešení pomocí <b>tvrdých mezer</b> – <a href="/entity">entity</a> <code>&amp;nbsp;</code>. Přímo znak nedělitelné mezery jde <a href="/ceska-klavesnice#kody">zapsat na české klávesnici</a> jako <kbd>Levý Alt</kbd> + <kbd>0160</kbd>.</p>

<div class="live" style="max-width: 20em">
  <p>Nějaký obsah následovaný <a href="#" class="jako-tlacitko">tlačítkem&nbsp;s&nbsp;hodně&nbsp;dlouhým&nbsp;textem</a></p>
</div>

<p>Takové řešení ale může být pracnější než prostá CSS deklarace. V <b>Opeře 12</b> se tento postup projevuje totožným problémem jako <code>white-space: nowrap</code>.</p>

<!--
náhled:
<div class="live" style="max-width: 20em">
  <p><a href="#" class="jako-tlacitko">zalomení<br>tlačítka</a></p>
</div>-->