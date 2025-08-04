---
title: "Selektory :valid a :invalid"
headline: "CSS selektory <code>:valid</code> a <code>:invalid</code>"
description: "CSS selektory <code>:valid</code> a <code>:invalid</code> umí rozpoznat správně nebo špatně vyplněné formulářové políčko."
date: "2014-04-30"
last_modification: "2014-04-30"
status: 1
tags: ["CSS", "CSS selektory", "Formuláře"]
---

Pomocí různých typů [`&lt;input>`u](/input) nebo [atributem `pattern`](/atribut-pattern) je možné ve všech prohlížečích kromě **IE 9** a starších používat tzv. [selektory validace](/css-selektory#validace).

## Použití

```
:valid {
  color: green;
}
:invalid {
  color: red;
}
```

Prohlížeč potom kontroluje, zda zadaný obsah odpovídá příslušnému **typu** nebo **regulárnímu výrazu**.

Tj. třeba `&lt;input type="email">` bude testovat přítomnost zavináče, `&lt;input type="number">` zase přítomnost pouze čísel.

  input:valid {
    color: green;
  }
  input:invalid {
    color: red;
  }

      E-mail:

      Číslo:

      Malá písmena:

    Odeslat

## Vlastní hláška

Při nastavení pravidel `&lt;input>`u se potom při odeslání objeví chybová hláška. Výchozí universální rada pro `pattern` je poněkud knížecí (pro známé typy jako je e-mail jsou v prohlížečích hlášky ale relativně slušné).

Upravit text hlášky do vlastní podoby jde přes funkci [`setCustomValidity`](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#dom-cva-setcustomvalidity) nebo atribut `title`.

### Přes `setCustomValidity`

Jednoduchá funkce pro kontrolu může vypadat následovně. Při změně políčka (`oninput`) se této funkci předá odkaz na políčko (`el`) a vlastní hláška (`hlaska`).

```
function kontrola(el, hlaska) {
    if (el.validity.patternMismatch) {
        el.setCustomValidity(hlaska);
    }    
    else {
        el.setCustomValidity('');
    }
}
```

[Ukázka](http://kod.djpw.cz/rycb)

### Přes `title`

Použití atributu `title` je sice úplně triviální, ale vlastní hláška se zobrazí až pod tou universální.

```
&lt;input pattern="[a-z]*" title='Zadejte pouze malá písmena'>
```

[Ukázka](http://kod.djpw.cz/qycb)

## Použití v praxi

V podporovaných prohlížečích (**Opera**, **Firefox**, **Chrome**, **Internet Explorer 10**) je využití:

  - pseudo-tříd `:valid`/`:invalid`,

  - zvláštních typů `&lt;input>`ů,

  - atributů `pattern` nebo `required`

Spolu s nastavením **vlastní hlášky** docela jednoduchý nástroj, jak vytvořit uživatelsky relativně příjemnou validaci dat bez komplikovaných JavaScriptů.

Hlavní nevýhoda je asi grafická a i funkční nejednotnost napříč prohlížeči. A chybějící 100% kontrola na výsledkem jako v případě čistě javascriptových řešení.