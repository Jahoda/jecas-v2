---
title: "Webhooky: jak je navrhnout a nasadit správně"
headline: "Webhooky: návrh, implementace a bezpečnost"
description: "Co jsou webhooky, jak je spolehlivě přijímat a odesílat, ověřování, opakování, idempotence a ukázky v Node.js a PHP."
date: "2025-09-09"
last_modification: "2025-09-09"
status: 0
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<h2 id="co-jsou-webhooky">Co jsou webhooky</h2>

<p>Webhook je HTTP požadavek poslaný jednou aplikací do druhé ve chvíli, kdy se něco stane. Je to jednoduchý způsob, jak dostávat notifikace v reálném čase bez pollingu.</p>

<ul>
  <li>Zdroj události odešle <b>HTTP POST</b> na dohodnutou URL.</li>
  <li>Tělo požadavku nese data o události, obvykle v <b>JSON</b>.</li>
  <li>Příjemce vrátí <b>2xx</b>, když zprávu převzal. Jinak zdroj zprávu obvykle zopakuje.</li>
</ul>

<figure>
  <svg viewBox="0 0 720 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="40" width="180" height="60" rx="8" fill="#eef2ff" stroke="#4f46e5"/>
    <text x="130" y="75" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#111827">Poskytovatel</text>
    <text x="130" y="95" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#6b7280">Událost</text>
    <rect x="500" y="40" width="180" height="60" rx="8" fill="#ecfeff" stroke="#0891b2"/>
    <text x="590" y="75" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#111827">Příjemce</text>
    <text x="590" y="95" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#6b7280">Endpoint</text>
    <path d="M220 70 L490 70" stroke="#111827" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="355" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#111827">HTTPS POST</text>
    <path d="M500 130 L230 130" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="365" y="150" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#16a34a">200 OK</text>
    <path d="M230 160 C 350 200, 570 200, 590 110" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="360" y="200" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#ef4444">Retry při 4xx/5xx</text>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,5 L0,10 z" fill="#111827"/>
      </marker>
    </defs>
  </svg>
  <figcaption>Tok: poskytovatel odešle požadavek, příjemce potvrdí, při chybě následuje opakování</figcaption>
  
</figure>

<h2 id="kdy-se-hodi">Kdy se hodí</h2>

<ul>
  <li>Platby, fakturace, e‑shop objednávky</li>
  <li>Integrace s CRM, ERP, helpdeskem</li>
  <li>Synchronizace stavů, notifikace o změnách</li>
</ul>

<h2 id="prijem">Příjem webhooku</h2>

<ol>
  <li>Vytvořte <b>POST</b> endpoint s veřejnou URL.</li>
  <li><b>Ověřte podpis</b> zprávy (HMAC, podpis poskytovatele).</li>
  <li>Provádějte <b>idempotentní</b> zpracování (každý event jen jednou).</li>
  <li>Vraťte <b>200</b> co nejrychleji a těžké věci delegujte do fronty.</li>
</ol>

<h3 id="node-prijem">Node.js: ověření podpisu a potvrzení</h3>

<pre><code>import express from 'express'
import crypto from 'crypto'

const app = express()
app.post('/webhooky/vendor', express.raw({ type: 'application/json' }), (req, res) =&gt; {
  const secret = process.env.WEBHOOK_SECRET || ''
  const signature = req.get('X-Signature') || ''
  const expected = crypto.createHmac('sha256', secret).update(req.body).digest('hex')
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return res.status(401).end()
  const event = JSON.parse(req.body.toString('utf8'))
  res.status(200).end()
})

app.listen(3000)
</code></pre>

<h3 id="php-prijem">PHP: ověření podpisu</h3>

<pre><code>&lt;?php
$secret = getenv('WEBHOOK_SECRET') ?: '';
$body = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
$expected = hash_hmac('sha256', $body, $secret);
if (!hash_equals($expected, $signature)) { http_response_code(401); exit; }
$event = json_decode($body, true);
http_response_code(200);
</code></pre>

<h3 id="stavove-kody">Stavové kódy</h3>

<ul>
  <li><b>2xx</b>: zpráva převzata</li>
  <li><b>4xx</b>: trvalý problém (chybné ověření, neznámý event)</li>
  <li><b>5xx</b>: dočasný problém, zdroj zprávu zopakuje</li>
