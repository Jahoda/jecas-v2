---
title: "Odeslání příspěvku přes Facebook API"
headline: "Odeslání příspěvku na stránku přes FB API"
description: "Jak v PHP odesílat příspěvky na Facebook stránku (Page) pomocí Facebook API."
date: "2014-06-27"
last_modification: "2014-09-24"
status: 1
tags: ["facebook", "hotova-reseni"]
format: "html"
---

<p>Máme-li vlastní <b>FB stránku</b> a chceme například dát vědět jejím fanouškům o novém příspěvku na webu, hodí se možnost odeslat zprávu na Facebook přímo z <b>redakčního systému</b>.</p>

<p>Jak toho docílit?</p>


<h2 id="aplikace">Vytvoření aplikace</h2>

<ol>
  <li>
    <p>Kliknout na stránce <a href="https://developers.facebook.com/">developers.facebook.com</a> na <i>Apps → Create a New App</i>.</p>
    <p><img src="/files/facebook-poslat/vytvoreni-nove-aplikace.png" alt="Vytvoření aplikace" class="border"></p>

  </li>
  
  <li>
    <p>Zadat název aplikace a určit kategorii. V případě, že chceme využít API k posílání příspěvků na svou FB stránku je vhodné zvolit <i>Apps for Pages</i>.</p>
    
    <p><img src="/files/facebook-poslat/vytvoreni-aplikace.png" alt="Vytvoření aplikace" class="border"></p>    
  </li>
  
  <li>
    <p>Po opsání ověřovacího kódu by se aplikace měla vytvořit.</p>
    
    <p><img src="/files/facebook-poslat/vytvorena-aplikace.png" alt="Vytvoření aplikace" class="border"></p>    
  </li>
  
  <li>
    <p>Na stránce <a href="https://developers.facebook.com/tools/explorer/">developers.facebook.com/tools/explorer/</a> si potom aplikaci vybereme a zvolíme <i>Get Access Token</i>.</p>
    
    <p><img src="/files/facebook-poslat/access-token.png" alt="Get Access Token" class="border"></p>
  </li>
  
  <li>
    <p>V objevivším se okně zvolíme oprávnění, která budeme potřebovat. Pro přispívání na vlastní Facebookovou stránku se budou hodit položky <i>manage_pages</i> a <i>publish_actions</i> z karty <i>Extended Permissions</i>.</p>
    
    <p><img src="/files/facebook-poslat/nastaveni-opravneni.png" alt="Nastavení oprávnění" class="border"></p>
    
  </li>
  
  <li>
    <p>Nyní je třeba aplikaci udělit oprávnění ze svého účtu na Facebooku.</p>
    
    <p><img src="/files/facebook-poslat/prispivani.png" alt="Povolení přístupu" class="border"></p>    
    
    <p>Nejprve povolit aplikaci přístup do svého účtu a potom do svých <i>FB Pages</i>.</p>
    
    <p><img src="/files/facebook-poslat/manage-pages.png" alt="Povolení přístupu" class="border"></p>    
    
  </li>
  
  <li>
    <p>Nyní je vše připravené k <b>využívání API</b>.</p>
    
    
  </li>
</ol>



<h2 id="publikovani">Publikování příspěvků</h2>

<p>Pro psaní na stránku „jako stránka“ potřebujeme zjistit:</p>

<ol>
  <li>
    <p><b>ID stránky</b>. To získáme v nastavení stránky v nabídce <i>Page Info</i> úplně dole jako <i>Facebook Page ID</i>.</p>
    
    <p><img src="/files/facebook-poslat/id-stranky.png" alt="Získání ID stránky" class="border"></p>
  </li>
  

  <!--<li>
    <p><b>Access token</b> stránky. Ten lze získat například využitím <a href="https://developers.facebook.com/tools/explorer/">Graph API Exploreru</a>.</p>
    
    <p>Po vybrání příslušné aplikace stačí poslat <b>GET požadavek</b> na:</p>
    
    <pre><code>&lt;id-stránky>/?fields=access_token</code></pre>
    
    <p>Tj. například:</p>
    
    <p><img src="/files/facebook-poslat/access-token-pozadavek.png" alt="Získání access tokenu stránky" class="border"></p>
  </li>-->
  
   <li>
    <p><b>App ID</b> a <b>App Secret</b></p>
     
        <p><img src="/files/facebook-poslat/vytvorena-aplikace.png" alt="Vytvoření aplikace" class="border"></p>
  </li>
</ol>


<!--
<h3 id="odeslani">Samotné odeslání</h3>

<p>S těmito daty už není problém provést odeslání příspěvku na stránku krátkým PHP skriptem.</p>

<pre><code>&lt;?php 
define("ACCESS_TOKEN", "");
define("PAGE_ID", "");

$url = "https://graph.facebook.com/" . PAGE_ID . "/feed";
$attachment = array(
   'access_token' => ACCESS_TOKEN,
   'message' => 'Příspěvek zaslaný přes FB API',
);

 $ch = curl_init();
 curl_setopt($ch, CURLOPT_URL, $url);
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
 curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($ch, CURLOPT_POST, true);
 curl_setopt($ch, CURLOPT_POSTFIELDS, $attachment);
 $result = curl_exec($ch);
 header('Content-type:text/html');
 curl_close($ch);

 echo $result;</code></pre>

-->




























































<p>Celý proces odeslání příspěvku potom funguje následovně:</p>

<ol>
  <li>
    <p>V prohlížeči, kde jsme <b>přihlášeni k účtu</b>, který má oprávnění spravovat stránku, spustíme vlastní PHP skript pro odeslání (<code>example.com/odeslat.php</code>).</p>
  </li>
  
  <li>
    <p>Tento skript hlavičkou <code>header</code> přesměruje na stránku Facebooku (předá ji ID aplikace a URL sebe sama). V případě, že je člověk přihlášen ke svému profilu, Facebook <b>přesměruje zpátky</b> na určenou adresu a v parametru URL (tzv. <i>query string</i> – QS) pošle kód.</p>
  </li>
  
  <li>
    <p>S tímto <i>kódem</i> můžeme získat <i>access token</i> k dané <b>aplikaci</b>.</p>
  </li>
  
  <li>
    <p>S <i>access tokenem</i> <b>aplikace</b> následně získáme <i>access token</i> stránky (<i>Page</i>).</p>
  </li>
  
  <li>
    <p>S <i>access tokenem</i> <b>stránky</b> konečně můžeme učinit konečný požadavek, kterým <b>publikujeme příspěvek</b>.</p>
  </li>
</ol>

<p><a href="https://github.com/Jahoda/send-facebook-page/blob/master/index.php">Hotový skript na GitHubu</a> (našel jsem ho někde na internetu, šel by napsat lépe, ale <b>funguje</b>)</p>


<h2 id="odkazy">Odkazy a zdroje</h2>

<ul>  
  <li>Developers.facebook.com: <a href="https://developers.facebook.com/docs/graph-api/using-graph-api/v2.0#publishing">Publikování</a></li>
</ul>

