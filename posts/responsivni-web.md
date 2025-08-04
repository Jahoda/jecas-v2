---
title: "Responsivní design webu"
headline: "Responsivní design webu"
description: "Jak jednoduše a kvalitně vytvořit web, který se přizpůsobí všem velikostem cílových zařízení."
date: "2014-03-17"
last_modification: "2014-10-21"
status: 1
tags: ["Hotová řešení", "Responsivní design"]
---

O různých možnostech, jak vytvořit stránku pro **mobilní zařízení** pojednává samostatný článek [Jak na mobilní web](/mobilni-web). Tento text se věnuje tomu, jak s co nejmenší námahou vytvořit **rozložení stránky** (layout), který se bude vhodně přizpůsobovat různým velikostem *viewportu* (velikosti okna prohlížeče, kde se zobrazuje samotný obsah stránky, tj. bez záhlaví okna, stavového řádku a jiných lišt).

## HTML je responsivní

První je dobré si uvědomit, že prosté HTML je v podstatě **responsivní samo o sobě**. Jde si to velmi jednoduše ověřit **vypnutím CSS** nebo zobrazením si hodně staré stránky z doby, kde se ještě CSS nepoužívalo.

Prakticky jediné, co je pro nová **zařízení s menším displejem** nutné udělat, je přidat jednu [&lt;meta> značku](/meta-viewport) do hlavičky stránky (`&lt;head>`).

```
&lt;meta name="viewport" content="width=device-width,initial-scale=1">
```

Tato značka zajistí, že prohlížeč zobrazí stránku v měřítku 1:1. Mobilní prohlížeče obvykle stránku bez tohoto `&lt;meta>` tagu zobrazí v jiném měřítku a přidají **posuvník**.

