---
title: "CSS vlastnost motion-path"
headline: "CSS vlastnost <code>motion-path</code>"
description: "Vlastnost <code>motion-path</code> slouží k animování pohybu po nakreslené „cestě“."
date: "2015-10-15"
last_modification: "2015-10-15"
status: 0
tags: []
---

```
#alice {
    motion-path: path("M69.8, 98.3c116.9, 0,76.9, 261.5, 261.5, 261.5 s103.8-195.4, 233.8-195.4S627.5, 356, 715.2, 356");
}
```

```
@keyframes rabbithole {
  0% { motion-offset: 0; }
  100% { motion-offset: 100%; }
}
```

```
#alice {
    will-change: transform;
    animation: rabbithole 2.2s forwards;
}
```

  - The new code: [Animate Elements on a Path with CSS](http://thenewcode.com/38/Animate-Elements-on-a-Path-with-CSS)