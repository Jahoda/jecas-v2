---
title: "Zachování posice scrollování overflow-anchor"
headline: "Zachování posice scrollování <code>overflow-anchor</code>"
description: "CSS vlastnost <code>overflow-anchor</code> umožňuje nastavit, jak si má prohlížeč pamatovat, kam bylo odscrollováno."
date: "2019-03-29"
last_modification: "2019-03-29"
status: 1
tags: ["css", "css-vlastnosti", "scroll"]
format: "html"
---

<p>Poměrně dlouhou dobu prohlížeče neřešily situace, kdy se na stránce stane <i>něco</i> takového, co způsobí <b>odrolování někam pryč</b>.</p>

<p>Typicky po následujících případech:</p>

<ol>
  <li>
    <p>U (především) mobilních zařízení se <b>změní orientace z výšky na šířku</b> nebo obráceně.</p>
  </li>
  
  <li>
    <p>Před obsahem se donačte nějaký prvek se zprvu <b>neznámými rozměry</b> a stránka poskočí. Například video, obrázek nebo reklama.</p>
  </li>
</ol>

<p>Návštěvník si tak prochází webem, stane se nějaká z výše uvedených věcí, a je ztracen, protože je ve <i>viewportu stránky</i> (aktuálně viditelné oblasti) úplně něco jiného, než tam bylo předtím.</p>

<p>Druhý případ s obsahem o neznámých rozměrech si povětšinou zkušený tvůrce webů dokáže ohlídat:</p>

<div class="internal-content">
  <ul>
    <li><a href="/poskakovani">Poskakování stránky</a> – proč vadí a jak se ho zbavit</li>
  </ul>
</div>


<p>Řešit změnu orientace ale už nejde bez nějakého relativně komplikovaného počítání a <a href="/odrolovani">scrollování</a> v JavaScriptu.</p>

<p>Naštěstí oba případy začaly <b>automaticky řešit přímo prohlížeče</b>. A prohlížeče <b>Chrome 56+</b> (leden 2017) a <b>Firefox 66+</b> (březen 2019) dokáží toto chování ovlivňovat CSS vlastností.</p>


<h2 id="css-vlastnost">CSS vlastnost <code>overflow-anchor</code></h2>

<p>Právě vlastnost <code>overflow-anchror</code> zapíná/vypíná toto <i>chytré</i> zapamatování odrolování. A nastavuje se pro elementy s posuvníkem (tedy pro celou stránku nebo pro něco s <code>overflow: auto</code> / <code>overflow: scroll</code>).</p>

<p>Kromě globálních hodnot <code>inherit</code>, <code>initial</code> a <code>unset</code> existují 2 specifické hodnoty:</p>

<dl>
  <dt id="auto">
    <code>overflow-anchor: auto</code>
  </dt>
  <dd>
    <p>Prohlížeč se sám snaží chovat <i>chytře</i> (výchozí chování).</p>
  </dd>
  
  <dt id="none">
    <code>overflow-anchor: none</code>
  </dt>
  <dd>
    <p>Zakáže automatické pokusy prohlížeče o lepší uživatelský zážitek. Hodí se jako pojistka u elementů, kde je nějaké vlastní JavaScriptové scrollování, pokud výchozí chování způsobuje problémy.</p>
  </dd>
</dl>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor"><code>overflow-anchor
</code></a></li>
  
  <li>Mozilla Hacks: <a href="https://hacks.mozilla.org/2019/03/scroll-anchoring-in-firefox-66/">Scroll Anchoring in Firefox 66</a></li>
</ul>