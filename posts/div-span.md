---
title: "HTML div a span"
headline: "HTML značky <code>&lt;div></code> a <code>&lt;span></code>"
description: "Div a span jsou neutrální HTML značky, které se používají k aplikování vzhledu pomocí CSS."
date: "2016-02-01"
last_modification: "2016-02-03"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Elementy <code>&lt;div></code> a <code>&lt;span></code> jsou hodně zvláštní tím, že na rozdíl od ostatních HTML značek prakticky nemají žádný význam a používají se téměř výhradně pro účely CSS stylování.</p>

<p>Pro účely stylování se těmto značkám přidávají <a href="/id-class">třídy nebo identifikátory</a>.</p>

<pre><code>&lt;div class="trida">
  Element stylovaný přes třídu
&lt;/div></code></pre>




<p>Druhé využití je pro obalení skupiny prvků, které potřebují mít stejný atribut (například určení jazyku atributem  <a href="/obecne-atributy#lang"><code>lang</code></a>) nebo pro manipulaci pomocí <a href="/js">JavaScriptu</a>.</p>



<h2 id="rozdil">Rozdíl mezi <code>&lt;div></code> a <code>&lt;span></code></h2>

<p>Jediný rozdíl mezi oběma značkami je v tom, že <code>&lt;div></code> je blokový (<a href="/display#block"><code>display: block</code></a>) a <code>&lt;span></code> řádkový (<code>display: inline</code>).</p>

<p>Před a za značkou <span style="display: block"><code>&lt;div></code></span> se tedy zalomí řádek. U <code>&lt;span></code>u nikoliv.</p>






<h2 id="div"><code>&lt;div></code></h2>

<p>Název značky je odvozen od anglického <i lang="en">division</i> = česky oddíl.</p>

<p>Jedná se o blokový element s povinnou počáteční i koncovou značkou. Atributy má pouze <a href="/obecne-atributy">globální</a>.</p>

<p>Protože se pomocí <code>&lt;div></code>ů s oblibou stavěl a staví celý layout stránek, autory HTML specifikací napadlo přidat nové strukturální značky jako jsou <code>&lt;header></code>, <code>&lt;article></code>, <code>&lt;section></code>, <code>&lt;footer></code> a podobně.</p>

<div class="internal-content">
  <ul>
    <li><a href="/html-kostra#semanticke-znacky">Sémantické HTML5 značky</a></li>
  </ul>
</div>


<p>Správně by se měly používat místo <code>&lt;div></code>u, kdykoliv to dává smysl. S ohledem na problémy těchto značek ve starších prohlížečích (<b>IE 8</b> je neumí stylovat bez použití JS) je k úvaze, jestli přináší tak velkou výhodu, aby mělo smysl je používat místo <code>&lt;div></code>ů.</p>

<p>Psát v CSS místo <code>.footer</code> jen <code>footer</code> a v HTML <code>&lt;div class="footer"></code> nebo <code>&lt;footer></code> není zase takový rozdíl.</p>




<h2 id="span"><code>&lt;span></code></h2>

<p><span>Řádková</span> <span>neutrální</span> <span>značka</span>, <span>která</span> <span>při</span> <span>samotném</span> <span>použití</span> <span>nic</span> <span>nedělá</span>. Například v předchozí větě je každé slovo obalené ve <code>&lt;span></code>u. Jako by nebylo.</p>

<p>Používá se mnohem méně než <code>&lt;div></code> (cca 3× méně). Asi proto, že řádkových značek pro zvýraznění obsahu existuje víc, než je potřeba.</p>






<h2 id="semantika">Sémantika</h2>

<p>Protože <code>&lt;div></code> a <code>&lt;span></code> nemají zvláštní sémantický význam, mělo by jejich použití být až poslední možnost, po které tvůrce webu sáhne.</p>


<p>Pomocí stylování není problém celý web sestavit jen z <code>&lt;div></code>ů a <code>&lt;span></code>ů a nahradit tak <a href="/nadpisy">nadpisy</a>, <a href="/odstavec">odstavce</a> nebo <a href="/seznamy">seznamy</a>.</p>

<p>Někteří začátečníci sahají k tomuto řešení, protože <code>&lt;div></code> a <code>&lt;span></code> mají minimum výchozích CSS pravidel, které tak není nutné přebíjet.</p>

<div class="internal-content">
  <ul>
    <li><a href="/css-reset">Způsoby CSS resetování</a></li>
  </ul>
</div>



<p>Není to ale úplně rozumné, protože bez používání odpovídajících HTML značek se z kódu vytratí <b>čitelnost pro nevisuální zařízení</b>, jako jsou:</p>

<ol>
  <li>roboti některých vyhledávačů,</li>
  <li>slepí uživatelé odkázaní na hlasové čtečky</li>
</ol>



<p>I některé velké JS aplikace používají <code>&lt;div></code>/<code>&lt;span></code> místo sémanticky vhodnějších značek. Tam to nemusí vadit, protože požadovaná funkce je zajištěna skriptem, aplikace nepotřebují být indexované vyhledávači a pro přístupnost slouží atributy <a href="/aria"><code>aria</code></a> a <code>role</code>:</p>


<div class="internal-content">
  <ul>
    <li><a href="/tlacitko#div">Tlačítka na webu: <code>&lt;div></code> nebo <code>&lt;span></code></a></li>
  </ul>
</div>

<p>Pro běžné weby ale bývá pohodlnější a snazší volit sémantické značky.</p>