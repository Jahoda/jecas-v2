---
title: "Stylování číselného <input>u"
headline: "Stylování <code>&lt;input type=number></code>"
description: "Jak stylovat <code>&lt;input></code> pro zadávání čísel."
date: "2020-01-13"
last_modification: "2020-01-13"
status: 0
tags: []
format: "html"
---

<pre><code>input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}</code></pre>