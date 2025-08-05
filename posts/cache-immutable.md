---
title: "Immutable cacheování trvalých souborů"
headline: "Cache-Control: immutable – cache trvalých souborů"
description: "HTTP hlavičkou <code>Cache-Control: immutable</code> jde zamezit opětovanému kontrolování neměnných souborů a zrychlit tak načítání."
date: "2017-03-19"
last_modification: "2018-07-14"
status: 1
tags: ["napady", "zrychlovani"]
format: "html"
---

<p>Pro rychlé načítání webu je důležité všechny objekty, které prohlížeč stahuje, dobře cacheovat.</p>

<p>Dost často jde <b>statický obsah</b> cacheovat na hodně dlouho. Tam mohou patřit soubory jako (a možná ještě další):</p>

<ol>
  <li>styly,</li>
  <li>skripty,</li>
  <li>obrázky,</li>
  <li><a href="/video">videa</a></li>
  <li><a href="/font-face">fonty</a>,</li>
  <li><a href="/favicon">favicony</a></li>
</ol>










<p>V případě tohoto statického obsahu to znamená cacheovat s co možná <b>nejdelší dobou expirace</b>. Prohlížeč potom při opakovaných požadavcích na tento obsah dostane odpověď <i>304 Not Modified</i> – signalisující, že nedošlo ke změně – a nemusí tak soubory znovu stahovat.</p>




<p>Pokud je potřeba obsah těchto souborů změnit, <b>změní se jim URL</b> (stačí klidně přidat nějaké časové razítko, otisk souboru nebo číslo verse za otazník):</p>

<pre><code>&lt;link rel="stylesheet" href="styl.css<b>?v2</b>"></code></pre>







<p>Prohlížeč potom stáhne nový soubor a bude ho zase cacheovat na hodně dlouhou dobu.</p>




<h2 id="304">Režie s 304 Not Modified</h2>

<p>Ačkoliv hodně vzdálená expirace souboru ušetří opětovné přenášení dat, pořád to znamená <b>dotaz na server</b> a čekání na odpověď, že se nic nezměnilo.</p>

<p>U malých souborů může být tato režie i větší než samotné stahování obsahu.</p>

<p>Pokud je jasné, že se obsah na dané URL nikdy měnit nebude a případné změny se zajistí změnou URL, hodí se právě příznak <i lang="en">immutable</i> – česky „neměnný“.</p>







<p>Prohlížeč díky <i lang="en">immutable</i> příznaku bude vědět, že se daný soubor nikdy nezmění. U webů s hodně objekty (typicky obrázky), kde uživatelé často refreshují (např. sociální sítě), se tím značně zrychlí opakované načítání.</p>

<p>Toto klíčové slovo se uvádí v HTTP hlavičce <code>Cache-Control</code>:</p>


<pre><code>Cache-Control: max-age=365000000, <b>immutable</b></code></pre>





<p>Parametr <code>max-age</code> uvádí dobu do expirace cache od prvním přístupu k souboru v <b>sekundách</b>.</p>


<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Příznak v hlavičce <code>immutable</code> jako první implementoval <b>Firefox 49</b> a funguje jen na <a href="/https">HTTPS</a>. Hlavičku <code>immutable</code> posílá např. Facebook.</p>

<p><b>Chrome</b> se podle všeho snaží optimalisovat dotazy na neexpirované soubory při běžném načtení:</p>

<p><img src="/files/cache-immutable/typy-nacteni.png" alt="Různé typy načtení v Chrome" class="border"></p>









<p>A od <b>Chrome 54</b> podporuje i tuto hlavičku. Podporu v ostatních prohlížečích se mi nepodařilo zjitit.</p>



<p>Nicméně uvést <code>immutable</code> do hlavičky je bezpečné a v nepodporovaných prohlížečích nic nerozbije, takže se nejspíš vyplatí i pouze pro <b>Firefox</b> a <b>Chrome</b>.</p>



<h2 id="implementace">Implementace</h2>

<p>Nastavení dlouhé platnosti neměnných souborů může při použití souboru <code>.htaccess</code> vypadat následovně:</p>

<pre><code>&lt;filesMatch ".(css|js|jpg|jpeg|png|gif|svg|ico)$">
  Header set Cache-Control "max-age=365000000, public, <b>immutable</b>"
&lt;/filesMatch></code></pre>









<p>Navíc je v příkladu ještě příznak <code>public</code>, který značí, že se jedná o veřejně přístupný obsah.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Bits Up!: <a href="https://bitsup.blogspot.cz/2016/05/cache-control-immutable.html">Cache-Control: immutable</a></li>
  
  <li>Mozilla Hacks: <a href="https://hacks.mozilla.org/2017/01/using-immutable-caching-to-speed-up-the-web/">Using Immutable Caching To Speed Up The Web</a></li>
</ul>