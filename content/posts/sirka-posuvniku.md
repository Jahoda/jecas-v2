---
title: "Šířka posuvníku"
headline: "Šířka rolovací lišty"
description: "Jaká je šířka posuvníku v různých prohlížečích."
date: "2015-10-04"
last_modification: "2017-09-08"
status: 1
tags: ["scroll", "webove-prohlizece"]
format: "html"
---

<p>Rolovací lišta (posuvník, <i lang="en">scrollbar</i>) je nedílnou součástí stránky v <b>desktopových prohlížečích</b> v případě, že se obsah nevejde do vymezeného prostoru.</p>

<p>Posuvník <b>ubírá prostor pro stránku</b> – zmenšuje <i lang="en">viewport</i>.</p>

<p>To může způsobovat <a href="/poskakovani-posuvnik">poskakování stránky</a> v případech, kdy:</p>

<ol>
  <li>
    <p>Na webu jsou hodně krátké stránky, které posuvník nepotřebují. Při přechodu mezi dlouhou stránkou s posuvníkem a krátkou <b>obsah poskočí</b>.</p>
  </li>
  
  <li>
    <p>U vyskakovacího překryvného obsahu (tzv. <a href="/vstupni-stranka">lightboxu</a>) se zpravidla blokuje možnost rolovat v původní stránce.</p>
    
    <p>To se dělá přes <code>overflow: hidden</code>, což posuvník odstraní.</p>
  </li>
</ol>

<p>Kromě toho prostor ubraný posuvníkem <b>nemá vliv</b> na <a href="/media"><code>@media</code> pravidla</a>. Media queries se tak aplikují i v případě, že je viewport fakticky menší právě o šířku scrollbaru.</p>


<h2 id="rozmery">Rozměry posuvníku</h2>



<div class="live">
  <div id="testSirky" style="position: absolute; visibility: hidden">
    <div id="bez">&nbsp;</div>
    <div style="overflow-y: scroll">
      <div id="s">&nbsp;</div>
    </div>
  </div>
  <p>Aktuální šířka posuvníku je: <b id="sirka"></b> pixelů</p>
  <script>
    sirka.innerHTML = (bez.offsetWidth - s.offsetWidth);
    testSirky.style.display = "none";
  </script>
</div>

<p>Posuvníky ve <a href="/windows-10"><b>Windows 10</b></a> mají v <b>Chrome</b>, <b>Firefoxu</b>, <b>Internet Exploreru</b> šířku <b>17 pixelů</b>.</p>

<p>V <b>Opeře</b> na <b>Windows 10</b> potom <b>15 pixelů</b>.</p>

<p>Další výjimkou je <a href="/microsoft-edge"><b>Edge</b></a> s šířkou <b>12 pixelů</b>.</p>

<p>V mobilních prohlížečích a na <b>OS X</b> se potom posuvník zobrazuje jen někdy (když se začne rolovat) a <b>neubírá prostor pro stránku</b>. V těchto zařízeních by se měla ukazovat <b>nula</b>.</p>

<p>Nejrozmanitější je velikost rolovacích lišt v <b>Linuxu</b>, například v <b>Ubuntu 14.04</b> má posuvník ve <b>Firefoxu</b> 15 pixelů a v <b>Chrome</b> jen 13.</p>

<blockquote>
  <p>Zobrazuje se vám nějaká jiná šířka nebo pozorujete jiné chování? Dejte mi prosím vědět do komentářů.</p>
</blockquote>


<h2 id="zjisteni-sirky">Zjištění šířky posuvníku</h2>

<p>Na nějakou <b>universální šířku</b> tedy nejde spoléhat. Maximálně jde orientačně vycházet z toho, že posuvník má šířku do cca 20 pixelů.</p>

<p>Pokud je potřeba počítat s <b>přesnými rozměry</b>, je nutné rozměr posuvníku spočítat v konkrétním prohlížeči.</p>

<p>Jak?</p>

<p><img src="/files/sirka-posuvniku/vypocet-sirky.png" alt="Výpočet šířky posuvníku" class="border"></p>













<p>Třeba změřit šířku obyčejného <code>&lt;div></code>u a potom jinému <code>&lt;div></code>u natvrdo přidat posuvník pomocí <code>overflow-y: scroll</code>, dát do něj další <code>&lt;div></code>, který už bude užší o šířku scrollbaru.</p>