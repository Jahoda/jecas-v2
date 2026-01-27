---
title: "Rozbalování a sbalování obahu v CSS"
headline: "Rozbalování a sbalování obahu v CSS"
description: "Jak skrývat a odkrývat části stránky v čistém CSS bez jakéhokoliv JavaScriptu."
date: "2014-01-15"
last_modification: "2014-01-15"
status: 1
tags: ["css", "hotova-reseni", "prepinani-vzhledu"]
format: "html"
---

<p>Když chceme na stránce vytvořit obsah, který <b>nemá být ihned viditelný</b>, existuje relativně prosté řešení <a href="/zobrazit-skryt">skrývání a odkrývání v JavaScriptu</a>, které díky <a href="/animace">animacím</a> může být i <a href="/animace-skryt">plynulé</a> (ideální je skriptem jen <a href="/prepinani-trid">přepínat třídy</a>).</p>

<p>Kromě toho je možné od <b>IE 9</b> tuto funkci zajistit <b>čistě v CSS</b>.</p>

<div class="live">
<style>
/* Přepínání */
input.rozbalovac {display: none;} /* skrytí inputu */
input[type=checkbox]:checked + .rozbalovaci .obsah {display: block} /* zobrazení obsahu */

.rozbalovaci > .obsah {display: none} /* skrytí obsahu */

/* Styl přepínátka */
.rozbalovaci > label {
  display: block;
  cursor: pointer;
  background: #0D6AB7;
  color: #fff;
  padding: .5em;
}
input[type=checkbox]:checked + .rozbalovaci label {background: #1081DD;}

.rozbalovaci > label:before {content: "+"; background: #fff; color: #000; padding: 0 .3em; margin-right: .5em; border-radius: 3px}
input[type=checkbox]:checked + .rozbalovaci label:before {content: "−"}

.rozbalovaci > .obsah {background: #fff; padding: .5em}
</style>
<input type="checkbox" class="rozbalovac" id="box1">
<div class="rozbalovaci">
  <label for="box1">Klikací nadpis obsahu</label>
  <div class="obsah">
    <p>Obsah, který se objeví po kliknutí.</p>
  </div>
</div>
</div>

<p><a href="https://kod.djpw.cz/ifbb">Živá ukázka</a></p>

<h2 id="selektor-checked">Selektor <code>:checked</code></h2>
<p>Řešení využívá <a href="/css-selektory#checked">selektoru zaškrtnutí</a> (proto je funkčnost limitována tímto selektorem na <b>IE 9+</b>), kdy se před skrývaný <code>&lt;div></code> umístí <a href="/input#type-checkbox"><code>&lt;input type=checkbox></code></a>, který v závislosti na svém <b>zaškrtnutí</b> požadovaný obsah skryje/zobrazí.</p>

<p>Totožného principu lze využít i k:</p>
<ul>
  <li><a href="/css-filtrovani-dat">jednoduchému filtrování dat</a> nebo k </li>
  <li><a href="/stylovani-checked">zajímavějšímu stylu zaškrtávátek</a>.</li>
</ul>

<p>Zmíněný <code>checkbox</code> je potom <b>skrytý</b> a <i>ovládá se</i> značkou <a href="/label-for"><code>&lt;label></code> s atributem <code>for</code></a>. Symboly plus a <a href="/ceska-klavesnice#kody">mínus</a> jsou vytvořeny <a href="/content-attr">atributem <code>content</code></a>, nicméně může se jednat o prosté <code>&lt;span></code>y, které snadno v <code>&lt;label>u</code> zaměříme:</p>

<pre><code>input[type=checkbox]:checked + .rozbalovaci label > <b>span</b> {}</code></pre>

<h2 id="fallback">Fallback pro starší IE</h2>
<p>Záleží-li nám i na starších prohlížečích (<b>IE 8</b> a starší), nezbývá než použít JS řešení nebo doplnit podporu <a href="/css3-ie">CSS 3 selektorů v IE</a>.</p>