---
title: "Kontrola pravopisu v Sublime Text"
headline: "Kontrola pravopisu v Sublime Text"
description: "Jak přidat českou kontrolu pravopisu do editoru Sublime Text."
date: "2015-07-06"
last_modification: "2015-07-07"
status: 1
tags: ["Produktivita", "Sublime Text"]
---

Při psaní textů je velmi vhodné **používat kontrolu pravopisu**. Nástroj, který by zaručil 100% gramaticky správných text v českém jazyce, sice neexistuje, použitím automatické kontroly pravopisu jde ale alespoň **zabránit překlepům**.

Kontrolovat pravopis je možné i v editoru [Sublime Text](/st), který se obvykle používá především pro programování.

## Přidání české kontroly

Sublime Text má v základu **pouze anglický slovník**. Pro kontrolu pravopisu se využívá nástroj [Hunspell](http://hunspell.sourceforge.net/). Pro češtinu je tedy nutné stáhnout *slovník*, který je s Hunspellem kompatibilní.

Vhodný český slovník jde najít na více zdrojích. Může být ale problém s kódováním, kdy Sublime Text považuje za neznámá všechna **slova s diakritikou**.

    - [Hunspell UTF8 dictionaries](https://github.com/titoBouzout/Dictionaries) – obsahuje řadu slovníku včetně českého ve správném kódování

České slovníky jde pro Hunspell získat i z dalších umístění. Bohužel mi v Sublime Text 2 správně nefungují právě u slov s diakritikou.

    - [hunspell-cs](https://aur.archlinux.org/packages/hunspell-cs/)

    - [Czech dictionary pack](http://extensions.services.openoffice.org/en/project/dict-cs) – rozšíření pro OpenOffice

### Kam soubory umístit

Soubory se slovníky je nutné zkopírovat do složky *Packages*. Tu jde otevřít ze Sublime Text z nabídky *Preferences* → *Browse Packages…*

Ve Windows se nachází většinou v umístění:

```
C:\Users\**Jméno**\AppData\Roaming\Sublime Text 2\Packages
```

Zde je vhodné vytvořit složku s názvem např. `Language - Czech` a vložit do ní soubory s příponou `*.dic` a `*.aff`.

### Přepnutí na české slovníky

Následně je nutné přenastavit slovníky z angličtiny na češtinu. To jde udělat v nastavení *Preferences → Settings – Default*.

```
// Word list to use for spell checking
//"dictionary": "Packages/Language - English/en_US.dic",
"dictionary": "Packages/Language - Czech/Czech.dic",
```

## Zapnutí kontroly pravopisu

Zvýrazňování slov, které obsahují překlep/chybu, jde přepínat klávesou F6.

Výchozí stav jde přednastavit rovněž v nastavení:

```
// Set to true to turn spell checking on by default
"spell_check": **true**,
```

## Problémy a nedostatky

Kontrola pravopisu není v Sublime Text úplně dokonalá. Hlavně má problémy s **určením hranice slov**. Takže používání českých uvozovek, trojtečky nebo lomítka mezi slovy vede k tomu, že bude slovo označené jako neznámé.

## Odkazy jinam

  - Dokumentace Sublime Text: [Spell Checking](https://www.sublimetext.com/docs/2/spell_checking.html)