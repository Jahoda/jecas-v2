---
title: "Získání unikátní barvy pro text v JS"
headline: "Získání unikátní barvy pro text v JS"
description: "Jak pro libovolný řetězec spočítat unikátní barvu."
date: "2023-01-07"
last_modification: "2023-01-10"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

V některých případech se hodí na základě uživatelského obsahu vytvořit barvu.

Například u chybějícího profilového obrázku se může nabízet vytvořit něco jako:

K tomu stačí převést identifikátor uživatele (např. jméno) na kód barvy. Jde k tomu použít následující funkce:

```
function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i &lt; str.length; i++) {
        hash = str.charCodeAt(i) + ((hash &lt;&lt; 5) - hash);
    }
    return hash;
}

function intToRGB(i: number) {
    const c = (i &amp; 0x00ffffff).toString(16).toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
}

function stringToColor(string: string) {
    return `#${intToRGB(hashCode(string))}`;
}
```

Použití:

```
stringToColor("Tomáš Jedno")
```

Jak to funguje?

    První funkce `hashCode` převede řetězec na číslo.

    Funkce začíná s `hash` hodnotou 0 a poté iteruje přes každý znak v řetězci. Pro každý znak pak funkce přidá jeho ASCII  k `hash` hodnotě a poté posune `hash` hodnotu vlevo o 5 bitů a odečte původní `hash` hodnotu. To vytvoří novou `hash` hodnotu, která je závislá na předchozí hodnotě a ASCII hodnotě aktuálního znaku.

    Druhá funkce číslo převede na hexadecimální kód barvy.

    Nejprve provede bitovou operaci AND s číslem `0x00FFFFFF`. Tím nastaví prvních 8 bitů čísla na 0, což efektivně omezí číslo na rozsah 0 až 16777215 (16777215 je rovno 0x00FFFFFF v hexadecimální soustavě).

    Výsledné číslo je poté převedeno na řetězec v základu 16 (hexadecimální) pomocí metody `toString`. Výsledný řetězec je poté převeden na velká písmena pomocí metody `toUpperCase`.

    Nakonec funkce vrátí hexadecimální řetězec, který je případně vyplněný doplněn na začátku nulami tak, aby měl délku 6 znaků. Vyplnění nulami je dosaženo pomocí metody `substring`, která extrahuje část řetězce založené na počátečním a koncovém indexu. V tomto případě je počáteční index 0 a koncový index je 6 mínus délka hexadecimálního čísla.

## Získání iniciál

Pro získání prvních písmen ze jména stačí jméno rozdělit funkcí `split` podle mezery:

[Živá ukázka ve Svelte](https://svelte.dev/repl/40aed0ec00af4ce68fec106d138e7e3e?version=3.55.0)

## Odkazy

    StackOverflow: [Create a hexadecimal colour based on a string with JavaScript](https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript)