---
title: "CSV soubor"
headline: "CSV soubor"
description: ""
date: "2019-11-20"
last_modification: "2019-11-20"
status: 0
tags: []
format: "html"
---

<p><b>CSV</b> je zkratka <i lang="en">comma separated values</i>, tedy česky hodnoty oddělené čárkami.</p>

<p>Nejčastěji se používá pro export/import dat. A umí s ním pracovat <b>MS Excel</b> či jiné tabulkové aplikace.</p>

<p>Vypadá to nějak takto:</p>

<pre><code>hodnota,hodnota
"Další hodnota","Další hodnota"</code></pre>

<p>Bohužel je zde v <b>Excelu</b> problém, že CSV není vždy úplně oddělené čárkou. Ve Windows se Excel řídí nastavením systému, konkrétně nastavením oddělovače seznamu a oddělovače desetiných čísel.</p>


<p>Výchozí nastavení v českém <b>Windows</b> je středník <code>;</code> pro seznamy a čárka <code>,</code> pro desetinná čísla.</p>

<p>Kvůli tomu se standardní CSV v <b>Excelu</b> při běžném otevření nenačte správně. Byl by potřeba zápis oddělený středníky:</p>

<pre><code><pre><code>hodnota<b>;</b>hodnota
"Další hodnota"<b>;</b>"Další hodnota"</code></pre></code></pre>

















<p>Ten ale zase nebude správně fungovat v prostředích, kde je oddělovač seznamů čárka a desetinných míst tečka.</p>

<p><b>Co s tím?</b></p>




<h2 id="oddelovac">Nastavení oddělovače</h2>

<p>V některých versích MS Excelu funguje přidání tohoto na první řádek:</p>

<pre><code>sep=,</code></pre>


<p>Bohužel to nefunguje v různých jiných tabulkových programech, kde se to zobrazí jako data.</p>






<h2 id="import-export">Import/export CSV v Excelu</h2>

<p>Jak tyto problémy obejít je CSV do Excelu importovat.</p>