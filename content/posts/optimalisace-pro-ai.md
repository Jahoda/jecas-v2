---
title: "Optimalisace webu pro AI nástroje"
headline: "Optimalisace webu pro AI nástroje"
description: "Jak připravit obsah a technickou stránku webu, aby ho AI asistenti a agenti správně našli, pochopili a doporučili."
date: "2025-10-22"
last_modification: "2025-10-22"
status: 0
tags: ["ai", "seo", "struktura", "obsah"]
format: "html"
---

<p>AI asistenti a agenti stále častěji odpovídají na dotazy místo klasických výsledků vyhledávání. Aby váš web v tomto světě uspěl, musí být <b>strojově srozumitelný</b>, <b>důvěryhodný</b> a <b>snadno citovatelný</b>.</p>

<p><img src="/files/optimalisace-pro-ai/pristupy-chatbotu.png" class="border" alt="Přístupy z chatbotů" /></p>

<h2 id="proc-to-resit">Proč to řešit</h2>

<p>Být citován v chatbotech je jako být v „top 3 výsledcích" v éře AI. I když AI odpovědi snižují celkové prokliky na weby, citované zdroje dostávají kvalifikovanou návštěvnost od uživatelů, kteří chtějí zjistit víc nebo ověřit informace. AI asistenti citují jen autoritativní zdroje – být mezi nimi posiluje vaši pozici experta a dostává vaši značku před miliony uživatelů. Lidé, kteří prokliknou z AI odpovědi, už mají kontext a přicházejí s konkrétním záměrem, což znamená vyšší šanci na konverzi než u běžného prokliku z vyhledávání.</p>

<ul>
  <li><b>Návštěvnost</b> – AI odpovědi omezují prokliky, o to důležitější je být zdrojem.</li>
  <li><b>Značka</b> – asistenti citují autoritativní zdroje. Chcete být mezi nimi.</li>
  <li><b>Konverse</b> – dobře strukturovaný obsah vede k přesnějším doporučením.</li>
  <li><b>Budoucí kompatibilita</b> – jednou připravená data fungují napříč nástroji.</li>
  </ul>

<h2 id="kdy-resit">Kdy AEO řešit a kdy ne</h2>

<h3 id="kdy-ano">Hodí se pro:</h3>
<ul>
  <li><b>Informační weby</b> – blogy, dokumentace, návody, znalostní báze. AI je rádo cituje.</li>
  <li><b>Odborný obsah</b> – technické články, výzkum, medicína, právo. Autorita je klíčová.</li>
  <li><b>E‑commerce s detaily</b> – produktové popisy, specifikace, návody k použití.</li>
  <li><b>Lokální firmy</b> – služby, kontakty, otevírací doba. AI asistenti je doporučují.</li>
  <li><b>B2B weby</b> – případové studie, whitepapers, řešení problémů.</li>
  <li><b>FAQ a návody</b> – přímo mapuje dotazy uživatelů.</li>
</ul>

<h3 id="kdy-ne">Méně prioritní nebo nevhodné:</h3>
<ul>
  <li><b>Aplikace za přihlášením</b> – není co crawlovat, obsah není veřejný.</li>
  <li><b>Rychle se měnící data</b> – akciové kurzy, live skóre. AI pracuje se statickým obsahem.</li>
  <li><b>Vizuálně závislé weby</b> – portfolia designérů, galerie. Text není hlavní hodnota.</li>
  <li><b>Zábavní/virální obsah</b> – memes, sociální sítě. Citovatelnost není cíl.</li>
  <li><b>Velmi malé weby</b> – pár stránek bez ambice být zdrojem informací.</li>
  <li><b>Weby s citlivým obsahem</b> – kde nechcete být citováni bez kontroly kontextu.</li>
</ul>

<p><b>Pravidlo:</b> Pokud už děláte SEO a máte kvalitní informační obsah, AEO je přirozené rozšíření. Pokud je váš web primárně aplikace nebo vizuální prezentace, investujte jinde.</p>

