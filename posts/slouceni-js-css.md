---
title: "Spojení CSS a JS souborů"
headline: "Spojení CSS a JS souborů do jednoho"
description: "Zrychlit načítání webu pomůže sloučení CSS a JavaScriptu do jednoho souboru. Hotové řešení v PHP."
date: "2013-12-16"
last_modification: "2013-12-18"
status: 1
tags: ["css", "js", "php", "zrychlovani"]
format: "html"
---

<p>Při zrychlování webové stránky se může uspořit trochu času snížením <b>počtu HTTP spojení</b> složením <b>všech CSS</b> do jednoho souboru. Stejně tak u JavaScriptu. Kromě toho se můžou z CSS/JS odstranit bílé znaky (což trochu srazí i <b>datovou velikost</b> a může odradit pár <a href="/kopirovani">kopírovačů</a>).</p>

<p><i>Zmačkání</i> souborů do jednoho je vhodné nějak <b>zautomatisovat</b>.</p>

<ul>
  <li>Sloučení stylů umí zajistit <b>CSS preprocesory</b>.</li>
  <li>Spojování a minifikování skriptů a stylů umožňuje v <b>Nette Frameworku</b> zajistit rozšíření <a href="http://addons.nette.org/cs/webloader">Webloader</a>.</li>
  <li>Další možnost je ruční spojení nebo jednoduchý <b>PHP skript</b>…</li>
</ul>

<h2 id="php">Hotové spojování v PHP</h2>
<p>Jako primitivní řešení se mi osvědčil následující skript, který přežvýká CSS připojené přes <code>&lt;link></code> i obsah <code>&lt;style></code>. A stejně tak spojí interní a externí <code>&lt;script></code>y.</p>

<p><a href="/files/slouceni-js-css/zmackator.rar" class="button">Stáhnout Zmačkátor</a></p>

<p><img src="/files/slouceni-js-css/zmackator.png" alt="Spojení CSS a JavaScriptu do společných souborů" class="border"></p>

<h3 id="pouzit">Použití</h3>
<p>Před daným obsahem se vloží <i>Zmačkátor</i> a zavolá funkce <code>zmackat</code>, které se předá obsah:</p>

<pre><code>&lt;?php include 'zmackator.php';
zmackat(&lt;&lt;&lt;EOT</code></pre>

<p>Potom následuje připojení stylů a skriptů následované:</p>

<pre><code>EOT
)?></code></pre>

<p>Funkce <code>zmackat</code> si stáhne obsah externích CSS/JS, <b>smíchá</b> ho s interními styly/scripty v <b>původním pořadí</b> a  vytvoří dva soubory, které se jednoduchým skriptem trochu zmenší (odstraní se <b>komentáře</b> a některé nadbytečné <b>mezery</b>):</p>
<pre><code>cache/style.css
cache/script.js
</code></pre>

<p>Nakonec je tato funkce při<code>&lt;link href></code>uje a při<code>&lt;script src></code>uje místo původního obsahu.</p>

<p>Funkci <code>zmackat</code> jde ovlivňovat <b>dalším parametrem</b> (kromě HTML kódu připojující CSS a JS).</p>

<ul>
  <li><code>vypnout</code> — Nic se spojovat nebude, HTML kód připojující soubory se nezmění.</li>
  <li><code>hotovo</code> — Zadáním nějaké jiné <b>neprázdné hodnoty</b> (třeba <code>hotovo</code>) se jen připojí hotové, již vytvořené, <b>sloučené soubory</b>. Hodí se k použití v ostrém provozu, kdy se nemusí soubory znovu generovat.</li>
  <li>S <b>prázdným</b> nebo <b>nezadaným</b> druhým parametrem se při každém načtení CSS a JS přegenerují, přepíší a připojí do stránky.</li>
</ul>

