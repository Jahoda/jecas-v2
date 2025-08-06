---
title: "Oddělovač položek v navigaci"
headline: "Oddělovač položek v menu"
description: "Jakými způsoby v CSS lze realisovat oddělovač položek v menu."
date: "2015-09-16"
last_modification: "2015-09-18"
status: 1
tags: ["css", "hotova-reseni", "menu"]
format: "html"
---

<p>Vodorovná navigace často potřebuje pro přehlednost nebo visuální atraktivitu mít mezi jednotlivými položkami oddělovač.</p>


<h2 id="znak">Oddělovací znak</h2>

<p>První možnost, jak oddělovač vytvořit, je použít přímo nějaký znak.</p>

<p>Typicky se používá svislá čára <code>|</code>. (Na <a href="/ceska-klavesnice">české klávesnici</a> jde zapsat zkratko <kbd>Ctrl</kbd> + <kbd>W</kbd>).</p>

<div class="live">
  <a href="#">Odkaz</a> | <a href="#">Další odkaz</a> | <a href="#">Poslední odkaz</a>
</div>

<p>Kromě svislé čáry je občas k vidění i puntík (HTML <a href="/entity">entita</a> <code>&amp;middot;</code>):</p>

<div class="live">
  <a href="#">Odkaz</a> &middot; <a href="#">Další odkaz</a> &middot; <a href="#">Poslední odkaz</a>
</div>

<p>Nebo větší <code>&amp;bull;</code>:</p>

<div class="live">
  <a href="#">Odkaz</a> &bull; <a href="#">Další odkaz</a> &bull; <a href="#">Poslední odkaz</a>
</div>


<p>Jaký znak se použije, je celkem jedno.</p>

<p>Díky tomu, že obsah odkazu je obalen značkou <a href="/odkaz"><code>&lt;a></code></a>, není problém s odlišným stylováním odkazu a oddělovače (třeba jinou barvou).</p>

<p>Pro pohodlnější stylování se nabízí případně oddělovač obalit <code>&lt;span></code>em.</p>




<h3 id="nevyhody">Nevýhody oddělovacího znaku</h3>

<ol>
  <li><p>Fandům <b>HTML sémantiky</b> může vadit, že menu není v <a href="/seznamy">seznamu</a>. To by sice šlo řešit, ale navíc je ještě v kódu znak, který slouží pouze k visuálním účelům.</p></li>  
  
  <li><p>Při <b>automatickém generování</b> navigace se musí v HTML šabloně řešit, aby oddělovač nebyl za poslední položkou.</p></li>
  
  <li><p>Vzhled není pouze v CSS.</p></li>
</ol>


<h2 id="css">CSS oddělovač</h2>

<p>Oddělovač jde vykouzlit čistě v CSS. Buď přímo znakem pomocí CSS vlastnosti <code>content</code> použité u <code>:before</code>/<code>:after</code> (funkční od <b>IE 8</b>), nebo třeba rámečkem (<code>border</code>).</p>

<p>Při vytvoření oddělovače kaskádovými styly může být navigace bez problémů v seznamu <code>&lt;ul></code>.</p>


<h3 id="css-znak">CSS znak</h3>

<p>S použitím znaku <code>|</code> v CSS to může vypadat následovně:</p>

<div class="live">
  <style>
    .css-menu {
      margin: 0;
      padding: 0;
    }
    .css-menu li {
      display: inline-block;
    }
    .css-menu li:before {
      content: " | ";
    }
    .css-menu li:first-child:before {
      display: none;
    }     
  </style>
  <ul class="css-menu">
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Další odkaz</a></li>
    <li><a href="#">Poslední odkaz</a></li>
  </ul>
</div>

<p>Skrytí oddělovače před prvním odkazem se zajistí selektorem <code>:first-child</code>.</p>

