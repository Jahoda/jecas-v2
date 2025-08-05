---
title: "Hodně souborů ve složce"
headline: "Hodně souborů v jedné složce"
description: "Proč je problém ukládat do jedné složky velké množství souborů."
date: "2014-06-18"
last_modification: "2014-06-20"
status: 1
tags: ["napady"]
format: "html"
---

<p>Ve webové aplikaci často potřebujeme ukládat například <b>obrázky</b> k jednotlivým článkům. Nabízí se udělat to nejjednodušší, vytvořit jednu složku a tam nahrávat obrázek za obrázkem.</p>

<p>Proč to <b>není</b> úplně vhodné?</p>

<p>Když pominu <b>problematickou orientaci</b> ve složce se všemi obrázky na jedné hromadě (to ostatně často nemusí být tolik potřeba). Existuje větší hrozba – při opravdu velkém množství souborů v jedné složce bude práce s nimi <b>velmi pomalá</b>. Dokonce se může stát, že <b>otevřít takovou složku</b> bude téměř nemožné.</p>

<h2 id="best-practice">Best practice</h2>

<p>Rozumné se zdá <b>obrázky ke konkrétní článkům</b> ukládat do složky typu:</p> 
<pre><code>/obrazky/nazev-clanku/obrazek.jpg</code></pre>
<p>Zpravidla k jednomu článku nebude existovat tolik obrázků, aby jich bylo tolik, že by to vadilo.
</p>

<p>Alternativou je obrázky dělit do složek podle <b>kalendářního data</b>. Dává to smysl zvlášť v případě, když obrázek přímo nesouvisí jen s jedním článkem. Taková adresa je potom na způsob:</p> 
<pre><code>/obrazky/2014/06/18/obrazek.jpg</code></pre>
<p>Toto řešení (s vypuštěním konkrétního čísla dne) používá ve výchozím nastavení <b>Wordpress</b>.</p>

<p>V PHP se toho snadno docílí použitím funkce <a href="http://cz2.php.net/manual/en/function.date.php"><code>date</code></a>.</p>

<pre><code>echo date("Y/m/d"); // 2014/06/18
</code></pre>


<h3 id="kratke-adresy">Krátké adresy</h3>

<p>Co v případě, že chceme mít krátké adresy? Třeba u nějaké služby pro <b>upload obrázků</b>. Potom asi nezbývá než obrázky rozdělovat do adresářů dle kalendářního data a vést k nim <b>záznamy v databási</b>. Při požadavku na soubor se podívat do DB a na základě toho sestavit cestu k obrázku na disku.</p>

<p>Vyhledávání v DB bývá i při milionech položek <b>velmi rychlé</b>.</p>