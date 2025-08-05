---
title: "Jak umožnit načítání stránky v rámu pomocí frame-ancestors"
headline: "Zobrazování stránek v rámech s <code>frame-ancestors</code>"
description: "Pomocí CSP hlavičky <code>frame-ancestors</code> jde umožnit načtení stránky do <code>&lt;iframe></code>."
date: "2023-07-01"
last_modification: "2023-07-04"
status: 1
tags: ["webove-prohlizece", "zabezpeceni"]
format: "html"
---

<p>HTML značka <a href="/ramy#iframe"><code>&lt;iframe></code></a> má dost zajímavou historii.</p>

<p>V dávných dobách se používala pro načítání společných částí stránek jako je třeba menu nebo patička (než se víc prosadilo např. <a href="/include">skládání obsahu v PHP</a>).</p>


<p>Největší využití má ale nejspíš pro zobrazení cizích webů.</p>

<p>Dříve se touto značkou hojně řešilo vkládání dynamického obsahu. Jako třeba různých anket, chatů, komentářů a podobně.</p>

<p><img src="/files/frame-ancestors/anketa.png" alt="Anketa" class="border"></p>

















<p>Takové věci se dnes obvykle řeší spíš JavaScriptem, který do stránky přímo přidává potřebné HTML elementy.</p>

<p>Asi nejrozšířenější je používání <code>&lt;iframe></code> pro <a href="/reklama">reklamu</a>, protože JS je hodně mocný kvůli tomu, že má prakticky neomezenou kontrolu nad stránkou.</p>

<p>A u reklamy, která se ve finále často načítá bůhvíodkud, je spíš žádoucí, aby se stránkou nemohla manipulovat.</p>



<h2 id="clickjacking">Clickjacking</h2>

<p>Další hodně populární využití rámů byl tzv. <a href="/clickjacking">clickjacking</a>.</p>

<p><img src="/files/clickjacking/priklad.jpg" alt="Clickjacking" class="border"></p>























<p>To spočívalo v tom, že se na stránku umístil nějaký lákavý prvek, na který má návštěvník kliknout. Přes ten se <a href="/position#absolute">absolutně naposicovala</a> nějaká stránka v <code>&lt;iframe></code>.</p>

<p>Díky zprůhlednění rámu této stránky CSS vlastností <a href="/opacity"><code>opacity</code></a> tak mohl návštěvník nevědomky kliknout na nějakou akci.</p>



<h2 id="zakaz">Zákaz načtení do <code>&lt;iframe></code></h2>

<p>Jako prevence clickjackingu je dost běžné, že dnes skoro žádný web nejde do rámu načíst.</p>

<p><img src="/files/frame-ancestors/twitter-iframe-deny.png" alt="Twitter iframe deny" class="border"></p>



<p>Dříve se to řešilo hlavičkou <code>X-Frame-Options</code>:</p>

<pre><code>X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN</code></pre>








<h2 id="povoleni">Povolení vybraných domén</h2>

<p>Právě <code>frame-ancestors</code> je nástupcem <code>X-Frame-Options</code> sloužící k povolení konkrétních webů, které mohou danou stránku načíst do rámu.</p>

<p>Tyto domény je nutné vyjmenovat. Takže provozovatel webu musí ručně <i>udělit souhlas</i> s načítáním do rámu. Jinak to prohlížeče zablokují.</p>

<p>Používá se přes hlavičku <code>Content-Security-Policy</code>:</p>


<pre><code>Content-Security-Policy: frame-ancestors 'self' https://jecas.cz https://*.example.com;</code></pre>




<p>Tento zápis znamená, že stránka, která tuto hlavičku posílá, může být vložena do rámu na:</p>

<ol>
  <li>
    <p><code>'self'</code> – na stejné doméně</p>
  </li>
  <li>
    <p><code>https://jecas.cz</code> – na stránce <code>https://jecas.cz</code></p>
  </li>
  <li>
    <p><code>https://*.example.com</code> – na libovolné subdoméně <code>example.com</code> s <a href="/https">HTTPS protokolem</a></p>
  </li>
</ol>

<p>Klíčovým slovem <code>'none'</code> se celkově zablokuje načtení do rámu.</p>

<div class="external-content">
  <ul>
    <li>
      MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors">CSP: frame-ancestors</a>
    </li>
  </ul>
</div>


<h2 id="hlavicka">Jak nastavit HTTP hlavičku</h2>

<p>Nastavení <code>Content-Security-Policy</code> hlavičky závisí na použité technologii.</p>

<p>V každém případě musí hlavička přijít přímo ze serveru. Nastavit ji například klientským JS tak není možné.</p>


<h3 id="apache">Apache <code>.htaccess</code></h3>

<pre><code>Header set Content-Security-Policy "frame-ancestors 'self' https://example.com"</code></pre>


<h3 id="nginx">Nginx</h3>

<pre><code>add_header Content-Security-Policy "frame-ancestors 'self' https://example.com";
</code></pre>


<h3 id="php">PHP</h3>

<pre><code>header("Content-Security-Policy: frame-ancestors 'self' https://example.com");
</code></pre>