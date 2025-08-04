---
title: "Výběr barvy (color picker)"
headline: "Výběr barvy"
description: "Jak umožnit uživateli vybrat barvu z palety (pomocí JavaScriptu i bez JS)."
date: "2013-11-18"
last_modification: "2013-11-20"
status: 1
tags: ["HTML", "JavaScript", "Hotová řešení"]
---

Má-li návštěvník na webu **zadávat barvu**, můžeme mu vybírání zpříjemnit zobrazením **barevné palety**.

## Element `&lt;input type=color>`

HTML 5 přišlo s novým typem `&lt;input>` pro **výběr barvy**. Momentálně funguje jen v **Opeře** a **Chromu**. Ve Firefoxu ani v [IE 11](/ie11) nikoliv.

```
&lt;input type="**color**" value="#fff">
```

Do atributu `value` je možné uvést výchozí hodnotu, jinak se barva nastaví automaticky na černou (`#000000`).

  Vybrat barvu: 

  Jaká je barva?

Hezké na tomto řešení je, že se zobrazuje standardní okno pro **míchání barev**, které by mohlo být návštěvníkům webu **povědomé**.

## CSS paleta

Teoreticky si lze sestavit paletu z `radio` `&lt;input>`ů a využít [selektoru `:checked`](/stylovani-checked) (od **IE 9**).

    .paleta label {float: left; width: 20px; height: 20px; border: 2px solid transparent}
    .paleta [for=cervena] {background: red}
    .paleta [for=modra] {background: blue}
    .paleta [for=zelena] {background: green}
    .paleta [for=zluta] {background: yellow}
    .paleta [for=cerna] {background: black}    
    .paleta :checked+label {border-color: purple;}
    .paleta input {display: none}

      Vybrat barvu:

Jaká je barva?

## JavaScriptová paleta barev

Jelikož má `&lt;input type=color>` i [selektor `:checked`](/css-selektory#checked) ne úplně nejlepší podporu, je třeba zvolit nějaké **JS řešení**.

### JSColor

Jednoduché **míchátko** pro **výběr barvy**. Stačí připojit jeden JS soubor, nahrát 4 obrázky a `&lt;input>` *aktivovat*:

```
&lt;input **class="color"**>
```

[Web](http://jscolor.com/)

### Color mixer aneb míchátko

Ještě datově menší *color picker*. Lze rovněž [použít](http://www.dgx.cz/tools/colormixer/stripe.php) pro `&lt;input>`, jen možná trochu nelogicky vyžaduje stisk tlačítka *OK* (nebo dvojklik) po **namíchání barvy**.

[Web](http://phpfashion.com/color-mixer-aneb-michatko)

### jQuery MiniColors

Asi nejlepší nástroj **založený na jQuery**, podporuje různé styly míchání.

[Web](http://labs.abeautifulsite.net/jquery-minicolors/) [Demo bez Bootstrapu](http://labs.abeautifulsite.net/jquery-minicolors/without-bootstrap.html)

## Jak JS color picker funguje?

Jak se dá takové okno pro výběr barvy **naprogramovat**? Zjednodušeně řečeno se může vycházet z HSL modelu (odstín, saturace (intensita/sytost barvy), světlost) a z něj barvu převádět do RGB (`rgb(255, 0, 0)`) nebo šestnáctkového zápisu (`#ff0000`).

    .barva {width: 100px; height: 50px; background: hsl(180, 50%, 50%)}

    function prebarvit() {
      var h = document.getElementById("h").value;
      var s = document.getElementById("s").value;
      var l = document.getElementById("l").value;
      document.getElementById("barva").style.background = "hsl(" + h + ", " + s + "%, " + l + "%)";
    }
  
  Odstín: 
  Sytost: 
  Světelnost: 

Finální podoba color pickeru už je jen na fantasii tvůrce. Kvůli podpoře starších prohlížečů (HSL zápis umí až **IE 9**) se může vše rovnou přepočítávat do RGB/hexa a s HSL ve skutečnosti **vůbec nepracovat**, ale jen využívat tento **princip míchání barev**.

## Odkazy jinam

  - [Paleta s *pojmenovanými* barvami](http://clrs.cc/)