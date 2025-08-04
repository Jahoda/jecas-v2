---
title: "Prodleva při kliknutí na mobilu"
headline: "Prodleva po tapnutí na mobilech"
description: "Co způsobuje 300 milisekundovou prodlevu po kliknutí na odkaz/tlačítko na dotykových zařízeních."
date: "2015-03-14"
last_modification: "2017-02-21"
status: 1
tags: ["Rady a nápady", "Responsivní design"]
---

Při ovládání webu na zařízeních s **dotykovou obrazovkou** se je možné setkat s lehkou prodlevou mezi kliknutím na odkaz nebo tlačítko a provedení akce.

Prodleva o délce cca 300 ms je způsobena tím, že po prvním stisku (`ontouch`) mobilní prohlížeče čekají, zda náhodou není cílem vyvolat **dvoj-dotyk**, který typicky slouží k zoomování.

Pokud je stránka [responsivní](/responsive) a vejde se bez změny měřítka na displej, zdá se toto vyčkávání na gesto pro přiblížení/oddálení **zbytečné**.

## Odstranění prodlevy po kliknutí

### Mobilní Chrome a Firefox na Androidu

V mobilních versích prohlížeče **Chrome 32** a novějších postačí přítomnost [značky `viewport`](/meta-viewport):

```
&lt;meta name="viewport" content="width=device-width">
```

Starší a některé další prohlížeče na Androidu reagují po dotyku okamžitě při **zakázání zoomování**:

```
&lt;meta 
  name="viewport" 
  content="width=device-width, **user-scalable=no**"
>
```

Zakázat přibližování ale není z uživatelského hlediska úplně vhodná věc. I při responsivní podobě stránek se může hodit si například zvětšit obrázek. Populární mobilní aplikace [Twitteru](/twitter) nebo [Facebooku](/facebook) tento způsob používají.

### Mobilní IE na Windows Phone

V mobilní IE slouží k okamžité odezvě CSS vlastnost `touch-action`.

Aplikovat ji jde na celý dokument (`html`):

```
html {
  -ms-touch-action: manipulation; /* IE10  */
  touch-action: manipulation;
}
```

Nebo jen na jednotlivé **ovládací prvky**.

```
a, button, .tlacitko {
  -ms-touch-action: manipulation; /* IE10  */
  touch-action: manipulation;
}
```

Či obecně pro všechna tlačítka, jiné formulářové prvky a [odkazy](/odkaz):

```
a,
area,
button,
[role="button"],
input,
label,
select,
summary,
textarea {
  -ms-touch-action: manipulation; /* IE10  */
  touch-action: manipulation;
}
```

### Safari na iOS

**Safari** od verse 9.3 (březen 2016) vlastnost `touch-action` podporuje.

Ve starších Safari nějaký standardní způsob, jak prodlevu *vypnout* neexistuje.

### Starší prohlížeče

Zrušit prodlevu čekání v nepodporovaných prohlížečí jde pouze na základě monitorování [dotykových událostí](/udalosti-mysi#dotykove) a hádání, jestli uživatel opravdu chce vykonat akci tlačítka/odkazu. Existují na to hotová řešení:

  - [Tappy!](https://github.com/filamentgroup/tappy/)

  - [FastClick](https://github.com/ftlabs/fastclick)

## „Využití“ prodlevy

Místo odstranění prodlevy ji někdy jde využít pro **načítání dat** – tj. začít načítat data na pozadí ihned při dotyku (`ontouchstart`). Obdobně jako u stisku a uvolnění tlačítka klasické **myši**.

    - [Zrychlení AJAXové aplikace o 100 ms](/zrychleni-kliknutim)

Pochopitelně tento postup nejde použít vždy. Zvlášť u nevratných akcí na serveru by bylo takové spouštění v okamžiku, kdy ještě není jasné, jestli uživatel akci chce skutečně vyvolat, nebylo rozumné.

## Odkazy jinam

  - Adactio: [Delay](https://adactio.com/journal/10019) – ovlivnění chování přes CSS: `touch-action: manipulation`

  - Sitepoint: [5 Ways to Prevent the 300ms Click Delay on Mobile Devices](http://www.sitepoint.com/5-ways-prevent-300ms-click-delay-mobile-devices/)

  - HTML5 Rocks: [300ms tap delay, gone away](http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away)