---
title: "Ověřování inputu pro zadávání URL webu"
headline: "Jak udělat <code>&lt;input></code> pro zadávání adresy webu"
description: "Jak vytvořit políčko pro URL webové stránky a správně ho validovat."
date: "2015-02-13"
last_modification: "2020-03-09"
status: 1
tags: ["Formuláře", "Rady a nápady"]
---

Na webových formulářích je poměrně běžné, že uživatel bude zadávat **adresu webu / URL** do formulářového políčka. I takovou drobnost jde vytvořit špatně, dobře nebo výborně:

## Tolerance různých tvarů

Základem dobrých formulářů je **tolerance k různým stylům zápisu**. Vždy není důvod uživatele nutit do přesného formátu, když si s tím může poradit stroj.

Jak může vypadat taková adresa?

  - `https://www.jecas.cz`

  - `http://www.jecas.cz`

  - `www.jecas.cz`

  - `jecas.cz`

  - `kod.djpw.cz`

Koncovek ([Top level domén](/tld)) je takové množství a průběžně přibývají nové, že je nemá moc smysl kontrolovat. Šlo by sice seznam periodicky stahovat a oproti němu validovat, může ale dojít k nějakému výpadku apod., který by znemožnil zadat validní URL.

Základní **platná adresa stránky** by měla obsahovat:

  - alespoň jeden znak,

  - tečku,

  - dva a více znaků

V doméně může být i diakritika.

### Regulární výraz pro kontrolu domény

Pro nejměkčí kontrolu by doména měla obsahovat dvě „slova“ oddělená tečkou a odpovídat regulárnímu výrazu:

```
\w+\.\w+
```

Vzhledem k tomu, že existují subdomény, měly by se zohlednit:

```
(\w+\.)*\w+\.\w+
```

Tímto regulárním výrazem se vytáhne doména z libovolného vstupu, pokud v něm něco připomínající doménu existuje.

Tolerantní přístup se hodí třeba v případě, že člověk něco odněkud kopíruje a omylem označí i znaky navíc (třeba mezeru nebo konec řádku).

Pro důslednou kontrolu by šlo použít něco jako:

```
^(https?://)?(\w+\.)*\w+\.\w+/?$
```

### Pole `&lt;input type="url">`

V HTML existuje přímo typ [&lt;input>u pro URL](/input#type-url). Z praktického pohledu má ale příliš striktní pravidla (co se týče validace). Hodí se ale hlavně zobrazení [správné softwarové klávesnice](/chyby-formularu#type) na dotykových zařízeních bez klávesnice hardwarové.

## Ověření existence

Pokud je prostor si se zadáváním adresy vyhrát, může se zkusit ověřit její existence.

Třeba serverovým skriptem, který na zadanou URL pošle požadavek a na základě HTTP hlavičky rozhodne (např. v PHP k tomu jde použít funkci `get_headers` nebo CURL).

Tato kontrola by ale **neměla být nezbytná**, aby nezablokovala pokračování ve formuláři v případě, že má stránka zrovna výpadek. Pokud tedy není URL naprosto klíčová položka.

### Zobrazení favicony

Relativně snadný způsob, jak zkusit uživateli dát najevo, že doménu zadal správně, je načtení její [favicony](/favicon). Ta se typicky nachází v umístění:

```
example.com/**favicon.ico**
```

Takže v momentě, kdy obsah políčka vypadá, že by mohl obsahovat doménu, stačí `favicon.ico` vložit jako obrázek.

[Živá ukázka](http://kod.djpw.cz/djkb)

Tento způsob není úplně spolehlivý, protože favicona může být i na jiném umístění. Pro positivní potvrzení se to ale může hodit.