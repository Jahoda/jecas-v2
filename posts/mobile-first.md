---
title: "Proč (ne)použít Mobile First"
headline: "Proč (ne)používat mobile first"
description: "Mobile first je postup tvorby responsivního webu, kdy se začíná od nejmenších obrazovek (mobil) až po větší (desktop)."
date: "2015-04-27"
last_modification: "2015-08-17"
status: 1
tags: ["Rady a nápady", "Responsivní design"]
---

Má-li být stránka [responsivní](/responsive), existuje několik možností, jak toho ve finále dosáhnout:

    Připravit nejdříve **desktopovou podobu** a následně z ní vytvořit odvozeninu funkční na menších displejích.

          [Převod webu na responsivní design](/prevod-responsivni-design) – jak předělat starý web na responsivní

    Začít variantou pro **nejmenší zařízení** a postupně se dostávat k větším uhlopříčkám.

    Zvolit nějakou kombinaci předchozích postupů. Například při tvorbě primárně pro **desktop** uvažovat o tom, že bude potřeba, aby se stránka přizpůsobila i **mobilním zařízením**.

    Vytvořit stránku **pouze pro mobil** – tzv. *mobile-only*.

Postup **mobile-first** (v překladu: *prvně pro mobilní zařízení*) je 2. možnost z předchozího seznamu.

## Jak vytvořit mobile-first stránku

Postup tvorby designu nejdříve pro malá zařízení je zpravidla takový, že se nejprve přidají stránce pouze základní styly jako jsou **barvy** nebo **styly písma**.

