---
title: "Jakou nastavit velikost písma?"
headline: "Velikost písma"
description: "Jaká je vhodná velikost písma na webové stránce."
date: "2015-06-10"
last_modification: "2015-06-10"
status: 0
tags: []
---

Většina návštěvníků chodí na běžné webové stránky **číst text**. Je proto enormně důležité, aby text byl dobře čitelný. Správná **velikost písma** je jednou z podmínek dobře čitelného obsahu.

## Co ovlivňuje čitelnost?

  - **Velikost písma** – příliš malá písmena se návštěvníkům špatně čtou.

  - **Kontrast barev písma a pozadí** – příliš světlé písmo na světlém pozadí bude špatně čitelné.

  - **Použitý font** – některé sady znaků mohou být hůře čitelné.

  - **Výška řádku** – nízké  rozestupy mezi řádky čitelnosti nepomohou.

  - **Délka řádku** – u dlouhého textu o více řádcích se čtenář snadno ztratí.

## Vývoj velikosti písma

Pokud existuje nějaký společný prvek, jak odlišit weby z roku **2021** od webů z roku **2010**, je tím právě velikost písma.

Zatímco v dnešní době se je možné setkat s běžným textem o velikosti **16 pixelů** nebo i víc, před deseti lety se běžně používalo **12 pixelů** nebo i méně.

**Proč?**

Jako vysvětlení se nabízí vývoj **fysické velikosti** obrazovek (velikost uhlopříčky monitoru) a vývoj **rozlišení** (a dostupné [šířky okna prohlížeče](/sirka-stranky)). Během let se zmenšila běžná fysická velikost jednoho pixelu.

  Když obvyklý 15" monitor měl rozlišení na šířku 800 pixelů, běžný 22" monitor má rozlišení na šířku 1920 pixelů. Tj. uhlopříčka je větší jen o polovinu, ale rozlišení je více než dvojnásobné.

## Jak nastavit velikost?

```
element {
  font-size: **???**;
}
```

Pokud není nutné dodržovat na pixel přesné velikosti, které třeba navrhnul grafik, **není důvod velikost nastavovat**.

Výchozí styly prohlížečů mají velikosti písma důsledně vyřešené, takže je stačí případně jen korigovat.

**Výchozí velikost běžného písma** je napříč prohlížeči **16 pixelů**. To bez změny velikosti odpovídá rozměru `1em`/`1rem`.

Pokud se tedy `font-size` nikde nenastaví, běžný text bude mít 16 pixelů.

## Výchozí velikosti

