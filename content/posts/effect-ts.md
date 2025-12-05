---
title: "Effect: Chybějící standardní knihovna pro TypeScript"
headline: "Effect: Chybějící standardní knihovna pro TypeScript"
description: "Effect nabízí typově bezpečné zpracování chyb a čitelnější práci s asynchronním kódem."
date: "2025-12-05"
last_modification: "2025-12-05"
status: 1
tags: ["ts", "js", "napady"]
format: "html"
---

<p><a href="https://effect.website/"><b>Effect</b></a> je TypeScript knihovna, která si klade za cíl být „chybějící standardní knihovnou" pro TypeScript. Přináší funkcionální programování do světa TypeScriptu a pomáhá psát robustnější, bezpečnější a lépe udržovatelný kód.</p>

<p>Vznikla jako odpověď na problémy, které TypeScript sám o sobě neřeší – zejména zpracování chyb, správu zdrojů a práci s asynchronním kódem.</p>

<h2 id="proc-effect">Proč Effect vznikl?</h2>

<p>TypeScript má skvělý typový systém, ale některé věci v něm zůstávají problematické:</p>

<ul>
    <li><b>Zpracování chyb</b> – <code>try/catch</code> nezachycuje typy výjimek, takže nevíte, co vám může vyletět.</li>
    <li><b>Null/undefined</b> – i s <code>strictNullChecks</code> je práce s nullable hodnotami nepohodlná.</li>
    <li><b>Asynchronní kód</b> – Promise jsou lepší než callbacky, ale stále mají svoje limity.</li>
    <li><b>Správa zdrojů</b> – otevřít soubor, připojit se k databázi a správně to zavřít je překvapivě těžké.</li>
    <li><b>Závislosti</b> – předávání závislostí (dependency injection) v TypeScriptu není standardizované.</li>
</ul>

<p>Effect na všechny tyto problémy nabízí elegantní řešení.</p>

<h2 id="funkcionalni-programovani">Funkcionální programování ve zkratce</h2>

<p>Effect vychází z funkcionálního programování (FP). Pokud s FP nemáte zkušenosti, zde jsou klíčové koncepty:</p>

<h3 id="ciste-funkce">Čisté funkce</h3>

<p>Funkce, která pro stejný vstup vždy vrátí stejný výstup a nemá vedlejší efekty (nemění globální stav, nepíše do databáze, nevolá API). Čisté funkce jsou snadno testovatelné a předvídatelné.</p>

<pre><code>const add = (a: number, b: number) => a + b
add(2, 3) // vždy 5</code></pre>

<h3 id="imutabilita">Imutabilita</h3>

<p>Data se nemění – místo modifikace vytváříte nové kopie. To eliminuje celou kategorii bugů způsobených neočekávanou mutací.</p>

<pre><code>const users = [{ name: "Alice" }]
const newUsers = [...users, { name: "Bob" }]</code></pre>

<h3 id="kompozice">Kompozice funkcí</h3>

<p>Malé funkce se skládají do větších celků. Můžete použít vnořené volání nebo pomocnou funkci <code>pipe</code>:</p>

<pre><code>// Vnořené volání – čte se zevnitř ven
const result = save(transform(validate(input)))

// Pomocí pipe – čte se zleva doprava (přirozenější)
const result = pipe(input, validate, transform, save)</code></pre>

<p><code>pipe</code> není nutná součást FP – je to jen syntaktický nástroj pro lepší čitelnost. Effect i další knihovny ho nabízejí, protože čtení „data protékají funkcemi" je intuitivnější než vnořené závorky.</p>

<h3 id="algebraicke-typy">Algebraické datové typy</h3>

<p><code>Option</code> reprezentuje hodnotu, která může chybět (náhrada za <code>null</code>). <code>Either</code>/<code>Result</code> reprezentuje výpočet, který může selhat. Tyto typy vynucují explicitní ošetření všech případů.</p>

<pre><code>type Option&lt;A&gt; = Some&lt;A&gt; | None
type Result&lt;E, A&gt; = Ok&lt;A&gt; | Err&lt;E&gt;</code></pre>

