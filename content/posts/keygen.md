---
title: "HTML značka keygen"
headline: "HTML značka <code>&lt;keygen></code>"
description: "K čemu sloužila HTML značka <code>&lt;keygen></code>."
date: "2016-03-17"
last_modification: "2025-08-31"
status: 1
tags: [html, zabezpeceni, formulare]
format: "html"
---

<p>HTML značka <code>&lt;keygen></code> byla navržena pro generování kryptografických klíčů přímo v prohlížeči. Jejím hlavním účelem bylo vytváření veřejných a soukromých klíčů pro asymetrické šifrování bez nutnosti server-side zpracování.</p>

<h2 id="jak-fungoval-keygen">Jak fungoval keygen</h2>

<p>Element <code>&lt;keygen></code> vytvářel páry klíčů (veřejný a soukromý) přímo v prohlížeči:</p>

<pre><code class="language-html">&lt;form method="POST"&gt;
  &lt;keygen
    name="key"
    challenge="...optional challenge string..."
    keytype="RSA" /&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

<p>Mohl se vykreslit následovně:</p>

<p><img src="/files/keygen/keygen-zobrazeni.png" class="border" alt="Vykreslení keygen značky" /></p>

<p>Když uživatel odeslal formulář, prohlížeč vygeneroval pár klíčů, veřejný klíč odeslal na server v <strong>SPKAC formátu</strong> (Signed Public Key And Challenge) a soukromý klíč uložil do úložiště v prohlížeči.</p>

<p>Web by pak mohl ověřit vaši identitu bez nutnosti zadávat heslo – stačilo by, že vlastníte ten správný soukromý klíč. Mělo to být bezpečnější než hesla, protože klíče se nedají uhodnout ani ukrást tak snadno.</p>


<h3 id="spkac-format">SPKAC formát</h3>

<p>SPKAC obsahuje veřejný klíč, challenge řetězec z atributu <code>challenge</code> a digitální podpis vytvořený soukromým klíčem. Challenge řetězec je náhodný text, který se podepíše soukromým klíčem jako důkaz jeho vlastnictví. Data jsou kódována v Base64 a lze je dekódovat pomocí OpenSSL.</p>

<p><strong>Bezpečnostní problémy SPKAC:</strong></p>
<ul>
  <li>Používá kryptograficky slabý MD5 pro podpisy</li>
  <li>Proprietární formát bez standardisace</li>
  <li>Server nemůže ověřit, zda klíč byl skutečně vygenerován v prohlížeči</li>
</ul>

<h2 id="atributy-keygen-elementu">Atributy keygen elementu</h2>

<ul>
  <li><code>name</code> – název pro formulářové pole</li>
  <li><code>challenge</code> – výzva pro podpis certifikátu</li>
  <li><code>keytype</code> – typ klíče (RSA, DSA, EC)</li>
  <li><code>keyparams</code> – parametry pro generování klíče</li>
</ul>

<h2 id="problemy-s-uzivatelskym-rozhranim">Problémy s uživatelským rozhraním</h2>

<p>UI problémy s <code>&lt;keygen></code> byly závažné:</p>

<h3 id="povinne-certifikaty">Povinné certifikáty</h3>
<p>Když web vyžadoval klientský certifikát, uživatelé bez certifikátu dostali pouze SSL chybovou obrazovku bez možnosti zaregistrovat se. To vyžadovalo mít dvě domény:</p>
<ul>
  <li><code>newusers.example.com</code> – pro registraci nových uživatelů</li>
  <li><code>secure.example.com</code> – vyžadující certifikát</li>
</ul>

<h3 id="volitelne-certifikaty">Volitelné certifikáty</h3>
<p>I při volitelných certifikátech byl UI podobný HTTP autentifikaci s problémy:</p>
<ul>
  <li>Prohlížeč zobrazil dialog pro výběr certifikátu</li>
  <li>Neexistoval způsob „odhlášení" nebo změny certifikátu</li>
  <li>Uživatelé nevěděli, co je klientský certifikát</li>
</ul>

<h2 id="internet-explorer-a-activex">Internet Explorer a ActiveX</h2>

<p><code>&lt;keygen></code> byl proprietární tag od Netscape a nikdy nebyl podporován v Internet Exploreru. Místo toho IE vyžadoval použití ActiveX objektu:</p>

<pre><code class="language-javascript">new ActiveXObject("X509Enrollment.CX509EnrollmentWebClassFactory")</code></pre>

<h2 id="proc-byl-keygen-zavrzen">Proč byl keygen zavržen</h2>

<p>Element <code>&lt;keygen></code> byl označen jako <i>deprecated</i> z několika závažných důvodů:</p>

