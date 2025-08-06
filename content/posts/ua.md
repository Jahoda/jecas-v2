---
title: "Hlavička User-Agent"
headline: "Hlavička User-Agent"
description: "User-Agent je hlavička, kterou posílají prohlížeče jako svou identifikaci."
date: "2015-02-19"
last_modification: "2015-05-17"
status: 1
tags: ["napady", "webove-prohlizece"]
format: "html"
---

<p>Kromě <a href="/webove-prohlizece">webových prohlížečů</a> posílají <i>user agent</i> informaci (zkratka <b>UA</b>) i různí <b>roboti vyhledávačů</b>, validátory kódu nebo nástroje pro jiné <a href="/kontrola-stranky">analysování stránky</a>.</p>

<div class="live">
  <p>Váš user-agent je: <span id="ua"></span></p>
  <script>
    document.getElementById("ua").innerHTML = navigator.userAgent;
  </script>
</div>

<p>Hlavička <code>User-Agent</code> se hodí zejména ke dvěma věcem:</p>

<ol>
  <li>
    <p><b>Počítání návštěv</b> z různých prohlížečů, zařízeních a operačních systémů. Hodí se to pro přemýšlením o tom, pro které prohlížeče optimalisovat webovou stránku.</p>
    <div class="internal-content">
      <ul>
        <li>
          <p><a href="/prohlizece-optimalisace">Pro jaké prohlížeče ladit svůj web</a></p>
        </li>
      </ul>
    </div>
  </li>
  
  <li>
    <p><b>Zobrazení různého obsahu na stejné URL</b>. Anglicky se to označuje jako <i lang="en">content negotiation</i>. Na základě identifikace zařízení žádajícího obsah se pro různá zařízení posílá <i>něco jiného</i>.</p>
    
    <p>Zneužívání této možnosti v souvislosti se <a href="/seo">SEO</a> (optimalisace pro vyhledávače) se nazývá <i lang="en">cloaking</i>.</p>
    
    <blockquote cite="http://vyhledavace.info/seo-faq/9/cloaking">
      <p>Termínem <i>cloaking</i> (čti klouking) se označuje technika, při které server pošle jinou verzi stránky robotu vyhledávače a jinou uživateli s běžným prohlížečem. Cloaking za účelem manipulace s výsledky vyhledávání vyhledávače obvykle penalizují (pokud na něj přijdou).</p>
      
      <p class="autor">Marek Prokop, <a href="http://vyhledavace.info/seo-faq/9/cloaking">Co je to cloaking?</a></p>
    </blockquote>
    
    <p>Existují případy, kdy je posílání různého obsahu různým zařízením <b>zcela v pořádku</b>.</p>
    <ul>
      <li>Zabránění přístupu <b>nežádoucím robotům</b>. Problém je, že se mohou maskovat jako normální prohlížeče.</li>
      
      <li>Řešení <b>odlišnosti v prohlížečích</b>. Různým prohlížečům se mohou posílat různé CSS, JavaScripty, obrázky a podobně. <b>Detekce prohlížeče</b> pro servírování odlišného obsahu pro odstranění nesrovnalostí v zobrazování by měla být až <b>poslední možnost</b>.</li>
    </ul>
  </li>
</ol>


<h2 id="zjistit">Jak zjistit user agent</h2>


<h3 id="php">PHP</h3>

<p>V jazyce PHP je tato informace v poli <a href="/server"><code>$_SERVER</code></a>.</p>

<pre><code>&lt;?php
echo $_SERVER["HTTP_USER_AGENT"];</code></pre>




<h3 id="js">JavaScript</h3>

<p>JavaScript má tuto informaci v objektu <code>navigator</code>.</p>

<pre><code>alert(navigator.userAgent);</code></pre>





<h2 id="podoba">Podoba hlavičky user agent</h2>

<p>Jelikož se hlavně v minulosti hlavička User-Agent skutečně hojně používala pro <b>odesílání různého obsahu různým zařízením</b>, tvůrci nových prohlížečů ve snaze, aby jejich prohlížeč dostal nejlepší možný obsah, začali přebírat části user agenta od konkurence.</p>



<p><b>Symbolický příklad</b>: Existoval prohlížeč s hlavičkou <code>Starý</code> a prohlížeč s hlavičkou <code>Nový</code>, autor webu potom použil detekci typu:</p>

<pre><code>if (prohlížečNový) {
  // lepší zobrazení
}
else {
  // základní zobrazení
}
</code></pre>








<p>Následně přišel prohlížeč <code>Novější</code>, který byl schopný zobrazovat stránky minimálně stejně dobře jako prohlížeč <code>Novy</code>, ale kvůli detekci by dostal obsah pro prohlížeč <code>Starý</code>.</p>

<p>Aby žádoucím způsobem prošel detekcí, dostal user agent hlavičku typu:</p>

<pre><code>Novější (jako Nový)</code></pre>



<p>Nebo:</p>

<pre><code>Novější, kompatibilní s Nový</code></pre>



<p>Detekcí hledající výraz „<code>Nový</code>“ díky tomu prohlížeč <code>Novější</code> prošel.</p>


<p>Takto došla situace s user agent hlavičkami do stavu, kdy prohlížeč <b>Chrome</b> má v user agentovi klíčová slova <i>Mozilla</i>, <i>Gecko</i>, <i>KHTML</i>, <i>Safari</i> nebo <i>AppleWebKit</i>.</p>

<p>Příklad user agent hlavičky z <b>Chrome</b>:</p>

<blockquote><code>Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36</code></blockquote>



<p>Ještě rozmanitější je potom řetězec user agenta v mobilním <b>IE 11</b>, kde je zmíněno snad úplně všechno:</p>

<blockquote><code>
Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537 
</code></blockquote>


<p>Konkrétní postup <b>vývoje řetězců user agentů</b> je popsán zde:</p>

<div class="external-content">
  <ul>
    <li><a href="http://webaim.org/blog/user-agent-string-history/">History of the browser user-agent string</a> – popis historie vývoje hlavičky user-agent</li>
  </ul>
</div>


<h2 id="detekce">Různý obsah dle detekce prohlížeče</h2>

<p>Vzhledem k nevyzpytatelnému vývoji identifikátoru prohlížečů je dobré se pokusit detekci user-agenta nejraději nepoužívat.</p>

<p>Lepší postup je testovat <b>podporu konkrétních vlastností</b>, které je potřeba použít.</p>

<p>V CSS je k tomu navrženo <a href="/supports">pravidlo <code>@supports</code></a>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://modernizr.com/">Modernizr</a> – JS knihovna obsahující testy podpory různých vlastností (<a href="http://modernizr.com/downloads/modernizr-latest.js">celý skript</a>)</li>
  </ul>
</div>

<p>Bohužel testování podpory některých vlastností může být dost komplikované či náročné na výkon, takže se detekci prohlížeče půjde úplně vyhnout jen těžko.</p>