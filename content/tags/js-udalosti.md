---
title: "JS události"
headline: "JavaScriptové události – obsluha uživatelských akcí"
background: "#FEDA3F"
color: "null"
status: 1
---

<p>Události (events) jsou v <a href="/js">JavaScriptu</a> základní mechanismus pro reakci na uživatelské akce – kliknutí, pohyb myši, stisk klávesy, odeslání formuláře a další interakce.</p>

<p>Události se na elementy <a href="/pripojeni-udalosti">připojují</a> pomocí metody <code>addEventListener()</code>, která umožňuje navázat libovolný počet handlerů na jeden element. Každá událost nese objekt <a href="/event-target">Event</a> s informacemi o tom, co se stalo a na jakém prvku.</p>

<p>Mezi nejčastěji používané události patří <code>click</code>, <a href="/oninput"><code>input</code></a>, <code>submit</code>, <a href="/udalosti-mysi">události myši</a> nebo <a href="/otaceni-koleckem"><code>wheel</code></a>.</p>