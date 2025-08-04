---
title: "Build PHP v Sublime Text"
headline: "Spuštění PHP v Sublime Text"
description: "Při programování v PHP se občas hodí testovat (spouštět) skript přímo v editoru."
date: "2014-04-26"
last_modification: "2014-04-26"
status: 1
tags: ["Produktivita", "Sublime Text"]
---

V editoru [Sublime Text](/sublime-text) to jde poměrně snadno zařídit. Přes položku *New Build System…* nacházející se v hlavním menu pod *Tools* → *Build System*.

Po kliknutí na *New Build System…* by mělo stačit **nahradit obsah** nově otevřeného souboru následujícím obsahem.

```
{
	"cmd": ["php", "$file"],
	"file_regex": "php$",
	"selector": "source.php"
}
```

A soubor uložit do **předvybraného adresáře** `User` pod názvem `**php.sublime-build**` (celá cesta na Windows je `C:\Users\Uživatel\AppData\Roaming\Sublime Text 2\Packages\User`).

Nyní stačí nově vytvořený build v PHP zaškrtnout ve stejné nabídce, kde se vytvářel. A po stisknutí Ctrl + B v otevřeném PHP souboru by to mělo fungovat. Výsledek *buildu* se zobrazuje v dolní části editoru.

## Build celého projektu

Teoreticky je možné si místo buildování právě otevřeného souboru (`$file`) nastavit `index.php` celého projektu.

### `php-projekt.sublime-build`

```
{
	"cmd": ["php", "**$project_path**/index.php"],
	"file_regex": "php$",
	"selector": "source.php"
}
```

Ale u většiny webových stránek je to stejně v podstatě k ničemu, protože se zpravidla jednotlivé stránky stejně skládají na základě všelijakých **parametrů v URL**.