---
title: "Jak zapsat na české klávesnici?"
headline: "Zvláštní znaky na české klávesnici"
description: "Jak na běžné české klávesnici pohodlně programovat a zapisovat všelijaké speciální znaky?"
date: "2013-05-19"
last_modification: "2015-01-18"
status: 1
tags: ["produktivita"]
format: "html"
---

<p>Pro psaní speciálních znaků existují v zásadě tři možnosti.
<ol>
<li>používat <b>anglickou klávesnici</b> a neustále se mezi ní a českou přepínat klávesami <kbd>Alt</kbd> + <kbd>Shift</kbd>,
<li>používat nějakou <b>programátorskou</b> / vlastnoručně upravenou klávesnici, která umožňuje psaní speciálních i českých znaků,
<li>naučit se, jak speciální znaky zadávat na <b>obyčejném české rozložení</b> kláves.
</ol>

<p>První možnost trpí nutností neustálého přepínání tam a zpět, druhá možnost zavádí značnou nekompatibilitu s cizími počítači, takže zbývá možnost třetí…

<h2 id='pravy-alt'>Kouzelná klávesa pravý <kbd>Alt</kbd></h2>
<p>Při podržení této klapky získají běžné klávesy novou funkci, díky které se dají <b>pohodlně napsat</b> různé <b>speciální znaky</b>.
  
<h3>Jak napsat…</h3>  

<table>
<tr>
<th>požadovaný znak
<th>zkratka pravý <kbd>Alt</kbd> + …
<th>význam

<tr>
<td><code>&lt;</code> a <code>></code>
<td><kbd>,</kbd> a <kbd>.</kbd>
<td>špičaté závorky

<tr>
<td><code>{</code> a <code>}</code>
<td><kbd>B</kbd> a <kbd>N</kbd>
<td>složené závorky

<tr>
<td><code>[</code> a <code>]</code>
<td><kbd>F</kbd> a <kbd>G</kbd>
<td>hranaté závorky

<tr>
<td><code>$</code>
<td><kbd>ů</kbd>
<td>znak dolaru


<tr>
<td><code>#</code>
<td><kbd>X</kbd>
  <td>mřížka / dvojitý křížek	

<tr>
<td><code>&amp;</code>
<td><kbd>C</kbd>
<td>ampersand (and)

<tr>
<td><code>@</code>
<td><kbd>V</kbd>
<td>zavináč

<tr>
<td><code>|</code>
<td><kbd>W</kbd>
<td>svislá čára

<tr>
<td><code>\</code>
<td><kbd>Q</kbd>
<td>zpětné lomítko

<tr>
<td><code>~</code>
<td><kbd>1/+</kbd>
<td>vlnovka (tilda)

<tr>
<td><code>^</code>
<td><kbd>3/š</kbd>
<td>stříška*

<tr>
<td><code>°</code>
<td><kbd>5/ř</kbd>
  <br>
  nebo <kbd>Shift</kbd> + <kbd>;</kbd>
<td>stupně*

<tr>
<td><code>×</code> a <code>÷</code>
<td><kbd>)</kbd> a <kbd>ú</kbd>
<td>krát a děleno	


</table>
<p>*) Je třeba stisknout dvakrát nebo po jednom stisku potvrdit mezerníkem.

<h2 id='kody'>Kódy kláves</h2>
<p>Některé (neprogramátorské) užitečné znaky lze bez štelování klávesnice zapsat pomocí <b>levého</b> <kbd>Alt</kbd>u a číselného kódu.
<h3>Jak napsat…</h3> 
<table>
<tr>
<th>požadovaný znak
<th>levý <kbd>Alt</kbd> + kód
<th>HTML entita
<th>význam

<tr id="nbsp">
<td><input type="text" value="&nbsp;" size="1">
<td><code>0160</code>
<td><code>&amp;nbsp;</code> a <code>&amp;#160;</code>
  <td>nedělitelná/pevná mezera

<tr>
<td><code>„</code> a <code>“</code>
<td><code>0132</code> a <code>0147</code>
<td><code>&amp;bdquo;</code> a <code>&amp;ldquo;</code>
<td>české dvojité uvozovky

<tr>
<td><code>‚</code> a <code>‘</code>
<td><code>0130</code> a <code>0145</code>
<td><code>&amp;sbquo;</code> a <code>&amp;lsquo;</code>
<td>české jednoduché uvozovky

<tr>
<td><code>–</code> a <code>—</code>
<td><code>0150</code> a <code>0151</code>
<td><code>&amp;ndash;</code> a <code>&amp;mdash;</code>
<td>krátká a dlouhá pomlčka

<tr>
<td><code>…</code>
<td><code>0133</code>
<td><code>&amp;hellip;</code>
<td>tři tečky

<tr>
<td><code>−</code>
<td><code></code>
<td><code>&amp;minus;</code>
<td>minus

<tr>
<td><code>™</code>
<td><code></code>
<td><code>&amp;trade;</code>
<td>trade mark
  
  
<tr id="nulova">
  <td><code>&#8203;</code>    <button onclick="zkopirovat('&#8203;')" title="Kopírovat"><img src="/files/ceska-klavesnice/copy.png"></button></td>
  <td></td>
  <td><code>&amp;#8203;</code></td>
  <td>mezera s nulovou šířkou
  </td>
</tr>  
<tr id="nedelitelna-pomlcka">
  <td><code>&#8209;</code>    <button onclick="zkopirovat('&#8209;')" title="Kopírovat"><img src="/files/ceska-klavesnice/copy.png"></button></td>
  <td></td>
  <td><code>&amp;#8209;</code></td>
  <td>nezalomitelná pomlčka
  </td>
</tr>   
<tr id="plus-minus">
  <td><code>&pm;</code>    <button onclick="zkopirovat('&pm;')" title="Kopírovat"><img src="/files/ceska-klavesnice/copy.png"></button></td>
  <td></td>
  <td><code>&amp;pm;</code></td>
  <td>plus minus
  </td>
</tr>     
</table>
  
<h3 id="mocniny-zlomky">Mocniny a zlomky</h3>
<p>Pro zápis <i>něco na druhou</i> se dá použít buď <b>horní <sup>index</sup></b> (značka <code>&lt;sup></code>) nebo přímo znak „²“ — druhá mocnina² (HTML entita<code>&amp;sup2;</code>), třetí mocnina³ (<code>&amp;sup3;</code>). Čtvrtá <b>mocnina</b> už neexistuje.</p>
  
<p>Ze <b>zlomků</b> je k disposici čtvrtina ¼ (<code>&amp;frac14;</code>) polovina ½	(<code>&amp;frac12;</code>)	a tři čtvrtiny ¾ (<code>&amp;frac34;</code>).</p>  
  
  
  <script>
function zkopirovat(text) {  
  var range = document.createRange();  
  var node = document.createTextNode(text);
  document.body.appendChild(node);
  range.selectNode(node);  
  window.getSelection().addRange(range);  
  try {  
    var zkopirovano = document.execCommand('copy');  
    if (zkopirovano) alert("Zkopírováno");
    else alert("Nepodařilo se zkopírovat");
  } catch(err) {  
    alert("Prohlížeč neumí kopírovat");
  }  
  window.getSelection().removeAllRanges();  
  document.body.removeChild(node);
}    
  </script>