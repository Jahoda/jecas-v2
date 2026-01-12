---
title: "GET vs POST"
headline: "HTTP metody GET a POST"
description: "Kdy použít metodu GET a kdy POST. Rozdíly mezi metodami, datové limity a doporučení pro správné použití."
date: "2026-01-12"
status: 1
tags: ["html", "formulare", "zabezpeceni"]
format: "html"
---

<p>HTTP metody <b>GET</b> a <b>POST</b> jsou dva základní způsoby, jak prohlížeč komunikuje se serverem. Jejich správné použití ovlivňuje <b>bezpečnost</b>, <b>výkon</b> i <b>funkčnost</b> webových aplikací.</p>

<h2 id="zakladni-rozdily">Základní rozdíly</h2>

<table>
<thead>
<tr>
<th>Vlastnost</th>
<th>GET</th>
<th>POST</th>
</tr>
</thead>
<tbody>
<tr>
<td>Data v URL</td>
<td>Ano (query string)</td>
<td>Ne (v těle požadavku)</td>
</tr>
<tr>
<td>Viditelnost dat</td>
<td>Data viditelná v adresním řádku</td>
<td>Data skrytá (ale viditelná ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a>)</td>
</tr>
<tr>
<td>Záložky</td>
<td>Lze uložit do záložek</td>
<td>Nelze uložit s daty</td>
</tr>
<tr>
<td>Cache</td>
<td>Může být cachováno</td>
<td>Není cachováno</td>
</tr>
<tr>
<td>Historie prohlížeče</td>
<td>Zůstává v historii</td>
<td>Nezůstává v historii</td>
</tr>
<tr>
<td>Idempotence</td>
<td>Ano (opakované volání má stejný efekt)</td>
<td>Ne</td>
</tr>
</tbody>
</table>

<h3 id="idempotence">Co je idempotence?</h3>
<p><b>Idempotentní operace</b> je taková, která při opakovaném provedení dává <b>stejný výsledek</b> jako při prvním provedení. Metoda GET je idempotentní – když 10× načtete stejnou stránku, dostanete 10× stejný výsledek a na serveru se nic nezmění.</p>

<p>Metoda POST idempotentní <b>není</b> – když 10× odešlete objednávku, vytvoří se 10 objednávek. Proto prohlížeče zobrazují varování při obnovení stránky s POST požadavkem.</p>

<h2 id="datove-limity">Datové limity</h2>

<h3>GET</h3>
<p>Metoda GET má <b>omezení délky URL</b>, které se liší podle prohlížeče a serveru:</p>

<ul>
<li><b>Internet Explorer</b>: 2 083 znaků</li>
<li><b>Chrome, Firefox, Safari</b>: přibližně 64 000 znaků</li>
<li><b>Apache</b>: výchozí limit 8 190 znaků (konfigurovatelné pomocí <code>LimitRequestLine</code>)</li>
<li><b>Nginx</b>: výchozí limit 8 KB pro celý požadavek</li>
<li><b>IIS</b>: 16 384 znaků</li>
</ul>

<p><b>Doporučení:</b> Pro maximální kompatibilitu nepřekračovat <b>2 000 znaků</b> v URL.</p>

<h3>POST</h3>
<p>Metoda POST nemá teoretický limit na straně protokolu HTTP, ale existují <b>praktická omezení</b>:</p>

<ul>
<li><b>PHP</b>: <code>post_max_size</code> (výchozí 8 MB), <code>upload_max_filesize</code> (výchozí 2 MB)</li>
<li><b>Apache</b>: <code>LimitRequestBody</code> (výchozí neomezeno)</li>
<li><b>Nginx</b>: <code>client_max_body_size</code> (výchozí 1 MB)</li>
<li><b>IIS</b>: <code>maxRequestLength</code> (výchozí 4 MB)</li>
</ul>

<p>Tyto limity lze na serveru <b>upravit podle potřeby</b>. Při vývoji na <a href="/localhost">lokálním serveru</a> (WAMP, XAMPP) se limity nastavují v souboru <code>php.ini</code>.</p>

<h2 id="kdy-get">Kdy použít GET</h2>

<p>Metodu GET použijte pro:</p>

<ol>
<li><b>Načítání dat</b> – zobrazení stránky, článku, produktu</li>
<li><b>Vyhledávání</b> – výsledky vyhledávání by měly být sdílitelné přes URL</li>
<li><b>Filtrování a řazení</b> – parametry v URL umožní uložit konkrétní pohled</li>
<li><b>Stránkování</b> – číslo stránky v URL (<code>?page=2</code>)</li>
<li><b>API požadavky na čtení</b> – RESTful GET endpointy</li>
</ol>

