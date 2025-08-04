---
title: "Provozování MySQL na PlanetScale"
headline: "Provozování MySQL na PlanetScale"
description: "Jak zdarma hostovat v cloudu MySQL."
date: "2023-02-13"
last_modification: "2023-02-13"
status: 0
tags: []
---

[PlanetScale](https://planetscale.com) je online platforma pro provozování MySQL database.

Používá [Vitess](https://vitess.io).

Pokud webová aplikace potřebuje někam ukládat strukturovaná data a hodí se k tomu SQL, **PlanetScale** dokáže používání MySQL výrazně zpříjemnit.

Nabízí relativně štědrý bezplatný tarif, takže jde na ní menší projekty provozovat úplně bezplatně.

Připojení k DB:

```
pscale shell jecas dev
```

Import z SQL dumpu:

```
source sql/dump.sql
```

## Nevýhody a omezení

### Cizí klíče

Vitess, který PlanetScale používá, nebyl primárně navržen tak, aby podporoval cizí klíče.

Vzhledem k tomu, že cizí klíče vyžadují transakční garanci konsistence mezi více tabulkami, jejich implementace by mohla ovlivnit výkon a škálovatelnost řešení.

Některé vlastnosti cizích klíčů jde ale implementovat manuálně přímo v aplikaci.

PlanetScale nepodporuje cizí klíče:

    - [Online DDL: why FOREIGN KEYs are not supported](https://vitess.io/blog/2021-06-15-online-ddl-why-no-fk/)

      [Operating without foreign key constraints](https://planetscale.com/docs/learn/operating-without-foreign-key-constraints)

https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale