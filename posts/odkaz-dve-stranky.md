---
title: "Otevření 2 stránek jedním odkazem"
headline: "Otevření 2 stránek jedním odkazem"
description: "Jak jedním odkazem otevřít dvě různé stránky."
date: "2016-04-09"
last_modification: "2016-04-12"
status: 1
tags: ["HTML", "JavaScript", "Odkazy", "Reklama"]
---

Tato technika je celkem rozšířená u pornowebů a stránek, které nemají problém s hodně otravnou reklamou:

```
&lt;a 
href="http://jecas.cz" 
target="_blank" 
onclick="window.location = 'http://djpw.cz'">
  Odkaz na Ječas a Diskusi JPW
&lt;/a>
```

Níže uvedený odkaz po kliknutí zobrazí v nové záložce stránku `jecas.cz` (díky [`target="_blank"`](/odkaz#target)) a v aktuální přejde na `djpw.cz` (díky `window.location` u události [`onclick`](/udalosti-mysi#onclick)):

    Odkaz na Ječas a Diskusi JPW

Podobného efektu jde docílit i pomocí otevření nového okna přes [`window.open`](/nove-okno) (při vynechání `target="_blank"`).

```
&lt;a 
href="http://jecas.cz"
onclick="window.open('http://djpw.cz');">
  Odkaz na Ječas a Diskusi JPW
&lt;/a>
```

## Využití

Většinou se tento postup používá k zobrazení reklamy. Návštěvník klikne na odkaz, cíl se mu zobrazí v nové záložce, ale na pozadí se skriptem přesměruje na stránku s reklamou.

Jde toho využít i pro získávání **provisí z affiliate programů**. Samotná návštěva stánky s identifikátorem v URL na pozadí stačí k uložení [cookie](/cookies), která zajistí případné budoucí připsání provisí. Návštěvník si toho nemusí ani moc všimnout, protože otevření stránky na pozadí ho nevyruší od běžného prohlížení.

Jde použít i opačný postup, kdy se běžný cíl odkazu načte do stávajícího okna a *reklama* do nového. V takovém případě je ale návštěvník značně vyrušen reklamou.

## Cíl odkazu

Po najetí na odkaz se (u desktopových prohlížečů) ve stavovém řádku obvykle zobrazuje cíl odkazu.

I tuto případnou možnost, jak odhalit odkaz vedoucí jinam, než se očekává, jde ale obejít:

  [Odkaz na jecas.cz, nebo kod.djpw.cz?](http://jecas.cz)

Stačí k tomu jen při `onmousedown` prohodit cíl odkazu.

## Neměly by to blokovat?

Je k úvaze, zda by toto chování neměly prohlížeče blokovat.

  Ani ne, procházení pornowebů by už nebylo tak zábavné jako teď.

  – **habendorf**

Napadá vás jiný důvod, proč toto chování umožnit?