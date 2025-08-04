---
title: "Responsivní CSS mřížka"
headline: "Responsivní CSS mřížka"
description: "Jak vytvořit čistě v CSS mřížku, která se bude přizpůsobovat velikosti okna. "
date: "2014-09-22"
last_modification: "2014-09-22"
status: 1
tags: ["CSS", "Hotová řešení", "Responsivní design"]
---

Při vytváření webu, kde má být obsah vypsán v jednotlivých boxech ve více sloupcích, stojíme před dilematem ohledně určení ideální **šířky boxů a počtu sloupců**.

Naštěstí jde využít [Media Queries](/mobilni-web#media-queries) a pro různé šířky *viewportu* (dostupná plocha prohlížeče, kde se zobrazuje samotná stránka) nastavit různý počet sloupců.

Idea je taková, že šířka boxů bude nastavená **procentuálně** a při snížení šířky **okna** pod určitou velikost se šířka **boxu** zvětší, což sníží počet sloupců. Umístění boxů vedle sebe zajistí [obtékání](/float).

Jak ilustruje obrázek, při změně šířky se nejprve bude měnit šířka boxů, až se při šířce nastavené v `@media` změní počet sloupců.

Sloupců bude ve výchozí podobě pět (100 / 20 = 5).

```
.box {
  width: 20%;
  float: left;
}
```

Vyšší šířku při nižší šířce okna zajistíme potom pravidlem `@media`.

```
@media (max-width: 700px) {
  .box {width: 25%}
}
@media (max-width: 600px) {
  .box {width: 33.3333%}
}
@media (max-width: 450px) {
  .box {width: 50%}
}
```

Při šířce do 700 px se tedy zvýší šířka boxu na 25 %, což vytvoří místo 5 sloupců jen čtyří (100 / 25 = 4) a tak dále.

U hodnot šířky, které nejsou celé (např. `33.3333%`) může nastat problém s **přesným zaokrouhlením**. Proto je vhodné šířku spočítat CSS vlastností [`calc`](/calc). Podpora `calc` je od **IE 9** a mimo starou **Operu 12**. Nefunkčnost v **IE 8** a starších ale nemusí vadit, protože v takových Explorerech nefunguje ani `@media` a navíc se takovéto prohlížeče nevyskytují v **mobilních zařízeních**.

```
.box {
  width: 33.3333%; /* prohlížeč nezná calc */
  width: -webkit-calc(100% / 3); 
  width: calc(100% / 3)
}
```

[Samostatná ukázka](http://kod.djpw.cz/svfb)

## Mezery mezi boxy

Výše uvedená ukázka je sice hezká, ale v praxi nejspíš budeme potřebovat mít mezi boxy **mezeru, rámeček** a podobně.

Mezeru je možné zajistit snížením procentuální šířky a použitím ubrané hodnoty do [`margin`u](/margin). Na pixel **přesného řešení** tím ale nedocílíme – [ukázka](http://kod.djpw.cz/tvfb).

Další možnost je použít **rámeček** (`border`). Při přepnutí [box modelu](/box-model) na `border-box` (*okrajový* = `padding` a rámeček se k šířce nepřičítá) lze dosáhnout uspokojivého výsledku – [ukázka](http://kod.djpw.cz/uvfb).

Poslední možnost je potom použít další **vnořený element**, což prakticky umožní si libovolně nastavovat cokoliv – [ukázka](http://kod.djpw.cz/wvfb).

## Stejně tlustý rámeček

Na první pohled složitější je vytvoření *dlaždic*, kde jednotlivé prvky bude oddělovat vždy **stejně silný rámeček**.

S využitím obalového elementu potom dosáhneme relativně rozumného kódu.

[Živá ukázka](http://kod.djpw.cz/qnfb)

## Pevná výška

Všechny výše uvedené ukázky mají nastavenou **pevnou výšku**. To je bohužel nutnost v případě, že chceme používat obtékání.

## Speciální selektory

Pokud již zmíněné postupy a triky nestačí, zachrání nás CSS selektor [`nth-child`](/css-selektory#n-ty-potomek) a obdobné.

  - `.polozka:nth-child(**5**n + 1)` – každá pátá položka

  - `.polozka:nth-child(**5**) ~ .polozka` – každá položka následující po páté

[Ukázka](http://kod.djpw.cz/xvfb) stejně tlustého rámečku u všech boxů s využitím `nth-child` selektoru.