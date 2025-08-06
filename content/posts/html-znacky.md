---
title: "Druhy HTML značek"
headline: "Různé druhy HTML značek"
description: "Dělení HTML značek podle způsobu jejich otevírání a uzavírání. "
date: "2013-09-28"
last_modification: "2013-09-30"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<h2 id="znacky">HTML značky</h2>
<p>V jazyce HTML mají různé elementy různá pravidla pro zapisování <b>počátečních a koncových značek</b>.</p>

<h3 id="povinne">Počáteční i koncová značka povinná</h3>
<p>Některé elementy mají <b>povinnou &lt;počáteční&gt; i &lt;/koncovou&gt; značku</b>. Například <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;b&gt;</code>, <code>&lt;h1&gt;</code> apod.
    <p>Takové značky v případě ručního neukončení teoreticky ukončí až konec dokumentu a validátor bude hlásit chybu. Často se označují jako <b>značky párové</b>.</p>

<h3 id="koncova-volitelna">Koncová značka volitelná</h3>
<p>Další kategorie má <b>povinnou jen značku počáteční</b> a koncová značka je volitelná. Uzavření elementu se potom <b>odvodí z kontextu</b>. Patří sem odstavce (<code>&lt;p&gt;</code>), položky seznamů (<code>&lt;li&gt;</code>, <code>&lt;dd&gt;</code>, <code>&lt;dt&gt;</code>), řádky a buňky tabulek (<code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>) nebo formulářový prvek <code>&lt;option&gt;</code>.
    <p>Vychází se z jednoduchých pravidel, že například v odstavci / položce seznamu / buňcě tabulky nemůže být další odstavec / položka seznamu / buňka tabulky nebo jiný blokový element, takže se před takovou značkou element <b>automaticky sám ukončí</b>.
      <p>V následujícím kódu tedy element <code>&lt;div&gt;</code> ukončí odstavec.</p>
    <pre><code>&lt;p&gt;Odstavec bude ukončen automaticky.
&lt;div&gt;
&lt;/div&gt;</code></pre>

<h3 id="koncova-zakazana">Zakázaná ukončovací značka</h3>
<p>Třetí skupina elementů má <b>koncovou značku zakázanou</b>, jde o tagy jako <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;br&gt;</code> nebo <code>&lt;hr&gt;</code>. Prohlížeče zpravidla omylem uvedenou <i>zakázanou</i> koncovou značku ignorují. Někdy se tyto elementy <b>označují jako <i>nepárové</i></b>.
  
<h3 id="volitelne">Počáteční i koncová značka volitelná</h3>  
<p>Poslední skupina má <b>počáteční i koncovou značku volitelnou</b>. Takové elementy <b>jsou v kódu povinné</b>, a nejspíš proto se v případě vynechání vytvoří samy bez přičinění autora webu.</p>
<p>Nic ale nebrání je ručně zapsat.</p>
  <p>Jedná se o značky jako <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code> nebo <code>&lt;tbody&gt;</code>.</p>
    
<p>Tyto elementy se vytvářejí a ukončují rovněž <b>na základě kontextu</b>. Pokud zapíšeme <a href="https://kod.djpw.cz/vgc">následující kód</a> (v <a href="http://validator.w3.org/check?uri=http%3A%2F%2Fkod.djpw.cz%2Fvgc-&charset=%28detect+automatically%29&doctype=HTML5&group=0">HTML 5 validní</a>).</p>
    <pre><code>&lt;title&gt;Titulek stránky&lt;/title&gt;
&lt;table&gt;
  &lt;tr&gt;
    &lt;td&gt;Buňka tabulky.
