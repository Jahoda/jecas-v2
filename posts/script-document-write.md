---
title: "Výpis JavaScriptu v document.write"
headline: "Zápis skriptu pomocí <code>document.write</code>"
description: "Jak využitím konstrukce <code>document.write</code> vypsat na stránku JavaScript."
date: "2014-10-28"
last_modification: "2014-10-28"
status: 0
tags: []
---

```
&lt;script>
  document.write(
    "\x3Cscript>
      alert(1)
    \x3C/script>"
  );
&lt;/script>
```