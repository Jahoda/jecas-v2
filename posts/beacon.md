---
title: "Beacon API"
headline: "Beacon API"
description: "Beacon API umožňuje asynchronně zaslat data na server při opuštění stránky."
date: "2014-12-03"
last_modification: "2014-12-09"
status: 1
tags: ["hotova-reseni", "js", "napady"]
format: "html"
---

<pre><code>window.addEventListener('unload', function() {
  navigator.sendBeacon(<b>url</b>, <i>data</i>);
});</code></pre>



<h2 id="podpora">Podpora v prohlížečích</h2>

<ul>
  <li><b>Chrome 39</b></li>
  <li><b>Firefox 31</b></li>
  <li><b>Opera 26</b></li>
</ul>


<h2 id="vyuziti">Využití</h2>

<p>V některých případech je potřeba <b>poslat na server</b> nějaká data před opuštěním stránky, typicky:</p>

<ol>
  <li>
    <p>Uložení <a href="/zalohovani-formularu">rozepsaných dat</a> na server k uživatelskému profilu.</p>
  </li>
  
  <li>
    <p>Skripty pro <b>monitorování návštěvnosti</b> / <b>chování na webu</b> potřebují požadavek před opuštěním k zaznamenání <b>určením konce návštěvy</b>.</p>
  </li>
</ol>

<p>Situace před <b>Beacon API</b> nabízela cca 3 způsoby řešení.</p>

<ol>
  <li>
    <p>Data průběžně posílat na základě <a href="/odpocitavani">časovače</a>. To zvýší počet požadavků a není jisté, že se odešle <b>aktuální stav</b>.
    </p>
  </li> 
  
  <li>
    <p>Odeslat data asynchronně <a href="/ajax">AJAXem</a> před opuštěním stránky (událost <code>unload</code>). Prohlížeče ale často takový obsah <b>nestihnou odeslat</b>.</p>
  </li>
  
  <li>
    <p>Odeslat data <b>synchronně</b> (zajistí to třetí parametr u metody <code>open</code> u  <code>XMLHttpRequest</code>u nastavený na <code>false</code>):</p>
    
    <pre><code>var xhr = new XMLHttpRequest();
xhr.open('GET', '/ulozit.php?data=něco', <b>false</b>);
xhr.send(null);</code></pre>
    
    <p>Nevýhoda je v tom, že na tento požadavek bude <b>prohlížeč čekat</b>.</p>
  </li>
</ol>


<h2 id="priklad">Ukázka použití</h2>


<p><b>Beacon API</b> tedy umožní <b>spolehlivě uložit</b> potřebný obsah bez <b>blokování</b> opuštění stránky (<code>unload</code>).</p>

<p>Metoda <code>navigator.sendBeacon</code> má dva parametry – adresu skriptu a data. Data je také možné pochopitelně přidat na přímo do URL. Požadavek na ukládací skript se přes <code>sendBeacon</code> <b>odesílá metodou POST</b>.</p>

<pre><code>function log() {
  navigator.sendBeacon(
    "ulozit.php", 
    JSON.stringify(
      {
        'prvni': 'hodnota',
        'druha': 'jiná hodnota'
      }
    )
  );
}</code></pre>








<p>Tuto funkci <code>log</code> je potom vhodné použít <b>před opuštěním stránky</b> (<code>onload</code>).</p>

<pre><code>window.addEventListener('unload', log);</code></pre>

<p>Ale nic nebrání jejímu použití při kliknutí na tlačítko – zkrátka u akcí, kde <b>nepotřebujeme odpověď</b>.</p>

<pre><code>&lt;button onclick="log()">
  Tlačítko
&lt;/button></code></pre>






<h3 id="zpracovani">Zpracování dat v PHP</h3>

<p>Dostat se k datům odeslaných výše uvedenou JS funkcí <code>log</code> a připsat je do souboru může v PHP vypadat následovně:</p>

<pre><code>$payload = file_get_contents('<a href="http://php.net/manual/en/wrappers.php.php#wrappers.php.input">php://input</a>');
$data = json_decode($payload, true);
file_put_contents(
  "data.txt", 
  date('H:i:s') . ": " . $data['prvni'] . $data['druha'] . "\n", 
  FILE_APPEND
);</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/Jahoda/sendBeacon">Celé řešení na GitHubu</a></li>
  </ul>
</div>






<h2 id="ga">Použití v Google Analytics</h2>

<p>V nástroji pro měření návštěvností – <a href="/ga">Google Analytics</a> je možné předat parametr <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#useBeacon"><code>useBeacon</code></a>, který v podporovaných prohlížečích použije Beacon API.</p>

<pre><code>ga('send', 'event', 
  'click', 
  'download-me', 
  <b>{useBeacon: true}</b>
);</code></pre>





<p>Zaslání požadavku do GA před opuštěním stránky jde potom docílit zkombinováním <code>useBeacon</code> s událostí <code>unload</code>.</p>

<pre><code>window.addEventListener('unload', function() {
  ga('send', 'event', 
    'Unload', 
    location.pathname,  
    {useBeacon: true}
  );
});</code></pre>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="/onbeforeunload">Zabránění zavření stránky událostí <code>onbeforeunload</code></a></li>
  
  <li>W3C: <a href="https://w3c.github.io/beacon/">Beacon API</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/navigator.sendBeacon">navigator.sendBeacon()</a></li>
</ul>