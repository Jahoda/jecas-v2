---
title: "Značka <base href>"
headline: "HTML značka <code>&lt;base></code>"
description: "K čemu využít a na co si dát pozor u HTML tagu <code>&lt;base></code>?"
date: "2013-06-18"
last_modification: "2013-06-19"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Značkou <code>&lt;base></code> spolu s atributem <code>href</code> je možné z HTML ovlivnit <i>vypočítávání</i> relativních cest odkazů, obrázků, stylů, skriptů a dalších na stránku vkládaných objektů. Přesněji řečeno nastavit jejich začátek. Atributem <code>target</code> zase hromadně určuje okno/rám, do kterého se všechny odkazy budou otevírat.
<pre><code>&lt;base href='http://jecas.cz' target="_blank"></code></pre>

<h2>Zajímavosti a fakta</h2>
<ol>
<li>V Explorerech je nutno umístit do části <code>&lt;head></code>. Jinak se neprojeví.
<li>Odkazy na soubory CSS (<code>&lt;link href></code>) nebo JS (<code>&lt;script src></code>) umístěné před <code>&lt;base></code> se touto značkou nebudou řídit.
<li>Vytvořit odkaz mimo <code>&lt;base href></code> lze jen uvedením protokolu. Ani <code>/</code> na začátku <code>href</code>u chování nezmění.
<li>Atribut <code>target</code> lze na stránce u odkazů <i>přebít</i>.
</ol>

<h2 id=kdy>Kdy má smysl používat?</h2>
<p>Zejména pro testování cizích stránek. Stačí si zkopírovat HTML kód, přidat <code>&lt;base href></code> a na kopii stránky se řádně načtou všechny externí objekty. Není tak potřeba přepisovat všechny cesty.
<p>Jinak se ale tato značka moc rozumně využít nedá.
<ul>
<li>U stránek s redakčním systémem nebývá problém hromadně vytvářet přímo absolutní adresy.
<li>U statických stránek zase přítomnost <code>&lt;base href></code>u způsobí, že web nepůjde přenést jinam bez hromadné úpravy.
<li>Protože se moc běžně nepoužívá, může neznalému člověku vytvořit nečekané a zpočátku nevysvětlitelné chování.
</ul>