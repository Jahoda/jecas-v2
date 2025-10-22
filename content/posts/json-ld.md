---
title: "Jak použít JSON‑LD pro AI a SEO"
headline: "Jak použít JSON‑LD pro AI a SEO"
description: "JSON for Linking Data je strojově čitelný formát pro publikování obsahu."
date: "2025-10-24"
last_modification: "2025-10-24"
status: 1
tags: ["seo", "ai", "napady"]
format: "html"
---

<p><b>JSON‑LD</b> je způsob, jak přidat do stránky <b>strukturovaná data</b>, která stroje (vyhledávače, AI asistenti, agregátory) snadno přečtou a pochopí. Umožňuje „vysvětlit“ obsah stránky bez zásahů do HTML struktury.</p>

<p>Implementace může zlepšit SEO a citovatelnost v AI chatbotech a jiných nástrojích.</p>

<p>Protože nežijeme v ideálním světě, kde robot vyhledávače správně pochopí každou stránku, existují a používají se způsoby, jak mu to ulehčit.</p>

<p>Základní způsob je vhodná sémantika použití HTML značek – zejména struktura nadpisů, používání odstavců, seznamů.</p>

<p>Pro situace, kdy už samotné HTML nestačí, si jde pomoci tzv. <a href="/obecne-atributy#item">mikrodaty</a>. Jde tak jasně vyznačit různé části stránky, aby robot neměl pochyb, o co se jedná.</p>

<p>Příklad mikrodat přímo v HTML:</p>

<pre><code>&lt;article itemscope itemtype="https://schema.org/Article">
  &lt;h1 itemprop="headline">Název článku&lt;/h1>
  &lt;div>Autor: &lt;span itemprop="author" itemscope itemtype="https://schema.org/Person">
    &lt;span itemprop="name">Jméno Autora&lt;/span>
  &lt;/span>&lt;/div>
  &lt;time itemprop="datePublished" datetime="2025-01-01">1. 1. 2025&lt;/time>
  &lt;meta itemprop="mainEntityOfPage" content="https://example.com/nazev-clanku">
  &lt;div itemprop="articleBody">
    Text článku…
  &lt;/div>
&lt;/article>
</code></pre>

<p>Zpravidla se používá slovník <a href="https://schema.org">schema.org</a> (typy a vlastnosti jako <code>Article</code>, <code>name</code>, <code>author</code>). <b>JSON‑LD</b> je pouze způsob zápisu těchto dat.</p>

<p>Protože taková implementace může být kvůli nutné změně současného HTML komplikovaná, je možné tato data zapisovat jako nový <a href="/json">JSON objekt</a> přímo na stránku. <a href="http://json-ld.org/">JSON‑LD</a> je tak jiný způsob, jak dostat strukturovaná data do stránky.</p>

<h2 id="proc">Proč JSON‑LD používat</h2>

<ul>
  <li><b>Rich výsledky</b> – rozšířené výsledky ve vyhledávání.</li>
  <li><b>Citovatelnost v AI</b> – asistenti lépe chápou kontext, autora, datum a entity.</li>
  <li><b>Čistota implementace</b> – vložíte jeden <code>&lt;script type="application/ld+json"></code> bez změny HTML kódu.</li>
  <li><b>Odolnost</b> – odděluje data od presentace, méně křehké než microdata v HTML.</li>
  <li><b>Teoreticky snazší údržba</b> – generování z CMS, versování, validace nástroji.</li>
  </ul>

<h2 id="jak">Základní použití</h2>

<p>JSON‑LD se vkládá do <code>&lt;head></code> nebo na konec <code>&lt;body></code> jako samostatný skript:</p>

<pre><code>&lt;script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Název článku",
  "datePublished": "2025-01-01",
  "dateModified": "2025-01-02",
  "author": { "@type": "Person", "name": "Jméno Autora" },
  "mainEntityOfPage": "https://example.com/nazev-clanku"
}
&lt;/script>
</code></pre>

<p>Umístění závisí na datovém objemu a jestli upřednostňovat uživatele nebo robota. Vložení těchto dat před obsah uživateli zbytečně prodlouží načtení stránky. U pár řádků to je celkem jedno.</p>

<p>U potřeby výpisu dat je potom k úvaze, jestli nepoužít strukturovaná data přes HTML atributy, které nezpůsobují redundanci a zbytečně tak (tolik) nenafukují HTML kód. U hodně velkých stránek to může dávat smysl.</p>

<h2 id="dalsi">Další běžně používaná schémata</h2>

