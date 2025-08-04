---
title: "Identifikátor z písmen a čísel"
headline: "Identifikátor z písmen a čísel"
description: "Jak místo dlouhého číselného identifikátoru použít kratší kombinaci písmen a čísel."
date: "2014-11-21"
last_modification: "2014-11-22"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "PHP"]
---

Pro identifikaci položek v databási se často používají **číselné identifikátory**. Je to pohodlné, protože díky volbě *Auto Increment* se o vytváření unikátních identifikátorů položek stará DB v podstatě sama.

Pokud se ale s číselným identifikátorem má **setkat člověk**, není to úplně ideální.

  - **Význam** – z jakéhosi čísla není patrný konkrétní záznam, který číslo representuje.

  - **Délka** – při milionu záznamů bude mít identifikátor **7 znaků** (`1 000 000`)

Číselné ID tedy kombinuje dvě nevýhody. Je nečitelné a dlouhé.

V případě, kdy máme pro **jednoznačné identifikování** k disposici čitelnější obsah, je lepší ho použít. To je třeba případ adres webový stránek, kdy se často v URL používá název stránky ochuzený o diakritiku, mezery a převedený na malá písmena.

    - PHP triky: [Vytvoření přátelského URL](http://php.vrana.cz/vytvoreni-pratelskeho-url.php)

## Zkrácení identifikátoru

Pokud ale lepší identifikátor vymyslet nelze, můžeme alespoň odstranit problém s délkou. To je možné použitím alfanumerických znaků (písmen i čísel). Dělá to tak například **YouTube**, různé zkracovače adres nebo služby pro nahrávání obrázků.

Zatímco u čistě číselných ID může na jedné posici být pouze 10 různých znaků (`1`–`9` a `0`), při použití základních znaků abecedy **počet kombinací naroste**. Základní abeceda má **26 znaků**.

Na první pohled ten rozdíl nemusí vypadat významně, ale počet možných základních znaků se **umocňuje** celkovým počtem znaků identifikátoru.

Pro ID o 3 znacích bude platit:

  - **Čísla** – 10 kombinací ^ 3 znaky = **1 000 položek**

  - **Základní abeceda** – 26 kombinací ^ 3 znaky = **17 576 položek**

Do čtyřech znaků se potom při použití písmen vejde už skoro **0,5 milionu**, což je oproti **10 tisícům** čísel značná výhoda. Při pěti znacích už je to **11 milionů**.

V extrémním případě (používá například **YouTube**) můžeme identifikátor tvořit z:

  - čísel (10 znaků),

  - malých písmen (26 znaků),

  - velkých písmen (26 znaků),

  - dalších znaků běžně používaných v URL (např. `-` a `_`)

Tak se dostane na jedno místo **64 možností**. Do čtyř znaků se potom vejde přes **16 milionů kombinací** (`64 ^ 4`).

## Převod čísla na písmena

Převádění písmen na číselná ID a obráceně může probíhat ihned po požadavku a v DB tak stále pracovat s klasickými čísly.

Dobře funkční je tato funkce `alphaID`:

[Hotové řešení](http://kvz.io/blog/2009/06/10/create-short-ids-with-php-like-youtube-or-tinyurl/)

K disposici je implementace v mnoha programovacích jazycích (**PHP**, **JavaScript** a další).

### Použití

Při požadavku na `example.com/**fE2XnNGpF**` se vezme řetězec `fE2XnNGpF`, předá se funkci `alphaID` s parametrem `true`.

```
$idecko = alphaID('PpQXn7COf', true);
```

V proměnné `$idecko` potom bude odpovídající číslo, podle kterého provedeme **dotaz do databáse** a podobně.

Získání zkráceného *kódu* vypadá takto (například pro **vygenerování odkazu**):

```
$zkracenyKod = alphaID(9007199254740989);
```

Funkce podporuje i nastavení **minimálního počtu znaků** či přidání náhodného řetězce, který ztíží možnost hádat číselné identifikátory z ID tvořených písmeny.