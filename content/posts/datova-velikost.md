---
title: "Datová velikost stránky"
headline: "Datová velikost stránky"
description: "Jak by měla být stránka datově velká pro rozumně rychlé načítání."
date: "2015-07-06"
last_modification: "2015-07-09"
status: 1
tags: ["napady", "zrychlovani"]
format: "html"
---

<p>Pro návštěvníky je příjemné, když se web <b>rychle načítá</b>. Tomu jde mimo jiné pomoci tak, že pro zobrazení webu nebude potřeba stahovat <b>velký objem dat</b>.</p>

<p>Úspornou velikost stránky dále ocení hlavně lidé používající internetové připojení s <b>limitem stažených dat</b>, případně za internet platí na základě přenesených MB/GB.</p>

<div class="external-content">
  <ul>
    <li><a href="http://whatdoesmysitecost.com/">What Does My Site Cost?</a> – přepočítává celková data stažená na stránce na cenu dat v jednotlivých zemích</li>
  </ul>
</div>

<p>Výsledek hlavní stránky <a href="http://jecas.cz">jecas.cz</a>:</p>

<p><img src="/files/datova-velikost/cena.png" alt="Simulace rychlostí připojení v Chrome" class="border"></p>















<p>Kolik stojí načtení vašeho webu?</p>



<h2 id="rychlost-data">Rychlost načítání vs. objem dat</h2>

<p>Jak rychle se stránka načte může, ale <b>nemusí vždy významně ovlivňovat</b> datová velikost. Pro pocit, že je web rychlý, je potřeba:</p>

<ol>
  <li>co nejrychlejší <b>odezva ze strany serveru</b>,</li>
  
  <li>co nejrychlejší <b>zobrazení hlavního obsahu</b></li>
</ol>

<p>Když návštěvník už <b>něco vidí</b> a může si stránku prohlížet, nemusí ho trápit, že se někde stahují další objemná data. Pokud mu tedy nejde o úsporu přenesených dat. Že stránka spotřebuje spoustu dat ale většinou neví.</p>




<h2 id="limit">Jakou datovou hranici zvolit</h2>

<p>Pochopitelně <b>nelze stanovit přesnou hranici</b>, kdy je web ještě datově rozumný a kdy už příliš náročný.</p>



<h3 id="pomale">Pomalé mobilní připojení</h3>

<p>Vycházet jde ale například z toho, že rychlost špatného mobilního připojení může být pouhých <b>250 kb</b> (kilobitů) za vteřinu. To odpovídá <b>31,25 kB</b> (kliob<b>y</b>tům).</p>

<p>Takové připojení bude mít <b>odezvu</b> třeba <b>300 milisekund</b>. Další je odezva serveru – například <b>100 ms</b>. Pokud se má stránka načíst <b>do 1 vteřiny</b>, zbývá 0,6 vteřiny na stahování dat. Dále TCP spojení trpí tzv. <b>pomalým startem</b> (anglicky <a lang="en" href="http://en.wikipedia.org/wiki/Slow-start">Slow-start</a>) – to znamená, že nejde ihned použít maximální přenosovou rychlost.</p>
  
<blockquote>
  <p>Pro zobrazení webu do 1 vteřiny tak zbývá prostor pro stránku cca <b>14 kB</b> v jediném HTTP požadavku, aby měl návštěvník do té doby zobrazeno alespoň něco.</p>
</blockquote>

<p>To znamená umístit hlavní obsah stránky do HTML kódu co nejvýš a před něj přidat do HTML i základní CSS. Toto <i>základní CSS</i> se obvykle nazývá termínem <b>kritické CSS</b> a jde i vygenerovat automaticky.</p>

<div class="internal-content"><ul>
  <li>Načítání CSS bez blokování vykreslování: <a href="/nacitani-css#vytvoreni">Vytvoření „kritického CSS“</a></li>
</ul></div>
<div class="external-content"><ul>
  <li>Vzhůru dolů: <a href="http://www.vzhurudolu.cz/blog/35-critical-css">Critical CSS a zrychlení zobrazení stránky</a></li>
</ul></div>






<p>Další data se potom načtou později, když už si ale návštěvník <b>má co prohlížet</b>.</p>



<h3 id="rychle">Rychlé připojení</h3>

<p>U rychlého připojení potom u běžných součástí částí stránky jako jsou:</p>

<ul>
  <li>styly,</li>
  <li>skripty,</li>
  <li>obrázky</li>
</ul>

<p>nebývá ani tak problém s <b>datovou velikostí</b>, ale spíš s počtem požadavků. Samotné stahování dat často tvoří jen zlomek doby pro získání souboru.</p>

<p>Zde pomůže hlavně <b>minimalisace počtu souborů</b>, které se stahují. Tedy spojit všechny CSS a JS soubory do jednoho a obrázky stránky, u kterých to jde, umístit do CSS sprite:</p>

<div class="internal-content">
  <ul>
    <li><a href="/css-sprite">CSS sprite</a> – Spojení všech obrázků do jednoho (CSS sprite) zrychlí načítání webu. Hotový generátor v PHP.</li>
  </ul>
</div>


<p>S velkým množství požadavků si taktéž dokáže lépe poradit <a href="/https">HTTPS</a>.</p>

<div class="external-content">
  <ul>
    <li>Souki.cz: <a href="https://www.souki.cz/optimalizujeme-pro-rychlost-https">Optimalizujeme pro rychlost: HTTPS</a> – rozdíl v rychlosti při hodně požadavcích mezi HTTPS a HTTP</li>
  </ul>
</div>




<h2 id="testovani">Simulace různých rychlostí připojení</h2>

<p>Ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> v prohlížeči <b>Chrome</b> je přímo funkce pro nastavení <b>pomalého připojení</b>. Týká se to přenosové rychlosti i odezvy.</p>

<p><img src="/files/datova-velikost/rychlost-pripojeni.png" alt="Simulace rychlostí připojení v Chrome" class="border"></p>














<p>Dostat se k této možnosti jde po přepnutí <i>device mode</i> (ikona dotykového telefonu):</p>

<p><img src="/files/datova-velikost/device-mode.png" alt="Device mode v Chrome" class="border"></p>








<p>Na základě požadavků na dobu načtení u různých připojení se potom odvíjí, jak je potřeba <b>snížit datovou náročnost</b>.</p>



<h2 id="velikost">Vliv velikosti stránky na SEO</h2>

<p><a href="/google">Google</a> uvádí, že má nastaven limit <b>10 megabytů</b> na stránku. Vyjádření <b>Johna Muellera</b> z Google ohledně datové velikosti stránky:</p>

<blockquote lang="en">
  <p>There is obviously a limit to the size of the page that we can download. I think that is around 10 megabytes. So if you have your content within those 10 megabytes, then we will be able to recognize that and show that in search.</p>
  <p class="autor"><a href="https://www.seroundtable.com/google-10-megabyte-crawl-page-20536.html">Google Crawl Limit Per Page: 10 Megabytes</a></p>
</blockquote>




<p>Přílišná datová náročnost stránky potom může negativně ovlivňovat <b>okamžitou míru opuštění</b>. Lidé zkrátka nevydrží čekat a vrátí se z webu zpět do výsledků vyhledávání, což vyhledávač dokáže měřit a na základě toho <b>upravovat umístění webu</b> (dát na lepší posici web, ze kterého lidé neutíkají).</p>