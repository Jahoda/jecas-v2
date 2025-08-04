---
title: "Ikona stránky favicon"
headline: "Ikona stránky favicon"
description: "Jak správně vytvořit ikonku stránky (favicon) pro desktop i mobily."
date: "2014-05-18"
last_modification: "2015-11-20"
status: 1
tags: ["HTML", "Hotová řešení", "Ikony"]
---

Pro **lepší orientaci návštěvníka** mezi otevřenými záložkami je velmi vhodné přidat k webu malou ikonku – tzv. *favicon*

Při velkém počtu otevřených *tabů* je malá (16 × 16 pixelů) ikonka hlavním orientačním prvkem, jak požadovanou záložku najít.

Z tohoto důvodu jde považovat **absenci ikony** za velkou chybu s ohledem na použitelnost.

Kromě otevřených tabů se ikonka vyskytuje v *Liště záložek*. **Chrome**, **Firefox** nebo **Opera 15+** ji mohou zobrazovat hned pod adresním řádkem:

Další argument, proč soubor `favicon.ico` s ikonkou mít, je ten, že prohlížeč se na danou adresu podívá automaticky. Je zbytečné, aby takový pokus skončil **chybou 404**.

## Název `favicon.ico`

V dávných dobách, kdy ještě webové prohlížeče nepodporovaly prohlížení v záložkách (např. **IE 6** a starší), se prohlížeč po uložení stránky do oblíbených podíval, za existuje ikonka na adrese `example.com/favicon.ico` a pokusil se ji použít. Proto název *favicon* – zkratka favorite icon.

