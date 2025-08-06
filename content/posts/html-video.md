---
title: "Video v HTML"
headline: "HTML video"
description: "Jak nejlépe vložit video na stránku, aby fungovalo v nejvíce prohlížečích."
date: "2014-04-18"
last_modification: "2014-04-18"
status: 0
tags: []
format: "html"
---

<p>S videem na webu <b>byly od začátku jen problémy</b>. Ne jinak je tomu v roce 2015.</p>

<blockquote>
  <p>Stále neexistuje způsob, jak universálně vložit do stránky video, aby fungovalo 100% napříč prohlížeči. Tedy tak snadno jako to jde třeba u obrázků.</p>
</blockquote>


<p>Dlouho dobu dominovaly přehrávání videí na internetu <b>Flash přehrávače</b>. Technologie Flash ale v roce 2015 <a href="http://1gr.cz/reklama/">umřela</a>.</p>

<p>Kromě toho, že Flash nefunguje ve většině mobilních zařízení, začíná mizet i na desktopech.</p>

<p><img src="/files/html-video/smrt-flashe.png" alt="Smrt Flashe" class="border"></p>




















<p>Náhrada Flashe je v oblasti videa zvláštní HTML značka <code>&lt;video></code>. Podporujícím prohlížečům stačí uvést zdroj videa, přidat atribut <code>controls</code> pro zobrazení ovládání a prohlížeč už se o přehrávání a s tím spojené základní funkce postará.</p>

<pre><code>&lt;video src="video.mp4" controls>
&lt;/video></code></pre>


<p>Ukázka krátkého videa ve výchozím přehrávači.</p>

<div class="live no-source">
  <video src="/files/html-video/video.mp4" controls></video>
</div>












<h2 id="flash">Flash přehrávač</h2>

<p>Objekt s flashovým přehrávačem se vkládá značkou <code>&lt;embed></code> nebo <code>&lt;object></code>.</p>



<h3 id="embed">Značka <code>&lt;embed></code></h3>

<p>Jedná se o starší značku, která byla standardisována až v HTML 5. Dříve se ale používala jako způsob vložení objektu.</p>

<p>Kromě vložení flashového či jiného pluginu jde použít i pro <b>vložení HTML stránky</b> – podobně jako značka <a href="/ramy#iframe"><code>&lt;iframe></code></a>. Vložení stránky ale nefunguje v <b>Internet Exploreru 8</b> a starších.</p>

<p>HTML značka <code>&lt;emebed></code> nemá koncovou značku. Není do ní tedy možné vložit <b>záložní obsah</b> pro případ, že požadovaný typ vkládaného objektu není podporován.</p>


<p>Příklad vložení flashového přehrávače a předání proměnných:</p>

<pre><code>&lt;embed 
  type="application/x-shockwave-flash" 
  src="<b>player.swf</b>" 
  width="640" height="372" 
  flashvars="&amp;file=<i>video.mp4</i>&amp;autostart=true"
></code></pre>









<p>Protože vkládaný přehrávač bývá universální a až následně se rozhodne, jaký obsah bude přehrávat, <b>předávají se mu parametry</b> – k tomu je v tomto případě atribut <code>flashvars</code>, kde jsou informace pro SWF přehrávač.</p>

<p>Kromě <b>adresy souboru</b> s videem se běžně předávají i další <b>nastavení</b>, podle kterých se přehrávač zařídí a přizpůsobí (automatické přehrávání, vzhled přehrávače a podobně).</p>




<h4 id="noembed">Značka <code>&lt;noembed></code></h4>

<p>Kdysi sloužila pro umístění alternativního obsahu pro prohlížeče neznající <code>&lt;embed></code>. Prohlížeče, které ho znají, nezobrazují jeho obsah.</p>





<h3 id="object">Značka <code>&lt;object></code></h3>

<p>Příklad:</p>

<pre><code>&lt;object 
  type="application/x-shockwave-flash"
  data="player.swf"
  width="640" height="372" 
>
  &lt;param name="file" value="video.mp4">
  &lt;param name="autostart" value="true">
  &lt;p>Alternativní obsah&lt;/p>
&lt;object></code></pre>





<p>Chování je velmi podobné značce <code>&lt;embed></code>. Hlavní rozdíly:</p>

