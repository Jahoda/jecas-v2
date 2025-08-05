---
title: "Edge mobile prohlížeč"
headline: "Mobilní MS Edge"
description: "V mobilních Windows 10 je internetový prohlížeč Microsoft Edge. Jaký je?"
date: "2015-08-17"
last_modification: "2015-08-21"
status: 1
tags: ["webove-prohlizece"]
format: "html"
---

<p>Po desktopové versi <a href="/windows-10">Windows 10</a> se chystá i mobilní varianta tohoto operačního systému, která rovněž obsahuje nový <a href="/microsoft-edge">prohlížeč <b>Edge</b></a>.</p>

<p>Jak tomu v dnešní době bývá, <b>mobilní prohlížeče</b> obsahují velmi podobná vykreslovací jádra jako „velké“ prohlížeče. Výjimkou není ani <b>MS Edge</b>.</p>

<p>Hlavní rozdíl mezi dektopovým prohlížečem je tedy logicky v <b>uživatelském rozhraní</b>.</p>

<p><img src="/files/edge-mobile/prohlizec-edge.png" alt="MS Edge mobile" class="border"></p>





































<p>Největší odlišnost oproti desktopovým Windows 10 je v tom, že mobilní Windows už neobsahuje původní <b>Internet Explorer 11</b>, ale pouze <b>Edge</b>.</p>




<h2 id="ua">Hlavička <code>user-agent</code></h2>

<p>Mobilní <b>Edge</b>:</p>

<pre><code>Mozilla/5.0 (Windows <b>Phone 10.0</b>; <b>Android 4.2.1</b>; Microsoft; Lumia) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Chrome/42.0.2311.135 <b>Mobile</b> 
Safari/537.36 
Edge/12.10512 
</code></pre>







<p><b>MSE</b> v desktopovém Windows 10:</p>

<pre><code>Mozilla/5.0 (Windows NT 10.0; Win64; x64) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Chrome/42.0.2311.135 
Safari/537.36 
Edge/12.10240</code></pre>







<h2 id="funkce">Funkce</h2>

<p>V nabídce, která se objeví po kliknutí na trojtečku vpravo dole, toho moc není:</p>

<p><img src="/files/edge-mobile/nabidka.png" alt="Nabídka MS Edge" class="border"></p>







































<p>Funkce mobilního <b>Edge</b> z části vycházejí z desktopové verse. Nechybí tak:</p>

<ul>
  <li>
    <p><b>Záložky</b> – přehled otevřených <i>tabů</i> vypadá podobně jako v předchozím mobilním IE.</p>
    
    <p><img src="/files/edge-mobile/zalozky.png" alt="Záložky/taby v MS Edge" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

  </li>
  
  <li><p><b>Režim nerušeného čtení</b> – upraví stránku, aby se lépe četla (tuto funkci obsahoval už mobilní <b>IE 11</b>).</p></li>
  
  <li><p><b>K přečtení</b> – uložení webové stránky k pozdějšímu přečtení. Bohužel (zatím?) chybí <b>synchronisace</b> mezi mobilním a desktopovým prohlížečem.</p></li>
  
  <li>
    <p><b>InPrivate</b> – anonymní záložka, ve které se nepoužijí uložené cookies a po zavření se vymažou. Při prohlížení je tento režim znázorněn modrou ikonou.</p>
    
    
    <p><img src="/files/edge-mobile/inprivate.png" alt="MS Edge In private" class="border"></p>






    
  </li>
  
  <li><p><b>Sdílení</b> – tlačítko pro sdílení webové stránky (na <a href="/facebook">Facebook</a>, <a href="/twitter">Twitter</a> a podobně).</p></li>
  
  
  <li>
    <p><b>Historie</b> – přehled navštívených stránek.</p>
    
    
    <p><img src="/files/edge-mobile/historie.png" alt="Historie" class="border"></p>

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    





  </li>  
</ul>


<h2 id="problemy">Problémy</h2>

<p>Možná je to dané tím, že mobilní Windows nejsou zatím finální, ale v mobilní prohlížeči <b>Edge</b> lze pozorovat několik problémů:</p>



<h3 id="autorisace">Chybí HTTP autorisace</h3>

<p>Vyžaduje-li nějaká stránka autorisaci prostřednictvím prohlížeče, člověk s mobilním <b>Edge</b> se na ni nedostane, protože možnost zadat jméno a heslo chybí.</p>

<p>Takto zmíněná autorisace vypadá v desktopovém <b>Chrome</b></p>

<p><img src="/files/edge-mobile/overeni.png" alt="Vyžaduje se ověření" class="border"></p>




















<h3 id="napovidani">Napovídání adres</h3>

<p>Aby člověk nemusel adresy navštěvovaných stránek neustále zdlouhavě zadávat, dokáže je prohlížeč napovídat.</p>

<p>Bohužel mobilní <b>Edge</b> občas potřebuje pro nabídnutí <b>zadat více než jeden znak</b> z adresy.</p>


<h3 id="vyhledavani">Nastavení výchozího vyhledávače</h3>

<p>Pro české podmínky není <b>výchozí přednastavení <a href="/bing">Bingu</a></b> úplně vhodné. Mobilní <b>IE 11</b> šel přenastavit na <a href="/google">Google</a>. Zde tato možnost momentálně chybí.</p>



<h3 id="zpet">Gesto zpět</h3>

<p>Starší mobilní <b>IE 11</b> dokázal spustit funkci zpět pomocí gesta tažení prstem zleva doprava. V <b>Edge</b> toto nic nedělá.</p>


<h2 id="podpora">Podpora webových standardů</h2>

<p>Mobilní <b>Edge</b> podporuje nejspíš prakticky totéž do desktopová varianta.</p>



<h3 id="forumalre">Formuláře</h3>

<p>Zajímavé jsou nové funkce ve formulářích.</p>


<ul>
  <li>
    <p>Podpora zadávání kalendářního data prostřednictvím zabudovaného kalendáře.</p>
    
    <p>Týká se značky <a href="/input"><code>&lt;input></code></a> s typy <code>date</code>, <code>month</code> a <code>week</code>.</p>
    
    <p><img src="/files/edge-mobile/date.png" alt="Výběr z kalendáře" class="border"></p>





    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    






  </li>
  
  <li>
    <p>Při typu <code>search</code> se na klávesnicí zobrazí symbol lupy.</p>
  </li>
</ul>