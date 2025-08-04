---
title: "Počítání v CSS funkcí calc()"
headline: "Počítání v CSS pomocí <code>calc()</code>"
description: "Od Exploreru 9 a mimo starou Operu 12 lze přímo v CSS provádět jednoduché výpočty využitím <code>calc()</code>."
date: "2013-06-06"
last_modification: "2013-06-10"
status: 1
tags: ["CSS", "CSS funkce"]
---

Tato vlastnost se zadává jako hodnota obyčejné CSS vlastnosti:
```
element {width: **calc(5px + 1em)**}
```

## Využití

Jak příklad výše napovídá, užitečná je možnost sčítat a odčítat (samozřejmě násobit i dělit) napříč různými jednotkami. 

Lze tak elegantněji vyřešit:

**Problém sčítání `width` a `padding`u v obsahovém boxmodelu** (výchozí ve standardním režimu), kdy není elegantně řešitelná procentuální šířka a `padding` třeba v pixelech. (Musí se používat další obal jen pro `padding` a podobně.)
```
element {width: 70%; padding: 10px}
```

V prohlížeči podporující `calc` bude **modrý** a **zelený** pruh stejně široký.

.live .test {width: 70%; background: green; color: #fff}
.live .padding {width: 70%; padding: 10px; background: red}
.live .calc {width: calc(70% - 10px * 2); background: blue}

`{width: 70%; padding: 10px}`
`{width: calc(70% - 10px * 2); padding: 10px}`
`{width: 70%}`

**Vodorovné centrování** absolutním posicováním vypadá nějak takto:
```
element {position: absolute; left: 50%; width: 100px; margin-left: -50px}
```

Využitím `calc()` lze rovnou zadat hodnotu `left` (50 % minus polovina šířky, tj. 100 px).
```
element {position: absolute; left: calc(50% - 100px / 2); width: 100px}
```

  Obdobný způsob lze použít třeba i pro `background-image`.

  - **Počítání z lenosti** – u nekulatých čísel je jejich ruční dopočítávání zdlouhavé a z výsledného čísla není úplně jasné, jak se k němu došlo. Tohle ale mohou už dnes nahradit CSS preprocesory, byť pochopitelně neumí počítat napříč jednotkami.

## Starší prohlížeče

V **nepodporovaných prohlížečích** jde využít toho, že tyto prohlížeče hodnotu s `calc()` budou ignorovat.

Jde tedy zadat napřed nějakou přibližnou hodnotu a následně použít výpočet:

```
width: 33.3333%;
width: calc(100% / 3);
```

Tento *fallback* pro starší prohlížeče může jít zautomatisovat CSS postprocesorem. Pochopitelně s omezenými možnostmi, protože sčítat **hodnoty s různými jednotkami** jde přesně pouze v prohlížeči.

    - [cssnext](http://cssnext.io/) – CSS postprocesor umožňující používat zápisy „z budoucnosti“ už nyní

## Zdroje a související odkazy

Historie funkcí pro počítání – Webylon: Vypočítavý pokrok
Specifikace: W3C: CSS Values and Units Module Level 3