---
title: "Filtr blur"
headline: "Rozmazání obsahu"
description: "Rozmazávání obsahu v různých prohlížečích."
date: "2013-10-12"
last_modification: "2013-10-14"
status: 1
tags: ["css", "css-vlastnosti", "hotova-reseni"]
format: "html"
---

<p>Podobně jako u <a href="/opacity">průhlednosti</a> nebo <a href="/rotace">otáčení</a> panuje i u <b>rozmazávání</b> nejednotnost napříč prohlížeči.</p>

<p>CSS vlastnost <a href="/filter"><code>filter</code></a> je zajímavá tím, že ji velmi odlišně podporují prohlížeče <b>Internet Explorer</b> (už od prastaré verse 4 do IE9) a <b>současné prohlížeče</b>.</p>




<h2 id="ie9">IE 9 a starší</h2>
<p>Jak filtry fungují v těchto Explorerech je popsáno na JPW včetně <a href="http://www.jakpsatweb.cz/css/css-filtry-priklady.html">živých příkladů</a> (<a href="/files/blur/ie9.png">screenshot z IE 9</a>). Tedy je vidět, že funguje i kýžený <b>filtr pro rozmazání</b>:</p>
<pre><code>element {
  filter: blur;
}
</code></pre>

<p>Filtry <b>ve starších IE</b> se <b>dost špatně</b> <a href="/prohlizece">testují</a>. IETester ani přepnutí režimu v Internet Exploreru 10 <b>neodpovídá</b> skutečnému IE.</p>









<h2 id="chrome">Chrome</h2>
<p><a href="http://kod.djpw.cz/yoc" class="button">Ukázka</a></p>
<p>Chrome (a jiné prohlížeče založené na Webkitu) podporují novou podobu CSS vlastnosti <code>filter</code> (zatím s <a href="/css-prefixy">prefixem</a>). Rozmazání potom vypadá následovně:</p>
<pre><code>element {
  <i>-webkit-</i>filter: blur<b>(</b>2px<b>)</b>;
}</code></pre>
<p>Hodnota v závorkách stanovuje <b>intensitu romazání</b>. Lze očekávat, že tento postup by v budoucnu mohly podporovat všechny prohlížeče.</p>














<h2 id="firefox">Firefox</h2>

<p><a href="http://kod.djpw.cz/xoc" class="button">Ukázka</a></p>
<p>Firefox (jádro Gecko) podporuje vytvoření filtru v <a href="/svg">SVG</a> (stačí umístit do HTML kódu nebo přes protokol <code>data:</code>):
  <pre><code>&lt;svg>
    &lt;filter id="rozmazany-filtr">
        &lt;feGaussianBlur stdDeviation="2" />
    &lt;/filter>
&lt;/svg></code></pre>
<p>A následně filtr připojit přes CSS zápis:</p>
<pre><code>element { filter: <b>url</b>(#rozmazany-filtr) }</code></pre>

<p>Výše uvedené způsoby pro Gecko a Webkit lze spojit a filtr pro IE9 (a starší IE) připojit <a href="/podminene-komentare">podmíněným komentářem</a>. </p>

<h2 id="ie10">Internet Explorer 10 a Opera 12</h2>
<p>Tyto prohlížeče umí rozmazávat jen přímo SVG elementy, popř. <code>&lt;image&gt;</code> obrázky. Situace je stejná jako u <a href="/cernobily-obrazek#ie10">černobílého filtru</a>. Při trochu jiném zápisu rozmazávacího filtru zafunguje <b>shození IE 10 do staršího režimu</b>:</p>
<pre><code>&lt;meta http-equiv="X-UA-Compatible" content="IE=9"></code></pre>
<p><b>Filtr</b>:</p>
<pre><code>filter:progid:DXImageTransform.Microsoft.Blur(pixelradius='2', shadowopacity='0.0');</code></pre>
<p><a href="http://kod.djpw.cz/qqc-" class="button">Ukázka</a> (Měla by kromě Opery fungovat všude.)</p>
  
  
<h2 id="jine">Jiné způsoby rozmazávání</h2>  
<h3 id="text-shadow">Stín</h3>
<p>Stačí-li <b>rozmazat jen písmo</b>, docílí se toho i vlastností <code>text-shadow</code> (funkční od <b>IE 10</b>).</p>
<div class="live">
  <p style="text-shadow: 0px 0px 8px #000, 0px 0px 4px #000, 0px 0px 2px #000">Rozmazaný text</p>
</div>

<h3 id="duplikovani">Duplikování elementu</h3>
<p>Pokud se obsah k rozmazání několikrát naklonuje a s <a href="/opacity">průhledností</a> umístí vždy s <a href="/position#relative">lehkým posunem</a>, získáme tak rovněž efekt rozmazání.</p>
<div class="live">
  <style>
    .duplikovani {position: relative; height: 4em; width: 100%}
    .duplikovani p {position: absolute; top: 0; opacity: .25}
  </style>
  <div class="duplikovani">
  <p>Rozmazaný text</p>
  <p style="left: 1px">Rozmazaný text</p>
  <p style="left: 2px">Rozmazaný text</p>
  <p style="left: 3px">Rozmazaný text</p>
  </div>
</div>
  
<p>Duplikování obsahu by s ohledem na smysluplnost HTML kódu měl dělat JavaScript.</p>  
<p><a href="http://kod.djpw.cz/epc" class="button">Ukázka</a></p>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li>DJPW: <a href="http://djpw.cz/152121">Windows Aero Effect na webu – jak na to?</a></li>
  <li>Vlastnost <a href="http://devdocs.io/css/filter"><code>filter</code></a> v DevDocs</li>
  
  <li><a href="http://codepen.io/lbebber/pen/zxpMZw/">Motion Blur Experiment</a> – rozmazání elementu při jeho přesunutí</li>
</ul>