Stručně řečeno se využije toho, že HTML je samo o sobě téměř dokonale responsivní.

    - Responsivní design webu: [HTML je responsivní](/responsivni-web#html)

Následně se začne **roztahovat velikost okna prohlížeče** a v situaci, když už je základní jedno-sloupcové rozložení příliš široké, vytvoří se první tzv. *break-point*, po kterém se obsah začne organisovat do sloupců či jinak přizpůsobovat pro větší plochu.

```
@media (min-width: 30em) {
  /* pravidla pro šířku nad 30 em */
}
```

Starší prohlížeče tak dostanou pouze základní styly, protože nepodporují [`@media` pravidla](/media), takže obsah pro větší šířku **budou ignorovat**.

Problém je, že i prohlížeč bez podpory **media queries** (`@media`) – např. **Internet Explorer 8** – který by nemusel mít problém se zobrazení pokročilejšího layoutu, ale kvůli nepodporování `@media` bude mít jen základní zbytečně prostý vzhled.

V takových situacích nezbývá než generovat těmto prohlížečům speciální CSS. A připojit ho na základě detekce prohlížeče na straně serveru místo běžného CSS s `@media` pravidly.

**Horší postup** je použít JavaScriptový [polyfill](/polyfill) pro zprovoznění media queries ve starých prohlížečích nebo třeba připojení zvláštního CSS [podmíněnými komentáři](/podminene-komentare):

```
&lt;link rel="stylesheet" href="styl.css">
&lt;!--[if lte IE 8]>
  &lt;link rel="stylesheet" href="styl-ie.css">
&lt;![endif]-->
```

    - [Respond.js](https://github.com/scottjehl/Respond) – přidání podpory Media Queries pro **IE 6** až **IE 8**

Proč horší? Uživatel starého slabého prohlížeče bude zatěžován dalším JavaScriptem nebo dalším HTTP požadavkem a stahováním více dat kvůli dalšímu CSS souboru.

## Proč používat „mobile first“ přístup

Začít tvorbu webu pro zařízení s malými obrazovkami přináší některé výhody, ze kterých může těžit i desktopová verse.

### Výběr podstatných informací

Omezená velikost obrazovky nutí tvůrce webu k tomu, aby se zamyslel, **co na stránce je opravdu podstatné**. Z toho může těžit i varianta webu **pro desktop** (velké obrazovky), návštěvník potom nebude zahlcen informacemi, které se na stránku dostaly dle hesla „když nevíš, kam s tím, vytvoř další sloupec“, ale naopak **najde, co potřebuje**.

### Je snazší přidávat než ubírat

  Omlouvám se, že je tento článek tak dlouhý, neměl jsem čas ho napsat kratší.

Bývá značně snazší z jednoduchého webu vytvořit web složitější než obráceně. Během procesu **předělávání desktopového webu** na versi pro mobil dřív nebo později tvůrce narazí na situaci, kdy bude muset nějaký obsah z desktopu **vyškrtnout**, schovat za tlačítko a podobně, což vytváří nekonsistenci na zařízeních s různě velkou obrazovkou.

V ideálním případě by responsivní design měl nabízet **na všech zařízeních tentýž obsah**. Jinak:

    Může dojít k **matení návštěvníka**. Když si člověk nejprve oblíbí web na velkém počítači a při zobrazení stejné stránky na mobilu se nedostane k informacím, na které byl zvyklý.

    Skrytý obsah **není ideální s ohledem na [SEO](/seo)**. Když vyhledávač pošle člověka na web, protože hledal slovo „fytopuf“, a toto slovo na webu nebude viditelné (jelikož bude skryté), bude hledající návštěvník **vinit vyhledávač** z špatného hledání.

    Z tohoto důvodu Google snižuje váhu i obsahu, který je možné zobrazit po kliknutí.

          [Google a skrytý text](/skryty-text) – obsah skrytý pod tlačítkem „Zobrazit více“ může mít nižší důležitost

### Rychlost načítání

Vytváření stránky pro mobilní zařízení klade vyšší důraz na **nižší datovou náročnost**, protože mobily mají často k disposici pomalé připojení s velkou odezvou.

Tvůrce webu je tak tlačen k **snížení objemu potřebných dat** a **snížení počtu požadavků na soubory** (spojení CSS/JS do jednoho souboru, používání [obrázkových spritů](/css-sprite) a podobně).

### Formuláře

Zatímco **vyplňování formulářů** na desktopu je otravné, na mobilu je to ještě horší, takže je pro rozumnou použitelnost nutné to uživateli **maximálně ulehčit a vyhnout se známým chybám**:

    - [20 nejhorších chyb formulářů na webu](/chyby-formularu)

### Staré prohlížeče

Nakonec je výhoda, že jednoduchý mobilní design může posloužit i jako **dostatečně dobrá** varianta pro staré prohlížeče, pro které by mohlo být složitější ladit komplikovanější podobu webu.

## Proč mobile first nepoužívat

Hlavní úskalí tvorby **nejprve pro mobily** je v tom, že to může webového tvůrce svádět k **ošizení webu pro desktop**, který ale může být důležitější než mobilní web.

Uživatelé různých zařízení mají **různé potřeby** a mobily, tablety i desktopy **používají různým způsobem**.

Zatímco **desktop** používá návštěvník zpravidla v klidu a delší souvislou dobu, **mobil** je zase častěji používán mnohokrát během dne na krátký okamžik a uživatel se na to moc nesoustředí.

    Liší se i **druh informací/úkonů**, které člověk na mobilu a desktopu vyžaduje.

    Zcela zásadní rozdíl je i ve **velikosti obrazovky** nebo **způsobu ovládání** (prst vs. myš + klávesnice).

Tedy:

  Pro různé platformy je vhodné jiné řešení uživatelského rozhraní.

### Podíl mobilů oproti desktopům

I přesto, že přístupy z mobilních zařízení globálně **rostou**, většinou není zařízení s malou obrazovkou nejvíce zastoupeným typem.

V ČR podle [StatCounteru](http://gs.statcounter.com/) globálně v roce 2015 **desktop jasně dominuje**. Mobily + tablety nemají dohromady ani **20 %**.

Jsou pochopitelně i weby a odvětví, kde je **podíl mobilních zařízení** mnohem vyšší, třeba i vyšší než desktopů.

Stejně tak nejsou výjimkou ani weby, kde **návštěvy z desktopu** představují **90 % všech návštěv**.

Takto vypadaly statistiky tohoto webu (duben 2015):

Na základě podobných čísel se potom zdá, že varianta pro mobily je oproti té desktopové **celkem nevýznamná**. A nabízí se otázka:

  Proč dělat web prvně pro 10 % návštěvníků z mobilu místo 90 % z desktopu?

Používat techniku *mobile first*, tak může být ve skutečnosti výhodné spíš pro **webového vývojáře**, který si ulehčí práci, než pro návštěvníky.

Samozřejmě to neplatí universálně a rozhodně je možné vytvořit lepší desktopový web technikou mobile-first (díky držení se postupů, co jsou výhodné i na desktopu), než by vznikl při tvorbě nejprve pro desktop. A naopak.

V ideálním případě by **maximální péči** měly dostat všechny varianty webu pro všechna zařízení.

Bohužel ideální případ v reálném světě nastat nemůže, protože zdroje jsou omezené a je **nutné stanovit priority**. Potom je tedy často lepší, když se trochu *odflákne* raději mobilní web než ten pro desktop.

### Podíl mobilů roste

  Trend podílu mobilů je výrazně rostoucí a weby se dělají na několik let dopředu.

Je pravda, že **vypiplaný mobilní web** na úkor desktopového může za několik let, pokud podíl mobilů překoná desktopy, ocenit hromada návštěvníků.

Při počítání je ale nutné zohlednit i dobu, než ke zlomovému okamžiku dojde, kdy naopak desktopová většina má kvůli plýtvání zdrojů na mobily horší zážitek.

Většina současných webů (psáno v roce 2015) tak případnou **nadvládu mobilních zařízení** nejspíš nezažije po takovou dobu, aby dnešní upřednostnění mobilů dávalo smysl.

## Mobile only

Kromě *mobile first* existuje ještě jeden přístup – **mobile only**. Tedy vytvořit stránku **pouze pro mobilní zařízení** s malou obrazovkou.

To je pro tvůrce webu vůbec nejsnazší varianta, protože pro mobil navržený web se bude zpravidla rovnou rozumně zobrazovat i na **desktopu**.

Vytvářet web „pouze pro mobily“ se hodí ve specifických případech:

Hlavně v situaci, kdy stačí mít web v **jednom sloupci**, protože více sloupců obsahu se na mobil zpravidla nevejde.

Pro rozumné zobrazení na desktopu potom stačí pouze **omezit maximální šířku**, aby text neměl příliš dlouhé řádky.

Mít stránku *mobile-only* není ani problém pro [Google](/google):

    - [Google: Mobile Only Sites Are Fine, You Don't Need A Desktop Site.](https://www.seroundtable.com/google-mobile-only-site-20757.html)

## Odkazy jinam

  - Martin Michálek: [Mobile First v CSS](http://kratce.vzhurudolu.cz/post/42187934506/mobile-first-css)

  - Deep Design: [Why is it so Easy to Get &quot;Mobile First&quot; Wrong?](http://deep.design/mobile-first/)