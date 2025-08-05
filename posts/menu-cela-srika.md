---
title: "Menu přes celou šířku"
headline: "Menu přes celou šířku"
description: "Jak vytvořit vodorovné menu s neznámým počtem položek přes celou šířku."
date: "2014-07-31"
last_modification: "2014-08-28"
status: 1
tags: ["css", "hotova-reseni", "menu"]
format: "html"
---

<p>Úkol je jasný. Vytvořit navigaci, která může mít <b>proměnlivý počet položek</b>. Cílem je, aby se položky přesně roztáhly ve vymezeném prostoru.</p>



<h2 id="deleni-sirky">Dělení šířky</h2>

<p>První asi každého napadne vzít šířku navigace, vydělit ji počtem položek. Od takto vzniklé šířky v případě <a href="/box-model#content-box">obsahového box modelu</a> odečteme <code>padding</code> s <code>border</code>em a je to.</p>

<p>(Dostat položky <b>vedle sebe</b> s možností zadat šířku jde řešit <a href="/float">obtékáním</a> nebo přes <code><a href="/display#inline-block">display: inline-block</a></code>).</p>

<div class="live">
  <style>
    .menu-deleni {
      width: 300px;
      background: #ededed;
      overflow: hidden;
    }
    .menu-deleni a {
      float: left;
      width: 100px;
      text-align: center;
    }
  </style>
  <div class="menu-deleni">
    <a href="">Odkaz</a>
    <a href="">Další odkaz</a>
    <a href="">Odkaz</a>
  </div>
</div>

<p>Problém je, že při změně počtu položek budeme muset všechny hodnoty <b>přepočítávat</b>. Podpora počítání přímo v CSS pomocí vlastnosti <a href="/calc"><code>calc</code></a> je až od <b>IE 9</b>.</p>



<h2 id="ladeni-paddingu">Různá šířka a ladění paddingu</h2>

<p>V případě položek s <b>různou šířkou</b> je často k vidění vytváření menu laděním <code>padding</code>u od oka tak, <i>aby to jakž takž hezky vyšlo</i>.</p>

<div class="live">
  <style>
    .menu-ladeni {
      width: 300px;
      background: #ededed;
      text-align: center;
    }
    .menu-ladeni a {
      display: inline-block;
      padding: 0 1.2em;
    }
  </style>
  <div class="menu-ladeni">
    <a href="">Odkaz</a>
    <a href="">Další odkaz</a>
    <a href="">Odkaz</a>
  </div>
</div>

<p>Docílit perfektního vzhledu funkčního napříč prohlížeči i s různými velikostmi písma je takřka nemožné.</p>



<h2 id="tabulka">Použít tabulku</h2>

<p>Mnohem funkčnější a elegantnější se zdá použití <b>tabulky</b>. Nemusí se nutně jednat o skutečnou <b>HTML tabulku</b>, ale od <b>IE 8</b> fungují CSS atrapy (<a href="/display#tabulkove">tabulkové hodnoty</a> vlastnosti <code>display</code>).</p>

<div class="live" id="css-tabulka">
  <style>
    .menu-tabulka {
      width: 300px;
      background: #ededed;
      text-align: center;
      display: table;
    }
    .menu-tabulka a {
      display: table-cell;
    }
    .menu-tabulka.pevna-sirka {
      table-layout: fixed;
    }
    .menu-tabulka.vetsi-sirka {
      width: 400px;
    }
  </style>
  <div class="menu-tabulka">
    <a href="">Odkaz</a>
    <a href="">Další odkaz</a>
    <a href="">Odkaz</a>
  </div>
</div>

<script>
  var t = document.getElementById("css-tabulka").getElementsByTagName("div")[0];
</script>

<p>Není problém <button onclick="toggle(t, 'pevna-sirka')">nastavit odkazům pevnou šířku</button> (to jde nastavením <code>width</code> / využitím <code>table-layout: fixed</code>) nebo <button onclick="toggle(t, 'vetsi-sirka')">změnit šířku tabulky</button>, aniž by se něco rozbilo. Tedy jde i vcelku pohodlně měnit počet odkazů a délku jejich textů.</p>



<h2 id="flexbox">Flexboxy</h2>

<p>Docílit efektu, který nabízí <i>CSS tabulka</i> by šlo i <a href="/flexbox">flexboxy</a>, ale jejich podpora je až od <b>IE 10</b>.</p>