---
title: "HTML <time>"
headline: "HTML značka <code>&lt;time></code>"
description: "HTML element <code>&lt;time></code>. Jak a proč ho použít na stránce."
date: "2014-07-01"
last_modification: "2014-09-17"
status: 1
tags: ["datum", "html", "html-tagy"]
format: "html"
---

<p>Pro vyznačení, co na stránce je <b>datum</b>, <b>čas</b> nebo <b>časový úsek</b>, byla zavedena HTML značka <code>&lt;time></code>.</p>

<p>Z pohledu <b>prohlížečů</b> jde o řádkový <a href="/html-znacky#povinne">povinně párový tag</a>, který se nevyznačuje výrazně speciálním chováním, tudíž nemá skoro smysl řešit jeho funkčnost v prohlížečích (kromě <b>IE 8</b>, kde <a href="/vlastni-html-znacky#html5">nepůjde stylovat</a>).</p>

<p>Z pohledu <b>návštěvníka</b> se použití <code>&lt;time></code> prakticky neliší od neutrální řádkové značky <code>&lt;span></code>.</p>

<p>Využitelná je tedy tato značka zejména pro <b>strojové zpracování</b>.</p>


<h2 id="zapis">Zápis</h2>

<pre><code>&lt;time>
  17. září 2014
&lt;/time></code></pre>

<p>Protože výše uvedenému <b>českému formátu data</b> by nemusel <i>stroj</i> porozumět (i když například <a href="/google">Google</a> s tím nemá problém), existuje atribut <code>datetime</code>.</p>


<pre><code>&lt;time <b>datetime</b>="2014-09-17">
  17. září 2014
&lt;/time></code></pre>


<h2 id="datetime">Atribut <code>datetime</code></h2>

<p>Do atributu pro strojově zpracovatelný datum/čas je potom možné zadávat <i>různé věci</i>. V zásadě jde použít totéž, co u <a href="/input#type-date">&lt;input>ů pro čas/datum</a>.</p>

<p>Co se týče data, nejdelší použitelný zápis je:</p>

<style>
  code.vysvetleni span {position: relative; border: 1px solid transparent; cursor: pointer}
  code.vysvetleni span:hover, code.vysvetleni span:focus {background: #ccc; border: 1px dotted #666}
  code.vysvetleni span:focus:after {content: attr(title); position: absolute; top: -2em; left: 0; background: #666; color: #fff; padding: 0 .3em}
</style>
<pre style="overflow: visible"><code class="vysvetleni"><span tabindex="-1" title="rok">2014</span>-<span tabindex="-1" title="měsíc">09</span>-<span tabindex="-1" title="den">31</span><span tabindex="-1" title="oddělovač data a času (stačí i mezera)">T</span><span tabindex="-1" title="hodina">23</span>:<span tabindex="-1" title="minuta">59</span>:<span tabindex="-1" title="vteřina">59</span><span tabindex="-1" title="časové pásmo">+02:00</span></code></pre>

<p><i>(pro vysvětlení klikněte na libovolnou část řetězce)</i></p>

<p>Z toho jde potom <b>zjednodušováním</b> vytvořit datum s časem bez časového pásma, samotný čas, samotný datum, samotný rok a měsíc nebo jen rok a podobně.</p>

<p>Zvláštní případ je potom určení týdne v roce:</p>

<pre style="overflow: visible"><code class="vysvetleni">2014-<span tabindex="-1" title="23. týden v roce">W23</span></code></pre>


<h3 id="trvani">Doba trvání</h3>

<p>Nakonec jde do <code>datetime</code> zadat i dobu trvání. Ta může najít uplatnění třeba u znázornění <b>délky videa</b> nebo jiné doby trvání:</p>

<pre><code>&lt;time datetime="4d 3m 10s">
  4 dny, 3 minuty a 10 vteřin
&lt;/time></code></pre>

<p>Výše uvedený příklad by znázorňoval dobu trvání 4 dny (<code>4d</code>), 3 minuty (<code>3m</code>) a 10 vteřin (<code>10s</code>).</p>

<p>Ještě existuje druhý způsob zápisu:</p>


<pre style="overflow: visible"><code class="vysvetleni"><span tabindex="-1" title="P jako period – značí, že se jedná o dobu trvání">P</span> <span tabindex="-1" title="čtyři dny">4D</span> <span tabindex="-1" title="oddělení data a času">T</span> <span tabindex="-1" title="3 minuty">3M</span> <span tabindex="-1" title="10 vteřin">10S</span></code></pre>

<p>Mezery mezi jednotlivými částmi <b>jsou volitelné</b>.</p>


<h2 id="vyuziti">Využití</h2>

<p>Kromě <b>sémantického výzamu</b> a teoreticky lepší <b>strojové čitelnosti</b> nejsou moc důvody element <code>&lt;time></code> používat.</p>

<p><b>Vyhledávače</b> si z historických důvodů musí poradit i s prostým uvedením data mimo značku <code>&lt;time></code>, navíc v případě Google jde oblast s datem na stránce přímo vyznačit v <b>Google Webmaster Tools</b> (<i>Vzhled vyhledávání</i> → <i>Zvýrazňovač dat</i>).</p>

<p>Z pohledu JavaScriptového API značky <code>&lt;time></code> také není nic moc k disposici, kromě vlastnosti <code>dateTime</code> pro práci s atributem <code>datetime</code>.</p>


<h2 id="potencial">Potenciál</h2>

<p>Potenciál značka <code>&lt;time></code> ale možná má. Dají se představit případy užití, kdy by kombinaci s chytrým prohlížečem / operačním systémem mohla nabídnout něco víc. Třeba nabízet na základě hodnoty v <code>&lt;time></code> <b>vytvoření události</b> v kalendáři, na základě doby trvání třeba připravit <b>zapnutí odpočítávání</b> a podobně.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>DevDocs: <a href="http://devdocs.io/html/element/time"><code>&lt;time></code></a></li>
  
  <li><a href="http://www.w3.org/TR/html5/grouping-content.html#the-time-element">Specifikace na W3C</a></li>
  
  <li><a href="http://thenewcode.com/5/Web-Developer-Reading-List-Dates-Time-Units-and-Events">Dates, Time, Units and Events</a></li>
</ul>