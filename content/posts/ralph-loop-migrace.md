---
title: "Ralph loop: migrace služby z .NET na TypeScript"
headline: "Ralph loop: jak AI agent za půl dne přepsal službu z .NET na TypeScript"
description: "Praktická zkušenost s Ralph loop režimem pro automatickou migraci kódu mezi programovacími jazyky."
date: "2026-01-18"
status: 1
tags: ["ai", "produktivita"]
format: "html"
---

<p>V pátek jsme vyzkoušeli <b>Ralph loop</b> — režim AI agenta <a href="https://ralph.bot">Ralph</a>, který umožňuje autonomní práci na komplexních úkolech. Výsledek? Za půl dne kompletní migrace služby z <b>.NET</b> na <b>TypeScript</b>.</p>

<h2 id="co-je-ralph">Co je Ralph?</h2>

<p>Ralph je AI agent pro programátory, podobný <a href="/opencode">OpenCode</a> nebo Claude Code. Oproti běžným AI asistentům má jednu zásadní vlastnost — <b>loop režim</b>.</p>

<p>V loop režimu Ralph nepotřebuje neustálou interakci. Dostane úkol, analyzuje kód, naplánuje postup a pak samostatně pracuje, dokud není hotovo. Člověk mezitím může dělat něco jiného.</p>

<h2 id="ralph-tui">Ralph TUI</h2>

<p>Ralph jsme spustili přes <b>Ralph TUI</b> (terminálové rozhraní). TUI poskytuje přehled o tom, co agent právě dělá:</p>

<ul>
  <li>Aktuální krok v plánu</li>
  <li>Soubory, které agent čte nebo upravuje</li>
  <li>Příkazy, které spouští</li>
  <li>Případné chyby a jak je řeší</li>
</ul>

<p>Díky tomu jde průběžně sledovat, jestli agent jde správným směrem, aniž by člověk musel aktivně zasahovat.</p>

<h2 id="migrace">Migrace .NET → TypeScript</h2>

<p>Úkol zněl jednoduše: vzít existující .NET službu a přepsat ji do TypeScriptu. V praxi to znamenalo:</p>

<ol>
  <li>Analýza struktury .NET projektu</li>
  <li>Mapování C# typů na TypeScript</li>
  <li>Přepis business logiky</li>
  <li>Konverze Entity Framework na TypeORM/Prisma</li>
  <li>Úprava API endpointů</li>
  <li>Přepis testů</li>
</ol>

<p>Ralph si s tím poradil sám. Půl dne to chroustalo a pak to vyplivlo funkční TypeScript kód.</p>

<h2 id="jak-to-funguje">Jak loop funguje?</h2>

<p>Loop režim funguje iterativně:</p>

<ol>
  <li><b>Plánování</b> — agent analyzuje úkol a vytvoří plán kroků</li>
  <li><b>Implementace</b> — postupně provádí jednotlivé kroky</li>
  <li><b>Verifikace</b> — po každém kroku ověří, že kód funguje (build, testy)</li>
  <li><b>Korekce</b> — pokud něco nefunguje, opraví to a pokračuje</li>
</ol>

<p>Klíčové je, že agent se nenechá zastavit první chybou. Když build selže, podívá se na chybu, opraví ji a zkusí znovu. Tento cyklus opakuje, dokud vše neprojde.</p>

<h2 id="vysledky">Výsledky</h2>

<p>Co jsme dostali:</p>

<ul>
  <li>Funkční TypeScript službu s ekvivalentní funkcionalitou</li>
  <li>Zachované API kontrakty</li>
  <li>Přepsané testy</li>
  <li>Moderní TypeScript idiomy místo doslovného překladu C#</li>
</ul>

<p>Samozřejmě to nebylo 100% dokonalé. Některé edge case vyžadovaly ruční úpravy. Ale základ byl solidní a ušetřilo to týdny manuální práce.</p>

<h2 id="kdy-pouzit">Kdy loop režim použít?</h2>

<p>Loop režim se hodí pro:</p>

<ul>
  <li><b>Migrace</b> — přepis mezi jazyky nebo frameworky</li>
  <li><b>Refaktoring</b> — rozsáhlé změny architektury</li>
  <li><b>Generování</b> — vytvoření boilerplate kódu pro nový projekt</li>
  <li><b>Opravy</b> — systematické opravy chyb napříč kódem</li>
</ul>

<p>Nehodí se pro úkoly, kde je potřeba časté rozhodování nebo konzultace s člověkem. Tam je lepší klasický interaktivní režim.</p>

<h2 id="tipy">Tipy pro použití</h2>

<ul>
  <li><b>Jasné zadání</b> — čím přesnější prompt, tím lepší výsledek</li>
  <li><b>Omezený scope</b> — lepší jedna služba než celý monolit</li>
  <li><b>Funkční testy</b> — agent je použije pro verifikaci</li>
  <li><b>Verzování</b> — před spuštěním commitnout, aby šlo vrátit změny</li>
</ul>

<h2 id="zaver">Zkušenost</h2>

<p>Ralph loop je jako mít juniora, který pracuje 24/7, nedělá přestávky a nevadí mu nudná práce. Není to náhrada za seniora, který by migraci navrhl a zkontroloval. Ale na samotnou implementaci je to výborný nástroj.</p>

<p>Půl dne čekání vs. týdny manuálního přepisování? Volba je jasná.</p>
