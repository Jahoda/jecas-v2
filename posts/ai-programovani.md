---
title: "10+ věcí, jak AI pomáhá při programování"
headline: "10+ věcí, jak AI pomáhá při programování"
description: "AI dokáže výrazně zvýšit efektivitu programátora. Nevezme mu ale práci?"
date: "2023-03-08"
last_modification: "2023-03-08"
status: 1
tags: ["Produktivita", "Rady a nápady"]
---

S masovým používáním AI (*Artificial Intelligence*), česky umělé inteligence se v roce 2023 roztrhl pytel.

Začalo to s nástrojem [DALL-E](https://openai.com/product/dall-e-2), který na základě textového vstupu dokáže generovat obrázky.

To je pěkná hračka, ale pro programátora se víc hodí práce s textem.

## Nástroje

Které nástroje by vám neměly uniknout:

### ChatGPT

[ChatGPT](https://chat.openai.com/chat) ([více informací](https://openai.com/blog/chatgpt))

GPT je zkratka pro *Generative Pre-trained Transformer* a označuje rodinu předtrénovaných modelů hlubokého učení pro generování přirozeného jazyka.

V praxi je **ChatGPT** chatbot, který se na základě textového vstupu snaží provést, oč ho uživatel požádá.

### Codex

[Codex JavaScript Sandbox](https://platform.openai.com/codex-javascript-sandbox)

Na základě instrukcí, které je možné psát i česky, vygeneruje často funkční kód.

Výsledek se rovnou zobrazuje v prohlížeči:

### GitHub Copilot

[GitHub Copilot](https://github.com/features/copilot)

Copilot funguje jako rozšíření do editorů (do **VSCode** i **WebStormu**) a dokáže za člověka psát celé bloky kódu.

Typicky stačí napsat název metody a AI zkusí pochopit, co je cílem, a vygenerovat příslušný kód.

Je to takový vylepšený *autocomplete*.

Na obrázku je šedivou barvou navržený kód:

Před lety jsem zkoušel používat podobný nástroj [Tabnine](https://www.tabnine.com). Nebylo to špatné, ale Copilot mi přijde dál.

### DeepL

[DeepL](https://www.deepl.com/translator)

Jedná se o překladač používající strojové učení. Má překvapivě dobré výstupy.

Umí přes upload překládat celé soubory a má i dostupné API.

Jinak dobře překládá i ChatGPT.

## Využití

Využití je omezené asi jen fantasií uživatele.

Při programování jde umělé inteligenci dobře svěřit spoustu různých věcí.

Slovy [klasika](https://nette.org) platí následující:

    Opravdoví programátoři nepoužívají **ChatGPT** a **Copilot**.
Píší webové aplikace přes příkazovou řádku rovnou na server. Tímto jim vzdáváme hold. Nám ostatním AI ohromným způsobem ulehčí a zpříjemní práci.

### Rutinní úkoly

Je třeba vložit do DB 100 nejčastější freemailových poskytovatelů pro následné použití pro validaci při registraci?

Co si pomocí JS vygenerovat nějaký pěkný [CSS gradient](/gradient)?

### Konverse dat

ChatGPT dokáže efektivně provádět všechny možné textové konverse.

Co si třeba zkopírovat z Wikipedie nějakou tabulku a udělat z ní JS objekt s typy v TypeScriptu:

Kromě samotné konverse dat dokáže ChatGPT i napsat funkce, které data potřebným způsobem transformují.

Mám požadovaný vstup a požadovaný výstup a robot mi naprogramuje metodu, co to převede.

### Vysvětlení kódu

Nerozumíte nějakému kódu? ChatGPT dokáže popsat jeho chování:

### Oprava kódu

Stejně jako vysvětlení kódu. V některých případech pomůže AI i s opravou nebo zlepšením kódu.

Nepřijdou vám čitelné nějaké konstrukce? Není problém použít jiné při zachování funkčnosti.

AI nám **může dělat code review**.

### Psaní testů

Testy jsou hrozně důležité, ale skoro všichni je nesnáší psát.

ChatGPT je s radostí napíše za vás.

Možnost je to dělat i opačně. Ve stylu TDD – *test-driven development*  (česky: vývoj řízený testy) – nejprve napsat testy a AI nechat napsat samotný kód.

### Pojmenovávání

Pojmenovávání proměnných a funkcí je spolu s invalidováním cache největší programátorská výzva.

Co se sebe tuto tíhu sejmout a rozhodování nechat na stroji?

### Náhrada Stack Overflow

Když vypadne [Stack Overflow](https://stackoverflow.com), zastaví se na celém světě vývoj.

Vzhledem k tomu, že ChatGPT má *načtené* i Stack Overflow, jde pro získání hotových řešení použít rovnou.

A díky další konversaci dokáže řešení i rovnou upravit dle pokynů.

### Alternativní řešení

Obvykle existuje více možností, jak problém vyřešit. AI může k našemu řešení nabídnout alternativu a porovnat její výhody a nevýhody.

### Regulární výrazy

Léta jsem se chystal se pořádně naučit regulární výrazy.

S ChatGPT se to zdá jako zbytečné. Kromě vytvoření regulárního výrazu dle přání dokáže i vysvětlit, co daný *regulár* dělá.

### Změna programovacího jazyka

Máte kód v **Reactu**, ale potřebujete ho přepsat do **Svelte**?

Ideální úkol pro AI. Nutno poznamenat, že to úplně 100% není a často je výstupem převodu **nefunkční kód**, který vyžaduje ruční zásahy.

Použít jde i přímo web obsahující speciální rozhraní – [codeverter](https://codeverter.vercel.app).

### Copywriting

Máte aplikaci lokalisovanou do jazyka, kterým 100% nevládnete. Dost pravděpodobně bude lepší si texty nechat vygenerovat robotem, než něco smolit sám.

### Učení se

V neposlední řadě se ChatGPT hodí i pro případ, že se člověk chce učit programovat.

Je to asi nejrychlejší způsob, jak dostávat odpovědi na své otázky.

## Chyby

ChatGPT není zdaleka neomylný. Často dokáže suverénně **tvrdit naprosté ptákoviny**.

Je proto nutné výstupy kontrolovat. Pokud je tedy cílem mít správný výsledek. Občas může být i neoptimální řešení dostatečně dobré.

Koneckonců se ale v tomto neliší od lidí, kteří také dělají chyby a sebejistě tvrdí nesmysly.

## Nahradí AI programátory?

Z několikaměsíčního denního používání Copilota a ChatGPT mám pocit, že díky němu mám v režimu 24/7 dostupný neomezený počet **juniorních programátorů**, kteří pracují velmi rychle.

Tedy *některé* programátory už nahradil.

S očekávaným dalším zlepšování nahradí i ty další, kteří nezačnou AI používat ve svůj prospěch a nezvýší tak svoji efektivitu. A to je dobře.

## Závěr

    S masovým rozšířením používání umělé inteligence (AI) se otevírají nekonečné možnosti pro zjednodušení rutinních úkolů při programování.

  Nástroje jako ChatGPT, Codex, GitHub Copilot a DeepL umožňují programátorům snadněji a rychleji generovat kód, psát testy, překládat a vykonávat mnoho dalších úkolů, které by jinak vyžadovaly výrazně více času a úsilí.

  AI umožňuje programátorům pracovat efektivněji a rychleji, ale zároveň je nutné si uvědomit, že tyto nástroje nejsou neomylné a výstupy je nutné vždy kontrolovat.

  AI tedy nenahradí programátory, ale může jim pomoci zvýšit efektivitu a zjednodušit práci.

Mimochodem, závěr tohoto článku vygeneroval ChatGPT.