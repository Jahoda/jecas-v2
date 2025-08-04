---
title: "Hlasování v anketě pouze jednou"
headline: "Hlasování v anketě pouze jednou"
description: "Jak umožnit návštěvníkům hlasovat v anketě pouze jednou."
date: "2015-04-02"
last_modification: "2015-04-05"
status: 1
tags: ["Rady a nápady", "Bezpečnost"]
---

Pokud je na stránce anketa a je cílem, aby hlasování nemohlo být záměrně příliš zmanipulované, je vhodné podniknout několik kroků.

## Uložení cookie

Ukládat cookie jako ověření, zda uživatel hlasoval, **je v podstatě k ničemu**. Cookies jdou v prohlížeči vypnout nebo vymazat. Uživatel může mít víc prohlížečů a navíc v dnešní době existují prohlížeče umožňující **otevření anonymního okna**, čímž ochrana pomocí cookie nebude funkční.

Pokud je **anketa nechráněná** vůbec nebo nechráněná pomocí cookies, stačí si v prohlížeči spustit jednoduchý skript a hlasy budou díky [časovači `setTimeout`](/odpocitavani) bleskově naskakovat:

```
setInterval(
  function() {
      var img = new Image();
      img.src = "http://example.com/hlasovat?volba=1";
  }, 
  1000 // Hlasování každou vteřinu
);
```

## Kontrola IP adresy

Ověřování IP adresy vyžaduje ukládání jednotlivých hlasů (ideálně do DB) a následné testování, jestli daná IP adresa již nehlasovala.

Omezení na IP adresy má lehké **nedostatky**:

    Více uživatelů může mít jedinou IP adresu, ale hlasovat bude moci jen ten první.

    Jeden uživatel může mít více IP adres. Doma, v práci, během dne při připojení z mobilních zařízení není problém mít hned vyšší jednotky různých IP adres.

    Kromě toho jde použít různé anonymisery, VPN a proxy servery.

    Ve větších městech se stačí projít po ulici a připojovat se k různým otevřeným Wi-Fi sítím.

## Ochrana před CSRF

I při kontrole IP je naprosto klíčové mít u ankety [ochranu před CSRF](/bezpecnost#csrf). Bez takové ochrany může hlasování snadno zmanipulovat majitel hodně navštěvovaného webu, když bude prostřednictvím svých návštěvníků tajně hlasovat.

Stačí k tomu jednoduché pingnutí pomocí JS na hlasovací skript.

```
var img = new Image();   
img.src = "http://example.com/hlasovat?volba=1";
```

Případně vložení obrázku značkou `&lt;img>`:

```
&lt;img scr="http://example.com/hlasovat?volba=1">
```

Takové hlasování se potom tváří zcela legitimně.

## Registrace

Registrace dokáže vyřešit/omezit problém, kdy jeden člověk dokáže hlasovat z více IP adres. Registrace zabere nějaký čas, což zvýší pracnost a sníží tak motivaci hlasování manipulovat.

Na druhou stranu **nutnost registrace** odradí mnohé *poctivé* zájemce o hlasování. Řešení může být požadovat přihlášení přes [Facebook](/facebook)/[Twitter](/twitter) účet, kterým disponuje prakticky každý a přihlášení je otázka několika málo kliknutí.

## Ukládání údajů

V každém případě je ideální si ke každému hlasu ukládat co možná nejvíce dat. Půjde případně zpětně vyloučit podivné hlasy.

## Odkazy jinam

    - PHP Triky: [Unikátnost návštěvníka](http://php.vrana.cz/unikatnost-navstevnika.php) – technické řešení ochrany unikátnosti návštěvníka