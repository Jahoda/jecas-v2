---
title: "Fixní menu při scrollování"
headline: "Fixní menu při rolování"
description: "Jak při odrolování stránky zafixovat menu na horní hraně obrazovky."
date: "2013-11-02"
last_modification: "2013-11-03"
status: 1
tags: ["css", "fixed", "hotova-reseni", "js", "menu"]
format: "html"
---

<p>Obdobnou technikou jako u <a href="/sidebar">fixního postranního panelu</a> lze zajistit i u <a href="/vodorovne-menu">vodorovného menu</a>, aby se při odrolování o více než je jeho umístění odshora <b>přilepilo k horní straně okna</b> a tam zůstalo.</p>

<div class="live" style="margin-left: 0">
  <style>
    .menu3 {list-style: none; padding: 0; margin: 0; text-align: center}
    .menu3 li {display: inline}
    .menu3 a {text-decoration: none; border-bottom: 0; background: #fff; padding: 5px; display: inline-block; width: 100px; line-height: 40px}
    .fixni-menu {position: fixed; left: 0; top: 0; width: 100%; background: #8ECCF0; text-align: center; z-index: 1}    
  </style>
  <div id="fixni-menu">
    <menu class="menu3">
      <li><a href="#">Odkaz</a></li>
      <li><a href="#">Odkaz</a></li>
      <li><a href="#">Odkaz</a></li>
      <li><a href="#">Odkaz</a></li>
      <li><a href="#">Odkaz</a></li>
    </menu>
  </div>
  <script>
    var menu = document.getElementById('fixni-menu');
    window.onscroll = function () {
      menu.className = (
        document.documentElement.scrollTop + document.body.scrollTop > menu.parentNode.offsetTop
        && document.documentElement.clientHeight > menu.offsetHeight
      ) ? "fixni-menu" : "";
    }
  </script>
</div>

<p><b>Zafixování</b> se provede až přes CSS třídu, kterou nastaví JavaScript v momentě, kdy je vzdálenost navigace shora menší než hodnota, o kterou <b>je už odrolováno</b>.</p>
<p>Díky nastavování třídy místo <code>element.style.position = "fixed"</code> je pohodlnější upravování dalších stylů — při <b>zafixování</b> může být vhodné například menu zjednodušit nebo zmenšit.</p>

<h2 id="centrovani">Vycentrování menu</h2>
<p>Trochu nešikovné je, že se <a href="/position#fixed">fixní posice</a> musí dopočítat od okrajů celého okna (ne od nadřazeného elementu s <code>position: relative</code> jako u absolutního posicování).</p>
<ol>
  <li>První možnost je <a href="/centrovani">centrovat</a> nastavením <code>left: 50%</code>, přesné šířky a <b>záporného <code>margin</code>u</b> o polovině šířky.</li>
  <li>Kromě toho je možné vytvořit <b>fixní element</b> se 100% šířkou, naposicovat ho do levého horního rohu (<code>left: 0; top: 0</code>) a až v rámci <b>tohoto <i>obalu</i></b> centrovat navigaci. Potom není problém použít centrování přes <code>margin: auto</code> nebo <code>text-align: center</code> pro <code>inline</code>/<code>inline-block</code> elementy.</li>
</ol>

<h2 id="rovnou-fixni">Fixní menu</h2>
<p>Pokud navigace bude <b>úplně nahoře</b> (nebo tam, kde může být i při rolování – třeba <b>vedle obsahu</b>) už při načtení stránky, stačí samotné <code>position: fixed</code> bez JavaScriptové <i>šaškárny</i>.</p>

<h2>A ještě…</h2>
<p style="padding-top: 25em">… trochu vycpávky, aby se zafixování mohlo projevit.</p>

<h2 id="odkazy">Další hotová řešení</h2>
<ul>
  <li><a href="http://lirancohen.github.io/stickUp/">StickUp</a> (kromě fixování i <a href="/zvyrazneni-odrolovani">zvýrazňuje aktivní položku</a>)</li>
  <li><a href="http://wicky.nillia.ms/headroom.js/playroom/">Headroom.js </a></li>
</ul>