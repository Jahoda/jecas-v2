---
title: "Proč a jak používat :focus stav"
headline: "Jak používat CSS stav <code>:focus</code>"
description: "Proč je důležité stylovat stav <code>:focus</code>. Jak toho automaticky docílit a jaké jsou s tím problémy."
date: "2017-09-21"
last_modification: "2018-05-16"
status: 1
tags: ["CSS", "CSS selektory", "Formuláře", "Rady a nápady"]
---

[Odkazy](/odkaz), [`&lt;input>`y](/input), [tlačítka](/button) a všechny ostatní libovolné elementy s nezáporným [atributem `tabindex`](/tabindex) mohou mít `:focus` stav.

V praxi to znamená, že po kliknutí nebo odTabování je daný element zaměřitelný přes selektor `:focus`.

```
a:focus {
  /* styl vybraného odkazu */
}
```

Pro uživatele **používající klávesnici** je to dost užitečné, protože hezky vidí, kde se nacházejí. Dobrá ovladatelnost jen z klávesnice bývá u **dobře přístupných webů** samozřejmostí.

## Výchozí `:focus`

Prakticky všechny novější prohlížeče se snaží *focusovaný* element nějak zvýraznit, aby to uživatel poznal.

**Chrome** a **Opera** tak činí 5px modrým rámečkem. **Edge** a **Firefox** potom 1px černým tečkovaným. Orámování je řešené vlastností `outline`. Ta dělá něco jako `border`, jen:

    Neovlivňuje obsah elementu, ale *rámeček* se dostane mimo.

    Neovlivňuje obsah elementu.

    Může dosáhnout i nepravidelných tvarů (v **Opeře** a **Chrome**).

    *Vyleze* i přes nastavené oříznutí přes `overflow: hidden`.

