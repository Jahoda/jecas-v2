---
title: "Třísloupcový layout"
headline: "Třísloupcový layout"
description: "Různé možnosti vytvoření rozvržení o 3 sloupcích s fixní i proměnnou šířkou."
date: "2013-11-25"
last_modification: "2014-10-30"
status: 1
tags: ["CSS", "Layout"]
---

## Obtékání `float`

První možnost pro řešení s **pevnou šířkou** je nechat všechny tři sloupce [obtékat](/float) ([ukázka](http://kod.djpw.cz/zet-)).

    .fixni-obal {width: 560px; margin: auto; overflow: hidden}
    .fixni-obal .sloupec {float: left}
    
    .fixni-obal .levy {width: 130px; background: #1081DD;}
    .fixni-obal .pravy {width: 130px; background: #DA3F94;}
    .fixni-obal .stred {width: 300px; background: #fff;} /* 560 - 130 - 130 */

      Obsah levého sloupce

      Obsah prostředního sloupce

      Obsah pravého sloupce

**Obal**, který zároveň pomocí `overflow: hidden` [ukončuje obtékání](/float#overflow), je [vodorovně vycentrovaný](/centrovani#margin-auto).

Nevýhoda tohoto řešení může být, že obsah, má-li být v **prostředním sloupci**, není (a nemůže být) v kódu nejvíce nahoře při **zachování stejné struktury HTML**. Je potřeba dva ze tří sloupců [obalit do dalšího `&lt;div>`u](http://kod.djpw.cz/nkt) (je tak možné docílit libovolného uspořádání v kódu, ale vždy se musí předělat HTML – přesunout *obal*).

[Stejně vysoké sloupce](/stejne-vysoke-sloupce) se dají řešit obrázkem.

### Proměnlivá šířka

Přizpůsobování šířky sloupců oknu se docílí použitím **procent** místo pixelů ([ukázka](http://kod.djpw.cz/bft)).

    .obal {width: 100%; overflow: hidden}
    .obal .sloupec {float: left}
    
    .obal .levy {width: 20%; background: #1081DD;}
    .obal .pravy {width: 20%; background: #DA3F94;}
    .obal .stred {width: 60%; background: #fff;} /* 100% - 20% - 20% */

      Obsah levého sloupce

      Obsah prostředního sloupce

      Obsah pravého sloupce

### Možné problémy

Při přidávání `padding`u nebo `border`u je nutné myslet na [vlastnosti `box-model`u](/box-model). Ve výchozím (obsahovém box modelu) se musí **přepočítávat šířka** (snižovat o odsazení a rámeček) nebo používat další vnitřní obal, který bude nastavovat jen rámečky a odsazení, ale už ne **šířku**.

Problém s místem může nastat i při **odsazení** pomocí `margin`u, kdy `width + margin` bude větší než **dostupný prostor**.

## Absolutní posicování

Asi **hlavní výhoda** [absolutní posice](/position#absolute) spočívá v jednoduchém umisťování elementu, co je v kódu na konci, nahoru a obráceně. Naopak **nevýhoda** je v tom, že je nutné znát, který sloupec bude vždy nejdelší.

Kromě toho je možné vytvořit rozvržení, kde některé sloupce budou mít **pevnou šířku v pixelech** a jiné proměnlivou podle dostupného prostoru. To by s `float`em nešlo.

### Řešení

Není rozumné posicovat absolutně **všechny sloupce**. Komplikuje to třeba umístění patičky pod všechen obsah, protože **vyjmutí z toku dokumentu** způsobí, že se stránka nebude *natahovat*.

Proto nejdeleší (typicky sloupec s obsahem) **nebude** obtékaný nebo posicovaný ([samostatná ukázka](http://kod.djpw.cz/dft)).

    .posicovany-obal {width: 100%; position: relative;}
    .posicovany-obal .sloupec {position: absolute; top: 0}
    
    .posicovany-obal .levy {width: 100px; left: 0; background: #1081DD;}
    .posicovany-obal .pravy {width: 100px; right: 0; background: #DA3F94;}
    .posicovany-obal .stred {margin-left: 100px; margin-right: 100px; background: #fff;}
    
    /* stejně vysoké sloupce */
    .stejne-vysoke .sloupec {height: 100%}

      Obsah prostředního sloupce

      Který je delší než **ostatní sloupce**.

      Protože musí natáhnout obsah.

      Na stránkách, kde je málo obsahu si lze pomoci vlastností `min-height`.

      Obsah levého sloupce

      Obsah pravého sloupce

  var sv = document.getElementById("stejne-vysoke");

Finta je v tom, že `&lt;div>` s hlavním obsahem vytvoří na stranách místo, kam se boční sloupce naposicují. Vytvořit potřebný prostor lze několika způsoby:

  - Levým a pravým `margin`em (použito v ukázce).

  - Levým a pravým `padding`em.

  - V případě **dvousloupcového layoutu** se omezením šířky sloupce vytvoří vedle něj místo.

Dosažení **stejně vysokých sloupců** je potom velmi prosté. Stačí **posicovaným sloupcům** nastavit `height: 100%` ([ukázka](http://kod.djpw.cz/eft)) nebo současně `top: 0` a i `bottom: 0` ([ukázka](http://kod.djpw.cz/fft)).

## CSS tabulky

Další možnost řešení jsou *CSS tabulky*. Tím není myšleno používání značek jako `&lt;table>`, `&lt;tr>`, `&lt;td>` a podobně, nýbrž jejich ekvivalenty vytvořené CSS vlastností [`display`](/display) – tj. `display: table`, `display: table-row` a `display: table-cell`.

Nevýhoda je komplikovanější určování, co bude v kódu dřív nebo později.

Na druhou stranu *tabulky* řeší problém **stejně vysokých sloupců**. Rovněž jde i určit některé sloupce **s pevnou šířkou** a ostatní se podle toho dopočítají.

[Živá ukázka](http://kod.djpw.cz/fahb) (prostřední sloupec má nastaveno `width: 1000px`)

Šířka (`width`) v tabulce standardně funguje jako *doporučená*. Pokud nějaký sloupec bude mít širší obsah, roztáhne se na úkor toho s nastavenou šířkou, co se **ještě má jak zmenšit**. Toto chování jde změnit vlastností `table-layout`:

```
.tabulka {
  table-layout: fixed;
}
```

Taková tabulka bude více respektovat zadané rozměry. Někdy to může být na škodu.

[Živá ukázka](http://kod.djpw.cz/gahb)

## Flex

Až se přestanou požívat prohlížeče starší než **IE 10**, půjde tento problém řešit [flexboxy](/flexbox).