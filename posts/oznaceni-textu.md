---
title: "Označení textu kliknutím"
headline: "Označení kódu nebo textu po kliknutí"
description: "Jak označit text nebo zdrojový kód jedním kliknutím. Je to vůbec rozumné?"
date: "2013-11-11"
last_modification: "2013-11-12"
status: 1
tags: ["hotova-reseni", "js", "napady"]
format: "html"
---

<p>Na <b>webových stránkách o programování</b> nebo u webových služeb, které nabízejí <b>kód pro vložení na vlastní web</b>, se můžeme setkat s chováním, kdy se celý kód označí po <b>jediném kliknutí</b> na něj.</p>

<h2 id="textarea">Označení celého textu po 1 kliknutí</h2>
<p>V případě, že se text umístí do <code>&lt;textarea></code>, stačí pouhé vyvolání <code>select</code>u po kliknutí (<code>onclick</code>).</p>

<div class="live">
  <textarea onclick="this.select()" cols="30" rows="3">Po kliknutí se vše označí.</textarea>
</div>

<h2 id="kod">Označení celého obsahu <code>&lt;div></code>u</h2>
<p>Nemá-li obsah k <b>označení</b> vypadat jako formulářové pole, první možnost je <code>&lt;textarea></code> <a href="/vzhled-formularu#inputy">přestylovat</a> do podoby běžného obsahu a opět využít <code>this.select()</code>.</p>

<p>V případě, že se má jednat o <b>běžný neformulářový element</b>, nabízí se:</p>

<h3 id="selection">Vlastnost <code>selection</code></h3>
<p>Pro získávání <b>vybraného textu</b>, ale i jeho označování slouží funkce <code>selection</code>. Použití označování obsahu se výrazně <b>liší napříč prohlížeči</b>.</p>

<div class="live">
  <script>
    function oznacit(el) {
      /* Kód pro Internet Explorery */
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
      } 
      /* Kód pro ostatní prohlížeče */
      else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(el);
        window.getSelection().addRange(range);
      }
    }
  </script>
  <pre onclick="oznacit(this)"><code>Kód se po kliknutí označí.</code></pre>
</div>

<h3 id="contenteditable">Použít <code>contenteditable</code></h3>
<p>Teoreticky by ještě šlo využít toho, že pokud z elementu uděláme <a href="/uprava-stranky-designmode">editovatelný obsah</a>, můžeme nad ním využívat funkci <code>selectAll</code>. Ale použití <code>selection</code> se mi zdá rozumnější.</p>
<div class="live">
  <script>
    function oznacitEditable() {      
      document.execCommand('selectAll', false, null);
    }
  </script>
  <pre contenteditable="true" onclick="oznacitEditable(this)"><code>Po kliknutí se vše označí.</code></pre>
</div>

<h2 id="vychozi-chovani">Výchozí chování</h2>
<p>Při jakékoliv funkci, která <b>mění výchozí chování</b> prohlížeče, je třeba myslet na to, zda nenadělá více <b>škody</b> než užitku.</p>
<p>Co se týče označování textu, tak je běžné, že:</p>
<ul>
  <li>jedno kliknutí neudělá <b>nic</b>,</li>
  <li>dvojklik označí <b>slovo</b>,</li>
  <li>trojklik označí <b>odstavec</b>.</li>
</ul>

<p>Zavádění označování po jednom kliknutí či dvojkliku, tedy výchozí chování naruší. Mimo jiné zjednodušení výběru textu zcela <b>znemožní používat dvojklik</b> pro označení slova — tato <b>nepěkná věc</b> je k vidění třeba u kódů <a href="http://doc.nette.org/cs/installation">Nette dokumentace</a>.</p>
<p>Proto je potřeba zvážit, zda v označovaného kódu/textu nebude někdo chtít <b>označovat obvyklým způsobem</b>.</p>