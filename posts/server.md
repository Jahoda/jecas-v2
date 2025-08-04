---
title: "PHP $_SERVER"
headline: "PHP pole <code>$_SERVER</code>"
description: "Co užitečného obsahuje v PHP vestavěná proměnná <code>$_SERVER</code>."
date: "2014-04-29"
last_modification: "2014-04-29"
status: 1
tags: ["Rady a nápady", "PHP"]
---

Celá [proměnná `$_SERVER`](http://cz2.php.net/manual/en/reserved.variables.server.php) obsahuje spoustu údajů. Které jsou **nejzajímavější a nejpoužívanější**?

  `$_SERVER["REMOTE_ADDR"]`

    Obsahuje IP adresu návštěvníka.

  `$_SERVER["HTTP_REFERER"]`

    Informace o předchozí navštívené stránce. Může být prázdné v případě, že:

      - Návštěvník zadal adresu přímo do prohlížeče.

      - Posílání [referreru](/referer) je uživatelem zakázáno nebo ho blokuje [`rel=noreferrer`](/noreferrer).

  `$_SERVER["HTTP_USER_AGENT"]`

    Z hlavičky `user-agent` je možné zjistit informace o **prohlížeči**, **operačním systému** a podobně.

    Tytéž informace umí zjistit i JavaScript přes `navigator.userAgent`.

  document.write(navigator.userAgent);

    Hodnota `$_SERVER["HTTP_USER_AGENT"]` se dá využívat k [detekcím verse prohlížeče](/css-pro-ie#detekce) nebo třeba ke zjištěné [prohlížeče mobilního](/mobilni-web#detekce).

  `$_SERVER["REQUEST_URI"]`

    URL aktuální stránky očištěná o doménu. Pro stránku `http://jecas.cz/server` bude `REQUEST_URI` obsahovat `/server`.

    Využití se najde při **přepisování adres** s využitím souboru `.htaccess` nebo **logování akcí uživatelů**, kde je vhodné URL ukládat.

  `$_SERVER["QUERY_STRING"]`

    Taktéž se týká URL a obsahuje obsah `$_SERVER["REQUEST_URI"]` za otazníkem, pokud za otazníkem nějaký obsah je.

  `$_SERVER["HTTP_ACCEPT_LANGUAGE"]`

    Dá se používat k **detekci jazyku uživatele**. Obsah může vypadat takto:

    ```
cs-CZ,cs;q=0.9,en;q=0.8
```

    Hodnota za `q=` uvádí prioritu daného jazyka (vyšší číslo = vyšší priorita). Dá se ovlivnit v **nastavení prohlížeče**.