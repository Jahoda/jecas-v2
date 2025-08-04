---
title: "HTML <time>"
headline: "HTML značka <code>&lt;time></code>"
description: "HTML element <code>&lt;time></code>. Jak a proč ho použít na stránce."
date: "2014-07-01"
last_modification: "2014-09-17"
status: 1
tags: ["HTML", "HTML značky", "Datum"]
---

Pro vyznačení, co na stránce je **datum**, **čas** nebo **časový úsek**, byla zavedena HTML značka `&lt;time>`.

Z pohledu **prohlížečů** jde o řádkový [povinně párový tag](/html-znacky#povinne), který se nevyznačuje výrazně speciálním chováním, tudíž nemá skoro smysl řešit jeho funkčnost v prohlížečích (kromě **IE 8**, kde [nepůjde stylovat](/vlastni-html-znacky#html5)).

Z pohledu **návštěvníka** se použití `&lt;time>` prakticky neliší od neutrální řádkové značky `&lt;span>`.

Využitelná je tedy tato značka zejména pro **strojové zpracování**.

## Zápis

```
&lt;time>
  17. září 2014
&lt;/time>
```

Protože výše uvedenému **českému formátu data** by nemusel *stroj* porozumět (i když například [Google](/google) s tím nemá problém), existuje atribut `datetime`.

```
&lt;time **datetime**="2014-09-17">
  17. září 2014
&lt;/time>
```

## Atribut `datetime`

Do atributu pro strojově zpracovatelný datum/čas je potom možné zadávat *různé věci*. V zásadě jde použít totéž, co u [&lt;input>ů pro čas/datum](/input#type-date).

Co se týče data, nejdelší použitelný zápis je:

  code.vysvetleni span {position: relative; border: 1px solid transparent; cursor: pointer}
  code.vysvetleni span:hover, code.vysvetleni span:focus {background: #ccc; border: 1px dotted #666}
  code.vysvetleni span:focus:after {content: attr(title); position: absolute; top: -2em; left: 0; background: #666; color: #fff; padding: 0 .3em}

```
2014-09-31T23:59:59+02:00
```

*(pro vysvětlení klikněte na libovolnou část řetězce)*

Z toho jde potom **zjednodušováním** vytvořit datum s časem bez časového pásma, samotný čas, samotný datum, samotný rok a měsíc nebo jen rok a podobně.

Zvláštní případ je potom určení týdne v roce:

```
2014-W23
```

### Doba trvání

Nakonec jde do `datetime` zadat i dobu trvání. Ta může najít uplatnění třeba u znázornění **délky videa** nebo jiné doby trvání:

```
&lt;time datetime="4d 3m 10s">
  4 dny, 3 minuty a 10 vteřin
&lt;/time>
```

Výše uvedený příklad by znázorňoval dobu trvání 4 dny (`4d`), 3 minuty (`3m`) a 10 vteřin (`10s`).

Ještě existuje druhý způsob zápisu:

```
P 4D T 3M 10S
```

Mezery mezi jednotlivými částmi **jsou volitelné**.

## Využití

Kromě **sémantického výzamu** a teoreticky lepší **strojové čitelnosti** nejsou moc důvody element `&lt;time>` používat.

**Vyhledávače** si z historických důvodů musí poradit i s prostým uvedením data mimo značku `&lt;time>`, navíc v případě Google jde oblast s datem na stránce přímo vyznačit v **Google Webmaster Tools** (*Vzhled vyhledávání* → *Zvýrazňovač dat*).

Z pohledu JavaScriptového API značky `&lt;time>` také není nic moc k disposici, kromě vlastnosti `dateTime` pro práci s atributem `datetime`.

## Potenciál

Potenciál značka `&lt;time>` ale možná má. Dají se představit případy užití, kdy by kombinaci s chytrým prohlížečem / operačním systémem mohla nabídnout něco víc. Třeba nabízet na základě hodnoty v `&lt;time>` **vytvoření události** v kalendáři, na základě doby trvání třeba připravit **zapnutí odpočítávání** a podobně.

## Odkazy jinam

  - DevDocs: [`&lt;time>`](http://devdocs.io/html/element/time)

  - [Specifikace na W3C](http://www.w3.org/TR/html5/grouping-content.html#the-time-element)

  - [Dates, Time, Units and Events](http://thenewcode.com/5/Web-Developer-Reading-List-Dates-Time-Units-and-Events)