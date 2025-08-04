---
title: "HTML 5 video vs. GIF"
headline: "HTML 5 <code>&lt;video></code> vs. GIF"
description: "Jaké jsou výhody a nevýhody HTML5  videa oproti GIFu. Co kdy použít?"
date: "2015-12-26"
last_modification: "2016-01-11"
status: 1
tags: ["Obrázky", "Video"]
---

Po dlouhá léta byl [obrázek GIF](/format-obrazku#gif) jedinou spolehlivou možností, jak na webovou stránku snadno vložit něco animovaného/pohyblivého.

V roce 2016 jde s celkem dobrou podporou mimo jiné použít:

  - [SVG](/svg) – JavaScriptem animované vektorové obrázky

  - Značka **`&lt;video>`** – připojení video-souboru do stránky (např. formát MP4)

Co ale zvolit?

## Typ animace

První velmi důležitá věc pro rozhodování je **typ pohyblivého obsahu**. Zatímco pro animování geometrických obrazců bude ideální SVG, pro záznam obrazovky zbývá jen GIF nebo video.

Nahrávat obrazovku do GIFu umí třeba program [ScreenToGif](/video-gif). Další programy pro nahrávání videa jsou popsány v samostatném článku:

    - 50 nejlepších programů pro Windows: [Screenshoty a videa](/windows-programy#screenshoty-videa)

## Délka a velikost

Formát GIF je hodně datově náročný. Oproti MP4 budou mít vteřiny animovaného GIFu ve velkém rozlišení klidně řádově magabytovou velikost.

Pro delší videa s vyšším rozlišením je tak GIF špatně použitelný.

U SVG záleží na typu animace, ale při vhodném použití lze vykouzlit hodně parády při nízké datové velikosti. SVG animované pomocí JavaScriptu nebo CSS může být velmi malé protože veškeré [vykreslování](/vykreslovani) následně obstará engine prohlížeče.

### Průběžné načítání

Výhoda ve video-souboru je dále v tom, že se video dokáže stahovat postupně. Pokud je datová velikost jedné vteřiny videa nižší než rychlost připojení, video se dokáže načítat s průběhem přehrávání, aniž by to způsobilo nutnost čekání.

GIF animace se musí nejprve celá stáhnout.

## Kvalita

Pro vektorové animace jasně vede SVG, které se dokáže libovolně přizpůsobovat rozměry animace bez ztráty kvality.

Vzhledem k tomu, že GIF může mít maximálně **256 barev**, bude výsledná kvalita barevně náročné animace nevalná.

Pro **záznam obrazovky** je tak ideální video soubor.

## Podpora

S podporou v prohlížečích je na tom nejlépe GIF, který funguje téměř všude.

Nejlepší podporu má video ve formátu MP4. Nepřehraje ho ale třeba většina uživatelů **Windows XP**. Pro bezproblémové fungování je tak dobré generovat video do více formátů (např. ještě WebM) nebo kromě značky `&lt;video>` použít ještě Flash přehrávač jako fallback.

Pohodlným řešením je nahrát video na [YouTube](/youtube), čímž se všechny potřebné formáty připraví automaticky. To ale nejde udělat vždy.

SVG nepodporuje **IE 8**, s animováním SVG jsou potom potíže i v novějších prohlížečích. Animace pomocí SMIL nepodporuje žádný **Internet Explorer** ani [**Edge**](/microsoft-edge):

    - Can I use: [SVG SMIL animation](http://caniuse.com/#feat=svg-smil)

Animovat SVG je s dobrou podporou nutné v JavaScriptu.

## Obtížnost sdílení

Jednoduchost sdílení je asi hlavní výhoda GIFu. Získat URL obrázku a poslat ji někomu jinému, vložit ji na sociální síť nebo obrázek uložit a poslat e-mailem dokáže skoro každý.

Uložit / kopírovat URL u `&lt;video>` značky jde v **Chrome** nebo **Firefoxu** stejně jako u obrázku. **MS Edge** má ale u videa kontextovou nabídku jinou, kde kopírování URL není:

Další věc je vložení do [redakčního systému](/cms). Například diskusní fóra obsahují funkce pro vložení obrázku na základě URL, aby se rovnou zobrazil. Podpora obdobné funkce pro video je mnohem méně rozšířená.

Některé systémy dokáží URL obrázku automaticky rozpoznat a vložit ho, v případě videa je to opět mnohem vzácnější.

Například v chatu na [Facebooku](/facebook) se po vložení URL s GIF obrázkem rovnou zobrazí náhled, na rozdíl od MP4 videa:

Uložit SVG obrázek jde jednoduše také, ale už ne s JS kódem, který zajišťuje animování.

## Kontrola přehrávání

Video ve značce `&lt;video>` se díky atributu `controls` může automaticky zobrazit s ovládacími prvky, kterými ho jde zastavit, přetočit nebo spustit znova:

```
&lt;video src="video.mp4" **controls**>
&lt;/video>
```

Ovládat přehrávání GIFu je značně neohrabané. Většinou se proto GIFy vytváří s **nekonečným opakováním**, aby se uživatel dostal k celému jejich obsahu.

Teoreticky jde přehrávání GIFu simulovat tak, že se nejprve zobrazí statický obrázek a ten je na vyžádání nahrazen GIFem:

    - [Ukázka přehrání GIFu na požádání](/video-gif#ukazka)

### Automatické přehrávání

GIF se začne automaticky přehrávat v momentě, kdy se na něj v prohlížeči odroluje.

U značky `&lt;video>` jde automatické spuštění vyvolat atributem `autoplay`. Automatické spuštění videa nefunguje v mobilních prohlížečích, tam musí uživatel vždy spustit video ručně.

## Zvuk

Má-li být obraz doplněn zvukem, je nejlepší řešení video. Přehrát doprovodný zvuk by šlo i ke GIFu, ale půjde obtížně řešit synchronisaci zvuku a obrazu.

## Závěr

GIF je nejlépe podporovaný a snadno se sdílí. Pokud se nejedná o záznam něčeho hodně barevného, dlouhého a ve vysokém rozlišení, není problém ani datová velikost.

Video v MP4 se hodí pro delší videa s vyššími nároky na kvalitu.

Formát SVG je vhodný pro ručně vytvářené animace.

## Odkazy jinam

  - Sara Soueidan: [Animated SVG vs GIF [CAGEMATCH]](https://sarasoueidan.com/blog/svg-vs-gif/) – proč animovat raději v SVG než v GIFu