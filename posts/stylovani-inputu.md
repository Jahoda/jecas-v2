---
title: "Stylování formulářových políček"
headline: "Stylování formulářových políček a tlačítek"
description: "Které CSS vlastnosti si ohlídat při dosahování perfektního stylu vstupní políček a odesílacích tlačítek. "
date: "2013-12-11"
last_modification: "2013-12-12"
status: 1
tags: ["CSS", "Stylování elementů", "Formuláře"]
---

Pokud se rozhodneme pro [vlastní vzhled formulářů](/vzhled-formularu), nevyhneme se *resetování* původních hodnot. (Tím není myšlen jen obyčejný [hvězdičkový reset](/css-reset#hvezdickovy), který toho z vzhledu formulářů zase tolik [neodstraní](/css-reset-formularu).)

Chceme-li docílit prostého vzhledu, kde budou popisky ([`&lt;label>`](/label-for)), vstupní pole ([`&lt;input>`](/input)) i tlačítka (`&lt;button>`/`&lt;input type=text>`) vypadat jako obyčejné *prázdné* elementy (`&lt;div>` a `&lt;span>`) a budou tak **hezky lícovat**:

u, &lt;input>u a &lt;button>u" class="border">

Není to úplná legrace.

    - [Živá ukázka](http://kod.djpw.cz/uvqb) – nastavení výšky políčka a tlačítka pomocí `height` a `line-height`

## Co všechno resetovat/sjednotit?

  Odsazení
  
    Vnitřní i vnější odsazení — `padding` a `margin`.

  Rámeček
  
    Rámeček tlačítek a vstupních políček — `border`.

  Písmo
  
    Různý **styl** i **velikost** písma způsobí různou různou výšku řádku — `font-size` a `font-family`.

  Výška řádku
  
    Nastavit výšku řádku je možné pomocí `line-height`  po nastavení `display: (inline-)block`. Na `&lt;input>`y to nefunguje, takže se jim musí ještě přidat `height`/`min-height` se stejnou hodnotou.

  Odsazení při `:focus` ve Firefoxu
  
    Ve Firefoxu vzhled políček ještě upravují vlastnosti v pseudoelementu `button::-moz-focus-inner`. Hodnoty `padding` a `border` je vhodné **nastavit na nulu**.

[Živá ukázka](http://kod.djpw.cz/jxw) funkční od **IE 8**.

Pro znázornění `:focus`u je možné použít třeba `box-shadow` a resetovat `outline`, který je v některých prohlížečích výchozí (**Chrome**).

    .jako-text label, .jako-text input, .jako-text button {
      background: #DA3F94; color: #fff; /* Jen barvy */
      display: inline-block; 
      padding: 0 .4em; 
      border: 0; 
      margin: .1em; 
      line-height: 2em;
      height: 2em; /* pro  */
      font-size: 100%;
      font-family: "Segoe UI", Arial;
    }
    
    .jako-text input[type=text] {background: #0D6AB7; color: #8ECCF0}
    .jako-text label {background: #1081DD;} 
      
    .jako-text input::-moz-focus-inner, .jako-text button::-moz-focus-inner {padding: 0; border: 0}
    .jako-text button:focus, .jako-text input:focus {box-shadow: 0 0 4px #DA3F94; outline: 0}

    Popis poleOdeslat

    Popis pole

    Popis poleOdeslat

I v **IE 7** by požadovaného vzhledu šlo docílit [obtékáním](/float) (vlastností `float`). [Ukázka](http://kod.djpw.cz/ixw).

    .jako-text2 label, .jako-text2 input, .jako-text2 button {
      background: #DA3F94; color: #fff; /* Jen barvy */
      float: left;
      padding: 0 .4em; 
      border: 0; 
      margin: .1em; 
      line-height: 2em;
      height: 2em; /* pro  */
      font-size: 100%;
      font-family: "Segoe UI", Arial;
    }
    
    .jako-text2 input[type=text] {background: #0D6AB7; color: #8ECCF0}
    .jako-text2 label {background: #1081DD; clear: left} 
    
    .jako-text2 input::-moz-focus-inner, .jako-text2 button::-moz-focus-inner {padding: 0; border: 0}
    .jako-text2 button:focus, .jako-text2 input:focus {box-shadow: 0 0 4px #DA3F94; outline: 0}

    Popis poleOdeslat

    Popis pole