<h2 id="zkratka">Zkrácený seznam priorit</h2>
<ol>
  <li><b>Strukturovaná data</b> (<a href="/json-ld">JSON‑LD</a>) – <code>Article</code>, <code>BreadcrumbList</code>, <code>FAQPage</code>, <code>HowTo</code>.</li>
  <li><b>Čitelné sekce</b> – krátké odstavce, jasné nadpisy, shrnutí nahoře.</li>
  <li><b>Zdrojovatelnost</b> – stabilní URL, citovatelné odstavce, explicitní datum a autora.</li>
  <li><b>EEAT</b> – expertisa, zkušenost, autorita, důvěryhodnost: profil autora, reference, kontakt.</li>
  <li><b>Technický základ</b> – CWV, sitemapa, robots, kanonické odkazy, <code>lang</code>, <code>hreflang</code>.</li>
  <li><b>Licencování</b> – jasná licence obsahu a obrázků, <code>copyright</code>, <code>license</code> v metadatech.</li>
  <li><b>AI‑friendly media</b> – popisky obrázků, přepis videí, otevřené formáty.</li>
  <li><b>Linking</b> – interní odkazy, odkazy na autoritativní zdroje.</li>
  <li><b>API/feeds</b> – RSS/Atom, <code>schema:DataFeed</code>, MD/JSON exporty pro RAG systémy.</li>
  <li><b>RAG readiness</b> – segmentovatelný obsah, per‑blok kotvy, stabilní selektory.</li>
  </ol>

<h2 id="strukturovana-data">Strukturovaná data</h2>
<p>Preferujte <b>JSON‑LD</b>. Pro články použijte <code>schema.org/Article</code> nebo <code>BlogPosting</code>. Přidejte <code>datePublished</code>, <code>dateModified</code>, <code>author</code>, <code>headline</code>, <code>image</code>, <code>mainEntityOfPage</code> a <code>publisher</code>. U návodů <code>HowTo</code>, u častých dotazů <code>FAQPage</code>.</p>

<div class="live">
<pre><code>{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Optimalisace webu pro AI nástroje",
  "datePublished": "2025-10-22",
  "dateModified": "2025-10-22",
  "author": { "@type": "Person", "name": "Bohumil Jahoda" },
  "mainEntityOfPage": "https://jecas.cz/optimalisace-pro-ai-nastroje"
}
</code></pre>
</div>

<h2 id="rozdily-seo">Rozdíly oproti klasickému SEO</h2>

<p>Klasické SEO cílí na proklik a pozici ve výsledcích vyhledávání, zatímco optimalizace pro AI se zaměřuje na to, aby váš obsah byl citován jako zdroj v odpovědích AI asistentů – vyžaduje proto větší důraz na strojovou srozumitelnost (rozšířená JSON‑LD schémata, stabilní kotvy), segmentovatelnost obsahu a explicitní citovatelnost s ověřitelnými daty.</p>
<table>
  <tr>
    <td><b>Téma</b></td>
    <td><b>Klasické SEO</b></td>
    <td><b>Optimalisace pro AI</b></td>
  </tr>
  <tr>
    <td>Primární cíl</td>
    <td>Proklik na web, pozice ve výsledcích</td>
    <td>Být citovaným/zdrojovým dokumentem v odpovědi</td>
  </tr>
  <tr>
    <td>Struktura stránky</td>
    <td>Meta tagy, nadpisy, vnitřní odkazy</td>
    <td>Segmentovatelný obsah, stabilní kotvy, jednoznačné entity</td>
  </tr>
  <tr>
    <td>Data pro stroje</td>
    <td>Rich snippets pro SERP</td>
    <td>Rozšířená schémata, konzistentní JSON‑LD, datové feedy</td>
  </tr>
  <tr>
    <td>Hodnocení kvality</td>
    <td>EEAT primárně pro vyhledávače</td>
    <td>EEAT + ověřitelnost a citovatelnost napříč modely a agenty</td>
  </tr>
  <tr>
    <td>Obsah</td>
    <td>Klíčová slova, záměr dotazu</td>
    <td>Jasné odpovědi, FAQ, kroky návodu, datové body</td>
  </tr>
  <tr>
    <td>Měření</td>
    <td>Imprese, prokliky, pozice</td>
    <td>Počet citací/zmínek v odpovědích, referral z AI platforem</td>
  </tr>
  <tr>
    <td>Technika</td>
    <td>Indexace, CWV, kanonické URL</td>
    <td>Robustní parsovatelnost HTML, stabilní selektory, dostupnost textu</td>
  </tr>
  <tr>
    <td>Multimedia</td>
    <td>Alt texty, og:image</td>
    <td>Detailní popisky, přepisy, licence pro bezpečné využití</td>
  </tr>
