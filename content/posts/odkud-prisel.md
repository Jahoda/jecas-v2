---
title: "Odkud návštěvník přišel"
headline: "Odkud návštěvník přišel"
description: "Jak zjistit odkazující stránku, ze které návštěvník přišel."
date: "2015-08-09"
last_modification: "2015-08-09"
status: 0
tags: []
format: "html"
---

<p>Z různých důvodů se hodí mít přehled o zdrojích, které <b>přivádějí návštěvníky na web</b>.</p>


<p><b>Odkud někdo odkazuje</b> se hodí vědět třeba v případě, že odkazující stránka reaguje na obsah webu a je žádoucí si toho všimnout a reagovat zpět.</p>


<p>Odkazující stránky jde zjistit různými způsoby. Převážně se liší rychlostí, kdy se o tom provozovatel webu dozví.</p>



<h2 id="gwt">Odkazující stránky v Google Search Console</h2>



<p>Webová služba <a href="https://www.google.com/webmasters/tools/"><b>Google Search Console</b></a> (dříve <i>Google Webmaster Tools</i>) disponuje přehledem odkazů, které na daný web míří. Tento seznam se nachází pod <i>Návštěvnost z vyhledávání → Odkazy na vaše stránky</i>:</p>

<p><img src="/files/odkud-prisel/odkazy-gwt.png" alt="Odkud návštěvník přišel v Google Search Console" class="border"></p>













<p>Přehled odkazující stránek ale není moc použitelný. Jsou zobrazovány pouze <b>domény</b> a seznam ani nejde například <b>filtrovat podle časového období</b>.</p>



<h2 id="zpetne-odkazy">Zjištění zpětných odkazů</h2>

<p>Existuje řada služeb, které monitorují odkazy mezi weby a jsou schopny je zobrazovat.</p>

<p>Bývají placené, ale něco zobrazí i zdarma:</p>

<div class="internal-content">
  <ul>
    <li>Nástroje pro kontrolu a analysování stránky: <a href="/kontrola-stranky#zpetne-odkazy">Zpětné odkazy</a></li>
  </ul>
</div>


<h2 id="ga">Zdroj návštěvnosti v Google Analytics</h2>

<p>V nástroji <a href="/ga">Google Analytics</a> je tento přehled v nabídce <i>Akvizice → Všekerá návštěvnost → Odkazy</i>.</p>

<p>Pro zjišťování příchozí návštěvnosti i z jiných zdrojů jako jsou <b>vyhledávače, RSS neboo sociální sítě</b> slouží položka o řádek výš – <i>Zdroj/médium</i>.</p>

<p><img src="/files/odkud-prisel/odkazy.png" alt="Odkud návštěvník přišel v Google Analytics" class="border"></p>


















<a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=13&amp;topic=164120">GA - návštěvnost - zdroje návštěvnosti </a>







<h2 id="vlastni">Vlastní řešení v PHP</h2>

<p>Pomocí <a href="/php">PHP</a> jde relativně jednoduše zaznamenávat odkazující stránky, ze kterých někdo přišel. Slouží k tomu HTTP hlavička referer – je dostupná v proměnné <code>$_SERVER</code>:</p>


<pre><code>Odkazující stránka: &lt;?=$_SERVER["HTTP_REFERER"]?></code></pre>

<p>Tuto hodnotu stačí někam uložit (soubor/database) a to je všechno.</p>









<h2 id="miniaplikace">Miniaplikace.blueboard.cz</h2>

<p>Jednoduché hotové řešení nabízí počítadlo na miniaplikace.blueboard.cz. Po vložení krátkého skriptu do stránky kromě počtup přístupů zaznamenává i odkazující stránky.</p>

<p>Zobrazuje se jen 50 adres, ze kterých přišlo nejvíce lidí. To většinou pro menší weby stačí, protože významnější odkazy se do tohoto přehledu v pohodě dostanou.</p>







<h2 id="toplist">Toplist</h2>

<p>Odkazující stránky umí zobrazit i počítadlo od Toplistu.</p>