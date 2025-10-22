---
title: "Zobrazení dlouhé URL"
headline: "Zobrazení dlouhé URL"
description: "Jak zobrazit dlouhé URL v aplikaci, aby nerozbila layout."
date: "2025-10-22"
last_modification: "2025-10-22"
status: 1
tags: ["css", "ux", "hotova-reseni"]
format: "html"
---

<p>Dlouhé URL adresy se objevují v komentářích, chatech, administračních rozhraních i náhledech položek. Pokud je zobrazíme „holé“ (jako čistý text nebo jako text odkazu) v úzkém sloupci nebo v prvku s omezenou šířkou, mohou <b>přetéct</b> a <b>rozbít layout</b>.</p>


<h2 id="problem">Problém v praxi</h2>

<div class="live">
  <style>
    .url-box { width: 220px; padding: .5em; background: #fff; border: 1px solid #e5e7eb; }
    .url-long { color: #0369a1; }
  </style>
  <div class="url-box">
    <a class="url-long" href="#">https://example.com/nejneobhospodarovavatelnejsi</a>
    <code>https://example.com/nejneobhospodarovavatelnejsi</code>
  </div>
</div>

<p>Bez úprav se text odkazu nevejde do dané šířky a „teče“ ven.</p>

<p>Problém se ještě umocní, pokud má URL zákaz zalamování, například v elementu <code>&lt;code></code>. U běžné URL se však často najde spojovník nebo otazník, které standardně zalomení umožní.</p>

<p>U řady URL tak nemusí být vůbec problém, protože se přirozeně zalomí u znaků, jako jsou <code>?</code> nebo <code>-</code>. Nejde na to ale spoléhat.</p>

<div class="live">
  <style>
    .url-box { width: 220px; padding: .5em; background: #fff; border: 1px solid #e5e7eb; }
    .url-long { color: #0369a1; }
  </style>
  <div class="url-box">
    <a class="url-long" href="#">https://example.com/velmi-dlouha-cesta/podrobnosti?parametr=je-opravdu-neuveritelne-dlouhy-ale-mozna-nerozbije-layout</a>
  </div>
</div>

<h2 id="monospace"><span class="font-mono">Monospace</span>, nebo ne?</h2>

<p>K úvaze je, zda URL zobrazovat proporcionálně, nebo <span class="font-mono">neproporcionálně</span>.</p>

<p>Neproporcionální zobrazení má výhodu, že je lépe čitelné pro podobné znaky – Il0O vs. <span class="font-mono">Il0O</span>. Na druhou stranu bývá ještě <i>širší</i> a často zbytečně odvádí pozornost.</p>


<h2 id="css-reseni">CSS řešení</h2>

<h3 id="overflow-wrap-anywhere"><code>overflow-wrap: anywhere</code> (šetrné)</h3>

<p>Nejpohodlnější řešení, které dovolí zalomit kdekoliv, pokud jinak nelze zalomit přirozeně.</p>

<pre><code>.url-long { overflow-wrap: anywhere; }
</code></pre>

<div class="live">
  <div class="url-box" style="--a:1">
    <a class="url-long" style="overflow-wrap:anywhere" href="#">https://example.com/nej-naaaaeobhospodarovavatel–nejs-naaaaeobhospodarovavatel–nejs</a>
  </div>
</div>

<h3 id="word-break"><code>word-break: break-all</code> (agresivní)</h3>

<p>Vynucuje lámání i uprostřed slov, ale vůbec se nesnaží nezalamovat slova, pokud je to možné. Výhoda je, že se zalomený text nenatáhne na tolik řádků.</p>

<pre><code>.url-long { word-break: break-all; }
</code></pre>

<div class="live">
  <div class="url-box">
    <a class="url-long" style="word-break:break-all" href="#">https://example.com/nej-naaaaeobhospodarovavatel–nejs-naaaaeobhospodarovavatel–nejs</a>
  </div>
</div>


<h3 id="ellipsis">Jednořádkové zkrácení s „…“</h3>

<p>Pro tabulky, seznamy nebo karty, kde stačí náhled na jednom řádku.</p>

<pre><code>.url-ellipsis {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</code></pre>

<div class="live">
  <div class="url-box">
    <a class="url-ellipsis" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" href="#">https://example.com/nejneobhospodarovavatelnejsi</a>
  </div>
</div>

<p>Velká výhoda tohoto postupu je, že je text stále na stránce přítomný.</p>

<p>Takže jde na stránce najít přímo v prohlížeči a dozví se o něm i <a href="/seo">vyhledávače</a>.</p>

<p><img src="/files/zobrazeni-url/vyhledavani.png" class="border" alt="Vyhledávání zkráceného textu" /></p>

<h3 id="flex-a-tab">Flex kontejnery a tabulky</h3>

<p>U flexboxu mohou položky bránit zmenšení své šířky. Řešení je <code>min-width: 0</code>.</p>

<pre><code>.row { display: flex; gap: .5rem; }
.cell { min-width: 0; }
.cell a { overflow-wrap: anywhere; }
</code></pre>

<p>V tabulkách bývá nutné použít <code>table-layout: fixed</code> nebo nastavit <code>max-width: 0</code> na buňku, viz <a href="/zalamovani-slov#tabulky">Zalamování textu v tabulkách</a>.</p>

<h2 id="wbr">Chytré lámání na vybraných místech</h2>

<p>Zajímavé řešení je vkládat do URL <code>&lt;wbr></code> za bezpečné oddělovače (<code>/</code>, <code>?</code>, <code>&amp;</code>, <code>=</code>).</p>

<pre><code>&lt;a href="#">https://example.com/&lt;wbr>cesta/&lt;wbr>podrobnosti?&lt;wbr>parametr=&lt;wbr>hodnota-dlouha&lt;/a>
</code></pre>

<p>Vyžaduje to více práce, ale minimalisuje to šanci zalomení uprostřed slova.</p>

<div class="live">
  <div class="url-box">
    <a href="#">https://example.com/<wbr>cesta/<wbr>podrobnosti?<wbr>parametr=<wbr>hodnota-dlouha</a>
  </div>
</div>



<h2 id="zkraceni">Zkrácení</h2>

<p>Další možnost je zobrazovanou URL reálně zkrátit. Nabízí se různé varianty. Je dobré se rozhodnout podle konkrétní situace. Podle toho, co uživatel potřebuje vidět.</p>

<ol>
<li>Zkrácení na konci: <br>https://example.com/opravdu-hodne-dlouhy…</li>
<li>Zkrácení uprostřed: <br>https://example.com/opravdu-hodne…arametr</li>
<li>Odstranění protokolu: <br>example.com/opravdu-hodne-dlouhy-param…</li>
<li>Odstranění cesty: <br>example.com</li>
<li>Nezobrazování URL: <br><a href="#">Odkaz</a></li>
</ol>

<p>U reálného zkrácení může být problém při vyhledávání na stránce.</p>

<h2 id="nahled">Náhled URL</h2>

<p>Někdy se může hodit obejít problém <a href="/nahled-url">náhledem stránky</a>. Třeba zobrazit faviconu nebo logo firmy (využít <a href="https://brandfetch.com/">Brandfetch</a>).</p>

<h2 id="tooltip">Tooltip</h2>

<p>Universální řešení všech problémů s místem je použít <a href="/tooltip">tooltip</a>, kdy se nezkrácená plná URL zobrazí až po najetí myši.</p>

<p>Samozřejmě to má i své nevýhody a nehodí se to použít vždy. Zvlášť pokud je URL hodně důležité vidět nebo porovnávat s dalšími záznamy, tak je tooltip zbytečně obtěžující.</p>

<h2 id="kopirovani">Možnost kopírování</h2>

<p>Pro zachování uživatelské přívětivosti je vhodné nekomplikovat kopírování odkazu. U zkráceného odkazu toho jde snadno docílit ponecháním plné URL v atributu <code>href</code>, kdy jde snadno kopírovat přes kontextovou nabídku.</p>

<p><img src="/files/zobrazeni-url/zkopirovat-odkaz.png" class="border" alt="Kopírovat adresu odkazu" /></p>

<p>Alternativa je přidat tlačítko pro <a href="/kopirovat">kopírování textu do schránky</a>.</p>


<h2 id="odkazy">Odkazy jinam</h2>
<div class="internal-content">
  <ul>
    <li><a href="/zalamovani-slov">Zalamování dlouhých slov</a></li>
    <li><a href="/oriznuti-textu">Oříznutí textu</a></li>
    <li><a href="/tvar-url">Tvar URL</a></li>
  </ul>
 </div>