<ul>
  <li>Jde nabídnout <b>alternativní obsah</b> pro případ, že načtení pluginu selže. Rozhoduje se na základě atributu <code>type</code>.</li>
  
  <li>Parametry pro objekt jde předávat pohodlněji značkou <code>&lt;praram></code>.</li>
  
  <li>Místo atributu <code>src</code> pro uvedení <b>adresy objektu</b> se používá atribut <code>data</code>.</li>
</ul>


<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="http://stackoverflow.com/questions/1244788/embed-vs-object">EMBED vs. OBJECT</a></li>
  </ul>
</div>

<h4 id="param">Značka <code>&lt;param></code></h4>

<p>Slouží k přehlednému předání parametrů pro vkládaný objekt, kde <code>name</code> obsahuje název proměnné a <code>value</code> její hodnotu.</p>



<h2 id="best-practice">Best-practice</h2>

<p>S ohledem na podporu značky <code>&lt;video></code> a jednotlivých formátů přibližně platí, že:</p>

<ul>
  <li>asi 95 % užívaných prohlížečů podporuje <code>&lt;video></code> a MP4,</li>
  <li>asi 1-2 % podporuje <code>&lt;video></code>, ale ne MP4 (stará Opera, Firefox na Win XP a Linuxu, novější Windows bez Windows Media Playeru),</li>
  <li>
asi 2 % nepodporuje <code>&lt;video></code>, potřebuje alternativu (Internet Explorer 6, 7, 8) v podobě Flashe nebo Silverlightu,</li>
    <li>
asi 1-2 % nepodporuje žádná videa (Opera Mini, prastaré prohlížeče)</li>
</ul>


<p>Při použití <b>formátu MP4</b> si jde s relativně slušnou podporou vystačit s <b>jediným video souborem</b>, který pro nepodporované prohlížeče bude mít <b>fallback do Flashe</b>.</p>

<p><i>Fallback</i> do Flashe v případě podpory značky <code>&lt;video></code>, ale nepodpoře <b>formátu MP4</b>, musí být v JavaScriptu:</p>



<h3 id="test-podpora">Test podpory HTML 5 videa</h3>

<pre><code>var tmpVideo = document.createElement("video");
if (tmpVideo.canPlayType) {
  if (tmpVideo.canPlayType("video/mp4") !== "") {
    // Prohlížeč zná &lt;video> a MP4
  }
  else {
      // Prohlížeč zná &lt;video>, ale nezná MP4
  }
}
else {
  // Prohlížeč nezná &lt;video>
}</code></pre>












<p><a href="https://kod.djpw.cz/knob-">Živá ukázka</a></p>


<h2 id="html5">HTML 5 <code>&lt;video></code></h2>

<p>Dlouhá léta byl nejlépe podporovaným řešením <b>přehrávač používající Flash</b>. Ten fungoval tak, že se do stránky vložil flashový objekt přehrávače (ve formátu <code>*.swf</code>), který následně načetl soubor s videem.</p>

<p>Veškerá logika ovládání byla v rámci SWF (shockwave-flash) objektu.</p>


<p>HTML 5 následně přišlo se značkou <code>&lt;video></code>.</p>


<h3 id="mp4">MP4</h3>

<div class="external-content">
  <ul>
    <li><a href="http://caniuse.com/#feat=mpeg4">Podpora MP4</a></li>
  </ul>
</div>

<p>Stačí dvě verze, jelikož Flash už od verze 9.0.115 podporuje MP4. Formát FLV by měl být dávno mrtvý. 
V práci jako záchranný formát používám WebM. Konverze videa jde zautomatizovat a co se týče zabraného místa, to je čím dál víc zadarmo.</p>

<div class="external-content">
  <ul>
    <li><a href="http://techslides.com/sample-webm-ogg-and-mp4-video-files-for-html5">Příklady videí ve formátech WebM, Ogg a MP4</a> – hodí se pro testování</li>
  </ul>
</div>


<h2 id="podpora">Jaké formáty prohlížeče podporují</h2>

