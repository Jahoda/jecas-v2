---
title: "Routování URL ve SvelteKitu"
headline: "Routování URL ve SvelteKitu"
description: "Jak ve SvelteKitu řešit routování adres. Příklady z praxe."
date: "2024-05-31"
last_modification: "2024-05-31"
status: 0
tags: ["svelte"]
format: "html"
---

<p>
  <a href="https://kit.svelte.dev">SvelteKit</a> disponuje tzv. <i lang="en">filesystem-based</i> routerem. To znamená, že pro jednotlivé stránky webu se nevytváří žádná konfigurace, ale vše je založeno na adresářové struktuře.
</p>
<p>
  Ještě je možné rozdělit <i lang="en">filesystem-based</i> na:
</p>
<ul>
  <li>
    <p><i lang="en">File-based</i></p>
    <pre><code>src/
└── routes/
    ├── index.js
    ├── about.js
    └── contact.js</code></pre>
  </li>
  <li>
    <p><i lang="en">Directory-based</i></p>
    <pre><code>src/
└── routes/
    ├── +page.svelte
    ├── about/
    │   └── +page.svelte
    └── contact/
        └── +page.svelte</code></pre>
  </li>
</ul>

<p>
  SvelteKit dříve používal hybrid mezi oběma přístupy, potom ale přešel na <i lang="en">directory-based</i>. Tedy co část cesty v URL mezi lomítky, to samostatná složka.
</p>

<p>
  Z toho plyne asi hlavní nevýhoda tohoto přístupu, že se skoro všechno v projektu jmenuje <code>+page.svelte</code>.
</p>

<p>
  Obejít tento problém jde členěním obsahu stránek do <b>pojmenovaných komponent</b>.
</p>





<h2 id="layout">Layouty</h2>

<p>Pro sdílení společných částí a kódu slouží soubory <code>+layout.svelte</code>. Takový kód se aplikuje na všechny stránky a podstránky, které jsou ve složce a podsložkách daného <code>+layout.svelte</code> souboru.</p>

<p>Pro lepší organisaci a dědičnost layoutů je vhodné související celky členit do skupin. Ty se tvoří další složkou v závorkách.</p>

<pre><code>src/
└── routes/
    ├── <b>(public)</b>/
    │   ├── +layout.svelte
    │   ├── +page.svelte
    │   ├── about/
    │   │   └── +page.svelte
    │   └── contact/
    │       └── +page.svelte
    └── <b>(private)</b>/
        ├── +layout.svelte
        ├── profile/
        │   └── +page.svelte
        └── settings/
            └── +page.svelte</code></pre>





















<p>Tyto složky v (kulatých závorkách) nemají žádný vliv na podobu URL, slouží jen k seskupení pro pohodlnější práci.</p>


<h3 id="vyskoceni">Vyskočení z layoutu</h3>

<p>Pojmenované skupiny se hodí i k opuštění dědičnosti layoutů.</p>

<p>Jednotlivé <code>+layout.svelte</code> soubory zanořené do složek se do sebe zanořují.</p>

<p>Pomocí <code>@</code> v názvu layoutu jde toto chování změnit.</p>

<ul>
  <li>
    <p><code>+layout@.svelte</code> – zruší všechny nadřazené layouty</p>
  </li>
  
  <li>
    <p>
      <code>+layout@(private).svelte</code> – nastaví nadřazený layout na ten ze skupiny <code>(private)</code>
    </p>
  </li>
</ul>

<h2 id="parametry">Dynamické parametry</h2>

<p>Dost časo je potřeba mít některé části URL dynamické – ve SvelteKitu k tomu slouží složky s hranatými závorkami.</p>

<p>Stačí např. vyvořit soubor <code>+page.svelte</code> ve složce <code>src/routes/blog/[slug]</code>, čímž všechny požadavky typu <code>blog/prvni-clanek</code>, <code>blog/jiny-clanek</code> apod. skončí na této stránce.</p>

<p>V proměnné (storu) <code>$page.params.slug</code> bude k disposici slug článku, podle kterého se může dál <i>něco dělat</i>.</p>

<p>Zde je třeba myslet na to, že hodnota <code>$page.params.slug</code> se neaktualisuje automaticky při <b>přechodu na jinou stránku</b>.</p>


<p>Pokud na to něco spoléhá, je třeba použít konstrukci typu:</p>

<pre><code>$: slug = $page.params.slug</code></pre>

<p>A dál pracovat s proměnnou <code>slug</code>.</p>


<h2 id="odkazy">Odkazování na stránky</h2>

<p>SvelteKit nemá přímo v sobě pokročilejší mechanismus, jak vytvářet odkazy na jednotlivé stránky.</p>

<p>Děje se tak prostým <a href="/odkaz">odkazem</a> <code>&lt;a href></code>.</p>

<p>To má dost <b>značnou nevýhodu</b>, že není zajištěno, že odkázaná stránka existuje.</p>

<p>Alespoň drobné usnadnění nabízí funkce <code>resolveRoute</code>:</p>


<pre><code>&lt;a href="{resolveRoute('/blog/[slug]', { slug: 'prvni-clanek' })}">
  Odkaz
&lt;/a></code></pre>






<p>Bohužel nijak nekontroluje, jestli daná routa opravdu existuje.</p>

<p>Doporučuji proto balíček <a href="https://www.kitql.dev/docs/tools/06_vite-plugin-kit-routes">vite-plugin-kit-routes</a>, který ze všech rout vygeneruje soubor s typovou kontrolou.</p>

<p>Zápis je obdobný jako s <code>resolveRoute</code>, ale je zajištěno, že stránka existuje:</p>


<pre><code>&lt;a href="{route('/blog/[slug]', { slug: 'prvni-clanek' })}">
  Odkaz