</table>

<h2 id="obsah">Obsah, který AI pochopí</h2>
<ul>
  <li><b>Lead</b> – první odstavec shrnuje odpověď. Asistenti ho často berou jako citaci.</li>
  <li><b>Jedno téma na stránku</b> – pomáhá při RAG i citacích.</li>
  <li><b>Čitelné nadpisy</b> – <code>h2/h3</code> s jasným záměrem („Jak nastavit…“).</li>
  <li><b>FAQ sekce</b> – přímo mapuje otázky uživatelů, dobře se linkuje.</li>
  <li><b>Data a příklady</b> – zvyšují důvěryhodnost a citovatelnost.</li>
  </ul>

<h3 id="delka">Délka článku: krátký vs. dlouhý</h3>
<ul>
  <li><b>Krátké</b> – perfektní pro jednoznačné dotazy. Vyšší šance na přesnou citaci.</li>
  <li><b>Dlouhé</b> – vhodné pro komplexní témata. Vyžaduje jasnou strukturu a kotvy.</li>
  <li><b>Doporučení</b> – jednejte „modulárně“: kratší samostatné stránky pro dílčí otázky, případně souhrnná stránka s přehledem a odkazy.</li>
  <li><b>Metriky</b> – sledujte, které sekce jsou citované/odkazované, a podle toho obsah dále štěpte.</li>
</ul>

<h2 id="citovatelnost">Co znamená citovatelnost</h2>
<p>Citovatelnost je míra, s jakou mohou AI asistenti i lidé jednoznačně odkázat na konkrétní tvrzení nebo část stránky.</p>
<ul>
  <li><b>Jednoznačné bloky</b> – krátké odstavce a sekce s vlastním <code>id</code> pro přesné odkazy.</li>
  <li><b>Stabilní URL a kotvy</b> – per‑sekci/per‑odstavec kotvy, které se v čase nemění.</li>
  <li><b>Jasná tvrzení + zdroje</b> – explicitní závěry, data a odkazy na autoritativní zdroje.</li>
  <li><b>Kontext a metadata</b> – autor, <code>datePublished</code>, <code>dateModified</code>, kanonická URL a JSON‑LD.</li>
  <li><b>Konzistentní HTML</b> – sémantika, opakovatelné selektory, bez závislosti na JS pro hlavní text.</li>
  <li><b>Copy‑friendly UI</b> – možnost „zkopírovat odkaz na odstavec“ nebo permalink ikona.</li>
  </ul>

<h3 id="citovatelnost-mereni">Jak citovatelnost měřit</h3>
<ul>
  <li><b>Share of answer</b> – četnost, s jakou je vaše URL/kotva citována v AI odpovědích.</li>
  <li><b>Referraly z AI</b> – segmentace návštěvnosti podle platforem a přítomnosti kotev v URL.</li>
  <li><b>Logy crawlerů</b> – výskyty AI user‑agentů a přístupy přímo na kotvy sekcí.</li>
  </ul>

