---
title: "Ukládání hesel"
headline: "Ukládání hesel"
description: "Jakým způsobem bezpečně ukládat hesla uživatelů."
date: "2015-01-16"
last_modification: "2015-01-16"
status: 0
tags: []
---

Pokud mají mít uživatelé možnost se na webové stránce **přihlašovat** a nepoužije se přihlašování prostřednictvím třetích stran (**Facebook**, **Twitter** nebo **Google** účtem), musí se řešit **ukládání hesel**. Většinou do database.

## Jak ukládat hesla

Poučky o bezpečném ukládání hesel obsahují většinou následeující doporučení:

    Heslo **neukládat v původní podobě**, jak ho uživatel zadá (tzv. v *plaintextu*), ale zahashovat ho. Existují funkce, které dokaží převést textový řetězec na jiný řetězec – hash.

    Hashovací operace je **jednosměrná**. Z  hashe není možné zpětně získat **původní řetězec**. Jediný způsob, jak *hash* prolomit je zjistit hashe pro všechny kombinace znaků a výsledek zpětně porovnat.

    MD5 hash hesla „heslo“ bude vypadat následovně:

    ```
md5(heslo) = 955db0b81ef1989b4a4dfeae8061a9a6
```

    Jelikož pro **známé hashovací funkce** existují tabulky (tzv. *rainbow tables*), kde jsou pro řadu řetězců hashe už spočítané, používá se tzv. **sůl**. Bez použití soli jdou MD5 hashe jednoduchých hesel rozlousknout vložením do Googlu:

    Pojmem *sůl* se rozumí nějaký řetězec, který se před zahashováním přidá k uživatelem zadanému heslu.

    Pokud se k heslu „heslo“ přidá sůl „fytopuf“, vznikne zcela rozdílný hash:

    ```
md5(heslo**fytopuf**) = 2d77830ef0400a8dc818ad92786495d3
```

    To by *Google testem* už prošlo, pokud by neexistovala tato stránka:

    Aby se ztížilo používání metody hrubé síly, kdy se pro nejrůznější řetězce počítají odpovídající hashe, používá se pro hashování **pomalý algoritmus**.

    Když útočník získá osolené hashe, zjistí jaká je sůl a hashovací postup, mohl by v případě použití rychlého algoritmu (jako je MD5) začít počítat hashe pro různé kombinace znaků a hledat shodu.

    Použití pomalého algoritmu útočníka při počítání hashů **značně zdrží**.

    Ověření při přihlášení potom sice trvá třeba vteřinu, což návštěvník skoro ani nepostřehne, ale pro útok hrubou je to značná překážka.

Při dodržení těcho podmínek je velká šance, že ani člověk s **přístupem do databáse** nedokáže zjistit **skutečná hesla** registrovaných uživatelů.

## Proč nehashovat hesla

Z pohledu provozovatele má **ukládání hesla v původní podobě** (nebo primitivně zahashované funkcí typu `md5`, což se dá rozlousknout váše zmíněným zadáním do Google) několik výhod. Některé jsou možná trochu za hranou.

### Ověření uživatele

Při ověřování uživatele například po telefonu, je snazší, když provozovatel webu heslo vidí v originální podobě, než aby ho zadával.

### Trestání uživatele

Pokud nějaký uživatel dělá na stránce neplechu a používá **stejné heslo pro více služeb**, může se povést se jeho dalších služeb zmocnit.

### Šmírování

Při použití jednoho hesla pro více služeb vznikne přiležitost se uživateli podívat do jiných profilů a zjistit o něm více informací.

## Proč hashovat hesla?

Z pohledu provozovatele většiny běžných webových aplikací existuje v zásadě jediný důvod:

  **Vyhnout se ostudě**, když se někdo s nekalými úmysly dostane k databási.

V DB se obvykle nacházejí mnohem cennější data než *nějaká* uživatelská hesla – **e-maily**, **telefonní čísla** nebo **ekonomické výsledky** a podobně.

## Správce hesel

Protože většina lidí používající internet navštěvuje a přihlašuje se na spoustě webových stránek, má tak dvě možnosti:

  - Používat stejná hesla pro více služeb.

  - Použít správce hesel.

Mít **stejné heslo** pro více služeb je risikové v tom, že stačí jediná špatně zabezpečená webová služba, která bude kompromitována, a útočník může nabourat všechny další účty používající totéž heslo.

V případě používání téhož hesla pro více služeb je alespoň dobré mít **odlišné unikátní heslo pro e-mailovou schránku**, kterou jde typicky použít pro resetování hesel ostatních služeb.

## Dvoufasové ověřování

Protože navrhnout jediný způsob ověření uživatele, aby byl obtížně prolomitelný, je dost obtížné, používá se kombinace několika způsobů dohromady – to se nazývá jako **vícefasové/vícefaktorové ověření**.

V praxi webových aplikací se jde typicky setkat s ověřováním pomocí SMS zpráv.

## Posílání hesla na e-mail

Hesla **neposílat e-mailem**.

Pokud se heslo nehashuje na straně klienta v JavaScriptu, na server **dorazí v plaintextu**, jak ho uživatel zadal. Aplikace tak může uživateli po registraci poslat e-mail, kde bude **jméno i heslo čitelné**.

To je potenciálně risikové, protože e-mailová schránka většiny lidí není žádný bezpečný tresor.

## Hesla jsou soukromé informace

## Hashování na straně klienta

Na první pohled se může zdát rozumné heslo hashovat místo na serveru už v **prohlížeči uživatele** pomocí JavaScriptu. V takovém případě by se v čitelné podobě heslo **na server vůbec nepřenášelo**.

Na serveru by se pouze porovnal hash spočítaný v prohlížeči s hashem z DB.

Toto řešení by ale mělo problém v tom, že by se člověk s přístupem do database mohl **přihlásit za kohokoliv** použitím jeho hashe.

Hashování na straně klienta by tedy mělo být maximálně doplněk k hashování na serveru. Přenos hesla na server je lepší zabezpečit pomocí [HTTPS](/https). Navíc se bez hashování v prohlížeči půjde přihlásit i bez JavaScriptu.

## Problémy hesel

Základní problémy hesel jsou následující:

  - Pro člověka je **obtížné si heslo zapamatovat**, ale pro stroj je relativně snadné ho rozlousknout.

  - **Správa hesel pro stovky různých služeb** je značně komplikovaná. Programy pro správu hesel jsou potom spíš nouzové řešení.

### Řešení

Obejít tyto problémy jde přihlašováním přes centrální službu jako je přihlašování přes [Facebook](/facebook) nebo [Twitter](/twitter).

Jiná možnost je pro přihlašování nepoužívat hesla, ale zasílat jednorázové přihlašovací odkazy na e-mail. Zde může být problém v případě, že e-mail dojde pozdě.

    - Sitepoint: [Why Passwordless Authentication Works](http://www.sitepoint.com/passwordless-authentication-works/)

Hudbou budoucnosti by mohly být authentikační aplikace, které by při pokusu o přihlášení zobrazily pro uživatele dotaz, zda se chce do konkrétní služby opravdu přihlásit:

    - [Replacing Passwords with Out-of-band Challenges](https://danielmiessler.com/blog/replace-passwords-out-of-band-challenges/)