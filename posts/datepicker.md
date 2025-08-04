---
title: "Jak zadávat datum?"
headline: "Zadávání kalendářního data"
description: "Pohodlné zadávání kalendářního data ve formulářích."
date: "2014-07-21"
last_modification: "2018-12-24"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře", "Datum"]
---

U webových aplikacích je často nutné nechat uživateli **vyplnit datum a čas**.

(Jazyková vsuvka: správně se píše datum bez data, nikoliv bez **datumu**.)

Jedna možnost je dát na stránku prostý [`&lt;input>`](/input) a ten *nějak* předvyplnit, aby návštěvník odhadl formát (buď přímo `value`, nebo [`placeholder`](/placeholder)).

  Zadejte datum: 

Případně příklad uvést jako popisek políčka.

        Zadejte datum

        *Například 23. 7. 2014*

Pohodlnější ale nejspíš bude umožnit **výběr z kalendáře**.

## Výběr z kalendáře

Nabídnout kalendář po kliknutí do pole umí přímo prakticky všechny prohlížeče (včetně mobilních) pomocí `&lt;input type=date>`.

  Zadejte datum: 

Takto by to mělo vypadat v **Chrome**:

Na desktopu je to ale spíš nouzové řešení. Kvalitní pole s kalendářem by se mělo chovat **inteligentněji**.

    Umožnit kompletně **ruční zadání**. Pro výběr data hodně vzdáleného od aktuální posice kalendáře, bude snazší datum vyťukat. Pro dny blízké aktuálnímu se zase nabízí mít zrychlené volby jako *zítra*, *za X dní*, *za týden* a podobně.

    **Kopírování data do pole** ze schránky je další věc, co je hezké, když funguje.

    S předchozími body souvisí **tolerance k různým zápisům**.

    To je sice občas problém a neřešitelný rébus.

      - Je „14-2-13“ 14. únor 2013, nebo 13. únor 2014?

      - Je „10/2/2014“ 10. únor 2014, nebo 2. říjen 2014?

    Akceptovat ale zápisy „5. 10. 2014“, „05.10.2014“ i **typograficky chybný** „5.10.2014“ by měla [být povinnost](/chyby-formularu#netolerance-znaku).

    Diskutabilní je **tvar data**, který si prohlížeč řídí po svém. To je na jednu stranu výhoda. Formát data se teoreticky může přizpůsobovat **prostředí uživatele**. Na druhou stranu není možné dosáhnout tvaru „D. M. YYYY“, který se obvykle používá v **českém prostředí**. Takovou hodnotu `value` prohlížeč nepřechroupe.

### Mobilní zařízení

Výše uvedené platí hlavně pro **desktopové prohlížeče**. U mobilů zvláštní typ `&lt;input>`u přináší značné benefity.

Nativní kalendář typicky bude lépe **ovladatelný prsty** a hlavně bude uživatelům důvěrně známý z operačního systému.

## Hotové řešení

Seznam některých populárních a dobře funkčních *datepickerů*:

    [flatpickr](https://flatpickr.js.org) – asi nejlepší skript bez závislosti na **jQuery**

Ten dokáže právě fungovat tak, že se na mobilech přepíná do nativního prvku. Podporuje prakticky všechno, co je potřeba.

      [Pikaday](https://github.com/Pikaday/Pikaday) – relativně populární (nezávislý na jQuery)

      [Vanilla datepicker](https://github.com/xylphid/vanilla.datepicker)

      [Rome](https://github.com/bevacqua/rome) ([demo](http://bevacqua.github.io/rome/))

[Samostatná zjednodušená ukázka](http://kod.djpw.cz/coeb)

## Odkazy jinam

  - [13 Free and Premium JavaScript / jQuery Calendars](http://designmodo.com/javascript-calendars/)