<h3 id="citovatelnost-checklist">Rychlý checklist</h3>
<ul>
  <li>Každé <code>h2/h3</code> má stabilní <code>id</code>.</li>
  <li>Klíčové odstavce mají per‑blok <code>id</code> nebo permalink.</li>
  <li>Uveden autor, <code>datePublished</code>, <code>dateModified</code> a odpovídající JSON‑LD.</li>
  <li>Důležitá tvrzení odkazují na zdroj/datový bod.</li>
  <li>Struktura a selektory zůstávají stabilní i po redesignu.</li>
  </ul>

<h2 id="eeat">EEAT v praxi</h2>
<ul>
  <li><b>Autor</b> – stránka autora, zkušenost, odkazy na projekty.</li>
  <li><b>Ověřitelnost</b> – odkazy na zdroje, datum aktualisace.</li>
  <li><b>Kontakt</b> – viditelné možnosti spojení, IČO u firem.</li>
  </ul>

<h2 id="technika">Technické minimum</h2>
<ul>
  <li><b>Core Web Vitals</b> – rychlé načtení a stabilní layout.</li>
  <li><b>Robots + sitemapa</b> – přístupnost obsahu, jasně vyloučené části.</li>
  <li><b>Kanonické URL</b> – zamezí duplicitám a ředění signálů.</li>
  <li><b>Jazyk</b> – <code>lang="cs"</code>, případně <code>hreflang</code> verze.</li>
  <li><b>Open Graph + Twitter</b> – lepší sdílení i pro nástroje.</li>
  </ul>

<h2 id="platformy">Pro které chatboty a AI nástroje optimalisovat</h2>
<ul>
  <li><b>ChatGPT (OpenAI)</b> – silně pracuje s citacemi a odkazy; dbejte na jasné sekce, JSON‑LD a stabilní kotvy.</li>
  <li><b>Perplexity</b> – klade důraz na zdroje a per‑sekční citace; kvalitní odkazování a stručné odpovědi.</li>
  <li><b>Google Gemini / SGE</b> – využívá strukturovaná data a autoritu domény; pečlivé JSON‑LD a EEAT.</li>
  <li><b>Microsoft Copilot (Bing)</b> – navazuje na vyhledávání; sitemapa, kanonické URL, čistý HTML a stabilní selektory.</li>
  <li><b>Claude (Anthropic)</b> – ocení jasná tvrzení a citelné zdroje; stabilní kotvy a FAQ.</li>
</ul>
<p><b>Společný jmenovatel:</b> segmentovatelný HTML obsah, stabilní kotvy, konzistentní JSON‑LD, uvedený autor a data publikace/aktualisace.</p>

<h2 id="ai-crawlers">AI crawleři a řízení přístupu</h2>
<p>Definujte, jaké AI boty mohou váš web číst. Pokud nechcete být zdrojem pro konkrétní nástroje, nastavte to explicitně.</p>
<h3 id="robots-txt">robots.txt</h3>
<pre><code>User-agent: GPTBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
</code></pre>
<h3 id="meta-robots">Meta a HTTP hlavičky</h3>
<pre><code>&lt;meta name="robots" content="index,follow" />
&lt;meta name="googlebot" content="index,follow" />
&lt;meta name="ai-bots" content="allow" />
</code></pre>
<p>Pokud chcete povolit, raději explicitně uvádějte <i>Allow</i> v robots.txt a zachovejte sitemapu. Při blokování AI botů zvažte dopad na citace v odpovědích.</p>

<h2 id="javascript">Podpora JavaScriptu v AI nástrojích</h2>
<ul>
  <li><b>Nespoléhejte na vykonávání JS</b> – část crawlerů JS nespouští nebo jen omezeně. Klíčový obsah a metadata musí být v HTML.</li>
  <li><b>SSR/prerender</b> – renderujte hlavní obsah na serveru; <code>JSON‑LD</code> vkládejte inline, ne generováním až po načtení.</li>
  <li><b>Progressive enhancement</b> – JavaScript přidává interakci, ne základní text. Důležitý text neodkládat do XHR/SPA routingu.</li>
  <li><b>Noscript a fallbacky</b> – zajistěte čitelné minimum i bez JS.</li>
  <li><b>Praktický test</b> – zkontrolujte verzi „bez JS“: <code>curl</code>, vypnutý JS v prohlížeči, textový náhled.</li>
