---
title: "Input"
headline: "HTML značka <code>&lt;input></code>"
description: "Všechny varianty značky <code>&lt;input></code>, možné atributy, vysvětlení a ukázky."
date: "2013-11-19"
last_modification: "2017-02-14"
status: 1
tags: ["formulare", "html", "html-tagy"]
format: "html"
---

<h2 id="type">Atribut <code>type</code></h2>
<p>Element <code>&lt;input></code> je hodně specifický tím, že může <b>nabývat mnoha podob</b>, které stanoví atribut <code>type</code>.</p>
<p>Následuje abecední seznam <b>možných variant</b>.</p>
<table>
  <tr><th width="120">HTML kód</th><th>Výsledek</th><th>Význam</th><th><span class="help" title="Vše znamená cca IE6+; IE 10 znamená všechny prohlížeče a IE od verse 10">Podpora</span></th></tr>
  <tr id="type-button">
    <td><pre><code>&lt;input type="button"></code></pre></td>
    <td><div class="live"><input type="button">
<input type="button" value="Popis"></div></td>
    <td><p>Tlačítko bez další akce, je v podstatě nutné uvést text tlačítka do atributu <code>value</code>, jinak se nic moc neobjeví.</p></td>
    <td><p>Vše</p></td>
  </tr>
  <tr id="type-checkbox">
    <td><pre><code>&lt;input type="checkbox"></code></pre></td>
    <td><div class="live"><input type="checkbox">
<input type="checkbox" checked></div></td>
    <td><p>Zaškrtávací pole. Kvůli malým rozměrům je vhodné používat <a href="/label-for">značku <code>&lt;label></code></a>. <b>Zaškrtnutí</b> se zapíná atributem <code>checked</code>.</p></td>
    <td><p>Vše</p></td>
  </tr> 
  <tr id="type-color">
    <td><pre><code>&lt;input type="color"></code></pre></td>
    <td><div class="live"><input type="color"></div></td>
    <td><p><a href="/vyber-barvy">Výběr barvy</a> v hexa zápisu.</p></td>
    <td><p>Opera, Chrome, Firefox 29</p></td>
  </tr>  
  <tr id="type-date">
    <td><pre><code>&lt;input type="date"></code></pre></td>
    <td><div class="live"><input type="date"></div></td>
    <td><p>Výběr <b>kalendářních dat</b> (dny, měsíce, roky).</p></td>
    <td><p>Opera, Chrome</p></td>
  </tr>  
  <tr id="type-datetime">
    <td><pre><code>&lt;input type="datetime"></code></pre></td>
    <td><div class="live"><input type="datetime"></div></td>
    <td><p>Výběr <b>kalendářních dat i času</b> (dny, měsíce, roky, hodiny a minuty).</p></td>
    <td><p>Opera</p></td>
  </tr> 
  <tr id="type-datetime-local">
    <td><pre><code>&lt;input type="datetime-local"></code></pre></td>
    <td><div class="live"><input type="datetime-local"></div></td>
    <td><p>Výběr <b>kalendářních dat i času</b> (dny, měsíce, roky, hodiny a minuty) bez <b>časového pásma</b>.</p></td>
    <td><p>Opera, Chrome</p></td>
  </tr> 
  <tr id="type-email">
    <td><pre><code>&lt;input type="email"></code></pre></td>
    <td>
      <div class="live">
<style>
  input[type=email]:valid {color: green}
  input[type=email]:invalid {color: red}
</style>
<input type="email">
<input type="email" multiple>
      </div>
    </td>
    <td><p>Zadávání <b>e-mailové adresy</b>. Užitečné jsou <a href="/css-selektory#validace">selektory <code>:valid</code> a <code>:invalid</code></a>, které mohou přestylovat políčko v závislosti na platném e-mailu. Zadání více e-mailů by měl zajistit atribut <code>multiple</code>.</p></td>
    <td><p>IE 10</p></td>
  </tr>   
  <tr id="type-file">
    <td><pre><code>&lt;input type="file"></code></pre></td>
    <td>
      <div class="live">
