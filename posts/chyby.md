---
title: "Chyby při programování"
headline: "Jak zobrazit chybové hlášky"
description: "Při odstraňování problému v HTML/CSS/JS/PHP/SQL je nutný přístup k chybovým hláškám, jak se k nim dostat?"
date: "2015-01-27"
last_modification: "2015-01-29"
status: 1
tags: ["HTML", "JavaScript", "CSS", "Rady a nápady", "PHP", "SQL"]
---

Když něco **nefunguje**, často takový stav doprovází **varovná nebo chybová hláška**. Problém je, že ne vždy člověk ví, jak si ji zobrazit.

## JavaScript

Chyba v JavaScriptu probíhá zpravidla v tichosti – prohlížeče běžné návštěvníky neupozorňují, že k chybě na stránce došlo.

Nešťastný programátor má nefunkční web a vůbec netuší proč. Prohlížeče naštěstí disponují tzv. **chybovou konsolí**, kde se problémy vypisují. Tento nástroj se nachází ve [vývojářských nástrojích](/vyvojarske-nastroje) skoro všech prohlížečů (klávesová zkratka F12 nebo Ctrl + Shift + I).

## Chyby v HTML

HTML je k chybám hodně tolerantní, takže spoustu chyb nemusí vůbec ničemu vadit. Může ale dojít k tomu, že prohlížeč **pochopí chybné HTML jinak**, než zamýšlel jeho autor.

```
&lt;p>
  Odstavec.
  &lt;ul>
    &lt;li>Seznam v odstavci&lt;/li>
  &lt;/ul>
&lt;/p>
```

Jelikož v HTML nemůže být seznam v odstavci, odstavec se před ním sám ukončí a zbytečnou koncovou značku `&lt;/p>` bude prohlížeč ignorovat.

    - [Různé druhy HTML značek](/html-znacky) – povinné a nepovinné počáteční či koncové značky

Další časté chyby, které vadí, jsou **zapomenutá ukončovací značka**, překlepy a další.

