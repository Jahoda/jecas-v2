---
title: "Měření AdBlocku v Google Analytics"
headline: "Měření blokování reklam v Google Analytics"
description: "Jak pomocí Google Analytics změřit návštěvníky, kteří blokují reklamy."
date: "2015-02-23"
last_modification: "2015-02-28"
status: 1
tags: ["Hotová řešení", "Google Analytics", "Reklama"]
---

Pokud je webová stránka závislá na **finančním příjmu z reklamy**, může se hodit měřit návštěvníky, kteří **reklamu blokují**.

Tento údaj se hodí pro potenciální zájemce o reklamu na daném webu nebo pro rozhodování, jaký typ reklamy zvolit. Zatímco používání rozšířených reklamních systému typu **AdSense** od [Google](/google) nebo **Sklik** od [Seznamu](/seznam) bude nástrojem pro **blokování reklam** prakticky určitě blokováno, jiný způsob reklamy může **filtru AdBlocku** utéci.

## Detekce blokování reklamy

Aby bylo co v GA ([Google Analytics](/ga)) měřit, musí se v první řadě blokování reklamy detekovat.

    - [Detekce blokování reklam Adblockem](/zapnuty-adblock)

K tomu stačí na stránku přidat element s identifikátorem `reklama` a nastavit mu například nějakou výšku.

```
&lt;div id="reklama" style="height: 2px">&lt;/div>
```

A po nějaké době takový element **přeměřit**. Když bude jeho výška nulová, nejspíš byl zablokován jako reklama.

```
window.onload = function() {
  setTimeout(function() {
    var reklama = document.getElementById("reklama");
    var stav;
    if (reklama.clientWidth == 0) {
      // Reklama byla zablokována
      stav = "Ano";
    }
    else {
      stav = "Ne";
    }
    // Odeslání dat do Google Analytics
    ga('send', 'event', 
      'Adblock', 
      stav, 
      {'nonInteraction': true}
    );
  }, 1000);
}
```

Stav blokování reklamy se zaloguje jako událost do Google Analytics.

    - [Měření akcí v Google Analytics](/ga-mereni)

Aby toto měření neovlivňovalo *bounce rate* (míru opuštění stránky), používá se parametr [`nonInteraction`](/ga-mereni#nonInteraction), kterým se předá informace, že se tato událost nemá brát jako **interakce se stránkou**.

## Výsledek

Výsledky měření jsou následně k disposici pod *Chování → Události → Přehled → Adblock*.

Po kliknutí na kateogirii *Adblock* je nutné zvolit primární dimensi *Akce události*.

Nyní by se měl konečně zobrazit podíl návštěvníků, kteří reklamu blokují. Pro tento web je to kolem 20 %.

## Vyhodnocení

Jak už to tak bývá, data nejsou úplně přesná. Pokud si návštěvník kromě reklam blokuje i měřicí skripty jako je GA, do přehledu se tato informace nedostane.