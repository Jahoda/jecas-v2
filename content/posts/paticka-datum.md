---
title: "Datum v patičce"
headline: "Datum v patičce"
description: "Jaké datum uvádět v patičce a jak automaticky zajistit, aby bylo aktuální."
date: "2015-01-05"
last_modification: "2016-01-07"
status: 1
tags: ["napady"]
format: "html"
---

<p>Na webových stránkách bývá zvykem, že na konci stránky v patičce bývá mj. uvedené <b>datum</b>.</p>

<p>Otázka je, co by mělo <b>datum symbolisovat</b>, napříč internetem se je možné setkat s různými způsoby:</p>

<ol>
  <li>aktuální rok,</li>
  
  <li>datum vzniku webu,</li>
  
  <li>rozsah mezi rokem založení a aktuální,</li>
  
  <li>datum poslední aktualisace</li>
</ol>

<h2 id="aktualni">Aktuální rok</h2>

<p>Zobrazení <b>aktuálního roku</b> používá řada populárních služeb. Je trochu k úvaze k čemu je taková informace dobrá.</p>

<p>Smysl asi má, že aktuální datum značí, že je <b>webová stránka aktuální</b>, což může být trochu <i>podvod</i> v případě, že se letopočet mění automaticky.</p>

<ul>
  <li>
    <p><a href="/facebook">Facebook</a></p>
    
    <p><img src="/files/paticka-datum/fb.png" alt="Datum v patičce na Facebooku" class="border"></p>
  </li>
  
  <li>
    <p><a href="/twitter">Twitter</a></p>
    
    <p><img src="/files/paticka-datum/twitter.png" alt="Datum v patičce na Twitteru" class="border"></p>
  </li>  
  
  <li>
    <p><a href="/ga">Google Analytics</a></p>
    
    <p><img src="/files/paticka-datum/ga.png" alt="Datum v patičce v Google Analytics" class="border"></p>
  </li>  
  
  
  <li>
    <p>Outlook.com od Microsoftu</p>
    
    <p><img src="/files/paticka-datum/ms.png" alt="Datum v patičce na Outlook.com" class="border"></p>
  </li>    
</ul>



<h2 id="rozsah">Rozsah od–do</h2>

<p>Další rozšířeným typem je použití rozsahu let, kdy je webová stránka funkční. Stáří stránky může zvýšit její <b>důvěryhodnost</b> a předat návštěvníkovi informaci, kdy byl web založen.</p>

<p>Rozsah dvou letopočtů se typograficky správně píše s <b>–pomlčkou–</b> (nikoliv se -spojovníkem-) a <b>bez mezer</b>:</p>

<div class="live">
  <p>2013&ndash;2016</p>
</div>




<p><a href="/ceska-klavesnice#kody">Pomlčka</a> se zapíše <b>HTML entitami</b> <code>&amp;ndash;</code> (krátká) nebo <code>&amp;mdash;</code> (dlouhá).</p>

<p>Příklad stránek používající rozsah:</p>

<ul>
  <li>
    <p><a href="/seznam">Seznam</a></p>
    
    <p><img src="/files/paticka-datum/seznam.png" alt="Rozsah letopočtů v patičce na Seznamu" class="border"></p>
  </li>
  
  <li>
    <p><a href="http://disqus.com">Disqus</a></p>
    
    <p><img src="/files/paticka-datum/disqus.png" alt="Datum v patičce na Disqus" class="border"></p>
  </li>  
</ul>


<h2 id="datum-update">Datum poslední aktualisace</h2>

<p>Z pohledu návštěvníka asi nejužitečnější informace. U článků ale typicky bývá datum vytvoření nebo poslední změny uveden už výše, takže ta samá informace v patičce může být <b>duplicitní</b>.</p>



<ul>
  <li>
    <p>Wikipedie</p>
    
    <p><img src="/files/paticka-datum/wiki.png" alt="Datum poslední aktualisace na Wikipedii" class="border"></p>
  </li>
  
  <li>
    <p><a href="http://jakpsatweb.cz">Jak psát web</a> – značí update celého webu</p>
    
    <p><img src="/files/paticka-datum/jpw.png" alt="Datum v patičce na Disqus" class="border"></p>
  </li>  
</ul>


<h2 id="automaticky-rok">Automatická změna</h2>

<p>Pokud je cílem zobrazovat v patičce aktuální rok, jde to zajistit automaticky.</p>

<p>V <b>PHP</b>:</p>

<pre><code>&lt;?php echo date("Y");?></code></pre>

<p>Finální použití může vypadat třeba takto:</p>

<pre><code>&lt;p>
  2013&amp;ndash;&lt;?=date("Y")?>
&lt;/p></code></pre>

<p>Při použití Nette a šablonovacího systému <b>Latte</b> se aktuální rok vypíše pomocí:</p>

<pre><code>{date("Y")}</code></pre>

<p>V <b>JavaScriptu</b> je aktuální rok dostupný přes:</p>

<pre><code>var rok = new Date().getFullYear();</code></pre>

<p>Jak už bylo naznačeno dříve, v případě neaktualisovaného (opuštěného) webu to pro návštěvníky vytvoří <b>klamný dojem</b>.</p>

<p>Pro <i>nejférovější</i> automatickou změnu se tak nabízí používat rok <b>poslední změny obsahu</b>, který by rovněž mělo být možné získat automaticky.</p>