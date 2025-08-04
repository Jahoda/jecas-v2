---
title: "Odkaz přes celý box"
headline: "Odkaz přes celý box"
description: "Jak udělat, aby celý box s několika prvky byl klikací."
date: "2015-10-18"
last_modification: "2015-10-18"
status: 1
tags: ["CSS", "Hotová řešení", "Odkazy"]
---

Při vytváření [HTML odkazů](/odkaz) se je dobré zamyslet nad správně [velkou plochou](/plocha-odkazu) **aktivní oblasti**.

Ta by neměla být:

  - Příliš **malá**, aby se dobře trefovala kursorem myši i prstem na dotykových zařízeních.

  - Příliš **velká**, aby si uživatel s myší mohl někam *odložit kursor*, kliknutím do volné plochy zrušit otevřenou kontextovou nabídku či si aktivovat neaktivní okno prohlížeče.

**Zájmy uživatelů** na mobilech a desktopech jsou tedy **lehce protichůdné**.

## Bloky v odkazu `&lt;a>`

Blokové elementy v značce `&lt;a>` dlouhá léta fungují a nakonec byly i posvěceny HTML specifikací:

```
&lt;a href="/clanek">
  &lt;img src="clanek.png">
  &lt;h2>Název článku&lt;/h2>
  &lt;p>Popis článku&lt;/p>
&lt;/a>
```

Nejjednodušší způsob, jak **rozklikat celý blok**, je ho obalit odkazem.

Nastaví-li se odkazu `[display: block](/display#block)`, bude klikat po celé ploše místo jen nad jednotlivými elementy.

Má to pár problémů:

  - **Označování textu** v odkazech je ve většině prohlížečů obtížně řešitelné. Je potřeba najet myší nad odkaz, a to není vždy možné (nad odkazem je jiný odkaz apod.)

  - **Styl odkazů** se aplikuje na všechny elementy v bloku. Bude nutné dříve nastavené styly pro odkaz resetovat.

  - **Přepínat chování** mezi dotykovými a nedotykovými zařízeními nejde úplně jednoduše.

## Posicovaný `:before`/`:after`

Zajímavé řešení jsem se dozvěděl od [**Chamurappiho**](http://webylon.info): plochu vytvořit prostřednictvím [absolutně posicovaného](/position#absolute) pseudo-elementu odkazu.

Odkazem bude pouze jeden z prvků:

```
&lt;div class="clanek">
  &lt;img src="clanek.png">
  &lt;h2>
    &lt;a href="/clanek" class="odkaz">Název článku&lt;/a>
  &lt;/h2>
  &lt;p>Popis článku&lt;/p>
&lt;/div>
```

Obalu `.clanek` se přidá relativní posice a `:before` odkazu se umístí přes celou jeho plochu:

```
.clanek {position: relative}
.odkaz:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0
}
```

**Výhody:**

  - Pro rozklikání celé skupiny elementů se nemusí měnit HTML kód.

  - Chování jde snadno přepínat podle šířky obrazovky přes `@media` pravidlo.

  - V případě více odkazů jde tuto plochu vytvořit ze všech odkazů a jen jim měnit prioritu přes `z-index`.

Měla-li by být velká klikací plocha i na nedotykových zařízeních, `:hover` efekt se přidá přímo společnému obalu, který odkaz není.

Možný problém tohoto řešení nastane v případě, že má `position: relative` i něco mezi odkazem a společným obalem, potom nepůjde `:before` umístit potřebným způsobem.

[Živá ukázka](http://kod.djpw.cz/zfrb)

## Řešení v JavaScriptu

Udělat celý blok klikací by šlo snadno i v JavaScriptu přidáním atributu [`onclick`](/udalosti-mysi#onclick) a změnou `window.location`.

```
&lt;div class="clanek" 
  **onclick**="window.location = '/clanek'"
>
  &lt;img src="clanek.png">
  &lt;h2>
    &lt;a href="/clanek" class="odkaz">Název článku&lt;/a>
  &lt;/h2>
  &lt;p>Popis článku&lt;/p>
&lt;/div>
```

Pro odlišné chování na mobilech a desktopech by se musela použít nějaká detekce.