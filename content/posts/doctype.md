---
title: "Doctype"
headline: "HTML značka <code>&lt;!doctype></code>"
description: "Jaký (a jestli vůbec) psát <code>&lt;!doctype></code> do stránky?"
date: "2013-06-11"
last_modification: "2016-02-23"
status: 1
tags: ["css", "html", "html-tagy", "napady"]
format: "html"
---

<pre><code>&lt;!doctype html></code></pre>

<p>HTML <code>&lt;!doctype></code> je zvláštní část kódu, která se obvykle zapisuje na začátek HTML stránek.</p>

<p>V minulosti se hodila pro přepínání režimů prohlížečů. V dnešní době se prakticky vždy hodí používat <b>standardní režim</b>, kterého jde docílit jednoduchým tvarem:</p>

<pre><code>&lt;!doctype html></code></pre>



<p>Při neuvedení <code>&lt;!doctype></code> se použije tzv. quirk režim (nestandardní režim zpětné kompatibility).</p>



<h2 id=standardni>Standardní režim</h2>

<p>Standardní mód zajistí co možná nejjednotnější chování napříč nejpoužívanějšími prohlížeči. A umožní (hlavně v případě starých <b>IE</b>) využívat nové vlastnosti. Je tedy docela vhodné jej používat.</p>




<h2 id="rozdily">Rozdíly vykreslovacích režimů</h2>


<h3>Rozdíly v box-modelech</h3>

<p>Nejzásadnější rozdíl je v počítání rozměrů bloků, tzv. <a href="/box-model">box modelu</a> v <b>Internet Exploreru</b>.</p>

<ol>
  <li>Režim <b>standardní</b> / <i>obsahový</i> / <code>box-sizing: content-box</code> přičítá k rozměrům <a href="/height">výšky</a>/šířky elementu i rozměry <code>padding</code>ů a <code>border</code>ů,</li>
  <li>Režim <b>nestandardní</b> / quirk / okrajový / <code>box-sizing: border-box</code> respektuje zadané rozměry šířky/výšky a rámečky a odsazení provede „uvnitř“.</li>
</ol>



<p>Jako výhodnější box-model se zdá být ten nestandardní, kde je šířka nastavená vlastností <code>width</code> konečná a rozměry <code>border</code>u a <code>padding</code>u na ní nemají vliv.</p>

<p>Některé komplikované CSS konstrukce se v okrajovém modelu (quirk) <b>řeší lépe</b> než v obsahovém (standardní režim) nebo jsou <b>ve standardním režimu neřešitelné</b> (bez přepnutí box-modelu).</p>

<p>Od <b>IE 8</b> a prakticky ve všech ostatních prohlížečích jde box-model přepnout na úrovní CSS následujícím předpisem s využitím vlastnosti <a href="/box-sizing"><code>box-sizing</code></a>:</p>

<pre><code>*, *:before, *:after {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</code></pre>







<p>Ve starších <b>IE</b> byla jediná možnost, jak docílit <i>výhodnějšího</i> okrajového box-modelu, použít quirk režim. Pro starší Explorery sice existuje ještě <code><a href="https://github.com/Schepp/box-sizing-polyfill">boxsizing.htc</a></code>, ale nejspíš to nebude fungovat 100% jako opravdový okrajový (<code>border-box</code>) box-model.</p>

<p>Prohlížeče mimo <b>IE</b> mají box-model stále stejný nezávisle na (ne)uvedení <code>&lt;doctype></code>.</p>


<h3 id="dedicnost-pisma">Dědičnost velikosti písma v tabulce</h3>

<p>V quirk režimu obsah <a href="/html-tabulky">tabulky</a> nezdědí velikost písma od svého rodiče.</p>

<p>Text v tabulce a mimo tabulku tak bude mít jinou velikost. Ve standardním režimu ji bude mít stejnou.</p>

<pre><code>&lt;div style="120%">
  Text mimo tabulku
  &lt;table>
    &lt;tr>
      &lt;td>Text v tabulce
    &lt;/tr>
  &lt;/table>
&lt;div></code></pre>








<p>Zbavit se tohoto chování jde pomocí <code><a href="/font#size">font-size</a>: 100%</code> pro tabulku.</p>

<p><a href="http://kod.djpw.cz/cuub">Živá ukázka</a></p>




<h3 id="jednotky">Nepovinné jednotky <code>px</code></h3>

<p>V quirku se CSS jednotky uvedené bez rozměrů budou automaticky považovat za pixely. Následující zápis tak bude plně funkční:</p>

<pre><code>element {
  width: 100;
  height: 100;
}</code></pre>



<p>Při používání standardního režimu je nutné napsat <code>100<b>px</b></code>.</p>




<h3 id="dalsi">Další rozdíly</h3>

<p>Výše uvedené rozdíly jsou nejzásadnější, existují ale ještě další odlišnosti:</p>

<div class="external-content">
  <ul>
    <li>Quirksmode.org: <a href="http://www.quirksmode.org/css/quirksmode.html">Quirks mode and strict mode</a></li>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Quirks_Mode_and_Standards_Mode">Quirks Mode and Standards Mode</a></li>
  </ul>
</div>



<h2 id=quirk>Zpětně kompatibilní režim (quirk)</h2>

<p>Quirk je v překladu rozmar, výstřelek nebo vrtoch.</p>

<p>Quirk režim se používal hlavně v minulosti, protože sjednocoval chování starých <b>Explorerů</b> (neznalých obsahového box-modelu – starší než <b>IE 6</b>). Nemuselo se potom tolik ladit pro různé verse IE.</p>

<p>Později (<b>IE 6</b>–<b>IE 7</b>) byl quirk možnost, jak záměrně docílit v <b>Internet Explorerech</b> okrajového box-modelu.</p>

<p></p>



<h2 id=as>„Almost Standards“</h2>

<p>Některé prohlížeče mají ještě „skoro standardní“ režim, ten se ale liší jen velmi nepatrně od normálního standardního. (Více o tom na <a href="https://developer.mozilla.org/en-US/docs/Gecko's_Almost_Standards_Mode">MDN</a>.)

  
  
<h2 id="historie">Historie <code>&lt;!doctype></code></h2>

<p>Před HTML 5 se objevovaly různé obskurní <i>doctype</i> jako:
<pre><code>&lt;!doctype html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
&lt;!doctype html "-//W3C//DTD HTML 4.01//EN"></code></pre>





<p>Či dokonce XHTML podoby:</p>

<pre><code>&lt;!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"></code></pre>





<p>Vzhledem k tomu, že <code>&lt;!doctype></code> slouží pouze k <b>přepnutí režimu</b>, používá se dnes převážně stručná podoba:</p>

<pre><code>&lt;!doctype html></code></pre>
  


<h3 id="prepinani-versi">Přepínání versí HTML</h3>

<p>Dříve se mohlo zdát, že <code>&lt;!doctype></code> slouží k přepínání versí (X)HTML.</p>

<p>To se ale nikdy nedělo a neděje, protože prohlížeče verse HTML nebo CSS nerozlišují.</p>

<p>Kromě přepínání vykreslovacího režimu tak má <i>doctype</i> vliv pouze na <a href="/validita">validátor</a>.</p>


  
<h2 id=pravopis>Standar<font color=green>d</font>ní, ne standar<font color=red>t</font>ní</h2>

<p>V českém jazyce se přídavné jméno slova „standard“ píše s <kbd>D</kbd>.