---
title: "TanStack AI: AI integrace bez vendor lock-in"
headline: "TanStack AI: AI integrace bez vendor lock-in"
description: "TanStack AI přináší framework-agnostický a type-safe způsob, jak integrovat AI do webových aplikací."
date: "2025-12-05"
last_modification: "2025-12-05"
status: 1
tags: ["js", "ai", "knihovny"]
format: "html"
---

<p>V prosinci 2025 tým za <a href="https://tanstack.com">TanStack</a> oznámil alfa verzi nové knihovny <b>TanStack AI</b>, která si klade za cíl zjednodušit práci s AI v moderních webových aplikacích.</p>

<p>Hlavní myšlenkou je poskytnout vývojářům nástroj, který není svázaný s konkrétním frameworkem ani poskytovatelem AI služeb.</p>


<h2 id="co-je-tanstack-ai">Co je TanStack AI?</h2>

<p>TanStack AI je <b>framework-agnostický SDK</b> pro práci s umělou inteligencí. Funguje jako vrstva mezi aplikací a různými AI poskytovateli (OpenAI, Anthropic, Google Gemini, Ollama).</p>

<p>Podobně jako <a href="/tanstack-query">TanStack Query</a> řeší správu dat z API, TanStack AI řeší integraci AI do aplikací – s důrazem na type safety, vývojářský komfort a nezávislost na konkrétním poskytovateli.</p>


<h2 id="hlavni-vyhody">Hlavní výhody</h2>

<h3 id="framework-agnostic">Framework agnostic</h3>

<p>TanStack AI funguje s <b>libovolným JavaScriptovým frameworkem</b>, případně v čistém JavaScriptu.</p>

<p>Existují připravené integrace pro React a Solid, ale jádro knihovny je navrženo univerzálně. Vývojáři nejsou nuceni přepisovat kód při změně frameworku.</p>


<h3 id="provider-agnostic">Provider agnostic</h3>

<p>Jednou z největších výhod je možnost <b>snadno měnit poskytovatele AI</b> bez nutnosti přepisovat aplikační logiku.</p>

<p>TanStack AI podporuje:</p>

<ul>
  <li><a href="https://openai.com/" target="_blank">OpenAI</a> (GPT-4, GPT-4o, o1 a další)</li>
  <li><a href="https://claude.ai/" target="_blank">Anthropic</a> (Claude)</li>
  <li><a href="https://gemini.google.com/" target="_blank">Google Gemini</a></li>
  <li><a href="https://ollama.com/" target="_blank">Ollama</a> (lokální modely)</li>
</ul>

<p>Změna poskytovatele je v mnoha případech otázkou změny konfigurace, nikoli přepisování kódu.</p>


<h3 id="type-safety">Type safety</h3>

<p>Vše je navrženo s důrazem na <b>type safety</b>. TypeScript typy pokrývají poskytovatele, modely, parametry i výstupy.</p>

<p>To znamená méně chyb během vývoje a lepší IntelliSense v editoru.</p>


<h2 id="nastroje">Type-safe nástroje (Tools)</h2>

<p>Moderní AI modely podporují volání funkcí (<i lang="en">function/tool calling</i>). TanStack AI poskytuje pro práci s nimi kompletní řešení.</p>

<p>Nástroje lze definovat jednou a následně je spouštět jak na serveru, tak na klientovi:</p>

<pre><code>import { toolDefinition } from '@tanstack/ai'

const weatherTool = toolDefinition({
  name: 'getWeather',
  description: 'Získá informace o počasí pro dané město',
  parameters: z.object({
    city: z.string(),
  }),
})
  .server(async ({ city }) => {
    // Implementace na serveru
    const weather = await fetchWeather(city)
    return weather
  })</code></pre>


<p>TanStack AI automaticky zpracovává celý cyklus:</p>

<ol>
  <li>AI model požaduje zavolání nástroje,</li>
  <li>TanStack AI spustí odpovídající funkci,</li>
  <li>výsledek se vrátí zpět do modelu,</li>
  <li>model pokračuje v odpovědi s využitím získaných dat.</li>
</ol>

<p>Vývojář nemusí ručně řešit orchestraci těchto kroků.</p>


<h3 id="schvalovani-nastroju">Schvalování nástrojů</h3>

<p>U citlivých operací může být užitečné nechat uživatele <b>schválit spuštění nástroje</b> před jeho provedením.</p>

<p>TanStack AI toto podporuje out-of-the-box – stačí nastavit, že nástroj vyžaduje schválení, a aplikace automaticky zobrazí uživateli dialog s možností potvrdit nebo zamítnout akci.</p>


<h2 id="react-integrace">Integrace s Reactem</h2>

<p>Pro React existuje balíček <code>@tanstack/ai-react</code>, který poskytuje ready-to-use komponenty a hooks.</p>

<p>Základní použití s hookem <code>useChat</code>:</p>

<pre><code>import { useChat } from '@tanstack/ai-react'

