---
title: "Značka <base href>"
headline: "HTML značka <code>&lt;base></code>"
description: "K čemu využít a na co si dát pozor u HTML tagu <code>&lt;base></code>?"
date: "2013-06-18"
last_modification: "2013-06-19"
status: 1
tags: ["HTML", "HTML značky"]
---

Značkou `&lt;base>` spolu s atributem `href` je možné z HTML ovlivnit *vypočítávání* relativních cest odkazů, obrázků, stylů, skriptů a dalších na stránku vkládaných objektů. Přesněji řečeno nastavit jejich začátek. Atributem `target` zase hromadně určuje okno/rám, do kterého se všechny odkazy budou otevírat.
```
&lt;base href='http://jecas.cz' target="_blank">
```

## Zajímavosti a fakta

V Explorerech je nutno umístit do části `&lt;head>`. Jinak se neprojeví.
Odkazy na soubory CSS (`&lt;link href>`) nebo JS (`&lt;script src>`) umístěné před `&lt;base>` se touto značkou nebudou řídit.
Vytvořit odkaz mimo `&lt;base href>` lze jen uvedením protokolu. Ani `/` na začátku `href`u chování nezmění.
Atribut `target` lze na stránce u odkazů *přebít*.

## Kdy má smysl používat?

Zejména pro testování cizích stránek. Stačí si zkopírovat HTML kód, přidat `&lt;base href>` a na kopii stránky se řádně načtou všechny externí objekty. Není tak potřeba přepisovat všechny cesty.
Jinak se ale tato značka moc rozumně využít nedá.

U stránek s redakčním systémem nebývá problém hromadně vytvářet přímo absolutní adresy.
U statických stránek zase přítomnost `&lt;base href>`u způsobí, že web nepůjde přenést jinam bez hromadné úpravy.
Protože se moc běžně nepoužívá, může neznalému člověku vytvořit nečekané a zpočátku nevysvětlitelné chování.