---
title: "Označení termínu/výrazu v HTML"
headline: "HTML definice termínu"
description: "HTML značka <code>&lt;dfn></code> slouží pro vyznačení slovního spojení termínu/výrazu."
date: "2015-06-23"
last_modification: "2015-06-24"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Používají-li se v textu stránky <b>odborné termíny</b> s vysvětlením, existuje pro ně speciální sémantická značka <code>&lt;dfn></code> (název pochází z anglického <i lang="en">definition</i>).</p>

<p>Jedná se o řádkový element s <a href="/html-znacky#povinne">povinnou</a> počáteční i koncovou značkou, zpravidla se zobrazuje <dfn class="live">kursivou</dfn> (<a href="/font#style"><code>font-style: italic</code></a>).</p>

<p>Existují různé způsoby, jak se značka <code>&lt;dfn></code> používá.</p>





<h2 id="oznaceni">Prosté označení termínu</h2>

<p>Termín se obalí značkou <code>&lt;dfn></code> a jako jeho definice se bude chápat nejbližší nadřazený odstavec, definiční seznam nebo nějaký z tzv. sekčních elementů (<code>&lt;article></code>, <code>&lt;aside></code>, <code>&lt;nav></code>, <code>&lt;section></code>).</p>

<p>Příklad:</p>

<pre><code>&lt;p>
 &lt;<b>dfn</b>>Fytopuf&lt;/<b>dfn</b>> je něco jako kládoblah, ale trochu měkčí.
&lt;/p></code></pre>







<h2 id="title">Vysvětlení termínu v <code>title</code></h2>

<p>Další použití počítá s umístěním vysvětlení termínu do obecného HTML atributu <code>title</code>.</p>

<pre><code>&lt;p>
  Doporučoval bych vytvořit web o 
  &lt;<b>dfn</b> title="něco jako kládoblah, ale trochu měkčí">
    fytopufu
  &lt;/<b>dfn</b>>.
&lt;/p></code></pre>







<p>Bohužel atribut <code>title</code> je problematický u <b>dotykových zařízení</b>, kde je problematické ho u elementu <b>zobrazit</b>.</p>

<p>Napomoci tomu může špetka JavaScriptu, která <code>title</code> odkryje po kliknutí na element a obsah <code>title</code> zobrazí v závorce.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/uwnb">Příklad zobrazení obsahu <code>title</code> po kliknutí</a></li>
  </ul>
</div>


<h2 id="abbr">Kombinace s <code>&lt;abbr></code></h2>

<p>Značka <code>&lt;abbr></code> z anglického <i lang="en">abbreviation</i> (česky <i>zkratka</i>) slouží k vysvětlení písmen symbolisujících zkratku.</p>

<pre><code>&lt;p>
  Učím se používat 
  &lt;abbr title="Hypertext Markup Language">HTML&lt;/abbr>
&lt;/p></code></pre>

<p>Značku <code>&lt;abbr></code> je možné ještě obalit do <code>&lt;dfn></code>. Titulek zkratky se potom bude chápat jako definice.</p>


<pre><code>&lt;p>
  Učím se používat 
  &lt;dfn>
    &lt;abbr title="Hypertext Markup Language">HTML&lt;/abbr>
  &lt;/dfn>
&lt;/p></code></pre>










<h2 id="odkaz">Odkaz na termín</h2>

<p>Termínu lze přiřadit <code>id</code> a následně se na něj odkazovat:</p>

<pre><code>&lt;p>
  &lt;<b>dfn</b> id="<i>fytopuf</i>">Fytopuf&lt;/<b>dfn</b>> je 
  něco jako kládoblah, ale trochu měkčí.
&lt;/p>
…
&lt;p>
  Doporučoval bych vytvořit web 
  o &lt;a href="#<i>fytopuf</i>">fytopufu&lt;/a>.
&lt;/p></code></pre>












<h2 id="praxe">Použití <code>&lt;dfn></code> v praxi</h2>

<p>V praxi se element <code>&lt;dfn></code> moc nepoužívá, protože nepřináší pro návštěvníky nějaký významný rozdíl oproti jiným značkám pro zvýraznění.</p>

<p>Teoreticky by mohl pomoci <b>robotům vyhledávačů</b> zpracovávajícím obsah stránek pro jeho lepší pochopení.</p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>HTML
    Living Standard: <a href="https://html.spec.whatwg.org/multipage/semantics.html#the-dfn-element">The <code>dfn</code> element</a></li>
  
  <li>Mírně související: <a href="http://www.sitepoint.com/accessible-footnotes-css/">Accessible Footnotes with CSS</a> – jak na přístupné poznámky pod čarou</li>
</ul>