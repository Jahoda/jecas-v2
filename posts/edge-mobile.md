---
title: "Edge mobile prohlížeč"
headline: "Mobilní MS Edge"
description: "V mobilních Windows 10 je internetový prohlížeč Microsoft Edge. Jaký je?"
date: "2015-08-17"
last_modification: "2015-08-21"
status: 1
tags: ["Prohlížeče"]
---

Po desktopové versi [Windows 10](/windows-10) se chystá i mobilní varianta tohoto operačního systému, která rovněž obsahuje nový [prohlížeč **Edge**](/microsoft-edge).

Jak tomu v dnešní době bývá, **mobilní prohlížeče** obsahují velmi podobná vykreslovací jádra jako „velké“ prohlížeče. Výjimkou není ani **MS Edge**.

Hlavní rozdíl mezi dektopovým prohlížečem je tedy logicky v **uživatelském rozhraní**.

Největší odlišnost oproti desktopovým Windows 10 je v tom, že mobilní Windows už neobsahuje původní **Internet Explorer 11**, ale pouze **Edge**.

## Hlavička `user-agent`

Mobilní **Edge**:

```
Mozilla/5.0 (Windows **Phone 10.0**; **Android 4.2.1**; Microsoft; Lumia) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Chrome/42.0.2311.135 **Mobile** 
Safari/537.36 
Edge/12.10512 

```

**MSE** v desktopovém Windows 10:

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Chrome/42.0.2311.135 
Safari/537.36 
Edge/12.10240
```

## Funkce

V nabídce, která se objeví po kliknutí na trojtečku vpravo dole, toho moc není:

Funkce mobilního **Edge** z části vycházejí z desktopové verse. Nechybí tak:

    **Záložky** – přehled otevřených *tabů* vypadá podobně jako v předchozím mobilním IE.

  **Režim nerušeného čtení** – upraví stránku, aby se lépe četla (tuto funkci obsahoval už mobilní **IE 11**).

  **K přečtení** – uložení webové stránky k pozdějšímu přečtení. Bohužel (zatím?) chybí **synchronisace** mezi mobilním a desktopovým prohlížečem.

    **InPrivate** – anonymní záložka, ve které se nepoužijí uložené cookies a po zavření se vymažou. Při prohlížení je tento režim znázorněn modrou ikonou.

  **Sdílení** – tlačítko pro sdílení webové stránky (na [Facebook](/facebook), [Twitter](/twitter) a podobně).

    **Historie** – přehled navštívených stránek.

## Problémy

Možná je to dané tím, že mobilní Windows nejsou zatím finální, ale v mobilní prohlížeči **Edge** lze pozorovat několik problémů:

### Chybí HTTP autorisace

Vyžaduje-li nějaká stránka autorisaci prostřednictvím prohlížeče, člověk s mobilním **Edge** se na ni nedostane, protože možnost zadat jméno a heslo chybí.

Takto zmíněná autorisace vypadá v desktopovém **Chrome**

### Napovídání adres

Aby člověk nemusel adresy navštěvovaných stránek neustále zdlouhavě zadávat, dokáže je prohlížeč napovídat.

Bohužel mobilní **Edge** občas potřebuje pro nabídnutí **zadat více než jeden znak** z adresy.

### Nastavení výchozího vyhledávače

Pro české podmínky není **výchozí přednastavení [Bingu](/bing)** úplně vhodné. Mobilní **IE 11** šel přenastavit na [Google](/google). Zde tato možnost momentálně chybí.

### Gesto zpět

Starší mobilní **IE 11** dokázal spustit funkci zpět pomocí gesta tažení prstem zleva doprava. V **Edge** toto nic nedělá.

## Podpora webových standardů

Mobilní **Edge** podporuje nejspíš prakticky totéž do desktopová varianta.

### Formuláře

Zajímavé jsou nové funkce ve formulářích.

    Podpora zadávání kalendářního data prostřednictvím zabudovaného kalendáře.

    Týká se značky [`&lt;input>`](/input) s typy `date`, `month` a `week`.

    Při typu `search` se na klávesnicí zobrazí symbol lupy.