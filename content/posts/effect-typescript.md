---
title: "Effect: Chybějící standardní knihovna pro TypeScript"
headline: "Effect: Chybějící standardní knihovna pro TypeScript"
description: "Co je Effect, proč vznikl a jak může zlepšit váš TypeScript kód. Typově bezpečné zpracování chyb, správa zdrojů a strukturovaná konkurence."
date: "2025-12-05"
last_modification: "2025-12-05"
status: 1
tags: ["typescript", "napady", "programovani"]
format: "html"
---

<p><b>Effect</b> je TypeScript knihovna, která si klade za cíl být „chybějící standardní knihovnou" pro TypeScript. Přináší funkcionální programování do světa TypeScriptu a pomáhá psát robustnější, bezpečnější a lépe udržovatelný kód.</p>

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
    <li><b>Validace a schémata</b> – modul <code>Schema</code> nahrazuje <a href="https://zod.dev/" target="_blank">Zod</a></li>
    <li><b>Utility funkce</b> – moduly jako <code>Array</code>, <code>Option</code>, <code>Stream</code> nahrazují <a href="https://lodash.com/" target="_blank">Lodash</a></li>
    <li><b>Reaktivní streamy</b> – modul <code>Stream</code> nabízí podobné možnosti jako <a href="https://rxjs.dev/" target="_blank">RxJS</a></li>
</ul>

<p>Místo kombinování různých knihoven s různými API máte jeden konzistentní nástroj.</p>

<h2 id="zakladni-koncept">Základní koncept: Effect jako popis výpočtu</h2>

<p>Klíčem k pochopení Effect je uvědomit si, že <code>Effect&lt;A, E, R&gt;</code> je <b>popis</b> výpočtu, ne samotný výpočet:</p>

<ul>
    <li><b>A</b> – typ úspěšného výsledku</li>
    <li><b>E</b> – typ možné chyby</li>
    <li><b>R</b> – požadované závislosti (requirements)</li>
</ul>

<pre><code>// Popis: "Něco, co vrátí User, může selhat s DatabaseError
// a potřebuje DatabaseService"
type GetUser = Effect&lt;User, DatabaseError, DatabaseService&gt;</code></pre>

<p>Teprve když Effect „spustíte", začne se skutečně vykonávat. Toto oddělení popisu od provedení přináší řadu výhod – můžete efekty skládat, transformovat a testovat, aniž byste cokoli skutečně spouštěli.</p>

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

<h2 id="ekosystem">Ekosystém</h2>

<p>Kolem Effect vzniká ekosystém dalších nástrojů:</p>

<ul>
    <li><b>@effect/schema</b> – validace a transformace dat</li>
    <li><b>@effect/platform</b> – abstrakce nad platformou (Node.js, Bun, prohlížeč)</li>
    <li><b>@effect/sql</b> – typově bezpečná práce s SQL databázemi</li>
    <li><b>@effect/rpc</b> – typově bezpečné RPC volání</li>
</ul>

<h2 id="zaver">Závěr</h2>

<ul>
    <li><p><b>Effect</b> je knihovna, která přináší funkcionální programování do TypeScriptu.</p></li>
    <li><p>Řeší problémy, které TypeScript sám neřeší – <b>typově bezpečné chyby</b>, <b>správu zdrojů</b> a <b>strukturovanou konkurenci</b>.</p></li>
    <li><p>Může nahradit několik knihoven najednou (Zod, Lodash, RxJS).</p></li>
    <li><p>Má strmou křivku učení, ale pro komplexní aplikace se vyplatí.</p></li>
    <li><p>Lze zavádět postupně – nemusíte přepisovat celou aplikaci najednou.</p></li>
</ul>

<p>Více informací najdete na <a href="https://effect.website/" target="_blank">effect.website</a> a v <a href="https://effect.website/docs" target="_blank">dokumentaci</a>.</p>
