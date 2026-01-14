---
title: "Agent Skills: rozšíření AI agentů"
headline: "Agent Skills: rozšíření AI agentů"
description: "Agent Skills je specifikace pro definování schopností AI agentů. Jak funguje?"
date: "2026-01-14"
last_modification: "2026-01-14"
status: 1
tags: ["ai", "napady", "produktivita"]
format: "html"
---

<p>Jak naučit AI agenta nové věci? Jak mu dát schopnost pracovat s konkrétními nástroji, frameworky nebo firemními procesy? Odpovědí je <b>Agent Skills</b> — otevřený standard pro definování modulárních schopností AI agentů.</p>

<h2 id="co-je">Co je Agent Skills?</h2>

<p>Agent Skills je specifikace vytvořená Anthropic a <a href="https://agentskills.io/specification">publikovaná jako otevřený standard</a> v prosinci 2025. Definuje formát, kterým můžete AI agentům předávat instrukce, skripty a zdroje pro konkrétní úkoly.</p>

<p>Podobně jako <a href="https://modelcontextprotocol.io">Model Context Protocol (MCP)</a> pro připojení agentů k externím nástrojům, Agent Skills standardisuje způsob, jakým agenti <b>získávají a používají nové schopnosti</b>.</p>

<p>Standard už přijali Microsoft, OpenAI, Atlassian, Figma, Cursor, GitHub a další. Partnerské skills od Canva, Stripe, Notion nebo Zapier jsou dostupné od prvního dne.</p>

<h2 id="struktura">Struktura skillu</h2>

<p>Skill je adresář obsahující minimálně soubor <code>SKILL.md</code>. Volitelně může obsahovat další složky:</p>

<pre><code>my-skill/
├── SKILL.md           # Hlavní soubor s instrukcemi
├── scripts/           # Spustitelné skripty (Python, Bash)
├── references/        # Dokumentace načítaná do kontextu
└── assets/            # Šablony, obrázky, konfigurace</code></pre>

<h3>SKILL.md</h3>

<p>Hlavní soubor má dvě části — YAML frontmatter s metadaty a markdown s instrukcemi:</p>

<pre><code>---
name: code-review
description: Provádí code review pull requestů. Použij když uživatel chce zkontrolovat kód.
allowed-tools: Bash(git:*), Read, Grep
model: inherit
---

# Code Review

## Postup

1. Načti změny pomocí `git diff`
2. Analyzuj každý soubor
3. Zkontroluj:
   - Čitelnost kódu
   - Potenciální bugy
   - Bezpečnostní problémy
4. Vypiš nálezy ve strukturovaném formátu

## Formát výstupu

Pro každý nález uveď:
- Soubor a řádek
- Závažnost (info/warning/error)
- Popis problému
- Návrh opravy</code></pre>

<h2 id="frontmatter">Povinná a volitelná pole</h2>

<p>Frontmatter definuje metadata a konfiguraci skillu:</p>

<table>
  <tr>
    <th>Pole</th>
    <th>Povinné</th>
    <th>Popis</th>
  </tr>
  <tr>
    <td><code>name</code></td>
    <td>Ano</td>
    <td>Identifikátor skillu, používá se jako příkaz</td>
  </tr>
  <tr>
    <td><code>description</code></td>
    <td>Ano</td>
    <td>Popis pro matching s uživatelským záměrem</td>
  </tr>
  <tr>
    <td><code>allowed-tools</code></td>
    <td>Ne</td>
    <td>Seznam povolených nástrojů s wildcard podporou</td>
  </tr>
  <tr>
    <td><code>model</code></td>
    <td>Ne</td>
    <td>Přepíše model nebo použije <code>inherit</code></td>
  </tr>
  <tr>
    <td><code>version</code></td>
    <td>Ne</td>
    <td>Verze skillu</td>
  </tr>
  <tr>
    <td><code>license</code></td>
    <td>Ne</td>
    <td>Licence</td>
  </tr>
  <tr>
    <td><code>disable-model-invocation</code></td>
    <td>Ne</td>
    <td>Zakazuje automatické spuštění, vyžaduje ruční <code>/skill-name</code></td>
  </tr>
