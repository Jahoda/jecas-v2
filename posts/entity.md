---
title: "Entity"
headline: "HTML entity"
description: "Entity v HTML jsou zvláštní druh posloupnosti znaků sloužící k zápisu různých symbolů."
date: "2015-01-15"
last_modification: "2015-02-06"
status: 1
tags: ["HTML"]
---

Znakové entity v HTML vznikly nejspíš z toho důvodu, že by bez nich bylo **komplikované zapsat znak „menší než“** — „`&lt;`“, který v HTML slouží k otevření značky, aniž by se tak interpretoval. Jedná se tedy o způsob tzv. *escapování*.

Typicky entita začíná znakem `&amp;` (na [české klávesnici](/ceska-klavesnice) pravý Alt + C), potom následuje její název a končí středníkem – `;`.

## Menší než `&lt;` – `&amp;lt;`

Začátek značky je sice tvořen sekvencí `&lt;` a alespoň jednoho znaku A–z (na velikosti nezáleží, bez diakritiky, čísel a podobně), takže napsat například a  by nebyl problém.

V případě „a&lt;b“ bez mezer by se už ale **nechtěně vytvořil** tučný text – sekvence „&lt;b“ by započala značku `&lt;b>`.

Kromě toho by bez entit bylo komplikované do textu [vypisovat zdrojový HTML kód](/vypis-kodu).

Znak „**menší než**“ tedy na stránkách nevypisujících HTML kód a nepoužívajících výrazy typu „a&lt;b“ (bez mezer) není potřeba zapisovat pomocí entity. Většinou se tak ale pro pocit bezpečí dělá – entita je to `&amp;lt;` (z anglického *less than*).

## Větší než `&gt;` – `&amp;gt;`

I symbol pro konec HTML značky je možné zapsat entitou. Nenapadá mě ale moc situací, kde by mohlo nezaentitování „`>`“ vadit.

