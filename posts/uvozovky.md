---
title: "Uvozovky v HTML, CSS, JS, PHP, SQL"
headline: "Uvozovky v HTML, CSS, JS, PHP, SQL"
description: "Jak správně používat uvozovky v HTML, CSS, JavaScriptu, PHP a MySQL."
date: "2015-12-22"
last_modification: "2015-12-24"
status: 1
tags: ["HTML", "JavaScript", "CSS", "PHP", "SQL"]
---

## HTML atributy

V HTML se uvozovky používají pro obalení hodnot atributů.

V řadě (většině) případů se u HTML atributů používají uvozovky zbytečně, ale považuje se to za dobrý zvyk. Někomu se to tak víc líbí, někomu může ouvozovkované hodnoty lépe zvýrazňovat HTML editor:

Někomu může vyhovovat, že nemusí přemýšlet nad případy, kde je možné uvozovky vynechat.

Třeba [odkaz](/odkaz) na `jecas.cz` jde zapsat následovně:

```
&lt;a href=http://jecas.cz>
  Je čas
&lt;/a>
```

Formulářový prvek [`&lt;input>`](/input) může bez problémů vypadat následovně:

```
&lt;input type=checkbox>
```

V podstatě může být v hodnotě atributu bez uvozovek cokoliv kromě:

    Mezery – ukončila by hodnotu atributu. A zbytek by se bral jako další atribut:

    ```
&lt;div class=prvni **druha**>
```

    Znaku `&gt;` – ukončil by HTML značku, čímž by se ukončila i hodnota atributu. Zbytek by se tak stal obsahem značky:

    ```
&lt;div class=prvni>**druha>**
```

