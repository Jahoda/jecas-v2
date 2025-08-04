---
title: "Position: fixed"
headline: "Position: fixed"
description: "Různé způsoby využití fixované posice v CSS."
date: "2014-03-02"
last_modification: "2014-03-02"
status: 1
tags: ["CSS", "Fixní posice"]
---

Kromě [zafixování elementu](/position#fixed) na stránce:

```
div.fixovany {
  position: fixed;
}
```

Má `position: fixed` ještě jedno zajímavé využití.

Pro **fixně umístěný** element není možné vytvořit vlastní *rámec*, jako to jde při posicování absolutním. Rodiči absolutně umístěného prvku se přidá `position: relative`, čímž se *vynulují* souřadnice pro následné absolutní posicování. Tohle pro `fixed` nefunguje.

Fixní element má nulový bod souřadnic vždy v **levém horním okraji stránky** a nejde změnit. Mimochodem, tento *bod* není určen ani elementem `&lt;body>` a ani elementem `&lt;html>`, nemá na něj vliv žádný `margin` nebo `padding`, zkrátka nic.

[Ukázka](http://kod.djpw.cz/udcb)

Popsané chování někdy může vadit, ale také je v určitých případech **velmi výhodné**. Zvlášť u vytváření universálních JavaScriptů typu lightboxů nám `position: fixed` hezky zaručí, že se náš skript nerozbije při [stylování značky `&lt;body>`](/stylovani-body) a podobně.

Vytvořit element přesně **překrývající celou stránku** je potom otázkou prostého:

```
.presCelouStranku {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```