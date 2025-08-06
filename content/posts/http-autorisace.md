---
title: "HTTP autorisace v .htaccess"
headline: "HTTP autorisace v <code>.htaccess</code>"
description: "Jak souborem <code>.htaccess</code> jednoduše omezit přístup na stránku heslem."
date: "2015-08-19"
last_modification: "2015-10-10"
status: 1
tags: ["hesla", "hotova-reseni"]
format: "html"
---

<p>Je-li cílem <b>omezit přístup na stránku</b> pouze pro uživatele, kteří znají <b>jméno a heslo</b>, existuje řada způsobů:</p>

<ol>
  <li>Naprogramovat si přihlašování na straně serveru.</li>
  
  <li>Vytvořit stránku na tajné URL. (Zde je velmi snadné vyzrazení.)</li>
  
  <li>Použít autorisaci na straně serveru.</li>
</ol>


<p>Webový server <b>Apache</b> nabízí poměrně snadný způsob, jak primitivním způsobem <b>stránku zaheslovat</b>.</p>

<p>Jde využít <b>HTTP autorisace</b>, která v prohlížeči vyvolá speciální formulář, takže se ani není potřeba obtěžovat s vytvářením vlastního.</p>

<p><img src="/files/http-autorisace/overeni.png" alt="Oveření uživatele v prohlížeči" class="border"></p>
















<h2 id="priklad">Příklad</h2>


<h3 id="htaccess"><code>.htaccess</code></h3>
<p>V souboru <code>.htaccess</code> umístěném ve složce, kam se má omezit přístup, bude následující:</p>

<pre><code>AuthType Basic
AuthName "Název autorisace"
AuthUserFile "/cesta/k/souboru/<b>.<!-- -->htpasswd</b>"
Require valid-user</code></pre>



<p>Cesta k souboru <code>.<!-- -->htpasswd</code> musí být <b>absolutní (plná)</b>, nikoliv relativní (<a href="https://twitter.com/CechVeVietnamu/status/653055278456291330">doplnil</a> Čech ve Vietnamu).</p>

<p>Za zmínku stojí soubor <code>.<!-- -->htpasswd</code>, kde jsou uložena přihlašovací data:</p>


<h3 id="htpasswd"><code>.<!-- -->htpasswd</code></h3>

<p>Soubor <code>.<!-- -->htpasswd</code> vypadá symbolicky takto:</p>


<pre><code>jmeno:heslo</code></pre>

<p>Heslo je nutné hashovat. Stačí k tomu použít nějaký online nástroj:</p>

<div class="external-content">
  <ul>
    <li><a href="http://lakin.weckers.net/code/htpasswd/">Javascript Htpasswd Generator</a></li>
    
    <li><a href="http://aspirine.org/htpasswd_en.html">htpasswd generator - password encryption</a></li>
    
    <li><a href="http://generator-hesel.station.cz/">Generátor hesla do .<!-- -->htpasswd</a></li>
    
    <li><a href="http://www.htaccesstools.com/htpasswd-generator/">Htpasswd Generator – Create htpasswd</a></li>
  </ul>
</div>



<h2 id="problemy">Problémy v prohlížečích</h2>

<p>Některé prohlížeče nemají <b>rozhraní pro přihlášení</b>, takže se z nich do webů zaheslovaných pomocí <code>.htaccess</code> vůbec nejde dostat.</p>

<p>To je případ například <a href="/edge-mobile">mobilního <b>MS Edge</b></a>. V některých případech (třeba na <b>iPadu</b>) jde autorisací projít zadáním „<code>jmeno:heslo@</code>“ před doménu.</p>

<p>Použití tohoto způsobu zaheslování je proto spíš <b>nouzové řešení</b>.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Apache HTTP Server: <a href="http://httpd.apache.org/docs/2.2/howto/auth.html">Authentication and Authorization</a></li>
</ul>
