---
title: "PHP $_SERVER"
headline: "PHP pole <code>$_SERVER</code>"
description: "Co užitečného obsahuje v PHP vestavěná proměnná <code>$_SERVER</code>."
date: "2014-04-29"
last_modification: "2014-04-29"
status: 1
tags: ["napady", "php"]
format: "html"
---

<p>Celá <a href="http://cz2.php.net/manual/en/reserved.variables.server.php">proměnná <code>$_SERVER</code></a> obsahuje spoustu údajů. Které jsou <b>nejzajímavější a nejpoužívanější</b>?</p>

<dl>

  <dt id="remote-addr"><code>$_SERVER["REMOTE_ADDR"]</code></dt>
  
  <dd>
    <p>Obsahuje IP adresu návštěvníka.</p>
  </dd>
  
  <dt id="http-referer"><code>$_SERVER["HTTP_REFERER"]</code></dt>
  
  <dd>
    <p>Informace o předchozí navštívené stránce. Může být prázdné v případě, že:</p>
    
    <ul>
      
      <li>Návštěvník zadal adresu přímo do prohlížeče.</li>
      
      <li>Posílání <a href="/referer">referreru</a> je uživatelem zakázáno nebo ho blokuje <a href="/noreferrer"><code>rel=noreferrer</code></a>.</li>
    </ul>
  </dd>  
  
  <dt id="http-user-agent"><code>$_SERVER["HTTP_USER_AGENT"]</code></dt>
  
  <dd>
    <p>Z hlavičky <code>user-agent</code> je možné zjistit informace o <b>prohlížeči</b>, <b>operačním systému</b> a podobně.</p>
    
    <p>Tytéž informace umí zjistit i JavaScript přes <code>navigator.userAgent</code>.</p>
    
    <p class="live">
<script>
  document.write(navigator.userAgent);
</script>
    </p>
    
    <p>Hodnota <code>$_SERVER["HTTP_USER_AGENT"]</code> se dá využívat k <a href="/css-pro-ie#detekce">detekcím verse prohlížeče</a> nebo třeba ke zjištěné <a href="/mobilni-web#detekce">prohlížeče mobilního</a>.</p>
  </dd>
  
  <dt id="request-uri"><code>$_SERVER["REQUEST_URI"]</code></dt>
  
  <dd>
    <p>URL aktuální stránky očištěná o doménu. Pro stránku <code>http://jecas.cz/server</code> bude <code>REQUEST_URI</code> obsahovat <code>/server</code>.</p>
    
    <p>Využití se najde při <b>přepisování adres</b> s využitím souboru <code>.htaccess</code> nebo <b>logování akcí uživatelů</b>, kde je vhodné URL ukládat.</p>
  </dd>
  
  <dt id="query-string"><code>$_SERVER["QUERY_STRING"]</code></dt>
  
  <dd>
    <p>Taktéž se týká URL a obsahuje obsah <code>$_SERVER["REQUEST_URI"]</code> za otazníkem, pokud za otazníkem nějaký obsah je.</p>
  </dd>
  
  <dt id="http-accept-language"><code>$_SERVER["HTTP_ACCEPT_LANGUAGE"]</code></dt>
  
  <dd>
    <p>Dá se používat k <b>detekci jazyku uživatele</b>. Obsah může vypadat takto:</p>
    
    <pre><code>cs-CZ,cs;q=0.9,en;q=0.8</code></pre>
    
    <p>Hodnota za <code>q=</code> uvádí prioritu daného jazyka (vyšší číslo = vyšší priorita). Dá se ovlivnit v <b>nastavení prohlížeče</b>.</p>
  </dd>
</dl>