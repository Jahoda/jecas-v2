---
title: "Má web fungovat bez JavaScriptu?"
headline: "Má web fungovat bez JavaScriptu?"
description: "Při tvorbě webu je potřeba zvážit, jestli a jak má fungovat bez podpory JavaScriptu."
date: "2015-09-15"
last_modification: "2015-09-28"
status: 1
tags: ["js", "napady"]
format: "html"
---

<p>Názory na to, jestli se mají podporovat <b>lidé s vypnutým JavaScriptem</b>, se mohou lišit. Od snahy, aby web bez JS fungoval, až po názory na návštěvníky bez JS typu:</p>

<blockquote>
  <p>Takový lidi si zaslouží chcípnout.</p>
  
  <p class="autor">– <a href="http://hatak.cz/">Zdeněk Haták</a>, front-end developer
    <!--– <a href="http://havrlant.cz/">Lukáš Havrlant</a>, autor nejlepšího <a href="http://programio.havrlant.cz/">českého blogu</a> o programování--></p>
</blockquote>




<p>Desktopový Facebook zastává podobný názor:</p>

<p><img src="/files/bez-javascriptu/facebook.png" alt="Facebook bez JS" class="border"></p>












<p>Na Alza.cz si <b>bez JS</b> nejde nic objednat, protože tlačítko <i>Koupit</i> je závislé na JS akci:</p>

<p><img src="/files/bez-javascriptu/alza.png" alt="Alza bez JS" class="border"></p>











<h2 id="selhani">Selhání JavaScriptu</h2>

<p>Jelikož <b>podíl zařízení nepodporujících JavaScript</b> je naprosté minimum, může se zdát zbytečné situace bez dostupného JS řešit.</p>

<p>Nicméně:</p>

<blockquote>
  <p>Stránky funkční bez JavaScriptu se nedělají pro návštěvníky s vypnutým JS. Dělají se hlavně pro <b>případ jeho selhání</b>.</p>
</blockquote>

<p>I u zařízení plně podporující JS se mohou stát dvě věci:</p>

<ol>
  <li>
    <p>Soubor se skriptem se <b>nepovede načíst</b>. Buď se vůbec nestáhne vlivem pomalého/přerušeného spojení, nebo se načte později, než jeho funkce uživatel potřebuje.</p>
  </li>
  
  <li>
    <p>Do skriptu <b>programátor zanese chybu</b>, která v určitých případech způsobí celkové selhání. JS není tolik tolerantní k chybám jako HTML/CSS.</p>
  </li>
</ol>

<p>Řešit danou věc v CSS nebo nejlépe v HTML <b>přináší vyšší stabilitu a odolnost</b> stránky.</p>




<h2 id="rosirovani">Rozšiřování funkčnosti</h2>

<p>Ideální je tak všechno řešit co nejblíže HTML/CSS a JavaScriptem zajišťovat až <b>rozšířenou/vylepšenou funkcionalitu</b>.</p>

<p>Nicméně v praxi může být tento přístup hodně pracný, takže typicky <b>dochází ke kompromisům</b>, kdy něco bez JavaScriptu tak dobře nefunguje.</p>

<p>Je třeba si <b>určit priority</b>, aby bez JS fungovaly alespoň stěžejní součásti webu:</p>

<ul>
  <li>V případě obsahové stránky by se měl zobrazit obsah. To je dost důležité i s ohledem na <a href="/seo">SEO</a>, protože některé vyhledávače mají s <b>obsahem vypisovaným skriptem</b> problém.</li>
  
  <li>U služby pro nahrávání obrázků by kromě <a href="/upload">drag &amp; drop</a> uploadu v AJAXu měl existovat klasický formulář s <code>&lt;input type="file"></code>.</li>
  
  <li>Při použití <a href="/ajax">AJAXového</a> objednávkového formuláře by měla existovat standardní cesta, jak formulář odeslat.</li>
</ul>

<p>A tak dál…</p>






<h2 id="jak-vypnout">Jak vypnout JavaScript</h2>

<p>Pro ověření, že je web bez JS použitelný, je vhodné skriptování pro otestování vypnout.</p>

<p>Jde to ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> po stisku <kbd>F12</kbd>. Postup v <b>Chrome</b>:</p>

<ol>
  <li>
    <p>Vpravo nahoře je ikona pro <i>Nastavení</i>:</p>
    
    <p><img src="/files/bez-javascriptu/nastaveni.png" alt="Nastavení ve vývojářských nástrojích" class="border"></p>
  </li>
  
  
  <li>
    <p>Na začátku je přímo volba <i lang="en">Disable JavaScript</i></p>
    
    <p><img src="/files/bez-javascriptu/disable.png" alt="Vypnutí JS ve vývojářských nástrojích" class="border"></p>
  </li>
