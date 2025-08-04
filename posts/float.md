---
title: "Float v CSS"
headline: "Obtékání v CSS"
description: "Detailní popis obtékání (<code>float</code>) a clearování v CSS, stavba stránky pomocí obtékání, vysvětlení možných risik a úskalí."
date: "2013-09-17"
last_modification: "2013-09-24"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

K čemu je `float`? Zjednodušeně řečeno je to způsob, **jak dostat různé elementy stránky vedle sebe**.

## Vlastnost `float`

*Rozplavání* elementu se zajistí hodnotou `float`, může mít tři hodnoty:

  - `none` (výchozí; element neplave),

  - `left` (element se snaží *doplavat* co nejvíce doleva)

  - `right` (totéž, co `left`, jen plave doprava)

## Vlastnost `clear`

Vlastnost `clear` slouží k tomu, aby element *ukončil obtékání*, tj. takový element (a všechny elementy následující) se nebude snažit připlout k předcházejícím s `float: left` nebo `float: right`.

Clear může nabývat 4 hodnoty:

  - `none` (výchozí),

  - `left` (element neobtéká elementy s `float: left`)

  - `right` (neobtéká elementy s `float: **right**`)

  - `both` (neobtéká nic)

Nejlepší je si to vyzkoušet:

function obnovit() {
  var prvni = document.getElementById("prvni");
  var druhy = document.getElementById("druhy");
  var treti = document.getElementById("treti");
  
  var oddil = document.getElementById("obal").
                getElementsByTagName("div");
  
  for (var i = 0; i 

.obal {padding: 10px; background: #8CCBF0}

.obal p, .obal ul {padding: 0; margin: 0; list-style: none}
.obal div {padding: 10px; border: 1px solid #efefef; width: 150px;
  
}

.prvni {background: #E36FAF}
.druhy {background: #34A3E4}
.treti {background: #7F8DCD}  

  První element

      `float:`
        
          none
          left
          right

      `clear:`
        
          none
          both
          left
          right

  Druhý element

      `float:`
        
          none
          left
          right

      `clear:`
        
          none
          both
          left
          right

  Třetí element

      `float:`
        
          none
          left
          right

      `clear:`
        
          none
          both
          left
          right

### Zajímavé poznatky ohledně obtékání a `clear`ování

  - Budou-li mít všechny elementy nastaveny `float` jinak než na `none`, ***vyplavou* z rodičovského elementu** — proti tomu lze použít právě vlastnosti `clear`.

  - Má-li element s nastaveným `clear`em zároveň `float`, vyplavání nezabrání.

  - Nastavením prvnímu elementu `float: right` a druhému `float: left` lze **prohodit pořadí sloupců**.

  - Pokud se elementy **do dostupného místa nevejdou**, obtékání se očekávaným způsobem neprojeví.

  - Element s nastaveným `float`em se stane blokovým, je-li ve výchozím stavu řádkový, proto je zbytečné nastavovat `display: block`.

  - Ve starších prohlížečích než Explorer 8 nelze `clear`ovat s `inline` elementem.

## Jednoduchý `float`ovaný layout

Jednoduchý dvousloupcový layout stránky pomocí obtékání může vypadat následovně (ještě je přidáno [centrování](/centrovani#centrovani-stranky)):

[Ukázka](http://kod.djpw.cz/rec)
  *([Stejně vysoké sloupce](/stejne-vysoke-sloupce#obrazek) by šlo vyřešit obrázkem.)*

### HTML

```
&lt;div class="stranka">
	&lt;div class="hlavicka">
		&lt;p>Logo&lt;/p>
	&lt;/div>
	&lt;div class="obsah">
		&lt;h1>Název stránky&lt;/h1>
		&lt;p>Obsah&lt;/p>
	&lt;/div>
	&lt;div class="menu">
		&lt;ul>
			&lt;li>&lt;a href="#">Odkaz&lt;/a>&lt;/li>
		&lt;/ul>
	&lt;/div>
	&lt;div class="paticka">
		&lt;p>Patička&lt;/p>
	&lt;/div>
&lt;/div>
```

### CSS

```
.stranka {margin: auto; width: 960px; background: #ccc}
.hlavicka {background: #1081DD; padding: 1em}
.obsah {float: right; width: 600px; padding-left: 30px; background: #E36FAF}
.menu {float: left; width: 330px;  background: #0E5EAD}
.paticka {clear: both; background: #7F8DCD; padding: 1em}
```

### Poznámky

  - Při **počítání šířky**, je-li použit i `padding` nebo `border`, je třeba dát pozor na [`box-model`](/box-model).

  - Po obtékaných (`float`ovaných) elementech je **nutno `clear`ovat**.

## Clearování

Kromě obyčejného **ukončení obtékání** přes `clear: both` (`&lt;div style="clear: both"&gt;&lt;/div&gt;`) existují ještě další možnosti.

  `&lt;br clear=all&gt;`
  V dobách před CSS mohli *plavat* například obrázky a `&lt;br clear=all&gt;` jejich obtékání ukončovalo.

  Funguje dodnes a je to velmi rychlý způsob, jak obtékání ukončit.

  `overflow: hidden`
  U clearování pomocí přenastavení `overflow` z výchozí hodnoty `visible` (`overflow: hidden|auto|scroll`) pro rodiče `float`ovaných elementů je skoro s podivem, že to funguje.

    Vhodné řešení, pokud se nám nechce / není možné **měnit HTML kód** ([ukázka](http://kod.djpw.cz/sec)).

    ```
&lt;div style="overflow: hidden"&gt;
  &lt;div style="float: left; width: 50%"&gt;&lt;/div&gt;
  &lt;div style="float: right; width: 50%"&gt;&lt;/div&gt;
&lt;/div&gt;
```

  `.rodic:after`
  Od **Internet Exploreru 8** lze centrovat elementem vytvořeným [pseudo-elementem `:after`](/css-selektory#before-after).

  ```
.rodic:after {
	content: ".";
	display: block;
	clear: both;
	visibility: hidden;
	line-height: 0;
	height: 0;
}
```

    Ve starších Explorerech lze `clear`ovat [zapnutím `hasLayout`u](/haslayout), tedy například:

    ```
.rodic {
	zoom: 1
}
```

    Tím získáme rovněž řešení, kdy se nemusí zasahovat do HTML kódu a přidávat *čistič* ([ukázka](http://kod.djpw.cz/cfc)).

## Element (obrázek) obtékaný textem

.v-textu {width: 300px}
.obtekany {width: 50px; height: 50px; margin-right: 10px; background: #34A3E4; float: left}

Umístíme-li nějaký element s `float`em **do běžného textu**, text bude kolem elementu obtékat. Může to být například i obrázek.

### Obtékaný elment před nebo za textem

V případě, že obtékaný text má být úplně vlevo nebo úplně vpravo od textu, řešení je následující:

  .pred-za {list-style: none}
  .pred-za .obtekany {width: 15px; height: 15px}

  - Má-li být vlevo, umístí se do kódu před text s `float: left`.
  
  - Má-li být vpravo, umístí se do kódu před text s `float: right`.

## Přesné nepravidelné obtékání

function prohodit(element, trida) {
	element.className = element.className == trida ? "" : trida;
}

.presne-obtekani {
  width: 400px;
  background: #F4F4F4 url(http://jecas.cz/files/float/kimi.jpg) right top no-repeat;
}

  .zvyraznit u {background: rgba(255, 255, 255, .5); margin-left: -4px; border-left: 4px solid red}

.presne-obtekani u {
  float: right;
  clear: right;
  height: 2em;
}

.w2 {width: 2em}
.w3 {width: 3em}
.w4 {width: 4em}
.w5 {width: 5em}
.w6 {width: 6em}
.w7 {width: 7em}
.w8 {width: 8em}
.w9 {width: 9em}
.w10 {width: 10em}
.w11 {width: 11em}

    Text obtékající relativně přesně obrázek. Obrázek je nastaven jako 
      `background: url(obrazek.jpg)` rodiči, kde je tento text.
    V kódu před textem jsou elementy s `float: right` a různou šířkou, 
      které zabírají prostor nad částí obrázku, která nemá být překryta.
    Zvýraznit *překážející* elementy

[Samostatná ukázka](http://kod.djpw.cz/dfc)

## Obtékání s neznámou šířkou

Mohou se obtékat i **elementy s neurčenou šířkou**, je to ale takové nejisté, neb nevíme, kdy se ten či ten element roztáhne a sloupce tak skončí nechtěně pod sebou.

## Odkazy jinam

  - [Floatování na JPW](http://www.jakpsatweb.cz/css/float.html)

  - [How Floating Works](http://bitsofco.de/2015/how-floating-works/) – jak funguje obtékání