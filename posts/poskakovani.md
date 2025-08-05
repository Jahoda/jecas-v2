---
title: "Poskakování stránky"
headline: "Poskakování stránky"
description: "Proč vadí poskakování stránky během načítání a jak se ho zbavit."
date: "2016-12-06"
last_modification: "2017-05-07"
status: 1
tags: ["napady", "responsive", "webove-prohlizece"]
format: "html"
---

<p>Je poměrně častý jev, že webové stránky během načítání všelijak poskakují, jak se stahují a zpracovávají jednotlivé připojené soubory.</p>





<p>Před načtením a zpracováním zejména <b>obrázků a skriptů</b> může web vypadat nějak takto:</p>

<p><img src="/files/poskakovani/pred.png" data-src="/files/poskakovani/po.jpg" alt="Před načtením" class="border" id="pred-po"></p>





























<p>Když se další obsah dotáhne, stránka <button onclick="prepnoutObrazek(document.getElementById('pred-po'))">přeskočí</button> do finálního zobrazení.</p>


<p>Ačkoliv je poskakování častý nešvar, existují možnosti, jak proti němu bojovat.</p>


<h2 id="vadi">Proč poskakování vadí</h2>

<ol>
  <li>
    <p><b>Překreslování</b> – prohlížeč musí tentýž obsah vykreslit vícekrát s ohledem na to, jak se mu mění pod rukama.</p>
        
    <div class="internal-content">
      <ul>
        <li><p><a href="/vykreslovani">Jak probíhá vykreslování stránky</a></p></li>
      </ul>
    </div>    
    
    <p>To stojí nějaký čas a výkon navíc.</p>
  </li>
  <li>
    <p><b>Visuální dojem</b> – poskakování prvků stránky není úplně estetické, takže nebude lahodit oku návštěvníka.</p>
  </li>
  <li>
    <p><b>Matení návštěvníka</b> – velké změny stránky během načítání mohou být až matoucí. S ohledem na možnou nespolehlivost zejména mobilního internetového připojení se obrázky/skripty mohou načíst za hodně dlouhou dobu nebo třeba vůbec.</p>
    
    <p>V případě dlouhého načítání se už může návštěvník do webu začíst (někam odroluje) a po donačtení obsahu a změny výšky stránky bude najednou někde jinde.</p>
  </li>
</ol>

<h2 id="zjistit">Jak zjistit, že stránka poskakuje</h2>

<p>Pro rychlý orientační přehled stačí na stránce vypnout obrázky a JavaScript a výsledek porovnat s <i>plnou</i> podobou webu.</p>

<p>Blokovat JS/obrázky v <b>Chrome</b> jde následovně:</p>


<p><img src="/files/poskakovani/blokovat.png" alt="Blokování obrázků a JavaScriptu" class="border"></p>
































<p>V ideálním případě by si měly být obě varianty co možná nejpodobnější. Případně by prvky závislé na načtení obrázků/skriptů <b>neměly ovlivňovat okolí</b>.</p>

<p><button onclick="prepnoutObrazek(document.getElementById('pred-po-jecas'))">Přepnout</button></p>


<p><img src="/files/poskakovani/jecas-pred.png" data-src="/files/poskakovani/jecas-po.png" alt="Před načtením" class="border" id="pred-po-jecas"></p>
























<h2 id="co-zpusobuje">Co poskakování způsobuje</h2>


<h3 id="obrazky">Obrázky</h3>

<p>Nejčastější příčinou bývají obrázky. Pokud se obrázek vloží do stránky značkou <code>&lt;img></code> bez uvedení rozměrů v HTML atributech nebo CSS, jeho velikost na stránce bude prohlížeč vědět až po stažení souboru obrázku. Logicky tak nejde dopředu na stránce vyhradit místo.</p>



<p>Nejsnazší řešení je přidat rozměry do atributů <code>width</code> a <code>height</code>:</p>

<pre><code>&lt;img src="obrazek.png" <b>width="100" height="100"</b>></code></pre>











<p>Problém ale nastává v případě <b>responsivních obrázků</b>. Zde je žádoucí, aby se rozměry obrázku dopočítaly podle dostupného prostoru (např. šířka okna).</p>

<pre><code>img {
  max-width: 100%;
  height: auto;
}</code></pre>










<p>Nějaké jednoduché řešení neexistuje. Pokud je znám poměr stran (výšky a šířky), je možné si pomoci obalovým elementem:</p>

<div class="internal-content">
  <ul>
    <li><a href="/rozmery-responsivniho-obrazku">Nastavení výšky responsivního obrázku</a></li>
  </ul>
</div>


<h3 id="js">JavaScripty</h3>

<p>Častým jevem je poskakování při použití JS, který významně <a href="/prepinani-vzhledu#">modifikuje stránku</a>. Například kolotoče (carousely), přepínání obsahu v záložkách nebo skrývání a odkrývání bloků.</p>

<p>Je dobré si takovéto prvky projít s vypnutým JavaScriptem a ověřit, že neposkakují.</p>

<p>Problematické prvky je potřeba zvlášť nastylovat pro situaci s ještě nenačteným JS. Ideální je detekovat dostupnost skriptování například nahrazením značky <code>&lt;body></code> za:</p>

<pre><code>&lt;body class="no-js">
&lt;script>
    document.body.className = document.body.className.replace('no-js', 'js');
&lt;/script></code></pre>











<p>V CSS jde potom psát <code>.js .trida {}</code> pro ovlivnění vzhledu elementů, které teprve čekají na načtení externího JS.</p>

<script>
  function prepnoutObrazek(obr) {
    var puvodniSrc = obr.src;
    obr.src = obr.getAttribute("data-src");
    obr.setAttribute("data-src", puvodniSrc);
  }
</script>