</ul>

<h2 id="media">Obrázky, video, audio</h2>
<ul>
  <li><b>Popisky</b> – výstižné <code>alt</code>, <code>figcaption</code>, EXIF/licence.</li>
  <li><b>Přepisy</b> – u videí a podcastů poskytněte přepis.</li>
  <li><b>Formáty</b> – preferujte otevřené (WebVTT, WebM) a dostupné.</li>
  </ul>

<h2 id="feeds">Feedy a datové exporty</h2>
<p>RSS/Atom umožní snadný sběr obsahu. Zvažte i export <code>.json</code> s metadaty. Datově‑orientované stránky mohou použít <code>schema:DataFeed</code>.</p>

<h3 id="markdown-export">Markdown jako datový formát</h3>
<p>Markdown je pro LLM tokenově efektivnější než HTML. Pokud nabízíte API nebo datové exporty, zvažte MD jako alternativu:</p>

<ul>
  <li><b>Tokenová efektivita</b> – méně značek = menší náklady na zpracování</li>
  <li><b>RAG optimalisace</b> – čistší text se snadněji rozděluje na chunky</li>
  <li><b>Parsování</b> – konzistentní syntaxe bez HTML šumu</li>
  <li><b>Použití</b> – trénink modelů, dokumentační systémy, znalostní báze</li>
</ul>


<p>Nabízejte MD <i>kromě</i> HTML, ne místo něj. HTML zůstává primární pro SEO a metadata, MD slouží jako datový export pro AI nástroje a znalostní systémy.</p>

<h2 id="mereni">Měření citací a referralů</h2>

<p><img src="/files/optimalisace-pro-ai/chatgpt-utm.png" class="border" alt="" /></p>

<ul>
  <li><b>Referrery</b> – sledujte domény platforem (pokud posílají referer) a tvořte segment.</li>
  <li><b>Parametry</b> – připravte vlastní UTM pro AI odpovědi; u citací je lze zachytit v odkazech.</li>
  <li><b>Logy</b> – analyzujte access logy na výskyty user‑agentů AI crawlerů a zdroje odkazů.</li>
  <li><b>Share of answer</b> – v pravidelných intervalech měřte, zda a jak často se vaše URL objevuje v AI odpovědích na cílové dotazy.</li>
  <li><b>On‑page kotvy</b> – per‑sekci <code>id</code> pomůže zjistit, které bloky jsou citovány.</li>
</ul>

<h2 id="rag">Připraveno pro RAG a agenty</h2>
<ul>
  <li><b>Stabilní kotvy</b> – per‑odstavec/per‑sekce <code>id</code> pro přesné citace.</li>
  <li><b>Konzistentní HTML</b> – semantika a opakovatelné selektory.</li>
  <li><b>Čistý text</b> – minimum šumu, konzistentní interpunkce, beze skrývání.</li>
  </ul>

<h2 id="zkratky">Zkratky a pojmy</h2>
<dl>
  <dt>AEO</dt>
  <dd><b>Answer Engine Optimization</b> – optimalisace pro odpovědní/konverzační enginy.</dd>
  <dt>AIO</dt>
  <dd><b>AI Optimization</b> – širší pojem pro přípravu obsahu pro AI nástroje.</dd>
  <dt>LLMO</dt>
  <dd><b>Large Language Model Optimization</b> – přizpůsobení obsahu tomu, jak LLM čtou a citují.</dd>
  <dt>RAG</dt>
  <dd><b>Retrieval‑Augmented Generation</b> – generování doplněné o vyhledané zdroje.</dd>
  <dt>EEAT</dt>
  <dd><b>Experience, Expertise, Authoritativeness, Trustworthiness</b> – signály kvality zdroje.</dd>
  <dt>CWV</dt>
  <dd><b>Core Web Vitals</b> – metriky rychlosti a stabilního zobrazení.</dd>
  <dt>JSON‑LD</dt>
  <dd>Formát pro vložení strukturovaných dat <code>schema.org</code>.</dd>
  <dt>OG</dt>
  <dd><b>Open Graph</b> – metadata pro náhledy a sdílení.</dd>
  <dt>KG</dt>
  <dd><b>Knowledge Graph</b> – graf znalostí (entity, vztahy), který AI nástroje využívají.</dd>
  <dt>SGE</dt>
  <dd><b>Search Generative Experience</b> – generativní odpovědi ve výsledcích vyhledávání.</dd>