<p>Effect tyto koncepty integruje do jednotného typu <code>Effect&lt;Success, Error, Requirements&gt;</code>, který kombinuje výsledek, chybu i závislosti.</p>

<h2 id="hlavni-vlastnosti">Hlavní vlastnosti</h2>

<h3 id="typove-bezpecne-chyby">Typově bezpečné zpracování chyb</h3>

<p>V běžném TypeScriptu nevíte, jaké chyby funkce může vyhodit:</p>

<pre><code>// Co může vyhodit? Nevím, podívám se do dokumentace... možná.
function parseJSON(text: string): unknown {
    return JSON.parse(text);
}</code></pre>

<p>V Effect je chyba součástí typu:</p>

<pre><code>// Typ říká vše: může vrátit User, nebo selhat s ParseError
const parseUser: Effect&lt;User, ParseError&gt;</code></pre>

<p>Chyby se stávají hodnotami, které můžete předávat, transformovat a zpracovávat stejně jako normální data. Žádné překvapivé výjimky, které vybuchnou za běhu.</p>

<h3 id="option">Práce s null/undefined</h3>

<p>Effect nabízí typ <code>Option</code> jako náhradu za <code>null</code>/<code>undefined</code>. Upřímně – pro většinu případů v TypeScriptu stačí <code>?.</code> a <code>??</code>:</p>

<pre><code>const email = user?.profile?.email ?? "default@example.com"</code></pre>

<p><code>Option</code> se vyplatí hlavně ve dvou situacích:</p>

<p><b>1. Když používáte Effect</b> – <code>Option</code> se přirozeně integruje s ostatními Effect typy. Můžete ho převést na <code>Effect</code> a naopak:</p>

<pre><code>const program = pipe(
    Option.fromNullable(config.apiKey),
    Option.match({
        onNone: () => Effect.fail(new ConfigError("API key missing")),
        onSome: (key) => fetchData(key)
    })
)</code></pre>

<p><b>2. Když potřebujete rozlišit „nenalezeno" od „chyba"</b> – funkce vracející <code>Option</code> říká „hodnota nemusí existovat a to je OK". Funkce vracející <code>Effect</code> s chybou říká „něco se pokazilo":</p>

<pre><code>// Option: "uživatel nemusí existovat, to je normální"
const findUser = (id: string): Option&lt;User&gt;

// Effect: "pokud uživatel neexistuje, je to chyba"
const getUser = (id: string): Effect&lt;User, UserNotFoundError&gt;</code></pre>

<p>Pokud nepoužíváte Effect ekosystém, <code>Option</code> pravděpodobně nepotřebujete.</p>

<h3 id="sprava-zdroju">Bezpečná správa zdrojů</h3>

<p>Effect zajišťuje, že zdroje (soubory, připojení k databázi, síťová spojení) jsou vždy správně uvolněny, i když dojde k chybě:</p>

<pre><code>const program = Effect.acquireRelease(
    openFile("data.txt"),           // Získání zdroje
    (file) => closeFile(file)       // Uvolnění (vždy se provede)
)</code></pre>

<p>Nemusíte myslet na <code>finally</code> bloky a nemůžete zapomenout zavřít spojení.</p>

<h3 id="kompozice">Snadná kompozice</h3>

<p>Effect je navržen tak, aby se jednotlivé části daly snadno skládat dohromady:</p>

<pre><code>const program = pipe(
    fetchUser(userId),
    Effect.flatMap(validateUser),
    Effect.flatMap(saveToDatabase),
    Effect.catchTag("NetworkError", handleNetworkError)
)</code></pre>

<p>Každý krok je samostatná jednotka, kterou můžete testovat, znovupoužít a kombinovat s dalšími.</p>

<h3 id="strukturovana-konkurence">Strukturovaná konkurence</h3>

<p>Effect má vestavěnou podporu pro paralelní a konkurentní operace s automatickým zrušením:</p>

