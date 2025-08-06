---
title: "HTML tabulky"
headline: "HTML tabulky"
description: "Vytváření tabulek v HTML. Kompletní přehled všech tabulkových značek."
date: "2016-01-26"
last_modification: "2016-02-02"
status: 1
tags: ["html", "html-tagy", "tabulky"]
format: "html"
---

<h2 id="layout">Tabulkový layout</h2>


<p>Dlouhou dobu v minulosti byly HTML tabulky rozumnou možností, jak na stránce zobrazit obsah vedle sebe. Pomocí tabulek se tak stavěly celé <a href="/layout">layouty</a> webových stránek.</p>



<p>Taková technika byla běžná ještě někdy kolem roku 2005, kdy pro stavbu rozvržení stránky převládlo CSS – zejména obtékání sloupců pomocí vlastnosti <a href="/float"><code>float</code></a>.</p>

<p>Od vymizení prohlížeče <b>IE 6</b> potom přestává dávat smysl používat tabulky pro něco jiného než tabulková data. Tabulkové zobrazení se sice pořád hodí, ale je pohodlnější použít neutrální značky <code>&lt;div></code> a <a href="/display#tabulkove">tabulkové hodnoty</a> CSS vlastnosti <code>display</code>.</p>




<h2 id="vyuziti">Využití tabulek</h2>

<p>Řada webových tvůrců si špatně vyložila trend v nahrazování tabulek pomocí CSS, a tak i data, která jasně patří do tabulky, řeší elementy <a href="/div-span"><code>&lt;div></code></a> s příslušnými styly.</p>

<p>Tabulek se <b>není potřeba bát</b> a je možné je používat.</p>

<p>Bohužel pro tabulky – jejich používání není moc vhodné při tvorbě responsivního designu.</p>






<h2 id="mobily">Mobilní smrt tabulek</h2>

<p>S příchodem <a href="/responsive">responsivního designu</a> se v HTML dramaticky omezilo používání rozsáhlých tabulek.</p>

<p>Na malou obrazovku mobilu bývá často problém vměstnat tabulku o více než dvou sloupcích.</p>

<p>Zobrazovaná data je tak nutné podle dostupné šířky přeskupovat, a to je pohodlnější s neutrálními značkami <code>&lt;div></code> a <code>&lt;span></code>.</p>

<p>Existují sice postupy, jak si na mobilu poradit s rozsáhlejší tabulkou, ale nic moc dobrého vymyslet nejde:</p>

<div class="internal-content">
  <ul>
    <li><a href="/responsivni-tabulky">Responsivní tabulky</a> – co udělat s tabulkami, aby se rozumně zobrazovaly na mobilech/tabletech</li>
  </ul>
</div>


<h2 id="znacky">HTML značky tabulky</h2>

<p>Nejjednodušší tabulku jde vytvořit třemi značkami – <code>&lt;table></code>, <code>&lt;tr></code> a <code>&lt;td></code> (tabulka, řádek, buňka).</p>

<p>Pro komplikovanější výtvory se hodí znát ještě <code>&lt;th></code> (buňka v hlavičce), <code>&lt;thead></code>, <code>&lt;tbody></code> a <code>&lt;tfoot></code> (členění tabulky na záhlaví, tělo a zápatí).</p>


<p>K uvedení popisku tabulky potom existuje značka <code>&lt;caption></code>.</p>

<p><img src="/files/html-tabulky/html-tabulka.png" alt="Podoba HTML tabulky" class="border"></p>






















<p>Nakonec pro snadnou správu sloupců tabulky slouží zřídka používané značky <code>&lt;col></code> (sloupec) a <code>&lt;colgroup></code> (skupina sloupců).</p>


<h3 id="table"><code>&lt;table></code></h3>

<p>Obal celé tabulky. Bez jeho uvedení se ostatní tabulkové značky budou ignorovat.</p>

<p>Z historických důvodů funguje na značce <code>&lt;table></code> řada presentačních atributů pro nastavení rámečku, pozadí, zarovnávání a další. Všechny jsou zavržené a lze je bez problému nahradit CSS ekvivalenty.</p>

<div class="internal-content">
  <ul>
    <li><a href="/stylovani-tabulky">Stylování HTML tabulek</a></li>
  </ul>
</div>



<h3 id="tr"><code>&lt;tr></code></h3>

<p><i>Table row</i> je řádek tabulky. Podle specifikace má povinnou počáteční a volitelnou koncovou značku. V praxi si prohlížeče poradí i při vynechání počáteční značky, takže jednořádkovou tabulku jde zapsat jako:</p>

<pre><code>&lt;table>
  &lt;td>První buňka
  &lt;td>Druhá buňka
&lt;/table></code></pre>




<p>Většinou je ale řádků potřeba více, takže je nutné <code>&lt;tr></code> používat.</p>

<p><a href="https://kod.djpw.cz/xbub">Ukázka</a> – tabulka bez <code>&lt;tr></code></p>




<h3 id="td"><code>&lt;td></code></h3>

<p>Samotná buňka tabulky, kam se píše obsah. Koncová značka je volitelná.</p>

<p>Zajímavé jsou atributy <code>rowspan</code> a <code>colspan</code> sloužící k slučování buněk tabulky.</p>

<p id="colspan">V následujícím příkladu bude buňka v prvním řádku tabulky roztažena přes dva sloupce řádku následujícího (<a href="https://kod.djpw.cz/fytb">ukázka</a>):</p>

<pre><code>&lt;table>
  &lt;tr>
    &lt;td <b>colspan</b>="2">
      Přes dva sloupce
    &lt;/td>
  &lt;/tr>
  &lt;tr>
    &lt;td>První&lt;/td>
    &lt;td>Druhá&lt;/td>
  &lt;/tr>
