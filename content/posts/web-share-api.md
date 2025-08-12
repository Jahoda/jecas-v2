---
title: "Sdílení stránky přes Web Share API"
headline: "Sdílení stránky přes Web Share API"
description: "Web Share API nabízí možnost sdílet odkaz na stránku nebo soubor přes rozhraní prohlížeče/systému."
date: "2021-11-26"
last_modification: "2025-08-12"
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
  <button onclick="navigator.share ? navigator.share(shareData) : alert('Prohlížeč nepodporuje sdílení')">Sdílet Je čas.cz</button>
</div>

<h2 id="podpora">Podpora</h2>

<p>Web Share API je dobře použitelné zejména v <b>Safari</b> (iOS i macOS) a v prohlížečích na bázi Chromium na <b>Androidu</b> (Chrome, Edge, Opera). <b>Firefox</b> API dosud nepodporuje. Implementujte detekci funkcí a záložní chování.</p>

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

<p>V objektu ke sdílení může být titulek, popis a URL webu.</p>

<pre><code>var objektKeSdileni = {
  title: 'Je čas.cz',
  text: 'Moderní tvorba webových stránek',
  url: 'https://jecas.cz'
}</code></pre>













<p>Kromě textu jde sdílet také soubory. Podpora sdílení souborů se liší dle zařízení a prohlížeče, proto je vhodné ověřit podporu přes <code>navigator.canShare()</code>.</p>


<p>Volat <code>navigator.share</code> je možné až na základě uživatelské interakce, takže třeba přes <a href="/udalosti-mysi#onclick"><code>onclick</code></a>.</p>

<p>Jinak nastane nějaké takováto chyba:</p>

<pre><code>Unhandled Promise Rejection: NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.</code></pre>

<p>Další podmínka je, že web běží na <a href="/https">HTTPS</a>.</p>



<h3 id="test-podpory">Test podpory</h3>

<p>Určitě není rozumné volat prosté <code>navigator.share()</code>. V nepodporovaných případech (nepodporovaný prohlížeč / bez HTTPS) to skončí chybou. Použijte detekci funkcí a případný fallback:</p>

<pre><code>if (navigator.share) {
  navigator.share(objektKeSdileni)
} else {
  alert('Prohlížeč nepodporuje sdílení')
}</code></pre>


<p>Pro <b>sdílení souborů</b> nejprve ověřte podporu pomocí <code>navigator.canShare()</code>:</p>

<pre><code>var soubory = [new File(['obsah'], 'soubor.txt', { type: 'text/plain' })]

if (navigator.canShare &amp;&amp; navigator.canShare({ files: soubory })) {
  navigator.share({ files: soubory, title: 'Sdílení souboru' })
} else {
  alert('Sdílení souborů není na tomto zařízení podporováno')
}</code></pre>






<h3 id="iframes">Sdílení v iframu třetí strany</h3>

<p>Při volání z iframu třetí strany je nutné mít na elementu <code>&lt;iframe&gt;</code> povolení <code>allow="web-share"</code>:</p>

<pre><code>&lt;iframe allow="web-share" src="https://third-party.example.com/iframe.html"&gt;&lt;/iframe&gt;</code></pre>

<h2 id="zaver">Závěr</h2>

<p>API dává asi největší smysl na <b>mobilech</b>, kde otevře známé nativní sdílení do aplikací. Na desktopu zvažte i alternativy (kopírování odkazu, sdílení e‑mailem apod.).</p>


<p>Pokud vás napadá další využití, budu rád, když mi dáte vědět do komentářů.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API">Web Share API</a></li>
</ul>