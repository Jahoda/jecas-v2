---
title: "Hodně souborů ve složce"
headline: "Hodně souborů v jedné složce"
description: "Proč je problém ukládat do jedné složky velké množství souborů."
date: "2014-06-18"
last_modification: "2014-06-20"
status: 1
tags: ["Rady a nápady"]
---

Ve webové aplikaci často potřebujeme ukládat například **obrázky** k jednotlivým článkům. Nabízí se udělat to nejjednodušší, vytvořit jednu složku a tam nahrávat obrázek za obrázkem.

Proč to **není** úplně vhodné?

Když pominu **problematickou orientaci** ve složce se všemi obrázky na jedné hromadě (to ostatně často nemusí být tolik potřeba). Existuje větší hrozba – při opravdu velkém množství souborů v jedné složce bude práce s nimi **velmi pomalá**. Dokonce se může stát, že **otevřít takovou složku** bude téměř nemožné.

## Best practice

Rozumné se zdá **obrázky ke konkrétní článkům** ukládat do složky typu:

```
/obrazky/nazev-clanku/obrazek.jpg
```

Zpravidla k jednomu článku nebude existovat tolik obrázků, aby jich bylo tolik, že by to vadilo.

Alternativou je obrázky dělit do složek podle **kalendářního data**. Dává to smysl zvlášť v případě, když obrázek přímo nesouvisí jen s jedním článkem. Taková adresa je potom na způsob:

```
/obrazky/2014/06/18/obrazek.jpg
```

Toto řešení (s vypuštěním konkrétního čísla dne) používá ve výchozím nastavení **Wordpress**.

V PHP se toho snadno docílí použitím funkce [`date`](http://cz2.php.net/manual/en/function.date.php).

```
echo date("Y/m/d"); // 2014/06/18

```

### Krátké adresy

Co v případě, že chceme mít krátké adresy? Třeba u nějaké služby pro **upload obrázků**. Potom asi nezbývá než obrázky rozdělovat do adresářů dle kalendářního data a vést k nim **záznamy v databási**. Při požadavku na soubor se podívat do DB a na základě toho sestavit cestu k obrázku na disku.

Vyhledávání v DB bývá i při milionech položek **velmi rychlé**.