---
title: "Offline stránka v PWA přes ServiceWorker"
headline: "Offline stránka v PWA přes ServiceWorker"
description: "Jak udělat web fungující offline. A splnit tak požadavky na PWA."
date: "2021-05-06"
last_modification: "2021-05-24"
status: 1
tags: ["hotova-reseni", "js", "offline"]
format: "html"
---

<p>PWA (<i lang="en">Progressive Web Apps</i>) je postup, jak vytvářet webové stránky, které se chováním podobají nativním aplikací.</p>

<p>Tedy v tomto případě například <b>fungují bez připojení k internetu</b>.</p>

<h2 id="proc">Proč mít PWA</h2>











<p>V praxi je to dobré například k tomu, aby stránku šlo v <b>Chrome</b> <i>nainstalovat</i>.</p>

<p><img src="/files/offline-pwa/instalace-aplikace.png" alt="Instalace aplikace" class="border"></p>



















<p>Výsledkem je potom v <b>macOS</b> upravené okno prohlížeče Chrome a přidání ikony mezi ostatní aplikace:</p>

<p><img src="/files/offline-pwa/nainstalovana-aplikace.png" alt="Nainstalovana aplikace" class="border"></p>



































<p>Na <b>Androidu</b> to jde takový web připnout na plochu mezi ostatní aplikace.</p>


<p><b>Chrome</b> jeden čas upozorňoval, že v budoucnu bude možná vyžadovat i <b>offline fungování</b>.</p>

<blockquote>
  <p>Site cannot be installed: Page does not work offline. Starting in Chrome 93, the installability criteria is changing, and this site will not be installable. See https://goo.gle/improved-pwa-offline-detection for more information.</p>
</blockquote>






<p>Nakonec byl tento požadavek pro splnění PWA odložen. Ale kdo ví, kdy zase přijde.</p>

<p>Ověřit, co má stránka splňovat, aby byla validní PWA, jde zjistit v <a href="/vyvojarske-nastroje">DevTools</a> na záložce <b>Lighthouse</b>:</p>

<p><img src="/files/offline-pwa/validace-pwa-v-chrome.png" alt="Validace PWA v Chrome" class="border"></p>






<h2 id="sw">Vytvoření ServiceWorkeru</h2>

<p>Aby vůbec mohl ServiceWorker fungovat, musí web běžet na <a href="/https">HTTPS</a> (výjimkou je vývoj na <a href="/localhost">localhostu</a>).</p>

<p>ServiceWorker je skript psaný v JavaScriptu. Většinou se tento soubor jmenuje <code>sw.js</code> nebo <code>serviceWorker.js</code>.</p>

<p>Záleží na tom, kde je umístěn. Je to dost důležité, protože pokud bude registrován z umístění např. <code>assets/js/sw.js</code>, nebude fungovat na adresách, které nezačínají <code>assets/js</code>.</p>

<p>Proto se většinou dává rovnou do rootu webu. Případně jde nastavit <i>rozsah působení</i> parametrem <code>scope</code>:</p>

<pre><code>if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js', { scope: '/'})
}</code></pre>












<p>Výše uvedený kód zaregistruje SW, pokud ho prohlížeč podporuje.</p>

<h2 id="stranka">Offline stránka <code>offline.html</code></h2>

<p>Offline stránka může být pro jednoduchost <a href="/html-kostra">obyčejný HTML soubor</a> s inline styly i obrázky:</p>

<pre><code>&lt;!doctype html&gt;
&lt;meta charset="utf-8"&gt;
&lt;title&gt;Offline&lt;/title&gt;
&lt;meta name="viewport" content="width=device-width,initial-scale=1">
Jste offline.</code></pre>












<p>V offline stránce je možné používat JS, takže není problém například přidat chování, aby se stránka sama obnovila, když je uživatel opět online:</p>

<pre><code>&lt;script>
    window.addEventListener('online',  function () {
        window.location.reload()
    })
&lt;/script></code></pre>








<p>Jde používat i externí styly, skripty nebo obrázky, ale musely by se rovněž přidat do cache.</p>


<h2 id="obsah">Obsah <code>serviceWorker.js</code></h2>

<p>Úplně základní offline stránku stačí při instalaci workeru uložit do cache.</p>

<p>Třeba následovně:</p>

<pre><code>const CACHE_VERSION = 1
const CACHE = {
    OFFLINE: 'offline-cache-' + CACHE_VERSION,
}
const OFFLINE_URL = 'offline.html'

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE.OFFLINE).then(function (cache) {
            return cache.add(OFFLINE_URL)
        })
    )
})</code></pre>


















