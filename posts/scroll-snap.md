---
title: "Přichytávací rolování v CSS"
headline: "Přichytávací rolování v CSS"
description: "CSS vlastnost <code>scroll-snap</code> dokáže řídit rolování, aby přeskakovalo mezi jednotlivými elementy."
date: "2015-07-28"
last_modification: "2016-03-08"
status: 1
tags: ["css", "css-vlastnosti", "scroll"]
format: "html"
---

<p>Jeden z celkem populárních efektů je <b>rozdělit</b> stránku na jednotlivé <i>obrazovky</i> – obsah takové stránky je typicky rozdělen do několika <code>&lt;div></code>ů, kde každý zabírá 100 % výšky. To jde od <b>Internet Exploreru 9</b> snadno zajistit jednotkou „výška viewportu“ – <code>vh</code> (<i>viewport height</i>).</p>


<p><a href="http://kod.djpw.cz/dpob">Živá ukázka</a></p>

<p>Efekt <code>scroll-snap</code> potom spočívá v <b>převzetí kontroly rolování</b>, kdy se při odrolování dolů rovnou přeskočí celá stránka.</p>

<p>Vlastnosti <code>scroll-snap*</code> dokáží tento efekt zajistit bez <a href="/js">JavaScriptu</a>.</p>




<h2 id="kdy">Kdy snap rolování použít?</h2>

<p>Změnit tak zažitou věc, jako je <b>rolování</b>, hrozí snadným <b>zmatením uživatelů</b>.</p>

<p>Rolování přeskakující obrazovky je v několika bodech <b>problematické</b>:</p>


<ol>
  <li>
    <p>Stránka roztažená přesně přes celou výšku <b>vypadá ukončeně</b>. Návštěvníka tak nemusí napadnout, že má vůbec kam rolovat pro zobrazení dalšího obsahu.</p>
    <p>To je naštěstí řešitelné šipkou u dolního okraje nebo zobrazením kusu další stránky, aby bylo jasné, že je kam pokračovat.</p>
  </li>
  
  <li>
    <p>Lidé web nečtou jako knihu. Tedy nečtou web tak, že po přečetní celé obrazovky textu přeskočí o další celou obrazovku. Místo toho průběžně rolují, aby se aktuálně čtený text udržoval v <b>úrovni očí</b>.</p>
    
    <p>Efekt přeskakování při rolování se tedy <b>nehodí pro rozsáhlejší textový obsah</b>.</p>
    
    <p>V případě souvislých bloků obsahu, což jsou například <b>fotografie</b> nebo <b>videa</b>, může být takové chování žádoucí.</p>
  </li>
  
  <li>
    <p>Řada JS efektů je tak <b>špatně udělaných</b>, že po odrolování kolečko zablokují a přehrají zdlouhavou animaci přejezdu na další stránku. Projít rychle takový web je utrpení.</p>
    
    <p>Občas se během přehrávání první rolovací animace <b>zařadí další povely kolečka do fronty</b>, což způsobí následné samovolné hýbání webu.</p>
  </li>
 </ol>


<h2 id="podpora">Podpora <code>scroll-snap</code></h2>

<p><b>IE 10</b> podporuje <i>snap</i> u dotykových zařízení. <a href="/ie11"><b>IE 11</b></a>/<a href="/microsoft-edge"><b>Edge</b></a> je podporuje všude. Vždy s <a href="/css-prefixy">prefixy</a> <code>-ms-</code>.</p>

<p><b>Firefox 39+</b> podporuje bez prefixů a <b>Safari 9.2+</b> s prefixem <code>-webkit-</code>. <b>Chrome</b>/<b>Opera</b> zatím nic.</p>

<div class="external-content">
  <ul>
    <li>Can I use: <a href="http://caniuse.com/#feat=css-snappoints">CSS Scroll snap points</a></li>
  </ul>
</div>


<h2 id="scroll-snap">Vlastnosti <code>scroll-snap-*</code></h2>

<p><a href="http://kod.djpw.cz/wqub">Živá ukázka</a></p>


<h3 id="scroll-snap-type"><code>scroll-snap-type</code></h3>

<p>Slouží pro <i>zapnutí/vypnutí</i> přichycovacího rolování.</p>

<dl>
  <dt id="none"><code>none</code></dt>
  <dd>
    <p>Roluje se normálně.</p>
  </dd>
  
  <dt id="mandatory"><code>mandatory</code></dt>
  <dd>
    <p>Hodí se pro případy, kdy má každé rolování vyvolat <i>snap</i> (přichycení) na další místo.</p>
    
    <p><a href="http://kod.djpw.cz/yqub">Živá ukázka <code>mandatory</code></a></p>
  </dd>
  
  <dt id="proximity"><code>proximity</code></dt>
  <dd>
    <p>Automatické odrolování při lehkém posunu může být pro uživatele otravné. Hodnota <code>proximity</code> se hodí pro případy, kdy má být přichytávání méně agresívní.</p>
    
    <p>Je možné rolovat i mezi jednotlivými <i>snap pointy</i>. Při přiblížení se k nim rolování přichytne.</p>
    
    <p><a href="http://kod.djpw.cz/zqub">Živá ukázka <code>proximity</code></a></p>
  </dd>
</dl>


<p>Pro nastavení odlišného chování pro vodorovné a svislé rolování existují ještě odvozené vlastnosti:</p>

<ul>
  <li id="scroll-snap-type-x"><code>scroll-snap-type-x</code> – vodorovný směr</li>
  <li id="scroll-snap-type-y"><code>scroll-snap-type-y</code> – svisle</li>
</ul>


<h3 id="scroll-snap-destination"><code>scroll-snap-destination</code></h3>

<p>Nastavuje body pro přichycení. Vlastnost má dvě hodnoty – vzdálenost zleva a shora. Je potřeba zadat obě, i když je cílem přichytávání jen v jednom směru.</p>

<p>Určuje první místo přichycení a nastavuje se pro obal jednotlivých elementů.</p>

<p>Místo přichycení jednotlivých prvků se potom nastavuje pro potomky ve vlastnosti <code>scroll-snap-coordinate</code>…</p>




<h3 id="scroll-snap-coordinate"><code>scroll-snap-coordinate</code></h3>

<p>Nastavuje se pro potomky scrollovacího elementu. Pro přeskakování po celých obrazovkách stačí nastavit <code>scroll-snap-destination</code> i <code>scroll-snap-coordinate</code> na stejnou hodnotu.</p>

<pre><code>.obal {
  …
  scroll-snap-destination: 0 0;
}
.potomek {
  scroll-snap-coordinate: 0 0;
}
</code></pre>






<p>Pro přichycení <i>mimo</i> poslouží uvedení odlišné hodnoty. Kladné hodnoty stanovují umístění od dolní hrany, záporné od horní.</p>

<p>Následující <code>potomek</code> se přichytí 5 pixelů shora.</p>

<pre><code>.obal {
  …
  scroll-snap-destination: 0 0;
}
.potomek {
  scroll-snap-coordinate: 0 -5px;
}
</code></pre>







<p>Párů hodnot jde zadat více. Potom se element přichytí během rolování na každém z nich.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://blog.teamtreehouse.com/css-scroll-snap-points">Thinking Ahead: CSS Scroll Snap Points</a></li>
  
  <li>DevDocs: <a href="http://devdocs.io/css/scroll-snap-type"><code>scroll-snap-type</code></a></li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/intuitive-scrolling-interfaces-with-css-scroll-snap-points/">Intuitive Scrolling Interfaces with CSS Scroll Snap Points</a></li>
</ul>