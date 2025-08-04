---
title: "Zpřehlednění stromových diskusí"
headline: "Řešení nepřehledných stromových diskusí"
description: "Je-li na webu stromová diskuse s hodně příspěvky, může být pro diskutující obtížné udržet přehled, co četli a co ne."
date: "2013-05-26"
last_modification: "2013-06-18"
status: 1
tags: ["Hotová řešení", "Rady a nápady"]
---

-->
První možnost řešení je si při načtení uložit (ať už k uživatelskému účtu nebo do cookie) čas a při načtení příštím příspěvky s časem novějším visuálně odlišit. Plus ještě uživatele informovat, kolik příspěvků je nových.
To je sice lepší než nic, ale rolovat stovkami příspěvků a hledat ty označené jako nové pořád není nic moc. 

## Náhled

Osvědčilo se mi vedle běžné dlouhé diskuse vygenerovat ještě jednu tu samou *diskusi*, kde jednotlivé příspěvky representují vodorovné čáry se znázorněním zanoření (pomocí odsazení), na kterých je rovněž provedeno standardní obarvení nových příspěvků.
Pokud si potom člověk chce projít nové příspěvky, relativně pohodlně si je prokliká z tohoto náhledu.

Náhled může nabízet ještě vylepšení:

umožnit přecházení mezi novými příspěvky klávesami (např. ← a →),
znázorňovat, které komentáře jsou zrovna ve viditelné části obrazovky,
při najetí na čáru representující komentář jej zobrazit

Kromě automatického zvýraznění dle času posledního načtení, je vhodné přidat i kalendář, kde lze datum a čas ručně zadat. V **Opeře** k tomu stačí jeden `&lt;input type=datetime>`, 
ve **Firefoxu a Chromu** jeden `&lt;input type=date>` a jeden `&lt;input type=time>`,
v **Explorerech** (včetně verse 10) jedině nějaký JS kalendář.

-->

## Ukázka v diskusích na D-FENS

K výše uvedenému jsem dospěl ve snaze zpřehlednit si diskuse na výše uvedeném webu. Takhle to vypadá:

[Vylepšení stromových diskusí](https://www.youtube.com/watch?v=m_t4_6eHFdk)

Jelikož byl skript vytvářen jako uživatelský JS pro Operu, nefunguje nejspíš úplně ideálně napříč prohlížeči. Živá ukázka v HTML je tedy *na vlastní nebezpečí*.
Ukázka [Samotný user JS](http://jecas.cz/files/df/df.js) [User JS pro Operu](http://jecas.cz/files/df/df-opera.js)