<pre><code>// Spustí tři požadavky paralelně a vrátí všechny výsledky
const results = Effect.all([
    fetchUserProfile(id),
    fetchUserPosts(id),
    fetchUserFriends(id)
], { concurrency: "unbounded" })</code></pre>

<p>Pokud některá operace selže nebo je zrušena, Effect automaticky zruší i ostatní běžící operace.</p>

<h3 id="nahrazuje-knihovny">Nahrazuje více knihoven</h3>

<p>Effect v sobě obsahuje funkce, které byste jinak řešili pomocí několika různých knihoven:</p>

<ul>
    <li><b>Validace a schémata</b> – modul <code>Schema</code> nahrazuje <a href="https://zod.dev/">Zod</a></li>
    <li><b>Utility funkce</b> – moduly jako <code>Array</code>, <code>Option</code>, <code>Stream</code> nahrazují <a href="https://lodash.com/">Lodash</a></li>
    <li><b>Reaktivní streamy</b> – modul <code>Stream</code> nabízí podobné možnosti jako <a href="https://rxjs.dev/">RxJS</a></li>
</ul>

<p>Místo kombinování různých knihoven s různými API máte jeden konzistentní nástroj.</p>

<h2 id="zakladni-koncept">Základní koncept: Effect jako popis výpočtu</h2>

<p>Klíčem k pochopení Effect je uvědomit si, že <code>Effect&lt;Success, Error, Requirements&gt;</code> je <b>popis</b> výpočtu, ne samotný výpočet:</p>

<ul>
    <li><b>Success</b> – typ úspěšného výsledku</li>
    <li><b>Error</b> – typ možné chyby</li>
    <li><b>Requirements</b> – požadované závislosti (služby, které efekt potřebuje)</li>
</ul>

<pre><code>// Popis: "Něco, co vrátí User, může selhat s DatabaseError
// a potřebuje DatabaseService"
type GetUser = Effect&lt;User, DatabaseError, DatabaseService&gt;</code></pre>

<p>Teprve když Effect „spustíte", začne se skutečně vykonávat. Toto oddělení popisu od provedení přináší řadu výhod – můžete efekty skládat, transformovat a testovat, aniž byste cokoli skutečně spouštěli.</p>

<h2 id="effect-try-vs-try-catch">Effect.try vs klasický try-catch</h2>

<p>Na první pohled může <code>Effect.try</code> vypadat jako zbytečná obálka kolem běžného <code>try-catch</code>. Ve skutečnosti přináší několik zásadních výhod.</p>

<h3 id="type-safety">Chyba je součástí typu</h3>

<p>V klasickém TypeScriptu funkce s <code>try-catch</code> neodhalí, že může selhat:</p>

<pre><code>function parseJSON(input: string): unknown {
    try {
        return JSON.parse(input)
    } catch (e) {
        throw new Error(`Parse failed: ${e}`)
    }
}
// Typ: (input: string) => unknown
// TypeScript NEVÍ, že funkce může vyhodit Error</code></pre>

<p>V Effect je chyba explicitně součástí typu:</p>

<pre><code>const parseJSON = (input: string) =>
    Effect.try({
        try: () => JSON.parse(input),
        catch: (e) => new Error(`Parse failed: ${e}`)
    })
// Typ: (input: string) => Effect&lt;unknown, Error, never&gt;
// Chyba Error je VIDITELNÁ v typu</code></pre>

<p>Kompilátor vás donutí chybu ošetřit – nemůžete ji ignorovat.</p>

<h3 id="expression-vs-statement">Hodnota místo příkazu</h3>

<p><code>try-catch</code> je příkaz (statement), který nemůžete přímo přiřadit nebo skládat. <code>Effect.try</code> vrací hodnotu, kterou můžete rovnou použít v pipeline:</p>

<pre><code>const program = pipe(
    parseJSON(input),
    Effect.flatMap(validate),
    Effect.flatMap(save),
    Effect.catchAll(logAndRecover)
)</code></pre>

<h3 id="lazy-evaluation">Odložené vykonání</h3>

