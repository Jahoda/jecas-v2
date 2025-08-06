---
title: "Jak vložit YouTube video"
headline: "Vložení videa z YouTube"
description: "Jak přidat na svou stránku video ze serveru YouTube s HTML 5 přehrávačem."
date: "2015-07-14"
last_modification: "2015-07-15"
status: 1
tags: ["napady", "video", "youtube"]
format: "html"
---

<p>YouTube je nejpopulárnější web pro sdílení videí. Nabízí zároveň snadný způsob, jak na svou stránku <b>dostat video</b> bez nutnosti řešit případnou <b>nekompatibilitu mezi prohlížeči</b>.</p>



<h2 id="vlozit">Vložení videa</h2>

<p>Doporučený postup je použít značku <code>&lt;iframe></code>. To má tu výhodu, že stránka na YouTube (která se pomocí rámu vkládá) se může <b>podle podpory HTML 5 videa</b> rozhodnout, jestli vytvořit přehrávač:</p>

<ol>
  <li><b>HTML 5</b> značkou <code>&lt;video></code>.</li>  
  <li>Použít <b>Flash</b>.</li>
</ol>


<h3 id="youtube">Kód pro vložení videa z YouTube</h3>

<p>Získat kód pro přidání videa na vlastní web jde na stránce pod videem. Stačí kliknout postupně na <i>Sdílet</i> a <i>Vložit</i>:</p>

<p><img src="/files/youtube-vlozit/vlozit.png" alt="Získání kódu pro vložení z YouTube" class="border"></p>


















<p>Pro <b>detailnější nastavení</b> existují další možnosti, které se zobrazí po kliknutí na <i>Zobrazit více</i> – například nastavení rozměrů a podobně.</p>


<p><img src="/files/youtube-vlozit/dalsi-nastaveni.png" alt="Další nastavení vloženého videa" class="border"></p>









<p>Zdrojový HTML kód pro <i>embedování</i> videa z YT vypadá následovně:</p>

<pre><code>&lt;iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/<b>6HT-yirOGoo</b>" 
  frameborder="0" 
  allowfullscreen
>
&lt;/iframe></code></pre>









<p>Jediná část, která je unikátní pro každé video je <b>identifikátor</b> za adresou „<code>https://www.youtube.com/embed/</code>“.</p>

<p>Tento identifikátor se shoduje identifikátorem videa v URL při přehrávání na YouTube.</p>

<p><img src="/files/youtube-vlozit/identifikator.png" alt="ID videa v adrese" class="border"></p>









<p>Je možné si tedy pro <b>zjednodušení vkládání</b> připravit funkci, která na základě identifikátoru připraví kód pro vložení.</p>


<h2 id="starsi">Starší způsoby vložení</h2>

<p>V dřívějších dobách byl prakticky jediný způsob, jak s dobrou podporou přehrávat video, <b>přehrávač využívající Flash</b>.</p>

<p>K tomu se používaly značky <code>&lt;embed></code> nebo <code>&lt;object></code>.</p>

<pre><code>&lt;embed 
  width="560" 
  height="315" 
  src="https://www.youtube.com/v/6HT-yirOGoo"
></code></pre>






<p>Flashový přehrávač pro video jde získat z adresy:</p>

<pre><code>https://www.youtube.com/v/<b>6HT-yirOGoo</b></code></pre>


<p>Kde za <code>„v/“</code> je opět tentýž identifikátor, co je v adresním řádku na stránce videa nebo se používá pro vložení do <code>&lt;iframe></code>.</p>

<p>Zdá se ale být ale výhodnější vložit video značkou <code>&lt;iframe></code>, protože bude mít díky možnosti rozhodování mezi Flashem a HTML 5 <b>lepší celkovou podporu</b>.</p>






<h2 id="stranka">Vložení přímo stránky z YouTube</h2>

<p>Stránka s videem přímo z YouTube (příklad URL: <code>https://www.youtube.com/<b>watch?v=</b>6HT-yirOGoo</code>) nejde pomocí rámu vložit.</p>



<p>Je to kvůli zakázání vkládání do rámu HTTP hlavičkou: <code>x-frame-options: SAMEORIGIN</code>. Skončí to nějakou takovou <b>chybovou hláškou</b> (příklad z <a href="/ie11">IE 11</a>).</p>


<p><img src="/files/youtube-vlozit/youtube-same-origin.png" alt="Nelze zobrazit v rámci" class="border"></p>
















<h2 id="prevod">Automatické vložení YouTube přehrávače</h2>

<p>Pro pohodlnější vytváření obsahu umí některé redakční systémy – třeba <a href="/wordpress">WordPress</a> – po vložení běžné adresy videa <b>automaticky vložit přehrávač</b>.</p>

<p><img src="/files/youtube-vlozit/vlozeni-wordpress.gif" alt="Automatické nahrazení URL z YouTube přehrávačem" class="border"></p>


























<p>Docílit toho svépomocí jde na základě nahrazování.</p>

<p>Nejprimitivnější regulární výraz pro získání identifikátoru videa by mohl vypadat následovně:</p>


<pre><code>/https:\/\/www\.youtube\.com\/watch\?v=(<b>[A-z0-9_-]*</b>)/</code></pre>

<p><a href="https://kod.djpw.cz/hfob">Živá ukázka v JavaScriptu</a></p>