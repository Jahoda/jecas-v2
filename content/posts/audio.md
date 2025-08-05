---
title: "Zvuk a hudba na stránce"
headline: "Přehrávání zvuků na webu"
description: "Jak na webové stránce přehrát zvukové upozornění nebo hudbu pomocí značky <code>&lt;audio></code>."
date: "2014-03-12"
last_modification: "2016-01-26"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>V dávných dobách bylo přehrávání zvuků oblíbeným otravným prvkem stránek podobně jako efekt sněžení, jezdící text v <code>&lt;marquee></code>, zobrazování aktuálního času a další nádhery.</p>



<p>Dnes se přehrávání zvuku asi nejčastěji používá k:</p>

<ul>
  <li><b>notifikacím</b> (např. po přijetí zprávy je na ní zvukově upozorněno),</li>
  <li><b>přehrávání hudby</b>, <b>podcastů</b>, …</li>
</ul>



<h2 id="audio">Značka <code>&lt;audio></code></h2>

<pre><code>&lt;audio src="zvuk.mp3">
  Prohlížeč nezná značku audio. 
  &lt;a href="zvuk.mp3">Zvuk&lt;/a> si stáhněte.
&lt;/audio></code></pre>


<p>Mimo <b>Internet Explorer 8</b> prakticky všude funguje značka <code>&lt;audio></code>, která dokáže při uvedení atributu <code>controls</code> rovnou zobrazit přehrávač:</p>

<div class="live">
  <audio controls>
    <source src="/files/audio/borink.aac" type="audio/mp4">         
    <source src="/files/audio/borink.ogg" type="audio/ogg">
    <source src="/files/audio/borink.mp3" type="audio/mpeg">   
  </audio>
</div>


<p>Dovnitř značky jde umístit obsah pro prohlížeče, které <code>&lt;audio></code> neznají. Je trochu škoda, že se tento záložní obsah nezobrazí i v případě, kdy prohlížeč <code>&lt;audio></code> sice zná, ale nepodporuje použitý zvukový formát.</p>




<h2 id="formaty">Formát zvukového souboru</h2>

<p>Prohlížeče podporující značku <code>&lt;audio></code> se liší v podporovaných formátech zvuků, které dokáží přehrát.</p>

<ul>
  <li id="mp3">
    <p><b>MP3</b> formát je podporovaný nejlépe. Výjimkou je stará <b>Opera 12</b> a <b>Firefox 21</b> a starší na určitých operačních systémech.</p>
  </li>
  <li id="aac">
    <p><b>AAC</b> – díky lepší kompresi nabízí lepší kvalitu než MP3 při stejné datové velikosti. Tento formát je méně rozšířený a má oproti MP3 horší podporu ve <b>Firefoxu</b>, kde kvůli patentům není podpora zabudována přímo do prohlížeče, ale spoléhá se na nainstalované kodeky v operačním systému.</p>
  </li>
  <li id="ogg">
    <p><b>Ogg Vorbis</b> nefunguje v <b>IE</b>/<a href="/microsoft-edge"><b>Edge</b></a> a v <b>Safari</b> (na desktopech i mobilech). Podporuje ho ale na rozdíl od MP3 stará <b>Opera 12</b> a starý <b>Firefox</b> bez ohledu na OS.</p>
  </li>
  <li id="wav">
    <p><b>WAV</b> při použití značky <code>&lt;audio></code> nefunguje v <b>IE</b>. Jedná se nekomprimovaný formát, který může být klidně 10× datově větší než MP3. Proto se k běžnému použití moc nehodí.</p>
  </li>
</ul>

<p>Jelikož jde do HTML značky pro zvuk zadat více zdrojů, není problém dosáhnout téměř 100% podpory v prohlížečích použitím MP3 a záložního OGG. Pro datovou úsporu není špatné na první místo přidat ještě AAC.</p>

<h3 id="source">Značka <code>&lt;source></code></h3>

<p>Právě element <code>&lt;source></code> slouží k uvedení více formátů zvuku. Prohlížeč si potom vybere ten, který podporuje. Zapisuje se dovnitř elementu <code>&lt;audio></code> a má zakázanou <a href="/html-znacky#koncova-zakazana">ukončovací značku</a>.</p>

