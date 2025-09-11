---
title: "Safari: co by měl vědět frontend vývojář"
headline: "Safari: co by měl vědět frontend vývojář"
description: "Shrnutí historie, rozdílů a testování Safari v praxi."
date: "2025-09-11"
last_modification: "2025-09-11"
status: 1
tags: ["webove-prohlizece", "testovani"]
format: "html"
---

<p><b>Safari</b> je prohlížeč od společnosti Apple. Dnes používá jádro WebKit, zatímco Google Chrome používá Blink (historicky z WebKitu vycházel).</p>

<p>Safari je tak <b>Chrome</b> historicky trochu podobné, ale najdou se aktuální rozdíly v podporovaných věcech i vykreslování.</p>

<p>Další podstatná věc je, že Safari má odlišný cyklus vydávání a některé moderní webové technologie do něj dorážejí později. I proto se občas říká, že „Safari je nový IE“ (narážející na prohlížeč <b>Internet Explorer</b> považovaný za <i>brzdu internetu</i>).</p>

<p>Hlavní verse Safari vychází s novým macOS přibližně jednou za rok (a drobné opravy několikrát za rok), zatímco Chrome se aktualisuje průběžně každých několik týdnů.</p>

<h2 id="historie">Historie</h2>
<ul>
  <li><b>2003</b>: první vydání Safari pro macOS (tehdy Mac OS X).</li>
  <li><b>WebKit</b>: jádro Safari vzniklo forkem projektů KHTML a KJS (Konqueror).</li>
  <li><b>2007</b>: uvedení iPhonu s Mobile Safari – start éry mobilního webu.</li>
  <li><b>2007–2012</b>: Safari pro Windows (ukončeno, dnes jen macOS/iOS/iPadOS).</li>
  <li><b>2013</b>: Google forkuje WebKit → vzniká <b>Blink</b> (Chrome, Chromium).</li>
  <li><b>2016</b>: startuje <b>Safari Technology Preview</b> pro rychlejší test novinek.</li>
  <li><b>2017</b>: <b>Intelligent Tracking Prevention</b> (ITP) – snaha omezit sledování uživatelů na webu pomocí cookies a dalších technik.</li>
  <li><b>2020</b>: odstraněna podpora <b>Flashe</b> z macOS Safari (na mobilech fungovalo nikdy).</li>
  <li><b>2023</b>: Web Push pro iOS/iPadOS (od 16.4) a lepší PWA integrace.</li>
  <li><b>2024</b>: iOS 17.4 v EU umožňuje alternativní prohlížečová jádra za podmínek.</li>
  
</ul>

<h2 id="dostupnost">Dostupnost a platformy</h2>
<p>Safari jde rozumně provozovat jen v macOS a iOS/iPadOS. Na ostatních platformách zbývá virtualisace nebo vzdálené testování (například <a href="https://www.browserstack.com/">BrowserStack</a>). Pro frontend vývojáře to znamená, že se bez Apple zařízení pro testování webu v Safari moc neobejde.</p>

<h2 id="ios-webkit">iOS a WebKit</h2>
<p>Dlouhá léta platilo, že na iPhonu a iPadu musí prohlížeče obecně používat stejné jádro jako Safari (WebKit). Od iOS 17.4 Apple v EU umožňuje alternativní renderovací jádra za splnění specifických podmínek; mimo EU platí WebKit-only.</p>

<div class="external-content">
<ul><li><a href="https://developer.apple.com/support/dma-and-apps-in-the-eu/#browser-alt-eu">Browser apps and alternative web browser engines in the EU</a></li></ul>
</div>

<p>Teoreticky tak mohou být i v Apple produktech jiné prohlížeče. Otázka je, jestli se někdy takového produkčního prohlížeče dočkáme, protože moc nedává smysl dělat 2 různé verse prohlížeče (pro EU a mimo EU).</p>

<h2 id="safari-technology-preview">Safari Technology Preview</h2>
<p>Pro macOS existuje vývojová verze Safari, kde lze zkoušet nové funkce před jejich oficiálním vydáním: <a href="https://developer.apple.com/safari/resources/">Safari Technology Preview</a>.</p>

