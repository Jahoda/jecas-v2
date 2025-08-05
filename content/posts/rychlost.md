---
title: "Rychlost"
headline: "Rychlost"
description: "Jak zrychlit načítání a vytvořit rychle se načítající stránku."
date: "2014-09-17"
last_modification: "2014-09-17"
status: 0
tags: []
format: "html"
---

<h2 id="jak-funguje">Jak funguje načítání stránky</h2>

<p>Pro začátek je vhodné pochopit princip, kterým probíhá načítání stránky.</p>

<ol>
  <li>
    <p>Uživatel <b>zadá adresu domény</b> do prohlížeče a stiskne <kbd>Enter</kbd>. Nebo se na web proklikne.</p>
  </li>
  
  <li>
    <p>Pro danou doménu proběhne tzv. <b>DNS Lookup</b> (v překladu hledání v systému doménových jmen, DNS = <i>Domain Name System</i>), čímž se z doménového jména zjistí skutečné umístění serveru (IP adresa). To zabere nějaký čas. Výhoda je, že to stačí udělat <b>pouze jednou</b>. Potom se IP adresa domény <b>uloží do cache</b> a další požadavky i případné načítání dalších stránek DNS Lookup provádět nebude.</p>
    
    <p>Z toho plyne, že stahování obsahu z více domén znamená více <i>DNS Lookupů</i> a potenciální <b>zdržení stránky</b>.</p>
    
    <p>Toto zdržení jde minimalisovat pomocí HTTP hlavičky nebo <code>&lt;link></code> značky  <b>preconnect</b>:</p>
    
    <div class="external-content">
      <ul>
        <li><a href="https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/">Eliminating Roundtrips with Preconnect</a></li>
      </ul>
    </div>
  </li>
  
  <li>
    <p>Prohlížeč se pokusí s webovým serverem <b>navázat TCP spojení</b>. To zabere nějaký čas, protože je tzv. <i>trojcestné</i> (three-way handshake). Prohlížeč pošle požadavek na server, ten mu odpoví, prohlížeč odpoví serveru. To všechno pochopitelně bude mít nějakou <b>časovou prodlevu</b>.</p>
    
    <div class="external-content">
      <ul>
        <li>Wikipedie: <a href="http://cs.wikipedia.org/wiki/Transmission_Control_Protocol#Nav.C3.A1z.C3.A1n.C3.AD_a_ukon.C4.8Den.C3.AD_spojen.C3.AD">Navázání a ukončení spojení v TCP</a></li>
      </ul>
    </div>    
  </li>
  
  <li>
    <p>Následně (po navázání spojení) konečně <b>webový server</b> (například <a href="/localhost">Apache</a>) dostane HTTP požadavek a může začít připravovat obsah.</p>
    
    <p>Zde záleží na rychlosti serveru a rychlosti skriptů obsah připravující. Nejrychlejší odpověď bude typicky u <b>statických souborů</b> (statické HTML stránky, obrázky, styly, skripty).</p>
  </li>
  
  <li>
    <p>Obsah se následně začně <b>stahovat do prohlížeče</b>. Zde se projeví další vlastnost <b>TCP spojení</b> nazývaná <a href="http://en.wikipedia.org/wiki/Slow-start">Slow-start</a>. Ta slouží jako ochrana před zahlcením příjemce a funguje tak, že se začíná posílat pomalu a <b>postupně se zrychluje</b>.</p>
    
    <p>V praxi to znamená, že není možné ihned využít <b>maximální „rychlost“ připojení</b>, ale rychlost se musí <i>rozjet</i>. I tak ale typicky samotné <b>stažení souboru</b> netrvá nejdelší dobu celého požadavku. Většinu doby častěji zabere DNS Lookup, navázání spojení a připravení dat na serveru.</p>
    
    <p><b>Velký datový objem</b> je tedy zpravidla problém pouze pro pomalá připojení, řekněme do  nízkých jednotek megabitů za sekund nebo pro uživatele s <b>datovým limitem</b>. Při rychlosti <b>nad 5 Mbs</b> už většinu času více zabere samotná režije s <b>HTTP požadavkem</b>.</p>
    
    <p>Příklad požadavku na hlavní stránku <code>jecas.cz</code>:</p>
    
    <p><img src="/files/rychlost/priklad-http-pozadavku.png" alt="Doba jednotlivých částí požadavku na soubor" class="border"></p>
    
    <p>Je tedy vidět, že TCP se hodí pro dlouhé přenosy velkého objemu dat, místo krátkých přenosů spousty malých souborů, což je případ použití na webové stránce. Jelikož každé spojení má poměrně <b>vysokou režii</b>, bývá vhodné jich potřebovat co nejméně.</p>
  </li>
  
  <li>
    <p>Když prohlížeč takto získá obsah stránky, začne v něm hledat <b>externí objekty</b>:</p>
    
    <ul>
      <li>ikonu webu (<i>favicon</i>),</li>
      <li>obrázky,</li>
      <li>externí CSS,</li>
      <li>externí JavaScript,</li>
      <li>externí objekty (rámy, videa, pluginy a podobně)</li>
    </ul>
    
    <p>Každý z těchto prvků potom znamená další <b>HTTP požadavek</b>, načež externí prvky mohou způsobit zase další požadavky (obrázky v CSS, připojení dalších externích skriptů nebo stylů v JavaScriptu či kompletní načítání stránky v <code>&lt;iframe></code>).</p>
    
    <p>Zde jde velmi rychle narazit na <b>limit souběžných HTTP připojení</b>, který čítá kolem 6 spojení k jedné doméně zároveň (<b>Firefox</b>, <b>Chrome</b>).</p>
    
    <div class="external-content">
      <ul>
        <li><a href="http://www.browserscope.org/?category=network">Browserscope</a> – přehled maximálních počtů HTTP spojení</li>
      </ul>
    </div>
    
    <p>To je další důvod pro minimalisaci jejich počtu. Protože další požadavky budou muset čekat na odbavení těch předchozích.</p>
  </li>
  
  <li>
    <p>Jak se začne do prohlížeče <b>stahovat obsah</b>, začne se zpracovávat a <a href="/vykreslovani">vykreslovat stránka</a>.</p>
    
    <p>Zde hraje roli taková nepěkná věc, kterou je <b>blokování vykreslování</b>. Prohlížeče čekají na externí styly a skripty v hlavičce stránky (<code>&lt;head></code>).</p>
    
    <p>Na CSS se čeká proto, že v opačném případě by musel prohlížeč stránku <b>vykreslovat vícekrát</b>. Nejdříve bez stylů, potom se styly (případě ještě v nějakém mezistavu s částečně načtenými styly).</p>
    
    <p>Pokud je CSS soubor větší nebo zkrátka chceme mít načítání co možná nejrychlejší, řešení je <b>stěžejní části CSS</b> umístit přímo do HTML značky <code>&lt;style></code>. Stěžejní části jsou styly pro obsah, který je tzv. <i>nad ohybem</i>, což je část stránky ihned viditelná před jakýmkoliv rolováním.</p>
    
    <p>Na JavaScript se potom čeká kvůli tomu, že používání JS funkcí z externího <code>*.js</code> v <code>on*</code> HTML atributech nebo <code>&lt;script></code> značkách by se odkazovalo na neexistující (ještě nenačtené) věci.</p>
    
    <p>Dobrým zvykem bývá dělat stránky pokud možno funkční bez JS, takže nevadí <b>asynchronní načtení skriptů</b>.</p>
  </li>
