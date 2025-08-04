---
title: "Yarn/NPM update balíčků"
headline: "Yarn/NPM update balíčků"
description: "Jak funguje instalace a update balíčků přes npm nebo yarn."
date: "2018-03-08"
last_modification: "2018-03-08"
status: 0
tags: []
---

## Yarn

Nainstalování závislostí dle souboru `package.json`:

```
yarn
```

Update závislostí dle povolených versí v `package.json`:

```
yarn upgrade
```

Případně si jde vybrat, co se má upgradovat, z nabídky po příkazu:

```
yarn upgrade-interactive
```

Tyto upgrady by měly být bezpečné. Mění pouze `yarn.lock`, nikoliv `package.json`.

### Aktualisace na nejnovější

```
yarn upgrade --latest
```

Všechny balíčky se upgradují na poslední versi. Změní se `package.json` i `yarn.lock`. Může vést k rozbití aplikace, protože nové verse nemusí bez dalších úprav spolu fungovat.

## NPM

Při používání NPM jde použít následující postup:

    Nainstalovat balíček `npm-check-updates`:

    ```
npm install -g npm-check-updates
```

    Updatovat verse balíčků v `package.json`:

    ```
ncu -u
```

    Nainstalovat balíčky podle `package.json`:

    ```
npm install
```