W3C doporučení uvádí pro hodnoty atributů bez uvozovek následující:

    - W3C: [Unquoted attribute value syntax](http://www.w3.org/TR/html5/syntax.html#unquoted)
    
    - DJPW: [Proč někdy není potřeba dávat hodnoty vlastností do uvozovek?](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=4&amp;topic=160534)

## CSS

V CSS se uvozovky používají nejčastěji:

    Ve funkci `url` pro nastavování např. obrázkového pozadí:

    ```
background: url("obrazek.png");
```

    Ve funkci [`content`](/content-attr) pro nastavování obsahu:

    ```
div:before {
  content: "Text";
}
```

    V názvech fontů za [`font-family`](/font#font-family).

    ```
div {
  font-family: "New York CE", …;
}
```

    U [atributových selektorů](/css-selektory#atributovy-hodnota):

    ```
div[class="modra"] {
  …
}
```

I tady platí, že uvozovky jsou často zbytečné. Vždy nutné je použít uvozovky u vlastnosti `content`. Mezi dvojitými a jednoduchými nejspíš není rozdíl.

Při používání standardních názvů souborů jde uvozovky bezpečně vynechat u `url`. Názvy fontů vyžadují uvozovky jen v případě, že obsahují čísla a speciální symboly.

CSS selektory potřebují obalit hodnotu selektoru do uvozovek opět jen v případě, že obsahuje nestandardní znaky, které mají zvláštní význam v CSS, například zaměření políčka s názvem „pole[]“ by bez uvozovek nešlo:

```
input[name="pole[]"] {
}
```

Většina lidí uvozovky používá ve všech případech, protože si nechtějí nebo nedokáží zapamatovat, kde jsou uvozovky potřebné, nebo se jim zápis s uvozovkami zkrátka líbí nebo jde opět o pomoc editoru pro zvýrazňování syntaxe.

## Uvozovky v JavaScriptu

[JavaScript](/js) vyžaduje uvozovky kolem řetězců. Jestli jsou uvozovky dvojité `"` nebo jednoduché `'`, nemá na funkci vliv.

```
var promenna = "Text";
window.location = 'index.html';
```

Možnost volit typ uvozovek se hodí při výpisu HTML s atributy. Není potom nutné uvozovky v HTML escapovat.

```
var html = '&lt;div class="a">&lt;/div>';
```

Novější prohlížeče podporující EcmaScript 6 znají ještě jeden typ uvozovek – **zpětnou uvozovku** – pro víceřádkové řetězce.

```
var obsah = `Řetězec 
se zalomením
řádku`;
```

### Znak ```

Znak ``` se v programování nazývá jako zpětná uvozovka (anglicky *backquote* nebo *backtick*). V řadě jazyků se tento znak používá jako [diakritická značka](https://en.wikipedia.org/wiki/Grave_accent).

Na [české klávesnici](/ceska-klavesnice) jde zapsat klávesovou zkratkou Pravý Alt + ý.

### JSON

Drobný rozdíl je v [JSONu](/json), kde jsou vyžadovány dvojité uvozovky. Klíče nebo hodnoty obalené do jednoduchých uvozovek zde nejsou validní. Následující kód proto **není validní JSON**:

```
{
  "klic" : **'**hodnota**'**
}
```

## Uvozovky v PHP

V [PHP](/php) je *většinou* jedno, který typ uvozovek (jednoduché/dvojité) se použije.

Zásadní rozdíl je ale v tom, že v řetězci s dvojitými uvozovkami dojde k automatickému nahrazení proměnné její hodnotou:

```
$a = 1;
echo "Výsledek: $a"; // Výsledek: 1
```

V případě jednoduchých uvozovek se proměnná nenahradí:

```
$a = 1;
echo 'Výsledek: $a'; // Výsledek: $a
```

Pro lepší přehlednost zápisu s dvojitými uvozovkami se někdy ještě používají složené závorky:

```
echo "Výsledek: **{**$a**}**";
```

Hodně lidí ale tuto funkci nevyužívá a řetězce s proměnnými raději spojuje tečkou:

```
echo "Výsledek: " **.** $a;
```

V některých editorech to má vliv na obarvení:

Pro řetězec o více řádcích není v PHP problém použít odřádkování:

```
$obsah = "Řetězec 
se zalomením
řádku";
```

### Heredoc

Někdy se ještě používá pro označení řetězců [heredoc](http://php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc):

```
$obsah = &lt;&lt;&lt;EOT
Řetězec 
se zalomením
řádku
EOT;
```

Výhoda oproti uvozovkám je v tom, že případné další uvozovky uvnitř není nutné escapovat. Tento postup se proto používá třeba k výpisu HTML kódu uvnitř PHP.

Zpětné uvozovky ```` mají v PHP zcela odlišný význam než v JavaScriptu. Slouží k zavolání funkce [`shell_exec`](http://php.net/manual/en/language.operators.execution.php).

## Uvozovky v MySQL

V MySQL se jednoduché uvozovky používají pro obalení řetězců v podmínkách:

```
SELECT FROM tabulka WHERE sloupec = **'**něco**'**
```

Případně:

```
SELECT FROM tabulka WHERE sloupec LIKE **'**%něco%**'**
```

Pro obalení názvů sloupců nebo tabulek jde použít zpětné uvozovky ````:

```
SELECT FROM **`**tabulka**`** WHERE **`**sloupec**`** = 'něco'
```

Zpětné uvozovky se hodí pro případy, kdy identifikátory tabulek či sloupců obsahují zvláštní znaky nebo [reservovaná klíčová slova](http://dev.mysql.com/doc/refman/5.5/en/keywords.html).

Pokud by se třeba sloupec jmenoval `key`, následující dotaz by selhal:

```
SELECT key FROM tabulka
```

Lepší je nejspíš se těmto názvům raději **vyhnout**.

### Jednoduché nebo dvojité

Dvojité uvozovky se v MySQL většinou chovají stejně jako jednoduché. Problém ale může nastat u jiných SQL databasí nebo při změně nastavení [`ANSI_QUOTES` režimu](http://dev.mysql.com/doc/refman/5.6/en/sql-mode.html#sqlmode_ansi_quotes). Dvojité uvozovky se potom mohou začít chovat jako zpětné uvozovky ```.

Nabízí se proto používat raději jednoduché.

## Míchání uvozovek

Pořádná zábava začne v momentě, kdy je potřeba nakombinovat více typů uvozovek kvůli používání různých programovacích jazyků.

Řešení číslo 1: **Nemíchat mezi sebou kód z různých jazyků**.

Při jeho nedodržení je nutné dělat následující:

### Uvozovky v HTML a JavaScriptu

Vypsání `alert`u po [kliknutí](/udalosti-mysi#kliknuti). Uvnitř dvojitých uvozovek jde použít jednoduché:

```
&lt;button onclick="alert('Hláška')">
  Tlačítko
&lt;/button>
```

Co ale v případě, že se po kliknutí na tlačítko má vypsat nějaký HTML kód? Třeba odkaz

```
&lt;div id="vypis">&lt;/div>
&lt;button onclick="vypis.innerHTML = '&lt;a href=**???**>Odkaz&lt;/a>'">
  Tlačítko
&lt;/button>
```

Najednou pro jeho atribut `href` už nezbývají volné uvozovky.

    **Escapování** – pomocí zpětného lomítka `\` (lze zapsat zkratkou Pravý Alt + Q) jde uvozovky tzv. escapovat.

    Escapovat uvozovku kolem hodnoty atributu zpětným lomítkem nejde v rámci HTML, tam k tomu slouží [entity pro uvozovky](/entity#quote) – `&amp;quot;` a `&amp;apos;`.

    Na následující ukázce by se hodnota atributu ukončila ihned druhou dvojitou uvozovkou a vznikl by tak nevalidní kód.

    ```
&lt;button onclick="alert(\**"**Hláška\")">
```

    Jiný typ uvozovky, než se používá pro obalení HTML atributu, ale už escapovat jde:

    ```
&lt;div id="vypis">&lt;/div>
&lt;button onclick="vypis.innerHTML = '&lt;a href=**\'**cil.html**\'**>Odkaz&lt;/a>'">
  Tlačítko
&lt;/button>
```

    **Entity** – *vyplácá-li* se druhý typ uvozovek i jeho escapovaná podoba, další možnost je použít entity:

    ```
&lt;div id="vypis">&lt;/div>
&lt;button onclick="vypis.innerHTML = '&lt;b title=\'Titulek **&amp;quot**;textu**&amp;quot;**\'>Text&lt;/b>'">
  Tlačítko
&lt;/button>
```

    [Živá ukázka](http://kod.djpw.cz/bbtb) – zanoření více uvozovek

### PHP a HTML + JS

Měl-li by se HTML kód s JavaScriptem v uvozovkách vypisovat pomocí PHP, bude nedostatek uvozovek ještě větší.

Na druhou stranu jde escapovat i uvozovku, která obaluje řetězec:

```
echo "&lt;button onclick=\"vypis.innerHTML = '&lt;b title=\'Titulek **&amp;quot**;textu**&amp;quot;**\'>Text&lt;/b>'\">";
```

Vyhnout se nutnosti escapování HTML/JS kódu v PHP jde již zmíněným [heredocem](#heredoc). Nebo přerušením PHP bloku:

```
&lt;?php … ?>
&lt;button>
  HTML obsah
&lt;/button>
&lt;?php … ?>
```

### Oddělení různých jazyků

Jak je vidět na ukázkách, zanořování různých uvozovek není moc přehledné.

V případě JavaScriptu je řešení vyčlenit událost po kliknutí do zvláštní funkce a tu potom připojit:

    - [Navázání událostí v JavaScriptu](/pripojeni-udalosti)

Zbavit se nutnosti zanořovat uvozovky jde i vytvářením HTML kódu metodami `createElement` a nastavování atributů pomocí JS vlastností:

```
var element = document.createElement("div");
element.className = "prvni druha";
element.onclick = funkce;
```

V PHP je potom řešení použít heredoc, přerušení PHP bloku nebo využití nějakého šablonovacího systému a mít tak HTML kód kompletně oddělený od PHP.

## České uvozovky

Nakonec se na webu vyskytují ještě „české uvozovky“ – vypadají visuálně lépe než " nebo '. Zapsat jdou entitami `&amp;bdquo;` a `&amp;ldquo;`.

Pro &sbquo;jednoduché české uvozovky&lsquo; slouží entity `&amp;sbquo;` a `&amp;lsquo;`

Ve [**Windows**](/windows) pro ně ale žádná jednoduchá klávesová zkratka neexistuje.