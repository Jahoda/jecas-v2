---
title: "Kulatý obrázek"
headline: "Kruhový obrázek"
description: "Různé možnosti vytvoření kruhového obrázku."
date: "2013-08-05"
last_modification: "2013-08-05"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Někdy se může hodit mít na stránce obrázek kulatý, jaké existují možnosti?

## Překreslení v grafickém editoru

Nejtrivialnější možnost je obrázek překreslit. Problém je, že to není moc universální (co až nebude kulatý vzhled žádoucí?).

## Kulaté okraje (`border-radius`)

Od **Internet Exploreru 9** lze použít CSS vlastnost `[border-radius](/border-radius)`. Stačí ji nastavit buď v polovině šířky obrázku, nebo jako 50 %.

```
#obrazek {border-radius: 50%}
```

  #obrazek {border-radius: 50%; transition: all .5s}
  #obrazek:hover {border-radius: 0} /* transition je jen pro efekt */

## Překrytí obrázekm

Pro starší prohlížeče je funkční řešení vytvořit obrázek s průhledným kruhem unitř a původní obrázek takto překrýt.

### HTML

```
&lt;div class='prekryti'>
	&lt;span>&lt;/span>
	&lt;img src='[obrazek.png](/files/kruhovy-obrazek/obrazek.png)' width=**100** height=**100**>
&lt;/div>
```

### CSS

```
img {display: block;}
.prekryti {position: relative;}
.prekryti span {background: url([prekryt.png](/files/kruhovy-obrazek/prekryt.png)); width: **100**px; height: **100**px; position: absolute}
```

### Ukázka

img {display: block;}
.prekryti {position: relative;}
  .prekryti span {background: url(/files/kruhovy-obrazek/prekryt.png); width: 100px; height: 100px; position: absolute; opacity: 1; transition: opacity .5s}
  .prekryti:hover span {opacity: 0} /* transition je jen pro efekt */