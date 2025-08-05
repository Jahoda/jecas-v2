---
title: "CSS animace"
headline: "CSS vlastnost <code>animation</code>"
description: "Animování prvků na stránce pomocí čistého CSS s využitím <code>@keyframes</code>."
date: "2013-06-18"
last_modification: "2013-09-25"
status: 1
tags: ["css", "css-vlastnosti", "webove-animace"]
format: "html"
---

<p>Kromě přechodů <a href="/transition"><code>transition</code></a> existují i <b>plnohodnotnější animace v čistém CSS</b>. Podporováno od <b>Internet Exploreru 10</b>. Pro prohlížeče založené na Webkitu je nutnou používat <a href="/css-prefixy">prefix</a> <code>-webkit-</code>.</p>

<h2 id=keyframes>Klíčové snímky (<code>keyframes</code>)</h2>
<p>Animace se složí z jednotlivých klíčových snímků. <b>Jednotlivé kroky</b> mohou být buď <b>znázorněny procenty</b>, nebo v případě, kdy stačí jen dva stavy, lze místo procent <b>použít klíčová slova</b> <code>from</code> a <code>to</code> (ekvivalent <code>0%</code> a <code>100%</code>).</p>
<pre><code>@keyframes jmeno-animace {
  0%   {background: blue}
  50% {background: yellow}
  100% {background: red}
}</code></pre>

<h2 id="animation">Animace (<code>animation</code>)</h2>
<p>Výše nadefinované klíčové snímky se přiřadí danému elementu, syntaxe je dost podobná vlastnosti <a href="/transition"><code>transition</code></a>:</p>
<pre><code>element {
  animation: jmeno-animace 5s linear;
}</code></pre>

<p>Vlastnost <code>animation</code> je zkrácenina všech <code>animation-*</code> vlastností. Název a doba trvání jsou <i>povinné</i>.</p>

<dl>
<dt id=animation-name><code>animation-name</code>
  <dd><p><b>Název animace</b>, která se má selektoru přiřadit.</p>

<dt id=animation-duration><code>animation-duration</code>
  <dd><b>Délka animace</b>, zadává se v sekundách (např. <code>animation-duration: 1s</code>).

<dt id=animation-timing-function><code>animation-timing-function</code>
  <dd><p>Slouží k ovlivňování <b>průběhu animace</b>, tj. že se třeba ze začátku bude animovat rychle a konec animace bude pomalejší (výchozí hodnota <code>ease</code>). Nebo může být průběh lineární (<code>linear</code>).</p>
    <p>Průběh (rychlost v jednotlivých fází) animace lze poměrně detailně nastavovat (<a href='http://matthewlein.com/ceaser/'>Ukázka</a>). </p></dd>

  <dt id=animation-delay><code>animation-delay</code></dt>
  <dd><p>Nastavení <b>zpoždění animace</b> po jejím vyvolání. Čas se zadává rovněž v sekundách.</p></dd>
  
  <dt id=animation-iteration-count><code>animation-iteration-count</code></dt>
  <dd><p><b>Počet opakování</b> dané animace. Výchozí hodnota je <b>1</b>, jiným číslem lze požadovaný počet opakování, <b>nekonečné přehrávání</b> zajistí klíčové slovo <code>infinite</code>.</p></dd>  
  
  <dt id=animation-direction><code>animation-direction</code></dt>
  <dd><p><b>Směr animace</b>, možné hodnoty jsou:</p>
  <ul>
    <li><code>normal</code> — výchozí hodnota; animace běží od 0% ke 100%, potom v případě opakování skočí na 0%,</li>
    <li><code>reverse</code> — animace běží od 100% k 0%, potom v případě opakování skočí na 100%,</li>
    <li><code>alternate</code> — má význam jen u více opakování a při každém změní svůj <i>směr</i>, tj. nejprve poběží z 0% ke 100%, potom se vrátí k 0%, zase poběží ke 100% a tak dále,</li>
    <li><code>alternate-reverse</code> — totéž jen se začne od 100%.</li>
  </ul>
  </dd> 
  
    <dt id=animation-fill-mode><code>animation-fill-mode</code></dt>
  <dd><p>Upřesňuje, zda se mají hodnoty prvního nebo posledního snímku <b>projevovat i při skončení animace</b>.</p>
  <ul>
    <li><code>none</code> — výchozí hodnota; před animováním s nic nemění, po skončení animace se vše vrátí k normálu,</li>
    <li><code>forwards</code> — po skončení animace zůstane stav posledního snímku,</li>
    <li><code>backwards</code> — v případě prodlevy před zahájením animace (<code>animation-delay</code>) se nastaví s předstihem hodnoty prvního snímku,</li>
    <li><code>both</code> — kombinace výše uvedeného.</li>
  </ul>
  </dd> 
  
    <dt id=animation-play-state><code>animation-play-state</code></dt>
  <dd><p>Umožňuje <b>zastavení</b> a opětovné spuštění animace.</p>
  <ul>
    <li><code>running</code> — výhozí hodnota; animace běží,</li>
    <li><code>paused</code> — animace je pozastavena, opětovné spuštění naváže v okamžiku předchozího pozastavení.</li>
  </ul>
  </dd>   
