---
title: "Inline-block a bílé znaky"
headline: "Inline-block a bílé znaky"
description: "Při zadávání šířky elementům s <code>display: inline-block</code> je nutné myslet na <i>bílé znaky</i> (whitespace)."
date: "2014-04-24"
last_modification: "2014-04-27"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Mějme jednoduchý cíl: umístit do řádku 3 odkazy, každý 100 px široký s 5px mezerou mezi nimi. Výsledná celková šířka by proto měla být 310 px (šířka: 3 * 100 px + odsazení: 2 * 5 px).

  .obal a {background: #1081DD!important; color: #fff!important}

.obal {
    width: 310px;
    background: #DA3F94;
}
.obal a {
    text-align: center;
    background: #1081DD;
    display: inline-block;
    width: 100px;
    margin-right: 5px;
}
.obal a.posledni {
    margin-right: 0;
}

    [Odkaz](#)
    [Odkaz](#)
    [Odkaz](#)

Proč se to tedy do obalu o šířce 310 pixelů ↑ nevejde a třetí odkaz **odskočí na další řádek**?

Na vině jsou **mezery/odřádkování mezi jednotlivými odkazy** ([samostatná ukázka](http://kod.djpw.cz/gvcb)).

```
&lt;a href="#">Odkaz&lt;/a>** **&lt;a href="#">Odkaz&lt;/a>
```

## Řešení

První možnost je v HTML kódu mezery odstranit ([ukázka](http://kod.djpw.cz/hvcb)):

```
&lt;a href="#">Odkaz&lt;/a>&lt;a href="#">Odkaz&lt;/a>
```

Případně pro lepší přehlednost posunout **koncovou značku** ([ukázka](http://kod.djpw.cz/kigb)).

```
&lt;a href="#">Odkaz&lt;/a
>&lt;a href="#">Odkaz&lt;/a>
```

Nebo zakomentovat ([ukázka](http://kod.djpw.cz/ivcb)). Moc elegantní se mi to ale nezdá.

```
&lt;a href="#">Odkaz&lt;/a>&lt;!--
 -->&lt;a href="#">Odkaz&lt;/a>
```

Ještě je možné se mezer zbavit **nulovou velikostí písma** (`font-size: 0`) pro rodiče a následným *obnovením* velikosti pro položky s `inline-block` ([ukázka](http://kod.djpw.cz/ligb)). Není to ale úplně spolehlivé a nenávratně se tím rozhodí **relativní velikosti písma**.

Jinak se nabízí na `inline-block` resignovat a použít:

  - Tabulkové zobrazení `display: table-cell` ([ukázka](http://kod.djpw.cz/jvcb)). Funkční od **IE 8**.

  - Odkazy [`float`ovat](/float) ([ukázka](http://kod.djpw.cz/lwcb)). Funkční všude.