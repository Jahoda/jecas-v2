---
title: "Kam umístit JavaScript do HTML"
headline: "Umístění JavaScriptu v HTML kódu"
description: "Do jakého místa HTML kódu stránky umístit externí nebo interní JavaScript."
date: "2015-01-15"
last_modification: "2015-01-15"
status: 0
tags: []
format: "html"
---

<p>Při používání JavaScriptu v HTML existuje spoustu způsobů, jak a kam vložit JS kód, který bude s HTML elementy pracovat. <b>Špatné pořadí</b> HTML a JS dokáže <b>znefunkčnit</b> celý JS kód a někdy se špatně odhaluje.</p>

<p>Ať už jde o interní (kód mezi <code>&lt;script></code> a <code>&lt;/script></code>) nebo externí JS (připojený přes <code>&lt;script src="">&lt;/script></code>), může být kdekoliv v:</p>

<ul>
  <li>hlavičce webu (sekce <code>&lt;head></code>)</li>
  <li>těle stránky (sekce <code>&lt;body></code>)</li>
</ul>






<h2 id="nacitani">Vliv na načítání</h2>

<p>Čím „výš“ je skript umístěn, tím dříve může být <b>načten a vykonán</b>. Na druhou stranu načítání a zpracování externího (neasynchronního) skriptu <b>přeruší vykreslování</b> zbytku webu.</p>


<p>Připojení velkého JS nad textovým obsahem webu tedy způsobí, že návštěvník nic nevidí do doby stažení a vykonání celého souboru.</p>

<p>Pro <b>maximální rychlost načítání</b> HTML obsahu je tedy vhodné skripty umisťovat na samý konec stránky (před pomyslnou ukončovací značku <code>&lt;/body></code>). Ne vždy je to ale ideální postup, protože pokud je stránka do jisté míry závislá na JS, tak se sice obsah rychle načte, ale oživení skripty může přijít později, než by bylo potřeba. Například nebude fungovat JS akce tlačítka, protože příslušný kód ještě nebyl načten a vykonán.</p>

<p>Častý případ to je u <a href="/hamburger-menu">hamburger navigací</a>, které po kliknutí před načtením JS nic nedělají a pro uživatele vytváří <b>efekt nefunkčního webu</b>.</p>





<h3 id="stav">URL se stavem aplikace</h3>

<p>Řada těchto problémů jde vyřešit tím, že se pro typická <a href="/css-rozbalovani">rozklikávání obsahu</a> nepoužívá JavaScript. Případně se rozbalování obsahu apod. bere jako <b>stav aplikace</b>, který se může přenášet v URL parametrech.</p>

<p>Tlačítko pro zobrazení menu tak může symbolicky vypadat následovně:</p>

<pre><code>&lt;a href="?zobrazitMenu=true" onclick="zobrazitSkrytMenu(); return false">
  Menu
&lt;/a></code></pre>












<p>Do doby načtení a zpracování JS se uživateli načte totožná stránka s parametrem <code>zobrazitMenu</code>, díky kterému se menu zobrazí už na úrovni HTML. Pokud na tlačítko klikne až po stažení a zpracování JS, o zobrazení se postará skript a žádná další stránka se načítat nebude.</p>



<h3 id="aplikace">JS aplikace</h3>

<p>Je-li webová stránka plně závislá na JS, dává smysl nezbytné skripty začít stahovat co nejdříve a umístit je proto klidně už do <code>&lt;head></code>.</p>

<p>Nebo dokonce použít <a href="/async-defer#resource-Hints">resource hint</a> a odkaz na externí JS posílat už v HTTP hlavičce:</p>

<pre><code>Link: &lt;https://example.com/velkyJavaScript.js>; rel=prefetch;</code></pre>

<p>Blokování vykreslování potom nemusí vadit, protože vykreslená stránka by bez načteného JS stejně nic nedělala.</p>







<h2 id="async">Atribut <code>async</code></h2>

