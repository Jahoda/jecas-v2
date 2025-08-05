---
title: "CSS vlastnost motion-path"
headline: "CSS vlastnost <code>motion-path</code>"
description: "Vlastnost <code>motion-path</code> slouží k animování pohybu po nakreslené „cestě“."
date: "2015-10-15"
last_modification: "2015-10-15"
status: 0
tags: []
format: "html"
---

<pre><code>#alice {
    motion-path: path("M69.8, 98.3c116.9, 0,76.9, 261.5, 261.5, 261.5 s103.8-195.4, 233.8-195.4S627.5, 356, 715.2, 356");
}</code></pre>

<pre><code>@keyframes rabbithole {
  0% { motion-offset: 0; }
  100% { motion-offset: 100%; }
}</code></pre>

<pre><code>#alice {
    will-change: transform;
    animation: rabbithole 2.2s forwards;
}</code></pre>

<ul>
  <li>The new code: <a href="http://thenewcode.com/38/Animate-Elements-on-a-Path-with-CSS">Animate Elements on a Path with CSS</a></li>
</ul>