</dl>

<h3 id=vice>Více animací</h3>
<p>Jeden element může používat animací více. Mají-li <code>animation-*</code> hodnoty být různé pro každou animaci zvlášť, hodnoty se oddělují čárkou (<code>,</code>).</p>
<pre><code>element {animation: prvni-animace 5s, druha-animace 2s}</code></pre>

<h2 id=spusteni>Vyvolání animace</h2>
<p>Animace může být <i>spuštěna</i> třemi způsoby:</p>
<ol>
  <li><b>ihned po načtení</b> stránky — pokud by se výše uvedená animace přiřadila např. pro <code>&lt;h1&gt;</code>, po načtení nadpisy změní své pozadí,</li>
  <li><b>přes CSS</b> pomocí <a href="/css-selektory#uzivatelske-akce">selektorů uživatelské akce</a> (<code>:hover</code>, <code>:focus</code> apod.),</li>
  <li><b>přidáním třídy JavaScriptem</b> — animace se přiřadí speciální <code>.třídě</code>, kterou při nějaké akci <a href="/prepinani-trid">nastaví JS</a>.</li>
</ol>

<h2 id=demo>Test animace</h2>
<p>Prostor pro vyzkoušení (nefunguje ve starších Explorerech než 10).</p>
<!-- http://kod.djpw.cz/wfc -->
<style>
@keyframes animace
{
0%   {background: blue; width: 50px}
100% {background: red; width: 150px}
}
@-webkit-keyframes animace
{
0%   {background: blue; width: 50px}
100% {background: red; width: 150px}
}

.animace span {
  display: block; background: blue; width: 50px; height: 50px;
}
</style>

<script>
function animator() {
  var animace = document.getElementById("animace");
  animace.innerHTML = "";
  
  var obal = document.getElementById("nastaveni-animace");
  
  var css = "animation-name: animace; -webkit-animation-name: animace;\n";
  css += projit(obal.getElementsByTagName("input"));
  css += projit(obal.getElementsByTagName("select"));
  
  var animator = document.createElement("span");
  animator.style.cssText = css
  animace.appendChild(animator);
  
  document.getElementById("vystup").innerHTML = css;
}

function vlastnostHodnota(prefix, el) {
  var vystup = prefix + el.id + ": " + el.value + (el.title ? el.title : "");
  vystup += "; -webkit-" + vystup + ";\n";
  return vystup;
}

function projit(els) {
  var prefix = "animation-";
  var css = "";
  for (i = 0; i < els.length; i++) {
    css += vlastnostHodnota(prefix, els[i]);
  }
  return css;
}
</script>



<div class="live">
<div class="animace" id="animace">
  <span></span>
</div>
</div>

<ul id=nastaveni-animace>
  <li><label>Délka animace: 
    <input type="range" min=1 max=5 value=3 id=duration title="s" onchange="animator()"></label></li>
  <li><label>Zpoždění animace: 
    <input type="range" min=0 max=5 value=0 id=delay title="s" onchange="animator()"></label></li>
  <li><label>Opakování animace: 
    <select id=iteration-count onchange="animator()">
      <option value="1">1</option>
      <option value="infinite">nekonečné</option>
    </select>
    </label></li>  
  <li><label>Směr animace: 
    <select id=direction onchange="animator()">
      <option value="normal">normální</option>
      <option value="reverse">obrácený</option>
      <option value="alternate">tam a zpátky</option>
      <option value="alternate-reverse">tam a zpátky obrácený</option>
    </select>
    </label></li> 
  <li><label>Při začátku/skončení animace:
    <select id=fill-mode onchange="animator()">
      <option value="none">nic</option>
      <option value="forwards">zůstane poslední</option>
      <option value="backwards">nastaví první</option>
      <option value="both">nastaví první + zůstane poslední</option>
    </select>
    </label></li> 
  <li><label>Přehrávat/zastavit animaci:
    <select id=play-state onchange="animator()">
      <option value="running">běží</option>
      <option value="paused">zastaveno</option>
    </select>
    </label></li>   
</ul>
<p><button onclick="animator()">Spustit animaci</button>
  <pre><code id=vystup></code></pre>

<h2 id="odkazy">Odkazy a zajímavé animace</h2>
<ul>
  <li><a href="http://kod.djpw.cz/gfc">Odpočítávání</a> (<a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=3&amp;topic=151050">vlákno na DJPW</a>)</li>
  <li><a href="http://bennettfeely.com/cssynth/">CSSNTH</a></li>
  <li><a href="https://medium.com/p/3d1b0a9b810e">Improve the payment experience with animations</a></li>
  <li><a href="http://bouncejs.com/">Bounce.js</a>: Generátor CSS animací</li>
</ul>

<p>Knihovny animací:</p>

<ul>
  <li><a href="http://ianlunn.github.io/Hover/">Hover.css v2</a></li>
  <li><a href="http://h5bp.github.io/Effeckt.css/">Effeckt.css</a></li>
  <li><a href="https://github.com/daneden/animate.css/">animate.css</a></li>
</ul>
