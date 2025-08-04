---
title: "Box model"
headline: "Box model"
description: "Co je to a jaký box-model si vybrat. Jaké jsou výhody a nevýhody."
date: "2013-08-20"
last_modification: "2013-08-21"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Pod pojmem **box-model** se nejčastěji rozumí **způsob, kterým prohlížeče počítají rozměry ** nějakého elementu.
Existují dva:

  - **obsahový** — `box-sizing: **content**-box` (výchozí)

  - **okrajový** — `box-sizing: **border**-box`

## Obsahový box model

Pokud zvolíme [*standardní* `&lt;!doctype&gt;`](/doctype), ve všech běžně používaných prohlížečích se bude automaticky používat **box model obsahový**. Co to znamená?

  **Celková šířka elementu**
    je rovna: `width` + `padding-left` + `padding-right` + `border-left-width` + `border-right-width`
  **Celková výška elementu**
    je rovna: [`height`](/height) + `padding-top` + `padding-bottom` + `border-top-width` + `border-bottom-width`
Pokud tedy chceme na stránce vyrobit *box* o šířce **150** pixelů s rámečkem **1** pixel a odsazením **7** pixelů, musíme značně nepohodlně přepočítat šířku:

  150 px**původní šířka**
  −1 pxlevý rámeček
  −7 pxlevé odsazení
  −7 pxpravé odsazení
  −1 pxpravý rámeček
  =134 px**nová šířka**

Nebo použít další obal.

### Obal

V obalu je další element, který nastavuje pouze `padding` a `border`, ale **nikoliv šířku**.
```
&lt;div style="width: 150px"&gt;
  &lt;div style="border: 1px solid #ccc; padding: 7px"&gt;
  &lt;/div&gt;
&lt;/div&gt;

```

## Okrajový box model

Řešením výše uvedené komplikace je `box-sizing: border-box`, neboli box model **okrajový**.

Tomu stačí nastavit konečnou šířku (nebo výšku), a ta bude dodržena nezávisle na `padding`u i `border`u.

Okrajový box model se používá automaticky v Internet Exploererech v případě, že se neuvede `&lt;!doctype&gt;` nebo když uvedeme takový, který nezapne *standardní režim*.

### Používáme `border-box`

**Internet Explorer od verse 8** a ostatní prohlížeče už mnoho let umí používat okrajový box-model i ve **standardním režimu**, stačí přidat do CSS:

```
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
```

Ve starších Explorerech lze vyvolat okrajový box model jen shozením do quirk režimu (např. vynecháním `&lt;!doctype&gt;`). V čemž je zase problém, protože se tím ochudíme o podporu novějších CSS vlastností.

## Co zvolit?

  - Optimalisujeme-li jen pro **IE 8 a novější**, nabízí se jednoznačně používat **box model okrajový**.

  - Optimalisujeme-li i pro **starší Explorery**, je lepší se smířit s nedostatky **obsahového box modelu**.

  Okrajový box-modelV případě používání cizích / již hotových stylů v obsahovém box modelu může nastat problém.

  Naštěstí je možné pro určitý element přepnout box-model zpátky:

  ```
.urcity-element, .urcity-element * {
  box-sizing: **content**-box;
  -moz-box-sizing: **content**-box;
  -webkit-box-sizing: **content**-box;
}
```

  Quirk
  Podstatná nevýhoda quirku, byť tak lze získat *lepší* box-model, je již zmíněná nepodpora novějších CSS funkcí, zároveň plno hotových skriptů nebude už v quirku fungovat.

## Vlastnosti `min`/`max-width`/`height`

CSS vlastnosti pro minimální/maximální šířku/výšku (`min-width`/`max-width` a `min-height`/`max-height`) hodnotu vlastnosti `box-sizing` ignorují v **Internet Exploreru 8** a možná ještě v nějakých starších prohlížečích.

I přes nastavený `border-box` (okrajový box model) počítají rozměry v obsahovém. [Ukázka](http://kod.djpw.cz/yvb).

## Historický vývoj

Historický vývoj jednotlivých box modelů je hezky popsán ve článku [V kaskádovém ringu](http://webylon.info/K.10).

V dnešní době, kdy odumírá poslední prohlížeč, co neumí okrajový box model ve standardním režimu (Internet Explorer 7), se zdá, že budoucnost patří `border-box`u. A výchozí `content-box` nemá/nebude prakticky smysl používat.