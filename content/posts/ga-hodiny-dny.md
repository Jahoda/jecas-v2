---
title: "Google Analytics: Návštěvnost podle hodin a dní"
headline: "Google Analytics: Přehled podle hodin"
description: "Jak v Google Analytics zobrazit podíl návštěv dle denní doby nebo dnů v týdnu."
date: "2015-05-20"
last_modification: "2015-05-21"
status: 1
tags: ["ga"]
format: "html"
---

<p>Například pro provádění <b>servisních prací</b> na stránce se hodí znát její vytíženost během denní doby. Úpravy způsobující nefunkčnost stránky tak jde provést v době, kdy to <b>nepostihne příliš návštěvníků</b>.</p>

<p>Cílem jde tedy dostat graf typu:</p>

<p><img src="/files/ga-hodiny-dny/podle-hodin.png" alt="Zobrazení návštěvnosti podle hodin" class="border"></p>













<p>Unikátní zobrazení stránek je rozděleno podle jednotlivých hodin ve <b>stanoveném časovém období</b>. Graf pochází z tohoto webu a je na něm vidět, že kolem 4. hodiny ranní na web skoro nikdo nechodí.</p>



<h2 id="vlastni-prehled">Vytvoření vlastního přehledu</h2>

<p>Pro vykreslení obdobného grafu je vhodné si vytvořit <b>vlastní přehled</b>. Taková možnost je v Google Analytics v hlavní nabídce <i>Přizpůsobení</i>.</p>


<p><img src="/files/ga-hodiny-dny/novy-prehled.png" alt="Vytvoření vlastního nového přehledu" class="border"></p>















<p>Celé nastavení přehledu vypadá následovně. Kromě určení metrik a dimensí je nutné ještě vybrat data webů, ze kterých se má přehled vytvořit.</p>

<p><img src="/files/ga-hodiny-dny/vytvoreni-prehledu.png" alt="Vytvoření přehledu" class="border"></p>
















































<p>Jako metrika poslouží například <i>Unikátní zobrazení stránek</i>:</p>


<p><img src="/files/ga-hodiny-dny/metrika.png" alt="Nastavení metriky" class="border"></p>




















<p>Nyní zbývá nastavit dimensi, což může být právě <i>Hodina</i>, <i>Den v týdnu</i>, <i>Den v měsíci</i> a podobně.</p>

<p><img src="/files/ga-hodiny-dny/dimenze.png" alt="Nastavení dimense" class="border"></p>


















