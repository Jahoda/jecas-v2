---
title: "Mezery mezi písmeny a slovy"
headline: "Odsazení písmen a slov"
description: "Nastavení odsazení jednotlivých písmen (<code>letter-spacing</code>) a mezer mezi slovy (<code>word-spacing</code>)."
date: "2014-04-07"
last_modification: "2014-04-07"
status: 1
tags: ["CSS", "CSS vlastnosti", "Písma"]
---

## Mezera mezi písmeny

```
element {
  letter-spacing: 1em;
}
```

K úpravě mezer mezi písmeny slouží CSS vlastnost `letter-spacing`. Jako hodnota se zadává libovolná délková jednotka (kromě procent):

    Text s velkými mezerami

## Odsazování jednotlivých slov

```
element {
  word-spacing: 2em;
}
```

Vlasnost `word-spacing` funguje obdobně, jen vytváří mezery mezi **celými slovy**.

    Text s velkými mezerami

### Využití

Praktické využití `word-spacing`u nemusí být na první pohled zřejmé. Ale něco se přece jen najde:

    V případě použití velkého `letter-spacing`u (odsazením písmen slova) může zvětšení mezer mezi slovy pomoci lépe poznat **hranice slov**.

    Záporný `word-spacing` umí mezery mezi slovy úplně zrušit nebo zmenšit (do určité hranice – tj. nemohou se slova překrývat):

    Text bez mezer

    V případě řádkových elementů dokáže `word-spacing` zastoupit odsazování vlastnostmi [`margin`](/margin)/`padding`.

## Podpora v prohlížečích

Obě vlastnosti jsou **široce podporovány** napříč všemi běžně používanými prohlížeči.

## Roztažení textu

V některých grafických editorech si je možno povšimnout funkce, která **roztáhne písmo na přesně stanovenou šířku**.

Stejného efektu lze dosáhnout vhodným nastavením `letter` a `word-spacing`u s špetkou JavaScriptu.

[Nástroj Font-to-Width](http://font-to-width.com/)