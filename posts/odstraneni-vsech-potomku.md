---
title: "Odstranění všech potomků HTML elementu"
headline: "Odstranění obsahu HTML elementu"
description: "Jak v JavaScriptu odstranit všechny potomky v určitém HTML elementu."
date: "2014-05-16"
last_modification: "2014-05-17"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady"]
---

Při vytváření HTML obsahu JavaScriptem se někdy může hodit **obsah celé značky vyprázdnit**.

```
var element = document.getElementById("idecko");
element.innerHTML = "";
```

Toto je asi nejjednodušší způsob, nicméně není nejrychlejší.

[Rychlejší postup](http://jsperf.com/innerhtml-vs-removechild) je odebírání přes metodu `removeChild`:

```
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

Před snahou **odebírat všechny potomky** ještě může být dobré se zamyslet, jestli by nestačilo jenom měnit vlastnosti stávajících elmentů místo **odstraňování a vytváření komplet nových** (`createNode`/`appendChild`). To by mohlo být ještě rychlejší.