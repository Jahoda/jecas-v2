---
title: "Nula před desetinnou tečkou u čísla"
headline: "Nula před desetinnou tečkou u čísla"
description: "Je lepší psát před desetinou tečnou u čísla <code>0.5</code> zbytečnou nulu, nebo ne?"
date: "2018-04-17"
last_modification: "2018-06-01"
status: 1
tags: ["css", "napady", "style-guide"]
format: "html"
---

<p>Při zápisu desetinných čísel bývá v programování volitelné uvádět nulu před desetinnou tečkou. Číslo <code>0.5</code> se tedy rovná <code>.5</code>.</p>

<p>V CSS se s tím jde setkat např. při používání <code>em</code> jednotek:</p>

<pre><code>element {
  padding: .5em;
}</code></pre>









<p>Výše uvedený kód je ekvivalentem:</p>

<pre><code>element {
  padding: <b>0</b>.5em;
}</code></pre>









<p>Je ale lepší nulu psát, nebo vynechávat?</p>

<div class="internal-content">
  <ul>
    <li><a href="/css-zbytecnosti">CSS zbytečnosti</a> – další zbytečně psané znaky v CSS</li>
  </ul>
</div>

<p>Předně jsem toho názoru, že je to jedno, jen je dobré se domluvit na <b>jednotném stylu napříč projektem</b>.</p>


<h2 id="bez-nuly">Vynechání počáteční <code>0</code></h2>


<p>Pro vynechání nuly hovoří 3 věci:</p>

<ol>
  <li><p>Je to o jeden znak rychlejší na zápis.</p></li>
  <li><p>Nemusí se po síti k návštěvníkovi přenášet zbytečný znak.</p></li>
  <li><p>Pro prohlížeč může být teoreticky rychlejší nevyhodnocovat číselnou část před tečkou.</p>
  
  <div class="external-content">
    <ul>
        <li>
          <p>W3C: <a href="https://www.w3.org/TR/css-syntax-3/#number-token-diagram">CSS syntax: number token diagram</a></p>
        </li>
    </ul>
  </div></li>
</ol>

<p>Dvě poslední ze tří věcí může automaticky zajistit automatisace v podobě CSS pre/post-procesoru.</p>





<h2 id="s-nulou">Psaní s <code>0</code></h2>

<ol>
  <li>
    <p>Někomu může přijít psaní s nulou přehlednější:</p>

<pre><code>element {
  padding: 5em 0 .5em;
}</code></pre>








<p>Oproti:</p>

<pre><code>element {
  padding: 5em 0.5em;
}</code></pre>
    
    
    
    
    
    
    
    
    <p>Kdy až na tu mezeru relativně podobné kusy kódu dělají úplně něco jiného.</p>
  </li>
    
  
  <li>
    <p>Méně zkušeným lidem může přijít takový zápis <a href="http://www.lamer.cz/quote/72668">nejasný nebo nezvyklý</a>.</p>
  </li>
</ol>

<p>Přehlednost je v tomto případě dost subjektivní. Když si člověk zvykne zbytečnou nulu nepsat, přijde mu potom <code>0.5</code> také divné.</p>



<h2 id="sg">Populární Style Guide</h2>

<p>V style guidech větších skupin vývojářů se lze setkat s oběma přístupy:</p>

<div class="external-content">
  <ul>  
    <li>Google HTML/CSS Style Guide: <a href="https://google.github.io/styleguide/htmlcssguide.html#Leading_0s">Leading 0s</a> – <b>nepsat</b> počáteční nulu</li>

    <li>Sass Guidelines: <a href="https://sass-guidelin.es/cz/#nuly">nuly</a> – <b>psát</b> počáteční nulu</li>
  </ul>
</div>


<p>Těžko tak proto jednoznačně určit, že je ten nebo ten přístup lepší. </p>

<p><b>Co preferujete vy? A proč?</b></p>




