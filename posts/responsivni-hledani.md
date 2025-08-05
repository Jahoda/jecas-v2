---
title: "Responsivní vyhledávání"
headline: "Responsivní hledací formulář"
description: "Jak vytvořit responsivní vyhledávací formulář, kde se políčko a tlačítko přizpůsobuje šířce."
date: "2015-07-02"
last_modification: "2015-11-18"
status: 1
tags: ["formulare", "hotova-reseni", "responsive"]
format: "html"
---

<p><img src="/files/responsivni-hledani/zmena-sirky.gif" alt="Změna velikosti hledání podle dostupné šířky" class="border"></p>


<p>Webové stránky často obsahují <b>políčko pro hledání</b> – obvykle ho návštěvníci čekají vpravo nahoře a jedná se o další prvek, jak usnadnit a zrychlit navigaci po celém webu.</p>

<p>Při vytváření <a href="/responsive">responsivního vzhledu</a> je nutné nějak řešit přizpůsobení hledacího formuláře dostupné šířce.</p>


<h2 id="podoba">Podoba vyhledávacích formulářů</h2>

<p>V nejjednodušší podobě sestává hledání z jednoho textového <a href="/input"><code>&lt;input></code>u</a> a odesílacího tlačítka (<a href="/button"><code>&lt;button></code></a>) s popisem <b>Hledat</b>.</p>

<figure>
  <img src="/files/responsivni-hledani/jpw.png" alt="Hledací formulář na Jak psát web" class="border">
  
  <figcaption>Hledací políčko na Jak psát web</figcaption>
</figure>




<p>Zažitý symbol pro hledání je obrázek <b>lupy</b>, proto může být vhodné ho do políčka pro hledání doplnit.</p>

<figure>
  <img src="/files/responsivni-hledani/zdrojak.png" alt="Formulář pro vyhledávání" class="border">
  
  <figcaption>Formulář pro hledání na Zdrojáku</figcaption>
</figure>



<p>Pomocí atributu <a href="/placeholder"><code>placeholder</code></a> jde do políčka pro zadání výrazu doplnit k hledání nápovědu.</p>

<figure>
  <img src="/files/responsivni-hledani/alza.png" alt="Formulář pro vyhledávání" class="border">
  
  <figcaption>Hledání na e-shopu Alza.cz</figcaption>
</figure>



<figure>
  <img src="/files/responsivni-hledani/czc.png" alt="Formulář pro vyhledávání" class="border">
  
  <figcaption>Hledání na e-shopu CZC.cz</figcaption>
</figure>


<p>Některé weby upustily od používání tlačítka s popiskem <b>Hledat</b>, které nahradily ikonou lupy.</p>

<figure>
  <img src="/files/responsivni-hledani/google.png" alt="Formulář pro vyhledávání" class="border">
  
  <figcaption>Formulář pro hledání na <a href="/google">Googlu</a></figcaption>
</figure>

<figure>
  <img src="/files/responsivni-hledani/seznam.png" alt="Formulář pro vyhledávání" class="border">
  
  <figcaption>I český <a href="/seznam">Seznam</a> nahradil tlačítko <i>Hledat</i> ikonou</figcaption>
</figure>

<figure>
  <img src="/files/responsivni-hledani/games.png" alt="Hledací formulář na Games.cz" class="border">
  
  <figcaption>Hledání na Games.cz</figcaption>
</figure>


<figure>
  <img src="/files/responsivni-hledani/programujte.png" alt="Formulář pro vyhledávání" class="border">  
  <figcaption>Vyhledávání na Programujte.com</figcaption>
</figure>


<p>Pokud hledání <b>obsahuje našeptávač</b>, nemusí být tlačítko ani příliš výrazné, protože ho člověk často ani nepoužije – uspokojí ho výsledek z automatického napovídání.</p>


<figure>
  <img src="/files/responsivni-hledani/twitter.png" alt="Formulář pro vyhledávání" class="border">  
  <figcaption>Hledání na <a href="/twitter">Twitteru</a></figcaption>
</figure>

<p>K vidění jsou i maximálně minimalistické hledací formuláře, které žádné tlačítko ani nemají. Spoléhají na potvrzení hledání klávesou <kbd>Enter</kbd>. Takové chování se ale už může setkat s nepochopením ovládání.</p>

<figure>
  <img src="/files/responsivni-hledani/stackoverflow.png" alt="Formulář pro vyhledávání" class="border">  
  <figcaption>Políčko pro hledání na StackOverflow</figcaption>
</figure>


<h2 id="mit-hledani">Mít, nebo nemít hledání?</h2>

<p>Je potřeba mít hledání na stránce vždy?</p>

<p>U <b>jednoduchých webů</b> s pár stránkami, kde se na každou jde dostat jedním kliknutím, většinou možnost hledání příliš pohodlí nezvyšuje. U komplikovanější struktury je ale <b>hledací formulář</b> užitečnou pomůckou, jak se dostat k požadovanému obsahu.</p>




<h2 id="priklad">Vytvoření responsivního hledání</h2>

<p>V případě nejstandardnějšího hledacího formuláře je cílem, aby se šířka políčka + tlačítka <b>přizpůsobovala dostupné šířce</b>.</p>

<p>Jinak řečeno: textové pole vyplní prostor, který zbude vedle tlačítka <i>Hledat</i> s pevnou šířkou.</p>

<p><img src="/files/responsivni-hledani/hledat.png" alt="Responsivní vyhledávací formulář" class="border"></p>

<p>Existuje více možností, jak toho docílit. Dobře funkční postup je použít <a href="/display#tabulkove">tabulkové hodnoty</a> vlastnosti <code>display</code> a textovému políčku nastavit 100% šířku.</p>

<p>Kvůli <code>padding</code>u a okrajům se hodí použít <a href="/box-sizing#border-box">okrajový boxmodel</a>.</p>

<div class="live" id="omezit">
  <style>
    .search {
        display: table;
    }
    .search-field,
    .search-control {
        display: table-cell;
        width: 100%;
    }
    .search-input {
        width: 100%;      
    }
    .search-input,
    .search-button {
      box-sizing: border-box;
    }
  </style>
  <div class="search">
      <div class="search-field">
          <input type="text" class="search-input">
      </div>
      <div class="search-control">
          <button class="search-button">Search</button>
      </div>    
  </div>  
</div>

<p>Změnit maximální šířku: <span class="live"><input onchange="zmenit(this.value)" oninput="zmenit(this.value)" type="range" max="100" min="20" value="80"></span></p>


<p><a href="http://kod.djpw.cz/baob">Samostatná živá ukázka</a></p>

<h2 id="rozbaleni">Rozbalení vyhledávání</h2>

<p>Kvůli úspoře místa jde u mobilů navíc uvažovat o sbalení vyhledávání do malého tlačítka, které teprve formulář odkryje.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zobrazit-skryt">Skrývání a odkrývání textu</a></li>
  </ul>
</div>

<p>Z hlediska použitelnosti je dobré, aby vyhledávací políčko po odkrytí dostalo <code>focus</code>, aby do něj <b>šlo rovnou psát</b>.</p>




<h2 id="prekryti">Překrytí stránky hledáním</h2>

<p>V případě, že je formulář pro hledání hodně velký nebo obsahuje našeptávání, potřebuje na mobilu <b>maximální možný prostor</b>. Nabízí se ho tedy zobrazit nad obsahem stránky.</p>

<p><img src="/files/responsivni-hledani/prekryti.gif" alt="Změna velikosti hledání podle dostupné šířky" class="border"></p>

<p><a href="http://kod.djpw.cz/jzob">Živá ukázka</a></p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Speckyboy.com: <a href="http://speckyboy.com/2015/07/07/how-to-increase-online-sales-with-better-search-usability/">How to Increase Online Sales with Better Search Usability</a> – jak zlepšit použitelnost vyhledávání</li>
</ul>

<style>
    .live .search {
        display: table;
        max-width: 80%;
    }
  .live .search-input,
  .live .search-button {
      padding: .5em;
      line-height: 1;
      height: 3em;
  background-image: none;
  }
 
</style>
<script>
  function zmenit(sirka) {
    document.querySelector("#omezit .search").style.maxWidth = sirka + "%";
  }
</script>


<!-- 
Původní se styly: http://kod.djpw.cz/fzob 
Pokus: http://kod.djpw.cz/ezob -->