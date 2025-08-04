---
title: "Výpis souborů ze složky"
headline: "Výpis souborů ve složce"
description: "Jak v PHP vypsat a podle názvu či data seřadit obsah složky."
date: "2014-07-31"
last_modification: "2014-09-04"
status: 1
tags: ["Hotová řešení", "PHP"]
---

Pro zjednodušení práce se často hodí si PHP skriptem automaticky **vypsat obsah složky** (typicky třeba pro výpis obrázků a vytvoření galerie). Hodí se k tomu funkce `glob`. Její výhoda je, že v názvu cesty je možné **používat masku**.

```
foreach (glob("soubory/*.jpg") as $soubor) {
    echo $soubor . "&lt;br>\n";
}
```

Uvedený kód vypíše všechny soubory s příponou JPG v adresáři `soubory`. Výpis pouze JPG zajišťuje právě výraz „`*****.jpg`“.

## Řazení dle názvu

Ve výchozím použití funkce `glob` zároveň **položky abecedně seřadí**.

## Seřazení podle stáří

Často je ale nutné soubory řadit podle **kalendářního data**. K tomu stačí jednoduchá vlastní funkce, která porovná `filetime` (datum změny) souborů.

```
**$soubory** = glob("soubory/*.jpg");
// Řazení od nejnovějšího
usort(**$soubory**, function($a, $b) {
  return filemtime($a) &lt; filemtime($b);
});
// Výpis
foreach ($soubory as $soubor) {
  echo $soubor . "&lt;br>\n";
}
```

V případě, že nechceme vypisovat **cestu souboru**, nejjednodušší je využít funkci `basename`:

```
echo basename($soubor);
```

Pokud se nemá vypisovat ani **přípona**, stačí ji uvést do parametru:

```
echo basename($soubor, '**.jpg**');
```

## Obrácené řazení

Mají-li se soubory řadit obráceně, existuje několik způsobů, jak toho docílit.

    Funkcí `array_reverse` pole získané funkcí `glob` s názvy souborů **otočit**.

    ```
$soubory = array_reverse($soubory);
```

    Ve vlastní funkci pro řazení (v případě, že se k řazení používá datum) **otočit nerovnost** mezi hodnotami získanými funkcí `filemtime`.

    Místo cyklu `foreach` použít `for`, který projede položky *od konce*.

    Když je kvůli něčemu stejně potřeba zjistit **počet souborů**, není to o tolik komplikovanější.

    ```
$pocetPolozek = count($soubory);
for ($i = $pocetPolozek; $i > 0; $i--) {
  echo basename($soubory[$i - 1], ".txt") . "&lt;br>\n";
}
```

    Nicméně může tento kód být **hůře pochopitelný** a je komplikovanější pro změnu řazení, takže bych se mu raději vyhnul.

## Databáse?

Vytváření např. **fotogalerií** pomocí výše uvedeného vypsání složky je dobré předem zvážit. Při rozšiřování takové aplikace velmi brzy narazíme na **strop rozšiřitelnosti**.

Třeba prostý požadavek na možnost libovolně seřadit obrázky bude čistě se soubory relativně komplikovaný.

Nabízí se tedy rovnou **DB použít**, pro každý soubor mít záznam v příslušné tabulce a výpisy řešit na úrovni **SQL**. Skript pro procházení složek se ale může hodit pro prvotní naplnění databáse těmito záznamy.