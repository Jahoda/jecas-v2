---
title: "Označení povinných položek"
headline: "Označení povinných položek"
description: "Jak elegantně ve formuláři označit povinné položky atributem <code>required</code>."
date: "2014-07-28"
last_modification: "2014-07-31"
status: 1
tags: ["HTML", "Formuláře", "HTML atributy"]
---

Od **Internet Exploreru 10** je pro položky, které se musí vyplnit, funkční HTML atribut `required` pro formulářová pole.

```
&lt;input name="jmeno" **required**>
```

Takové políčko je potom nutné (v podporovaných prohlížečích) vyplnit, jinak se odeslání formuláře nezdaří.

    Povinné pole: 
    Odeslat

Vypadat by hláška upozorňující na **nutnost vyplnění** měla vypadat zhruba následovně (ukázka z **Firefoxu**).

## Validace pole

Odlišit **vyplněné** povinné pole od **nevyplněného** jde selektory [`:valid` a `:invalid`](/valid-invalid).

    .validace :invalid+span:before,
    .validace :valid+span:before {
      content: "Vyplňte!";
      background: red;
      color: #fff;
      padding: .2em;
    }
    .validace :valid+span:before {
      content: "OK, vyplněno";
      background: green;
    }    

    Povinné pole: 
    Odeslat

## Označení

Zaměřit povinné pole je možné speciálním selektorem [`:required`](/css-selektory#requried) (**IE 10**+) nebo obecným [atributovým](/css-selektory#atributovy) `input[required]` (**IE 7+**).

Bývá zvykem povinná pole označovat hvězdičkou, tučným nebo barevně odlišeným popiskem či prostým textem „*povinné*“.

Tomuhle repertoár CSS selektorů příliš nenahrává, protože není možné zaměřit **předcházející element**. Kromě toho u [`&lt;input>`u](/input) není možné použít obsah vložený přes [`content`](/content) do pseudoelementů `:before`/`:after`.

Následující kód tedy nic neudělá:

```
input[required]:after {
  content: "*";
}
```

Existují následující řešení:

    Pomocí [posicování](/position) nebo [obtékání](/float) dosáhnout HTML kódu typu:

  ```
&lt;input id="**pole**">&lt;label for="**pole**">
```

    Tento kód půjde v CSS **pohodlně zaměřit**:

    ```
input[required] + label:after {
  content: " povinné";
}
```

      - [Živá ukázka obtékáním](http://kod.djpw.cz/vreb)

      - [Živá ukázka posicováním](http://kod.djpw.cz/wreb)

    Za `&lt;input>` přidat prázdný element (například `&lt;span>`). Který bude možné zaměřit.

    ```
input[required] + span:after {
  content: " (povinné)";
}
```

    [Živá ukázka](http://kod.djpw.cz/xreb)

    Použít JavaScript, který projde všechna pole a prázdný element tam **přidá**. Zbývající postup je stejný.

    [Živá ukázka](http://kod.djpw.cz/jreb) (využívá [`querySelectorAll`](/queryselector))

## Ošetření na straně serveru

Ošetřit přijatá data na serveru je **bezpodmínečně nutné** i při používání všelijakých pravidel na straně **klienta** (HTML/JavaScript).

Znalejší návštěvník nebude mít problém pomocí [vývojářských nástrojů](/vyvojarske-nastroje) atribut `required` (nebo kterýkoliv jiný) **vyřadit**.

## Zpětná kompatibilita

Jednotlivé části řešení mají odlišnou podporu v **Internet Explorerech**

    Zobrazování obsahu pomocí `content` funguje až v **IE 8**.

    Validace (povinnost vyplnit položku označenou `required`) na straně klienta funguje až v **IE 10**.

Prohlížeče **IE 9** a starší tedy nechají formulář odeslat i bez vyplnění **povinných položek**.

Je k úvaze, jak to při důsledné validaci na serveru bude vadit. Stejně tak případné nezobrazení obsahu z vlastnosti `content` v **IE 7**.

[**Chamurappi**](http://webylon.info) správně podotýká, že v případě důsledné (funkční napříč všemi prohlížeči) validaci na **straně klienta** může být naopak **validace na serveru** lehce ošizená, protože se k ní drtivá většina návštěvníků se **zapnutým JavaScriptem** vůbec nedostane (v extrémním případě stačí zajistit, aby data nenarušila aplikaci).

Pouze validace na serveru, která by v **IE 9** a starších v případě užití `required` nastala, může ale značně znepříjemnit zážitek u formulářů obsahující:

  - **zadávání hesel**,

  - **opisování kódu** z obrázků ([obrázková CAPTCHA](/spam#opsani-kodu)),

  - **upload souborů** (jde udělat i bez [obnovení stránky](/upload-bez-refreshe))

V případě, že po odeslání formuláře na server a vrácení **chybové hlášky** tato pole **nepřežijí**, zažije návštěvník značný diskomfort, protože je bude muset vyplňovat znovu.