---
title: "Jak používat git rebase"
headline: "Jak používat <code>git rebase</code>"
description: "Proč a jak používat git rebase pro přehlednou historii v Gitu."
date: "2020-06-05"
last_modification: "2020-06-05"
status: 0
tags: []
---

Při práci ve více lidech s versovacím nástrojem Git je prakticky nevyhnutelný stav, kdy vývoj probíhá paraelně ve více větvích. V extrémním případě potom ve větvích různě od sebe odvozených.

Např. první *feature branch* odvozená z hlavní `master` větve, ze které vychází další *feature branch*. 

Příkaz `git rebase` (popř. `git merge`) se potom hodí pro synchronisaci větví mezi sebou, aby pořád vycházely z aktuálního *masteru*.

## Merge vs. rebase

Obecně celkem platí, že `git merge` používají dvě skupiny lidí:

  - lidé, co moc nerozumí Gitu,

  - lidé, co neřeší hezkou historii commitů

Hezká historiie souvisí i s vytvářením smysluplných commitů.

## Rebase `onto`