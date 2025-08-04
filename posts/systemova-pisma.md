---
title: "Systémová písma"
headline: "Systémová písma"
description: "Jak a proč používat lokální písma dostupné v operačních systémech."
date: "2015-11-13"
last_modification: "2016-07-21"
status: 1
tags: ["CSS", "Rady a nápady", "Písma"]
---

Pokud nestačí, aby se texty zobrazovaly základním patkovým (`font-family: serif`) nebo bezpatkovým (`font-family: sans-serif`) písmem – typicky Times New Roman a Arial, existují dvě možnosti:

  - Připojit externí písmo pomocí [`@font-face`](/font-face).

  - Použít písmo systémové.

## Výhody systémových fontů

Nové operační systémy nabízejí velmi kvalitní fonty, které:

    **Není nutné stahovat**, protože už je má návštěvník má nainstalované. Zvlášť na pomalém mobilním přípojení jsou externí fonty kvůli rychlosti problematické.

    Jsou dostupné **zdarma** (pro účely použití v CSS vlastnosti [`font-family`](/font#font-family)).

    Dodají stránce vzhled **nativní aplikace**.

Zásadní problém může být v tom, že různé operační systémy mají hlavní systémové písmo jiné. Stránka používající systémový font se tak visuálně **bude lišit napříč operačními systémy a prohlížeči**.

## Použití UI fontů

Zápis používající výchozí systémové písmo, který je universální pro různé operační systémy ([**Windows**](/windows), **Linux**, **OS X**).

```
font-family:
  -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif;
```

Například **GitHub** používá od poloviny roku 2016 následující předpis:

```
font-family: 
  -apple-system, BlinkMacSystemFont, 
  "Segoe UI", Roboto, Helvetica, Arial, sans-serif, 
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

```

    - Smashing Magazine: [Using System UI Fonts In Web Design: A Quick Practical Guide](http://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)

Pořadí je důležité, protože některé systémové fonty jednoho OS se poměrně často vyskytují i v jiném OS. Třeba systémové písmo Windows – Segoe UI se může snadno dostat na OS X při instalaci Microsoft Office.

Systémové písmo Androidu – Roboto potom budou mít dostupné třeba androidoví vývojáři ve Windows.

  .systemove {
    font-family: 
  -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif;
  }

    Systémové písmo

### Možné problémy

Fonty spoléhající se na dostupnost v operačním systému trpí risikem, že nějaký uživatel bude mít špatnou versi daného fontu. Seznam dostupných písem se hodně liší napříč OS a uživateli, takže se docela složitě testuje.

Při použití názvu specifického fontu jeden nikdy neví, kterého kostlivce tím vytáhne ze skříně. Následující článek popisuje nechtěné nastavení písma na systémové písmo z Windows 3.0.

   System shock
A story of a 25-year-old font coming back with a vengeance – problém písma `system`

V případě Windows a OS X by výše uvedený seznam měl být poměrně spolehlivý, na Linuxu ale může dojít k potížím.