---
title: "Animace načítání"
headline: "CSS animace průběhu načítání"
description: "Jak využitím CSS <code>transition</code> a špetky JavaScriptu vytvořit animované znázornění průběhu načítání, jako je třeba na YouTube."
date: "2014-03-01"
last_modification: "2014-03-01"
status: 1
tags: ["css", "hotova-reseni", "webove-animace"]
format: "html"
---

<p>V <a href="/ajax">AJAXových</a> aplikacích se při vyvolání akce někdy hodí <b>znázorňovat průběh</b>. Pokud dokončení akce trvá déle, uživatel má <b>visuální potvrzení</b>, <i>že se něco děje</i>.</p>

<p>Od <b>IE 10</b> je možné animaci vytvořit přes CSS vlastnost <a href="/transition"><code>transition</code></a>, která bude měnit šířku, což vytvoří kýžený efekt.</p>

<p>Také by šly použít přímo animace přes <a href="/animation"><code>@animation</code></a>, ale v tomto případě celkem stačí i <code>tranisition</code> a kód nemusí být <a href="/css-prefixy">zaprefixovaný</a>.</p>

<div class="live">
<style>
.obal {background: #DA3F94; width: 200px; height: 10px; position: relative;}
.postup {height: 10px; background: #1081DD; width: 0; position: absolute; top: 0; left: 0;}
</style>
<div class="obal" id="obal">
    <div class="postup"></div>
</div>
<p>
<button onclick="prubeh(0.5, document.getElementById('obal'))">Animovat 0.5 s</button>
<button onclick="prubeh(2, document.getElementById('obal'))">Animovat 2 s</button>
</p>
<script>
var prubeh = function(cas, obal) {
    var postup = obal.querySelector(".postup");

    var animovat = function() {
        postup.style.transition = "width " + cas + "s";
        postup.style.width = "100%";  
    };
    
    var vycistit = function() {
        postup.style.width = "0";
        postup.style.transition = "";
    };
    
    animovat();
    setTimeout(vycistit, cas * 1000);
};
</script>
</div>

<p><a href="https://kod.djpw.cz/pdcb">Samostatná ukázka</a></p>

<h2 id="jak">Jak to funguje?</h2>
<p>Postup je docela jednoduchý.</p>

<ol>
  <li>Nejprve se vytvoří taková atrapa <a href="/progress">značky <code>&lt;progress></code></a>, tj. <i>obal</i>ový <code>&lt;div></code> a vnořený <code>&lt;div></code> pro znázornění <i>postup</i>u.</li>
  <li>Tento element se spolu s <b>dobou trvání přechodu</b> předá funkci <code>prubeh</code>.</li>
  <li>Funkce potom jen do <code>postup.style.transition</code> nastaví příslušně dlouhou animaci, čímž animování započne.</li>
  <li>A nakonec se <a href="/odpocitavani">časovačem</a> (<code>setTimeout</code>) provede <i>vyčistění animace</i>.</li>
</ol>

<h2 id="cela-stranka">Progress-bar přes celou stránku</h2>

<p>Chtěli-li bychom animaci znázorňovat nahoře přes celou šíři stránky, nejjednodušší je element <code>.postup</code> <a href="/position#fixed">fixně naposicovat</a> nahoru (fixně posicovaný element totiž v podstatě není ovlivňován ničím jiným na stránce).</p>

<div class="live">
<style>
  .postupNacitani {height: 10px; background: #0D6AB7; width: 0; position: fixed; top: 0; left: 0;}
</style>
<div id="postupNacitani" class="postupNacitani"></div>

<button onclick="prubehNacitani(0.5, document.getElementById('postupNacitani'))">Animovat 0.5 s</button>
<button onclick="prubehNacitani(2, document.getElementById('postupNacitani'))">Animovat 2 s</button>
<script>
var prubehNacitani = function(cas, postup) {
    var animovat = function() {
        postup.style.transition = "width " + cas + "s";
        postup.style.width = "100%";  
    };
    
    var vycistit = function() {
        postup.style.width = "0";
        postup.style.transition = "";
    };
    
    animovat();
    setTimeout(vycistit, cas * 1000);
};
</script>
</div>

<p><a href="https://kod.djpw.cz/qdcb">Samostatná ukázka</a></p>


<h2 id="skutecny-prubeh">Skutečný stav načítání</h2>

<p>Výše uvedené ukázky nijak neznázorňují skutečný průběh načtení stránky, ale jen spouští animaci na pevně stanovenou dobu.</p>

<p>Vytvořit skutečnost odrážející progressbar je poměrně komplikované, jelikož u typické webové stránky se zpravidla po <b>vyvolání akce</b> nejprve <b>neznámou a nejdelší dobu</b> čeká na odpověď serveru. Když dorazí, tak už se obsah většinou vykreslí bleskurychle.</p>

<p>Tudíž se není moc od čeho odrazit. Stahovat jednotlivé části stránky několika HTTP požadavky, aby reálně fungovalo zobrazování načítání, je většinou samoúčelné, jelikož to nejspíš <b>prodlouží dobu načítání</b>.</p>

<p>Zajímavé řešení může být vytvořit <b>nekončený stav průběhu</b>, kdy animace začne rychle, ale neustále se zpomaluje a zpomaluje.</p>