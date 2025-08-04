---
title: "CSS 3 selektory"
headline: "Seznam všech CSS 3 selektorů"
description: "V CSS 3 je spousta selektorů, které s postupným mizením starších prohlížečů může dávat smysl znát."
date: "2013-05-18"
last_modification: "2013-05-18"
status: 1
tags: ["CSS", "CSS selektory"]
---

Podpora „Vše“ znamená všechny relativně běžně používané prohlížeče (cca od Internet Exploreru 6). Některé selektory je možné ve starších IE [rozběhat JavaScriptem](/css3-ie).

document.write("Přepnout ukecanost");

   Zápis/Název

   Význam

   Podpora

   `*`[hvězdičkový selektor](#hvezdickovy)

   Libovolný element.
    Všechny elementy na stránce budou červeně.
    ```
* {color: red}
```

  Všechny elementy v odstavci budou modré.
 ```
p * {color: blue}
```

    Vše

   `E`[typový selektor](#typovy)

   Všechny elementy `E` kdekoliv na stránce.
    ```
div {color: red} /* všechny &lt;div>y budou červené */
```

    Vše

   `E[atribut]`[atributový selektor](#atributovy)

   Element `E` s libovolným (ale nastaveným) atributem `atribut`.
    ```
h1[id] {color: red} /* nadpisy s identifikátorem budou červené */
```

  U elementů, které mají nějaký výchozí typ se tento selektor chová nejednotně napříč prohlížeči – Explorerové 7 a 8 chytí na `[type]` nebo `[type='text']` i `&lt;input>` bez uvedeného typu ([ukázka](http://fiddle.jshell.net/DLsDe/show/)).
    IE 7 +

   `E[atribut="hodnota"]`[atributový s hodnotou](#atributovy-hodnota)

   Element `E` s atributem `atribut` nastaveným na `hodnota`.
    ```
/* checkboxy budou červené */
input[type=checkbox] {background: red}
```

   IE 7 +

   `E[atribut~="hodnota"]`[atributový mezerový](#atributovy-mezerovy)

   Element `E`, u kterého je jeden z vícenásobných atributů (jednotlivé části atributu jsou odděleny mezerou) `atribut` roven hodnotě `hodnota` .
    ```
div[class~="active"] {color}
    Zvýrazní aktivní položku HTML kódu.
      &lt;div class='item **active**'>
```

      Selektor přesného atributu by nezafungoval.
    IE 7+

   `E[atribut^="hodnota"]`[atributový začínající na](#atributovy-zacinajici)

   Element `E` s atributem `atribut` začínající na `hodnota`.
    Odkazy s protokolem HTTPS budou červené.
    ```
a[href^="https"] {color: red}
```

IE 7+

   `E[atribut$="hodnota"]`[atributový končící na](#atributovy-koncici)

   Element `E` s atributem `atribut` končícím na `hodnota`.
  Odkaz na PDF soubor bude červený.
    ```
a[href$=".pdf"] {color: red}
```

IE 7+

   `E[atribut*="hodnota"]`[atributový obsahující](#atributovy-obsahujici)

   Element `E`  s atributem `atribut` obsahující řetězec `hodnota`. 
    ```
a[href*=".php"] {color: red}
```

    Odkaz na `*.php` soubor bude červený, odkaz může mít nějaké parametry za otazníkem.
    (Rozumné využití [CSS vyhledávání](/css-vyhledavani).)
    IE 7+

   `E[atribut|="en"]`[atributový spojovníkový](#atributový-spojovnikovy)

   Element `E`  s atributem `atribut`, který bude mít jednotlivé části atributu odděleny spojovníkem a začíná na `en`.
  Není potřeba používat více tříd (`&lt;span class='icon home'>`).
    ```
span[class|="icon"] {display: block; width: 16px; height: 16px}
.icon-home {background: url("home.png")}
.icon-about {background: url("about.png")}
```

    ```
&lt;span class='icon-home'>&lt;/span>
&lt;span class='icon-about'>&lt;/span>
```

    IE 7+

   `E:root`[kořenový](#korenovy)

   Kořenový element `E` (`&lt;html>`).
    Nedává v HTML moc smysl, protože je to element `&lt;html>`, který je na stránce vždy jeden, tak proč nepoužít `html {}`. 
  Snad jen kvůli hackování starších prohlížečů:
    ```
html {color: red}
:root {background: blue}
```

  V podporujících prohlížečích bude stránka modrá, v nepodporujících červená.
IE 9+
Ukázka

   `E:nth-child(n)`[n-tý potomek](#n-ty-potomek)

   Element `E`, který je n-tým potomkem nadřazeného elementu.
  Druhý odstavec (čísluje se od jedničky) bude červený:
    ```
p:nth-child(2) {color: red}
```

Pseudo-třída `nth-child` je ale mocnější, lze s ní řešit různé věci jako odlišení sudých/lichých řádků, každého n-tého řádku apod.
  ```
tr:nth-child(odd) {color: red}  /* lichý řádek tabulky */
tr:nth-child(even) {color: blue} /* sudý řádek tabulky */

tr:nth-child(4n+1) {color: green} /* každý čtvrtý řádek */

```

     Vyzkoušet si tyto selektory je pohodlně možné na [nth-test.com](http://nth-test.com/).

    IE 9+

   `E:nth-last-child(n)`[n-tý potomek od konce](#n-ty-potomek-odkonce)

   To samé jako `nth-child`, jen se elementy číslují od konce.
IE 9+

   `E:nth-of-type(n)`[n-tý steného typu](#n-ty-typ)

   Podobné jako [`nth-child`](#n-ty-potomek), jen nejde o potomky, ale o sourozence stejného typu (stejné značky).
    IE 9+

   `E:nth-last-of-type(n)`[n-tý steného typu od konce](#n-ty-typ-odkonce)

   Totéž co `nth-of-type`, jen se sourozenci počítají od konce.
    IE 9+

   `E:first-child`
`E:last-child`[první/poslední potomek](#prvni-posledni-potomek)

   První nebo poslední potomek elementu `E`.
  První položka seznamu bude červená a poslední modrá.
    ```
ul li:first-child {color: red} 
ul li:last-child {color: blue}
```

IE 7+
IE 9+

   `E:first-of-type`
`E:last-of-type`[první/posledni typ](#prvni-posledni-typ)

   První/poslední element `E` daného typu v rámci společného rodiče.
  První nadpis první úrovně na stránce bude červený.
    ```
h1:first-of-type {color: red}
```

    Poslední nadpis první úrovně bude modrý.
 ```
h1:last-of-type {color: blue}
```

IE 9+
[Ukázka](http://kod.djpw.cz/lcgb)

   `E:only-child`[jedináček](#jedinacek)

   Zachytí takový element `E`, který je jedináček – nemá žádné sourozence = jeho rodičovský element nemá jiné potomky.
  Nadpis 1 bude jedináčkem.
    ```
&lt;div>
  &lt;h1>Nadpis 1&lt;/h1>
&lt;/div>
```

IE 9+

   `E:only-of-type`[typový jedináček](#typovy-jedinacek)

   Element `E`, který nemá žádné sourozence stejného typu.
  Tedy CSS kód:
    ```
h1:only-of-type {color: red}
p:only-of-type {color: blue}
```

  Obarví v následujícím HTML jen „Nadpis 2“ červeně a „Text 3“ modře.
    ```
&lt;h1>Nadpis 1&lt;/h1>
&lt;div>
  &lt;h1>Nadpis 2&lt;/h1>
  &lt;p>Text.
  &lt;p>Text.
&lt;/div>
&lt;h1>Nadpis 3&lt;/h1>
&lt;p>Text 3
```

IE 9+
[Ukázka](http://kod.djpw.cz/qzvb)

   `E:empty`[prázdný](#prazdny)

   Element `E`, který nemá žádné potomky a ani neobsahuje text.

    ```
&lt;span>&lt;/span>
```

```
span:empty {display: block; padding: 10px; background: red}
```

    IE 9+
[Ukázka](http://fiddle.jshell.net/7BQMb/show/)

    `E:valid`
`E:invalid`[validace](#validace)

      Zachytí, zda je `&lt;input>` řádně vyplněn. Buď v souladu s [atributem `pattern`](/atribut-pattern) nebo s nějakým typem `&lt;input>`u (`url`, `email` apod.).
    IE 10+
[Ukázka](http://kod.djpw.cz/ees)      

   `E:link`
 `E:visited`[odkazové pseudotřídy](#odkazove-pseudotridy)

   Element `E`, tedy odkaz `&lt;a>`, který (ne)byl navštíven.
    Kromě přebíjení selektorů nemá moc smysl `:link` používat, stačí prosté:
    ```
a {color: red}
a:visited {color: blue} /* navštívené odkazy budou modré */
```

Vše

   `E:active`

    `E:hover`

    `E:focus`[pseudotřídy uživatelských akcí](#uzivatelske-akce)

   Element `E` (může být i jiný než odkaz).
    
      `:hover`
        Při najetí myší na element.
      `:active`
        Při kliknutí na element. Ve starších Explorerech funguje jako `:focus`
      `:focus`
        Pokud je element vybrán, například při kliknutí do formulářového pole.
    
    Pro lepší uživatelský komfort bývá vhodné odkazy zvýraznit kromě `:hover`u i při `:focus`u (popř. `:active`).
    ```
a:hover, a:focus, a:active {/* zvýraznění odkazu */}
```

Vše

   `E:focus-within`

   Element `E`, ve kterém se nachází nějaký prvek, který má `:focus`.
     Hodí se pro vytváření rozklikávacích nabídek nezávislých na JavaScriptu.

    Mimo **IE**/**Edge**
[Ukázka](http://kod.djpw.cz/sojc)     

   `E:target`[pseudotřída zaměření](#zamereni)

   Element `E`, na který míří `#kotva` v adrese.

    ```
:target {color: red} /* element s kotvou při odkázání zčervená */
```

IE 9+

   `E:lang(cs)`[jazyková pseudotřída](#lang)

   Potomek elementu s nastaveným atributem `lang` na `cs`.

    ```
&lt;div lang='cs'>
      &lt;p>Text &lt;span>text&lt;/span>
&lt;/div>
```

   Tento `&lt;span>` *podědí* atribut `lang` a lze jej potom zaměřit a obarvit na červeno pomocí:
    ```
span:lang(cs) {color: red}
```

    Domnívám se, že tento selektor nenabízí nic, co by nešlo udělat bez něj.
IE 8+
[Ukázka](http://fiddle.jshell.net/eypdm/show/)

   `E:enabled`
`E:disabled`[povolená/zakázaná pseudotřída](#disabled)

   Tímto selektorem lze ovlivnit vzhled formulářových polí, která (ne)jsou zablokována atributem `disabled`.

    ```
input:disabled {color: red} /* zablokvaný &lt;input> bude červený */
```

IE 9+, nejde v Opeře
[Ukázka](http://kod.djpw.cz/vlb)

   `E:checked`[pseudotřída zaškrtnutí](#checked)

   Zachytí radio button nebo checkbox, který je vybrán, respektive zaškrtnut.
    ```
input:checked {background: red} /* zvolený &lt;input> bude červený */
```

Opakem by měla být pseudotřída `indeterminate`, nicméně zatím nikde nefunguje. Lze využít [negace `:not(:checked)`](#negace).
S tímto selektorem lze v CSS vytvářet docela zajímavé věci.
    IE 9+
[Ukázka](http://fiddle.jshell.net/aPu47/show/)

   `E::first-line`
`E::first-letter`[pseudoelement prvního písmena/řádku](#first-letter-line)

   První řádek/písmeno elementu `E`.

    ```
p::first-line {color: red} /* první řádek zčervená */
p::first-letter {color: blue} /* první písmeno zmodrá */
```

Zajímavé je, že s dvěmi dvojtečkami je zápis funkční až od IE 9 ([ukázka](http://fiddle.jshell.net/StwHy/show/)), ale jen s jednou dvojtečkou funguje všude.
Všude
[Ukázka](http://fiddle.jshell.net/ecrAb/show/)

   `E::before`
`E::after`[obsahové pseudo elementy](#before-after)

   Slouží ke generování nového elementu před/za elementem `E`.
    Lze tak například vygenerovat element určený k ukončení obtékání nebo generovat obsah vlastností `content`.
      
      Kvůli podpoře ve starších **IE** je výhodnější používat zápis jen s jednou dvojtečkou.

    ```
/* přidá text „Nepřehlédněte“ před odstavce */
p:before {content: "Nepřehlédněte: "}
```

Nefunguje u některých elementů, které nemohou obsahovat text, jako `&lt;img>`, `&lt;br>` nebo `&lt;hr>`.
IE 8+

   `E.trida`
 `E#idecko`[identifikátor vs. třída](#id-class)

   Element `E` s třídou `trida`, respektive id `idecko`.
    Z pohledu CSS mezi nimy není přílišného rozdílu (třída má menší váhu). Podle specifikací by ID mělo být unikátní a použitou pouze jednou, prohlížečům to je v CSS celkem jedno.
    Jedno to není JavaScriptu při používání metody `getElementById` nebo při odkazování na #kotvy. Pro přehlednost a jistotu, že ID nebude kvůli JS použito vícekrát, je vhodné řešení, kdy CSS používá jen třídy. A identifikátory jsou jen pro JavaScript a kotvy na stránce. 
    ```
.trida {color: red}
#idecko {color: blue}
```

```
&lt;p class='trida'>Červený text
&lt;p id='idecko'>Modrý text
```

Vše

   `E:not(s)`[negace](#negace)

   Element `E` který nevyhovuje selektoru v závorkách `not`.
Nezaškrtnutý/nevybraný radio button/checkbox bude mít šedivé pozadí.
    ```
input:not(:checked) {background: grey}
```

IE 9+

   `E F`[libovolný potomek](#libovolny-potomek)

   Element F, který je ve stromu dokumentu na větvi elementu `E`. Jinak řečeno element `F` má nějakého libovolně vzdáleného předka `E`.
    Odkaz v nadpise bude červený:
    ```
h1 a {color: red}
```

  Odkaz v seznamu bude modrý:
     ```
ul a {color: blue}
```

     Taktéž by fungovalo:
      ```
ul **li** a {color: blue}
```

      … ale je to zbytečně prodlužování.

    Vše

   `E &gt; F`[přímý potomek](#primy-potomek)

   Element `F` je **přímým** potomkem elementu `E`.

    ```
li > span {color: red}
```

Obarví element &lt;span> v kódu 
&lt;ul>
  &lt;li>&lt;span>Text&lt;/span>
&lt;/ul>
Ale už ne `&lt;li>&lt;a href='#'>&lt;span>Text&lt;/span>&lt;/a>`, protože je mezi `&lt;li>` a `&lt;span`em odkaz.

    IE 7+

   `E + F`[přímý sourozenec](#primy-sourozenec)

   Element `F`, který přímo následuje element `E`.

    ```
div + ul {color: red}
```

Obraví na červeno seznam, který bezprostředně sousedí s `&lt;div>`em:
  ```
&lt;div>Obsah&lt;/div>
&lt;ul>
…
&lt;/ul>
```

Pokud mezi `&lt;div>`em a seznamem bude nějaký jiný element, seznam se neobarví.

    IE 7+

   `E ~ F`[libovolný sourozenec](#libovolny-sourozenec)

   Element `F`, před kterým je někde ve stejné úrovni element `E`.
    Narozdíl od selektoru přímého sourozence zachytí i seznam, který má před nějakým `&lt;div>`em ve stejné úrovni libovolný počet jiných elementů.
IE 7+

    `:fullscreen E`[fullscreen](#fullscreen)

   Element `E` při zobrazení ve fullscreenu (**režimu celé obrazovky**).
     Selektor `:fullscreen` by měl umožňit zvláštní styl v celo-obrazovkovém režimu. Zapisuje se s [prefixy](/css-prefixy), ve **Firefoxu** a **Chrome** navíc se spojovníkem mezi „full“ a „screen“ — `:-moz-full**-**screen`, `:-webkit-full**-**screen` a `:-ms-fullscreen`.

     Bohužel se mi tuto funkčnost nepodařilo v žádném prohlížeči spustit ([kód pro FF](http://kod.djpw.cz/dqs)). Nějaký popis [`:fullscreen`](https://developer.mozilla.org/en-US/docs/Web/CSS/:fullscreen)u je na MDN.

IE 11+

    `E:indeterminate`[indeterminate](#indeterminate)

      Funguje jen u značek [`&lt;input type=checkbox>`](/input#type-checkbox) a [`&lt;progress>`](/progress).

      Má smysl pro vytváření třístavového `checkbox`u (*Vybrat vše*), 
        kdy `indeterminate` znamená, že jsou zaškrtnuty jen některé položky.
      Nastavit *neurčitý* stav je možné jen JavaScriptem.

      ```
document.getElementById("checkbox").indeterminate = true;
```

    IE 9+
[Ukázka](http://kod.djpw.cz/jxs)

    `E:optional`[optional](#optional)

      Funguje jen u značek [`&lt;input>`](/input), které není povinné vyplnit, tj. nemají atribut [`required`](/input#required).

      **Opakem** je selektor [`:required`](#required).

    IE 10+
[Ukázka](http://kod.djpw.cz/oys)

    `E:required`[required](#required)

      Funguje jen u značek [`&lt;input>`](/input), které **je povinné vyplnit**, tj. **mají** atribut [`required`](/input#required).

      Opakem je selektor [`:optional`](#optional).

      Pro zaměření políčka, které je správně/špatně vyplněno slouží selektory [validace](#validace) (`:valid`/`:invalid`).

    IE 10+
[Ukázka](http://kod.djpw.cz/pys)

          `E::placeholder`[placeholder](#placeholder)

      Umožnuje stylovat obsah [atributu `placeholder`](/placeholder) (zástupný znak v [`&lt;input>`u](/input)).

    IE 10+
[Ukázka](http://kod.djpw.cz/nldb)

          `E:read-only`[read-only](#read-only)

      Umožnuje stylovat [`&lt;input>` s atributem `readonly`](/input#readonly), který je určen jen ke čtení.

      ```
&lt;input **readonly**>
```

      Zaměřit `readonly` element se ale dá i přes [atributový selektor](#atributovy):

      ```
input[readonly] {}
```

    Chrome, Firefox
[Ukázka](http://kod.djpw.cz/qldb)

          `E:read-write`[read-write](#read-write)

      Umožnuje zaměřit `&lt;input>`, který nemá atirbut `readolny`.

      Zajímavé je, že atribut `disabled` nevadí a takový `&lt;input>` tedy selektor `read-write` zachytí.

      Pro starší prohlížeče je možné použít [atributový](#atributovy) selektor s [negací](#negace) (**IE 9+**):

      ```
input[type=text]:not([readonly]) {}
```

    Chrome, Firefox
[Ukázka](http://kod.djpw.cz/rldb)

          `E:default`[default](#default)

      Zaměří **výchozí odesílací tlačítko**. Hodí se v případě, že je ve formuláři více tlačítek (`&lt;input type=submit>`/`&lt;button>`).

      Zvýrazněné bude to, které by se *použilo* při stiknutí Enteru.

    Chrome, Firefox
[Ukázka](http://kod.djpw.cz/sldb)

## Síla selektorů

    - [Specificity Calculator](http://specificity.keegan.st/) – visuální znázornění síly CSS selektorů