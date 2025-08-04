---
title: "Identifikátor v HTML/CSS/JS"
headline: "HTML/CSS/JS identifikátor <code>id</code>"
description: "K čemu se hodí identifikátor, kdy ho používat a jaké znaky může obsahovat."
date: "2017-05-27"
last_modification: "2017-05-31"
status: 1
tags: ["HTML", "JavaScript", "CSS", "CSS selektory", "HTML atributy"]
---

HTML atribut `id` má poměrně široké využití:

    Odkazování na části stránky pomocí #kotev:

    ```
&lt;a href="#**identifikator**">
  Odkaz
&lt;/a>
…
&lt;div id="**identifikator**">&lt;/div>
```

    Propojení dvojice značek přes [`&lt;label for>`](/label-for):

    ```
&lt;input id="**identifikátor**">
&lt;label for="**identifikátor**">
  Popisek tlačítka
&lt;/label>
```

    Znázornění vztahu při použití [`aria-*` atributů](/aria):

    ```
&lt;label for="policko&gt;
  Název pole
&lt;/label&gt;
&lt;input id="policko" **aria-describedby**="*popisek*"&gt;
&lt;i id="*popisek*&gt;Popisek políčka&lt;/i&gt;
```

    Zaměření elementu [CSS selektorem](/css-selektory#id-class):

    ```
#**identifikator** {
    color: red;
}
```

    Získání elementu v JavaScriptu metodou [`getElementById`](/getelement#id):

    ```
var el = document.getElementById('identifikator');
```

    V JS má `id` ještě jednu zajímavou vlastnost. Každý HTML element s identifikátorem je dostupný přímo přes proměnnou stejného názvu.

    ```
&lt;div id="identifikator">&lt;/div>
&lt;script>
  identifikator.innerHTML = 'Text';
&lt;/script>
```

    Do uvedeného `&lt;div>`u se tak nastaví obsah „Text“ – [ukázka](http://kod.djpw.cz/ajhc).

    Obecně na to není moc dobré spoléhat, protože je velmi snadné si tuto proměnnou přepsat jiným obsahem.

## Použití identifikátorů v praxi

Ačkoliv je s „`id`éčky“ možné dělat spoustu věcí, v praxi si jde vystačit s použitím pouze pro kotvy a provázání `&lt;label>`ů s [formulářovými](/formulare) prvky + provázání s atributy pro lepší přístupnost `aria-*`.

V **CSS** si jde vystačit jen s třídami. ID oproti nim nenabízejí nic navíc – kromě toho je selektor `#id` silnější než `.trida` – to bývá většinou nevýhodné, jelikož bývá přehlednější mít sílu selektorů co možná nejnižší.

Pro zaměření elementů v **JavaScriptu** je zase užitečné mít v HTML kódu jasně poznamenané, co se v JS používá, tj. využít třeba prostých tříd s prefixem `js-*`.

```
&lt;div class="**js-identifikator**">
&lt;/div>
```

Při dodržení tohoto postupu se jde potom spolehnout na to, že pro CSS se používají jen třídy, pro JavaScript třídy s prefixem a identifikátory tak slouží pouze pro #odkazování a provázání elementů.

## Povolené znaky

V HTML 5 se poměrně uvolnilo omezení znaků, které je možné v `id` atributu použít.

Existuji pouze dvě pravidla – v ID **nemůže být mezera** a musí mít **alespoň jeden znak**.

Není tedy problém používat libovolnou diakritiku a speciální znaky. Jediný problém může nastat v CSS, kde platí odlišná pravidla. Číslo na začátku ID se tak musí escapovat nebo použít atributový selektor.

```
&lt;div id="1337">&lt;/div>
```

Výše uvedený element tak (ne)jde zaměřit:

```
#1337 { /* nefunguje */ }
[id=1337] { /* atribut funguje */ }
#\31 337 { /* escapování funguje */ }
```

Při používání ID ke stylování je tak lepší zachovat přísnější pravidla.

### Escapování v CSS

Je-li nevyhnutelné části selektoru v CSS escapovat, jde k tomu použít nějaký hotový nástroj:

    - [CSS escapes](https://mothereff.in/css-escapes) – hotové řešení escapování v CSS

### Duplicitní ID

Ještě by každé `id` mělo být na stránce pouze jednou – jinak je stránka [nevalidní](/validita). V praxi je to spíš problém kvůli tomu, že první ID *vyhrává* a ta další jsou ignorována (vyjma CSS, kde není problém zaměřit více elementů se stejným identifikátorem).

### Omezení v HTML 4

Ve starších specifikacích HTML byly požadavky na znaky v identifikátorech mnohem přísnější. Podobně jako v [názvech CSS tříd](/zvlastni-znaky-class) neměl identifikátor začínat číslicí.

Obsahovat mohl pouze písmena bez diakritiky, číslice, tečku, dvojtečku, spojovník a podtržítko.

    - W3C: [SGML basic types: `id`](https://www.w3.org/TR/html4/types.html#type-id) – povolené znaky v `id`

V **prohlížečích** dlouhodobě funguje všechno, takže se toto omezení ukázalo jako zbytečně přísné.