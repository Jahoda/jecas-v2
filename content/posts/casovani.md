---
title: "Časování v JavaScriptu"
headline: "Časovače v JavaScriptu"
description: "Jaké nabízí JavaScript možnosti pro vytváření animací. A jak docílit toho, aby byly plynulé. "
date: "2014-11-12"
last_modification: "2014-11-12"
status: 0
tags: []
format: "html"
---

<p>Pokud chceme na webu něco pohyblivého/animovaného, nabízejí se 3 řešení:</p>

<ol>
  <li>Použít <b>pohyblivý obrázek</b> GIF.</li>
  
  <li>Použít CSS přechody <a href="/transition"><code>transition</code></a> nebo vlastnost <a href="/animation"><code>animation</code> s <code>@keyframes</code></a>. Tyto CSS animace potom případně <b>spouštět JavaScriptem</b>.</li>
  
  <li>Celou animaci řídit JavaScriptem, který bude měnit CSS vlastnosti (např. umístění, rozměry, <a href="/opacity">průhlednost</a> a podobně) nebo třeba vypisovat nějaký obsah.</li>
</ol>


<h2 id="setinterval">Opakované spouštění <code>setInterval</code></h2>

<p>První funkce slouží pro opakovaného spouštění libovolného JS kódu. Funkce <code>setInterval</code> má dva parametry, kde první je kód, co se má spustit, a druhé časová prodleva <b>v milisekundách</b>.</p>

<p>Existuje několik způsobů, jak kód pro časovač zapsat.</p>

<ol>
  <li>
    <p>Nejjednodušší je místo prvního parametru napsat <b>řetězec s JS kódem</b>. Následující příklad do elementu s ID „vypsat“ zapíše každých 1000 milisekund (1 vteřina) tečku.</p>
    
    <pre><code>setInterval(
  "document.getElementById('vypsat').innerHTML += '.'", 
  1000
);</code></pre>
    
    <p><a href="http://kod.djpw.cz/lihb">Ukázka</a></p>
    
    <p>Psaní kódu <b>do řetězce</b> ale nezančí nic dobrého (jedná se o ekvivalent <code>eval</code>u). Proto je lepší se tomuto případu vyhnout. Kromě možných risik při <b>vyhodnocování</b> takového kódu si zbytečně snižujeme čitelnost, protože obsah v řetězci neumí většina editorů správně obarvit.</p>
  </li>
  
  <li>
    <p>Funkci <code>setInterval</code> proto raději předáme jako první parametr anonymní/nepojmenovanou funkci:</p>
    
    <pre><code>setInterval(
  function() {
    // opakovaně spouštěný kód
    document.getElementById('vypsat').innerHTML += '.';
  },
  1000
);</code></pre>

<p><a href="http://kod.djpw.cz/kihb">Ukázka</a></p>
  </li>
  
  <li>
    <p>Funkci si případně můžeme vytvořit samostatně a <code>setInterval</code>u předat jen její název:</p>

  
    <pre><code>function vypsat() {
  // opakovaně spouštěný kód
  document.getElementById('vypsat').innerHTML += '.';
}
var casovac = setInterval(vypsat, 1000);</code></pre>
    
    <p>Pro pozdější <b>zrušení časovače</b> je užitečné si ho přiřadit do proměnné.</p>

    <p><a href="http://kod.djpw.cz/mihb">Ukázka</a></p>
  </li>  
</ol>


<h3 id="clearinterval">Zrušení intervalu <code>clearInterval</code></h3>

<p>Pokud je <i>interval</i> v nějaké proměnné, jde ho na vyžádání zrušit:</p>

<pre><code>clearInterval(casovac);</code></pre>

<p><a href="http://kod.djpw.cz/nihb">Ukázka</a></p>




<h2 id="settimeout">Spuštění po čase <code>setTimeout</code></h2>

