---
title: "Odkaz v HTML"
headline: "HTML odkazy"
description: "Všechny informace a detaily o HTML odkazech, jejich atributech a stylování pomocí CSS."
date: "2015-07-02"
last_modification: "2015-08-27"
status: 1
tags: ["HTML", "HTML značky", "Odkazy"]
---

Odkaz je na webových stránkách klíčovým prvkem – slouží k **propojení dokumentů mezi sebou**. Návštěvník tak může v ideálním případě přecházet mezi všemi stránkami daného webu.

## Zápis odkazu

Pro vytvoření odkazu slouží značka `&lt;a>` (anglicky *anchor* = česky *kotva*, někdy se odkazu říká *link*), má povinnou počáteční i koncovou značku.

Cíl odkazu, kam se návštěvník dostane po kliknutí, se uvádí do atributu `href`:

```
&lt;a **href**="cilova-stranka.html">
  Text odkazu
&lt;/a>
```

Text uvnitř odkazu má ve výchozích stylech zpravidla modrou barvu a je podtržen (v CSS `[text-decoration: underline](/text-decoration#underline)`).

Podtržení je u odkazů dost **zažité**, proto je dobré:

  - Odkazy podtrhávat.

  - Nepodtrhávat text, který odkazem není.

      Odkaz na hlavní stranu

Mezi počáteční a koncovou značkou odkazu může být cokoliv.

    Text

    Obrázek

```
&lt;a href="cilova-stranka.html">
  &lt;img src="obrazek.png">
&lt;/a>
```

    Spousta další HTML značek. Do odkazu jdou obalit [nadpisy](/nadpisy), odstavce, seznamy nebo elementy `&lt;div>`. Teoreticky může být odkazem i celá stránka (obsah HTML značky `&lt;body>`) – existují ale výjimky, které v odkazu být nemohou, například stránka vložená do rámu `&lt;iframe>`.

  ```
&lt;a href="cilova-stranka.html">
  &lt;div class="v-odkaze">
    &lt;h1>Nadpis&lt;/h1>
    &lt;p>Text v odstavci&lt;/p>
  &lt;/div>
&lt;/a>
```

    Dříve tento způsob byl sice funkční, ale nebyl podle HTML specifikace **validní**. V **HTML 5** už [validní](/validita) je.

## Cíl odkazu `href`

Nemá-li značka `&lt;a>` atribut `href` pro určení cíle odkazu, chová se `&lt;a>` dost podobně jako neutrální značka `&lt;span>`.

Odlišný styl prohlížeče ve výchozím stavu aplikují jen na odkazy s `href`em.

Do obsahu atributu `href` jde potom zadávat různé věci:

    Relativní odkaz na stránku:

    ```
&lt;a href="stranka.html">Text odkazu&lt;/a>
```

    Absolutní odkaz na stránku (začíná protokolem – nejčastěji `http://` nebo [`https://`](/https), ale odkazovat jde i třeba na `ftp://`):

    ```
&lt;a href="**http://**example.com">Text odkazu&lt;/a>
```

    Odkaz na určité místo na stránce, tzv. kotvu:

    ```
&lt;a href="**#**kotva">Odkaz na kotvu&lt;/a>
```

    Skript v jazyce JavaScript:

    ```
&lt;a href="**javascript:**alert(1)">Spustit skript&lt;/a>
```

Další méně rozšířené věci vyžadují přítomnost **dalšího obslužného programu**, který dokáže cíl zpracovat:

    E-mailová adresa pro otevření mailového klienta:

    ```
&lt;a href="**mailto:**email@example.com">E-mail&lt;/a>
```

    Telefonní číslo pro snadné vytočení na mobilním telefonu:

    ```
&lt;a href="**tel:**123456789">Telefon&lt;/a>
```

    Otevření torrentu v příslušném programu:

    ```
&lt;a href="**magnet:**">Stáhnout&lt;/a>
```

    Bitcoinová adresa pro uskutečnění platby:

    ```
&lt;a href="**bitcoin:**adresa">Poslat BTC&lt;/a>
```

### Relativní, nebo absolutní?

Zda používat relativní nebo absolutní podobu **cíle odkazů** je značné dilema. Oba přístupny mají své výhody i nevýhody.

Při **ručním psaní HTML** je dost otravné psát všude doménu, navíc potom stránka nefunguje na lokálním počítači.

Nejlepší nejspíš je, když jsou odkazy absolutní a jejich vytváření automaticky zajišťuje **redakční systém** nebo obdobný program usnadňující tvorbu webu.

## Značka `&lt;a>` jako kotva

Kromě toho, že značka `&lt;a>` umožňuje někam odkázat má ještě jednu funkci:

Dá se použít pro označení místa, **kam se dá odkázat** odjinud. Tyto tzv. *kotvy* se používají pro označení konkrétního místa v dokumentu. Odkazy na *kotvy* se vyznačují tím, že za běžnou částí URL se nachází mřížka `#` a obsah identifikátoru.

Zastaralý (a podle HTML 5 specifikace překonaný) způsob vytváření kotev je pomocí atributu `name`:

```
&lt;a name="nazev-kotvy">&lt;/a>
```

Místo `name` by se měl používat atribut `id`, který funguje obdobně a jde použít universálně pro vytvoření kotvy i **z jiného elementu, než je odkaz**.

```
&lt;a **id**="nazev-kotvy">&lt;/a>
```

Identifikátor by měl začínat nějakým **písmenem anglické abecedy** (a–z bez diakritiky).

    - [Atributy `href`, `name` a `id` u odkazu](http://kod.djpw.cz/aaob)

### Kotva i odkaz zároveň

Značka `&lt;a>` může současně plnit funkci odkazu i kotvy.

```
&lt;a
  *href*="cilova-stranka.html"
  **id**="nazev-kotvy"
>
  Text odkazu/kotvy
&lt;/a>
```

### Automatická kotva `#top`

Zajímavá je vlastnost dobře rozšířená napříč prohlížeči, která umožňuje **odkázat na začátek stránky** bez vytváření jakékoliv kotvy.

Slouží k tomu identifikátor `top` – použije-li se jako cíl odkazu, prohlížeče po kliknutí odskočí na začátek stránky, i když žádný prvek s `id="top"` neexistuje.

    [Odkaz na začátek stránky](#top)

## Cíl odkazu `target`

Atributem `target` jde určit cíl, kde se má odkaz otevřít. Tento atribut prožíval zlaté časy v době, kdy se stránky běžně **tvořily pomocí rámů** a bylo potřeba určit, kde se má jaká stránka otevřít.

V době, kdy se rámy nepoužívají, se `target` využívá hlavně k **otevření odkazu do nového okna/záložky**.

    - [Otevírání nového okna](/nove-okno) – různé způsoby, jak otevřít obsah do nového okna

Slouží k tomu cíl `_blank`:

```
&lt;a href="http://example.com" **target**="*_blank*">
  Text odkazu
&lt;/a>
```

Všechny předdefinované hodnoty jsou:

    `_self` – výchozí hodnota, funguje stejně jako bez uvedení cíle    

    `_blank` – otevření do nového okna

    `_parent` – otevření do nejbližšího nadřazeného okna

    `_top` – otevření do nejvzdálenějšího nadřazeného okna

Pokud není stránka v rámu, chová se `_parent` i `_top` stejně jako `_self` nebo žádný `target`.

## Další atributy

Odkaz může mít ještě další spoustu atributů, které se ale tak často nepoužívají.

Kromě toho na něm pochopitelně fungují i [obecné atributy](/obecne-atributy) jako `id`, `title`, `class`, `lang` a podobně.

### Stažení souboru `download`

```
&lt;a href="adresa-souboru" **download="Název souboru"**>
  Odkaz
&lt;/a>
```

Přidáním atributu `download` jde novější prohlížeče **přemluvit ke stažení souboru** známého typu (třeba obrázku nebo HTML stránky) a zároveň nastavit název staženého souboru.

    - [Atribut `download`](/atribut-download) – popis atributu `download` a alternativ pro starší prohlížeče

### Atribut `media`

HTML atribut `media` u odkazu má fungovat podobně jako [`@media` pravidlo](/mobilni-web#media-queries) v CSS.

Slouží k nastavení podmínek, kdy bude odkaz viditelný.

```
&lt;a href="maly-obrazek.png" media="**max**-width: 480px">
  &lt;img src="maly-obrazek.png">
&lt;/a>
&lt;a href="velky-obrazek.png" media="**min**-width: 480px">
  &lt;img src="velky-obrazek.png">
&lt;/a>

```

    - [HTML atribut `media`](/html-media) – více informací o atributu, jeho podpoře v prohlížečích apod.

### Pingnutí atributem `ping`

Tento atribut umožňuje při kliknutí na odkaz odeslat neviditelný požadavek na jinou URL. To se může hodit k **měření chování uživatelů**.

```
&lt;a 
  href="http://jecas.cz"
  **ping**="zaznamenat.php?url=homepage"
>
  Odkaz
&lt;/a>
```

Více informací je v samostatném článku:

    - [Atribut `ping`](/html-ping)

### Atribut `rel`

Slouží k vyznačení **strojově čitelného vztahu** stránky vůči cíli odkazu. Používá se hlavně varianta s hodnotou `nofollow` (v českém překladu *nesledovat*).

```
&lt;a href="http://example.com" **rel="nofollow"**>
  Odkaz s nofollow
&lt;/a>
```

Atribut `rel="nofollow"` slouží hlavně jako **signál pro vyhledávače**, že nemají stránku sledovat.

Tvůrci webů atribut `nofollow` používají hlavně v případech, kdy není **100% kontrola nad obsahem** (diskusní fóra, komentáře) s cílem zřeknout se zodpovědnosti za takový odkaz. Vyhledávače totiž negativně posuzují, když stránka **odkazuje na nekvalitní weby**.

Také přítomnost `nofollow` může mírně snižovat motivaci lidí **spamovat odkazy**.

Jak se vyhledávače staví k `nofollow` je značně diskutabilní otázka. Tento atribut začala přidávat třeba i Wikipedie a je celkem nepravěpodobné, že by vyhledávače odepsaly všechny odkazy na související zdroje, co tam jsou.

Existují ještě **další hodnoty atributu** `rel`, třeba redakční systém [WordPress](/wordpress) používá některé hodnoty `rel` atributu ve svých šablonách.

Jelikož se většina hodnot atributu `rel` **běžným návštěvníkům neprojevují**, moc často se nepoužívají.

K vidění bývají následující hodnoty (atribut `rel` se může používat i u značky `&lt;link>` v hlavičce stránky):

  - `alternate` – alternativní podoba stránky (verse k tisku, překlad a podobně)

  - `author` – odkaz na autora

  - `bookmark` – trvalý odkaz na stránku pro uložení do záložek

  - `category` – odkaz na kategorii

  - `help` – odkaz na stránku s nápovědou

  - `license` – odkaz na stránku o autorských právech

  - `search` – odkaz na stránku s vyhledáváním

  - `tag` – odkaz na *tag*

  - `next`/`prev` – odkaz na další/předchozí stránku

  - [`noreferrer`](/noreferrer) – zruší předání informace o předešlé stránce

  - `prefetch` – cílová stránka se načte dopředu, Google tak [zrychluje načítání](/google-prefetch) stránek z výsledku hledání

Hodnoty `rel` je možné **kombinovat** – potom se oddělují mezerou.

```
&lt;a href="" rel="**category tag**">
  Odkaz
&lt;/a>
```

### Jazyk cíle `hreflang`

Dokáže informovat prohlížeč/robota o jazyku cíle odkazu.

```
&lt;a href="http://example.com" **hreflang="en"**>
  Odkaz
&lt;/a>
```

Používá ho třeba Wikipedie u odkazů pro přepínání jazyku:

Jinak se `hreflang` používá dost zřídka. Praktické využití může mít jako elegantnější způsob, jak si na stránce **odlišovat odkazy na zahraniční zdroje** místo používání běžných CSS tříd.

Takto by šlo jednoduše přidat k odkazům na anglicky psané stránky, že jsou *anglicky*:

```
a[hreflang=en]:after {
  content: " (anglicky)";
}
```

Ze **SEO pohledu** asi moc smysl nemá, protože vyhledávače si stejně musí určovat jazyk stránky na **základě zkoumání obsahu stránky**.

Při špatném použití je `hreflang` ignorován:

    - [Google: Incorrection hreflang Implementation Won't Hurt You](https://www.seroundtable.com/google-ignore-incorrect-hreflang-implemention-20692.html)

### Typ cíle `type`

Má sloužit k uvedení typu souboru, který se nachází v cíli odkazu (v atributu `href`).

```
&lt;a href="obrazek.jpg" **type="image/jpeg"**>
  Odkaz na JPG obrázek
&lt;/a>
```

Zřídka využívaný atribut. Pro prohlížeče je obsah `type` čistě informativní.

Využít `type` u odkazu by šlo k označení typu souboru bez používání CSS tříd – třeba přidáním malé ikonky (kvůli lomítku v atributu musí být typ uveden v uvozovkách nebo lomítko escapované – `\/`).

```
a[type="image/jpeg"] {
  /* styl odkazu na JPG */
}
```

V případech, kdy typ obsahu určuje jeho **přípona**, si ale jde vystačit i s [atributovým selektorem](/css-selektory#atributovy-koncici):

```
a[href$=".jpg"] {
  /* styl odkazu na JPG */
}
```

Jako typ se uvádí tzv. *Mime type*, což jsou věci jako `image/jpeg` pro JPG, `text/html` pro HTML stránku a podobně.

Seznam různých dalších hodnot.

    - Sitepoint: [MIME Types – Complete List](http://www.sitepoint.com/web-foundations/mime-types-complete-list/)

### Zastaralé atributy odkazu

Nakonec jsou ještě atributy, které jsou **zastaralé/překonané**.

  - `name` – vytvoření kotvy, jde nahradit atributem `id`

  - `charset` – určení kódování cíle

  - `coords`

  - `shape`

  - `rev` – opačné určení vztahu než je `rel`

## Stylování odkazů

Odkazy jsou ve výchozím CSS modré a podtržené – CSS vlastnosti `color: #0000CC` a `text-decoration: underline`.

Značka `&lt;a>` se zobrazuje jako řádková (`display: inline`). Pokud je proto nutné odkazu nastavit rozměry, je nutné přidat `display: block` nebo `display: inline-block`.

### Stavy odkazu

Odkaz má v CSS několik stavů, které odpovídají CSS selektorům:

  - `a:link` – nenavštívený odkaz, většinou se používá prosté `a {}`, protože jinak by se pravidla neaplikovala u již navštívených odkazů, což je většinou žádoucí

  - `a:visited` – [navštívený odkaz](/visited) (kvůli ochraně soukromí jde stylovat velmi omezeně)

  - `a:hover` – odkaz po najetí myší (na dotykových zařízeních se k němu jde dostat delším podtržením prstu nad odkazem)

  - `a:active` – odkaz po kliknutí myší před uvolněním tlačítka; aktivní odkazy bývají červené

  - `a:focus` – označený odkaz klávesou Tab, ve většině prohlížečů odkaz *dostane focus* po kliknutí (a následně mu zůstane). V  **IE 7** a starších fungoval jako `:focus` stav `:active`.

**Vyzkoušejte** si jednotlivé stavy na odkazu (vede na neexistující kotvu, takže se není nutné bát kliknout):

    [Odkaz](#nikam)

[Samostatná ukázka](http://kod.djpw.cz/vipb)

### Testování stavů

Pro snazší **testování zobrazení** jednotlivých stavů slouží volba *Force element state* ve [vývojářských nástrojích](/vyvojarske-nastroje) **Chrome**. Je dostupná po kliknutím pravým tlačítkem na HTML element.

### Plocha odkazů

Častou chybou při stylování odkazů je jejich **nedostatečná velikost** nebo **chybějící aktivní plocha** tam, kde by ji člověk čekal. Zabývá se tím samostatný článek:

    - [Plocha odkazu](/plocha-odkazu) – proč a jak vytvářet klikací plochu kolem odkazu

### Neviditelné odkazy

Pro snazší **používání stránek pomocí hlasových čteček** pro nevidomé návštěvníky se někdy přidávají odkazy typu „přeskočit navigaci“, „přeskočit na obsah“ a podobně.

Tyto odkazy se v klasickém prohlížeči nezobrazují. Je dobré myslet na to, že i neviditelný odkaz může dostat `focus` po stisknutí klávesy Tab. Takže by se potom tyto odkazy měly buď zobrazit, nebo být z *tabování* vyčleněny pomocí [záporného `tabindex`u](/tabindex#zabraneni):

```
&lt;a class="skryty" href="#obsah" **tabindex="-1"**>
  Přeskočit na obsah
&lt;/a>
```

## Kontrola funkčnosti odkazů

Při odkazování se snadno stane, že odkaz vede na **neexistující stránku**.

  - Cíl může po přidání odkazu na stránku zaniknout.

  - Chyba může nastat už během vytváření odkazu – překlep v adrese.

Nefunkční odkazy mají **negativní vliv** na [SEO](/seo) – vyhledávač nechce posílat návštěvníky na stránky, které *nefungují*.

Je tedy dobré čas od času **funkčnost odkazů zkontrolovat** a nefunkční opravit nebo odstranit. Existují k tomu automatické nástroje. Dobře funguje **Xenu**:

    - [Stáhnout program Xenu](http://home.snafu.de/tilman/xenulink.html#Download)

Používání **Xenu** je velmi snadné. Po nainstalování stačí zvolit *Check URL…*:

Následně zvolit **doménu** a zaškrtnou kontrolu **externích odkazů**:

Potom stačí jen počkat, až Xenu odkazy zkontroluje.

## Odkazy jinam

  - Jak psát web: [Odkazy v HTML](http://www.jakpsatweb.cz/odkazy-html.html)

  - Jak psát web: [Odkazy v HTML: a href, target, rel](http://www.jakpsatweb.cz/html/odkazy.html)

  - DevDocs: [Element `&lt;a>`](http://devdocs.io/html/element/a)

    .test-odkazu a {background: #fff !important; color: #000 !important; border: 0; padding: 1em}
    
    .test-odkazu a:hover {background: #ccc !important;}
    .test-odkazu a:hover:after {content: " :hover" !important;}
    
    .test-odkazu a:focus {background: orange !important;}
    .test-odkazu a:focus:after {content: " :focus" !important;}
    
    .test-odkazu a:active {background: yellow !important;}
    .test-odkazu a:active:after {content: " :active" !important;}