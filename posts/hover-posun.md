---
title: "Plynulé posouvání :hover efektu"
headline: "Plynule se posouvající :hover efekt"
description: "Jak v CSS/JS vytvořit u navigace plynule přesouvaný hover efekt."
date: "2014-09-26"
last_modification: "2014-09-28"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Animace"]
---

Cílem je vytvořit `:hover` efekt, který se bude **plynule** přesouvat mezi jednotlivými položkami ve **vodorovném menu**.

## Čisté CSS

HTML kostra bude vypadat následovně:

```
&lt;div class="menu">
    &lt;a href="">Odkaz&lt;/a>
    &lt;a href="">Odkaz&lt;/a>
    &lt;a href="">Odkaz&lt;/a>
    &lt;span>&lt;/span>
&lt;/div>
```

Zvýrazňující prvek bude prázdný element (`&lt;span>`) například (záleží na fantasii při tvorbě) s nastaveným pozadím (`background`) a spodním rámečkem (`border-bottom`), který se [absolutně](/position#absolute) naposicuje za odkaz (pomocí `z-index`u).

Rozměry se mu nastaví s ohledem na velikost jednotlivých odkazů v menu. To tedy implikuje, že **šířka odkazů bude pevná**.

```
.menu a {
  width: 100px;
  float: left;
  position: relative;
  z-index: 1;
}
/* zvýrazňovač */
.menu span {
  position: absolute;
  width: 100px;
  background: #1081DD;
}

```

### `:hover`

Při najetí na odkaz (`.menu a:hover`) nastavíme zvýrazňovacímu `&lt;span>`u posici dle odkazu, na který se najelo.

Pro zaměření konkrétní položky využijeme od **IE 9** [selektor `nth-child`](/css-selektory#n-ty-potomek) (případně obyčejné třídy pro starší prohlížeče):

```
.menu a:nth-child(1) {/* první odkaz */}
```

Pro zaměření zvýrazňovacího `&lt;span>`u potom poslouží [selektor libovolného sourozence](/css-selektory#libovolny-sourozenec) (od **IE 7**) – to je ta vlnovka ([takto ji lze napsat](/ceska-klavesnice#pravy-alt)):

```
.menu a:nth-child(1):hover **~** span {
  /* zvýrazňovací span při hoveru 1. odkazu */
}
```

Tato pravidla se musí vytvořit pro **každý jeden odkaz**, lišit se budou jen hodnotou `left`, která umístí *zvýrazňovač* na požadovanou posici.

### Animace

Nyní zbývá už jen zajisti plynulý přechod k čemuž využijeme [`transition`](/transition) vlastnosti `left`.

```
.menu span {
  transition: left .2s;
}
```

[Živá ukázka](http://kod.djpw.cz/byfb)

## Řešení v JavaScriptu

Jelikož řešení v *čistém CSS* trpí **řadou problémů**:

  - **pevná šířka**,

  - **neelegantní CSS kód**,

  - nemožnost mít odkazy ve **více řádcích**,

  - při odjetí a najetí z/na menu *zvýrazňovač* přiletí z levé záporné posice.

Hodí se pro jejich odstranění využít špetky **JS**.

Stačí jen při najetí na odkaz (`onmouseover`) *překopírovat* výšku, šířku, umístění zleva a umístění shora od odkazu do zvýrazňovacího `&lt;span>`u.

```
zvyraznovac.style.left = this.offsetLeft + "px";
zvyraznovac.style.top = this.offsetTop + "px";
zvyraznovac.style.width = this.offsetWidth + "px";
zvyraznovac.style.height = this.offsetHeight + "px";
```

Původní `transition` zajistí **plynulý přesun**.

[Živá ukázka](http://kod.djpw.cz/cyfb)

Tento JS kód bude fungovat i pro **navigaci svislou** – [ukázka](http://kod.djpw.cz/dyfb) či **víceřádkovou** – [ukázka](http://kod.djpw.cz/eyfb).