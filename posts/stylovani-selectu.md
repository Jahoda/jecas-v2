---
title: "Stylování <select>u"
headline: "Stylování <code>&lt;select&gt;</code>u"
description: "Roletový seznam nabízí omezené možnosti v úpravách vzhledu. Které to jsou a jak je rozšířit?"
date: "2013-08-16"
last_modification: "2016-07-03"
status: 1
tags: ["css", "napady", "stylovani"]
format: "html"
---

<h2 id=padding>Odsazení <code>padding</code></h2>
<p>Funguje od Exploreru 8 na značce <code>&lt;select&gt;</code>, na <code>&lt;option&gt;</code>u umí <code>padding</code> jen Firefox. </p>
<div class="live">
<style>
  .padding {padding: 1em}
</style>
    <select class=padding>
      <option>HTML
      <option>CSS
      <option>JavaScript
    </select>
</div>





<h2 id="barvy">Barvy</h2>
<p>Obarvení <code>&lt;select&gt;</code>u je možné ve všech prohlížečích. Je možné barvit i konkrétní <code>&lt;option&gt;</code> položky. Pokud se tak neučiní, převezmou položky barvu <code>&lt;select&gt;</code>u.</p>

<div class="live">
  <select style="background: #000; color: #fff">
    <option value="">-- vybrat --</option>
    <option style="background: #E44D27">HTML
      <option style="background: #0D6AB7">CSS
      <option style="background: #FEDA3F; color: #000">JavaScript
    </select>
</div>

<p>Jak je vidět z ukázky, nastavení pozadí (<code>background</code>) způsobí <a href="/vzhled-formularu#select">přepnutí na <i>oldschool</i> vzhled</a>, téhož je možné <i>docílit</i> vlastností <code>border</code>.</p>

<h2 id="border">Rámeček <code>border</code></h2>
<p>S rámečky není problém. Firefox je umí i pro jednotlivé položky.</p>

<p>V prohlížečích, které podporují kulaté rohy přes <a href="/border-radius"><code>border-radius</code></a>, není problém ani zakulacení.</p>

<div class="live">
  <select style="background: #000; color: #fff; border: 5px solid #fff; border-radius: 5px">
    <option value="">-- vybrat --</option>
    <option style="background: #E44D27">HTML
      <option style="background: #0D6AB7">CSS
      <option style="background: #FEDA3F; color: #000">JavaScript
    </select>
</div>

<h2 id="width-height">Šířka a výška</h2>
<ul><li>Přenastavení rozměrů je taktéž široce podporováno.
<li>Problém je s výškou, kdy různé prohlížeče text různě zarovnávají (není možné použít <code>line-height</code>). 
<li>Zarovnat text u širokého <code>&lt;select&gt;</code>u pomocí <code>text-align: center</code> funguje jen v <b>Opeře 12</b>.
<li>Firefox jako jediný umí nastavit výšku i pro položky výběru.
  </ul>

<div class="live">
  <select style="background: #000; color: #fff; border: 5px solid #fff; border-radius: 5px; width: 300px; height: 100px; text-align: center">
    <option value="">-- vybrat --</option>
    <option style="background: #E44D27">HTML
      <option style="background: #0D6AB7">CSS
      <option style="background: #FEDA3F; color: #000">JavaScript
    </select>
</div>

<h2 id="font">Písmo</h2>
<p>Ohledně písma lze nastavit prakticky vše — <b>tučné písmo</b>, <i>kursivu</i> apod., velikost, barvu (jak je zmíněno výše), atd.</p>
<p>Opět to je možné <b>kromě Firefoxu jen pro celý výběr</b>, tj. pro <code>&lt;select&gt;</code>.</p>

<div class="live">
  <select style="background: #000; color: #fff; border: 5px solid #fff; border-radius: 5px; font-weight: bold; text-transform: lowercase; font-size: 200%; font-style: italic">
    <option value="">-- vybrat --</option>
    <option style="background: #E44D27">HTML
      <option style="background: #0D6AB7;">CSS
      <option style="background: #FEDA3F; color: #000">JavaScript
    </select>
</div>

<h2 id="hover">Zvýraznění položky</h2>
<p>Při najetí na <code>&lt;select&gt;</code> lze klasicky aplikovat <code>:hover</code>. Otevřený <code>&lt;select&gt;</code> získává <code>:focus</code>.</p>

<ul>
  <li>V Explorerech do verse 9 včetně nefunguje <code>:hover</code>, do verse 8 včetně ani <code>:focus</code>.</li>
  <li>Nastavit vlastní styl pro <code>:hover</code> jednotlivých položek se zdá být nemožné.</li>
</ul>

<div class="live">
  <style>
    .hover {background: #000; color: #fff; border: 5px solid #fff; border-radius: 5px; font-weight: bold; text-transform: lowercase; font-size: 200%; font-style: italic}
    .hover:hover {background: red!important; width: 300px}
    .hover:focus {border-color: red}
  </style>
  <select class="hover" style="">
    <option value="">-- vybrat --</option>
    <option style="background: #E44D27">HTML
      <option style="background: #0D6AB7;">CSS
      <option style="background: #FEDA3F; color: #000">JavaScript
    </select>
</div>


<h2 id="sipka">Vlastní styl šipky</h2>

<p>Standardním způsobem není možné změnit styl šipky znázorňující rozevření seznamu (například jí změnit barvu).</p>

<p>Existují ale způsoby, jak to obejít:</p>


<h3 id="appearance"><code>appearance: none</code></h3>

<p>CSS vlastnost <code>appearance</code> nastavená na hodnotu <code>none</code> dokáže <i>vypnout</i> výchozí styl formulářového políčka. Tím se mimo jiné docílí, že se nezobrazí šipka pro rozevření.</p>

<p>Vlastní šipku jde potom snadno absolutně naposicovat na požadované místo. Šipka jde vytvořit i přímo v CSS:</p>

<div class="internal-content">
  <ul>
    <li><a href="/css-sipky">Generátor CSS šipek</a></li>
  </ul>
</div>


<p>Aby na místě posicované šipky šlo <code>&lt;select></code> prokliknout, je třeba přidat <code>pointer-events: none</code>.</p>


<div class="live">
  <style>
  .select-cover {
      width: 200px;
      overflow: hidden;
      position: relative;
  }

  .select-cover select,
  .select-cover option {
      width: 200px;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      padding: 0 .4em;
      line-height: 1.5em;
      font-size: 100%;
      border: 0;
  }

  .select-cover:before {
      content: "";
      pointer-events: none;
      border: 6px solid transparent; 
      width: 0px; 
      height: 0px; 
      display: inline-block;
      position: absolute; 
      border-top: 8px solid #da3f94; 
      top: 50%;
      margin-top: -4px;
      right: .5em;
  }
  </style>
  <div class="select-cover">
    <select>
        <option value="">První</option>
        <option value="">Druhá</option>
        <option value="">Třetí</option>
    </select>
  </div>  
</div>

<p><a href="http://kod.djpw.cz/tnzb">Samostatná ukázka</a></p>



<h2 id="zaver">Závěr</h2>
<p>Jak je vidět, stylování je <b>docela omezené</b>. Pro plnou kontrolu je třeba <a href="/vzhled-formularu#js">použít atrapu</a> a <code>&lt;select&gt;</code> ovládat JavaScriptem. Problém je, že vytvořit funkčnost shodnou s obyčejným formulářem je docela komplikované. A hotová řešení často věci jako ovládání klávesnicí apod. neumožňují.</p>

<p>Problémům se stylováním se jde často úplně vyhnout, protože selectbox není úplně ideální formulářový prvek a často jde nahradit uživatelsky příjemnějším ovládacím prvkem:</p>

<div class="internal-content">
  <ul>
    <li><a href="/select-pouzitelnost">Proč nepoužívat <code>&lt;select></code></a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>jQuery UI: <a href="https://jqueryui.com/selectmenu/">Selectmenu</a></li>
  <li><a href="https://github.com/filamentgroup/select-css">Cross-browser styles for consistent select element styling</a> (<a href="http://filamentgroup.github.io/select-css/demo/">demo</a>)</li>
</ul>