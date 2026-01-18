---
title: "Ralph loop: autonomní AI agent"
headline: "Ralph loop: technika pro autonomní AI programování"
description: "Ralph loop je technika iterativního spouštění AI agenta v nekonečné smyčce. Agent pracuje samostatně, dokud nesplní zadaný úkol."
date: "2026-01-18"
status: 1
tags: ["ai", "produktivita"]
format: "html"
---

<p><b>Ralph loop</b> je technika pro autonomní programování s AI. V jádru jde o nekonečnou smyčku, která opakovaně spouští AI agenta se stejným promptem, dokud není úkol dokončen.</p>

<h2 id="proc-ralph">Proč se to jmenuje Ralph?</h2>

<p>Název pochází od <b>Ralpha Wigguma</b> ze Simpsonů. Postava je známá svou vytrvalostí navzdory opakovaným neúspěchům — a přesně tak funguje i tato technika. Agent se nenechá zastavit chybou, zkouší to znovu a znovu.</p>

<p>Techniku popularizoval <a href="https://ghuntley.com/ralph/">Geoffrey Huntley</a>, který ukázal, že jednoduchý bash loop dokáže nahradit týdny manuální práce.</p>

<h2 id="jak-funguje">Jak to funguje?</h2>

<p>Základní implementace je překvapivě jednoduchá:</p>

<pre><code>while :; do cat PROMPT.md | claude ; done</code></pre>

<p>Nekonečná smyčka, která opakovaně předává prompt AI agentovi. Klíčový trik: <b>progres se neukládá v kontextu modelu, ale v souborech a git historii</b>.</p>

<p>Když se kontext zaplní, přijde nový agent s čistým kontextem. Ten si přečte soubory, podívá se na git historii a pokračuje tam, kde předchozí skončil.</p>

<h3>Cyklus iterace</h3>

<ol>
  <li><b>Práce na úkolu</b> — agent čte kód, provádí změny</li>
  <li><b>Pokus o ukončení</b> — agent se snaží skončit</li>
  <li><b>Stop hook</b> — blokuje ukončení a znovu vloží prompt</li>
  <li><b>Opakování</b> — dokud není splněna podmínka dokončení</li>
</ol>

<h2 id="kde-bezi">Kde to běží?</h2>

<p>Ralph loop běží <b>lokálně</b> na vašem počítači. Je to bash skript, který spouští AI agenta (typicky Claude Code) v terminálu.</p>

<p>Existuje několik implementací:</p>

<ul>
  <li><a href="https://github.com/snarktank/ralph">snarktank/ralph</a> — plnohodnotný agent s <abbr title="Product Requirements Document">PRD</abbr> a automatickými commity</li>
  <li><a href="https://github.com/iannuttall/ralph">iannuttall/ralph</a> — minimalistická implementace</li>
  <li><a href="https://github.com/frankbria/ralph-claude-code">frankbria/ralph-claude-code</a> — s rate limitingem a circuit breakerem</li>
</ul>

<p>Některé implementace nabízejí TUI (terminálové rozhraní) pro sledování průběhu.</p>

<h2 id="prd">Co je PRD?</h2>

<p><b>PRD</b> (Product Requirements Document) je dokument popisující, co má být implementováno. V kontextu Ralph loop jde o soubor (typicky <code>PRD.md</code>), který obsahuje:</p>

<ul>
  <li>Seznam funkcí k implementaci</li>
  <li>Kritéria přijetí pro každou funkci</li>
  <li>Status dokončení (agent ho průběžně aktualisuje)</li>
</ul>

<p>Agent si z PRD vybírá úkoly, implementuje je a označuje jako hotové. Když jsou všechny položky splněny, loop končí.</p>

<h2 id="modely">Jaké modely používá?</h2>

<p>Ralph primárně používá <b>Claude</b> (přes Claude Code), ale může fungovat s jakýmkoli AI nástrojem, který nemá limit na počet tool calls.</p>

<p>Důležitá je schopnost agenta:</p>

<ul>
  <li>Číst a zapisovat soubory</li>
  <li>Spouštět příkazy v terminálu</li>
  <li>Pracovat s gitem</li>
</ul>

<h2 id="cena">Cena a předplatné</h2>

<p>Ralph loop je nejvýhodnější s <b>předplatným Claude Max</b>. Na rozdíl od API, kde se platí za každý token, předplatné nabízí paušální cenu.</p>

<p>To znamená, že noční běh, který spotřebuje miliony tokenů, vás nestojí nic navíc. Agent může chroustat celou noc a ráno máte hotový kód za cenu měsíčního předplatného.</p>

