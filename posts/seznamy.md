---
title: "HTML seznamy"
headline: "HTML seznamy"
description: "Přehled všech typů seznamů, které se v HTML používají."
date: "2015-07-10"
last_modification: "2015-07-23"
status: 1
tags: ["HTML", "HTML značky"]
---

Seznamy jsou na webových stránkách užitečný nástroj, jak **zpřehlednit** obsah – zvlášť u delšího textu.

Řada návštěvníků nečte web písmeno po písmenku, řádek po řádku, ale hledá různé **visuálně odlišné prvky**, kterých se mohou očima *chytit*.

To může být:

  - **tučný** text,

  - [nadpis](/nadpisy),

  - [citace](/citace),

  - obrázek,

  - tabulky

A právě **seznamy**.

## Položka seznamu `&lt;li>`

Základním prvkem seznamů je položka `&lt;li>`.

Příklad zápisu:

```
&lt;li>Položka seznamu&lt;/li>
```

Pro obalení jednotlivých položek seznamu se používá značka `&lt;li>` – anglicky *list item* (položka seznamu).

Jedná se o značku s [nepovinnou koncovou značkou](/html-znacky#koncova-volitelna). Zápis tak může vypadat i následovně (položka se sama ukončí o další `&lt;li>` nebo konec seznamu):

```
&lt;li>Položka
&lt;li>Další položka
```

Měla by být umístěna v obalu definujícím seznam – např. `&lt;ul>` nebo `&lt;ol>`, teoreticky ale funguje i bez toho.

    - Položka mimo seznam

    - Jiná položka

Značka `&lt;li>` má v CSS stejnojmennou hodnotu vlastnosti [`display`](/display) – `display: list-item`.

### Obsah značky `&lt;li>`

Do položky seznamu jde vložit v podstatě libovolnou jinou značku – odstavce, nadpisy nebo **další seznam**.

### Atributy značky `&lt;li>`

Kromě [obecných atributů](/obecne-atributy) jako je `class`, `id`, `title` a podobně, existují další dva:

  `value`
  
    U číslovaného seznamu `&lt;ol>` slouží k nastavení pořadí položky.

    ```
&lt;ol>
  &lt;li **value**="5">Položka s pořadovým číslem 5&lt;/li>
&lt;ol>
```

    Číslo se nastavuje i v případě, že je seznam nečíselného typu. Pořadí se potom převede třeba na písmena:

      - Pátá položka

      - Šestá položka

      - Druhá položka

  `type`
  
    Jde použít pro změnu stylu *číslování* pro konkrétní položku seznamu `&lt;ol>`.

      - písmena

      - římské číslice

      - číslice

    Případně pro změnu stylu odrážek v `&lt;ul>`.

      - puntík

      - kruh

      - čtvereček

    V HTML 5 je atribut `type` u položky `&lt;li>` považován za **zastaralý a je [nevalidní](/validita)**.

    Pro vyhovění specifikaci je nutné používat CSS vlastnost [`list-style-type`](/list-style#type).

    Přímo u seznamu `&lt;ol>` je atribut `type` validní i v HTML 5, na rozdíl od HTML 4.01 Strict.

## Nečíslovaný seznam `&lt;ul>`

Asi nejčastěji je používán nečíslovaný seznam `&lt;ul>`. Jednotlivé odrážky seznamu, které tvoří značka `&lt;li>`, bývají typicky označeny puntíkem.

    - Položka

    - Jiná položka

Styl odrážek jde změnit atributem `type` nebo CSS vlastností `list-style-type`.

## Číslovaný seznam `&lt;ol>`

Význam zkratky `&lt;ol>` je *ordered list* – číslovaný seznam.

Oproti seznamu `&lt;ul>` má zvláštní schopnost – odrážky **číslují pořadí** bez přičinění tvůrce kódu. To je pohodlné, protože není potřeba číslování **ručně přepisovat**, když se změní pořadí odrážek.

```
&lt;ol>
  &lt;li>První položka&lt;/li>
  &lt;li>Druhá položka&lt;/li>
&lt;/ol>
```

    - [CSS `counter`](/counter) – způsob, jak automaticky číslovat i jiné věci než **číslovaný seznam**

### Atributy `&lt;ol>`

  `start`
  
    Položky jsou standardně číslovány od 1 (případně od *a* nebo *I* v případě písmen nebo římských číslic).

    Změnit počátek číslování umí atribut `start`. Zapisuje se **vždy jako číslo** (i v případě použití římských číslic nebo písmen).

  - První položka

  - Druhá položka

  - Třetí položka

    Upravená číslice pořadí atributem `start` jde *přebít* atributem `value` pro položku `&lt;li>`.

  `reversed`
  
    Slouží pro otočení pořadí číslování. Čísluje se potom **od konce** seznamu:

  - První položka

  - Druhá položka

  - Třetí položka

## Stylování seznamů

Pro změnu vzhledu seznamů, **obrázkové odrážky** a další se používá CSS vlastnost `list-style`, podrobněji se jí věnuje samostatný článek:

    - [Styl odrážkového seznamu](/list-style) – kompletní přehled CSS vlastnosti `list-style`

## Ruční vytváření seznamů

Obsah vypadající jako seznam jde vytvářet i bez značek `&lt;ul>`, `&lt;ol>` a `&lt;li>`.

Číslovaný:

  1. První položka

2. Druhá položka

Nečíslovaný:

  • Položka

• Další položka

Sémanticky čistší a většinou **pohodlnější** je používání skutečných seznamů. V některých primitivnějších systémech pro psaní obsahu ale nemusí být jiná možnost.

## Definiční seznam `&lt;dl>`

Definiční seznam je něco mezi nečíslovaným seznamem a jednoduchou tabulkou o dvou sloupcích.

Hodí se pro případy, kde existují dvojice typu *termín* — *definice*.

```
&lt;dl>
  &lt;dt>Je čas&lt;/dt>
  &lt;dd>Web o moderní tvorbě webových stránek&lt;/dd>
&lt;/dl>
```

Samotná značka `&lt;dl>` (*definition list*) tedy slouží jako **obal** pro značky `&lt;dt>` a `&lt;dd>`  – podobně jako `&lt;ul>` a `&lt;ol>` je obal pro `&lt;li>`.

  `&lt;dt>` (*definition term*)
  
    Označuje termín, který se bude definovat.

  `&lt;dd>` (*definition description*)
  
    Obsahuje popis dříve definovaného termínu.

K jednomu termínu (`&lt;dt>`) může být více definic (`&lt;dd>`), stejně tak více termínů může mít jedinou definici nebo více termínů může mít více definic.

```
&lt;dl>
  &lt;dt>Je čas&lt;/dt>
  &lt;dd>Web o moderní tvorbě webových stránek&lt;/dd>
  &lt;dd>Nějaký další význam&lt;/dd>
&lt;/dl>
```

Výchozí vzhled definičního seznamu odsazuje zleva popis (`&lt;dd>`), definice a popis jsou potom na zvláštních řádcích – všechny tři značky definičního seznamu jsou blokové ([`display: block`](/display#block)).

Pomocí [obtékání](/float) jde `&lt;dt>` a `&lt;dd>` umístit i vedle sebe.

### HTML značky v definičních seznamech

Do značek `&lt;dt>` a `&lt;dd>` jde umístit prakticky jakýkoliv další element nebo další **definiční seznam**.

### Využití

Kromě vysvětlování pojmů bývají definiční seznamy někdy používány i pro:

  Formuláře

        Políčko

  Diskusní příspěvky / komentáře

        Autor
        Text příspěvku

  Seznam zdrojů

        [HTML seznamy](/seznamy)
        Kompletní přehled používání seznamů v HTML

## Vliv seznamů na SEO

Existují názory, že používání seznamů má **positivní vliv** na umístění stránky ve **výsledcích vyhledávání**. Jelikož používání seznamů zpravidla **přináší kladný efekt** pro návštěvníky, dává smysl, aby přítomnost seznamů přinášela SEO výhodu.

      404m.com: [Seznamy s puntíky a čísly vs SEO](http://404m.com/2015/06/08/seznamy-s-puntiky-a-cisly-vs-seo/)

## Seznam `&lt;menu>`

Značka `&lt;menu>` se v praxi zobrazuje obdobně jako nečíslovaný seznam `&lt;ul>`.

V HTML 4 byla zavržena (*deprecated*), v HTML 5.1 jí byl vymyšlen nový způsob užití – pro označení ovládacích prvků, kontextových a jiných nabídek.

Místo položek `&lt;li>` se v této nové podobě `&lt;menu>` používají značky `&lt;menuitem>`.

    - [Kontextová nabídka `&lt;menuitem>`](/menuitem)

## Výpis souborů `&lt;dir>`

V prohlížečích se chová obdobně jako `&lt;ul>` a `&lt;menu>`. Značka `&lt;dir>` je dle HTML specifikace překonaná a měl by se místo ní používat seznam `&lt;ul>`.

V minulosti sloužila pro označení **výpisu souborů ze složky**. Nabízí se analogie k příkazu `dir` z **příkazové řádky**.

## Atribut `compact`

V dávné minulosti fungoval u seznamů atribut `compact` pro **zhuštění informací** v seznamu.

Při použití na definiční seznam se zobrazoval termín i jeho popis vedle sebe.

Funguje v **Internet Exploreru 7**, v novějších už ne. [Ukázka](http://kod.djpw.cz/qdob).

## Odkazy

  - [Listify](http://enrmarc.github.io/listify/) – převede prostý text na `&lt;ul>` či `&lt;ol>` seznam

.live dt {
    list-style: none;
}