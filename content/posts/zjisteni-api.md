---
title: "Jak získat přístup k API přes mobilní aplikaci"
headline: "Získání přístupu k API přes mobilní aplikaci"
description: "Jak přes mobilní aplikaci získat přístup k neveřejnému API různých webů."
date: "2022-02-27"
last_modification: "2022-12-24"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---

<p>Pro různé věci se může hodit z různých stránek získávat informace a případně je tam i posílat. Typicky za účelem automatisace.</p>

<p>Universální způsob, jak získat API k libovolné stránce je použít nástroj typu <a href="https://apify.com">Apify</a>.</p>





<p>Občas je to ale zbytečně složité a řešení je jednodušší, než se zdá: Má-li daná služba <b>mobilní aplikaci</b>, typicky bude s něčím komunikovat přes API.</p>






<h2 id="odposlech">Jak odposlechnout API volání</h2>

<p>Asi nejsnazší řešení je přes <b>Android aplikaci</b>.</p>

<p>Postup je následující:</p>

<ol>
  <li>
    <p>Stáhnout si <a href="https://developer.android.com/studio">Android Studio</a>. Vývojové prostředí pro Android aplikace.</p>
  </li>
  <li>
    <p>Po spuštění si spustit emulátor – volba <i>Virtual Device Manager</i>. Tím lze spustit nějaký virtuální Android telefon na svém počítači.</p>
    
    <p><img src="/files/zjisteni-api/android-studio-emulator.png" alt="Android studio emulátor" class="border"></p>
  </li>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <li>
  <p>Tím by se měl pustit virtuální Android. Zbývá do něj dostat potřebnou aplikaci. Bohužel to není možné z <b>Google Play</b> obchodu, takže je potřeba použít nějaký alternativní zdroj – třeba <a href="https://apkpure.com/">APKPure</a>.</p>
    
    <p>Nebo libovolné <code>*.apk</code>.</p>
    
    <p>Proti stažení to bude protestovat, stačí jen potvrdit a aplikaci po stažení nainstalovat.</p>
    
    <p><img src="/files/zjisteni-api/povoleni-stazene-aplikace.png" alt="Povolení stažené aplikace" class="border"></p>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <p>Je potřeba povolit instalaci aplikací z neznámých zdrojů:</p>
  
  <p><img src="/files/zjisteni-api/instalace-z-neznamych-zdroju.png" alt="Instalace z neznámých zdrojů" class="border"></p>
  
  </li>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
<li>
  
  <p>Nyní přichází nástroj <a href="https://httptoolkit.tech">HTTP Toolkit
</a>, který zajistí všechno ostatní. Po instalaci a spuštění stačí vybrat <b>Android device via ADB</b> a je to.</p>
  
  <p><img src="/files/zjisteni-api/android-device-via-adb.png" alt="Android device via ADB" class="border"></p>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <p>V emulátoru se povolí jeho připojení:</p>
  
  <p><img src="/files/zjisteni-api/connection-request.png" alt="Connection request" class="border"></p>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <p>Po nějaké době by se mělo nastavit připojení a všechny requesty by se měly zobrazovat na záložce <b>View</b>.</p>
  
  <p><img src="/files/zjisteni-api/zobrazeni-api-requestu.png" alt="Zobrazení API requestů" class="border"></p>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
</ol>


<h2 id="pouziti">Použití API URL</h2>

<p>Když už je známa adresa API a chce ji člověk použít někde jinde, je potřeba zjistit, jaké věci je potřeba posílat, aby to fungovalo.</p>

<p>K tomu se hodí aplikace <a href="/postman">Postman</a>, kde si jde volání odladit, než se použije někde dál.</p>

<p><img src="/files/zjisteni-api/postman-volani-api.png" alt="Postman volání API" class="border"></p>



















<p>Některá API totiž vyžadují <b>posílání různých hlaviček a klíčů</b>.</p>

<p>Všechno potřebné jde vyčíst v HTTP Toolkitu, otestovat v Postmanovi a následně použít, jak je potřeba.</p>