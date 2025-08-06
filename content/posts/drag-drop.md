---
title: "Drag & Drop přesouvání v JS"
headline: "Drag & Drop v JavaScriptu"
description: "Jak vytvořit „drag & drop“ přesouvání prvků po stránce v JavaScriptu."
date: "2014-11-15"
last_modification: "2015-01-10"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>V některých situacích chceme uživateli umožnit <b>přesun</b> nějakého objektu po stránce.</p>


<h2 id="css">Posun objektu v CSS</h2>

<p>Před samotnou tvorbou JS přesouvání je nutné zvolit technické řešení přesunu v CSS. Nabízejí se dvě základní možnosti:</p>

<ol>
  <li>
    <p>Elementu přidat <a href="/position#relative">relativní posici</a> a měnit mu jeho hodnoty <code>top</code> a <code>left</code>.</p>
    
    <pre><code>position: relative;
left: posunX;
top: posunY;</code></pre>
  </li>
  
  <li>
    <p>Přesouvat element CSS transformací.</p>
    
    <pre><code>transform: translate(posunX, posunY);</code></pre>
  </li>
</ol>

<p>První způsob pomocí relativního posicování má prakticky 100% <b>podporu napříč prohlížeči</b>. Přesun transformací funguje od <b>IE 9</b>, ale umožní přesouvat bez řešení typu posice a hlavně je <b>lépe optimalisovaný</b> s ohledem na výkon.</p>

<p>Prohlížeče si pro elementy přesouvané pomocí <code>transform: translate</code> vytvoří <b>zvláštní vrstvu</b>, což sníží náročnost na překreslování. U přesunu posicováním se musí změněná plocha v okolí přesouvaného elementu <b>překreslovat</b>, což u hodně komplikované stránky může znamenat <b>pokles FPS</b> (snímků za vteřinu).</p>

<div class="internal-content">
  <ul>
    <li><a href="/vykreslovani">Jak probíhá vykreslování stránky</a></li>
  </ul>
</div>
<div class="external-content">
  <ul>
    <li><a href="http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/">Why Moving Elements With Translate() Is Better Than Pos:abs Top/left</a></li>
  </ul>
</div>


<h2 id="js">Postup v JavaScriptu</h2>

<ol>
  <li>
    <p>Připravíme si <b>přesouvatelný element</b> a potřebné proměnné.</p>
    
    <pre><code>var presouvany = document.querySelector("#presouvany-element");
var souradnice = {x: 0, y: 0}; // výchozí relativní umístění
var posunSouradnice; // pro zjišťování posunu
var puvodniSouradnice; // souradnice prvku před posunem</code></pre>
  </li>
  <li>
    <p>Při události <a href="/udalosti-mysi#onmousedown"><code>onmousedown</code></a> (stisknutí tlačítka) se prvku, co má být možný přetahovat, přidá třída nebo <a href="/vlastni-html-atributy">vlastní atribut</a>. Zároveň se do nějaké proměnné uloží <b>relativní souřadnice prvku</b> v době před posunem (při prvním přesunu to bude <code>0;0</code>) a do další proměnné <b>aktuální souřadnice kursoru</b>.</p>
    
    <p>Aktuální souřadnice kursoru zjistíme například z <code>event.pageX</code>/<code>event.pageY</code>.</p>
    
    <pre><code>presouvany.setAttribute("data-move", "");
puvodniSouradnice = {x : souradnice.x, y: souradnice.y};
posunSouradnice = {
  x: event.pageX,
  y: event.pageY
};</code></pre>
  </li>
  
  
  
  
  
  
  
  <li>
    <p>Následně se při posouvání myši v rámci dokumentu (<code>document.<a href="/udalosti-mysi#onmousemove">onmousemove</a></code>) <b>zkontroluje přítomnost atributu</b> <code>data-move</code> – kladný výsledek znamená, že je co přesouvat, takže se začne s přesunem. Záporný výsledek potom znamená, že se nic dál dělat nebude (<code>return</code>).</p>
    
    <pre><code>if (!presouvany.hasAttribute("data-move")) return;</code></pre>
    
    <p>Na základě původních hodnot v proměnné <code>posunSouradnice</code>, se zjistí <b>rozdíl oproti začátku posouvání</b>. Který se přičte k aktuálním souřadnicím.</p>
    
    <pre><code>var x = souradnice.x + event.pageX - posunSouradnice.x;
var y = souradnice.y + event.pageY - posunSouradnice.y;</code></pre>
    
    <p>V proměnných <code>x</code> a <code>y</code> bude výsledná hodnota pro nastavení jako <code>left</code> a <code>top</code> (nebo parametry pro <code>translate</code>). Zde může proběhnout případná  <b>kontrola</b>, zda člověk nepřesouvá do míst, kam nemá.</p>
    
    <p>Nyní stačí aktualisovat hodnoty <code>souradnice.x</code> a <code>souradnice.y</code> a nastavit nový styl.</p>
    
    <pre><code>souradnice.x = x;
souradnice.y = y;
presouvany.style.left = x + "px";
presouvany.style.top = y + "px";</code></pre>
    
    <p>Případně místo změny <code>left</code> a <code>top</code> zajistit přesun pomocí <code>transofrm</code> (je vhodné použít <a href="/css-prefixy">CSS prefixy</a>:</p>
    
    <pre><code>presouvany.style.transform = "translate(" + x + "px, " + y + "px)";</code></pre>
  </li>
  
  
  
  

  
  <li>
    <p>Při uvolnění tlačítka (<code>onmouseup</code>) odebereme <b>přesouvací atribut</b>, čímž se přesouvání ukončí.</p>
    
    <pre><code>presouvany.removeAttribute("data-move");</code></pre>
  </li>
  
  <li>
    <p>Znázornit <b>možnost přesouvání</b> pomůže <a href="/cursor#move"><code>cursor: move</code></a>.</p>
  </li>
</ol>

<p><a href="https://kod.djpw.cz/xmhb">Ukázka s využitím posicování</a> / <a href="https://kod.djpw.cz/ljjb">transformace</a></p>


<h3 id="touch">Dotyková zařízení</h3>

<p>Pro dotyková zařízení je třeba nahradit události <code>on<b>mouse</b>*</code> za <code>on<b>touch</b>*</code>.</p>

<ul>
  <li><code>onmousedown</code> = <code>ontouchstart</code></li>
  
  <li><code>onmousemove</code> = <code>ontouchmove</code></li>  
  
  <li><code>onmouseup</code> = <code>ontouchend</code></li>  
</ul>

<p>Asi největší odlišnost je v tom, že dotyková zařízení mohou umět <b>více dotyků najednou</b>. Zajímat nás bude ale nejspíš jen ten první, takže:</p>

<ul>
  <li><code>event.pageX</code> = <code>event.touches[0].pageX</code></li>
  
  <li><code>event.pageY</code> = <code>event.touches[0].pageY</code></li>
</ul>

<p><a href="https://kod.djpw.cz/mjjb">Ukázka pro dotyková zařízení</a></p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul> 
  <li><a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=7&topic=153139#3"><b>Chamurappiho</b> přesouvání na 15 řádek</a></li>
  
  <li><a href="/udalosti-mysi#drag-drop">Drag &amp; Drop události myši</a> – umožňují reagovat na přesunutí elementu na určité místo</li>  
</ul>