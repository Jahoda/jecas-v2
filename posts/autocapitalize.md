---
title: "Atribut autocapitalize"
headline: "Atribut <code>autocapitalize</code>"
description: "HTML atribut <code>autocapitalize</code> slouží k nastavení automatického přepnutí na velká písmena u dotykových klávesnic."
date: "2015-06-09"
last_modification: "2015-10-03"
status: 1
tags: ["HTML", "Formuláře", "HTML atributy"]
---

**Softwarové dotykové klávesnice** na obrazovce se snaží přizpůsobit kontextu:

U políčka `&lt;input>` tomu může napomoci atribut [`type`](/input#type) – například hodnota `email` přidá na klávesnici zavináč, typ `number` nebo `tel` zajistí číselnou klávesnici a podobně.

    - Nejčastější chyby formulářů: [Zbytečně obecné atributy type](/chyby-formularu#type)

Klávesnice dotykových zařízení se zpravidla **automaticky snaží chytře přepínat na velká písmena**.

HTML atribut `autocapitalize` potom dovoluje mít chování tohoto přepínání plně pod kontrolou.

## Využití

Pokud chce návštěvník například zadat své jméno, **automatické přepnutí na velká písmena** pro první znak ocení.

Stejně tak při odřádkování v [`&lt;textarea>`](/textarea) se zvětšení písmen hodí. Protože nový odstavec nejspíš bude začínat velkým písmenem.

V některých případech, jako je třeba **zadávání hesla**, je ale automatická změna velikosti nežádoucí. Proto je dobré v závislosti na účelu políčka určit optimální chování.

## Zápis

Atribut `autocapitalize` jde použít u 3 HTML značek:

  - `&lt;form>` – nastavení zdědí všechny níže uvedené prvky formuláře,

  - `&lt;input>`,

  - `&lt;textarea>`

Výchozí stav nastane bez uvedení atributu `autocapitalize` – tedy prohlížeč zvětšuje klávesnici dle svého uvážení. To se projevuje zvětšováním prvního písmena ve větě nebo v odstavci u značky `&lt;textarea>`.

Ukázka bez nastaveného `autocapitalize`:

          Input:

          Textarea:

Možné hodnoty atributu:

  `none` – vypnutí zvětšení písmen

    Zrušení automatické změny velikosti je asi nejčastěji používané:

              Input:

              Textarea:

    Někdy se lze setkat se starší podobou pro vypnutí – hodnotou `off`. Ta je označená jako *deprecated* a neměla by se používat. V prohlížečích funguje.

  `sentences`
  
    Klávesnice bude **automaticky zvětšena po ukončení věty**. Tečkou. Vykřičníkem! Otazníkem? Hodnota `sentences` odpovídá výchozímu chování (tj. neuvedení `autocapitalize`).

              Input:

              Textarea:

  `words`
  
    Zvětšení **Po Konci Slova**. Hodí se třeba pro políčko *Jméno a příjmení*, kde se po mezeře automaticky přepne na velká písmena.

    Větší uplatnění najde `autocapitalize="words"` v angličtině, kde se první velká písmena běžně používají u všech slov nadpisů a názvů.

              Input:

              Textarea:

  `characters`
  
    Při použití `autocapitalize="characters"` bude výsledkem KŘIČÍCÍ TEXT, jako by uživatel použil klávesu CapsLock.

    Využití? Možná při **zadávání bezpečnostních kódů**, které jsou celé velkými písmeny. Jinak je většinou UKŘIČENÝ TEXT nežádoucí.

              Input:

              Textarea:

### Hodnoty `on`/`off`

Starší návrhy počítaly u `autocapitalize` s dvěma hodnotami:

  - `on` (výchozí) – automatické zvětšení zapnuté

  - `off` – vypnuté

Novější implementace potom vůbec nepočítá s hodnotou `on`, kterou nedává smysl používat, když jde o výchozí chování.

Hodnota `off` je potom nahrazena za `none`.

  `off` – vypnutí zvětšení písmen

              Input:

              Textarea:

  `on` – zapnutí zvětšení písmen

    Chová se stejně jako bez `autocapitalize` nebo při uvedení `autocapitalize="sentences"`.

              Input:

              Textarea:

## Podpora

  - **Chrome 43+** na **Androidu**

  - **Safari** na **iOS 5+**

  - [**Edge Mobile**](/edge-mobile) ve **Windows Phone** nepodporuje `autocapitalize` vůbec

Podpora v mobilních prohlížečích není úplně 100%, ale to příliš nevadí, protože chytré automatické měnění velikosti nabízených kláves není klíčová vlastnost, ale spíš příjemné vylepšení.

A nakonec se s nepodporou nedá v podstatě nic dělat.

## Odkazy jinam

  - Chrome Platform Status: [autocapitalize](https://www.chromestatus.com/features/4529989986811904)

  - Safari HTML Reference: [autocapitalize](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocapitalize)