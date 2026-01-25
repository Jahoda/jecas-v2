---
title: "Clawdbot: osobní AI asistent"
headline: "Clawdbot: open-source osobní AI asistent pro WhatsApp, Telegram a další"
description: "Clawdbot je open-source AI agent, který běží lokálně a komunikuje přes WhatsApp, Telegram, Discord nebo iMessage. Jak funguje?"
date: "2026-01-25"
last_modification: "2026-01-25"
status: 1
tags: ["ai", "napady", "produktivita"]
format: "html"
social_text: "Už taky kupujete Mac Mini, abyste mohli svěřit svůj online život do rukou Clawdbota?"
---

<p>Co kdyby váš AI asistent nebyl webová aplikace, ale <b>lokální agent</b>, se kterým si píšete přes WhatsApp nebo Telegram? Přesně to nabízí <a href="https://clawd.bot">Clawdbot</a> — open-source projekt, který propojuje messaging platformy s AI modely.</p>

<p>Na rozdíl od ChatGPT nebo Claude.ai běží Clawdbot na vašem počítači. Ale pozor — <b>„lokální” neznamená „soukromé”</b>. Vaše data stále putují do cloudových API.</p>

<h2 id="co-je">Co je Clawdbot?</h2>

<p>Clawdbot je osobní AI asistent napsaný v TypeScriptu, který funguje jako gateway mezi chat aplikacemi a AI modely. Spustíte ho lokálně a komunikujete s ním přes běžné messengery:</p>

<ul>
  <li><b>WhatsApp</b> — přes knihovnu Baileys</li>
  <li><b>Telegram</b> — přes grammY framework</li>
  <li><b>Discord</b> — jako bot na serveru nebo v DM</li>
  <li><b>iMessage</b> — na macOS</li>
  <li><b>Slack, Signal, Teams</b> — a další platformy</li>
</ul>

<p>Projekt vznikl koncem roku 2025 a rychle získal popularitu. GitHub repozitář má přes 8 000 hvězdiček a aktivní komunitu na Discordu.</p>

<h2 id="instalace">Instalace</h2>

<p>Vyžaduje Node.js verse 22 nebo vyšší:</p>

<pre><code># Instalace
npm install -g clawdbot@latest

# Onboarding a nastavení služby
clawdbot onboard --install-daemon

# Přihlášení k chat kanálům
clawdbot channels login</code></pre>

<p>Příkaz <code>onboard</code> nastaví Clawdbot jako systémovou službu (daemon), která běží na pozadí. Na macOS, Linux i Windows (přes WSL2).</p>

<h3>Alternativní instalace</h3>

<p>Pro vývojáře je možná instalace ze zdrojových kódů:</p>

<pre><code>git clone https://github.com/clawdbot/clawdbot
cd clawdbot
npm install
npm run build
npm link</code></pre>

<h2 id="architektura">Jak to funguje</h2>

<p>Clawdbot používá architekturu s centrálním <b>Gateway</b> procesem:</p>

<pre><code>┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  WhatsApp   │────▶│             │────▶│   Claude    │
├─────────────┤     │   Gateway   │     ├─────────────┤
│  Telegram   │────▶│  WebSocket  │────▶│   OpenAI    │
├─────────────┤     │   Server    │     ├─────────────┤
│  Discord    │────▶│             │────▶│  Ollama     │
└─────────────┘     └─────────────┘     └─────────────┘</code></pre>

<p>Gateway běží jako WebSocket server na <code>ws://127.0.0.1:18789</code> a spojuje všechny komponenty — chat kanály, AI agenta (Pi), CLI nástroje a webové rozhraní.</p>

<h3>Webové rozhraní</h3>

<p>Po spuštění je dostupný WebChat na <code>http://127.0.0.1:18789/</code> pro testování a ladění bez nutnosti připojovat messaging platformy.</p>

<h2 id="modely">Podporované AI modely</h2>

<p>Clawdbot podporuje různé poskytovatele AI:</p>

<table>
  <tr>
    <th>Poskytovatel</th>
    <th>Modely</th>
    <th>Poznámka</th>
  </tr>
  <tr>
    <td>Anthropic</td>
    <td>Claude Opus 4.5, Sonnet</td>
    <td>Doporučeno pro dlouhý kontext</td>
  </tr>
  <tr>
    <td>OpenAI</td>
    <td>GPT-4o, o1</td>
    <td>OAuth přihlášení</td>
  </tr>
  <tr>
    <td>Ollama</td>
    <td>Llama, Mistral, atd.</td>
    <td>Plně lokální</td>
  </tr>
