---
title: "Autocomplete"
headline: "Automatické vyplňování formulářů"
description: "Pomocí atributu <code>autocomplete</code> jde usnadnit a zrychlit vyplňování formulářů."
date: "2014-01-10"
last_modification: "2015-03-18"
status: 1
tags: ["formulare", "html", "html-atributy"]
format: "html"
---

<p>Webové <b>formuláře</b> jsou nedílnou součástí webu. V případě, že stránka něco prodává (e-shop), je takový formulář místem, který zákazník bude muset překonat, má-li nakoupit.</p>

<p>Když už se tedy povede zákazníka přimět k objednání zboží, byla by škoda ho následně odradit <b>špatně použitelným</b> formulářem.</p>

<div class="internal-content">
  <ul>
    <li><a href="/chyby-formularu">20 nejhorších chyb formulářů</a> – přehled chyb, kterým se vyvarovat</li>
  </ul>
</div>


<h2 id="vyplnovani">Automatické vyplnění</h2>

<p>Zvlášť u mobilních zařízení s malými obrazovkami a dotykovou klávesnicí je hodně nepohodlné cokoliv vyplňovat.</p>

<p>Při návrhu formuláře je tak dobré se nad každým prvkem zamyslet, jestli je skutečně nutný. U opravdu <b>nezbytných políček</b> může pomoci atribut <code>autocomplete</code>.</p>

<p>Atributem <code>autocomplete</code> jde prohlížeči sdělit typ údaje k vyplnění, který by se na dané místo hodil.</p>

<pre><code>&lt;input type="email" <b>autocomplete="email"</b>></code></pre>

<p>Automatické doplňování funguje pouze u formulářů odesílaných metodou <code>post</code>.</p>




<h3 id="chrome">Uložení údajů v Chrome</h3>

<p>V prohlížeči <b>Chrome</b> si jde údaje k napovídání nastavit v <i>Menu → Nastavení → Zobrazit rozšířená nastavení... → Hesla a formuláře</i>.</p>

<p><img src="/files/autocomplete/chrome.png" alt="Nastavení automatického doplňování" class="border"></p>














<h2 id="jmeno">Jméno políčka</h2>

<p>I bez atributu <code>autocomplete</code> dokáží některé prohlížeče nabízet hodnoty zadané do políček se stejným atributem <code>name</code>, nezávisle na webu, kde byly vyplněny.</p>

<p>Z tohoto důvodu je proto vhodné <b>používat názvy políček</b>, které jsou hodně rozšířené.</p>







<h2 id="hodnoty">Doporučené hodnoty <code>name</code> a <code>autocomplete</code></h2>

<p>Možné hodnoty pro <code>autocomplete</code> jsou uvedené ve specifikaci.</p>

<div class="external-content">
  <ul>  <li>HTML specifikace: <a href="https://html.spec.whatwg.org/multipage/forms.html#autofill">Autofill</a></li></ul>
</div>

<p>Pro názvy políček (atribut <code>name</code>) je většinou nejuniversálnější používat anglické názvy.</p>

<h3 id="jmeno">Jméno</h3>

<pre><code>&lt;input name="name" autocomplete="name"></code></pre>


<h3 id="email">E-mail</h3>

<pre><code>&lt;input name="email" autocomplete="email"></code></pre>


<h3 id="tel">Telefon</h3>

<pre><code>&lt;input name="phone" autocomplete="tel"></code></pre>








<h2 id="zakazat">Vypnutí <code>autocomplete</code></h2>

<p>V případě, že políčko disponuje vlastním <b>našeptávačem</b> obsahu, mohlo by být napovídání ještě z prohlížeče rušivé. Autocomplete se dá v takových případech vypnout hodnotou <code>off</code>.</p>

<pre><code>&lt;input autocomplete="<b>off</b>"></code></pre>






<h2 id="request">requestAutocomplete API</h2>

<p>Metoda <code>requestAutocomplete</code> slouží k vyplnění čísel <b>platební karty</b> a adresy pro doručení. Pokud má potřebná data návštěvník uložená, je nakupování otázkou jednoho kliknutí.</p>

<ul>
  <li>Metoda <code>requestAutocomplete</code> funguje pouze pro <b>platební formuláře</b> (musí obsahovat pole s <code>autocomplete="cc-*"</code> – „cc“ znamená <i>credit card</i>).</li>
  
  <li>Jde použít pouze na <b>zabezpečeném připojení</b> (<a href="/https">HTTPS</a>).</li>
</ul>

<div class="external-content">
  <ul>
    <li><a href="https://developers.google.com/web/fundamentals/input/form/use-request-auto-complete?hl=en">Simplify checkout with requestAutocomplete API</a></li>
    
  <li><a href="http://daker.me/2014/01/chrome-requestautocomplete-better-payment-web-mobile.html">Chrome’s requestAutocomplete(), for a Better Payment on the Web &amp; Mobile</a></li>    
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>  
  <li>Google Webmaster Central Blog: <a href="http://googlewebmastercentral.blogspot.cz/2015/03/helping-users-fill-out-online-forms.html">Helping users fill out online forms</a></li>
  
  <li>Jeremy's Blog: <a href="http://jeremymikkola.com/posts/2019_03_19_rules_for_autocomplete.html">Rules for Autocomplete</a></li>
  

</ul>