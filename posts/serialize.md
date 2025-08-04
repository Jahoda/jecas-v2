---
title: "Serializace v PHP"
headline: "Serializace v PHP"
description: "Funkce <code>serialize</code> v PHP převádí datovou strukturu na řetězec uložitelný do souboru nebo database."
date: "2015-11-08"
last_modification: "2016-01-24"
status: 1
tags: ["Rady a nápady", "PHP"]
---

PHP funkce [`serialize`](http://php.net/manual/en/function.serialize.php) slouží k převedení PHP objektu nebo pole na textový řetězec – ten jde následně snadno uložit do DB nebo souboru a opětovně načíst pomocí funkce [`**un**serialize`](http://php.net/manual/en/function.unserialize.php).

Jde tak pohodlně ukládat datové struktury přímo v PHP.

## Příklad

Bude-li existovat následující pole:

```
$pole = array(
  "jedna",
  "dva",
  "fytopuf"
  );
```

Pro jeho serializaci ho stačí předat funkci `serialize`.

```
$serPole = serialize($pole);
```

V proměnné `$serPole` nyní bude:

```
a:3:{i:0;s:5:"jedna";i:1;s:3:"dva";i:2;s:7:"fytopuf";}
```

Písmena před dvojtečkami značí datový typ (a – pole, i – integer, s – string), číslo za tím potom délku. V praxi to ale potřeba znát příliš není, protože serializovaný řetězec slouží jen k tomu, aby se převedl zpátky funkcí `unserialize`:

```
$poSerPole = unserialize(
  'a:3:{i:0;s:5:"jedna";i:1;s:3:"dva";i:2;s:7:"fytopuf";}'
);
```

Pole po serializaci (`$poSerPole`) a následné unserializaci nyní bude odpovídat poli původnímu (`$pole`).

Výraz `$pole === $poSerPole` proto vrátí `true`.

Ale jak to použít v praxi?

## Uložení a obnovení session

V praxi se serializace hodí třeba k uložení hodnot z proměnné `$_SESSION` pro budoucí obnovení.

### Uložení

```
file_put_contents("serialize.dat", serialize($_SESSION));
```

### Načtení

```
$_SESSION = unserialize(file_get_contents("serialize.dat"));
```

## Ukládání do DB

Používat serializaci je velmi pohodlné při ukládání dat do database při ukládání nastavení nebo uživatelských dat, kde není jasné, jak by měla struktura DB vypadat.

Používají to některé [redakční systémy](/cms) – třeba [WordPress](/wordpress). Mají tabulku se sloupci *klíč* a *hodnota*. Jako *hodnota* se potom uloží serializovaný řetězec s libovolným nastavením.

Někteří lidé považují jako *čistší* způsob řádně navrhnout strukturu [SQL](/sql) tabulky se sloupci ve vhodných datových typech, ale použít serializaci je mnohem jednodušší a rychlejší na vytvoření.

Druhá věc je, zda je nějaká výhra mít pro každé nastavení samostatnou SQL tabulku s jediným řádkem.

## Ukládání nastavení do souboru

Nepoužívá-li PHP aplikace databasi a není výhodné ukládat nastavení do jiného formátu (třeba více lidsky čitelného [JSONu](/json)), je serializace jasná volba, má-li být možné provádět změny prostřednictvím webového rozhraní.

U konfigurace **ruční změnou souborů** je výhodnější třeba ten přehlednější JSON nebo PHP pole a konstanty.

Stejně tak se v PHP serializované nastavení nehodí pro sdílení s jinými programovacími jazyky, zde jde lepší universálnější JSON.

## Cache

Bylo-li hodně časově náročné datovou strukturu získat a získaná data jsou aktuální delší dobu, mohou se pomocí `serialize` a `unserialize` velmi elegantně cacheovat.

Hodí se to v případech, kdy není možné kešovat celý HTML kód třeba kvůli odlišnostem pro přihlášené uživatele nebo je potřeba často měnit HTML šablony a bylo by neefektivní kvůli tomu invalidovat tisíce stránek.

Například výstup tohoto článku (sestávající z titulku, nadpisu, obsahu a označení několika štítky), který se normálně získává z DB, by se mohl uložit do serializovaného pole.

Při jeho zobrazení by se potom nemusela potřebná data složitě získávat SQL dotazy, avšak postup sestavování stránky by zůstal stejný.