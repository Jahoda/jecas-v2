---
title: "Otevření 2 stránek jedním odkazem"
headline: "Otevření 2 stránek jedním odkazem"
description: "Jak jedním odkazem otevřít dvě různé stránky."
date: "2016-04-09"
last_modification: "2016-04-12"
status: 1
tags: ["html", "js", "odkazy", "reklama"]
format: "html"
---

<p>Tato technika je celkem rozšířená u pornowebů a stránek, které nemají problém s hodně otravnou reklamou:</p>

<pre><code>&lt;a 
href="http://jecas.cz" 
target="_blank" 
onclick="window.location = 'http://djpw.cz'">
  Odkaz na Ječas a Diskusi JPW
&lt;/a></code></pre>












<p>Níže uvedený odkaz po kliknutí zobrazí v nové záložce stránku <code>jecas.cz</code> (díky <a href="/odkaz#target"><code>target="_blank"</code></a>) a v aktuální přejde na <code>djpw.cz</code> (díky <code>window.location</code> u události <a href="/udalosti-mysi#onclick"><code>onclick</code></a>):</p>

<div class="live no-source">
  <a href="http://jecas.cz" target="_blank" onclick="window.location = 'http://djpw.cz'">
    Odkaz na Ječas a Diskusi JPW
  </a>
</div>

<p>Podobného efektu jde docílit i pomocí otevření nového okna přes <a href="/nove-okno"><code>window.open</code></a> (při vynechání <code>target="_blank"</code>).</p>

<pre><code>&lt;a 
href="http://jecas.cz"
onclick="window.open('http://djpw.cz');">
  Odkaz na Ječas a Diskusi JPW
&lt;/a></code></pre>







<h2 id="vyuziti">Využití</h2>

<p>Většinou se tento postup používá k zobrazení reklamy. Návštěvník klikne na odkaz, cíl se mu zobrazí v nové záložce, ale na pozadí se skriptem přesměruje na stránku s reklamou.</p>


<p>Jde toho využít i pro získávání <b>provisí z affiliate programů</b>. Samotná návštěva stánky s identifikátorem v URL na pozadí stačí k uložení <a href="/cookies">cookie</a>, která zajistí případné budoucí připsání provisí. Návštěvník si toho nemusí ani moc všimnout, protože otevření stránky na pozadí ho nevyruší od běžného prohlížení.</p>


<p>Jde použít i opačný postup, kdy se běžný cíl odkazu načte do stávajícího okna a <i>reklama</i> do nového. V takovém případě je ale návštěvník značně vyrušen reklamou.</p>







<h2 id="cil">Cíl odkazu</h2>


<p>Po najetí na odkaz se (u desktopových prohlížečů) ve stavovém řádku obvykle zobrazuje cíl odkazu.</p>

<p>I tuto případnou možnost, jak odhalit odkaz vedoucí jinam, než se očekává, jde ale obejít:</p>

<div class="live">
  <a href="http://jecas.cz" onmousedown="this.href = 'https://kod.djpw.cz'">Odkaz na jecas.cz, nebo kod.djpw.cz?</a>
</div>

<p>Stačí k tomu jen při <code>onmousedown</code> prohodit cíl odkazu.</p>




<h2 id="blokovat">Neměly by to blokovat?</h2>

<p>Je k úvaze, zda by toto chování neměly prohlížeče blokovat.</p>

<blockquote>
  <p>Ani ne, procházení pornowebů by už nebylo tak zábavné jako teď.</p>
  <p class="autor">– <b>habendorf</b></p>
</blockquote>










<p>Napadá vás jiný důvod, proč toto chování umožnit?</p>