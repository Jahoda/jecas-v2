---
title: "Textarea"
headline: "Textarea"
description: "HTML značka <code>&lt;textarea></code> – jaká jsou její specifika."
date: "2014-06-24"
last_modification: "2014-07-05"
status: 1
tags: ["formulare", "html", "html-tagy"]
format: "html"
---

<p>Pro psaní delších textů na webu:</p>

<ul>
  <li>článků,</li>
  <li>komentářů,</li>
  <li>diskusních příspěvků,</li>
  <li>zpráv do chatu</li>
</ul>

<p>A pro další případy, kdy potřebujeme <b>více řádků</b> editovatelného textu, se používá značka <code>&lt;textarea></code> (v překladu textová oblast).</p>

<div class="live">
  <textarea>Obsah</textarea>
</div>


<h2 id="atributy">Atributy</h2>

<p>Většinu atributů má <code>&lt;textarea></code> <a href="/input#obecne-atributy">společných</a> se značkou <code>&lt;input></code>.</p>

<p>Textarea nemá atribut <code>value</code>, obsah se zadává mezi počáteční a koncovou značku (počáteční i koncová značka je <a href="/html-znacky#povinne">povinná</a>).</p>

<pre><code>&lt;textarea>
  Obsah
&lt;/textarea></code></pre>


<dl>
  <dt id="name"><code>name</code></dt>
  <dd>Jméno políčka, podle kterého se dá následně zpracovávat na serveru.</dd>
  
  <dt id="cols"><code>cols</code></dt>
  <dd>Počet <i>sloupců</i>. V podstatě nastavuje šířku pole. Je možné nahradit CSS vlastností <code>width</code>.</dd>
  
  <dt id="rows"><code>rows</code></dt>
  <dd>Počet <i>řádků</i>. Stanovuje výšku políčka. Je možné nahradit CSS vlastností <a href="/height"><code>height</code></a>. Někdo tyto atributy důsledně vyplňuje kvůli <b>zobrazení bez kaskádových stylů</b>.</dd>  
  
  <dt id="wrap"><code>wrap</code></dt>
  <dd>Atribut <code>wrap</code> může nabývat hodnoty <code>soft</code> (výchozí) a <code>hard</code>. Použití <code>wrap=hard</code> spolu s omezením počtu znaků na řádek (atribut <code>cols</code>) by mělo zajistit, že v <code>&lt;textarea></code> nemůže vzniknout řádek delší než hodnota v <code>cols</code>. Podpora napříč prohlížeči je špatná. Navíc vždy takové ošetření musíme dělat na straně serveru. <a href="/zalamovani-slov">Zalamovat slova</a> jde i v CSS přes <code>word-wrap: break-word</code>.</dd>    
  
  <dt id="disabled"><code>disabled</code></dt>
  <dd>Pole je úplně zablokované. Nejde na něm vyvolat <code>onclick</code> a neodešle se na server.</dd>  
  
  <dt id="autofocus"><code>autofocus</code></dt>
  <dd>Po načtení stránky dá políčku rovnou <code>focus</code> (<a href="http://kod.djpw.cz/zbeb">ukázka</a>). Osobně takové chování nemám příliš rád, neboť <b>přesun kursoru</b> do pole typicky <b>zablokuje ovládání klávesami</b>.</dd>  
  
  <dt id="placeholder"><code>placeholder</code></dt>
  <dd>Předvyplní políčko hodnotou, která <b>po aktivování zmizí</b>. Zároveň se nebude odesílat na server. Detailní popis <a href="/placeholder">atributu <code>placehodler</code></a> je na samostatné stránce.</dd>  
  
  <dt id="spellcheck"><code>spellcheck</code></dt>
  <dd>Zapne nebo vypne <b>kontrolu pravopisu</b>.</dd>   
  
  <dt id="maxlength"><code>maxlength</code></dt>
  <dd>Maximální počet znaků, co lze do políčka napsat.</dd>
  
  <dt id="required"><code>required</code></dt>
  <dd>Pole musí být vyplněno.</dd>  
</dl>



<h2 id="zmena-velikosti">Změna velikosti</h2>

<p>Kromě <b>IE</b> umí prohlížeče automaticky měnit velikost <code>&lt;textarea></code> přes tažením za okraje. Zakázat to jde CSS vlastností <a href="/resize"><code>resize</code></a>.</p>

<h2 id="js">Přístup v JavaScriptu</h2>

<p>Aktuální obsah pole se nachází ve vlastnosti <code>value</code>.</p>

<pre><code>var textarea = document.getElementsByTagName("textarea")[0];
alert(textarea.value);</code></pre>

<p>V případě, že je v poli nějaký předvyplněný text, je možné ho získat i přes <a href="/innerhtml"><code>innerHTML</code></a>. Také jde obsah do <code>innerHTML</code> nastavit, ovšem po jakékoliv editaci už nebude vidět – <b>přebije</b> ho <code>value</code>, která se potom i odešle na server.</p>

<p><a href="http://kod.djpw.cz/bceb">Ukázka rozdílů <code>innerHTML</code> a <code>value</code></a></p>

<p>Původní hodnota (<code>value</code>) v době načtení stránky je dostupná skrz JS vlastnost <code>defaultValue</code>.</p>

<pre><code>alert(textarea.<b>defaultValue</b>);</code></pre>



<h2 id="formatovani">Formátování</h2>

<p>Textarea jde docela dobře stylovat (<a href="http://kod.djpw.cz/fceb">ukázka</a>).</p>

<p>Častým přáním je v ní odlišně zvýrazňovat jednotlivá slova. To běžně možné není. Je nutné použít <a href="/vlastni-wysiwyg">element s <code>contenteditable</code></a>.</p>


<h2 id="vychozi-posuvnik">Výchozí posuvník v IE</h2>

<p>V <b>Internet Exploreru</b> má <code>&lt;textarea></code> automaticky svislý posuvník. Zbavit se ho můžeme nastavení <code>overflow: auto</code>. <a href="http://kod.djpw.cz/cceb">Ukázka</a>.</p>


<h2 id="pocet-znaku">Počet znaků a slov</h2>

<p>Jak počítat <a href="/pocet-znaku">počty znaků a slov</a> je popsáno na samostatné stránce.</p>


<h2 id="neinterpretovani-html">Neinterpretování HTML značek</h2>

<p>Zvláštní vlastnost textového pole tkví v jisté podobnosti se značkou <code>&lt;xmp></code>. Do <code>&lt;textarea></code> je totiž možné stejně tak vepsat prakticky libovolné HTML bez převádění na entity, aniž by se provedlo.</p>

<div class="live">
  <textarea name="" id="" cols="30" rows="3">
    <h1>Nadpis</h1>
    <p>Odstavec.</p>
  </textarea>
</div>

<p>Jediný problém je další <code>&lt;textarea></code>, přesněji řečeno její koncová značka. <a href="http://kod.djpw.cz/dceb">Ukázka <code>&lt;textarea></code></a> / <a href="http://kod.djpw.cz/eceb">ukázka značky <code>&lt;xmp></code></a>.</p>

<p>Někdy se <code>&lt;textarea></code> také používá pro <a href="/oznaceni-textu">pohodlné označování textu</a>.</p>