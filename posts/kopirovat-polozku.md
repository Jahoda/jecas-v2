---
title: "Duplikování položek formuláře v JS"
headline: "Přidání dalšího textového pole"
description: "Jak umožnit kopírování/přidávání dalších textových polí do formuláře."
date: "2014-02-21"
last_modification: "2014-11-23"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře"]
---

V případě, že ve webové aplikaci potřebujeme umožnit zadat **více položek stejného typu**, hodí se k tomu možnost JavaScriptem jednotlivá políčka **duplikovat**.

Alternativou je zobrazit předpokládaný počet políček rovnou a při zpracování formuláře brát v úvahu jen ta vyplněná. Dynamická změna počtu položek vypadá ale jako lepší volba.

            Jméno: 
            Věk: 
            VIP: 
            
            × Odebrat

    + Přidat

var prvniPolozka = document.getElementById('sablona');
var sablona = prvniPolozka.cloneNode(true);

function pridatPole() {
    var kopie = sablona.cloneNode(true);
    document.getElementById('polozky').appendChild(kopie);
    kopie.getElementsByTagName("input")[0].focus();
}

function odebrat(el) {
    var polozka = el.parentNode;
    polozka.parentNode.removeChild(polozka);
}

[Samostatná živá ukázka](http://kod.djpw.cz/azhb)

## Metoda `cloneNode`

Základem je JS metoda `cloneNode`, která naklonuje první položku, a metoda `appendChild`, která ji později vloží.

```
var prvniPolozka = document.getElementById('sablona');
var sablona = prvniPolozka.**cloneNode**(true);
```

Pro snadné klonování více [`&lt;input>`ů](/input) či jiných formulářových prvků v rámci jedné položky je ideální všechno obalit nějakým elementem – nejspíš `&lt;div>`em.

```
&lt;div class="polozka" id="sablona">
  &lt;input name="policko1[]">
  &lt;input name="policko2[]">
&lt;/div>
```

Za pozornost dále stojí, že klonování proběhne nadvakrát:

  - Ihned po **načtení stránky** se naklonuje první položka.

  - Při **kliknutí na tlačítko** *Přidat* se naklonuje tato kopie.

Proč? Kdyby se klonovala přímo *živá* první položka, promítl by se do klonu **její stav** (vyplněné hodnoty a podobně), což většinou není žádoucí. Další výhoda je v tom, že nemusíme řešit stav, kdy uživatel odstraní **úplně všechny** položky. I po odstranění všeho půjde přidat položku novou.

Pokud bychom chtěli zabránit odebrání i první položky, můžeme odebírací tlačítko **skrýt pomocí CSS** ([`display: none`](/display#none)) s využitím CSS selektoru [`:first-child`](/first-last-child) (**IE 7+**).

```
.polozka:first-child .odebrat {
  display: none;
}
```

## Odebrání `removeChild`

Odebrání bude velmi snadné. Tlačítko **Odebrat** bude v každém `&lt;div>`u s položkami. V případě, že tlačítko bude přímo v tomto obalu, stačí si najít jeho rodiče (`parentNode`) a provést `removeChild`.

```
function odebrat(el) {
  var polozka = el.parentNode;
  polozka.parentNode.removeChild(polozka);
}
```

Funkci `odebrat` se pro **zjištění rodiče** předá odebírací tlačítko prostřednictvím `this`.

```
&lt;button onclick="odebrat(this)">
  × Odebrat
&lt;/button>
```

## Udělení `focus`u

Po kliknutí na *Přidat* je vhodné rovnou označit první políčko přidané položky, aby do něj šlo **rovnou psát**:

```
kopie.getElementsByTagName("input")[0].**focus()**;
```

## Možná vylepšení

V závislosti na konkrétním použití je k úvaze případné vylepšení:

    Novou položku přidávat místo **na konec** za položkou naposledy upravenou.

    K tomu poslouží metoda `insertBefore` v kombinaci s `nextSibling`.

    ```
polozky.insertBefore(kopie, aktualniPolozka.nextSibling);
```

    Novou položku **přidávat automaticky**, když je předchozí (částečně) vyplněná. Tedy mít stále o jednu více položek, než je potřeba.

    Někdy se může hodit možnost *Vytvořit na základě předchozí*, kde se naopak bude **kopírovat** obsah předchozí položky včetně **vyplněných hodnot**.

    Pohrát si s [`tabindex`em](/tabindex), aby po vyplnění posledního políčka položky klávesa Tab aktivovala tlačítko *Přidat* namísto *Odebrat*.

    Špatné pořadí políček je [častou chybou formulářů](/chyby-formularu#klavesnice).

    [Upravená ukázka](http://kod.djpw.cz/bzhb)

    Tlačítko *Přidat* umístit na místo, kde se **nebude pohybovat** v závislosti na počtu položek. Případně ho přidat ihned za položku před tlačítko *Odebrat*.

## Zpracování na serveru

Pro pohodlné **zpracování na serveru** je ideální dávat prvkům formuláře názvy s hranatými závorkami `[]`, aby se s nimi dalo snadno pracovat jako s polem.