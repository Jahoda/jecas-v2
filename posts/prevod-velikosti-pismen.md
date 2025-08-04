---
title: "Převod na VELKÁ a malá písmena"
headline: "Převod písmen na VELKÁ a malá"
description: "Převedení textu na velká nebo malá písmena."
date: "2015-11-07"
last_modification: "2015-11-07"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "PHP"]
---

Text s VELKÝMI i malými písmeny

    VELKÁ PÍSMENA
    malá písmena
    CamelCase
    Invertovat
    sTřÍdAvĚ
    × Původní

## JavaScript

V JavaScriptu existují pro změnu velikosti dvě základní metody:

  - `text.toUpperCase()` – převede proměnnou `text` na velká písmena

  - `text.toLowerCase()` – převede proměnnou `text` na malá písmena

Pro převod částí slov, jako pouze prvního písmena a podobně, je možné použít rozdělení řetězce pomocí `substr` a první znak vybrat pomocí `charAt(0)`:

```
function prvniVelke(text) {
  return text.charAt(0).toUpperCase() + text.substr(1);
}
```

Pro průchod všemi slovy stačí rozdělit řetězec podle mezery (`text.split(" ")`) a jednotlivá slova projít [cyklem](/js-cykly).

## PHP

V PHP existují pro zvětšování a zmenšování následující funkce:

  - `strtoupper($text)` – převede `$text` na velká písmena

  - `strtolower($text)` – převede `$text` na malá písmena

  - `ucfirst($text)` – převede první písmeno `$text`u na velké

  - `ucwords($text)` – převede každé první písmeno slova v `$text`u na velké

Převedení prvního písmena na velké v každém slově se v angličtině používá pro **psaní nadpisů**.

Ještě existují `mb_*` varianty. Pro znaky s **českou diakritikou** jsou ale všechny tyto funkce nepoužitelné:

		`strtoupper($text)`

		žluťoučký kůň => žLUťOUčKý Kůň

		`strtolower($text)`

		ŽLUŤOUČKÝ KŮŇ => ŽluŤouČkÝ kŮŇ

		`ucfirst($text)`

		žluťoučký kůň => žluťoučký kůň

		`ucwords($text)`

		žluťoučký kůň => žluťoučký Kůň

		`mb_strtoupper($text)`

		žluťoučký kůň => žLUťOUčKý Kůň

		`mb_strtolower($text)`

		ŽLUŤOUČKÝ KŮŇ => �lu�ou�k� k��

Rozchodit `mb_*` funkce se může podařit uvedením kódování:

```
mb_internal_encoding("UTF-8");
```

Případně to může rovnou fungovat v novějším PHP.

Kódování `UTF-8` jde případně předat jako druhý parametr:

```
mb_strtoupper("žluťoučký kůň", "UTF-8");
```

### `mb_convert_case`

Dosáhnout správného převodu českých znaků jde i funkcí `mb_convert_case`, které se navíc zadává typ převodu:

  - `MB_CASE_UPPER` – na velká písmena

  - `MB_CASE_LOWER` – na malá písmena

  - `MB_CASE_TITLE` – začátek slova velký

Rovněž se jí předá kódování (typicky `UTF-8`):

```
mb_convert_case("žluťoučký kůň", MB_CASE_UPPER, "UTF-8");
```

		`mb_convert_case($text, MB_CASE_UPPER, "UTF-8")`

		žluťoučký kůň => ŽLUŤOUČKÝ KŮŇ

		`mb_convert_case($text, MB_CASE_LOWER, "UTF-8")`

		ŽLUŤOUČKÝ KŮŇ => žluťoučký kůň

		`mb_convert_case($text, MB_CASE_TITLE, "UTF-8")`

		ŽLUŤOUČKÝ KŮŇ => Žluťoučký Kůň

		žluťoučký kůň => Žluťoučký Kůň

Pro vyzkoušení:

    - [Testovací skript](https://gist.github.com/Jahoda/114b1c65967807681b2d)

## CSS

V CSS jde pro převod velikosti písma použít vlastnost `text-transform`:

  `text-transform: lowercase` – PŘEVEDE TEXT NA MALÁ PÍSMENA

  `text-transform: uppercase` – převede text na velká písmena

Prohlížeče **Chrome** a nová **Opera** fungují jinak než [**Edge**](/microsoft-edge) nebo **Firefox** – při kopírování nectí původní velikost písma v HTML kódu. Jde to vyzkoušet: předchozí ukázky jsou psány opačnou velikostí, než je nastavena v CSS.

Pomocí [`:first-letter`](/first-letter) jde automaticky docílit textu malými písmeny s velkým počátečním.

```
.prvniVelke {
  text-transform: lowercase;
}
.prvniVelke:first-letter {
  text-transform: uppercase;
}
```

## Převod velikosti v Sublime Text

V [Sublime Text](/st) editoru je pro převod na malá/velká písmena přímo [klávesová zkratka](/sublime-text-zkratky#velka-mala):

  - Ctrl + K, U – velká písmena

  - Ctrl + K, L – malá písmena

## KŘIK

V internetových diskusích je občas k vidění, že někdo záměrně píše vše velkými písmeny se zapnutým CapsLockem.

UKŘIČENÝ text není možné dost dobře převést do normální podoby, protože část informací je nenávratně ztracena. Automatisovaně jde alespoň převést vše na malá písmena a ponechat velká jen písmena na začátku věty.

## Velká písmena ve vyhledávání

[Vyhledávač Seznam](/seznam) automaticky převádí některé titulky s velkými písmeny:

  - [Proč Seznam převádí zkratky na malá písmena](/seznam-velka-pismena)

  function naVelka(text) {
    return text.toUpperCase();
  }
  function naMala(text) {
    return text.toLowerCase();
  }  
  
  function prvniVelke(text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  }
  
  function camelCase(text) {    
    var slova = text.split(" ");
    var vysledek = "";
    for (var i = 0; i