---
title: "Nastavení kódování BOMem"
headline: "Určení kódování BOMem"
description: "Co je to BOM a jak nastavuje kódování pro správné zobrazování českých znaků."
date: "2015-05-15"
last_modification: "2015-05-15"
status: 1
tags: ["Produktivita", "Rady a nápady", "PHP"]
---

Pro správné nastavení češtiny v HTML souborech jde mimo jiné použít tzv. BOM (*Byte order mark*). Jedná se o sekvenci neviditelných znaků na začátku souboru, která se obvykle používá k označení souboru v **kódování UTF**.

    - [Byte order mark](http://cs.wikipedia.org/wiki/Byte_order_mark) – technický popis BOMu na české Wikipedii

## Jak přidat/odebrat BOM

### Sublime Text

V editoru [Sublime Text](/st) je taková volba v nabídce *File → Save with Encoding → UTF-8 with BOM*.

### PSPad

V **PSPadu** jde nastavit **přidávání BOMu** v *Nastavení → Nastavení programu… → Program 2 → Ident. byty v kódování UTF-8*.

## Problémy BOMu v PHP

Používat BOM je problematické při programování v PHP, kdy může jeho užití způsobovat **chybovou hlášku**:

Warning: 
Cannot add header information - headers already sent by

Případně při použití session:

Warning: session_start(): 
Cannot send session cookie - headers already sent by

Nebo při nastavení cookie:

Warning: 
Cannot modify header information - headers already sent by

Nastavují-li se v PHP nějaké HTTP hlavičky (což nastane i při využívání cookie), je tak nutné učinit **před vypsáním obsahu**. Jelikož se sekvence BOMu nachází před začátkem PHP a BOM je považován za obsah, nejde podmínku **hlaviček před obsahem** v takovém případě splnit.

Symbolický zápis:

```
**neviditelný BOM**
&lt;?php
// PHP kód nastavující hlavičky
```

Z tohoto důvodu je nejspíš lepší **BOM nepoužívat** a kódování určit v HTML meta značkou charset:

```
&lt;meta charset="utf-8">
```

Nebo kódování a typ obsahu nastavit **HTTP hlavičkou** přímo v PHP:

```
&lt;?php
header("Content-type: text/html; charset=utf-8");
```