</table>

<h2 id="allowed-tools">Oprávnění nástrojů</h2>

<p>Pole <code>allowed-tools</code> definuje, které nástroje může skill používat. Podporuje wildcard syntaxi pro granulární kontrolu:</p>

<pre><code># Pouze git příkazy přes Bash
allowed-tools: Bash(git:*)

# Git a npm příkazy
allowed-tools: Bash(git:*), Bash(npm:*)

# Čtení souborů a grep
allowed-tools: Read, Grep

# Kombinace
allowed-tools: Bash(git:*), Read, Grep, Write</code></pre>

<p>Toto omezení zvyšuje bezpečnost — skill pro code review nepotřebuje mazat soubory nebo spouštět libovolné příkazy.</p>

<h2 id="discovery">Jak agent skill najde?</h2>

<p>Agent Skills používá čisté LLM reasoning, žádné embeddingové modely ani regex matching:</p>

<ol>
  <li>Agent při startu načte seznam dostupných skills</li>
  <li>Pro každý skill vidí <code>name</code> a <code>description</code></li>
  <li>Když uživatel zadá požadavek, agent porovná záměr s popisy</li>
  <li>Pokud najde shodu, načte celý obsah <code>SKILL.md</code></li>
  <li>Podle potřeby načítá soubory z <code>references/</code> a spouští skripty ze <code>scripts/</code></li>
</ol>

<p>Tomuto přístupu se říká <b>progressive disclosure</b> — agent nejdřív vidí jen metadata a plný obsah načte až když ho potřebuje. Šetří to kontext a zrychluje odezvu.</p>

<h2 id="scripts">Složka scripts/</h2>

<p>Obsahuje spustitelné skripty, které agent volá přes Bash. Výhodou je, že do kontextu se načítá pouze <b>výstup skriptu</b>, ne jeho zdrojový kód — šetří to tokeny.</p>

<h3>Podporované jazyky</h3>

<p>Specifikace neomezuje programovací jazyk. Použít můžete cokoli, co agent dokáže spustit:</p>

<ul>
  <li><b>Python</b> — nejčastější volba, bohatý ekosystém knihoven</li>
  <li><b>Bash/Shell</b> — systémové operace, pipeline, práce se soubory</li>
  <li><b>Node.js/TypeScript</b> — pro JS ekosystém a npm balíčky</li>
  <li><b>Ruby, Go, Rust</b> — pokud jsou v prostředí dostupné</li>
</ul>

<p>Anthropic například ve vestavěném PDF skillu používá Python skript pro extrakci polí z PDF formulářů.</p>

<pre><code>scripts/
├── analyze.py         # Python - analýza kódu
├── validate.sh        # Bash - validace vstupů
├── transform.ts       # TypeScript - transformace dat
└── generate-report.py # Python - generování reportu</code></pre>

<p>Ve <code>SKILL.md</code> na ně odkazujete pomocí proměnné <code>{baseDir}</code>:</p>

<pre><code>Pro analýzu spusť:
python {baseDir}/scripts/analyze.py --file {file}

Pro validaci:
bash {baseDir}/scripts/validate.sh {input}

Pro TypeScript (s ts-node):
npx ts-node {baseDir}/scripts/transform.ts</code></pre>

<h2 id="references">Složka references/</h2>

<p>Dokumentace, kterou agent načte do kontextu pomocí nástroje Read:</p>

<pre><code>references/
├── coding-standards.md    # Firemní coding standards
├── api-schema.json        # API schéma
└── security-checklist.md  # Bezpečnostní checklist</code></pre>

<p>Používejte pro obsah delší než 1000 znaků, který by zbytečně nafukoval <code>SKILL.md</code>.</p>

