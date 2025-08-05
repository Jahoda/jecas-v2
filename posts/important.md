---
title: "CSS !important"
headline: "CSS <code>!important</code>"
description: "Klíčové slovo <code>!important</code> slouží k posílení a přebíjení CSS vlastností."
date: "2015-10-17"
last_modification: "2015-10-17"
status: 1
tags: ["css", "selektory-css"]
format: "html"
---

<p>V angličtině <i lang="en">important</i> znamená <b>důležitý</b>. Slouží tedy k zvýšení důležitosti CSS hodnot.</p>

<p>Při utváření <a href="/css-selektory">CSS selektorů</a> mají různé selektory různou sílu.</p>

<ol>
  <li>Nejníže je universální hvězdičkový selektor:
    <pre><code>* {color: red}</code></pre>
  </li>
  <li>Trochu silnější jsou selektory elementů a pseudo-elementů:
    <pre><code>input,
:before {
  color: green;
}</code></pre>
  </li> 
  
  <li>Ještě silnější jsou třídy, atributy a pseudo-třídy:
    <pre><code>.cerveny,
[type=text],
:hover {
  color: blue;
}</code></pre>
  </li>  
  
  <li>Nejsilnější jsou <code>#id</code>:
    <pre><code>#cerny {
  color: black;
}</code></pre>
  </li>    
</ol>















<p>Proto když se výchozí styly přidají do CSS, textové políčko <a href="/input"><code>&lt;input></code></a> bude černé:</p>

<pre><code>&lt;input type="text" <b>id="cerny"</b> class="cerveny" value="Text"></code></pre>

<p>Vždy vyhrává selektor z nejsilnější skupiny. Tedy následující selektor:</p>

<pre><code>html.svetle body.tmave .policko input[type="text"] {
}</code></pre>

<p>Bude hravě přebit pomocí:</p>

<pre><code>#idecko {
}</code></pre>

<p><a href="http://kod.djpw.cz/bfrb">Ukázka</a></p>










<h2 id="sila">Síla <code>!important</code></h2>

<p>Klíčové spojení „<code>!important</code>“ se používá pro posílení dané CSS hodnoty:</p>

<pre><code>p {
  color: red <b>!important</b>;
}
p#modry {
  color: blue;
}</code></pre>








<p>Odstavec s <code>id="modry"</code> bude červený, ačkoliv selektor <code>p#modry</code> je mnohem silnější než <code>p</code> – díky <code>!important</code>.</p>


<p>Zapisuje se za hodnotu, kterou má posílit. Je jedno, jestli se pro přehlednost použije mezi hodnotou a <code>!important</code> mezera nebo ne. Může tam být klidně i odřádkování. <i>Bílé znaky</i> mohou být i mezi vykřičníkem a <i>important</i>.</p>


<p>Někde se uvádí, že <i>important</i> <b>znemožní přepsání jinou CSS vlastnosti</b>.</p>

<blockquote cite="http://www.jakpsatweb.cz/css/css-tridy-class.html#skladani">
  <p>Když chci, aby nějaká dřívější deklarace převládla, napíšu do deklarace řetězec „<code>! important</code>“. Taková deklarace potom nebude přehlušena žádnou pozdější.</p>
  
  <p class="autor">– <b>Yuhů</b>, Jak psát web: <a href="http://www.jakpsatweb.cz/css/css-tridy-class.html#skladani">Skládání stylů</a></p>
</blockquote>

<p>Není to úplně přesné:</p>


<h2 id="prebijeni">Přebíjení <code>!important</code>ů</h2>

<pre><code>p {
  color: red !important;
}
p.modry {
  color: blue !important;
}</code></pre>

<p>Bude <a href="/odstavec">odstavec</a> červený, nebo modrý?</p>


<p>Pokud na sebe narazí dvě deklarace používající <code>!important</code>, použijí se opět klasická pravidla síly selektorů.</p>

<p>Odstavec <code>&lt;p class="modry"></code> tak bude modrý, protože <code>p.modry</code> je silnější selektor. Použití <code>!important</code> v tomto případě pouze <i>srovná síly</i>.</p>









<h2 id="nejsilnejsi">Nejsilnější nastavení hodnoty</h2>

<p>V případě nastavení stylu prostřednictvím atributu <code>style</code> jsou přebity hodnoty nastavené libovolným selektorem:</p>

<pre><code>&lt;style>
#modry {
  color: blue;
}
&lt;/style>
&lt;p id="modry" style="color: red">
  Červený odstavec
