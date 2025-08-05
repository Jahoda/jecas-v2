---
title: "Psaní testů ve Vue.js"
headline: "Psaní testů ve Vue.js"
description: "Jak začít psát testy funkcí a komponent ve Vue.js."
date: "2020-03-25"
last_modification: "2020-03-25"
status: 0
tags: []
format: "html"
---

<p>Pro pohodlnější vývoj je dobré <b>psát automatické testy</b>. Do kódu, který je dobře pokrytý testy, není takový problém zasahovat, protože se snižuje obava z toho, <i>kde se co může rozbít</i>.</p>

<p>Pokud by nějaká úprava měla rozbít jinou část, <i>spadnou</i> v ní testy. Bez testů se o tom nemusí být jak dozvědět.</p>

<p>Kromě úprav ve vlastním kódu je i snazší upgrade kódu cizího. To se hodí například v situaci, kdy vyjde bezpečnostní update cizí knihovny, protože není nutné zdlouhavě <i>proklikávat</i> web.</p>

<p>Psaní testů vyžaduje i trochu odlišný přístup k psaní kódu, aby se dobře testoval. Většinou to vede k lepšímu kódu.</p>








<h2 id="nevyhody">Proč nepsat testy</h2>

<p>Psaní testů vždy a ke všemu není universální dobrá rada. Jsou i důvody, proč <b>testy nepsat</b>:</p>

<ol>
  <li>
    <p><b>Pomalejší vývoj</b> – pro člověka/tým, který není testy zvyklý psát, bude ze začátku vývoj trvat déle.</p>
    
    <p>Napsat zpočátku věc bez testů bude pravděpodobně rychlejší než s testy.</p>
    
    <p>Stejně tak zabere nějaký čas nastavit celý proces, jak testy v projektu psát, jak je spouštět lokálně, jak pouštět v CI.</p>
  </li>
  
  
  
  
  
  <li>
    <p><b>Pomalejší build</b> – je dobré testy pouštět při sestavování aplikace v CI. Samotné spuštění testů logicky zabere nějaký čas.</p>
    
    <p>Je tak nutné dbát na to, aby běh testů netrval neúnosnou dobu.</p>
  </li>
  
  <li>
    <p><b>Prototypování</b> – při vytváření prototypu, kdy člověk pořádně neví, jaké řešení zvolí, bude souběžné psaní testů nejspíš kontraproduktivní.</p>
  </li>
</ol>


<h2 id="kdy">Kdy psát testy</h2>

<p>Existují různé přístupy k tomu v jakých částí vývoje testy psát.</p>

<ol>
  <li>
    <p><b>Nejdřív kód, potom testy</b> – nejprve se napíše samotný kód, který se následně pokrývá testy. Vypadá to jako nejrychlejší způsob, jak vytvořit co nejdříve něco <i>funkčního</i>.</p>
    
    <p>Nevýhoda je v tom, že dopsání smysluplných testů může vyžadovat přepis původního kódu.</p>
    
    <p>Další nevýhodou je risiko, že na fakt, že je v kódu něco fatálně špatně a bude potřeba to přepsat, přijde jeho autor dost pozdě.</p>
    
    <p>Ale ještě větší nevýhoda je <b>odložení na později</b>. Později potom nenastane.</p>
  </li>
  
  <li>
    <p><b>Průběžné psaní testů</b> – během vytváření celku se průběžně píší testy jednotlivých součástí, které autor považuje za relativně hotové.</p>
    
    <p>Díky tomu se i usnadňuje průběžné refaktorování kódu během vývoje.</p>
  </li>
  
  <li>
    <p><b>Nejdřív testy</b> – technika označovaná jako TDD (<i>test driven development</i>). Česky programování řízené testy.</p>
    
    <p>Spočívá v tom, že se nejprve napíší testy, které neprochází. Až potom se programuje samotná funkcionalita, než všechny testy projdou.</p>
    
    <p>Jsou-li testy napsány dobře, jde po jejich splnění bezpečně vylepšovat/refaktorovat kód s automatickou kontrolou, že se nic nerozbilo.</p>
    
    <p>Tento přístup vyžaduje značné zkušenosti, protože je dopředu třeba dobře vědět, co a jak má výsledek dělat. Komplikují ho časté změny zadání v průběhu.</p>
    
    <p>Psaní oproti testům je hodně pohodlné a rychlé, protože je rychlé zjistit, jestli se kód v požadovaných případech chová správně.</p>
  </li>