<pre><code>&lt;audio controls>
  &lt;source src="zvuk.aac" type="audio/mp4">
  &lt;source src="zvuk.ogg" type="audio/ogg">
  &lt;source src="zvuk.mp3" type="audio/mpeg">
&lt;/audio></code></pre>




<p>Prohlížeč upřednostní zvuk, který podporuje a je v <code>&lt;source></code> uveden nejdříve. Atribut <code>type</code> sice není povinný, ale hodí se uvést. Prohlížeč tak nepodporovaný soubor nebude zbytečně stahovat. Jinak by postupně stahoval všechny soubory v <code>&lt;source></code> elementech, aby zjistil, jestli je náhodou nezná.</p>


<p>Hodnota atributu <code>type</code> neodpovídá běžné koncovce souboru. Například pro MP3 se uvádí <code>audio/mpeg</code>.</p>

<p>Při použití <code>&lt;source></code> se u značky <code>&lt;audio></code> neuvádí atribut <code>src</code>.</p>


<h3 id="detekce">Detekce podpory</h3>

<p>V JavaScriptu jde detekovat podporu metodou <code>canPlayType</code> u <code>&lt;audio></code> elementu:</p>

<pre><code>audio.canPlayType("audio/mpeg");</code></pre>

<p>Vrácený výsledek je <code>probably</code> (nejspíš podporuje), <code>maybe</code> (možná podporuje) nebo prázdný řetězec (nepodporuje).</p>



<h2 id="js">Přehrávání zvuků v JS</h2>

<p>Nevyhovuje-li podoba výchozího přehrávače prohlížeče, jde si napsat vlastní. Značka <code>&lt;audio></code> podporuje potřebné metody pro přehrání, zastavení, změnu hlasitosti a další.</p>

<p>Není tak problém vytvořit tlačítko, které spustí přehrávání v předchozím přehrávači (slouží k tomu metoda <code>play</code>).</p>

<div class="live">
  <button onclick="document.querySelector('audio').play()">Přehrát</button>
</div>


<p>Kromě ovládání značky <code>&lt;audio></code> nacházející se přímo v HTML kódu existují ještě dva způsoby:</p>

<ol>
  <li>
    <p>Vytvořit audio značku JavaScriptem:</p>
        
    <pre><code>var audio = document.createElement('audio');
audio.src = 'zvuk.mp3'
audio.play();</code></pre>
  </li>
  
  <li>
    <p>Použít objekt <code>Audio</code>:</p>
    <pre><code>var audio = new Audio('zvuk.mp3');
audio.play();</code></pre>
  </li>
</ol>



<p>Je ale potřeba použít detekci podpory formátů, aby zvuk fungoval v co možná největším spektru prohlížečů:</p>

<pre><code>var audio = document.createElement('audio');
var source = document.createElement('source');
if (audio.canPlayType('audio/mpeg')) {
  source.type= 'audio/mpeg';
  source.src= 'zvuk.mp3';
} 
else {
  source.type= 'audio/ogg';
  source.src= 'zvuk.ogg';
}
audio.appendChild(source);
audio.play();</code></pre>












<h3 id="canplaythrough">Událost <code>canplaythrough</code></h3>

<p>Volat <code>play()</code> by se mělo nejspíš až v momentě, kdy je zvuk připraven k přehrávání:</p>

<pre><code>audio.addEventListener('<b>canplaythrough</b>', function() { 
   audio.play();
}, false);</code></pre>




<h2 id="autoplay">Automatické přehrávání</h2>

<p>Atributem <code>autoplay</code> u značky <code>&lt;audio></code> se zapíná automatické přehrávání zvuku po načtení stránky.</p>

<pre><code>&lt;audio src="zvuk.mp3" <b>autoplay</b>>
&lt;/audio></code></pre>




<p>Automatické přehrávání <b>funguje pouze na desktopech</b>. V mobilních prohlížečích je nutné zvuk spustit uživatelskou akcí typu kliknutí na tlačítko.</p>


