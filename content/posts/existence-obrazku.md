---
title: "Test existence obrázku JavaScriptem"
headline: "Ověření existence obrázku pomocí JS"
description: "Jak JavaScriptem ověřit existenci obrázku?"
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>K ověření existence stačí obrázek vytvořit (<code>new Image()</code>), nastavit mu <code>src</code> a:
<ul>
<li>na událost <code>onerror</code> zavěsit kód, který se má provést při neexistenci,
<li>na událost <code>onload</code> naopak kód pro existenci.
</ul>

<pre><code>function overitExistenci(url) {
    var isExist = new Image();
    isExist.src = url;
    isExist.onerror = function () {
        alert("Neexistuje");
    };
    isExist.onload = function () {
        alert("Existuje");
    };
}</code></pre>