<p>Zjistit podporu jednotlivých kodeků v <b>aktuálním prohlížeči</b> jde třeba na stránce <b>YouTube</b>:</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://www.youtube.com/html5">Přehrávač videí YouTube HTML5</a>
      <p><img src="/files/html-video/podpora-kodeku.png" alt="Zjištění podpory videa v prohlížečích" class="border"></p>

    </li>    
  </ul>
  
  
  
  
  
  
</div>


<p>Přehled podpory ve všech prohlížečích:</p>

<div class="external-content">
  <ul>    
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats">Media formats supported by the HTML audio and video elements</a></li>
  </ul>
</div>



<h2 id="video">HTML značka <code>&lt;video></code></h2>

<p>Značka <code>&lt;video></code> dovoluje zadat více formátů, aby si prohlížeč mohl vybrat ten, který podporuje nebo preferuje.</p>

<p>Dovnitř značky jde zadat alternativní obsah, který se použije v případě, že prohlížeč <code>&lt;video></code> nezná.</p>

<p>Trochu nešikovné je, že tento alternativní obsah se nezobrazí v případě, že prohlížeč:</p>

<ul>
  <li>Zná element <code>&lt;video></code>.</li>
  
  <li>Nepodporuje žádný z nabízených fomrátů.</li>
</ul>

<blockquote cite="https://twitter.com/Chamurappi/status/608981000530591744">
  <p>Nezná-li prohlížeč nativně MP4, nejde udělat fallback na flash bez použití JavaScriptu. Je to fakt tak nedomyšlené, nebo něco přehlížím?</p>
  
  <p class="autor">Chamurappi na <a href="https://twitter.com/Chamurappi/status/608981000530591744">Twitteru</a></p>
</blockquote>




<h2 id="prehravac">HTML přehrávač videa</h2>

<p>Prohlížeče disponují vlastními <b>výchozími ovládacími prvky přehrávače</b>. Zapínají se atributem <code>controls</code>:</p>

<pre><code>&lt;video src="video.mp4" controls>
&lt;/video></code></pre>



<p>Jejich <b>vzhled a chování</b> se potom liší prohlížeč od prohlížeče – to může být výhoda i nevýhoda. Ne jednu stranu má uživatel <b>ovládací prvky</b>, které ve svém prohlížeči důvěrně zná; na druhou stranu stránka s přehrávačem vypadá v každém prohlížeči jinak.</p>





<h2 id="vlastni">Vlastní styl přehrávače</h2>

<p>Výchozí ovládací prvky prohlížeče <b>není možné stylovat</b>. Pro <b>vlastní vzhled</b> je tak nutné poskládat pomocí HTML + CSS <b>vlastní rozhraní</b> a pomocí JS ho oživit.</p>


<p>Naštěstí to není tak složité, jak by se mohlo zdát. Element <code>&lt;video></code> nabízí pohodlné JS API.</p>

<p>Po vybrání elementu s videem:</p>

<pre><code>var video = document.getElementById("znacka-video");</code></pre>


<p>Jsou k disposici následující vlastnosti a metody:</p>

<dl>
  <dt id="prehrat">Přehrát/zastavit</dt>
  <dd>
    <p>Video spustí <code>video.play()</code>, zastaví <code>video.pause()</code>. Z <code>video.paused</code> a <code>video.ended</code> jde zjistit, jestli právě běží, respektive již skončilo.</p>
  </dd>
  
  <dt id="hlasitost">Hlasitost a ztlumení videa</dt>
  
  <dd>Vypnutí zvuku se nastavuje prostřednictvím <code>video.muted</code>. Hlasitost v rozmezí 0–1 se nastavuje prostřednictvím <code>video.volume</code>.</dd>
  
  <dt id="progressbar">Progress bar</dt>
  
  <dd>
    <p>Pro znázornění <b>průběhu přehrávání</b> se hodí aktuální čas videa <code>video.currentTime</code> a celkový čas <code>video.duration</code>.</p>
    
    <p>Znázorňování aktálního přehrávaného místa je nutné navázat na událost <code>timeupdate</code>.</p>
  </dd>
  
  <dt id="fullscreen">Fullscreen</dt>
  <dd>
    <p>Režim celé obrazovky se přepíná prostřednictvím <a href="/fullscreen"><code>request/exitFullscreen</code></a>.</p>
  </dd>
