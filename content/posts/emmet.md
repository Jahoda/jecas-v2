---
title: "Emmet"
headline: "Emmet – efektivnější psaní kódu"
description: "Nástroj Emmet nabízí výrazné zjednodušení při psaní HTML a CSS kódu."
date: "2013-08-01"
last_modification: "2013-08-01"
status: 1
tags: ["produktivita"]
format: "html"
---

<p><a href="http://emmet.io/" class="button">Stránka projektu emmet.io</a></p>

<p>Použít jej lze v <a href="http://emmet.io/download/">mnoha editorech</a> (i v <a href="/sublime-text">Sublime Text</a>, <a href="https://github.com/emmetio/pspad">PSPadu</a>, NetBeans nebo Eclipse atd.) a je dostupný i v JavaScriptu pro použití na webu.</p>




<h2 id="instalace">Instalace</h2>

<h3 id="sublime-text">Sublime Text</h3>
<p>Do editoru Sublime Text se Emmet <b>instaluje</b> stejně jako ostatní <a href="/pluginy-sublime-text">pluginy</a> přes <i>Package Control</i>.</p>
  

<h3 id="pspad">PSPad</h3>
<p>Stačí nahrát výše <a href="https://github.com/emmetio/pspad/blob/master/emmet.js">uvedný soubor</a> do adresáře <code>Script\JScript</code> ve složce PSPadu, tj. standardně do umístění <code>C:\Program Files (x86)\PSPad editor\Script\JScript</code>.</p>
  
<p>Následně potom povolit skriptování v <i>Nastavení</i> → <i>Nastaveni programu</i> → <i>Integrace do systemu</i> → <i>Podpora skriptování pomocí WSH</i>.
  

<p><img class="border" src="/files/emmet/pspad-povolit-skirptovani.png" alt="Povolení skriptování v PSPadu"></p>































  
<p>V PSPadu se pro aplikaci Emmetu na text před kursorem používá zkratka <kbd>Ctrl</kbd> + <kbd>,</kbd>.



<h2 id="vyuziti">Využití</h2>


<p>S Emmetem si lze výrazně urychlit a zkrátit zápis celých HTML bloků nebo CSS pravidel. Stačí napsat pár znaků a <i>odpálit</i> je standardně <kbd>Tab</kbd>ulátorem nebo pomocí <kbd>Ctrl</kbd> + <kbd>Enter</kbd>.</p>


<h2>Pár příkladů</h2>
<script src="/assets/emmet/emmet.min.js"></script>
<style>
  textarea {min-width: 50%; width: auto}
</style>

<h3 id="html">HTML</h3>
<dl>
  <dt id="odkaz-trida">Odkaz s třídou <code>button</code></dt>
  <dd><p><code>a.button</code>, <kbd>Tab</kbd></p>
  <textarea rows=1>a.button</textarea></dd>
  

  
  <dt id="checkbox">Zaškrtávací <code>&lt;input&gt;</code> v <code>&lt;label&gt;</code>u</dt>
  <dd><p><code>label(input[type=checkbox])</code>, <kbd>Tab</kbd></p>
  
<textarea rows=1>label(input[type=checkbox])</textarea></dd>
  

  
  <dt>Seznam s pěti položkami</dt>
  <dd><p><code>ul(li{Položka}*5)</code>, <kbd>Tab</kbd></p>
  <p>Využít lze i číslování pořadí — je dostupné v <code>$</code>.</p>
    <p><code>ul(li{Položka <b>$</b>}*5)</code>, <kbd>Tab</kbd></p>
    
<textarea rows="7" id="cislovani">ul(li{Položka $}*5)</textarea>
    
<script>
  function nastavit(str) {
    var c = document.getElementById("cislovani");   
  	c.innerHTML = str;
  	c.focus();
  }
</script>
    
    <ul><li>Číslovat od konce lze <button onclick="nastavit('ul(li{Položka $@-}*5)')">přidáním</button> zavináče a spojovníku (<code>@-</code>),</li>
      
      <li>číslování od čísla tři <button onclick="nastavit('ul(li{Položka $@3}*5)')">zajistí</button> <code>@b3</code>,
        <li>pro pevný počet míst čísel stačí <button onclick="nastavit('ul(li{Položka $$}*5)')">napsat</button> více dolarů,</li>    
      
        <li>vše jde <button onclick="nastavit('ul(li{Položka $$@-3}*5)')">zkombinovat</button>.</li>  
</ul>
  </dd>
  

  
  <dt id="nadpisy">Jednoduchá struktura nadpisů</dt>
  <dd><p><code>h1+h2+p+h2+h3</code>, <kbd>Tab</kbd></p>
