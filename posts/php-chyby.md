---
title: "Jak vypnout/zapnout zobrazování chyb v PHP"
headline: "(Ne)zobrazování chyb v PHP"
description: "V PHP jde nastavit typy chyb, které se zobrazují. Jak to udělat správně?"
date: "2019-04-08"
last_modification: "2019-04-08"
status: 0
tags: []
---

Pro nastavení zobrazování chyb (tzv. *error reporting*) existuje v PHP 16 předdefinovaných konstant:

  - `E_ERROR`

- `E_WARNING`

- `E_PARSE`

- `E_NOTICE`

- `E_CORE_ERROR`

- `E_CORE_WARNING`

- `E_COMPILE_ERROR`

- `E_COMPILE_WARNING`

- `E_USER_ERROR`

- `E_USER_WARNING`

- `E_USER_NOTICE`

- `E_STRICT`

- `E_RECOVERABLE_ERROR`

- `E_DEPRECATED`

- `E_USER_DEPRECATED`

- `E_ALL`

Jak ale hlášení chyb nastavit?

Obecně platí, že:

    Pro **vývoj** se hodí **co největší přísnost**, protože i nekritické chyby mohou signalisovat potenciální risiko v kódu. Možnou budoucí nekompatibilitu apod.

    Pro **produkci** naopak nezobrazovat **vůbec nic**, protože výchozí PHP hlášky jsou:

      - ne úplně přívětivé pro uživatele,

      - mohou zbytečně odhalovat části aplikace (např. adresářovou strukturu)

    Výjimka může být **starší aplikace**, kde by zapnutí všech chybových hlášek svým množstvím paralysovalo vývojáře.

## Základní typy chyb

Zjednodušeně lze chyby zařadit do 4 kategorií:

    **Fatální chyby** – ukončí běh PHP, takže další kód po chybě se už nezpracuje. Typicky jde o *parse errory* (chybu v syntaxi – např. chybějící `;`) nebo o volání neexistujících funkcí nebo tříd.

    **Varování** – kód pokračuje ve zpracování, ale jde o poměrně zásadní problém, který při ignorování může způsobit nepředvídané chyby aplikace. Příklad je třeba dělení nulou (`1/0`) nebo vkládání neexistujícíh souborů příkazem `include`.

    **Poznámky** (*Notice*) – 

## Zobrazení všech chyb

```
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
```

## Vypnutí zobrazování chyb

```
error_reporting(0);
```

https://stackify.com/display-php-errors/