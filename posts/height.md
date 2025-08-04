---
title: "CSS výška height"
headline: "CSS výška <code>height</code>"
description: "Nastavování výšky v CSS a proč ho raději nepoužívat."
date: "2015-12-21"
last_modification: "2015-12-21"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

CSS vlastnost `height` je jedna z [často používaných](/cetnost-css).

Výšku jde nastavit pro elementy, které **nejsou řádkové** (tj. nejsou [`display: inline`](/display#inline)), obvykle se používají běžné délkové jednotky jako `px`, `em` nebo procenta:

```
div {
  height: 50px;
}
```

U řádkových prvků (např. `&lt;span>`) je pro nastavení výšky nutné:

  - Přidat `display: inline-block`.

  - Nebo použít vlastnost `line-height` (výška řádku).

## Proč nepoužívat `height`

Zvlášť začátečníci mají v oblibě výšku hojně nastavovat. Nastavovat něčemu `height` by ale ideálně mělo být poslední možné řešení.

Proč?

Obsah webových stránek většinou plyne shora dolů a není rozumné spoléhat na to, že textový obsah bude mít **stejnou velikost** za všech okolností.

    Rozhodne-li se někdo přidat nebo smazat pár slov nebo vět, výsledná výška odstavce se změní.

    Nastavování výšky se spoléhá na neměnnost obsahu.

    Návštěvník může mít nastavenu **jinou velikost písma**, která opět může způsobit odlišnou výšku odstavce. Stejně tak odlišnou výšku někdy způsobí třeba jiný font.

Výsledkem je nehezké *vytečení obsahu* z prostoru s pevnou výškou.

Takhle třeba vypadají dlaždice s nastavenou výškou na webu České televise.

Situace, kdy toto risiko při nastavování `height` nehrozí, jsou relativně vzácné:

## Kdy nastavit `height`

Většinou se jedná o malé objekty jako jsou [obrázky](/obrazky), ikony, videa, reklamní bannery a podobně. U těch nehrozí zvětšení písma a z toho plynoucí přetečení.

### Výška v pixelech

Pokud už se výška nastavuje, je dobré použít alespoň jednotky `em`, které se dokáží přizpůsobit velikosti písma.

Nastavit `height` v pixelech se ale hodí například pro ikonky v případě, že nejsou v [SVG](/svg), potom je potřeba držet skutečné rozměry dle obrázku, má-li být výsledný obrázek ostrý.

### Maximální výška

Není-li problém, že se přetékající obsah ořízne, může se nastavení výšky hodit pro:

    - [Oříznutí víceřádkového obsahu](/oriznuti-radek)

### Nulová výška

Spolu s `padding`em se nulová výška používá jako trik pro vytvoření elementu s proměnlivými rozměry, ale daným poměrem stran:

```
.box {
  height: 0;
  padding-bottom: 25%;
}
```

Výše uvedený box bude mít čtvrtinovou (25 %) výšku oproti šířce; více v samostatném článku:

    - [Výška závislá na šířce](/vyska-podle-sirky)

### Výška políčka a tlačítka

U tlačítka nebo textového [`&lt;input>`u](/input) se může zdát, že nikdy nebude obsahovat tolik textu, aby se roztáhl na dva řádky.

Většinou s tím problém není a nastavení `height` i usnadňuje stylování napříč prohlížeči:

    - [Stylování formulářových políček a tlačítek](/stylovani-inputu)

    - [Vyšší tlačítko ve Firefoxu](/firefox-vyssi-tlacitko)

### Počítání v JavaScriptu

Spočítá-li se výška obsahu JavaScriptem, není problém výšku následně nastavit. Používá se to často pro plynulé rozbalení obsahu. Je ale dobré přepočítání provést i při změně velikosti okna, které může situaci změnit.

    - [Animované skrytí obsahu](/animace-skryt)

## Chybné použití `height`

### Odsazení

Je-li cílem, aby kolem boxu bylo volné místo, je lepší použít [`margin`](/margin)/`padding`.

### Stejně vysoké sloupce

Použít `height` může svádět v případě snahy o vytvoření stejně vysokých sloupců. Existují lepší řešení:

    - [Sloupce stejně vysoké](/stejne-vysoke-sloupce)

### Problém zarovnání

Bude-li mít nějaký objekt fixní výšku, při změně velikosti písma nebude text svisle vycentrovaný.

Tímto problémem trpí třeba lišta na [Facebooku](/facebook), která se při větším písmu nezobrazuje zrovna ideálně:

## Vliv box-modelu

Na počítání výšky má stejně jako u šířky vliv [`box-model`](/box-model). Při používání výchozího obsahového box-modelu (`box-sizing: content-box`) se nastavené výšce přičte hodnota `padding`u a `border`u.

Většinou je výhodnější box model přepnout na okrajový. Element je potom vysoký přesně podle `height`:

```
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
```

## Další hodnoty `height`

Některé novější prohlížeče podporují zvláštní klíčová slova pro nastavení výšky/šířky:

    - Can I Use: [Intrinsic &amp; Extrinsic Sizing](http://caniuse.com/#feat=intrinsic-width)

Kvůli nedostatečné podpoře tato klíčová slova `border-box`, `content-box`, `max-content`, `min-content`, `available`, `fit-content`  ale zatím nemají moc využití.

    - DevDocs: [`height`](http://devdocs.io/css/height)

## Odkazy jinam

  - Jak psát web: [Height](http://www.jakpsatweb.cz/css/height.html) – chování `height` ve starších prohlížečích