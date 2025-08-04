---
title: "Psaní testů ve Vue.js"
headline: "Psaní testů ve Vue.js"
description: "Jak začít psát testy funkcí a komponent ve Vue.js."
date: "2020-03-25"
last_modification: "2020-03-25"
status: 0
tags: []
---

Pro pohodlnější vývoj je dobré **psát automatické testy**. Do kódu, který je dobře pokrytý testy, není takový problém zasahovat, protože se snižuje obava z toho, *kde se co může rozbít*.

Pokud by nějaká úprava měla rozbít jinou část, *spadnou* v ní testy. Bez testů se o tom nemusí být jak dozvědět.

Kromě úprav ve vlastním kódu je i snazší upgrade kódu cizího. To se hodí například v situaci, kdy vyjde bezpečnostní update cizí knihovny, protože není nutné zdlouhavě *proklikávat* web.

Psaní testů vyžaduje i trochu odlišný přístup k psaní kódu, aby se dobře testoval. Většinou to vede k lepšímu kódu.

## Proč nepsat testy

Psaní testů vždy a ke všemu není universální dobrá rada. Jsou i důvody, proč **testy nepsat**:

    **Pomalejší vývoj** – pro člověka/tým, který není testy zvyklý psát, bude ze začátku vývoj trvat déle.

    Napsat zpočátku věc bez testů bude pravděpodobně rychlejší než s testy.

    Stejně tak zabere nějaký čas nastavit celý proces, jak testy v projektu psát, jak je spouštět lokálně, jak pouštět v CI.

    **Pomalejší build** – je dobré testy pouštět při sestavování aplikace v CI. Samotné spuštění testů logicky zabere nějaký čas.

    Je tak nutné dbát na to, aby běh testů netrval neúnosnou dobu.

    **Prototypování** – při vytváření prototypu, kdy člověk pořádně neví, jaké řešení zvolí, bude souběžné psaní testů nejspíš kontraproduktivní.

## Kdy psát testy

Existují různé přístupy k tomu v jakých částí vývoje testy psát.

    **Nejdřív kód, potom testy** – nejprve se napíše samotný kód, který se následně pokrývá testy. Vypadá to jako nejrychlejší způsob, jak vytvořit co nejdříve něco *funkčního*.

    Nevýhoda je v tom, že dopsání smysluplných testů může vyžadovat přepis původního kódu.

    Další nevýhodou je risiko, že na fakt, že je v kódu něco fatálně špatně a bude potřeba to přepsat, přijde jeho autor dost pozdě.

    Ale ještě větší nevýhoda je **odložení na později**. Později potom nenastane.

    **Průběžné psaní testů** – během vytváření celku se průběžně píší testy jednotlivých součástí, které autor považuje za relativně hotové.

    Díky tomu se i usnadňuje průběžné refaktorování kódu během vývoje.

    **Nejdřív testy** – technika označovaná jako TDD (*test driven development*). Česky programování řízené testy.

    Spočívá v tom, že se nejprve napíší testy, které neprochází. Až potom se programuje samotná funkcionalita, než všechny testy projdou.

    Jsou-li testy napsány dobře, jde po jejich splnění bezpečně vylepšovat/refaktorovat kód s automatickou kontrolou, že se nic nerozbilo.

    Tento přístup vyžaduje značné zkušenosti, protože je dopředu třeba dobře vědět, co a jak má výsledek dělat. Komplikují ho časté změny zadání v průběhu.

    Psaní oproti testům je hodně pohodlné a rychlé, protože je rychlé zjistit, jestli se kód v požadovaných případech chová správně.

## Nástroj `vue-test-utils`

## Kam umístit soubory s testy

Soubory s testy se většinou jmenují ve stylu `*.spec.js`.

Pokud existuje komponenta `MojeKomponenta.vue`, její test se může jmenovat `MojeKomponenta.spec.js`.

Ohledně umístění testů je asi nejčastější samostatná složka typu `tests/unit/components`. Všechny testy všech komponent jsou tak v podadresářích složky `tests`.

Druhá možnost je umístit soubor s testem hned **vedle příslušné komponenty**. Osobně ho preferuji, protože mi přijde přehlednější, než ve složce `tests` duplikovat adresářovou strukturu celého projektu.

Samostatná složka může být teoreticky rychlejší pro vyhledání všech souborů s testy (nemusí se procházet celý projekt). V praxi jsem ale nějaké dramatické zpomalení nezaznamenal.

## Jest

### Mockování nativních funkcí

Testy se nepouštějí v plnohodnotném prohlížeči, takže některé konstrukce – například [zkopírování do schránky](/kopirovat) přes `document.execCommand('copy')` nebude fungovat.

Řešení je namockovat prázdnout funkci:

```
document.execCommand = est.fn(x => x)
```

      [Unit Testing Vue/Vuetify With Jest and Vue-Test-Utils](https://fernandobasso.dev/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html)

      [Tips for Unit Testing Vue Components with Jest](https://medium.com/swlh/tips-on-unit-testing-vue-components-with-jest-e68ff6a28bb5)

## Testování slotů

Sloty jsou ve Vue.js hezká možnost, jak předávat HTML kód / šablonu do komponenty.

Sloty jde jednoduše nadefinovat při volání komponenty v metodě `mount`/`shallowMount`:

```
wrapper = shallowMount(MojeKomponenta, {
  slots: {
    default: '&lt;div class="trida">Text&lt;/div>'
  }
});
```

Podrobnější článek o testování slotů:

      [Test Vue.js Slots in Jest](https://alexjover.com/blog/test-vue-js-slots-in-jest/)

## Testování Vuex store

Pokud aplikace používá ukládání dat do Vuex store, je třeba to zohlednit u psaní testů.

Usnadnit testování může balíček [`vuex-mock-store`](https://github.com/posva/vuex-mock-store).

[Using with Vuex](https://vue-test-utils.vuejs.org/guides/using-with-vuex.html) – dokumentace k Vue Test Utils ([příklad](https://github.com/eddyerburgh/testing-vuex-store-example))