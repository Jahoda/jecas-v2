---
title: "Základy JavaScriptu"
headline: "Základy JavaScriptu"
description: "Jak a proč používat JavaScript na HTML stránkách."
date: "2016-02-04"
last_modification: "2016-02-04"
status: 0
tags: []
format: "html"
---

<p>JavaScript (zkratka JS) je programovací jazyk používaný k rozšíření funkčnosti webů. Běží v prohlížeči návštěvníka. Zjednodušeně řečeno slouží k modifikaci HTML a CSS, která proběhne po vyvolání uživatelské akce.</p>

<div class="live">
  <p><button onclick="this.parentNode.appendChild(document.createTextNode(' Text vypsaný JavaScriptem. '))">Klikněte zde</button></p>
</div>


<p>V JS jde psát i aplikace běžící na serveru, tím se ale tento přehled nezaobírá.</p>




<h2 id="pripojeni">Připojení JS</h2>

<p>Aby se mohlo začít skriptovat, musí se JS nějakým způsobem dostat do HTML stránky.</p>

<p>Způsoby připojení JavaScriptu jsou velmi podobné <a href="/css-zaklady#pripojeni">připojování CSS</a>:</p>



<h3 id="script">Značka <code>&lt;script></code></h3>

<p>Pro umístění JS kódu přímo do HTML stránky existuje element <code>&lt;script></code>:</p>

<pre><code>&lt;p>
  Obsah stránky.
&lt;/p>
<b>&lt;script></b>
  alert("Hláška z JS");
&lt;/script></code></pre>







<p>Uvedený kód se spustí v momentě, kdy na něj prohlížeč při načítání narazí. V případě, že JS manipuluje s HTML prvky na stránce, je pořadí vložení JS kódu naprosto klíčové.</p>




<h4 id="type">Atribut type</h4>

<p>Často je možné se setkat se zápisem:</p>

<pre><code>&lt;script <b>type</b>="text/javascript"></code></pre>


<p>Tento atribut je zbytečné uvádět, protože <code>text/javascript</code> je výchozí typ.</p>

<p>Při vymyšlení si vlastní hodnoty atributu <code>type</code> se bude obsah uvnitř ignorovat. Někdy se toho využívá pro HTML šablony v JavaScriptu, protože obsah <code>&lt;script></code>u s neexistujícím <code>type</code> je skriptem přístupný.</p>




<h4 id="language">Atribut <code>language</code></h4>

<p>V hodně starých stránkách může být <code>&lt;script></code> uveden s atributem <code>language</code>.</p>

<pre><code>&lt;script <b>language</b>="js"></code></pre>

<p>Pochází to z doby, kdy nebylo jasné, jaký jazyk se pro skriptování bude používat. Jelikož převládl JavaScript, není tento atribut k ničemu potřebný.</p>





<h3 id="externi">Připojení externího <code>*.js</code></h3>

<p>Větší nebo na více stránkách používané skripty se obvykle vyčleňují do zvláštního souboru s příponou <code>*.js</code>.</p>

<p>Pro připojení externího JS se používá rovněž značka <code>&lt;script></code>, tentokrát ale s atributem <code>src</code> pro uvedení cesty k souboru.</p>

<pre><code>&lt;script <b>src</b>="skript.js">&lt;/script></code></pre>


<p>Při uvedení adresy skriptu už <b>není možné</b> umístit další JS kód dovnitř značky <code>&lt;script></code>. Následující kód je <b>chybný</b>:</p>

<pre><code>&lt;script src="skript.js">
  alert("Tady nic být nemůže");
&lt;/script></code></pre>




<h3 id="html-atribut">HTML atribut</h3>

<p>Vzhledem k tomu, že se JS používá hodně často k obsluze různých událostí (například kliknutí na tlačítko), jde kód zapsat do HTML atributu příslušné události.</p>

<pre><code>&lt;button <b>onclick</b>="<i>alert('Hláška v JS')</i>">
  Tlačítko
&lt;/button></code></pre>






<p>Psaní JS do HTML atributu není moc pohodlné. Jednak kvůli nedostatku <a href="/uvozovky">uvozovek</a> (hned se vyplácají na obalení hodnoty atributu), potom kvůli nižší přehlednosti (většina editorů neumí u JS v atributu zvýrazňovat syntaxi) a nakonec je v takovém případě JS kód roztroušen všude možně po dokumentu.</p>

<p>HTML atributy se proto pro JS vůbec nepoužívají nebo se do nich uvádí jen malé množství kódu (například volání funkce).</p>



<h2 id="umi">Umí JS víc než HTML/CSS?</h2>

<p>JavaScript používaný „na straně klienta“ (běžící v prohlížeči uživatele) je v podstatě odkázaný na schopnost HTML/CSS.</p>

<blockquote>
  <p>Sám o sobě JS v podstatě nic neumí.</p>
</blockquote>

<p>Výstupem JavaScriptu je tak HTML/CSS, tedy dokáže pouze to, co dokáže HTML/CSS.</p>




<h2 id="manipulace">Manipulace s HTML/CSS</h2>

<p>Nejčastěji se JS používá pro změny HTML nebo CSS.</p>