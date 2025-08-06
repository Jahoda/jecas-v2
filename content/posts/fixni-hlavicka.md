---
title: "Proč nepoužívat fixní hlavičku"
headline: "Proč nepoužívat fixní hlavičku"
description: "Proč se vyhnout fixování záhlaví/menu k hornímu okraji obrazovky."
date: "2015-08-22"
last_modification: "2015-08-22"
status: 0
tags: ["fixed", "responsive"]
format: "html"
---

<p>Některé weby při odrolování <b>zafixují navigaci</b> k hornímu okraji. Jde to zajistit trochou JavaScriptu:</p>

<div class="internal-content">
  <ul>
    <li><a href="/fixni-menu">Fixní menu při rolování</a> – jak při odrolování stránky zafixovat menu na horní hraně obrazovky</li>
  </ul>
</div>


<h2 id="prostor">Zmenšení prostoru</h2>

<p>Zásadní problém zafixované vodorovné navigace tkví v <b>omezení dostupného prostoru</b> pro obsah.</p>

<p>Mohlo by se zdát, že je to problém jen mobilních zařízení s <b>malou obrazovkou</b>, ale ani monitory a displeje desktopů nebo notebooků nemají výšku na rozdávání, protože je většina <b>širokoúhlých</b>.</p>

<p>Jedno z nejvíce rozšířených rozlišení <b>1366 × 768</b> (pohybuje se někde kolem 20 %) má výšku podobně malou jako větší mobily při orientaci <i>portrait</i> (na výšku).</p>

<p>Navíc na desktopu ze svislého prostoru ubere místo:</p>

<ul>
  <li>Hlavní systémová lišta (cca <b>40 px</b>).</li>
  
  <li>Záhlaví prohlížeče (cca <b>60 px</b>).</li>
  
  <li>Lišta záložek, kterou někdo používá (cca <b>30 px</b>).</li>
  
  <li>Někteří uživatelé používají ještě další vlastní lišty.</li>
</ul>

<p>Nakonec tak zbude pro samotný obsah webu něco přes 600 pixelů na výšku, což není mnoho.</p>

<p>Výška fixní hlavičky může mít třeba <b>30 pixelů</b>, což znamená, že bude neustále <b>užírat cca 5 % dostupného místa</b>.</p>

<p>Asi nejextrémnější situace nastává u mobilních telefonů při zobrazení webu na šířku. V tomto případě fixní hlavička zabere klidně 1/5 prostoru.</p>


<h2 id="fixni">Proč fixní</h2>

<p>Při aplikaci zafixované hlavičky (nebo jiného fixního obsahu) je tak vhodné mít <b>dobrý důvod</b>, proč to udělat.</p>

<blockquote>
  <p>Dobrým důvodem není, že to vypadá <i lang="en">cool</i> a mají to na nějakém jiném webu.</p>
</blockquote>








<p>Prostor, který je neustále viditelný a snižuje tak dostupné místo pro ostatní obsah, by <b>měl obsahovat něco hodně důležitého</b>. Je k úvaze, jestli je běžná navigace tak důležitá, aby se tím neustálý zábor místa ospravedlnil.</p>

<p>Další možný problém stále fixní navigace je <b>odvádění pozornosti od obsahu</b>.</p>

<p>Nabízí se také možnost odkazy na ostatní stránky přidávat přímo do obsahu, kde to dává smysl. Nebo mít na konci stránku zmíněné možnosti „<b>Kam dál</b>“, odkaz pro <b>návrat na hlavní stranu</b> a podobně.</p>

<p>Hezky je to vyřešeno třeba na <a href="http://www.jakpsatweb.cz">Jak psát web</a>:</p>

<p><img src="/files/fixni-hlavicka/jpw-navigace.png" alt="Navigace na konci stránky JPW" class="border"></p>
















<p>Hodit se může také <b>drobečková navigace</b> umístěná i pod obsahem na konci stránky:</p>

<p><img src="/files/fixni-hlavicka/drobeckova-navigace.png" alt="Navigace na konci stránky JPW" class="border"></p>






<h2 id="rolovani-nahoru">Zobrazení při rolování vzhůru</h2>

<p>Některé weby problém s místem a odváděním pozornosti fixního obsahu řeší jeho zobrazováním <b>na základě směru rolování</b>.</p>

<p>Pokud člověk po příchodu na stránku začne rolovat směrem dolů, hlavička neustále viditelná (fixní) nebude. Zobrazí se až při rolování směrem nahoru.</p>


<p>Vychází se z předpokladu, že pohybem vzhůru dává návštěvník najevo, že se chce dostat na hlavičku, která je nahoře.</p>

<p>Bohužel uživatel může mít tendenci vyjet vzhůru i v případě, že se chce jen dostat k obsahu, který přejel. V takovém případě ho zobrazení fixního obsahu nejspíš naštve, protože mu překryje obsah, ke kerému se chce dostat.</p>

<p>Tuto situaci jde částečně řešit tak, že se při rolování vzhůru (navíc třeba ještě s nějakou tolerancí) fixní prvek umístí nad horní hranu – tím nepřekryje obsah, ale bude nutné se k němu ještě déle prorolovat.</p>



<h2 id="kratke">Krátké stránky</h2>

<p>Zajímavý způsob, jak se nutnosti fixní navigace (nebo jiného obsahu) vyhnout, je vytvářet stránky dostatečné krátké na to, aby potom  nebyl problém odrolovat na začátek.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://exisweb.net/abtest-fixed-navbar">Fixed Headers on Mobile: A/B Tested</a></li>
  <li><a href="http://bradfrost.com/blog/mobile/fixed-position/">Fixed Positioning in Mobile Browsers</a></li>
</ul>