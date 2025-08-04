---
title: "Datum v patičce"
headline: "Datum v patičce"
description: "Jaké datum uvádět v patičce a jak automaticky zajistit, aby bylo aktuální."
date: "2015-01-05"
last_modification: "2016-01-07"
status: 1
tags: ["Rady a nápady"]
---

Na webových stránkách bývá zvykem, že na konci stránky v patičce bývá mj. uvedené **datum**.

Otázka je, co by mělo **datum symbolisovat**, napříč internetem se je možné setkat s různými způsoby:

  - aktuální rok,

  - datum vzniku webu,

  - rozsah mezi rokem založení a aktuální,

  - datum poslední aktualisace

## Aktuální rok

Zobrazení **aktuálního roku** používá řada populárních služeb. Je trochu k úvaze k čemu je taková informace dobrá.

Smysl asi má, že aktuální datum značí, že je **webová stránka aktuální**, což může být trochu *podvod* v případě, že se letopočet mění automaticky.

    [Facebook](/facebook)

    [Twitter](/twitter)

    [Google Analytics](/ga)

    Outlook.com od Microsoftu

## Rozsah od–do

Další rozšířeným typem je použití rozsahu let, kdy je webová stránka funkční. Stáří stránky může zvýšit její **důvěryhodnost** a předat návštěvníkovi informaci, kdy byl web založen.

Rozsah dvou letopočtů se typograficky správně píše s **–pomlčkou–** (nikoliv se -spojovníkem-) a **bez mezer**:

  2013&ndash;2016

[Pomlčka](/ceska-klavesnice#kody) se zapíše **HTML entitami** `&amp;ndash;` (krátká) nebo `&amp;mdash;` (dlouhá).

Příklad stránek používající rozsah:

    [Seznam](/seznam)

    [Disqus](http://disqus.com)

## Datum poslední aktualisace

Z pohledu návštěvníka asi nejužitečnější informace. U článků ale typicky bývá datum vytvoření nebo poslední změny uveden už výše, takže ta samá informace v patičce může být **duplicitní**.

    Wikipedie

    [Jak psát web](http://jakpsatweb.cz) – značí update celého webu

## Automatická změna

Pokud je cílem zobrazovat v patičce aktuální rok, jde to zajistit automaticky.

V **PHP**:

```
&lt;?php echo date("Y");?>
```

Finální použití může vypadat třeba takto:

```
&lt;p>
  2013&amp;ndash;&lt;?=date("Y")?>
&lt;/p>
```

Při použití Nette a šablonovacího systému **Latte** se aktuální rok vypíše pomocí:

```
{date("Y")}
```

V **JavaScriptu** je aktuální rok dostupný přes:

```
var rok = new Date().getFullYear();
```

Jak už bylo naznačeno dříve, v případě neaktualisovaného (opuštěného) webu to pro návštěvníky vytvoří **klamný dojem**.

Pro *nejférovější* automatickou změnu se tak nabízí používat rok **poslední změny obsahu**, který by rovněž mělo být možné získat automaticky.