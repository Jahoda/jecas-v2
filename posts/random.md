---
title: "Výpis náhodného obsahu"
headline: "Výpis náhodného textu"
description: "Jak na stránce náhodně vypsat obrázek, odkaz, reklamu, text nebo cokoliv jiného."
date: "2014-08-13"
last_modification: "2025-03-25"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady", "PHP"]
---

Čas od času je cílem na webu zobrazit z několika položek jen jednu. A to **náhodně**, například při každém **načtení stránky** jinou.

Oblíbená funkce z [xkcd](http://xkcd.com/221/) proto nepostačí.

První, co je potřeba rozhodnout, je otázka, zda náhodný obsah generovat:

  - na straně **serveru** (PHP, MySQL),

  - na straně **klienta** (JavaScript)

Serverové řešení může být problematické skloubit s **cacheováním celé stránky**, kdy se náhodný prvek dostane do *cache* a do její *invalidace* bude na náhodném místě **stále ten stejný obsah**.

Pokud to vadí, tak se zdá výhodnější řešení v **JavaScriptu**.

## Náhodný obrázek v JS

Nejjednodušší výběr náhodné položky z pole může vypadat následovně:

```
var **polozky** = ["prvni", "druha", "treti"];
var *nahodne* = Math.floor(Math.random() * **polozky**.length);
alert(**polozky**[*nahodne*]);
```

Záhy ale nejspíš zjistíme, že toto prosté pole nestačí. Budeme-li chtít vypsat například **náhodný odkaz** obsahující obrázek, bude elegantnější udělat pole o **více úrovních** místo duplikování celého HTML kódu „`&lt;a href=''>&lt;img src=''>&lt;/a>`“ pro **každou položku**.

```
var polozky = [
  {"**obrazek**" : "prvni.jpg", "*url*" : "http://jeacas.cz"},
  {"**obrazek**" : "druhy.jpg", "*url*" : "http://kod.djpw.cz"},
  {"**obrazek**" : "treti.jpg", "*url*" : "http://djpw.cz"}
];
var nahodne = Math.floor(Math.random() * polozky.length);
alert(polozky[nahodne].**obrazek**);
alert(polozky[nahodne].*url*);
```

[Samostatná ukázka](http://kod.djpw.cz/oyeb)

### Jak to funguje?

Konstrukce `Math.random()` vytvoří číslo mezi nulou a jedničkou.

  (vygenerujte)

  Náhodné číslo

Když se takovým číslem vynásobí počet položek v poli a výsledek zaokrouhlí dolů (`Math.floor`), vyjde nám *index* v rozmezí, které potřebujeme.

## Náhodný obsah v PHP

Kód z JS [převedeme do PHP](/php2js), kde navíc pro získání **náhodné položky pole** lze místo **generování náhodného čísla** využít funkci `array_rand`.

```
$polozky = array(
  array("obrazek" => "prvni.jpg", "url" => "http://jecas.cz"),
  array("obrazek" => "druhy.jpg", "url" => "http://kod.djpw.cz"),
  array("obrazek" => "treti.jpg", "url" => "http://djpw.cz")
);
$nahodne = $polozky[array_rand($polozky)];
echo $nahodne["obrazek"];
echo $nahodne["url"];
```

Získat náhodnou položku jde také zamícháním celého pole funkcí `shuffle` a použitím **první položky**. Nebo skutečným vygenerováním čísla indexu (funkce `mt_rand`) v závislosti na délce pole (funkce `count`):

```
$nahodne = $polozky[mt_rand(0, count($polozky) - 1)];
```

Řešení využívající funkci `array_rand` mi ale přijde **elegantnější**.

## Náhodná položka v SQL

V **MySQL** jde k vybrání použít *řazení podle* `RAND()`.

```
SELECT neco 
FROM tabulka
ORDER BY **RAND()**
LIMIT 1
```

Toto řešení ale bývá dost pomalé, takže se častěji používá generování náhodného limitu v PHP.

## Více náhodných položek

Jak docílit získání více náhodných položek, které ale budou unikátní?

V JS jde využít funkce `splice`, která odstraní položku z pole:

```
var polozky = ["prvni", "druha", "treti", "ctvrta"];
var kopie = [...polozky];

var prvni = kopie.splice(Math.floor(Math.random() * kopie.length), 1)[0]; 
var druha = kopie.splice(Math.floor(Math.random() * kopie.length), 1)[0];

console.log(prvni, druha);
```

V PHP stačí předat parametr funkci `array_rand`:

```
$polozky = ["prvni", "druha", "treti", "ctvrta"];
$nahodne_klice = array_rand($polozky, 2); // Vrátí dva různé klíče

echo $polozky[$nahodne_klice[0]] . ", " . $polozky[$nahodne_klice[1]];

```