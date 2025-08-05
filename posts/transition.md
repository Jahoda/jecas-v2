---
title: "CSS transition"
headline: "Animace v CSS pomocí transition"
description: "CSS vlastností <code>transition</code> lze na stránce docílit přechodových animací bez JavaScriptu."
date: "2013-06-05"
last_modification: "2013-06-06"
status: 1
tags: ["css", "css-vlastnosti", "webove-animace"]
format: "html"
---

<p>Funkční od Internet Exploreru 10.

<h2>K čemu je to dobré?</h2>
<p>Při určitých událostech (třeba najetí myší na element – <code>:hover</code>) lze již hromadu let změnit vzhled elementu.</p> 

<div class=live>
  <style>
    button.prebarvit {background: red}
    button.prebarvit:hover {background: green}
  </style>
  <p><button class='prebarvit'>Najeďte</button></p>
</div>
  
<p>CSS vlastnosti <code>transition-*</code> řeší jen plynulost této změny. Tedy vytvoří plynulý přechod mezi již vytvořenými stavy.

<div class=live>
  <style>
    button.prebarvit-plynule {background: red; transition: background 0.5s}
    button.prebarvit-plynule:hover {background: green}
  </style>
  <p><button class='prebarvit-plynule'>Najeďte</button></p>
</div>

<h2 id=jak>Jak animovat?</h2>
<p>Pro vytváření efektních přechodů existují 4 vlastnosti, které lze zapsat zkráceně jako <code>transition</code>.
<dl>
<dt id="property"><code>transition-property</code>
<dd>Která CSS vlastnost se má animovat, lze animovat v zásadě všechno u čeho to má smysl (<a href='http://www.w3.org/TR/css3-transitions/#properties-from-css-'>celý seznam</a>).

<dt id="duration"><code>transition-duration</code>
<dd>Délka animace, zadává se v sekundách (např. <code>transition-duration: 1s</code>).

<dt id="timing-function"><code>transition-timing-function</code>
<dd>Slouží k ovlivňování průběhu animace, tj. že se třeba ze začátku bude animovat pomalu a postupně animace zrychlí.
<p>Průběh (rychlost v jednotlivých fází) animace lze poměrně detailně nastavovat (<a href='http://matthewlein.com/ceaser/'>Ukázka</a>). 

<dt id="delay"><code>transition-delay</code>
<dd>Nastavení zpoždění animace po jejím vyvolání. Čas se zadává rovněž v sekundách.
</dl>

<p>Zkrácený zápis <code>transition</code> bude vypadat následovně: <pre><code>transition: <b>animovaná vlastnost</b> <b>délka animace</b> <b>typ animace</b> <b>za jak dlouho začne</b></code></pre>
<p>Konkrétní kód:
<pre><code>transition: opacity 1s ease-in-out 2s</code></pre>
<p>Potom zajistí animaci vlastnosti <code>opacity</code> v délce 1 vteřiny stylem <code>ease-in-out</code>, která začne 2 vteřiny po vyvolání akce.
<p>Zápis funguje chytře, takže projde i:
<pre><code>transition: opacity 1s 2s</code></pre>
<p>A bude fungovat podobně jako předchozí. S tím, že průběh animace bude výchozí (tedy <code>ease</code>). <i>Povinné</i> je v zásadě zadat jen co se má animovat a jak dlouho.

<!-- Ukázka -->
<style>
.animace {background: #0D6AB7; display: block; width: 135px; height: 80px; color: #fff; text-decoration: none; text-align: center; position: relative; transition: all .5s}
.animace span {bottom: -20px; opacity: 0; position: absolute; left: 25px; transition: all 1s}
.animace span+span {bottom: 150px}
.animace:hover span {bottom: 25px; opacity: 1}
.animace:hover span+span {bottom: 5px}
.animace:hover {width: 200px; padding-left: 50px}
</style>
<p class=live><a href='/' class='animace'>
    <img src='http://jecas.cz/images/logo.png'/>
    <span>web o</span>
    <span>webdesignu</span>
</a>
<!-- / konec ukázky -->

<h2 id=udalosti>Události</h2>
<p>Kdy lze přechodové animace <code>transition</code> použít?
<ul>
<li>U <a href='/css-selektory#uzivatelske-akce'>pseudo-tříd uživatelských akcí</a> (<code>:active</code>, <code>:hover</code> a <code>:focus</code>),
<li><a href='/css-selektory#checked'>pseudo-třídy zaškrtnutí</a> <code>:checked</code>,
<li>a <a href='/css-selektory#zamereni'>pseudo-třídy zaměření</a> <code>:target</code>.
</ul>

<h2 id=pouzit>Použití</h2>
<pre><code>element {background: white; <b>transition: background 1s</b>}
element<i>:hover</i> {background: black}</code></pre>

<h2 id=vice-animaci>Více animací</h2>
<p>Chceme-li animovat více vlastností, lze je buď oddělit čárkou, nebo použít magické <code>all</code> (bude se animovat všechno).
<pre><code>/* vše se za 1 sekundu zanimuje */ 
element {transition: <b>all</b> 1s}</code></pre>
<p>Při oddělování čárkami lze volit odlišné časování a styl animování jednotlivých CSS vlastností. Využitím <code>transition-delay</code> potom lze dosáhnout spouštění animací po sobě.
<pre><code>element {transition: background 1s, left 1s 1s}</code></pre>
<p>Kód výše vytvoří sekundovou animaci pozadí, po které se spustí sekundová animace vlastnosti <code>left</code>.

<h2 id=prefixy>Prefixy</h2>
<p>Někde lze vidět používání <code>transition</code> s prefixy.
<pre><code>element {-o-transition: , -webkit-transition: , -moz-transition: }</code></pre>
<p>To je víceméně zbytečné, neboť současné verse Opery, Firefoxu i Chromu rozumí samotnému <code>transition</code> a starší prohlížeče těchto značek používá minimum návštěvníků. Proto pokud se nepoužívá nějaký <b>CSS preprocesor</b>, který prefixy sám doplní, zdá se zbytečné si takto zanášet kód.

<h2 id=zdroje>Zdroje a odkazy</h2>
<ul>
<li><a href='http://www.w3.org/TR/css3-transitions/'>W3C: CSS Transitions</a>
  <li><a href="http://h5bp.github.io/Effeckt.css/">Ukázky různých animací</a></li>
</ul>