Jak fungovaly favicony před cca 15 lety popisuje historický článek:

    - Jak psát web: [Ikona stránky](http://www.jakpsatweb.cz/favicon.html)

Novější prohlížeče potom tento v podstatě standard převzaly a začaly ikonky nazvané `favicon.ico` zobrazovat u jednotlivých listů.

Pro přidání ikonky stránky tak stačí pouhé umístění souboru ve formátu `*.ico` do kořenového adresáře dané domény nebo subdomény.

## Značka `&lt;link>`

Protože používání ikonky jen na základě umístění není moc transparentní, existuje ještě zvláštní hodnota `rel` atributu značky `&lt;link>`, která se dává do hlavičky stránky a umí na ikonku ukázat.

```
&lt;link rel="shortcut icon" href="ikona.ico" type="image/x-icon">
```

Soubor s ikonou se potom může **jmenovat libovolně a nemusí být pouze v kořenu domény**. Pokud takové požadavky nejsou, je jeho použití zbytečné.

Při nepoužití `&lt;link>`u a už nakešované favikoně se prohlížeče typicky na souboru `favicon.ico` nedotazují, ale berou ho automaticky z disku. Při uvedení ikony v `&lt;link>`u se například v **Chrome** vyšle HTTP požadavek na danou URL.

Použít `&lt;link>` na jednu stranu může být zbytečná režie pro návštěvníka, ale zase to teoreticky může znamenat rychlejší obnovení staré nakešované ikonky.

## Dlouhé cacheování

Vzhledem k tomu, že si prohlížeče soubor `favicon.ico` dokáží najít automaticky, mají tendenci si ho potom **ponechat na dlouhou dobu** v dočasných souborech.

I po mnoha **měsících nebo letech** se může zobrazovat stará podoba ikonky. Proto je dobré ji moc **neměnit**.

Případně ikonku připojit značkou `&lt;link>` a po změně ikonky změnit název souboru.

## Velikost ikony

Favikona u jednotlivých tabů se zobrazuje v desktopových prohlížečích ve velikosti **16 × 16 px**.

Prohlížeče [**MS Edge**](/microsoft-edge) a [**IE 11**](/ie11) ji v jiné velikosti zobrazují v „rychlém přístupu“.

**Edge** ji zobrazuje v rozlišení **40 × 40 pixelů**:

**IE 11** potom v rozměrech **32 × 32 px**:

Ostatní prohlížeče v **rychlém přístupu** zobrazují přímo náhled stránky. **Firefox** pouze web, **Chrome** potom ještě s ikonou v rozměrech 16 × 16:

## Větší ikony na mobilech/tabletech

### iOS zařízení

Zařízení s **iOS** (iPhone, iPad, …) se s obvyklou velikostí 16 × 16 u favikonek nespokojily a zavedly nový standard. Je to docela pochopitelné, protože pro dotykové ikony je 16 pixelů málo:

Vkládají se proto do hlavičky speciální značky `&lt;link>` s hodnotou *apple-touch-icon*:

```
&lt;link rel="apple-touch-icon" sizes="114x114" href="ikona.png">
```

Vytvořit ikonky pro zařízení od **Applu** je rozumné už jen kvůli tomu, aby pokus o jejich stažení neskončil chybou 404.

Podobně jako u `favicon.ico` se i „**dotykové ikony**“ hledají automaticky. Konkrétně v pořadí:

  - `apple-touch-icon-180x180-precomposed.png`

  - `apple-touch-icon-180x180.png`

  - `apple-touch-icon-precomposed.png`

  - `apple-touch-icon.png`

Kde `180x180` značí optimální velikost ikony pro daný typ zařízení/displeje. Slovo `precomposed` potom znamená, že se na ikonu nemají aplikovat efekty, které ji sjednocují s ikonami iOS.

    - iOS Developer Library Developer: [Configuring Web Applications](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

**Optimálních rozměrů ikonek** pro různá iOS zařízení je spoustu, takže je nejlepší vygenerovat ikony pro každý z rozměrů.

Aktuálně jsou [uváděny](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html) následující rozměry:

  180 × 180
  iPhone 6s Plus and iPhone 6 Plus (@3x)
  
  167 × 167
  iPad Pro (@2x)
  
  120 × 120
  iPhone 6s, iPhone 6, and iPhone 5 (@2x), iPhone 4s (@2x)
  
  152 × 152
  iPad and iPad mini (@2x)

U starších zařízení a operačních systémů se ještě objevovala rozlišení 144 × 144, 114 × 114, 76 × 76, 72 × 72, 60 × 60 nebo 57 × 57.

Pro **nejlepší výsledek** je tak nutné vygenerovat 10 různě velkých ikonek:

```
&lt;link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
&lt;link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
&lt;link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
&lt;link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
&lt;link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
&lt;link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
&lt;link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
&lt;link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
&lt;link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
```

Není bezpodmínečně nutné mít **obrázek pro každou velikost**. V případě, že optimální velikost chybí, použije se nejmenší větší ikona, než zařízení požaduje, případně největší dostupná ikona.

Pro zjednodušení procesu existuje **generátor**, který ikony potřebné velikosti vytvoří včetně `&lt;link>` značek do hlavičky stránky. Kromě ikonek pro zařízení od **Applu** generuje i ikonky pro **Android** a **Windows**.

    - [Real Favicon Generator](http://realfavicongenerator.net) – generátor všech potřebných ikon

    - [Favicon &amp; App Icon Generator](http://www.favicon-generator.org/) – obdobný nástroj

### Android

**Chrome** v **Androidu** dříve podporoval taktéž automaticky načítané *apple-touch* ikony na základě hledání ve známých adresách. Kvůli četným 404 chybám od toho ale **Chrome 30** upustil.

Android jinak podporuje standardní zápis s `rel=icon`:

```
&lt;link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
```

Důležitý je atribut `sizes`, podle kterého se rozhodne, jak velká ikonka se použije.

Je doporučené používat ikonu **192 × 192 pixelů**.

**Chrome** si umí poradit i s *apple-touch* ikonami připojenými značkou `&lt;link>`, i když prý jen dočasně.

    - Developer Google Chrome: [Add to Homescreen](https://developer.chrome.com/multidevice/android/installtohomescreen)

### Windows

**Windows** má svůj zvláštní zápis pro ikonky aplikací – ty se zobrazují v dlaždicích. Ve **Windows 8**, [**Windows 10**](/windows-10) a **Windows Phone**.

Pro **Windows** dlaždice se k tomuto účelu používají `&lt;meta>` značky:

```
&lt;meta name="msapplication-TileColor" content="#1081dd">
&lt;meta name="msapplication-TileImage" content="/mstile-144x144.png">
```

Jak je patrné z obrázku, nejlepší bude jednobarevná ikona s průhledností.

Pro připnutí stránky z **Internet Exploreru** na hlavní panel Windows se používá `favicon.ico`. Je proto ideální, když má i rozměr 32 × 32 px.

    - MSDN: [Creating custom tiles for IE11 websites](https://msdn.microsoft.com/en-us/library/dn455106(v=vs.85).aspx?f=255&MSPPError=-2147217396)

## Favikony a SVG

Vzhledem k hromadě rozměrů se nabízí použít pro ikony vektorový formát [SVG](/svg).

Nemuselo by se potom generovat skoro **30 různých souborů**:

Favicony v SVG momentálně podporuje:

  - **Firefox 41**,

  - **Safari 9 **

Pro desktopový **Firefox** to moc zajímavé není, protože používá stejně jen ikonku 16 × 16. **Safari 9** v Mac OS X El Capitan zobrazuje SVG ikonku u připnutých záložek:

SVG ikona pro **Safari** musí být monochromatická a barva pro *focus* se nastavuje atributem `color`:

```
&lt;link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1081dd">
```

SVG ikona se připojí obdobně jako PNG:

```
&lt;link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

Související:

      - The new code: [Making And Deploying SVG Favicons](http://thenewcode.com/28/Making-And-Deploying-SVG-Favicons)

## Jak vytvořit ikonu?

### Použít generátor

Při vytváření základního obrázku je dobré myslet na to, že se bude **nejčastěji zobrazovat ve velikosti 16 × 16 pixelů**, takže by se mělo jednat o něco jednoduchého, co bude při těchto malých rozměrech vypadat rozumně.

Vzhledem k různým velikostem a formátům je potom nejsnazší vytvořit PNG obrázek v rozměrech **260 × 260** a vložit ho do [Favicon Generatoru](http://realfavicongenerator.net/), který soubory ve všech potřebných formátech vytvoří a stejně tak i připraví HTML kód pro ikonky, který stačí zkopírovat do hlavičky ([`&lt;head>`](/html-kostra#head)).

### Ruční vytvoření ikony

Při ručním vytváření a správě ikon je asi nejsnazší vytvořit soubor `favicon.ico` ve velikosti 16 × 16. Bude fungovat v drtivé většině případů. U záložek v prohlížečích se stejně nic většího nezobrazuje.

Uložit obrázek jako ICO jde v grafickém editoru. Návod pro GIMP:

    - [Creating Multi-Resolution Favicons For Web Pages With GIMP](http://thenewcode.com/467/Creating-Multi-Resolution-Favicons-For-Web-Pages-With-GIMP)

Případně existuje hromada **online převaděčů**. Třeba:

    - [ICO converter](http://www.icoconverter.com/)

Formát `*.ico` je specifický tím, že v jednom souboru může být více variant ikon. Není tak úplně naškodu mít *favicon* i v rozměrech 32 × 32, byť to zvýší datovou velikost (větší ikonka se hodí např. při připnutí stránky z **Internet Exploreru** na hlavní panel).

Bude-li `favicon.ico` v kořenovém adresáři, není třeba na ni odkazovat značkou `&lt;link>`.

**„Touch“ ikona** pro připnutí stránky na hlavní obrazovku u dotykových zařízení je nejsnáze realisovatelná jedním obrázkem o rozměrech rozměrech 192 × 192 s názvem `apple-touch-icon-precomposed.png`.

Název zajistí funkčnost na **iOS**. Pro **Android** se ikonka připojí značkou:

```
&lt;link rel="icon" sizes="192x192" href="apple-touch-icon-precomposed.png">
```

Pro řadu starších zařízení bude ikona zbytečně datově velká, ale pokud nebude moc komplikovaná, tak se i tak vejde po [optimalisaci](/optimalisace-obrazku) do několika kB.

## Best-practice

Jako nejlepší postup pro vytváření *faviconek* jde považovat výsledek produkovaný **Real Favicon Generátorem**. Proč ikony připravuje, tak jak připravuje, je důkladně zdůvodněné v FAQ:

  - [Real Favicon Generator: FAQ](http://realfavicongenerator.net/faq) – argumentace pro chování generátoru ikonek

## Využití favikony

Kromě nejpoužívanější funkce ikony – znázornění webu – jde vymyslet i další využití:

### Odlišení kategorií webu

Na [Diskusi JPW](http://djpw.cz) to před lety vymyslel [**Chamurappi**](http://webylon.info). Miniaturní rozměry ikonky ale moc prostoru nedávají:

S jednodušší podobou ikonky by šlo docílit snazšího odlišení změnou barvy.

### Notifikace

Teoreticky je možné změnou ikonky znázorňovat notifikace.

Většina webů ale místo toho používá spíš [změnu titulku](/ikona-prehravani) – `document.title`.

    - [favico.js](http://lab.ejci.net/favico.js/) – JS pro změnu ikon, znázorňování notifikací nebo přehrávání videa

      - [How to Display Update Notifications in the Browser Tab](http://webdesign.tutsplus.com/tutorials/how-to-display-update-notifications-in-the-browser-tab--cms-23458) – notifikace přes favikonky

## Odkazy jinam

  - [Everything you always wanted to know about touch icons](https://mathiasbynens.be/notes/touch-icons) – popisuje chování dotykových ikonek v různých prohlížečích

  - Jonathan T. Neal: [Understand the Favicon](http://www.jonathantneal.com/blog/understand-the-favicon/) – pohled do historie favikonek