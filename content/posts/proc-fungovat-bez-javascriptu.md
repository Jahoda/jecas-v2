---
title: "13 důvodů, proč má web fungovat bez JavaScriptu i v roce 2025"
headline: "13 důvodů, proč má web fungovat bez JavaScriptu i v roce 2025"
description: "JavaScript je sice klíčový pro moderní web, ale jeho selhání není výjimkou. Zde je 13 důvodů, proč by měl web fungovat i bez něj."
date: "2025-02-03"
last_modification: "2025-03-11"
status: 1
tags: ["js", "napady", "seo"]
format: "html"
---

<h2 id="selhani-nacitani">1. Selhání načítání skriptů</h2>
<p>Ne vždy se JavaScript načte správně. Pomalé nebo přerušené připojení (například ve vlaku) může způsobit, že se skripty načtou opožděně nebo vůbec, což ovlivní funkčnost webu.</p>

<p>V podstatě každý návštěvník má <i>vypnutý JavaScript</i> do doby, než se stáhne a vykoná.</p>
















<h2 id="chyby">2. Chyby v kódu</h2>
<p>Jeden malý programátorský omyl může způsobit selhání celého skriptu, protože JavaScript není tak tolerantní k chybám jako HTML či CSS.</p>







<h2 id="cdn">3. Závislost na externích zdrojích</h2>
<p>Externí knihovny a CDN mohou mít výpadky. Pokud je základní obsah načten přímo z HTML a CSS, web zůstane dostupný i při selhání těchto zdrojů.</p>

<p>Pro rychlejší načítání se někdy externí JS knihovny připojují z cizí CDN. Je tam šance, že danou knihovnu už uživatel stáhnul na jiném webu.</p>

<p>Pokud web závisí na takovém JS, výpadek ho totálně rozbije.</p>


<h2 id="firewally">4. Firewally a síťová omezení</h2>
<p>Firewally, korporátní sítě nebo některá ISP mohou blokovat či upravovat JavaScriptové soubory, což může negativně ovlivnit funkčnost webu závislého na JS.</p>







<h2 id="vypnuty-js">5. Uživatelé s vypnutým JavaScriptem</h2>
<p>I když je jejich počet malý, web může být přístupný i pro uživatele, kteří z bezpečnostních nebo soukromých důvodů JavaScript deaktivují.</p>

<p>U webů, které to značně přehánějí s reklamou, to může dost zlepšit uživatelský zážitek.</p>


<p>V <b>Chrome</b> je možné JS vypnout po kliknutí na nastavení vedle adresy:</p>
<p><img src="/files/proc-fungovat-bez-javascriptu/vypnuti-v-chrome.png" alt="Vypnutí v Chrome" class="border"></p>




















<p>A přes volbu <i>Další nastavení a oprávnění</i>:</p>


<p><img src="/files/proc-fungovat-bez-javascriptu/chrome-dalsi-nastaveni.png" alt="Chrome další nastavení" class="border"></p>
























<p>Zde jde JS blokovat pro konkrétní web.</p>


<p><img src="/files/proc-fungovat-bez-javascriptu/chrome-blokovani-js.png" alt="Chrome blokování JS" class="border"></p>











<h2 id="sdileni-odkazu">6. Mikroprohlížeče a sdílení odkazů</h2>
<p>Odkazy <a href="/nahled-odkazu">sdílené na sociálních sítích</a> často načítají pouze základní HTML obsah. Zajištění funkčnosti bez JS znamená, že obsah bude správně zobrazen i v náhledech.</p>



<p>Další kapitolou jsou <a href="/ai-programovani">AI nástroje</a> a chatboty, které dokáží zpracovávat obsah z externích URL.</p>



<h2 id="adblock">7. Vliv rozšíření a adblockerů</h2>
<p>Prohlížečová rozšíření a <a href="/adblock-optimalisace">adblockery</a> mohou nechtěně ovlivnit běh JavaScriptu, což může vést ke ztrátě funkčnosti webu.</p>

<p>Rozšíření mohou například změnit strukturu <a href="/dom">DOMu</a> do podoby, se kterou JS nepočítá.</p>


<p>Adblocker zase může skript vyhodnotit jako reklamu a zablokovat ho.</p>





<h2 id="rychlost-nacitani">8. Rychlost načítání a uživatelská zkušenost</h2>
<p>Web, který funguje bez JavaScriptu, načte základní obsah rychleji, což ocení zejména uživatelé na mobilních zařízeních nebo s omezeným datovým tarifem.</p>






<h2 id="seo">9. Optimalizace pro vyhledávače (SEO)</h2>
<p>Vyhledávače lépe indexují obsah, který je přímo dostupný v HTML. Funkčnost bez JS tak zlepšuje <a href="/seo">SEO</a> a viditelnost webu.</p>


<p>Už nějakou dobu neplatí, že by byl obsah závislý na JS pro vyhledávač <b>úplně neviditelný</b>.</p>

