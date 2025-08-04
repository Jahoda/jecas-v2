---
title: "Odkaz jako tlačítko"
headline: "Odkaz vypadající jako tlačítko"
description: "Odkaz jako tlačítko, nebo tlačítko jako odkaz? Postup, jak z odkazu vyrobit tlačítko a naopak."
date: "2013-08-16"
last_modification: "2013-08-20"
status: 1
tags: ["CSS", "Hotová řešení", "Formuláře", "Odkazy"]
---

## Element `&lt;button&gt;`

Asi nejjednodušší způsob vytvoření odkazu, který vypadá jako tlačítko je použití značky `&lt;button&gt;` uvnitř odkazu. Problém je, že **Internet Explorer 8** a starší takový odkaz neproklikne.

```
&lt;a href="#"&gt;&lt;button&gt;Text „odkazu“&lt;/button&gt;&lt;/a&gt;
```

[Je čas (neproklikne IE 8)](http://jecas.cz)

Jde to řešit JavaScriptem:

[Je čas (proklikne i starý IE)](http://jecas.cz)

Ale lepší bude…

## Úprava CSS

Druhá možnost je použít CSS a odkaz nastylovat jako tlačítko nebo naopak udělat tlačítko vypadající jako běžný odkaz.

### Odkaz jako tlačítko

Budeme vycházet z toho, že běžné tlačítko má minimálně:

  - pozadí (`background`),

  - rámeček (`border`),

  - nějaký `padding`,

  - má `:hover`, `:active` a `:focus` [efekty](/vzhled-formularu),

  - není podtržené `text-decoration: none`,

  - **nemá** kursor ručičky (`cursor: pointer`),

  - může mít jiný `font`,

  - může mít kulaté rohy (`border-radius` – IE9+).

```
a.tlacitko {padding: .5em; background: #D62988; border: 1px solid #B41F71; color: #fff; cursor: default; text-decoration: none; border-radius: 5px}
a.tlacitko:hover {background: #E371AF}
a.tlacitko:active {position: relative; top: 1px; left: 1px}
```

  a.tlacitko {padding: .5em; background: #D62988; border: 1px solid #B41F71; color: #fff; cursor: default; text-decoration: none; border-radius: 5px}
  a.tlacitko:hover {background: #E371AF}
  a.tlacitko:active {position: relative; top: 1px; left: 1px}
  
  To je [odkaz](http://jecas.cz) — vypadá jako tlačítko.

### Tlačítko jako odkaz

Při obráceném postupu je naopak potřeba tlačítko *odstrojit* do podoby odkazu — tj. výše uvedené (rámečky, pozadí, odsazení apod.) *resetovat* a nastavit do podoby odkazu.

    .ne-tlacitko {background: none; color: #D62988; padding: 0; border: 0; text-decoration: underline; cursor: pointer; font: inherit}
  
  To je tlačítko — ale vypadá podobně jako [odkaz](http://jecas.cz/).

```
.ne-tlacitko {background: none; color: #D62988; padding: 0; border: 0; text-decoration: underline; cursor: pointer; font: inherit}
```