Chyby tohoto druhu většinou umí odhalit **HTML validátor**.

    - [Český validátor](http://validator.webylon.info)

    - W3C: [Markup Validation Service](http://validator.w3.org/) (oficiální validátor v angličtině)

## CSS chyby

Když je v CSS chyba, podobně jako v HTML to **nezpůsobují fatální selhání** a stránka s chybami může žít dál svým životem. Někdy se chyby vytvářejí záměrně pro [hackování prohlížečů](/hacky) – psaní různých pravidel pro odlišené prohlížeče.

Nejčastěji je problém:

    Překlep/chyba v [selektoru](/css-selektory), kdy se daná deklarace nemá na co aplikovat. Nabízí se pro takový selektor nastavit něco výrazného (např. `color: red`), aby se vůbec ověřilo, že to něco dělá.

    **Špatný název vlastnosti** – ta se pro prohlížeč bude tvářit jako neexistující. Často na to umí upozornit editor odlišným barvením kódu.

    **Chyba v hodnotě** CSS vlastnosti.

**Kontrolní otázka**: Jak bude vypadat následující odstavec? (Za `color: red` chybí středník.)

```
p {
  color: red
  background: yellow;
  font-weight: bold;
}
```

  function odpoveded(cislo) {
    var cekam = document.getElementById("cekam");
    var vysvetleni = document.getElementById("vysvetleni");
    cekam.style.display = (cislo == 4) ? 'none' : ''; 
    vysvetleni.style.display = (cislo == 4) ? 'block' : 'none'
  }

  - červený a tučný s žlutým pozadím (prohlížeč si poradí)

  - červený a tučný

  - tučný s žlutým pozadím

  - jen tučný

Čekám na správnou odpověď…

  **Správně**.

  V CSS se jako hodnota vlastnosti chápe celý obsah mezi dvojtečkou a středníkem (`;`) nebo koncovou závorkou (`}`). Z kódu výše tedy vznikne:

```
p {
  color: red background: yellow;
  font-weight: bold;
}
```

  A protože „`red background: yellow`“ není vyhovující barva, zbude jediná platná deklarace `font-weight: bold`.

  [Živá ukázka](http://kod.djpw.cz/qxjb)

  Taková chyba se objeví u stylů při prozkoumávání elementů:

vysvetleni.style.display = "none";

Jako u HTML jde použít i automatický validátor. Kromě chyb zobrazuje i platnou podobu CSS. Chybný kód občas umí **automaticky opravit**.

    - W3C: [CSS Validation Service](https://jigsaw.w3.org/css-validator/) (oficiální validátor v angličtině)

## PHP

Nejzáludnější situace je na **straně serveru**. V PHP často drobná chyba znefunkční celou stránku.

    Různé redakční systémy nebo frameworky v ostrém provozu **vypínají hlášení chyb**.

    **Zobrazování chyb** jde typicky potlačit i v administraci webhostingu pod volbou „Nastavení PHP“, „Konfigurace PHP“ a podobně. Konkrétní nastavení se jmenuje `display_errors` (nachází se v `php.ini`).

      Nastavení `display_errors` u Wedosu

      Nastavení `display_errors` u webhostingu Ebola

Nezobrazovat návštěvníkům **výchozí chybové hlášky PHP** je obecně dobrý postup. Zároveň je ale vhodné je ukládat někam, kde je uvidí administrátor/programátor. Při vývoji je nejsnazší mít zobrazení chybových hlášek zapnuté.

### Hlášení chyb v PHP

Pro regulování zobrazování chybových hlášek se v PHP používá funkce [`error_reporting`](http://php.net/manual/en/function.error-reporting.php):

```
// vypne výpis všech chyb
error_reporting(0);
```

Pro ladění aplikace je vhodné nastavení:

```
// všechny chyby bez poznámek
error_reporting(E_ALL &amp; ~E_NOTICE);
```

Případně zobrazovat úplně vše, tedy i *poznámky*, které **nejsou kritické**, ale mohou upozornit na potenciální problém jako nedeklarované proměnné a podobně.

```
// všechny chyby
error_reporting(E_ALL);
```

## Chybové hlášky v redakčních systémech

### WordPress

Při chybě může nastat tzv. *bílá obrazovka smrti*, kdy se na adrese webu vůbec nic neobjeví.

Pro zjištění příčin pomocí **vypsání chybových hlášek** se zapíná *debugovací režim* v souboru `wp-config.php`:

```
define('WP_DEBUG', **true**);
```

### Joomla!

Hlášení chyb se nastavuje v souboru `configuration.php` do proměnné `$error_reporting`. Vztah mezi PHP funkcí `error_reporting` a Joomlou je následující:

  - `-1 =  0 ` – žádné chyby se nezobrazí.

  - `30711 =  E_ALL &amp; ~(E_NOTICE|E_WARNING)` – všechny chyby bez varování a poznámek

  - `30711 =  E_ALL &amp; ~E_NOTICE` – všechny chyby bez poznámek

  - `30719 =  E_ALL` – všechny chyby

Kromě souboru `configuration.php` se dá úroveň hlášení chyb měnit i v administraci: *Globální nastavení* → *Server* → *Hlášení chyb*.

## Výpis chyb v MySQL

Pro ladění (zvlášť složitějších) dotazů je vhodné použít nástroj typu [Adminer](http://www.adminer.org/cs/), kde se kromě syntaktické správnosti dotazu dá snadno zjistit, jestli [SQL](/sql) dotaz **vrací správná data**.

Adminer vypisuje případné chyby v dotazu. Na jedno kliknutí nabízí i funkci `EXPLAIN`, která se hodí při rychlostní optimalisaci dotazů.

Před implementací komplikovanějšího dotazu je tedy dobré si ho napřed odladit v podobném nástroji.

### SQL chyba v PHP

V závislosti na použitém rozhraní pro práci s DB je i odlišný způsob zobrazování chyb.

  `mysql_error`
  
    V již zavrženém rozhraní `mysql_*` se chyba vypíše použitím funkce `mysql_error()` po daném dotazu.

    ```
// dotaz;
echo mysql_error();
```

  MySQLI
  
    U nástupce MySQL stačí zavolat `$mysqli->error`, kde `$mysqli` je instance třídy `mysqli`:

    ```
*$mysqli* = new **mysqli**("localhost", "uživatel", "heslo", "databáze");
// dotaz
echo $mysqli->error;
```

    Pro výpis chyby v připojení se používá `$mysqli->connect_error`.

  PDO
  
    V [PDO](/pdo) jde použít `$pdo->errorInfo()` nebo používat `try` – `catch` a `getMessage()`.

    try {
  $sql = $pdo->prepare($dotaz);
  $sql->execute($data);
}
catch (PDOException $e) {
  $chyba = $e->getMessage();
}

## Kumulace chyb

Jelikož webové aplikace často používají klidně [MySQL](/sql), [PHP](/php), [JavaScript](/js), [CSS](/css) a [HTML](/html) najednou, může se chyba vyskytnout na každém článku tohoto řetězce. A to i **současně**.

To se potom těžko hledá.

Předcházet kumulaci jde **skládáním výsledku po kouscích** a testováním jednotlivých částí samostatně.

### Příklad

Na stránce bude seznam, kterému se má nastavit CSS získané JavaScriptem pomocí [AJAXu](/ajax) přes PHP z databáse.

Může se stát, že…

  - SQL dotaz nevrátí potřebná data.

  - PHP výsledek dotazu špatně zpracuje.

  - JavaScript špatně použije AJAX nebo chybně nastaví CSS.

  - V CSS bude chyba (třeba zapomenutý středník), takže bude dělat něco jiného.

  - HTML seznam bude v odstavci, což nejde, takže domnělý CSS selektor `p ul {}` nic nechytí.

## Logické chyby

Zvláštní skupinou chyb jsou případy, kdy se žádná **chybová hláška** nikde neukazuje, nic nenasvědčuje problému, ale aplikace *nefunguje*.

Důvodem je, že programátor naprogramoval **něco jiného, než si myslí**.

Zde je řešením rozdrobit kód na malé celky a testovat je jednotlivě. Nebo se někoho [zeptat](http://djpw.cz)…