&lt;/table>
</code></pre>










<p id="colspan">Sloučení buněk po řádcích by vypadalo následovně (<a href="https://kod.djpw.cz/gytb">ukázka</a>):</p>

<pre><code>&lt;table>
  &lt;tr>
    &lt;td <b>rowspan</b>="2">
      Přes dva řádky
    &lt;/td>
    &lt;td>Vedle&lt;/td>
  &lt;/tr>
  &lt;tr>    
    &lt;td>Pod vedle&lt;/td>
  &lt;/tr>
&lt;/table>
</code></pre>










<h3 id="th"><code>&lt;th></code></h3>

<p>Zvláštní typ buňky, který funguje obdobně jako <code>&lt;td></code> (včetně slučování pomocí <code>colspan</code> a <code>rowspan</code>). Používá se pro označení názvu popisující data v sloupci (typicky v záhlaví). V prohlížečích se automaticky zobrazuje tučně.</p>




<h3 id="thead"><code>&lt;thead></code></h3>

<p>Záhlaví tabulky. Vkládá se do značky <code>&lt;table></code>. Zajímavost značky pro záhlaví je v tom, že obsahu bude nahoře i v případě, že je fysicky v kódu až dole.</p>

<p>Značka je nepovinná. Nemusí se vůbec uvádět, protože tabulka může být i bez záhlaví.</p>




<h3 id="tbody"><code>&lt;tbody></code></h3>

<p>Tělo tabulky. Značka je nepovinná. Pokud jsou v tabulce řádky a buňky mimo <code>&lt;thead></code> nebo <code>&lt;tfoot></code>, tělo tabulky se v <a href="/dom">HTML DOMu</a> vytvoří automaticky i bez uvedení <code>&lt;tbody></code> v kódu.</p>

<p>Značku <code>&lt;tbody></code> jde umístit do tabulky několikrát, může se to hodit:</p>

<blockquote>
  <p>Občas se hodí, že <code>&lt;tbody></code> může být v jedné tabulce vícekrát. Dají se tak logicky seskupit bloky řádků a několikrát mi to usnadnilo programování v javascriptu či stylování.</p>
  <p class="autor">— Kajman</p>
</blockquote>






<h3 id="tfoot"><code>&lt;tfoot></code></h3>

<p>Slouží pro zápatí tabulky. Patří do značky <code>&lt;table></code> a obsah v <code>&lt;tfoot></code> se zobrazí na konci tabulky nezávisle na umístění v HTML kódu.</p>




<h3 id="caption"><code>&lt;caption></code></h3>

<p>Slouží pro popisek vysvětlující obsah tabulky.</p>

<p>Ve výchozím stavu se zobrazuje nad tabulkou nezávisle na umístění v HTML kódu.</p>


<p>Toto umístění jde změnit ne moc známou a používanou CSS vlastností <code>caption-side</code> od <b>Internet Exploreru 8</b>.</p>

<pre><code>caption {
  caption-side: bottom;
}</code></pre>



<p>Dříve se to dělalo HTML atributem <code>align="bottom"</code>. Ve <b>Firefoxu</b> jde <code>&lt;caption></code> umístit i vlevo či vpravo hodnotami <code>left</code> a <code>right</code>.</p>

<p><a href="https://kod.djpw.cz/mytb">Ukázka</a></p>





<h3 id="col"><code>&lt;col></code></h3>

<p>Značka <code>&lt;col></code> se zdá být skoro k ničemu. Jde ale použít k pohodlnějšímu stylování všech buněk ve sloupci.</p>

<p>V následující <a href="https://kod.djpw.cz/hytb">ukázce</a> budou mít buňky „Druhá“ šedivé pozadí.</p>

<pre><code>&lt;table>
  &lt;col>&lt;col style="background: gray">
  &lt;tr>
    &lt;td>První&lt;/td>&lt;td>Druhá&lt;/td>
  &lt;/tr>
  &lt;tr>
    &lt;td>První&lt;/td>&lt;td>Druhá&lt;/td>
  &lt;/tr>  
&lt;/table>
</code></pre>







<p>Značka <code>&lt;col></code> se tak hodí pro elegantní <a href="/zvyrazneni-tabulky">zvýraznění sloupců tabulky</a> JavaScriptem po najetí myší.</p>

<p>Přes atribut <code>span</code> jde obsáhnout jedním <code>&lt;col></code>em více sloupců. Následující kód proto obarví dva sloupce tabulky do šedivé barvy:</p>

<pre><code>&lt;col <b>span="2"</b> style="background: gray"></code></pre>



<p>Díky pokročilým <a href="/css-selektory#n-ty-potomek">CSS selektorům n-tého elementu</a> jde ale celkem snadno barvit sloupce jen pomocí CSS:</p>

<pre><code>td:nth-child(2) {
  background: gray
}</code></pre>





<h3 id="colgroup"><code>&lt;colgroup></code></h3>

<p>Element <code>&lt;colgroup></code> slouží jako obal jednotlivých značek <code>&lt;col></code>. Při jeho neuvedení v HTML kódu a použití značek <code>&lt;col></code> se <code>&lt;colgroup></code> vytvoří automaticky sám.</p>

<p>Když se do tabulky vloží bez <code>&lt;col></code>, bude fungovat stejně jako značka <code>&lt;col></code>.</p>

<p>„Skupin sloupců“ může být v kódu i víc.</p>

<p>Pro pochopení rozdílu <code>&lt;colgroup></code> a <code>&lt;col></code> poslouží následující <a href="https://kod.djpw.cz/jytb">ukázka</a>.</p>