&lt;/table&gt;</code></pre>
    <p>Prohlížeč může postupovat zhruba následovně:</p>
    <ol>
      <li>Nalezne značku <code>&lt;title&gt;</code>, ta ale musí být v elementu <code>&lt;head&gt;</code>, takže ho prohlížeč vytvoří. Element <code>&lt;head&gt;</code> ale zase musí být v <code>&lt;html&gt;</code> → vytvoří se <code>&lt;html&gt;</code>.</li>
      <li>Prohlížeč narazí na <code>&lt;table&gt;</code>, tabulka (jakýkoliv obsah) musí být v elementu <code>&lt;body&gt;</code> → vytvoří se napřed <code>&lt;body&gt;</code>.</li>
      <li>Element <code>&lt;tr&gt;</code> nemůže být jen tak v tabulce, takže prohlížeč vytvoří <code>&lt;tbody&gt;</code>.</li>
      <li>Značka <code>&lt;/table&gt;</code> ukončí <code>&lt;tr&gt;</code> i <code>&lt;td&gt;</code>.</li>
      <li>Konec dokumentu ukončí <code>&lt;body&gt;</code> a <code>&lt;html&gt;</code>.</li>
    </ol>
    <p>Lze se o tom přesvědčit ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a>:</p>
    <p><img src="/files/jak-funguje-html/html-vysledek.png" alt="Výsledné HTML po domyšlení značek" class="border"></p>

<h2 id="praxe">Význam v praxi</h2>
<p>Z neuzavírání nebo neotevírání zbytečných značek reálně <b>nehrozí žádné risiko</b>, že by prohlížeč zavření značek špatně domyslel.
  
  <p>Někteří tvůrci webů zastávají přístup:</p>
<blockquote><p>Všechny značky ukončuji, takže mě nějaké členění na párové, nepárové, povinně nepárové a nepovinné nemusí zajímat.</p></blockquote>

<p>Problém je, že:</p>
<ol>
  <li><p>Skupinu se <b>zakázanou ukončovací značkou</b> je potřeba znát tak jako tak.</li>
  <li><p>Znalost pravidel ukončování může <b>předejít nevysvětlitelným chybám</b>, kdy se nekorektním zanořením ukončí značka jinak, než to vypadá v HTML kódu.
    <pre><code>&lt;p style="color: red"&gt;Odstavec bude červený automaticky.
  &lt;div&gt;
    Obsah oddílu červený nebude, odstavec se ukončí před ním 
    a koncová značka odstavce tak nemá co ukončovat.
  &lt;/div&gt;
&lt;/p&gt;</code></pre>
    </li>
  <li><p>Neznalost chování <code>&lt;tbody&gt;</code> může zaskočit při zkoumání tabulky ve vývojářských nástrojích. A rozlišování dokumentu na část <code>&lt;head&gt;</code> a <code>&lt;body&gt;</code> celkem postrádá smysl.</li>
</ol>

<h3 id="editor">HTML editory a volitelné značky</h3>
<p>Skoro by se dalo říct: <b>proč psát zbytečné značky</b>, které si prohlížeč <b>snadno domyslí</b>?</p>
<p>Problém je špatná znalost editorů správného chování při uzavírání HTML značek.</p>
<p>Neuzavírání např. odstavců potom třeba selže při odsazování.</p>
<pre><code>&lt;p&gt;První odstavec
  &lt;p&gt;Druhý odstavec
    &lt;p&gt;Třetí odstavec</code></pre>
<p>Použít funkci pro sbalení „neukončené“ HTML značky nebo si nechat označit obsah „neukončené“ značky asi bude problém.</p>
<p>Kromě toho často přímo <b>editory umí ukončovat značky tak nějak automaticky</b>. Například s nástrojem <a href="/emmet">Emmet</a> (nebo přímo v <a href="/sublime-text">Sublime Text</a> editoru) nás nějaké ukončování trápit nemusí, protože HTML značky je možné zapisovat jako <code>znacka</code> + <kbd>Tab</kbd> a <i>párovost</i> značky se sama určí.</p>


<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://atd.havrlant.net/jak-funguje-html">Jak funguje HTML</a></li>
</ul>