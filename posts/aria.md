---
title: "ARIA atributy"
headline: "ARIA atributy"
description: "HTML atributy <code>aria-*</code> slouží k sémantickému vyznačení informací pro postižené uživatele."
date: "2015-04-11"
last_modification: "2015-05-10"
status: 1
tags: ["HTML", "HTML atributy"]
---

Zkratka ARIA ukrývá spojení *Accessible Rich Internet Applications* – v češtině to znamená něco jako „přístupné pokročilé internetové aplikace“ (doslovný překlad: přístupné *bohaté* internetové aplikace).

Někteří uživatelé webových stránek mohou mít nějaké **postižení**, které jim komplikuje používání webů. Pro snazší prohlížení stránek proto využívají různých **asistivních technologií** (například hlasové čtečky) – ty se snaží ze zdrojového kódu připravit něco, co bude pro **handicapovaného návštěvníka** lépe použitelné.

Ideální je vytvořit web rovnou tak, aby se **automaticky dobře používal postiženým lidem**. Bohužel čím složitější aplikace, tím obtížnější to je. K zlepšení použitelnosti „hodně *bohatých* aplikací“ se hodí právě `aria-*` atributy.

## Všechny ARIA atributy

Celkem je `aria-*` atributů velké množství.

    - [Supported States and Properties](http://www.w3.org/TR/wai-aria/states_and_properties#state_prop_def) – seznam všech 35 `aria-*` atributů

Následující 4 mají nejčastější využití.

## Název `aria-label`

Hodí se pro přidání textového popisu/názvu k obsahu, jehož význam vyplývá z visuálního stylu, ale čistě v textu není.

Prvním případem jsou **obrázková tlačítka a ikony**.

    - [Text v obrázku](/obrazek-text) – přístupné řešení obrázkového textu

Pro ilustraci může posloužit následující tlačítko.

```
.tlacitko {
  background: url(zavrit.png);
  width: 50px;
  width: 50px;
}
```

```
&lt;a href="" class="tlacitko">&lt;/a>
```

Pomocí HTML atributu `aria-label` mu půjde nastavit popisek na *Zavřít*.

```
&lt;a href="" class="tlacitko" **aria-label**="Zavřít">&lt;/a>
```

Podobný postup se hodí i u použití [symbolů jako ikony](/emoji):

```
&lt;button **aria-label**="Zavřít">
  ×
&lt;/button>
```

Pokud by tlačítko pro zavření obsahovalo samotný znak křížku × – na české klávesnici [jde zapsat](/ceska-klavesnice) klávesovou zkratkou Pravý Alt + ) – byl by jeho význam po přečtení **hlasovou čtečkou** nejasný.

Obsah atributu `aria-label` **nahradí** původní textový obsah značky.

## Název z jiného elementu `aria-labelledby`

Jako název (*label*) elementu jde použít i obsah elementu jiného, k tomu slouží atribut `aria-labelledby`, kterému se předá `id` zdroje.

Význam to má hlavně z hlediska **programátorské zásady DRY** (*Don't repeat yourself* – neopakujte se). Pokud už je vhodný popisek na stránce, jde jeho obsah využít místo kopírování téhož do `aria-label`.

Jako příklad užití se nabízí třeba označení povinných položek ve formuláři hvězdičkou.

```
&lt;p>
  Položka označená * &lt;span id="*povinne*">je povinná&lt;/span>
&lt;/p>
&lt;label for="policko>
  Políčko &lt;span **aria-labelledby**="*povinne*">*&lt;/span>
&lt;/label>
&lt;input id="policko" required>
```

## Popis `aria-describedby`

Z jednoho elementu se odkazuje na ID elementu druhého, který ten první popisuje. Využití se dá najít u vysvětlujícího **popisu formulářového políčka**:

```
&lt;label for="policko>
  Název pole
&lt;/label>
&lt;input id="policko" **aria-describedby**="*popisek*">
&lt;i id="*popisek*>Popisek políčka&lt;/i>
```

## Skrytý obsah `aria-hidden`

Je-li nějaký obsah hlavně **ilustračního významu** a nemá smysl, aby ho hlasová čtečka četla nebo není potřeba mu nastavovat jiný obsahu přes `aria-label`, atribut `aria-hidden` slouží k jeho **skrytí**.

Případ užití může být u ikon tvořených symboly, které jsou doplněny popisem.

```
&lt;button>
  &lt;span **aria-hidden**="true">×&lt;/span>
  Zavřít
&lt;/button>
```

## Odkazy jinam

  - Dev.Opera: [UX accessibility with aria-label](https://dev.opera.com/articles/ux-accessibility-aria-label/)

  - W3C: [Accessible Rich Internet Applications](http://www.w3.org/TR/wai-aria/)