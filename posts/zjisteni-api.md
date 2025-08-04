---
title: "Jak získat přístup k API přes mobilní aplikaci"
headline: "Získání přístupu k API přes mobilní aplikaci"
description: "Jak přes mobilní aplikaci získat přístup k neveřejnému API různých webů."
date: "2022-02-27"
last_modification: "2022-12-24"
status: 1
tags: ["Produktivita", "Rady a nápady"]
---

Pro různé věci se může hodit z různých stránek získávat informace a případně je tam i posílat. Typicky za účelem automatisace.

Universální způsob, jak získat API k libovolné stránce je použít nástroj typu [Apify](https://apify.com).

Občas je to ale zbytečně složité a řešení je jednodušší, než se zdá: Má-li daná služba **mobilní aplikaci**, typicky bude s něčím komunikovat přes API.

## Jak odposlechnout API volání

Asi nejsnazší řešení je přes **Android aplikaci**.

Postup je následující:

    Stáhnout si [Android Studio](https://developer.android.com/studio). Vývojové prostředí pro Android aplikace.

    Po spuštění si spustit emulátor – volba *Virtual Device Manager*. Tím lze spustit nějaký virtuální Android telefon na svém počítači.

  Tím by se měl pustit virtuální Android. Zbývá do něj dostat potřebnou aplikaci. Bohužel to není možné z **Google Play** obchodu, takže je potřeba použít nějaký alternativní zdroj – třeba [APKPure](https://apkpure.com/).

    Nebo libovolné `*.apk`.

    Proti stažení to bude protestovat, stačí jen potvrdit a aplikaci po stažení nainstalovat.

  Je potřeba povolit instalaci aplikací z neznámých zdrojů:

  Nyní přichází nástroj HTTP Toolkit
, který zajistí všechno ostatní. Po instalaci a spuštění stačí vybrat **Android device via ADB** a je to.

  V emulátoru se povolí jeho připojení:

  Po nějaké době by se mělo nastavit připojení a všechny requesty by se měly zobrazovat na záložce **View**.

## Použití API URL

Když už je známa adresa API a chce ji člověk použít někde jinde, je potřeba zjistit, jaké věci je potřeba posílat, aby to fungovalo.

K tomu se hodí aplikace [Postman](/postman), kde si jde volání odladit, než se použije někde dál.

Některá API totiž vyžadují **posílání různých hlaviček a klíčů**.

Všechno potřebné jde vyčíst v HTTP Toolkitu, otestovat v Postmanovi a následně použít, jak je potřeba.