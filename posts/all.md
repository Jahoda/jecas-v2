---
title: "CSS vlastnost all"
headline: "CSS vlastnost <code>all</code>"
description: "Resetování CSS pravidel vlastností <code>all</code>."
date: "2013-12-15"
last_modification: "2013-12-15"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Zatím vlastnost `all` funguje od **Firefoxu 27**. Umožňuje **resetovat** vzhled libovolných elementů.

To se může hodit pro hotová řešení třetích stran, kde je risiko, že cizí elementy zdědí nežádoucí styly. Nyní je v takovém případě nutné [přebíjet](/css-reset) obvyklé vlastnosti **defaultní hodnotou**.

Vlastnost `all` je zkratka (níže uvedené hodnoty je možné zadávat přímo jako hodnotu všech CSS vlastností). Slouží pro resetování všech CSS vlastností určitého elementu **jedním příkazem**. Může nabývat tří hodnot.

  `initial`
  
    Vyresetuje úplně všechno včetně hodnot z **uživatelských stylů** nebo výchozích stylů prohlížeče. [Ukázka](http://kod.djpw.cz/iox) — text nebude červený ani modrý, ale černý.

  `inherit`
  
    Vlastnost se zdědí. [Ukázka](http://kod.djpw.cz/jox) — text nebude modrý, ale červený (zdědí hodnotu od rodiče).

  `unset`
  
    V případě, že existuje hodnota k dědění, chová se jako `inherit`, jinak jako `initial`. [Ukázka](http://kod.djpw.cz/kox).

Při **resetování** stále platí pravidla kaskádování. Proto odstavec v následujícím kódu bude modrý.

```
&lt;style>
  p {color: red}
  p#text {color: blue}
  p {all: initial}
&lt;/style>
&lt;p id="text">Text&lt;/p>
```

Protože ID přebije obyčejný kontext. Podobně to dopadne i s `!important` ([ukázka](http://kod.djpw.cz/nox)).