---
title: "Uložení stavu před opuštěním stránky"
headline: "Uložení stavu před opuštěním stránky"
description: "Jakým způsobem uložit stav aplikace/formuláře před opuštěním stránky."
date: "2015-11-24"
last_modification: "2015-12-13"
status: 1
tags: ["JavaScript", "Formuláře", "Rady a nápady"]
---

Ideální webová aplikace by měla **automaticky ukládat všechny změny stavu**, aby při přerušení jejího používání šlo následně navázat přesně ve stavu, kde uživatel skončil.

Není nic otravnějšího, než když kvůli nějaké chybě nebo třeba kvůli automatickému zavření prohlížeče na mobilu, zmizí rozepsaný text ve formuláři.

## Kam ukládat

Nejspolehlivější je časté ukládání v prohlížeči návštěvníka do lokálního úložiště pomocí JavaScriptu, které se případně občas může sesynchronisovat se serverem.

Použití lokálního úložiště je snadné:

```
localStorage.setItem("nazev-polozky", "hodnota");
```

    - [Úložiště `localStorage`](/localstorage) – přehled lokálního úložiště v JS

## Kdy ukládat

  Ukládat *stav* je ideální už při jeho změně (stisknutí klávesy, kliknutí myší) či sadě změn provedených v krátkém časovém úseku.

    Aby se hodnota v úložišti nepřepisovala pořád, jde ukládat až po nějaké době nečinnosti od poslední změny – třeba 300 milisekund. Docílit toho jde [časovačem](/odpocitavani#js):

    ```
var prodleva;
function spustitUlozeni() {
  clearTimeout(prodleva);
  prodleva = setTimeout(ulozitZmenu, 300);
}
```

    Funkce `spustitUlozeni` se potom zavolá po každé změně, funkce pro uložení `ulozitZmenu` se ale provede až po 300 ms nečinnosti.

  Druhá možnost je provádět uložení automaticky každých X vteřin/minut. Tento postup vede k řadě zbytečných uložení, kdy se stav uloží, aniž by se něco změnilo.

  Třetí možnost je **uložení při ukončení stránky** (třeba událostí [`onbeforeunload`](/onbeforeunload)), ale to není tolik spolehlivé, protože některá ukončení aplikace mohou nastat dřív, než se stihne stav uložit – třeba u desktopového PC bez záložního zdroje a výpadku elektřiny.

    Různé způsoby provádění akcí před opuštěním stránky popisuje následující článek:

    Ilya Grigorik: [Don't lose user and app state, use Page Visibility](https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/)

## Spolehlivost lokálního úložiště

Z mnohaletých zkušeností na 3 webech jsem vypozoroval, že trvanlivost dat v `localStorage` je perfektní. Položky v lokálním úložišti nemají omezenou dobu platnosti, takže vydrží klidně roky.

Kvůli dlouhé trvanlivosti je dobré již nepotřebná data, která se odeslala na server a nejsou dále potřeba, odstranit. Při ukládání velkého množství dat se jinak vyčerpá dostupný [datový limit](/localstorage#velikost) (v některých prohlížečích jen 2 MB).

### Smazání `localStorage` v prohlížeči

Smazat položky z úložiště jde v **Chrome** spolu s *cookies* v *Nastavení → Historie → Vymazat údaje o prohlížení*:

### Selhání úložiště

K selhání uložení dat dojde v případě, že se prohlížeč nebo operační systém zasekne či je **neplánovaně ukončen** (např. výpadek elektřiny).

V tomto případě se může stát následující:

    Neuloží se změny od posledního uložení. Z textového pole třeba zmizí poslední slovo. To je lepší případ.

    Celý obsah položky zmizí. To je hodně nepříjemné a bohužel se to může stát.

    Jde tomu trochu předcházet dělením ukládaných hodnot do více položek nebo jejich duplikováním. Pokud se na střídačku ukládá do dvou položek, měla by alespoň jedna z nich přežít.

## Vyprázdnění úložiště

Ze slušnosti k uživatelům je dobré nepotřebné zálohy z úložiště odstraňovat.

Je ale nutné to dělat až v případě, kdy se data povedlo uložit na straně serveru. Dobře udělané odstranění dat z úložiště tak **nemůže** probíhat v `onsubmit`u formuláře (v tu dobu není jasné, jestli se data dostanou na server).

  Jedno řešení je formulář odesílat [AJAXem](/ajax) a obsah úložiště smazat až v případě úspěšného uložení.

    Druhá možnost je na stránce, kam se přesměruje po odeslání formuláře, zavolat JS funkci pro smazání klíče z `localStorage`.

## Obnovení hodnoty

Lehce záludné je i obnovování hodnot z úložiště. V takovém případě je typicky nutné nastavit příslušné hodnoty z `localStorage` do formulářových prvků.

    - [Automatické zapamatování formulářů](/zalohovani-formularu)

Nastavení hodnot by mělo proběhnout co nejdříve po vykreslení prvku. V opačném případě může návštěvník začít do políčka psát a po načtení obnovovacího skriptu se mu obsah pod rukou přepíše.

```
&lt;form name="formular">
  &lt;input name="jmeno">
  &lt;script>
    obnovitPole(document.forms.formular.jmeno);
  &lt;/script>
&lt;/form>
```

## Upozornění na ukládání/obnovení

  Formulář je průběžně ukládán.

Aby se návštěvník dozvěděl, že jsou formuláře na stránce zálohovány a nemusí se bát, že mu obsah zmizí, jde mu to sdělit nějakou hláškou.

Obnovení hodnot už potom může proběhnout v tichosti.

### Odstranění uložených hodnot

Bez automatického ukládání stavu do `localStorage` znamená stisk klávesy F5 (reload) nebo zavření stránky automatické vyčištění zadaných hodnot.

S ukládáním může tato *funkce* chybět.

Na druhou stranu by funkce *odstranit zálohu* měla mít nějaký potvrzovací mechanismus či možnost návratu, aby si uživatel formulář omylem nenávratně nesmazal.