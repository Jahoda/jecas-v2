---
title: "Vývojářské nástroje v prohlížečích"
headline: "Nástroje pro vývojáře v prohlížečích"
description: "Pro testování a ladění webu existují (nebo je lze snadno doplnit) ve všech rozšířených prohlížečích vývojářské nástroje."
date: "2013-05-17"
last_modification: "2013-05-18"
status: 1
tags: ["produktivita", "webove-prohlizece"]
format: "html"
---

<h2 id=ie>Internet Explorer</h2>
<p>Nové IE mají vývojářský panel v základu, stačí stisknout klávesu <kbd>F12</kbd>. <a href="/ie11">Internet Explorer 11</a> má <b>vývojářské nástroje</b> značně přepracované a obsahují <a href="/ie11#vyvojarske-nastroje">nové užitečné funkce</a>.</p>
<h3 id="ie11">IE 11</h3>  
<p><img src="/files/ie11/ui-res.png" alt="" class="border"></p>
<h3 id="ie10">IE 10</h3>
<p>
  <img src='/files/devtools/ie.png' class='border' alt='Vývojářský nástroj v Internet Exploreru 10'>
</p>

<h3 id="ie-tester">IE Tester</h3>
<p>Pro starší Explorery nebo <a href='http://www.my-debugbar.com/wiki/IETester/HomePage'>IETester</a> existuje <a href='http://www.my-debugbar.com/wiki/Doc/DebugbarInstall'>doplněk DebugBar</a>. V IETesteru se spouští kombinací kláves <kbd>Alt</kbd> + <kbd>B</kbd>.
<img src='/files/devtools/debugbar.png' class='border' alt='Doplňek DebugBar v IETesteru'>

<h2 id=chrome>Google Chrome</h2>
<p>Taktéže nabízí developerské nástroje pod klávesou <kbd>F12</kbd>
<img src='/files/devtools/chrome.png' class='border' alt='Vývojářský nástroj v Chrome'>

<h2 id=firefox>Mozilla Firefox</h2>
<p>Do tohoto prohlížeče je vhodné nainstalovat <a href='https://www.getfirebug.com/'>plugin Firebug</a>, potom se rovněž bude spouštět klávesou <kbd>F12</kbd>.
<img src='/files/devtools/firebug.png' class='border' alt='Firebug v prohlížeči Firefox'>

<h2 id=opera>Opera</h2>
<p>V Opeře se používá přítomný nástroj <b>Opera Dragonfly</b>. <small>Jelikož v Opeře byla klávesa <code>F12</code> zabraná</small>, lze ve výchozím nastavení použít <i>pohodlnou</i> zkratku <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>.

<img src='/files/devtools/opera.png' class='border' alt='Dragonfly v Opeře'>

<h2 id=funkce>Základní funkce</h2>
<p>Ačkoliv je každý nástroj jiný, základní nejužitečnější funkce jsou podobné.

<dl>
<dt id=prozkoumat>Prozkoumávání elementů
<dd><p>V případě, že nějaká část stránky nevypadá podle představ, touto funkcí se jí lze podívat na zoubek.
<ul>
<li>Ve Firefoxu (Firebugu) a Chrome, je při kliknutí pravého tlačítka dostupná volba „Prozkoumat/zkontrolovat prvek“.
<li>V IE je tato volba pod ikonou šipky (nebo dostupná klávesovou zkratkou <kbd>Ctrl</kbd> + <kbd>B</kbd>).
<li>V Opeře na kartě „Dokument“.
</ul>
<p>Po vybrání prvku se potom v levé části rozbalí umístění prvku v HTML stromu a v pravé části lze prohlížet, editovat, vypínat a přidávat kaskádové styly.

<dt id=sit>Připojení/síť
<dd><p>Na této kartě je k disposici přehled o průběhu načítání stránky. Lze tak vyzkoumat, co stránku nejvíce brzdí, kolik se přenese dat a kolik se použije HTTP požadavků. Pro detailnější přehled je užitečný doplněk <a href='https://developers.google.com/speed/pagespeed/insights_extensions?hl=cs'>PageSpeed</a> (pro Chrome a Firefox).
<p>Kromě toho lze touto funkcí jednoduše zjistit skutečné adresy multimediálních souborů (videí, obrázků, zvuků), které se stahují přes nějaký tajemný vložený objekt.
  
  <p>Užitečná je možnost <b>omezit rychlost připojení</b>. Jenom je dobré ji nezapomenout vypnout, když testování skončí.
    
    <p><img src='/files/vyvojarske-nastroje/nastaveni-rychlosti.png' class='border' alt='Omezení rychlosti připojení'></p>

<dt id=konsola>Chybová konsola
<dd><p>Pro odhalování chyb v JavaScriptu věc k nezaplacení. V Opeře je pod kartou „Chyby“ nebo ji lze otevřít do nového okna mimo Dragonfly zkratkou <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>. V ostatních prohlížečích pod stejnojmennou kartou.

<dt id=zakazani>Zakázání JS, cache, obrázků, …
<dd>
<ul>
<li>V Exploreru lze pod položkou „Zakázat“ vypnout CSS a JS; pod položkou „Obrázky“ zase grafické obohacení stránky; a v nabídce pod položkou „Mezipaměť“ je možné vypnout cache (zvolit „Vždy aktualisovat ze serveru“).
<li>Ve Firebugu lze zakazovat po kliknutí na malou šipku vedle jednotlivých záložek.
<li>V Chrome jsou tyto možnosti v nastavení, do kterého se lze dostat kliknutím na ozubené kolečko vpravo dole.
<!--<li>A v Opeře v Dragonfly těžko říct… Ale lze si jednoduše <a href='http://operawiki.info/CustomButtons#quickprefs'>přidat tlačítka</a> nebo nainstalovat <a href='http://nontroppo.org/ini/toolbar/WebDev_Toolbar_V1.6.ini'>WebDevToolbar</a>.-->
</ul>
</dl>

<h2 id=odkazy>Odkazy jinam</h2>
<dl>
<dt><a href='http://devtoolsecrets.com/'>devtoolsecrets.com</a>
<dd>Přehled funkcí ve vývojářských nástrojích (anglicky). S možností filtrovat jednotlivé funkce pro každý prohlížeč zvlášť.
</dl>