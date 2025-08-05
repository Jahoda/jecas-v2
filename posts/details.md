---
title: "HTML značka <details>"
headline: "HTML značka <code>&lt;details></code>"
description: "K čemu slouží HTML značky <code>&lt;details></code> a <code>&lt;summary></code>."
date: "2014-09-01"
last_modification: "2014-09-02"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Stručně řečeno fungují tyto značky k <a href="/prepinani-vzhledu">rozklikávání obsahu</a> bez nutnosti používat JavaScript.</p>

<p><img src="/files/details/details-ukazka.gif" alt="Ukázka použití details a summary" class="border"></p>



<h2 id="pouziti">Použití</h2>

<pre><code>&lt;details <b>open</b>>
  &lt;summary>Název položky&lt;/summary>
  &lt;p>Samotný obsah&lt;/p>
&lt;/details></code></pre>

<p>Značka <code>&lt;details></code> má atribut <code>open</code>, který zajistí <b>automatické rozbalení</b> po načtení stránky.</p>

<p>Element <code>&lt;summary></code> je potom <b>volitelný</b> a umožňuje stanovit text (nadpis) pro rozbalení obsahu. Zajímavostí je, že při jeho <b>absenci</b> se sice vyrobí jakýsi automatický <code>&lt;summary></code> s textem <i>Podrobnosti</i> (v závislosti na jazyku prohlížeče), ale <b>není možné ho stylovat</b>.</p>



<h2 id="podpora">Podpora</h2>

<p>Zamýšleným způsobem fungují tyto značky zatím pouze ve <b>Webkitu</b> (od versí <b>Opera 23</b>, <b>Chrome 27</b>, <b>Safari 6.1</b>).</p>

<p>Existuje i přímý <a href="https://gist.github.com/remy/370590">fallback</a> pro starší prohlížeče.</p>



<h2 id="ukazka">Ukázka</h2>

<div class="live">
<details open>
  <summary>Název položky</summary>
  <p>Samotný obsah</p>
</details>
</div>
<p><a href="http://kod.djpw.cz/zifb">Samostatná živá ukázka</a> (ukázka s <a href="http://kod.djpw.cz/ajfb">JS fallbackem</a>)</p>



<h2 id="vyuziti">Využití</h2>

<p>Kromě úkolů, které obvykle používají JS řešení <a href="/prepinani-trid">přepínání CSS třídy</a> nebo postupu <a href="/css-rozbalovani">zneužívající <code>checkbox</code></a>, vypadá zajímavě především <b>libovolné zanořování</b> (<a href="http://kod.djpw.cz/bjfb">ukázka</a>).</p>

<p>Přepínání mezi souvisejícími bloky tak, aby se <a href="/zobrazit-skryt#rozklikavani">ostatní zavřely</a>, zatím možné není.</p>

<p>Jelikož se v nepodporovaných prohlížečích značky <code>&lt;details></code> a <code>&lt;summary></code> <b>nijak neprojeví</b> (chovají se jako <a href="/vlastni-html-znacky">vlastní HTML značky</a> – např. v <b>IE 8</b> se musí skriptem pomoci, aby je šlo stylovat), nabízí se je používat s JS doplňkem pro <b>starší prohlížeče</b> už dnes.</p>

<p>Osobně bych to příliš <b>nedoporučoval</b> protože:</p>

<ol>
  <li>V <b>podporujících prohlížečích</b> se bude muset odstranit podpora, aby se používalo stejné – na JS nebo <code>checkbox</code>u závislé řešení.</li>
  
  <li>Zařídit <b>odkrývací/skrývací animaci</b> je momentálně dost omezené (jde maximálně animovat otevření – <a href="http://kod.djpw.cz/cjfb">ukázka</a>).</li>
</ol>




<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>Whatwg.org: <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#the-details-element">Specifikace</a></li>
  
  <li>Can I use: <a href="http://caniuse.com/#feat=details">Podpora v prohlížečích</a></li>
</ul>