</ol>

<h2 id="vue-test-utils">Nástroj <code>vue-test-utils</code></h2>






<h2 id="kam">Kam umístit soubory s testy</h2>

<p>Soubory s testy se většinou jmenují ve stylu <code>*.spec.js</code>.</p>

<p>Pokud existuje komponenta <code>MojeKomponenta.vue</code>, její test se může jmenovat <code>MojeKomponenta.spec.js</code>.</p>

<p>Ohledně umístění testů je asi nejčastější samostatná složka typu <code>tests/unit/components</code>. Všechny testy všech komponent jsou tak v podadresářích složky <code>tests</code>.</p>

<p>Druhá možnost je umístit soubor s testem hned <b>vedle příslušné komponenty</b>. Osobně ho preferuji, protože mi přijde přehlednější, než ve složce <code>tests</code> duplikovat adresářovou strukturu celého projektu.</p>

<p>Samostatná složka může být teoreticky rychlejší pro vyhledání všech souborů s testy (nemusí se procházet celý projekt). V praxi jsem ale nějaké dramatické zpomalení nezaznamenal.</p>









<h2 id="jest">Jest</h2>

<h3 id="mockovani">Mockování nativních funkcí</h3>

<p>Testy se nepouštějí v plnohodnotném prohlížeči, takže některé konstrukce – například <a href="/kopirovat">zkopírování do schránky</a> přes <code>document.execCommand('copy')</code> nebude fungovat.</p>

<p>Řešení je namockovat prázdnout funkci:</p>

<pre><code>document.execCommand = est.fn(x => x)</code></pre>

<div class="external-content">
  <ul>
    <li>
      <a href="https://fernandobasso.dev/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html">Unit Testing Vue/Vuetify With Jest and Vue-Test-Utils</a>
    </li>
    <li>
      <a href="https://medium.com/swlh/tips-on-unit-testing-vue-components-with-jest-e68ff6a28bb5">Tips for Unit Testing Vue Components with Jest</a>
    </li>
  </ul>
</div>


<h2 id="sloty">Testování slotů</h2>

<p>Sloty jsou ve Vue.js hezká možnost, jak předávat HTML kód / šablonu do komponenty.</p>

<p>Sloty jde jednoduše nadefinovat při volání komponenty v metodě <code>mount</code>/<code>shallowMount</code>:</p>

<pre><code>wrapper = shallowMount(MojeKomponenta, {
  slots: {
    default: '&lt;div class="trida">Text&lt;/div>'
  }
});</code></pre>









<p>Podrobnější článek o testování slotů:</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://alexjover.com/blog/test-vue-js-slots-in-jest/">Test Vue.js Slots in Jest</a>
    </li>
  </ul>
</div>





<h2 id="store">Testování Vuex store</h2>

<p>Pokud aplikace používá ukládání dat do Vuex store, je třeba to zohlednit u psaní testů.</p>

<p>Usnadnit testování může balíček <a href="https://github.com/posva/vuex-mock-store"><code>vuex-mock-store</code></a>.</p>

<p><a href="https://vue-test-utils.vuejs.org/guides/using-with-vuex.html">Using with Vuex</a> – dokumentace k Vue Test Utils (<a href="https://github.com/eddyerburgh/testing-vuex-store-example">příklad</a>)</p>