Zobrazení prostého HTML na mobilním zařízení s vhodnou podobou `&lt;meta name="viewport">` ([ukázka](http://kod.djpw.cz/olgb-)):

Prostý text formátovaný základními HTML značkami, jako jsou **nadpisy**, **odstavce** nebo **seznamy**, se bude krásně přizpůsobovat prostoru viewportu.

A téže stránka bez této `&lt;meta>` značky ([ukázka](http://kod.djpw.cz/nlgb-)).

Po přidání jedné značky si tedy můžeme *responsivitu* webu dalšími úpravami už jen *pokazit*.

## HTML výjimky

Existují určité případy, kdy se obsah HTML značky na stránku nevejde. To jsou například:

  - **obrázky** (značka `&lt;img>`),

  - **videa**, **mapy** a podobné objekty (většinou vloženy značkou [`&lt;iframe>`](/ramy#iframe), [`&lt;canvas>`](/canvas), [`&lt;svg>`](/svg))

  - **tabulky** (`&lt;table>`),

  - **zdrojové kódy** ([`&lt;pre>`](/vypis-kodu#pre)),

Musíme proto zajistit, aby nám svou větší šířkou **nerozhodily layout**.

### Obrázky

Nejjednodušší způsob, jak omezit rozměry obrázku, je pomocí `max-width: 100%`. Automatická **výška** (`height: auto`) potom zajistí, že se výška dopočítá na základě šířky, takže nedojde ke změně poměru výšky a šířky, což by vedlo k **deformaci** ([ukázka](http://kod.djpw.cz/rlgb)).

```
img {
  max-width: 100%;
  height: auto;
  box-sizing: border-box
}
```

Chceme-li přímo obrázku přidat rámeček (`border`) nebo odsazení (`padding`), je dobré použí [okrajový box-model](/box-sizing#border-box) (`box-sizing: **border-box**`), aby se tyto hodnoty k šířce **nepřičítaly**.

Řešení to není úplně ideální, protože zmenšení rozměrů nezmenší **datovou velikost**.

Jak zajisit zmenšení rozměru obrázku a snížení jejich **datové velikosti** je popsáno v samostatném článku [Responsivní obrázky](/responsivni-obrazky).

### Videa a objekty

Stejný postup jako u obrázků zajistí **přizpůsobení se šířce** i pro značky `&lt;iframe>`, `&lt;video>`, `&lt;svg>` nebo `&lt;canvas>`.

Do CSS pravidel **minimální responsivní stránky** si proto přidáme:

```
iframe, canvas, video, svg {
  max-width: 100%;
  box-sizing: border-box;
  height: auto;
}
```

Jediný problém je správný **poměr stran**. U obrázku se poměr zachová, což třeba u `&lt;iframe>` neplatí. Často to vadit nemusí, ale někdy to vytváří nehezké situace.

Nejspolehlivější řešení by bylo výšku dopočítávat JavaScriptem, ale i v CSS jde využít triku dopočítávání [výšky podle šířky](/vyska-podle-sirky). A připravit si tak několik obecných poměrů stran, které potom aplikujeme použitím příslušné CSS třídy.

```
.pomer-stran {
  position: relative;
  height: 0;
  /* poměr stran 16:9 */
  padding-top: 56.25%;
}
.pomer-stran > * {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%; height: 100%;
}
```

HTML kód potom bude vypadat takto (dalším obalem můžeme nastavit maximální šířku):

```
&lt;div style="max-width: 560px">
  &lt;div class="pomer-stran">
    &lt;iframe width="560" height="315" src="">&lt;/iframe>
  &lt;/div>
&lt;/div>
```

[Ukázka](http://kod.djpw.cz/wrgb).

### Tabulky

Prosté *řešení* je tabulku obalit elementem s `overflow-y: auto`.

```
.obal-tabulky {
  overflow-y: auto;
}
```

Široká tabulka potom bude mít **vodorovný posuvník**, takže nerozhodí šířku celé stránky. [Ukázka](http://kod.djpw.cz/orgb).

Pokročilejší postup je potom [tabulku *rozlámat*](/responsivni-tabulky#rozlamani).

A úplně nejlepší je dopředu myslet na to, že **velké tabulky** jsou na menších rozlišeních problematické, takže je pokud možné vytvářet jen s **menším počtem sloupců** / menší šířkou.

### Zdrojové kódy

Zdrojový kód v `&lt;pre>&lt;code>&lt;/pre>&lt;/code>` jde rovněž obalit něčím s `overflow: auto` jako tabulku. Existují ale, myslím, lepší řešení.

    Nastavit `overflow: auto` přímo pro `&lt;pre>`:

    ```
pre {
  overflow: auto;
}
```

    Povolit **zalamování** včetně rozlamování slov (při zkopírování bude kód v původním stavu):

    ```
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
```

[Ukázka obou postupů](http://kod.djpw.cz/vrgb) (funkční od **IE 8**)

[Celý příklad responsivního webu na GitHubu](https://github.com/Jahoda/responsivni-web)

## Typografie

### Délka řádků

Už máme docela hezky responsivní stránky, bohužel pro uživatele s velkým *viewportem* **nebude čtení asi úplně příjemné**. Na velkém monitoru a maximalisovaném okně prohlížeče můze vzniknou na jednom řádku cca **300 znaků**.

To je poměrně dost a u delšího textu může být náročné po dočtení řádku správně trefit ten další. Proto oblast s textem omezíme **maximální šířkou** (`max-width`).

Je samozřejmě nemožné stanovit nějakou **přesnou hranici**, kdy je řádek už **moc dlouhý** (zvlášť s ohledem na to, že schopnosti a podmínky návětšvníků webu jsou individuální).

Osobně vidím maximální hranici někde kolem **80 znaků**, což může odpovídat cca šířce `35em` (záleží na velikosti písma a použitém **fontu**). Jelikož text se píše do **odstavců**, přidáme něco jako:

```
p {
  max-width: 35em;
}
```

### Velikost písma

Zadávat obecnou velikost **není nutné**, použije se ta, co má jako výchozí prohlížeč nebo uživatel. Případné zvětšování/zmenšování písma potom stačí provádět relativně, tj. například procenty, aby jednotlivé části stránky respektovaly nastavení prohlížeč/uživatele.

Výchozí velikost bývá často 16 pixelů. Ukázka z **Firefoxu**:

A **Google Chrome**:

Přidáme-li do kódu následující předpis:

```
h1 {
  font-size: 300%;
}
```

Nadpis `&lt;h1>` bude mít trojnásobek (300 %) základní velikosti, tedy *nejspíš* 3 × 16 pixelů = 48 px. [Ukázka](http://kod.djpw.cz/qrgb).

Určovat velikost je dobré primárně pro **hlavní obsah stránky** a začít při nastavování písma právě tím. V případě, že je výchozí velikost pro použitý font příliš **velká nebo malá**, lehce ji upravíme pro `&lt;html>` nebo `&lt;body>`.

```
html {
  font-size: 90%;
}
```

Potom přejdeme k nastavování dalších částí obsahu (nadpisy a podobně). Velikost písma se **dědí**, takže předchozí **nadpis s 300% velikostí** bude mít při globálním zmenšení písma pro `&lt;html>` ve finále velikost jen 90 % z té předchozí (48 pixelů), tedy přibližně 43 px (48 * 0.9). [Ukázka](http://kod.djpw.cz/srgb).

## Sloupcový layout

Fajn, web už je nyní krásně **responsivní** a dobře čitelný. Pokud je ale na stránce více obsahu, na velkých zobrazovacích zařízeních bude jen *úzká dlouhá nudle* a vedle ní hromada volného místa. Nabízí se proto obsah **rozdělit do sloupců**.

Pravidlo číslo jedna pro tvorbu **vícesloupcového responsivního layoutu** je nezadávat šířku v pixelech, ale ideálně v procentech.

Sloupce se vedle sebe potom dostanou [obtékáním](/float). Řekněme, že hlavní obsah bude mít 80 % šířky a postranní menu 20 %.

```
.obsah {
  width: 80%;
  float: left;
}
.menu {
  width: 20%;
  float: left;
}

```

Obtékání ukončí například `obal` pomocí [`overflow: hidden`](/float#overflow):

```
.obal {
  overflow: hidden;
}
```

Pro případné přidávání rámečku nebo `padding`u se hodí pro oba sloupce použít okrajový box-model (**IE 8+**) – nebude se o ně navyšovat šířka.

```
.obsah, .menu {
  box-sizing: border-box;
}
```

[Výsledek](http://kod.djpw.cz/vlgb)

### Media queries

Nyní konečně do hry přichází [CSS pravidlo `@media`](/media). **Zmenšováním okna prohlížeče** hledáme místo, kde už jsou dva sloupce moc a bylo by lepší je oba zobrazit **pod sebou** (analogicky to platí i pro [vyšší počet sloupců](/responsivni-mrizka)).

Jak vhodnou **šířku změřit**? Po zapnutí [vývojářských nástrojích](/vyvojarske-nastroje) v **Chrome** se při změně velikosti okna zobrazuje aktuální rozměr vpravo nahoře (je ale větší o **šířku posuvníku**).

Jinak je často šíři možné zjistit ze značky `&lt;html>` po jejím prozkoumání.

Nyní vytvoříme tzv. *break-point*, tedy místo, kde se aplikují odlišná pravidla (zruší se dvojsloupcovost layoutu, což jde třeba nastavením šířky na 100 % – dva elementy se 100% šířkou se vedle sebe nevejdou).

```
@media (max-width: 700px) {
  .obsah, .menu {
    width: 100%;
  }
}
```

[Ukázka](http://kod.djpw.cz/wlgb) (projeví se při změně velikosti okna kolem 700 px)

Jak je vidět, při zmenšení okna pod cca 700 px se menu přesune nad obsah. Pokud by bylo moc dlouhé, nabízí se ho [schovat do tlačítka](/responsivni-menu).

Výše uvedené `@media` pravidlo se aplikuje vždy, když bude **šířka pod 700 px**. Chtěli-li bychom naopak něco aplikovat jen při šířce vyšší, použila by se vlastnost `**min**-width`.

```
@media (**min**-width: 700px) {
  /* Pravidla se aplikují při šířce 700 px a větší */
}
```

U používání pravidla `@media` a zvlášť `min-width` si je dobré uvědomit, že takto obalený kód nebude aplikován v **IE 8** (nezná *media queries*). Jde-li proto o podporu **IE 8**, neměl by kód pro větší rozlišení (kde se typicky **IE 8** používá) být obalen do `@media`.

#### Rozměry *media queries* v pixelech

Někoho může zaskočit, že jsou v `@media` pravidlu **použity pixely**, to samozřejmě není ideální a bylo by vhodné je přepočítat na **relativní jednotky**. Proč? Při odlišné velikosti písma nebudou absolutní hodnoty break-pointů v px sedět pro větší písmo.

Obrázek ilustruje, jak při **zvětšení písma** ze strany uživatele u předchozí [ukázky](http://kod.djpw.cz/wlgb) bude *break-point* v pixelech totálně mimo. Šířka menu je při větším písmu nedostatečná a přeskládání pod sebe by mělo **nastat dříve**. V tomto případě to není tak strašné, ale často to může významně rozhodit layout nebo způsobit **nečitelnost** některých částí stránky, když je překryje něco, co nemá.

Takto třeba vypadá hlavní stránka Seznamu při hraniční šířce a **zvětšeném písmu**:

Chceme-li nastavit hodnotu *hraničních bodů* v např. `em` místo v `px`, potřebujeme zjistit kolik pixelů má jeden `em`. To jde buď prozkoumáním základní velikosti písma v **nastavení prohlížeče**, nebo třeba tak, že na **čisté** stránce pro `&lt;body>` nastavíme `font-size: 1em` a něco do něj napíšeme. A ve *vypočítaných stylech* `&lt;body>` se potom ukáže **velikost písma v pixelech** (v tomto případě **16 px**).

Teď jen stačí provést jednoduchý výpočet `700 / 16` a vyjde odpovídající hodnota v `em`.

#### Kalkulačka pixelů na em

    function prepocitat(formular) {
      var vysledek = (formular.sirka.value / formular.velikost.value);
      vysledek = Math.round(vysledek * 10) / 10;
      var pravidlo = "@media (max-width: " + vysledek + "em) {\n" +
        "  /* pravidla pro šířku do cca " + formular.sirka.value + " px */\n" +
  "}";
      document.getElementById('vysledek').innerHTML = vysledek;
      document.getElementById('pravidlo').innerHTML = pravidlo;
    }

    Šířka v pixelech: px

    Velikost 1 em: px

    Výsledná hodnota: `43``em` (zaokrouhleno na desetiny)

    ```
@media (max-width: 43.7em) {
  /* pravidla pro šířku do cca 700 px */
}
```

[Ukázka](http://kod.djpw.cz/zlgb) předchozího dvou-sloupcového layoutu s převedenými *break-pointy* do `em` rozměrů.

Při srovnatelné šířce, bude už dávno menu a obsah pod sebou.

### Omezení šířky layoutu

Kvůli maximálnímu počtu znaků na řádek byla nastavena `max-width` pro odstavec (`&lt;p>`). Když se ale podíváme na [poslední podobu](http://kod.djpw.cz/zlgb-) příkladu responsivního layoutu na **větším monitoru**, vidíme pořád spoustu nevyužitého prostoru.

Možná by bylo hezčí **omezit šířku** celého layoutu a třeba to ještě celé [horisontálně vycentrovat](/centrovani#margin-auto).

```
.obal {
  max-width: 65em; /* maximální šířka */
  margin: auto; /* vodorovné vycentrování */
}
```

[Ukázka](http://kod.djpw.cz/cmgb-)

## Odkazy jinam

  - CSS-tricks.com: [Testování počtu znaků mez 45–75 znaky](http://css-tricks.com/bookmarklet-colorize-text-45-75-characters-line-length-testing/)

  - SmashingMagazine: [Úprava velikosti písma a výšky řádků](http://www.smashingmagazine.com/2014/09/29/balancing-line-length-font-size-responsive-web-design/)

  - Sitepoint: [Kdy používat vertikální media-queries](http://www.sitepoint.com/5-uses-vertical-media-queries/)

  - Fluidity: [Důkaz, že je HTML responsivní samo o sobě](http://fluidity.sexy/)

  - Tuts+ Web Design: [A “Readability First” Approach to Media Queries and Layout](http://webdesign.tutsplus.com/articles/a-readability-first-approach-to-media-queries-and-layout--cms-19419)