</table>

<p>Tvůrci doporučují Anthropic Claude Pro/Max s modelem Opus 4.5 pro nejlepší výsledky při práci s dlouhým kontextem.</p>

<h2 id="konfigurace">Konfigurace</h2>

<p>Nastavení se ukládá v <code>~/.clawdbot/clawdbot.json</code>. Příklad omezení přístupu pouze na konkrétní číslo:</p>

<pre><code>{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+420123456789"],
      "groups": {
        "*": { "requireMention": true }
      }
    }
  }
}</code></pre>

<p>Ve skupinových chatech lze nastavit, že bot reaguje pouze když je zmíněn (<code>@Clawd</code>).</p>

<h2 id="pamet">Trvalá paměť</h2>

<p>Jedna z klíčových funkcí — Clawdbot si <b>pamatuje kontext</b> napříč konversacemi. Paměť se ukládá jako Markdown soubory do složkové struktury podobné Obsidianu:</p>

<pre><code>~/.clawdbot/
├── memory/
│   ├── user-preferences.md
│   ├── projects/
│   │   ├── web-app.md
│   │   └── api-design.md
│   └── contacts/
│       └── jan-novak.md
└── clawdbot.json</code></pre>

<p>Agent si pamatuje vaše preference, rozpracované projekty i informace o lidech, se kterými pracujete.</p>

<h2 id="skills">Skills (dovednosti)</h2>

<p>Clawdbot lze rozšiřovat pomocí <b>skills</b> — modulárních dovedností pro konkrétní služby:</p>

<ul>
  <li><b>Gmail</b> — čtení a odesílání e-mailů</li>
  <li><b>Google Calendar</b> — správa událostí</li>
  <li><b>Notion</b> — práce s databázemi a stránkami</li>
  <li><b>Spotify</b> — ovládání přehrávání</li>
  <li><b>Philips Hue</b> — kontrola osvětlení</li>
  <li><b>GitHub</b> — issues, PR, repozitáře</li>
</ul>

<p>Skills jsou dostupné na <a href="https://clawdhub.com">ClawdHub</a> — komunitním katalogu rozšíření.</p>

<h3>Vlastní skills</h3>

<p>Můžete vytvářet vlastní dovednosti. Struktura je podobná <a href="/agent-skills">Agent Skills</a> specifikaci:</p>

<pre><code>my-skill/
├── SKILL.md        # Instrukce pro agenta
├── scripts/        # Spustitelné skripty
└── config.json     # Konfigurace</code></pre>

<h2 id="schopnosti">Co Clawdbot umí</h2>

<h3>Práce se soubory</h3>

<p>Agent má přístup k filesystému — může číst, vytvářet a upravovat soubory. Ve výchozím stavu běží v sandboxu s omezenými právy.</p>

<h3>Webový prohlížeč</h3>

<p>Vestavěný Chromium prohlížeč umožňuje:</p>

<ul>
  <li>Procházet webové stránky</li>
  <li>Vyplňovat formuláře</li>
  <li>Extrahovat data (web scraping)</li>
  <li>Pořizovat screenshoty</li>
</ul>

<h3>Spouštění příkazů</h3>

<p>Může spouštět shell příkazy a skripty. Hodí se pro automatisaci — spuštění buildů, testů, deploymentů.</p>

<h3>Automatisace</h3>

<p>Podporuje cron jobs, webhooky a Gmail Pub/Sub triggery pro automatické spouštění úloh.</p>

<h2 id="bezpecnost">Bezpečnostní risika</h2>

<p>Clawdbot má <b>plný přístup k vašemu systému</b>. Může číst a mazat soubory, spouštět libovolné příkazy, přistupovat k internetu. V podstatě si dobrovolně instalujete software s právy, jaká má typický malware.</p>

<h3>Co může Clawdbot udělat</h3>

<ul>
  <li><b>Smazat soubory</b> — včetně důležitých dat</li>
  <li><b>Číst citlivé soubory</b> — SSH klíče, konfigurace, hesla</li>
  <li><b>Spouštět příkazy</b> — cokoliv, co můžete vy</li>
  <li><b>Přistupovat k síti</b> — odesílat data kamkoliv</li>
  <li><b>Instalovat software</b> — včetně dalších závislostí</li>
</ul>

<p>Sandbox ve výchozím nastavení omezuje pouze <b>skupinové chaty</b>, ne hlavního agenta.</p>

<h3>„Lokální” neznamená „soukromé”</h3>

