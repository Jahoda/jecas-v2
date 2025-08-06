---
title: "Responsivní komentáře"
headline: "Responsivní komentáře"
description: "Jak některé části stránky načítat jen při určité velikosti obrazovky."
date: "2013-11-29"
last_modification: "2013-12-13"
status: 1
tags: ["css", "js", "responsive"]
format: "html"
---

<p>V případě, že při tvorbě <a href="/mobilni-web">responsivního webu</a> skrýváme větší množství obsahu přes CSS (nepoužijeme <b>detekci na straně serveru</b>), většinou to nepřinese takovou výkonovou úsporu, jakou by mohlo v případě, že by se zbytečný kód <b>nevyhodnocoval</b>.</p>

<p>Typicky třeba <b>obrázky</b> vložené značkou <code>&lt;img></code> se načtou, ať mají třeba <code>display: none</code>. Podobně v některých prohlížečích budou <a href="/opozdene-nacteni#css">stažena obrázková pozadí</a> skrytých elementů. Taktéž <b>nepotřebné JS soubory</b> budou stále ke stránce připojeny.</p>


<h2 id="responsive-comments">ResponsiveComments</h2>
<p><a href="http://responsivecomments.com/" class="button">Web</a></p>

<p>Nástroj <b>ResponsiveComments</b> se tento problém snaží řešit tak, že se obsah obalí do <code>&lt;div></code>u s nějakou podmínkou a obsah se <i>skryje</i> do HTML komentáře. Pokud se podmínka splní, JavaScript obsah komentáře <b>přidá</b> do stránky.</p>

<pre><code>&lt;div data-responsive-comment-media="(min-width: 769px)">
  &lt;!-- &lt;div>Obsah se zobrazí jen při splnění podmínky ↑.&lt;/div> -->
&lt;/div></code></pre>

<p>Dle mého názoru je tento <b>postup na hlavu postavený</b>, protože veškerý obsah bude ve skutečnosti <b>v komentáři</b> (tj. pro <b>vyhledávače</b> a návštěvníky <b>bez JavaScriptu</b> nepřístupný.)</p>

<h2 id="lepsi-reseni">Lepší řešení</h2>
<p>Naštěstí existují různá řešení, jak vytvořit přístupný obsah, který se při zapnutém JavaScriptu <b>nebude vyhodnocovat</b>.</p>

<h3 id="noscript">Značka <code>&lt;noscript></code></h3>
<p>Při zapnutém skriptování se obsah ignoruje, ale není problém se k němu v JS dostat a <b>vložit ho viditelně</b> do stránky. Tedy kromě <b>IE 7</b>, kde se dá maximálně vydolovat jeho <b>atribut</b>.</p>

<h3 id="script">Skript s nesmyslným <code>type</code>m vypsaný skriptem</h3>
<p><b>Chamurappi</b> <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=3&topic=153269">přišel</a> na to, že pokud se kolem obsahu vypíše značka <code>&lt;script></code> s <a href="/template#js-type-nesmysl">nesmyslným MIME typem</a>, kterou ale vypíše JavaScript, takový obsah se <b>nezpracuje</b>, půjde <b>napříč prohlížeči</b> obnovit a bez podpory JS se kolem něj značka nevypíše, takže bude <b>normálně viditelný</b>.</p>

<pre><code>&lt;script>document.write("&lt;script type='text/skryt'>")&lt;/script>
&lt;p>Obsah skrytý JavaScriptem.&lt;/p>
&lt;script>document.write("<\/script>")&lt;/script></code></pre>

<h3 id="template">Značka <code>&lt;template></code></h3>
<p>V některých prohlížečích už <a href="/template">značka <code>&lt;template></code></a> nyní funguje, je otázka, jak se k jejímu obsahu budou stavět <b>vyhledávače</b>.</p>