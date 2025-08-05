---
title: "Detekce zapnutého JavaScriptu"
headline: "Zapnutý a vypnutý JavaScript"
description: "Jak na webové stránce detekovat zapnuté nebo vypnuté skriptování."
date: "2013-06-19"
last_modification: "2013-06-20"
status: 1
tags: ["hotova-reseni", "js", "napady"]
format: "html"
---

<p>Při psaní webové aplikace, kde se <b>používá JavaScript</b>, může být vhodné jeho <b>přítomnost detekovat</b> a tu informaci umět přenášet na server (např. do <b>PHP skriptu</b>).</p>



<h2 id="klient">HTML a CSS</h2>



<h3 id="noscript">Značka <code>&lt;noscript></code></h3>
<p>V HTML existuje značka <code>&lt;noscript></code>, jejíž obsah se zobrazí při vypnutém skriptování.
  
<pre><code>&lt;noscript>
	&lt;p>Zapněte si JavaSript!
&lt;/noscript></code></pre>





<p>Pokud se do této značky umístí třeba tag <code>&lt;body></code> (nebo nějaký jiný <a href="/stylovani-body">obal celé stránky</a>) a bude mít třídu <code>.no-js</code>, otevírá se možnost všechny styly, co se mají projevit při vypnutém JS, začínat právě „<code>.no-js</code>“.</p>
  
<p>Značka <code>&lt;body></code> má <a href="/html-znacky#volitelne">volitelnou</a> počáteční i uzavírací značku, takže se není třeba trápit s tím, že by se sama neotevřela.</p>
  

<h3 id=js>JavaScript</h3>
<p>Obrácený postup je naopak JavaScriptem přidat obalovému elementu třídu „<code>.js</code>“; popřípadě element do HTML zapsat s „<code>.no-js</code>“ a tu mu skriptem odebrat.

<pre><code>&lt;body class="no-js">
&lt;script>document.body.className = ''&lt;/script></code></pre>






<p>U tagu <code>&lt;body></code> je výhodné, že má volitelnou počáteční i koncovou značku, není třeba tedy řešit nějaké otevírání/uzavření, oboje umí udělat sám. Na začátku stránky tak lze použít i:
  
<pre><code>&lt;script>document.write("&lt;body class=js>")&lt;/script></code></pre>



<p>Konstrukce <code>document.write</code> je způsob, jak vypisovat obsah stránky, který má být přístupný jen s JS.

<h3 id="css">Použití v CSS</h3>
<p>Využití třídy <code>.js</code> nebo naopak <code>.no-js</code> je prosté:
<pre><code>.js .schovat-pri-js {display: none}</code></pre>




<p>Nebo…
  
  
<pre><code>.zobrazit-bez-js {display: none}
.no-js .zobrazit-bez-js {display: block}</code></pre>





<h2 id="server">Na straně serveru</h2>
<p>Serverový skript se <b>nemá jak spolehlivě dozvědět</b> o (ne)zapnutém JS. Dát mu tuto informaci možné je, ale musí se použít oklika z řešeních výše. Například:

<ol>
<li>Ihned JavaScriptem/<code>&lt;noscript></code>em přesměrovat stránku na URL s <code>?js=ano</code>.
<pre><code>&lt;noscript>
  &lt;meta http-equiv="refresh" content="1;URL=?js=ne">
&lt;/noscript></code></pre>
<p>Nebo v JS:
<pre><code>&lt;script>window.location = "?js=ano"&lt;/script></code></pre>
  
<p>Po zjištění je nutné <b>přesměrování odstranit</b>, jinak vznikne nekonečná smyčka.

  <li>Uložit pomocí JS cookie a při následném načtení nějaká stránky kontrolovat její existenci.
  <li><a href="/ajax#pingnout">Pingnout</a> serverový skript JavaScriptem/<code>&lt;noscript></code>em.
</ol>

<p>Zjištění <b>zapnutého JavaScriptu v PHP</b> potom bude fungovat na základě kontroly <code>$_GET["js"]</code>, popř. <code>$_COOKIE["js"]</code>.