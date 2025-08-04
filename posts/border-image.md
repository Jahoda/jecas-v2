---
title: "Border-image"
headline: "Border-image"
description: "CSS vlastnost <code>border-image</code> slouží k vytváření obrázkových rámečků."
date: "2014-11-24"
last_modification: "2014-11-25"
status: 1
tags: ["CSS", "CSS vlastnosti", "Obrázky"]
---

Dříve, když bylo cílem mít **obrázkové ohraničení textu**, bylo nutné celý obal rozřezat na jednotlivé části a nastavit ho jako [vícenásobné pozadí](/vice-obrazku) nebo použít více obalových elementů.

Vlastnost `border-image` toto zjednodušuje.

## Podpora

Obrázkový rámeček funguje od **IE 11**, **Firefoxu 3.5**, **Chrome 7** a **Opery 11**. Stará **Opera 12**, **Firefox 14** a **Chrome 15** vyžadují [prefixy](/css-prefixy). (Stará **Opera 12** zná pouze sdruženou prefixovanou vlastnost `-o-border-image`).

## Zápis

```
element {
  border: 10px solid black; /* standardní rámeček */
  border-image: url(ramecek.png) 20 **round**
}
```

Vlastnost `border-image` je zkratka pro více dalších `border-image-*` vlastností.

Podmínka pro funkčnost obrázkového okraje je minimálně 1px klasický rámeček, který zároveň slouží jako *fallback* pro nepodporované prohlížeče. Může mít libovolnou barvu či styl, obrázkový rámeček jeho visuální podobu následně **zruší** – tj. nebude někde prosvítat a podobně, prostor na stránce ale zabírat bude.

### `border-image-source`

Připojuje obrázek, který utvoří rámeček.

```
border-image-source: url(ramecek.png)
```

Používá se k tomu standardní funkce `url()`, ale může to být klidně i [gradient](/gradient).

### `border-image-slice`

Stěžejní vlastnost **obrázkových rámečků**, která určuje, jakým způsobem se obrázek nařeže.

Celé to funguje tak, že se obrázek pro vytvoření rámečků rozdělí na **9 částí** (4 rohy + 4 strany + prostředek) vytvořením pomyslných čtyř čar:

```
border-image-slice: top right bottom left
```

Hodnoty tedy mohou být čtyři – pro každou čáru jedna. Kromě toho je možné zadat hodnot méně, což způsobí **standardní dopočítání** (jako třeba u `margin`u nebo `padding`u). V případě pravidelného obrázku proto stačí uvést jen jednu vzdálenost, která bude vyhovovat všem čarám řezu.

Vzdálenost *čáry* od okraje se udává v:

  - pixelech – **bez uvedení jednotky**, tj. například `30`

  - procentech – pochopitelně s `%`, tj. například `30%`

Procenta se hodí hlaně pro **vektorové obrázky**, které ze své podstaty šířku nemají.

Zjistit hodnotu jednotlivých řezů je nejsnazší odečtením souřadnic v **grafickém editoru**.

#### `fill`

Klíčovým slovem `fill` je možné zajistit, aby byl zachován střed obrázku. Výchozí chování střed neaplikuje.

### `border-image-width`

Vlastnost `border-image-width` určuje šířku rámečku, která se má z řezů sestavit. Výchozí hodnota je rovna příslušné vzdálenosti řezu. Tedy pokud obrázek pro rámeček rozřízneme 10 pixelů od všech stran (`border-image-slice: **10**`), je to totéž jako připsat:

```
border-image-width: **10px**
```

Nebo:

```
border-image-width: **auto**
```

Pozor, zde se už jednotky u pixelů uvádí. Počet hodnot může být opět 1–4 s klasickým dopočítáváním.

Využití úprav tloušťky obrázkového rámečku se hodí spíš u **vektorových obrázků**, kde je možné měnit rozměry obrázku bez ztráty kvality. V PNG/GIF/JPG je lepší nechat **výchozí skutečné rozměry**, případně je měnit jen minimálně.

Standardní tloušťka rámečku s hodnotou `border-image-width` až tak úplně nesouvisí. Hodnoty se mohou rozcházet, což způsobí v případě tenčího `border-width` než `border-**image**-width`, že rámeček bude pod obsahem.

### `border-image-outset`

Pro posunutí obrázkového rámečku směrem od obsahu ven slouží vlastnost `border-image-outset`. Fungují pouze kladné hodnoty. Čím vyšší hodnota, tím je obrázkový rámeček dál od rámečku skutečného.

```
border-image-outset: 10px
```

Kombinace různých rozměrů `border-**image**-width` a `border-width` v kombinaci s `border-image-outset` se hodí k **sladění obrázkového rámečku** s klasickým rámečkem pro starší prohlížeče.

Například u výše uvedeného ozdobného obrázku asi nemá smysl, používat tlustý `border-width`, ale cílem by mělo být sjednotit umístění čar a „kudrlinky“ nechat mimo.

### `border-image-repeat`

Poslední věc je nastavení **opakování**. Jde zadat zvlášť pro **vodorovný** i **svislý** směr či pro **oba směry** zároveň jedinou hodnotou.

```
border-image-repeat: vodorovně svisle;
```

`stretch`

  Obrázek se roztáhne, aby vyplnil šířku. U nevektorových obrázků použitelné jen při **minimální změně velikosti** oproti originálu. Jinak bude výsledek dost ošklivý.

`repeat`

  Obrázek se bude opakovat. Je proto potřeba, aby na sebe jednotlivé kraje **navazovaly**.

`round`

  Asi nejzajímavější vlastnost, která **zachová rohy** a opakuje jen obsah mezi nimi. Zde je potřeba, aby navazovaly středy. Pokud do prostoru nevyjde přesný počet opakování, přizpůsobí se velikost, aby to vycházelo.

  Z důvodu **přizpůsobování velikosti** je vhodné mít základní obrázek spíš **menší**. Může se stát, že na jedno opakování bude obrázek moc malý, ale dvě opakování budou až moc, takže se rámeček ve výsledku **nepěkně srazí**. Algoritmus pro výpočet se navíc trochu **liší** napříč prohlížeči – **Firefox** na rozdíl od **IE** a **Chrome** obrázek nezvětší nad skutečné rozměry, ale raději přidá další opakování.

  Kromě toho menší obrázek bude **datově úspornější**.

`space`

  Ještě existuje hodnota `space`, která by měla v případě toho, že rozměr nevyjde do počtu opakování, rozdělit jednotlivá opakování mezerami.

  Nezdá se mi ale, že by někde fungovala.

[Živá ukázka](http://kod.djpw.cz/waib) (díky [`resize`](/resize) jde i měnit velikost)

## Generátor

Pro rychlejší pochopení a vyrobení `border-image` může posloužit **online generátor**:

    - MDN: [Border-image generator](https://developer.mozilla.org/en-US/docs/Web/CSS/Tools/Border-image_generator)

## Závěr

Podpora v prohlížečích je s ohledem na **Internet Explorer** ([IE 11](/ie11) a novější) nedostatečná. Navíc se v roce 2014 používá místo **dekorativní grafiky** spíše flat design, případně se *kreslí v CSS* – [stíny](/box-shadow), [kulaté rohy](/border-radius) a podobně, takže se člověk se situací, kdy by využil obrázkový rámeček zase tak často nesetká.

## Odkazy jinam

  - W3C: [Border Images](http://dev.w3.org/csswg/css-backgrounds/#border-images)

  - DevDocs: [`border-image`](http://devdocs.io/css/border-image)