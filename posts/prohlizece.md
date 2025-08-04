---
title: "Testování webů v různých prohlížečích"
headline: "Testování webů napříč prohlížeči"
description: "Možnosti, jak otestovat webové stránky v různých versích různých prohlížečů. Desktopových i mobilních."
date: "2013-06-22"
last_modification: "2013-06-24"
status: 1
tags: ["Produktivita", "Prohlížeče", "Testování webů"]
---

## Více Internet Explorerů

Na jednom systému Windows není standardní cestou provozovat různé IE. Naštěstí ale existuje několik možností, jak více versí Internet Exploreru na jednom počítači přece jenom dosáhnout.

### Vývojářské nástroje

Pokud si aktualisujeme Internet Explorer na nejnovější, lze si ve vývojářských nástrojích (po stisknutí klávesy F12) přepínat režimy starších Explorerů.

Stažení IE 10

### IE Tester

Speciální program obsahující všechny Explorery se jmenuje IETester.

Stránka IE Testeru

### Virtuální stroj

Virtuální stroj (virtual machine) slouží k provozování dalšího OS ze svého běžného systému. Microsoft připravil obrazy různých operačních systémů se všemi reálně používanými versemi Explorerů.

Trochu nevýhoda je, že nabízené operační systémy jsou aktivovány jen na 30 dní. Je proto potřeba po případném uzpůsobení si daného image vytvořit snapshot a minimálně jednou do měsíce se k němu vrátit.

Stažení image z modern.IE

Každé řešení má svoje.

Přepínání ve vývojářských nástrojích je nejjednodušší.
IE Tester poslouží tam, kde není nejnovější IE možné nainstalovat.
Používání IE ve virtuálním stroji zase zajistí 100% shodu se skutečnými prohlížeči. Předchozí dvě varianty mají drobné odchylky.

## Opera, Firefox, Chrome

Tyto prohlížeče se mají tendenci u uživatele samy a často aktualisovat. Nová verse tu starou takřka kompletně vytlačí za pár měsíců. Navíc se jednotlivé verse moc neliší.

Následovně vypadá střídání jednotlivých Chromů za poslední rok (zdroj StatCounter.com).

Starší verse prohlížečů je možné sehnat na stránce OldApps.com.

Prohlížeč Opera
Prohlížeč Chrome
Prohlížeč Firefox

## Mobilní prohlížeče

Pod tímto pojmem rozumíme prohlížeče používané v přenosných zařízeních jako je chytrý telefon nebo tablet.

### Opera Mobile

Mobilní Opera nabízí desktopový emulátor pro Windows, Mac i Linux.

  Opera Mobile Emulator

### Internet Explorer Mobile

V mobilních operačních systémech Windows Phone od Microsoftu se používají prohlížeče založené na stejném jádru jako desktopové Explorery. Zjednodušeně řečeno si stačí zmenšit okno běžného IE.

Pro věrnou simulaci lze použít emulátor celého systému Windows Phone.

Windows Phone SDK

### Mobilní Chrome, Firefox, Safari

U ostatních prohlížečů platí totéž, co u mobilního IE. Pro základní simulaci stačí zmenšit okno běžného prohlížeče. 
  
V **Chromu** je docela zajímavý nástroj ve vývojářských nástrojích (po stisknutí F12). Díky němu lze vybírat z běžných rozměrů mobilních zařízení, simulovat geolokaci, dotykové události a jiné.

Pro naprosto věrnou simulaci mobilního prohlížeče na desktopovém OS by bylo (jako v případě IE) SDK daného systému.

## Zobrazení screenshotu stránky

Pro zběžnou představu, zda není v jednotnosti webové stránky chyba, mohou posloužit služby tvořící náhledy.
  
Browsershots.org

## BrowserStack

Tato služba nabízí kromě screenshotů webu ve všech možných prohlížečích i možnost přímo z vlastního prohlížeče živě testovat.
K disposici jsou všechny běžně používané prohlížeče a dokonce i mobilní Opera, Chrome (Android) a Safari (iOS).

Nevýhoda je, že BrowserStack není zdarma. Nabízí určitý čas k vyzkoušení, dlouhodobé používání stojí přibližně 20 dolarů za měsíc.

BrowserStack

## Cross Browser Testing

Podobná služba jako **BrowserStack**, rovněž placená a se zkušebním provozem zdarma. Nezkoušel jsem.

[Cross Browser Testing.com](http://crossbrowsertesting.com/)

## Pro které prohlížeče optimalisovat?

Tím se zabývám v článku: [Pro jaké prohlížeče ladit svůj web](/prohlizece-optimalisace).

## Loga všech prohlížečů

[Kvalitní loga](https://github.com/paulirish/browser-logos) všech známých i méně známých prohlížečů.