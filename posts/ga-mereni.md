---
title: "Měření interního vyhledávání v Google Analytics"
headline: "Měření vyhledávání a akcí v Google Analytics"
description: "Jak v Google Analytics měřit vlastní akce jako kliknutí na tlačítko nebo dotazy do interního vyhledávání."
date: "2014-05-27"
last_modification: "2014-12-29"
status: 1
tags: ["ga"]
format: "html"
---

<p>Pokud nechceme úpravy na webu provádět na základě <b>pocitu nebo věštění z křišťálové koule</b>, hodí se mít <b>přehled o návštěvnících</b>.</p>

<p><b>Google Analytics</b> dokáží spoustu věcí měřit samy od sebe po vložení základní podoby kódu. Existují ale další statistiky, co se většinou hodí do <b>GA</b> doplnit:</p>

<ul>
  <li>měření <b>událostí</b>,</li>
  <li>měření <b>interního vyhledávání</b></li>
</ul>






<h2 id="mereni-udalosti">Měření událostí</h2>

<p>Události se hodí k logování různých <b>uživatelských akcí</b>. Můžeme tak například zaznamenávat kliknutí na nějaké tlačítko a vyhodnocovat, jestli jeho změna přinesla větší počet kliknutí a podobně.</p>

<p>Realisace v JavaScriptu je celkem jednoduchá, stačí odeslat (<code>send</code>) data typu <code>event</code> (událost).</p>

<pre><code>ga("send", "event", 
  "Kategorie",
  "Akce",
  "Popisek", // nepovinné
  "Hodnota" // nepovinné číslo
);</code></pre>

<p>Při kliknutí na tlačítko se tak nabízí použít něco jako:</p>

<pre><code>ga("send", "event", "kliknutí", "tlačítko", "název tlačítka");</code></pre>

<p>Kvůli uživatelům <b>blokujícím meřicí skripty</b> můžeme volání funkce <code>ga</code> obalit do <code>try – catch</code> bloku:</p>

<pre><code>try {
  ga("send", "event", "kliknutí", "tlačítko", "název tlačítka");
}
catch(e){}</code></pre>

<p>Nehrozí potom chyba v případě, že se <b>Google Analytics nenačte</b>, kdy by se volala neexistující funkce <code>ga</code>.</p>


<p>Naměřená data pro <b>vytvořené události</b> i <b>interní vyhledávání</b> jsou k disposici v nabídce <i>Chování</i> → <i>Události</i></p>


<p><img src="/files/ga-mereni/vyhledavani-udalosti.png" alt="Chování → Události / Vyhledávání na webu" class="border"></p>









<!--
<h2 id="koverse">Konverse</h2>

<p>Za základě událostí je potom možné i definovat <b>Cíle</b> a <b>počítat konverse</b>.</p>-->











<h2 id="vyhledavani">Interní vyhledávání</h2>

<p>Logovat <b>interní vyhledávání</b> je dost užitečná věc. Dá se z toho zjistit, co <b>návštěvníci na webu hledají</b> – to se může hodit při budování dalšího obsahu nebo vylepšování <b>navigační struktury</b>.</p>

<p>Měření interního vyhledávání je nutné zapnout (jmenuje se to <i>SiteSearch</i>). Zapíná se ve volbě <i>Správce</i> → <i>Výběr dat</i> → <i>Nastavení zobrazení</i>.</p>

<p><img src="/files/ga-mereni/nastaveni-zobrazeni.png" alt="Chování → Události / Vyhledávání na webu" class="border"></p>




















<p>Kromě zapnutí funkce <b>SiteSearch</b> je třeba zadat do Google Analytics název <b>parametru v URL</b>, který se používá k vyhledávání.</p>


<p><img src="/files/ga-mereni/site-search.png" alt="Chování → Události / Vyhledávání na webu" class="border"></p>















<p>Pokud je výsledek hledání nějakého fráze přístupný metodou <code>GET</code>, zjistíme název parametru z obsahu před hledaným výrazem:</p>

<pre><code>http://example.com/?<b>q</b>=hledané+slovo</code></pre>



<p>Pokud se používá <code>POST</code> nebo se hledá <a href="/ajax">AJAXem</a>, je nutné si navíc hledání zaznamenávat se <i>smyšlenou URL</i> ručně JavaScriptem:</p>

<pre><code>&lt;script>
  ga('send', 'pageview', '/search_results.php?q=' + <b>hledaneSlovo</b>);
&lt;/script></code></pre>



<p>V proměnné <code>hledaneSlovo</code> bude hledaná fráze, kterou jde například získat z <b>políčka pro vyhledávání</b>:</p>

<pre><code>var hledaneSlovo = document.getElementById("hledani").value;</code></pre>



<h2 id="nonInteraction"><code>nonInteraction</code></h2>

<p>V některých případech je vhodné do funkce <code>ga</code> předat parametr <code>nonInteraction</code>.</p>

<pre><code>{'nonInteraction': 1}</code></pre>

<p>Pokud má hodnotu <code>true</code>/<code>1</code>, znamená to, že tak zalogování nebude mít vliv na <i>bounce rate</i> (míru opuštění stránky). Jinak zaznamenání události <b>prodlouží dobu návštěvy</b>.</p>

<p>Nedá se obecně říct, jestli je událost vhodné považovat za interakci, která by míru opuštění měla ovlivňovat, nebo ne. Pokud bude na stránce například jenom jedno video, dává smysl, aby jeho přehrání bylo považováno za interakci.</p>

<p>Použití <code>nonInteraction</code> v <code>ga</code> vypadá následovně:</p>

<pre><code>ga('send', 'event', 
  'Kategorie', 
  'Akce',
  {'nonInteraction': true}
);</code></pre>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Google Analytics: <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/events">Event Tracking - Web Tracking</a></li>
  
  <li><a href="https://support.google.com/analytics/answer/1012264?hl=cs&ref_topic=1120718">Nastavení služby Site Search v případě vyhledávačů využívajících metodu POST</a></li>
  
  <li><a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference">Analytics.js Field Reference</a></li>
</ul>
