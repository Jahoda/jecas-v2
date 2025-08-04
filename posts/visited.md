---
title: "Navštívený odkaz :visited"
headline: "Navštívený odkaz <code>:visited</code>"
description: "Pomocí CSS pseudo třídy <code>:visited</code> jde měnit některé styly navštíveného odkazu."
date: "2015-07-26"
last_modification: "2015-07-29"
status: 1
tags: ["CSS", "CSS selektory", "Odkazy"]
---

Pro přehlednější používání webové stránky se hodí odlišit odkazy, které **návštěvník již navštívil** – nemusí na ně potom už klikat znovu, když zná jejich obsah.

Zaměřit navštívené odkazy jde pomocí `:visited`:

```
:visited {
  color: grey; /* navštívený odkaz bude šedivý */
}
```

Někdy se před `:visited` zbytečně píše ještě značka odkazu:

```
**a**:visited {}
```

Jelikož navštívený může být pouze odkaz, nemá to funkci vliv. Teoreticky je složitější zápis odolný proti případným **změnám chování prohlížečů**, pokud by `:visited` začalo fungovat i u jiných značek. Už se to v **historii** stalo s pseudo třídou po najetí myší – `:hover` (více v článku [Kaskádová móda](http://www.webylon.info/K.46#I) na Webylonu).

Výchozí styl běžných odkazů je modrou barvou, navštívené odkazy potom červenomodrou. Pokud výchozí barvy nezapadají do stylu webu, obvykle se navštívený odkaz styluje **méně výrazněji než normální odkaz**.

## Má smysl odlišovat navštívené odkazy?

Je docela běžné, že webové stránky navštívené odkazy **neodlišují**.

V řadě případů to bude nejspíš z **lenosti** – zkrátka se styl odkazu zapíše jako:

```
a {
  /* styl odkazu */
}
```

Což postihne i odkaz, který již byl navštíven.

Druhá možnost je, že by odlišný styl některých odkazů **mátl uživatele**, takže se schválně jinak nestyluje.

  - Nemusí být každému na první pohled jasné, že jiná barva odkazu značí, že byl navštíven.

  - U některých stránek může být cílem, aby na něj návštěvník **chodil opakovaně**. Méně výrazý styl odkazu by od toho mohl odrazovat.

  - U odkazů na **stránky kategorií/rozcestníků** je potom snížení důrazu risikové, protože nebere v úvahu, jestli návštěvník prošel i podstránky.

Možnosti stylování navštívených odkazů jsou navíc **značně omezené z důvodu ochrany soukromí**:

## Nefungují styly pro `:visited`

Bez znalosti okolností se může zdát, že stylování navštívených odkazů **nefunguje**.

U `:visited` jde měnit pouze **barvy**:

  - barvu písma (`color`),

  - pozadí (`background`),

  - okrajů (`border-*-color`),

  - ohraničení (`outline-color`),

  - barvu oddělovače sloupců (`column-rule-color`),

  - `fill` a `stroke`

Proč?

V dobách před tímto omezením šlo velmi snadno ověřit, jaký libovolný web **návštěvník navštívil**. Třeba nastavením pozadí na adresu **měřicího skriptu**:

```
&lt;a 
  href="http://jecas.cz" 
  style="background: url(**navstivil.php?url=jecas.cz**)"
>
&lt;/a>
```

Šlo to třeba hezky využít k zjištění toho, jestli návštěvník byl na webu konkurence. Z tohoto důvodu tedy nejde navštíveným odkazům měnit **obrázkové pozadí**.

  Omezené stylování navštívených odkazů se týká prohlížečů:

    - **Internet Explorer 9+**,

    - **Firefox 4+**,

    - **Chrome**,

    - **Opera 15+**

Proč nefungují další vlastnosti, jako změna rozměrů (výšky/šířky), nastavení tučného písma a další?

I z těch by šlo zjistit (byť méně elegantně než obrázkový pozadím), zda návštěvník web už navštívil. Změny takových vlastností mohou **ovlivňovat své okolí**, takže by se zjišťování jen přesunulo na okolní elementy.

### Zjištění barvy

I barvu je ale přece možné skriptem zjistit:

    - [Zjištění výsledného CSS v JavaScriptu](/zjisteni-css)

Z tohoto důvodu metoda `getComputedStyle()` při použití na navštíveném odkazu **lže** – vrací hodnoty odkazu nenavštíveného.

### Selektor sourozence

Stejně tak nefunguje ani **selektor sourozence**:

```
:visited + span {
  /* tato pravidla se nikdy neaplikují */
}
```

Prohlížeč se z pohledu selektoru tváří, že odkaz navštívený není.

### Pseudo elementy `:before`/`after`

Nemožnosti používat pseudo-elementy je zvlášť škoda, šlo by tak snadno a elegantně k odkazům připsat, že byly navštíveny:

```
:visited:after {
  content: "✔ Navštíveno";
}
```

Bohužel to funguje jen u staré **Opery 12**, kde tak jde velmi snadno hezky označit **přečtené články**:

## Důsledky omezení

Asi největší problém možnost **měnit pouze barvu** přináší návštěvníkům s **problémem rozlišovat barvy**.

Může se zdát, že omezení nemuselo být tak dramatické a dalo se vztahovat pouze na **odkazy na jiné domény**, vždyť vlastník webu může stejně sledovat, co jeho návštěvníci viděli a co ne.

Takové chování by zneužitelnost pouze zmírnilo, protože stále existují stránky na stejné doméně, které spolu nesouvisí.

## Odlišení navštíveného odkazu

Pro názornější znázornění navštíveného obsahu je tak nutné si ukládat navštívené stránky uživatele ve vlastní režii:

    Pomocí JavaScriptu do **lokálního úložiště** – [`localStorage`](/zalohovani-formularu#local-storage).

    Serverovým skriptem uživateli přidat **identifikační cookie** a do DB na straně serveru mu přiřazovat navštívené stránky.

Když už se tato data ukládají, nabízí se si informací uložit co nejvíc. Třeba **datum návštěvy**:

Z ukládaných záznamů by mohlo jít zjistit a zobrazit i počet návštěv dané stránky, případě měřit i dobu, kterou člověk stránku četl a podobně.

### Ukládat u klienta, nebo na server?

Ukládat data na server má smysl hlavně v případě, že není **data o návštěvnosti** možné zjistit jinak – třeba pomocí [Google Analytics](/ga). Jinak je ukládání na serveru zbytečná zátěž.

## Hotové řešení s `localStorage`

Pro konkrétní implementaci ukládání do `localStorage` je potřeba:

    Sestavit **identifikátor stránky** – k tomu se bude hodit obsah za lomítkem (`location.pathname`) a část s otazníkem (`location.search`).

    ```
var pageId = location.pathname + location.search;
    
    Postup jako při `location` bude stejný i pro následné procházení odkazů:

      [Parsování URL v JavaScriptu](/js-parsovani-url)

    **Uložit** do lokálního úložiště pro identifikátor datum:

    localStorage.setItem(
  pageId,
  new Date()
);
```

Nyní zbývá jen část pro **znázornění navštívenosti**:

    **Projít odkazy** na stránce [cyklem](/js-cykly). Všechny odkaz na stránce jsou v `document.links`, případně se výběr může vztahovat jen na určitou oblast.

    ```
var links = document.links;
for (var i = links.length; i--; ) {
  visited(links[i]);
}
```

    **Označit navštívené odkazy** – to zajistí funkce `visited` třeba přidáním vlastního atributu `data-visited`.

    Navštívenost se zjistí na základě vyhledání položky v úložišti podle identifikátoru odkazu:

    ```
var item = localStorage.getItem(pageId);
if (item) {   
  // navštívený odkaz
}
```

    **Časový rozdíl** se zjistí odečtením data z úložiště (proměnná `item`) od aktuálního data, datum je nutné parsovat:

  ```
var date = new Date() - Date.parse(item);
```

  Pro representaci časové prodlevy v **češtině** stylem *před X minutami* půjde použít funkci `timeAgoInWords` z [dynamického updatu času](/update-casu).

  Výsledek se nastaví do atributu:

  ```
link.setAttribute("data-visited", TimeAgo.init(date));
```

  To by mělo zajistit označení všech navštívených odkazů v HTML [DOMu](/dom):

    **Znázornění proběhne v CSS** pomocí pseudoelementu `:after` a přečtení hodnoty pomocí [`attr()`](/content-attr) (**IE 8+**).

    ```
a[data-visited]:after {
    content: "navštíveno " attr(data-visited);
}
```

    Stylovat **navštívené odkazy libovolným způsobem** půjde přes prosté `a[data-visited]`.

[Živá ukázka](http://kod.djpw.cz/bqob-) – po poklikání na odkazy a vyčkání by to mělo zobrazovat **dobu od poslední návštěvy**:

(Moc jsem to netestoval, najdete-li chybu, dejte prosím vědět do komentářů.)

## Odkazy jinam

  - Mozilla Hacks: [privacy-related changes coming to CSS :visited](https://hacks.mozilla.org/2010/03/privacy-related-changes-coming-to-css-vistited/)

  - MDN: [`:visited`](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Avisited)