function ChatComponent() {
  const { messages, sendMessage, isLoading } = useChat({
    endpoint: '/api/chat'
  })

  return (
    &lt;div>
      {messages.map((message) => (
        &lt;div key={message.id}>
          &lt;strong>{message.role}:&lt;/strong> {message.content}
        &lt;/div>
      ))}

      &lt;button
        onClick={() => sendMessage('Ahoj!')}
        disabled={isLoading}
      >
        Odeslat zprávu
      &lt;/button>
    &lt;/div>
  )
}</code></pre>


<p>Hook se stará o správu zpráv, odesílání, stream odpovědí a stav načítání.</p>


<h3 id="headless-komponenty">Headless komponenty</h3>

<p>TanStack AI poskytuje <b>headless UI komponenty</b> – tedy plně funkční logiku bez definovaného vzhledu.</p>

<p>Vývojář tak má naprostou kontrolu nad designem, zatímco TanStack AI řeší složitou vnitřní logiku (streaming, správa zpráv, volání nástrojů atd.).</p>


<h2 id="reasoning-modely">Podpora reasoning modelů</h2>

<p>Některé pokročilé modely (např. OpenAI o1) podporují tzv. <b>reasoning/thinking režim</b>, kde model před odpovědí „přemýšlí" a tento proces je možné sledovat.</p>

<p>TanStack AI plně podporuje streamování těchto thinking tokenů na klienta, takže uživatel může vidět, jak model přemýšlí nad problémem.</p>


<h2 id="devtools">Developer Tools</h2>

<p>TanStack AI přináší vývojářské nástroje, které ukazují v reálném čase <b>vše, co se děje mezi aplikací a AI</b>.</p>

<p>Vidíte:</p>

<ul>
  <li>jaké requesty se posílají,</li>
  <li>které nástroje AI volá,</li>
  <li>jak probíhá streaming odpovědí,</li>
  <li>jaké jsou thinking tokeny u reasoning modelů.</li>
</ul>

<p>To výrazně zjednodušuje debugování a pochopení, co AI vlastně dělá.</p>


<h2 id="multijazykova-podpora">Víc než jen JavaScript</h2>

<p>Kromě JavaScriptu a TypeScriptu podporuje TanStack AI i <b>PHP a Python</b>.</p>

<p>Všechny tři jazyky nabízejí plnou podporu agentických toků s nástroji, což umožňuje používat TanStack AI napříč různými backendy.</p>


<h2 id="open-source">Open source bez vendor lock-in</h2>

<p>TanStack AI je čistě <b>open source</b> – není to služba, ale knihovna.</p>

<p>To znamená:</p>

<ul>
  <li>žádné poplatky za použití TanStack AI,</li>
  <li>žádný prostředník mezi aplikací a AI poskytovateli,</li>
  <li>přímé připojení k poskytovatelům dle výběru,</li>
  <li>úplná kontrola nad daty.</li>
</ul>

<p>Platí se pouze za použití samotných AI modelů u jejich poskytovatelů, nikoli za TanStack AI.</p>


<h2 id="proc-pouzit">Proč použít TanStack AI?</h2>

<p>TanStack AI se hodí hlavně v těchto případech:</p>

<ol>
  <li>
    <p><b>Chcete nezávislost na poskytovateli</b> – možnost snadno přepínat mezi různými AI službami bez rozsáhlých úprav kódu.</p>
  </li>

  <li>
    <p><b>Potřebujete type safety</b> – TypeScript pokrytí minimalizuje chyby a zlepšuje vývojářský zážitek.</p>
  </li>

  <li>
    <p><b>Děláte aplikaci s AI nástroji</b> – podpora function calling je první třídy s automatickou orchestrací.</p>
  </li>

  <li>
    <p><b>Nechcete se zavazovat k frameworku</b> – možnost použít TanStack AI s libovolným frameworkem nebo bez něj.</p>
  </li>
</ol>


<h2 id="alfa-verze">Alfa verze</h2>

<p>TanStack AI je aktuálně v <b>alfa verzi</b>. To znamená, že API se může ještě měnit a nejsou všechny plánované funkce implementované.</p>

<p>Pro produkční nasazení je dobré počítat s tím, že při aktualizacích může být potřeba upravit kód.</p>

<p>Na druhou stranu alfa verze již nabízí solidní základ a mnoho projektů ji úspěšně používá.</p>


<h2 id="zaver">Závěr</h2>

<p>TanStack AI rozšiřuje rodinu kvalitních open source nástrojů od TanStack týmu.</p>

<p>Pokud hledáte způsob, jak elegantně integrovat AI do webové aplikace bez vendor lock-in, stojí TanStack AI rozhodně za prozkoumání.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
  <ul>
    <li><a href="https://tanstack.com/ai/latest">TanStack AI dokumentace</a></li>
    <li><a href="https://tanstack.com/blog/tanstack-ai-alpha-your-ai-your-way">TanStack AI Alpha: Your AI, Your Way</a> – oznámení alfa verze</li>
    <li><a href="https://github.com/TanStack/ai">GitHub: TanStack/ai</a></li>
    <li><a href="https://tanstack.com/ai/latest/docs/getting-started/quick-start">Quick Start Guide</a></li>
    <li><a href="https://tanstack.com/ai/latest/docs/guides/tools">Tools dokumentace</a></li>
  </ul>
</div>