<p>Na rozdíl od <code>set<b>Interval</b></code>u spustí požadovanou akci <code>set<b>Timeout</b></code> jen a pouze <b>jednou</b>. Jinak jsou si obě funkce dost podobné.</p>

<pre><code>var casovac = setTimeout(
  function() {
    // kód se spustí pouze jednou za 1000 milisekund
  },
  1000
);</code></pre>


<h3 id="cleartimeout">Zrušení timeoutu <code>clearTimeout</code></h3>

<p>Pokud je <i>timeout</i> v nějaké proměnné, jde ho na vyžádání zrušit:</p>

<pre><code>clearTimeout(casovac);</code></pre>

<p><a href="http://kod.djpw.cz/oihb">Ukázka</a></p>

<p>Zajímavá je skutečnost, že je možné rušit rovněž <code>setInterval</code> pomocí <code>clearTimeout</code> a obráceně.</p>


<h3 id="opakovane-timeout">Opakované spouštění <i>timeoutu</i></h3>

<p>I pomocí <code>setTimeout</code> jde <i>nasimulovat</i> <code>setInterval</code>, tedy zajistit <b>opakované spouštění</b>. V případech, kdy chceme, aby další opakování <b>bylo závislé na tom předchozím</b>, je to i lepší volba.</p>

<p>Celý princip spočívá v <b>rekursivním volání</b> <i>timeoutu</i>. Po provedení vlastní části kódu (vypsání) funkce <code>vypsat</code> zavolá pomocí <code>setTimeout</code> samu sebe.</p>

<pre><code>funkce vypsat() {
  // samotný výpis
  setTimeout(vypsat, 1000);
}
vypsat();</code></pre>

<p>Jelikož tento kód by <b>běžel nekonečně</b>, možná budeme potřebovat způsob, jak ho zastavit. Existují dvě možnosti.</p>

<ol>
  <li>Použít <code>clearTimeout</code>. <a href="http://kod.djpw.cz/rihb">Ukázka</a></li>
  
  <li>Ve funkci <code>vypsat</code> na základě splnění nějaké podmínky další časovač nevytvářet. <a href="http://kod.djpw.cz/sihb">Ukázka</a></li>
</ol>



<h2 id="requestanimationframe">Časování přes <code>requestAnimationFrame</code></h2>

<p>Novější způsob, kterým disponují prohlížeče od <b>IE 10</b>, je použití metody <code>requestAnimationFrame</code>.</p>

<p>Ta se hodí hlavně pro vytváření animací.</p>

<p>Metodě <code>requestAnimationFrame</code> je možné jako druhý parametr předat element, kterého se akce v <i>časovači</i> bude týkat. V takovém případě se nemusí akce provádět, když je například element mimo viditelnou plochu.</p>


<h2 id="animate">Metoda <code>animate</code></h2>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="http://css-tricks.com/using-requestanimationframe/">Using requestAnimationFrame</a></li>
  
  <li><a href="https://gist.github.com/paulirish/1579671">Polyfill pro starší prohlížeče</a> — <a href="https://gist.github.com/mrdoob/838785">zjednodušená podoba</a></li>
  
  <li>MSDN: <a href="http://msdn.microsoft.com/en-us/library/ie/hh920765(v=vs.85).aspx">Timing control for script-based animations ("requestAnimationFrame")</a></li>
  
  <li>Paul Irish: <a href="http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/">requestAnimationFrame for Smart Animating</a></li>
  
  <li>Creative JS: <a href="http://creativejs.com/resources/requestanimationframe/">requestAnimationFrame</a></li>
  
  <li>HTML5Rocks:<a href="http://updates.html5rocks.com/2014/05/Web-Animations---element-animate-is-now-in-Chrome-36">Web Animations - element.animate() is now in Chrome 36</a></li>
  
  <li>GoSquared Blog: <a href="https://engineering.gosquared.com/optimising-60fps-everywhere-in-javascript">Optimising for 60fps everywhere</a></li>
</ul>