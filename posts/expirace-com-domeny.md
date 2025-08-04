---
title: "Jak probíhá expirace .com domény"
headline: "Expirace <code>.com</code> domény"
description: "Jak dlouho trvá expirace domény s koncovkou .com. Čím se liší od .cz domény."
date: "2017-05-26"
last_modification: "2017-06-11"
status: 1
tags: ["Domény"]
---

- [Expirace CZ domény](/expirace-domeny) – jak je to s expirací české domény

Doba průběhu jednotlivých úseků expirace domény závisí na konkrétním registrátorovi a nelze ji universálně stanovit.

Po expiraci doména zpravidla plnohodnotně funguje ještě cca **30 dní**, kdy je možné ji bez problému prodloužit (doba závisí na registrátorovi).

Po uplynutí této doby se doména dostane do stavu `redemptionPeriod`. V tomto období doména patří stále původnímu vlastníkovi, který ji může prodloužit.

Prodloužení už ale **není zdarma** – cena za obnovení se pohybuje v **řádech tisíců Kč** (cca 200 dolarů). Tato doba trvá **30 dní**.

Pokud v této době stále nedojde k prodloužení, nastává stav `pendingDelete` – ten trvá 5 dní (původní majitel již doménu nemůže prodloužit). Po uplynutí může být doména opět volná k registraci.

## Uvolnění domény

Bohužel na uvolnění domény nejde spoléhat. Zvlášť v případě COM domén existuje hodně subjektů, které se snaží uvolněné domény odchytávat.

Zaniklá doména může mít nějakou návštěvnost, zpětné odkazy nebo hezký název, takže má i nějakou hodnotu – občas převyšující registrační poplatek.

Toto odchytávání probíhá pomocí skriptů automaticky, takže šance na získání domény ručně je prakticky nulová.

Spoléhat se na získání domény po uvolnění **jen za registrační poplatek** v řádu stokorun tak není úplně rozumné.

Získání domény potom může být ještě dražší než v `redemptionPeriod`.

## Průběh expirace

Přibližné časové údaje zachycuje následující tabulka:

    Stav
    Den
    Prodloužení

    `Expiration Date`0.–30.možné

    `redemptionPeriod`30.–60.možné s poplatkem

    `pendingDelete`60.–65.nelze

    volná k registraci66.nová registrace (teoreticky)

Prodlužovat COM domény je tak lepší spíš dříve než později (nejpozději ještě v *Expiration Date*).

## Odkazy jinam

  - ICANN: [EPP Status Codes | What Do They Mean, and Why Should I Know?](https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en) – popis stavů COM domén