<ul>
  <li><b>ImageObject / VideoObject</b> – <code>url</code>/<code>contentUrl</code>, <code>thumbnailUrl</code>, <code>caption</code>, u videa <code>duration</code>, <code>uploadDate</code>, <code>transcript</code>.</li>
  <li><b>Product</b> + <b>Offer</b> + <b>AggregateRating</b> + <b>Review</b> – cena, dostupnost, hodnocení, recenze.</li>
  <li><b>LocalBusiness</b> – <code>address</code> (<code>PostalAddress</code>), <code>geo</code> (<code>GeoCoordinates</code>), <code>openingHoursSpecification</code>, <code>priceRange</code>.</li>
  <li><b>Event</b> – <code>startDate</code>, <code>endDate</code>, <code>location</code>, <code>offers</code>, <code>performer</code>.</li>
  <li><b>JobPosting</b> – <code>datePosted</code>, <code>validThrough</code>, <code>employmentType</code>, <code>jobLocation</code>/<code>jobLocationType</code>.</li>
  <li><b>SoftwareApplication</b> – platformy, kategorie, <code>offers</code>, <code>aggregateRating</code>.</li>
  <li><b>Dataset</b> / <b>DataCatalog</b> – distribuce, licence, tvůrce.</li>
  <li><b>Course</b> / <b>Recipe</b> – specifická pole pro kursy a recepty.</li>
  <li><b>ItemList</b> – seznamy článků/produktů (kategorie, přehledy), pro <code>CollectionPage</code>.</li>
  <li><b>QAPage</b> – otázka s vybranou nejlepší odpovědí (odlišné od <code>FAQPage</code>).</li>
</ul>

<h2 id="co-popisovat">Co na webu popisovat</h2>

<h3 id="organization">Organization + WebSite + WebPage</h3>

<p>Minimální trio pro většinu webů: kdo jste, jak se web jmenuje a co je to za stránku.</p>

<pre><code>{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://example.com#organization",
  "name": "Vaše firma",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/vasefirma",
    "https://www.linkedin.com/company/vasefirma"
  ],
  "identifier": {
    "@type": "PropertyValue",
    "name": "IČO",
    "value": "12345678"
  }
}
</code></pre>

<pre><code>{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://example.com#website",
  "url": "https://example.com",
  "name": "Název webu",
  "publisher": { "@id": "https://example.com#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://example.com/hledat?q={query}",
    "query-input": "required name=query"
  }
}
</code></pre>

<pre><code>{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://example.com/konkretni-stranka#webpage",
  "name": "Titulek stránky",
  "url": "https://example.com/konkretni-stranka",
  "isPartOf": { "@id": "https://example.com#website" },
  "about": { "@id": "https://example.com#organization" }
}
</code></pre>

<h3 id="article">Article / BlogPosting</h3>

<p>Pro články a zápisy na blogu.</p>

<pre><code>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://example.com/json-ld#article",
  "headline": "JSON‑LD: rychlý přehled",
  "datePublished": "2025-10-22",
  "dateModified": "2025-10-22",
  "author": {
    "@type": "Person",
    "name": "Bohumil Jahoda",
    "url": "https://example.com/o-mne",
    "sameAs": [
      "https://twitter.com/example",
      "https://github.com/example"
    ],
    "identifier": {
      "@type": "PropertyValue",
      "name": "GitHub",
      "value": "example"
    }
  },
  "image": ["https://example.com/og-image.jpg"],
  "mainEntityOfPage": { "@id": "https://example.com/json-ld#webpage" },
  "publisher": {
    "@type": "Organization",
    "@id": "https://example.com#organization",
    "name": "Jecas",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" },
    "sameAs": [
      "https://www.facebook.com/jecas",
      "https://github.com/jecas"
    ]
  },
  "isPartOf": { "@id": "https://example.com#website" }
}
</code></pre>

<h3 id="breadcrumbs">BreadcrumbList</h3>

<pre><code>{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Domů", "item": "https://example.com"},
    {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://example.com/blog"},
    {"@type": "ListItem", "position": 3, "name": "JSON‑LD"}
  ]
}
</code></pre>

<h3 id="faq">FAQPage</h3>

<pre><code>{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Co je JSON‑LD?",
      "acceptedAnswer": {"@type": "Answer", "text": "Formát pro strukturovaná data."}
    },
    {
      "@type": "Question",
      "name": "Kde ho vložit?",
      "acceptedAnswer": {"@type": "Answer", "text": "Do &lt;script type=\"application/ld+json\">."}
    }
  ]
}
</code></pre>

<h3 id="howto">HowTo</h3>

<pre><code>{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Jak přidat JSON‑LD",
  "step": [
    {"@type": "HowToStep", "text": "Vyberte vhodné schéma."},
    {"@type": "HowToStep", "text": "Vytvořte JSON objekt."},
    {"@type": "HowToStep", "text": "Vložte jako application/ld+json."}
  ]
}
</code></pre>

<h2 id="implementace">Implementace v praxi</h2>

