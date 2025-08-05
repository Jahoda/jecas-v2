---
title: "ARIA atributy"
headline: "ARIA atributy"
description: "HTML atributy <code>aria-*</code> slouží k sémantickému vyznačení informací pro postižené uživatele."
date: "2015-04-11"
last_modification: "2015-05-10"
status: 1
tags: ["html", "html-atributy"]
format: "html"
---

<p>Zkratka ARIA ukrývá spojení <i>Accessible Rich Internet Applications</i> – v češtině to znamená něco jako „přístupné pokročilé internetové aplikace“ (doslovný překlad: přístupné <i>bohaté</i> internetové aplikace).</p>

<p>Někteří uživatelé webových stránek mohou mít nějaké <b>postižení</b>, které jim komplikuje používání webů. Pro snazší prohlížení stránek proto využívají různých <b>asistivních technologií</b> (například hlasové čtečky) – ty se snaží ze zdrojového kódu připravit něco, co bude pro <b>handicapovaného návštěvníka</b> lépe použitelné.</p>

<p>Ideální je vytvořit web rovnou tak, aby se <b>automaticky dobře používal postiženým lidem</b>. Bohužel čím složitější aplikace, tím obtížnější to je. K zlepšení použitelnosti „hodně <i>bohatých</i> aplikací“ se hodí právě <code>aria-*</code> atributy.</p>





<h2 id="atributy">Všechny ARIA atributy</h2>

<p>Celkem je <code>aria-*</code> atributů velké množství.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.w3.org/TR/wai-aria/states_and_properties#state_prop_def">Supported States and Properties</a> – seznam všech 35 <code>aria-*</code> atributů</li>
  </ul>
</div>

<p>Následující 4 mají nejčastější využití.</p>



<h2 id="label">Název <code>aria-label</code></h2>

<p>Hodí se pro přidání textového popisu/názvu k obsahu, jehož význam vyplývá z visuálního stylu, ale čistě v textu není.</p>

<p>Prvním případem jsou <b>obrázková tlačítka a ikony</b>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/obrazek-text">Text v obrázku</a> – přístupné řešení obrázkového textu</li>
  </ul>
</div>


<p>Pro ilustraci může posloužit následující tlačítko.</p>

<pre><code>.tlacitko {
  background: url(zavrit.png);
  width: 50px;
  width: 50px;
}</code></pre>

<pre><code>&lt;a href="" class="tlacitko">&lt;/a></code></pre>






<p>Pomocí HTML atributu <code>aria-label</code> mu půjde nastavit popisek na <i>Zavřít</i>.</p>

<pre><code>&lt;a href="" class="tlacitko" <b>aria-label</b>="Zavřít">&lt;/a></code></pre>



<p>Podobný postup se hodí i u použití <a href="/emoji">symbolů jako ikony</a>:</p>

<pre><code>&lt;button <b>aria-label</b>="Zavřít">
  ×
&lt;/button></code></pre>




<p>Pokud by tlačítko pro zavření obsahovalo samotný znak křížku <kbd>×</kbd> – na české klávesnici <a href="/ceska-klavesnice">jde zapsat</a> klávesovou zkratkou <kbd>Pravý Alt</kbd> + <kbd>)</kbd> – byl by jeho význam po přečtení <b>hlasovou čtečkou</b> nejasný.</p>

<p>Obsah atributu <code>aria-label</code> <b>nahradí</b> původní textový obsah značky.</p>





<h2 id="label">Název z jiného elementu <code>aria-labelledby</code></h2>

<p>Jako název (<i>label</i>) elementu jde použít i obsah elementu jiného, k tomu slouží atribut <code>aria-labelledby</code>, kterému se předá <code>id</code> zdroje.</p>



<p>Význam to má hlavně z hlediska <b>programátorské zásady DRY</b> (<i>Don't repeat yourself</i> – neopakujte se). Pokud už je vhodný popisek na stránce, jde jeho obsah využít místo kopírování téhož do <code>aria-label</code>.</p>

<p>Jako příklad užití se nabízí třeba označení povinných položek ve formuláři hvězdičkou.</p>

<pre><code>&lt;p>
  Položka označená * &lt;span id="<i>povinne</i>">je povinná&lt;/span>
&lt;/p>
&lt;label for="policko>
  Políčko &lt;span <b>aria-labelledby</b>="<i>povinne</i>">*&lt;/span>
&lt;/label>
&lt;input id="policko" required></code></pre>












<h2 id="describedby">Popis <code>aria-describedby</code></h2>

<p>Z jednoho elementu se odkazuje na ID elementu druhého, který ten první popisuje. Využití se dá najít u vysvětlujícího <b>popisu formulářového políčka</b>:</p>

<pre><code>&lt;label for="policko>
  Název pole
&lt;/label>
&lt;input id="policko" <b>aria-describedby</b>="<i>popisek</i>">
&lt;i id="<i>popisek</i>>Popisek políčka&lt;/i></code></pre>








<h2 id="hidden">Skrytý obsah <code>aria-hidden</code></h2>

<p>Je-li nějaký obsah hlavně <b>ilustračního významu</b> a nemá smysl, aby ho hlasová čtečka četla nebo není potřeba mu nastavovat jiný obsahu přes <code>aria-label</code>, atribut <code>aria-hidden</code> slouží k jeho <b>skrytí</b>.</p>

<p>Případ užití může být u ikon tvořených symboly, které jsou doplněny popisem.</p>



<pre><code>&lt;button>
  &lt;span <b>aria-hidden</b>="true">×&lt;/span>
  Zavřít
&lt;/button></code></pre>







<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Dev.Opera: <a href="https://dev.opera.com/articles/ux-accessibility-aria-label/">UX accessibility with aria-label</a></li>
  
  <li>W3C: <a href="http://www.w3.org/TR/wai-aria/">Accessible Rich Internet Applications</a></li>
</ul>