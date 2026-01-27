---
title: "Systémová písma"
headline: "Systémová písma"
description: "Jak a proč používat lokální písma dostupné v operačních systémech."
date: "2015-11-13"
last_modification: "2016-07-21"
status: 1
tags: ["css", "napady", "pisma", "typografie"]
format: "html"
---

<p>Pokud nestačí, aby se texty zobrazovaly základním <span style="font-family: serif">patkovým</span> (<code>font-family: serif</code>) nebo <span style="font-family: sans-serif">bezpatkovým</span> (<code>font-family: sans-serif</code>) písmem – typicky Times New Roman a Arial, existují dvě možnosti:</p>

<ol>
  <li>Připojit externí písmo pomocí <a href="/font-face"><code>@font-face</code></a>.</li>
  <li>Použít písmo systémové.</li>
</ol>


<h2 id="vyhody">Výhody systémových fontů</h2>

<p>Nové operační systémy nabízejí velmi kvalitní fonty, které:</p>

<ol>
  <li>
    <p><b>Není nutné stahovat</b>, protože už je má návštěvník má nainstalované. Zvlášť na pomalém mobilním přípojení jsou externí fonty kvůli rychlosti problematické.</p>
  </li>  
  <li>
    <p>Jsou dostupné <b>zdarma</b> (pro účely použití v CSS vlastnosti <a href="/font#font-family"><code>font-family</code></a>).</p>
  </li>  
  <li>
    <p>Dodají stránce vzhled <b>nativní aplikace</b>.</p>
  </li>
</ol>

<p>Zásadní problém může být v tom, že různé operační systémy mají hlavní systémové písmo jiné. Stránka používající systémový font se tak visuálně <b>bude lišit napříč operačními systémy a prohlížeči</b>.</p>



<h2 id="ui-pisma">Použití UI fontů</h2>

<p>Zápis používající výchozí systémové písmo, který je universální pro různé operační systémy (<a href="/windows"><b>Windows</b></a>, <b>Linux</b>, <b>OS X</b>).</p>

<pre><code>font-family:
  -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif;</code></pre>


<p>Například <b>GitHub</b> používá od poloviny roku 2016 následující předpis:</p>

<pre><code>font-family: 
  -apple-system, BlinkMacSystemFont, 
  "Segoe UI", Roboto, Helvetica, Arial, sans-serif, 
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
</code></pre>


<div class="external-content">
  <ul>  <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/">Using System UI Fonts In Web Design: A Quick Practical Guide</a></li></ul>
</div>

<p>Pořadí je důležité, protože některé systémové fonty jednoho OS se poměrně často vyskytují i v jiném OS. Třeba systémové písmo Windows – Segoe UI se může snadno dostat na OS X při instalaci Microsoft Office.</p>

<p>Systémové písmo Androidu – Roboto potom budou mít dostupné třeba androidoví vývojáři ve Windows.</p>

<div class="live">
  <style>
  .systemove {
    font-family: 
  -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif;
  }
  </style>
  <p>
    <span class="systemove" style="font-size: 60px">Systémové písmo</span>
  </p>
</div>

<h3 id="problemy">Možné problémy</h3>

<p>Fonty spoléhající se na dostupnost v operačním systému trpí risikem, že nějaký uživatel bude mít špatnou versi daného fontu. Seznam dostupných písem se hodně liší napříč OS a uživateli, takže se docela složitě testuje.</p>

<p>Při použití názvu specifického fontu jeden nikdy neví, kterého kostlivce tím vytáhne ze skříně. Následující článek popisuje nechtěné nastavení písma na <span style="font-family: system">systémové písmo</span> z Windows 3.0.</p>

<div class="external-content">
  <ul> <li><a href="https://medium.com/@mwichary/system-shock-6b1dc6d6596f">System shock
A story of a 25-year-old font coming back with a vengeance</a> – problém písma <code>system</code></li>
</ul>
</div>


<p>V případě Windows a OS X by výše uvedený seznam měl být poměrně spolehlivý, na Linuxu ale může dojít k potížím.</p>


<!--<h2 id="odkazy">Odkazy jinam</h2>-->