<p>GET je vhodný tam, kde potřebujete na výsledek <b>odkázat</b> nebo ho sdílet. Vyhledávače mohou stránky s <a href="/query-string">query stringem</a> indexovat, což je někdy nežádoucí (duplicitní obsah). V takovém případě se problém řeší pomocí <code>&lt;link rel="canonical"&gt;</code>.</p>

<pre><code>&lt;!-- Vyhledávací formulář – GET je správná volba --&gt;
&lt;form action="/search" method="get"&gt;
  &lt;input type="text" name="q" placeholder="Hledat..."&gt;
  &lt;button type="submit"&gt;Hledat&lt;/button&gt;
&lt;/form&gt;
&lt;!-- Výsledek: /search?q=dotaz --&gt;</code></pre>

<h2 id="kdy-post">Kdy použít POST</h2>

<p>Metodu POST použijte pro:</p>

<ol>
<li><b>Odesílání formulářů</b> – registrace, přihlášení, kontaktní formuláře</li>
<li><b>Nahrávání souborů</b> – GET neumožňuje přenos souborů</li>
<li><b>Citlivá data</b> – hesla, osobní údaje, platební informace</li>
<li><b>Operace měnící stav</b> – vytvoření objednávky, odeslání komentáře</li>
<li><b>Velký objem dat</b> – cokoliv nad 2 000 znaků</li>
</ol>

<pre><code>&lt;!-- Přihlašovací formulář – POST je bezpečnější --&gt;
&lt;form action="/login" method="post"&gt;
  &lt;input type="text" name="username"&gt;
  &lt;input type="password" name="password"&gt;
  &lt;button type="submit"&gt;Přihlásit&lt;/button&gt;
&lt;/form&gt;</code></pre>

<h2 id="bezpecnost">Bezpečnostní aspekty</h2>

<h3>GET není bezpečný pro citlivá data</h3>
<ul>
<li>Data v URL se ukládají do <b>historie prohlížeče</b></li>
<li>URL se může objevit v <b>logu serveru</b></li>
<li>URL může být zachycena v <b>HTTP Referer</b> hlavičce</li>
<li>URL může někdo <b>zahlédnout přes rameno</b></li>
</ul>

<h3>POST není automaticky bezpečný</h3>
<p>Samotné použití POST <b>nezajišťuje bezpečnost</b>. Pro skutečné zabezpečení je nutné:</p>
<ul>
<li>Používat <b>HTTPS</b> pro šifrování přenosu</li>
<li>Implementovat <a href="/bezpecnost#csrf">CSRF ochranu</a></li>
<li>Validovat a sanitisovat vstupní data na serveru</li>
</ul>

<h2 id="prehled">Přehled použití</h2>

<table>
<thead>
<tr>
<th>Situace</th>
<th>Metoda</th>
<th>Důvod</th>
</tr>
</thead>
<tbody>
<tr>
<td>Zobrazení stránky</td>
<td>GET</td>
<td>Čtení dat, cachování</td>
</tr>
<tr>
<td>Vyhledávání</td>
<td>GET</td>
<td>Sdílení URL s výsledky</td>
</tr>
<tr>
<td>Přihlášení</td>
<td>POST</td>
<td>Citlivá data (heslo)</td>
</tr>
<tr>
<td>Registrace</td>
<td>POST</td>
<td>Vytvoření záznamu, citlivá data</td>
</tr>
<tr>
<td>Upload souboru</td>
<td>POST</td>
<td>Binární data, velký objem</td>
</tr>
<tr>
<td>Odeslání objednávky</td>
<td>POST</td>
<td>Změna stavu, neopakovat</td>
</tr>
<tr>
<td>Filtrování produktů</td>
<td>GET</td>
<td>Sdílení URL, záložky</td>
</tr>
<tr>
<td>Smazání položky</td>
<td>POST/DELETE</td>
<td>Změna stavu</td>
</tr>
</tbody>
</table>

<h2 id="jine-metody">Další HTTP metody</h2>

<p>Kromě GET a POST existují další metody používané zejména v <b>REST API</b>:</p>

<ul>
<li><b>PUT</b> – aktualizace celého záznamu</li>
<li><b>PATCH</b> – částečná aktualizace záznamu</li>
<li><b>DELETE</b> – smazání záznamu</li>
<li><b>HEAD</b> – jako GET, ale vrací pouze hlavičky</li>
<li><b>OPTIONS</b> – zjištění podporovaných metod</li>
</ul>

<p>HTML formuláře podporují pouze <b>GET a POST</b>. Pro ostatní metody je nutné použít <a href="/ajax">AJAX</a> nebo skrytý <code>_method</code> parametr.</p>
