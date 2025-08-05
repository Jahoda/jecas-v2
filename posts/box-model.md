---
title: "Box model"
headline: "Box model"
description: "Co je to a jaký box-model si vybrat. Jaké jsou výhody a nevýhody."
date: "2013-08-20"
last_modification: "2013-08-21"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Pod pojmem <b>box-model</b> se nejčastěji rozumí <b>způsob, kterým prohlížeče počítají rozměry </b> nějakého elementu.
<p>Existují dva:</p>
<ol>
  <li><b>obsahový</b> — <code>box-sizing: <b>content</b>-box</code> (výchozí)</li>
  <li><b>okrajový</b> — <code>box-sizing: <b>border</b>-box</code></li>
</ol>

<h2 id="content-box">Obsahový box model</h2>
<p>Pokud zvolíme <a href="/doctype"><i>standardní</i> <code>&lt;!doctype&gt;</code></a>, ve všech běžně používaných prohlížečích se bude automaticky používat <b>box model obsahový</b>. Co to znamená?</p>
<dl>
  <dt><b>Celková šířka elementu</b>
    <dd>je rovna: <code>width</code> + <code>padding-left</code> + <code>padding-right</code> + <code>border-left-width</code> + <code>border-right-width</code>
  <dt><b>Celková výška elementu</b>
    <dd>je rovna: <a href="/height"><code>height</code></a> + <code>padding-top</code> + <code>padding-bottom</code> + <code>border-top-width</code> + <code>border-bottom-width</code></dl>
<p>Pokud tedy chceme na stránce vyrobit <i>box</i> o šířce <b>150</b> pixelů s rámečkem <b>1</b> pixel a odsazením <b>7</b> pixelů, musíme značně nepohodlně přepočítat šířku:</p>

<table>
  <tr><td></td><td>150 px</td><td><b>původní šířka</b></td></tr>
  <tr><td>−</td><td>1 px</td><td>levý rámeček</td></tr>
  <tr><td>−</td><td>7 px</td><td>levé odsazení</td></tr>
  <tr><td>−</td><td>7 px</td><td>pravé odsazení</td></tr>
  <tr><td>−</td><td>1 px</td><td>pravý rámeček</td></tr>
  <tr><td>=</td><td>134 px</td><td><b>nová šířka</b></td></tr>
</table>
<p>Nebo použít další obal.</p>

<h3 id="obal">Obal</h3>
<p>V obalu je další element, který nastavuje pouze <code>padding</code> a <code>border</code>, ale <b>nikoliv šířku</b>.
<pre><code>&lt;div style="width: 150px"&gt;
  &lt;div style="border: 1px solid #ccc; padding: 7px"&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>

<h2 id="border-box">Okrajový box model</h2>
<p>Řešením výše uvedené komplikace je <code>box-sizing: border-box</code>, neboli box model <b>okrajový</b>.</p>
<p>Tomu stačí nastavit konečnou šířku (nebo výšku), a ta bude dodržena nezávisle na <code>padding</code>u i <code>border</code>u.</p>

<p>Okrajový box model se používá automaticky v Internet Exploererech v případě, že se neuvede <code>&lt;!doctype&gt;</code> nebo když uvedeme takový, který nezapne <i>standardní režim</i>.</p>

<h3>Používáme <code>border-box</code></h3>
<p><b>Internet Explorer od verse 8</b> a ostatní prohlížeče už mnoho let umí používat okrajový box-model i ve <b>standardním režimu</b>, stačí přidat do CSS:</p>

<pre><code>* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}</code></pre>

<p>Ve starších Explorerech lze vyvolat okrajový box model jen shozením do quirk režimu (např. vynecháním <code>&lt;!doctype&gt;</code>). V čemž je zase problém, protože se tím ochudíme o podporu novějších CSS vlastností.</p>

<h2 id="co-zvolit">Co zvolit?</h2>
<ol>
  <li>Optimalisujeme-li jen pro <b>IE 8 a novější</b>, nabízí se jednoznačně používat <b>box model okrajový</b>.</li>
  <li>Optimalisujeme-li i pro <b>starší Explorery</b>, je lepší se smířit s nedostatky <b>obsahového box modelu</b>.</li>
</ol>

<dl>
  <dt>Okrajový box-model<dd><p>V případě používání cizích / již hotových stylů v obsahovém box modelu může nastat problém.</p>
  <p>Naštěstí je možné pro určitý element přepnout box-model zpátky:</p>
  <pre><code>.urcity-element, .urcity-element * {
  box-sizing: <b>content</b>-box;
  -moz-box-sizing: <b>content</b>-box;
  -webkit-box-sizing: <b>content</b>-box;
}</code></pre>
  
  <dt>Quirk</dt>
  <dd><p>Podstatná nevýhoda quirku, byť tak lze získat <i>lepší</i> box-model, je již zmíněná nepodpora novějších CSS funkcí, zároveň plno hotových skriptů nebude už v quirku fungovat.</p></dd>
  </dl>


<h2 id="min-maw-width-height">Vlastnosti <code>min</code>/<code>max-width</code>/<code>height</code></h2>
<p>CSS vlastnosti pro minimální/maximální šířku/výšku (<code>min-width</code>/<code>max-width</code> a <code>min-height</code>/<code>max-height</code>) hodnotu vlastnosti <code>box-sizing</code> ignorují v <b>Internet Exploreru 8</b> a možná ještě v nějakých starších prohlížečích.</p>
<p>I přes nastavený <code>border-box</code> (okrajový box model) počítají rozměry v obsahovém. <a href="http://kod.djpw.cz/yvb">Ukázka</a>.</p>

<h2 id="vyvoj">Historický vývoj</h2>
<p>Historický vývoj jednotlivých box modelů je hezky popsán ve článku <a href="http://webylon.info/K.10">V kaskádovém ringu</a>.</p>
<p>V dnešní době, kdy odumírá poslední prohlížeč, co neumí okrajový box model ve standardním režimu (Internet Explorer 7), se zdá, že budoucnost patří <code>border-box</code>u. A výchozí <code>content-box</code> nemá/nebude prakticky smysl používat.</p>