<p>Spustit automaticky hudbu při příchodu na web se ale obvykle bere za neslušné i na desktopech. Mělo by se tak dít v obzvlášť výjimečných případech.</p>




<p>Když už, mělo by přehrávání začít alespoň za podmínky, že návštěvník stránku vidí. Dříve nastával problém, kdy nějaká stránka přehrávala zvuk, ale návštěvník nebyl s to poznat, která to je. Prohlížeče se to naštěstí už snaží řešit signalisací přehrávání u záložek:</p>



<p><img src="/files/audio/prehravani.png" alt="Znázornění přehrávání v Chrome" class="border"></p>





<p><img src="/files/audio/edge-prehravani.png" alt="Znázornění přehrávání v Edge" class="border"></p>




<p>Dále by měla existovat možnost <b>hrající hudbu vypnout</b>.</p>




<h2 id="preload">Preload</h2>

<pre><code>&lt;audio src="zvuk.mp3" <b>preload="metadata"</b>>
&lt;/audio></code></pre>


<p>Důležitou věcí je přednačítání zvukového souboru. Výchozí chování bez uvedení atributu <code>preload</code> je takové, že prohlížeč soubor bude stahovat klidně celý, i když ho návštěvník třeba ani nechce přehrávat.</p>


<p>Možné hodnoty jsou:</p>

<ul>
  <li><code>preload="auto"</code> – stejné jako neuvedení atributu</li>
  <li><code>preload="none"</code> – nestáhne se vůbec nic</li>
  <li><code>preload="metadata"</code> – stáhne se například délka zvukového souboru</li>
</ul>



<p>Řešit přednačítání vždy obsahuje dilema, jestli zlepšit uživatelský zážitek na úkor plýtvání dat.</p>




<h2 id="loop">Opakované přehrávání</h2>

<pre><code>&lt;audio src="zvuk.mp3" <b>loop</b>>
&lt;/audio></code></pre>



<p>Přidáním atributu <code>loop</code> jde docílit nekonečného přehrávání zvuku.</p>


<p>Opakování jde nastavit pouze v režimu ano/ne. Tedy <code>loop="3"</code> nezpůsobí trojité přehrání, ale nekonečnou smyčku.</p>

<p><b>Kontrolní otázka</b>: Kolikrát se přehraje zvuk s <code>loop="false"</code>?</p>
<form onsubmit="return false;">
<ul class="radio-list">
  <li><label><input onchange="odpoveded(1, 2)" name="odpoved" type="radio"> jednou</label></li>    
  <li><label><input onchange="odpoveded(2, 2)" name="odpoved" type="radio"> bude hrát donekonečna</label></li>
  </ul>
</form>

<p id="cekam" class="question-error">Čekám na správnou odpověď…</p>
<div id="vysvetleni" class="question-correct">
  <p><b>Správně</b>.</p>
  
  <p>Bude se přehrávat donekonečna, protože atribut <code>loop</code> nepodporuje žádnou hodnotu. Cokoliv, co se mu zadá, se tak bude ignorovat.</p>  
</div>
<script>vysvetleni.style.display = "none";</script>



<h2 id="historie">Historie zvuků na webu</h2>

<p>K přehrávání zvuku i v <b>IE 8</b> nebo starších je potřeba sáhnout po starších postupech, než je element <code>&lt;audio></code>.</p>

<h3 id="flash">Flash</h3>

<p>Flash sice v roce 2015 umřel, ale přesto je asi nejlepší pro staré prohlížeče použít miniaturní <b>Flash</b> polyfill – například <a href="http://kolber.github.io/audiojs/">audio.js</a>. Stačí používat normální značku <code>&lt;audio></code> a JavaScript se sám postará o podporu ve starých prohlížečích.</p>

<p>Kromě Flashe existují další možnosti, které popisuje následující článek:</p>

<div class="external-content">
  <ul>
    <li>Jak psát web: <a href="http://www.jakpsatweb.cz/zvuky.html">Zvuky na stránkách</a></li>
  </ul>
</div>