</dl>

<h2 id="faq">FAQ</h2>
<dl>
  <dt>Stačí běžné SEO?</dt>
  <dd>Je to dobrý základ, ale AI vyžaduje navíc strojovou strukturu a citovatelnost.</dd>
  <dt>Musím přidat AI chatbot?</dt>
  <dd>Nemusíte. Důležitější je, aby váš obsah chápaly ostatní AI nástroje.</dd>
  <dt>Má smysl blokovat AI crawler?</dt>
  <dd>Jen pokud nechcete být použitelní jako zdroj. Zvažte přínosy vs. rizika.</dd>
  <dt>Mám poskytovat obsah v Markdown?</dt>
  <dd>Jako doplněk ano, ne jako náhradu HTML. MD je vhodný pro datové API a RAG systémy kvůli tokenové efektivitě.</dd>
  <dt>Je SEO mrtvé?</dt>
  <dd>Ne, SEO není mrtvé. Základy (indexace, CWV, struktura, interní odkazy) zůstávají nutné; posouvá se cíl: kromě prokliků je klíčové být citovatelným zdrojem pro AI. Prakticky: dělejte SEO jako pevný základ a přidejte AEO (JSON‑LD, stabilní kotvy, FAQ, jasné odpovědi).</dd>
  </dl>

<h2 id="shrnutí">Krátké shrnutí</h2>
<p>Není nutné „dělat SEO znovu“. Dobrý základ SEO je nutný, ale pro AI přidejte <b>strukturu</b> (JSON‑LD, stabilní kotvy), <b>citovatelnost</b> (jasná tvrzení, zdroje) a <b>modularitu</b> obsahu (jedno téma na stránku, FAQ). Tím pokryjete vyhledávače i AI asistenty zároveň.</p>

<h2 id="zaver">Závěr</h2>
<p>Optimalisace pro AI je pokračování dobrého SEO: jasná struktura, věrohodnost a technická čistota. Vyhrají weby, které jsou snadno čitelné pro lidi i stroje.</p>

<h2 id="odkazy">Odkazy jinam</h2>
<div class="internal-content">
  <ul>
    <li><a href="/seo">SEO</a></li>
    <li><a href="/json-ld">JSON‑LD</a></li>
    <li><a href="/open-graph">Open Graph</a></li>
  </ul>
</div>

<h2 id="checklist">Checklist</h2>
<ul>
  <li>Přidejte JSON‑LD pro články/návody/FAQ a udržujte ho aktuální.</li>
  <li>Rozdělte komplexní témata na samostatné stránky s jasnými <code>h2/h3</code>.</li>
  <li>Zaveďte stabilní kotvy pro sekce/odstavce a používejte je v odkazech.</li>
  <li>Doplňte autora, datum publikace a poslední aktualisace.</li>
  <li>Přidejte FAQ s nejčastějšími otázkami a stručnými odpověďmi.</li>
  <li>Vylepšete CWV (LCP, CLS, INP) a zajistěte bezchybnou indexaci.</li>
  <li>Doplňte alt/figcaption, u videí přepis; u médií uveďte licenci.</li>
  <li>Zpřehledněte interní prolinkování a odkazujte na autoritativní zdroje.</li>
  <li>Zpřístupněte RSS/Atom a případně MD/JSON export pro RAG systémy.</li>
  <li>Sledujte citace/referraly z AI platforem a podle toho obsah štěpte.</li>
</ul>