</dl>


<p><b>Příklady vytváření vlastního ovládání</b>:</p>

<div class="external-content">
  <ul>
    <li>Adobe: <a href="http://www.adobe.com/devnet/archive/html5/articles/html5-multimedia-pt3.html">Working with HTML5 multimedia components – Part 3: Custom controls</a></li>
    
    <li>Treehouse: <a href="http://blog.teamtreehouse.com/building-custom-controls-for-html5-videos">Building Custom Controls for HTML5 Videos</a></li>
    
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video">Using HTML5 audio and video</a> – práce v JS s HTML 5 videem audiem</li>
  </ul>
</div>


<h2 id="hotova-reseni">Hotové HTML 5 přehrávače</h2>

<p>Samozřejmě není nutné vynalézat kolo a jde použít již existující ovládání a případně ho <b>přestylovat</b>.</p>

<h3 id="mediaElement">MediaElement.js</h3>

<p>Velmi komplexní řešení. Celý přehrávač včetně stylu má cca <b>100 kB</b> (vyžaduje jQuery).</p>

<p><img src="/files/html-video/mediaelement.png" alt="Přehrávač MediaElement.js" class="border"></p>





















<p>Na základě podpory HTML značky <code>&lt;video></code> a podporovaných a dostupných formátů vloží přesně to, co je potřeba.</p>

<ul>
  <li>Element <code>&lt;video></code></li>
  <li>Flash</li>
  <li>Silverlight</li>
</ul>

<p>Hezké je, že Flash a Silverlight slouží pouze k přehrávání videa, takže veškeré <b>uživatelské rozhraní je jednotné</b> a upravitelné pomocí CSS.</p>

<div class="external-content">
  <ul>
    <li>Adresa: <a href="http://mediaelementjs.com/">mediaelementjs.com</a></li>
  </ul>
</div>




<h3 id="video-js">Video.js</h3>

<p>Pouze HTML 5 přehrávač.</p>

<p><img src="/files/html-video/videojs.png" alt="Přehrávač Video.js" class="border"></p>


















<p>Přímo na webu jde snadno barevně upravovat:</p>


<div class="external-content">
  <ul>
    <li>Adresa: <a href="http://www.videojs.com/">videojs.com</a></li>
  </ul>
</div>


<h2 id="seek">Stahování části videa</h2>

<p>V případě, že uživatel chce <b>přeskočit část videa</b>, je zbytečné, aby se mu stahoval i přeskočený obsah.</p>

<p>HTTP/1.1 protokol pro to má funkci nazývanou jako <i lang="en">Byte Range Serving</i> nebo <i lang="en">range requests</i>. Prohlížeč potom při přeskočení v rámci videa vytvoří <b>nový požadavek</b> jen na potřebnou část souboru.</p>

<div class="external-content">
  <ul>
    <li>Wikipedie: <a href="https://en.wikipedia.org/wiki/Byte_serving">Byte serving</a></li>
  </ul>
</div>

<p>Server by měl pro soubor s videem:</p>

<ul>
  <li>
    <p>Vracet HTTP kód <code>206 Partial Content</code></p>
  </li>
  <li>
    <p>Posílat hlavičku <code>Accept-Ranges: bytes</code> pro informování prohlížeče, že je funkce požadavků s omezeným rozsahem povolena. Jinak si tuto schopnost ověří sám prohlížeč dalším požadavkem:</p>
    
    <blockquote cite="http://bluishcoder.co.nz/2010/04/27/html5-video-seeking-and-redirects.html">
      <p>To detect if these servers support seeking we make our inital request for the video include a ‘Range’ header that askes for the bytes from zero to the end of the file.</p>
      
      <p class="autor"><a href="http://bluishcoder.co.nz/2010/04/27/html5-video-seeking-and-redirects.html">HTML 5 Video Seeking and Redirects</a></p>
    </blockquote>
  </li>
</ul>

<p>Související odkazy:</p>

<div class="external-content">
  <ul>
    <li><a href="http://1stdev.com/tremendum-transcoder/articles/seeking-videos-beyond-the-buffer-line/">Seeking videos beyond the buffer line</a></li>
    <li>StackOverflow: <a href="http://stackoverflow.com/questions/25936934/play-html5-video-without-loading">Play HTML5 video without loading</a></li>
    <li><a href="https://gist.github.com/paolorossi/1993068">Node.js HTML5 video streamer</a></li>
  </ul>