</ol>








<h2 id="detekce">Detekce JS</h2>

<p>Jak detekovat, že je JavaScript vypnutý, popisuje následující samostatný článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/vypnuty-js">Detekce zapnutého JavaScriptu</a></li>
  </ul>
</div>


<p>Pokud je web na JS existenčně závislý, je dobré na to upozornit ve značce <code>&lt;noscript></code>. Návštěvník může mít omylem <b>vypnuté skriptování</b>, aniž by si to uvědomoval.</p>




<h2 id="skryvani">Skrývání obsahu</h2>

<p>Jedna z nejčastějších chyb webových tvůrců nastává při skrývání obsahu, který následně má zobrazit JS funkce.</p>

<pre><code>&lt;div id="skryty" style="display: none">
  Skrytý obsah
&lt;/div>
&lt;button onclick="$('#skryty').show()">
  Zobrazit
&lt;/button></code></pre>







<p><a href="https://kod.djpw.cz/eiqb">Živá ukázka</a></p>

<p>Bez JS se nikdo ke skrytému obsahu nedostane.</p>



<h3 id="reseni">Řešení</h3>

<p>Lepší postup je přidat třídu <code>js</code> pro element <code>&lt;body></code>:</p>

<pre><code>&lt;body>
&lt;script>
document.body.className+= ' js';
&lt;/script></code></pre>






<p>A skrývání provádět přes CSS:</p>

<pre><code>.js #skryty {
  display: none;
}</code></pre>




<p>Ani tento postup není úplně ideální, protože třída <code>js</code> se typicky nastaví dříve, než se stáhne ostatní JavaScript umožňující zobrazení skrytého obsahu.</p>


<p>Nabízelo by se tedy obsah skrývat až v momentě, kdy bude <b>připravena funkce pro jeho zobrazení</b>.</p>

<p>To by ale zase způsobilo <b>poskakování stránky</b> při načítání skrývajících skriptů.</p>


<p>Proto je šikovné problém obejít a řešit co nejvíce věcí v HTML/CSS. Případně dát na stažení obslužného JS nějaký časový limit – třeba <b>3 vteřiny</b> – po kterém se <code>js</code> třída zase odebere.</p>

<pre><code>var jsCasovac = setTimeout(function() {
  document.body.className = 
    document.body.className.replace(" js", "");
}, 3 * 1000);</code></pre>







<p>Po stažení obslužné JS funkce se případně tento časovač zruší:</p>

<pre><code>clearTimeout(jsCasovac);</code></pre>


<p>A opět se přidá JS třída:</p>

<pre><code>document.body.className+= ' js';</code></pre>


<p><b>Poznámka</b>: Pro práci s třídami by bylo lepší v podporovaných prohlížečích (<b>IE 10+</b>) použít vlastnost <a href="/prepinani-trid#classlist"><code>classList</code></a>.</p>



<h2 id="bez-js">Řešení bez JavaScriptu</h2>

<p>Postupem času jde více a více věcí řešit v HTML/CSS bez použití JavaScriptu:</p>

<div class="internal-content">
<ul>
  <li>Animace přes <a href="/animation"><code>animation</code></a> a <a href="/transition"><code>transition</code></a></li>
  
  <li><a href="/css-rozbalovani">Rozbalování a sbalování obahu v CSS</a> – využívá se <code>&lt;input type=checkbox></code> a CSS <a href="/css-selektory#checked">selektor <code>:checked</code></a></li>
  
  <li><a href="/css-filtrovani-dat">Jednoduché filtrování dat v čistém CSS</a> – používá se <code>radio</code> <a href="/input"><code>&lt;input></code></a> a selektor <code>:checked</code></li>
  
  <li><a href="/zvyrazneni-kotvy">Přepínání záložek pomocí <code>:target</code></a></li>
  
  <li><a href="/tooltip">Popisek/tooltip pouze v CSS</a></li>
  
  <li><a href="/odpocitavani#css">Odpočítávání času</a> – používá se CSS animace</li>
</ul>  
</div>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://eev.ee/blog/2016/03/06/maybe-we-could-tone-down-the-javascript/">Maybe we could tone down the JavaScript</a> – popis problémů nefunkčnosti bez JS</li>
  <li><a href="http://idlewords.com/talks/website_obesity.htm">The Website Obesity Crisis</a> – úvaha ohledně přeplácání webů zbytečnými obrázky a skripty</li>
</ul>