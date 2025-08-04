---
title: "Odkaz pro poslání SMS"
headline: "Odkaz pro předvyplnění SMS"
description: "Jak dát na stránku odkaz, který na mobilech předvyplní číslo a text SMS."
date: "2016-04-01"
last_modification: "2016-04-05"
status: 1
tags: ["Hotová řešení", "Responsivní design", "Odkazy"]
---

Návštěvníkům přistupujícím na web z mobilu je možné usnadnit používání některých funkcí jejich telefonu. Třeba po kliknutí na odkaz spustit telefonní aplikaci s předvyplněným číslem:

```
&lt;a href="tel:123456789">
  Zavolejte nám
&lt;a>
```

    Zavolejte nám

Kromě telefonního čísla jde připravit i **textovou zprávu** (SMS). Podpora je ale nižší.

Možností vytočit telefonní číslo prostřednictvím HTML odkazu popisuje podrobně následující článek:

  - Vzhůru dolů: [Kompletní průvodce odkazy na telefonní čísla](http://www.vzhurudolu.cz/blog/57-href-tel)

## Odkaz pro SMS

Samotné spuštění aplikace pro SMS a předvyplnění telefonního čísla funguje relativně slušně napříč prohlížeči. Problém je ale s předvyplněním textu zprávy, kde se situace značně liší.

### iOS

U mobilních operačních systémů od Apple iOS 8 a 9 funguje zápis textu zprávy pomocí `&amp;body=` za telefonním číslem:

```
&lt;a href="sms:+420123456789**&amp;amp;**body=Text zprávy">
  Poslat SMS
&lt;/a>
```

    Poslat SMS „text zprávy“ na 123456789

V iOS 7 není podle všeho možné text zprávy předvyplnit.

V iOS 5 a 6 by měl fungovat středník:

```
&lt;a href="sms:+420123456789**;**body=Text zprávy">
  Poslat SMS
&lt;/a>
```

    Poslat SMS „text zprávy“ na 123456789

### Android

U **Androidu** funguje pro změnu zápis s otazníkem:

```
&lt;a href="sms:+420123456789**?**body=Text zprávy">
  Poslat SMS
&lt;/a>
```

    Poslat SMS „text zprávy“ na 123456789

V případě úspěchu by se mělo číslo i text zprávy řádně vyplnit:

### Mobilní Windows 10

V mobilním **Windows 10** zřejmě nejde vůbec použít `sms:`. Tento pseudo-protokol systém nezná a po kliknutí na daný odkaz akorát nabídne hledání příslušné aplikace v obchodu.

## Řešení

Vzhledem k odlišnému zápisu textu zprávy napříč operačními systémy je nejspíš nutné použít detekci zařízení a různým systémům naservírovat jiný obsah.

Zápis textu zprávy za otazníkem/ampersandem není kompatibilní – v systémech, které druhý způsob neznají, dojde k zadání neplatného kontaktu.

Pokus s `&amp;` skončí na **Androidu** takto:

U **iOS** zase zápis s otazníkem:

### Jen telefon

Dobře podporovaná možnost je vyplnit pouze číslo bez textu zprávy. To funguje prakticky všude mimo mobilní **Windows**.

```
&lt;a href="sms:+420123456789">
  Poslat SMS
&lt;/a>
```

    Poslat SMS na 123456789

### Risiko nefunkčnosti

K úvaze je, jestli případná nefunkčnost byť u malého počtu návštěvníků mimo **iOS** a **Android** není dost dramatická.

Třeba v mobilních **Windows** se po kliknutí na odkaz zobrazí následující hláška, která může návštěvníka nenávratně odvést ze stránky pryč.

Stejně tak u desktopových/tabletových prohlížečů nebude v drtivé většině případů odkaz na SMS fungovat – příklad z desktopového **Firefoxu**:

Bezpečnější tak nejspíš bude odkaz pro předvyplnění SMS přidávat na stránku až na základě detekce pro konkrétní zařízení.

## Odkazy jinam

  - [Samostatná živá ukázka](http://kod.djpw.cz/kxvb) – test různých způsobů