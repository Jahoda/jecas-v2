---
title: "CSS výška height"
headline: "CSS výška <code>height</code>"
description: "Nastavování výšky v CSS a proč ho raději nepoužívat."
date: "2015-12-21"
last_modification: "2015-12-21"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>CSS vlastnost <code>height</code> je jedna z <a href="/cetnost-css">často používaných</a>.</p>

<p>Výšku jde nastavit pro elementy, které <b>nejsou řádkové</b> (tj. nejsou <a href="/display#inline"><code>display: inline</code></a>), obvykle se používají běžné délkové jednotky jako <code>px</code>, <code>em</code> nebo procenta:</p>

<pre><code>div {
  height: 50px;
}</code></pre>



<p>U řádkových prvků (např. <code>&lt;span></code>) je pro nastavení výšky nutné:</p>

<ol>
  <li>Přidat <code>display: inline-block</code>.</li>
  
  <li>Nebo použít vlastnost <code>line-height</code> (výška řádku).</li>
</ol>




<h2 id="nepouzivat">Proč nepoužívat <code>height</code></h2>

<p>Zvlášť začátečníci mají v oblibě výšku hojně nastavovat. Nastavovat něčemu <code>height</code> by ale ideálně mělo být poslední možné řešení.</p>


<p>Proč?</p>



<p>Obsah webových stránek většinou plyne shora dolů a není rozumné spoléhat na to, že textový obsah bude mít <b>stejnou velikost</b> za všech okolností.</p>

<ol>
  <li>
    <p>Rozhodne-li se někdo přidat nebo smazat pár slov nebo vět, výsledná výška odstavce se změní.</p>
    <p>Nastavování výšky se spoléhá na neměnnost obsahu.</p>
  </li>
  <li>
    <p>Návštěvník může mít nastavenu <b>jinou velikost písma</b>, která opět může způsobit odlišnou výšku odstavce. Stejně tak odlišnou výšku někdy způsobí třeba jiný font.</p>
  </li>
</ol>

<p>Výsledkem je nehezké <i>vytečení obsahu</i> z prostoru s pevnou výškou.</p>

<p>Takhle třeba vypadají dlaždice s nastavenou výškou na webu České televise.</p>

<p><img src="/files/height/ct.png" alt="Useknutí textu na webu ČT" class="border"></p>


























<p>Situace, kdy toto risiko při nastavování <code>height</code> nehrozí, jsou relativně vzácné:</p>



<h2 id="pouzit">Kdy nastavit <code>height</code></h2>

<p>Většinou se jedná o malé objekty jako jsou <a href="/obrazky">obrázky</a>, ikony, videa, reklamní bannery a podobně. U těch nehrozí zvětšení písma a z toho plynoucí přetečení.</p>




<h3 id="px">Výška v pixelech</h3>

<p>Pokud už se výška nastavuje, je dobré použít alespoň jednotky <code>em</code>, které se dokáží přizpůsobit velikosti písma.</p>

<p>Nastavit <code>height</code> v pixelech se ale hodí například pro ikonky v případě, že nejsou v <a href="/svg">SVG</a>, potom je potřeba držet skutečné rozměry dle obrázku, má-li být výsledný obrázek ostrý.</p>



<h3 id="maximalni-vyska">Maximální výška</h3>

<p>Není-li problém, že se přetékající obsah ořízne, může se nastavení výšky hodit pro:</p>

<div class="internal-content">
  <ul>
    <li><a href="/oriznuti-radek">Oříznutí víceřádkového obsahu</a></li>
  </ul>
</div>


<h3 id="nulova">Nulová výška</h3>

<p>Spolu s <code>padding</code>em se nulová výška používá jako trik pro vytvoření elementu s proměnlivými rozměry, ale daným poměrem stran:</p>

<pre><code>.box {
  height: 0;
  padding-bottom: 25%;
}</code></pre>