<h2 id="jak-zapnout-devtools">Jak zapnout vývojářské nástroje</h2>
<h3>macOS</h3>
<ol>
  <li>Otevřít <b>Safari</b> → <b>Nastavení…</b> → záložka <b>Pokročilé</b>.</li>
  <li>Zaškrtniout <b>Zobrazovat funkce pro webové vývojáře</b>.</li>
  <li>Vývojářské nástroje jde otevřít přes <b>Vývojář → Zobrazit Inspektor webu</b> nebo zkratkou <code>⌥⌘I</code>. Nebo pravé tlačítko a  <b>Prozkoumat prvek</b> funguje po zapnutí DevTools.</li>  
</ol>

<h3>iOS/iPadOS</h3>

<p>Na zařízení: <b>Settings</b> → <b>Safari</b> → <b>Advanced</b> → zapnout <b>Web Inspector</b> (a volitelně <b>Remote Automation</b>).</p>

<p>Hezká je funkce vzdáleného připojení. Když se iPhone připojí kabelem k Macu, jde si zobrazit na počítači DevTools pro stránku na mobilu.</p>


<p><img src="/files/safari/vzdaleny-vyvoj.png" class="border" alt="Vzdálený výoj" /></p>


<h2 id="proc-resit">Proč Safari řešit</h2>
<p>Safari mívá na projektech významný podíl uživatelů a většinou ho není rozumné ignorovat. Uživatelé Apple produktů navíc často víc utrácejí, takže i menší podíl návštěv může generovat nezanedbatelný podíl tržeb.</p>

<h2 id="vyhody-pro-uzivatele">Výhody pro uživatele Applu</h2>
<p>Safari je úzce integrované se systémem (například Klíčenka) a obvykle je velmi úsporné na baterii. Pro uživatele Apple produktů tak jde často o nejlepší volbu a dávají Safari přednost před Chromem/Edge/Firefoxem nebo jiným prohlížečem.</p>


<h2 id="rozdily">Rozdíly ve vykreslování a funkcích</h2>
<ul>
  <li><b>Typografie</b>: rozdíly v kerningu, ligaturách a hintingu i v textovém enginu → drobné odchylky v tloušťce, antialiasingu a zalamování řádků.</li>
  <li><b>Zaokrouhlování rozměrů</b>: rozdílné zaokrouhlování částí pixelů ve <a href="/flexbox">flexboxu</a> a gridu může způsobit 1px mezery/posuny.</li>
  <li><b>Viewport a scrollování</b>: na mobilu se liší chování adresního řádku, viewport a jednotky 100vh/dvh.</li>
  <li><b>Komposice/GPU</b>: jiné heuristiky pro vytváření komposičních vrstev (<code>transform</code>, <a href="/opacity"><code>opacity</code></a>, <a href="position#sticky"><code>sticky</code></a>) → rozdílné pořadí kreslení.</li>
  <li><b>Formuláře</b>: různý nativní vzhled formulářových prvků a možnosti stylování/pseudo‑elementů.</li>
  <li><b>SVG a canvas</b>: rozdíly v rychlosti a kvalitě vykreslování.</li>
  <li><b>Média</b>: Safari používá HEVC/HLS s nativním HDR a úsporným HW dekódováním, zatímco Chrome sází na VP9/AV1, což může znamenat jiné barvy, méně konsistentní tónové mapování a vyšší spotřebu.</li>
 <li><b>Web API</b>: Chrome má širší sadu experimentálních a hardwarových API (např. WebUSB, Web Bluetooth, Web Serial).</li>
  <li><b>PWA a notifikace</b>: iOS má přísnější omezení; Web Push na iOS je podporován od 16.4. Chrome nabízí plnou instalaci PWA napříč platformami.</li>
</ul>

<h2 id="zaver">Závěr</h2>
<p>Safari má svá specifika a pomalejší tempo vývoje, ale vzhledem k zastoupení iOS a macOS uživatelů se mu při vývoji těžko vyhnete.</p>
