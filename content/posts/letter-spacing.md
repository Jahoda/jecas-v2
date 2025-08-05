---
title: "Letter-spacing"
headline: "Letter-spacing"
description: "CSS vlastnost <code>letter-spacing</code> upravuje vzdálenost mezi písmeny."
date: "2015-08-27"
last_modification: "2015-09-21"
status: 1
tags: ["css", "css-vlastnosti", "pisma"]
format: "html"
---

<div class="live">
  <style>
    .velke-mezery {
      letter-spacing: 1em;
    }
  </style>
  <p class="velke-mezery">Písmena mají velké mezery.</p>
</div>

<h2 id="zapis">Zápis</h2>

<pre><code>element {
  letter-spacing: 1em;
}</code></pre>

<p>Výchozí hodnota je <code>0</code>/<code>normal</code>. Vyšší hodnotou se rozestupy mezi písmeny zvětší. Záporné hodnoty naopak písmena více přiblíží k sobě:</p>

<div class="live">
  <style>
    .male-mezery {
      letter-spacing: -1px;
    }
  </style>
  <p class="male-mezery">Písmena jsou nalepená na sebe.</p>
</div>

<p>Při nastavení moc velké záporné hodnoty se dějí divné věci:</p>

<div class="live">
  <p>−20 px<input type="range" value="0" max="10" min="-20" oninput="document.getElementById('test-mezer').style.letterSpacing = this.value + 'px'; mezera.innerHTML = this.value">10 px</p>
  <p style="text-align: center;" id="test-mezer">Velikost mezer mezi písmeny</p>
  
  <pre><code>element {
  letter-spacing: <span id="mezera">0</span>px;
}</code></pre>
</div>









<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Široce podporovaná vlastnost ve všech běžně používaných prohlížečích. Chování při velké záporné hodnotě se může lišit.</p>



<h2 id="vyuziti">Využití</h2>

<p>Zvětšení mezer mezi písmeny jde použít pro <b>zvýraznění/odlišení</b> textu. V dávné minulosti se to občas používalo na <b>psacím stroji</b> prokládáním textu běžnou mezerou.</p>



<h3 id="zvyrazneni">Zvýraznění v textu</h3>

<p>Většinou si sice jde vystačit se zvýrazněním <b>tučným</b> nebo <i>šikmým</i>, ale právě využití <span class="live" style="letter-spacing: .2em; padding: 0 .5em">proložení písmen</span> může být další možnost.</p>

<p>V takovém případě je vhodné proložení písmen doplnit i odsazením zleva a zprava pomocí <code>padding</code>u, aby byly zřetelné <b>hranice slov</b>.</p>


<h3 id="nadpisy">Ozvláštnění nadpisů</h3>

<p>Změnou mezer mezi písmeny jde vytvořit visuálně zajímavější nadpis i s běžným fontem.</p>

<div class="live">
  <style>
    .jako-nadpis {
      font-size: 30px;
      letter-spacing: -3px;
      word-spacing: 3px;
    }
  </style>
  <p class="jako-nadpis">
    Nadpis s menšími mezerami
  </p>
</div>



<h3 id="zalozni-font">Záložní písmo</h3>

<p>Při používání webových fontů trvá nějakou dobu jejich načtení. Do té doby, než se načtou, lze jejich vzhled prostorově připodobnit změnou odstupů.</p>


<h3 id="rucni">Ruční proložení mezerami</h3>

<p>Odstupy mezi písmenky jde realisovat i klasickou mezerou:</p>

<div class="live">
  <p>P r o l o ž e n í   t e x t u   m e z e r a m i</p>
</div>


<p><b>Není to ale dobré řešení</b>, protože automatické programy (hlasové čtečky, vyhledávání) <b>nemusí poznat hranice slov</b>.</p>

<p>Dále je to pracné a nakonec by bylo i komplikovanější zajistit mezery mezi slovy – více mezer se v HTML spojí v jednu, takže by se musela požívat <b>pevná mezera</b> (<a href="/entity">entita</a> <code>&amp;nbsp;</code>) a podobně.</p>


<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/css/letter-spacing.html">Letter-spacing</a></li>
</ul>