---
title: "Výběr jazyku stránky"
headline: "Výběr jazyku stránky"
description: "Jak vytvořit vícejazyčný web s ohledem na uživatele i vyhledávače."
date: "2014-10-31"
last_modification: "2016-03-06"
status: 1
tags: ["SEO", "Rady a nápady", "Lokalisace"]
---

V případě, že má být webová stránka nebo aplikace dostupná ve více jazycích, existuje několik způsobů, jak to udělat. V různých situacích se hodí různé postupy.

## Autodetekce jazyku

Pro lepší komfort návštěvníků je vhodné zkoušet automaticky určit jazyk, který bude návštěvník preferovat.

V některých situacích se kromě jazyku hodí detekovat i lokalitu, na základě které může být web personalisovaný.

Detekovat jazyk klienta lze v [PHP](/php) z hlavičky [`HTTP_ACCEPT_LANGUAGE`](/server#http-accept-language).

V JavaScriptu je informace o jazyku v `navigator.language` (případně `navigator.userLanguage` v **IE 10** a starší).

  Váš jazyk je „“

    vypisJazyku.innerHTML = navigator.language || navigator.userLanguage;

Výstup z této detekce je závislý na nastavení jazyku v prohlížeči. Když si člověk jazyk v prohlížeči změní, adekvátně se změní informace v `HTTP_ACCEPT_LANGUAGE`:

Jazyk zjištěný [JavaScriptem](/js) se nemusí shodovat s hlavičkou `HTTP_ACCEPT_LANGUAGE`.

Při přítomnosti více jazyků může prohlížeč vrátit jejich seznam se stanovenou prioritou.

```
en-GB,en;q=0.8,cs;q=0.6,de;q=0.4
```

U prohlížečů od Microsoftu – [**Edge**](/microsoft-edge)/**IE** – je jazyk prohlížeče nejspíš určen operačním systémem.

### GeoIP

Druhá možnost, jak jazyk automaticky určit, je detekce podle IP adresy:

    - [Lokalisace podle IP v PHP](/geoip)

Jde o relativně spolehlivou metodu. Stačí vyzkoušet. Zjistit aktuální jazyk dle HTTP hlavičky a IP detekce je možné na následující stránce:

    - [IP adresa, prohlížeč a jazyk](/ip)

### Risiko autodetekce

Automatické určení jazyku může v případě selhání značně zkomplikovat návštěvníkovi život. Přijít na web a vidět ho v jazyce, kterému člověk absolutně nerozumí, je dost nešťastné.

Mělo by proto být zřejmé, jakým způsobem jazyk následně **ručně změnit**.

## Změna jazyku

Pokud automatická detekce nastaví jazyk jinak, než by si návštěvník přál, bude potřeba jazyk přepnout.

Vzhledem k tomu, že různé weby mají různé požadavky na změnu jazyka, neexistuje nějaký **jednoznačný styl**, jak přepínání jazyků realisovat.

Nejčastěji jde změnu jazyka nalézt nejspíš:

  - Vpravo nahoře.

  - V patičce.

  - V nastavení.

Díky automatické detekci nemusí být zvlášť u aplikací nutné, aby vůbec někdy uživatel jazyk měnil. U obsahových webů je ale situace někdy odlišná, protože některé stránky mohou být v některém z jazyků lépe zpracovány.

### Příklady

Na Facebooku jde jazyk změnit v patičce po kliknutí na aktuální jazyk.

[Twitter](/twitter) má změnu jazyku až v nastavení:

Pokud jsou k disposici pouze dvě jazykové verse, nabízí se použít třeba styl, který používá [Wedos](http://hosting.wedos.com/d/117947):

### Ikony vlajek

Obchod Alza.cz používá řešení se symboly vlajek:

Ty na jednu stranu pomohou v orientaci, na stranu druhou dávají výběru jazyku **vyšší pozornost**, než by možná bylo potřeba.

Další problém je v tom, že úplně neplatí rovnice vlajka = jazyk. V některých zemích se hovoří více jazyky a stejně tak některými jazyky se mluví ve více zemích (člověk z Brazílie bude klikat na portugalskou vlajku a podobně).

### Jazyk jazyků

K úvaze je, jestli jednotlivé jazyky vypsat v aktuálně nastaveném jazyce, jazykem daného jazyku nebo použít universální angličtinu.

Při použití aktuálního jazyku může nastat problém v případě, že se člověk překlikne. Najít způsob, jak se přepnout zpátky do alespoň trochu srozumitelného jazyku je potom náročné.

Zabránit tomu jde vypsáním seznamu jazyků v jazyce každého z nich. Tedy místo „Slovinština“ psát slovinsky „Slovenščina“ a podobně. Uživatel potom najde svůj jazyk i v případě, že je web nastaven do jazyku, kterému vůbec nerozumí.

Tento přístup je třeba na Facebooku, kde se po najetí navíc zobrazí název jazyku v aktuálně nastaveném překladu.

## Ukládání jazyku

Nastaví-li si uživatel vlastnoručně požadovaný jazyk, je dobré mu tuto volbu uložit, aby si ji stránka pamatovala.

Dobře se pro to hodí [cookies](/cookies) – nejspíš i v případě, že se uživatel na stránku přihlašuje, aby po případném odhlášení byl web v jeho oblíbeném jazyce.

V přenášení informace o aktuálním jazyce se liší vhodné postupy pro obsahové weby od webových aplikací:

## Webová aplikace

Webové aplikace (jako [Facebook](/facebook) nebo Twitter) v určitém jazyce mají typicky jen uživatelské rozhraní a samotný obsah je potom v jazyce jeho autora.

Například na Facebooku je vidět, jak je uživatelský obsah v češtině doplněn uživatelským rozhraním (například) v angličtině.

V takové situaci je poměrně rozumné, že se obsah nachází na stále stejné URL nezávisle na jazyku návštěvníka.

```
https://www.facebook.com/jecas.cz/posts/1026829824045400
```

Když si tuto URL nalistuje člověk s Facebookem ve španělštině, bude mít ovládací prvky mimo textu příspěvku španělsky.

## Obsahová stránka

U webů sestávajících ze souvislého textu v různých jazycích je potom situace úplně jiná.

Jednotlivé stránky jsou textově kompletně odlišné, takže je potřeba, aby byly na odlišných adresách (aby na různé jazykové mutace šlo odkazovat a mohly je indexovat vyhledávače).

### Jazyk v URL

Obvykle se informace o jazyku přenáší v URL. Ačkoliv by teoreticky šlo mít pro kontaktní stránku v češtině a angličtině adresy typu:

```
example.com/kontakt
example.com/contact
```

Při potřebě překladu do němčiny nebo slovenštiny by ale nastal problém s obsazenými URL.

Pohodlnější tak bývá zanést informaci o jazykové versi přímo jako část URL:

```
example.com/cs/kontakt
example.com/en/contact
example.com/sk/kontakt
```

### Různé domény

Možnost je případně i v použití zvláštních domén pro jednotlivé jazykové mutace:

```
example.cz/kontakt
example.com/contact
example.sk/kontakt
```

U webu s hodně překlady to ale může být neúnosně finančně nákladné nebo technicky složitěji řešitelné.

### Výchozí jazyk

K úvaze je, jestli mít nějaký jazyk jako výchozí. Tedy například anglickou podobu stránky mít na:

```
example.com/
example.com/contact
```

A překlady na:

```
example.com/cs/kontakt
example.com/sk/kontakt
```

Nebo mít všechny verse na URL nesoucí název jazyku.

## Přesměrování

Je-li informace o jazyku v URL u všech jazykových mutací, je třeba vyřešit situaci, kdy se návštěvník dostane na stránku:

```
example.com
```

Nabízí se ho přesměrovat na základě detekce jazyku na příslušnou jazykovou podobu, například:

```
example.com/cs
```

Pro vyhledávače je totiž jinak problém, když se na stejné adrese zobrazuje různým lidem různý obsah:

  Obecně zatím platí, že Seznam
    dokáže na jedné URL zaindexovat jenom jeden obsah.

Google dokáže zaindexovat na jedné URL více obsahů, ale nedokáže je
pak oba nabídnout uživateli.
  – Yuhů

Bohužel přesměrování má ten problém, že zbytečně **zdržuje načítání stránky**. Na pomalém mobilním připojení může být odezva každého požadavku třeba 300 milisekund.

Přesměrování tak zbytečně zdrží načítání a sníží [rychlost webu](/zrychlovani).

### Kanonické URL

Obejít problém přesměrování jde servírováním odlišného obsahu na stejné URL hlavní stránky, kde je podle automaticky detekovaného jazyku uvedena značka `&lt;link rel="canonical">` – ta slouží pro vyhledávače, aby pro ně neexistovala adresa s proměnlivým obsahem.

```
&lt;link rel="canonical" href="http://www.example.com/en">
```

Problematiku přesměrování a použití kanonického odkazu jsem konsultoval s **Yuhůem**:

  Pokud použiješ na HP obsah proměnlivý podle jazyka, Seznam uvidí
kanonický link a zpracuje ho podobně jako přesměrování, ovšem jako
kanonickou adresu v SERPu vždy použije `example.com/xx`

  Přijde ti postup s kanonickým odkazem v pořádku, nebo je lepší postupovat jinak?
  
    **Yuhů**: Já bych se smířil s tím přesměrováním, aby mohly vyhledávače pohodlně
zaindexovat všechny jazykové verze na jejich URL.

  Posílá SeznamBot hlavičku HTTP_ACCEPT_LANGUAGE, ze které lze detekovat češtinu?

  **Yuhů**: Pokud vím, posílá tuhle hlavičku a primárně chce češtinu.
Občas to přináší i vtipné až smutné situace, například když narazíme
na nějaké automaticky nebo komunitně přeložené mohutné americké weby.

## HTML atributy

V souvislosti s jazykovými versemi se je možné setkat s atributy [`lang`](/lang) a [`hreflang`](/odkaz#hreflang).

Atribut `lang` se zpravidla používá pro celou stránku u značky [`&lt;html>`](/html-kostra#html). Jeho význam je trochu sporný, protože vyhledávače stejně musí provádět detekci jazyku na základě obsahu.

Pomocí `hreflang`u jde k odkazu přidat informaci, že vede na určitou jazykovou versi.

První způsob je značkou `&lt;link>` v hlavičce:

```
&lt;link rel="alternate" **hreflang**="sk" href="http://example.sk/">
```

A podobně pak i u odkazů (třeba v menu na přepnutí jazyka):

```
&lt;a href="http://example.sk/" **hreflang**="sk">
  slovensky
&lt;/a>
```

Za doplnění děkuji [**Petru Soukupovi**](https://www.souki.cz/).

## Překlad

Jak technicky řešit přeložení obsahu stránky řeší následující článek:

    - [Překlad stránky v PHP](/preklad)

## Odkazy jinam

  - Sitepoint: [How Do You Represent a Language on the Web?](http://www.sitepoint.com/representing-language-on-the-web/)