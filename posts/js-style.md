---
title: "Změna stylů JavaScriptem"
headline: "Změna stylů JavaScriptem"
description: "Jak JavaScriptem nastavovat CSS pro změnu vzhledu jednotlivých elementů."
date: "2014-01-31"
last_modification: "2015-11-13"
status: 1
tags: ["JavaScript", "CSS", "Rady a nápady"]
---

Ke stylu jednotlivých elementů je v JS přístup prostřednictvím vlastnosti `style`.

```
var element = document.getElementById("idecko");
element.**style**.color = "red";
```

Pro CSS vlastnosti s pomlčkou (spojovníkem) se potom spojovník vypustí a následující písmeno po něm zvětší (příklad pro vlastnost `background-color`):

```
element.style.background**C**olor = "red";
```

## CSS prefixy

Rovněž [prefixované](/css-prefixy) vlastnosti jdou JavaScriptem měnit.

Logika je stejná – vypustit spojovník a následující písmeno zvětšit. Vlastnost `**-**webkit**-**animation` tak bude `**W**ebkit**A**animation`:

```
element.style.WebkitAnimation = "animace";
```

Odlišná je situace v **IE**, kde je první písmeno malé:

```
element.style.**m**sTransform = "…";
```

## CSS text

V případě, že je potřeba u jednoho elementu měnit více vlastností, je možné nastavovat vlastnost po vlastnosti:

```
element.style.color = "red";
element.style.padding = "1em";
```

Nebo použít `cssText`, kam se píše normální CSS:

```
element.style.**cssText** = "color: red; padding: 1em";
```

### veinjs

Elegantnější nastavování vlastností nabízí například knihovna veinjs.

```
vein.inject('h1.myHeader', {'color': 'red', 'font-size': '3em'});
```

    - [veinjs](https://github.com/israelidanny/veinjs) – elegantní nastavování CSS v JavaScriptu

Podobný zápis umí i funkce `[css()](http://api.jquery.com/css/)` v **jQuery**.

## Změna CSS třídy

Pokud se nastavovaný vzhled nějak **nezjišťuje a nepočítá skriptem**, nabízí se v JS pouze měnit CSS třídy a příslušné styly mít v CSS souboru.

    - [Přepínání tříd v JS](/prepinani-trid) – jak JavaScriptem měnit třídy

Například:

```
element.className += " nazevTridy";
```

A v CSS:

```
.nazevTridy {
  /* styly */;
}
```

## Připojení CSS

Má-li se skriptem vypočítaný styl aplikovat pro **velké množství elementů**, není potřeba procházet všechny elementy a nastavovat jim vlastnosti/třídy, ale jde skriptem vytvořit přímo CSS a připojit ho do stránky:

```
var css = "p {color: red}";
var styl = document.createElement("style");
styl.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(styl);
```

[Ukázka](http://kod.djpw.cz/kcsb)

Pro **IE 8** a starší i nové prohlížeče zároveň je funkční následující postup:

```
var css = "p {color: red}";
var div = document.createElement('div');
div.innerHTML = '&lt;span>&amp;nbsp;&lt;/span>&lt;style>' + css + '&lt;/style>';
document.getElementsByTagName('head')[0].appendChild(div.childNodes[1]);
```

[Ukázka](http://kod.djpw.cz/lcsb)

Tento postup jde použít třeba pro [vyhledávání pomocí CSS selektorů](/css-vyhledavani#vyhledavani).

## Přečtení hodnoty

Vlastnost `style` nejde používat pro zjištění stylu:

```
&lt;style>
  p {color: red}
&lt;/style>
```

Odstavec bude červený, ale v jeho `style.color` nebude nic:

```
console.log(odstavec.style.color); // nic
```

Zjišťovat skutečný styl jde přes `getComputedStyle`:

    - [Zjištění výsledného CSS v JavaScriptu](/zjisteni-css)