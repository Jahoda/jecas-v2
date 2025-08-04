---
title: "Rotace"
headline: "Rotace obsahu"
description: "Napříč prohlížeči funkční řešení vytvoření svislého textu (otočeného o 90 stupňů)."
date: "2013-09-10"
last_modification: "2013-09-11"
status: 1
tags: ["CSS", "CSS vlastnosti", "Hotová řešení"]
---

V novějších prohlížečích (od Exploreru 9) lze pro **otočení textu** nebo jiného libovolného elementu použít CSS vlastnost `transform: rotate(-90deg)`. Pro některé prohlížeče je nutné použít prefix.

    .otocit {transform: rotate(-90deg); -webkit-transform: rotate(-90deg); -ms-transform: rotate(-90deg); width: 4em}
  
  Svisle napsaný text

  Transformaci `rotate` **nejde aplikovat** na řádkové elementy ([`display: inline`](/display#inline)). Je potřeba nastavit `block` nebo `inline-block`.

## Vlastnost `transform-origin`

Tato vlastnost umožní změnit střed otáčení. Výchozí je uprostřed (`center center`).

function otocit(stupne) {  
  var o = document.getElementById("kolik");
  otocny.style.transform = otocny.style.WebkitTransform  = otocny.style.msTransform = "rotate(" + stupne + "deg)";
  o.innerHTML = stupne;
}

function prepocitat() {
  var x = document.getElementById("x-offset");
  var y = document.getElementById("y-offset");
  otocny.style.transformOrigin = otocny.style.WebkitTransformOrigin = otocny.style.msTransformOrigin = x.value + " " + y.value;
  
  otocny.className = x.value + "-" + y.value;
} 

#otocit {
  background: navy;
  width: 100px;
  line-height: 30px;
  margin: 1em;
  color: #fff;
  text-align: center;
  position: relative;
}

#otocit u {
  position: absolute;
  background: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 20;
}

.left-top u {left: -5px; top: -5px}
.left-bottom u {left: -5px; bottom: -5px}
.left-center u {left: -5px; top: 10px}

.right-top u {right: -5px; top: -5px}
.right-bottom u {right: -5px; bottom: -5px}
.right-center u {right: -5px; top: 10px}

.center-top u {left: 50%; margin-left: -5px; top: -5px}
.center-bottom u {left: 50%; margin-left: -5px; bottom: -5px}
.center-center u {left: 50%; margin-left: -5px; top: 10px}

  Otočit o 
  
    **0** stupňů

  X-offset
    
      left
      right
      center

  Y-offset
    
      top
      bottom
      center

  Text 
  
var otocny = document.getElementById("otocit");

Kromě klíčových slov je možné zadávat *offset* v procentech (`50% 50%` odpovídá `center center`) nebo libovolných jiných jednotkách.

## CSS filtr rotace pro starší prohlížeče

Pro starší Explorery je řešení ještě snazší — stačí pro otočení použít filtr.

```
element {
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3)
}
```

### Výsledek

    .otoceny {
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      transform: rotate(-90deg);
      =filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
      width: 4em
    }
  
  Svisle napsaný text

### Kód

*Krásně* zahnojený prefixy, ale měl by napříč prohlížeči zajisit svislé otočení textu.

```
element {
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      transform: rotate(-90deg);
      =filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
      width: 4em
    }
```

### Filtr `Matrix`

Kromě toho [podporují starší Explorerové](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=3&amp;topic=151932#4) filtr `Matrix`, kterým jde provést libovolnou 2D transformaci, tedy i otočení.

Existuje hezký nástroj, který umí CSS transformace převádět do IE a *jeho* `Matrix`u.

IE's CSS3 
Transforms Translator

## Odkazy

  - [Svislé záhlaví tabulek](http://css-tricks.com/rotated-table-column-headers/)