</ul>

<h3 id="idempotence">Idempotence</h3>

<p>Idempotence znamená, že zpracování totožné zprávy opakovaně má stejný výsledek jako jednou. Příjemce uloží identifikátor události a další stejné zprávy přeskočí.</p>

<pre><code>import express from 'express'
const processed = new Set()
const app = express()
app.post('/webhooky/vendor', express.json(), (req, res) =&gt; {
  const id = req.get('X-Event-Id') || req.body.id || ''
  if (!id) return res.status(400).end()
  if (processed.has(id)) return res.status(200).end()
  processed.add(id)
  res.status(200).end()
})
</code></pre>

<h2 id="odesilani">Odesílání webhooků</h2>

<ol>
  <li>Odesílejte <b>POST</b> s JSON a přidejte <b>podpis</b> do hlavičky.</li>
  <li>Implementujte <b>retry s exponenciálním backoffem</b> a dead‑letter queue.</li>
  <li>Udržujte <b>logy</b> a možnost <b>replaye</b> jednotlivých událostí.</li>
</ol>

<h3 id="node-odeslani">Node.js: odeslání s HMAC podpisem</h3>

<pre><code>import crypto from 'crypto'
import fetch from 'node-fetch'

const url = process.env.WEBHOOK_URL || ''
const secret = process.env.WEBHOOK_SECRET || ''
const body = JSON.stringify({ id: 'evt_123', type: 'order.paid' })
const signature = crypto.createHmac('sha256', secret).update(body).digest('hex')
await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Signature': signature }, body })
</code></pre>

<h3 id="client-js">Klientský JavaScript: odeslání</h3>

<p>Pro přímé volání z prohlížeče musí cílový endpoint povolit CORS. Tajemství do klienta nepatří; pokud je vyžadován podpis, odešlete požadavek přes váš server.</p>

<pre><code>const url = 'https://api.example.com/webhooky/vendor'
const body = { id: 'evt_123', type: 'order.paid' }
await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})
</code></pre>

<p>Bezpečnější varianta je použít backend jako proxy, který zprávu podepíše a odešle.</p>

<h2 id="bezpecnost">Bezpečnost</h2>

<ul>
  <li><b>Ověření zdroje</b>: HMAC/PKI podpis nebo ověřené IP.</li>
  <li><b>Tělo zprávy</b> validujte až po ověření podpisu.</li>
  <li><b>HTTPS</b> vždy, tajemství v prostředí.</li>
  <li><b>Rate limiting</b> a oddělené subdomény.</li>
</ul>

<h2 id="lokalni-vyvoj">Lokální vývoj</h2>

<ul>
  <li>Tunel typu ngrok nebo Cloudflare Tunnel.</li>
  <li>Logování raw požadavků a opakované přehrání.</li>
</ul>

<h2 id="sluzby">Příklady služeb využívajících webhooky</h2>

<ul>
  <li>Stripe: platby, vrácení, fakturace</li>
  <li>GitHub: push, pull requesty, release</li>
  <li>Slack: příchozí zprávy, interakce</li>
  <li>Shopify: objednávky, sklad, zákazníci</li>
  <li>PayPal: transakce a disputy</li>
  <li>Twilio: SMS a volání</li>
  <li>Discord: integrace botů</li>
  <li>Notion: změny v databázích</li>
  <li>Contentful: publikace obsahu</li>
</ul>

<h2 id="alternativy">Alternativy webhooků</h2>

<p>Alternativami jsou polling a long polling (jednoduché, vyšší latence a zátěž), WebSockety a Server‑Sent Events (obousměrné či jednosměrné streamování, trvalé spojení a složitější provoz), nebo integrační fronty jako Kafka či RabbitMQ (spolehlivost, škálování, vyšší komplexita a provozní náklady). Webhooky jsou jednoduché a dobře se integrují napříč systémy, ale vyžadují ověřování, idempotenci a robustní retry.</p>

<h2 id="checklist">Checklist</h2>

<ul>
  <li>Veřejná POST URL</li>
  <li>Ověření podpisu</li>
  <li>Rychlá odpověď 2xx</li>
  <li>Idempotence</li>
  <li>Retry a backoff</li>
  <li>Logy a nástroje pro replay</li>
</ul>