<p>Výše uvedený box bude mít čtvrtinovou (25 %) výšku oproti šířce; více v samostatném článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/vyska-podle-sirky">Výška závislá na šířce</a></li>
  </ul>
</div>



<h3 id="tlacitka">Výška políčka a tlačítka</h3>

<p>U tlačítka nebo textového <a href="/input"><code>&lt;input></code>u</a> se může zdát, že nikdy nebude obsahovat tolik textu, aby se roztáhl na dva řádky.</p>

<p>Většinou s tím problém není a nastavení <code>height</code> i usnadňuje stylování napříč prohlížeči:</p>

<div class="internal-content">
  <ul>
    <li><a href="/stylovani-inputu">Stylování formulářových políček a tlačítek</a></li>
    <li><a href="/firefox-vyssi-tlacitko">Vyšší tlačítko ve Firefoxu</a></li>
  </ul>
</div>

<h3 id="js">Počítání v JavaScriptu</h3>

<p>Spočítá-li se výška obsahu JavaScriptem, není problém výšku následně nastavit. Používá se to často pro plynulé rozbalení obsahu. Je ale dobré přepočítání provést i při změně velikosti okna, které může situaci změnit.</p>


<div class="internal-content">
  <ul>
    <li><a href="/animace-skryt">Animované skrytí obsahu</a></li>
  </ul>
</div>


<h2 id="chyby">Chybné použití <code>height</code></h2>


<h3 id="odsazeni">Odsazení</h3>

<p>Je-li cílem, aby kolem boxu bylo volné místo, je lepší použít <a href="/margin"><code>margin</code></a>/<code>padding</code>.</p>


<h3 id="sloupce">Stejně vysoké sloupce</h3>

<p>Použít <code>height</code> může svádět v případě snahy o vytvoření stejně vysokých sloupců. Existují lepší řešení:</p>

<div class="internal-content">
  <ul>
    <li><a href="/stejne-vysoke-sloupce">Sloupce stejně vysoké</a></li>
  </ul>
</div>

<h3 id="zarovnani">Problém zarovnání</h3>

<p>Bude-li mít nějaký objekt fixní výšku, při změně velikosti písma nebude text svisle vycentrovaný.</p>

<p>Tímto problémem trpí třeba lišta na <a href="/facebook">Facebooku</a>, která se při větším písmu nezobrazuje zrovna ideálně:</p>

<p><img src="/files/height/fb-lista.png" alt="FB lišta se zvětšeným písmem" class="border"></p>




<h2 id="box-model">Vliv box-modelu</h2>

<p>Na počítání výšky má stejně jako u šířky vliv <a href="/box-model"><code>box-model</code></a>. Při používání výchozího obsahového box-modelu (<code>box-sizing: content-box</code>) se nastavené výšce přičte hodnota <code>padding</code>u a <code>border</code>u.</p>

<p>Většinou je výhodnější box model přepnout na okrajový. Element je potom vysoký přesně podle <code>height</code>:</p>

<pre><code>* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}</code></pre>








<h2 id="hodnoty">Další hodnoty <code>height</code></h2>

<p>Některé novější prohlížeče podporují zvláštní klíčová slova pro nastavení výšky/šířky:</p>

<div class="external-content">
  <ul>
    <li>Can I Use: <a href="http://caniuse.com/#feat=intrinsic-width">Intrinsic &amp; Extrinsic Sizing</a></li>
  </ul>
</div>

<p>Kvůli nedostatečné podpoře tato klíčová slova <code>border-box</code>, <code>content-box</code>, <code>max-content</code>, <code>min-content</code>, <code>available</code>, <code>fit-content</code>  ale zatím nemají moc využití.</p>


<div class="external-content">
  <ul>
    <li>DevDocs: <a href="http://devdocs.io/css/height"><code>height</code></a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/css/height.html">Height</a> – chování <code>height</code> ve starších prohlížečích</li>
</ul>