<p><code>Effect.try</code> nic nespouští – vytváří pouze popis operace. Skutečné provedení nastane až při zavolání <code>Effect.runPromise</code>:</p>

<pre><code>const parse = Effect.try({ try: () => JSON.parse(input), catch: toError })
// Zatím se nic nestalo

Effect.runPromise(parse)
// Teprve teď se JSON.parse skutečně zavolá</code></pre>

<p>To umožňuje efekt znovupoužít, opakovat při selhání (retry), nebo testovat bez skutečného spuštění.</p>

<h3 id="flat-error-handling">Plochá struktura místo vnořování</h3>

<p>Klasický try-catch vede k vnořování:</p>

<pre><code>try {
    const data = JSON.parse(input)
    try {
        const validated = validate(data)
        try {
            await save(validated)
        } catch { /* handle save error */ }
    } catch { /* handle validation error */ }
} catch { /* handle parse error */ }</code></pre>

<p>Effect umožňuje plochou pipeline s ošetřením chyb kdekoli:</p>

<pre><code>const program = pipe(
    parseJSON(input),
    Effect.flatMap(validate),
    Effect.flatMap(save),
    Effect.catchTag("ParseError", handleParseError),
    Effect.catchTag("ValidationError", handleValidationError),
    Effect.catchTag("SaveError", handleSaveError)
)</code></pre>

<h2 id="jak-zacit">Jak začít s Effect</h2>

<p>Effect můžete do projektu zavádět postupně. Nemusíte přepisovat celou aplikaci:</p>

<pre><code>npm install effect</code></pre>

<p>Začněte s jednou funkcí nebo modulem a postupně rozšiřujte:</p>

<pre><code>import { Effect } from "effect"

// Jednoduchý Effect, který vrátí číslo
const program = Effect.succeed(42)

// Spuštění
Effect.runPromise(program).then(console.log) // 42</code></pre>

<h2 id="krivka-uceni">Křivka učení</h2>

<p>Effect má poměrně strmou křivku učení. Přináší koncepty z funkcionálního programování, které mohou být zpočátku nezvyklé:</p>

<ul>
    <li><b>Monády a funktory</b> – i když je nemusíte znát teoreticky, prakticky s nimi pracujete</li>
    <li><b>Pipe a flow</b> – skládání funkcí místo řetězení metod</li>
    <li><b>Laziness</b> – efekty se nevykonávají hned, ale až při spuštění</li>
</ul>

<p>Pro běžné projekty může být Effect zbytečně složitý. Ale pro větší aplikace, kde je důležitá spolehlivost a udržovatelnost, se investice do učení vyplatí.</p>

<h2 id="kdy-pouzit">Kdy Effect použít</h2>

<p><b>Effect se hodí pro:</b></p>

<ul>
    <li>Větší aplikace s komplexní business logikou</li>
    <li>Systémy, kde je kritická spolehlivost</li>
    <li>Projekty s mnoha externími závislostmi (databáze, API, soubory)</li>
    <li>Týmy, které chtějí jednotný přístup ke zpracování chyb</li>
</ul>

<p><b>Effect se pravděpodobně nehodí pro:</b></p>

<ul>
    <li>Malé projekty a jednoduché skripty</li>
    <li>Týmy bez zkušeností s funkcionálním programováním (alespoň zpočátku)</li>
    <li>Projekty, kde je prioritou rychlost vývoje nad robustností</li>
</ul>

<h3 id="frontend-backend">Frontend vs Backend</h3>

<p><b>Backend</b> – Effect zde září nejvíc. Správa zdrojů (databáze, soubory), strukturovaná konkurence, retry logika a dependency injection jsou přesně to, co backendové aplikace potřebují.</p>

<p><b>Frontend</b> – Effect lze použít, ale s rozmyslem:</p>

<ul>
    <li><b>Bundle size</b> – Effect není malá knihovna (~50 kB gzip), což může být problém pro performance-kritické weby</li>
    <li><b>UI reaktivita</b> – pro state management jsou lepší framework-specific nástroje (React Query, Svelte stores, Vue composables)</li>
    <li><b>Kdy ano</b> – komplexní business logika na klientu, offline-first aplikace, sdílený kód mezi FE a BE</li>