</div>


<h2 id="ochrana">Ochrana videa před stažením</h2>

<p>Při standardním použití HTML 5 videa je jeho <b>stažení velice snadné</b> – stačí na video kliknout pravým tlačítkem a zvolit <i>Uložit video jako…</i></p>

<p><img src="/files/html-video/stazeni-videa.png" alt="Jednoduché stažení videa" class="border"></p>






















<p>Podobně jako u ostatního obsahu platí, že jediný způsob, jak kopírování zabránit, je <b>nedávat věci na internet</b>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/kopirovani">Jak zabránit zkopírování obsahu</a></li>
  </ul>
</div>

<p>Nicméně jde to trochu uživateli ztížit.</p>


<h3 id="kontextova-nabidka">Zablokování kontextové nabídky</h3>

<p>Nejsnazší a pro <b>běžné uživatele</b> celkem účinné je zablokovat kontextovou nabádku, kterou typicky vyvolává <b>pravé tlačítko myši</b>.</p>

<pre><code>&lt;video <b>oncontextmenu="return false"</b> …>
&lt;/video></code></pre>


<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/zkob-">Zablokování pravého tlačítka na videu</a></li>
  </ul>
</div>





<h2 id="stahnout">Jak stáhnout video ze stránky</h2>

<p>Každé video, které někdo na web umístí, <b>jde zkopírovat</b>.</p>

<p>U HTML 5 videa je stažení standardně dostupné po <b>kliknutí pravého tlačítka</b> do oblasti videa.</p>

<p>Pokud pravé tlačítko bude zablokováno, není problém <b>získat adresu</b> ze zdrojového kódu pomocí <a href="/vyvojarske-nastroje">vývojářských nástrojů</a>.</p>

<p><img src="/files/html-video/znacka-video.png" alt="Video značka s adresou" class="border"></p>





<h3 id="canvas">Kopírování videa do <code>&lt;canvas></code>u</h3>

<p></p>

<div class="external-content">
  <ul>
    <li><a href="http://stackoverflow.com/questions/9756837/prevent-html5-video-from-being-downloaded-right-click-saved">Prevent HTML5 video from being downloaded (right-click saved)?</a> – různé bránění kopírování videa</li>
  </ul>
</div>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=3&topic=163361#19">Řeším přehrávání videa</a> – diskuse o způsobu vložení videa</li>
  
  
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/html/objekty.html">Objekty</a></li>
</ul>


http://www.zdrojak.cz/clanky/html5-video-pokrocile/

http://daniemon.com/blog/two-favourite-underused-html5-media-features/

https://hacks.mozilla.org/2014/07/adding-captions-and-subtitles-to-html5-video/

http://daker.me/2014/08/everything-you-need-to-know-about-html5-video.html

https://github.com/paypal/accessible-html5-video-player

IEBlog: <a href="http://blogs.msdn.com/b/ie/archive/2014/09/26/html5-audio-and-video-improvements-for-windows-phone-8-1.aspx">HTML5 Audio and Video Improvements for Windows Phone 8.1</a>

<li><a href="http://demosthenes.info/blog/777/Create-Fullscreen-HTML5-Page-Background-Video">Create Fullscreen HTML5 Page Background Video</a></li>

<li><a href="https://ind.ie/about/blog/accessible-video-player/">Accessible and Responsive HTML5 Video Player</a></li>

<li><a href="http://demosthenes.info/blog/977/Create-Interactive-HTML5-Video-with-WebVTT-Chapters">Create Interactive HTML5 Video with WebVTT Chapters</a></li>

http://davidwalsh.name/html5-video-duration

http://blog.online-convert.com/extract-a-still-image-from-a-video-without-installing-software/

<li><a href="http://ina-foss.github.io/amalia.js/">amalia.js</a> – 
Metadata enriched HTML5 video player, dokáže synchronisaci titulek a podobně</li>

<li><a href="http://diveintohtml5.info/video.html">Video - Dive Into HTML5</a>  – podpora různých formátů</li>