<h2 id="assets">Složka assets/</h2>

<p>Statické soubory, které agent nenamačítá do kontextu, ale pracuje s nimi cestou:</p>

<pre><code>assets/
├── template.html      # HTML šablona
├── config.json        # Výchozí konfigurace
└── logo.png           # Obrázky</code></pre>

<h2 id="priklady">Příklady skills</h2>

<h3>Skill pro Git commit</h3>

<pre><code>---
name: commit
description: Vytvoří git commit. Použij když uživatel chce commitnout změny.
allowed-tools: Bash(git:*)
---

# Git Commit

1. Spusť `git status` a `git diff` pro přehled změn
2. Analyzuj změny a navrhni commit message
3. Commit message:
   - Krátká (max 50 znaků) v imperativu
   - Zaměř se na "proč", ne "co"
4. Spusť `git add` a `git commit`
5. Ověř úspěch pomocí `git log -1`</code></pre>

<h3>Skill pro generování testů</h3>

<pre><code>---
name: generate-tests
description: Generuje unit testy pro funkce. Použij když uživatel chce testy.
allowed-tools: Read, Write, Bash(npm:test)
---

# Generování testů

1. Načti zdrojový soubor
2. Identifikuj funkce a jejich vstupy/výstupy
3. Pro každou funkci vygeneruj:
   - Happy path test
   - Edge cases (null, prázdné, hranice)
   - Error handling test
4. Použij testovací framework dle projektu (Jest, Vitest, pytest)
5. Spusť testy a oprav případné chyby</code></pre>

<h2 id="best-practices">Best practices</h2>

<h3>Popis pro matching</h3>

<p>Pole <code>description</code> je klíčové pro správné spouštění. Pište explicitně:</p>

<pre><code># Špatně
description: Pracuje s databází

# Dobře
description: Migruje databázové schéma. Použij když uživatel chce vytvořit nebo spustit migraci.</code></pre>

<h3>Délka SKILL.md</h3>

<p>Držte se pod 5000 slov. Delší obsah přesuňte do <code>references/</code>.</p>

<h3>Minimální oprávnění</h3>

<p>Povolte jen nástroje, které skill skutečně potřebuje:</p>

<pre><code># Příliš široké
allowed-tools: Bash

# Správně omezené
allowed-tools: Bash(git:*), Bash(npm:test)</code></pre>

<h3>Používejte {baseDir}</h3>

<p>Nikdy nehardcodujte absolutní cesty. Vždy používejte <code>{baseDir}</code>:</p>

<pre><code># Špatně
python /home/user/.skills/my-skill/scripts/run.py

# Dobře
python {baseDir}/scripts/run.py</code></pre>

<h2 id="srovnani">Srovnání s MCP</h2>

<p>Agent Skills a Model Context Protocol se doplňují:</p>

<table>
  <tr>
    <th></th>
    <th>Agent Skills</th>
    <th>MCP</th>
  </tr>
  <tr>
    <td>Účel</td>
    <td>Definice schopností agenta</td>
    <td>Připojení k externím nástrojům</td>
  </tr>
  <tr>
    <td>Formát</td>
    <td>Markdown + YAML</td>
    <td>JSON-RPC protokol</td>
  </tr>
  <tr>
    <td>Běhové prostředí</td>
    <td>Lokální soubory</td>
    <td>Server/klient architektura</td>
  </tr>
  <tr>
    <td>Příklad</td>
    <td>Skill pro code review</td>
    <td>Připojení k Slacku nebo databázi</td>
  </tr>
</table>

<p>MCP definuje <b>jak</b> se agent připojuje k nástrojům. Agent Skills definuje <b>co</b> má agent s nástroji dělat.</p>

<h2 id="mcp-integrace">Integrace s MCP</h2>

<p>Agent Skills a MCP fungují na různých úrovních, ale dají se kombinovat. MCP servery poskytují nástroje (tools), které skill může používat přes pole <code>allowed-tools</code>.</p>

