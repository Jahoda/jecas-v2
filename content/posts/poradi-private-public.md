---
title: "Pořadí private a public metod"
headline: "Pořadí <code>private</code> a <code>public</code> metod"
description: "Má smysl nějak řadit <code>private</code> a <code>public</code> metody?"
date: "2020-01-09"
last_modification: "2020-01-09"
status: 0
tags: []
format: "html"
---

<p>Při psaní kódu je vhodné se držet nějakého <i>jednotného stylu</i> (zvlášť v případě, kdy se na něm podílí vícero autorů). K tomu patří i předvídatelné pořadí privátních a veřejných metod.</p>

<p>Nejčastěji se lze setkat s těmito postupy:</p>

<ol>
  <li>
    <p>Související metody u sebe.</p>
  </li>
  <li>
    <p>Nejdřív <code>public</code>, potom <code>private</code>.</p>
  </li>
  <li>
    <p>Náhodné pořadí.</p>
  </li>
</ol>

<p>Hlavní argument pro <b>řazení</b> <code>public</code> → <code>private</code> je v tom, že při pohledu do třídy je jasnější, jaké metody nabízí směrem <i>ven</i>, aniž by se člověk musel prokousávat hromadou vnitřní logiky v <i>private</i> metodách.</p>

<p>Další výhoda je v možnosti vyžadování tohoto pravidla automatickým nástrojem. Lze tak zabránit, aby se špatně seřazený kód dostal do hlavní větve aplikace.</p>

<p>Výhoda <b>souvisejících metod u sebe</b> je zase v lepší čitelnosti při psaní a upravování třídy (související kód je blízko u sebe). Odpadá tím i situace, kdy se kvůli změně z public na private nebo obráceně musí přesouvat metody napříč souborem. Čímž se znehodnocuje historie v Gitu.</p>

<p>Při použití vhodného IDE, např. PhpStormu, je potom řazení poměrně zbytečné, protože ho dokáže vyřešit sám editor. V přehledu <b>struktury</b> souboru (klávesová zkratka <kbd>Alt</kbd> + <kbd>7</kbd>) jde zobrazit všechny metody dané třídy a řadit je dle <i>viditelnosti</i>:</p>

<p><img src="/files/poradi-private-public/phpstorm-structure.png" alt="Struktura v PhpStormu" class="border"></p>


























<p><b>Náhodnému řazení</b> je potom dobré se vyhnout, protože snižuje dobrou čitelnost kódu. Proto je dobré dát přednost konsistenci.</p>

<p>Volba mezi řazením <i>public</i> → <i>private</i> a seskupování souvisejících metod bez ohledu na viditelnost potom není úplně jednoznačná. Oboje má své výhody i nevýhody a je třeba je zvážit podle aktuální situace.</p>