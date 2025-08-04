---
title: "Jak na lepší formuláře"
headline: "Jak na lepší formuláře"
description: "Jak vytvořit lepší formulář, který se bude návštěvníkům dobře vyplňovat."
date: "2014-12-01"
last_modification: "2014-12-01"
status: 0
tags: []
---

Samotné vyplňování formulářů je **nepříjemná záležitost**, proto je dobré tuto nepříjemnou činnost návštěvníkům webových stránek ještě více **neznepříjemňovat**.

O věcech, kterým se vyvarovat, pojednává článek:

    - [20 největších chyb formulářů na webu](/chyby-formularu)

Tento článek se věnuje zlepšování uživatelského zážitku:

## Speciální typy políček

Zvlášť na mobilních zařízeních uživatelé ocení určení typu formulářového políčka [`&lt;input>`](/input). Prohlížeč dotykového zařízení díky tomu dokáže přizpůsobit klávesnici.

Například u políčka `type="email"` zobrazit na klávesnici zavináč, při `type="number"` zobrazit numerickou klávesnici a podobně.

    - [INPUT TYPE SANDBOX](http://inputtypes.com/) – nástroj pro snadné vyzkoušení si různých typů

    - ['Touch Keyboard' Implementations Have Improved Just 9% Since 2013 (60% Still Get it Wrong)](http://baymard.com/blog/mobile-touch-keyboards) – tipy na lepší nastavení klávesnice u dotykových zařízení

## Ať to řeší program

Zásadní myšlenkou je věci, co může řešit **program**, nenutit řešit **uživatele**.

    Nesmí být na začátku nebo konci políčka mezera? Snadno se do políčka dostane třeba při kopírování a jde ji odstranit jedním řádkem kódu funkcí `trim`.

    Je nutné telefonní číslo zadat striktně v určitém formátu?

      - +420 123 456 789

      - 123 456 789

      - 123-456-789

      - 123456789

    Různí uživatelé mohou preferovat různý formát. Případně mohou číslo odněkud zkopírovat. Není přece tak těžké tyto formáty sjednotit.

## Co nejméně políček

Před dokončením nového formuláře se je dobré zamyslet, jestli je skutečně **každé políčko nezbytné**. Zda by se nedalo více políček sloučit do jednoho a podobně.

Proč je **hodně políček problém**?

Psaní do každého políčka představuje minimálně režii pro **přesun do dalšího pole**. Ne každý zná klávesu Tab, bez které je mezi vyplňováním dvou polí nutné sahat na myš pro **přesun kursoru**.

Na **mobilním zařízení** to potom může být ještě horší.

  - kliknutí do políčka,

  - vysune se klávesnice

  - vyplnění políčka,

  - potvrzení,

  - zmizí klávesnice,

  - odrolování na další políčko,

  - kliknutí do políčka…

Menší počet políček znamená **rychlejší** vyplnění formuláře.

### Jedno pole pro jméno a příjmení

Otázka jediného políčka pro **jméno a příjmení** je lehce kontroversní. Zastánci rozdělení argumentují většinou následovně:

  Co když budu chtít **seřadit uživatele podle příjmení**?

  Co když budu chtít uživateli **popřát k svátku**? Má uživatel Václav Havel svátek na Havla, nebo na Václava?

  Jak uživatele **oslovím v e-mailu** jeho vyskloňovaným jménem/příjmením?

  Co když budu chtít jméno vypsat ve tvaru „Jan NOVÁK“ nebo „Novák, Jan“?

Domnívám se, že nic nebrání programátorovi, aby pro takový případ interně **jméno a příjmení** rozdělil podle mezery.

  Jméno a příjmení: 

Může se stát, že část uživatelů příjmení a jméno **prohodí**, ale to už **je jejich boj**. Význam správného pořadí bude v drtivé většině případů zcela **zanedbatelný** oproti komplikaci při vyplňování formuláře.

Další věc, co jediné pole řeší, jsou situace, kdy:

  - člověk má **jen jedno jméno** (co má zadat do dvou povinných políček?),

  - člověk má **více než dvě jména**

### Skrývání nepodstatných částí

Kromě slučování polí je často možné některá pole nebo **celé části formuláře** skrýt. Ideální je zobrazovat pouze **relevantní pole** – pokud například v **internetovém obchodu** zákazník vybere způsob doručení jako **osobní odběr**, je nejspíš zbytečné po něm požadovat jeho domácí **adresu**.

## Nežádat nic navíc

Jistě by bylo zajímavé o uživateli vědět úplně všechno.

## Automatické vyplňování

Při použití rozšířených názvů políček dokáže řada prohlížečů automaticky napovídat tyto zapamatované hodnoty.

## Zobrazení hesla

Maskování hesla pomocí hvězdiček vytváří ilusi bezpečnosti a komplikuje zadávání hesla.

Je proto dobré, když jde heslo přepnout do viditelné podoby. Většina prohlížečů to zatím řešit neumí, takže je jim nutné pomoci JavaScriptem.

Více o maskování hesel v samostatném článku:

    - [Maskování a zobrazování hesla ve formuláři](/maskovani-hesla)

## Průběžné ukládání

Není nic horšího, než když se pracně vyplněná data ztratí. Díky [lokálnímu úložišti](/localstorage) není problém **ukládat úplně každou změnu**, kterou uživatel provedl, a to ihned v okamžiku jejího provedení (napsání znaku, výběru položky).

## Jasná akce

Mělo by být na první pohled jasné, kterým tlačítkem se formulář odešle.

## Opravování e-mailů

Užitečná funkce může být snaha **opravit e-mailové adresy** známých poskytovatelů.

Pokud člověk zadá e-mail ve tvaru `pepa@se**y**nam.cz`, je na 99 % pravděpodobné, že chtěl napsat `pepa@seznam.cz`, ale spletl si QWERTZ a QWRTY rozložení [klávesnice](/ceska-klavesnice).

Příklady **překlepů**.

  - `seynam.cz`

  - `seznm.cz`

  - `sezna.cz`

  - `seznam.com`

  - `sznam.cz`

  - `senam.cz`

  - `szenam.cz`

  - `saznam.cz`

Podívat se na překlepy uživatelů ve vlastním systému je možné **SQL dotazem** typu:

```
SELECT * FROM uzivatele
WHERE `email` NOT LIKE '%seznam.cz%'
AND `email` LIKE '%**znam.**%'
```

Kromě překlepů v názvu domény se vyskytují i **chybné koncovky**.

    Jednak **překlepy**:

      - `domena.cu`

      - `domena.ct`

      - `domena.cy`

    **Změna koncovky** – prohození `cz` za `com` a obráceně.

      - `seznam.com`

      - `google.cz`

      - `hotmail.cz`

V takových případech je proto dobré uživateli **zobrazit hlášku**, jestli nechtěl náhodou napsat **jiný tvar**, která po kliknutí provede změnu.

Kromě lepšího komfortu pro uživatele má tato kontrola další positivum – při rozesílání hromadných mailů se podaří obeslat **více lidí** a hrozí menší risiko penalisace za odesílání zpráv **na neexistující adresy**.

mailcheck.js

### Nejčastější provozovatelé e-mailu

V České republice má nejvíce uživatelů e-mail na adresách:

  - seznam.cz

  - gmail.com

  - centrum.cz

  - email.cz

  - volny.cz

  - azet.sk

  - centrum.sk

  - atlas.cz

  - tiscali.cz

  - post.cz

## Popisky formulářových polí

    - [Odjetí popisku mimo](http://codepen.io/chriscoyier/pen/CiflJ)

    - [Jiné řešení](http://codepen.io/oknoblich/pen/wFGIH)

## Odkazy jinam

  - [Luke Wroblewski Part 2 - Conversions@Google 2014](https://www.youtube.com/watch?v=nmKMz3Fg76M)

  - [10 Methods for Optimizing Your Forms for Mobile Devices](http://speckyboy.com/2015/03/30/10-methods-for-optimizing-your-forms-for-mobile-devices/)

  - [Falling in Love with Forms [Microsoft Edge Web Summit 2015]](http://www.slideshare.net/AaronGustafson/falling-in-love-with-forms-microsoft-edge-web-summit-2015) – presentace obsahující tipy, jak zlepšit formuláře

  - Sitepoint.com: [UX Design for Passwords and Registration Forms](http://www.sitepoint.com/ux-design-passwords-registration-forms/)

  function vypsat(el) {
    var rozdelit = el.value.trim().split(" ");
    var jmeno = rozdelit[0];
    rozdelit.splice(0, 1);
    var prijmeni = rozdelit.join(" ");
    if (prijmeni.length == 0) {
      prijmeni = jmeno;
      jmeno = "";
    }
    jmenoPrijmeni.innerHTML = "Jméno: " + jmeno + "Příjmení: " + prijmeni;
  }