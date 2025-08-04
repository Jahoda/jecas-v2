---
title: "HTML nadpisy H1, H2, …"
headline: "Nadpisy na webu"
description: "Pro značení nadpisů stránek existují značky <code>&lt;h1></code>, <code>&lt;h2></code>, <code>&lt;h3></code>, <code>&lt;h4></code>, <code>&lt;h5></code> a <code>&lt;h6></code>."
date: "2015-02-22"
last_modification: "2015-03-02"
status: 1
tags: ["HTML", "HTML značky"]
---

Jako jedna z forem pro označení důležitějšího textu existují v HTML nadpisy. Pomáhají vytvářet celou strukturu dokumentu a usnadňují návštěvníkům webu získat **rychlý přehled o obsahu** stránky. Ne každý čte stránku písmeno po písmenu shora dolů. Netrpělivý návštěvník napřed **výrazné prvky** stránky (což nadpisy jsou) prolétne očima, aby zjistil, jestli stojí za to obsah vůbec číst.

Z pohledu HTML jsou nadpisy [párové elementy](/html-znacky#povinne) s povinnou počáteční i koncovou značkou. Písmeno `H` v názvu značky pochází z anglického slova *heading* – nadpis.

## Zápis

Jednotlivé úrovně nadpisů se v zápisu liší jen číslem.

```
&lt;h1>
  Nadpis nejvyšší úrovně
&lt;/h1>
&lt;h2>Druhá úroveň&lt;/h2>
&lt;h3>Třetí úroveň&lt;/h3>
&lt;h4>Nadpis úrovně 4&lt;/h4>
&lt;h5>Nadpis úrovně 5&lt;/h5>
&lt;h6>Nadpis úrovně 6&lt;/h6>
```

## Úrovně nadpisů

Úrovní je sice hned 6, v praxi se ale většinou **používají první 3 až 4**. Ve výchozím stylu prohlížečů jsou nadpisy [blokové](/display#block) (`display: block`) a **zobrazují se tučné** (`font-weight: bold`). První tři úrovně (`&lt;h1>` až `&lt;h3>`) jsou navíc větším písmem než prostý text.

Nadpis `&lt;h4>` se potom zobrazuje zpravidla stejně jako běžný tučný text.

Nadpis `&lt;h5>` je už menší než prostý text. Dle výchozích stylů velikostně odpovídá obsahu značky `&lt;small>`.

Nakonec `&lt;h6>` je úplně nejnižší úroveň nadpisu. Je ještě menší než obyčejný text ve značce `&lt;small>`. Bez změny výchozího stylu už je skoro nečitelný.

    - [Ukázková stránka se všemi nadpisy](http://kod.djpw.cz/halb)

## Výchozí styl

Následující tabulka přibližně zachycuje výchozí velikost písma ([`font-size`](/font#size)) a odsazení ([`margin`](/margin)) shora i zdola – odsazení z obou stran bývá shodné.

    Značka
    Velikost
    Odsazení
  
  H132 px21 px
  H224 px20 px
  H319 px19 px
  H416 px21 px
  H513 px22 px
  H611 px25 px  

Místo stejného odsazení zdola i shora někdy působí lépe vyšší odsazení horní než spodní (`margin-top` větší než `margin-bottom`).

Velikost písma nadpisů jednotlivých úrovní odpovídá zastaralému atributu `size` používaného pro element `&lt;font>` – `&lt;font size="6">` je tak stejně velký jako `&lt;h1>` atd.

## Struktura dokumentu

Pomocí nadpisů se utváří **struktura dokumentu**. Z toho vyplývá, že:

    Úroveň nadpisů by měla začínat od nejvyšší úrovně (`&lt;h1>`).

    Jednotlivé úrovně by měly jít **postupně** za sebou. Tedy **ne** nějak takto.

    ```
&lt;h1>
  Nadpis nejvyšší úrovně
&lt;/h1>
&lt;h3>Třetí úroveň&lt;/h3>
```

    Nadpisy by **neměly** být používány k **zvětšování písma**. Pokud na dané místo ze struktury vychází nadpis H2, ale jeho písmo je visuálně moc velké, řešení je změnit pro `&lt;h2>` velikost pomocí CSS vlastnosti `font-size`.

    O úrovni použitého nadpisu by se **nemělo rozhodovat na základě vzhledu**.

V případě správného strukturování nadpisů půjde dobře automaticky sestavit ze stránky její obsah, jaký mají třeba stránky na Wikipedii.

    - [Automatické generování obsahu stránky](/toc) – JS a PHP skripty pro vygenerování TOC (*Table of contents*) na základě nadpisů.

### Atribut `id`

Pokud je stránka delší a obsahuje hodně podnadpisů, je užitečné pro ně **přidávat identifikátory**. Dělá se to globálním atributem `id`. Na takový nadpis potom jde přímo odkázat přidáním `#id` do adresy.

```
&lt;h2 **id="id-nadpisu"**>
  Nadpis
&lt;/h2>
```

### Musí se používat nadpisy?

Volnost HTML nijak nenutí tvůrce webu nadpisy používat, stránka místo elementů `&lt;h1>`–`&lt;h6>` tak může obsahovat samé `&lt;div>`y:

```
&lt;div class="nadpis">Nadpis&lt;/div>
&lt;div class="podnadpis">Podnadpis&lt;/div>
```

S ohledem na strukturu obsahu stránky, kterou nadpisy tvoří, to ale **není dobrý nápad**.

## Výška řádku

Při globální změně výšky řádku ([`line-height`](/font#line-height)) se snadno stane, že zadaný rozměr nebude vhodný pro velké písmo v případě nadpisů.

Jelikož nadpisy většinou bývají krátké, špatná **výška řádku nadpisů** snadno unikne oku při testování. A potom se v ostrém provozu při mimořádně dlouhém nadpisu stane něco takového:

    - [Živá ukázka nedostatečné výšky řádku](http://kod.djpw.cz/kalb)

## Pouze jeden `&lt;h1>`

Některé poučky praví, že na stránce by měl být **pouze jeden nadpis** nejvyšší úrovně a obsahovat podobný obsah jako titulek (značka `&lt;title>`).

```
&lt;title>Název stránky&lt;/title>
…
&lt;h1>
  Název stránky
&lt;/h1>
```

U většiny stránek je to skutečně vhodný postup. Nikde ale používání více `&lt;h1>` nadpisů zakázané není.

Mohou nastat případy, kdy dává více H1 nadpisů smysl.

Někdo má ve zvyku do `&lt;h1>` dávat **název celého webu / logo** – záleží na úhlu pohledu, jestli se jedná o název stránky nebo spíš součást navigace – potom zpravidla i nadpis samotné stránky bývá v `&lt;h1>`. Často **více nadpisů** nejvyšší úrovně vzniká jako z nouze ctnost kvůli komplikovanému technickému řešení.

    U stránek, jako je například výpis článků z blogu podle určité kategorie, by se musely nadpisy článků celkově „ponížit“, aby neobsahovaly H1.

    Často by se na hlavní stránce hodil jako nejvyšší nadpis název webu a na podstránkách potom mít v H1 **název té podstránky**, což opět znamená dynamicky určovat, jestli název webu má nebo nemá být v `&lt;h1>`.

## Vliv nadpisů na SEO

Jelikož text v nadpisech mívá **větší význam** a v případě `&lt;h1>`, `&lt;h2>` a `&lt;h3>` je i ve výchozím stylu větší než běžný text v odstavcích nebo seznamech, dává smysl, aby mu větší důraz přisuzovaly i **vyhledávače**.

Nabízí se proto do nadpisů vkládat důležitá klíčová slova. Pokud je ale cílem, aby obsah webu také **četl návštěvník**, měly by nadpisy stále dávat smysl. Začínat kvůli SEO každý odstavec nadpisem na základě šablony „super seo klíčová fráze &lt;slovo>“ tak není úplně to pravé.

    - Plaváček: [Budiž nadpis. Řeklo SEO.](http://www.zdrojak.cz/clanky/budiz-nadpis-reklo-seo/)

Na některých webech jsou k vidění nadpisy obsahující klíčová slova **maskované pomocí CSS** jako běžný text. Jde to jednoduše:

```
h1 {
  font-weight: normal;
  font-size: 100%;
}
```

    - [Ukázka maskování H1 pomocí CSS](http://kod.djpw.cz/malb)

Nejedná se ale o moc čistou praktiku, kterou by bylo dobré následovat.

## Podnadpisy

V případě, že by se hodilo ihned pod hlavní nadpis umístit podnadpis, existuje několik možností:

    Podnadpis vložit přímo do `&lt;h1>`, třeba do značky `&lt;small>` nebo `&lt;span>`:

    ```
&lt;h1>
  Nadpis stránky&lt;br>
  &lt;small>Podnadpis&lt;/small>
&lt;/h1>
```

    Podnadpis umístit do **odstavce** a vhodně ho nastylovat:

    ```
&lt;h1>Nadpis stránky&lt;/h1>
&lt;p class="podnadpis">Podnadpis&lt;/p>
```

    Podnadpis vložit jako `&lt;h2>`:

    ```
&lt;h1>Nadpis stránky&lt;/h1>
&lt;h2>Podnadpis&lt;/h2>
```

    Nevýhoda je, že se tím hned *vyplácá* jedna úroveň nadpisů, protože nejvyšší podnadpisy stránky by potom měli začínat nejspíš úrovní `&lt;h3>`.

### Značka `&lt;hgroup>`

V návrzích HTML existovala značka `&lt;hgroup>`, která měla sloužit právě k obalení hlavního nadpisu a jeho podnadpisů.

    ```
&lt;hgroup>
  &lt;h1>Nadpis stránky&lt;/h1>
  &lt;h2>Podnadpis&lt;/h2>
&lt;/hgroup>
```

Řada prohlížečů ji podporuje, ale z W3C specifikace HTML 5 byla vyřazena.

## Odkaz v nadpisu, nadpis v odkazu

Není problém odkaz a nadpis zanořovat oběma způsoby.

### `&lt;a>` v `&lt;h1>`

```
&lt;h1>
    &lt;a href=#">
        Odkaz v nadpisu
    &lt;/a>
&lt;/h1>
```

### `&lt;h1>` v `&lt;a>`

Tato možnost je od **HTML 5 validní**, dříve [validní](/validita) nebyla, ale **spolehlivě fungovala**.

```
&lt;a href="#">
    &lt;h1>
        Nadpisu v odkazu
    &lt;/h1>
&lt;/a>
```

V případě, že je žádoucí, aby byl součástí odkazu kromě nadpisu ještě další element, je nejjednodušší použít jen jeden `&lt;a>`, který vše obalí.

    - [Příklad nadpisu v odkazu a odkazu v nadpisu](http://kod.djpw.cz/dblb)

## Odkazy jinam

  - Jak psát web: Bloky > [h1 až h6](http://www.jakpsatweb.cz/html/bloky.html#hn)

  - DevDocs: [Heading Elements](http://devdocs.io/html/element/heading_elements)

  - (Video) Google Webmasters: [More than one H1 on a page: good or bad?](https://www.youtube.com/watch?v=GIn5qJKU8VM)

Zaujala vás při rychlém prolétnutí stránka? 
 Klikněte pro návrat nahoru.

  var el = document.getElementById("presun-nahoru");
  function zaznamenat() {
    ga('send', 'event', 'click', 'Nadpisy nahoru'); 
  }
  function schovat() {
    el.style.display = "none";
  }
  var casovac;
  window.onscroll = function() {
    casovac = setTimeout(function() {
      if (!inViewPort(el)) {
        schovat();
      }
    }, 10 * 1000)
    this.onscroll = null;
  }
  
  function inViewPort(el) {
    var coords = el.getBoundingClientRect();
    return (coords.top >= 0 && coords.left >= 0 && coords.top)