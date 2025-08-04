---
title: "13 důvodů, proč má web fungovat bez JavaScriptu i v roce 2025"
headline: "13 důvodů, proč má web fungovat bez JavaScriptu i v roce 2025"
description: "JavaScript je sice klíčový pro moderní web, ale jeho selhání není výjimkou. Zde je 13 důvodů, proč by měl web fungovat i bez něj."
date: "2025-02-03"
last_modification: "2025-03-11"
status: 1
tags: ["JavaScript", "SEO", "Rady a nápady"]
---

## 1. Selhání načítání skriptů

Ne vždy se JavaScript načte správně. Pomalé nebo přerušené připojení (například ve vlaku) může způsobit, že se skripty načtou opožděně nebo vůbec, což ovlivní funkčnost webu.

V podstatě každý návštěvník má *vypnutý JavaScript* do doby, než se stáhne a vykoná.

## 2. Chyby v kódu

Jeden malý programátorský omyl může způsobit selhání celého skriptu, protože JavaScript není tak tolerantní k chybám jako HTML či CSS.

## 3. Závislost na externích zdrojích

Externí knihovny a CDN mohou mít výpadky. Pokud je základní obsah načten přímo z HTML a CSS, web zůstane dostupný i při selhání těchto zdrojů.

Pro rychlejší načítání se někdy externí JS knihovny připojují z cizí CDN. Je tam šance, že danou knihovnu už uživatel stáhnul na jiném webu.

Pokud web závisí na takovém JS, výpadek ho totálně rozbije.

## 4. Firewally a síťová omezení

Firewally, korporátní sítě nebo některá ISP mohou blokovat či upravovat JavaScriptové soubory, což může negativně ovlivnit funkčnost webu závislého na JS.

## 5. Uživatelé s vypnutým JavaScriptem

I když je jejich počet malý, web může být přístupný i pro uživatele, kteří z bezpečnostních nebo soukromých důvodů JavaScript deaktivují.

U webů, které to značně přehánějí s reklamou, to může dost zlepšit uživatelský zážitek.

V **Chrome** je možné JS vypnout po kliknutí na nastavení vedle adresy:

A přes volbu *Další nastavení a oprávnění*:

Zde jde JS blokovat pro konkrétní web.

## 6. Mikroprohlížeče a sdílení odkazů

Odkazy [sdílené na sociálních sítích](/nahled-odkazu) často načítají pouze základní HTML obsah. Zajištění funkčnosti bez JS znamená, že obsah bude správně zobrazen i v náhledech.

Další kapitolou jsou [AI nástroje](/ai-programovani) a chatboty, které dokáží zpracovávat obsah z externích URL.

## 7. Vliv rozšíření a adblockerů

Prohlížečová rozšíření a [adblockery](/adblock-optimalisace) mohou nechtěně ovlivnit běh JavaScriptu, což může vést ke ztrátě funkčnosti webu.

Rozšíření mohou například změnit strukturu [DOMu](/dom) do podoby, se kterou JS nepočítá.

Adblocker zase může skript vyhodnotit jako reklamu a zablokovat ho.

## 8. Rychlost načítání a uživatelská zkušenost

Web, který funguje bez JavaScriptu, načte základní obsah rychleji, což ocení zejména uživatelé na mobilních zařízeních nebo s omezeným datovým tarifem.

## 9. Optimalizace pro vyhledávače (SEO)

Vyhledávače lépe indexují obsah, který je přímo dostupný v HTML. Funkčnost bez JS tak zlepšuje [SEO](/seo) a viditelnost webu.

Už nějakou dobu neplatí, že by byl obsah závislý na JS pro vyhledávač **úplně neviditelný**.

[Google](/google) a i [Seznam](/seznam) si dokáží s JS poradit.

Rozdíl je v tom, že získání obsahu přímo z HTML je řádově výpočetně snazší, než získávání obsahu stránky s vyhodnoceným JS.

Pro získání obsahu, který nepotřebuje JS, stačí jen stáhnout obsah / zdrojový kód URL.

Pro vyhodnocení JS musí stránku navštívit *crawler* vyhledávače (robot, který prochází weby) ze skutečného prohlížeče v *headless* režimu (tj. běžný prohlížeč bez grafického rozhraní).

Indexování JS je tak pro robota vyhledávače mnohem dražší a méně spolehlivé – musí čekat na jeho stažení a zpracování, může dojít k chybě, vyprší časový limit apod.

Vyhledávač tak pracuje ve dvou fázích:

    Robot nejprve **stáhne základní HTML stránky**. Tato fáze se postará o rychlé získání obsahu, který je přímo dostupný v kódu.

    Následně probíhá **renderování stránky** pomocí headless prohlížeče, což umožňuje spuštění JavaScriptu a získání dynamicky generovaného obsahu.

Obě fáze se typicky odehrávají v různých časech a s různou frekvencí. Robot nejprve provede rychlý průchod stránky a stáhne její základní HTML, což se děje poměrně často. Renderování stránky, během kterého se spouští JavaScript a získává se dynamický obsah, se pak uskuteční jako druhá fáze, často s určitým zpožděním.

Frekvence renderování závisí na mnoha faktorech, jako je složitost stránky, její význam či aktuální dostupnost zdrojů.

## 10. Nepodporované JS konstrukce

Uživatel může používat starší prohlížeč, který ještě nepodporuje novější JS konstrukce použité v kódu.

Problém lze minimalisovat nějakým kompilátorem JS, který moderní kód převede do kompatibilního – např. [Babel](https://babeljs.io). Případně používat kontrukce s dobrou podporou – lze ověřit přes [Can I use](https://caniuse.com).

## 11. Režim úspory dat

**Chrome** při zapnutém režimu úspory dat na 2G pomalých připojeních blokuje pro zrychlení JS.

  Chrome Platform Status:
    [Feature: Intervention: Disable scripts for Data Saver users on slow connections](https://chromestatus.com/feature/4775088607985664)

## 12. Crawlování vlastního webu

Existují situace, kdy dává smysl crawlovat vlastní web.

Třeba pro účely vyhledávání může být někdy nejsnazší stáhnout výsledné HTML stránek a vyhledávat v něm.

Získat tento výstup se hodí i pro práci s obsahem vlastního webu pomocí LLM (*large language model*).

Nezávislost obsahu na JS crawlování usnadní a urychlí.

## 13. Budoucnost a robustnost

Navrhování webu s ohledem na možnost selhání JavaScriptu je investicí do dlouhodobé spolehlivosti.

Značně se tím minimalisuje risiko, že web úplně přestane fungovat.

## Jak toho docílit?

Výhoda je, že trend v JS světě je funkčnosti bez JavaScriptu dost nakloněn.

Snad pro každý populárnější JS framework existuje nástroj pro SSR (*server–side rendering*) – generování obsahu už na serveru.

Případně statické generování / *prerendering*, kdy se klidně obsah celého webu vygeneruje do statických HTML souborů.

Nástrojů jsou spousty – [Next.js](https://nextjs.org) (React), [SvelteKit](https://svelte.dev/docs/kit/introduction) (Svelte), [Nuxt](https://nuxt.com) (Vue.js), [Gatsby](https://www.gatsbyjs.com/), [Astro](https://astro.build/). Všechny dokáží vygenerovat bleskurychlé statické stránky s obsahem funkčním bez JS.

## Odkazy jinam

    [Everyone has JavaScript, right?](https://www.kryogenix.org/code/browser/everyonehasjs.html)