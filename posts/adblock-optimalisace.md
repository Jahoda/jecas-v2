---
title: "Optimalisace pro AdBlock"
headline: "Optimalisace pro AdBlock"
description: "Jak stránku optimalisovat, aby ji nerozbilo blokování reklam AdBlockem."
date: "2016-01-20"
last_modification: "2016-02-16"
status: 1
tags: ["Prohlížeče", "Rady a nápady", "Reklama"]
---

Blokování reklam je mezi internetovými uživateli celkem populární. Třeba na tomto webu ji blokuje přibližně 25 % návštěvníků, ačkoliv tu reklama prakticky není.

  Lidé neblokují reklamu u konkrétního webu na základě toho, že by je reklama obtěžovala, ale universálně u všech stránek.

Jak počet blokování změřit popisuje následující článek:

    - [Měření blokování reklam v Google Analytics](/podil-adblocku)

K tomu, že web bez reklam rozbije AdBlock plugin, tak přijde webmaster jako slepý k houslím. Na vině jsou nejspíš provozovatelé webů, kteří svůj web totálně zaneřádili reklamou.

Nezbývá než *se s tím smířit* a agresívní filtry AdBlocku obejít. Pluginy blokující reklamy nejsou moc tolerantní a s radostí zablokují i obsah bez reklamy, takže i u webu bez reklam je dobré zkontrolovat, že ho AdBlock kvůli něčemu nerozbíjí.

## Příklady zablokování

Jak konkrétně se AdBlock může projevit:

### Subdoména **ads**l.wia.cz

  Kdysi jsem dělal web http://adsl.wia.cz a spousta lidí jej vůbec neviděla (subdoména začíná na ads) a bylo to neskutečný WTF zážitek. Vyřešeno přechodem na dsl.wia.cz

  – [Tomáš Kapler](https://www.facebook.com/jecas.cz/posts/1017945931600456?comment_id=1018275368234179&reply_comment_id=1021202857941430&comment_tracking=%7B%22tn%22%3A%22R%22%7D)

### URL „**reklama**ce“

  AdBlock nám kdysi zkomplikoval život, když blokoval ajax požadavky na url /admin/reklamace/* (asi kvůli "reklama")

  – [Petr Soukup](https://twitter.com/petrsoukup/status/689517513139490817)

Aby AdBlock odstranil co největší množství reklam, používá celkem důmyslné filtry. Kromě podezřelých adres obsahujících „ad“ nebo „reklama“ blokuje i obsah na základě HTML kódu.

Dát jako třídy HTML elementů nebo adresy obrázků názvy typu: ad, ads, adv, advert, advertisement, banner nebo banners tak není úplně dobrý nápad.

Bohužel totéž platí i pro české prostředí a CSS třídy / názvy souborů typu „`reklama`“.

Některé AdBlocky jsou rafinované do té míry, že zablokují i `&lt;img>` obrázky obsahující rozměr typické pro bannery. Následující obrázek tak může být zablokován.

```
&lt;img src="obrazek-468x60.png">
```

## Jak obejít AdBlock

Na základě znalosti filtrů pro blokování reklam jde snadno vytvářet reklamy, které automaticky zablokovány nebudou. Je potřeba se vyvarovat:

    CSS třídám a identifikátorům **s reklamou v názvu**. Čeští uživatelé používají české AdBlock filtry, takže je potřeba dávat pozor kromě angličtiny i v češtině.

    URL obsahujícím slovo „reklama“. Česky i anglicky (*ad**).

    Rozměrům v URL typických pro bannery. Tedy například: 745 × 100, 468 x 60, 250 x 250, 88 x 31 a podobně.

V každém případě je dobré si pro otestování stránky do nějakého [prohlížeče](/webove-prohlizece) rozšíření [Adblock Plus](https://adblockplus.org/en/) nainstalovat a podívat se, jestli blokovač reklamy neblokuje normální obsah nebo nějak stránku nerozbíjí.