<p>Atribut <code>async</code> funguje od <b>IE 10</b>, <b>Firefoxu 3.6</b>, <b>Chrome 8</b> a <b>Opery 15</b>. Umožňuje docílit dvou věcí najednou:</p>

<ol>
  <li>začít načítat externí JavaScript co nejdříve,</li>
  
  <li>nezablokovat vykreslování stránky</li>
</ol>

<p>Zapisuje se následovně (a kvůli kompatibilitě se často používá ještě s <code>defer</code>):</p>

<pre><code>&lt;script src="externi.js" <b>async</b> <i>defer</i>>&lt;/script></code></pre>


<div class="internal-content">
  <ul>
    <li><a href="/async-defer">Připojení JavaScriptu s <code>async</code> a <code>defer</code></a> – více informací o (a)synchronním připojování JS</li>
  </ul>
</div>





<p>Tímto způsobem není problém skript připojit i jinde než na konci stránky, protože <b>nebude blokovat vykreslování</b>. Pouze jeho stahování může zpomalit stahování jiných externích objektů (styly, <a href="/obrazky">obrázky</a>, <a href="/video">videa</a>, <a href="/pisma">fonty</a> a podobně). V jakém místě skript připojit proto závisí na prioritách daného webu.</p>




<h2 id="load">Čekání na vytvoření DOMu</h2>

<p>Asynchronní JS má ze své povahy svou specifickou vlastnost v tom, že se může vykonat prakticky v libovolnou dobu.</p>

<p>U synchronního JS se je možné spolehnout, že HTML elementy nebo jiné JS soubory nacházející se před připojením externího skriptu jsou dostupné a elementy/skripty po připojení ještě ne. U asynchronního mohou nastat oba případy.</p>




<h3 id="priklad-sync">Příklad synchronního JS</h3>

<p>Jako příklad může posloužit následující synchronní kód:</p>

<pre><code>&lt;div id="neco">…&lt;/div>
&lt;script src="funkce.js">&lt;/script>
&lt;script src="<b>synchronni-skript.js</b>">&lt;/script>
&lt;div id="neco-jineho">…&lt;/div></code></pre>










<p>Pokud bude výše uvedený <code>synchronni-skript.js</code> chtít pracovat s elementem <code>#neco</code> pomocí funkce ze souboru <code>funkce.js</code>, bude to OK. Pokud bude chtít pracovat s elementem <code>#neco-jineho</code>, nepůjde to, protože tento element ještě v daném momentu nebude v DOMu.</p>




<h3 id="priklad-async">Příklad asynchronního JS</h3>

<p>Případ s použitím <code>async</code> se na první pohled moc neliší:</p>

<pre><code>&lt;div id="neco">…&lt;/div>
&lt;script src="funkce.js">&lt;/script>
&lt;script src="<b>asynchronni-skript.js</b>" <i>async</i>>&lt;/script>
&lt;div id="neco-jineho">…&lt;/div></code></pre>










<p>Podstatně se ale liší funkčnost:</p>

<ol>
  <li>
    <p>Soubor <code>funkce.js</code> </p>
  </li>
</ol>


<p>To se někdy hodí – typicky u <b>měřicích skriptů</b> typu <a href="/ga">Google Analytics</a>, kdy není třeba manimulovat s DOMem stránky.</p>

<p>Pokud se tedy skript připojí asynchronně na začátku stránky a potřebuje pracovat s elementy na stránce, je třeba zajistit, aby se spustil v určitou dobu, kdy už potřebné elementy budou v DOMu.</p>

<h2 id="cekani">Čekání na načtení</h2>

<pre><code>window.addEventListener('load', function () {
    console.log(jQuery.fn.jquery);
});</code></pre>

<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="https://stackoverflow.com/questions/45869839/javascript-run-inline-script-after-load-async-resources">Javascript run inline script after load async resources
</a></li>
  </ul>
</div>

<div class="external-content">
  <ul>
    <li><a href="http://swizec.com/blog/how-to-properly-wait-for-dom-elements-to-show-up-in-modern-browsers/swizec/6663">How to wait for DOM elements to show up in modern browsers</a></li>
  </ul>
</div>