---
title: "Varování v JS konsoli"
headline: "Upozornění v JS konsoli"
description: "Jak do JS konsole vložit výrazné varování o risicích vkládání cizího kódu."
date: "2015-09-12"
last_modification: "2015-09-13"
status: 1
tags: ["JavaScript", "Prohlížeče", "Bezpečnost"]
---

Tzv. *console* je nástroj ve [vývojářských nástrojích](/vyvojarske-nastroje) (dostupný zpravidla po stisknutí F12), který slouží ke dvěma věcem:

    Prostor pro **vypsání testovacích dat** z JavaScriptu na stránce. Nejčastěji se používá něco jako:

    ```
console.log("Proměnná x: " + x);
```

    Prostor pro **spouštění JS kódu**. Napíše-li se do konsole:

    ```
alert(1);
```

    Vyskočí na stránce příslušná hláška.

Právě druhý případ přináší **bezpečnostní risiko**, protože kód vložený do konsole má nad stránkou prakticky absolutní moc.

## Varování proti vložení kódu

Populární webové služby často čelily situacím, kdy někdo šířil JS kód, který měl zajistit nějakou funkčnost: třeba automatické označení všech přátel pro pozvání k události na [Facebooku](/facebook).

Tento kód se **vkládal právě do JS konsole** ve vývojářských nástrojích.

Některé kódy tak skutečně fungovaly, problém je, že do nich mohl útočník přidat ještě něco škodlivého, co laik neodhalí.

Útok tímto způsobem se nazývá jako **self XSS** – tj. varianta [Cross-site scriptingu](/xss), kterou oběť provede *sama na sebe*.

Známé webové služby proto typicky po stisku F12 a otevření konsole **zobrazují upozornění**:

  Varování na Facebooku

  Upozornění na Google Plus

## Vlastní upozornění

Pro přidání obdobného upozornění na své stránky stačí přidat vhodně **formátovanou zprávu** pomocí `console.log`.

Formátování se provádí pomocí CSS při uvedení `%c` na začátku textu a přidáním druhým argumentem s CSS pravidly:

```
console.log(
  "**%c**Zpráva formátovaná pomocí CSS", 
  "color: blue; font-size: x-large"
);
```

Pro zajímavost jsem něco formátovaného přidal i na tuto stránku.

### Další formátování

Kromě změny CSS jde výpis formátovat i jinými způsoby. Všechny možné postupy, jak vypisovat něco do chybové konsole, jsou popsány na:

    - Google Web Tools: [Diagnose and Log to Console](https://developers.google.com/web/tools/javascript/console/console-write?hl=en)

    - Firebug: [Console.log](http://getfirebug.com/wiki/index.php/Console.log)