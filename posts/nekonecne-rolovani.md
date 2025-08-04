---
title: "Nekonečné rolování"
headline: "Nekonečné scrollování"
description: "Je lepší nekonečné rolování, klasické stránkování nebo tlačítko „Zobrazit další“?"
date: "2014-11-05"
last_modification: "2016-03-17"
status: 1
tags: ["Rady a nápady", "Responsivní design", "Scrollování"]
---

Nekonečné rolování (v angličtině *infinite scroll* či *endless scroll*) je postup zobrazování obsahu webu, kdy se **další obsah sám zobrazuje** v závislosti na místě, kam návštěvník **odroloval**.

Pro získání dalšího obsahu tak návštěvník nemusí nikam jezdi myší a klikat, ale **stačí jen točit kolečkem**, popř. posouvat prstem (na dotykových zařízeních).

Nekonečné rolování tedy snižuje bariéru pro konsumaci dalšího obsahu. To může vést k delší době strávené na stránce a zobrazení více obsahu.

Technicky se další obsah stahuje [AJAXem](/ajax) v závislosti na odrolovaném obsahu.

## Stránkování

Z jednoho úhlu pohledu je *infinite scroll* v podstatě zvláštní typ klasického [**stránkování obsahu**](/strankovani), kdy se objeví třeba jen 10 položek a k dalším se je nutné proklikat přes odkazy na další stránky.

Po dočtení první strany se zobrazí stránkování a návštěvník:

  - neví, co bude na další straně,

  - bude muset kliknout na číslo strany / odkaz *Další*,

  - načtení další stránky bude trvat nějakou dobu.

To může **snižovat motivaci** na další stranu kliknout.

V případě **nekonečné stránky** stačí jen rolovat, což je asi nejsnazší ovládací úkon, který návštěvník na webu může dělat.

## Lazy loading

Z jiného pohledu je nekonečné scrollování v podstatě [lazy loading](/lazy-loading) obsahu.

Ze stránky se načte jen kousek, aby to netrvalo tak dlouho, a další obsah je potom **stahován průběžně**.

Při stahování dalších položek je dobré uměle natáhnout stránku (nebo zobrazit placeholdery obsahu) do doby, než se získají potřebná data. Řeší to problém v situaci, kdy člověk rychle roluje posuvníkem a dojel by na konec.

Například [Facebook](/facebook) při odrolování na konec zobrazuje maketu příspěvku:

## (Polo)automatické načítání

Běžně se je možné setkat s dvěma typy nekonečných stránek:

    Nový obsah se stahuje a zobrazuje automaticky, jak návštěvník roluje.

    Pod poslední položkou je odkaz typu „Načíst dalších 20 položek“, který nevede na novou stránku jako u klasického stránkování, ale AJAXem do stávající stránky vloží nový obsah.

Oba postupy jde kombinovat. Nějakou část obsahu načíst na základě rolování a potom vyžadovat kliknutí na tlačítko. Díky tomuto postupu může být na stránce dole pod obsahem patička, kam se dá odrolovat.

## Preload

Pro lepší uživatelský zážitek je lepší další položky **stahovat už v předstihu**, aby v momentě, kdy návštěvník doroluje na poslední, už byly připravené.

Část položek se při tomto postupu sice stáhne zbytečně, ale výsledný dojem bude mnohem lepší. Uživatel nebude muset po odrolování čekat.

Pokud by stahovaný HTML kód dalších položek obsahoval kromě textu i hodně externích obrázků, či jinak **datově náročný obsah**, je možné rozdělit přidávání nového obsahu do dvou kroků:

  - Stáhnout AJAXem kód dalších položek.
  
  - Přidat stažený obsah na stránku.

V prvním kroku se typicky stáhne minimum dat, takže není problém si další položky připravit už dřív. Samotné vložení nových položek potom může klidně proběhnout až v momentě, kdy je návštěvník na konci. To ale bude bleskurychlé.

## Výhody a nevýhody

    Nekonečné rolování vede k tomu, že lidé mají tendenci spíš **proletět stovky položek**, aniž by je pořádně prozkoumali.

    Klasické stránkování tak zajistí vyšší pozornost položkám na první stránce. V případě, že je obsah řazený dle relevance, nekonečné rolování se tak nezdá být moc výhodné (například pro výsledky hledání) – je užitečné, aby si člověk vybral z nejrelevantnějšího obsahu na začátku, než aby jen proletěl stovky položek.

    U **nízké relevance** je lepší zobrazit položek méně, aby si je člověk pořádně prohlédl. Když existuje hodně relevantních položek, tak klidně víc.

    Na mobilu znamená nekonečné rolování 2× víc načtených položek než při stránkování. Na druhou stranu zabraňuje možnosti dostat se na patičku (kde mohou lidé hledat důležité věci).

    Klasické stránkování evokuje nutnost znovu načíst stránku – to lidé na mobilu docela neradi dělají, protože to obvykle trvá dlouho.

    Rolování na mobilu může být zároveň:

      - moc pomalé (uživatel vše posouvá prstem)

      - příliš rychlé (při využití setrvačnosti)

    Událost rolování se zavolá až při jeho dokončení. Při rychlém prolétnutí stránky se tedy úplně plynulý zážitek nemusí dostavit.

## Problémy nekonečných stránek

Ačkoliv má nekonečné načítání obsahu své výhody, existují i problémy a risika.

### Příliš velká stránka

Pokud návštěvník vydrží rolovat hodně dlouho, vznikne mu **enormně dlouhá stránka** třeba se stovkami položek.

Taková stránka může být náročná na HW a fungovat pomalu.

V ideálním případě by přidání nových položek mělo **odstranit ty staré**. Bohužel to není úplně jednoduché s ohledem na to, že odebrání předchozích položek způsobí posun stránky směrem vzhůru.

Je tedy nutné odebrané položky nahradit placeholderem nebo po jejich odebrání skriptem odrolovat.

### Nemožnost návratu

Asi vůbec největší problém spočívá v **nemožnosti se vrátit zpět** po kliknutí na nekonečně načtenou položku.

Při použití funkce *Zpět* většina prohlížečů zobrazí stránku bez donačtených elementů.

Toto chování celkem logicky **snižuje ochotu klikat** na automaticky načtený obsah. Uživatel se bojí, aby mu obsah nezmizel, a tak se musí chovat hodně opatrně. Zvlášť při dotykovém ovládání na mobilu je velmi snadné něco omylem prokliknout.

Nemožnost návratu je částečně řešitelná. Zvlášť v případě, kdy nekonečné rolování vzniklo jako náhrada klasického stránkování. Po donačtení nových položek jde změnit URL:

    - [Změna URL JavaScriptem bez obnovení stránky](/zmena-url)

Při použití funkce *Zpět* se tak člověk alespoň vrátí na stránku, kde jsou záznamy, které naposled viděl.

V některých prohlížečích je to řešitelné pomocí History API:

  - Paul Lewis: [History API: Scroll Restoration](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration) – manuální obnovení odscrollování

### Patička

Bývá zvykem, že jistý typ informací (kontakt, podmínky užití, přepnutí [jazyku](/jazyk), [přepnutí na mobilní/desktopový web](/prepnout-mobilni-web) atd.) se nachází v patičce webu.

V případě nekonečné stránky je nemožné nebo obtížné se na patičku dostat.

Na desktopu to jde vyřešit patičkou v jiném sloupci, než je obsah. Dělá to tak třeba Facebook nebo [Twitter](/twitter):

Na malých obrazovkách mobilů už většinou prostor pro další sloupec není, takže je možné buď patičku úplně vypustit, nebo stránkování řešit tlačítkem „Zobrazit další“ a obsah automaticky po odrolování nenačítat.

## Nekonečné rolování a SEO

Pro vyhledávače je nekonečné načítání obsahu během rolování neviditelné. [Seznam](/seznam) prakticky vůbec nepodporuje [JavaScript](/js), takže ho načítání obsahu v závislosti na JS událostech úplně mine.

### Google

[Google](/google) sice JS podporuje dobře; Googlebot už ale při procházení stránek nevyvolává různé události typu rolování apod., takže se k skriptem načtenému obsahu nedostane.

Ideální je, když existují URL funkční bez JavaScriptu, na kterých je stránkovaný obsah. Na tyto stránky jde potom *odkázat* značkou `&lt;link>` v hlavičce stránky:

```
&lt;link rel="next" href="/items?page=6"/>
&lt;link rel="prev" href="/items?page=4"/>
```

Související čtení ohledně nekonečného rolování a Google:

  - Webmaster Central Blog: [Infinite scroll search-friendly recommendations](http://googlewebmastercentral.blogspot.cz/2014/02/infinite-scroll-search-friendly.html)

  - [Ukázkový příklad nekonečného rolování od Google](http://scrollsample.appspot.com/items)
  
  - John Mueller: [Nekonečné rolování](http://youtu.be/aKpQQY4S_7w?t=17m48s) (video)

### Seznam

Robot Seznamu se značkami `&lt;link>` nepracuje:

  S rel next a prev při kanonizaci nepracujeme.

  **Yuhů**, [O fulltextovém vyhledávání](http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-cast-2/)

Pro Seznam se tak nabízí umístit do obsahu odkaz na statickou podobu další stránky. Nebo mít speciální stránku s veškerým obsahem (to ale může být náročné u velkého množství položek).

Aby mělo smysl jednotlivé stránky indexovat, je potřeba, aby bylo stránkování dobře udělané – pokud možno se neměnil obsah na konkrétních stranách.

    - [Stránkování a SEO](/strankovani#seo) – jak správně udělat stránkování

## Závěr

Různé typy stránkování mají různé výhody. Nekonečné rolování vede k prohlédnutí velkého množství obsahu. Stránkování vyžadující kliknutí zase způsobí, že člověk každou z položek bude prohlížeč detailněji.

Obecně vzato není použitý typ stránkování zase tak významný oproti jiným věcem v použitelnosti.

Z článku ohledně stránkování u e-shopů na Smashing Magazine vzešlo doporučení zobrazovat 15–30 položek a potom „Load more…“ tlačítko.

## Odkazy jinam

  - Smashing Magazine: [Infinite Scrolling, Pagination Or “Load More” Buttons? Usability Findings In eCommerce](https://www.smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons/)

  - Sitepoint: [The UX of Infinite Scroll: The Good, the Bad, and the Maybe](http://www.sitepoint.com/ux-infinite-scrollgood-bad-maybe/)

 - UX Planet: [UX: Infinite Scrolling vs. Pagination](https://uxplanet.org/ux-infinite-scrolling-vs-pagination-1030d29376f1#.er9wclz0h)

  - UX Planet: [Pagination Best Practices](https://uxplanet.org/pagination-best-practices-76fbd3f5a78d#.ry7otugsv)