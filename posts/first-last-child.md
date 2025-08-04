---
title: "Selektory :first-child a :last-child"
headline: "Selektory  <code>:first-child</code> a <code>:last-child</code>"
description: "Pro zaměření první/poslední položky v CSS lze místo přidávání tříd použít <code>:first</code>/<code>last-child</code>."
date: "2013-05-11"
last_modification: "2013-05-11"
status: 1
tags: ["CSS", "CSS selektory"]
---

Kromě starších Internet Explorerů (tam [jde doplnit podporu JavaScriptem](/css3-ie)) funkční ve všech běžných prohlížečích.

.test span:first-child {color: blue;}
.test span:last-child {color: red;}

## CSS

.test span:first-child {color: blue;}
.test span:last-child {color: red;}

## HTML

&lt;div class='test'>
	&lt;span>Odkaz 1 (`:first-child` modře od IE 7)&lt;/span>
	&lt;span>Odkaz 2&lt;/span>
	&lt;span>Odkaz 3&lt;/span>
	&lt;span>Odkaz 4&lt;/span>
	&lt;span>Odkaz 5 (`:last-child` červeně od IE 9)&lt;/span>
&lt;/div>	

## Další selektory

Seznam [všech CSS selektorů](/css-selektory) je na samostatné stránce.