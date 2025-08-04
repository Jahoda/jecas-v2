---
title: "Připojení CSS"
headline: "Připojení CSS"
description: "Jakým způsobem připojit CSS do stránky."
date: "2015-11-06"
last_modification: "2015-11-06"
status: 0
tags: []
---

## HTTP hlavička

```
&lt;?php 
header("Link: &lt;styl.css>; rel=stylesheet");
?>
```