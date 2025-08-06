---
title: "Zablokování psaní do <input>u"
headline: "Jak zakázat psaní do <code>&lt;input></code>u"
description: "V jakých případech a jak zamezit psaní do formulářového políčka."
date: "2014-10-05"
last_modification: "2014-10-05"
status: 1
tags: ["formulare", "html", "napady"]
format: "html"
---

<p>Občas potřebujeme na webové stránce zabránit uživateli měnit hodnotu <a href="/input">vstupního políčka <code>&lt;input></code></a>.</p>



<h2 id="zakazat">Způsoby zabránění</h2>

<h3 id="readonly">Atribut <code>readonly</code></h3>
    
<pre><code>&lt;input <b>readonly</b>></code></pre>

<p>Obsah políčka nezměníme, ale jeho obsah půjde normálně <b>označit nebo zkopírovat</b> (to se někdy hodí pro <a href="/oznaceni-textu">nabídnutí obsahu</a> ke <a href="/kopirovat">zkopírování</a>).</p>

<p>Při odeslání formuláře se obsah políčka <b>odešle na server</b>.</p>

<div class="live">
  <input type="text" value="Obsah pouze ke čtení" readonly><br>
  <input type="text" value="Obyčejný &lt;input>">
</div>

<p>Použití <code>readonly</code> vytváří risiko, že uživatel nepochopí, že je <b>políčko pouze ke čtení</b>. Obyčejný <code>&lt;input></code> i <code>&lt;input></code> s <code>readonly</code> mohou na první pohled <b>vypadat totožně</b>.</p>

<p>Zaměřit pole <b>pouze ke čtení</b> jde v CSS:</p>

<ol>
  <li><a href="/css-selektory#atributovy">atributovým selektorem</a> – <code>input[readonly]</code> (<b>IE 7+</b>)</li>
  
  <li><a href="/css-selektory#read-only">selektorem <code>:read-only</code></a> – <code>input:read-only</code> (<b class="help" title="(možná)">IE 12+</b>)</li>
</ol>

<p>První způsob má mnohem lepší <b>podporu v prohlížečích</b>, selektor <code>:read-only</code> nefunguje ani v <a href="/ie11"><b>IE 11</b></a>.</p>

<p>Další menší nevýhoda je při <b>kopírování</b>, kdy obsah nejde uložit do schránky funkcí <i>Vyjmout</i> (klávesovou zkratkou <kbd>Ctrl</kbd> + <kbd>X</kbd>). Někteří uživatelé vyjmutí používají raději než kopírování, protože je <b>visuálně potvrzené</b> (označený obsah zmizí).</p>


<h3 id="disabled">Atribut <code>disabled</code></h3>

<pre><code>&lt;input <b>disabled</b>></code></pre>

<p>Atibut <code>disabled</code> celkově <b>zablokuje formulářové pole</b>. Nepůjde změnit a ani dokonce nebude možné do něj kliknout a vybrat si jeho obsah.</p>

<p>Zablokované políčko se při odeslání formuláře <b>nepřenese na server</b>.</p>

<p>Zaměřit <i>disablované</i> pole v CSS jde rovněž <b>atributovým selektorem</b> (<code>input[readonly]</code> – <b>IE 7+</b>) nebo méně podporovaným <a href="/css-selektory#disabled"><code>input:disabled</code></a> (<b>IE 9+</b>).</p>

<p>V <b>IE 9</b> a starších a <b>Opeře 12</b> nejde <code>disabled</code> plně stylovat. Barvu (<code>color</code>) zablokovaného políčka tam nezměníme. <a href="https://kod.djpw.cz/ldgb">Ukázka</a>.</p>

<p>Také na zablokovaném <code>&lt;input></code>u není možné vyvolat například <a href="/udalosti-mysi#onclick">událost onclick</a> (<a href="https://kod.djpw.cz/mdgb">ukázka</a>), <a href="/tabindex">od<kbd>Tab</kbd>ovat na něj</a> nebo u něj vyvolat <code>:focus</code>.</p>


<h3 id="zadny-input">Nepoužívat <code>&lt;input></code></h3>