<input type="file">
<input type="file" multiple>
      </div>
    </td>
    <td><p>Políčko pro <b>nahrávání souborů</b>.</p>
    <ul>
      <li>Atributem <code>file</code> lze omezit typ souborů, <b>které je možné nahrát</b>.</li>
      <li>Atribut <code>multiple</code> umožní nahrát víc souborů.</li>
    </ul>
    </td>
    <td><p>Vše</p></td>
  </tr> 
  <tr id="type-hidden">
    <td><pre><code>&lt;input type="hidden"></code></pre></td>
    <td>
      <div class="live"><input type="hidden"></div>
    </td>
    <td><p>Skryté pole, které se ale při odeslání dostane na server.</p></td>
    <td><p>Vše</p></td>
  </tr>   
  <tr id="type-image">
    <td><pre><code>&lt;input type="image"></code></pre></td>
    <td>
      <div class="live"><input type="image" src="/images/jecas-16.svg"></div>
    </td>
    <td><p><b>Obrázkové odesílací tlačítko</b>, cíl obrázku se zadává do <code>src</code>, rozměry do <code>width</code> a <code>height</code> a popisek do <code>alt</code>u.</p></td>
    <td><p>Vše</p></td>
  </tr>     
  <tr id="type-month">
    <td><pre><code>&lt;input type="month"></code></pre></td>
    <td><div class="live"><input type="month"></div></td>
    <td><p>Výběr <b>samotného měsíce</b>.</p></td>
    <td><p>Opera, Chrome</p></td>
  </tr>  
  <tr id="type-number">
    <td><pre><code>&lt;input type="number"></code></pre></td>
    <td><div class="live"><input type="number">
<input type="number" value="100" step="10"></div></td>
    <td><p>Výběr <b>čísla</b>. V podporovaných prohlížečích je možné číslo zvyšovat/snižovat šipkami. O kolik se má zvyšovat/snižovat určuje atribut <code>step</code>.</p></td>
    <td><p>Opera, Chrome, Firefox 29</p></td>
  </tr>    
  <tr id="type-password">
    <td><pre><code>&lt;input type="password"></code></pre></td>
    <td>
      <div class="live"><input type="password" value="blabla"></div>
    </td>
    <td><p>Pole pro <b>zadávání hesel</b>, místo znaků se zobrazují puntíky/tečky/hvězdičky.</p></td>
    <td><p>Vše</p></td>
  </tr>
  <tr id="type-radio">
    <td><pre><code>&lt;input type="radio"></code></pre></td>
    <td>
      <div class="live"><input type="radio" name="jmeno">
<input type="radio" name="jmeno"></div>
    </td>
    <td><p>Radio <b>přepínače</b>. Na rozdíl od <a href="#type-checkbox"><code>checkboxu</code></a> lze vytvořit <i>kolekci</i> (se stejným atributem <code>name</code>), ze které lze vybrat jen <b>jednu možnost</b>. Předvybrat políčko umí rovněž atribut <code>checked</code>.</p></td>
    <td><p>Vše</p></td>
  </tr>  
  <tr id="type-range">
    <td><pre><code>&lt;input type="range"></code></pre></td>
    <td><div class="live"><input type="range">
<input type="range" value="100" step="20"></div></td>
    <td><p>Výběr <b>čísla z rozsahu</b>. Hodnotu určí atribut <code>value</code>. Maximální hodnota se nastaví atributem <code>max</code>, minimální zase <code>min</code>. O kolik se dá posouvat určuje atribut <code>step</code>.</p>
    <p><a href="http://andreruffert.github.io/rangeslider.js/">JS řešení</a> funkční i ve starších prohlížečích.</p>
    </td>
    <td><p>IE 10</p></td>
  </tr>  
  <tr id="type-reset">
    <td><pre><code>&lt;input type="reset"></code></pre></td>
    <td><div class="live"><input type="reset"></div></td>
    <td><p><b>Resetuje</b> celý formulář na původní hodnoty. Resetovat jen něco <a href="/input-file">může JavaScript</a>.</p></td>
    <td><p>Vše</p></td>
  </tr>    
  <tr id="type-search">
    <td><pre><code>&lt;input type="search"></code></pre></td>
    <td>
      <div class="live">
<input type="search">
<input type="search" autosave>
      </div>
    </td>
    <td><p>Pole pro <b>hledání</b>. Atribut <code>autosave</code> by měl zajistit <b>ukládání hledaných výrazů</b>.</p></td>
    <td><p>IE 10</p></td>
  </tr>  
  <tr id="type-submit">
    <td><pre><code>&lt;input type="submit"></code></pre></td>
    <td><div class="live"><input type="submit">