<p>Pokud používáte Claude nebo GPT, všechny vaše zprávy, soubory a kontext <b>putují do cloudových API</b> Anthropic nebo OpenAI. Poskytovatelé je mohou ukládat, analyzovat, používat pro trénink modelů.</p>

<p>Skutečně lokální je pouze varianta s <b>Ollama</b> — tam data nikam neodcházejí. Ale výkon lokálních modelů je výrazně nižší.</p>

<h3>Risiko supply chain útoku</h3>

<p>Instalujete npm balíček s plnými systémovými právy. Pokud by byl repozitář kompromitován nebo závislost obsahovala malware, máte problém. Totéž platí pro skills z komunitního katalogu.</p>

<h3>Výchozí ochranné mechanismy</h3>

<p>Projekt nabízí určitá omezení:</p>

<ul>
  <li><b>DM pairing</b> — neznámí odesílatelé musí zadat kód</li>
  <li><b>Whitelist</b> — lze omezit na konkrétní čísla</li>
  <li><b>Sandbox pro skupiny</b> — isolované prostředí pro skupinové chaty</li>
</ul>

<p>Ale hlavní agent běží s plnými právy vašeho uživatelského účtu.</p>

<h3>Jak minimalisovat risiko</h3>

<p>Pokud chcete Clawdbot používat, zvažte tyto opatření:</p>

<ul>
  <li><b>Separátní účty</b> — založte si nový e-mail, GitHub, API klíče jen pro Clawdbot. Když agent něco pokazí nebo uniknou credentials, neohrozí to vaše hlavní účty.</li>
  <li><b>Isolované prostředí</b> — spusťte na dedikovaném VPS nebo v Docker kontejneru, ne na počítači s citlivými daty.</li>
  <li><b>Pravidelné zálohy</b> — agent může omylem smazat soubory. Mějte zálohy mimo jeho dosah (externí disk, cloud storage s read-only přístupem).</li>
  <li><b>Omezený přístup</b> — nepřipojujte skills, které nepotřebujete. Každá integrace je další attack surface.</li>
  <li><b>Auditujte historii</b> — pravidelně kontrolujte, co agent dělal. Logy jsou v <code>~/.clawdbot/logs/</code>.</li>
</ul>

<p>Přistupujte k tomu jako k novému projektu — čistý štít, separátní identity, minimální oprávnění.</p>

<h2 id="kde-spustit">Kde to spustit</h2>

<p>V komunitě se objevil trend kupování <b>Mac mini</b> jako dedikovaného zařízení pro Clawdbot. Je to zbytečné.</p>

<h3>Hardwarové nároky</h3>

<p>Clawdbot je gateway napsaná v Node.js. Samotné AI výpočty probíhají v cloudu (Anthropic, OpenAI) nebo na separátním Ollama serveru. Gateway jen přeposílá zprávy.</p>

<p>Minimální požadavky:</p>

<ul>
  <li><b>RAM</b> — 512 MB (Node.js + Chromium pro browser skills)</li>
  <li><b>CPU</b> — jakýkoliv, většinu času idle</li>
  <li><b>Disk</b> — stovky MB pro aplikaci + paměť</li>
</ul>

<p>Raspberry Pi 4 to zvládne. Mac mini za 15 000 Kč je overkill.</p>

<h3>Levnější alternativy</h3>

<table>
  <tr>
    <th>Varianta</th>
    <th>Cena</th>
    <th>Poznámka</th>
  </tr>
  <tr>
    <td>VPS (Hetzner, DigitalOcean)</td>
    <td>~100 Kč/měsíc</td>
    <td>Nejjednodušší, vždy online</td>
  </tr>
  <tr>
    <td>Raspberry Pi</td>
    <td>~2000 Kč jednorázově</td>
    <td>Nízká spotřeba, tichý provoz</td>
  </tr>
  <tr>
    <td>Starý notebook/PC</td>
    <td>0 Kč</td>
    <td>Využití existujícího hardware</td>
  </tr>
  <tr>
    <td>Docker na NAS</td>
    <td>0 Kč</td>
    <td>Synology, QNAP — běží 24/7</td>
  </tr>
</table>

<h3>Izolace pomocí Dockeru</h3>

<p>Místo sandboxu v aplikaci můžete spustit celý Clawdbot v Docker kontejneru:</p>

<pre><code>docker run -d \
  --name clawdbot \
  -v ~/.clawdbot:/root/.clawdbot \
  -p 18789:18789 \
  --restart unless-stopped \
  clawdbot/clawdbot</code></pre>

