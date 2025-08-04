---
title: "Box-reflect"
headline: "Box-reflect"
description: "CSS vlastnost <code>box-reflect</code> umí vytvořit odraz celého boxu."
date: "2014-12-11"
last_modification: "2015-02-13"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Někdy kolem roku 2006 bylo relativně populární vytváření grafických podob webů s **odlesky**. Takové odlesky se zpravidla řešily obrázky.

Protože trendem CSS je přidávat vlastnosti, kterými lze zajistit efekty, co se dříve řešily právě těmi **obrázky**, pro odraz boxu existuje vlastnost `box-reflect`.

    - Webylon: [Strážce technické příčetnosti](http://webylon.info/K.47) – pojednání o používání CSS efektů místo obrázků

## Podpora

Odraz boxu pouze pomocí CSS vlastnosti `box-reflect` funguje zatím pouze v prohlížečích používající jádro **Blink**.

  - **Chrome 4**+,

  - **Opera 15**+,

  - **Safari 4**+

Vlastnost se zapisuje s [prefixem](/css-prefixy) `-webkit-`.

## Zápis

```
element {
  -webkit-box-reflect: **směr** **vzdálenost** **maska**;
}
```

### Směr

Směr odlesku boxu je nutné uvést vždy a nabývá čtyř hodnot:

  - `above` (nad boxem),

  - `below` (pod),

  - `right` (vpravo),

  - `left` (vlevo)

### Vzdálenost

Vzdálenost odrazu od boxu se zadává v běžných délkových jednotkách CSS. Uvádět vzdálenost není nutné, použije se potom výchozí hodnota `0` (tedy odraz hned u zdroje). Vzdálenost může být **kladná** (odraz bude mít odstup od originálu) nebo **záporná** (odraz originál překryje).

### Maska

Aby odraz nebyl pouhou 1:1 kopií originálu, dá se použí tzv. *maska*. Zadávat masku je nepovinné. V případě jejího zadání je ale nutné uvést i vzdálenost.

Masku lze vytvořit více způsoby (ukázky fungují pouze v **Chrome** a **Opeře**):

  - [CSS gradientem](/gradient) – klíčové slovo pro průhlednou barvu je `transparent` ([živá ukázka](http://kod.djpw.cz/wikb)),

  - průhledným obrázkem ([živá ukázka](http://kod.djpw.cz/xikb))

Maska funguje tak, že *síla* odrazu je stanovena libovolnou **barvou** a její (polo)průhledností. Kde je barva neprůhledná – zobrazí se zrcadlený objekt v původní podobě. Částečně průhledné oblasti potom zajistí částečnou intensitu originálu.

Původní obrázek:

Maska:

Výsledek odrazu směrem pod element (hodnota `below`) s použitím masky:

## Zajímavosti

    Při **označování textu** kursorem myši se označuje i obsah v odrazu (obráceně to nejde).

    Odraz se **nepočítá do rozměrů** boxu – kopie obsahu tedy může *vylézt* mimo, kde bude překryta případným obsahem. Odraz lze oříznout pomocí `overflow: hidden`. Dostat odraz **nad** okolní obsah nejspíš nejde.

## Jiné způsoby odrazu

Odraz (nad nebo pod) jde rovněž vytvořit prostým zkopírováním boxu a jeho [otočením](/rotace). Vytvořit odraz nad i pod, vlevo i vpravo lze CSS transformací `scale`, která dokáže otočit obrázek kolem své osy:

  - **vodorovně** – `transofrm: scale**Y**(-1)`,

  - **svisle** – `transofrm: scale**X**(-1)`

Ve **Firefoxu** se zkopírování elementu dá vytvořit elegantně nastavením pozadí:

```
#zrcadlo {
  background: -moz-element(#zdroj);
}
```

[Živá ukázka](http://kod.djpw.cz/yikb) (pouze pro Firefox)

## Odkazy jinam

  - Vzhůru dolů: [Box Reflection](http://www.vzhurudolu.cz/prirucka/css3-box-reflection) (česky)

  - MDN: [-webkit-box-reflect](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-box-reflect)

  - [Mastering CSS Reflections in Webkit](http://designshack.net/articles/css/mastering-css-reflections-in-webkit/)

  - [CSS3 Image Reflection](http://www.hongkiat.com/blog/css-reflection/)