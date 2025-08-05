---
title: "Parsování URL v JavaScriptu"
headline: "Parsování URL v JavaScriptu"
description: "Jak elegantně parsovat adresy webových stránek v JavaScriptu."
date: "2014-10-06"
last_modification: "2017-02-01"
status: 1
tags: ["js", "napady"]
format: "html"
---

<p>V případě, že máme URL a potřebujeme z ní JavaScriptem <b>získat jednotlivé části</b> jako například:</p>

<ul>
  <li>protokol,</li>
  <li>název domény,</li>
  <li>cestu k souboru,</li>
  <li>parametry za otazníkem (<a href="http://en.wikipedia.org/wiki/Query_string"><i>query string</i></a>),</li>
  <li>hash (obsah za <code>#</code>)</li>
</ul>

<p>Je řešení buď používat <b>regulární výrazy</b>, nebo využít toho, že všechny tyto údaje umí JavaScript snadno vytáhnout ze značky <code>&lt;a></code>.</p>

<div class="soft">
  <p>V prohlížečích novějších než <b>IE 11</b>, jde použít rovnou <a href="#url">URL API</a>.</p>
</div>

<p>Vytvoříme-li proto odkaz a nastavíme-li mu požadovanou URL, potřebné údaje získáme velmi elegantně.</p>

<pre><code>var adresa = "http://example.com/cesta/skritp.php?promena=1#kotva";
var odkaz = document.createElement("a");
odkaz.href = adresa;</code></pre>

<div class="live">
  <form onsubmit="nastavit(this); return false">
    <p><input oninput="nastavit(this.form)" onkeyup="nastavit(this.form)" onpaste="nastavit(this.form)" size="60" name="url" value="http://example.com:8080/cesta/skript.php?promena=1#kotva"></p>
    <p>
      <button>Parsovat</button>
    </p>
    
    <div id="vystup"></div>
  </form>
  <script>
    var odkaz = document.createElement("a");
    var vystup = document.getElementById("vystup");
    
    function nastavit(el) {
      odkaz.href = el.url.value;   
      var vlastnosti = ["protocol", "hostname", "pathname", "search", "hash", "port"];
      var obsah = "";
      for (var i = 0; i < vlastnosti.length; i++) {
        obsah += "<tr><th>" + vlastnosti[i] + "<td><code>" + odkaz[vlastnosti[i]] + "</code>";
      }
      vystup.innerHTML = "<table>" + obsah + "</table>";      
    }
  </script>  
</div>

<dl>
  <dt id="protocol"><code>protocol</code></dt>
  <dd>
    <p>Bude dostupný ve vlastnosti <code>odkaz.protocol</code>, zpravidla <code>http:</code> nebo <code>https:</code> (včetně dvojtečky).</p>
  </dd>
  
  <dt id="hostname"><code>hostname</code></dt>
  <dd>
    <p>Název domény bude v <code>odkaz.hostname</code>.</p>
  </dd>  
  
  <dt id="pathname"><code>pathname</code></dt>
  <dd>
    <p>Cesta ke skriptu – <code>odkaz.pathname</code>.</p>
  </dd>
  
  <dt id="search"><code>search</code></dt>
  <dd>
    <p>Obsah za otazníkem – <code>odkaz.search</code>.</p>
  </dd> 
  
  
  <dt id="hash"><code>hash</code></dt>
  <dd>
    <p>Obsah za mřížkou včetně té mřížky – <code>odkaz.hash</code>.</p>
  </dd>   
  
  <dt id="port"><code>port</code></dt>
  <dd>
    <p>Získat je možné i port (je-li uveden v URL) – <code>odkaz.port</code>. To ale bývá velmi zřídka.</p>
  </dd>     
</dl>

<p><a href="http://kod.djpw.cz/bphb-">Zjednodušená ukázka</a> pro testování ve starých prohlížečích.</p>
  
<h2 id="url">URL API</h2>
  
  <p>V nových prohlížečích (mimo <b>IE</b>) existuje <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL">URL API</a>. Tím odpadá potřeba parsovat URL přes vytváření odkazu, ale jde jít hezky na přímo.</p>

  
  <pre><code>const url = new URL("http://example.com:8080/cesta/skript.php?promena=1#kotva")</code></pre>
  
  
  <p>Výstupem je:</p>
  
<pre><code>hash: "#kotva"
host: "example.com:8080"
hostname: "example.com"
href: "http://example.com:8080/cesta/skript.php?promena=1#kotva"
origin: "http://example.com:8080"
password: ""
pathname: "/cesta/skript.php"
port: "8080"
protocol: "http:"
search: "?promena=1"
searchParams: URLSearchParams {}
username: ""</code></pre>  
  
  
  
<p>Pokud parametr předávaný do <code>URL</code> nemusí být validní, nabízí se to celé obalit do <code>try</code> – <code>catch</code> bloku:</p>
  
<p>Přísnější validace URL tak může vypadat třeba takto:</p>  
  
<pre><code>export const validateUrl = (webUrl: string) => {
  try {
    const url = new URL(webUrl)

    const isProtocolValid = ['http:', 'https:'].includes(url.protocol)

    const hostnameParts = url.hostname.split('.')
    const isTldExist = hostnameParts.filter(part => part.length > 0).length > 1

    const tld = hostnameParts[hostnameParts.length - 1]
    const isTldNaN = isNaN(parseInt(tld))

    const isTldTwoMoreChars = tld.length >= 2

    return isProtocolValid &amp;&amp; isTldExist &amp;&amp; isTldNaN &amp;&amp; isTldTwoMoreChars
  } catch (_e) {
    return false
  }
}  
</code></pre>
  
  
  
  <h3 id="punycode">Punycode</h3>
  
  <p>Punycode je zjednodušeně řečeno převod diakritiky v doméně na základní (ASCII) znaky.</p>
  
  <p>Funkce <code>URL</code> to dělá automaticky. Takže z domény obsahující <code>é</code> (e s čárkou) <code>https://éxample.com</code> vznikne <code>https://xn--xample-9ua.com/</code>.</p>
  
  
  <p>Takovou doménu jde detakovat třeba pomocí podmínky:</p>
  
  
  <pre><code>if (url.hostname.includes('xn--'))</code></pre>

<h2 id="php">Parsování URL v PHP</h2>

<p>V jazyku PHP k <b>parsování adres</b> slouží funkce <a href="http://php.net/manual/en/function.parse-url.php"><code>parse_url</code></a>.</p>

