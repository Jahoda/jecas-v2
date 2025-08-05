---
title: "Box-reflect"
headline: "Box-reflect"
description: "CSS vlastnost <code>box-reflect</code> umí vytvořit odraz celého boxu."
date: "2014-12-11"
last_modification: "2015-02-13"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Někdy kolem roku 2006 bylo relativně populární vytváření grafických podob webů s <b>odlesky</b>. Takové odlesky se zpravidla řešily obrázky.</p>

<p><img src="/files/box-reflect/odlesk.png" alt="Odlesk textu" class="border"></p>




<p>Protože trendem CSS je přidávat vlastnosti, kterými lze zajistit efekty, co se dříve řešily právě těmi <b>obrázky</b>, pro odraz boxu existuje vlastnost <code>box-reflect</code>.</p>

<div class="external-content">
  <ul>
    <li>Webylon: <a href="http://webylon.info/K.47">Strážce technické příčetnosti</a> – pojednání o používání CSS efektů místo obrázků</li>
  </ul>
</div>



<h2 id="podpora">Podpora</h2>

<p>Odraz boxu pouze pomocí CSS vlastnosti <code>box-reflect</code> funguje zatím pouze v prohlížečích používající jádro <b>Blink</b>.</p>

<ul>
  <li><b>Chrome 4</b>+,</li>
  <li><b>Opera 15</b>+,</li>
  <li><b>Safari 4</b>+</li>
</ul>



<p>Vlastnost se zapisuje s <a href="/css-prefixy">prefixem</a> <code>-webkit-</code>.</p>



<h2 id="zapis">Zápis</h2>

<pre><code>element {
  -webkit-box-reflect: <b>směr</b> <b>vzdálenost</b> <b>maska</b>;
}</code></pre>





<h3 id="smer">Směr</h3>

<p>Směr odlesku boxu je nutné uvést vždy a nabývá čtyř hodnot:</p>

<ul>
  <li><code>above</code> (nad boxem),</li>
  <li><code>below</code> (pod),</li>
  <li><code>right</code> (vpravo),</li>
  <li><code>left</code> (vlevo)</li>  
</ul>





<h3 id="vzdalenost">Vzdálenost</h3>

<p>Vzdálenost odrazu od boxu se zadává v běžných délkových jednotkách CSS. Uvádět vzdálenost není nutné, použije se potom výchozí hodnota <code>0</code> (tedy odraz hned u zdroje). Vzdálenost může být <b>kladná</b> (odraz bude mít odstup od originálu) nebo <b>záporná</b> (odraz originál překryje).</p>



<h3 id="maska">Maska</h3>

<p>Aby odraz nebyl pouhou 1:1 kopií originálu, dá se použí tzv. <i>maska</i>. Zadávat masku je nepovinné. V případě jejího zadání je ale nutné uvést i vzdálenost.</p>

<p>Masku lze vytvořit více způsoby (ukázky fungují pouze v <b>Chrome</b> a <b>Opeře</b>):</p>

<ul>
  <li><a href="/gradient">CSS gradientem</a> – klíčové slovo pro průhlednou barvu je <code>transparent</code> (<a href="http://kod.djpw.cz/wikb">živá ukázka</a>),</li>
  <li>průhledným obrázkem (<a href="http://kod.djpw.cz/xikb">živá ukázka</a>)</li>
</ul>


<p>Maska funguje tak, že <i>síla</i> odrazu je stanovena libovolnou <b>barvou</b> a její (polo)průhledností. Kde je barva neprůhledná – zobrazí se zrcadlený objekt v původní podobě. Částečně průhledné oblasti potom zajistí částečnou intensitu originálu.</p>

<p>Původní obrázek:</p>

<p><img src="http://jecas.cz/files/box-reflect/obrazek.jpg" width="300" class="border"></p>









<p>Maska:</p>

<p><img src="http://jecas.cz/files/box-reflect/maska.png" width="300" class="border"></p>













<p>Výsledek odrazu směrem pod element (hodnota <code>below</code>) s použitím masky:</p>

<p><img src="http://jecas.cz/files/box-reflect/obrazek-maska.jpg" width="300" class="border"></p>


























<h2 id="zajimavosti">Zajímavosti</h2>

<ul>
  <li>
    <p>Při <b>označování textu</b> kursorem myši se označuje i obsah v odrazu (obráceně to nejde).</p>
    <p><img src="/files/box-reflect/oznacovani.gif" alt="Označování odlesku textu" class="border"></p>
  </li>
  
  
  
  <li>
    <p>Odraz se <b>nepočítá do rozměrů</b> boxu – kopie obsahu tedy může <i>vylézt</i> mimo, kde bude překryta případným obsahem. Odraz lze oříznout pomocí <code>overflow: hidden</code>. Dostat odraz <b>nad</b> okolní obsah nejspíš nejde.</p>
  </li>
</ul>


<h2 id="ostatni">Jiné způsoby odrazu</h2>

<p>Odraz (nad nebo pod) jde rovněž vytvořit prostým zkopírováním boxu a jeho <a href="/rotace">otočením</a>. Vytvořit odraz nad i pod, vlevo i vpravo lze CSS transformací <code>scale</code>, která dokáže otočit obrázek kolem své osy:</p>

<ul>
  <li><b>vodorovně</b> – <code>transofrm: scale<b>Y</b>(-1)</code>,</li>
  <li><b>svisle</b> – <code>transofrm: scale<b>X</b>(-1)</code></li>
</ul>

<p>Ve <b>Firefoxu</b> se zkopírování elementu dá vytvořit elegantně nastavením pozadí:</p>

<pre><code>#zrcadlo {
  background: -moz-element(#zdroj);
}</code></pre>

<p><a href="http://kod.djpw.cz/yikb">Živá ukázka</a> (pouze pro Firefox)</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Vzhůru dolů: <a href="http://www.vzhurudolu.cz/prirucka/css3-box-reflection">Box Reflection</a> (česky)</li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-box-reflect">-webkit-box-reflect</a></li>
  
  <li><a href="http://designshack.net/articles/css/mastering-css-reflections-in-webkit/">Mastering CSS Reflections in Webkit</a></li>
  
  <li><a href="http://www.hongkiat.com/blog/css-reflection/">CSS3 Image Reflection</a></li>
</ul>