<textarea rows="5">h1+h2+p+h2+h3</textarea>  
</dd>
  

  

  

  <dt id="komentar">Komentář za ukončujícím <code>&lt;div></code>em</dt>
  <dd>
    <p>Pro přehlednost se občas hodí za ukončovací značku přidat komentář s třídou, aby bylo jasné, co značka ukončuje.</p>
    <p><code>.clanek|c</code>, <kbd>Tab</kbd></p>
<textarea rows="3">.clanek|c</textarea> 
    
    <p>Tohoto chování je možné dosáhnout i automaticky.</p>
    
    
  	<div class="external-content">
      <ul>
      	<li><a href="http://iaintnoextra.tumblr.com/post/68089741466/automatically-add-closing-comments-to-html-using">Automatically add closing comments to HTML using Emmet</a></li>
      </ul>

    </div>
  	
    
<p>Stačí do souboru <code>User/Emmet.sublime-settings</code> nakopírovat následující a restartovat.</p>
    <pre><code>{
  "preferences": {
    "filter.commentAfter": "&lt;!-- /&lt;%= attr(\"id\", \"#\") %>&lt;%= attr(\"class\", \".\") %> -->"
  },
  "syntaxProfiles": {
    "html" : {
      "filters" : "html, c"
    }
  }
}</code></pre>
    
    <p>Dá se do něj dostat přes <i>Preferences → Package Settings → Emmet → Settings – User</i>.</p>
</dd>  


  
  <dt id="layout">Celý layout</dt>
  <dd><p><code>html:5>.header(img#logo)+.menu(ul(li>a{Odkaz $}*5))+.content(h1+p)+.footer</code>, <kbd>Tab</kbd></p>
    <textarea rows=10>html:5>.header(img#logo)+.menu(ul(li>a{Odkaz $}*5))+.content(h1+p)+.footer</textarea>  
</dd>
  
  <dt id="lorem-ipsum">Lorem ipsum generátor</dt>
  <dd><p><code>lorem</code>, <kbd>Tab</kbd></p>
    <textarea rows=5>lorem
lorem2
p*5>lorem3
</textarea>
    <p>Lze používat i při zápisu „<code>element*5</code>“, číslo za <code>lorem</code> nastaví počet slov.</p>
</dd>
</dl>

<h3>CSS</h3>
<p>Podobná <i>kouzla</i> lze provádět i v CSS.</p>

<dl>
  <dt id="position-absolute">Absolutně posicovaný element</dt>
  <dd><p><code>posa+t10+l30+w100+h100+p1e+m1e</code>, <kbd>Tab</kbd></p>
    
<noscript>
  <pre><code>position: absolute;
top: 10px;
left: 30px;
width: 100px;
height: 100px;
padding: 1em;
margin: 1em;</code></pre>
  
    </noscript>
  <textarea class="emmet-syntax-css" rows=7>posa+t10+l30+w100+h100+p1e+m1e</textarea>  
</dd>
  <dt id="ramecek">Rámeček</dt>
  <dd><p><code>bt1-s#</code>, <kbd>Tab</kbd></p>
    
<textarea class="emmet-syntax-css" rows=1>bt1-s#</textarea> 
    <noscript><pre><code>border-top: 1px solid #000</code></pre>
    
    </noscript></dd>
</dl>

<p>Na první pohled vypadají HTML i CSS zkratky dost šíleně, nicméně jsou až překvapivě dobře promyšlené a svým způsobem intuitivní. Třeba k podivnému zápisu horního rámečku lze dojít postupným zkracováním.</p>

<p>Nejdříve jsem napsal <code>bt:1-s-#000</code> a zkoušel, co by se ještě dalo ubrat (<code>bt:1-s-#0</code> → <code>bt1-s#</code>). Převedení <code>#</code> bez kódu barvy na nulu je už trochu extrémní, ale myslím, že to hezky ilustruje tu promyšlenost.</p>

<p>Kromě možnosti používat zkratky jednotlivých vlastností funguje i tzv. fuzzy search, kdy se Emmet snaží dohledávat, co vlastně chce člověk napsat, takže si lze v podstatě vytvořit svůj vlastní styl zápisu.</p>

	<script>
		emmet.require('textarea').setup({
			pretty_break: true, // enable formatted line breaks (when inserting 
					            // between opening and closing tag) 
			use_tab: true       // expand abbreviations by Tab key
		});
	</script>

<p>Další hezké funkce a vysvětlující dema jsou v <a href="http://docs.emmet.io/">dokumentaci</a>.</p>


<h2 id="hayaku">Hayaku</h2>
<p><a href="https://github.com/hayaku/hayaku#readme">Hayaku</a> umožňuje ještě možná trochu lepší napovídání <b>CSS vlastností a hodnot</b> v <b>Sublime Textu</b>. Pohodlnější vytváření HTML kódu ale nenabízí.</p>