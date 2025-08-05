---
title: "HTML značka output"
headline: "HTML značka <code>&lt;output></code>"
description: "Značka <code>&lt;output></code> slouží k vypsání výsledku závislého na předchozí uživatelské akci."
date: "2014-10-13"
last_modification: "2014-10-13"
status: 1
tags: ["formulare", "html", "html-tagy"]
format: "html"
---

<p>Co si pod tím představit?</p>

<div class="live">
<p>Vynásobte si 2 čísla:</p>
<form oninput="vysledek.value = parseInt(a.value) * parseInt(b.value)">
  <input type="number" name="a" value="1" size="3"> ×
  <input type="number" name="b" value="8" size="3"> =
  <output name="vysledek">8</output>
</form></div>

<p>V této jednoduché <a href="http://kod.djpw.cz/yjgb">ukázce</a> se značka <code>&lt;output></code> použije pro zobrazení <b>výsledku</b>. Jedná se tedy o jeden ze způsobů, jak vytvořit <a href="/zablokovani-inputu">„&lt;input>“, do kterého se nedá psát</a>.</p>

<p>Obsah <code>&lt;output></code>u se podobně jako u <code>&lt;input type="disabled"></code> v případě odeslání formuláře <b>neodesílá na server</b>. <b>Výchozí vzhled</b> značky je neutrální.</p>



<h2 id="podpora">Podpora</h2>

<p>Značka <code>&lt;output></code> funguje plnohodnotně mimo <b>Internet Explorer</b> (včetně <a href="/ie11">IE 11</a>).</p>

<ul>
  <li><b>Chrome 10+</b></li>
  <li><b>Firefox 4+</b></li>
  <li><b>Opera 11+</b></li>
</ul>

<p>V nepodporujících prohlížečích se chová jako ostatní <a href="/vlastni-html-znacky#html5">neznámé značky</a>.</p>

<p>S trochou úprav může původní ukázka fungovat i ve <b>starších prohlížečích</b> – <a href="http://kod.djpw.cz/bkgb">ukázka</a>.</p>



<h2 id="zapis">Zápis</h2>

<p>Typický zápis <code>&lt;output></code>u vypadá následovně (koncová značka <a href="/html-znacky#povinne">je povinná</a>):</p>

<pre><code>&lt;output name="vysledek">
  Obsah
&lt;/output></code></pre>

<p>Kromě <b>globálních/universálních atributů</b> je možné nastavit:</p>

<dl>
  <dt id="name"><code>name</code></dt>
  <dd>
    <p>Název políčka, hodí se pro <a href="/js-prvky-formulare">zjednodušené přistupování k prvkům formuláře</a>.</p>
  </dd>

  <dt id="for"><code>for</code></dt>
  <dd>
    <p>Odkaz na ID políček souvisejících s výpočtem, oddělují se mezerou. Nenapadá mě moc případů využití. V JS se k této hodnotě dá dostat přes <code>nazevPolicka.<b>htmlFor</b></code>.</p>
    
    <pre><code>&lt;input id="<b>a</b>">
&lt;input id="<i>b</i>">
&lt;output for="<b>a</b> <i>b</i>"></code></pre>
  </dd>
  
  <dt id="form"><code>form</code></dt>
  <dd>
    <p>Umožní <code>&lt;output></code> přiřadit do formuláře, aniž by se nacházel ve <code>&lt;form></code>u. Jako hodnota se zadává atribut <code>id</code> cílového formuláře.</p>
  <pre><code>&lt;form id="<b>idecko</b>">
&lt;/form>
&lt;output form="<b>idecko</b>"></code></pre>
  </dd>
</dl>



<h2 id="js">Používání JavaScriptu</h2>

<p>Jelikož se <code>&lt;output></code> hodí pro výpis výsledků uživatelských akcí, je naprosto zásadní možnost s touto značkou <b>pracovat pomocí JS</b>.</p>

<p>To povyšuje <code>&lt;output></code> nad neutrální značku <code>&lt;span></code>, pochopitelně jen v <b>podporovaných prohlížečích</b>.</p>

<p>Zjednodušeně řečeno se chová jako kombinace značky <a href="/input"><code>&lt;input></code></a> a právě <code>&lt;span></code>.</p>

<ul>
  <li>Z pohledu vzhledu vypadá neutrálně (jako <code>&lt;span></code>).</li>
  <li>Z pohledu JS nabízí možnosti jako <code>&lt;input></code>.</li>
</ul>

<p>Což přináší výhody.</p>

<ol>
  <li>
    <p>Přístup k „políčku“ <code>&lt;output></code> pomocí atributu <code>name</code> (místo obtěžování se s metodami <a href="/getelement"><code>getElementBy*</code></a> nebo <a href="/queryselector"><code>querySelector</code></a>).</p>
  </li>
  
  <li>
    <p>Vlastnosti <code>value</code> a <code>defaultValue</code> místo <a href="/innerhtml"><code>innerHTML</code></a>.</p>
    
    <pre><code>&lt;output>
  10
&lt;/output></code></pre>
    
    <p><a href="http://kod.djpw.cz/wjgb">Ukázka</a> přečtení obsahu pomocí <code>value</code>.</p>
  </li>
</ol>



<h2 id="zaver">Závěr</h2>

<p>Plnohodnotně značku <code>&lt;output></code> s ohledem na nepodporu v <b>IE</b> není úplně možné – bude se chovat jako obyčejná neznámá značka a v <b>IE 8</b> nepůjde bez trochy JS <b>stylovat</b>. Pro návštěvníka nepřinese nic navíc.</p>

<p>Proto se doporučuji řídit touto tabulkou:</p>

<table>
  <tr>
    <th>Funkčnost</th>
    <th>Postup</th>
  </tr>
  <tr>
    <td><b>IE 8+</b></td>
    <td>Použít neutrální značku <code>&lt;span></code>.</td>
  </tr>
  <tr>
    <td><b>IE 9+</b></td>
    <td>Neutrální značka <code>&lt;span></code> nebo <code>&lt;output></code> vyjdou na stejno.</td>
  </tr>  
  <tr>
    <td><b>mimo IE</b></td>
    <td>Použít <code>&lt;output></code>.</td>
  </tr>  
</table>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>HTML5 Doctor: <a href="http://html5doctor.com/the-output-element/">The output element</a></li>
  
  <li>W3C: <a href="http://www.w3.org/TR/html5/forms.html#the-output-element">The <code>output</code> element</a></li>
</ul>

<!-- obrázek: http://kod.djpw.cz/akgb -->