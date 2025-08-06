---
title: "CSS quotes"
headline: "Uvozovky v CSS"
description: "Vlastnost <code>quotes</code> umožňuje nadefinovat uvozovky, které se okolo značky objeví."
date: "2013-11-21"
last_modification: "2013-11-23"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>V případě, že nějakému elementu chceme přidat na začátek/konec <a href="/uvozovky">uvozovky</a> přes <a href="/content-attr"><code>content</code></a>, vlastnost <code>quote</code> určuje styl těchto uvozovek. Zároveň elegantně <b>řeší zanořování</b>. Je možné nadefinovat <b>počáteční</b> a <b>koncovou</b> podobu uvozovek v prakticky libovolném zanoření. Vlastnost <code>quotes</code> funguje od <b>IE 8</b>.</p>

<div class="live">
  <style>
    q {quotes: "„" "“" "‚" "‘"  "»" "«" "›" "‹"}
    q:before {content: open-quote}
    q:after {content: close-quote}
  </style>
  <p>Text <q>v uvozovkách v <q>uvozovkách v <q>uvozovkách a v <q>uvozovkách</q>… a teď  to</q>
  všechno</q> správně</q> ukončit.</p>
</div>

<p>Styl uvozovek v zanoření jde nastavit právě ve vlastnosti <code>quotes</code>. Pro <b>české uvozovky</b> (<a href="/ceska-klavesnice">jak je napsat?</a>) nebo obecně pro česky psaný web by předpis mohl vypadat následovně:</p>

<pre><code>q {quotes: "„" "“" "‚" "‘"  "»" "«" "›" "‹"}</code></pre>

<p>Vyvolat uvozovku do <code>content</code>u je potom možné přes <code>open-quote</code>/<code>close-quote</code>.</p>

<p>Jednotlivé <b>uvozovky</b> se oddělují mezerou ve stylu počáteční uvozovka 1. úrovně, koncová uvozovka 1. úrovně, počáteční 2. úrovně atd. Při <i>vyplácání</i> všech stylů se začne poslední úroveň <b>opakovat</b>.</p>

<p>Zanořování mi ale přijde spíš jako <b>technická finesa</b>, než něco zvlášť užitečného/potřebného. Reálné použití mě moc nenapadá…</p>