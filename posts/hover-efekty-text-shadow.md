---
title: "Hover efekty s text-shadow"
headline: "Hover efekty s <code>text-shadow</code>"
description: "Zajímavé <code>:hover</code> efekty s využitím CSS vlastnosti <code>text-shadow</code>."
date: "2014-08-12"
last_modification: "2014-08-12"
status: 1
tags: ["CSS", "Hotová řešení", "Animace", "Menu v CSS"]
---

Podobně jako lze k `:hover` efektům využít [stíny boxu](/hover-efekty-box-shadow) (`box-shadow`), dost podobně se dá použít i **stín písma** – `text-shadow` (funguje od **IE 10**).

Symbolický zápis vlastnosti `text-shadow` je obdobný jako u [`**box**-shadow`](/box-shadow):

```
element {
  text-shadow: *vodorovné* *svislé umístění* *rozmazání* *barva*;
}
```

Pokud vynulujeme **rozmazání**, vznikne tak v podstatě **duplikát** původního textu, který může díky [`transition`](/transition) plynule přilétat nebo odlétat.

## Shora

    .shora a {
        display: inline-block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: 0 -40px 0 #000;
        overflow: hidden;
    }
    
    .shora a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    

    [Odkaz]()
    [Další odkaz]()
    [Odkaz]()

[Samostatná živá ukázka](http://kod.djpw.cz/rxeb)

## Zdola

    .zdola a {
        display: inline-block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: 0 40px 0 #000;
        overflow: hidden;
    }
    
    .zdola a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    

    [Odkaz]()
    [Další odkaz]()
    [Odkaz]()

## Zleva

    .zleva a {
        display: block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: -100px 0 0 #000;
        overflow: hidden;
    }
    
    .zleva a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    

    [Odkaz]()
    [Odkaz]()
    [Odkaz]()

## Z více stran najednou

Stínů textu může být více. Přiletět tedy může zároveň stín shora i zdola nebo třeba 4 stíny ze **všech stran**.

    .shora-zdola a {
        display: inline-block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: 0 40px 0 #000, 0 -40px 0 #000;
        overflow: hidden;
    }
    
    .shora-zdola a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    

    [Odkaz]()
    [Další odkaz]()
    [Odkaz]()

[Ukázka](http://kod.djpw.cz/sxeb)

### Všechny strany

    .vsechny-strany a {
        display: inline-block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: 0 40px 0 #000, 0 -40px 0 #000, 100px 0 0 #000, -100px 0 0 #000;
        overflow: hidden;
    }
    
    .vsechny-strany a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    

    [Odkaz]()
    [Další odkaz]()
    [Odkaz]()

[Ukázka](http://kod.djpw.cz/txeb)