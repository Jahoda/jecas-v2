---
title: "AJAX v Nette"
headline: "AJAX v Nette"
description: "Jak vytvořit v Nette stránku používající AJAX."
date: "2015-11-05"
last_modification: "2015-11-05"
status: 0
tags: []
---

Pro používání [AJAXu](/ajax) je **Nette Framework** velmi dobře připraven.

Načítat jednotlivé stránky AJAXem je tak otázka:

  - Vytvoření *snippetu* – místa na stránce, kde se bude obsah měnit

  - Přidání informace do presenteru, kterou část má vracet pro použití ve snippetu.

  - Obsluha odkazů JavaScriptem.

## Snippet

Označuje blok, který se bude měnit bez znovunačtení celé stránky.

Pro zajaxování celé stránky tak bude v šabloně `@laytou.latte` například následující:

```
{snippet pageContent}
  {include #content}
{/snippet}
```

Po uložení by se na stránce měl objevit nový element s identifikátorem `snippet--nazevSnippetu`:

Pokud by vadilo přidání dalšího `&lt;div>`u, jde udělat snippet i z existující značky atributem `n:snippet`:

```
&lt;div n:snippet="pageContent">
```

## Vrácení snippetu

Teoreticky pro načtení samotného obsahu AJAXem není potřeba na serveru nic upravovat. Může se v JS stáhnout celá HTML stránka, vybrat z ní potřebný obsah a ten vlepit do stránky původní.

Elegantnější a rychlejší ale je přenášet **jen potřebná data**. Toho se docílí přidáním metody `redrawControl` do presenteru:

```
public function renderDefault() {
  $this->redrawControl('pageContent');
  /* samotné nastavování proměnných pro šablonu */
}
```

Nette potom při AJAXovém požadavku nevypíše celou stránku, ale pouze požadovanou oblast. AJAXový požadavek pozná podle HTTP hlavičky `X-Requested-With`.

Výsledkem bude navíc JSON:

```
{"state":[],"snippets":{"snippet--pageContent":"HTML kód"}}
```

Případně je možné si přímo nastavit, jaká data v JSONu se mají posílat. Potom není vůbec potřeba šablona. Více v dokumentaci:

    - Nette dokumentace: [AJAX &amp; snippety](https://doc.nette.org/cs/2.3/ajax)

## Obsluha odkazu

Zavedenou praxí je odkazům, které mají být obslouženy AJAXem, přidat CSS třídu `.ajax`.

**Nette** přímo v sobě obslužnou funkci pro AJAX neobsahuje.

Je doporučeno použít knihovnu využívající **jQuery**:

    - [nette.ajax.js](https://addons.nette.org/vojtech-dobes/nette-ajax-js)

Tu stačí připojit po jQuery do stránky a inicialisovat pomocí:

```
$(function () {
  $.nette.init();
});
```

Odkazy s třídou `.ajax` by nyní měly být načítány AJAXem.