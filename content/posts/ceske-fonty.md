---
title: "České fonty s diakritikou"
headline: "České fonty – přehled písem s diakritikou"
description: "Přehled kvalitních českých fontů s diakritikou ke stažení zdarma. Písma pro web, tisk i grafiku s plnou podporou českých znaků."
date: "2025-01-27"
status: 1
tags: ["pisma", "typografie"]
format: "html"
---

<p>Při výběru fontu pro český text je klíčová <b>plná podpora diakritiky</b> – háčků a čárek. Ne každý font obsahuje znaky jako ž, š, č, ř, ď, ť, ň, ú, ů nebo ě. Tady je přehled kvalitních písem, která čeština zvládají.</p>


<h2 id="google-fonts">České fonty na Google Fonts</h2>

<p><a href="https://fonts.google.com/?subset=latin-ext">Google Fonts</a> je největší zdroj bezplatných webových fontů. Pro české znaky je potřeba filtrovat podle sady <b>Latin Extended</b>. Mezi nejoblíbenější patří:</p>

<ul>
  <li><b>Inter</b> – moderní bezpatkový font, výborný pro UI a weby</li>
  <li><b>Roboto</b> – výchozí font Androidu, univerzální bezpatkový</li>
  <li><b>Open Sans</b> – čitelný a neutrální, vhodný pro delší texty</li>
  <li><b>Lato</b> – polský font s plnou podporou středoevropských znaků</li>
  <li><b>Nunito</b> – zaoblený bezpatkový font, přátelský vzhled</li>
  <li><b>Source Sans 3</b> – od Adobe, profesionální bezpatkový</li>
  <li><b>Playfair Display</b> – elegantní patkový font pro nadpisy</li>
  <li><b>Merriweather</b> – patkový font optimalizovaný pro obrazovky</li>
  <li><b>Fira Sans</b> – od Mozilly, moderní a čitelný</li>
</ul>

<p>Při připojování z Google Fonts stačí přidat parametr <code>&amp;subset=latin-ext</code> nebo ho vybrat v rozhraní:</p>

<pre><code>&lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&amp;subset=latin-ext&amp;display=swap" rel="stylesheet"&gt;</code></pre>


<h2 id="ceske-projekty">Česká a slovenská písma</h2>

<p>Existuje několik fontů vytvořených přímo českými nebo slovenskými designéry:</p>

<ul>
  <li><b>Czech Sans</b> – volně dostupný bezpatkový font navržený pro češtinu</li>
  <li><b>Visual</b> – font od <a href="https://www.ceskefonty.cz">ceskefonty.cz</a></li>
  <li><b>Comenia</b> – profesionální font používaný na českých školách</li>
</ul>


<h2 id="systemove">Systémové fonty s češtinou</h2>

<p>Všechny moderní operační systémy obsahují fonty s českou diakritikou. Pokud nepotřebujete vlastní font, system font stack je nejrychlejší volba:</p>

<pre><code>font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;</code></pre>

<p>Tyto systémové fonty češtinu plně podporují:</p>

<ul>
  <li><b>Windows</b>: Segoe UI, Calibri, Arial</li>
  <li><b>macOS</b>: San Francisco (system-ui), Helvetica Neue</li>
  <li><b>Linux</b>: Liberation Sans, DejaVu Sans, Noto Sans</li>
</ul>


<h2 id="psaci-pismo">České psací písmo (script fonty)</h2>

<p>Pro dekorativní účely se hodí psací fonty s českou diakritikou. Při výběru je nutné ověřit, že font obsahuje znaky ř, ž, š, č, ď, ť, ň, ú, ů, ě, í, á, é, ó, ý:</p>

<ul>
  <li><b>Dancing Script</b> – kaligrafické psací písmo (Google Fonts)</li>
  <li><b>Caveat</b> – ruční psací písmo, neformální</li>
  <li><b>Pacifico</b> – tlusté psací písmo pro nadpisy</li>
  <li><b>Great Vibes</b> – elegantní kaligrafie</li>
</ul>


<h2 id="jak-overit">Jak ověřit podporu diakritiky</h2>

<p>Před použitím fontu je dobré ověřit, zda obsahuje všechny potřebné znaky. Stačí vyzkoušet větu se všemi českými specifickými znaky:</p>

<pre><code>Příliš žluťoučký kůň úpěl ďábelské ódy.</code></pre>

<p>Pokud se všechny znaky zobrazí správně (zejména ů, ď, ť, ň, ř), font češtinu podporuje.</p>


<h2 id="pripojeni">Připojení fontu na web</h2>

<p>Pro připojení vlastního fontu na web se používá CSS pravidlo <a href="/font-face"><code>@font-face</code></a>. Doporučený formát je <b>WOFF2</b>, který nabízí nejlepší kompresi:</p>

<pre><code>@font-face {
  font-family: 'MujFont';
  src: url('/fonts/muj-font.woff2') format('woff2');
  font-display: swap;
}</code></pre>

<p>Hodnota <code>font-display: swap</code> zajistí, že se text zobrazí ihned systémovým fontem a po načtení se přepne na vlastní.</p>
