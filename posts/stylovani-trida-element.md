---
title: "Stylovat třídy, nebo elementy?"
headline: "Stylovat třídy, nebo elementy?"
description: "Je lepší stylovat přímo HTML elementy, nebo všechny styly přiřazovat třídami?"
date: "2016-02-26"
last_modification: "2016-03-03"
status: 1
tags: ["css", "napady", "stylovani"]
format: "html"
---

<p>Při nastavování vzhledu obecných elementů čelí kodér volbě, zda použít přímo <a href="/css-selektory">selektor</a> pro název elementu, nebo elementu přidat třídu a zaměřit ho v CSS podle ní.</p>

<p>Následující příklad srovnává obě situace pro <a href="/html-tabulky">tabulku</a>:</p>

<ol>
  <li>
    <p>Stylování elementu:</p>
    
    <pre><code>table {
  /* obecné styly pro všechny tabulky */
}</code></pre>
  </li>
  
  
  <li>
    <p>Použití třídy:</p>
    
    <pre><code>&lt;table class="table"></code></pre>
    
    <p>A příslušného stylu:</p>
    <pre><code>.table {
  /* styly pro tabulku */
}</code></pre>
  </li>
</ol>





<p>Kromě tabulek se totéž týká dalších sémantických prvků stránky jako jsou <a href="/nadpisy">nadpisy <code>&lt;h1–6></code></a>, <a href="/seznamy">seznamy</a> (<code>&lt;ul></code>, <code>&lt;ol></code>, <code>&lt;dl></code>) a podobně.</p>


<h2 id="elementy">Stylování elementů</h2>

<p>Na přímém stylování elementů je hezké, že funguje na libovolný HTML kód.</p>


<p>Do HTML stačí umístit prostou značku a je zaručeno, že bude dobře vypadat. Například při kopírování HTML kódu napříč weby je automaticky zajištěno, že se vzhled přizpůsobí cílové stránce.</p>

<p>Stylování elementů podle selektoru názvu podporuje i původní myšlenku CSS, kdy jde u jednoho dokumentu přepínáním CSS souborů plnohodnotně měnit vzhled (návštěvník by si teoreticky mohl všechny weby zobrazovat v obdobném stylu).</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.csszengarden.com/">CSS Zen Garden</a> – totožné HTML kompletně přestylovatelné změnou CSS</li>
  </ul>
</div>




<h2 id="tridy">Stylování přes CSS třídy</h2>

<p>I stylování přes třídy má své výhody. Zejména <b>nedojde ke konfliktům a přebíjení hodnot</b>. Jsou-li obecné styly pro HTML elementy hodně specifické, bude při požadavku na jiný styl komplikované obecné styly přepisovat.</p>


<h3 id="nadpisy">Stylování nadpisů třídami</h3>

<p>Zajímavá myšlenka je stylovat podle tříd i <b>nadpisy</b>. Odbourá se tím risiko zneužití nesprávného nadpisu kvůli vzhledu.</p>

<p>V CSS budou například třídy:</p>

<pre><code>.nadpis-stranky {}
.nadpis-hlavni {}
.nadpis-podnadpis {}
</code></pre>




<p>A při použití už bude jedno, jestli se aplikují na <code>&lt;h1></code>, <code>&lt;h2></code> nebo <code>&lt;h3></code>. Stylování přímo značek <code>&lt;h1–6></code> může lákat ke zneužití pro dané místo nesprávné značky, protože je potřeba, aby nadpis jinak vypadal.</p>

<p>Stylování pomocí CSS tříd ale klade vyšší nároky na postprocessing HTML kódu. Přidávat všem elementům třídy ručně by nebylo moc pohodlné.</p>

<p>Tuto schopnost by tedy měl mít editor, ve kterém je obsah tvořen.</p>




<h2 id="kompromisy">Další řešení</h2>

<p>Specifika obou přístupů je možné kombinovat.</p>



<h3 id="zakladni">Základní obecné styly</h3>

<p>Na selektory obecných elementů se aplikují jen základní pravidla, která nebude tolik komplikované přepisovat. Řada elementů typicky stejně přebírá výchozí vzhled z CSS prohlížečů.</p>

<div class="internal-content">
  <ul>
    <li><a href="/css-reset#vychozi">Příklad výchozích hodnot v CSS ve všech prohlížečích</a></li>
  </ul>
</div>


<p>Změnou těchto vlastností se následné stylování nezkomplikuje (stejně by se musely přebíjet výchozí styly).</p>



<h3 id="obal">Styly jen pro <code>.obsah</code></h3>

<p>Specifické styly aplikované přímo na HTML elementy se mohou aplikovat jen uvnitř nějakého obalu – například obsahové části.</p>

<pre><code>.obsah h1 {}
.obsah h2 {}
.obsah table {}</code></pre>



<p>Má to ale dva problémy:</p>

<ol>
  <li>
    <p>I v obalu se může nacházet box, který bude muset obecný styl složitě přebíjet/resetovat.</p>
  </li>
  <li>
    <p>Selektory budou zbytečně silnější, čímž se komplikuje budoucí stylování.</p>
    
    <p>Pro přestylování nadpisu <code>&lt;h1 class="nadpis-stranky"></code> už nebude stačit:</p>
    
    <pre><code>.nadpis-stranky {}</code></pre>
    
    <p>Ale bude se selektor muset posílit.</p>
  </li>  
</ol>



<h3 id="bez-tridy">Stylování elementů bez třídy</h3>

<p>Stačí-li podpora od <b>IE 9</b>, existuje elegantní řešení se <a href="/css-selektory#negace">selektorem negace</a>.</p>

<p>Následující styly se aplikují jen na tabulky, které nemají nastavenou třídu.</p>

<pre><code>table:not([class]) {
  /* obecné styly */
}</code></pre>



<p>Pro případ <code>&lt;table class=""></code> se může přidat ještě:</p>

<pre><code>table:not([class]),
table[class=""] {
  /* obecné styly */
}</code></pre>







<p>Jakmile se takový element použije s třídou, výchozí pravidla se na něj neaplikují. Při použití bez třídy bude ale automaticky stylovaný.</p>





<h2 id="vlastni-elementy">Vlastní elementy</h2>

<p>Specifický případ nastává u webových aplikací, kde nemusí být tak nutné používat zavedené <a href="/vsechny-html-znacky">HTML značky</a>, ale jde si vytvořit vlastní elementy (třeba značky <code>&lt;je-cas></code> a <code>&lt;tak-jde-cas></code>), které nejsou žádným výchozím vzhledem zatíženy.</p>

<pre><code>je-cas,
tak-jde-cas {
  /* styly vlastních elementů */
}</code></pre>




<p>Funkčnost vlastním elementům zajistí <a href="/js">JavaScript</a>, který je stejně pro fungování <a href="/bez-javascriptu">nezbytný</a>. Sémantický význam jde potom zajistit atributy <code>role</code> (například <code>role="button"</code> pro <a href="/tlacitko">tlačítko</a>). A stylování není od <b>IE 9</b> problém.</p>

<p><b>Honza Bittner</b> doplnil, že názvy vlastních elementů by měly podle specifikace obsahovat spojovník. Na funkci to sice nemá vliv, ale přidání spojovníku do názvu je způsob, jak předejít možným kolisím, kdy by se název vlastního elementu shodoval s existující HTML značkou.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="https://css-tricks.com/should-you-have-defaults-styles-for-table/">Should you have defaults styles for `table`?</a></li>
  
  <li>CSS Wizardry: <a href="http://csswizardry.com/2016/02/managing-typography-on-large-apps/">Managing Typography on Large Apps</a></li>
</ul>