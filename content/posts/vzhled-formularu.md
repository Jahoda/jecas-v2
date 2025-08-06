---
title: "Stylování formulářových prvků"
headline: "Vlastní vzhled formulářů"
description: "Jak vytvořit originálně vypadající formulář, aniž by házel uživatelům klacky pod nohy?"
date: "2013-05-24"
last_modification: "2013-05-24"
status: 1
tags: ["css", "formulare"]
format: "html"
---

<p>Nejprve je dobré si uvědomit, že pokud se formuláře nechají víceméně úplně být, dostanou relativně funkční vzhled od prohlížeče / operačního systému.

  
<p>Třeba takové tlačítko (<a href="/input#type-submit"><code>&lt;input type=submit></code></a> nebo <a href="/button"><code>&lt;button></code></a>) má při ponechání výchozího vzhledu klidně 5 stavů (obrázky jsou z Google Chrome v OS Windows 7):
<ol>
  <li>Výchozí stav, kdy se <i>nic neděje</i>. <img src='/files/button/default.png'>
    <li>Při najetí myší na tlačítko (<code>:hover</code>). <img src='/files/button/hover.png'>
      <li>Při stlačení tlačítka (<code>:active</code>). <img src='/files/button/down.png'>
        <li>Pokud je tlačítko vybráno (typicky) klávesou <kbd>Tab</kbd> (<code>:focus</code>). <img src='/files/button/focus.png'>
          <li>Tlačítko je zablokované (atribut <code>disabled</code>). <img src='/files/button/disabled.png'>
</ol>













<p>Jak je vidět, bez sebemenší práce a kódu navíc docela pěkné a funkční tlačítko.

<p>Takovému tlačítku lze měnit <a href="/margin"><code>margin</code></a>, <code>padding</code>, styl a barvu písma a hromadu dalších věcí, problém ale nastane, <b>když se formulářovému prvku sáhne na rámeček</b> (<code>border</code>) <b>nebo pozadí</b> (<code>background</code>). To celou výše uvedenou funkčnost a styl totálně rozhází. Nezbývá tedy než si všech pět stylů nadefinovat ručně.

  
  
  
<h2 id='vlastni'>Vlastní styl</h2>
<dl>
	<dt id='inputy'>Vstupní pole
	<dd><p>Běžné <code>&lt;input type=text></code> nebo pole <a href="/textarea"><code>&lt;textarea></code></a> lze stylovat docela rozumně.
		<p>Snad jediný zádrhel je v Explorerech (do IE 8 včetně) při nastavení <code>padding</code>u a přeplnění pole — IE takový text posune natěsno k levému kraji <code>padding</code> ne<code>padding</code>.
          
          
          
          
	<dt id='tlacitka'>Tlačítka
	<dd>
<p>Co se týče tlačítek (<code>&lt;input type=submit></code> nebo <code>&lt;button></code>), zdá se bez nějakého <a href="/hacky">hackování</a> nebo bez komplikování kódu nemožné dosáhnout 100% shodného chování napříč prohlížeči. 
<ol>
	<li>Opera a Internet Explorer všech versí při kliknutí (<code>:active</code>) nepatrně posouvají text doprava dolů. V Opeře lze toto chování odbourat pomocí <a href="/position#relative"><code>position: relative</code></a> pro tlačítko, v Exploreru ale nejspíš možnost zbavit se tohoto efektu není.
	<li>Chrome narozdíl od ostatních prohlížečů při kliknutí a podržení myši nad tlačítkem nevyvolává <code>:focus</code>.
</ol>
      
      
      
      
	<dt id='select'>Element <code>&lt;select></code> a <code>&lt;input></code>y <code>checkbox</code> a <code>radio</code>
	<dd><p>Zde už je situace v podstatě beznadějná. Změnou rámečku nebo pozadí se přepneme na <i>styl Windows 95</i>:
		<p class=live><input type=radio style='background: white'> <input type=checkbox style='background: white'> <select style='background: white'><option>Položka</select>
		<p>A puntík, zaškrtávátko nebo šipku pro rozbalení není možnost změnit.
          <p>Stylování <code>&lt;select&gt;</code> je podrobněji popsáno v článku <a href="/stylovani-selectu">Stylování <code>&lt;select&gt;</code>u</a>.</p>
</dl>
      
      
      
      
      

<h2 id='js'>Řešení v JavaScriptu</h2>
<p>Pro napříč prohlížeči shodné formuláře s vlastním vzhledem je tedy potřeba formulářové prvky <i>nepoužívat</i>. Přesněji řečeno je schovat <!--(<code>display: none</code>) -->a viditelné části <i>formuláře</i> sestavit z <code>&lt;div></code>ů a <code>&lt;span></code>ů.
<p>Existují hotová řešení:
	<dl>
		<dt><a href='http://javascript.webdream.cz/demos/prettyForm-0.9beta2/'>PrettyForm</a>
		<dd><p>Jednoduchá a přísupná knihovna podporující i věci jako ovládání klávesnicí. Funkční i v prehistorických prohlížečích. (<a href='http://djpw.cz/122767'>Vlákno</a> na DJPW.)
		<dt><a href="http://wiki.jqueryui.com/w/page/12138056/Selectmenu">Selectmenu</a>
		<dd><p>Plugin do jQuery UI řešící <code>&lt;select></code>y. Funkční napříč prohlížeči.
		<dt><a href="http://ivaynberg.github.io/select2/">Select2</a>
		<dd><p>Taktéž jQuery plugin pro pokročilejší <code>&lt;select></code>y. Funkční až od IE 8.
	</dl>

          
          
          
          
          
          
          
          
          
          
          
          
          
<h2 id=pozor>Na co si dát pozor</h2>
<ul>
<li>„Nepřechytračit“ uživatele, tj. nezměnit chování formuláře v dobré víře tak, že bude pro uživatele nepředvídatelné.
<li>V <b>případě použití obrázků</b> dbát na kontrast (viditelnost) prvků i v případě, že se obrázky nenačtou.
<li>Pokud možno zachovat obvyklé chování, zejména možnost ovládat formulář klávesnicí (<a href="/tabindex"><code>tabindex</code></a> atd.).
</ul>
          
          
<h2 id="odkazy">Odkazy jinam</h2>          
          
<ul>
  <li>
    <p><a href="http://nativeformelements.com/">Native form elements</a> – nativní vzhled formulářových prvků</p>
  </li>
</ul>