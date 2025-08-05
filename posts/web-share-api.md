---
title: "Sdílení stránky přes Web Share API"
headline: "Sdílení stránky přes Web Share API"
description: "Web Share API nabízí možnost sdílet odkaz na stránku nebo soubor přes rozhraní prohlížeče/systému."
date: "2021-11-26"
last_modification: "2021-11-26"
status: 0
tags: []
format: "html"
---

<p>Toto API je podle mého reakce na různé JavaScripty třetích stran pro sdílení stránky na různých sociálních sítí.</p>

<p>Např. v roce <b>2013</b> bylo běžné, že na webech byla <a href="/sdileci-tlacitka">sdílecí tlačítka</a> pro <a href="/facebook">Facebook</a>, <a href="/twitter">Twitter</a> a ostatní sociální sítě.</p>

<p>Tato sdílecí tlačítka mají značný dopad na soukromí uživatele, protože provozovatel kódu v <a href="/js">JavaScriptu</a> servírující sdílecí tlačítko (např. Facebook) může sledovat uživatele napříč mnoha weby.</p>


<p>Web Share API nabízí alternativu k těmto specifickým sdílecí prvkům. Slouží k tomu jen minimum JavaScriptu a samotné sdílení potom řeší přímo prohlížeč / operační systém přes standardní mechanismy.</p>

<div class="live">
  <script>
    var shareData = {
      title: 'Je čas.cz',
      text: 'Moderní tvorba webových stránek',
      url: 'https://jecas.cz'
    }    
  </script>
  <button onclick="navigator.canShare && navigator.canShare(shareData) ? navigator.share(shareData) : alert('Prohlížeč nepodporuje sdílení')">Sdílet Je čas.cz</button>
</div>

<h2 id="podpora">Podpora</h2>

<p>Aktuálně je sdílení docela dobře podporované zejména <b>Safari</b> v iOS i macOS.</p>

<p><img src="/files/web-share-api/menu-sdileni-v-macos.png" alt="Menu sdílení v macOS" class="border"></p>










<p>Dost značná nevýhoda je v tom, že je následující nabídka značně osekaná oproti sdílecímu tlačítku přímo v prohlížeči:</p>

<p><img src="/files/web-share-api/sdileni-safari-tlacitkem.png" alt="Sdílení Safari tlačítkem" class="border"></p>


















<p>V <b>iPhone</b> je potom nabídka zhruba následující a také osekaná oproti nativní:</p>

<p><img src="/files/web-share-api/web-share-ios.png" alt="Web Share API v iOS" class="border"></p>













































































<p>Zamrzí zvlášť absence možnosti <b>Přidat na plochu</b>, která je u výchozího sdílení přímo přes prohlížeč:</p>

<p><img src="/files/web-share-api/nativni-ios.png" alt="Nativní sdílení v iOS" class="border"></p>















































































<h2 id="pouziti">Použití</h2>

<p>Samotný kód pro sdílení je vcelku prostý:</p>

<pre><code>navigator.share(objektKeSdileni)</code></pre>

<p>V objektu ke sdílení potom může být titulek, popis a URL webu.</p>

<pre><code>var objektKeSdileni = {
  title: 'Je čas.cz',
  text: 'Moderní tvorba webových stránek',
  url: 'https://jecas.cz'
}</code></pre>













<p>Kromě textu jde sdílet třeba soubory.</p>


<p>Volat <code>navigator.share</code> je možné až na základě uživatelské interakce, takže třeba přes <a href="/udalosti-mysi#onclick"><code>onclick</code></a>.</p>

<p>Jinak nastane nějaké takováto chyba:</p>

<pre><code>Unhandled Promise Rejection: NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.</code></pre>

<p>Další podmínka je, že web běží na <a href="/https">HTTPS</a>.</p>



<h3 id="test-podpory">Test podpory</h3>

<p>Určitě není rozumné volat prosté <code>navigator.share()</code>. V nepodporovaných případech (nepodporovaný prohlížeč / bez HTTPS) to skončí TypeErrorem:</p>

<pre><code>TypeError: navigator.share is not a function. (In 'navigator.share(shareData)', 'navigator.share' is undefined)</code></pre>






<p>Existuje ještě <code>navigator.canShare()</code> pro ověření podpory sdíleného obsahu, nicméně v případě nepodpory skončí jeho volání také TypeErrorem.</p>


<p>Takže ošetřený kód by mohl vypadat nějak následovně:</p>

<pre><code>if (navigator.canShare &amp;&amp; navigator.canShare(objektKeSdileni)) {
  navigator.share(objektKeSdileni)
} else {
  alert('Prohlížeč nepodporuje sdílení')
}</code></pre>






<h2 id="zaver">Závěr</h2>

<p>Osobně mě úplně nenapadá případ využití této funkce. Zvlášť v případě snahy o sdílení webové stránky, když je k tomu v <b>Safari</b> přímo nativní tlačítko nabízející více možností.</p>


<p>Pokud vás ano, budu rád, když mi dáte vědět do komentářů.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API">Web Share API</a></li>
</ul>