---
title: "Text-shadow"
headline: "Text-shadow"
description: "CSS vlastnost <code>text-shadow</code> přidává textu stín."
date: "2014-09-09"
last_modification: "2014-09-09"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Podobně jako je tomu u **celých boxů** (více v článku o podobné vlastnosti [`box-shadow`](/box-shadow)) existuje podobná vlastnost vytvářející **stín** i pro samotný text.

Funguje od **IE 10**. V **IE 9** a starších jde stín vytvořit starou podobou vlastnosti `filter` (parametry jsou *barva*, *směr* ve stupních a *síla*).

```
.ie9-stin {
  filter: Shadow(Color=#252525, Direction=45, Strength=2);
}
```

Stín s použitím *filtru* ale vypadá méně hezky, jak je vidět na obrázku:

(O standardní podobě *nové* vlastnosti [`filter`](/filter) pojednává samostatný článek.)

## Zápis

```
element {
  text-shadow: *vodorovné* *svislé umístění* *rozmazání* *barva*;
}
```

V **Internet Exploreru 10+** funguje i čtvrtý parametr určující **velikost stínu** (podobně jako u `box-shadow`). Bohužel ale jeho použití rozbije zobrazení v ostatních prohlížečích.

## Více stínů

Daný text může mít stínů více. Stačí jednotlivé stíny oddělit čárkou.

```
element {
  text-shadow: 
    10px -10px 15px red,
    10px 10px 15px green
}
```

(Ve **Webkitech** existuje i lehce podobná vlastnost [`text-stroke`](/text-stroke), která textu umí vytvořit obrys, právě tuto vlastnost jde do jisté míry vícenásobnými stíny simulovat – [ukázka](http://kod.djpw.cz/xmfb).)

## Generátor

```
element {
  text-shadow: **10px 10px** *5px* red;
}
```

  function el(id) {
    return document.getElementById(id);
  }
  function upravitStin() {
    var css = el("x").value + "px " + el("y").value + "px " + el("rozmazani").value + "px " + /*el("velikost").value + "px " +*/ el("barva").value;
    el("test").style.textShadow = css;
    el("test-css").innerHTML = css;
  }

  Umístění

        V ukázce výše první dvě hodnoty udávají umístění stínu. První hodnota je **horisontální** (vodorovná). Čím větší hodnota bude nastavená, tím bude stín **víc vpravo**. Přehodit stín **doleva** je možné zadáním záporné hodnoty.

                -100  100

        Druhá hodnota je **vertikální** (svislá). Nastavuje umístění stínu **dolů**. Nebo **nahoru** nad text při zadání záporné hodnoty. 

      -100  100

  Rozmazání
  
    Další hodnota určuje, jak moc bude stín rozmazaný. Při nulové hodnotě tedy stín bude v podstatě **kopie textu**. Pozor, při nulovém umístění i nulovém rozmazání nebude stín vidět, schová se za text. 

    0  100

  Velikost
  
    Dokáže roztáhnout stín všemi směry. Funkční pouze v **IE**. 

    0  100

  -->
  Barva
  
    Poslední hodnota je barva stínu. 

## Využití

Použít stín se může hodit k vytvoření **graficky atraktivnějšího** nadpisu nebo třeba **zlepšení čitelnosti písma**, které není dostatečně kontrastní s pozadím. V případě, že je na pozadí vícebarevné pozadí se světlými i tmavými částmi a nelze zajistit přesné umístění textu, stín písma může čitelnost lehce zvýšit bez nutnosti upravovat původní pozadí.

Vyzkoušejte si menší zlepšení **najetím/odjetím myši** nad obrázkem.

Asi nejlepších výsledků lze docílit při rozmazání okolo 10 px. Pro silnější efekt by se hodila zatím mimo **IE 10** a **IE 11** nepodporovaná **intensita stínu** nebo využít **vícenásobného stínu** ([ukázka](http://kod.djpw.cz/anfb)).

Naopak při dobře kontrastním jednobarevném pozadí stín písmo spíš **rozmaže** a **čitelnost může utrpět**.

## Dědičnost

Stín textu svým způsobem dědí i vnořené elementy. Pokud ho nastavíme třeba pro element `&lt;body>`, všechen text na stránce bude se stínem.

Přidat nebo odebrat stín celé této stránce.

## Vytečení stínu

Nemá-li element `overflow: hidden`, může stín, který má nastaven text v tomto elementu, *vytéci* mimo obsah elementu.

Teoreticky tak jde `text-shadow` v podobě bez rozmazání použít k **duplikování a *posicování* textu**. Na následující ukázce je původní „Text 1“ pomocí stínu *rozkopírován* na tři různá místa.

  Text 1

Tohoto *kopírovacího* *triku* je využito i u [hover efektů s `text-shadow`](/hover-efekty-text-shadow).