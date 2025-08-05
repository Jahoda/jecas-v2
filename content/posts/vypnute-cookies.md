---
title: "Vypnuté cookies"
headline: "Zjištění vypnutých cookies"
description: "Jak zjistit, jestli má návštěvník zapnuté nebo vypnuté cookies."
date: "2014-04-22"
last_modification: "2014-12-14"
status: 1
tags: ["hotova-reseni", "js", "webove-prohlizece"]
format: "html"
---

<p>Cookies jsou <b>data v prohlížeči návštěvníka</b>, která se při požadavku na stránku přenášejí na server, ten podle nich může uživatele identifikovat a například mu zobrazit, že je přihlášen.</p>


<p>Ačkoliv není v dnešní době příliš běžné, že by návštěvník <b>neměl podporu / měl vypnuté cookies</b>, pokud je aplikace vyžaduje, je dobré o tom informovat, když <b>nebudou zapnuté</b>.</p>

<p>Může se stát, že si je návštěvník <b>omylem vypne</b> a nepůjde se mu z pro něj neznámé příčiny například <b>přihlásit</b>. Hláškou o tom, že stránka cookies potřebuje, mu můžeme pomoci. Případně to ještě vylepšit <b>návodem/postupem</b>, jak toho ve svém prohlížeči dosáhne.</p>




<h2 id="js">Detekce vypnutých cookies v JavaScriptu</h2>

<p>Testovat zapnutí nebo vypnutí cookies je možné JavaScriptem přes <code>navigator.cookieEnabled</code>.</p>

<pre><code>if (!navigator.cookieEnabled) {
  alert("Cookies jsou vypnuté");
}</code></pre>

<p><a href="http://kod.djpw.cz/oucb">Živá ukázka</a></p>

<p>Podle mých testů se <a href="/ie11"><b>Internet Explorer 11</b></a> při určitém zablokování cookies může stále tvářit, že jsou zapnuté – <code>navigator.cookieEnabled</code> vrací <code>true</code>.</p>

<p><img src="/files/vypnute-cookies/vysoka.png" alt="Vysoká hodnota nastavení cookies" class="border"></p>





















<p><b>IE</b> totiž umožňuje nastavení pravidel pro ukládání cookie na <b>několik úrovní + vlastní nastavení</b>, které potom blokují různé typy cookies. Zdá se, že pro cokoliv jiného než nejvyšší volbu „<b>Blokovat všechny soubory cookie</b>“ vrátí <code>navigator.cookieEnabled</code> hodnotu <code>true</code>, nezávisle na tom, jestli bude <b>možné cookie nastavit</b> nebo ne, což například na druhou nejvyšší úroveň („<b>Vysoká</b>“) nepůjde.</p>

<p>Stejně tak v případě vlastního nastavení.</p>

<p><img src="/files/vypnute-cookies/vlastni.png" alt="Vlastní nastavení a blokování cookies" class="border"></p>























<p>Nejspolehlivější možnost je proto <b>cookie zkusit vytvořit</b> a testovat, zda se to povedlo. Ideální je i použít stejnou <code>path</code> a <code>expires</code> jako se používají v aplikaci.</p>

<pre><code>function zapnuteCookies() {
  // vytvoříme testovací cookie
  document.cookie = "testovaci-cookie";
  return (document.cookie.indexOf("testovaci-cookie") > 0);
}</code></pre>

<p><a href="http://kod.djpw.cz/tqib">Živá ukázka</a></p>

<p>Možná by se nabízelo na začátku testovat, jestli už nějaká cookie v prohlížeči není.</p>

<pre><code>if (document.cookie.length > 0) {
  return true;
}</code></pre>

<p>Bohužel to opět nebude spolehlivé, neboť může nastat případ, kdy nějaké cookies pro stránku existují, ale <b>přidávání nových je blokováno</b>. Můžeme ale testovat přítomnost skutečné cookie <b>potřebné k identifikaci</b> a v takovém případě už zjišťování pomocí vytvoření testovací cookie neprovádět.</p>














<h2 id="server">Detekce zapnutých cookie na straně serveru</h2>

<p>Na straně serveru je jediná možnost:</p>

<ol>
  <li><b>vytvořit cookie</b>,</li>
  <li><b>přesměrovat</b> (klidně na tu samou stránku),</li>
  <li><b>testovat</b>, jestli cookie z kroku 1 existuje</li>
</ol>

<p>To je pro samotnou detekci značně nepraktické, ale v případě, že uživatel například vyplní a odešle <b>přihlašovací formulář</b>, můžeme na stránce, kam bude v případě úspěšného přihlášení přesměrován, zjistit, že cookie, která by měla, <b>neexistuje</b>.</p>




<h2 id="prohlizece">Zapnutí/vypnutí cookies v prohlížečích</h2>

<h3 id="ie">Internet Explorer</h3>

<p><i>Nástroje</i> <kbd>Alt</kbd> + <kbd>X</kbd> → <i>Možnosti Internetu</i> → <i>Osobní údaje</i> → <i>Vyberte nastavení pro zónu Internetu</i></p>

<p><img src="/files/vypnute-cookies/blokovat.png" alt="Vypnutí cookies v IE" class="border"></p>

















<h3 id="chrome">Chrome</h3>

<p><i>Nastavení</i> (<code>chrome://settings/</code>) → <i>Zobrazit rozšířená nastavení...</i> → <i>Ochrana soukromí</i> → <i>Nastavení obsahu</i> → <i>Soubory cookie</i></p>

<p><img src="/files/vypnute-cookies/chrome.png" alt="Vypnutí cookies v Chrome" class="border"></p>














<h3 id="firefox">Firefox</h3>

<p><i>Možnosti</i> → <i>Soukromí</i> → <i>Historie</i> → <i>Použít pro historii vlastní nastavení.</i></p>

<p><img src="/files/vypnute-cookies/firefox.png" alt="Vypnutí cookies ve Firefoxu" class="border"></p>































<h3 id="opera">Opera</h3>

<p><i>Nastavení</i> → <i>Soukromí &amp; Bezpečnost</i> → <i>Cookies</i></p>

<p><img src="/files/vypnute-cookies/opera.png" alt="Vypnutí cookies v Opeře" class="border"></p>





















<h2 id="anonymni">Anonymní režim</h2>

<p>Pro účely testování, jak bude webu fungovat, když na něj přijde člověk <b>bez žádných cookies</b>, mohou dobře posloužit <b>anonymní režimy prohlížečů</b>.</p>

<ul>
  <li><b>Firefox</b> – <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></li>
  
  <li><b>Chrome</b> – <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd></li>
  
  <li><b>Opera</b> – <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd></li>
</ul>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator.cookieEnabled">Navigator.cookieEnabled</a></li>
  
  <li>MSDN: <a href="http://msdn.microsoft.com/en-us/library/ms533694(v=vs.85).aspx">cookieEnabled property</a></li>
</ul>