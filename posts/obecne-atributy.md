---
title: "Obecné HTML atributy"
headline: "Globální HTML atributy"
description: "Obecné atributy jdou používat u všech HTML značek. Zde je jejich kompletní seznam."
date: "2015-07-08"
last_modification: "2015-07-14"
status: 1
tags: ["HTML", "HTML atributy"]
---

Různé značky ([seznam všech HTML značek](/vsechny-html-znacky)) mají své specifické atributy. Kromě toho existuje řada atributů, které jde použít u úplně všech značek – nazývají se jako **globální** nebo **obecné atributy**.

Dle specifikace tyto obecné atributy mají fungovat i u elementů, které prohlížeč nezná.

## Popisek `title`

Atribut `title` byl dlouhá léta populární způsob, jak přidat k nějakému prvku stránky **doplňující vysvětlení**, které se objevilo **až po najetí myší**.

  Tlačítko

V podstatě k zániku tento atribut nejspíš odsoudila **dotyková zařízení**, kde obsah popisku zpravidla nejde zobrazit.

Teoreticky může na dotykových zařízeních fungovat **vlastní titulek** zobrazovaný při `:hover`u – ten jde vyvolat delším podržením prstu. Ale nejspíš to **moc lidí nezná**.

Různými způsoby stylování `title` se zabývají následující články:

    - [Vlastní styl bubliny `title`](/atribut-title) – řešení v CSS

    - [Popisek obrázku po najetí myší](/tooltip)

    - [JS tooltip](/js-tooltip) – umístění popisku JavaScriptem

## Třída `class`

Třídy se hodí pro **aplikování CSS** předpisů na HTML kód. Do jednoho atributu `class` jde uvést případně více tříd oddělených mezerou.

```
&lt;div **class**="prvni druha treti">
  Obsah
&lt;/div>
```

Přiřazení CSS k takovému kódu vypadá třeba takto:

```
.prvni {
  color: red;
}
```

## Identifikátor `id`

Atribut `id` slouží pro vytvoření **jedinečného identifikátoru elementu**. Na stránce by měla být každá hodnota atributu `id` **pouze jednou**.

```
&lt;div id="nazev">
  Obsah
&lt;/div>
```

