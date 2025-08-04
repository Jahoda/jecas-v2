---
title: "Odkazy ze starých článků"
headline: "Odkazy ze starých článků"
description: "Do starých článků je dobré doplňovat odkazy na související nový obsah."
date: "2015-12-24"
last_modification: "2015-12-25"
status: 1
tags: ["SEO", "Rady a nápady", "Odkazy"]
---

U webu, kde postupně vzniká nový obsah, je poměrně běžné, že nové články obsahují **interní odkazy** na relevantní starší články.

V případě navazujících zápisků na blogu může úvod čtvrtého článku vypadat následovně. Obsahuje [odkazy](/odkaz) na předchozí obsah, aby si ho mohl návštěvník pohodlně dočíst:

    Zdroj příkladu: [Jak jsem téměř zkrachoval: Lidi](http://mariorozensky.cz/jak-jsem-temer-zkrachoval-lidi/)

Zvládnout **interní prolinkování** na starší obsah nebývá problém. Horší je to ale opačně…

## Vstupní stránka

Na rozdíl od skutečné návštěvy v živém světě, která přijde hlavními dveřmi, návštěvníci na webových stránkách přichází často pověstným *okýnkem na záchodě*, kudy je pošle třeba vyhledávač.

Každá stránka by tedy měla být připravená na to, že ji návštěvník uvidí jako první z celého webu.

Je-li proto daná stránka prvním dílem jakési série, je dobré, aby obsahovala odkazy na své pokračování, aby návštěvník věděl *kam dál*.

## Vliv interních odkazů na SEO

Kromě lepšího zážitku pro návštěvníky a potenciálně delší dobu strávenou na webu mají interní odkazy positivní dopad na umístění ve [vyhledávačích](/seo).

Na novou stránku ze začátku nevedou zpětné odkazy. Díky přidání interních odkazů ze starší stránek se vyhledávač dozví, že je nový obsah něčím důležitý.

K interním odkazům se v [rozhovoru o fulltextovém vyhledávání](http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-3-cast/) vyjádřil **Dušan Janovský** ze [Seznamu](/seznam) následovně:

  Budování interních odkazů. To je aktivní i důležité. Veledůležité.

  …

  Když se dívám do debugu rozhovacích stromů, které používáme pro výpočet relevance, vidím, že se odkazové signály nejčastěji točí kolem velmi nízkých hodnot. Jinak řečeno hlavní rozhodování většinou zní, zda stránka má alespoň jeden zaindexovaný zpětný odkaz (interní i externí), plus pár dalších podmínek.

## Odkazy ze starších stránek

Pokud existuje **série článků**, mělo by být v silách slušnějšího [redakčního systému](/cms) zajistit přehled s odkazy na všechny články oběma směry:

  - z novějších na starší

  - ze starších na novější

[**Jakub Hájek**](http://jimmyhayek.cz/) doporučuje pro [WordPress](/wordpress) doplněk **Serial Posts**.

V případě, že nejde o sérii článků, ale zkrátka třeba nejnovější *„článek A“* detailněji popisuje termín použitý v *článcích B, C a D*, je automatické řešení odkazů obtížnější.

Když se odkazování ze starších článků neřeší, je zpravidla vidět značný nepoměr mezi počtem odkazů v nových a starých článcích, protože ve starých článcích v době jejich vydání nebylo ještě kam odkazovat.

### Ruční hledání starých článků

Nejpracnější řešení, které ale dosáhne pravděpodobně nejlepších výsledků, je **ruční vyhledávání**.

Po publikování nového obsahu si autor článku vyhledá na webu klíčová slova, kterými se zabývá nová stránka. Z nalezených stránek potom vybere ty relevantní a na vhodná místa se doplní odkaz.

Znamená to po vytvoření nové stránky zapřemýšlet, odkud by se na ní dalo odkázat a **dát si práci s přidáním odkazů**.

Najít staré stránky, kam by šlo přidat odkaz, jde pomocí **interního hledání** v redakčním systému nebo s využitím [Googlu](/google) nebo Seznamu při použití operátoru `site`:

```
fytopuf site:jecas.cz
```

U statických stránek by prohledání obsahu souborů měl nabízet [textový editor](/windows-programy#text).

Pro obsah uložený v DB slouží [SQL](/sql) dotaz typu:

```
SELECT * FROM clanky WHERE text LIKE '%fytopuf%'
```

### Odkazy na zatím neexistující stránky

Tento způsob používá třeba **Wikipedie**. Pokud autor cítí, že by nějaké slovní spojení mělo mít samostatnou stránku, vytvoří na něj odkaz.

Redakční systém potom sám pozná, jestli odkazovaná stránka už existuje. Podle toho se do výsledného HTML (ne)přidá odkaz. Nemusí to být přímo jako na Wikipedii, kde jsou odkazy na neexistující stránky zobrazeny a odlišeny jinou barvou.

Výhoda tohoto postupu je v tom, že může existovat **přehled hesel**, pro která by se hodilo stránku vytvořit (vede na ně hodně odkazů).

### Automatické nahrazení odkazem

K článku se uvede klíčové slovo nebo slova, kterými se zabývá. Skript potom může projít staré texty a automaticky v nich výskyty slova nebo slovního spojení **nahradit odkazy na nové stránky**.

Problematické chování jde očekávat u homonym (stejně píšící se slova jiného významu). U češtiny je potom problém se skloňováním. Naštěstí ale není takový problém uvést pouze začátek slova a dát skriptu trochu volnosti.

Občas se stane, že bude odkazovat i slovo, kde to zrovna není žádoucí, protože se v daném kontextu týká něčeho jiného.

Ve WordPressu k tomu jde použít plugin **Internal Link Building**, který na zadaná klíčová slova dokáže automaticky doplnit požadované odkazy.

### Štítky (tagy)

Tagy umožňují asi nejlepší vyjádření vztahů mezi stránkami. Příbuzné stránky jde potom najít pod společným štítkem.

Použití tagů sice nezajistí přímo odkazy v textu starých článků na nové, ale jde někde bokem vypsat související stránky právě na základě shodných štítků.

## Náročnost na výkon

Automatická řešení pro doplňování odkazů na články nebo vypisování podobných článků bývá u hodně položek relativně hodně **náročné na výkon**.

Většinou je zbytečné třeba odkazy do textu doplňovat při každém načtení stránky, ale nabízí se finální obsah cacheovat.

Související články, je-li jejich výpis hodně náročný a není možné je cacheovat, se potom mohou třeba načítat asynchronně [AJAXem](/ajax), aby nezdržovaly zobrazení hlavního obsahu.

## Odkazy jinam

  - Lukáš Havrlant: [Jak vytvářím interní odkazy](http://programio.havrlant.cz/jak-vytvarim-interni-odkazy/)