<ul>
  <li><b>Umístění</b> – do <code>&lt;head></code> nebo na konec <code>&lt;body></code>. Na stránce může být více skriptů současně.</li>
  <li><b>Konsistence</b> – data musí odpovídat tomu, co je vidět na stránce (titulek, autor, datum).</li>
  <li><b>Identifikátory</b> – <code>@id</code> pro stabilní odkazy na entity a jejich opětovné použití.</li>
  <li><b>Více hodnot</b> – pole používejte klidně i pro jedinou hodnotu, pokud se může rozšířit (např. více obrázků).</li>
  <li><b>Aktualisace</b> – udržujte <code>dateModified</code> v souladu se skutečnou změnou obsahu.</li>
  <li><b>Jazyk</b> – přidejte <code>inLanguage</code> (např. <code>"cs"</code>).</li>
  <li><b>Vazby</b> – používejte <code>isPartOf</code>/<code>mainEntityOfPage</code>; <code>publisher</code> odkazuje na <code>@id</code> organisace; <code>WebPage.isPartOf</code> vede na <code>WebSite</code>.</li>
  <li><b>Externí identity</b> – používejte <code>sameAs</code> pro profily na sociálních sítích a <code>identifier</code> pro interní či veřejné identifikátory.</li>
  </ul>

<p>Protože roboti nebo nástroje typu ChatGPT nemusí vždy podporovat JavaScript, je vhodné vygenerovat JSON-LD už na straně serveru.</p>

<p>Při implementaci může být trochu oříšek data vypsat, protože řada šablonovacích systémů nebo nástrojů může brát vložení <code>&lt;script type="application/ld+json"></code> jako potenciálně rizikové vložení JavaScriptu. Ve skutečnosti je to bezpečné, protože neznámý <code>type</code> u skriptu prohlížeč ignoruje.</p>

<p>Ve <b>Svelte</b> se mi osvědčila následující funkce, které se předá objekt a vrátí komplet HTML kód:</p>

<pre><code>export function schemaScript(thing) {
	if (!thing || typeof thing !== 'object') return '';
	return `&lt;script type="application/ld+json">${JSON.stringify(thing)}&lt;/script>`;
}</code></pre> 

<p>A následné vypsání přes <code>{@html schemaScript(articleLd)}</code>.</p>

<p>Příklad pro <b>React</b>:</p>

<pre><code>function JsonLd({ thing }) {
  if (!thing || typeof thing !== 'object') return null;
  return (
    &lt;script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(thing) }}
    />
  );
}

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Název článku"
};

function Page() {
  return (
    &lt;>
      &lt;h1>Název&lt;/h1>
      &lt;JsonLd thing={articleLd} />
    &lt;/>
  );
}
</code></pre>

<h2 id="overeni">Ověření a debug</h2>

<ul>
  <li><b><a href="https://search.google.com/test/rich-results" rel="nofollow">Rich Results Test</a></b> – Google nástroj pro kontrolu rozšířených výsledků.</li>
  <li><b><a href="https://validator.schema.org/" rel="nofollow">Schema Markup Validator</a></b> – validace proti schema.org.</li>
  <li><b><a href="https://json-ld.org/playground/" rel="nofollow">JSON‑LD Playground</a></b> – rychlé testování a formátování JSON‑LD.</li>
  </ul>

<h2 id="chyby">Nejčastější chyby</h2>

<ul>
  <li><b>Nekonsistentní data</b> – jiné datum v JSON‑LD než na stránce.</li>
  <li><b>Chybějící <code>mainEntityOfPage</code></b> – ztěžuje přiřazení ke stránce.</li>
  <li><b>Nesprávný typ</b> – <code>Article</code> vs. <code>BlogPosting</code>; vyberte relevantní schéma.</li>
  <li><b>Nevalidní JSON</b> – uvozovky, čárky, escapování HTML znaků.</li>
  <li><b>Duplicitní skripty</b> – stejné entity vložené vícekrát bez <code>@id</code>.</li>
</ul>

<h2 id="vyplati-se">Vyplatí se JSON‑LD implementovat?</h2>

<p>JSON‑LD automaticky nezaručí lepší posice, ale zvyšuje šanci na <b>bohatší zobrazení</b> ve výsledcích vyhledávání a na <b>přesnější citace</b> v AI nástrojích. A tím teoreticky více návštěv z těchto zdrojů.</p>

<p><b>Lze použít téměř vždy</b> – obsahové weby, e‑shopy, lokální firmy, události, články. Implementace je jednorázová, obvykle na pár minut až dní podle velikosti a typu webu a schopnostech vývojáře.</p>

<p><b>Risika</b> špatného nasazení jsou celkem malá – chybné nebo nekonsistentní údaje mohou být ignorovány.</p>

<p>Je třeba si zvážit, jestli se náklady na vývoj vrátí. Pokud máte základní SEO v pořádku (sémantické HTML, kvalitní obsah), implementace se zpravidla vyplatí.</p>

<h2 id="odhad-prinosu">Jak odhadnout přínos JSON‑LD</h2>

<p>Stručně řečeno dost těžko. Zobrazení stránky ve vyhledávání se snippetem díky strukturovaným datům sice typicky znamená o desítky procent více prokliků, ale je potřeba, aby se web vůbec dostal na rozumné umístění, aby bylo vůbec co zobrazovat.</p>

<p>Je ale dost pravděpodobné, že si tím člověk minimálně neuškodí a může to být velmi snadné implementovat.</p>


<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><b>Google Search Central</b>: <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data">Introduction to structured data markup in Google Search</a> – popis přínosů a limitů strukturovaných dat</li>
</ul>

