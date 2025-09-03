---
title: "Aplikace pro překlad stránky"
headline: "Aplikace pro překlad stránky"
description: "Jaký nástroj vybrat pro překládání webových stránek a aplikací."
date: "2022-01-19"
last_modification: "2025-09-04"
status: 0
tags: ["lokalisace", "js"]
format: "html"
---

<p>Je-li žádoucí umožnit různé jazykové mutace webu nebo aplikace, je potřeba:</p>

<ol>
  <li>vytvořit web/appku tak, aby šla překládat</li>
  <li>vytvořit workflow, kterým to dělat</li>
</ol>

<div class="note">
<p><strong>Důležité doporučení:</strong> Zaveďte překladový systém hned na začátku projektu, i když zatím potřebujete jen jeden jazyk. Není to tolik práce navíc a je dost pravděpodobné, že bude lokalizace někdy potřeba. Když budou na začátku všechny texty hardcoded, bude jejich pozdější převod na překladový systém velmi pracné.</p>
</div>

<p>U aplikací je běžné, že se v kódu na požadovaných místech, kde má být překlad, použijí konstanty nebo nějaká funkce s překladovým klíčem.</p>

<pre><code>// Příklad React aplikace s i18next
import { useTranslation } from 'react-i18next';

function Welcome() {
  const { t } = useTranslation();
  
  return (
    &lt;div&gt;
      &lt;h1&gt;{t('welcome.title')}&lt;/h1&gt;
      &lt;p&gt;{t('welcome.message')}&lt;/p&gt;
      &lt;button&gt;{t('welcome.button')}&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

<p>Potom se pro konkrétní jazyk připojí jeho překlady.</p>

<h2 id="i18n">i18n</h2>

<p>V souvislosti s překlady se často lze setkat s pojmem <b>i18n</b> – je to zkratka pro <i>internationalisation</i> (mezinárodní lokalisace). Název vznikl tak, že se vezme první a poslední písmeno slova <i>internationalisation</i> a mezi ně se vloží číslo 18, které představuje počet písmen mezi nimi. Podobně se třeba používá i a11y = accessibility (přístupnost).</p>

<h2 id="preklady-aplikaci">Překlady aplikací</h2>

<h3 id="vychozi-jazyk">Výchozí jazyk</h3>

<p>Je docela časté, že se přímo v kódu používá pro texty angličtina jako zároveň výchozí/fallback překlad, který se zobrazí když překlad pro konkrétní jazyk neexistuje.</p>

<pre><code>// Příklad s fallback překlady
const translations = {
  en: {
    welcome: 'Welcome to our site',
    login: 'Login',
    logout: 'Logout'
  },
  cs: {
    welcome: 'Vítejte na našem webu',
    login: 'Přihlásit',
    // logout chybí, použije se anglická verze
  }
};

function t(key, lang) {
  return translations[lang]?.[key] || translations.en[key];
}</code></pre>

<p>Případně se všude používají překladové klíče – zde je dobré mít nějaký plugin do IDE, aby zobrazoval ty klíče přeložené pro lepší orientaci vývojáře:</p>

<pre><code>// Příklad s překladovými klíči
// V kódu se používají pouze klíče
const message = t('user.profile.updated');

// V překladových souborech:
// en.json
{
  "user.profile.updated": "Profile updated successfully"
}

// cs.json  
{
  "user.profile.updated": "Profil byl úspěšně aktualizován"
}</code></pre>

<h3 id="formatovani-a-odkazy">Formátování a odkazy</h3>

<p>Trochu oříšek je, jak do překladů zanést formátování nebo třeba odkazy.</p>

<p>Uvažujme následující příklad:</p>

<div class="live">
Pro <b>pokračování</b> je potřeba <a href="#">vybrat jazyk</a>.
</div>

<p>Řeší se to následovně:</p>

<h4 id="obejiti-problemu">1. Obejití problému</h4>
<p>V překladech se to nepoužívá</p>

<h4 id="skladani-prekladu">2. Skládání překladů</h4>
<p>Věta se rozkouskuje na jednotlivé části a v kódu spojí dohromady (nevýhoda je nesmyslné jednotlivé části překladu)</p>

<pre><code>// Příklad skládání překladů
const parts = {
  en: {
    before: 'For',
    bold: 'continuation',
    middle: 'you need to',
    link: 'select language'
  },
  cs: {
    before: 'Pro',
    bold: 'pokračování', 
    middle: 'je potřeba',
    link: 'vybrat jazyk'
  }
};

// Výsledek: "Pro &lt;b&gt;pokračování&lt;/b&gt; je potřeba &lt;a href="#"&gt;vybrat jazyk&lt;/a&gt;"
</code></pre>

<h4 id="formatovani-reseni">3. Formátování</h4>
<p>Buď se umožní v překladech přímo HTML (zde je riziko <a href="/xss">XSS</a>), nebo se použije třeba <a href="/markdown">Markdown</a></p>

<pre><code>// Příklad s HTML v překladech (riziko XSS)
const translations = {
  en: 'For &lt;b&gt;continuation&lt;/b&gt; you need to &lt;a href="#"&gt;select language&lt;/a&gt;',
  cs: 'Pro &lt;b&gt;pokračování&lt;/b&gt; je potřeba &lt;a href="#"&gt;vybrat jazyk&lt;/a&gt;'
};

// Nebezpečné - HTML se vkládá přímo
element.innerHTML = t('welcome.message');
</code></pre>

<pre><code>// Příklad s Markdown
const translations = {
  en: 'For **continuation** you need to [select language](#)',
  cs: 'Pro **pokračování** je potřeba [vybrat jazyk](#)'
};

// Bezpečnější - Markdown se parsuje
element.innerHTML = marked(t('welcome.message'));
</code></pre>

<h3 id="pluralizace">Pluralizace</h3>

<p>Pluralizace je jeden z nejčastějších problémů při překládání, protože různé jazyky mají různé pravidla pro množné číslo.</p>

<p>Zatímco čeština má tři čísla (jednotné, množné a dvojné), angličtina má jen dvě (jednotné a množné). Některé jazyky jako arabština mají dokonce čtyři čísla.</p>

<div class="live">
<p>Příklad pluralizace v češtině:</p>
<ul>
  <li>1 soubor</li>
  <li>2 soubory</li>
  <li>5 souborů</li>
</ul>
</div>

<h4 id="reseni-pluralizace">Řešení pluralizace</h4>

<p>Moderní lokalizační knihovny podporují pluralizaci pomocí speciálních pravidel:</p>

<pre><code>// Příklad s i18next
const resources = {
  en: {
    files: '{{count}} file',
    files_plural: '{{count}} files'
  },
  cs: {
    files: '{{count}} soubor',
    files_1: '{{count}} soubor',
    files_2: '{{count}} soubory',
    files_5: '{{count}} souborů'
  }
};

// Použití
t('files', { count: 1 }); // "1 soubor"
t('files', { count: 2 }); // "2 soubory"  
t('files', { count: 5 }); // "5 souborů"
</code></pre>

<p>Alternativně lze použít ICU MessageFormat, který má pokročilou podporu pro pluralizaci:</p>

<pre><code>// ICU MessageFormat
const messages = {
  en: '{count, plural, =0 {No files} one {# file} other {# files}}',
  cs: '{count, plural, =0 {Žádné soubory} one {# soubor} few {# soubory} other {# souborů}}'
};

// Výsledek pro češtinu:
// 0: "Žádné soubory"
// 1: "1 soubor"  
// 2: "2 soubory"
// 5: "5 souborů"
</code></pre>

<p>Pro jednoduché případy lze pluralizaci řešit i podmínkami v kódu:</p>

<pre><code>// Jednoduché řešení pro češtinu
function pluralize(count, singular, plural, genitive) {
  if (count === 0) return `Žádné ${genitive}`;
  if (count === 1) return `${count} ${singular}`;
  if (count >= 2 && count <= 4) return `${count} ${plural}`;
  return `${count} ${genitive}`;
}

pluralize(1, 'soubor', 'soubory', 'souborů'); // "1 soubor"
pluralize(2, 'soubor', 'soubory', 'souborů'); // "2 soubory"
pluralize(5, 'soubor', 'soubory', 'souborů'); // "5 souborů"
</code></pre>

<h2 id="preklad-obsahovych-stranek">Překlad obsahových stránek</h2>

<p>U obsahových stránek je trochu nepraktické skládat věty nebo odstavce z jednotlivých překladů.</p>

<p>Obvykle se raději lokalisují celé stránky včetně formátování (HTML/Markdown apod.), protože často je v různých jazycích potřeba jiný slovosled, případně i jiný obsah kvůli místním specifikům.</p>

<p>Často třeba ani seznam stránek není 1:1 pro různé jazyky.</p>

<pre><code>// Příklad struktury pro více jazyků
content/
├── en/
│   ├── about.md
│   └── contact.md
├── cs/
│   ├── about.md
│   └── contact.md
└── de/
    ├── about.md
    └── contact.md

// Každý soubor obsahuje kompletní obsah v daném jazyce
// včetně formátování a odkazů
</code></pre>

<h2 id="workflow-prekladu">Workflow překladů</h2>

<p>Workflow překladů záleží na konkrétním projektu a jeho požadavcích:</p>

<ul>
  <li><strong>Typ překladu</strong> - záleží na konkrétním projektu, jestli stačí automatické AI překlady, jestli texty překládá člověk/překladatel či komunita</li>
  <li><strong>Rychlost aktualizace</strong> - jestli je potřeba překlad měnit ihned (lepší načítat z API) nebo je držet v Gitu (nutno buildu)</li>
</ul>

<p>Ideální je, když se o překlady nemusí nikdo moc starat a vše se děje automaticky.</p>

<h2 id="hotove-aplikace">Hotové aplikace</h2>

<p>Doporučuji si vybrat nějaký z těchto nástrojů. U nového projektu bych zkusil <b>inlang</b>, který se snaží nabídnout dost dobrý vývojářský zážitek a podporuje automatické AI překlady.</p>

<ul>
  <li><a href="https://inlang.com/">inlang</a> – Moderní lokalizační platforma s VS Code rozšířením</li>
  <li><a href="https://tolgee.io">Tolgee</a> – Open-source lokalizační platforma s automatickými překlady</li>
  <li><a href="https://lokalise.com">Lokalise</a> – Profesionální nástroj pro týmy s pokročilými funkcemi</li>
  <li><a href="https://weblate.org/cs/">Weblate</a> – Open-source webová lokalizační platforma</li>
  <li><a href="https://poeditor.com">POEditor</a> – Cloud-based lokalizační služba s podporou PO souborů</li>
</ul>

<p>Podle toho zvolit formát překladových souborů. Ale obecně je dost universální <a href="/json">JSON</a>.</p>

<h2 id="ai-preklady">AI překlady</h2>

<p>Pokud není potřeba mít všechny překlady úplně špičkové, jde už dost dobře použít automatické překlady s využitím <a href="/ai-programovani">umělé inteligence</a>.</p>

<p>Není tak problém vložit do ChatGPT <code>en.json</code> a nechat si z něj udělat <code>cs.json</code>.</p>

<p>Případně si napsat jednoduchý skript, co přes nějaké API bude obsah překládat.</p>

<p>Užitečné je, že jde tak předat i kontext a popis. Díky vhodnému <i>promptu</i> jde dosáhnout více než uspokojivého překladu zcela automaticky.</p>

<p>Je tak možné, že aplikace pro překladatele ani není potřeba.</p>


<h2 id="doporučení-pro-vyber">Doporučení pro výběr</h2>

<p>Při výběru lokalizačního nástroje zvažte:</p>

<ul>
  <li><strong>Typ projektu</strong> – webová aplikace vs. obsahové stránky</li>
  <li><strong>Velikost týmu</strong> – jednotlivec vs. tým překladatelů</li>
  <li><strong>Rozpočet</strong> – open-source vs. placené služby</li>
  <li><strong>Integrace</strong> – podporované frameworky a nástroje</li>
  <li><strong>Automatizace</strong> – CI/CD pipeline, automatické překlady</li>
</ul>

<p>Pro menší projekty začněte s jednoduchými řešeními jako JSON soubory s překlady, pro větší projekty zvažte specializované nástroje s pokročilými funkcemi pro správu překladů.</p>


<h2 id="js">JS knihovny pro překlady</h2>

<p>Technicky mi přijde vhodné pro lokalisaci použít nějaké hotové řešení dle typu použitého frameworku:</p>

<ul>
  <li><strong>Svelte:</strong>
    <ul>
      <li><a href="https://github.com/kaisermann/svelte-i18n">svelte-i18n</a> – Oficiální i18n knihovna pro Svelte s TypeScript podporou</li>
      <li><a href="https://github.com/ivanhofer/typesafe-i18n">typesafe-i18n</a> – Type-safe i18n řešení s generováním typů</li>
      <li><a href="https://github.com/robinblomberg/svelte-i18n">svelte-i18n</a> (robinblomberg) – Alternativní implementace s jednoduchým API</li>
    </ul>
  </li>
  <li><strong>React:</strong>
    <ul>
      <li><a href="https://react.i18next.com/">react-i18next</a> – Nejoblíbenější i18n knihovna pro React, postavená na i18next</li>
      <li><a href="https://github.com/formatjs/formatjs">react-intl</a> – Oficiální i18n knihovna od Intl.js, podporuje ICU MessageFormat</li>
      <li><a href="https://github.com/lingui/js-lingui">Lingui</a> – Moderní i18n knihovna s TypeScript podporou a CLI nástroji</li>
    </ul>
  </li>
  <li><strong>Vue:</strong>
    <ul>
      <li><a href="https://vue-i18n.intlify.dev/">Vue I18n</a> – Oficiální i18n knihovna pro Vue.js s pokročilými funkcemi</li>
      <li><a href="https://github.com/intlify/vue-i18n-next">Vue I18n Next</a> – Verze pro Vue 3 s Composition API</li>
      <li><a href="https://github.com/antfu/vue-i18n">@antfu/vue-i18n</a> – Lightweight alternativa s TypeScript podporou</li>
    </ul>
  </li>
</ul>

<p>Pro většinu projektů doporučuji začít s oficiální knihovnou daného frameworku, protože mají nejlepší dokumentaci a komunitu. Pokud potřebujete pokročilé funkce jako TypeScript generování typů, zvažte specializované řešení jako typesafe-i18n nebo Lingui.</p>


<h2 id="udrzovani-prekladu">Udržování překladů</h2>

<p>Jedním z největších problémů při lokalizaci je udržování překladů v aktuálním stavu. Zde jsou praktické tipy:</p>

<h3 id="kontrola-kompletnosti">Kontrola kompletních překladů</h3>

<div class="note">
<p><strong>Linting nástroje:</strong> Používejte ESLint pravidla a specializované pluginy, které kontrolují, zda jsou všechny texty v překladových souborech a nejsou hardcoded v kódu.</p>
</div>

<pre><code>// ESLint pravidlo pro kontrolu hardcoded textů
// .eslintrc.js
module.exports = {
  rules: {
    'no-hardcoded-text': 'error',
    'i18n/no-chinese-character': 'error',
    'i18n/no-english-words': 'error'
  }
};</code></pre>

<h3 id="automaticka-kontrola">Automatická kontrola</h3>

<p>Nastavte CI/CD pipeline, která automaticky kontroluje:</p>

<ul>
  <li><strong>Chybějící překlady</strong> – porovnání klíčů mezi jazyky</li>
  <li><strong>Nepoužívané klíče</strong> – analýza kódu a překladových souborů</li>
  <li><strong>Hardcoded texty</strong> – skenování kódu pro nepřeložené řetězce</li>
</ul>

<pre><code>// GitHub Actions workflow pro kontrolu překladů
name: Check Translations
on: [push, pull_request]
jobs:
  check-translations:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check missing translations
        run: npm run check-translations
      - name: Check unused keys
        run: npm run check-unused-keys</code></pre>

<h3 id="nastroje-pro-kontrolu">Nástroje pro kontrolu</h3>

<ul>
  <li><strong>i18n-ally</strong> – VS Code rozšíření pro správu překladů</li>
  <li><strong>i18n-lint</strong> – CLI nástroj pro kontrolu překladových souborů</li>
  <li><strong>typesafe-i18n</strong> – TypeScript řešení s automatickou kontrolou typů</li>
  <li><strong>Lingui</strong> – CLI nástroje pro extrakci a validaci překladů</li>
</ul>

<h3 id="best-practices">Best practices</h3>

<div class="note">
<p><strong>Konvence pojmenování:</strong> Používejte konzistentní strukturu klíčů (např. <code>user.profile.updated</code>) a dokumentujte význam každého klíče.</p>
</div>

<ul>
  <li><strong>Fallback hodnoty</strong> – vždy definujte výchozí jazyk pro chybějící překlady</li>
  <li><strong>Kontextové komentáře</strong> – přidávejte poznámky o použití klíče v překladových souborech</li>
  <li><strong>Automatické testy</strong> – testujte, zda se správně zobrazují překlady v různých jazycích</li>
  <li><strong>Code review</strong> – kontrolujte překlady při code review procesu</li>
</ul>

<pre><code>// Příklad překladového souboru s komentáři
{
  "user.profile.updated": "Profile updated successfully", // Shown after profile save
  "user.profile.error": "Failed to update profile", // Shown on validation error
  "user.profile.loading": "Updating profile..." // Shown during API call
}</code></pre>

<p>Pravidelná kontrola a automatizace je klíčová pro udržení kvality lokalizace v dlouhodobém horizontu.</p>

<h3 id="strategie-pojmenovani">Strategie pojmenování klíčů</h3>

<p>Jedním z nejdůležitějších rozhodnutí při návrhu překladového systému je, jak pojmenovávat klíče. Existují dvě hlavní strategie:</p>

<h4 id="klice-podle-umisteni">1. Klíče podle umístění (Location-based)</h4>

<pre><code>// Příklad klíčů podle umístění v aplikaci
{
  "header.navigation.login": "Přihlásit",
  "header.navigation.logout": "Odhlásit",
  "sidebar.menu.dashboard": "Nástěnka",
  "sidebar.menu.profile": "Profil",
  "footer.copyright": "© 2024 Moje Aplikace"
}</code></pre>

<p><strong>Výhody:</strong></p>
<ul>
  <li>Snadná orientace v kódu – víte přesně, kde se text zobrazuje</li>
  <li>Jednoduché přidávání nových překladů pro konkrétní sekce</li>
  <li>Logická organizace podle struktury UI</li>
</ul>

<p><strong>Nevýhody:</strong></p>
<ul>
  <li>Duplikace textů – stejný text na více místech vyžaduje více klíčů</li>
  <li>Horší znovupoužitelnost překladů</li>
  <li>Při změně UI je potřeba přejmenovávat klíče</li>
</ul>

<h4 id="klice-podle-obsahu">2. Klíče podle obsahu (Content-based)</h4>

<pre><code>// Příklad klíčů podle obsahu textu
{
  "common.actions.login": "Přihlásit",
  "common.actions.logout": "Odhlásit",
  "common.navigation.dashboard": "Nástěnka",
  "common.navigation.profile": "Profil",
  "common.legal.copyright": "© 2024 Moje Aplikace"
}</code></pre>

<p><strong>Výhody:</strong></p>
<ul>
  <li>Znovupoužitelnost překladů napříč aplikací</li>
  <li>Snadnější údržba – změna překladu na jednom místě</li>
  <li>Lepší konzistence terminologie</li>
  <li>Menší velikost překladových souborů</li>
</ul>

<p><strong>Nevýhody:</strong></p>
<ul>
  <li>Horší orientace v kódu – nevíte hned, kde se text zobrazuje</li>
  <li>Potřeba pečlivého plánování struktury klíčů</li>
  <li>Riziko konfliktů při přidávání nových překladů</li>
</ul>

<h4 id="doporučení">Doporučení</h4>

<div class="note">
<p><strong>Hybridní přístup:</strong> Pro většinu projektů je nejlepší kombinace obou strategií. Používejte obsahové klíče pro běžné texty (tlačítka, navigace, chybové hlášky) a umístění pro specifické texty konkrétních komponent.</p>
</div>

<pre><code>// Příklad hybridního přístupu
{
  // Obsahové klíče pro znovupoužitelné texty
  "common.actions.save": "Uložit",
  "common.actions.cancel": "Zrušit",
  "common.validation.required": "Toto pole je povinné",
  
  // Umístění pro specifické texty
  "user.profile.title": "Uživatelský profil",
  "user.profile.description": "Upravte své osobní údaje",
  "user.profile.avatar.help": "Klikněte pro změnu profilového obrázku"
}</code></pre>

<p><strong>Pravidla pro výběr strategie:</strong></p>
<ul>
  <li><strong>Malé aplikace</strong> → Začněte s umístěním, přejděte na obsah při růstu</li>
  <li><strong>Velké aplikace</strong> → Obsahové klíče s pečlivou organizací</li>
  <li><strong>Komponenty knihovny</strong> → Obsahové klíče pro znovupoužitelnost</li>
  <li><strong>Jednorázové texty</strong> → Umístění pro snadnou orientaci</li>
</ul>