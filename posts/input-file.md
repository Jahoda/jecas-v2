---
title: "Reset políčka pro nahrávání souboru"
headline: "Resetování <code>&lt;input type=file&gt;</code>"
description: "Jak resetovat (odstranit) hodnotu z <code>&lt;input&gt;</code>u pro upload souborů."
date: "2013-10-02"
last_modification: "2018-09-14"
status: 1
tags: ["formulare", "hotova-reseni", "html", "html-tagy"]
format: "html"
---

<p>Z <a href="/zabezpeceni">bezpečnostních</a> důvodů platí pro uploadovací formulářové políčko trochu jiná pravidla.</p>
<p>Například <b>není možné přistupovat JavaScriptem k jeho hodnotě</b> ve stejné míře jako u jiných políček.</p>

<ul>
  <li>
    <p>Přenastavení hodnoty <code>uploadInput.value = "něco"</code> selže.</p>
  </li>
  <li>
    <p>Přečtení hodnoty <code>alert(uploadInput.value)</code> vrátí jen smyšlenou cestu: <code>C:\fakepath\nazev-souboru.txt</code>. Ve starších prohlížečích <b>Firefox</b> je název souboru.)</p>
  </li>
</ul>

<p>Je to docela pochopitelné, protože jinak by si majitel stránky mohl nahrávat libovolné soubory z disku návštěvníka tipováním jejich cest.</p>



<h2 id="jak">Jak vymazat pole pro upload</h2>


<ol>
  <li>
    <p>Jedna možnost je použít běžné <b>resetovací tlačítko</b> (např. <a href="/input#type-reset"><code>&lt;input type=reset></code></a>) — to ale vymaže celý formulář.</p>
  </li>
  <li>
    <p>Druhá možnost je nahrávací <code>&lt;input&gt;</code> <b>vymazat</b>, tj. nastavit jeho <code>value</code> na <code>""</code>:</p>
    
    <pre><code>formular.nazevPole.value = "";</code></pre>
    
    <p>Smazání je jediná možnost, jak měnit hodnotu tohoto pole. Nastavení něčeho jiného, než je prázdný řetězec skončí chybout:</p>
    
    <pre><code>Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string.</code></pre>
  </li>
</ol>




<h2 id="podpora">Starší prohlížeče</h2>

<p>Výše uvedené řešení nefunguje v <b>IE 10</b> a starších. V ostatních prohlížečích nešel tento postup použít ještě v roce <b>2014</b>.</p>

<p>Pro tyto případy existuje ještě jedna možnost — <b>přepsat JavaScriptem obsah políčka tím samým obsahem</b>.</p>

<pre><code>&lt;span id="<b>obal</b>">
  &lt;input name="upload" type="file">
&lt;/span>
&lt;button onclick="
  document.getElementById('<b>obal</b>').innerHTML = document.getElementById('<b>obal</b>').innerHTML
">
  Odstranit
&lt;/button></code></pre>

<h2 id="ukazka">Živá ukázka</h2>
<p>U javascriptového resetovacího tlačítka je nutno dát pozor na to, aby <b>nechtěně neodesílalo formulář</b>. Tomu zabrání buď <code>return false</code>, nebo tlačítko, co formulář neodešle, což je <code>&lt;input&gt;</code> nebo <code>&lt;button&gt;</code> s <code>type=button</code>.</p>
<div class="live">
<form onsubmit="return false">
  
<p><input placeholder="Obyčejné textové pole"> <span id=obal><input type=file></span>
<script>
  var obal = document.getElementById("obal");
</script>  
  <button type=button onclick='obal.innerHTML = document.getElementById("obal").innerHTML'>
  Resetovat upload starým způsobem
</button>
<fieldset><legend>Hodnota <code>&lt;input type=file&gt;</code></legend>
  <button onclick="alert(obal.getElementsByTagName('input')[0].value)">Přečíst hodnotu</button>
  <button onclick="obal.getElementsByTagName('input')[0].value = ''">Nastavit hodnotu na „“ (prázdný řetězec)</button>
</fieldset>
  
<p>
<button type="reset">Resetovat celý formulář</button>

</form>  
</div>