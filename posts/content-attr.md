---
title: "CSS vlastnosti content a attr"
headline: "Úprava obsahu pomocí <code>content</code> a <code>attr</code>"
description: "Pomocí CSS vlastnosti <code>content</code> a <i>funkce</i> <code>attr</code> lze ovlivňovat z CSS výsledný textový obsah webu."
date: "2013-05-17"
last_modification: "2013-05-17"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

## Vlastnost `content` a `attr()`

`content`
Použitím této vlastnosti lze přidávat do stránky obsah zapsaný v CSS pravidlech. Funkční od Internet Exploreru 8.
```
element:after {content: "Ahoj"}
```

Zajímavá odlišnost je v prohlížeči Opera, kde lze použít `content` přímo na `element` (bez `:after`/`:before` a přepíše se tím jeho obsah). V jiných prohlížečích toto nefunguje.
```
p {content: "Ahoj"}
p:before {content: "&lt;"}
p:after {content: ">"}
```

V Opeře budou odstavce ve tvaru `**&lt;***Ahoj***>**`, 
v ostatních prohlížečích `**&lt;**Původní text odstavce**>**`,
ve starších prohlížečích `Původní text odstavce`.

`attr()`
Touto funkcí lze získat obsah libovolného atributu a využít toho v kombinaci s `content`.
```
&lt;style>
p:after {content: **attr(*title*)**}
&lt;/style>
&lt;p *title*='světe!'>Ahoj
```

span.test:after {content: attr(title)}

Výsledek bude `Ahoj` (živá ukázka).

Spojování řetězců se dělá prostým řetězením. Tedy vypreparovat atributy z odkazu…
```
&lt;a href='http://jecas.cz' title='Je čas' class='odkaz'>Odkaz&lt;/a>
… a sestavit z nich větu bude vypadat následovně.
a:after {
	content: ' (Tento odkaz vede na „'attr(href) '“, má titulek „'
		attr(title) 
		'“ a' " třídu „"attr(class)'“.)'
}

a.test:after {	content: ' (Tento odkaz vede na „'attr(href) '“, má titulek „'
		attr(title) 
		'“ a' " třídu „"attr(class)'“.)'}

**Živá ukázka**: Odkaz

Možnosti řetězení jsou skutečně benevolentní: mezi text v uvozovkách a `attr` lze dát cokoliv (mezeru, tabulátor, odřádkování) nebo také klidně nic.

## Vlastní atributy

Pravá *zábava* začíná s použitím vlastních atributů. Jedna možnost je použít tzv. `data-*` atributy, druhá si atribut kompletně vymyslet. Oboje funguje.
&lt;style>
p:after {content: ": „" attr(**mujAtribut**) ' ' attr(*data-mujAtribut*) '!“'}
&lt;/style>
&lt;p **mujAtribut**='Ahoj' *data-mujAtribut*='světe'>Říká
```

.test2:after {content: ": „" attr(mujAtribut) ' ' attr(data-mujAtribut) '!“'}

  Říká

  ## Pseudo-třídy `:before` a `:after` u obrázků

  U obrázků (značka `&lt;img>`) **není možné pseudo-třídy používat**. Následující kód pro **doplnění `alt`u k obrázku** tedy nebude fungovat:

  ```
img:after {content: attr(alt)}
```

[Ukázka](http://kod.djpw.cz/bycb)