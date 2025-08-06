---
title: "Jak zakázat označování textu"
headline: "Zakázání označování textu"
description: "Standardně jde na webu označovat text. Jak jeho výběru myší zabránit?"
date: "2015-03-22"
last_modification: "2015-03-23"
status: 1
tags: ["css", "css-vlastnosti", "html", "html-atributy", "napady"]
format: "html"
---

<p>Na webové stránce je běžné, že jde její textový obsah <b>označovat</b>. Většinou je možnost označování dobrá, protože návštěvník si čas od času může chtít nějaké slovo <b>označit a vyhledat vyhledávačem</b> nebo zkrátka zkopírovat někam jinam.</p>

<p>V případě ovládacích prvků je ale označování někdy <b>nežádoucí</b>.</p>

<p>Text některých ovládacích prvků, kde se očekává, že na ně uživatel klikne, jako je odkaz nebo tlačítko, proto obvykle nejdou v prohlížečích označit standardním způsobem tažením kursoru myši.</p>

<div class="live">
  <p><a href="#">Text odkazu</a></p>
  
  <p><button>Text tlačítka</button></p>
</div>




<p>Ve většině prohlížečích jde text odkazu označit při tažení myší v místě nad odkazem. Označit text tlačítka jde potom snad jedině v <b>Chrome</b> / nové <b>Opeře 15+</b>.</p>






<h2 id="unselectable">Atribut <code>unselectable</code></h2>

<p>Do <b>Opery 12</b> a v <b>Internet Explorerech</b> zamezí označování atribut <code>unselectable</code> s hodnotou <code>on</code>.</p>

<pre><code>&lt;p <b>unselectable="on"</b>>
  Obsah nepůjde vybrat.
  &lt;span>Toto vybrat půjde&lt;/span>
&lt;/p></code></pre>

<p>Zakázání výběru se <b>nevztahuje na potomky</b> elementu s <code>unselectable</code>, takže ve výše uvedeném kódu by obsah <code>&lt;span></code>u šel normálně označit.</p>

<p>Asi nejsnazší řešení tohoto problému je <a href="/js-cykly">projití</a> všech potomků s <code>unselectable</code> a doplnění tohoto atributu pro všechny potomky JavaScriptem.</p>









<h2 id="user-select">CSS vlastnost <code>user-select</code></h2>

<p>Zamezit označování jde i CSS vlastností <code>user-select: none</code>. Následujícím zápisem tak jde doplnit podporu <code>unselectable="off"</code> do <b>Firefoxu</b>, <b>Chrome 6+</b> a <b>Opery 15+</b>. V <b>IE 10</b> a <a href="/ie11"><b>IE 11</b></a> potom fungují oba postupy (HTML atribut i CSS vlastnost).</p>

<pre><code>[unselectable] {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}</code></pre>








<h2 id="ukazka">Ukázka znemožnění výběru</h2>

<div class="live">
  <style>
    [unselectable] {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
    }    
  </style>
  <p>
    Tučný <b unselectable="on">obsah odstavce</b> nejde označit.
  </p>
</div>

<p>Chování napříč prohlížeči je hodně proměnlivé.</p>

<ul>
  <li>Ve <b>Firefoxu</b> nejde text označit ani zkopírovat.</li>
  
  <li>V ostatních prohlížečích se při začátku označování mimo zakázaný element povede obsah označit. V <b>Chrome</b> se v takovém případě na zablokovaném elementu označení neprojeví jen visuálně, při zkopírování se do schránky dostane i neoznačitelný obsah.</li>
</ul>


<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/jslb">Samostatná ukázka zamezení výběru textu</a></li>
  </ul>
</div>


<h2 id="kdy">Kdy označení zakázat</h2>

<p>Měnit výchozí chování prohlížeče (tj. text jde označit) bývá většinou spíš na škodu. Rozhodně není dobré se tímto způsobem snažit bránit před <a href="/kopirovani">kopírováním obsahu</a>.</p>

<p>Nemožnost označit text může být pro návštěvníka dost <b>frustrující</b>. Zakazovat výběr by proto mělo následovat až v případě, kdy se při běžném používání aplikace něco <b>nechtěně označuje</b>.</p>

<p>Zákaz označování se hodí hlavně u prvků, které něco dělají při <a href="/udalosti-mysi#onclick"><code>onclick</code>u</a> a nejsou to odkazy nebo tlačítka. Při rychlém kliknutí vícekrát po sobě by se potom označoval text, což nepůsobí dobře.</p>

<p>Chování u běžného <code>&lt;span></code>u, který při kliknutí mění svou barvu, jde pozorovat na následující ukázce.</p>

<div class="live">
  <style>
    .prepinac {
      background: #fff;
      display: inline-block;
      padding: .5em;
      cursor: pointer;
    }
    .prepinac-zvyraznit {
      background: #efefef;
    }
  </style>
  <p>
    <span class="prepinac" onclick="toggle(this, 'prepinac-zvyraznit')">„Tlačítko“ bez zakázání výběru</span>
  </p>  
  <p>
    <span class="prepinac" unselectable="on" onclick="toggle(this, 'prepinac-zvyraznit')">Zakázání výběru</span>
  </p>  
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/user-select">user-select</a></li>
  <li>Cam I Use: <a href="http://caniuse.com/#search=user-select">user-select</a></li>
  
  <li>Six Revisions: <a href="http://sixrevisions.com/css/disable-text-selection/">Disable Text Selection with CSS</a></li>
</ul>