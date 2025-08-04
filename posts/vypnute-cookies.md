---
title: "Vypnuté cookies"
headline: "Zjištění vypnutých cookies"
description: "Jak zjistit, jestli má návštěvník zapnuté nebo vypnuté cookies."
date: "2014-04-22"
last_modification: "2014-12-14"
status: 1
tags: ["JavaScript", "Hotová řešení", "Prohlížeče"]
---

Cookies jsou **data v prohlížeči návštěvníka**, která se při požadavku na stránku přenášejí na server, ten podle nich může uživatele identifikovat a například mu zobrazit, že je přihlášen.

Ačkoliv není v dnešní době příliš běžné, že by návštěvník **neměl podporu / měl vypnuté cookies**, pokud je aplikace vyžaduje, je dobré o tom informovat, když **nebudou zapnuté**.

Může se stát, že si je návštěvník **omylem vypne** a nepůjde se mu z pro něj neznámé příčiny například **přihlásit**. Hláškou o tom, že stránka cookies potřebuje, mu můžeme pomoci. Případně to ještě vylepšit **návodem/postupem**, jak toho ve svém prohlížeči dosáhne.

## Detekce vypnutých cookies v JavaScriptu

Testovat zapnutí nebo vypnutí cookies je možné JavaScriptem přes `navigator.cookieEnabled`.

```
if (!navigator.cookieEnabled) {
  alert("Cookies jsou vypnuté");
}
```

[Živá ukázka](http://kod.djpw.cz/oucb)

Podle mých testů se [**Internet Explorer 11**](/ie11) při určitém zablokování cookies může stále tvářit, že jsou zapnuté – `navigator.cookieEnabled` vrací `true`.

**IE** totiž umožňuje nastavení pravidel pro ukládání cookie na **několik úrovní + vlastní nastavení**, které potom blokují různé typy cookies. Zdá se, že pro cokoliv jiného než nejvyšší volbu „**Blokovat všechny soubory cookie**“ vrátí `navigator.cookieEnabled` hodnotu `true`, nezávisle na tom, jestli bude **možné cookie nastavit** nebo ne, což například na druhou nejvyšší úroveň („**Vysoká**“) nepůjde.

Stejně tak v případě vlastního nastavení.

Nejspolehlivější možnost je proto **cookie zkusit vytvořit** a testovat, zda se to povedlo. Ideální je i použít stejnou `path` a `expires` jako se používají v aplikaci.

```
function zapnuteCookies() {
  // vytvoříme testovací cookie
  document.cookie = "testovaci-cookie";
  return (document.cookie.indexOf("testovaci-cookie") > 0);
}
```

[Živá ukázka](http://kod.djpw.cz/tqib)

Možná by se nabízelo na začátku testovat, jestli už nějaká cookie v prohlížeči není.

```
if (document.cookie.length > 0) {
  return true;
}
```

Bohužel to opět nebude spolehlivé, neboť může nastat případ, kdy nějaké cookies pro stránku existují, ale **přidávání nových je blokováno**. Můžeme ale testovat přítomnost skutečné cookie **potřebné k identifikaci** a v takovém případě už zjišťování pomocí vytvoření testovací cookie neprovádět.

## Detekce zapnutých cookie na straně serveru

Na straně serveru je jediná možnost:

  - **vytvořit cookie**,

  - **přesměrovat** (klidně na tu samou stránku),

  - **testovat**, jestli cookie z kroku 1 existuje

To je pro samotnou detekci značně nepraktické, ale v případě, že uživatel například vyplní a odešle **přihlašovací formulář**, můžeme na stránce, kam bude v případě úspěšného přihlášení přesměrován, zjistit, že cookie, která by měla, **neexistuje**.

## Zapnutí/vypnutí cookies v prohlížečích

### Internet Explorer

*Nástroje* Alt + X → *Možnosti Internetu* → *Osobní údaje* → *Vyberte nastavení pro zónu Internetu*

### Chrome

*Nastavení* (`chrome://settings/`) → *Zobrazit rozšířená nastavení...* → *Ochrana soukromí* → *Nastavení obsahu* → *Soubory cookie*

### Firefox

*Možnosti* → *Soukromí* → *Historie* → *Použít pro historii vlastní nastavení.*

### Opera

*Nastavení* → *Soukromí &amp; Bezpečnost* → *Cookies*

## Anonymní režim

Pro účely testování, jak bude webu fungovat, když na něj přijde člověk **bez žádných cookies**, mohou dobře posloužit **anonymní režimy prohlížečů**.

  - **Firefox** – Ctrl + Shift + P

  - **Chrome** – Ctrl + Shift + N

  - **Opera** – Ctrl + Shift + N

## Odkazy jinam

  - MDN: [Navigator.cookieEnabled](https://developer.mozilla.org/en-US/docs/Web/API/Navigator.cookieEnabled)

  - MSDN: [cookieEnabled property](http://msdn.microsoft.com/en-us/library/ms533694(v=vs.85).aspx)