<h3 id="bezpecnostni-rizika">Bezpečnostní risika</h3>
<ul>
  <li><strong>MD5 v SPKAC</strong> – vyžadoval použití kryptograficky nebezpečného MD5</li>
  <li><strong>Trvalé modifikace OS</strong> – umožňoval uložení certifikátu do operačního systému</li>
  <li><strong>Cross-origin problémy</strong> – klíče mohly ovlivnit všechny aplikace</li>
</ul>

<h3 id="problemy-s-implementaci">Problémy s implementací</h3>
<ul>
  <li><strong>Nekonsistentní implementace</strong> – každý prohlížeč implementoval <code>&lt;keygen></code> jinak</li>
  <li><strong>Microsoft IE/Edge</strong> – nikdy nepodporoval <code>&lt;keygen></code> tag</li>
  <li><strong>Nedostatečné použití</strong></li>
</ul>

<h2 id="moderni-alternativy">Moderní alternativy</h2>

<h3 id="web-crypto-api">Web Crypto API</h3>

<p>Web Crypto API je moderní způsob, jak prohlížeč může bezpečně pracovat s šifrováním. Místo starého <code>&lt;keygen></code> umožňuje vytvářet klíče, šifrovat zprávy a podepisovat data přímo v prohlížeči bez nutnosti posílat citlivé informace na server.</p>

<p>Prohlížeč může generovat různé typy klíčů, šifrovat a dešifrovat zprávy, vytvářet digitální podpisy a generovat bezpečná náhodná čísla. Vše se děje lokálně v počítači uživatele, takže data nikdy neopustí jeho zařízení.</p>

<p>Používá se pro bezpečnou komunikaci, ověřování identity, šifrování souborů a podobné úkoly. Je to standardní řešení, které funguje ve všech moderních prohlížečích a je mnohem bezpečnější než starý <code>&lt;keygen></code>.</p>

<pre><code class="language-javascript">const keyPair = await crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  },
  true,
  ["encrypt", "decrypt"]
);</code></pre>

<h3 id="webauthn">WebAuthn</h3>
<p>Moderní standard pro autentifikaci pomocí hardwarových nebo virtuálních tokenů, který nahrazuje hesla a poskytuje:</p>
<ul>
  <li><strong>Bezpečnost</strong> – privátní klíče zůstávají v autentifikátoru</li>
  <li><strong>Phishing odolnost</strong> – autentifikace je vázána na konkrétní doménu</li>
  <li><strong>Biometrie</strong> – podpora otisků prstů, Face ID</li>
  <li><strong>Hardware klíče</strong> – podpora YubiKey, Titan Security Key</li>
</ul>

<p><img src="/files/keygen/webauthn-touch-id.png" class="border" alt="Příklad WebAuthn" /></p>

<h2 id="podpora-v-prohlizecich">Podpora v prohlížečích</h2>

<ul>
  <li><strong>Chrome</strong>: Odstraněn v Chrome 67 (2018)</li>
  <li><strong>Firefox</strong>: Odstraněn ve Firefox 69 (2019)</li>
  <li><strong>Safari</strong>: Nikdy nepodporován</li>
  <li><strong>Edge</strong>: Odstraněn s přechodem na Chromium</li>
  <li><strong>Internet Explorer</strong>: Nikdy nepodporován (používal ActiveX)</li>
</ul>

<h2 id="soucasna-situace">Současná situace</h2>

<p>Klientské certifikáty stále fungují v prohlížečích, ale musí být nainstalovány ručně.</p>

<h2 id="zaver">Závěr</h2>

<p>Element <code>&lt;keygen></code> byl zajímavým experimentem v oblasti kryptografie v prohlížeči, ale kvůli bezpečnostním problémům, složitosti implementace a špatnému uživatelskému rozhraní byl nakonec opuštěn. Moderní Web Crypto API a WebAuthn poskytují mnohem lepší a bezpečnější řešení.</p>

<h2 id="odkazy-jinam">Odkazy jinam</h2>

<ul>
  <li><a href="https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/pX5NbX0Xack/kmHsyMGJZAMJ">(Pre-)Intent to Deprecate</a> – proč byl keygen zavržen</li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API">Web Crypto API</a> – moderní alternativa pro kryptografii v prohlížeči</li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API">WebAuthn</a> – standard pro bezpečnou autentifikaci</li>
  <li><a href="https://webauthn.guide/">WebAuthn Guide</a> – praktický průvodce implementací</li>
  <li><a href="https://www.devever.net/~hl/web-keygen">Memoirs from the old web: The KEYGEN element</a> – detailní technický popis</li>
</ul>