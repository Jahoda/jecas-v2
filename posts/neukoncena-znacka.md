---
title: "Jak najít neukončenou značku?"
headline: "Jak najít neuzavřenou značku?"
description: "Neuzavřená HTML značka může způsobovat problémy. Jak ji najít?"
date: "2015-11-04"
last_modification: "2015-11-06"
status: 1
tags: ["HTML", "Rady a nápady"]
---

**Špatně uzavřené značky** je jedna z mála věcí, ke které se hodí použít validátor:

    - [Český validátor](http://validator.webylon.info/)

    - [Validator.nu (X)HTML5 Validator](https://html5.validator.nu/)

Elementy neuzavřené nebo uzavřené jinak, než je cílem, mohou způsobovat **špatné zobrazení**.

V případě nevysvětlitelných problémů s CSS je proto dobré zkontrolovat výsledné HTML validátorem.

Případně mít takovou kontrolu přímo v editoru (nazývá se to *linter*):

[Živá ukázka](http://kod.djpw.cz/bwrb) s neukončeným `&lt;div>`em

## Hledání neuzavřené značky

Validátor sice problém odhalí, ale **konkrétní místo neprozradí**. Nemá moc jak, protože neví, kde je cílem, aby ukončovací značka byla.

Že je se zanořením problém, jde zjistit ve [vývojářských nástrojích](/vyvojarske-nastroje) zkoumáním [DOMu](/dom):

Element `div.paticka` je uvnitř `div.stranka`, protože není uzavřený `div.popis`.

U dlouhého kódu se neuzavřená značka hledá dost těžko. A nezbývá než to dělat **ručně**.

V praxi se mi nejvíc osvědčil postup, kdy se kód bere po velkých blocích a jednotlivé bloky se testují samostatně. Tak jde vylučovací metodou celkem rychle najít problém.

## Předcházení neuzavřeným značkám

Protože se špatně uzavřené značky obtížně hledají, je dobré jim předcházet:

    **Linter** v editoru dokáže problém odhalit hned po jeho vzniku. Při jeho používání by se tak problém nikdy neměl stát.

    Do **Sublime Text** k tomu slouží [plugin](/pluginy-sublime-text#linter) (nejen pro HTML).

    **HTML komentář** za koncovou značkou může značně pomoci.

    ```
&lt;div class="header">
  …
&lt;/div>&lt;!-- /.header -->
```

    S nástrojem [Emmet](/emmet#komentar) v editoru [Sublime Text](/st) to jde dělat automaticky.

    **Dělit HTML soubory** – tento postup je dobrý při používání šablonovacího systému. Výsledné HTML se potom sestavuje z více malých souborů.

    Při tomto postupu je zásadní, aby v rámci jednoho souboru bylo vždy vše otevřeno a uzavřeno. Jinak bude odhalování chyb ještě těžší.