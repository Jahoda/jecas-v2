---
title: "Sublime Text 3 pluginy"
headline: "Pluginy v Sublime Text"
description: "Už tak <a href='/sublime-text'>kvalitní editor</a> lze instalací vhodných rozšířeních učinit ještě lepším. Jak a jaké pluginy nainstalovat?a href='/sublime-text'"
date: "2013-08-02"
last_modification: "2014-07-09"
status: 1
tags: ["Produktivita", "Sublime Text"]
---

Pro instalování většiny pluginů či balíčků je potřeba tzv. [Package Control](http://wbond.net/sublime_packages/package_control), který se musí nainstalovat úplně na začátek.

## Instalace Package Control

Pro instalaci tohoto správce balíčků stačí zkopírovat do *console* v Sublime Text (otevře se po stisknutí Ctrl + ; – klávesa úplně vlevo nahoře) kód, který jde získat na následující stránce:

    - [Package Control – Installation](https://packagecontrol.io/installation) – instalační kódy pro Sublime Text 2 i 3

To by mělo být vše. Po **restartování** editoru půjde v případě, že se vše povedlo, instalovat doplňky.

## Ruční instalace

### Sublime Text 2

Instalace ve Windows pro Sublime Text 2 je oproti ST 3 výrazně [jednodušší](http://wbond.net/sublime_packages/package_control/installation#Manual_Instructions). Stačí si [stáhnout balíček](https://sublime.wbond.net/Package%20Control.sublime-package), zkopírovat jej nejčestěji do: `C:\Users\**Uživatel**\AppData\Roaming\Sublime Text 2\Installed Packages` a restartovat.

### Sublime Text 3

Zde je to pro uživatele, co nepoužívají GIT, dost otravné, protože jinak *Package Control* zřejmě instalovat nelze.

Musí se do Windows doinstalovat, například:

  - [Git for Windows](http://msysgit.github.io/),

  - [GitHub Windows](http://windows.github.com/)

Potom je třeba otevřít příkazovou řádku a postupně tam nakopírovat [následující](http://wbond.net/sublime_packages/package_control/installation#ST3).

```
cd "C:\Users\**Uživatel**\AppData\Roaming\Sublime Text 2\Packages"
git clone https://github.com/wbond/sublime_package_control.git "Package Control"
cd "Package Control"
git checkout python3
```

Zdaří-li se, mělo by se po restartování ST (Sublime Text) objevit v nabídce *Preferences* úplně dole možnost *Package Control* — to je prostředek pro instalování konkrétních doplňků.

## Instalace doplňků

Rozšiřující balíčky si lze [prohlížet zde](http://wbond.net/sublime_packages/community), potom je třeba si zapamatovat název a ten vyhledat plus nainstalovat přímo ze Sublime Text — `Preferences → Package Control → Package Control: Install Package`.

## Pár zajímavých doplňků

  Emmet
  
    Zjednodušení psaní HTML a CSS kódu, více v [samostatném článku](/emmet).

  [ColorPicker](http://weslly.github.io/ColorPicker/)

    Jednoduché *kapátko* (nástroj pro míchání barev). Vyvolává se zkratkou Ctrl + Shift + C.

  Color Highlighter
  
    Kromě pohodlného vybírání barev se hodí i jejich grafické **znázornění přímo v kódu**.

  [Emmet LiveStyle](/zivy-nahled-css)
  
    Přináší možnost v reálném čase sledovat [výsledky zapsaného CSS](/zivy-nahled-css).

  JavaScript &amp; NodeJS Snippets
  Kolekce [snippetů](https://github.com/zenorocha/sublime-snippets-js) usnadňující zápis obvyklých JS kódů.

    Pár ukázek:

    - `cl` — `console.log();`

    - `ac` — `document.appendChild('');`

    - `si`/`st` — `setInterval`/`setTimeout`

    - `qs`/`qsa` — [`querySelector`](/queryselector)

  DocBlockr

    Pohodlně generuje komentáře k funkcím/metodám/proměnným. Stačí před kód, který chceme okomentovat, napsat `/**` a zmáčknout Tab.

  AllAutocomplete
  
    Sublime Text standardně napovídá již použité názvy v rámci jednoho souboru. Plugin AllAutocomplete to zajišťuje napříš **všemi otevřenými soubory**.

  Linter

    „Linter“ pluginy slouží k odhalování chyb v kódu ještě **před spuštěním**. Při vytvoření syntaktické chyby se vedle řádku zobrazí vykřičník a ve **stavovém řádku** chybové hlášení.

      - Pro PHP jde použít plugin [phpcs](http://benmatselby.github.io/sublime-phpcs/)

      - Pro JavaScript [Sublime Linter](http://www.sublimelinter.com/en/latest/)

      - Pro HTML [SublimeLinter-html-tidy](https://github.com/SublimeLinter/SublimeLinter-html-tidy)

## Odkazy jinam

  - Tipy na další pluginy a nastavení: [Sublime Text Power User](http://wesbos.github.io/Sublime-Text-Power-User-Talk/)