---
title: "Recense: Vzhůru do AMP"
headline: "Recense: Vzhůru do AMP"
description: "Má smysl používat AMP, nebo je to úplná blbost?"
date: "2020-05-11"
last_modification: "2020-05-12"
status: 1
tags: ["JavaScript", "Produktivita", "Recense"]
---

Po [Vzhůru do CSS3](/vzhuru-do-css3) a [Vzhůru do (responzivního) webdesignu](/vzhuru-do-responzivniho) vyšla v roce 2019 i příručka k **výrobě AMP webů** od Martina Michálka s Robinem Pokorným.

    - [Vzhůru do AMP](https://www.vzhurudolu.cz/ebook-amp/) – Vše o technologii pro tvorbu bezkonkurenčně rychlých webů v jednom e-booku. 304 stránek. Cena 299 Kč.

## Historie

O AMP jsem psal poprvé v roce 2016, kdy se tomu ještě říkalo [AMP HTML](/amp-html). Technologie od Google, která má sloužit ke **zrychlení webu** díky značným omezením v používání potenciálně pomalých a neefektivních knihoven a řešení.

Tehdy jsem došel k tomu, že AMP může mít své uplatnění, ale osobně si nebudu brzdit web stahováním AMP knihovny a v praxi tuto technologii nepoužívám.

Změnila se nějak situace?

## Současnost

Hlavní výhoda a důvod pro vytvoření AMP webu je **AMP Cache**.

Co to je?

### AMP Cache

**Google** a některé další firmy jsou ochotné AMP podoby stránek ukládat na své servery. A zároveň je ještě optimalisovat s ohledem na rychlost.

Díky tomu, že dodržení AMP podmínek má garantovat, že je stránka datově malá a rychlá, **Google může přednačítat a dokonce předrenderovávat AMP weby ve vyhledávání**. Tím se docílí bezkonkurenčně rychlého (často okamžitého) zobrazení webu po kliknutí z vyhledávače.

Docílit toho s *normálním* webem není možné.

Bohužel tedy z důvodu omezení Google, protože pořád platí, že **ne-AMP stránka může být rychlejší než AMP** (hlavně proto, že nemusí stahovat a spouštět cca 260 kB kódu samotného AMP JavaScriptu).

Mimo přístupy na web z Google a jiných služeb, co podporují přednačítání AMP versí, **může AMP stránku zpomalovat**.

To se týká ale hlavně hodně rychlých webů s maximálně nízkými stovkami kB JS kódu.

### Připravené JS komponenty

Zajímavá je i **AMP knihovna z pohledu vývojářů**, protože nabízí **hotová řešení v JavaScriptu** blízká *best practice* pro běžné součásti vývoje stránky jako [lazy loading](/lazy-loading), vkládání obrázků, videí, reklam nebo čehokoliv jiného bez otravného [poskakování](/poskakovani) stránky a podobně.

Připravené jsou i komponenty pro stavění layoutu jako třeba vysouvací menu (`amp-sidebar`), existuje rozbalovací sekce (`amp-accordion`) nebo třeba i komponenta pro odpočet času (`amp-date-countdown`).

    - amp.dev: [The AMP Component Catalogue](https://amp.dev/documentation/components/) – přehled všech komponent

AMP tak nemusí znamenat osekaná varianta normálního webu, ale jde web rovnou začít tvořit jako AMP. Dokonce i třeba **e-shop** (detail produktu e-shopu je v knize přímo jako příklad).

### Podpora vlastního JS

Vzhledem k neustálému vývoji je kniha mírně neauktuální. V době jejího vzniku ještě nebylo možné používat vlastní JavaScript.

Aktuálně je možné vložit v součtu až **150 kB vlastních skriptů** přes značku `&lt;amp-script>`. Takže klidně používat React nebo jQuery.

Nejedná se ale o plnohodnotnou podporu. Vlastní JS se spouští přes **Web Worker** (způsob, jak pouštět JS v jiném vlákně než samotnou stránku a neblokovat ji). Z toho plynou některá omezení v [použitelných rozhraní](https://github.com/ampproject/worker-dom/blob/master/web_compat_table.md). Omezené jsou i některé manipulace [DOMu](/dom).

    - amp.dev: [Use custom JavaScript in AMP pages](https://amp.dev/documentation/guides-and-tutorials/develop/custom-javascript/)

### Omezení CSS

Velikost veškerého CSS, ať se vkládá jakkoliv, je omezená na **cca 75 kB**.

Styly se vkládají buď pomocí značky `&lt;style amp-custom>`, nebo klasicky inline do atributu `style`, kde je pro každý atribut limit necelý **1 kB** (1000 bytů)

Externí CSS nelze připojovat s výjimkou vlastní fontů.

Není možné používat [`!important`](/important) ani stylovat třídy a značky začínající na `i-amphtml-`, aby nešlo přestylovat prvky AMP, pokud se zobrazuje z AMP Cache (jedná se například o pruh s informací o původní URL stránky).

## Budoucnost

AMP svým způsobem přidává na web věci, které by se dávno hodilo mít rovnou v prohlížečích. Je to rychlejší cesta z opačné strany, než vytvářet webové standardy, které se potom dlouhou dobu dostávají do stavu, kdy jsou prohlížeči dobře podporované.

Osobně to vidím tak, že jednoho krásného dne **nebudou AMP komponenty potřeba**, protože prohlížeče nebudou *rozbité* a budou řadu funkcionalit AMP komponent umět nativně.

## Závěr

Kniha  je neuvěřitelně ucelený průvodce touto technologií. Kromě teorie nabízí i praktický příklad, **jak do AMP správně přetvořit existující web** – jak jednotlivé prvky nahradit za AMP ekvivalenty a na co si dát pozor.

Obsahuje odpovědi prakticky na všechny otázky, co by člověka mohly napadnout.

Trochu jsem se obával, že to bude **nekritické opěvování AMP** ze strany jeho  fanoušků. Naštěstí se to nestalo a kniha se věnuje i argumentům proti AMP (třeba závislosti na Google) a osobně nemám moc s čím nesouhlasit.

Doporučuji si ji přečíst!

[Vzhůru do AMP](https://www.vzhurudolu.cz/ebook-amp/)!