<h3>Jak to funguje</h3>

<ol>
  <li><b>MCP server</b> běží jako samostatný proces a poskytuje nástroje (např. <code>slack_send_message</code>, <code>linear_create_issue</code>)</li>
  <li><b>Agent</b> se k MCP serverům připojuje přes konfiguraci</li>
  <li><b>Skill</b> v <code>allowed-tools</code> povolí konkrétní MCP nástroje</li>
  <li>Instrukce ve skillu popisují <b>kdy a jak</b> tyto nástroje použít</li>
</ol>

<h3>Příklad: Skill využívající MCP</h3>

<p>Představte si skill pro reportování bugů, který používá Linear (projektový management) a Slack:</p>

<pre><code>---
name: bug-report
description: Vytvoří bug report v Linear a notifikuje tým na Slacku. Použij když uživatel reportuje bug.
allowed-tools: Read, mcp__linear__create_issue, mcp__slack__send_message
---

# Bug Report

## Postup

1. Zeptej se na detaily bugu (co se děje, očekávané chování, kroky k reprodukci)
2. Analyzuj relevantní kód pomocí Read
3. Vytvoř issue v Linear:
   - Použij `mcp__linear__create_issue`
   - Nastav prioritu podle závažnosti
   - Přidej label "bug"
4. Notifikuj tým na Slacku:
   - Použij `mcp__slack__send_message`
   - Pošli do kanálu #bugs
   - Připoj odkaz na Linear issue</code></pre>

<h3>MCP nástroje v allowed-tools</h3>

<p>MCP nástroje mají typicky prefix identifikující server:</p>

<pre><code># Nástroje z Linear MCP serveru
allowed-tools: mcp__linear__create_issue, mcp__linear__update_issue

# Nástroje ze Slack MCP serveru
allowed-tools: mcp__slack__send_message, mcp__slack__list_channels

# Kombinace více MCP serverů s lokálními nástroji
allowed-tools: Read, Grep, mcp__linear__*, mcp__slack__send_message</code></pre>

<p>Wildcard <code>mcp__linear__*</code> povolí všechny nástroje z Linear serveru.</p>

<h3>Kdy použít MCP vs. skripty</h3>

<table>
  <tr>
    <th>Použij MCP když</th>
    <th>Použij skripty když</th>
  </tr>
  <tr>
    <td>Potřebuješ real-time přístup k externím službám (Slack, Linear, GitHub API)</td>
    <td>Zpracováváš lokální soubory nebo data</td>
  </tr>
  <tr>
    <td>Služba má oficiální MCP server</td>
    <td>Potřebuješ komplexní logiku nebo transformace</td>
  </tr>
  <tr>
    <td>Chceš využít autentizaci spravovanou MCP serverem</td>
    <td>Chceš minimalizovat závislosti</td>
  </tr>
</table>

<h2 id="proc">Proč je to důležité?</h2>

<p>Otevřené standardy redukují fragmentaci. Vývojáři mohou vytvořit skill jednou a nasadit ho napříč platformami — Claude Code, Cursor, ChatGPT, Codex CLI a dalšími.</p>

<p>Pro firmy to znamená, že mohou přecházet mezi poskytovateli AI bez přepisování customizací. Skill pro firemní coding standards bude fungovat všude.</p>

<p>Anthropic následuje vzor, který zavedl s MCP — vytvořit standard, otevřít ho komunitě a předat správu Linux Foundation. MCP tento proces dokončil 9. prosince 2025, kdy se Google, Microsoft a AWS stali členy nadace.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://agentskills.io/specification">Agent Skills Specification</a></li>
  <li><a href="https://github.com/agentskills/agentskills">GitHub: agentskills/agentskills</a></li>
  <li><a href="https://simonwillison.net/2025/Dec/19/agent-skills/">Simon Willison: Agent Skills</a></li>
</ul>