Nastavovat `id` se hodí v následujících případech:

    **Odkaz na kotvu** – na `id` je možné přímo odkázat uvedením jeho názvu za mřížku do adresy.

    ```
&lt;a href="**#nazev**">Odkaz na kotvu&lt;/a>
```

    **Propojení elementů** – například popisku [`&lt;label>`](/label-for) s příslušným políčkem díky atributu `for`.

    ```
&lt;label for="**policko**">Popis&lt;/label>
&lt;input id="**policko**">
```

    Podobně se propojují [`aria-*` atributy](/aria), připojuje [`&lt;datalist>`](/datalist), kontextové menu sestavené z položek [`&lt;menuitem>`](/menuitem) a podobně.

    **Zaměření pomocí JS** – dlouhou dobu neexistovala možnost, jak získat element v JavaScriptu pomocí [CSS selektorů](/css-selektory).

    ID se tak hodilo kvůli metodě [`getElementById`](/getelement#id). Od **IE 8** jde využívat [`querySelector`](/queryselector), takže toto využití se už trochu ztrácí.

    Kromě toho každé použití `id` vytváří v JavaScriptu **globální proměnnou stejného názvu**. Dostat se k HTML kódu výše uvedeného `&lt;div>`u s `id="nazev"` tak jde následovně:

    ```
nazev.innerHTML
```

    Používat globální proměnné ale nebývá dobrý nápad.

    **Zaměření prvku v CSS** – podle `id` jde připojit k elementu styl:

    ```
#nazev {
  color: red
}
```

    Používání identifikátorů v CSS není moc šikovné, protože zbytečně **zvyšují sílu selektorů**. Tu je dobré udržovat co nejnižší. Osobně používám pouze třídy.

        [ID, nebo CLASS?](/id-class) – úvaha o používání tříd míst identifikátorů v CSS

## Atribut `style`

Jeden ze způsobů, jak aplikovat na HTML **kaskádové styly**, je zápis přímo do atributu `style`.

```
&lt;p **style**="color: red">
  Odstavec bude červený
&lt;/p>

```

Nazývá se to spojením *inline styl* a jedná se spíš o **nouzový způsob, který není moc dobré používat**.

Proč?

    Pokud se styly do atributu `style` zapisují opakovaně, je zpravidla složitější **hromadně provádět změny**.

    Elegantnější bývá daný styl **pojmenovat třídou** a umístit do CSS deklarací (ať už do externího souboru nebo do značky `&lt;style>` v hlavičce).

    Vyčlenění stylů z atributu style **zpřehlední HTML kód** a při opakovaném používání třídy místo opakovaných deklarací **sníží datovou velikost**. V případě použití externího souboru se mohou CSS pravidla cacheovat.

    Řádkový styl má téměř nejvyšší prioritu/sílu. Má-li se přepsat z externího CSS / obsahu značky `&lt;style>`, je potřeba uvést `!important` za každou deklarací.

    CSS v atributu `style` je problematické s ohledem na **rychlost vykreslování stránky**, protože se styly mění během stahování HTML kódu, což vynucuje překreslování.

        [Jak funguje vykreslování stránky](/vykreslovani#prubeh)

## Jazyk `lang`

Atribut `lang` určuje, jakým jazykem je obsah daného elementu. Nejčastěji se asi používá u elementu `&lt;html>` pro určení jazyku celé stránky. Je ale možné i následně vnořený element přepnout do jiného jazyka.

```
&lt;html **lang**="cs">
  &lt;p>
    Celý obsah stránky je česky,
    až na slovo &lt;span *lang="en"*>page&lt;/span>
  &lt;/p>
```

Použití `lang`u se může hodit:

  - pro výběr slovníku kontroly pravopisu,

  - robotům pro detekci jazyka (i když stejně spíš detekují jazyk podle obsahu),

  - pro hlasové čtečky

Podrobněji se atributu `lang` věnuje samostatná stránka:

    - [HTML atribut `lang`](/lang)

## Kontrola pravopisu `spellcheck`

Dnešní prohlížeče obsahují **kontrolu pravopisu**; ta standardně podtrhává neznámá slova ve formulářových polích a elementech s `contenteditable`.

Mohou nastat případy, kdy je kontrola nežádoucí a má smysl kontrolu vypnout pomocí `spellcheck="false"`?

  Kontrola parvopisu je vypnutá
  Kontrola parvopisu je zapnutá

  Pole je pouze ke čtneí

Možná v případě, že je pole určené pouze ke čtení, ale nemá nastaveno atribut [`readonly`](/input#readonly), které kontrolu rovněž potlačí. Třeba při [označování kódu ke zkopírování](/oznaceni-textu).

Nebo v případě, že by se kontrola nějak zajišťovala vlastním způsobem.

Rozhodně je dobré kontrolu vypínat jen v **odůvodněných případech**. Návštěvník si ji může vypnout sám, ale v případě, že je zablokována atributem `spellcheck`, už nemusí jít zapnout.

## Překlad `translate`

Zřídka využitelný atribut. Slouží jako pomůcka pro **automatické překladače webových stránek** (například [translate.google.com](http://translate.google.com)), aby obsah elementu s `translate="no"` nepřekládaly.

Hodí se tedy pro zakázání překladu **regionálních pojmů**.

Výchozí chování je překládat všechno. Skutečně to funguje, při použití `translate="no"` bude *prase* nepřeložené:

[Kód ukázky](http://kod.djpw.cz/scob)

## `tabindex` – ovládání klávesou Tab

Standardně klávesa Tab dokáže na stránce zaměřovat odkazy a políčka [formulářů](/formulare).

Atributem `tabindex` jde:

  - **Měnit pořadí** procházení. Výchozí chování je dle pořadí položek v HTML kódu.

  - Umožnit **zaměřit další elementy** – třeba neutrální `&lt;span>`.

Podrobněji se `tabindex`u věnuje samostatný článek:

    - [Tabindex](/tabindex) – uspořádání položek pro procházení klávesnicí

## Mikrodata `item*`

Pro lepší strojové zpracovávání kódu existují tzv. **mikrodata**, speciální atributy začínající na `item`, jedná se o:

`itemid`, `itemprop`, `itemref`, `itemscope` a `itemtype`

    - HTML specifikace: [Microdata](https://html.spec.whatwg.org/multipage/microdata.html#microdata)

## Klávesová zkratka `accesskey`

Atribut `accesskey` (dvě c a dvě s) je jednoduchý způsob, jak zprovoznit na stránce **klávesové zkratky**.

Když se `accesskey` přidá odkazu nebo tlačítku, jeho akce se po klávesové zkratce vykoná. Kromě toho jde atributem `accesskey` také aktivovat textové pole [`&lt;input>`](/input).

Ve Windows se akce vyvolá klávesou levý Alt + znak nastavená do atributu.

```
&lt;a href="http://jecas.cz" **accesskey**="j">
  Je čas
&lt;/a>
```

Pro přechod na odkaz výše by mohlo fungovat Levý Alt + J.

  Je čas

Používání klávesových zkratek s atributem `accesskey` **není moc spolehlivé**, může být totiž snadno přebito **výchozí akcí prohlížeče**.

Spolehlivé ovládání klávesnicí je třeba udělat JavaScriptem:

    - [Ovládání webu klávesami v JavaScriptu](/klavesy) – postup, jak odchytávat stisknuté klávesy a vázat na ně akce

## Upravitelný obsah `contenteditable`

Pro možnost vytvořit pomocí HTML + JavaScriptu pokročilejší editor pro psaní a úpravy obsahu, než je [`&lt;textarea>`](/textarea), existuje atribut `contenteditable`.

V editovacím režimu i prohlížeče většinou podporují základní klávesové zkratky – třeba Ctrl + B by mělo označený text učinit **tučným**.

  Obsah tohoto odstavce jde přepisovat

Pomocí `contenteditable` se vytváří primitivnější [WYSIWYG editory](/wysiwyg). Pokročilé editory potom fungují tak, že přímo odchytávají stisknuté klávesy a podle toho *kreslí* výsledek.

Pro **uložení úprav** z `contenteditable` elementu je nutné jeho obsah (JS vlastnost `innerHTML`) odeslat ke zpracování na server.

## Směr textu `dir`

Atribut `dir` slouží k určení, jestli se obsah webu **píše zprava doleva** (`rtl`) nebo **zleva doprava** (`ltr`).

Jde nahradit CSS vlastností `direction`.

  النص من اليمين إلى اليسار.

Změna směru textu se hodí i v jiných případech, než když je obsah stránky arabsky.

Jde tak například prohodit pořadí sloupců v tabulce:

      První
      Druhý

      1
      2

Celkem elegantně to řeší například [šachovnicový výpis položek](/sachovnicovy-vypis).

## Atribut `hidden`

HTML atribut `hidden` začal fungovat až v [**IE 11**](/ie11). Obsah označený atributem `hidden`, jak název napovídá, není viditelný.

```
&lt;div **hidden**>
  Skrytý obsah
&lt;/div>
```

Patří do něj obsah, který momentálně **není relevantní**. Použití se tedy nabízí hlavně u **JS aplikací**, protože jinak by takový obsah na stránce nemusel být vůbec.

**Důležitá věc**: Atribut `hidden` **neslouží k vytvoření rozklikávání obsahu nebo přepínání záložek**. V takovém případě je skrytí pouze visuální a pro hlasové čtečky nebo roboty vyhledávačů je skrytý obsah relevantní.

Obsah elementu s `hidden` by měl být kompletně ignorován.

    - [HTML atribut `hidden`](/hidden) – informace a příklady

## Kontextová nabídka `contextmenu`

Pomocí značek `&lt;menu>` a `&lt;menuitem>` jde vytvořit vlastní kontextovou nabídku, která se typicky zobrazuje po **kliknutí pravým tlačítkem**.

Tato vytvořená nabídka se následně připojuje k elementu právě atributem `contextmenu`.

    - [Kontextová nabídka `&lt;menuitem>`](/menuitem) – samostatný článek o kontextovém menu

## Data atributy

Atributy `data-*` slouží k ukládání informací do HTML kódu / [DOMu](/dom). To se zpravidla hodí pro různé manipulace JavaScriptem, kdy jde do těchto atributů **nastavit počáteční hodnoty** nebo **ukládat stav**.

Často se `data-*` atributy používají pro konfiguraci HTML elementu, se kterým potom JS pracuje.

Bude-li existovat kód:

```
&lt;div class="zpravy" **data-pocet**="5">
&lt;/div>
```

Stačí aby si následně:

  - JavaScript našel element s třídou `zpravy`, 

  - přečetl hodnotu `data-pocet` – pomocí `getAttribute("data-pocet")`,

  - vložil 5 zpráv.

Podobným způsobem používají `data-*` atribut například sociální sítě pro vkládání svých [tlačítek pro sdílení](/sdileci-tlacitka).

## ARIA atributy

Slouží pro zlepšení přístupnosti webových stránek. Zápis je `aria-*`. Těcho atributů existuje celkem 35. Více v článku:

    - [ARIA atributy](/aria) – sémantické vyznačení informací pro postižené uživatele

## Drag &amp; drop

Pro přesouvání elementu různě po stránce existují dva pomocné atributy:

### `draggable`

Přidání `draggable="true"` znamená, že je element **přesouvatelný**.

  Přesouvatelný odstavec

  Nepřesouvatelný

Po **chycení myší** a tažení se průhledná kopie elementu pohybuje kolem kursoru.

### `dropzone`

Atribut `dropzone` se přidává elementu, kam je možné `draggable` elementy přesouvat.

Na základě nastavení `dropzone` může prohlížeč například **změnou kursoru** signalisovat, že se bude přesouvaný obsah kopírovat (`dropzone="copy"`), přesouvat (`dropzone="move"`) nebo se vytvoří odkaz (`dropzone="link"`).

  Kopírovat

  Přesunout

  Odkaz

Tyto atributy **samy o sobě nezajišťují** funkční drag&amp;drop. Pouze mohou jeho tvorbu lehce zjednodušit. Samotný přesun elementů se musí doskriptovat.

    - [Drag and drop události](/udalosti-mysi#drag-drop) – hotové řešení přesouvání elementů

## JavaScriptové události

Ke každému elementu jde přidat libovolný atribut sloužící pro obsluhu události JavaScriptem.

```
&lt;span **onclick**="// JS akce">
  Kliknout
&lt;/span>
```

Řada událostí se **projeví pouze u určitých elementů**, to ale na teoretické možnosti nic nemění.

**Seznam všech 63 JS atributů** je následující: `onabort`, `onautocomplete`, `onautocompleteerror`, `onblur`, `oncancel`, `oncanplay`, `oncanplaythrough`, `onchange`, `onclick`, `onclose`, `oncontextmenu`, `oncuechange`, `ondblclick`, `ondrag`, `ondragend`, `ondragenter`, `ondragexit`, `ondragleave`, `ondragover`, `ondragstart`, `ondrop`, `ondurationchange`, `onemptied`, `onended`, `onerror`, `onfocus`, `oninput`, `oninvalid`, `onkeydown`, `onkeypress`, `onkeyup`, `onload`, `onloadeddata`, `onloadedmetadata`, `onloadstart`, `onmousedown`, `onmouseenter`, `onmouseleave`, `onmousemove`, `onmouseout`, `onmouseover`, `onmouseup`, `onmousewheel`, `onpause`, `onplay`, `onplaying`, `onprogress`, `onratechange`, `onreset`, `onresize`, `onscroll`, `onseeked`, `onseeking`, `onselect`, `onshow`, `onsort`, `onstalled`, `onsubmit`, `onsuspend`, `ontimeupdate`, `ontoggle`, `onvolumechange`, `onwaiting`

## Odkazy jinam

  - MDN: [Global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)

  - Jak psát web: [Obecné atributy](http://www.jakpsatweb.cz/html/obecne-atributy.html) (lehce zastaralé)