<p>Kontejner izoluje aplikaci od hostitelského systému. I kdyby agent „zešílel”, nemůže smazat vaše soubory mimo namapovaný volume.</p>

<p>Pro paranoidní uživatele: spusťte kontejner s omezenými právy:</p>

<pre><code>docker run -d \
  --name clawdbot \
  --read-only \
  --tmpfs /tmp \
  --cap-drop ALL \
  -v ~/.clawdbot:/root/.clawdbot \
  clawdbot/clawdbot</code></pre>

<h2 id="platformy">Podporované platformy</h2>

<table>
  <tr>
    <th>Platforma</th>
    <th>Režim</th>
    <th>Funkce</th>
  </tr>
  <tr>
    <td>macOS</td>
    <td>App + Node</td>
    <td>Plná podpora včetně iMessage</td>
  </tr>
  <tr>
    <td>Linux</td>
    <td>Gateway</td>
    <td>Server/headless provoz</td>
  </tr>
  <tr>
    <td>Windows</td>
    <td>WSL2</td>
    <td>Přes Windows Subsystem for Linux</td>
  </tr>
  <tr>
    <td>iOS</td>
    <td>Node + Canvas</td>
    <td>Mobilní přístup</td>
  </tr>
  <tr>
    <td>Android</td>
    <td>Node + Camera</td>
    <td>Včetně přístupu ke kameře</td>
  </tr>
</table>

<h2 id="pouziti">Příklady použití</h2>

<p>Několik scénářů, kde Clawdbot vyniká:</p>

<ul>
  <li><b>Správa e-mailů</b> — „Shrň mi nepřečtené e-maily a odpověz na urgentní”</li>
  <li><b>Kalendář</b> — „Naplánuj meeting s Petrem na příští týden”</li>
  <li><b>Kódování</b> — „Spusť testy a oprav failing cases”</li>
  <li><b>Domácnost</b> — „Ztlum světla v obýváku na 50%”</li>
  <li><b>Research</b> — „Najdi informace o tomto tématu a shrň je”</li>
</ul>

<p>Výhodou je, že vše děláte z jedné chat aplikace, kterou už používáte.</p>

<h2 id="srovnani">Srovnání s alternativami</h2>

<table>
  <tr>
    <th></th>
    <th>Clawdbot</th>
    <th>ChatGPT</th>
    <th>Claude.ai</th>
  </tr>
  <tr>
    <td>Běží lokálně</td>
    <td>Ano</td>
    <td>Ne</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td>Chat integrace</td>
    <td>WhatsApp, Telegram, atd.</td>
    <td>Pouze web/app</td>
    <td>Pouze web/app</td>
  </tr>
  <tr>
    <td>Přístup k souborům</td>
    <td>Plný (risiko)</td>
    <td>Omezený</td>
    <td>Omezený</td>
  </tr>
  <tr>
    <td>Trvalá paměť</td>
    <td>Ano (lokální)</td>
    <td>Omezená</td>
    <td>Projects</td>
  </tr>
  <tr>
    <td>Open source</td>
    <td>Ano (MIT)</td>
    <td>Ne</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td>Cena</td>
    <td>Zdarma + API náklady</td>
    <td>$20/měsíc</td>
    <td>$20/měsíc</td>
  </tr>
</table>

<h2 id="zaver">Shrnutí</h2>

<ul>
  <li><b>Clawdbot</b> je open-source AI asistent běžící lokálně na vašem zařízení</li>
  <li>Komunikujete s ním přes <b>WhatsApp, Telegram, Discord</b> nebo jiné messengery</li>
  <li>Má <b>trvalou paměť</b> uloženou jako Markdown soubory</li>
  <li>Lze rozšiřovat pomocí <b>skills</b> pro Gmail, Notion, Spotify a další služby</li>
  <li><b>Bezpečnostní risiko</b> — plný přístup k systému, data putují do cloudových API</li>
</ul>

<p>Clawdbot je zajímavý projekt, ale vyžaduje důvěru. Dáváte AI agentovi práva, která byste nedali ani kolegovi. Zvažte, zda vám pohodlí stojí za risiko.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://clawd.bot">clawd.bot</a> — oficiální web</li>
  <li><a href="https://github.com/clawdbot/clawdbot">GitHub</a> — zdrojový kód</li>
  <li><a href="https://docs.clawd.bot">Dokumentace</a></li>
  <li><a href="https://clawdhub.com">ClawdHub</a> — katalog skills</li>
</ul>
