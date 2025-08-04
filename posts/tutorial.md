---
title: "Tutoriál na webu"
headline: "Tutoriál na webu"
description: "Jak vyrobit jednoduchý tutoriál pro seznámení se s webovou aplikací."
date: "2014-01-15"
last_modification: "2014-01-26"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Při navrhování/upravování uživatelského rozhraní webové aplikace stojíme před dilematem, jak vytvořit rozhraní, které je zároveň:

  - **intuitivní na pochopení** už při první návštěvě,

  - **přehledné a jednoduché** při rutinním používání

Zatímco v prvním případě jsou užitečné všelijaké popisky a vysvětlivky, ve druhém je to nadbytečný balast, protože uživatel už jen *kliká po paměti*.

Příkladem může být tlačítko *Start* z OS Windows, u kterého šlo bez obav vypustit textový popisek, protože už *každý* věděl, co daná ikona znamená.

Jako řešení se nabízí (kromě vytváření dvou versí) jakýsi **tutoriál**, který projde v několika krocích jednotlivé části aplikace a podrobněji je vysvětlí.

Spustit ukázku tutoriálu nebo [zobrazit na GitHubu](https://github.com/Jahoda/tutorial) ([samostatná živá ukázka](http://kod.djpw.cz/pmbb))

## Použití

Po připojení potřebného JS a CSS, se vybrané elementy „k vysvětlení“ přidají do tutoriálu pomocí [vlastního atributu](/vlastni-html-znacky) `data-tutorial`.

Obsah nápovědy se vkládá jako `innerHTML`, tudíž atribut `data-tutorial` může obsahovat i **HTML kód**.

```
&lt;div class="element" **data-tutorial-step="1" data-tutorial="&lt;b>Tučný&lt;/b> popisek"**>
```

Druhý atribut `data-tutorial-step` určuje pořadí jednotlivých kroků.

Potom stačí zavolat funkci `tutorial`. Buď třeba po **kliknutí** (`[onclick](/udalosti-mysi#onclick)="tutorial()"`) nebo **ihned po načtení stránky**:

```
&lt;script>
  tutorial();
&lt;/script>
```

### Alternativní použití

Někdy není moc vhodné zanášet HTML kód `data` atributy, ale bylo by vhodnější tutoriál nadeklarovat jednotně.

```
createTutorial({
    "Popis prvního kroku" : document.getElementsByTagName("div")[0],
    "Popis druhého kroku" : document.getElementsByTagName("div")[3],
  });
```

Zavoláním tohoto kódu před `tutorial()` první a druhý `&lt;div>` na stránce utvoří jednotlivé kroky celého tutoriálu. Oba postupy není momentálně možné kombinovat.

[Ukázka](http://kod.djpw.cz/qmbb).

## Jak to funguje?

### Průhledné pozadí přes celou stránku

Po vyvolání nápovědy se vytvoří [průhledný element](/opacity) s černým pozadím, který zakryje celou stránku. Opticky ji tedy ztmaví. (Od **IE 9** by šla použít [průhledná barva](/css-sipky)).

Způsobů, jak takový element vytvořit, existuje několik:

    [Absolutní posice](/position#absolute), 100% výška a šířka a relativní posice pro `&lt;body>`. [Ukázka](http://kod.djpw.cz/xhbb).

    V případě, že se jako [obal stránky](/stylovani-body) používá přímo `&lt;body>`, je problém se absolutním posicováním dostat *mimo*. Může pomoci [fixní posice](/position#fixed). [Ukázka](http://kod.djpw.cz/yhbb).

    Změřit [velikost stránky](/zjisteni-rozmeru) JavaScriptem. Je v tom trochu nejednotnosti napříč prohlížeči, ale jako funkční se zdá být následující kód:

    ```
function pageSize() {
  return {
    width: (document.body.scrollWidth > document.documentElement.scrollWidth) ? document.body.scrollWidth : document.documentElement.scrollWidth,
    height: (document.body.scrollHeight > document.documentElement.scrollHeight) ? document.body.scrollHeight : document.documentElement.scrollHeight,
  }
}
```

### Zvýraznění elementu

Zvýraznění konkrétní části stránky je vytvořené [změnou `z-index`u](/position#z-index) (nastaví se vyšší než pro překryvnou vrstvu). K tomu je nutná jiná hodnota `position` než `static`. Proto pokud je `static`, přepne se na relativní. (Může to teoreticky dělat problémy, kdyby element měl ponechané vlastnosti jako `left` a `top`, které by se změnou `position` projevily.)

Další *vlastnost* tohoto způsobu zvýraznění je ta, že se moc neprojeví u elementu, co **nemá nastavené pozadí**. Může být proto vhodné nastavit universální barvu pro zvýrazněný element (má třídu `tutorial-highlight`).

### Zobrazení nápovědy

Popisek k jednotlivým krokům je absolutně posicovaný `&lt;div>`. Jeho umístění je trochu inteligentní:

  - Kontroluje se místo vlevo a vpravo vedle zvýrazněného boxu a podle toho se box s popiskem umístí.

  - Zároveň je lehce nad popisek [odrolováno](/odrolovani) v případě, že by měl být mimo **viewport**.

[Šipky](/css-sipky) jsou [nakresleny v CSS](/css-kresleni).

### „Zavření“ tutoriálu

Ukončit nápovědu je možné třemi způsoby.

  - Kliknout na **zavírací křížek**.

  - Kliknout mimo nápovědu a zvýrazněný element.

  - Projít celou nápovědu — v posledním kroku je místo tlačítka „Další“ volba „Ukončit“.

### Krokování

Krok se ukládá do proměnné `step`. To má tu výhodu, že po zavření tutoriálu je možné opět navázat v téže kroku nebo rovnou spustit až N-tý krok.

```
step = 3;
tutorial();
```

### Změna velikosti okna

Skript při `window.resize` přepočítává umístění popisku a zda je ve viewportu.

## Odkazy jinam

  - [EnjoyHint](http://xbsoftware.com/products/enjoyhint)