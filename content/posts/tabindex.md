---
title: "Tabindex"
headline: "Tabindex"
description: "Atribut <code>tabindex</code> slouží k uspořádání položek pro procházení klávesnicí."
date: "2014-09-13"
last_modification: "2014-09-13"
status: 1
tags: ["formulare", "html", "html-atributy"]
format: "html"
---

<p>Tabindex je universální – lze ho použít na <b>každém elementu</b>.</p>

<pre><code>&lt;div <b>tabindex="0"</b>>
&lt;/div></code></pre>



<h2 id="vyuziti">Využití</h2>

<p>Použití <code>tabindexu</code> jsou tři:</p>

<ol>
  <li><b>změna pořadí</b> procházení klávesou <kbd>Tab</kbd>,</li>
  <li><b>umožnění procházení</b>/<code>:focus</code>u,</li>
  <li><b>zabránění označení</b> <kbd>Tab</kbd>em</li>
</ol>



<h2 id="poradi">Změna pořadí</h2>

<p>Bez použití <code>tabindexu</code> se <i>Tabování</i> zachytí jen na určitých prvcích (<b>formuláře</b> a <b>odkazy</b>). Pořadí je potom řízeno umístěním jednotlivých prvků v <b>HTML kódu</b>.</p>

<p>Chceme-li toto pořadí upravit, což se v případě <a href="/chyby-formularu#klavesnice">nelogického pořadí</a> může hodit, začneme hodnoty <code>tabindex</code>u zvyšovat nad nulu (nula je u standardně <kbd>Tab</kbd>ovatelných elementů výchozí hodnota).</p>

<pre><code>&lt;input value="Druhý">
&lt;input <b>tabindex="1"</b> value="První">
&lt;input value="Třetí"></code></pre>

<p><a href="https://kod.djpw.cz/nqfb">Samostatná ukázka</a></p>

<p><i>Tabindex</i> se nemusí (a ani to není příliš vhodné) nastavovat všem položkám, ale jen těm, kterým chceme <b>zvýšit prioritu</b>.</p>

<p>Při řazení pomocí vyšší hodnoty <code>tabindex</code>u není nutné neustále hodnotu zvyšovat (ve smyslu 1, 2, 3, …), ale lze využít pravidla, že při stejné hodnotě se pořadí řídí <b>umístěním v kódu</b>.</p>

<p>V této ukázce proto s klidem můžeme použít jako hodnoty <code>tabindex</code>u jen samé jedničky (<a href="https://kod.djpw.cz/pqfb">ukázka</a>) místo:</p>

<pre><code>&lt;input value="Čtvrtý">
&lt;input tabindex="1" value="První">
&lt;input tabindex="<b>2</b>" value="Druhý">
&lt;input tabindex="<b>3</b>" value="Třetí"></code></pre>



<h2 id="umozneni">Umožnění procházení</h2>

<p>Pro elementy mimo <b>formulářové prvky a odkazy</b> způsobí přidání atributu <code>tabindex</code> schopnost se na element od<kbd>Tab</kbd>ovat nebo prvku udělit <code>focus</code>. To se hodí v případě, že chceme mít <i>klikací</i> <code>&lt;span></code> nebo <code>&lt;div></code> a umožnit ho <b>vybrat jen pomocí klávesnice</b>.</p>

<pre><code>&lt;div tabindex="0">
    Tabovatelný DIV
&lt;/div></code></pre>

<p>Hodnota <code>0</code> zajistí, že se prvek vloží do pořadí dle umístění v HTML kódu.</p>

<p><a href="https://kod.djpw.cz/qqfb">Ukázka</a></p>


<h2 id="zabraneni">Zabránění označení</h2>

<p>Poslední možnost je <code>tabindex</code> nastavit na zápornou hodnotu:</p>

<pre><code>&lt;input tabindex="<b>-1</b>" value="Nepůjde vybrat"></code></pre>

<p>U formulářových prvků mě využití moc nenapadá. Když se pole skryje (<code>display: none</code> nebo <code>visibility: hidden</code>) či zablokuje (atribut <a href="/input#disabled"><code>disabled</code></a>), tak se na něj dostat nedá. A jinak je poměrně žádoucí, aby se na prvek <b>dostat dalo</b>.</p>

<p>U <b>neformulářových</b> elementů to ale smysl dávat může.</p>

<p>Záporným <code>tabindex</code>em získá element možnost být <code>:focus</code>ován – z čehož plyne využití v CSS pomocí příslušného <a href="/css-selektory#uzivatelske-akce">selektoru <code>:focus</code></a>.</p>

<p>Rovněž v JavaScriptu jde elementu <code>focus</code> udělit.</p>

<pre><code>element.focus();</code></pre>

<p><a href="https://kod.djpw.cz/rqfb">Ukázka</a></p>