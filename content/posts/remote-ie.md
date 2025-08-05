---
title: "Samostatný IE 11"
headline: "Samostatný Internet Explorer 11"
description: "Microsoft nabízí samostatný cloudový Internet Exploreru 11, který může běžet nezávisle na aktuálním IE v systému."
date: "2014-11-27"
last_modification: "2014-12-01"
status: 1
tags: ["produktivita", "webove-prohlizece"]
format: "html"
---

<div class="internal-content">
  <p>Při <b>testování webu</b> se hodí provozovat <a href="/prohlizece">různé prohlížeče</a>.</p>
</div>  

<p><b>Internet Explorer</b> má na rozdíl od ostatních kvůli své politice vydávání nových versí jisté specifikum — jednotlivé <b>IE</b> se od sebe poměrně liší.</p>

<p>Pro plnohodnotné testování tedy je potřeba instalovat různé Windows s různými <b>IE</b> do <b>virtuálních strojů</b>, spokojit se s programem <b>IETester</b> nebo se k instanci <b>IE</b> připojovat online přes <a href="/prohlizece#browserstack">BrowserStack</a>.</p>

<p>Microsoft to nyní do jisté míry řeší vytvořením <b>Azure RemoteApp</b> obsahující <a href="/ie11"><b>Internet Explorer 11</b></a> běžící pod <i>Windows Technical Preview</i> (serverové variantě <a href="/windows-10">Windows 10</a>), kterou je možné spustit na mnoha platformách:</p>

<ul>
  <li>Windows,</li>
  <li>Mac OSX,</li>
  <li>iOS,</li>
  <li>Android</li>
</ul>


<h2 id="postup">Postup</h2>

<p>Postup ve <b>Windows 7</b> je následující.</p>

<ol>
  <li>
    <p>Na stránce <b>RemoteIE</b> se stáhne aplikace:</p>
    
    <p><a href="https://remote.modern.ie/" class="button">Web RemoteIE</a></p>
    
    <p><img src="/files/remote-ie/aplikace.png" alt="Stažená aplikace RemoteIE" class="border"></p>
  </li>
  
  <li>
    <p>Po spuštění a přihlášení se k <b>Windows účtu</b> se celá stáhne a mělo by ji být možné <b>spustit</b>.</p>
    
    <p><img src="/files/remote-ie/spusteni-aplikace.png" alt="Stažená aplikace RemoteIE" class="border"></p>
  </li>
  
  <li>
    <p>Po chvilce načítání by měl být <b>Internet Explorer</b> připraven.</p>
    
    <p><img src="/files/remote-ie/remote-ie.png" alt="Spuštěný RemoteIE" class="border"></p>
    
    <p>Při rozkliknutí podrobností během načítání je možné vidět versi systému.</p>
    
    <p><img src="/files/remote-ie/loading.png" alt="Načítání aplikace" class="border"></p>
  </li>
</ol>