<p>Při použití API by stejná práce stála stovky dolarů. S předplatným je to „zdarma" v rámci paušálu.</p>

<h2 id="konfigurace">Konfigurace</h2>

<p>Pro správné fungování potřebujete definovat:</p>

<ul>
  <li><b>Kritéria dokončení</b> — explicitní podmínky úspěchu</li>
  <li><b>Signál dokončení</b> — text, který agent vypíše po splnění (např. <code>&lt;promise&gt;COMPLETE&lt;/promise&gt;</code>)</li>
  <li><b>Maximální iterace</b> — bezpečnostní limit (např. <code>--max-iterations 30</code>)</li>
</ul>

<p>Prompt typicky obsahuje:</p>

<pre><code># Úkol
Implementuj funkci X podle specifikace.

# Kritéria dokončení
- Všechny testy procházejí
- Build je úspěšný
- Kód je commitnutý

# Po dokončení
Vypiš: &lt;promise&gt;COMPLETE&lt;/promise&gt;</code></pre>

<h2 id="kdy-pouzit">Kdy použít Ralph loop?</h2>

<p>Ideální případy:</p>

<ul>
  <li><b>Greenfield projekty</b> — nové projekty s jasnou specifikací</li>
  <li><b>Migrace</b> — přepis mezi jazyky nebo frameworky</li>
  <li><b>Refaktoring</b> — rozsáhlé změny architektury</li>
  <li><b>Noční běhy</b> — nechat agenta pracovat přes noc</li>
</ul>

<p>Nevhodné případy:</p>

<ul>
  <li>Úkoly vyžadující lidský úsudek</li>
  <li>Subjektivní rozhodnutí (UI/UX design)</li>
  <li>Jednorázové operace s okamžitým výsledkem</li>
</ul>

<h2 id="tipy">Tipy pro použití</h2>

<ul>
  <li><b>Inkrementální cíle</b> — menší kroky místo velkých skoků</li>
  <li><b>Testy a lintery</b> — agent je použije pro automatickou verifikaci</li>
  <li><b>Git před spuštěním</b> — commitnout aktuální stav pro možnost rollbacku</li>
  <li><b>Jasný prompt</b> — úspěch závisí na kvalitě promptu, ne jen na modelu</li>
</ul>

<h2 id="jak-zacit">Jak začít?</h2>

<p>Pro Claude Code je nejlepší implementace <a href="https://github.com/frankbria/ralph-claude-code">frankbria/ralph-claude-code</a>. Nabízí rate limiting, circuit breaker, monitoring dashboard a spolehlivé ukončení.</p>

<h3>Instalace</h3>

<pre><code>git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh</code></pre>

<h3>Použití</h3>

<pre><code># Inicialisace projektu
ralph-setup muj-projekt
cd muj-projekt

# Spuštění s monitoringem
ralph --monitor</code></pre>

<h3>Minimální bash loop</h3>

<p>Alternativně můžete použít čistý bash bez závislostí:</p>

<pre><code>while :; do cat PROMPT.md | claude ; done</code></pre>

<p>Jak to funguje:</p>

<ul>
  <li><code>while :;</code> — nekonečná smyčka (dvojtečka je zkratka pro <code>true</code>)</li>
  <li><code>cat PROMPT.md</code> — načte obsah souboru s úkolem</li>
  <li><code>|</code> — předá text jako vstup dalšímu příkazu</li>
  <li><code>claude</code> — spustí Claude Code s promptem</li>
  <li><code>done</code> — konec smyčky, která se okamžitě opakuje</li>
</ul>

<p>Po každé iteraci Claude Code skončí (vyčerpá kontext nebo dokončí úkol), ale smyčka ho ihned spustí znovu se stejným promptem. Agent si přečte soubory, které předchozí iterace změnila, a pokračuje v práci.</p>

<p><b>Pozor:</b> Minimální loop nedetekuje dokončení — poběží donekonečna, dokud ho ručně nezastavíte (<kbd>Ctrl+C</kbd>). Proto je lepší použít frankbria/ralph-claude-code, který umí rozpoznat, kdy je úkol hotový.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://ghuntley.com/ralph/">Ralph Wiggum as a "software engineer"</a> — původní článek</li>
  <li><a href="https://github.com/frankbria/ralph-claude-code">frankbria/ralph-claude-code</a> — doporučená implementace pro Claude Code</li>
  <li><a href="https://github.com/snarktank/ralph">snarktank/ralph</a> — implementace pro Amp CLI</li>
  <li><a href="https://github.com/iannuttall/ralph">iannuttall/ralph</a> — minimalistická implementace</li>
</ul>
