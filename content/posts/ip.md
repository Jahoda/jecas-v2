---
title: "IP adresa"
headline: "IP adresa, prohlížeč a jazyk"
description: "Zjištění IP adresy, prohlížeče a preferovaného jazyka návštěvníka."
date: "2014-10-31"
status: 1
tags: ["lokalisace", "php"]
format: "html"
---

<p>Tato stránka ukazuje informace, které server dokáže zjistit o návštěvníkovi.</p>

<div class="live">
  <table>
    <tr>
      <th>IP adresa</th>
      <td><code id="visitor-ip">načítám…</code></td>
    </tr>
    <tr>
      <th>Prohlížeč</th>
      <td><code id="visitor-ua">načítám…</code></td>
    </tr>
    <tr>
      <th>Jazyk (HTTP)</th>
      <td><code id="visitor-lang-http">načítám…</code></td>
    </tr>
    <tr>
      <th>Jazyk (JS)</th>
      <td><code id="visitor-lang-js">načítám…</code></td>
    </tr>
  </table>
  <script>
    document.getElementById('visitor-lang-js').textContent = navigator.language || navigator.userLanguage;
    fetch('/api/ip')
      .then(r => r.json())
      .then(data => {
        document.getElementById('visitor-ip').textContent = data.ip;
        document.getElementById('visitor-ua').textContent = data.userAgent;
        document.getElementById('visitor-lang-http').textContent = data.acceptLanguage;
      })
      .catch(() => {
        document.getElementById('visitor-ip').textContent = 'nedostupné';
        document.getElementById('visitor-ua').textContent = navigator.userAgent;
        document.getElementById('visitor-lang-http').textContent = 'nedostupné';
      });
  </script>
</div>

<h2 id="ip">IP adresa</h2>

<p>IP adresa je unikátní identifikátor zařízení v síti. Server ji získá z každého HTTP požadavku.</p>

<p>V <a href="/php">PHP</a> je IP adresa dostupná v proměnné <code>$_SERVER['REMOTE_ADDR']</code>:</p>

<pre><code>$ip = $_SERVER['REMOTE_ADDR'];</code></pre>

<p>Pokud je návštěvník za proxy serverem, skutečná IP může být v hlavičce <code>X-Forwarded-For</code>:</p>

<pre><code>$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];</code></pre>

<h2 id="prohlizec">Prohlížeč (User-Agent)</h2>

<p>Informace o prohlížeči jsou dostupné v hlavičce <code>User-Agent</code>:</p>

<pre><code>$userAgent = $_SERVER['HTTP_USER_AGENT'];</code></pre>

<p>V JavaScriptu:</p>

<pre><code>navigator.userAgent</code></pre>

<h2 id="jazyk">Preferovaný jazyk</h2>

<p>Jazyk návštěvníka lze zjistit z HTTP hlavičky <code>Accept-Language</code>:</p>

<pre><code>$jazyk = $_SERVER['HTTP_ACCEPT_LANGUAGE'];</code></pre>

<p>V JavaScriptu:</p>

<pre><code>navigator.language</code></pre>

<p>Jazyk zjištěný JavaScriptem se může lišit od HTTP hlavičky – záleží na nastavení prohlížeče vs. operačního systému.</p>

<p>Více o detekci jazyka:</p>

<div class="internal-content">
  <ul>
    <li><a href="/jazyk">Výběr jazyku stránky</a></li>
    <li><a href="/geoip">Lokalisace podle IP v PHP</a></li>
  </ul>
</div>
