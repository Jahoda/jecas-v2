---
title: "Rozbalovací nabídka <select>"
headline: "HTML značka <code>&lt;select&gt;</code>"
description: "Popis, možnosti a vylepšení rozbalovacího výběru, HTML značky <code>&lt;select&gt;</code>."
date: "2013-10-08"
last_modification: "2013-10-08"
status: 1
tags: ["HTML", "HTML značky", "Formuláře", "Rady a nápady"]
---

Značka `&lt;select&gt;` se běžně používá ve formulářích pro roletový výběr více položek. Jednotlivé položky se zapisují do [nepovinně párových](/html-znacky#koncova-volitelna) značek `&lt;option&gt;`.

Použít: 
  
    – vybrat –
    HTML
    CSS
    JavaScript

## Rozbalení `&lt;select&gt;`u

Rozbalovací seznamy bývají na stránkách podle mého názoru **často zneužívány**. Myslím tím situaci, kdy má rozbalovací výběr jen pár položek, ale je kvůli jejich odkrytí **nutno nejprve kliknout**. V takovém případě mi přijde vhodnější použít pár radio přepínačů (`&lt;input type=radio&gt;`).

    - [Proč nepoužívat selectbox](/select-pouzitelnost)

Kromě horší použitelnosti se značka `&lt;select&gt;` i [hůře styluje](/stylovani-selectu).

### Rozbalení po najetí myší

Trochu pomoci si teoreticky lze JavaScriptem a provést **rozbalení po najetí myši**. (Využívá se nastavení atributu `size` podle počtu vnořených položek spolu s [absolutním posicováním](/position#absolute).)

  Použít: 

    – vybrat –
    HTML
    CSS
    JavaScript

Otázka je, jestli **je to skutečně pomoc** — narušení výchozího chování může být matoucí.

## Získání vybrané položky JavaScriptem

Možný důvod, proč tvůrci webů upřednostňují roletový výběr, je **jeho snadné zpracovávání JavaScriptem**. Získání vybrané volby je otázkou jednoduchého:

```
document.getElementById('jmenoSelectu').value
```

Případně:

```
document.formular.jmenoSelectu.value
```

U `&lt;input type=radio&gt;` je nutné projít cyklem všechny dané `&lt;input&gt;`y a hlídat u nich vlastnost `checked` (či použít nástroj typu jQuery — `$('input[name=jmeno]:checked').val()`).

### Vybraný element

Někdy je potřeba vybrat ze `&lt;select>`u celý vybraný element `&lt;option>`, to jde pomocí vlastnosti `selectedIndex`:

```
function vybranyOption(select) {
  // první element „– vybrat –“ se bere jako nic
  if (select.selectedIndex == 0) return false;
  // vrátí se vybraný element
  return select.options[select.selectedIndex];
}
```