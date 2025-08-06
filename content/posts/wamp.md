---
title: "WAMP"
headline: "WAMP"
description: "Wamp-"
date: "2014-05-09"
last_modification: "2014-05-09"
status: 0
tags: []
format: "html"
---

http://i.snag.gy/Y2cPU.jpg

<pre><code>; Maximum size of POST data that PHP will accept.
; http://php.net/post-max-size
post_max_size = 80M</code></pre>

<pre><code>; Maximum allowed size for uploaded files.
; http://php.net/upload-max-filesize
upload_max_filesize = 200M</code></pre>








<h2 id="nejde">WAMP nejde spustit</h2>

<p>Může se stát, že z ničeho nic nepůjde WAMP spustit. Na vině bývá typicky obsazení portu <code>80</code>, na kterém běží Apache.</p>

<p>Pro ověření, zda je vše v pořádku, je k disposici funkce dostupná z tray ikony (<i>Apache → Service → Test port 80</i>):</p>

<p><img src="/files/wamp/test-port.png" alt="Test portu 80" class="border"></p>





















<p>Pokud se tam neobjeví, že na daném portu běží Apache, je problém.</p>

<p><img src="/files/wamp/apache-port-80.png" alt="Apache na portu 80" class="border"></p>











<h3 id="iis">Microsoft IIS</h3>

<p>Často při instalaci nějakého programu od Microsoftu port 80 obsadí IIS (Internetová informační služba).</p>

<p><img src="/files/wamp/iis-obsazeno.png" alt="IIS na portu 80" class="border"></p>










<p>Řešení je ji vypnout ve <i>Funkcích systému</i>. Do následujícího dialogu je ve <a href="/windows-10">Windows 10</a> nejsnazší přístup přes hledání v nabídce start (napsat tam „Funkce systému“).</p>


<p><img src="/files/wamp/iis.png" alt="Vypnutí funkce IIS" class="border"></p>























<p>Po vypnutí IIS a restartování systému by již měl Apache opět fungovat.</p>