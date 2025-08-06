---
title: "Sleep v JavaScriptu"
headline: "Sleep v JavaScriptu"
description: ""
date: "2020-01-17"
last_modification: "2020-01-17"
status: 0
tags: []
format: "html"
---

<pre><code>const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const funkce = async () => {
  // kód před čekáním
  await sleep(5000)
  // nějaký kód, co se spustí po 5000 ms
}</code></pre>