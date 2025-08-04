---
title: "Lepší podtržení odkazu"
headline: "Lepší podtržení odkazu"
description: "Jak si vytvořit hezčí podtržení textu odkazu, než je výchozí."
date: "2014-11-15"
last_modification: "2018-01-22"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady", "Odkazy"]
---

Odkazy na webových stránkách je většinou **vhodné podtrhávat**. Standardní podtržení vlastností [`text-decoration`](/text-decoration) ale nenabízí příliš možností **upravení vzhledu**.

S podtržením vytvořeným pomocí `text-decoration: underline` není v podstatě možné nic moc dále dělat.

Řešení je tuto *dekoraci* vypnout a **podtržení** si zajistit po svém.

## Vlastní podtržení

Existuje spousta možností, jak vlastní podtržení realisovat, například:

    Rámečkem pod odkazem – `border-bottom`.

    ```
a {
  text-decoration: none;
  border-bottom: 1px solid;
}
```

    Bez uvedení barvy se použije [aktuální barva](/currentcolor). [Ukázka](http://kod.djpw.cz/niib).

  - Stínem [`box-shadow`](/box-shadow) (**IE 9+**). [Ukázka](http://kod.djpw.cz/llib).

    Podtržení vytvořit **obrázkem na pozadí**. Nemusí se jednat o skutečný obrázek – jde použít i [gradient](/gradient).

    Pseudo-elementem `:before`/`:after`, který se [absolutně naposicuje](/position#absolute) podle odkazu. Problém tohoto řešení bude s **delšími odkazy**, které by se rozdělily na dva řádky. Bude nutné zakázat jejich [zalamovaní](/zalamovani-slov).

## Přeškrtnutí písmen

Ne úplně hezky může působit skutečnost, že podtržení přeškrtává písmena, která sahají pod **úroveň řádku**.

Vyřešit tuto situaci jde přidáním [stínu textu](/text-shadow) v barvě pozadí, který podtržení **překryje**.

```
a {
  text-shadow: 2px 0 #fff, -2px 0 #fff;
}
```

Toto řešení půjde použít pouze v případě, že je **pozadí jednolité**.

[Živá ukázka](http://kod.djpw.cz/siib)

## `text-decoration-skip`

Do budoucna počítá **CSS specifikace** s možnostmi ovlivnit výchozí podtržení pomocí *nové* vlastnosti `text-decoration`.

  - [`text-decoration-color`](/text-decoration#color) – přímé nastavení barvy podtržení

  - [`text-decoration-skip`](/text-decoration#skip) – umožní nepřeškrtnout pod řádek sahající písmena

  - [`text-underline-position`](/text-decoration#position) – umožní přesun podtržení až pod písmena sahající pod úroveň řádku

Podpora v prohlížečích se pomalu rozšiřuje.

## Nepřeškrtnutí s `text-decoration-skip: ink`

Zvlášť hezká je možnost zbavit se ošklivého přeškrtávání písmen při podtržení.

Prohlížeče **Chrome 57** a **Opera 44** (a novější verse) už si vystačí s prostým:

```
a {
  text-decoration-skip: ink;    
}
```

Není tak potřeba používat různé hacky, pro zamaskování podtržení okolo písmen. [Ukázka](http://kod.djpw.cz/ixlc).

## Odkazy jinam

  - CSS-Tricks: [Styling Underlines on the Web](https://css-tricks.com/styling-underlines-web/)

  - Sitepoint: [The Secret to Underlined Links That Don’t Sting Your Eyes?](http://www.sitepoint.com/secret-underlined-links-dont-sting-eyes/)

  - Adam Schwartz: [Smarter Link Underlines For Every Website](https://eager.io/blog/smarter-link-underlines/)

  - [Crafting link underlines on Medium](https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9#8e94-7f28cf83d214)