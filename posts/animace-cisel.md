---
title: "Animace čísel"
headline: "Animace čísel"
description: "Animování číselných dat pomocí JavaScriptu."
date: "2014-01-19"
last_modification: "2014-01-20"
status: 1
tags: ["JavaScript", "Hotová řešení", "Animace"]
---

Vytvářet na webu [animace](/animace) různých CSS vlastností je díky [`transition`](/transition) a [`@animation`](/animation) poměrně snadné, jak ale *animovat* čísla? To jest vytvořit [odpočítávání](/odpocitavani), kde se třeba desítka vymění za devítku, ta za osmičku a tak dále…

  - Jedna možnost je všechna čísla nastrkat do HTML kódu a šikovně je posouvat, až vytvoří [výsledný efekt](/odpocitavani#css). Pozor, vlastnost [`content`](/content-attr) **není možné animovat**.

  - Při odpočítávání/dopočítávání větších čísel nebo dokonce čísel z desetinnými místy bude přece jenom elegantnější použít JS animaci, která bude přímo měnit obsah elementu **v HTML kódu**.

## countUp.js

[Stránka countUp.js](http://inorganik.github.io/countUp.js/) [Demo](http://inorganik.github.io/countUp.js/)

CountUp.js je hotové řešení plynulé změny čísel přes JavaScriptovou animaci.

  0
  
    var demo = new CountUp("cislo", 0, 1000, 2, 5);
    document.getElementById("cislo").onmouseover = function(){
      demo.start();
    };
    document.getElementById("cislo").onmouseout = function(){
      demo.stop();
      demo.reset();
    };    

-->

### Použití

Použití je pohodlné. Po připojení [skriptu](https://github.com/inorganik/countUp.js/blob/master/countUp.js) to vypadá následovně (pozn.: doba není v **milisekundách**, jak by se dalo čekat, ale ve **vteřinách**).

```
var odpocet = new countUp("idElementu", prvniCislo, druheCislo, pocetDesetinnychMist, doba);
odpocet.start();
```

Nakonec je možné animaci zastavit:

```
odpocet.stop();
```

Nebo resetovat.

```
odpocet.reset();
```

Pro použití na českém webu by bylo vhodné dle zvyklostí **prohodit desetinnou tečku** za čárku.

### Podpora v prohlížečích

Animace jsou funkční i v **IE 6**.