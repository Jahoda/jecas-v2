---
title: "Zvuk a hudba na stránce"
headline: "Přehrávání zvuků na webu"
description: "Jak na webové stránce přehrát zvukové upozornění nebo hudbu pomocí značky <code>&lt;audio></code>."
date: "2014-03-12"
last_modification: "2016-01-26"
status: 1
tags: ["HTML", "HTML značky"]
---

V dávných dobách bylo přehrávání zvuků oblíbeným otravným prvkem stránek podobně jako efekt sněžení, jezdící text v `&lt;marquee>`, zobrazování aktuálního času a další nádhery.

Dnes se přehrávání zvuku asi nejčastěji používá k:

  - **notifikacím** (např. po přijetí zprávy je na ní zvukově upozorněno),

  - **přehrávání hudby**, **podcastů**, …

## Značka `&lt;audio>`

```
&lt;audio src="zvuk.mp3">
  Prohlížeč nezná značku audio. 
  &lt;a href="zvuk.mp3">Zvuk&lt;/a> si stáhněte.
&lt;/audio>
```

Mimo **Internet Explorer 8** prakticky všude funguje značka `&lt;audio>`, která dokáže při uvedení atributu `controls` rovnou zobrazit přehrávač:

Dovnitř značky jde umístit obsah pro prohlížeče, které `&lt;audio>` neznají. Je trochu škoda, že se tento záložní obsah nezobrazí i v případě, kdy prohlížeč `&lt;audio>` sice zná, ale nepodporuje použitý zvukový formát.

## Formát zvukového souboru

Prohlížeče podporující značku `&lt;audio>` se liší v podporovaných formátech zvuků, které dokáží přehrát.

    **MP3** formát je podporovaný nejlépe. Výjimkou je stará **Opera 12** a **Firefox 21** a starší na určitých operačních systémech.

    **AAC** – díky lepší kompresi nabízí lepší kvalitu než MP3 při stejné datové velikosti. Tento formát je méně rozšířený a má oproti MP3 horší podporu ve **Firefoxu**, kde kvůli patentům není podpora zabudována přímo do prohlížeče, ale spoléhá se na nainstalované kodeky v operačním systému.

    **Ogg Vorbis** nefunguje v **IE**/[**Edge**](/microsoft-edge) a v **Safari** (na desktopech i mobilech). Podporuje ho ale na rozdíl od MP3 stará **Opera 12** a starý **Firefox** bez ohledu na OS.

    **WAV** při použití značky `&lt;audio>` nefunguje v **IE**. Jedná se nekomprimovaný formát, který může být klidně 10× datově větší než MP3. Proto se k běžnému použití moc nehodí.

Jelikož jde do HTML značky pro zvuk zadat více zdrojů, není problém dosáhnout téměř 100% podpory v prohlížečích použitím MP3 a záložního OGG. Pro datovou úsporu není špatné na první místo přidat ještě AAC.

### Značka `&lt;source>`

