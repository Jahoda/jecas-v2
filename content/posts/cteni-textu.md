---
title: "Čtení textu na webu"
headline: "Přečtení textu webu"
description: "Jak obsah webové stránky přečíst hlasem."
date: "2015-07-27"
last_modification: "2015-08-06"
status: 1
tags: ["hlas", "hotova-reseni", "js", "php"]
format: "html"
---

<p>V některých případech se může hodit textový obsah webu <b>přehrát strojovým hlasem</b>:</p>

<ol>
  <li>Přečtení obsahu obrázků, které slouží jako <a href="/spam">ochrana proti spamu</a>.</li>
  
  <li>Další způsob, jak může návštěvník konsumovat obsah. I když v tomto případě je značně lepší, když je obsah <b>skutečně namluven</b>.</li>
</ol>

<p>Pro technickou realisaci je k tomu nutná <b>hlasová čtečka</b> (skript, kterému se předá text a on vrátí zvukový soubor). Za tímto účelem jde použít čtečku, kterou používá <b>Google překladač</b> (<code>translate.google.com</code>) a jakž takž umí i česky.</p>


<div class="live">
  <p>Kousek předchozího odstavce přečtený Google překladačem:</p>
  <audio src="/files/cteni-textu/cteni.mpeg" controls></audio>   
</div>

<p>Google překladač na následující adrese vrátí text z parametru <code>q</code> jako zvuk:</p>

<pre><code class="language-http">http://translate.google.com/translate_tts?tl=cs&amp;q=Text</code></pre>


<p>Zdá se ale, že pro přímé přehrání na stránce pomocí značky <code class="language-markup">&lt;audio></code> je potřeba používat <b>placené Google Translate API</b>.</p>


<p>Existují dva způsoby, jak toto omezení pro vyzkoušení alespoň krátkodobě obejít:</p>





<h2 id="php">Stažení zvuku PHP skriptem</h2>

<p>Pro obejití ochrany jde nahrávku pustit přes vlastní skript.</p>

<pre><code class="language-php">&lt;?php 
$url = "http://translate.google.com/translate_tts?tl=cs&amp;q=" 
      . urlencode($_GET["str"]);
$data = file_get_contents($url);
header("Content-Type: audio/mpeg");
echo $data;</code></pre>








<p>Přehrání v JavaScriptu je potom s využitím HTML 5 <code class="language-markup">&lt;audio></code> velice jednoduché:</p>

<pre><code class="language-javascript">function prehrat(str) {
    var url = "./cist.php?str=" + encodeURIComponent(str); 
    var a = new Audio(url);
    a.play();
}	</code></pre>








<h2 id="ram">Přehrání vložením do rámu</h2>

<p>V <b>Google Chrome</b> se obsah přehraje při vložení do rámu.</p>

<div class="live">
  <script>
    function prehrat(str) {
        var url = "http://translate.google.com/translate_tts?ie=UTF-8&tl=cs&q=" + str;
        prehravac.src = url;
    }	    
  </script>
  <iframe style="display: none" frameborder="0" id="prehravac"></iframe>
  <p>
    <button onclick="prehrat(document.title)">▶ Přehrát název tohoto článku</button>
  </p>  
</div>

<p>Samostatná ukázka:</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/hoob">Přehrávání textu pomocí Google překladače</a></li>
  </ul>
</div>


<h2 id="omezeni">Omezení Googlu</h2>

<p>Při četném používání nejspíš Google získá podezření.</p>

<blockquote>
  <p>Naše systémy zjistily, že vaše počítačová síť je zdrojem neobvyklého provozu. Účelem této stránky je zkontrolovat, zda požadavky odesíláte skutečně vy, a ne robot.</p>
</blockquote>

<p>Je potom nutné opsat kód pro ověření.</p>


<p><img src="/files/cteni-textu/omezeni.png" alt="Omezení v používání API" class="border"></p>











<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=3&amp;topic=163998">Čtení daného textu na webu</a></li>
  
  
</ul>


<!--
<div class="live">
  <script>
    function prehrat(str) {
      var url = "/files/cteni-textu/cist.php?str=" + encodeURIComponent(str); 
      var a = new Audio(url);
      a.play();
    }	    
  </script>

</div>
-->