<p>Šlo by použít i <code>:last-child</code> pro zaměření naopak <b>posledního elementu</b>, tento selektor ale funguje až od <b>IE 9</b> (<code>:first-child</code> už od <b>IE 7</b>), takže je lepší využívat raději selektor prvního potomka.</p>

<p>Zaměřit všechny elementy kromě prvního by šlo i pomocí <a href="/css-selektory#primy-sourozenec">selektoru přímého sourozence</a> <code>li + li</code> (funkční od <b>IE 7</b>).</p>


<h3 id="ramecek">Rámeček <code>border</code></h3>

<p>Pro flexibilnější oddělovač nezávislý na písmu se hodí použít přímo CSS rámeček:</p>

<div class="live">
  <style>
    .css-ramecek-menu {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }
    .css-ramecek-menu li {
      float: left;
      border-left: 1px solid #000;
      padding: 0 .5em;
    }
    .css-ramecek-menu li:first-child {
      border: 0;
      padding-left: 0;
    }     
  </style>
  <ul class="css-ramecek-menu">
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Další odkaz</a></li>
    <li><a href="#">Poslední odkaz</a></li>
  </ul>
</div>



<h3 id="posicovany">Posicovaný oddělovač</h3>

<p>Měl-li by být svislý oddělovač například nižší, než je výška odkazu, bylo by s rámečkem položky seznamu <code>&lt;li></code> složité pořízení.</p>

<p>V takovém případě se hodí udělat oddělovač opět přes <code>:before</code>/<code>:after</code> a <a href="/position#absolute">absolutně</a> ho naposicovat, jak je potřeba:</p>


<div class="live">
  <style>
    .css-posicovany-ramecek {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }
    .css-posicovany-ramecek li {
      float: left;
      position: relative;
      padding: 0 .5em;
    }
    .css-posicovany-ramecek li:before {
      content: "";
      position: absolute;
      left: 0;
      top: .8em;
      height: .5em;              
      border-left: 1px solid #000;
    }
    .css-posicovany-ramecek li:first-child {          
      padding-left: 0;            
    }
    .css-posicovany-ramecek li:first-child:before {
      border: 0;
    }     
  </style>
  <ul class="css-posicovany-ramecek">
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Další odkaz</a></li>
    <li><a href="#">Poslední odkaz</a></li>
  </ul>
</div>




<h3 id="bez-first-child">Řešení bez <code>:first-child</code></h3>

<p>V dávných dobách, kdy se ještě ladily weby pro <b>Internet Explorer 6</b>, který selektor <code>:first-child</code> neznal, šlo skrýt první oddělovač záporným <a href="/margin"><code>margin</code>em</a> v šířce rámečku a <code>oveflow: hidden</code> – <a href="https://kod.djpw.cz/afqb">ukázka</a>.</p>

<p>Tento postup funguje dodnes, ale může být špatně srozumitelný.</p>


<h2 id="obrazkovy">Obrázkový oddělovač</h2>

<p>Oddělovač položek pomocí obrázku je potom asi nejjednodušší realisovat prostřednictvím <code>background</code>u pro položku <code>&lt;li></code>.</p>

<div class="live">
  <style>
    .obrazkove-menu {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }
    .obrazkove-menu li {
      float: left;
      padding-left: 25px;
      margin-right: 10px;
      background: url(/files/oddelovac-menu/oddelovac.png) left center no-repeat;
    }
    .obrazkove-menu li:first-child {
      background: none;
      padding-left: 0;
    }     
  </style>
  <ul class="obrazkove-menu">
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Další odkaz</a></li>
    <li><a href="#">Poslední odkaz</a></li>
  </ul>
</div>

<p>Umístění obrázku doprostřed mezi dvě položky se zajistí přesně spočítanou kombinací vlastností <code>padding</code> a <code>margin</code> v závislosti na šířce obrázku.</p>

<p><img src="/files/oddelovac-menu/obrazkovy-oddelovac.png" alt="" class="border"></p>