---
title: "Odkaz přes celý box"
headline: "Odkaz přes celý box"
description: "Jak udělat, aby celý box s několika prvky byl klikací."
date: "2015-10-18"
last_modification: "2015-10-18"
status: 1
tags: ["css", "hotova-reseni", "odkazy"]
format: "html"
---

<p>Při vytváření <a href="/odkaz">HTML odkazů</a> se je dobré zamyslet nad správně <a href="/plocha-odkazu">velkou plochou</a> <b>aktivní oblasti</b>.</p>

<p>Ta by neměla být:</p>

<ul>
  <li>Příliš <b>malá</b>, aby se dobře trefovala kursorem myši i prstem na dotykových zařízeních.</li>
  
  <li>Příliš <b>velká</b>, aby si uživatel s myší mohl někam <i>odložit kursor</i>, kliknutím do volné plochy zrušit otevřenou kontextovou nabídku či si aktivovat neaktivní okno prohlížeče.</li>
</ul>

<p><b>Zájmy uživatelů</b> na mobilech a desktopech jsou tedy <b>lehce protichůdné</b>.</p>


<h2 id="blok-odkaz">Bloky v odkazu <code>&lt;a></code></h2>

<p>Blokové elementy v značce <code>&lt;a></code> dlouhá léta fungují a nakonec byly i posvěceny HTML specifikací:</p>

<pre><code>&lt;a href="/clanek">
  &lt;img src="clanek.png">
  &lt;h2>Název článku&lt;/h2>
  &lt;p>Popis článku&lt;/p>
&lt;/a></code></pre>







<p>Nejjednodušší způsob, jak <b>rozklikat celý blok</b>, je ho obalit odkazem.</p>

<p>Nastaví-li se odkazu <code><a href="/display#block">display: block</a></code>, bude klikat po celé ploše místo jen nad jednotlivými elementy.</p>

<p><img src="/files/box-odkaz/display-block.png" alt="Klikací plocha odkazu" class="border"></p>
















<p>Má to pár problémů:</p>

<ol>
  <li><b>Označování textu</b> v odkazech je ve většině prohlížečů obtížně řešitelné. Je potřeba najet myší nad odkaz, a to není vždy možné (nad odkazem je jiný odkaz apod.)</li>
  
  <li><b>Styl odkazů</b> se aplikuje na všechny elementy v bloku. Bude nutné dříve nastavené styly pro odkaz resetovat.</li>
  
  <li><b>Přepínat chování</b> mezi dotykovými a nedotykovými zařízeními nejde úplně jednoduše.</li>
</ol>


<h2 id="before">Posicovaný <code>:before</code>/<code>:after</code></h2>

<p>Zajímavé řešení jsem se dozvěděl od <a href="http://webylon.info"><b>Chamurappiho</b></a>: plochu vytvořit prostřednictvím <a href="/position#absolute">absolutně posicovaného</a> pseudo-elementu odkazu.</p>

<p>Odkazem bude pouze jeden z prvků:</p>

<pre><code>&lt;div class="clanek">
  &lt;img src="clanek.png">
  &lt;h2>
    &lt;a href="/clanek" class="odkaz">Název článku&lt;/a>
  &lt;/h2>
  &lt;p>Popis článku&lt;/p>
&lt;/div></code></pre>








<p>Obalu <code>.clanek</code> se přidá relativní posice a <code>:before</code> odkazu se umístí přes celou jeho plochu:</p>

<pre><code>.clanek {position: relative}
.odkaz:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0
}</code></pre>










<p><b>Výhody:</b></p>

<ol>
  <li>Pro rozklikání celé skupiny elementů se nemusí měnit HTML kód.</li>
  
  <li>Chování jde snadno přepínat podle šířky obrazovky přes <code>@media</code> pravidlo.</li>
  
  <li>V případě více odkazů jde tuto plochu vytvořit ze všech odkazů a jen jim měnit prioritu přes <code>z-index</code>.</li>
</ol>

<p>Měla-li by být velká klikací plocha i na nedotykových zařízeních, <code>:hover</code> efekt se přidá přímo společnému obalu, který odkaz není.</p>

<p>Možný problém tohoto řešení nastane v případě, že má <code>position: relative</code> i něco mezi odkazem a společným obalem, potom nepůjde <code>:before</code> umístit potřebným způsobem.</p>


<p><a href="https://kod.djpw.cz/zfrb">Živá ukázka</a></p>




<h2 id="js">Řešení v JavaScriptu</h2>

<p>Udělat celý blok klikací by šlo snadno i v JavaScriptu přidáním atributu <a href="/udalosti-mysi#onclick"><code>onclick</code></a> a změnou <code>window.location</code>.</p>

<pre><code>&lt;div class="clanek" 
  <b>onclick</b>="window.location = '/clanek'"
>
  &lt;img src="clanek.png">
  &lt;h2>
    &lt;a href="/clanek" class="odkaz">Název článku&lt;/a>
  &lt;/h2>
  &lt;p>Popis článku&lt;/p>
&lt;/div></code></pre>










<p>Pro odlišné chování na mobilech a desktopech by se musela použít nějaká detekce.</p>