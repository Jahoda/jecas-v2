---
title: "Sdílení stránky přes Web Share API"
headline: "Sdílení stránky přes Web Share API"
description: "Web Share API nabízí možnost sdílet odkaz na stránku nebo soubor přes rozhraní prohlížeče/systému."
date: "2021-11-26"
last_modification: "2021-11-26"
status: 0
tags: []
---

Toto API je podle mého reakce na různé JavaScripty třetích stran pro sdílení stránky na různých sociálních sítí.

Např. v roce **2013** bylo běžné, že na webech byla [sdílecí tlačítka](/sdileci-tlacitka) pro [Facebook](/facebook), [Twitter](/twitter) a ostatní sociální sítě.

Tato sdílecí tlačítka mají značný dopad na soukromí uživatele, protože provozovatel kódu v [JavaScriptu](/js) servírující sdílecí tlačítko (např. Facebook) může sledovat uživatele napříč mnoha weby.

Web Share API nabízí alternativu k těmto specifickým sdílecí prvkům. Slouží k tomu jen minimum JavaScriptu a samotné sdílení potom řeší přímo prohlížeč / operační systém přes standardní mechanismy.

    var shareData = {
      title: 'Je čas.cz',
      text: 'Moderní tvorba webových stránek',
      url: 'https://jecas.cz'
    }    
  
  Sdílet Je čas.cz

## Podpora

Aktuálně je sdílení docela dobře podporované zejména **Safari** v iOS i macOS.

Dost značná nevýhoda je v tom, že je následující nabídka značně osekaná oproti sdílecímu tlačítku přímo v prohlížeči:

V **iPhone** je potom nabídka zhruba následující a také osekaná oproti nativní:

Zamrzí zvlášť absence možnosti **Přidat na plochu**, která je u výchozího sdílení přímo přes prohlížeč:

## Použití

Samotný kód pro sdílení je vcelku prostý:

```
navigator.share(objektKeSdileni)
```

V objektu ke sdílení potom může být titulek, popis a URL webu.

```
var objektKeSdileni = {
  title: 'Je čas.cz',
  text: 'Moderní tvorba webových stránek',
  url: 'https://jecas.cz'
}
```

Kromě textu jde sdílet třeba soubory.

Volat `navigator.share` je možné až na základě uživatelské interakce, takže třeba přes [`onclick`](/udalosti-mysi#onclick).

Jinak nastane nějaké takováto chyba:

```
Unhandled Promise Rejection: NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
```

Další podmínka je, že web běží na [HTTPS](/https).

### Test podpory

Určitě není rozumné volat prosté `navigator.share()`. V nepodporovaných případech (nepodporovaný prohlížeč / bez HTTPS) to skončí TypeErrorem:

```
TypeError: navigator.share is not a function. (In 'navigator.share(shareData)', 'navigator.share' is undefined)
```

Existuje ještě `navigator.canShare()` pro ověření podpory sdíleného obsahu, nicméně v případě nepodpory skončí jeho volání také TypeErrorem.

Takže ošetřený kód by mohl vypadat nějak následovně:

```
if (navigator.canShare &amp;&amp; navigator.canShare(objektKeSdileni)) {
  navigator.share(objektKeSdileni)
} else {
  alert('Prohlížeč nepodporuje sdílení')
}
```

## Závěr

Osobně mě úplně nenapadá případ využití této funkce. Zvlášť v případě snahy o sdílení webové stránky, když je k tomu v **Safari** přímo nativní tlačítko nabízející více možností.

Pokud vás ano, budu rád, když mi dáte vědět do komentářů.

## Odkazy jinam

  - MDN: [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)