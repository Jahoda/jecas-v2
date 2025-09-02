---
title: "SPA přístup pro obsahové weby"
headline: "SPA přístup pro obsahové weby"
description: "Jak vytvořit obsahový web s dynamickým načítání obsahu bez obnovení celé stránky."
date: "2025-09-03"
last_modification: "2025-09-03"
status: 1
tags: []
format: "html"
---

<p>Pro zlepšení <b>uživatelského dojmu</b> z webu může posloužit moderní přístup k načítání obsahu bez obnovení celé stránky.</p>

<p>Díky <b>dynamickému načítání obsahu</b> může být přechod mezi stránkami <b>rychlejší a plynulejší</b>.</p>

<ol>
  <li>Stačí přenášet jen obsah, <b>který se mění</b>.</li>
  
  <li>Překreslovat se bude jen <b>část stránky</b>, která se změnila. Namísto kompletního <a href="/vykreslovani">vykreslení stránky</a> od nuly.</li>
</ol>

<p>Na prvním bodu většinou ani moc nezáleží – velikost výsledných HTML kódů se obvykle pohybují v <b>desítkách kilobytů</b>, což příliš velký prostor pro úsporu <b>nepřináší</b>. Překreslování jen <b>změněné části</b> ale většinou velmi znatelně přechod po webu <b>zrychlí</b>.</p>


<h2 id="jak">Jak na to</h2>

<p>Dříve se tato metoda nazývala jako <a href="/ajax">AJAX</a> (ajaxová stránka apod.), někdy také jako PJAX (pushState + AJAX). Dnes se tomu říká nejčastěji <a href="/spa">SPA</a> – single page aplikace.</p>

<p>Nicméně nic nebrání udělat celý obsahový web ve stylu SPA.</p>

<h3 id="fetch-api">Fetch API</h3>
<p>Nativní JavaScript API, které nahradilo starý <code>XMLHttpRequest</code>. Umožňuje čistou práci s HTTP požadavky pomocí <code>Promise</code> objektů a <code>async/await</code> syntaxe.</p>

<h3 id="history-api">History API</h3>
<p>Zásadní věc je podpora <a href="/zmena-url">změny URL JavaScriptem</a> pomocí <code>history.pushState</code> – dnes je to <b>podporováno všemi moderními prohlížeči</b> včetně mobilních.</p>

<p>To umožní i při obsloužení změny obsahu dynamicky <b>změnit URL</b> do podoby, která se může načíst i bez JS. Bez této funkce bych se do <b>obsahového webu</b> s dynamickým načítáním <b>nepouštěl</b>.</p>

<h3 id="spa-vs-ssr">SPA vs. SSR přístup</h3>
<p>Dnešní weby často používají hybridní přístup - <b>Server-Side Rendering</b> pro první načtení a <b>Client-Side Routing</b> pro další navigaci. To kombinuje výhody rychlého prvního načtení s plynulou navigací.</p>








<h2 id="nacitani">Signalisace načítání</h2>

<p>Je dobré znázornit, že se po kliknutí na odkaz něco děje. Při klasickém přecházení mezi stránkami to automaticky <b>řeší prohlížeč</b>. Při dynamické změně obsahu to musíme řešit vlastní signalisací.</p>

<p><b>Znázorňovat načítání</b> nemusí být dobré <b>ihned po kliknutí</b>. Pokud web funguje normálně, mělo by načtení obsahu <b>být tak rychlé</b> (desítky až nízké stovky milisekund), že by znázornění načítání stejně jen probliklo.</p>

<p>Uživatelé bývají zvyklí, že se po kliknutí na odkaz <b>chvíli nic neděje</b>, nabízí se tedy načítání znázorňovat třeba až <b>0,5 vteřiny</b> od vyvolání akce.</p>

<p>Moderní přístupy používají <b>skeleton loadery</b> nebo <b>progressive enhancement</b> pro lepší UX.</p>