<p><a href="/google">Google</a> a i <a href="/seznam">Seznam</a> si dokáží s JS poradit.</p>

<p>Rozdíl je v tom, že získání obsahu přímo z HTML je řádově výpočetně snazší, než získávání obsahu stránky s vyhodnoceným JS.</p>

<p>Pro získání obsahu, který nepotřebuje JS, stačí jen stáhnout obsah / zdrojový kód URL.</p>

<p>Pro vyhodnocení JS musí stránku navštívit <i lang="en">crawler</i> vyhledávače (robot, který prochází weby) ze skutečného prohlížeče v <i lang="en">headless</i> režimu (tj. běžný prohlížeč bez grafického rozhraní).</p>







<p>Indexování JS je tak pro robota vyhledávače mnohem dražší a méně spolehlivé – musí čekat na jeho stažení a zpracování, může dojít k chybě, vyprší časový limit apod.</p>

<p>Vyhledávač tak pracuje ve dvou fázích:</p>

<ol>
  <li>
    <p>Robot nejprve <b>stáhne základní HTML stránky</b>. Tato fáze se postará o rychlé získání obsahu, který je přímo dostupný v kódu.</p>
  </li>
  
  <li>
    <p>Následně probíhá <b>renderování stránky</b> pomocí headless prohlížeče, což umožňuje spuštění JavaScriptu a získání dynamicky generovaného obsahu.</p>
  </li>
</ol>

<p>Obě fáze se typicky odehrávají v různých časech a s různou frekvencí. Robot nejprve provede rychlý průchod stránky a stáhne její základní HTML, což se děje poměrně často. Renderování stránky, během kterého se spouští JavaScript a získává se dynamický obsah, se pak uskuteční jako druhá fáze, často s určitým zpožděním.</p>

<p>Frekvence renderování závisí na mnoha faktorech, jako je složitost stránky, její význam či aktuální dostupnost zdrojů.</p>









<h2 id="moderni-js">10. Nepodporované JS konstrukce</h2>

<p>Uživatel může používat starší prohlížeč, který ještě nepodporuje novější JS konstrukce použité v kódu.</p>

<p>Problém lze minimalisovat nějakým kompilátorem JS, který moderní kód převede do kompatibilního – např. <a href="https://babeljs.io">Babel</a>. Případně používat kontrukce s dobrou podporou – lze ověřit přes <a href="https://caniuse.com">Can I use</a>.</p>





<h2 id="uspora-dat">11. Režim úspory dat</h2>

<p><b>Chrome</b> při zapnutém režimu úspory dat na 2G pomalých připojeních blokuje pro zrychlení JS.</p>

<div class="external-content">
  <ul><li>Chrome Platform Status:
    <a href="https://chromestatus.com/feature/4775088607985664">Feature: Intervention: Disable scripts for Data Saver users on slow connections</a>
  </li></ul>
</div>







<h2 id="vlastni-crawler">12. Crawlování vlastního webu</h2>

<p>Existují situace, kdy dává smysl crawlovat vlastní web.</p>

<p>Třeba pro účely vyhledávání může být někdy nejsnazší stáhnout výsledné HTML stránek a vyhledávat v něm.</p>

<p>Získat tento výstup se hodí i pro práci s obsahem vlastního webu pomocí LLM (<i lang="en">large language model</i>).</p>

<p>Nezávislost obsahu na JS crawlování usnadní a urychlí.</p>




<h2 id="budoucnost">13. Budoucnost a robustnost</h2>
<p>Navrhování webu s ohledem na možnost selhání JavaScriptu je investicí do dlouhodobé spolehlivosti.</p>

<p>Značně se tím minimalisuje risiko, že web úplně přestane fungovat.</p>




<h2 id="jak">Jak toho docílit?</h2>

<p>Výhoda je, že trend v JS světě je funkčnosti bez JavaScriptu dost nakloněn.</p>

<p>Snad pro každý populárnější JS framework existuje nástroj pro SSR (<i lang="en">server–side rendering</i>) – generování obsahu už na serveru.</p>

<p>Případně statické generování / <i lang="en">prerendering</i>, kdy se klidně obsah celého webu vygeneruje do statických HTML souborů.</p>






<p>Nástrojů jsou spousty – <a href="https://nextjs.org">Next.js</a> (React), <a href="https://svelte.dev/docs/kit/introduction">SvelteKit</a> (Svelte), <a href="https://nuxt.com">Nuxt</a> (Vue.js), <a href="https://www.gatsbyjs.com/">Gatsby</a>, <a href="https://astro.build/">Astro</a>. Všechny dokáží vygenerovat bleskurychlé statické stránky s obsahem funkčním bez JS.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    <a href="https://www.kryogenix.org/code/browser/everyonehasjs.html">Everyone has JavaScript, right?</a>
  </li>
</ul>