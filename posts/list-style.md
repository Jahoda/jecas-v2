---
title: "Styl seznamu list-style"
headline: "Styl odrážkového seznamu"
description: "CSS vlastnost <code>list-style</code> upravuje vzhled seznamů <code>&lt;ul></code> a <code>&lt;ol></code>."
date: "2015-01-21"
last_modification: "2015-02-23"
status: 1
tags: ["CSS", "Stylování elementů", "CSS vlastnosti", "Hotová řešení", "CSS pravidla"]
---

Pro lepší přehlednost se obsah webových stránek kromě do nadpisů a odstavců zadává i do **seznamů**.

  Pokročilejší čtenáři mohou v klidu přeskočit na:

    - [Pravidlo `@counter-style` a `symbols`](#counter-style-symbols)

Používají se dva základní typy odrážkových seznamů:

    `&lt;ul>` (*unordered list*) – nečíslovaný seznam

        - Položka

        - Položka

        - Položka

    `&lt;ol>` (*ordered list*) – číslovaný seznam

        - Položka

        - Položka

        - Položka

Kromě toho existují ještě značky `&lt;menu>` a `&lt;dir>`. Obě se v prohlížečích chovají přibližně stejně jako `&lt;ul>`. Element `&lt;dir>` je „*obsolete*“ – zastaralý, překonaný. Značku `&lt;menu>` původně čekal stejný osud, ale nakonec byla znovuzrozena pro [kontextovou nabídku](/menuitem) s využitím značky `&lt;menuitem>`.

[Srovnání](http://kod.djpw.cz/dwkb) seznamů `&lt;ul>`, `&lt;menu>` a `&lt;dir>`.

Nakonec existujte ještě seznam definiční – `&lt;dl>`, ten ale ve výchozím stylu žádné odrážky nemá.

## Stylování

Pro jiný než výchozí styl seznamů existuje vlastnost `list-style`. Pomocí `list-style` v kombinaci s `display: list-item` jde také vytvořit odrážky z jiných elementů než `&lt;li>` ([ukázka](http://kod.djpw.cz/bvkb)).

### Zápis

```
ul {
  list-style: **typ** **umístění** **obrázek**;
}
```

Vlastnost `list-style` je zkratkou pro další `list-style-*` vlastnosti:

  - `list-style-type` (typ),

  - `list-style-position` (umístění),

  - `list-style-image` (obrázek)

Vzhled stylu seznamu jde nastavovat pro **celý seznam** (`&lt;ul>`/`&lt;ol>`) nebo pro **jednotlivé položky** `&lt;li>` (položky mají vyšší váhu).

### `list-style-type`

Stanovuje typ odrážky. Pro nečíslovaný seznam (`&lt;ul>`) připadají v úvahu.

- puntík – `list-style-type: disc`

- kolečko – `list-style-type: circle`

- čtvereček – `list-style-type: square`

Pro **číslované seznamy** je potom plno několik stylů čísel.

- číslo – `list-style-type: decimal`

- číslo s nulou na začátku – `list-style-type: decimal-leading-zero`

- římské číslice – `list-style-type: lower-roman`

- velké římské číslice – `list-style-type: upper-roman`

- malá řecká písmena – `list-style-type: lower-greek`

- malá písmena – `list-style-type: lower-latin`

- velká písmena – `list-style-type: upper-latin`

- malá písmena – `list-style-type: lower-alpha`

- velká písmena – `list-style-type: upper-alpha`

Existuje jich ještě mnohem víc pro různé exotické jazyky (např. `hiragana`, `katakana`, `mongolian` atd.).

Zajímavé je, že `list-style-type` je **nezávislý** na typu seznamu (`&lt;ul>`/`&lt;ol>`). Číslovaný seznam se tak může stát nečíslovaným a obráceně.

V případě **zanoření více seznamů** do sebe se typicky (dle výchozích stylů prohlížečů) mění styly jednotlivých úrovní.

U **nečíslovaných seznamů** (`&lt;ul>`) se v prvních třech úrovních vyskytne tečka, kolečko a čtvereček. V následujících úrovních už je pouze čtvereček.

Nastavit pro všechny úrovně to samé (puntík – `disc`) dokáže prostý kód:

```
ul {
    list-style: disc;
}
```

Nastavit si vlastní styl pro **jednotlivé úrovně** jde nějak takto:

```
ul {
    list-style: circle;
}
ul ul {
    list-style: square;
}
ul ul ul {
    list-style: disc;
}
```

U **číslovaných seznamů** se podobná změna stylu na základě úrovně ve všech rozšířenějších prohlížečích nekoná.

  [Ukázka](http://kod.djpw.cz/zukb) – testovací stránka zanořených seznamů

### Umístění `list-style-position`

Odrážky položek seznamu mohou mít dvojí umístění.

- mimo – `list-style-position: outside`

- uvnitř – `list-style-position: inside`

Rozdíl `outside` (výchozí) a `inside` je zvlášť patrný u víceřádkových položek, kde vypadá `inside` většinou špatně.

Odrážka/číslo v případě umístění venku (`outside`) se zobrazuje **mimo element** `&lt;li>`, je tedy nutné, aby byl okolo prostor, má-li se odrážka zobrazit. Ve výchozím CSS proto mají prohlížeče pro seznamy levý `padding` o hodnotě 40 pixelů.

### Obrázková odrážka `list-style-image`

Jako odrážku jde použít i obrázek.

```
ul {
  list-style-image: url(odrazka.png);
}
```

V drtivé většině případů ale není `list-style-image` k užitku, protože chybí **kontrola nad umístěním** obrázku. Pokud není obrázek odrážky ve velikosti řádku, nebude správně zarovnaný. Jelikož písmo může být **různě velké**, nejde na to spoléhat, takže je lepší `list-style-image` vůbec **nepoužívat**.

Pro **obrázkové odrážky** se proto používá využívá běžné pozadí (`background`) pro `&lt;li>` nebo absolutně posicované [`:before`/`:after`](/css-selektory#before-after) elementy, kde si jde s požadovaným umístěním vyhrát.

    - [Obrázkové odrážky stejné ve všech prohlížečích](http://teststranek.kvalitne.cz/odrazky1/) – srovnání odrážek přes `list-style-image` a `background`

## Pravidlo `@counter-style` a `symbols`

Pro možnost si nadefinovat vlastní styl odrážek a číslování bez používání různých hacků v podobě `:before`/`:after`, obrázků a posicování jde od **Firefoxu 33** používat `@counter-style` a `symbols`.

### `@counter-style`

Zápis celého stylu může vypadat následovně:

```
@counter-style **cisla** {
/* opakování symbolů (cyclic, fixed, …) */
  system: cyclic;
/* symboly */
  symbols: 'tři' 'dva';
/* znaky před symbolem */
  prefix: "";
/* znaky po symbolu */
  suffix: ") ";
/* rozsah, kde se symboly použijí */
  range: 2 3;
/* co má číst hlasová čtečka */
  speak-as: numbers;
}
```

Styl se potom připojí podle svého názvu do `list-style`:

```
ul {
  list-style: **cisla**;
}
```

Výsledek bude následovný:

[Živá ukázka](http://kod.djpw.cz/vukb) – **Firefox 33**+

### Funkce `symbols`

Symbols je potom funkce, která se dá použít přímo v `list-style` bez nutnosti deklarovat styl pomocí `@counter-style`. Stejných výsledků jde dosáhnout oběma způsoby – `@counter-style` se hodí pro deklaraci stylů v rámci celého CSS, aby se styly nemusely v kódu opakovat a šly snadno **změnit na jednom místě**.

Příklad použití `smybols`:

```
ul {
    list-style: symbols(cyclic '✔');
}
```

[Živá ukázka](http://kod.djpw.cz/wukb) – použití `symbols`

[Živá ukázka](http://kod.djpw.cz/tukb) – totéž s `@counter-style`

  - Hacks.mozilla.org: [Introducing @counter-style](https://hacks.mozilla.org/2015/02/introducing-counter-styles/) – kompletní přehled vlastností použitelných v `@counter-style`/`symbols`

## Vlastní styl odrážky

Ve starších prohlížečích jde vlastní textové odrážky dosáhnout [absolutním posicováním](/position#absolute) pseudo-elementu `:before` nebo `:after`.

ul.fajfka {
    list-style: none;
}

.fajfka li {
    position: relative;
}

.fajfka li:before {
    position: absolute;
    content: "✔";
    left: -1.5em;
}

    - Odrážka

    - Odrážka

[Samostatná živá ukázka](http://kod.djpw.cz/xukb)

### Odlišná barva odrážky

Ani pro **jinou barvu odrážky a obsahu položky** neexistuje elegantní řešení. Jedna možnost je **obalit** obsah v `&lt;li>`:

        Text položky

**Barva odrážky** se bere z barvy (`color`) položky. Takže není možné nastavit jednu barvu pro `&lt;ul>`/`&lt;ul>` a druhou pro `&lt;li>`.

Pokud je komplikované měnit HTML kód (aby byl kolem obsahu v `&lt;li>` další element), nezbývá něž opět odrážku vytvořit pomocí `:before` a vhodně ji naposicovat.

ul.ruzna-barva {
    list-style: none;
}

.ruzna-barva li {
    position: relative;
    color: #0D6AB7;
}

.ruzna-barva li:before {
    position: absolute;
    content: "•";
    left: -1em;
    color: #DA3F94;
}

    - Odrážka

    - Odrážka

### Odlišný styl a číslování

S využitím CSS vlastnosti [`counter`](/counter) (**IE8**+) jde postup s `:before` odrážkou použít i pro číslování v odlišném stylu.

ol.ruzna-barva-cislo {
    list-style: none;
    counter-reset: seznam;
}

.ruzna-barva-cislo li {
    position: relative;
    color: #0D6AB7;
}

.ruzna-barva-cislo li:before {
    counter-increment: seznam;
    content: counter(seznam);  
    position: absolute;
    left: -1em;
    color: #DA3F94;
}

    - Odrážka

    - Odrážka

[Samostatná živá ukázka](http://kod.djpw.cz/yukb) – zajímavější styl číslování

## Odkazy jinam

  - MDN: [`list-style`](http://devdocs.io/css/list-style)

  - Jak psát web: [Vlastnost `list-style`](http://www.jakpsatweb.cz/css/list-style.html), [Seznamy v HTML](http://www.jakpsatweb.cz/html/seznamy.html)