<h3 id="bgsound"><code>&lt;bgsound></code></h3>

<p>Pro zvuk na pozadí vymyslel <b>Internet Explorer</b> speciální značku <code>&lt;bgsound></code>. Funguje ještě v <a href="/ie11"><b>IE 11</b></a> – <a href="http://kod.djpw.cz/iwtb">ukázka</a>. Nastupující prohlížeč <b>Edge</b> už ji nepodporuje.</p>

<p>Takto zadaný zvuk se začne přehrávat ihned po navštívení stránky.</p>

<pre><code>&lt;bgsound src="zvuk.wav"></code></pre>




<h3 id="embed"><code>&lt;embed></code></h3>

<p>Vložit do stránky zvuk jde také značkou <code>&lt;embed></code>. Takový postup funguje i v dnešních prohlížečích (kromě <b>MS Edge</b>). Akorát se pro přehrání použije plugin z operačního systému, který je v některých prohlížečích nutné povolit:</p>

<p><img src="/files/audio/aktivovat-plugin.png" alt="Aktivování přehrávání pomocí embed" class="border"></p>














<p><a href="http://kod.djpw.cz/jwtb">Živá ukázka</a></p>



<h3 id="object"><code>&lt;object></code></h3>

<p><b>Yuhů</b> na JPW ještě zmiňuje vložení zvuku značkou <code>&lt;object></code> pomocí ActiveX. To funguje pouze v <b>IE</b> a projevuje se vložením pluginu Windows Media Playeru. V <b>Edge</b> ani jiných prohlížečích to nic nedělá.</p>

<p><img src="/files/audio/object-ie.png" alt="Přehrávání pomocí ActiveX" class="border"></p>




















<h2 id="vytvoreni">Vytvoření zvuku</h2>

<p>Zvuk pro použití na webu jde například nahrát na mikrofon nebo odněkud stáhnout.</p>

<p>Existují stránky obsahující tisíce zvuků, které lze zdarma použít, stačí jen použít Google.</p>




<h3 id="strih">Stříhání zvuku</h3>

<p>Pro stříhání a úpravu zvuků se hodí zdarma dostupný program <a href="http://audacityteam.org/">Audacity</a>. Pro export zvuku do MP3 je potřeba stáhnout ještě <a href="http://lame.buanzo.org/#lamewindl">LAME knihovny</a>.</p>

<p><img src="/files/audio/audacity.png" alt="Program Audacity" class="border"></p>













































<h3 id="konverse">Konvertování formátů</h3>

<p>Pro převod zvukových souborů do různých formátů je nejrychlejší použít nějaký online nástroj, například <a href="http://audio.online-convert.com/">Online-convert.com</a>.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>DevDocs: <a href="http://devdocs.io/html/element/audio"><code>&lt;audio></code></a></li>
  <li>Sitepoint: <a href="http://www.sitepoint.com/5-libraries-html5-audio-api/">5 Libraries and APIs for Manipulating HTML5 Audio</a>
  <li><a href="http://tutorialzine.com/2015/03/html5-music-player/">Experiment: HTML5 Music Player</a> – vytvoření hudebního přehrávače v HTML 5</li>
  
  <li><a href="http://www.webresourcesdepot.com/open-source-js-audio-players/">Free Open Source JS Audio Music Players</a></li>
</ul>

<!--
<li><a href="https://hacks.mozilla.org/2014/03/audio-tags-web-components-web-audio-♥/">https://hacks.mozilla.org/2014/03/audio-tags-web-components-web-audio-♥/</a>

<li><a href="https://hacks.mozilla.org/2014/06/easy-audio-capture-with-the-mediarecorder-api/">https://hacks.mozilla.org/2014/06/easy-audio-capture-with-the-mediarecorder-api/</a>




-->


<script>
  function odpoveded(cislo, spravna) {
    var cekam = document.getElementById("cekam");
    var vysvetleni = document.getElementById("vysvetleni");
    cekam.style.display = (cislo == spravna) ? 'none' : ''; 
    vysvetleni.style.display = (cislo == spravna) ? 'block' : 'none'
  }
</script>