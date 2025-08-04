---
title: "Detekce zapnutého JavaScriptu"
headline: "Zapnutý a vypnutý JavaScript"
description: "Jak na webové stránce detekovat zapnuté nebo vypnuté skriptování."
date: "2013-06-19"
last_modification: "2013-06-20"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady"]
---

Při psaní webové aplikace, kde se **používá JavaScript**, může být vhodné jeho **přítomnost detekovat** a tu informaci umět přenášet na server (např. do **PHP skriptu**).

## HTML a CSS

### Značka `&lt;noscript>`

V HTML existuje značka `&lt;noscript>`, jejíž obsah se zobrazí při vypnutém skriptování.
  
```
&lt;noscript>
	&lt;p>Zapněte si JavaSript!
&lt;/noscript>
```

Pokud se do této značky umístí třeba tag `&lt;body>` (nebo nějaký jiný [obal celé stránky](/stylovani-body)) a bude mít třídu `.no-js`, otevírá se možnost všechny styly, co se mají projevit při vypnutém JS, začínat právě „`.no-js`“.

Značka `&lt;body>` má [volitelnou](/html-znacky#volitelne) počáteční i uzavírací značku, takže se není třeba trápit s tím, že by se sama neotevřela.

### JavaScript

Obrácený postup je naopak JavaScriptem přidat obalovému elementu třídu „`.js`“; popřípadě element do HTML zapsat s „`.no-js`“ a tu mu skriptem odebrat.

```
&lt;body class="no-js">
&lt;script>document.body.className = ''&lt;/script>
```

U tagu `&lt;body>` je výhodné, že má volitelnou počáteční i koncovou značku, není třeba tedy řešit nějaké otevírání/uzavření, oboje umí udělat sám. Na začátku stránky tak lze použít i:
  
```
&lt;script>document.write("&lt;body class=js>")&lt;/script>
```

Konstrukce `document.write` je způsob, jak vypisovat obsah stránky, který má být přístupný jen s JS.

### Použití v CSS

Využití třídy `.js` nebo naopak `.no-js` je prosté:
```
.js .schovat-pri-js {display: none}
```

Nebo…

```
.zobrazit-bez-js {display: none}
.no-js .zobrazit-bez-js {display: block}
```

## Na straně serveru

Serverový skript se **nemá jak spolehlivě dozvědět** o (ne)zapnutém JS. Dát mu tuto informaci možné je, ale musí se použít oklika z řešeních výše. Například:

Ihned JavaScriptem/`&lt;noscript>`em přesměrovat stránku na URL s `?js=ano`.
```
&lt;noscript>
  &lt;meta http-equiv="refresh" content="1;URL=?js=ne">
&lt;/noscript>
```

Nebo v JS:
```
&lt;script>window.location = "?js=ano"&lt;/script>
```

Po zjištění je nutné **přesměrování odstranit**, jinak vznikne nekonečná smyčka.

  Uložit pomocí JS cookie a při následném načtení nějaká stránky kontrolovat její existenci.
  [Pingnout](/ajax#pingnout) serverový skript JavaScriptem/`&lt;noscript>`em.

Zjištění **zapnutého JavaScriptu v PHP** potom bude fungovat na základě kontroly `$_GET["js"]`, popř. `$_COOKIE["js"]`.