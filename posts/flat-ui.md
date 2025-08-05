---
title: "Flat UI"
headline: "Flat UI framework"
description: "Flat UI nabízí hotové uživatelské rozhraní založené na Bootstrapu, má smysl jej používat?"
date: "2013-08-02"
last_modification: "2013-08-03"
status: 1
tags: ["knihovny"]
format: "html"
---

<p><a href="http://designmodo.github.io/Flat-UI/" class="button">Webová stránka nástroje Flat UI</a></p>

<p>Pokud chceme rychle s minimem námahy docílit ne úplně fádního vzhledu stránky, mohou být hotová CSS dobrá volba.</p>
  
<p>Flat UI používá Bootstrap (a hromadu dalších knihoven založených na jQuery) a tvoří tak relativně zajímavé prvky pro uživatelské rozhraní.</p>

<p><i>Flat</i> v názvu asi značí grafický styl prostý různých stínů, přechodů nebo rámečků.</p>

<p><img src="/files/flat-ui/nahled.png" alt="Vzhled Flat UI" class="border"></p>

<h2>Nevýhody</h2>
<h3>Podpora</h3>
<p>Není funkční ani v Internet Exploreru 9, není funkční bez JavaScriptu. Hlavně u těch přepínačů (<code>radio</code>/<code>checkbox</code>) je to nepochopitelné, když by to <a href="/stylovani-checked">krásně šlo</a> i v čistém CSS s lepší funkčností napříč prohlížeči.</p>

<h3>Použitelnost</h3>
<p>Celé se to dost špatně ovládá klávesnicí, k některým prvkům ukázky se nelze do<kbd>Tab</kbd>ovat, natož je přepnout. Prvkům chybí výraznější <code>focus</code>.</p>

<h3>Rychlost</h3>
<p>V základní podobě Flat UI dost plýtvá HTTP spojeními. Načítat 14 JS souborů je šílenost. Před skutečným použitím by se musely skripty spojit.</p>

<h2>Závěr</h2>
<p>Použití Flat UI vidím v rychlém prototypování, ale pro reálné použití je lepší vytvořit místo toho něco funkčního.</p>