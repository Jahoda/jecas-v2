---
title: "Vyloučení vlastních návštěv v Google Analytics"
headline: "Odstranění vlastních návštěv v Google Analytics"
description: "Jak v Google Analytics vyloučit ze statistik svých webů vlastní návštěvy."
date: "2013-06-15"
last_modification: "2013-06-15"
status: 1
tags: ["ga", "google", "seo"]
format: "html"
---

<p>U webů s nízkou návštěvností mohou vlastní návštěvy webu významně zamíchat se statistikami (u vysoké návštěvnosti to statistiky příliš neovlivní), tudíž se nabízí své návštěvy vyfiltrovat. Existují různé způsoby.

<h2>Odfiltrování IP adres v Google Analytics</h2>
<p>Přímo v rozhraní GA lze omezit IP adresy.
<ol>
<li>Na <a href="https://www.google.com/analytics/web/">hlavní straně</a> je vpravo nahoře tlačítko „Správce“,
<li>po prokliknutí vybereme potřebný účet,
<li>zvolíme „Všechny filtry“ (druhý zdola),
<li>zvolíme „Nový filtr“
<li>a už konečně zadáme přesnou IP adresu nebo její začátek atp.
</ol>
<img class=border alt="Odfiltrování IP adresy v Google Analytics" src="/files/ga/filter.png">

<p>Co když ale filtr dle IP nestačí? Například se na své stránky připojujeme z více míst…

<h2 id=blokovani>Blokování měřicích skriptů</h2>
<p>Používáme-li několik málo zařízení z různých IP adres, můžeme měření zablokovat přímo v prohlížeči nebo operačním systému.

<dl>
<dt>Blokování v prohlížeči
<dd><ul><li><p>První možnost je použít nějaký obyčejný AdBlock a zablokovat přímo měřicí skript. Nachází se na URL:
<pre><code>http://www.google-analytics.com/analytics.js</code></pre>
<li><p>Nebo použít doplněk do libovolného prohlížeče přímo od Google: <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Browser Add-on</a>
</ul>

<dt>Blokování v OS
<dd><ul><li><p>Pokud na daném zařízení ladíme web ve více prohlížečích, může být otravné zařizovat blokaci v každém z nich. Rychlé řešení je doménu <code>google-analytics.com</code> <i>zablokovat</i> v <a href="http://en.wikipedia.org/wiki/Hosts_(file)">souboru <code>host</code></a>. Tedy do <code>host</code> přidat:
<pre><code>127.0.0.1         google-analytics.com</code></pre>
<p>Na této doméně běží měřicí skript. Samotné Google Analytics budou fungovat bez problémů.

<li><p>Používá-li se nesprávcovský účet, lze blokování realisovat pomocí funkce „Rodičovská kontrola“:
<pre><code>Ovládací panely\Uživatelské účty a zabezpečení rodiny\Rodičovská kontrola</code></pre>
</ul>
</dl>

<h2 id=cms>„Blokování“ v redakčním systému</h2>
<p>Další možnost je sám sobě měřicí kód na stránky vůbec nevypsat. Takto je možné provést i výjimky pro IP adresy bez nastavování GA (Google Analytics).
<pre><code>&lt;?php
if ($_SERVER['REMOTE_ADDR'] !== '127.0.0.1') {
// Kód Google Analytics
}</code></pre>

<p>Nebo lépe kód nevypisovat pro určité uživatelské role. Potom bude blokování za předpokladu přihlášení fungovat napříč zařízeními i IP adresami.
<p>Nakonec lze takto uživatele zalogovat s poznámkou do GA pomocí <code><a href="https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration?hl=cs#_gat.GA_Tracker_._setCustomVar">_setCustomVar</a></code> a podle toho je později vyfiltrovat.