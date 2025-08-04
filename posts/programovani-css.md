---
title: "Skloňování v CSS"
headline: "„Programování“ v HTML a CSS"
description: "I bez úprav logiky serverového skriptu lze lecčeho dosáhnout samotným CSS."
date: "2013-05-16"
last_modification: "2013-06-06"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

## Skloňování

Redakční systém neumí správně česky skloňovat, dává ale informaci o počtu celkových komentářů? Celkový počet tedy použijeme jako CSS třídu a vlastností `content` podle počtu vypíšeme správný tvar. Zároveň je třeba v prohlížečích, co `content` podporují (IE 8+), skrýt špatný tvar slova. Přesněji řečeno ve starších Explorerech špatný tvar zobrazit, aby tam bylo *alespoň něco*.

.kometare span span {display: none; =display: inline;}
.kometare span:before {content: "komentářů";}
.kometare .celkem-1:before {content: "komentář"}
.kometare .celkem-2:before, .kometare .celkem-3:before, .kometare .celkem-4:before {content: "komentáře";}

- 0 komentářů

- 1 komentářů

- 2 komentářů

- 3 komentářů

- 4 komentářů

- 5 komentářů

- 50 komentářů

### HTML

V HTML se pouze obalí tvar určený k vylepšení skloňování.
```
&lt;p>**3** &lt;span class='celkem-**3**'>&lt;span>komentářů&lt;/span>&lt;/span>
```

### CSS

```
/* skrytí vnitřního &lt;span>u a jeho zobrazení ve starších IE */
.kometare span span {display: none; **=**display: inline;}
/* všechny neurčené počty budou mít tvar „komentářů“ */
.kometare span:before {content: "komentářů";}
/* určení tvarů pro jeden až 4 */
.kometare .celkem-1:before {content: "komentář"}
.kometare .celkem-2:before, 
.kometare .celkem-3:before, 
.kometare .celkem-4:before {content: "komentáře";}
```

## Zvýraznění aktuální položky

Obdobným způsobem lze zajistit zvýraznění aktuální stránky. Stačí použít jako nadřazenou třídu nějakou dostupnou proměnnou stránku identifikující.

```
&lt;p class='strankovani **strana1**'>
	&lt;a href='?strana=1' class='strana1'>Strana 1&lt;/a>
	&lt;a href='?strana=2' class='strana2'>Strana 2&lt;/a>
	&lt;a href='?strana=3' class='strana3'>Strana 3&lt;/a>
```

A po přidání jednoduchého (ale únavně se opakujícího) CSS se bude odkaz na aktuální stranu zobrazovat tučně.
```
.strana1 .strana1, 
.strana2 .strana2,
.strana3 .strana3 {font-weight: bold}

```