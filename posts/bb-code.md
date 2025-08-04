---
title: "BB code"
headline: "BB kód v PHP"
description: "Formátování příspěvků pomocí BB code v PHP. Převod BB kódu do HTML."
date: "2014-03-11"
last_modification: "2014-03-20"
status: 1
tags: ["Hotová řešení", "PHP"]
---

V případě, že chceme umožnit návštěvníkům stránky používat základní **formátování textu**, existuje několik základních způsobů, jak to zařídit.

  - [WYSIWYG editor](/wysiwyg),

  - HTML značky,

  - [Markdown/Texy!](/markdown),

  - **BB code**

Každá z možností má své pro a proti.

## Co to je BB code?

Stručně řečeno má BB kód zjednodušenou podobu HTML kódu, kdy se místo špičatých `&lt;>` závorek zapisují hranaté `[]` (tyto znaky lze relativně pohodlně zapsat i na [české klávesnici](/ceska-klavesnice)).

Zkratka **BB** znamená *Bulletin Board*, protože se tento způsob formátování nejvíce rozšířil na **diskusních fórech**.

### Základní znaky

Typické BB značky:

    BB kód
    HTML ekvivalent
    Výsledek

    `[b]text[/b]`
    `&lt;b>text&lt;/b>`
    **text**

    `[i]text[/i]`
    `&lt;i>text&lt;/i>`
    *text*

    `[code]code[/code]`
    `&lt;code>text&lt;/code>`
    `text`

    `[url=http://example.com]text[/url]`
    `&lt;a href='http://example.com'>text&lt;/a>`
    text

    `[img]http://example.com/obrazek.png[/img]`
    `&lt;img src='http://example.com/obrazek.png'>text&lt;/a>`
    (obrázek)

Asi hlavní výhoda oproti obyčejnému HTML spočívá v tom, že:

  - Není problém zapsat ukázku HTML kódu. HTML se neinterpretuje a zároveň nezahodí, ale převede na entity.

  - V PHP není jednoduchý způsob, jak povolit jen určité HTML značky a atributy. Značky zvládne sice odstranit funkce `strip_tags`, ale na povolení atributů je potřeba nějaký nástroj jako [HTML Purifier](/vycisteni-kodu).

## Převod BB značek na HTML

### Jednoduché značky `[b]`, `[i]`, `[code]`

Nejjednodušší způsob jako převádět `[b]text[/b]` na `>&lt;b>text&lt;/b>` a podobně je použití regulárních výrazů a funkce `preg_replace`.

```
$text = preg_replace(
  "~\[(b)\](.+?)\[/\\1\]~ui", 
  "&lt;\\1>\\2&lt;/\\1>", 
  $text
);
```

Formátování všech jednoduchých značek (`[b]`, `[i]`, `[code]`) může zajistit jednoduchá funkce, které se předají požadované značky.

```
function obycejnyBbKod($znacky, $text) {
  foreach ($znacky as $znacka) {
    $text = preg_replace(
      "~\[($znacka)\](.+?)\[/\\1\]~ui", 
      "&lt;\\1>\\2&lt;/\\1>", 
      $text
    );
  }
  return $text;
}
```

Použití.

```
$text = obycejnyBbKod(
  array("b", "i", "code"), $text
);
echo $text;
```

### Značka `[img]`

V případě **vkládání obrázků** je nutné vytvořit jinou funkci (už se nebude nahrazovat značka za značku, ale potřebujeme obsah mezi `[img]` a `[/img]` dostat do `src` atributu značky `&lt;img>`). Regulární výraz ale bude stejný.

```
$text = preg_replace(
  "~\[img\](.+?)\[/img]~ui", 
  "&lt;img src='\\1'>", 
  $text
);
```

### Složitější BB značky `[url]`

BB značky, kde může být nějaký *atribut* s hodnotou, musí zpracovávat trochu **složitější regulární výraz**.

```
$text = preg_replace(
  "~\[url=(.+?)\](.+?)\[/url]~ui", 
  "&lt;a href='\\1'>\\2&lt;/a>", 
  $text
);
```

## Bezpečnost

Je potřeba myslet na to, že vstup od uživatele je nutno chránit před [XSS](/bezpecnost#xss) a zároveň veškeré akce chránit před [CSRF](/bezpecnost#csrf). Možnost **vložit obrázek** může být skvělá příležitost, jak administrátor načte požadovanou URL (třeba URL pro smazání obsahu), aniž by **o tom věděl**.

### XSS

Proti **XSS** je vhodný postup ošetřit před **převáděním na BB code** obsah funkcí `htmlspecialchars`.

```
$text = htmlspecialchars($text, ENT_QUOTES);
```

Uvést druhý parametr `ENT_QUOTES` je **naprosto klíčové**. Zabrání to možnosti vložit škodlivý kód typu:

```
[img]http://example.com'** onclick='alert("XSS")**[/img]

```

Který by se jinak přetvořil na *validní*, funkční a nebezpečný kód:

```
&lt;img src='http://example.com'** onclick='alert("XSS")**'>
```

## Zpracovávání obsahu značek

V případě, že je žádoucí zadaný obsah BB značek nějak zpracovávat (upravovat), poslouží k tomu **PHP funkce** `preg_replace_**callback**`.

```
$text = preg_replace_callback(
  "~\[url=(.+?)\](.+?)\[/url]~ui", 
  function($vyskyty) {
    $cilOdkazu = $vyskyty["1"];
    $textOdkazu = $vyskyty["2"];
    // nějaké operace
    return "&lt;a href='" . $cilOdkazu . "'>" . $textOdkazu . "&lt;/a>"; 
  },
  $text
);
```

## Hotové řešení

Hotové řešení [BB code v PHP](https://github.com/Jahoda/bb-code) je na GitHubu.

## Zpětný převod HTML na BB code

Převádět pro účely editace textů v BB kódu zpětně z HTML sice možné je, ale není to úplně ideální postup. Musí se kromě funkcí „BB Code → HTML“ vytvářet i převody opačné.

Navíc to není jen dopisování zpětných regulárních výrazů. Když se rozhodneme, že HTML značky obrázků mají mít třeba nějakou třídu, bude se muset psát další regulární výraz pro **převod staré podoby HTML do nové**. Nebo si napsat nějaký skript, co všechen obsah dekóduje do BB a převede zpět do nové podoby HTML.

Většinou lepší řešení je ukládat v DB **obě podoby** – jednu v BB kódu pro editaci a druhou v HTML pro výpis. Převádět BB kód by sice bylo možné při **každém vypsání stránky**, ale je to trochu zbytečná zátěž.

## Problémy

Převody BB značek na HTML **regulárními výrazy** nejsou úplně neprůstřelné. Například není problém vytvořit překřížené značky a obecně **nevalidní výstup**. Je to ale řešení na pár řádek, což by napsání dokonale funkčního parseru, který by těmito problémy netrpěl, nebylo.