<p>Tento kód při instalaci SW (událost <code>install</code>) otevře cache s názvem <code>offline-cache-1</code> (případně ji vytvoří, pokud neexistuje – těchto keší může být i víc) a přidá do ní obsah z URL <code>offline.html</code>.</p>



<p>Druhý úkol je odchytávat <code>fetch</code> události. Tam si je možné upravit chování standardních požadavků na soubory.</p>

<p>A v případě chyby vrátit <code>offline.html</code> z cache:</p>

<pre><code>self.addEventListener('fetch', function (event) {
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' &amp;&amp; event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            (async function () {
                try {
                    return await fetch(event.request, { redirect: 'manual' })
                } catch {
                    const cache = await caches.open(CACHE.OFFLINE)
                    return await cache.match(OFFLINE_URL)
                }
            })()
        )
    }
})</code></pre>













<p>To je celé.</p>

<p>Celý kód je obalen do podmínky omezující vykonávání na případy, kdy je cílem získat dokument. Konstrukce <code>event.request.mode</code> nefunguje všude, proto je uvedena ještě alternativní podmínka. Jsou tam kvůli tomu, aby se v případě požadavků třeba na obrázky nic nedělalo.</p>

<p>Za povšimnutí stojí <code>{ redirect: 'manual' }</code> – bez toho nemusí offline stránka fungovat, pokud se na doméně používá nějaké přesměrování.</p>

<p>Volání standardního požadavku metodou <code>fetch</code> je v <code>try</code> – <code>catch</code> bloku, takže v případě chyby (tj. uživatel je offline) se otevře cache a pokusí se v ní najít soubor <code>offline.html</code>.</p>






<p>Na kartě <i>Network</i> je potom u <i>requestů</i> vidět, že je zpracoval ServiceWorker (znázorňuje to ozubené kolečko před názvem):</p>

<p><img src="/files/offline-pwa/zpracovani-pozadavku-sw.png" alt="Zpracování požadavku SW" class="border"></p>









<h2 id="debuggovani">Debugování a vývoj</h2>

<p>Základem je karta <i>Application</i> ve vývojářských nástrojích <b>Chrome</b>.</p>

<p>Je zde vidět samotný Service Worker – v jakém je stavu:</p>

<p>Pro vývoj se hodí možnost <i>Update on reload</i> a pro otestování si zapnout <i>Offline</i>. Jen pozor na to, že obě zaškrtnuté položky způsobí, že se offline stránka nezobrazí.</p>

<p><img src="/files/offline-pwa/dev-tools-serviceworker.png" alt="Dev Tools ServiceWorker" class="border"></p>


































<p>Užitečné může být i podívat se do cache:</p>

<p><img src="/files/offline-pwa/dev-tools-cache.png" alt="Dev Tools cache" class="border"></p>


































<p>Je dobré tohle fakt dobře otestovat, protože nakešovaný nefunkční <code>serviceWorker.js</code> může klidně návštěvníkům web úplně vyřadit.</p>

<p>Když ServiceWorker zpracovává všechny požadavky na HTML stránky jako na příkladu výše, může kompletně rozbít toto servírování obsahu návštěvníkovi.</p>



<h2 id="manifest">Soubor <code>manifest.json</code></h2>

<p>Další podmínkou PWA je <code>manifest.json</code> – jedná se o soubor ve formátu <a href="/json">JSON</a>, kde jsou základní informace o aplikaci a odkazy na ikony.</p>

<p>Asi nejsnazší je si takový soubor vytvořit použitím nějakého generátoru:</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://manifest-gen.netlify.app">Web App Manifest Generator</a>
    </li>
  </ul>
</div>

<p>Výstupem je něco takového:</p>

<pre><code>{
  "name": "Je čas",
  "short_name": "Je čas",
  "theme_color": "#1079CF",
  "background_color": "#fff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "images/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
  ]
}</code></pre>

















<p>Tento soubor se připojuje značkou <code>&lt;link></code> v hlavičce webu.</p>

<h3 id="maskable">Maskable ikona</h3>

<p>Posledním trendem v ikonách aplikací je tzv. <i>maskable</i> formát. Řeší to problém, kdy různé verse a nadstavby Androidu mají jinak přizpůsobené ikony – zejména jejich zaoblení.</p>

<p><img src="/files/offline-pwa/zaobleni-maskable-ikony.png" alt="Zaoblení maskable ikony" class="border"></p>
















<p>Aby se nemusely vytvářet různé varianty, <a href="https://www.w3.org/TR/appmanifest/#icon-masks">maskable formát</a> definuje ochrannou zónu kolem ikony.</p>

<p><img src="/files/offline-pwa/ochranna-zona-ikony.png" alt="Ochranná zóna ikony" class="border"></p>


































