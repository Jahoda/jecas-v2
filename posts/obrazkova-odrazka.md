---
title: "Obrázková odrážka"
headline: "Obrázek jako odrážka"
description: "V CSS je možné přidat textu (seznamu) obrázkovou odrážku, jaké to má úskalí a risika?"
date: "2013-09-23"
last_modification: "2013-09-27"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Kaskádové styly používají k obrázkové odrážce vlastnost `list-style-image` s adresou obrázku zadaného do `url()`.

```
element {list-style-image: url(odrazka.png)}
```

  function prohodit(element, trida) {
    element.className = element.className == trida ? "" : trida;
  }

    .inside {list-style-position: inside}

    Text s obrázkovou odrážkou,
 může být i
víceřádkový.
    U obrázkové odrážky vytvořené přes `list-style-image` lze měnit umístění.
    Prohodit umístění odrážky (`list-style-position`)

    Přepnout umístění

Jak je vidět, nastavit přesnou posici obrázku pro `list-style-image` odrážku není možné. Dosáhnout přibližného zarovnání lze docílit nastavením `line-height` shodného s výškou obrázkové odrážky. Jelikož je ale možné **text na webu zvětšovat**, za moc toto řešení nestojí.

## Normální pozadí (`background-image`)

Z výše popsaných důvodů se nabízí používat **obyčejné obrázkové pozadí**:

  Seznamu `&lt;ul&gt;` nebo `&lt;ol&gt;` se **odrážky zruší**:
    ```
ul {list-style: none}
```

  Položkám se přidá levý `padding` o šířce obrázku + něco málo navíc jako odsazení:

    ```
li {padding-left: 30px}
```

  Položkám ne nastaví neopakující se **obrázek** (`no-repeat`):
    ```
li {background: url(odrazka.png) **no-repeat**}
```

    .odrazka {list-style: none; padding-left: 10px}
    .odrazka li {padding-left: 30px; background: url(/files/obrazkova-odrazka/odrazka.png) no-repeat}
    
    .uprostred li {background-position: center left}
    .dole li {background-position: bottom left}

    Text s obrázkovou odrážkou,
 může být i
víceřádkový.
    U obrázkové odrážky vytvořené přes `background` lze měnit umístění.
    Změnit umístění odrážky (`background-position`)

    Vycentrovat
      Dolů
      Nahoru

## CSS sprite a absolutní posicování

Máme-li na stránce kvůli **rychlejšímu načítání obrázky spojené do jednoho** (tzv. *CSS sprite*) a nechceme-li odrážku vyčlenit do zvlášť souboru, nezbývá než posicovat.

```
&lt;ul&gt;
  &lt;li&gt;&lt;span class="**css-obrazek** odrazka"&gt;&lt;/span&gt; Text
&lt;/ul&gt;

```

```
li {position: relative; padding-left: 30px}
.odrazka {position: absolute; left: 0; top: 0}
```

Pro vycentrování doprostřed řádku stačí použít [běžné centrování](/centrovani#absolute), kdy se odrážka umístí na `50%` a polovina výšky obrázku se odečte záporným `margin`em.