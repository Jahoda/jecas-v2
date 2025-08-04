---
title: "Pořadí private a public metod"
headline: "Pořadí <code>private</code> a <code>public</code> metod"
description: "Má smysl nějak řadit <code>private</code> a <code>public</code> metody?"
date: "2020-01-09"
last_modification: "2020-01-09"
status: 0
tags: []
---

Při psaní kódu je vhodné se držet nějakého *jednotného stylu* (zvlášť v případě, kdy se na něm podílí vícero autorů). K tomu patří i předvídatelné pořadí privátních a veřejných metod.

Nejčastěji se lze setkat s těmito postupy:

    Související metody u sebe.

    Nejdřív `public`, potom `private`.

    Náhodné pořadí.

Hlavní argument pro **řazení** `public` → `private` je v tom, že při pohledu do třídy je jasnější, jaké metody nabízí směrem *ven*, aniž by se člověk musel prokousávat hromadou vnitřní logiky v *private* metodách.

Další výhoda je v možnosti vyžadování tohoto pravidla automatickým nástrojem. Lze tak zabránit, aby se špatně seřazený kód dostal do hlavní větve aplikace.

Výhoda **souvisejících metod u sebe** je zase v lepší čitelnosti při psaní a upravování třídy (související kód je blízko u sebe). Odpadá tím i situace, kdy se kvůli změně z public na private nebo obráceně musí přesouvat metody napříč souborem. Čímž se znehodnocuje historie v Gitu.

Při použití vhodného IDE, např. PhpStormu, je potom řazení poměrně zbytečné, protože ho dokáže vyřešit sám editor. V přehledu **struktury** souboru (klávesová zkratka Alt + 7) jde zobrazit všechny metody dané třídy a řadit je dle *viditelnosti*:

**Náhodnému řazení** je potom dobré se vyhnout, protože snižuje dobrou čitelnost kódu. Proto je dobré dát přednost konsistenci.

Volba mezi řazením *public* → *private* a seskupování souvisejících metod bez ohledu na viditelnost potom není úplně jednoznačná. Oboje má své výhody i nevýhody a je třeba je zvážit podle aktuální situace.