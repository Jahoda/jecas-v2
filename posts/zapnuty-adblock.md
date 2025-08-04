---
title: "Detekce Adblocku"
headline: "Detekce blokování reklam Adblockem"
description: "Jak detekovat, že si uživatel na stránce blokuje reklamy. Dá se „ad block“ obejít?"
date: "2014-01-07"
last_modification: "2014-01-08"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "Reklama"]
---

Pokud máme na stránce reklamy, uživatel je může nástroji typu [Adblock](http://cs.wikipedia.org/wiki/Adblock) zablokovat. Tuto skutečnost může být zajímavé zjistit:

  - Logovat si uživatele, kteří **blokují reklamy**.

  - **Uživatelům s Adblockem** vynadat, **stránku nezobrazit**, zobrazit **jinou reklamu** a podobně.

## Zjištění zapnutého Adblocku

Jak zjistit, že návštěvník blokuje reklamu, je možné více způsoby.

  - U vlastních reklam (na vlastním serveru) se dá při načtení reklamy uložit cookie. Potom stačí zjistit, jestli uživatel prochází první stránku, a když ne a zároveň mu chybí cookie z reklamy, nejspíš **blokuje reklamu**.

  - Při používání externích reklam typu **Google AdSense** můžeme blokování detekovat fingovanou reklamou.

### Detekce Adblocku

Momentálně jde využít třeba toho, že Adblock jako reklamu považuje element s ID „reklama“.

Tímto prinicipem je zároveň možné uživatelům Adblocku skrýt obsah stránky — stačí obalovému elementu přidat `id="reklama"`.

```
&lt;div id="reklama">
  Obsah bude zablokován jako reklama.
&lt;/div>
```

Když tedy takový testovací `&lt;div>` vložíme na web a po načtení stránky (`window.onload`) spustíme [časovačem](/odpocitavani) třeba s prodlevou 1000 milisekund test, zda je tento `&lt;div>` viditelný, v případě negativního výsledku byl obsah skryt Adblockem. [Ukázka](http://kod.djpw.cz/qzab).

```
window.onload = function() {
  setTimeout(function() {
    var reklama = document.getElementById("reklama");
    if (reklama.clientWidth == 0) {
      // Reklama byla zablokována
    }
  }, 1000);
}
```

## Jak obejít Adblock

Že je možné blokování reklam detekovat je sice hezké, ale nešlo by tomu blokování zabránit?

Stručně řečeno **ne**. Jediná možnost, jak mít na stránce reklamu, která **nebude zablokována**, je mít reklamu netradiční, na kterou (ještě) nejsou v Adblocku vytvořeny filtry. Nebo ji lze filtrovat obtížně.

Pokud bude reklama spočívat v HTML odkazu a `&lt;img>` obrázku, půjde totiž **těžko vytvořit** účinný filtr, který by toto blokoval, ale běžný nereklamní obsah zůstal zachován.

### Dvě vrstvy reklamy

Zajímavý postup je umístit obtížně filtrovatelnou reklamu a až přes tu umístit AdSense / jinou *profláklou* reklamu (docílit toho lze [absolutním posicováním](/position#absolute)).

  - Návštěvníkům bez Adblocku se zobrazí *plná* reklama,

  - blokujícím se objeví alespoň nějaká reklama.

## Trestání návštěvníků s vypnutými reklamami

V případě úvahy o nějakém penalisování uživatelů, co blokují reklamy, je dobré zvážit, zda **návštěvník s Adblockem** není pořád lepší než **žádný návštěvník** (může na stránku odkázat další návštěvníky, co reklamu neblokují).

U reklamy, kde jsou placené prokliky, blokování nemusí moc vadit. Uživatelé blokující reklamy nejspíš ani nebudou na případně objevivší se reklamy klikat. Blokování tedy positivně zvýší míru prokliku ve statistikách.