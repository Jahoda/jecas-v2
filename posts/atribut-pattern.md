---
title: "Atribut pattern pro formuláře"
headline: "Atribut <code>pattern</code> pro formulářové prvky"
description: "Validace formulářů regulárními výrazy na straně klienta bez JavaScriptu."
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["formulare", "html", "html-atributy"]
format: "html"
---

<p>V nových prohlížečích – <b>Chrome</b>, <b>Firefox</b>, <b>Opera</b> a <b>Internet Explorerech</b> <b>od verse 10</b> lze použitím atributu <code>pattern</code> určit <i>masku</i>, které musí obsah <a href="/input"><code>&lt;input></code>u</a> vyhovět.
<pre><code>&lt;input <b>pattern</b>="[0-9]{1,3}" <i>required</i>></code></pre>

<!-- HTML ukázka -->
<h2>Ukázka</h2>
<form action="?" onsubmit="alert('Jako úspěšně odesláno'); return false">
<label>Zadejte 1–3 čísla <input pattern="[0-9]{1,3}" required value="text"></label>
<input type=submit>
</form>
<!-- / konec ukázky -->

<p>Trochu zajímavé se na první pohled může zdát, že bez přidání dalšího atributu <code>required</code> projde i nevyplněné pole.

<h2>Závěr</h2>
<p>Na podobnou kontrolu se ovšem <b>nelze spoléhat</b> ani v momentě, kdy vymizí drtivá většina starších prohlížečů než IE 10. Aplikace zpracovávající data vždy musí nějaké ověření/serializaci provádět. 