&lt;/a></code></pre>















<h3 id="query-parametry">Query parametry</h3>

<p>Pro věci jakou jsou třeba filtry nebo <a href="/strankovani">stránkování</a> může být rozumné nepoužívat <i>klasicke-hezke-url</i>, ale informace přenášet <i>?za=otaznikem</i>.</p>

<p>SvelteKit nabízí přístup k těmto <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams"><i lang="en">search params</i></a> v <code>$page.url.searchParams</code>.</p>


<p>Pro příjemnější práci s těmito parametry doporučuji knihovnu <a href="https://github.com/paoloricciuti/sveltekit-search-params">sveltekit-search-params</a>.</p>

<p>Ta nabízí jednoduché rozhraní, které automaticky zajišťuje obousměrnou synchronisaci dat s URL:</p>

<pre><code>&lt;script lang="ts">
  import { queryParam } from 'sveltekit-search-params';
  const username = queryParam('username');
&lt;/script>
&lt;input bind:value={$username} /></code></pre>










<h2 id="aktivni-strank">Aktivní stránka</h2>

<p>Adresu současné stránky jde vytáhnout z <code>$page.url.pathname</code>. Zvýraznit aktuální stránku jde tak jednoduchou podmínkou (přidá CSS třídu <code>active</code>):</p>

<pre><code>&lt;a class:active={$page.url.pathname === '/about'} href="/about">
  Odkaz
&lt;a></code></pre>





<p>Zjednodušit si používání jde třeba derivovaným storem:</p>

<pre><code>import { page } from '$app/stores'
import { derived } from 'svelte/store'

export const isCurrent = derived([page], ([$page]) => {
  return (pathname: string) => {
    return $page.url.pathname === pathname
  }
})</code></pre>












<p>Použití:</p>

<pre><code>&lt;a class:active={$isCurrent('/about')} href="/about">
  Odkaz
&lt;a></code></pre>




<p>Případně s vite-plugin-kit-routes:</p>

<pre><code>&lt;a class:active={$isCurrent(route('/about'))} href="route('/about')">
  Odkaz
&lt;a></code></pre>











<p>U rout s <b>dynamickými parametry</b> se nabízí porovnávat <code>$page.route.id</code>. Pozor, propisují se tam i skupiny v závorkách.</p>

<p>Takže na adrese <code>blog/prvni-clanek</code> může být v <code>$page.route.id</code> např. následující hodnota:</p>

<pre><code>/(private)/blog/[slug]</code></pre>








<h2 id="error">Chybové stránky</h2>

<p>V případě nenalezení obsahu k dané routě je třeba zobrazit <a href="/sledovani-404">chybovou stránku</a>.</p>

<p>To jde zajistit velmi snadno souborem <code>+error.svelte</code>.</p>


<h2 id="goto">Změna URL přes <code>goto</code></h2>

<p>Občas je potřeba měnit adresu stránky jiným způsobem než kliknutím na odkaz. Třeba po odeslání formuláře nebo vyhodnocením nějaké logiky.</p>

<p>SvelteKit k tomu má funkci <code>goto</code>.</p>

<pre><code>&lt;button onclick="{() => goto(route('/blog/[slug]', { slug: 'prvni-clanek' }))}">
  Tlačítko
&lt;/button></code></pre>










<p>Z možného nastavení je užitečné hlavně:</p>

<ul>
  <li>
    <code>replaceState</code> – nahradí současnou stránky v historii
  </li>
  <li>
    <code>noScroll</code> – neprovede odrolování nahoru
  </li>
</ul>


<pre><code>goto('/adresa', { replaceState: true, noScroll: true })</code></pre>



<h2 id="afterNavigate">Akce po navigaci</h2>

<p>Někdy je potřeba provést po navigaci akci – například zavřít hamburger menu na mobilu po kliknutí na okdaz. K tomu slouží <code>afterNavigate</code>:</p>

<pre><code>&lt;script lang="ts">
  import { afterNavigate } from '$app/navigation';
  let menuToggle: boolean = false;

  afterNavigate(() => (menuToggle = false));
&lt;/script></code></pre>








<h2 id="modal">Modály</h2>

<p>Trend aplikací je používat modály.</p>

<p>Dobré zároveň je, když má modál vlastní URL. Má to řadu výhod:</p>

<ol>
  <li>
    <p>Na daný obsah jde <b>odkázat</b>. Uložit si odkaz do oblíbených nebo ho někomu poslat.</p>
  </li>
  
  <li>
    <p>V případě chyby jde <b>obnovit stránku</b> a uživatel zůstane na místě, kde byl.</p>
  </li>
  
  <li>
    <p>SvelteKit dokáže podle rout optimalisovat výsledný build.</p>
  </li>
</ol>

<p>Asi nejčistší možnost je používat layouty. Ze stránky (<code>+page.svelte</code>), ze které se má modál zobrazit, se udělá <code>+layout.svelte</code> (<code>+page.svelte</code> zůstane prázdné).</p>

<p>Na místo v kódu pro zobrazení modálu se dá značka <code>&lt;slot /></code>.</p>

<p>Samotný modál se potom zanoří do podadresáře (<code>modal/+page.svelte</code>).</p>

<p>Jiný způsob je řídit zobrazení/skrytí modálu přes query parametr v URL.</p>

<p>Případně si vystačit jen se zobrazením na základě proměnné bez ukládání stavu.</p>

<p>
  <a href="https://svelte.dev/repl/f8f2512f35a740e1b78e361809c6f8ca?version=4.2.17">Živá ukázka</a>
</p>


<h2 id="animace">Animace</h2>

<p>Velmi snadno lze vytvořit plynulé přechody</p>

<h2 id="menu">Menu</h2>