Právě element `&lt;source>` slouží k uvedení více formátů zvuku. Prohlížeč si potom vybere ten, který podporuje. Zapisuje se dovnitř elementu `&lt;audio>` a má zakázanou [ukončovací značku](/html-znacky#koncova-zakazana).

```
&lt;audio controls>
  &lt;source src="zvuk.aac" type="audio/mp4">
  &lt;source src="zvuk.ogg" type="audio/ogg">
  &lt;source src="zvuk.mp3" type="audio/mpeg">
&lt;/audio>
```

Prohlížeč upřednostní zvuk, který podporuje a je v `&lt;source>` uveden nejdříve. Atribut `type` sice není povinný, ale hodí se uvést. Prohlížeč tak nepodporovaný soubor nebude zbytečně stahovat. Jinak by postupně stahoval všechny soubory v `&lt;source>` elementech, aby zjistil, jestli je náhodou nezná.

Hodnota atributu `type` neodpovídá běžné koncovce souboru. Například pro MP3 se uvádí `audio/mpeg`.

Při použití `&lt;source>` se u značky `&lt;audio>` neuvádí atribut `src`.

### Detekce podpory

V JavaScriptu jde detekovat podporu metodou `canPlayType` u `&lt;audio>` elementu:

```
audio.canPlayType("audio/mpeg");
```

Vrácený výsledek je `probably` (nejspíš podporuje), `maybe` (možná podporuje) nebo prázdný řetězec (nepodporuje).

## Přehrávání zvuků v JS

Nevyhovuje-li podoba výchozího přehrávače prohlížeče, jde si napsat vlastní. Značka `&lt;audio>` podporuje potřebné metody pro přehrání, zastavení, změnu hlasitosti a další.

Není tak problém vytvořit tlačítko, které spustí přehrávání v předchozím přehrávači (slouží k tomu metoda `play`).

  Přehrát

Kromě ovládání značky `&lt;audio>` nacházející se přímo v HTML kódu existují ještě dva způsoby:

    Vytvořit audio značku JavaScriptem:

    ```
var audio = document.createElement('audio');
audio.src = 'zvuk.mp3'
audio.play();
```

    Použít objekt `Audio`:

    ```
var audio = new Audio('zvuk.mp3');
audio.play();
```

Je ale potřeba použít detekci podpory formátů, aby zvuk fungoval v co možná největším spektru prohlížečů:

```
var audio = document.createElement('audio');
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
audio.play();
```

### Událost `canplaythrough`

Volat `play()` by se mělo nejspíš až v momentě, kdy je zvuk připraven k přehrávání:

```
audio.addEventListener('**canplaythrough**', function() { 
   audio.play();
}, false);
```

## Automatické přehrávání

Atributem `autoplay` u značky `&lt;audio>` se zapíná automatické přehrávání zvuku po načtení stránky.

```
&lt;audio src="zvuk.mp3" **autoplay**>
&lt;/audio>
```

Automatické přehrávání **funguje pouze na desktopech**. V mobilních prohlížečích je nutné zvuk spustit uživatelskou akcí typu kliknutí na tlačítko.

Spustit automaticky hudbu při příchodu na web se ale obvykle bere za neslušné i na desktopech. Mělo by se tak dít v obzvlášť výjimečných případech.

Když už, mělo by přehrávání začít alespoň za podmínky, že návštěvník stránku vidí. Dříve nastával problém, kdy nějaká stránka přehrávala zvuk, ale návštěvník nebyl s to poznat, která to je. Prohlížeče se to naštěstí už snaží řešit signalisací přehrávání u záložek:

Dále by měla existovat možnost **hrající hudbu vypnout**.

## Preload

```
&lt;audio src="zvuk.mp3" **preload="metadata"**>
&lt;/audio>
```

Důležitou věcí je přednačítání zvukového souboru. Výchozí chování bez uvedení atributu `preload` je takové, že prohlížeč soubor bude stahovat klidně celý, i když ho návštěvník třeba ani nechce přehrávat.

Možné hodnoty jsou:

  - `preload="auto"` – stejné jako neuvedení atributu

  - `preload="none"` – nestáhne se vůbec nic

  - `preload="metadata"` – stáhne se například délka zvukového souboru

Řešit přednačítání vždy obsahuje dilema, jestli zlepšit uživatelský zážitek na úkor plýtvání dat.

## Opakované přehrávání

```
&lt;audio src="zvuk.mp3" **loop**>
&lt;/audio>
```

Přidáním atributu `loop` jde docílit nekonečného přehrávání zvuku.

Opakování jde nastavit pouze v režimu ano/ne. Tedy `loop="3"` nezpůsobí trojité přehrání, ale nekonečnou smyčku.

**Kontrolní otázka**: Kolikrát se přehraje zvuk s `loop="false"`?

  -  jednou
    
  -  bude hrát donekonečna

Čekám na správnou odpověď…

  **Správně**.

  Bude se přehrávat donekonečna, protože atribut `loop` nepodporuje žádnou hodnotu. Cokoliv, co se mu zadá, se tak bude ignorovat.

vysvetleni.style.display = "none";

## Historie zvuků na webu

K přehrávání zvuku i v **IE 8** nebo starších je potřeba sáhnout po starších postupech, než je element `&lt;audio>`.

### Flash

Flash sice v roce 2015 umřel, ale přesto je asi nejlepší pro staré prohlížeče použít miniaturní **Flash** polyfill – například [audio.js](http://kolber.github.io/audiojs/). Stačí používat normální značku `&lt;audio>` a JavaScript se sám postará o podporu ve starých prohlížečích.

Kromě Flashe existují další možnosti, které popisuje následující článek:

    - Jak psát web: [Zvuky na stránkách](http://www.jakpsatweb.cz/zvuky.html)

### `&lt;bgsound>`

Pro zvuk na pozadí vymyslel **Internet Explorer** speciální značku `&lt;bgsound>`. Funguje ještě v [**IE 11**](/ie11) – [ukázka](http://kod.djpw.cz/iwtb). Nastupující prohlížeč **Edge** už ji nepodporuje.

Takto zadaný zvuk se začne přehrávat ihned po navštívení stránky.

```
&lt;bgsound src="zvuk.wav">
```

### `&lt;embed>`

Vložit do stránky zvuk jde také značkou `&lt;embed>`. Takový postup funguje i v dnešních prohlížečích (kromě **MS Edge**). Akorát se pro přehrání použije plugin z operačního systému, který je v některých prohlížečích nutné povolit:

[Živá ukázka](http://kod.djpw.cz/jwtb)

### `&lt;object>`

**Yuhů** na JPW ještě zmiňuje vložení zvuku značkou `&lt;object>` pomocí ActiveX. To funguje pouze v **IE** a projevuje se vložením pluginu Windows Media Playeru. V **Edge** ani jiných prohlížečích to nic nedělá.

## Vytvoření zvuku

Zvuk pro použití na webu jde například nahrát na mikrofon nebo odněkud stáhnout.

Existují stránky obsahující tisíce zvuků, které lze zdarma použít, stačí jen použít Google.

### Stříhání zvuku

Pro stříhání a úpravu zvuků se hodí zdarma dostupný program [Audacity](http://audacityteam.org/). Pro export zvuku do MP3 je potřeba stáhnout ještě [LAME knihovny](http://lame.buanzo.org/#lamewindl).

### Konvertování formátů

Pro převod zvukových souborů do různých formátů je nejrychlejší použít nějaký online nástroj, například [Online-convert.com](http://audio.online-convert.com/).

## Odkazy jinam

  - DevDocs: [`&lt;audio>`](http://devdocs.io/html/element/audio)

  Sitepoint: [5 Libraries and APIs for Manipulating HTML5 Audio](http://www.sitepoint.com/5-libraries-html5-audio-api/)
  - [Experiment: HTML5 Music Player](http://tutorialzine.com/2015/03/html5-music-player/) – vytvoření hudebního přehrávače v HTML 5

  - [Free Open Source JS Audio Music Players](http://www.webresourcesdepot.com/open-source-js-audio-players/)

[https://hacks.mozilla.org/2014/03/audio-tags-web-components-web-audio-♥/](https://hacks.mozilla.org/2014/03/audio-tags-web-components-web-audio-♥/)

[https://hacks.mozilla.org/2014/06/easy-audio-capture-with-the-mediarecorder-api/](https://hacks.mozilla.org/2014/06/easy-audio-capture-with-the-mediarecorder-api/)

-->

  function odpoveded(cislo, spravna) {
    var cekam = document.getElementById("cekam");
    var vysvetleni = document.getElementById("vysvetleni");
    cekam.style.display = (cislo == spravna) ? 'none' : ''; 
    vysvetleni.style.display = (cislo == spravna) ? 'block' : 'none'
  }