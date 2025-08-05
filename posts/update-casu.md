---
title: "Dynamický update času „před X minutami“"
headline: "Dynamický update času „před X minutami“"
description: "Jak skriptem na stránce průběžně aktualisovat datum v podobě „zasláno před X minutami“."
date: "2014-07-04"
last_modification: "2014-07-13"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>V případě, že se na stránce zobrazuje místo běžného data text typu „<b>zasláno před 1 hodinou</b>“, je dobré tento údaj JavaScriptem průběžně aktualisovat.</p>

<p>Pro získání slovní representace kalendářního data v PHP se perfektně hodí funkce <a href="https://github.com/fprochazka/nette-components/blob/master/TimeAgoInWords/Helpers.php"><code>timeAgoInWords</code></a>, která obsahuje i správné <b>české skloňování</b>.</p>

<p>Pro docílení průběžné aktualisace času stačí tedy:</p>

<ol>
  <li><a href="/php2js">Převést PHP funkci do JS</a>.</li>
  
  <li>Vytvořit funkci, co projde všechny příslušné elementy a upraví jejich obsah.</li>
  
  <li>Tato funkce se bude spouštět opakovaně (například každou minutu).</li>
</ol>

<p><a href="http://kod.djpw.cz/nleb">Živá ukázka hotového řešení</a></p>


<h2 id="time">Element <code>&lt;time></code></h2>

<p>Pro uvedení data/času se nabízí použít HTML značku <code>&lt;time></code>. Slovní representace času bude jako její obsah (v JS <a href="/innerhtml"><code>innerHTML</code></a>). Skutečný a <i>strojově čitelný</i> datum potom bude v atributu <code>datetime</code>.</p>

<pre><code>&lt;time datetime="2014-07-04T10:37:00">
  Před X hodinami
&lt;/time></code></pre>

<p>Původní obsah může buď vypsat PHP, nebo se první JavaScriptový update času spustí ihned po načtení stránky.</p>

<p>Písmeno <code>T</code> mezi datem a časem je kvůli <b>Firefoxu</b> a <b>IE</b>, které si s běžným <code>2014-07-04 10:37:00</code> neporadí.</p>


<h2 id="nepresnost">Nepřesnosti</h2>



<p>Komplikace přináší fakt, že datum na straně klienta (v JavaScriptu) nemusí a nejspíš také <b>nebude shodné s časem na serveru</b>.</p>

<h3 id="casova-pasma">Časová pásma</h3>

<p>Je tedy poměrně vhodné u data a času uvést na straně serveru <b>časové pásmo</b>:</p>

<pre><code>&lt;time datetime="2014-07-04T10:37:00<b>+02:00</b>">
  Před X hodinami/měsíci/roky
&lt;/time></code></pre>

<h3 id="presny-cas">Přesnější doba prodlevy</h3>

<p>Je potřeba si zvážit do jaké míry má být údaj přesný.</p>

<p>V případě počítání <b>rozdílu mezi časem</b> ze serveru a od návštěvníka to nejspíš žádná sláva nebude (přesný/stejný čas by musel mít nastaven návštěvník i server).</p>

<p>Nabízejí se následující řešení:</p>

<ol>
  <li>
    <p>Čas pro zjišťování rozdílu si zjišťovat <a href="/ajax">AJAXem</a> ze serveru. Zvlášť v případě, že je na stránce nějaké automatické <b>kontrolování nového obsahu</b>, není problém do odpovědi serveru přibalit hodnotu aktuálního data.</p>
  </li>
  
  <li>
    <p>Při <b>načtení stránky</b> si do jedné JS proměnné vypsat čas na serveru a do druhé aktuální čas klienta. Z toho potom počítat nepřesnost mezi časy a výsledný rozdíl tak upravit.</p>
  </li>
  
  <li>Na serveru si do <code>&lt;time></code> vypsat přímo <b>počet sekund</b>. V JavaScriptu si uložit do proměnné <b>čas klienta</b> a při spuštění aktualisace ho odečíst od <b>aktuálního klientského času</b>. Tento rozdíl se potom přičte k rozdílu ze serveru a výsledek je připraven.</li>
</ol>