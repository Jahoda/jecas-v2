---
title: "V jakém jazyce programovat?"
headline: "Jazyk zdrojového kódu"
description: "Jakým jazykem programovat. Česky, nebo anglicky?"
date: "2015-01-04"
last_modification: "2015-01-16"
status: 1
tags: ["Produktivita", "Rady a nápady"]
---

Při programování nového projektu/skriptu čelí programátor mimo jiné otázce, **jakým jazykem** psát kód. Jestli použít svůj mateřský jazyk nebo psát v **universálnější angličtině**.

V českém prostředí jde tedy o to, zda psát zdrojové kódy **česky nebo anglicky**. Oba přístupy mají své výhody i nevýhody.

## Srozumitelnost

Podobně jako je pro česky hovořícího člověka snazší číst v češtině obyčejný text, tak i **český zdrojový kód** bude lépe čitelný.

### Odlišení klíčových slov

Programovací jazyky obvykle obsahují tzv. **vyhrazená klíčová slova**, která mají nějakou speciální funkci.

Když programátor píše vlastní kód (názvy proměnných a funkcí) česky, získá několik výhod:

    V podstatě **nehrozí kolise** při pojmenovávání identifikátorů, kdy by použil název již existující **vestavěné funkce**.

    Pokud například v PHP bude potřeba vytvořit funkci pro přepnutí, nejde ji pojmenovat `switch`:

    ```
function switch() {
  // kód
}
```

    *Switch* je v PHP vyhrazené slovo, takže tento kód **skončí chybou**, která není úplně vypovídající:

    ```
Parse error: syntax error, unexpected T_SWITCH, expecting T_STRING
```

    JavaScript je na tom s **popisem chyby** trochu lépe:

    ```
Syntax error while loading: expected identifier, got keyword 'switch'
```

    Někdy tomu dokáže předejít **barvení kódu nebo editor**, ale bez toho se jedná o hodně nepříjemný druh chyb.

    Druhá výhoda je **odlišení vlastního kódu**, kdy se jde řídit jednoduchým pravidlem, že „co je česky, to jsem napsal“.

    Je tedy na první pohled jasné, že daná funkce není vestavěná a podobně.

### Diakritika

Přestože v programovacích jazycích většinou není problém používat v názvech i **diakritiku**, s ohledem na editory to není moc rozumné. Může potom špatně fungovat **barvení kódu**, napovídání identifikátorů a podobně

    - [Diakritika v názvu CSS třídy](/zvlastni-znaky-class)

    - [Živá ukázka podpory diakritiky](http://kod.djpw.cz/onjb) – HTML, CSS, JavaScript

## Programátor musí umět anglicky

Poměrně rozšířený názor je, že programátor **stejně musí umět anglicky**. Osobně se domnívám, že nemusí. Minimálně v začátcích nebo pokud nepotřebuje sledovat **nejnovější trendy** / **marginální oblasti**, existují kvalitní zdroje i v češtině.

Kromě toho jsou typické **skupiny lidí**, které dají jednoznačně přednost češtině:

  - Hodně mladí lidé, co ještě anglicky neumí.

  - Starší lidé, co se anglicky nikdy neučili.

## Universálnost

Velká výhoda **psaní kódu v angličtině** je potom oproti češtině v o hodně větší skupině lidí, která bude kódu rozumět.

To se může hodit při rozšiřování nebo prodeji programu do zahraničí.

Universálnost a srozumitelnost pro velkou skupinu lidí může být ale i nevýhoda. Použití minoritního jazyku je do jisté míry **obfuskace aplikace** (*obfuscate* – zatemnit), která zkomplikuje nečesky rozumějícím provádět *reversní inženýrství*.

## Jak se rozhodnout

Na základě bodů výše nevypadá rozhodnutí mezi češtinou a angličtinou jako takový problém.

Bohužel nikdy dopředu není možné říct, jak se **program bude používat** a zákon schválnosti praví, že to bude nakonec úplně jinak, než to vypadalo.

## Přeložení zdrojového kódu

I při volbě „nevhodného“ jazyku nemusí být situace úplně ztracená. Programátorská IDE mívají nástroj pro hromadné změny názvů identifikátorů.

Většinou se taková možnost nachází po něčím jako *Refactor* → *Rename*. Příklad z **NetBeans** po kliknutí pravým tlačítkem na název proměnné: