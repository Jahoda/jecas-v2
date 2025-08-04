---
title: "Bezstavové HTML"
headline: "Bezstavové HTML"
description: "Jak vytvořit aplikaci, kde se nemění HTML kód."
date: "2014-12-12"
last_modification: "2015-01-11"
status: 1
tags: ["JavaScript", "Rady a nápady", "AJAX"]
---

V dnešní době je poměrně běžné, že je webová stránka **generovaná na serveru**. Dále je poměrně běžné, že HTML kód stránky, který dorazí do prohlížeče, je **odlišný pro různé návštěvníky**.

    **Nepřihlášený** uživatel uvidí někde v menu **přihlašovací formulář / odkaz na registraci**.

    **Nepřihlášený** uživatel, co se na stránku **„podepsal“** (např. poslal příspěvek), může mít předvyplněné jméno na základě cookies.

    **Přihlášený** uživatel uvidí  typicky odkazy na svůj **profil**, odhlášení a podobně.

    **Přihlášený administrátor** potom bude mít k disposici různé **administrační nástroje**.

Myšlenka **bezstavového HTML** je potom taková, že HTML kód pro všechny uživatele **bude 100% stejný** a potřebné rozdíly **zajistí až JavaScript**.

Technicky to proběhne třeba použitím [JSONP](/ajax#jsonp) – připojí se serverový skript, který ověří přihlášení a zavolá funkci pro vykreslení **příslušného uživatelského rozhraní** s předanými argumenty.

```
vykreslitMenu(
  {
    prihlasen: true, 
    administrator: true,
    jmeno: "Administrátor"
  }
);
```

Funkce `vykreslitMenu` na základě těchto hodnot sestaví příslušné menu.

Pochopitelně se může použít i obyčejný AJAX a výsledný HTML kód závislý na uživateli **generovat na serveru** a JavaScriptem ho jen **vlepit na potřebná místa**.

## Výhody

Hlavní výhodou tohoto postupu je 100% **statický obsah**. Díky tomu může být **načítání obsahu rychlejší** – není potřeba žádná **podpora programovacího jazyka** na severu. Také není problém dlouhodobě kešovat **celé HTML stránky**.

V případě aplikace se *stavovým HTML* jde sice používat *cache*, ale jen pro určité části, navíc určitý čas zabere sestavení výsledné podoby (zvlášť při použití nějakého **frameworku** to může zdržet načítání i o desítky milisekund).

Mají-li navíc být **uživatelské ovládací prvky** různě po stránce (například volba *Upravit* u všech vlastních příspěvků), je nemožné kešovat větší **souvislé finální bloky** obsahu.

Nakonec **vyhledávače** uvidí jen samostatný obsah bez nerelevantních zbytečností jako je **přihlašovací formulář** a podobně, protože je vytvoří až JavaScript.

## Nevýhody

Asi největší nevýhodou je nutnost načítání první stránky *nadvakrát*.

  - Stáhne se bezstavové HTML.

  - Zavolá se další JS požadavek pro *získání stavu*.

V kombinaci s **načítáním obsahu všech stránek AJAXem** to ale nemusí příliš vadit. Podstatná část (obsah) se načte díky **statické podobě** bleskurychle a při přechodu na další stránku se bude jen nahrazovat obsah ze statických souborů.

Další nevýhoda je **nefunkčnost uživatelské části bez JavaScriptu**, což ale v dnešní době většinou moc nevadí.

## Odkazy jinam

  Stop writing stateful HTML