[Živý test](http://kod.djpw.cz/phad) – test výchozích velikostí písma se **změřením ve vašem prohlížeči**

Z [HTML značek](/html-znacky) existují tyto, které jsou běžné používané a nějak ovlivňují velikost písma.

    `&lt;h1>` – velikost 32 px

    `&lt;h2>` – velikost 24 px

    `&lt;h3>` – velikost 18,72 px

    `&lt;h4>` – výchozí velikost 16 px

    `&lt;h5>` – velikost 13,28 px

    `&lt;h6>` – velikost 10,72 px

    `&lt;small>` – velikost 13,3 px

    `&lt;big>` – velikost 19,2 px

    `&lt;pre>`, `&lt;code>` – velikost 13 px

Na velikostech těchto jednotlivých elementů panuje shoda napříč prohlížeči – maximálně se liší o setiny pixelu.

### Monospace font

Zvláštní situace panuje u monospace písma. Jedná se o font, kde všechny znaky mají stejnou šířku – používá se zejména pro výpis zdrojových kódů, ale je v některých prohlížečích i výchozím písmem v [`&lt;textarea>`](/texxtarea):

```
.monospace {
  font-family: monospace;
  font-size: 1rem;
}
```

Jak bude velké písmo v `&lt;span class="monospace">`? Mohlo by se nabízet, že 16 px (1 rem = 16 px).

Realita bude ale většinou 13 px, což je v prohlížečích výchozí velikost pro `font-family: monospace`.

[Ukázka](http://kod.djpw.cz/vhad) – výchozí velikost 13 px

Má to ale jednoduché řešení, uvést kromě `monospace` ještě něco dalšího, klidně další `monospace` a velikost by měla být 16 px:

[Živá ukázka](http://kod.djpw.cz/uhad)

Případně rovnou nastavit nějaká hezčí písma dostupná v operačních systémech pro zdrojové kódy. Zde používám toto:

```
font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
```

Proč se tak děje? Předpokládám, že je to dané historicky kvůli zpětné kompatibilitě.

### Velikost ve formulářích

Ve [formulářových prvcích](/formulare), např. značkách `&lt;input>`, `&lt;textarea>`, `&lt;select>` nebo `&lt;button>` existují rozdíly v chování napříč prohlížeči:

  - V **Chrome**, **Edge**, **Opeře** i **IE 11** je `font-size` 13,33 pixelů.

  - V **Safari** je `font-size` 11 pixelů.

  - Ve **Firefoxu** má `&lt;input>` a `&lt;button>` velikost 11 px a `&lt;textarea>` pro změnu 13 px (nejspíš kvůli monospace fontu).

Odlišnosti jsou i ve fontu písma – v **Safari** je vše bezpatkové, v ostatních prohlížečích je patková `&lt;textarea>`.

Funguje to tak ve **Windows**, **macOS** i **iOS**.

V **iOS** je navíc vlastnost, kdy se do políčka s menším textem než 16 pixelů zoomuje:

    - [Automatické zoomování inputů na iOS](/ios-zoom-inputu)

Formuláře jsou tak nejspíš místo, kde už je vhodné zasáhnout a pro jednotný vzhled netrpící zoomováním v **iOS** sjednotit velikosti na výchozích 16 px.

Dále je dobré nastavit/sjednotit `font-family`, protože:

    Výchozí písmo se řídí kombinací systému a prohlížeče.

    Font se u formulářových prvků nezdědí ze společného rodiče stránky (např. značka `&lt;body>`)

    Výchozí `font-family: monospace` pro `&lt;textarea>` způsobuje menší velikost písma.

**Kompletní sjednocující kód** pro nastavení velikosti písma na webu může vypadat následovně – velikost a font se podědí po rodiči – v tomto případě dle výchozího stylu z prohlížeče pro značku `&lt;html>`:

```
input,
textarea,
select,
button {
  font-size: inherit;
  font-family: inherit;
}
```

[Živá ukázka](http://kod.djpw.cz/xhad)

Případně dává smysl nastavit specifický `font-family`, pokud má být u formulářových prvků jiný.

Jeden problém ale nastává v **Safari** v **macOS**, kde nejde u `&lt;select>`u změnit velikost (v mobilním **iOS** to jde):

Řešení je vypnout [stylování `&lt;select>`u](/stylovani-selectu) přes `-webkit-appearance: none`, nicméně tím vzhled značně degraduje, tak je otázka, jestli se s tím nesmířit.

## Změna velikosti

U složitějších webů a webových aplikací si ale člověk s výchozí velikostí písma nejspíš nevystačí.

Z různých důvodů dává smysl písmo z výchozích 16 px zvětšovat i zmenšovat.

    **Zvětšení písma** se hodí zejména pro nadpisy, důležité odkazy v navigaci nebo pro delší souvislý text.

    Zejména u textových stránek s jednodušším layoutem, jako je třeba článek na blogu, se hodí používat větší písmo, protože se lépe čte.

    **Zmenšení písma** je vhodné pro méně důležité věci na stránce – třeba pro *poznámky pod čarou*.

    Dále u webových aplikací a zejména u administrací s velkými tabulkami bývá často písmo zmenšováno, aby se na obrazovku vešlo hodně informací. 

## Jaké jednotky použít

Velikost písma jde v CSS nastavovat hromadou způsobů a všechny trpí nějakými problémy:

### Pixely

```
p {font-size: 18 px}
```

Na první pohled elegantní řešení, jak nastavit přesnou velikost.

Používat `px` jednotku bylo už před lety značně nepopulární, protože nešla v **Internet Exploreru** zvětšovat.

To už dnes to takový problém není, protože prohlížeče mají pro zvětšení i funkci zoom.

Problém ale nastává, pokud by uživatel chtěl místo zoomu jen zvětšit text v nastavení prohlížeče. Potom se pixely nezvětší.

[Živá ukázka](http://kod.djpw.cz/aiad) – při změně velikosti písma by měl první text zůstat stále 32 px velký

### Procenta a `em` jednotky

Na rozdíl od pixelů jdou spolehlivě zvětšovat.

Pokud výchozí velikost písma neodpovídá představě, jde zvětšit/zmenšit písmo následovně:

```
.vetsi {
  font-size: 120%;
  // nebo
  *font-size: 1.2em*;
}
.mensi {
  font-size: 80%;
  // nebo
  *font-size: 0.8em*;
}
```

Zápisy v procentech a `em` jsou ekvivalentní.

Takové písmo bude o 20 % větší nebo menší než velikost nadřazeného elementu. Při výchozích 16 pixelech tak bude `.vetsi` odpovídat `21px` a `.mensi` zase `13px`.

Další relativní jednotky jako třeba `ex` a `ch` se chovají velmi podobně. 

První nevýhoda je, že pokud existuje požadavek typu *nastavit písmo na 15 px*, je potřeba provést přepočet. A zjistit, že 15 px odpovídá číslu `0.9375em`.

To v dnešní době **díky CSS preprocesorům** není už takový problém. Lze snadno napsat funkci, která přepočet provede sama (příklad v SASSu):

```
@function em($px) {
    @return $px / 16 * 1em;
}

.font-size-15 {
    font-size: em(15);
}
```

V čistém CSS jde pro přepočet použít funkci [`calc`](/calc):

```
.font-size-15 {
    font-size: calc(15em / 16);
}
```

[Živá ukázka](http://kod.djpw.cz/ciad)

Další možnost v CSS bez preprocesoru je použít [nativní proměnné `var`](/var) a nadeklarovat si proměnné s potřebnými velikostmi pro pozdější pohodlné použití – [příklad](http://kod.djpw.cz/diad). (Nefunguje v **IE 11**.)

Protože dříve toto nebylo možné, používal **trik 62,5%**:

Pro **přehledné nastavování pixelových hodnot** procenty (nebo `em`) se používal postup, kdy se hodnota hlavního obalu nastaví na `x-small`, což odpovídá 10 pixelům nebo právě `62.5%` či `0.625em`, což je pořád totéž:

```
html {
  font-size: x-small;
  // nebo
  font-size: 62.5%;
  // nebo
  font-size: 0.625em;
}
```

Nyní pro nastavení textu o velikosti 15 pixelů stačí přehledné:

```
.text {
  font-size: 150%;
  // nebo
  font-size: 1.5em;
}
```

[Živá ukázka – 62,5 % trik](http://kod.djpw.cz/fiad)

Problém je, že se hodnoty **počítají relativně vůči rodiči**, takže v elementu `.text` už bude nastavování pomocí procent opět vyžadovat kalkulačku.

Při zanořování stále stejného elementu s velikostí `150%` se stane následující:

  .zanoreni {font-size: 150%; line-height: 1}

    Text
    
        Text
        
            Text
            
                Text

Jednotku `em` jde potom kromě pro velikosti písma používat i pro rozměry layoutu. Pokud se tato jednotka důsledně používá, je změna velikosti celého webu změnou jediné nadřazené hodnoty.

    - [Živá ukázka](http://kod.djpw.cz/okqb) – pohodlná změna velikosti `em` layoutu

Při úvaze nad `em` jednotkami pro `font-size` je třeba zvážit, jestli je ta relativní změna při zanořování žádoucí nebo ne.

### Jednotky `rem`

V roce 2021 už je tato jednotka dobře podporovaná napříč prohlížeči. Kdysi dávno se moc nepoužívala kvůli nepodpoře v **IE 8**.

Ve všech prohlížečích se **zvětšuje**/zmenšuje, když si uživatel změní velikost písma.

Jedná se o variantu jednotky `em`, která se ale neodvozuje od hodnot všech rodičovských elementů, ale jen od výchozí velikosti písma elementu `&lt;html>`.

Uvnitř značky `&lt;html>` je proto spoleh, že `1rem` bude ve výchozím stylu prohlížečů na všech místech odpovídat `16px`.

Jednotka `rem` nemá tu vlastnost jako `em`, že by měnila velikosti v závislosti na zanořování.

Pokud se tedy velikost písma pro `html` nastaví na `62.5%`, `0.625em` nebo `x-small`, bude všude na stránce platit, že `1rem` = `10px`.

Případně jde opět použít CSS preprocesor a velikost z pixelů na `rem` přepočítat jednoduchou funkcí:

```
@function rem($px) {
    @return $px / 16 * 1rem;
}

.font-size-15 {
    font-size: rem(15);
}
```

Jednotky `rem` potom fungují skoro stejně pohodlně jako pixely – jen s tím, že jde na jednom místě (značka `&lt;html>`) snadno zajistit **globální změnu velikosti** a písmo respektuje uživatelskou preferenci ohledně zvětšování/zmenšování písma v nastavení prohlížeče.

### Ostatní jednotky a způsoby

Existují ještě další způsoby, jak `font-size` natavit, nepřijdou mi ale v praxi potřebné.

Snad s výjimkou [viewport jednotek](/pismo-podle-sirky#viewport), které mohou velikost písma automaticky přizpůsobovat šířce okna.

## Jaké zvolit velikosti

Když už víme, jaké zvolit jednotky pro nastavení velikostí, zbývá rozhodnout, jaké velikosti nastavit.

Předně je potřeba si uvědomit, že různé fonty mohou být jinak velké. Takže v závislosti na použitém písmu se hodí případně velikost upravit.

U převážně **textové stránky** mi přijde **rozumná základní velikost výchozích 16 px**.

Delší text jako je článek může být klidně i trochu větší – třeba kolem 18 px až 20 px.

Méně podstatné věci potom třeba zmenšit na 14 px.

U **webových aplikací** a komplikovanějších stránek – třeba **e-shopů**, kde není prostoru nazbyt, se nabízí volit písmo a rozestupy menší.

Výchozí velikost může být třeba **13–15 px**.

### Uživatelská změna velikosti webu

U webových aplikací je poměrně běžné, že jde někde v nastavení zvolit, jak se moc má/nemá plýtvat místem.

Na [Twitteru](/twitter) je v nastavení přepínání velikosti textu:

Redesign [Facebooku](/facebook) z roku 2020 přinesl *kompaktní režim*, který šetří prostorem. Mění velikost písma a odsazení.

Podobné nastavení má i webový Outlook:

Často je to dobré řešení, protože lidé mají různé potřeby a zrakové schopnosti.

Změna velikosti je tak **pod kontrolou tvůrce webu**, který může nabídnout lepší zážitek než zoom (ten např. rozbíjí obrázky jejich zvětšováním nad skutečnou velikost) nebo změna velikosti písma v prohlížeči, o které každý neví.

Je to ale dost práce navíc a velikosti, odsazení a použité jednotky je potřeba s touto možností navrhovat.

## Best practice

Aktuální doporučení

    Nepoužívat jednotky `px` pro `font-size`, protože písmo v pixelech nemusí jít vždy zvětšovat.

    Použít `rem` jednotky, pokud je cílem mít na stránce přesně dané velikosti písma.

    Například web vychází z grafického návrhu nebo manuálu, kde jsou **přesné velikosti** v `px` pro jednotlivé prvky a je třeba to dodržet.

    Procenta nebo `em` se hodí hlavně v případech, kdy člověk sází velikosti písma *od oka*. Je mu jedno, kolik bude mít text pixelů, ale chce ho udělat trochu větší/menší.

    Pro formulářové prvky používat alespoň velikost odpovídající 16 pixelům, aby se do nich na **iPhonech** nemuselo zoomovat.

    Nezakazovat na mobilech zoomování. I když se může zdát velikost písma dostatečná, existují případy, kdy má uživatel třeba krátkodobě snížené schopnosti číst text (rozespalost, únava, nemoc, opilost, pohyb apod.), kdy se mu přiblížení hodí.

    Nastavit napříč webem **konsistentní velikosti** písma. Je nepraktické, když je nějaká část stránky nebo celá stránka tak malým písmem, že si návštěvník kvůli tomu písmo zvětší. Ale potom přijde na jinou stránku, když už to potřeba není, která bude zbytečně obrovská.

    Při **redesignu** a zvětšení písma do na dnešní poměry běžné velikosti si budou uživatelé stěžovat, že je písmo zbytečně obří a na stránku se nic nevejde.

## Uživatelé mění velikost písma

Mění si uživatelé velikost písma v prohlížeči? Můžete si to zkusit změřit na svém webu.

  - [Příklad měření velikost](http://kod.djpw.cz/laoc-) – zobrazí se aktuální velikost

Podle některých měření to mohou být jednotky procent návštěvníků.

    - [Pixels vs. Ems: Users DO Change Font Size](https://medium.com/@vamptvo/pixels-vs-ems-users-do-change-font-size-5cfb20831773) – statistiky měření uživatelů, co si změnili velikost písma (3.08 %)

## Odkazy jinam

  - [8-Point Grid: Typography On The Web](https://medium.freecodecamp.org/8-point-grid-typography-on-the-web-be5dc97db6bc)

  - Jak psát web: [Délkové jednotky v CSS](http://www.jakpsatweb.cz/css/css-jednotky.html)

  - Diskuse: [Jednotka em není šířka písmena M](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=19&amp;topic=138070)

  - [How we learned to leave default font-size alone and embrace the em](https://www.filamentgroup.com/lab/how-we-learned-to-leave-body-font-size-alone.html)

  - MDN: [`font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)

  -  CSS Wizardry: [Font sizing with rem could be avoided](http://csswizardry.com/2011/05/font-sizing-with-rem-could-be-avoided/)

  - Sitepoint: [Understanding and Using rem Units in CSS](http://www.sitepoint.com/understanding-and-using-rem-units-in-css/)

  - Cloud Four Blog: [A Responsive Guide to Type Sizing](http://blog.cloudfour.com/responsive-guide-to-type-sizing/)

  - CSS Tricks: [Use `rem` for Global Sizing; Use `em` for Local Sizing](https://css-tricks.com/rem-global-em-local/)

  - [REM vs EM – The Great Debate](http://zellwk.com/blog/rem-vs-em/)