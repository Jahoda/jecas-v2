---
title: "Načítání webu v IFRAME"
headline: "Načítání webu v <code>&lt;iframe></code>"
description: "Je rozumné blokovat načítání webu v <code>&lt;iframe></code>? Jaká jsou risika a výhody."
date: "2016-03-03"
last_modification: "2016-03-04"
status: 1
tags: ["html", "napady", "zabezpeceni"]
format: "html"
---

<p>Značkou <a href="/ramy#iframe"><code>&lt;iframe></code></a> jde do jedné stránky vložit obsah cizí, aniž by se obě stránky ovlivňovaly. Stránka v rámu se chová podobně jako by byla načtená v jiné záložce – návštěvník je v ní přihlášen a podobně.</p>

<p>Kvůli tomu se do rámů běžně vkládají různé prvky jako videa z <a href="/youtube">YouTube</a>, <a href="/sdileci-tlacitka">sdílecí tlačítka</a> z <a href="/facebook">Facebooku</a> nebo <a href="/twitter">Twitteru</a> a další věci.</p>

<p>Řada webů se snaží bránit tomu, aby šly do <code>&lt;iframe></code> načíst (a prohlížeče tomu jdou vstříc). Proč?</p>


<h2 id="clickjacking">Clickjacking</h2>

<p>Clickjacking je postup, kdy útočník přiměje oběť kliknout na nějaký prvek – třeba tlačítko, avšak místo kliknutí na tlačítko se na dané místo umístí obsah jiné stránky v <code>&lt;iframe></code>.</p>

<p>Obsah rámu, kam se ve skutečnosti klikne, se 100% zprůhlední pomocí <a href="/opacity"><code>opacity</code></a>. Oběť tak nemusí nic poznat.</p>

<p>Díky tomu jde s trochou snahy zajistit, aby uživatel vykonal nějakou akci. Často se clickjacking používá pro získávání <i>Like</i> na Facebooku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/clickjacking">Clickjacking na Facebooku</a></li>
  </ul>
</div>




<h2 id="zabraneni">Zabránění načítání do rámu</h2>

<p>Zabránit načtení do rámu z cizích domén (a ochránit se tak před clickjackingem) jde pomocí HTTP hlavičky:</p>

<pre><code>X-FRAME-OPTIONS: SAMEORIGIN</code></pre>

<p>Funguje to od <b>IE 8</b>, <b>Chrome 4</b>, <b>Firefox 3.6</b> a <b>Safari 4</b>.</p>



<p>V <a href="/php">PHP</a> to může vypadat následovně:</p>

<pre><code>&lt;?php
header('X-Frame-Options: SAMEORIGIN');
?></code></pre>




<p>Případně jde přímo stanovit doménu, která může web do rámu načíst (nepodporuje <b>Chrome</b> a <b>Safari</b>):</p>

<pre><code>X-FRAME-OPTIONS: ALLOW-FROM http://jecas.cz/</code></pre>




<h2 id="problem">Je clickjacking problém?</h2>


<p>Řada tvůrců brání načtení do rámu automaticky nezávisle na povaze stránky.</p>

<p>U typických <b>obsahových stránek</b> nebo aplikací (kde není uživatel přihlášen) ale kliknutí na místo, které si útočník vybral, nepřináší významné risiko.</p>

<p>Hlavička omezující zobrazení v rámu se tak může aplikovat jen na důvěrných stránkách.</p>

<p>Blokováním načtení stránky v rámu se totiž provozovatel webu připravuje o některé <b>hezké možnosti</b>, byť nejde o kritické věci:</p>





<h3 id="prebarveni">Přebarvení stránky</h3>

<p>Před časem jsem vytvořil nástroj pro rychlé přebarvení stránky pomocí <a href="/filter#hue-rotate">filtru <code>hue-rotate</code></a>:</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/jgub-">Přebarvení webu</a></li>
  </ul>
</div>


<p><img src="/files/nacitani-webu-iframe/prebarveni.png" alt="Přebarvení webu" class="border"></p>



























<h3 id="ga">Google Analytics</h3>

<p>Například <a href="/ga">Google Analytics</a> umožňuje na stránce zobrazené v rámu zobrazit informace ohledně četnosti klikání.</p>

<p><img src="/files/nacitani-webu-iframe/cetnost-kliku.png" alt="Četnost klikání" class="border"></p>





















<p>Při blokování rámů se musí náhled stránky zobrazit mimo Google Analytics.</p>



<h3 id="rwd">Responsivní náhledy</h3>

<p>Díky načtení do rámu jde rychle najednou zhodnotit zobrazení stránky v různých rozlišeních. Umí to třeba <a href="http://design.google.com/resizer">Google Resizer</a>.</p>

<p>Nástroj Google Resizer není ale zdaleka kritický. Pro podrobnější testování responsivních webů je užitečnější použít <a href="/vyvojarske-nastroje">vývojářské nástroje</a> (<kbd>F12</kbd>).</p>

<p><img src="/files/nacitani-webu-iframe/resizer.png" alt="Google Resizer" class="border"></p>























<h2 id="blokovani">Blokovaní obsahu</h2>

<p>Některé weby proti zobrazování v rámu bojují z jiného důvodu – nechtějí být například spojovány se stránkou, která jejich obsah zobrazuje.</p>

<p>Tomu se bohužel nejde na úrovni webových technologií bránit, protože vždycky jde stránku stáhnout/<a href="/kopirovani">zkopírovat</a>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/stazeni-stranky">Získání obsahu cizí stránky</a></li>
  </ul>
</div>

<p>Zobrazení staženého obsahu tak může být ve finále ještě horší, než vložení pomocí <code>&lt;iframe></code>.</p>