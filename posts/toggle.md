---
title: "CSS toggle()"
headline: "CSS funkce <code>toggle()</code>"
description: "Nefunguje zatím snad nikde, měla by sloužit k pohodlnému zadávání hodnot pro zanořené elementy stejného názvu."
date: "2013-06-06"
last_modification: "2013-06-07"
status: 1
tags: ["CSS", "CSS funkce"]
---

Pokud se má nějak měnit styl s ohledem na zanoření, není současně podporované CSS moc elegantní. Zvláště pokud by bylo úrovní opravdu hodně, může být kód nekonečný.
```
ul {list-style-type: disc}
ul ul {list-style-type: circle}
ul ul ul {list-style-type: square}
```

A k tomu by mělo být právě `toggle`:
```
ul ul { list-style-type: toggle(disc, circle, square, box); }
```

Stačí jeden řádek a styly se budou neustále opakovat.

## Ukázka (nejspíš nikde nefunguje)

ul { list-style-type: disc; }
ul ul { list-style-type: toggle(disc, circle, square, box); }

	- Položka 1

		- Položka 1

		- Položka 2

			- Položka 1

		- Položka 1

	- Položka 1

	- Položka 2

## Zdroje a související odkazy

Specifikace: W3C: CSS Values and Units Module Level 3