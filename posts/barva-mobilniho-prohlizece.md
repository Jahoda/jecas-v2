---
title: "Změna barvy lišty v mobilních prohlížečích"
headline: "Barva horní lišty v mobilním prohlížeči"
description: "Jak obarvit záhlaví mobilního prohlížeče, aby ladilo se stránkou."
date: "2017-11-16"
last_modification: "2020-03-14"
status: 1
tags: ["Prohlížeče", "Rady a nápady", "Responsivní design"]
---

Mobilní OS a prohlížeče se snaží neustále stírat **rozdíly mezi webovou a nativní aplikací**. Jedna malá drobnost, jak se přiblížit stavu nativní aplikace, je přebarvení **záhlaví prohlížeče**.

Používají se k tomu `&lt;meta>` značky umístěné v [hlavičce stránky](/html-kostra#head) (sekce `&lt;head>`).

## Chrome na Androidu

Slouží k tomu `&lt;meta>` značka „theme-color“:

```
&lt;meta name="theme-color" content="**#1081DD**">
```

Druhá možnost je nastavit tuto barvu v souboru `manifest.json`:

```
"theme_color": "**#1081DD**"
```

Zmíněná `&lt;meta>` značka má ale přednost.

      [Using the web app manifest to specify a site wide theme color](https://developers.google.com/web/updates/2015/08/using-manifest-to-set-sitewide-theme-color)

Po jejím použití by měl prohlížeč vypadat obdobně jako na obrázku výše.

## Apple iOS

Pro změnu barvy lišty v **Safari** na iOS je možné dohledat následující značky:

```
&lt;meta name="apple-mobile-web-app-capable" content="yes">
&lt;meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

```

Dle mých testů v **iOS 11** to ale na zobrazení nemá vliv.

    - [Živá ukázka](http://kod.djpw.cz/lelc) – pokus o změnu barvy záhlaví mobilních prohlížečů

## Windows Phone 8.1

Pro Windows Phone a jeho nativní prohlížeč **Edge** se někde uvádí `&lt;meta>` značka:

```
&lt;meta name="msapplication-navbutton-color" content="#1081DD">

```

Podle mých testů ale nic nedělá. Navíc  je tento prohlížeč už minimální zastoupení.

  Zdá se, že přebarvení je možné provést pouze na **Androidu**. Máte jiné zkušenosti? Budu moc rád, když mi dáte vědět v komentářích.

## Odkazy jinam

    - Web Google Developers: [Support for theme-color in Chrome 39 for Android](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android)

    webhint: Valid `Theme-Color`