---
title: "CSS quotes"
headline: "Uvozovky v CSS"
description: "Vlastnost <code>quotes</code> umožňuje nadefinovat uvozovky, které se okolo značky objeví."
date: "2013-11-21"
last_modification: "2013-11-23"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

V případě, že nějakému elementu chceme přidat na začátek/konec [uvozovky](/uvozovky) přes [`content`](/content-attr), vlastnost `quote` určuje styl těchto uvozovek. Zároveň elegantně **řeší zanořování**. Je možné nadefinovat **počáteční** a **koncovou** podobu uvozovek v prakticky libovolném zanoření. Vlastnost `quotes` funguje od **IE 8**.

    q {quotes: "„" "“" "‚" "‘"  "»" "«" "›" "‹"}
    q:before {content: open-quote}
    q:after {content: close-quote}
  
  Text v uvozovkách v uvozovkách v uvozovkách a v uvozovkách… a teď  to
  všechno správně ukončit.

Styl uvozovek v zanoření jde nastavit právě ve vlastnosti `quotes`. Pro **české uvozovky** ([jak je napsat?](/ceska-klavesnice)) nebo obecně pro česky psaný web by předpis mohl vypadat následovně:

```
q {quotes: "„" "“" "‚" "‘"  "»" "«" "›" "‹"}
```

Vyvolat uvozovku do `content`u je potom možné přes `open-quote`/`close-quote`.

Jednotlivé **uvozovky** se oddělují mezerou ve stylu počáteční uvozovka 1. úrovně, koncová uvozovka 1. úrovně, počáteční 2. úrovně atd. Při *vyplácání* všech stylů se začne poslední úroveň **opakovat**.

Zanořování mi ale přijde spíš jako **technická finesa**, než něco zvlášť užitečného/potřebného. Reálné použití mě moc nenapadá…