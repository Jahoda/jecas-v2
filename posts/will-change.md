---
title: "Will-change"
headline: "Will-change"
description: "CSS vlastnost <code>will-change</code> dá prohlížeči najevo, že se s elementem bude něco dělat."
date: "2014-06-12"
last_modification: "2015-04-02"
status: 1
tags: ["css", "css-vlastnosti", "webove-animace"]
format: "html"
---

<p>Pro rychlé překreslování stránky se snaží stránku prohlížeče optimalisovat.</p>

<p>Výsledná stránka, co vidí člověk v prohlížeči, je kompilace z několika vrstev. Pokud na stránce probíhají nějaké animace se změnou umístění nebo velikosti, posun elementu v rámci téže vrstvy naruší její velkou část, která se musí následně složitě překreslovat.</p>

<p>V takovém případě je výhodnější, aby přesouvaný element byl v separátní vrstvě. Více o vykreslování stránky je v následujícím článku:</p>


<div class="internal-content">
  <ul>
    <li><a href="/vykreslovani">Jak funguje vykreslování stránky</a></li>
  </ul>
</div>

<p>Prohlížeče se snaží tento postup na rozdělení do vrstev inteligentně odhadovat. Proto bývá výhodnější používat <b>CSS transformace</b> než například <a href="/position">posicování</a>.</p>

<p>Použít <code>will-change</code> je potom dobré, aby prohlížeč věděl, že se bude element animovat a předem se na to připravit. Z pohledu plynulosti je lepší, když se animace <b>spustí později</b> (po přípravě, která zabere nějaký čas), ale bude plynulá, než když by se trhaně začalo animovat hned.</p>




<h2 id="zapis">Zápis</h2>

<p>CSS vlastnost <code>will-change</code> může nabývat několika hodnot, které určují, co se to bude měnit.</p>

<dl>
  <dt id="auto"><code>will-change: auto</code></dt>
  <dd>
    <p>Výchozí hodnota, prohlížeč používá své standardní postupy pro optimalisaci.</p>
  </dd>
  
  <dt id="scroll-position"><code>will-change: scroll-position</code></dt>
  <dd>
    <p>Prohlížeč se připraví, že se bude scrollovat. Prohlížeče většinou nevykreslují celou stránku, ale jen viditelnou oblast a nějakou část kolem s ohledem na kompromis mezi rychlostí vykreslování a plynulosti při rolování.</p>
  </dd>  
  
  <dt id="contents"><code>will-change: contents</code></dt>
  <dd>
    <p>Očekává se změna obsahu elementu. Prohlížeč tak nemusí <i>cacheovat</i> jeho obsah, protože se změní.</p>
  </dd>
  
  <dt id="transform"><code>will-change: transform</code></dt>
  <dd>
    <p>Očekává se CSS transformace.</p>
  </dd> 
  
  <dt id="opacity"><code>will-change: opacity</code></dt>
  <dd>
    <p>Prohlížeč se připraví na změnu <a href="/opacity">průhlednosti</a>.</p>
  </dd>   

  <dt id="left-top"><code>will-change: left, top</code></dt>
  <dd>
    <p>Hodí se pro element který <i>sleduje/kopíruje</i> pohyb myši.</p>
  </dd>     
</dl>  

<p>Více hodnot lze oddělit čárkami.</p>



<h2 id="pridani">Přidávání a odebírání <code>will-change</code></h2>

<p>Informace pro prohlížeč, že se bude s elementem manipulovat sice urychlí animaci, na druhou stranu způsobí vyšší nároky na paměť počítače návštěvníka.</p>

<p>Ideální je proto <code>will-change</code> <b>přidávat až těsně před momentem, kdy se má něco dělat</b>. A zároveň tuto vlastnost důsledně odebírat po dokončení animace, kvůli šetření paměti.</p>

<p>Realisace v JavaScriptu může vypadat následovně:</p>

<pre><code>var el = document.querySelector('.element'); 
el.addEventListener('mouseenter', hintBrowser);
el.addEventListener('animationEnd', removeHint); 
function hintBrowser() {
  this.style.willChange = 'transform, opacity';
}
function removeHint() {
  this.style.willChange = 'auto';
}</code></pre>














<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Podporovány jsou prohlížeče kromě <b>Internet Exploreru</b>.</p>

<ul>
  <li><b>Chrome 36+</b></li>
  <li><b>Firefox 36+</b></li>
  <li><b>Opera 24+</b></li>
  <li><b>Android browser 37+</b></li>
  <li><b>Chrome for Android 40+</b></li>
  <li><b>Opera Mobile 24+</b></li>
</ul>







<h2 id="vyuziti">Využití</h2>

<p>Uvažovat nad použitím <code>will-change</code> je dobré v momentě, kdy se bude zdát, že má stránka problém s výkonem.</p>

<p>Prohlížeče se neustále snaží vykreslování a překreslování optimalisovat bez nutnosti <code>will-change</code> používat. Navíc se stále zlepšuje HW a rychlost prohlížečů, což předpovídá, že <code>will-change</code> bude nutné používat méně a méně.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://fourword.fourkitchens.com/article/fix-scrolling-performance-css-will-change-property">Fix scrolling performance with CSS will-change property</a></li>
  
  <li><a href="https://dev.opera.com/articles/css-will-change-property/">Everything You Need to Know About the CSS will-change Property</a></li>  
  
  <li><a href="http://www.sitepoint.com/introduction-css-will-change-property/">An Introduction to the CSS will-change Property</a></li>  
  
  <li>DevDocs: <a href="http://devdocs.io/css/will-change"><code>will-change</code></a></li>
</ul>