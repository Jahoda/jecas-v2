---
title: "HTML značka output"
headline: "HTML značka <code>&lt;output></code>"
description: "Značka <code>&lt;output></code> slouží k vypsání výsledku závislého na předchozí uživatelské akci."
date: "2014-10-13"
last_modification: "2014-10-13"
status: 1
tags: ["HTML", "HTML značky", "Formuláře"]
---

Co si pod tím představit?

Vynásobte si 2 čísla:

   ×
   =
  8

V této jednoduché [ukázce](http://kod.djpw.cz/yjgb) se značka `&lt;output>` použije pro zobrazení **výsledku**. Jedná se tedy o jeden ze způsobů, jak vytvořit [„&lt;input>“, do kterého se nedá psát](/zablokovani-inputu).

Obsah `&lt;output>`u se podobně jako u `&lt;input type="disabled">` v případě odeslání formuláře **neodesílá na server**. **Výchozí vzhled** značky je neutrální.

## Podpora

Značka `&lt;output>` funguje plnohodnotně mimo **Internet Explorer** (včetně [IE 11](/ie11)).

  - **Chrome 10+**

  - **Firefox 4+**

  - **Opera 11+**

V nepodporujících prohlížečích se chová jako ostatní [neznámé značky](/vlastni-html-znacky#html5).

S trochou úprav může původní ukázka fungovat i ve **starších prohlížečích** – [ukázka](http://kod.djpw.cz/bkgb).

## Zápis

Typický zápis `&lt;output>`u vypadá následovně (koncová značka [je povinná](/html-znacky#povinne)):

```
&lt;output name="vysledek">
  Obsah
&lt;/output>
```

Kromě **globálních/universálních atributů** je možné nastavit:

  `name`
  
    Název políčka, hodí se pro [zjednodušené přistupování k prvkům formuláře](/js-prvky-formulare).

  `for`
  
    Odkaz na ID políček souvisejících s výpočtem, oddělují se mezerou. Nenapadá mě moc případů využití. V JS se k této hodnotě dá dostat přes `nazevPolicka.**htmlFor**`.

    ```
&lt;input id="**a**">
&lt;input id="*b*">
&lt;output for="**a** *b*">
```

  `form`
  
    Umožní `&lt;output>` přiřadit do formuláře, aniž by se nacházel ve `&lt;form>`u. Jako hodnota se zadává atribut `id` cílového formuláře.

  ```
&lt;form id="**idecko**">
&lt;/form>
&lt;output form="**idecko**">
```

## Používání JavaScriptu

Jelikož se `&lt;output>` hodí pro výpis výsledků uživatelských akcí, je naprosto zásadní možnost s touto značkou **pracovat pomocí JS**.

To povyšuje `&lt;output>` nad neutrální značku `&lt;span>`, pochopitelně jen v **podporovaných prohlížečích**.

Zjednodušeně řečeno se chová jako kombinace značky [`&lt;input>`](/input) a právě `&lt;span>`.

  - Z pohledu vzhledu vypadá neutrálně (jako `&lt;span>`).

  - Z pohledu JS nabízí možnosti jako `&lt;input>`.

Což přináší výhody.

    Přístup k „políčku“ `&lt;output>` pomocí atributu `name` (místo obtěžování se s metodami [`getElementBy*`](/getelement) nebo [`querySelector`](/queryselector)).

    Vlastnosti `value` a `defaultValue` místo [`innerHTML`](/innerhtml).

    ```
&lt;output>
  10
&lt;/output>
```

    [Ukázka](http://kod.djpw.cz/wjgb) přečtení obsahu pomocí `value`.

## Závěr

Plnohodnotně značku `&lt;output>` s ohledem na nepodporu v **IE** není úplně možné – bude se chovat jako obyčejná neznámá značka a v **IE 8** nepůjde bez trochy JS **stylovat**. Pro návštěvníka nepřinese nic navíc.

Proto se doporučuji řídit touto tabulkou:

    Funkčnost
    Postup

    **IE 8+**
    Použít neutrální značku `&lt;span>`.

    **IE 9+**
    Neutrální značka `&lt;span>` nebo `&lt;output>` vyjdou na stejno.

    **mimo IE**
    Použít `&lt;output>`.

## Odkazy jinam

  - HTML5 Doctor: [The output element](http://html5doctor.com/the-output-element/)

  - W3C: [The `output` element](http://www.w3.org/TR/html5/forms.html#the-output-element)