<h2 id="prednacitani">Přednačítání a optimalisace</h2>

<p>Zrychlit dojem z webu může ještě <b>přednačítání</b>. Celý proces změny obsahu rozložíme do dvou kroků.</p>

<ol>
  <li><b>stažení/zpracování</b> obsahu,</li>
  
  <li><b>zobrazení</b> obsahu</li>
</ol>

<p>Má to svoje výhody i nevýhody. Umožní to <b>rychlejší změnu obsahu</b>, ale může <b>plýtvat daty</b> (načte se něco, co uživatel nakonec nebude chtít zobrazit).</p>

<p>Rozumné může být přednačtení při najetí myší (<a href="/udalosti-mysi#onmouseover"><code>onmouseover</code></a>) nebo stisknutí tlačítka (<a href="/udalosti-mysi#onmousedown"><code>onmousedown</code></a>). Zvlášť při stisknutí tlačítka myši nad odkazem je <b>vysoká šance</b>, že uživatel dokončí kliknutí (neodjede myší pryč) a můžeme tak získat třeba <b>100 milisekund</b>, které běžné kliknutí trvá (stisknutí a uvolnění tlačítka). Tedy v době dokončení kliknutí už mít načteno.</p>

<p>Moderní prohlížeče také podporují <code>Intersection Observer API</code>, které umožňuje efektivněji detekovat, kdy se odkazy dostanou do viewportu a případně je přednačítat.</p>


<h2 id="hotova-reseni">Hotová řešení</h2>

<p>Dnešní populární JS frameworky toto chování podporují, aniž by se autor webu musel nějak snažit.</p>

<ul>
  
  <li><a href="https://github.com/vercel/next.js">Next.js</a> – React framework s hybridním SSR/SPA přístupem</li>
  
  <li><a href="https://github.com/nuxt/nuxt">Nuxt.js</a> – Vue.js framework s podobnými možnostmi</li>
  
  <li><a href="https://github.com/sveltejs/kit">SvelteKit</a> – moderní Svelte framework s univerzálním renderingem</li>
</ul>

<h2 id="implementace">Implementace v JavaScriptu</h2>

<p>Zde je příklad, jak implementovat dynamické načítání obsahu pomocí <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Fetch API</a>.</p>

<p>Minimální implementace v čistém JS může vypadat následovně:</p>

<pre><code>async function loadContent(url) {
  try {
    // Načtení HTML obsahu z URL pomocí Fetch API
    const response = await fetch(url);
    // Extrakce textového obsahu z response
    const html = await response.text();
    
    // Vložení načteného HTML do elementu s ID 'content'
    document.getElementById('content').innerHTML = html;
    // Aktualizace URL v prohlížeči bez obnovení stránky
    history.pushState({}, '', url);
  } catch (error) {
    // Ošetření chyby při načítání
    console.error('Chyba při načítání obsahu:', error);
  }
}

// Poslouchání kliknutí na všechny odkazy
document.addEventListener('click', (e) => {
  // Kontrola, zda kliknutý element je odkaz začínající na "/"
  if (e.target.matches('a[href^="/"]')) {
    // Zabránění výchozímu chování (obnovení stránky)
    e.preventDefault();
    // Volání funkce pro načtení obsahu
    loadContent(e.target.href);
  }
});</code></pre>

<h3 id="co-resit">Co je potřeba vyřešit pro reálnou implementaci</h3>

<p>Výše uvedený kód je pouze základní ukázkou. Pro produkční nasazení je potřeba vyřešit:</p>

<ul>
  <li><b>Titulek stránky</b> – měnit <code>&lt;title></code> webu, mít správné meta tagy, Open Graph, strukturovaná data</li>
  <li><b>Tlačítka vpřed/zpět</b> – obsluha navigace v prohlížeči</li>
  <li><b>Připojování/odpojování JS</b> – pokud stránky používají JS, musí se řešit init a destroy po změně navigace</li>
  <li><b>Odesílání formulářů</b> – další věc je odesílání formulářů JavaScriptem</li>
  <li><b>Loading stavy</b> – indikátory načítání, skeleton loadery</li>
  <li><b>Error handling</b> – mít nějaký fallback při selhání načítání</li>
  <li><b>Analytické nástroje</b> – sledování page views a uživatelského chování funguje u SPA trochu jinak</li>
