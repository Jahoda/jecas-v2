---
title: "Zobrazení popisku při najetí myší"
headline: "Popisek po najetí myší"
description: "Kterak zobrazovat obsah v tooltipu po najetí myši."
date: "2013-09-24"
last_modification: "2013-09-24"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

Jako **popis obrázku** nebo **nápověda** může sloužit obsah, který se objeví po najetí myší.

V čistém CSS lze využít [pseudotřídu `:hover`](/css-selektory#uzivatelske-akce).

```
element .skryvany {display: none}
element**:hover** .skryvany {display: block}
```

    .po-najeti span {display: none; background: #fff; color: #000}
    .po-najeti:hover span {display: inline}
  
  Po najetí se objeví text.

Na tomto triviálním postupu je možné stavě i [vyskakovací menu](/vyskakovaci-menu) nebo právě různé popisky. Záleží jen na fantasii…

## Hotový tooltip

Příklad popisku u běžného textu:

.najeti {position: relative}
.popisek {position: absolute; left: 50%; top: 100%; display: none; margin-left: -125px; width: 250px; border: 1px solid #666; padding: 10px; background: #fff; z-index: 100; box-shadow: rgba(0, 0, 0, 0.298) 0px 3px 8px 0px; transition: opacity .5s; -webkit-transition: opacity .5s; opacity: 0}
.najeti:hover .popisek {display: block; opacity: 1}
.popisek .sipka, .popisek .sipka-obal {position: absolute; top: -10px; left: 50%; margin-left: -5px; width: 0px; height: 0px; border: solid transparent; border-width: 0 10px 10px 10px; border-bottom-color: #000}
.popisek .sipka-obal {border-bottom-color: #fff; margin: 1px 0 0 -4px; border-width: 0 9px 9px 9px}

    Popisek se objeví po najetí. Tooltip je [absolutně posicovaný](/position#absolute) a centrován [následovně](/centrovani#absolute), stín je vytvořen CSS vlastností `box-shadow` a šipka je [nakreslená v CSS](/css-kresleni).

        Popisek

  - Popisek je možné [animovat](/animace-skryt) pomocí [`transition`](/transition).

  - Má-li být možné do popisku **najet myší**, je třeba ho *nalepit* k oblasti, která popisek vyvolává — jinak tooltip po ztracení `:hover`u u rodiče zmizí.

## Popisky obrázkové galerie

S popisky pod obrázky:

    .galerie {}
    .obrazek {position: relative; float: left; width: 200px; margin-right: 10px}
.popisek {position: absolute; left: 50%; top: 100%; display: none; margin-left: -100px; width: 180px; border: 1px solid #666; padding: 10px; background: #fff; z-index: 100; box-shadow: rgba(0, 0, 0, 0.298) 0px 3px 8px 0px; transition: opacity .5s; -webkit-transition: opacity .5s; opacity: 0}
.obrazek:hover .popisek {display: block; opacity: 1}
.popisek .sipka, .popisek .sipka-obal {position: absolute; top: -10px; left: 50%; margin-left: -5px; width: 0px; height: 0px; border: solid transparent; border-width: 0 10px 10px 10px; border-bottom-color: #000}
.popisek .sipka-obal {border-bottom-color: #fff; margin: 1px 0 0 -4px; border-width: 0 9px 9px 9px}

.nahore .popisek {top: auto; bottom: 100%;}
.nahore .sipka, .nahore .sipka-obal {top: auto; bottom: -10px; border-width: 10px 10px 0 10px ; border-top-color: #000; border-bottom-color: transparent;}
.nahore .sipka-obal {border-top-color: #fff; border-width: 9px 9px 0  9px; margin: 0 0 1px -4px;}

          Popisek obrázku

          Popisek obrázku

          Popisek obrázku

          Popisek obrázku

Nebo s popisky nad obrázky:

          Popisek obrázku

          Popisek obrázku

          Popisek obrázku

          Popisek obrázku

## JavaScriptový tooltip

V případě, že chceme vytvářet popisek z např. atributu `title`, je nutno [tooltip řešit přes JS](/atribut-title).