</ul>

<p>Nejčastější vzor je používat Effect na backendu a na frontendu jen pro sdílenou business logiku nebo validace pomocí <code>@effect/schema</code>.</p>

<h2 id="ekosystem">Ekosystém</h2>

<p>Kolem Effect vzniká ekosystém dalších nástrojů:</p>

<ul>
    <li><b>@effect/schema</b> – validace a transformace dat</li>
    <li><b>@effect/platform</b> – abstrakce nad platformou (Node.js, Bun, prohlížeč)</li>
    <li><b>@effect/sql</b> – typově bezpečná práce s SQL databázemi</li>
    <li><b>@effect/rpc</b> – typově bezpečné RPC volání</li>
</ul>

<h2 id="alternativy">Alternativy k Effect</h2>

<p>Effect není jediná knihovna, která řeší typově bezpečné zpracování chyb v TypeScriptu. Existuje několik alternativ s různou mírou komplexity:</p>

<h3 id="neverthrow">neverthrow</h3>

<p><a href="https://github.com/supermacro/neverthrow">neverthrow</a> je jednodušší knihovna zaměřená primárně na typově bezpečné chyby pomocí typu <code>Result</code>. Je ideální jako vstupní bod do světa funkcionálního error handlingu.</p>

<ul>
    <li><b>Výhody</b> – jednoduchá, malá, snadno se integruje do existujícího kódu</li>
    <li><b>Nevýhody</b> – pouze error handling, žádná správa zdrojů ani konkurence</li>
    <li><b>Použití</b> – když chcete typově bezpečné chyby bez velkých změn v projektu</li>
</ul>

<h3 id="fp-ts">fp-ts</h3>

<p><a href="https://gcanti.github.io/fp-ts/">fp-ts</a> je komplexní knihovna pro funkcionální programování v TypeScriptu. Nabízí typy jako <code>Either</code>, <code>Option</code>, <code>Task</code> a další.</p>

<ul>
    <li><b>Výhody</b> – rozsáhlá funkcionalita, velká komunita, dobře zdokumentovaná</li>
    <li><b>Nevýhody</b> – strmá křivka učení, méně intuitivní API než Effect</li>
    <li><b>Použití</b> – když chcete plnohodnotné FP a nevadí vám složitější syntax</li>
</ul>

<p>Effect je oficiální nástupce fp-ts. V roce 2023 se fp-ts projekt oficiálně sloučil s Effect-TS ekosystémem a tvůrce fp-ts, Giulio Canti, se připojil k Effect organizaci. Effect přináší modernější a přístupnější API, které řeší některé limity fp-ts a nabízí jednotný typ <code>Effect</code> místo více různých efektových typů.</p>

<h3 id="ts-results">ts-results</h3>

<p><a href="https://github.com/vultix/ts-results">ts-results</a> je minimalistická knihovna inspirovaná Rustem, která přináší typy <code>Result</code> a <code>Option</code>.</p>

<ul>
    <li><b>Výhody</b> – velmi jednoduchá, blízká Rust syntaxi</li>
    <li><b>Nevýhody</b> – omezená funkcionalita</li>
    <li><b>Použití</b> – pro vývojáře zvyklé na Rust</li>
</ul>

<h3 id="evolu">Evolu</h3>

<p><a href="https://www.evolu.dev/">Evolu</a> je TypeScript knihovna a local-first platforma. Její „Library" část nabízí podobné FP koncepty jako Effect – <code>Result</code>, <code>Task</code>, runtime validaci typů a dependency injection – ale v jednodušší formě.</p>

<ul>
    <li><b>Výhody</b> – jednodušší než Effect, obsahuje i local-first platformu pro offline aplikace s end-to-end šifrováním</li>
    <li><b>Nevýhody</b> – menší komunita, méně funkcí než plný Effect</li>
    <li><b>Použití</b> – když chcete FP patterny bez komplexity Effect, nebo budujete local-first aplikaci</li>