&lt;/p></code></pre>









<p>S výjimkou <code>!important</code>. Tento odstavec bude modrý:</p>

<pre><code>&lt;style>
#modry {
  color: blue <b>!important</b>;
}
&lt;/style>
&lt;p id="modry" style="color: red">
  Modrý odstavec
&lt;/p></code></pre>










<p>Použil-li by se <code>!important</code> v řádkovém atributu <code>style</code>, byl by odstavec opět červený.</p>

<p>Nejsilnější nastavení hodnoty v CSS je tedy proveditelné prostřednictvím  <code>!important</code> uvnitř atributu <code>style</code>.</p>

<p>I to jde ale překonat změnou vlastnosti JavaScriptem:</p>

<pre><code>modry.style.color = "green !important";</code></pre>



<h2 id="vyuziti">Využití</h2>


<p>Important <b>není obecně moc dobré používat</b>, protože má moc velkou sílu. Obecně je dobré držet sílu CSS zápisu co nejnižší, protože je potom jednodušší jeho úprava – to platí kromě <code>!important</code> i pro CSS selektory.</p>


<p>V případě, že je problém nějakou vlastnost přepsat, bývá lepší zkusit snížit sílu předchozího selektoru než vytvářet nový silnější. Není-li na výběr, je asi nejlepší možnost selektor opakovat:</p>

<p>Bude-li existovat zbytečně silný selektor <code>table tr td.cerveny</code>.</p>


<pre><code>table tr td.zvyraznit {
  color: red;
}</code></pre>



<p>Jde přebít následovně (dvě třídy jsou silnější než jedna):</p>



<pre><code>.zvyraznit.zvyraznit {
  color: blue;
}</code></pre>

<p>Pro udržování <b>nízké síly selektorů</b> je vhodný postup <a href="/bem">BEM</a>, kde se pro stylování používají pouze CSS třídy. Vyžaduje to ale vyšší nároky na HTML kód, kde musí být třída u všeho, co se má stylovat.</p>





<h3 id="prebijeni-style">Přebíjení atributu <code>style</code></h3>

<p><a href="http://webylon.info"><b>Chamurappi</b></a> zmínil na <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=156043#13">diskusi JPW</a> případy, kdy <code>!important</code> používá – pro <b>přebíjení atributu <code>style</code></b>:</p>

<blockquote cite="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=156043#13">
<p>Já občas používám    
  <code>!important</code>   ve spolupráci s naskriptovanými věcmi. 
</p>
<p>  Pokud skriptem měním třeba nějaké souřadnice    
  <code>left</code>   a    
  <code>top</code>   (tzn. měním vlastně přímo atribut    
  <code>style</code>, který mívá běžně nejvyšší prioritu) a tyto hodnoty se mají v nějakém stavu ignorovat, přebíjím je tím, že jim přes nějakou třídu společného rodiče nastavím výchozí hodnoty s    
  <code>!important</code>  em (není-li možné jim dát    
  <code>position: static</code>  ). 
</p>
<p>  Nebo jiný případ — server mi generuje do HTML    
  <code>style="background-image: url(obrázek.jpg)"</code>   (jelikož jen on zná URL obrázku) a já zatím nechci, aby se obrázek načítal, tak dám co nejdříve skriptem rodičovi třídu, která nastaví dotyčným elementům    
  <code>background-image: none !important</code>. 
</p>
<p>  A ještě třetí možnost využití, v    
  <code>contenteditable</code>   mívá uživatel velkou volnost v tom, co vloží. Může běžně vložit formátovaný kus DOMu ze schránky či přetažením. Pokud se mu nechci plést pod prsty, ale jen jemně naznačit, že velké růžové písmo nebude velké, ani růžové, že element s obrázkem na pozadí nemůže mít pozadí, že    
  <code>&lt;input></code>   či    
  <code>&lt;iframe></code>   ve výsledku neuvidí a že vloženým obrázkům nemůže změnit velikost, také k tomu používám supersilné CSS předpisy s    
  <code>!important</code>em. 
</p>
<p>  Nepotřebuji-li přebíjet atribut    
  <code>style</code>, nemám pro    
  <code>!important</code> rozumné využití.      
</p>
  
  <p class="autor">— <b>Chamurappi</b></p>
</blockquote>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://csswizardry.com/2016/05/the-importance-of-important/">The Importance of !important: Forcing Immutability in CSS</a> – kdy se ještě může hodit použít <code>!important</code></li>
</ul>
