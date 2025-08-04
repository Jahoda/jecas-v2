---
title: "Automatický focus políčka"
headline: "Automatické vybrání políčka po načtení"
description: "Jak a kdy přesunout kursor do textového pole automaticky po načtení stránky."
date: "2015-09-21"
last_modification: "2015-09-24"
status: 1
tags: ["HTML", "JavaScript", "HTML atributy"]
---

Pokud je pravděpodobné, že člověk na stránce **bude chtít něco psát do textového políčka**, jde mu pomoci tím, že se do něj přesune kursor (pole tzv. *dostane focus*).

V JavaScriptu to vypadá následovně:

```
&lt;script>
var policko = document.getElementBy("id-pole");
policko.**focus()**;
&lt;/script>
```

Od **IE 9** funguje ke stejnému účelu přímo HTML atribut [`autofocus`](/input#autofocus):

```
&lt;input **autofocus**>
```

## Možné problémy

### Prodleva

V případě JS řešení by měl být skript přidávající `focus` **co nejblíže políčku**.

Bude-li tento kód v **externím JS souboru** připojeném na konci stránky a třeba ještě obalený do funkce čekající na načtení stránky, může mít nastavení *focusu* **značnou prodlevu**.

V nejhorším případě přijde ve chvíli, kdy ho návštěvník už nepotřebuje a naruší mu procházení stránky.

Tím je výhodný HTML atribut `autofocus`, protože se provede ihned (poznámka: v případě více `autofocus`ů vyhrává ten poslední).

### Zásah do ovládání

Přesouvat kursor do nějakého políčka je docela výrazný zásah uživateli do ovládání webu.

Přidání `focus`u pro nějaký [`&lt;input>`](/input) typicky **zmaří pokus o použití klávesových zkratek**, což je docela otravné.

Klávesové zkratky typu Ctrl + *něco* typicky fungují i s kursorem v políčku, ale třeba rolování po stránce směrovými klávesami ↓ a ↑ už nejspíš fungovat nebude.

Před přidáním `autofocus`/`focus()` je tak dobré pořádně zvážit, jestli je políčko tolik významné a nehrozí moc falešných poplachů, kdy bude přesun kursoru nežádoucí.

Při dobře použitých atributech [`tabindex`](/tabindex) je skok do políčka otázkou jednoho Tabu, což není zase tolik náročné.

## Příklady správného použití

    **Přihlašovací/registrační formulář** na samostatné stránce.

    **Stránka pro vyhledávání**. V případě [Seznamu](/seznam) je situace trochu sporná, protože se jedná zároveň i o portál, kam nemusí každý chodit primárně hledat.

    **Ověřovací heslo/kód** je příkladem úplně typickým. V případě jediného políčka na stránce je přidání automatického focusu logický krok.

## Zobrazení SW klávesnice na mobilech

Na mobilní telefonech a tabletech s dotykovou klávesnicí na obrazovce se po nastavení *focusu* se tato  klávesnice **automaticky nevysune**.

Neexistuje žádná možnost, jak toho docílit bez výslovné akce uživatele. Načtení stránky se za akci uživatele nepovažuje.

Uživatel tak stejně musí *tapnout* do políčka, aby se mu klávesnice zobrazila a mohl začít psát.

Na mobilech tak **automatický focus** nevypadá jako moc šťastné řešení, protože nic **neusnadňuje** a navíc situace s kursorem v políčku bez vysunuté klávesnice **může vypadat jako chyba**.

### Prompt

Jediný způsob, jak v některých mobilních prohlížečích zobrazit klávesnici, je použití `prompt` dotazu. Obrázek z [mobilního Edge](/edge-mobile) ve Windows Phone:

Prompt je ale tak uživatelsky nepřívětivý, že to moc rozumné není.