Ani v hodnotě HTML atributu není s `>` problém, když se **použijí [uvozovky](/uvozovky#html)**.

```
&lt;p title="a>b">
  Odstavec s popiskem „a>b“.
&lt;/p>
```

## Ampersand `&amp;` – `&amp;amp;`

Protože entity začínají ampersandem, stal se `&amp;` do jisté míry **řídicím znakem**. Bylo tak najednou nutné vytvořit escape sekvenci i pro ampersand.

Podobně jako `&lt;`, ani ampersand není **většinou nutné** zapisovat pomocí entity.

Opět se to ale většinou pro jistotu dělá. Mohlo by se totiž stát že by přímo za `&amp;` byl obsah, který by tak dohromady dal **název existující entity**. Pokus o zápis „`Vt&amp;gt`“ by skončil následovně:

  Vt&gt

### Ampersand v odkazech

Trochu reálnější risiko existuje v adresách u odkazů. Bude-li mít stránka URL:

```
example.com/?a=1&amp;times
```

A někdo tuto URL zkopíruje do **cíle odkazu**. Bez převedení `&amp;` na entitu se `&amp;times` zobrazí jako křížek `&times;` (který se zapisuje entitou `&amp;times;`) a odkaz nejspíš nebude fungovat.

Předejít tomuto problému může i autor webové aplikace vhodným návrhem parametrů v URL, aby s entitami **nekolidovaly**.

## Uvozovky – `&amp;quot;`/`&amp;apos;`

Pro dvojité (`"`) a jednoduché (`'`) *uvozovky* existují taktéž speciální entity – hodí se k zápisu uvozovek do **hodnoty atributů**, které bývají v uvozovkách.

Pokud má v atributu `title` být obsah `Text v "uvozovkách"`, je nutné `"` převést na entity (nebo pro obalení hodnoty atributu použít uvozovky jednoduché).

```
&lt;p title="Text v &amp;quot;uvozovkách&amp;quot;">
```

Jelikož u českých textů bývá zvykem používat „české uvozovky“ (`&amp;bdquo;` a `&amp;ldquo;`), hodí se `&amp;quot;`/`&amp;apos;` spíš při psaní JavaScriptu do `on*` atributů (což obecně nebývá moc dobrý nápad) nebo jako **automatická ochrana** před [XSS](/bezpecnost#xss).

## Středník na konci

Entity jsou obvykle k vidění se **středníkem na konci**. Ani tento středník ale není tak úplně povinný. Některé entity se zobrazí i bez středníku. Dokonce za entitou bez středníku může i normálně pokračovat &regslovo&plusmn (výsledek zápisu `&amp;regslovo&amp;plusmn`).

Vzhledem k editorům barvícím zdrojový kód a obecně přehlednosti to nevypadá jako vhodný postup.

## Velikost textu entit

Identifikátory entit jsou většinou **závislé na velikosti písma**. Některé entity je možné zapsat malými i VELKÝMI písmeny.

  VELKÁ: &TRADE;, &REG;, &QUOT;

  malá: &trade;, &reg;, &quot;

U entit pro písmena řecké abecedy se na základě velikosti prvního písmena rozlišuje mezi malou a velkou variantou téhož znaku.

## Zápis symbolů

Kromě escapovacího významu se entity hodí i k zápisu zvláštních symbolů **bez ohledu na kódování**. To v dnešní době, kdy jde dobře používat UTF-8 ale není významná výhoda – různé podivné znaky jde rovnou vkládat do HTML kódu.

Jelikož ale může být problematické exotičtější znak umět na klávesnici zapsat, znalost **znakových entit** se hodí pro urychlení zápisu.

    - [Seznam znakových entit](http://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML)

## Číselné entity

Kromě entit, které jsou slovně pojmenované, existují ještě tzv. **číselné entity**. Existují dvojího typu:

  - Desítkové – `&amp;#` – číslo – `;`

  - Šestnáctkové – `&amp;x` – kód – `;`

Těmito entitami jdou zapsat úplně všechny znaky.

    - [HTML Character Codes](http://www.7is7.com/software/chars.html) – seznam všech číselných entit.

Číselné entity jde občas použít k obejití různých ochran ve webových aplikacích. Pokud bude například nějaký web v komentářích blokovat řetězec `jecas.cz`, může k obejití stačit nahradit nějaký znak řetězce entitou.

```
jec&amp;#97;s.cz
```

Taktéž se tímto způsobem často podaří obejít minimální limit délky formulářového pole.

Entitou `&amp;#8203;` se zapisuje tzv. **nulová mezera** (mezeru s nulovou šířkou). Skutečná délka je potom mnohem vyšší, než vypadá.

  Délka

## Diakritika

Některé [WYSIWYG](/wysiwyg) editory mají tendenci znaky s **českou diakritikou** převádět na entity. Při správně nastaveném kódování to není nutné.

		`&amp;ecaron;`
		ě

		`&amp;scaron;`
		š

		`&amp;ccaron;`
		č

		`&amp;rcaron;`
		ř

		`&amp;zcaron;`
		ž

		`&amp;dcaron;`
		ď

		`&amp;tcaron;`
		ť

		`&amp;ncaron;`
		ň

		`&amp;uacute;`
		ú

		`&amp;oacute;`
		ó

Používání entit pro diakritiku vytváří nepřehledný zdrojový kód. Převést ho na běžné znaky jde automaticky:

    - [Pročištění a opravení HTML](/vycisteni-kodu)

## Převod entit v PHP

V jazyce PHP existují pro práci s entitami tři funkce:

  - [`htmlentities`](http://php.net/manual/en/function.htmlentities.php) – převede na znakové entity všechny znaky, které převést jde

  - [`html_entity_decode`](http://php.net/manual/en/function.html-entity-decode.php) – převede entity na běžné znaky

  - [`htmlspecialchars`](http://php.net/manual/en/function.htmlspecialchars.php) – převede řídicí znaky HTML (`&lt;`, `&amp;`, `&gt;`), s parametrem `html_entity_decode` i uvozovky (`"`, `'`)

## Odkazy jinam

  - Jak psát web: [Použitelné znakové entity](http://www.jakpsatweb.cz/html/entity-vsechny.html)