</ul>

<h3 id="srovnani">Jak vybrat?</h3>

<table>
    <thead>
        <tr>
            <th>Knihovna</th>
            <th>Komplexita</th>
            <th>Zaměření</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>neverthrow</td>
            <td>Nízká</td>
            <td>Pouze error handling</td>
        </tr>
        <tr>
            <td>ts-results</td>
            <td>Nízká</td>
            <td>Result + Option (Rust styl)</td>
        </tr>
        <tr>
            <td>fp-ts</td>
            <td>Vysoká</td>
            <td>Kompletní FP toolkit</td>
        </tr>
        <tr>
            <td>Effect</td>
            <td>Vysoká</td>
            <td>Kompletní platforma (FP + runtime)</td>
        </tr>
        <tr>
            <td>Evolu</td>
            <td>Střední</td>
            <td>FP základy + local-first platforma</td>
        </tr>
    </tbody>
</table>

<p>Pro jednoduché projekty stačí <b>neverthrow</b>. Pro local-first aplikace je zajímavá <b>Evolu</b>. Pro komplexní aplikace, kde potřebujete i správu zdrojů a konkurenci, je <b>Effect</b> lepší volba.</p>

<h3 id="tanstack-query">TanStack Query</h3>

<p><a href="https://tanstack.com/query">TanStack Query</a> (dříve React Query) nepoužívá Effect ani fp-ts interně – má minimální závislosti a je navržen jako lightweight knihovna. Lze je však kombinovat: Effect můžete použít v <code>queryFn</code> pro typově bezpečné zpracování chyb a business logiku, zatímco TanStack Query řeší cache a synchronizaci server state.</p>

<h2 id="svelte">Effect a Svelte/SvelteKit</h2>

<p>Effect lze používat se <a href="https://svelte.dev/">Svelte</a> a <a href="https://kit.svelte.dev/">SvelteKit</a>. Protože Effect je čistě TypeScript knihovna, funguje všude tam, kde běží TypeScript.</p>

<h3 id="sveltekit-integrace">Integrace se SvelteKit</h3>

<p>Pro SvelteKit existuje komunitní template <a href="https://github.com/mateoroldos/sveltekit-effect-template">sveltekit-effect-template</a>, který ukazuje, jak Effect integrovat:</p>

<ul>
    <li><b>Server-side</b> – Effect můžete používat v <code>+page.server.ts</code> a <code>+server.ts</code> souborech</li>
    <li><b>Load funkce</b> – pomocné funkce jako <code>runLoader</code> spouští Effect a mapují výsledky na SvelteKit odpovědi</li>
    <li><b>API routes</b> – Effect je ideální pro komplexní backend logiku</li>
</ul>

<pre><code>// +page.server.ts
import { Effect } from "effect"

export const load = async () => {
    const program = pipe(
        fetchUserData(),
        Effect.map(data => ({ user: data }))
    )

    return Effect.runPromise(program)
}</code></pre>

<h3 id="svelte-klient">Na klientu</h3>

<p>Na klientské straně Effect funguje také, ale většina jeho výhod (správa zdrojů, strukturovaná konkurence) se projeví spíš na serveru. Pro reaktivitu v UI je lepší používat Svelte stores a runes.</p>

<h2 id="zaver">Závěr</h2>

<ul>
    <li><p><b>Effect</b> je knihovna, která přináší funkcionální programování do TypeScriptu.</p></li>
    <li><p>Řeší problémy, které TypeScript sám neřeší – <b>typově bezpečné chyby</b>, <b>správu zdrojů</b> a <b>strukturovanou konkurenci</b>.</p></li>
    <li><p>Může nahradit několik knihoven najednou (Zod, Lodash, RxJS).</p></li>
    <li><p>Existují jednodušší alternativy (<b>neverthrow</b>, <b>ts-results</b>) pro základní error handling.</p></li>
    <li><p>Pro komplexní aplikace to může být dobrá volba.</p></li>
</ul>

