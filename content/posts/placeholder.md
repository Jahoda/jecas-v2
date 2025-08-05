---
title: "Placeholder"
headline: "HTML atribut <code>placeholder</code>"
description: "HTML atribut <code>placeholder</code> slouží k zadání ukázkové hodnoty do formulářového pole."
date: "2014-02-15"
last_modification: "2014-02-15"
status: 1
tags: ["html", "html-atributy", "js", "napady", "stylovani"]
format: "html"
---

<pre><code>&lt;input type="text" <b>placeholder</b>="text">
&lt;textarea <b>placeholder</b>="text">
&lt;/textarea></code></pre>

<p>Od <b>IE 10</b> je možné nastavit bez JavaScriptu do značky <code><a href="/input">&lt;input></a></code> nebo <code>&lt;textarea></code> nějakou hodnotu jako příklad, která po <b>kliknutí do políčka zmizí</b>.</p>

<div class="live">
  <label>
    Zadejte e-mail: 
    <input type="text" placeholder="email@example.com">
  </label>
</div>

<p><a href="http://kod.djpw.cz/rybb">Samostatná ukázka</a>.</p>

<p>Je otázka, jestli je současná implementace tohoto atributu v prohlížečích vyhovující. <b>Firefox</b> a <b>Chrome</b> totiž obsah <code>placeholder</code>u neodstraní <b>ihned po kliknutí</b>, ale až když se v poli začne psát.</p>

<p>Mám trochu obavu, že člověk, co do pole klikne a ve zmíněných prohlížečích <b>neuvidí žádnou odezvu</b>, bude chtít text smazat klávesou <kbd>Delete</kbd> nebo <kbd>Backspace</kbd>, což ale <b>nepůjde</b>.</p>

<p><b>Internet Explorer</b> a <i>stará</i> <b>Opera 12</b> obsah <code>placeholder</code>u odstraní už při kliknutí (<code>focus</code>u).</p>

<h2 id="js">Řešení v JavaScriptu</h2>

<p>Možná je proto stále lepší staré dobré řešení v JavaScriptu, kde se dá rozumné chování zajistit jednotně ve všech prohlížečích.</p>

<p>Kromě <b>smazání výchozí hodnoty</b> existuje i řešení, kdy se políčko <b>označí</b>, takže půjde rovnou přepsat správnou hodnotou.</p>

<h3 id="smazani-hodnoty">Smazání výchozí hodnoty</h3>

<p>Využít lze události <code>onfocus</code> a <code>onblur</code>. Původní hodnota <code>value</code> se nachází ve vlastnosti <code>defaultValue</code>.</p>

<div class="live"><input type="text" 
  onfocus="if (this.value == this.defaultValue) this.value = ''" 
  onblur="if (this.value == '') this.value = this.defaultValue" 
  value="email@example.com"
></div>

<p><a href="http://kod.djpw.cz/sybb">Samostatná ukázka</a>.</p>

<h3 id="oznaceni">Označení obsahu</h3>

<p>Označení celého formulářového pole vypadá dost podobně. Jen se místo vymazání <code>value</code> při <code>focus</code>u celé pole označí přes <code>select()</code>. Pro správnou funkčnost v <b>Chrome</b> je nutné ještě <b>stornovat</b> událost <code>onmouseup</code>.</p>

<div class="live"><input type="text" 
  onfocus="if (this.value == this.defaultValue) this.select()" 
  onmouseup="return false"
  onblur="if (this.value == '') this.value = this.defaultValue" 
  value="email@example.com"
></div>

<p><a href="http://kod.djpw.cz/jgcb">Samostatná ukázka</a>.</p>


<h3 id="animovany">Animovaný placeholder</h3>
<p><a href="https://github.com/jackrugile/placeholdem">Hotové řešení</a> placeholderu, jehož text mizí / objevuje se po jednotlivých písmenkách.</p>

<div class="live">
  <script src="http://placeholdem.jackrugile.com/placeholdem.min.js"></script>
  <input class="animovany-placeholder" placeholder="email@example.com">
  <script>
    Placeholdem(document.querySelectorAll('.animovany-placeholder'));
  </script>
</div>

<h2 id="stylovani">Stylování <code>placeholder</code>u</h2>

<p>Pro nastavení stylu textu zadaného do atributu <code>placeholder</code> existují pseudotřídy <code>::placeholder</code> nebo <code>::input-placeholder</code> navíc s <a href="/css-prefixy">prefixy pro různé prohlížeče</a>.</p>

<dl>
  <dt id="opera">Opera 12</dt>
  <dd>
    <p>Stylování <code>placeholder</code>u neumožňuje.</p>
  </dd>
  
  <dt id="chrome">Chrome</dt>
  <dd>
    <p>Ač je v názvu selektoru <code>input</code>, funguje i pro <code>&lt;textarea></code>.</p>
    <pre><code>::-webkit-input-placeholder {
  /* styl */
}</code></pre>
  </dd>
  
  <dt id="ff">Firefox</dt>
  <dd>
    <p>Do <b>Firefoxu 18</b>.</p>
    <pre><code>:-moz-placeholder {
  /* styl */ 
}</code></pre>
    <p>V novějších potom s dvojtečkou navíc.</p>
    <pre><code><b>:</b>:-moz-placeholder {
  /* styl */ 
}</code></pre>
    <p>Pan <b>habendorf</b> doplnil, že ve <b>Firefoxu</b> má <i>placeholder</i> poloviční <a href="/opacity">průhlednost</a> (<code>opacity: 0.5</code>), která způsobuje, že barvy nastavené pro placeholder nemají ve výsledku plnou sytost. <a href="http://kod.djpw.cz/fmcb">Ukázka</a>. Není-li takové chování žádoucí, stačí přidat <code>opacity: 1</code>.</p>
  </dd>
  
  <dt id="ie">Internet Explorer</dt>
  <dd>
    <p><b>IE 10+</b></p>
    <pre><code>:-ms-input-placeholder {
  /* styl */ 
}</code></pre>
  </dd>
</dl>

<p><a href="http://kod.djpw.cz/vybb">Ukázka</a> pro všechny prohlížeče.</p>

<p>Pozor, zápis se sloučením všech selektorů k jedné deklaraci nebude fungovat. Prohlížeče si <i>vylámou zuby</i> na selektorech konkurence a <b>styly se neaplikují</b>.</p>

<pre><code>::-webkit-input-placeholder, 
:-moz-placeholder, 
::-moz-placeholder, 
:-ms-input-placeholder {
  /* společný styl, <b>nebude fungovat</b> */ 
}</code></pre>


<h2 id="jako-popisek">Placeholder jako popisek</h2>

<p>Použití <code>placeholder</code>u místo popisku formuláře je vždy dobré zvážit. Může se stát, že uživatel klikne do políčka dříve, než si přečte a zapamatuje, co tam má vyplnit.</p>

<p>Tím se může dostat do dost svízelné situace, kdy se už k popisku dostane jen nepohodlným <b>obnovením celé stránky</b>.</p>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li>Implementace <code>placeholder</code>u pro starší prohlížeče v jQuery: <a href="http://scotch.io/quick-tips/making-html5-placeholder-input-fields-cross-browser-with-jquery">Making HTML5 Placeholder Input Fields Cross-Browser with jQuery</a></li>
  <li>Řešení stylovatelnosti ve staré Opeře: <a href="http://my.opera.com/community/forums/topic.dml?id=1279012&t=1392458099&page=1#comment11456462">How to style the &lt;input> placeholder?</a></li>
  <li><a href="http://placeholdem.jackrugile.com/">Animovaný placeholder</a></li>
</ul>