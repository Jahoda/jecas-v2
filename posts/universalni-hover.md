---
title: "Universální hover efekt"
headline: "Universální hover efekt pro různé barvy pozadí"
description: "Jak vytvořit universální <code>:hover</code> efekt pro různě barevná tlačítka."
date: "2014-04-19"
last_modification: "2014-04-20"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

V případě, že na webové stránce používáme **různě barevné** odkazy nebo tlačítka, je trochu nepohodlné pro každou barvu zvlášť vytvářet samostatný efekt při najetí myší (`:hover`).

Dát uživateli *potvrzení*, že na tlačítko najel změnou stylu, bývá docela vhodné. Jak tedy pohodlně na to?

## Průhlednost (`opacity`)

Jako příklad mohou posloužit [tlačítka sociálních sítí](/sdileci-tlacitka):

.tlacitka a {
    display: inline-block; 
    text-align: center; 
    padding: .2em .5em; 
    color: #fff; 
    text-decoration: none;
    position: relative;
    border: 0;
}
.tlacitka .fb-like, 
.tlacitka .fb-like:hover {background: #4B67A1}
.tlacitka .twitter-share-button,
.tlacitka .twitter-share-button:hover {background: #00ACEE}
.tlacitka .g-plusone,
.tlacitka .g-plusone:hover {background: #DD4B39}

    [Facebook](http://www.facebook.com/sharer.php?u=http://jecas.cz/)
    [Tweet](http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/)
    [Google +](https://plus.google.com/share?url=http://jecas.cz/)

Cílem je, aby každé tlačítko mělo `:hover` ve své barvě, aniž by se musela konkrétní barva pro každý jeden odkaz nastavovat.

Nejjednodušší řešení je asi měnit [průhlednost](/opacity) (`opacity`). Buď ji při `:hover`u snižovat.

    .opacity a:hover {
      filter: alpha(opacity=70); 
      opacity: .7
    }

    [Facebook](http://www.facebook.com/sharer.php?u=http://jecas.cz/)
    [Tweet](http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/)
    [Google +](https://plus.google.com/share?url=http://jecas.cz/)

Nebo naopak zvyšovat.

    .opacity-zvysit a {
      filter: alpha(opacity=70); 
      opacity: .7
    }
    .opacity-zvysit a:hover {
      filter: alpha(opacity=100); 
      opacity: 1
    }

    [Facebook](http://www.facebook.com/sharer.php?u=http://jecas.cz/)
    [Tweet](http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/)
    [Google +](https://plus.google.com/share?url=http://jecas.cz/)

## Překrytí průhledným elementem

Výše uvedená změna průhlednosti přecejenom nemusí být vždy ideální. Hezčí efekt jde vykouzlit **překrytím jednobarevným elementem**, vloženým přes [`:before/:after`](/css-selektory#before-after).

Tento pseudoelement se [absolutně naposicuje](/position#absolute) přes původní obsah, nastaví se mu pozadí (např. bílá v případě zesvětlení, černá v případě ztmavení) a celé se to hodně zprůhlední (`opacity: 0.1`).

### Zesvětlení

.prekryt a:hover:before {
    content: "";
    background: #fff;
    width: 100%;
    height: 100%;
    position: absolute; 
    top: 0; 
    left: 0;
    zoom: 1;
    filter: alpha(opacity=10); 
    opacity: .1;
}

    [Facebook](http://www.facebook.com/sharer.php?u=http://jecas.cz/)
    [Tweet](http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/)
    [Google +](https://plus.google.com/share?url=http://jecas.cz/)

### Ztmavení

.prekryt-tma a:hover:before {
    content: "";
    background: #000;
    width: 100%;
    height: 100%;
    position: absolute; 
    top: 0; 
    left: 0;
    zoom: 1;
    filter: alpha(opacity=10); 
    opacity: .1;
}

    [Facebook](http://www.facebook.com/sharer.php?u=http://jecas.cz/)
    [Tweet](http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/)
    [Google +](https://plus.google.com/share?url=http://jecas.cz/)

[Samostatná ukázka](http://kod.djpw.cz/ktcb)

### Internet Explorer 8 a 9

Alternativně k `opacity` by šlo rovnou použít [`rgba`](/opacity#rgba), ale to funguje až od **IE 9**.

Vytvoření pseudo-elementu přes `:before`/`:after` sice funguje už v **IE 8**, nicméně u pseudo-elementů v tomto prohlížeči není možné nastavovat průhlednost. Takže je stejně nejspíš nutné použít další element uvnitř odkazu. [Ukázka](http://kod.djpw.cz/rtcb).

### Vylepšení `:hover`u

Samotnou podobou **hover efektu** může ještě vyšperkovat obrázkový [CSS gradient](/gradient) ([ukázka](http://kod.djpw.cz/ltcb)) nebo [přechodový efekt `transition`](/transition).

## CSS vlasnost `filter`

Dle CSS specifikace by se k ztmavení/rozsvícení báječně hodil CSS filter `brightness`:

```
.ztmavit a:hover {
  filter: brightness(90%);
}
.zesvetlit a:hover {
  filter: brightness(110%);
}

```

Bohužel ale momentálně funguje jen ve **Webkitu** (s [prefixem `-webkit-`](/css-prefixy)). [Ukázka](http://kod.djpw.cz/qtcb).

## Použití `:focus` a `:active`

Při vytváření `:hover` stylu je dobrou volbou rovnou stejný styl přidat i pro [`:focus` a `:active`](/css-selektory#uzivatelske-akce), pokud tedy `:focus` a `:active` nemají už styly vlastní.

Nedá to moc práce navíc a zlepší to **uživatelský dojem**.