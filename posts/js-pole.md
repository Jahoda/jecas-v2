---
title: "Pole v JavaScriptu"
headline: "Pole v JavaScriptu"
description: "Jak se v JS pracuje s poli, rozdíl mezi polem a NodeListem."
date: "2013-12-10"
last_modification: "2013-12-10"
status: 0
tags: []
---

## Hotová řešení běžných operací

```
var pole = [1, 2, 3, 4, 5];
```

### Smazání prvku z pole

```
pole.splice(index, 1);
```

### Přesunutí prvku na první místo

```
pole.unshift(pole.splice(index, 1)[0]);
```

### Odstranění posledního prvku `pop()`

```
pole.pop()
// [1, 2, 3, 4]
```

http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/