---
title: "20 nejhorších chyb HTML formulářů"
headline: "20 největších chyb formulářů na webu"
description: "Jakým chybám se vyvarovat při tvorbě formulářů na webu."
date: "2014-06-23"
last_modification: "2014-06-24"
status: 1
tags: ["Formuláře", "Rady a nápady", "UX"]
---

Pro komunikaci ve směru **návštěvník → server** jsou formuláře jedním z nejdůležitějších prvků webu. Přesto aby člověk dobře udělaný formulář pohledal.

  .tldr > p, .tldr ul, .tldr ol, .tldr pre, .tldr blockquote {display: none}
  .tldr {counter-reset: seznam;}
  .tldr h2:before {
    counter-increment: seznam;
    content: counter(seznam) ". ";
  }

TLDR přepínač

## Políčka bez `&lt;label>`ů

   Souhlasím s podmínkami

Co je na výše uvedeném příkladu špatně? Při kliknutí na *Souhlasím s podmínkami* se [`checkbox`](/input#checkbox) nezaškrtne. Nezbývá než se trefovat do miniaturního zaškrtávacího políčka.

Přitom stačí jen použít značku [`&lt;label>`](/label-for).

Kromě `checkbox`u se tento problém týká i `&lt;input type=radio>`. U obyčejných **textových políček** to tak strašné není, ale pořád je vhodné popisek k políčku připojit, je-li to možné.

## Nesmyslné použití `&lt;select>`u

Dává následující příklad smysl?

  Souhlasíte?
  
    Ano
    Ne

Často je k vidění obdobné řešení. Značka [`&lt;select>`](/select) se přitom nejen [špatně styluje](/stylovani-selectu), ale pro výběr z malého množství položek je zbytečně otravná, musí se rozkliknout nabídku a až potom vybrat konkrétní položku.

Použít `&lt;select>` u výběru **z hodně položek** je rozumné – umožní v nabídce přeskakovat napsáním začátku nějaké položky (od **IE 10** to jde zajistit i u běžného políčka značkou [`datalist`em](/datalist)).

Pro málo možností ale postačí `checkbox` nebo `radio`.

## Popisky jako hodnota políčka

Umístit popisek tlačítka do [atributu `placeholder`](/placeholder) se na první pohled může zdát u formulářů, kde **není moc místa**, jako dobrý nápad. Proč tomu tak není?

  Přihlásit

V případě, že návštěvník klikne do políčka nebo do něj něco napíše, popisek zmizí. A už není možné se k němu dostat bez smazání obsahu.

Pokud skutečně není prostor ani pro miniaturní popisek, může posloužit ikona a třeba [popisek po najetí](/js-tooltip).

Jak řešit popisky políček detailněji rozebírá samostatný článek:

      - [Popisek formulářového pole](/popis-pole)

## Mazání políček

Ještě horší situace nastává u hloupých řešení, které při kliknutí odstraňují předvyplněnou hodnotu zadanou jako `value`. Typicky způsobem `onclick="this.value = ''"`. V případě, že se bude člověk chtít vrátit k již vyplněnému políčku, tak si ho **vymaže**.

  Odeslat

Lepší možnost je obsah políčka [označit](/placeholder#oznaceni).

## Přílišná kreativita

Při tvorbě formuláře je dobré dbát na to, aby výsledek **stále vypadal jako formulář**. Čím víc se vzhled a chování bude lišit od *standardu*, tím je větší šance, že návštěvník pořádně nepochopí, co má dělat.

## Polofunkční JavaScriptové atrapy

Jelikož [stylování formulářů](/vzhled-formularu) není úplně jednoduché, nabízí se používat JavaScriptové atrapy, které prvek poskládají z hromady `&lt;div>`ů. Na tom by nebylo přímo nic špatného, kdyby ale velká část těchto náhražek nepřinášela **značně nestandardní chování**.

## Nepohodlné ovládání klávesnicí

Zvlášť **pokročilejší uživatelé** mají ve zvyku procházet formulářová políčka klávesou Tab pro přesun na další prvek (případně Shift + Tab pro návrat zpět).

Správný formulář by tedy měl při Tabování přecházet mezi políčky v **rozumném pořadí**. Zároveň by měl počítat s tím, že ho uživatel může **vyplňovat ve vlastním pořadí**.

Výchozí chování pořadí jednotlivých políček respektuje umístění v HTML kódu a změnit jde atributem `tabindex`.

## Nemožnost odeslání Enterem

Některé formuláře odesílané bez znovunačtení stránky [AJAXem](/ajax) mají jejich tvůrci tendenci posílat při [události `onclick`](/udalosti-mysi#onclick) na nějakém tlačítku.

    Odeslat

To nemusí zafungovat, když návštěvník bude chtít poslat formulář klávesou Enter, když bude mít kursor v posledním políčku. Některé prohlížeče se ale snaží chovat chytře a na odesílacím tlačítku `onclick` vyvolat i při Enteru.

Řešení je používat událost `onsubmit` značky `&lt;form>`.

## Zbytečně obecné atributy `type`

Zvlášť uživatelé mobilních zařízení ocení speciální typy formulářových polí jako [`email`](/input#type-email), [`tel`](/input#type-tel) a podobně. Při kliknutí do políčka tak může prohlížeč nabídnout vhodnější podobu klávesnice. V případě typu [`date`](/input#type-date) potom třeba **kalendář pro zadání data**.

## Nejasná odezva

Člověk odešle formulář, něco se provede, a není mu pořádně jasné, co se vlastně stalo. Jestli odeslání **proběhlo úspěšně** či **skončilo chybou**.

Proto je vhodné po provedení akce dát **viditelnou zpětnou vazbu**.

    U **kontaktního formuláře** to může znamenat přesměrovat na stránku s hláškou „Děkujeme za zprávu“.

    Při **odeslání příspěvku/komentáře** na něj odrolovat a **zvýraznit** ho.

## Nejasné chybové hlášky

  E-mail má špatný formát.

Je dobrým zvykem místo **oznamování chyby** napsat, co má uživatel udělat, aby **chybu odstranil**. Tj. raději:

  Zadejte e-mail ve tvaru „jmeno@domena.cz“

## Vypisování hlášek po jedné

Kdo by to neznal. Po odeslání formuláře se objeví jediná hláška s chybou, člověk ji opraví, načež se mu po odeslání **objeví jiná** a tak dále. Zvlášť **nepříjemné** je toto chování spolu se **zapomínáním hodnot** jednotlivých políček.

Pro uživatele je přitom lepší všechny problémy vypsat najednou. Pro programátora by to nemělo být nijak obtížné.

Místo konstrukce typu:

```
if (empty($jmeno)) {
  $chyba = "Zadejte jméno.";
}
elseif (strlen($jmeno) &lt; 5) {
  $chyba = "Zadejte jméno o délce alespoň 5 znaků."
}
```

Stačí použít jednotlivé `if` konstrukce a chyby **přidávat do pole**. A jeho obsah potom najednou vypsat.

```
echo implode("&lt;br>", $chyby);
```

## Netolerance alternativního zápisu

Často programátoři formulářů důsledně lpí na **přesném tvaru** řetězce, co se do pole může zadat.

Asi základní věc je **oříznout bílé znaky** (v PHP funkce `trim`). Ty mohou snadno vzniknout při **kopírování obsahu** do formuláře.

Co třeba **zadávání URL**? Je nutné vyžadovat `http://` na začátku? Nemůže si to skript snadno *domyslet*?

Má smysl otravovat návštěvníky přesným tvarem **telefonního čísla**? Vyzobat z políčka jen čísla přece není nikterak obtížné.

## Příliš mnoho políček

Někdo se asi domnívá, že **více je lépe**. U formulářů a počtu jejich políček to ale moc **neplatí**. Dlouhý formulář může **odrazovat od vyplnění**.

Je proto dobré se zamyslet, zda by něco nešlo spojit.

  - Potřebujeme rozlišovat jméno uživatele na **jméno a příjmení**? Nestačilo by jedno políčko?

  - Potřebujeme mít adresu rozdělenou na **ulici, číslo, město, zemi a PSČ**? Nestačila by na to jedna `&lt;textarea>`?

  - Potřebujeme u **registračního formuláře** zadávat pohlaví, bydliště a *číslo bot*? Nestačil by e-mail a heslo?

## Zapomínání hodnot

Jedna z nejotravnějších věcí vůbec je, když formulář po neúspěšném odeslání **zapomene svůj obsah**. Stačí přitom jen otestovat, jestli se formulář odeslal, a v takovém případě vypsat hodnoty typu `$_POST["jmenoPole"]`. Ideálně s použitím funkce `htmlspecialchars($text, ENT_QUOTES)`, aby specifický text (třeba obsahující apostrof) nemohl narušit **řádné zobrazení formuláře**.

Pro delší formuláře se může hodit i ukládání do [lokálního úložiště](/zalohovani-formularu).

## Nečitelná CAPTCHA

Mezi větší zla patří i nešetrná [ochrana proti spamu](/spam). Přepisovat některé zdeformované texty je opravdu zážitek.

Je dobré zvážit, zda by nestačila nějaká **méně otravná ochrana** – třeba kontrolní otázka automaticky vyplňovaná JavaScriptem.

Obrázková CAPTCHA beztak není úplná výhra. Některé podoby umí vyluštit stroj lépe než člověk. Navíc je možné k řešení [zaplatit armádu Indů](http://www.root.cz/clanky/potrebujete-obejit-captcha-zaplatte-si-armadu-indu/). To v případě hádanky z českého prostředí tolik nehrozí.

## Nejasné formátování textu

Na webu, kde může návštěvník **napsat komentář** nebo **přispět do diskuse**, je vhodné:

  - Stručně popsat, jaké formátování je možné použít.

  - Nabídnout **funkci náhled** nebo možnost editace.

Osobně se přikládám k tomu **náhledu**. Popsat **formátování**, zmínit, co se stane, když se do formuláře zapíše **HTML značka** (zmizí / převede se na entity), nebo napsat, jestli systém zvládne třeba „[české uvozovky](/uvozovky#ceske)“ by zabralo hodně prostoru.

## Nekompatibilita se správcem hesel

Řada lidí používá pro ukládání přístupových údajů **správce hesel** (např. [LastPass](https://lastpass.com/)), je proto dobré, aby náš formulář takový správce dobře pochopil a byl tedy schopný registrační údaje uložit a potom je **použít pro přihlášení**.

Z tohoto důvodu je i vhodné, aby se přihlašovací formulář odesílal na **stejnou doménu**. Tímto problémem trpí například [Seznam.cz](http://seznam.cz), takže vyvolává v LastPassu **bezpečnostní upozornění**.

## Živá validace se „zelenou fajfkou“

Čím dál populárnění je tzv. **živá validace** formulářových políček AJAXem. To je na jednu stranu hezké, že formulář ihned napíše, že *zadané jméno je již obsazené* a podobně, na druhou stranu je ale potřeba zvážit, zda *zelená fajfka* nedá uživateli **falešný pocit**, že políčko vyplnil správně.

Skriptem odsouhlasený formát e-mailu totiž **nezajišťuje**, že se uživatel nepřeklepl, proto mi přijde lepší raději **jen upozorňovat na chyby**.

## Vícenásobné odeslání

To je většinou problém spíš majitele serveru, ale ani např. **autora komentáře** nemusí těšit, že se jeho příspěvek na stránce objeví vícekrát.

Řešení je přitom snadné. Po uložení příspěvku přesměrovat hlavičkou `Header`:

```
&lt;?php
header("Location: stranka.php");
```