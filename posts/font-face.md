---
title: "CSS @font-face"
headline: "CSS <code>@font-face</code>"
description: "Pomocí CSS pravidla <code>@font-face</code> jde na stránce používat různá webová písma."
date: "2013-11-24"
last_modification: "2017-08-20"
status: 1
tags: ["CSS", "CSS pravidla", "Písma"]
---

V dávných dobách se na webu dalo používat pouze písmo, které bylo **nainstalováno v počítači**. Nastavení písma pomocí [`font-family`](/font#font-family) naštěstí funguje tak chytře, že jde **uvést písem víc** a prohlížeč použije první, které bude dostupné.

Pro maximální jistotu se nakonec uvádí ještě **obecná rodina písem** (nejčastěji `serif` – patkové písmo, `sans-serif` – bezpatkové písmo a `monospace` – jako psací stroj)

```
body {
  font-family: 'Název písma', 'Záložní písmo', rodina;
}
```

Použití `@font-face` nabízí připojení souboru s fontem:

## Zápis

V nejjednodušším případě se uvede pouze název písma a cesta k němu:

```
@font-face {
  font-family: "Název písma";
  src: url("pismo.ttf");
}
```

Identifikátor „`Název písma`“ je potom běžně použitelný pro uvedení ve `font-family`.

Jako `src` jde uvést kromě `url` i `local`, díky čemuž prohlížeč zkusí nejprve použít lokální podobu fontu daného názvu:

```
@font-face {
  font-family: "Název písma";
  src: local("Písmo"), 
       url("pismo.ttf");
}
```

Při používání alespoň trochu rozšířených písem se tak může zdát dobré `local` uvést vždy pro případ, že by ho náhodou měl návštěvník nainstalovaný.

V praxi to zase tak dobré není, protože může dojít ke kolisi názvů. V systému může být například nainstalovaná starší verse písma, kde chybí některé znaky a podobně.

### Rozsah znaků `unicode-range`

Vlastností `unicode-range` uvnitř `@font-face` jde specifikovat rozsah znaků, na které se daný font aplikuje.

Zápis může vypadat třeba následovně:

```
unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
```

Díky tomu se může font rozdělit do více souborů a prohlížeč potom stáhne jen ty, které jsou na stránce potřeba.

Podporované od **IE 9**.

## Podpora v prohlížečích

Webové fonty **vůbec nefungují** v prohlížeči **Opera Mini**. Dále nefungují v mobilních **Internet Explorerech 9** a starších (mobilní **IE 9** je ve **Windows Phone 7** zařízeních, která není možné updatovat).

  - [@font-face web font research](https://docs.google.com/presentation/d/1n4NyG4uPRjAA8zn_pSQ_Ket0RhcWC6QlZ6LMjKeECo0/edit#slide=id.g179004919_00) – přehled podpory `@font-face` v roce 2013

Nepodporování webfontů na některých zařízeních je závažným důvodem, proč nepoužívat tzv. **font-ikony** – ikony tvořené písmem.

    - [Font ikony](/font-ikony) – proč je nepoužívat a čím je nahradit.

## Formát fontů

Největším rozdílem mezi prohlížeči je v **podpoře formátů písma**. Typicky se jde setkat s formáty:

  WOFF (*Web Open Font Format*) – koncovka `*.woff`, který je podporován od **IE 9** a od **Android prohlížeče 4.4**.

    WOFF 2.0 – díky lepší kompresi než WOFF 1.0 může být datově menší. Nefunguje v **IE** a ve starších versích ostatních prohlížečů. To ale příliš nevadí, protože se v takovém případě může použít základní verse 1.0.

   EOT (*Embedded OpenType fonts*), koncovka `*.eot`: Podporují ho nové i staré **Internet Explorery** i [**MS Edge**](/microsoft-edge).

  TTF/OTF (*TrueType / OpenType font*), koncovky `*.ttf` a `*.otf`: Je podporován v **IE 9** a novějších a podporuje ho i prastarý **Android Browser 2.2**.

## Hotová řešení

Pro zjednodušení používání webových písem existují online služby, které dokáží fonty nabízet v potřebných formátech a připravit i `@font-face` CSS deklaraci.

Nejznámější jsou asi **Google Fonts**, které jde na web připojovat zdarma:

    - [Česká písma z Google Fonts](/ceska-pisma) – 250 fontů fungujících s českými znaky

Vygenerovat fonty v různých formátech dokáže například Font Squirrel:

    - [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator) – webfont generátor

## Stahování webových fontů

Nejzásadnějším problémem webových fontů je nutnost **stahování souboru s písmem**.  Písma z Google Font mají sice například jen **desítky kilobytů** – při načítání na pomalém mobilním připojení to ale už může znamenat **znatelnou prodlevu**.

Než se takové písmo stáhne, čelí prohlížeč dilematu:

    Vykreslit stránku **záložním písmem** a po načtení speciálního fontu ji **překreslit**. To způsobí visuálně nepěkné probliknutí.

    Pro tento jev je známa anglická zkratka **FOUT** (*flash of unstyled text*).

    V případě, že se zvláštní stahované písmo hodně liší od záložního, může se zásadněji **změnit rozložení stránky**. Proto je dobré ho nastavit co možná nejpodobnější.

    **Počkat na stažení písma** – to je značně problematické tím, že do načtení písma zírá návštěvník na prázdnou stránku. Nemůže si textový obsah číst, ačkoliv je k disposici.

    Tento jev se potom označuje zkratkou **FOIT** (*flash of invisible text*).

Protože nezobrazení textu je větší průšvih než probliknutí, obvykle při dlouhém načítání volí prohlížeče kompromis.

Typicky **tři vteřiny** se čeká na stažení zvláštního písma a potom se přejde na náhradu. Návštěvník si tedy „vychutná“ oba problémy – 3 vteřiny neuvidí text, následně se zobrazí záložní písmo a nakonec stránka po dokončení načtení speciálního písma poskočí:

Není to ale pravidlo. V některých prohlížečích timeout pro přepnutí záložního písma chybí:

    - CSS Font Rendering Controls: [Chování načítání písma v různých prohlížečích](https://tabatkins.github.io/specs/css-font-display/#intro)

## Nejlepší řešení

Je otázka, zda upřednostnit možnost rychlého čtení nebo se snažit eliminovat probliknutí.

Pro **lepší kontrolu nad chováním** načítání se používají různé JS knihovny jako [Web Font Loader](https://github.com/typekit/webfontloader).

Kromě toho **Chrome 35+** a **Opera 22+** mají přímo v sobě zabudované Font Loading API pro sledování načítání fontů. Nástroj [fontfaceonload](https://github.com/zachleat/fontfaceonload) ho potom umí použít v případě, že je dostupné. Jinak se použije Web Font Loader. Pro Font Loading API nakonec existuje ještě [polyfill](/polyfill) [fontloader](https://github.com/bramstein/fontloader).

Konkrétně Web Font Loader dokáže přidávat CSS třídy pro `&lt;html>` na základě průběhu načítání písma. Čímž jde řídit dobu, kterou se má zkoušet načítat webový font a kdy se má sáhnout po systémovém písmu.

Více o tom v článku **Davida Grudla** popisujícím řešení připojení webfontu a čekání na něj po dobu 1 vteřiny:

    - phpFashion: [Jak správně načítat webové fonty](https://phpfashion.com/jak-spravne-nacitat-webove-fonty)

Problém trochu je, že se načítání písma zdrží ještě o načítáním dalšího JavaScriptu + je speciální písmo [závislé na JS](/bez-javascriptu).

### Je zvláštní písmo důležité?

Pro rozhodování o tom, jak se s webfonty vypořádat, by měla hrát roli **důležitost zvláštního webového fontu**.

U **obsahového webu** bude nejspíš důležitější, aby návštěvník mohl co nejdříve začít číst.

A už není tolik důležité, že se obsah zobrazí jiným fontem nebo po načtení webového fontu stránka přeskočí mezi systémovým a webovým písmem.

Přebliknutí systémového písma a webfontu je tedy přijatelná daň a na stažení písma by se tedy nemělo čekat.

U stránky **zaměřené víc na vzhled** než na obsah je ale zase naopak žádoucí, aby přebliknutím netrpěla a pokud možno vždy se zobrazovala speciálním písmem.

### Vynucené čekání na font

V případě, že je naprosto nutné, aby se obsah zobrazil speciálním fontem, je možné ho pomocí [Data URI](/data-uri) vložit do zvláštního CSS souboru, který potom bude **blokovat vykreslování stránky**. Stránka se tedy zobrazí, až bude font načtený.

### První načtení a cache

Problém s probliknutím textu nebo jeho delší neviditelností se zpravidla týká jen **prvního načtení stránky**. Po úspěšném stažení by se písmo mělo uložit do keše prohlížeče a při zobrazení další stránky tak být ihned dostupné.

Teoreticky se tak při první návštěvě může použít systémové písmo a webfont pouze stáhnout pro pozdější použití. Detekovat první/opakované načtení je možné pomocí [cookies](/cookies). Nicméně přítomnost cookie automaticky neznamená, že je písmo nakešované.

Jiný způsob je webfont cacheovat do [`localStorage`](/localstorage):

    - [Better webfont loading with using localStorage and providing WOFF2 support](http://bdadam.com/blog/better-webfont-loading-with-localstorage-and-woff2.html)

### Používat systémové fonty

Jediné 100% řešení přeblikávání písem (FOUT) i neviditelného textu (FOIT) je vůbec **nepoužívat webové fonty**.

Při použití písem předinstalovaných v operačním systému se žádný další font stahovat nemusí, nic není neviditelné a nic nebliká.

Nepoužívání webfontů neznamená, že stránka musí být jen fonty jako je  Times New Roman nebo Arial – existují i další písma předinstalovaná v operačních systémech.

Pokud nevadí, že stránka používá **různé písmo na různých platformách**, jde při nastavování `font-family` vyjmenovat více písem specifických pro danou platformu.

  .systemovym {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;}
  
  Tento text se zobrazuje výchozím systémovým písmem dané platformy.

Problematikou systémových fontů se zabývá samostatný článek:

    - [Systémová písma](/systemova-pisma) – jak a proč používat lokální písma dostupné v operačních systémech

### Podobný systémový font

Pro minimalisaci probliknutí po načtení systémového písma existuje šikovný nástroj [Font style matcher](https://meowni.ca/font-style-matcher/).

Vhodnou konfigurací velikosti ([`font-size`](/font#size)), výšky řádku ([`line-heigh`](/font#line-height)) nebo mezer mezi písmeny ([`letter-spacing`](/letter-spacing)) a slovy ([`word-spacing`](/word-spacing)) dokáže docílit proporčně podobného systémového písma k speciálnímu „web fontu“.

## CSS vlastnost `font-display`

Pro řešení případů, co se má dělat před načtením písma, bude v budoucnu sloužit CSS vlastnost `font-display`:

```
@font-face {
  font-display: auto | block | swap | fallback | optional;
}
```

    - [CSS Font Rendering Controls Module Level 1](https://tabatkins.github.io/specs/css-font-display/)

## Podpora českých znaků

Další bolístkou zvláštních písem je případná absence některých speciálních znaků – typicky háčků a čárek.

V lepším případě se tyto neznámé **znaky s diakritikou** zobrazí jiným stylem písma – což bude trochu ošklivé, ale řada lidí si toho vůbec nemusí všimnout.

Horší případ je, když se místo chybějících znaků zobrazí pouze křížky:

V některých prohlížečích nepodporujících vlastní fonty se potom text zobrazí nějakým systémovým písmem (to dělá **Opera Mini**):

### Jak zjistit podporu českých znaků?

Z Google Fonts jsem se pokusil automaticky určit ta písma, která českou diakritiku obsahují:

    - [Česká písma (250 fontů)](/ceska-pisma)

Pro detailní zkoumání konkrétních písem vytvořil **Chamurappi** speciální nástroj:

    - [Fontokuk](http://fontokuk.webylon.info) – Jednoduchý nástroj na testování přítomnosti znaků v písmech

## Odkazy jinam

  - DevDocs: [`@font-face`](http://devdocs.io/css/@font-face)

  - [Font Loading Revisited with Font Events](http://www.filamentgroup.com/lab/font-events.html)

  - [The @font-face dilemma](https://viget.com/extend/the-font-face-dilemma)

  - [Web Font Anti-Patterns](http://bramstein.com/writing/web-font-anti-patterns.html) – čemu se vyvarovat při používání webfontů

  - Sitepoint: [4 Expert Tips for Getting the Most Out of Google Fonts](http://www.sitepoint.com/4-expert-tips-google-fonts/) – tipy pro optimalisaci Google fontů

  - [Detecting System Fonts Without Flash](http://bramstein.com/writing/detecting-system-fonts-without-flash.html) – detekce instalovaných systémových fontů

  - [The Joy of Subsets: Crossbreeding Web Fonts](http://www.sitepoint.com/joy-of-subsets-web-fonts/)

  - [Critical Web Fonts](http://www.zachleat.com/web/critical-webfonts/)