</ol>


	
<h2 id="cil">Co je cílem?</h2>

<p>Pro rychlost reakce se obecně udávají tyto <b>časové parametry</b>:</p>

<ul>
  <li>odpověď <b>do 100 milisekund</b> vypadá jako okamžitá,</li>
  
  <li>odpověď <b>do 1 vteřiny</b> je sice se znatelnou prodlevou, ale uživatele nějak zvlášť neobtěžuje,</li>
  
  <li><b>po 10 vteřinách</b> načítání dojde návštěvníkovi trpělivost a půjde dělat něco jiného (osobně bych </li>
</ul>

<p>Cílem je tedy se dostat pod 100 milisekund, pochopitelně je otázka za jako cenu.</p>


<h2 id="analysa">Analysování načítání</h2>

<p>Před prováděním konkrétní <b>optimalisačních technik</b> je dobré nejdříve prozkoumat, jak si stránka vede.</p>

<p>Užitečný je k tomu zejména nástroj <a href="http://www.webpagetest.org/">WebPagetest</a>, který po zadání URL stránku vyhodnotí a přehledně znázorní <b>průběh načítání</b>.</p>



<h2 id="odkazy">Odkazy jianm</h2>

<ul>
  <li><a href="https://sites.google.com/a/webpagetest.org/docs/">WebPagetest Documentation</a></li>
  <li><a href="http://www.nngroup.com/articles/response-times-3-important-limits/">Response Times: The 3 Important Limits</a></li>
  <li>
  <a href="https://speakerdeck.com/addyosmani/css-performance-tooling">CSS Performance Tooling</a>
</li>
  <li>
    Video: <a href="https://www.youtube.com/watch?v=R8W_6xWphtw">Paul Irish, "Delivering the goods" - Fluent 2014 Keynote</a> (<a href="https://docs.google.com/presentation/d/1MtDBNTH1g7CZzhwlJ1raEJagA8qM3uoV7ta6i66bO2M/present?slide=id.g3eb97ca8f_1347">presentace</a>)
  </li>
  
  <li>TimKadlec.com: <a href="http://timkadlec.com/2014/01/fast-enough/">Fast Enough</a></li>
  
  <li><a href="http://www.jakpsatweb.cz/clanky/na-co-stranka-ceka.html">Na co stránka čeká</a></li>
  
  <li>Google Developers: <a href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path">Optimizing the Critical Rendering Path</a></li>
  
  <li><a href="https://github.com/w3c/frame-timing/wiki/Explainer">W3C Frame Timing</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Tips_for_authoring_fast-loading_HTML_pages">Tips for authoring fast-loading HTML pages</a></li>
  
  <li><a href="http://davidwalsh.name/site-speed">5 Ways to Make Your Site Exponentially Smaller and Faster</a></li>
  
  <li><a href="http://www.filamentgroup.com/lab/weight-wait.html">More Weight Doesn't Mean More Wait</a> – samotná datová velikost nemusí být hlavním faktorem ovlivňující rychlost načtení </li>
  
  <li><a href="http://perf-tooling.today/tools">Performance tooling today</a> – 137 nástrojů pro zrychlení stránky</li>
  
  <li><a href="https://kinsta.com/learn/page-speed/">A Beginner’s Guide to Website Speed Optimization</a></li>
  
  <li>Bocoup: <a href="https://bocoup.com/weblog/smaller-faster-websites">Smaller, Faster Websites</a></li>
  
  <li><a href="http://www.getelastic.com/how-page-load-speed-affects-conversion-infographic/">How Page Load Speed Affects Conversion [Infographic]</a></li>
</ul>


backface-visibility
-webkit-backface-visibility: hidden