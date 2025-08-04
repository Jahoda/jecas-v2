---
title: "Atribut pattern pro formuláře"
headline: "Atribut <code>pattern</code> pro formulářové prvky"
description: "Validace formulářů regulárními výrazy na straně klienta bez JavaScriptu."
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["HTML", "Formuláře", "HTML atributy"]
---

V nových prohlížečích – **Chrome**, **Firefox**, **Opera** a **Internet Explorerech** **od verse 10** lze použitím atributu `pattern` určit *masku*, které musí obsah [`&lt;input>`u](/input) vyhovět.
```
&lt;input **pattern**="[0-9]{1,3}" *required*>
```

## Ukázka

Zadejte 1–3 čísla 

Trochu zajímavé se na první pohled může zdát, že bez přidání dalšího atributu `required` projde i nevyplněné pole.

## Závěr

Na podobnou kontrolu se ovšem **nelze spoléhat** ani v momentě, kdy vymizí drtivá většina starších prohlížečů než IE 10. Aplikace zpracovávající data vždy musí nějaké ověření/serializaci provádět.