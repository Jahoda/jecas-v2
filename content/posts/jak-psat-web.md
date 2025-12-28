---
title: "Jak psát web"
headline: "Jak psát web a spravovat jeho obsah"
description: "Jakým způsobem publikovat a spravovat obsah na webu. Od sociálních sítí přes vlastní doménu až po výběr CMS."
date: "2025-12-17"
last_modification: "2025-12-17"
status: 1
tags: ["webdesign", "cms", "ai", "produktivita"]
format: "html"
---

<p>Chce-li člověk něco psát na internet, existuje spousta možností.</p>

<p>Asi nejsnazší je zvolit nějakou cizí platformu – třeba <a href="/facebook">Facebook</a>, <a href="/twitter">X</a>, <a href="https://www.linkedin.com/">LinkedIn</a>, <a href="https://medium.com/">Medium</a> a podobně. Výhoda je, že není potřeba nic moc dělat, než se zaregistrovat. A sociální sítě pomohou publikovanému obsahu získávat nějaký dosah.</p>

<p>Na druhou stranu je člověk odkázán na někoho cizího, který mu typicky může kdykoliv omezit nebo smazat účet, blokovat příspěvky a podobně. Nebo platformu změnit tak, že nebude vyhovovat čtenářům / návštěvníkům.</p>

<p>Problém může být i s monetisací (např. si dávat k obsahu reklamu).</p>

<p>Proto dává smysl mít nad tím kontrolu a <b>provozovat web na vlastní doméně</b>.</p>

<p>Je potom třeba vyřešit styl spravování obsahu.</p>

<p>Bohužel žádné dokonalé řešení pro všechno neexistuje. Každý typ projektu má různé potřeby.</p>

<h2 id="otazky">Jaké otázky si položit?</h2>

<ol>
<li>
  <p>Budu web psát sám, nebo více lidí (kolik?)</p>
</li>

<li>
  <p>Bude web upravovat více lidí zároveň</p>
</li>

<li>
  <p>Potřebují mít různí lidé různá oprávnění</p>
</li>

<li>
  <p>Potřebuju na webu hodně multimediálního obsahu (obrázky, fotky, grafy, videa)</p>
</li>

<li>
  <p>Potřebuju na webu nějaké dynamické prvky jako filtrování, vyhledávání, kontaktní formuláře nebo přihlášení k newsletteru, členské sekce, placené sekce a obsah?</p>
</li>

<li>
  <p>Budu web pravidelně aktualisovat, nebo se jednou udělá, a potom vydrží X let, než se celý znovu předělá.</p>
</li>

<li>
  <p>Jak dlouho ho chci provozovat.</p>
</li>

<li>
  <p>Chci ho mít visuálně atraktivní/pestrý (různé styly sekcí v rámci stránky), landing page.</p>
</li>

<li>
  <p>Potřebuji řešit lokalisování do různých jazyků?</p>
</li>

<li>
  <p>Čekám obrovskou návštěvnost?</p>
</li>

<li>
  <p>Chci na jeho tvorbu a úpravy používat AI?</p>
</li>

<li>
  <p>Jaká bude technická znalost lidí, co budou tvořit obsah.</p>
</li>

<li>
  <p>Jak často se bude obsah měnit?</p>
</li>

<li>
  <p>Je klíčové, aby byl co nejrychlejší?</p>
</li>
</ol>

<h2 id="v-cem-psat">V čem psát web</h2>

<p>V dnešní době to díky AI je celkem jedno.</p>

<p>Není problém snadno převádět jakékoliv formáty mezi sebou. Výsledek bude vždy HTML, ale zdroj může být cokoliv:</p>

<ol>
<li>
  <p>Poznámkový blok</p>
</li>

<li>
  <p>Programovací editor / IDE</p>
</li>

<li>
  <p>Apple poznámky</p>
</li>

<li>
  <p>Word/Pages</p>
</li>
</ol>

<p>Takže obsah je možné psát v čemkoliv.</p>

<p>Právě AI podle mě dost mění situaci na poli CMS.</p>

<p>Aktuální stav dost nahrává nízkoúrovňovém CMS, protože s tím AI dokáže dobře pracovat.</p>

<p>Paradoxně prostý statický web v obyčejných HTML souborech bude krásně ovladatelný přes AI.</p>

<p>Řekneme, že budeme mít web s nabídkou služeb a ceníkem.</p>

<p>Změna ceníku tak může proběhnout tak, že se AI předhodí klidně Excelovská tabulka a ono si s tím už poradí.</p>

<p>Jde tohle udělat v nějakém dnešním CMS? Většinou ne.</p>

<h3 id="nejrychleji">Kdybych chtěl nejrychleji dostat obsah na web</h3>

<ol>
<li>
  <p>Kdekoliv sepsat text</p>
</li>

<li>
  <p>Předhodit ho do <a href="https://chat.openai.com/">ChatGPT</a> s instrukcí ať z toho udělá jediný HTML soubor</p>
</li>

<li>
  <p>Na <a href="https://www.wedos.cz/">Wedosu</a> si koupit doménu (stojí cca 150 Kč)</p>
</li>

<li>
  <p>Než se zprocesuje platba, budu mít výsledek</p>
</li>