</ul>

<p>Proto se v praxi často používají osvědčené frameworky jako Next.js, Nuxt.js nebo SvelteKit, které tyto problémy řeší <i lang="en">out-of-the-box</i>.</p>

<h2 id="nevyhody">Nevýhody SPA přístupu</h2>

<p>I když má SPA přístup mnoho výhod, má také své nevýhody, které je potřeba zvážit:</p>

<h3 id="komplexita">Zvýšená komplexita</h3>
<p>Implementace SPA funkcionality vyžaduje řešení mnoha problémů, které klasické weby řeší automaticky:</p>
<ul>
  <li><b>State management</b> – správa stavu aplikace mezi navigacemi</li>
  <li><b>Memory leaks</b> – risiko úniku paměti při nesprávném odstraňování event listenerů</li>
  <li><b>Event handling</b> – správné připojování/odpojování JavaScript funkcí</li>
  <li><b>Form handling</b> – odesílání formulářů bez obnovení stránky</li>
</ul>

<p>Každá chyba může být fatální.</p>

<p>Výhoda klasického přístupu je, že i když web používá JavaScript, každá změna navigace reálně znamená <b>restart aplikace</b>. SPA může <i>hnít</i> v prohlížeči klidně měsíce.</p>


<h3 id="performance">Výkon</h3>
<p>SPA přístup má své nevýhody i v oblasti výkonu – zejména <b>první načtení</b>, které je pomalejší kvůli stahování obslužného JS.</p>

<h3 id="accessibility">Přístupnost</h3>
<p>Docílit dobré přístupnosti může být v SPA složitější:</p>
<ul>
  <li><b>Čtečky obrazovky</b> – mohou mít problémy s dynamicky měnícím se obsahem</li>
  <li><b>Ovládání klávesnicí</b> – focus management je složitější</li>
</ul>

<h3 id="debugging">Složitější debugging</h3>
<p>Vývoj a údržba SPA může být náročnější, protože mohou existovat chyby, které se projeví třeba až při načtení více stránek v určitém pořadí, což se špatně odhaluje, popisuje a reprodukuje.</p>

<h2 id="zaver">Závěr</h2>

<p>Doporučuji pečlivě zvážit, zda SPA přístup skutečně přináší hodnotu pro konkrétní projekt, nebo zda není lepší zůstat u klasického server-side renderingu.</p>

<p>Zajímavým příkladem je třeba <a href="https://astro.build">Astro</a>, které schválně používá plnohodnotnou navigaci mezi stránkami. Pokud je web rychlý sám o sobě, těžko jde reálně poznat rozdíl.</p>

<p>Potřebnou JS funkcionalitu jde realizovat přes tzv. <i>Islands architecture</i>, kdy se na potřebná místa na stránce doplňují JS komponenty, které ale neblokují vykreslování hlavního obsahu.</p>

<p>Pro SPA chování na obsahové stránce bych tak hledal opravdu dobrý důvod. Kdy má tedy SPA přístup skutečně smysl? Napadají mě následující případy:</p>

<ol>
  <li><b>Real-time funkcionalita</b> – chat aplikace, live updates, notifikace, přehrávání videa <i>nad</i> samotnou stránkou – klasická změna navigace by přerušila zážitek</li>
  <li><b>Zabudované ve frameworku</b> – pokud SPA chování framework automaticky podporuje, asi není potřeba to za každou cenu vypínat</li>
</ol>


<p>Klíčové je <b>neřešit technické problémy, které neexistují</b>. Pokud klasický web funguje dobře a uživatelé si nestěžují, není důvod přidávat složitost.</p>