---
title: "Varování v JS konsoli"
headline: "Upozornění v JS konsoli"
description: "Jak do JS konsole vložit výrazné varování o risicích vkládání cizího kódu."
date: "2015-09-12"
last_modification: "2015-09-13"
status: 1
tags: ["js", "webove-prohlizece", "zabezpeceni"]
format: "html"
---

<p><img src="/files/konsole-varovani/console.png" alt="JS konsole" class="border"></p>

















<p>Tzv. <i>console</i> je nástroj ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> (dostupný zpravidla po stisknutí <kbd>F12</kbd>), který slouží ke dvěma věcem:</p>

<ol>
  <li>
    <p>Prostor pro <b>vypsání testovacích dat</b> z JavaScriptu na stránce. Nejčastěji se používá něco jako:</p>
    
    <pre><code>console.log("Proměnná x: " + x);</code></pre>
  </li>
  
  <li>
    <p>Prostor pro <b>spouštění JS kódu</b>. Napíše-li se do konsole:</p>
    
    <pre><code>alert(1);</code></pre>
    
    <p>Vyskočí na stránce příslušná hláška.</p>
  </li>
</ol>

<p>Právě druhý případ přináší <b>bezpečnostní risiko</b>, protože kód vložený do konsole má nad stránkou prakticky absolutní moc.</p>


<h2 id="varovani">Varování proti vložení kódu</h2>

<p>Populární webové služby často čelily situacím, kdy někdo šířil JS kód, který měl zajistit nějakou funkčnost: třeba automatické označení všech přátel pro pozvání k události na <a href="/facebook">Facebooku</a>.</p>

<p>Tento kód se <b>vkládal právě do JS konsole</b> ve vývojářských nástrojích.</p>

<p>Některé kódy tak skutečně fungovaly, problém je, že do nich mohl útočník přidat ještě něco škodlivého, co laik neodhalí.</p>

<p>Útok tímto způsobem se nazývá jako <b>self XSS</b> – tj. varianta <a href="/xss">Cross-site scriptingu</a>, kterou oběť provede <i>sama na sebe</i>.</p>

<p>Známé webové služby proto typicky po stisku <kbd>F12</kbd> a otevření konsole <b>zobrazují upozornění</b>:</p>

<figure>
  <img src="/files/konsole-varovani/facebook.png" alt="Tato funkce prohlížeče je určena pro vývojáře. Pokud vám někdo řekl, ať sem něco zkopírujete, abyste tím aktivovali nějakou funkci Facebooku nebo hackovali něčí účet, pak byste měli vědět, že jde o podvod a že danému člověku poskytnete přístup ke svému Facebook účtu." class="border">
  
  
  
  
  
  
  
 
  
  
  
  
  
  <figcaption>Varování na Facebooku</figcaption>
</figure>


<figure>
  <img src="/files/konsole-varovani/gplus.png" alt="Prostřednictvím této konzole můžou útočníci provést takzvaný útok typu Self-XSS, pomocí kterého můžou předstírat vaši identitu a odcizit vaše údaje.
Do konzole proto nezadávejte ani nevkládejte kód, kterému nerozumíte." class="border">
  
  
  
  
  
  
  <figcaption>Upozornění na Google Plus</figcaption>
</figure>



<h2 id="vlastni">Vlastní upozornění</h2>

<p>Pro přidání obdobného upozornění na své stránky stačí přidat vhodně <b>formátovanou zprávu</b> pomocí <code>console.log</code>.</p>

<p>Formátování se provádí pomocí CSS při uvedení <code>%c</code> na začátku textu a přidáním druhým argumentem s CSS pravidly:</p>

<pre><code>console.log(
  "<b>%c</b>Zpráva formátovaná pomocí CSS", 
  "color: blue; font-size: x-large"
);</code></pre>




<p>Pro zajímavost jsem něco formátovaného přidal i na tuto stránku.</p>




<h3 id="formatovani">Další formátování</h3>

<p>Kromě změny CSS jde výpis formátovat i jinými způsoby. Všechny možné postupy, jak vypisovat něco do chybové konsole, jsou popsány na:</p>

<div class="external-content">
  <ul>
    <li>Google Web Tools: <a href="https://developers.google.com/web/tools/javascript/console/console-write?hl=en">Diagnose and Log to Console</a></li>
    
    <li>Firebug: <a href="http://getfirebug.com/wiki/index.php/Console.log">Console.log</a></li>
  </ul>
</div>