Pokud tedy autor CSS do výchozího `:focus`u nezasahuje, má od tvůrců prohlížečů tuto schopnost úplně „zadarmo“.

    - [Default Browser Focus Outline Styles](https://allyjs.io/tests/focus-outline-styles/index.html#style=focus&key=text,radio,checkbox,textarea,button,link,div&browser=firefox,chrome,safari,ie11) – přehled `:focus` stylů napříč prohlížeči

## Vlastní styl pro `:focus`

Bohužel ne vždy si jde s výchozím stylem vystačit. Trpí několika problémy:

    Nemusí visuálně ladit k designu webu. Nebo nemusí být dostatečně kontrastní k pozadí na daném místě stránky.

    Vzhled se liší napříč prohlížeči.

    V některý případech se nehodí k tvaru tlačítek / ovládacích prvků. Typicky třeba u tlačítek s kulatými okraji.

      Tlačítko

### Vypnutí výchozího rámečku tlačítka

  Prosím vypnout ten ošklivý rámeček kolem tlačítek, který tam zůstává po kliknutí.

Bývají častá slova autora visuálního návrhu při pohledu na jeho podobu převedenou do prohlížeče.

Návrhy vzhledu webů od grafiků se stavy pro `:focus` bývají spíš výjimkou než pravidlem (autor článku se s nakresleným `:focus` stavem ještě nesetkal), takže se na to snadno zapomene.

**Vypnout?**

```
:focus {
  outline: none;
}
```

Tento kód bohužel *vylévá vaničku i s dítětem*. Místo ošklivého rámečku nebude označení `:focus`u žádné a uživatel se při použití Tabu **ztratí na stránce**.

### Skoro automatický `:focus`

Pokud se člověku nechce vymýšlet další styl prvků, je relativně dobré řešení převzít styl `:hoveru` (ten občas grafici namalují) a použít ho i pro `:focus`.

```
a:hover,
**a:focus** {
  /* styly pro :hover i :focus */
}
```

Stavy se sice od sebe nebudou lišit (to je trochu škoda), ale je to skoro bez práce.

    - [Postcss-hocus](https://github.com/Kilian/postcss-hocus) – filtr pro PostCSS, který umožní oba stavy napsat na jeden řádek

V dávných dobách se do tohoto předpisu přidávala i třída `:active`, protože starší **IE** ji používal pro odkazy zaměřené Tabem. V roce 2017 a později už je to ale zbytečné až nežádoucí:

Stav `:active` (po stisknutí tlačítka myši) by měl být rovněž visuálně navržen a měl by mít jiný vzhled než `:hover`.

## Jaký styl pro `:focus`?

Nabízí se třeba změnit barvu nebo přidat rámeček okolo – pomocí `outline`.

Je-li potřeba rámeček s kulatými rohy, jde k tomu hezky použít 1px stín vytvořený vlastností [`box-shadow`](/box-shadow).

## Zůstávání `:focus`u po kliknutí

Bohužel i při pečlivém návrhu se při střetu s realitou zjistí smutná věc.

Vlastní `:focus` styl se **chová jinak**. Dá se říct, že jeho současná **implementace ve většině prohlížečů je rozbitá**.

Některé prvky po vybrání myší sice získají `:focus`, ale výchozí `outline` prohlížeče **se vůbec nezobrazí** – zobrazí se jen při zaměření prvků klávesnicí.

Odlišné chování při zaměření myší a klávesnicí se týká:

  - odkazů,

  - tlačítek (`&lt;button>` i `&lt;input type=submit>`),

  - zaškrtávacích polí typu `checkbox` a `radio`,

  - volby rozsahu (`&lt;input type=range>`),

  - možná ještě něčeho?

Tyto elementy po kliknutí myší `:focus`ovaný stav nemají.

Naopak následující `:focus`ovatelné prvky mají `outline` i po kliknutí:

  - skoro všechny textové, číslené, telefonní a podobné `&lt;input>`y,

  - [`&lt;textarea>`](/textarea),

  - [`&lt;select>`](/select),

  - obecný element s `tabindex`em (kromě `-1`)

Styl `:focus`ovaného elementu po kliknutí může vypadat rušivě. Navíc se v tomto chování liší od výchozího chování v prohlížečích.

Jediné, co jde bezpečně měnit, aby styl pro `:focus` po kliknutí nezůstal, je `outline-color`. Změny jiných vlastností se projeví i po kliknutí.

### (Ne)řešení

Nějaké universální jednoduché řešení moc neexistuje. Nejsnazší je obvyklé nic nedělání: **měnit u výchozího rámečku jen barvu nebo vůbec nic**.

Jinak je potřeba využít JavaScript:

#### Vyvolání události `blur`

Po kliknutí na prvek u něj okamžitě zavolat `blur()` a tím zrušit `:focus`.

```
$('a, button, input[type=checkbox], input[type=radio]').click(
  function () {
    $(this).blur();
  }
);
```

Vypadá to relativně funkčně — dokonce si prohlížeče mimo **MS Edge** i pamatují, kde skončilo Tabování, a jsou schopny navázat.

Bohužel to trochu mění chování, protože prvky po kliknutí už **skutečně ztratí focus** – takže třeba zaškrtávátko `checkbox` už nepůjde znovu odškrtnout/zaškrtnout Mezerníkem. Stejně tak tlačítko `&lt;button>` nepůjde z klávesnice vícekrát zmáčknou, to bude zvlášť problém u [+/&minus; tlačítek](/inkrementace-inputu).

A trochu bych se bál, že to bude přinášet obtížně zjistitelné problémy do budoucna.

#### Přepínání tříd

Nabízí se myšlenka třeba při kliknutí myší na políčko ([`onmousedown`](/udalosti-mysi#onmousedown)) přidat elementu třídu typu `is-mouse-focus` a při `onblur`u ji zase odebírat.

V selektoru pro `:focus` potom použít ještě [`:not`](/css-selektory#not), aby se styly v tomto případě neaplikovaly.

Bohužel současná pravidla v prohlížečích jsou tak komplexní, že to úplně jednoduše zapsat nejde. Například zůstávání `:focus`u se liší u jednotlivých typů `&lt;input>`ů – tlačítka, checkboxy, radia nebo rozsahy `:focus` mít nemají, ale všechno ostatní ano.

Dále je možné prvek `:focus`ovat i kliknutím jinam, tj. přes značku [`&lt;label>`](/label-for).

Touto problematikou se zabývají následující stránky:

    - [Button Focus Hell](https://marcysutton.com/button-focus-hell/) – řešení při vývoji Angular Material (nedostatečné)

    - Chromium bugs: [Outline should not appear on elements focused by mouse](https://bugs.chromium.org/p/chromium/issues/detail?id=271023)

## Pseudotřída `:focus-visible`

Specifikace (draft) CSS 4 selektorů počítá s doplněním `:focus`u o `:focus-visible`.

    - Selectors Level 4: [The Input Focus-Ring Pseudo-class: :focus-visible](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo)

Až bude fungovat, bude se pravděpodobně používat místo současného `:focus`u.

Tato pseudotřída dokáže v závislosti na použitém rozhraní (myš/klávesnice/dotyk) určit, jestli je žádoucí, aby se zobrazilo zvýraznění. Půjde tak docílit vlastního vzhledu, který se ale bude chovat jako současný nativní `outline`.

```
element:focus-visible {
  /* libovolné styly pro :focus */
}
```

### Polyfill pro `:focus-visible`

Existuje hotový maličký JS polyfill, který daným prvkům nastavuje CSS třídu `focus-visible` ve stejných případech, jako prohlížeče výchozí `outline`:

    - [Polyfill for `:focus-visible`](https://github.com/WICG/focus-visible) – stránka polyfillu s [ukázkou](https://wicg.github.io/focus-visible/demo/)

### Ve Firefoxu `:moz-focusring`

Ve **Firefoxu** už funguje tato vlastnost s [prefixem](/css-prefixy) a psaná bez spojovníku. Ještě ve starší podobně názvu, který měl znít `:focus-**ring**`

    - [Živá ukážka](http://kod.djpw.cz/yvjc) – test experimentálního selektoru pro **Firefox**

    - MDN: [`:-moz-focusring`](https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-focusring)

### Knihovna *What Input*

Hotové JS řešení [What Input?](https://github.com/ten1seven/what-input) dokáže stránce přiřazovat atributy podle toho, zda se vstup provedl myší nebo z klávesnice. V případě, že proběhl myší, jde tak výchozí `:focus` v některých případech potlačit.

## Focus uvnitř `:focus-within`

Docela novinka, ale podporovaná už v současných versích většiny prohlížečů (kromě **Edge** a **Android Browser**).

Na nějakém rodičovském prvku (třeba značce `&lt;form>`) jde zjistit, jestli nemá `:focus` něco uvnitř.

```
form:focus-within {
  box-shadow: 0 0 5px 0 red;
}
```

Takový formulář během vyplňování políček získá červený stín.

    .focus-within {
      padding: .1em 1em;
    }
    .focus-within:focus-within {
      box-shadow: 0 0 5px 0 red;
    }

    Odeslat

## Odkazy jinam

  - Martin Pešout: [Jak jsem vyzrál na nechtěný outline](http://www.martinpesout.cz/jak-jsem-vyzral-na-nechteny-outline/)

  Martin Michálek: 	
Přístupnost v kódu: ukázky a návrhové vzory – přednáška z WebExpa s praktickými tipy, jak nezničit ovladatelnost z klávesnice