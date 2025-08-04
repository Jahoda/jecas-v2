---
title: "Kulaté rohy"
headline: "Kulaté okraje v CSS"
description: "Jak vytvořit v CSS zaoblené okraje."
date: "2013-09-30"
last_modification: "2018-10-13"
status: 1
tags: ["CSS", "CSS vlastnosti", "Hotová řešení"]
---

Pro prohlížeče **Internet Explorer 9** a novější je možné použít přímo CSS vlastnost `border-radius`, což je zkrácený zápis vlastností:

  - `border-top-left-radius`,

  - `border-top-right-radius`,

  - `border-bottom-left-radius` a

  - `border-bottom-right-radius`.

Jako hodnotu jde použít libovolnou délkovou jednotku.

Pomocí vlastnosti `border-radius` se dá docílit i úplně kulatého vzhledu elementu (nebo i [kruhového obrázku](/kruhovy-obrazek)), řešením je nastavit `border-radius` o polovinu nižší než jsou rozměry elementu. Nebo universálně:

```
element {border-radius: 50%}
```

    .kulaty {border-radius: 50%; background: #DA3F94; width: 100px; height: 100px; transition: border-radius 1s}
    .kulaty:hover {border-radius: 0}

Lze *zakulatit* i element bez okraje (`border`u).

(Kulaté rohy se hodí i při [kreslení pomocí CSS](/css-kresleni).)

## Nepravidelné rámečky

Zajímavá a ne moc známá věc, je zápis s lomítkem:

```
element {border-radius: 25% / 75%}
```

Tím jde určovat zvlášť horisontální (před lomítkem) a zvlášť vertikální (za lomítkem) radius. Chování bez lomítka je nastavuje shodné.

    .nepravidelny {
      border-radius: 25% / 75%;
    }

Složitějšími kombinacemi lze docílit hodně nestandardních výsledků.

    .divny {
      border-radius: 65% 35% 75% 25% / 50% 80% 15% 50%;
    }

    .kapka {
      border-radius: 100% 0% 70% 30% / 70% 0% 100% 30%;
    }

    .stit {
      border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
    }

Existuje hezký generátor:

    - [Fancy Border Radius Generator](https://9elements.github.io/fancy-border-radius/)

## Vnější rámeček – `outline`

Od **Exploreru 8** je možné používat i vnější rámeček, tzv. `outline`, jak je to u něj s oblými rohy?

Zatím něco jako `outline-radius` rozumnou podporu napříč prohlížeči nemá. Výjimkou je **Firefox** s nestandardní vlastností `-moz-outline-radius`

Pořád ale existují následující možnosti:

### Obalový element

Použít více elementů s `border-radius`.

```
&lt;div class=kulaty-obal&gt;
  &lt;div class=kulaty&gt;
  &lt;/div&gt;
&lt;/div&gt;
```

### Stín jako rámeček

Další možnost je CSS vlastnost `box-shadow`, tedy stín *boxu* (funguje podobně jako `border-radius` od **Internet Exploreru 9**). Stín bude vně elementu s `border-radius`.

```
element {border-radius: 50%; border: 5px solid black; box-shadow: 0px 0px 0px 5px green}
```

Pomocí `box-shadow` můžeme vytvořit i **více *rámečků* najednou**, jak ve [své ukázce](http://kod.djpw.cz/glc) předvedl pan [Bubák](http://teststranek.kvalitne.cz/).

  .kuk {
  width: 300px;
  height: 150px;
  margin: 30px;
  border-radius: 50%;
  border: 10px solid black;
  box-shadow: 0px 0px 0px 10px navy inset,
              0px 0px 0px 20px blue inset,
              0px 0px 0px 30px red inset,
              0px 0px 0px 40px orange inset,
              0px 0px 0px 50px gold inset,
              0px 0px 0px 50px gold inset,
              0px 0px 0px 10px gold,
              0px 0px 0px 20px red;
  transition: 0.5s;
  
}
.kuk:hover {
  box-shadow: none;
}

### Pseudo-elementy obsahu

Pomocí [pseudo-elementů obsahu](/css-selektory#before-after) jde *vytvořit* další elementy ke stylování. Rámeček vytvořený přes `:after` bude uvnitř elementu.

    .kulaty {position: relative}
    .kulaty-after:after {content: ''; display: block; position: absolute; top: 0; bottom: 0; left: 0; right: 0; border-radius: 50%; border: 5px solid #5EAA11}

## Historické prohlížeče

V roce **2018** už to nejspíš nemá smysl řešit, ale při podporování starších prohlížečů (**IE 8** a starší) jsou k úvaze tyto možnosti:

  - **kulaté rohy oželet** (je třeba si rozmyslet, [zda se to vyplatí](/prohlizece-optimalisace#kalkulace)),

  - **použít obrázky**,

  - **rámeček doslova nakreslit**.

K třetímu způsobu existují **hotová řešení**.

  [jQuery Corner Demo](http://jquery.malsup.com/corner/)
  
    Řešení v jQuery, rámečky jsou kresleny pixel po pixelu.

  [`border-radius.htc`](http://dimox.net/cross-browser-border-radius-rounded-corners/)
  
    Jedná se o `*.htc` soubor, který kreslí kulaté rámečky v Explorerech přes `behavior` a [VML](http://en.wikipedia.org/wiki/Vector_Markup_Language).