<p>To znamená, že cokoliv mimo zelený kruh může systém libovolně zprůhlednit.</p>

<p>Pro připravení vlastní <i>maskable</i> ikony se hodí:</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://maskable.app/editor">Maskable.app Editor</a> – nástroj pro vygenerování <i>maskable</i> ikony
    </li>
  </ul>
</div>

<p>Odkaz na tuto ikonu je následně potřeba přidat do <code>manifest.json</code> mezi ostatní ikony (do pole <code>icons</code>):</p>

<pre><code>    {
      "src": "images/icons/maskable_icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable",
      "density": 4
    }</code></pre>









<h2 id="ma-smysl">Má smysl mít PWA?</h2>

<p>Při splnění kroků výše bude web splňovat formální požadavky na PWA, které je možné automaticky testovat <b>Lighthouse</b> nástrojem ve vývojářských nástrojích.</p>

<p><img src="/files/offline-pwa/validni-pwa-lighthouse.png" alt="Validní PWA Lighthouse" class="border"></p>



















<p>Podobně jako kdysi řešená <a href="/validita">validita HTML/CSS kódu</a> nezajišťovala automaticky dobrý web, ani stránka splňující PWA nemusí být nikterak lepší.</p>

<p>Příklad popsaný v tomto článku je tak trochu <i>PWA pro PWA</i> – praktický přínos pro uživatele je dost malý.</p>

<p><b>Výhoda PWA</b> je v podstatě jen možnost instalace na plochu na Androidu, kde je otázka, jestli to významné množství lidí potřebuje.</p>

<p>Význam takto hloupé <code>offline.html</code> stránky je trochu sporný.</p>

<p>Standardní hláška prohlížeče má výhody v tom, že je na ní návštěvník zvyklý, je přeložená do jeho jazyku a případně respektuje i nastavení světlého/tmavého režimu:</p>

<p><img src="/files/offline-pwa/chrome-offline-stranka.png" alt="Chrome offline stránka" class="border"></p>



















<p>Vlastní offline stránka tak může být pro návštěvníky zhoršení situace.</p>

<p><b>Nevýhoda PWA</b> spočívá v tom, že se musí navíc:</p>

<ol>
  <li>
    Spustit JS kód registrující ServiceWorker.
  </li>
  <li>
    Stáhnout a vykonat/instalovat kód v souboru <code>serviceWorker.js</code>. 
  </li>
  <li>
    Stáhnout a uložit do cache obsah stránky <code>offline.html</code>.
  </li>
  <li>
    Stáhnout a zpracovat obsah souboru <code>manifest.json</code>.
  </li>
  <li>
    Každý požadavek na soubory musí projít logikou ServiceWorkeru.
  </li>
</ol>

<p>První příchod na stránku tak znamená <b>stahovat další 3 soubory navíc</b>. K tomu sice malou, ale pořád nějakou zátěž v podobě JavaScriptu pro registraci, instalaci a samotného běhu SW.</p>

<p>Vytvářet PWA tak dává smysl spíš v situacích, kdy to nabídne návštěvníkům více funkcionality – například <b>push notifikace</b>.</p>

<p>Případně když stránka nabídne <b>opravdové offline použití</b>, ne jen vlastní chybovou offline stránku.</p>

<p>To je dobře proveditelné u <a href="/spa">SPA</a> (single page aplikací), kde se může díky ServiceWorkeru uložit do cache celá logika aplikace včetně skriptů, stylů nebo obrázků a opakovaný příchod na takovou stránku je téměř okamžitý, protože spuštění celé aplikace obslouží SW z cache.</p>


<h2 id="rozbiti">Risiko rozbití webu</h2>

<p>ServiceWorker s offline fungováním přináší dost velkou šanci poměrně zásadně rozbít celý web.</p>

<p>Je to tím, že pro offline fungování stránky veškeré požadavky prochází přes ServiceWorker. Takže když tam bude chyba, nemusí vůbec nic fungovat.</p>


<p>Velmi vhodné je mít před spuštěním na webu monitoring typu <a href="https://sentry.io/welcome/">Sentry</a>.</p>

<p>U větších webů ideálně pustit úpravu nejprve na menší část návštěvníků.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers">Making PWAs work offline with Service workers</a></li>
  <li>web.dev: <a href="https://web.dev/offline-fallback-page/">Create an offline fallback page</a></li>
  <li>StackOverflow: <a href="https://stackoverflow.com/questions/29874068/navigator-serviceworker-is-never-ready/58845198#58845198">navigator.serviceWorker is never ready</a> – problém s umístěním SW mimo root</li>
</ul>