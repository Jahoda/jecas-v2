---
title: "Agent Skills: Otevřený standard pro rozšíření AI agentů"
headline: "Agent Skills: Otevřený standard pro rozšíření AI agentů"
description: "Agent Skills je specifikace pro definování modulárních schopností AI agentů. Jak funguje a proč ji přijali Microsoft, OpenAI, Cursor i GitHub?"
date: "2025-01-10"
last_modification: "2025-01-10"
status: 1
tags: ["ai", "napady", "produktivita"]
format: "html"
---

<p>Jak naučit AI agenta nové věci? Jak mu dát schopnost pracovat s konkrétními nástroji, frameworky nebo firemními procesy? Odpovědí je <b>Agent Skills</b> — otevřený standard pro definování modulárních schopností AI agentů.</p>

<h2 id="co-je">Co je Agent Skills?</h2>

<p>Agent Skills je specifikace vytvořená Anthropic a <a href="https://agentskills.io/specification">publikovaná jako otevřený standard</a> v prosinci 2025. Definuje formát, kterým můžete AI agentům předávat instrukce, skripty a zdroje pro konkrétní úkoly.</p>

<p>Podobně jako <a href="https://modelcontextprotocol.io">Model Context Protocol (MCP)</a> pro připojení agentů k externím nástrojům, Agent Skills standardizuje způsob, jakým agenti <b>získávají a používají nové schopnosti</b>.</p>

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

<p>Obsahuje spustitelné skripty, které agent volá přes Bash:</p>

<pre><code>scripts/
├── analyze.py         # Analýza kódu
├── validate.sh        # Validace vstupů
└── generate-report.py # Generování reportu</code></pre>

<p>Ve <code>SKILL.md</code> na ně odkazujete pomocí proměnné <code>{baseDir}</code>:</p>

<pre><code>Pro analýzu spusť:
python {baseDir}/scripts/analyze.py --file {file}</code></pre>

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

<h2 id="proc">Proč je to důležité?</h2>

<p>Otevřené standardy redukují fragmentaci. Vývojáři mohou vytvořit skill jednou a nasadit ho napříč platformami — Claude Code, Cursor, ChatGPT, Codex CLI a dalšími.</p>

<p>Pro firmy to znamená, že mohou přecházet mezi poskytovateli AI bez přepisování customizací. Skill pro firemní coding standards bude fungovat všude.</p>

<p>Anthropic následuje vzor, který zavedl s MCP — vytvořit standard, otevřít ho komunitě a předat správu Linux Foundation. MCP tento proces dokončil 9. prosince 2025, kdy se Google, Microsoft a AWS stali členy nadace.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://agentskills.io/specification">Agent Skills Specification</a></li>
  <li><a href="https://github.com/agentskills/agentskills">GitHub: agentskills/agentskills</a></li>
  <li><a href="https://simonwillison.net/2025/Dec/19/agent-skills/">Simon Willison: Agent Skills</a></li>
  <li><a href="https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/">The New Stack: Agent Skills</a></li>
</ul>
