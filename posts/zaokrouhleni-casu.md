---
title: "Zaokrouhlení času"
headline: "Zaokrouhlení času"
description: "Jak v PHP zaokrouhlit čas na celé pětiminuty, čtvrthodiny nebo půlhodiny."
date: "2016-02-26"
last_modification: "2016-03-05"
status: 1
tags: ["Hotová řešení", "PHP"]
---

Při vypisování času může být běžný aktuální čas zbytečně přesný.

Čas: 15.13

Návštěvník si potom řekne, proč autor raději s vydáním článku dvě minuty neposečkal, aby bylo datum vydání v hezčí podobě „15.15“.

Naštěstí jde autorovu ukvapenost *opravit* krátkou PHP funkcí, která čas zaokrouhlí:

 ((floor($roundTo / 2)) * 60)) ? 
    $time + ($roundTo * 60) - ($delta) : 
    $time - ($delta);
  return date("H.i", $rounded);	
}
```

-->
```
function roundedTime($time, $roundTo) {
  $time = strtotime($time);
  $time = round($time / ($roundTo * 60)) * ($roundTo * 60);
  return date("H.i", $time);	
}
```

Aktuální čas zaokrouhlený po pěti minutách se vypíše následovně:

```
echo roundedTime(date('H.i'), 5)
```

Jak to funguje?

    Předaný čas se převede na vteřiny (`strtotime`).

    Počet vteřin se vydělí dobou, na kterou se zaokrouhluje.

    Tato doba se zaokrouhlí a následně zpátky vynásobí tím samým číslem.

    Výsledný čas se zformátuje a vrátí.

Funkci `roundedTime` jde zadat i jiný počet minut (třeba 10, 15 nebo 30).

Děkuji **Janu Rennerovi** za vylepšení původní funkce.