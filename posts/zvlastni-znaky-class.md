---
title: "Diakritika v názvu třídy"
headline: "Speciální znaky v atributu <code>class</code>"
description: "Co takhle psát názvy tříd v HTML a CSS hezky česky s diakritikou. Funguje to?"
date: "2013-06-13"
last_modification: "2013-06-13"
status: 1
tags: ["HTML", "CSS"]
---

V dnešních prohlížečích fungují jako názvy tříd prakticky všechny znaky s výjimkou těch, které se používají jako řídicí v CSS (`.#{}(),;/*~>` a podobně).

Ve standardním režimu jsou ještě nefunkční **názvy tříd začínající číslicí**. V quirku v Explorerech a starších Operách funguje i to.

```
&lt;style>
.růžovoučký {background: pink; font-size: small}
&lt;/style>
&lt;p class=růžovoučký>Růžovoučký odstaveček
```

.content .růžovoučký {background: pink; font-size: small}

Růžovoučký odstaveček

Lepší bizarnosti ale začínají s dalšími speciálními znaky:
Co třeba stylové pojmenování třídy stylující částku v EUR?
```
.€ {color: blue}
```

Nebo pojmenování stylu pro vypsání teploty?
```
&lt;span class=**°C**>21 °C&lt;/span>
```

Proč používat pro zarovnání zdlouhavé třídy `left` nebo `right`?
```
.**←** {text-align: left}
.**→** {text-align: right}
```

Podtrhávání odteď zásadně:
```
.**_** {text-decoration: underline}
```

A třída pro citace může vypadat:
```
&lt;p class=**„“**>Citovaný text.
```

A nakonec třeba třída bez třídy (pomocí nedělitelné mezery):
```
. {padding: 1em}
```

```
&lt;p class= >Odstavec s paddingem.
```

Přestože to hezky funguje, asi není ideální takto třídy zapisovat. Jednak to může zaskočit HTML/CSS editor při obarvování syntaxe a jednak to může zaskočit člověka, co bude s kódem chtít pracovat, obzvláště nebude-li umět zapsat některé [speciální znaky](/ceska-klavesnice).

## Test

Pokud daná třída funguje, bude zelená.

.zlutoucka {color: green}
.1 {color: green}
.1zlutoucka {color: green}
.žluťoučká {color: green}
.1žluťoučká {color: green}
.1_žluťoučká—třída {color: green}
.zlut666oucka {color: green}
.žluťo„uč“ká—třída {color: green}
.žluťoučká-třída {color: green}
._žluťoučká—třída {color: green}
. {color: green;}
.→ {color: green;}
.~ {color: green;}
._ {color: green;}
.° C {color: green;}
.€ {color: green;}
.÷× {color: green;}
.= {color: green;}
.. {color: green;}
.# {color: green;}
.() {color: green;}

Zadaná třída je „`zlutoucka`“.  
Zadaná třída je „`1`“.
Zadaná třída je „`1zlutoucka`“.
Zadaná třída je „`žluťoučká`“.
Zadaná třída je „`1žluťoučká`“.
Zadaná třída je „`1_žluťoučká—třída`“.
Zadaná třída je „`zlut666oucka`“.
Zadaná třída je „`žluťo„uč“ká—třída`“.
Zadaná třída je „`žluťoučká-třída`“.
Zadaná třída je „`→`“.
Zadaná třída je „` `“ (tvrdá mezera).
Zadaná třída je „`.`“.
Zadaná třída je „`()`“.
Zadaná třída je „`~`“.
Zadaná třída je „`=`“.
Zadaná třída je „`_`“.
Zadaná třída je „`° C`“.
Zadaná třída je „`€`“.
Zadaná třída je „`÷×`“.
Zadaná třída je „`_žluťoučká—třída`“.
Zadaná třída je „`#`“.