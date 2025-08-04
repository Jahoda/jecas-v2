---
title: "CSS flip (animované otočení)"
headline: "CSS flip a animace"
description: "Jak v CSS otočit obsah kolem svislé nebo vodorovné osy."
date: "2014-09-04"
last_modification: "2014-09-11"
status: 1
tags: ["CSS", "Hotová řešení", "Animace"]
---

Od **IE 9** fungují v prohlížečích transformace za použití CSS vlastnosti `transform`. Jedním z mnoha, co tato vlastnost nabízí, je **svislé a vodorovné otočení**.

Pro **Chrome 35**, **IE 9** a **Safari 8** jsou nutné [prefixy](/css-prefixy). Ve staré **Opeře 12** otočení podle osy nefunguje (podporuje jen klasické [otočení](/rotace)).

## Zápis

```
.svisle-otoceni {
  transform: rotate**Y**(20deg);
}
.vodorovne-otoceni {
  transform: rotate**X**(20deg);
}
```

Funkce `rotate**Y**` a `rotate**X**` zajistí otočení kolem svislé, respektive vodorovné osy. Hodnota se zadává jako **úhel**. Kromě animací mají smysl hlavně hodnoty 0–180, potom nebo předtím (hodnota může být i záporná) se otočení opakuje.

  function el(id) {
    return document.getElementById(id);
  }
  function upravitOtoceni() {
    var div = document.querySelector(".otoceni-podle-osy");
    div.style.transform = div.style.webkitTransform = div.style.msTransform = div.style.oTransform = "rotateX(" + el("hodnotaX").value + "deg)" + " rotateY(" + el("hodnotaY").value + "deg) ";
    div.style.transformOrigin = div.style.webkitTransformOrigin = div.style.msTransformOrigin = div.style.oTransformOrigin = el("osaX").value + "% " +  el("osaY").value + "%"; 
  }

**Vodorovné otočení:**0 deg  180 deg

**Svislé otočení:**0 deg  180 deg

**Vodorovná osa:**0 %  100 %

**Svislá osa:**0 %  100 %

    .otoceni-podle-osy {
      width: 200px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background: #0D6AB7;
      color: #fff;
      font-size: 200%;
      transform: rotateY(20deg);
    }
  
  Text

Vlastností `transform**-origin**` je možné upravit umístění osy, podle které se bude box překlápět.

Hodnotu je ideální zadávat v pixelech nebo procentech. Výchozí umístění je uprostřed (`50%`). Osu je možné mít i **mimo element**. První hodnota je posice **vodorovné osy**, druhá hodnota potom **svislé**.

```
element {
  transform-origin: 50% 50%; /* výchozí */
}
```

## 3D perspektiva

Zajímavěji může efekt vypadat při použití *3D perspektivy*.

To funguje v **Chrome**, **Firefoxu** a **nové Opeře**. Čím nižší hodnota se zadá, tím je „3D efekt“ mocnější.

```
element {
  /* Webkit */
  -webkit-perspective: 500; 
  /* Firefox */
  -moz-transform-style: preserve-3d; 
  -moz-transform: perspective(500px);
}
```

Otočení jde animovat pomocí [`transition`](/transition). V podporovaných prohlížečích se po najetí myší na „Text“ provede otočení.

.otoceni-3d {
    width: 200px;
    
    -webkit-perspective: 500;
    -moz-transform-style: preserve-3d; 
    -moz-transform: perspective(500px);
}

.otoceni-3d > div {
    
    line-height: 100px;
    text-align: center;
    font-size: 80px;
    background: #0D6AB7;
    color: #fff;
    transition: all .5s;
    
    transform: rotateY(00deg);
    transform-origin: 100%;
    transform-style: preserve-3d;
}

.otoceni-3d:hover > div {
    transform: rotateY(180deg);
    
}

        Text

[Samostatná ukázka](http://kod.djpw.cz/epfb)

## Praktické použití

Díky této **transformaci** jde vytvořit poměrně efektní změnu obsahu po najetí myši. (V nepodporovaných prohlížečích se změna odehraje bez animace.)

[Živá ukázka](http://kod.djpw.cz/fpfb)