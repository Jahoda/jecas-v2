---
title: "Fixní postranní panel"
headline: "Jak vytvořit fixovaný banner?"
description: "JavaScriptové řešení prvku, který při rolování zůstane stále viditelný."
date: "2012-10-10"
last_modification: "2013-06-12"
status: 1
tags: ["JavaScript", "Hotová řešení", "Fixní posice"]
---

.fixni-panel {position: absolute; left: 0; top: 120px; z-index: 0}
  .fixni-panel div {background: #0D6AB7; color: #fff; text-align: center; width: 120px; height: 600px; }
  .fixni-panel .fixed {position: fixed; top: 0}

		Fixovaný text změnou `position` na `fixed`.

var sidebar = document.getElementById('sidebar');

window.onscroll = function () {
  sidebar.className = (
    document.documentElement.scrollTop + document.body.scrollTop > sidebar.parentNode.offsetTop
    && document.documentElement.clientHeight > sidebar.offsetHeight
  ) ? "fixed" : "";
}

Některé prvky na stránce může být vhodné umístit s [fixní posicí](/position#fixed). Zajistí se tím to, že budou **stále viditelné**.
Smysl to může mít pro:

  důležité **navigační prvky**,
    odkazy pro **sdílení stránky** na sociálních sítí,
      **reklamy / reklamní bannery**

Umístit něco fixovaně není žádný kumšt:
```
element {position: fixed}
```

… a je to. Co ale v případě, že **má element mít nejprve nějakou normální posici**? Přijde na řadu JavaScript, který v momentě, kdy daný prvek začne mizet, přepne posici na fixovanou.

## Řešení

  Při **rolování stránky** (`window.onscroll`)
se porovná o kolik je odrolováno (`scrollTop`) s posicí elementu (`offsetTop`)
a podle toho se (ne)nastaví třída, která element zafixuje (díky tomu lze i fixovanému elementu velmi snadno měnit vzhled).

### CSS

```
.sidebar {position: absolute; right: 0; top: 100px}
.sidebar div {background: #0D6AB7; text-align: center; width: 120px; height: 600px; }
.sidebar .fixed {position: fixed; right: 0; top: 0}
```

### HTML

```
&lt;div class='sidebar'>
	&lt;div id="sidebar">
		(Obsah)
	&lt;/div>
&lt;/div>
```

### JavaScript

Druhá část podmínky (za `&amp;&amp;`) porovnává výšku fixovaného boxu s výškou okna. Asi nemá smysl v takovém případě fixovat.
```
var sidebar = document.getElementById('sidebar');
window.onscroll = function () {
  sidebar.className = (
    document.documentElement.scrollTop + document.body.scrollTop > sidebar.parentNode.offsetTop
    && document.documentElement.clientHeight > sidebar.offsetHeight
  ) ? "fixed" : "";
}
```

## Možná úskalí

CSS vlastnost `fixed` vztahuje umístění elementu k **oknu prohlížeče**, nikoliv k nejbližšímu elementu s absolutní/relativní posicí.