<p>Poslední možnost je pro výpis obsahu, který <b>nemá být určen k editaci</b>, vůbec nepoužít formulářové políčko, ale spokojit se např. s obyčejným elementem <code>&lt;span></code>.</p>

<p>Má-li obsah být i odeslaný na server, řešení je duplikování obsahu do skrytého formulářového pole (<code>&lt;input type="hidden"></code>).</p>



<h3 id="output">Značka <code>&lt;output></code></h3>

<p>Pro výsledky uživatelských akcí je určena <a href="/output">značka <code>&lt;output></code></a>. Nefunguje ale ani v <b>IE 11</b>.</p>








<h2 id="nikomu-neverte">Nikomu nevěřte</h2>

<p>Že je políčko pouze ke čtení (<code>readonly</code>), zablokované (<code>disabled</code>) či skryté (<a href="/input#type-hidden">type="hidden"</a>) <b>nezaručuje, že do něj návštěvník nemůže nic napsat</b>.</p>

<p>S použitím <a href="/vyvojarske-nastroje">vývojářských nástrojů</a> není žádný problém atribut <b>odmazat nebo změnit</b>.</p>

<p><img src="/files/zablokovani-inputu/smazani-disabled.png" alt="Zrušení atributu disabled" class="border"></p>


















<h2 id="co">Co zvolit?</h2>

<p>Rozhodování se pro ten či onen postup není úplně snadné. Následující faktory je ale dobré zvážit</p>

<ol>
  <li>
    <p>Atribut <code>disabled</code> je ze hry při snaze o možnost plnohodnotného stylování v <b>IE 9</b> a starších.</p>
  </li>
  
  <li>
    <p>V případě, že obsah <b>nikdy nepotřebujeme poslat na server</b>, není potřeba <code>&lt;input></code> používat.</p>
  </li>
  
  <li>
    <p>Když pole někdy odesílat chceme a někdy ne, <b>přidání/odebrání atributu</b> je asi nejsnazší řešení.</p>
  </li>
  
  <li>
    <p>Políčko <code>readonly</code> bude nejspíš vždy vhodné styly odlišit od políčka, kam se dá psát.</p>
    
    <p>Na druhou stranu bez použití <code>&lt;input></code>u může zase být někdy nutné vytvořit nějaký – políčku podobný – styl.</p>
    
    <pre><code>input, <b>.jako-input</b> {
  /* společné styly */
}
<b>.jako-input</b> {
  /* odlišení */
}</code></pre>
    
    <p>Zde se nabízí použít <code>&lt;input></code> nebo <code>&lt;span></code> v závislosti na tom, co bude <b>jednoduší nastylovat</b>.</p>
  </li>
  
  <li>
    <p>K formulářovému políčku je v JS <a href="/js-prvky-formulare">elegantnější přístup</a> než k obyčejnému elementu.</p>
    
    <pre><code>jmenoFormulare.jmenoReadOnlyPolicka.value = "hodnota";</code></pre>
  </li>
</ol>



<h2 id="nastaveni-js">Nastavení <code>readonly</code> a <code>disabled</code> JavaScriptem</h2>

<pre><code>var policko = jmenoFormulare.nazevPolicka;
policko.<b>readOnly</b> = true;
policko.<b>disabled</b> = true;</code></pre>

<p>U <code>readonly</code> se používá v JS <a href="http://cs.wikipedia.org/wiki/CamelCase"><i>camelCase</i></a>, tj. <code>read<b>O</b>nly</code>.</p>

<div class="live"><form name="formular">
  <p>Zapnout/vypnout     
    <button type=button onclick="formular.pole.disabled = !formular.pole.disabled">
        disabled
    </button>    
    <button type=button onclick="formular.pole.readOnly = !formular.pole.readOnly">
        readonly
    </button>
  </p>
  <input type="text" name="pole" value="Obsah políčka">
</form></div>

<p><a href="https://kod.djpw.cz/odgb">Samostatná ukázka</a></p>

<!-- titulní obrázek: https://kod.djpw.cz/ndgb -->