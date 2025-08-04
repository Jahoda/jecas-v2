---
title: "Video v HTML"
headline: "HTML video"
description: "Jak nejlépe vložit video na stránku, aby fungovalo v nejvíce prohlížečích."
date: "2014-04-18"
last_modification: "2014-04-18"
status: 0
tags: []
---

S videem na webu **byly od začátku jen problémy**. Ne jinak je tomu v roce 2015.

  Stále neexistuje způsob, jak universálně vložit do stránky video, aby fungovalo 100% napříč prohlížeči. Tedy tak snadno jako to jde třeba u obrázků.

Dlouho dobu dominovaly přehrávání videí na internetu **Flash přehrávače**. Technologie Flash ale v roce 2015 [umřela](http://1gr.cz/reklama/).

Kromě toho, že Flash nefunguje ve většině mobilních zařízení, začíná mizet i na desktopech.

Náhrada Flashe je v oblasti videa zvláštní HTML značka `&lt;video>`. Podporujícím prohlížečům stačí uvést zdroj videa, přidat atribut `controls` pro zobrazení ovládání a prohlížeč už se o přehrávání a s tím spojené základní funkce postará.

```
&lt;video src="video.mp4" controls>
&lt;/video>
```

Ukázka krátkého videa ve výchozím přehrávači.

## Flash přehrávač

Objekt s flashovým přehrávačem se vkládá značkou `&lt;embed>` nebo `&lt;object>`.

### Značka `&lt;embed>`

Jedná se o starší značku, která byla standardisována až v HTML 5. Dříve se ale používala jako způsob vložení objektu.

Kromě vložení flashového či jiného pluginu jde použít i pro **vložení HTML stránky** – podobně jako značka [`&lt;iframe>`](/ramy#iframe). Vložení stránky ale nefunguje v **Internet Exploreru 8** a starších.

HTML značka `&lt;emebed>` nemá koncovou značku. Není do ní tedy možné vložit **záložní obsah** pro případ, že požadovaný typ vkládaného objektu není podporován.

Příklad vložení flashového přehrávače a předání proměnných:

```
&lt;embed 
  type="application/x-shockwave-flash" 
  src="**player.swf**" 
  width="640" height="372" 
  flashvars="&amp;file=*video.mp4*&amp;autostart=true"
>
```

Protože vkládaný přehrávač bývá universální a až následně se rozhodne, jaký obsah bude přehrávat, **předávají se mu parametry** – k tomu je v tomto případě atribut `flashvars`, kde jsou informace pro SWF přehrávač.

Kromě **adresy souboru** s videem se běžně předávají i další **nastavení**, podle kterých se přehrávač zařídí a přizpůsobí (automatické přehrávání, vzhled přehrávače a podobně).

#### Značka `&lt;noembed>`

Kdysi sloužila pro umístění alternativního obsahu pro prohlížeče neznající `&lt;embed>`. Prohlížeče, které ho znají, nezobrazují jeho obsah.

### Značka `&lt;object>`

Příklad:

```
&lt;object 
  type="application/x-shockwave-flash"
  data="player.swf"
  width="640" height="372" 
>
  &lt;param name="file" value="video.mp4">
  &lt;param name="autostart" value="true">
  &lt;p>Alternativní obsah&lt;/p>
&lt;object>
```

Chování je velmi podobné značce `&lt;embed>`. Hlavní rozdíly:

  - Jde nabídnout **alternativní obsah** pro případ, že načtení pluginu selže. Rozhoduje se na základě atributu `type`.

  - Parametry pro objekt jde předávat pohodlněji značkou `&lt;praram>`.

  - Místo atributu `src` pro uvedení **adresy objektu** se používá atribut `data`.

    - StackOverflow: [EMBED vs. OBJECT](http://stackoverflow.com/questions/1244788/embed-vs-object)

#### Značka `&lt;param>`

Slouží k přehlednému předání parametrů pro vkládaný objekt, kde `name` obsahuje název proměnné a `value` její hodnotu.

## Best-practice

S ohledem na podporu značky `&lt;video>` a jednotlivých formátů přibližně platí, že:

  - asi 95 % užívaných prohlížečů podporuje `&lt;video>` a MP4,

  - asi 1-2 % podporuje `&lt;video>`, ale ne MP4 (stará Opera, Firefox na Win XP a Linuxu, novější Windows bez Windows Media Playeru),

asi 2 % nepodporuje `&lt;video>`, potřebuje alternativu (Internet Explorer 6, 7, 8) v podobě Flashe nebo Silverlightu,
    
asi 1-2 % nepodporuje žádná videa (Opera Mini, prastaré prohlížeče)

Při použití **formátu MP4** si jde s relativně slušnou podporou vystačit s **jediným video souborem**, který pro nepodporované prohlížeče bude mít **fallback do Flashe**.

*Fallback* do Flashe v případě podpory značky `&lt;video>`, ale nepodpoře **formátu MP4**, musí být v JavaScriptu:

### Test podpory HTML 5 videa

```
var tmpVideo = document.createElement("video");
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
}
```

[Živá ukázka](http://kod.djpw.cz/knob-)

## HTML 5 `&lt;video>`

Dlouhá léta byl nejlépe podporovaným řešením **přehrávač používající Flash**. Ten fungoval tak, že se do stránky vložil flashový objekt přehrávače (ve formátu `*.swf`), který následně načetl soubor s videem.

Veškerá logika ovládání byla v rámci SWF (shockwave-flash) objektu.

HTML 5 následně přišlo se značkou `&lt;video>`.

### MP4

    - [Podpora MP4](http://caniuse.com/#feat=mpeg4)

Stačí dvě verze, jelikož Flash už od verze 9.0.115 podporuje MP4. Formát FLV by měl být dávno mrtvý. 
V práci jako záchranný formát používám WebM. Konverze videa jde zautomatizovat a co se týče zabraného místa, to je čím dál víc zadarmo.

    - [Příklady videí ve formátech WebM, Ogg a MP4](http://techslides.com/sample-webm-ogg-and-mp4-video-files-for-html5) – hodí se pro testování

## Jaké formáty prohlížeče podporují

Zjistit podporu jednotlivých kodeků v **aktuálním prohlížeči** jde třeba na stránce **YouTube**:

      [Přehrávač videí YouTube HTML5](https://www.youtube.com/html5)

Přehled podpory ve všech prohlížečích:

    - [Media formats supported by the HTML audio and video elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats)

## HTML značka `&lt;video>`

Značka `&lt;video>` dovoluje zadat více formátů, aby si prohlížeč mohl vybrat ten, který podporuje nebo preferuje.

Dovnitř značky jde zadat alternativní obsah, který se použije v případě, že prohlížeč `&lt;video>` nezná.

Trochu nešikovné je, že tento alternativní obsah se nezobrazí v případě, že prohlížeč:

  - Zná element `&lt;video>`.

  - Nepodporuje žádný z nabízených fomrátů.

  Nezná-li prohlížeč nativně MP4, nejde udělat fallback na flash bez použití JavaScriptu. Je to fakt tak nedomyšlené, nebo něco přehlížím?

  Chamurappi na [Twitteru](https://twitter.com/Chamurappi/status/608981000530591744)

## HTML přehrávač videa

Prohlížeče disponují vlastními **výchozími ovládacími prvky přehrávače**. Zapínají se atributem `controls`:

```
&lt;video src="video.mp4" controls>
&lt;/video>
```

Jejich **vzhled a chování** se potom liší prohlížeč od prohlížeče – to může být výhoda i nevýhoda. Ne jednu stranu má uživatel **ovládací prvky**, které ve svém prohlížeči důvěrně zná; na druhou stranu stránka s přehrávačem vypadá v každém prohlížeči jinak.

## Vlastní styl přehrávače

Výchozí ovládací prvky prohlížeče **není možné stylovat**. Pro **vlastní vzhled** je tak nutné poskládat pomocí HTML + CSS **vlastní rozhraní** a pomocí JS ho oživit.

Naštěstí to není tak složité, jak by se mohlo zdát. Element `&lt;video>` nabízí pohodlné JS API.

Po vybrání elementu s videem:

```
var video = document.getElementById("znacka-video");
```

Jsou k disposici následující vlastnosti a metody:

  Přehrát/zastavit
  
    Video spustí `video.play()`, zastaví `video.pause()`. Z `video.paused` a `video.ended` jde zjistit, jestli právě běží, respektive již skončilo.

  Hlasitost a ztlumení videa
  
  Vypnutí zvuku se nastavuje prostřednictvím `video.muted`. Hlasitost v rozmezí 0–1 se nastavuje prostřednictvím `video.volume`.
  
  Progress bar

    Pro znázornění **průběhu přehrávání** se hodí aktuální čas videa `video.currentTime` a celkový čas `video.duration`.

    Znázorňování aktálního přehrávaného místa je nutné navázat na událost `timeupdate`.

  Fullscreen
  
    Režim celé obrazovky se přepíná prostřednictvím [`request/exitFullscreen`](/fullscreen).

**Příklady vytváření vlastního ovládání**:

    - Adobe: [Working with HTML5 multimedia components – Part 3: Custom controls](http://www.adobe.com/devnet/archive/html5/articles/html5-multimedia-pt3.html)

    - Treehouse: [Building Custom Controls for HTML5 Videos](http://blog.teamtreehouse.com/building-custom-controls-for-html5-videos)

    - MDN: [Using HTML5 audio and video](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video) – práce v JS s HTML 5 videem audiem

## Hotové HTML 5 přehrávače

Samozřejmě není nutné vynalézat kolo a jde použít již existující ovládání a případně ho **přestylovat**.

### MediaElement.js

Velmi komplexní řešení. Celý přehrávač včetně stylu má cca **100 kB** (vyžaduje jQuery).

Na základě podpory HTML značky `&lt;video>` a podporovaných a dostupných formátů vloží přesně to, co je potřeba.

  - Element `&lt;video>`

  - Flash

  - Silverlight

Hezké je, že Flash a Silverlight slouží pouze k přehrávání videa, takže veškeré **uživatelské rozhraní je jednotné** a upravitelné pomocí CSS.

    - Adresa: [mediaelementjs.com](http://mediaelementjs.com/)

### Video.js

Pouze HTML 5 přehrávač.

Přímo na webu jde snadno barevně upravovat:

    - Adresa: [videojs.com](http://www.videojs.com/)

## Stahování části videa

V případě, že uživatel chce **přeskočit část videa**, je zbytečné, aby se mu stahoval i přeskočený obsah.

HTTP/1.1 protokol pro to má funkci nazývanou jako *Byte Range Serving* nebo *range requests*. Prohlížeč potom při přeskočení v rámci videa vytvoří **nový požadavek** jen na potřebnou část souboru.

    - Wikipedie: [Byte serving](https://en.wikipedia.org/wiki/Byte_serving)

Server by měl pro soubor s videem:

    Vracet HTTP kód `206 Partial Content`

    Posílat hlavičku `Accept-Ranges: bytes` pro informování prohlížeče, že je funkce požadavků s omezeným rozsahem povolena. Jinak si tuto schopnost ověří sám prohlížeč dalším požadavkem:

      To detect if these servers support seeking we make our inital request for the video include a ‘Range’ header that askes for the bytes from zero to the end of the file.

      [HTML 5 Video Seeking and Redirects](http://bluishcoder.co.nz/2010/04/27/html5-video-seeking-and-redirects.html)

Související odkazy:

    - [Seeking videos beyond the buffer line](http://1stdev.com/tremendum-transcoder/articles/seeking-videos-beyond-the-buffer-line/)

    - StackOverflow: [Play HTML5 video without loading](http://stackoverflow.com/questions/25936934/play-html5-video-without-loading)

    - [Node.js HTML5 video streamer](https://gist.github.com/paolorossi/1993068)

## Ochrana videa před stažením

Při standardním použití HTML 5 videa je jeho **stažení velice snadné** – stačí na video kliknout pravým tlačítkem a zvolit *Uložit video jako…*

Podobně jako u ostatního obsahu platí, že jediný způsob, jak kopírování zabránit, je **nedávat věci na internet**.

    - [Jak zabránit zkopírování obsahu](/kopirovani)

Nicméně jde to trochu uživateli ztížit.

### Zablokování kontextové nabídky

Nejsnazší a pro **běžné uživatele** celkem účinné je zablokovat kontextovou nabádku, kterou typicky vyvolává **pravé tlačítko myši**.

```
&lt;video **oncontextmenu="return false"** …>
&lt;/video>
```

    - [Zablokování pravého tlačítka na videu](http://kod.djpw.cz/zkob-)

## Jak stáhnout video ze stránky

Každé video, které někdo na web umístí, **jde zkopírovat**.

U HTML 5 videa je stažení standardně dostupné po **kliknutí pravého tlačítka** do oblasti videa.

Pokud pravé tlačítko bude zablokováno, není problém **získat adresu** ze zdrojového kódu pomocí [vývojářských nástrojů](/vyvojarske-nastroje).

### Kopírování videa do `&lt;canvas>`u

    - [Prevent HTML5 video from being downloaded (right-click saved)?](http://stackoverflow.com/questions/9756837/prevent-html5-video-from-being-downloaded-right-click-saved) – různé bránění kopírování videa

## Odkazy jinam

  - [Řeším přehrávání videa](http://diskuse.jakpsatweb.cz/?action=vthread&forum=3&topic=163361#19) – diskuse o způsobu vložení videa

  - Jak psát web: [Objekty](http://www.jakpsatweb.cz/html/objekty.html)

http://www.zdrojak.cz/clanky/html5-video-pokrocile/

http://daniemon.com/blog/two-favourite-underused-html5-media-features/

https://hacks.mozilla.org/2014/07/adding-captions-and-subtitles-to-html5-video/

http://daker.me/2014/08/everything-you-need-to-know-about-html5-video.html

https://github.com/paypal/accessible-html5-video-player

IEBlog: [HTML5 Audio and Video Improvements for Windows Phone 8.1](http://blogs.msdn.com/b/ie/archive/2014/09/26/html5-audio-and-video-improvements-for-windows-phone-8-1.aspx)

- [Create Fullscreen HTML5 Page Background Video](http://demosthenes.info/blog/777/Create-Fullscreen-HTML5-Page-Background-Video)

- [Accessible and Responsive HTML5 Video Player](https://ind.ie/about/blog/accessible-video-player/)

- [Create Interactive HTML5 Video with WebVTT Chapters](http://demosthenes.info/blog/977/Create-Interactive-HTML5-Video-with-WebVTT-Chapters)

http://davidwalsh.name/html5-video-duration

http://blog.online-convert.com/extract-a-still-image-from-a-video-without-installing-software/

[amalia.js](http://ina-foss.github.io/amalia.js/) – 
Metadata enriched HTML5 video player, dokáže synchronisaci titulek a podobně

- [Video - Dive Into HTML5](http://diveintohtml5.info/video.html)  – podpora různých formátů