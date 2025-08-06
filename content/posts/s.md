---
title: "Přeškrtnutí značkou S"
headline: "Škrtnutí značkou <code>&lt;s></code>"
description: "Značka <code>&lt;s></code> slouží k označení obsahu, který už je zastaralý nebo není relevantní."
date: "2014-10-31"
last_modification: "2014-10-31"
status: 1
tags: ["hotova-reseni", "html", "html-tagy"]
format: "html"
---

<p>HTML element <code>&lt;s></code> má počáteční i koncovou značku <a href="/html-znacky#povinne">povinnou</a>. Jedná se o značku řádkovou – podobně jako například <code>&lt;span></code>. Nemá <b>specifické atributy</b>, podporuje pouze ty <i>globální</i>/obecné (<code>title</code>, <code>class</code>, <code>id</code> a podobně).</p>

<pre><code>&lt;s>Obsah&lt;/s></code></pre>

<p>Funguje snad ve všech prohlížečích, ve výchozím stylu je obsah <b>přeškrtnutý</b> (<code>text-decoration: line-through</code>).</p>

<div class="live">
  <p><s>Obsah značky <code>&lt;s></code> je přeškrtnutý.</s></p>
</div>


<h2 id="vyuziti">Využití</h2>

<p>Značka <code>&lt;s></code> má <b>sémantický význam</b> pro označení obsahu, který je již neaktuální či nerelevantní. Nabízí se například pro označení původní ceny před slevou.</p>

<pre><code>&lt;p>
  &lt;s>Fytopuf stojí 900 Kč.&lt;/s>
&lt;/p>
&lt;p>
  Fytopuf je nyní jen za 800 Kč.
&lt;/p></code></pre>

<p><a href="https://kod.djpw.cz/rahb">Ukázka</a></p>




<h2 id="podobne">Podobné značky</h2>

<p>Repertoár HTML značek obsahuje ještě další dvě, které mají stejný výchozí styl (jsou přeškrtnuté).</p>

<ul>
  <li><code>&lt;strike></code></li>
  <li><code>&lt;del></code></li>  
</ul>

<p>Značka <code>&lt;strike></code> je tzv. <i>obsolete</i> (zastaralá/překonaná), protože podle HTML specifikace nemá na rozdíl od <code>&lt;s></code> sémantický význam.</p>

<p>Element <code>&lt;del></code> potom slouží pro označení obsahu, který <b>byl ze stránky vymazán</b>. Má zvláštní atributy <code>datetime</code> (pro označení času smazání) a <code>cite</code> pro uvedení URL zdůvodňující <b>důvod smazání</b>.</p>



<h2 id="rozdil">Rozdíl <code>&lt;s></code> a <code>&lt;del></code></h2>

<p>Do jisté míry se dá říci, že obě značky jsou si významově <b>hodně podobné</b>. Asi největší odlišnost je, že značka <code>&lt;s></code> by se na rozdíl od <code>&lt;del></code> neměla používat ke znázorňování změn stránky – k tomu je určena právě značka <code>&lt;del></code> v kombinaci s jejím protějškem – značkou <code>&lt;ins></code>.</p>



<h2 id="sikme-preskrtnuti">Šikmé přeškrtnutí</h2>

<p>Pokud se nespokojíme s výchozím přeškrtnutím přes <code>text-decoration: line-through</code>, můžeme si udělat přeškrtnutí vlastní. Třeba absolutně posicovaným <code>border</code>em přes obsah.</p>

<p>Šikmého škrtnutí dosáhneme <a href="/rotace">otočením</a> čáry o několik stupňů.</p>

<div class="live"><style>
.sikme s {
    position: relative;
    text-decoration: none;
}

.sikme s:before {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 50%;
    border-top: 1px solid #000;
    -webkit-transform:rotate(-5deg);
    -moz-transform:rotate(-5deg);
    -ms-transform:rotate(-5deg);
    -o-transform:rotate(-5deg);
    transform:rotate(-5deg);
}
</style>
<p class="sikme"><s>Fytopuf stojí 900 Kč</s></p></div>

<p><a href="https://kod.djpw.cz/sahb">Živá ukázka</a></p>

<p>Když kromě <code>:before</code> použijeme i <code>:after</code>, dá se snadno docílit <b>dvojitého škrtnutí</b>.</p>

<p><a href="https://kod.djpw.cz/tahb">Živá ukázka</a></p>


<h3 id="starsi-prohlizece">Starší prohlížeče</h3>

<p>Co se stane v prohlížečích, co <b>neznají</b> <i>transformaci</i> pro otočení (<b>IE 8</b>)? Přeškrtnutí bude zkrátka <b>rovné</b>, což ale nemusí tolik vadit.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="https://html.spec.whatwg.org/multipage/semantics.html#the-s-element">The <code>s</code> element</a></li>
  
  <li><a href="http://devdocs.io/html/element/s">DevDocs: <code>&lt;s></code></a></li>
</ul>