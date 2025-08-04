---
title: "CSS pseudo třída :is()"
headline: "CSS pseudo třída <code>:is()</code>"
description: "Jak v CSS pseudo třída <code>:is()</code> dokáže z(ne)přehlednit styly."
date: "2021-03-16"
last_modification: "2021-03-16"
status: 1
tags: ["CSS", "CSS selektory"]
---

## Zápis

Konstrukce `:is()` může obsahovat jeden nebo více selektorů a slouží k minimalisování opakování se v kódu.

Dříve tato pseudo třída měla ještě jiné názvy:

      [Selektory `:matches` a `:any`](/matches) – historické názvy této pseudo-třídy v roce 2015

Následujícím způsobem jde vybrat všechny [odkazy](/odkaz) a [odstavce](/odstavec) nacházející se v elementu s třídou `element`:

```
.element :is(a, p) {}
```

Téhož by šlo dosáhnout třeba následujícím způsobem:

```
.element a,
.element p {}
```

Pseudo třídu `:is` je možné v selektorech používat na libovolných místech, takže třeba taky:

```
:is(.header, .footer) a {}
```

Výše uvedený selektor zaměří všechny odkazy (`&lt;a>`) v elementech s třídami `header` nebo `footer`.

Není podmínka psát všechny selektory na jeden řádek. Tohle taky funguje:

```
:is(
    .header,
    .footer
) a {}
```

*Starý* zápis by byl:

```
.header a,
.footer a {}
```

Míchat jde i více `:is` v rámci jednoho selektoru:

```
:is(.header, .footer) :is(a, span) {}
```

Toto zaměří všechny odkazy a [`&lt;span>`y](/div-span#span) v elementech s třídami `header` a `footer`.

[Živá ukázka](http://kod.djpw.cz/pzad) – různé pokusy s `:is`

## Využití

Použít `:is` se nabízí v případech, kdy by člověk měl tendenci **psát něco opakovaně**.

Celkem smysluplné použití mi přijde pro [nastavování hoveru a focusu](/focus#automaticky) u odkazů:

```
a:is(:hover, :focus) {}
```

Místo:

```
a:hover,
a:focus {}
```

Na druhou stranu jde vymyslet dost nesrozumitelné konstrukce, takže  všeho s mírou.

## Specificita / síla selektoru

Dost zajímavá *vlastnost* je síla selektoru s `:is`.

Bude-li v HTML kódu odkaz v odstavci a následující styl:

```
p :is(a) { color: yellow; }
p a { color: pink; }
```

Odkaz bude růžový, protože pozdější vyhrává. Změna ale nastane, když se do `is` dostane něco silnějšího, ačkoliv to s původním elementem vůbec nesouvisí – třeba neexistující třída:

```
p :is(a, .nesmyslna-neexistujici-trida) { color: yellow; }
p a { color: pink; }
```

V tomto případě už bude odkaz žlutý, protože třída posílila selektor na prvním řádku.

## Podpora

Kromě **IE 11** celkem dobře podporovaná vlastnost. Ve starších prohlížečích funguje přes klíčové slovo `:any`.

## Řeší to CSS preprocesory

Pokud se na stránce používají preprocesory, využití `:is()` není takové, protože preprocesory už roky nabízí řadu způsobů, jak se opakování vyhnout.

V **SCSS** jde třeba napsat:

```
.element {
  a, p {}
}
```

Nebo:

```
a {
  .header &amp;,
  .footer &amp; {}
}
```