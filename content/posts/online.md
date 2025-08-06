---
title: "Je uživatel online?"
headline: "Je uživatel online?"
description: "Jak zjistit, jestli je uživatel webové aplikace online nebo offline."
date: "2015-09-29"
last_modification: "2015-10-01"
status: 1
tags: ["js", "js-ajax", "offline"]
format: "html"
---

<p>Díky tomu, že se webová stránka po načtení stáhne do prohlížeče návštěvníka, může následně fungovat i bez <b>připojení k internetu</b> (dokud nedojde k interakci vyžadující připojení).</p>


<p>Při použití <a href="/localstorage">lokálního úložiště</a> a obsluhy stránky JavaScriptem nebo při použití <i>Service Workeru</i> jde potom obsahový web klidně celý stáhnout, aby fungoval i offline.</p>



<p>U webových stránek a aplikací, které mají lidé spuštěné delší dobu a je možné, že během jejich používání <b>vypadne připojení,</b> se nabízí <b>výpadek návštěvníkovi oznámit</b>.</p>



<h2 id="oznamit">Proč detekovat offline stav</h2>

<p>Znázornit, že je problém s přípojením, je dobré z několika důvodů:</p>

<ol>
  <li><p>V případě nedostupného připojení uživatel nic netuše klikne na nějaký odkaz, čímž mu zmizí aktuální obsah a zobrazí se mu chybová stránka prohlížeče:</p>
  
<p><img src="/files/online/chyba.png" alt="Nedostupná stránka" class="border"></p>  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  </li>
  
  <li>
    <p>Je-li výpadek kvůli <b>přetížení na straně serveru</b> a ne u klienta, na chybové stránce bude klávesou <kbd>F5</kbd> neustále obnovovat stránku a dále server vytěžovat.</p>
  </li>
</ol>


<p>Pokud by na stránce bylo šetrné upozornění, mohl by si návštěvník alespoň dočíst, co už je načteno.</p>

<p>Jednoduchým skriptem jde potom <b>znázorňovat pokus o navázání spojení</b>. Ať už skutečně nebo takovou ilusi alespoň vytvářet, aby návštěvník neměl důvod bušit do <kbd>F5</kbd>.</p>

<p>Na problémy s připojením upozorňuje například <i>Chat</i> na <a href="/facebook">Facebooku</a>, který zobrazuje odpočítávání do dalšího pokusu o připojení:</p>


<p><img src="/files/online/fb-chat-offline.png" alt="Problémy s připojením k chatu na Facebooku" class="border"></p>

















<h2 id="reseni">Řešení v JavaScriptu</h2>

<p>V JavaScriptu existuje vlastnost <a href="https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine"><code>onLine</code></a> objektu <code>navigator</code>:</p>

<pre><code>if (navigator.onLine) {
  // online
}
else {
  // offline
}</code></pre>






<p>Zdá se být značně nespolehlivou, navíc se liší její chování napříč prohlížeči. <b>Internet Explorer 8+</b> a <b>Firefox 40</b> a starší se tváří jako offline jen při zapnutí <i>Offline režimu</i> v prohlížeči.</p>

<div class="live">
<p id="stav-pripojeni"> </p>
<script>
  function stavPripojeni() {
      document.getElementById("stav-pripojeni").className = 
        navigator.onLine ? 'online': 'offline';
  }
  stavPripojeni();
  window.addEventListener("offline", stavPripojeni);
  window.addEventListener("online", stavPripojeni);  
</script>  
</div>

<p>Samostatná <a href="https://kod.djpw.cz/rmqb">ukázka</a> použití <code>navigator.onLine</code>.</p>


<h3 id="ajax">AJAX</h3>

<p>Mnohem spolehlivější je použít <a href="/ajax">AJAX</a>. Při spuštění AJAXové akce potom zároveň spouštět časovač, který ji po neúnosně dlouhé době ukončí. <b>Úspěšné dokončení</b> tento časovač naopak zruší.</p>

<pre><code>var casovac;
function ajax(url, callback) {
  var xhr = new XMLHttpRequest();
  var casovac = setTimeout(function() {
    // Požadavek se nestihl provést v limitu 10 vteřin
    xhr.abort();
  }, 10 * 1000);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      // Požadvak dopadl OK, zruší se časovač
      clearTimeout(casovac);
      callback(xhr.responseText);
    }
  };
  xhr.open('GET', url);
  xhr.send();
}</code></pre>










<p>Při nesplnění limitu potom stačí zobrazit hlášku, že <b>je problém s přípojením</b>.</p>

<p>Použít časovač pro kontrolu průběhu AJAXu je dobré i pro znázornění načítání, aby uživatel věděl, že se něco děje:</p>

<div class="internal-content">
  <ul>
    <li><a href="/nacitani-ajax">Průběh načítání AJAXu</a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine">NavigatorOnLine.onLine</a></li>
    
    <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/mobile/workingoffthegrid/">Working Off the Grid with HTML5 Offline</a></li>
  </ul>
</div>

<style>
#stav-pripojeni:before {
    content: "";
    display: inline-block;
    margin-right: .5em;
    width: .8em;
    height: .8em;
    background: green;
    border-radius: 50%;
}

#stav-pripojeni.online:after {
    content: "ONLINE";
}

#stav-pripojeni.offline:after {
    content: "OFFLINE";
}
#stav-pripojeni.offline:before {
    background: red;
}
</style>