<input type="submit" value="Popis"></div></td>
    <td><p>Tlačítko pro <b>odeslání formuláře</b>, mívá výchozí popisek „Odeslat“.</p></td>
    <td><p>Vše</p></td>
  </tr>  
  <tr id="type-tel">
    <td><pre><code>&lt;input type="tel"></code></pre></td>
    <td>
      <div class="live">
<style>
  input[type=tel]:valid {color: green}
  input[type=tel]:invalid {color: red}
</style>
<input type="tel">
      </div>
    </td>
    <td><p>Zadávání <b>telefonního čísla</b>. Užitečné jsou (jako u <a href="#type-email">e-mailu</a>) selektory <code>:valid</code> a <code>:invalid</code>, které mohou přestylovat políčko v závislosti na platnosti.</p></td>
    <td><p>IE 10</p></td>
  </tr>    
  <tr id="type-text">
    <td><pre><code>&lt;input type="text"></code></pre></td>
    <td><div class="live"><input type="text"></div></td>
    <td><p>Běžný text (výchozí typ, tj. vytvoří se i bez uvedení <code>type</code>).</p></td>
    <td><p>Vše</p></td>
  </tr> 
  <tr id="type-time">
    <td><pre><code>&lt;input type="time"></code></pre></td>
    <td><div class="live"><input type="time"></div></td>
    <td><p>Výběr <b>samotného času</b>.</p></td>
    <td><p>Opera, Chrome</p></td>
  </tr>  
  <tr id="type-url">
    <td><pre><code>&lt;input type="url"></code></pre></td>
    <td>
      <div class="live">
<style>
  input[type=url]:valid {color: green}
  input[type=url]:invalid {color: red}
</style>
<input type="url">
      </div>
    </td>
    <td><p>Výběr <b>URL stránky</b>. Opět je možné použít selektory <code>:valid</code> a <code>:invalid</code>.</p></td>
    <td><p>IE 10</p></td>
  </tr>
  <tr id="type-week">
    <td><pre><code>&lt;input type="week"></code></pre></td>
    <td>
      <div class="live"><input type="week"></div>
    </td>
    <td><p>Zadávání samotného <b>týdne</b>.</p></td>
    <td><p>Opera, Chrome, Firefox</p></td>
  </tr>  
</table>

<h2 id="obecne-atributy">Obecné atributy</h2>
<p>Kromě atributů, které fungují snad úplně všude, jako <code>id</code>, <code>class</code> a <code>title</code>, existují i obecné atributy pro <code>&lt;input></code>y:</p>

<dl>
  <dt id="name"><code>name</code></dt>
  <dd>Jméno políčka, podle kterého se dá následně zpracovávat na serveru.</dd>
  
  <dt id="value"><code>value</code></dt>
  <dd>Výchozí hodnota políčka (někdy také popis tlačítka).</dd>
  
  <dt id="checked"><code>checked</code></dt>
  <dd>Zaškrtne <a href="#type-checkbox"><code>checkbox</code></a> nebo <a href="#type-radio"><code>radio</code></a> ihned po načtení stránky.</dd>
  
  <dt id="list"><code>list</code></dt>
  <dd>Připojení <a href="/datalist">našeptávání</a> značkou <code>&lt;datalist></code>.</dd>
  
  <dt id="inputmode"><code>inputmode</code></dt>
  <dd>Využití se najde hlavně u <b>dotykových zařízení</b> se SW klávesnicí. Atribut <code>inputmode</code> by měl umět přepnout typ klávesnice, která se u daného pole objeví.</dd>

  <dt id="autofocus"><code>autofocus</code></dt>
  <dd>Po načtení stránky dá políčku rovnou <code>focus</code> (<a href="https://kod.djpw.cz/ges">ukázka</a>).</dd>  
  
  <dt id="placeholder"><code>placeholder</code></dt>
  <dd>Předvyplní políčko hodnotou, která <b>po aktivování zmizí</b>. Zároveň se nebude odesílat na server (<a href="https://kod.djpw.cz/hes">ukázka</a>). Detailní popis <a href="/placeholder">atributu <code>placehodler</code></a> je na samostatné stránce.</dd>    
  
  <dt id="autocomplete"><code>autocomplete</code></dt>
  <dd>Některé prohlížeče si pamatují <b>vyplněná data</b> a umí je později nabízet. Hodnota <code>on</code> napovídání zapne, hodnota <code>off</code> vypne.</dd> 
  
  <dt id="spellcheck"><code>spellcheck</code></dt>
  <dd>Zapne nebo vypne <b>kontrolu pravopisu</b> (<a href="https://kod.djpw.cz/ies">ukázka</a>).</dd>   
