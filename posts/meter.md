---
title: "HTML meter"
headline: "HTML značka <code>&lt;meter></code>"
description: "Značka <code>&lt;meter></code> slouží k indikaci čísla."
date: "2013-11-27"
last_modification: "2013-12-04"
status: 1
tags: ["HTML", "HTML značky"]
---

Element `&lt;meter>` je hodně podobný [značce `&lt;progress>`](/progress) (ale nefunguje ani v **[IE 11](/ie11)**). Jednoduše řečeno **znázorňuje číslo** sloupcovým grafem.

Zatímco `&lt;progress>` je spíš určen k presentování postupu typu *Krok 1 ze 3*, `&lt;meter>` může typicky znázorňovat:

  - stav **zaplnění místa na disku**,

  - **teplotu** (i když u té je trochu obtížné určit minimální a maximální hodnotu),

  - **popularitu** článku/videa/čehokoliv,

  - **relevanci** výsledku (hledání),

  - **kondici** torrentu a další.

## Možné atributy

Kromě standardních atributů jako [`value`](/input#value), [`name`](/input#name) a [`form`](/input#form) (pro začlenění do formuláře) a dalších, existují tyto specifické.

  `min`
  Minimální hodnota (výchozí je `0`).
  
  `max`
  Maximální hodnota.

  `low`
  Jaká hodnota je považována za nízkou.  
  
  `high`
  Jaká hodnota je považována za **vysokou** (pozor na překlep `high**t**`).  

  `optimum`
  Optimální hodnota.    

Hlavní **smysl** značky `&lt;meter>` je asi v tom, že podle nastavení výše uvedených atributů se postará o **styl**, který výsledný element bude mít.

Pomyslnou osu hodnot od `min` do `max` je možné atributy `low` a `high` rozdělit na **3 části** a atributem `optimum` zvolit **optimální část**.

  function prenastavit(el) {
    el.parentNode.getElementsByTagName("meter")[0].value = el.value;
    el.parentNode.getElementsByTagName("b")[0].innerHTML = el.value;
  }

  Místo na disku:  Z 640 GB zaplňeno **100** GB

  Relevance:  **95** %

  Teplota:  **17** °C

  (Možnost měnit hodnotu zajišťuje [`&lt;input type=range>`](http://jecas.cz/input#type-range).)

## Stylování

Hodilo by se, kdyby šlo funkcí [`content`](/content-attr) přečíst nastavenou hodnotu. Zatím to nejde.

Pro stylování obalu i sloupců existuje napříč prohlížeči odlišné [oprefixované](/css-prefixy) vlastnosti.

## Starší prohlížeče

Ve starších prohlížečích je teoreticky možné umístit náhradu uvnitř značky `&lt;meter>` nebo v nich [JavaScriptem vygenerovat](https://gist.github.com/strings28/667320) atrapu. Otázka je, zda použití `&lt;meter>`u oproti [pár `&lt;div>`ům](http://jecas.cz/progress#podpora) natolik **usnadní práci**, aby stálo za to u všech uživatelů Internet Exploreru **spoléhat na JavaScript**.