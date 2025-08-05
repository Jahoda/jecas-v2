---
title: "Bezstavové HTML"
headline: "Bezstavové HTML"
description: "Jak vytvořit aplikaci, kde se nemění HTML kód."
date: "2014-12-12"
last_modification: "2015-01-11"
status: 1
tags: ["js", "js-ajax", "napady"]
format: "html"
---

<p>V dnešní době je poměrně běžné, že je webová stránka <b>generovaná na serveru</b>. Dále je poměrně běžné, že HTML kód stránky, který dorazí do prohlížeče, je <b>odlišný pro různé návštěvníky</b>.</p>

<ol>
  <li>
    <p><b>Nepřihlášený</b> uživatel uvidí někde v menu <b>přihlašovací formulář / odkaz na registraci</b>.</p>
    
    <p><img src="/files/bezstavove-html/neprihlasen.png" alt="Nepřihlášený uživatel" class="border"></p>
  </li>
  
  <li>
    <p><b>Nepřihlášený</b> uživatel, co se na stránku <b>„podepsal“</b> (např. poslal příspěvek), může mít předvyplněné jméno na základě cookies.</p>
    
    <p><img src="/files/bezstavove-html/navstevnik.png" alt="Návštěvník se zapamatovaným jménem" class="border"></p>
    
    
    
  </li>
  
  <li>
    <p><b>Přihlášený</b> uživatel uvidí  typicky odkazy na svůj <b>profil</b>, odhlášení a podobně.</p>
    
    <p><img src="/files/bezstavove-html/uzivatel.png" alt="Přihlášený uživatel" class="border"></p>    
  </li>
  
  <li>
    <p><b>Přihlášený administrátor</b> potom bude mít k disposici různé <b>administrační nástroje</b>.</p>
    
    <p><img src="/files/bezstavove-html/admin.png" alt="Přihlášený administrátor" class="border"></p>    
    
    
    
  </li>
</ol>

<p>Myšlenka <b>bezstavového HTML</b> je potom taková, že HTML kód pro všechny uživatele <b>bude 100% stejný</b> a potřebné rozdíly <b>zajistí až JavaScript</b>.</p>

<p>Technicky to proběhne třeba použitím <a href="/ajax#jsonp">JSONP</a> – připojí se serverový skript, který ověří přihlášení a zavolá funkci pro vykreslení <b>příslušného uživatelského rozhraní</b> s předanými argumenty.</p>

<pre><code>vykreslitMenu(
  {
    prihlasen: true, 
    administrator: true,
    jmeno: "Administrátor"
  }
);</code></pre>

<p>Funkce <code>vykreslitMenu</code> na základě těchto hodnot sestaví příslušné menu.</p>

<p>Pochopitelně se může použít i obyčejný AJAX a výsledný HTML kód závislý na uživateli <b>generovat na serveru</b> a JavaScriptem ho jen <b>vlepit na potřebná místa</b>.</p>











<h2 id="vyhody">Výhody</h2>

<p>Hlavní výhodou tohoto postupu je 100% <b>statický obsah</b>. Díky tomu může být <b>načítání obsahu rychlejší</b> – není potřeba žádná <b>podpora programovacího jazyka</b> na severu. Také není problém dlouhodobě kešovat <b>celé HTML stránky</b>.</p>

<p>V případě aplikace se <i>stavovým HTML</i> jde sice používat <i>cache</i>, ale jen pro určité části, navíc určitý čas zabere sestavení výsledné podoby (zvlášť při použití nějakého <b>frameworku</b> to může zdržet načítání i o desítky milisekund).</p>

<p>Mají-li navíc být <b>uživatelské ovládací prvky</b> různě po stránce (například volba <i>Upravit</i> u všech vlastních příspěvků), je nemožné kešovat větší <b>souvislé finální bloky</b> obsahu.</p>


<!--
<p>Statický obsah znamená i <b>vyšší spolehlivost</b> – nehrozí výpadek obsahu při <b>spadnutí databáse</b>.</p>-->

<p>Nakonec <b>vyhledávače</b> uvidí jen samostatný obsah bez nerelevantních zbytečností jako je <b>přihlašovací formulář</b> a podobně, protože je vytvoří až JavaScript.</p>


<h2 id="nevyhody">Nevýhody</h2>

<p>Asi největší nevýhodou je nutnost načítání první stránky <i>nadvakrát</i>.</p>

<ol>
  <li>Stáhne se bezstavové HTML.</li>
  
  <li>Zavolá se další JS požadavek pro <i>získání stavu</i>.</li>
</ol>

<p>V kombinaci s <b>načítáním obsahu všech stránek AJAXem</b> to ale nemusí příliš vadit. Podstatná část (obsah) se načte díky <b>statické podobě</b> bleskurychle a při přechodu na další stránku se bude jen nahrazovat obsah ze statických souborů.</p>

<p>Další nevýhoda je <b>nefunkčnost uživatelské části bez JavaScriptu</b>, což ale v dnešní době většinou moc nevadí.</p>


<!--
<h2 id="co">Co použít?</h2>

-->


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.colorglare.com/2014/11/24/stateless-html.html">Stop writing stateful HTML
 </a></li>
</ul>