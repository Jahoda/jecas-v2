---
title: "OpenCode: open source AI agent pro terminál"
headline: "OpenCode: open source AI agent pro terminál"
description: "OpenCode je open source alternativa ke Claude Code. Nabízí AI agenta přímo v terminálu s podporou více modelů."
date: "2026-01-18"
status: 1
tags: ["ai", "produktivita"]
format: "html"
---

<p><a href="https://opencode.ai">OpenCode</a> je open source AI agent pro programátory. Je to alternativa k <b>Claude Code</b> od Anthropic, ale na rozdíl od něj podporuje více AI poskytovatelů a je kompletně open source.</p>

<p>OpenCode je dostupný jako terminálová aplikace, <b>desktopová aplikace</b> (macOS, Windows, Linux) nebo rozšíření pro IDE.</p>

<h2 id="co-umi">Co OpenCode umí?</h2>

<p>OpenCode funguje jako AI asistent, který rozumí vašemu kódu a dokáže s ním pracovat:</p>

<ul>
  <li><b>Vysvětlení kódu</b> — popíše, co kód dělá a proč</li>
  <li><b>Psaní a refaktoring</b> — napíše nový kód nebo upraví existující</li>
  <li><b>Plánování funkcí</b> — navrhne, jak implementovat novou funkcionalitu</li>
  <li><b>Spouštění příkazů</b> — může spouštět příkazy v terminálu</li>
  <li><b>Prohledávání souborů</b> — orientuje se v celém projektu</li>
  <li><b>Undo/Redo</b> — vrací změny pomocí příkazů <code>/undo</code> a <code>/redo</code></li>
</ul>

<h2 id="instalace">Instalace</h2>

<p>OpenCode lze nainstalovat několika způsoby:</p>

<h3>Instalační skript</h3>

<pre><code>curl -fsSL https://opencode.ai/install | bash</code></pre>

<h3>Homebrew (macOS/Linux)</h3>

<pre><code>brew install opencode-ai/tap/opencode</code></pre>

<h3>npm</h3>

<pre><code>npm i -g opencode-ai@latest</code></pre>

<h3>Go</h3>

<pre><code>go install github.com/opencode-ai/opencode@latest</code></pre>

<h2 id="konfigurace">Konfigurace</h2>

<p>Po instalaci je potřeba propojit OpenCode s AI poskytovatelem:</p>

<ol>
  <li>Spusťte <code>opencode</code></li>
  <li>Zadejte příkaz <code>/connect</code></li>
  <li>Vyberte poskytovatele (OpenAI, Anthropic, Google, atd.)</li>
  <li>Vložte API klíč</li>
</ol>

<p>Pro inicialisaci projektu použijte příkaz <code>/init</code>, který analyzuje strukturu kódu.</p>


<h2 id="aplikace">Desktopová aplikace</h2>

<p>Pro nepříznivce terminálu jde použít <a href="https://opencode.ai/download">desktopová aplikace</a>, kde je člověk od příkazů odstíněn.</p>

<p><img src="/files/opencode/snimek-obrazovky-2026-01-18-v-8-29-16.png" class="border" alt="" /></p>

<h2 id="modely">Podporované modely</h2>

<p>OpenCode podporuje širokou škálu AI modelů. Vzhledem k tomu, že přidání nového poskytovatele je díky standardisaci celkem triviální. Je typicky možné použít skoro cokoliv.</p>

<p>V AI světě se všichni předhání s rychlostí, takže nové modely jsou zpravidla dostupné v řádu hodin od jejich uvedení.</p>

<p>Možnost vybrat si model je klíčová výhoda oproti Claude Code, který je svázaný pouze s modely od Anthropic.</p>

<h2 id="pouzivani">Používání</h2>

<p>Spusťte OpenCode v adresáři projektu:</p>

<pre><code>cd ~/muj-projekt
opencode</code></pre>

<p>Pak stačí psát požadavky přirozeným jazykem.</p>

<h3>Režim plánování</h3>

