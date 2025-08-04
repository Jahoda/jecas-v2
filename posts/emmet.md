---
title: "Emmet"
headline: "Emmet – efektivnější psaní kódu"
description: "Nástroj Emmet nabízí výrazné zjednodušení při psaní HTML a CSS kódu."
date: "2013-08-01"
last_modification: "2013-08-01"
status: 1
tags: ["Produktivita"]
---

[Stránka projektu emmet.io](http://emmet.io/)

Použít jej lze v [mnoha editorech](http://emmet.io/download/) (i v [Sublime Text](/sublime-text), [PSPadu](https://github.com/emmetio/pspad), NetBeans nebo Eclipse atd.) a je dostupný i v JavaScriptu pro použití na webu.

## Instalace

### Sublime Text

Do editoru Sublime Text se Emmet **instaluje** stejně jako ostatní [pluginy](/pluginy-sublime-text) přes *Package Control*.

### PSPad

Stačí nahrát výše [uvedný soubor](https://github.com/emmetio/pspad/blob/master/emmet.js) do adresáře `Script\JScript` ve složce PSPadu, tj. standardně do umístění `C:\Program Files (x86)\PSPad editor\Script\JScript`.

Následně potom povolit skriptování v *Nastavení* → *Nastaveni programu* → *Integrace do systemu* → *Podpora skriptování pomocí WSH*.

V PSPadu se pro aplikaci Emmetu na text před kursorem používá zkratka Ctrl + ,.

## Využití

S Emmetem si lze výrazně urychlit a zkrátit zápis celých HTML bloků nebo CSS pravidel. Stačí napsat pár znaků a *odpálit* je standardně Tabulátorem nebo pomocí Ctrl + Enter.

## Pár příkladů

  textarea {min-width: 50%; width: auto}

### HTML

  Odkaz s třídou `button`
  `a.button`, Tab

  a.button

  Zaškrtávací `&lt;input&gt;` v `&lt;label&gt;`u
  `label(input[type=checkbox])`, Tab

label(input[type=checkbox])

  Seznam s pěti položkami
  `ul(li{Položka}*5)`, Tab

  Využít lze i číslování pořadí — je dostupné v `$`.

    `ul(li{Položka **$**}*5)`, Tab

ul(li{Položka $}*5)

  function nastavit(str) {
    var c = document.getElementById("cislovani");   
  	c.innerHTML = str;
  	c.focus();
  }

    - Číslovat od konce lze přidáním zavináče a spojovníku (`@-`),

      číslování od čísla tři zajistí `@b3`,
        - pro pevný počet míst čísel stačí napsat více dolarů,

        - vše jde zkombinovat.

  Jednoduchá struktura nadpisů
  `h1+h2+p+h2+h3`, Tab

h1+h2+p+h2+h3  

  Komentář za ukončujícím `&lt;div>`em
  
    Pro přehlednost se občas hodí za ukončovací značku přidat komentář s třídou, aby bylo jasné, co značka ukončuje.

    `.clanek|c`, Tab

.clanek|c 
    
    Tohoto chování je možné dosáhnout i automaticky.

      	- [Automatically add closing comments to HTML using Emmet](http://iaintnoextra.tumblr.com/post/68089741466/automatically-add-closing-comments-to-html-using)

Stačí do souboru `User/Emmet.sublime-settings` nakopírovat následující a restartovat.

    ```
{
  "preferences": {
    "filter.commentAfter": "&lt;!-- /&lt;%= attr(\"id\", \"#\") %>&lt;%= attr(\"class\", \".\") %> -->"
  },
  "syntaxProfiles": {
    "html" : {
      "filters" : "html, c"
    }
  }
}
```

    Dá se do něj dostat přes *Preferences → Package Settings → Emmet → Settings – User*.

  Celý layout
  `html:5>.header(img#logo)+.menu(ul(li>a{Odkaz $}*5))+.content(h1+p)+.footer`, Tab

    html:5>.header(img#logo)+.menu(ul(li>a{Odkaz $}*5))+.content(h1+p)+.footer  

  Lorem ipsum generátor
  `lorem`, Tab

    lorem
lorem2
p*5>lorem3

    Lze používat i při zápisu „`element*5`“, číslo za `lorem` nastaví počet slov.

### CSS

Podobná *kouzla* lze provádět i v CSS.

  Absolutně posicovaný element
  `posa+t10+l30+w100+h100+p1e+m1e`, Tab

  ```
position: absolute;
top: 10px;
left: 30px;
width: 100px;
height: 100px;
padding: 1em;
margin: 1em;
```

  posa+t10+l30+w100+h100+p1e+m1e  

  Rámeček
  `bt1-s#`, Tab

bt1-s# 
    ```
border-top: 1px solid #000
```

Na první pohled vypadají HTML i CSS zkratky dost šíleně, nicméně jsou až překvapivě dobře promyšlené a svým způsobem intuitivní. Třeba k podivnému zápisu horního rámečku lze dojít postupným zkracováním.

Nejdříve jsem napsal `bt:1-s-#000` a zkoušel, co by se ještě dalo ubrat (`bt:1-s-#0` → `bt1-s#`). Převedení `#` bez kódu barvy na nulu je už trochu extrémní, ale myslím, že to hezky ilustruje tu promyšlenost.

Kromě možnosti používat zkratky jednotlivých vlastností funguje i tzv. fuzzy search, kdy se Emmet snaží dohledávat, co vlastně chce člověk napsat, takže si lze v podstatě vytvořit svůj vlastní styl zápisu.

		emmet.require('textarea').setup({
			pretty_break: true, // enable formatted line breaks (when inserting 
					            // between opening and closing tag) 
			use_tab: true       // expand abbreviations by Tab key
		});

Další hezké funkce a vysvětlující dema jsou v [dokumentaci](http://docs.emmet.io/).

## Hayaku

[Hayaku](https://github.com/hayaku/hayaku#readme) umožňuje ještě možná trochu lepší napovídání **CSS vlastností a hodnot** v **Sublime Textu**. Pohodlnější vytváření HTML kódu ale nenabízí.