<li>
  <p>Vložím to přes administrační rozhraní miniweb a mám hotovo</p>
</li>
</ol>

<h3 id="dlouhodoby-udržitelny">Kdybych chtěl nějaký dlouhodobý udržitelný rozvoj</h3>

<p>Tady už se nabízí použít versování s <b>gitem</b>. Největší podpora dalších služeb je s <b>GitHubem</b>.</p>

<ol>
<li>
  <p>Koupím doménu</p>
</li>

<li>
  <p>V <a href="https://github.com/">GitHubu</a> vytvořím repositář</p>
</li>

<li>
  <p>Zaplatím si <a href="https://claude.ai/">Claude Pro</a></p>
</li>

<li>
  <p>V Claude aplikaci si otevřu code</p>
</li>

<li>
  <p>Popíšu mu, co dělám za projekt, vložím obsah a nechám pracovat</p>
</li>

<li>
  <p>Přes GitHub účet se přihlásím na <a href="https://vercel.com/">Vercel</a></p>
</li>

<li>
  <p>Naimportuji projekt z GitHubu a nechám deploynout</p>
</li>

<li>
  <p>V nastavení Vercelu si přidám vlastní doménu</p>
</li>
</ol>

<p>Nyní mám plně funkční web, který mohu klidně spravovat přes mobil prostřednictvím Claude chatbota.</p>

<p>Každá nová změna vytvoří na GitHubu nový merge request a Vercel to vystaví na URL, kde to mohu zkontrolovat.</p>

<p>Po mergnuti do main větve se to vystaví do produkce.</p>

<h3 id="vlastni-reseni-nizsi-kontrola">Vlastní řešení s nižší kontrolou</h3>

<p>Zjednodušit si tohle mohu použitím <a href="https://lovable.dev/">Lovable</a>, <a href="https://bolt.new/">bolt</a> nebo <a href="https://v0.dev/">v0</a>.</p>

<p>Tam si mohu rovnou s chatbotem vytvářet obsah, který se automaticky někam vystaví.</p>

<p>Stačí si přidat jen vlastní doménu.</p>

<p>Nevýhoda oproti řešení výše je vyšší cena a větší vendor lock.</p>

<h2 id="zajima-me-technologie">Zajímá mě technologie</h2>

<p>Jiná situace je, když mám nějakou oblíbenou technologii / framework, ve kterém chci vyvíjet.</p>

<p>Dnes bych volil buď <b>React</b> (nejrozšířenější) nebo <b>Svelte</b> (nejlepší).</p>

<p>Pro běžný web, ale dnes i aplikaci ve formě se <b>server side renderingem</b> s <b>Node.js backendem</b>.</p>

<p>Tj. <a href="https://nextjs.org/">Next.js</a> pro React a <a href="https://svelte.dev/docs/kit/introduction">SvelteKit</a> pro Svelte.</p>

<p>Pro hodně staticky a na výkon / rychlost zaměřenou stránku bych zvážil <a href="https://astro.build/">Astro</a>.</p>

<p>Jde v něm dokonce i kombinovat React a Svelte komponenty dohromady.</p>

<h2 id="headless-cms">Co headless CMS</h2>

<p>Pro čistotu v datech s kódu nejlepší volba. Člověk si tam vytvoří datové modely a různé bloky, ze kterých se potom sestaví frontend.</p>

<p>Nevýhoda je, že s tím zatím AI moc nedovede pracovat.</p>

<p>Takže rutinní úpravy musí člověk po staru ručně upravovat v nějaké administraci.</p>

<p><a href="https://www.sanity.io/">Sanity</a> se to snaží řešit přes <b>MCP server</b>.</p>

<p>Další docela zajímavé je <a href="https://www.datocms.com/">DatoCMS</a>.</p>

<p>Samozřejmě s takovým řešením roste komplexita a je to značný vendor lock.</p>

<p>Být díky AI už není takový problém s migracemi.</p>

<p>Viz příklad <a href="https://www.cursor.com/">Cursoru</a>, co z migroval do git za týden práce a pár set USD kreditů za AI.</p>

<h2 id="wordpress">Starý dobrý WordPress</h2>

<p>Prostě to funguje. Sice má hrozný tamagotchi efekt (fort chce po člověku něco aktualizovat), ale je schopný fungovat desítky let.</p>

<p>Každý hosting ho umí provozovat, je to nejrozšířenější CMS. A si tu s námi dlouho bude.</p>

<p>Jeho trvanlivost je obdivuhodná.</p>

<h2 id="vlastni-cms">Vlastní CMS</h2>

<p>Každý správný programátor někdy psal CMS nebo e-shop.</p>

<p>Asi nejhorší varianta, pokud není hlavním cílem psát CMS, protože to znamená neustálou údržbu.</p>

<p>Paradoxně se to ještě zhorší použitím nějakého frameworku.</p>

<p>Zatímco třeba 20 let starý PHP kód není problém zmigrovat na novou verzi PHP jedním promptem, u 10 let starého CMS postaveném třeba na <a href="https://nette.org/">Nette</a> to bude mnohem těžší.</p>

<h2 id="wysiwyg">WYSIWYG klikací nástroje typu Wix</h2>

<p>Výhoda dnes oproti vlastnímu řešení s využitím AI podle mě moc není.</p>