<p>Pomocí klávesy <kbd>Tab</kbd> přepnete do režimu plánování. OpenCode navrhne postup, ale neprovede žádné změny. To je užitečné pro složitější úpravy, kdy chcete nejdřív vidět plán.</p>

<h3>Non-interaktivní režim</h3>

<p>Pro automatisaci lze OpenCode spustit s parametrem <code>-p</code>:</p>

<pre><code>opencode -p "Vypiš všechny TODO komentáře v projektu" -q</code></pre>

<p>Parametr <code>-q</code> potlačí interaktivní výstup, <code>-f json</code> vrátí výstup ve formátu JSON.</p>


<h2 id="mcp">Model Context Protocol</h2>

<p>OpenCode implementuje Model Context Protocol (MCP) pro rozšíření schopností. Přes MCP lze připojit externí nástroje — databáze, API služby nebo vlastní skripty.</p>

<p>Konfigurace MCP serverů se provádí v konfiguračním souboru projektu.</p>

<h2 id="lsp">Language Server Protocol</h2>

<p>Pro lepší porozumění kódu OpenCode integruje <b>Language Server Protocol (LSP)</b>. Díky tomu získává informace o typech, definicích a referencích napříč projektem.</p>

<h2 id="soukromi">Soukromí a kontrola</h2>

<p>Oproti cloudovým asistentům má OpenCode výhodu v kontrole nad daty:</p>

<ul>
  <li>Kód se nemusí posílat na vzdálené servery (pokud nepoužíváte cloudové modely)</li>
  <li>Vy rozhodujete, který poskytovatel a model se použije</li>
  <li>Podporuje lokální modely přes proměnnou <code>LOCAL_ENDPOINT</code></li>
</ul>

<h2 id="architektura">Architektura</h2>

<p>OpenCode je napsaný v Go a používá framework <a href="https://github.com/charmbracelet/bubbletea">Bubble Tea</a> pro terminálové rozhraní. Konversace ukládá do lokální SQLite databáze.</p>

<p>Zajímavostí je klient/server architektura — OpenCode může běžet na počítači a ovládat ho můžete vzdáleně, třeba z mobilní aplikace.</p>

<h2 id="free-modely">Free modely</h2>

<p>OpenCode nabízí několik modelů zdarma:</p>

<ul>
  <li><b>Grok Code Fast 1</b> — model od xAI</li>
  <li><b>GLM 4.7</b> — model od Zhipu AI</li>
  <li><b>MiniMax M2.1</b></li>
</ul>

<p>Tyto modely jsou dostupné zdarma po omezenou dobu, zatímco poskytovatelé sbírají zpětnou vazbu.</p>

<p>Kromě toho OpenCode nabízí <a href="https://opencode.ai/zen">OpenCode Zen</a> — sadu optimalisovaných modelů pro programování.</p>

<h2 id="srovnani">Srovnání s Claude Code</h2>

<table>
  <tr>
    <th></th>
    <th>OpenCode</th>
    <th>Claude Code</th>
  </tr>
  <tr>
    <td>Licence</td>
    <td>Open source (MIT)</td>
    <td>Proprietární</td>
  </tr>
  <tr>
    <td>Cena</td>
    <td>Zdarma (+ volitelné API kredity)</td>
    <td>Předplatné Claude</td>
  </tr>
  <tr>
    <td>Free modely</td>
    <td>Ano</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td>Modely</td>
    <td>Více poskytovatelů</td>
    <td>Pouze Claude</td>
  </tr>
  <tr>
    <td>Lokální modely</td>
    <td>Ano</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td>Desktop aplikace</td>
    <td>Ano</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td>MCP podpora</td>
    <td>Ano</td>
    <td>Ano</td>
  </tr>
  <tr>
    <td>Jazyk</td>
    <td>Go</td>
    <td>TypeScript</td>
  </tr>
</table>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://opencode.ai">OpenCode</a> — oficiální web</li>
  <li><a href="https://opencode.ai/docs/">Dokumentace</a></li>
  <li><a href="https://github.com/opencode-ai/opencode">GitHub</a></li>
</ul>
