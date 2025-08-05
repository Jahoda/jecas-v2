---
title: "Proč Seznam převádí zkratky na malá písmena"
headline: "Zmenšení zkratek ve vyhledávání Seznamu"
description: "Vyhledávač Seznam.cz někdy převádí ve výsledcích hledání VELKÁ písmena na malá. Kdy a proč?"
date: "2015-05-17"
last_modification: "2015-09-15"
status: 1
tags: ["seo", "seznam"]
format: "html"
---

<p>Úpravy podoby titulku (HTML značka <code>&lt;title></code>) jsou u internetových vyhledávačů běžná věc. Jedna z úprav, které provádí český <a href="/seznam">Seznam</a>, je <b>převod titulku</b> psaného VELKÝMI PÍSMENY na malá.</p>

<p>Má to dobrý úmysl – titulek napsaný po stisknutí klávesy <kbd>CapsLock</kbd> by neprávem přitahoval vyšší pozornost.</p>

<p>Bohužel se <b>změna na malá písmena</b> týká i zažitých zkratek. Ukázka hledání zkratky „<a href="http://search.seznam.cz/?q=HTML+site%3Ajecas.cz">HTML</a>“ na tomto webu:</p>

<p><img src="/files/seznam-velka-pismena/hledani-html.png" alt="Hledání HTML na Seznamu" class="border"></p>
































<p>Jak je vidět z výsledků, převod na malá písmena se aplikuje v případě, že je v titulku stránky <b>vysoké procento velkých písmen</b>.</p>

<p>Podle mých testů je hranice někde kolem <b>jedné třetiny</b>.</p>


<p>Když je kromě zkratky napsaná značná část malými písmeny, zkratka přežije v původní velké podobě. Zbavit se nechtěného převodu tak jde <b>psaním delších titulků</b>.</p>


<p>Tuto úpravu Seznam aplikuje od roku 2007:</p>

<blockquote cite="http://fulltext.sblog.cz/2007/10/11/upravene-snippety/">
  <p>Nové snippety jsou především: vizuálně vzájemně férové – pokud je v textu „příliš mnoho“ slov kapitálkami, přepíšeme je malými písmeny</p>
  
  <p class="autor">– Blog fulltextového týmu: <a href="http://fulltext.sblog.cz/2007/10/11/upravene-snippety/">Upravené snippety</a></p>
</blockquote>






<h2 id="vyjimky">Výjimky</h2>

<p>Některé známé zkratky se zobrazují v původní podobě i při vysokém podílu velkých písmen:</p>


<p><img src="/files/seznam-velka-pismena/hledani-css.png" alt="Hledání CSS na Seznamu" class="border"></p>


















<p>Nejspíš je to tak v případech, kdy <b>je zkratka přímo hledaným řetězcem</b>, protože jinak se název té samé stránky převede:</p>

<p><img src="/files/seznam-velka-pismena/hledani-css-site.png" alt="Hledání na Seznamu" class="border"></p>














<h2 id="vyjadreni">Vyjádření ze Seznamu</h2>

<p>V květnu 2015 se k tomuto tématu vyjádřil <b>Dušan Janovský</b>:</p>

<blockquote cite="https://www.facebook.com/dusan.janovsky/posts/10204529024529128">
  <p>Je tam nějaká logika, aby se v titulku neobjevovaly texty psané velkými písmeny. Není lehké vůbec zadefinovat, jak se to má chovat.</p>
  
  <p class="autor">– <b>Dušan Janovský</b> na <a href="https://www.facebook.com/dusan.janovsky/posts/10204529024529128">Facebooku</a></p>
</blockquote>





<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Fulltext blog: <a href="http://fulltext.sblog.cz/2007/10/11/upravene-snippety/">Upravené snippety</a></li>
  
  <li>Diskuse JPW: <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=13&topic=62209">Proč Seznam ve fulltextu cenzuruje velká písmena? </a></li>
  
  <li><a href="https://www.facebook.com/dusan.janovsky/posts/10204529024529128">Seznam ze zkratky CZ v titulku stránky udělá Cz</a> – diskuse na Facebooku</li>
</ul>