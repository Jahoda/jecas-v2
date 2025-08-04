---
title: "Disqus a poslední komentáře"
headline: "Nejnovější komentáře z Disqus"
description: "Jak vypsat nejnovější komentáře z diskusní platformy Disqus."
date: "2014-09-26"
last_modification: "2014-09-27"
status: 1
tags: ["Hotová řešení", "Rady a nápady"]
---

[Disqus](http://disqus.com) je populární nástroj pro zajištění **komentářů** na webu **prostřednictvím třetí strany**.

V případě, že ho na stránce použijeme, může se hodit někde zobrazit **přehled posledních komentářů**.

Kromě toho, že **Disqus** nabízí [rozsáhlé API](https://disqus.com/api/docs/), pro výpis posledních komentářů existuje přímo *widget*.

```
&lt;script 
src="http://**jecas**.disqus.com/recent_comments_widget.js">
&lt;/script>
```

Stačí jen jako subdoménu (obsah mezi „`http://`“ a „`.disqus.com`“) uvést vlastní název.

Ten se nastavuje při **vytváření nové diskuse**. Zjisti potřebnou část URL je možné při najetí na název diskuse na [domácí stránce Disqusu](https://disqus.com/home).

Po vložení skriptu na **povolené doméně** by se poslední komentáře měly objevit.

## Nastavení

Výsledný výpis příspěvků jde ovlivňovat přidáváním parametrů do URL vkládaného skriptu (widgetu).

```
http://jecas.disqus.com/recent_comments_widget.js
?**num_items**=3
&amp;**hide_avatars**=1
&amp;**excerpt_length**=10
```

  - `num_items` – počet zobrazených komentářů

  - `hide_avatars` – zobrazit/skrýt avatary

  - `excerpt_length` – omezení délky příspěvků

Kromě tohoto *widgetu* existuje ještě jeden, kde je i přehled **top komentátorů** a **populárních debat**.

## Stylování

Ačkoliv **vložený skript** vloží do stránky i nějaké to CSS, úplně dobře bez zásahu komentáře nevypadají. Naštěstí se JavaScriptem vytvořený **HTML kód** dá rozumně stylovat.

```
.dsq-widget-list .dsq-widget-avatar {
  border-radius: 50%; 
  margin-right: 0.5em
}
.dsq-widget-comment {
  display: block; 
  margin: 1em 0 .5em 2.5em; 
  padding: .8em; 
  background: #efefef
}
.dsq-widget-list {
  padding: 0
}
.dsq-widget-meta {
  margin-left: 2.5em; 
  text-align: right
}
```

Výsledek můžete vidět na stránce s [posledními komentáři na Je čas.cz](/posledni).