---
title: "Musí být web validní?"
headline: "Musí být web validní?"
description: "Je nutné, aby byl HTML kód stránky validní? Vliv (ne)validního kódu na SEO."
date: "2015-07-24"
last_modification: "2016-01-31"
status: 1
tags: ["HTML", "SEO", "Rady a nápady"]
---

Někdy kolem roku 2005 bylo hodně populární mít **web validní** a pochlubit se o tom prostřednictvím ikonek.

Tyto ikony odkazovaly na validátor – nástroj pro kontrolu, zda je stránka validní.

    - [Český validátor HTML](http://validator.webylon.info/) (neoficiální validátor od **Chamurappiho**)

    - [ Markup Validation Service](https://validator.w3.org/) (oficiální HTML validátor)

    - [CSS Validation Service](https://jigsaw.w3.org/css-validator/) (validátor CSS)

Vzhledem k tomu, že HTML a CSS jsou **velmi tolerantní k chybám** (tj. i nevalidní web se zpravidla bez vážných potíží zobrazí), někteří tvůrci webů se kdysi validitou svých stránek snažili odlišit od amatérů, pro které byla zelená hláška z validátoru těžko dosažitelná.

Jelikož informace o validitě stránky návštěvníky obvykle nezajímají, zbytečné ikonky odkazující na validátor z internetu pomalu mizí. A to je dobře.

## Verse (X)HTML

V dřívější době bylo běžné rozlišovat pro účely validování různé verse HTML, které se stanovovaly prostřednictvím značky [`&lt;!doctype>`](/doctype) na začátku kódu stránky.

Vzhledem k tomu, že prohlížeče nikdy různé verse HTML nerozlišovaly, od jejich uvádění se upustilo a jako *doctype* se uvádí prosté:

```
&lt;!doctype html>
```

Uvádět tento `&lt;!doctype>` se hodí zejména pro starší prohlížeče, kde slouží pro zapnutí standardního režimu.

### XHTML

Příznivci maximálně přísných pravidel dříve dokonce psali v XHTML. To se od HTML syntaxe liší hlavně ve 2 věcech:

    **XHTML značky** musí být psány malými písmeny a být uzavřené. I takové, které mají v HTML uzavírací značku [volitelnou](/html-znacky#koncova-volitelna) – třeba [`&lt;p>`](/odstavec) nebo [`&lt;li>`](/seznamy#li).

    Značky bez obsahu (např. `&lt;img>` nebo [`&lt;input>`](/input)) se uzavírají pomocí lomítka:

    ```
&lt;input name="policko"** />**
```

    **XHTML atributy** musejí mít uvedenu svou hodnotu v uvozovkách. Atributy, které jsou sami o sobě hodnotou, se v XHTML potom musí psát jako `atribut="atribut"`:

    ```
&lt;input required="required">
```

Tento zápis jde (volitelně) použít i v HTML, ale v XHTML je povinný.

Dokument splňující tato pravidla je potom možné parsovat jako XML.

V praxi se parsování XHTML pomocí XML parseru ale prakticky vůbec neuchytilo, protože:

    Jakákoliv chyba v XHTML způsobila nenačtení stránky. To se kromě chyby autora nebo zásahem do kódu ze strany provozovatele připojení mohlo stát i v případě, že se nestáhl celý XHTML kód. Nekompletní stránka je v X(HT)ML nevalidní, protože nemá uzavřené některé značky.

    I špatné zobrazení stránky bývá obvykle lepší než zobrazení žádné.

    Kvůli nutnosti zpracování stránky XML parserem se muselo před vykreslováním čekat na stažení celé stránky, aby šlo jasně určit, že je v pořádku.

    Některé vyhledávače měly problém s indexováním [XHTML stránek](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=13&amp;topic=33775).

    V té době rozšířený **Internet Explorer 6** si s běžnou XHTML stránkou neporadil.

Kvůli těmto problémům se drtivá většina XHTML stránek neposílala s odpovídající hlavičkou:

```
Content-Type: application/xhtml+xml
```

Ale stejně jako běžné HTML stránky s typem `text/html`. Prohlížeče tyto rádoby XHTML weby potom zpracovávaly stejně jako obyčejné HTML. Kvůli nekompatibilitě HTML a XHTML se tyto „XHTML“ stránky potom zpracovávaly jako *HTML s chybami*, s kterými si ale prohlížeče poradily.

## Musí být web validní?

  Nemusí.

Validátor je ale celkem užitečný nástroj pro odhalení případných chyb, které by mohly dělat problémy. Problematické je zejména špatné zanoření značek nebo zapomenutí uzavíracího tagu:

    - [Jak najít neuzavřenou značku?](/neukoncena-znacka)

Ideální je používat HTML linter – nástroj pro okamžité zobrazování případných problémů rovnou v editoru. Existuje přímo [plugin do Sublime Text](/pluginy-sublime-text#linter).

Chyby v HTML jde tak odhalit ihned po jejich vytvoření.

## Validní web a SEO

Některé SEO příručky doporučují, aby HTML kód stránky byl validní.

Rozhodně nelze obecně tvrdit, že by validita stránky byla významným prvkem v hodnocení stránek vyhledávači. Záleží ale na typu prohřešku proti validátoru, který web obsahuje.

Nesprávně zanořené/ukončené značky mohou vést k špatnému zobrazení stránky a potažmo špatnému pochopení ze strany robota vyhledávače.

Při pouhém použití třeba neznámého atributu, je ale risiko minimální.

Podle vyjádření z [Google](/google) může nevalidní kód způsobit špatné pochopení strukturovaných dat:

  - [Google: Bad HTML Validation Doesn't Hurt Rankings But Can Impact Structured Data](https://www.seroundtable.com/google-html-validation-20633.html) – nevalidní stránka nepoškozuje umístění ve vyhledávači

  - [Google: Valid HTML Not Required For Ranking But Can Hurt Structured Data &amp; Mobile Friendliness](https://www.seroundtable.com/google-invalid-html-concern-21556.html)

## Validní CSS

Zatímco dosáhnout validního HTML nemusí být úplně problém, u CSS je to prakticky nemožné, chce-li člověk používat novější konstrukce nebo nestandardní postupy zlepšující chování v některých prohlížečích.