</dl>

<h2 id="overovani">Ověřování a omezení hodnot</h2>
<p>Pro ověřování a omezování hodnot existují od <b>HTML 5</b> bohatší nástroje. Užitečné je i rozšíření CSS o selektory <a href="/css-selektory#validace"><code>:valid</code>/<code>:invalid</code></a>, které mohou přímo špatně vyplněné pole <i>zaměřit</i>.</p>

<p>Jelikož všechny tyto kontroly <b>nefungují ve starých prohlížečích</b> a není problém je obejít, je nutné kontrolovat <b>vždy</b> <a href="/bezpecnost#js-osetreni">na serveru</a>.</p>

<dl>
  <dt id="maxlength"><code>maxlength</code></dt>
  <dd>Maximální počet znaků, co lze do políčka napsat.</dd>
  
  <dt id="pattern"><code>pattern</code></dt>
  <dd><a href="/atribut-pattern">Atribut <code>pattern</code></a> umožňuje zadat regulární výraz, kterému musí obsah <b>vyhovovat</b>.</dd>
  
  <dt id="required"><code>required</code></dt>
  <dd>Pole musí být vyplněno.</dd>
  
  <dt id="min"><code>min</code></dt>
  <dd>Minimální možná hodnota. Lze použít u čísel a kalendářních dat. Hodnota <code>min</code> musí být nižší než <code>max</code>.</dd>

  <dt id="max"><code>max</code></dt>
  <dd>Maximální možná hodnota. Hodnota musí být <b>vyšší</b> než <code>min</code>.</dd>
  
  <dt id="readonly"><code>readonly</code></dt>
  <dd>Pole je <b>jen ke čtení</b>, nelze mu měnit jeho obsah.</dd>  
  
  <dt id="step"><code>step</code></dt>
  <dd>Krok, kterým lze zvyšovat/snižovat hodnotu. Funguje u <a href="#type-number">čísla</a> a <a href="#type-range">rozsahu</a>.</dd>
  
  <dt id="disabled"><code>disabled</code></dt>
  <dd>Políčko je úplně zablokované. Nejde na něm vyvolat <code>onclick</code> a neodešle se na server (pokud není <code>hidden</code>).</dd>
</dl>

<h2 id="form">Atributy nastavení formuláře</h2>
<p>Zajímavým prvkem je možnost <b>přenastavovat věci</b>, co normálně řeší značka <code>&lt;form></code>. Nebo dokonce z posice <code>&lt;input></code>u určit, do jakého formuláře <b>bude patřit</b>.</p>

<dl>
  <dt id="form"><code>form</code></dt>
  <dd>Umožňí <code>&lt;input></code> přiřadit do formuláře, aniž by se nacházel v <code>&lt;form></code>. Jako hodnota se zadává atribut <code>id</code> cílového formuláře.
  <pre><code>&lt;form id="<b>idecko</b>">
&lt;/form>
&lt;input form="<b>idecko</b>"></code></pre>
  </dd>
  
  <dt id="formaction"><code>formaction</code></dt>
  <dd>Přepíše <code>&lt;form action></code>. Má význam jen u <b>odesílacích tlačítek</b> (<code>submit</code>, <code>image</code>).</dd>
  
  <dt id="formenctype"><code>formenctype</code></dt>
  <dd>Obdobně přepíše atribut <code>enctype</code>.</dd>
  
  <dt id="formmethod"><code>formmethod</code></dt>
  <dd>Přepíše/nastaví metodu (na <code>GET</code> nebo <code>POST</code>), kterou se formulář odešle (<code>method</code>).</dd>
  
  <dt id="formtarget"><code>formtarget</code></dt>
  <dd>Přepíše/nastaví rám, do kterého se formulář odešle (<code>target</code>).</dd>  
  
  <dt id="formnovalidate"><code>formnovalidate</code></dt>
  <dd>Přepíše/nastaví validaci formuláře (<code>novalidate</code>).</dd>    
</dl>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Monica Dinosaurescu: <a href="http://meowni.ca/posts/a-story-about-input/">&lt;input&gt; I ♡ you, but you're bringing me down</a> – historický vývoj formulářových prvků</li>
</ul>


<!-- https://kod.djpw.cz/tes -->