---
title: "Správce hesel"
headline: "Správce hesel"
description: "Správce hesel je program, který uchovává hesla ke více službám."
date: "2015-11-10"
last_modification: "2015-11-10"
status: 0
tags: []
---

Ukládání hesel je složité téma, různí lidé preferují různé postupy.

## Správce hesel

Na zařízeních, kde člověk není přihlášen do svého správce hesel, je velmi obtížné se přihlásit.

To je docela problém na mobilech, kde řada prohlížečů nepodporuje rozšíření, takže není možnost, jak by správce hesel mohl pohodlně hesla vyplňovat.

Taktéž u cizího počítače je komplikované se přihlásit, protože si člověk hesla vygenerované password managerem nepamatuje. Pro přihlášení se k dané službě je tak nutné se nejprve přihlásit do správce hesel.

### Zapomenutí master hesla

Vzhledem k tomu, že pro pohodlí si člověk nejspíš zapne automatické přihlašování (aby nemusel při každém spuštění prohlížeče zadávat heslo do password managera), může se snadno stát, že heslo zapomene.

Nepoužívání hesla typicky k zapomenutí vede.

Například **LastPass** účet není možné obnovit pomocí e-mailu.

## Bezpečnostní otázka

Značný bezpečnostní problém představují tzv. *bezpečnostní otázky*.

## Bezpečnost určuje nejslabší místo

## Přihlašování přes Facebook

Problém s pamatováním si hesel jde omezit používáním přihlašování přes služby jako je Facebook. Twitter, Google účet a podobně.

Při přihlašování přes služby třetích stran je nutné mít tyto účty chráněny silným unikátním heslem a vícefaktorovou autentisací, protože jejich získání nepovolanou osobou by jí zajistilo přístup do spousty dalších služeb.

Ve všech aplikacích, které se pro přihlašování běžně používají, je dobré mít vytvořen účet pro **zablokování vlastní e-mailové adresy**.

Špatně napsaná aplikace totiž může automaticky propojovat účty na základě e-mailu. Útočníkovi potom stačí, aby si cizí e-mail zaregistroval u služby poskytující přihlášení a špatně napsaná aplikace ho na základě e-mailu klidně spáruje.

## Stejné heslo pro více služeb

Prakticky v každých bezpečnostních doporučeních se doporučuje **nepoužívat stejné heslo** pro více služeb.

Problém je totiž v tom, že provozovateli webové služby není rozumné věřit, že správně ukládá hesla. Je tak dobré počítat s tím, že heslo použité ve webové službě může být někým získáno v **čitelné podobě**.

### Řešení

    **Správce hesel** – dokáže náhodně generovat a uložit pro přihlášení heslo pro každou službu zvlášť.

    **Smířit se s tím** – pro méně podstatné účty (například registrace v nějakém diskusním fóru) nemusí být problém, když k nim někdo heslo získá.

    **Upravené heslo** – bez správce hesel je celkem kompromis používat klidně stejné základní heslo pro více služeb, které se se upraví podle nějakého daného klíče na základě domény, kam se člověk přihlašuje.

    **Příklad**: Výchozí heslo bude `fytopuf`. Tajné pravidlo bude například takové, že po dvou znacích hesla se vloží první dva znaky z domény a zbytek se přidá na konec. Pro přihlášení se na `jecas.cz` tak vznikne heslo `fyjetopufcas`, při přihlášení na `twitter.com` potom `fytwopufitter`.

    Stačí si tak pamatovat jen jedno heslo a jedno pravidlo a není problém mít na desítkách služeb různá hesla, která dokáže člověk zadat z hlavy.

## E-mail

Typicky nejdůležitější místo je e-mail. U většiny účtů slouží e-mailová schránka pro zaslání odkazu pro **obnovení hesla**.

Z toho plyne, že heslo do e-mailu by mělo být hodně silné a unikátní.

## Odkazy jinam

  - Michal Altair Valášek: [Moji hlavu nikdo nehackne. Jak se zabezpečují amatéři a jak profíci?](http://tech.ihned.cz/geekosfera/c1-64840580-kyberneticka-bezpecnost-amateri-vs-profesionalove)