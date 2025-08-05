---
title: "Připojování událostí v JS"
headline: "Navázání událostí v JavaScriptu"
description: "Jaké existují postupy pro <i>navěšení</i> JavaScriptové události na element. Výhody a nevýhody různých řešení."
date: "2014-03-03"
last_modification: "2017-07-30"
status: 1
tags: ["js", "js-udalosti"]
format: "html"
---

<p>Chceme-li na stránce vykonat nějakou JS akci, zpravidla si vytvoříme funkci, která se ve vhodný okamžik (při spuštění vhodné události) spustí.</p>






<h2 id="html-atribut">HTML atribut</h2>

<p>Asi nejjednodušší možnost je použít HTML atribut.</p>

<pre><code>&lt;button <b>onclick</b>="akce()">
  Tlačítko
&lt;/button></code></pre>










<p><a href="http://kod.djpw.cz/tecb">Ukázka</a></p>

<p>Výhodné je, že z HTML kódu je ihned patrné, že se tlačítko používá pro spouštění JS akcí.</p>

<p>Někomu ale může přijít umisťování JS kódu do HTML jako <i>nečisté řešení</i>.</p>





<h3>Celé kusy JS</h3>
<p>Do <code>on*</code> atributů je možné psát i celé bloky kódu, to ale příliš nedoporučuji.</p>

<ol>
  <li>Takový kód není <b>znovupoužitelný</b>.</li>
  <li>Psaním do řetězce se ve většině editorů připravíme o barvení kódu. A nakonec si tím i <i>vyplácáme</i> jedny <a href="/uvozovky">uvozovky</a>.</li>
</ol>




<h2 id="odkaz">Pseudo-odkaz</h2>

<p>Pro <a href="/udalosti-mysi#kliknuti">klikací události</a> je možné využít běžný HTML odkaz:</p>

<pre><code>&lt;a href="<b>javascript:</b>akce()">
  Odkaz
&lt;/a></code></pre>

<p><a href="http://kod.djpw.cz/uecb">Ukázka</a></p>

<p>Puntičkářům se na tomto způsobu nebude líbit, že bez podpory JavaScriptu je na stránce <b>nefunkční odkaz</b>. Řešení je toto tlačítko při absenci JS <a href="/vypnuty-js">skrýt přes CSS</a>.</p>











<h2 id="vlastnosti">Nastavování vlastností</h2>

<p>První z možností, která odděluje HTML a JS kód, vypadá následovně. V HTML kódu se prvek, ke kterému připojíme událost, poznačí třeba pomocí <a href="/id-class"><code>id</code></a> (nebo se zajistí, aby se dal rozumně vybrat přes <a href="/queryselector"><code>querySelector</code></a>).</p>

<pre><code>&lt;button <b>id</b>="tlacitko">
  Tlačítko
&lt;/button></code></pre>









<p>Pod tento HTML kód se připojí skript, který si element (v tomto případě podle ID) najde a <b>nastaví mu událost</b>.</p>

<pre><code>// Najití elementu
var element = document.getElementById("tlacitko");
// Nastavení události
element.<b>onclick</b> = akce;
</code></pre>








<p><a href="http://kod.djpw.cz/vecb">Ukázka</a></p>

<p>Trochu ošemetné je, že nás může svádět napsat dle zvyku z HTML atributů něco jako:</p>



<pre><code>element.onclick = akce<b>()</b>;</code></pre>





<p>To většinou ale není žádoucí, protože jako událost chceme zpravidla připojit danou funkci a <b>ne její výsledek</b>, což by způsobily právě ty dvě závorky (funkce by se zavolala a do <code>onclick</code>u by se přidal její výsledek).</p>

<h3 id="vice-funkci">Více funkcí</h3>
<p>Má-li se po kliknutí (nebo jiné události) provést více funkcí, řeší se to zpravidla vytvořením <b>anonymní funkce</b>.</p>

<pre><code>element.onclick = function() {
  akce();
  akce2();
};</code></pre>











<p>Zde už je záměrem funkci <code>akce</code> a funkci <code>akce2</code> zavolat, proto ty <code>()</code>.</p>



<h2 id="set">Akce přes <code>setAttribute</code></h2>

<p>Připojit událost jde dále metodou <code>setAttribute</code>:</p>

<pre><code>element.setAttribute("onclick", "akce()");</code></pre>







<p>Tím se pro vybraný <code>element</code> docílí podobného efektu jako při použití <code>on*</code> HTML atributu.</p>

<p>Stejně tak trpí toto řešení totožným problémem: psaní skriptu do textového řetězce. Omezuje to znovupoužitelnost a v editoru může být problém se zvýrazňováním syntaxe.</p>




<h2 id="event-listener">Metody <code>addEventListener</code>/<code>attachEvent</code></h2>

<p>Poslední možnost je používat metodu <code>addEventListener</code>, resp. <code>attachEvent</code> pro starší než <b>IE 9</b>.</p>

<pre><code>element.addEventListener("click", akce);</code></pre>

<p>Pro <b>IE 8</b> a starší stačí vybrat nějaký <a href="https://gist.github.com/eirikbacker/2864711">polyfill</a>.</p>

<p>Metodě <code>addEventListener</code> se jako první parametr předává název události. Ale už bez <code>on</code>, takže např. <code>click</code>, <code>mousemove</code> a podobně. Druhý parametr je potom funkce, která se má při spuštění události provést. Opět je možné používat i funkci anonymní:</p>

<pre><code>element.addEventListener("click", function() {
  akce();
});</code></pre>

<p>Asi hlavní výhoda tohoto postupu je, že umožňuje pohodlně navazovat do jedné události několik funkcí (<a href="http://kod.djpw.cz/xecb">ukázka</a>). Obdobný <a href="http://kod.djpw.cz/wecb">postup</a> by u předchozího způsobu nastavil jen tu poslední akci.</p>

<!--
 
http://kod.djpw.cz/froc
https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#Matching_event_listeners_for_removal

-->