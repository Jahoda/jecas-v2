---
title: "HTML tlačítko <button>"
headline: "Značka <code>&lt;button></code>"
description: "Tlačítko <code>&lt;button></code> v HTML, možné problémy v Internet Exploreru a jak je vyřešit."
date: "2013-12-14"
last_modification: "2013-12-14"
status: 1
tags: ["HTML", "HTML značky", "Formuláře"]
---

HTML značka `&lt;button>` slouží k vytvoření tlačítka. Je hodně podobná značce [`&lt;input>`](/input) s atributem `type` nastaveným na `button`, `submit` nebo `reset` — `&lt;button>` má tyto typy **stejné**.

Typický zápis:

```
&lt;button type="submit" name="tlacitko" value="hodnota">
  Text tlačítka
&lt;button>
```

  Tlačítko (nic nedělá)

Element `&lt;button>` jde docela dobře [stylovat](/odkaz-tlacitko).

## Použít `&lt;input>`, nebo `&lt;button>`?

Podstatný rozdíl mezi značkami je, kromě [různých druhů](/html-znacky) (`&lt;input>` je povinně **nepárový**, `&lt;button>` povinně **párový**), že do značky `&lt;button>` je možné umístit další HTML kód.

## Internet Explorer

Ve starších versích **IE** nebo i v novějších v [QUIRK režimu](/doctype#quirk) se kolem značky `&lt;button>` točí řada rozdílů.

### Více odesílacích tlačítek

V **IE 6** a starších se při použití více `&lt;button>` tlačítek neodešle jen to, na které bylo kliknuto, ale úplně všechna `&lt;button>` tlačítka.

	Ano
	Ne

Po odeslání se v **IE 6** v URL objeví `…&amp;vysledek=Ano&amp;vysledek=Ne`, ačkoliv se zmáčklo jen jedno tlačítko.

### Obsah značky místo `value`

Další nepěkná věc je, že starší **IE** odesílá jako hodnotu políčka obsah mezi `&lt;button>` a `&lt;/button>` místo atributu `value`, který má značka nastavený.

	Odeslat

Tlačítko *Odeslat* má `value` nastavenou na `Ano`, přesto se v **IE 7** a starších (v QUIRKu do **IE 9** včetně) odešle obsah značky, tj. `Odeslat` (JavaScriptovou terminologií `innerHTML`).

### Neodeslaní bez kliknutí

Další problém je neodeslání tlačítka v případě, kde se formulář odešle Enterem z jiného políčka. Tím trpí **IE 8** a starší (nezávisle na `&lt;!doctype>`).

## Co s tím?

  Nepoužívat ve **formulářích** `&lt;button>`, ale [`&lt;input>`](/input) s odpovídajícím `type`m.

  Zpracovávat formuláře na straně serveru tak, aby podoba, ve které se `&lt;button>` odešle, **nehrála roli**. Tj. zda byl formulář **odeslán** testovat **jiným políčkem**. (Případně si potřebná data, která by mohl odesílat `&lt;button>` uložit do `&lt;input type=hidden>` — ten funguje spolehlivě.