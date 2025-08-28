---
title: "Klikací mapa ČR v SVG"
headline: "Klikací SVG mapa ČR"
description: "Klikací mapa všech krajů v ČR ve formátu SVG."
date: "2016-12-21"
last_modification: "2016-12-21"
status: 0
tags: [svg, mapy, css, javascript]
format: "html"
---


<h2 id="interaktivni-ukazka">Interaktivní ukázka</h2>

<p>Klikněte na kraj v mapě níže a zobrazí se jeho název:</p>

<div id="mapa-demo" style="max-width: 600px; margin: 20px 0;">
  <div id="vysledek" style="text-align: center; margin-bottom: 10px; font-weight: bold; color: #2196F3; min-height: 20px;"></div>
  
  <object data="/files/mapa-cr-svg/cz-kraje.svg" type="image/svg+xml" style="width: 100%; height: auto; border: 1px solid #ccc;" id="svg-mapa"></object>
</div>

<style>
.kraj {
  cursor: pointer;
  transition: fill 0.3s ease;
}
.kraj:hover {
  fill: #4CAF50 !important;
}
.kraj.active {
  fill: #2196F3 !important;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const svgObject = document.getElementById('svg-mapa');
  const vysledek = document.getElementById('vysledek');
  
  svgObject.addEventListener('load', function() {
    const svgDoc = svgObject.contentDocument;
    const kraje = svgDoc.querySelectorAll('.kraj');
    
    const krajNazvy = {
      'praha': 'Praha',
      'stredocesky-kraj': 'Středočeský kraj',
      'jihocesky-kraj': 'Jihočeský kraj',
      'plzensky-kraj': 'Plzeňský kraj',
      'karlovarsky-kraj': 'Karlovarský kraj',
      'ustecky-kraj': 'Ústecký kraj',
      'liberecky-kraj': 'Liberecký kraj',
      'kralovehradecky-kraj': 'Královéhradecký kraj',
      'pardubicky-kraj': 'Pardubický kraj',
      'vysocina': 'Kraj Vysočina',
      'jihomoravsky-kraj': 'Jihomoravský kraj',
      'olomoucky-kraj': 'Olomoucký kraj',
      'zlinsky-kraj': 'Zlínský kraj',
      'moravskoslezsky-kraj': 'Moravskoslezský kraj'
    };
    
    kraje.forEach(kraj => {
      kraj.addEventListener('click', function() {
        const krajId = this.id;
        const nazev = krajNazvy[krajId] || krajId;
        
        kraje.forEach(k => k.classList.remove('active'));
        this.classList.add('active');
        
        vysledek.textContent = `Vybraný kraj: ${nazev}`;
      });
    });
  });
});
</script>

<p><a href="https://kod.djpw.cz/amdc">Samostatná živá ukázka</a></p>

<p>SVG mapy jsou skvělým způsobem, jak vytvořit interaktivní mapy přímo v prohlížeči. Na rozdíl od bitmapových obrázků jsou vektorové, takže se dobře škálují a umožňují snadné přidání interaktivity.</p>

<h2 id="vyhody-svg-map">Výhody SVG map</h2>

<ul>
  <li><strong>Škálovatelnost</strong> – mapa vypadá ostře v jakémkoliv rozlišení</li>
  <li><strong>Interaktivita</strong> – snadné přidání hover efektů a klikání</li>
  <li><strong>Velikost</strong> – menší soubory než bitmapové mapy</li>
  <li><strong>Přístupnost</strong> – možnost přidat alt texty a popisky</li>
  <li><strong>Stylování</strong> – CSS animace a přechody</li>
</ul>

<h2 id="implementace-klikaci-mapy">Implementace klikací mapy</h2>

<h3 id="způsoby-vložení-svg">Způsoby vložení SVG</h3>

<p>Existuje několik způsobů, jak vložit SVG do HTML. Každý má své výhody a nevýhody:</p>

<h4 id="1-inline-svg">1. Inline SVG (nejlepší pro interaktivitu)</h4>

<pre><code>&lt;svg viewBox="0 0 800 600"&gt;
  &lt;g id="kraje"&gt;
    &lt;path id="praha" d="M..." 
          data-nazev="Praha" 
          class="kraj"&gt;&lt;/path&gt;
    &lt;path id="stredocesky" d="M..." 
          data-nazev="Středočeský kraj" 
          class="kraj"&gt;&lt;/path&gt;
    &lt;!-- další kraje --&gt;
  &lt;/g&gt;
&lt;/svg&gt;</code></pre>

<p><strong>Výhody:</strong></p>
<ul>
  <li>Přímý přístup k elementům z JavaScriptu</li>
  <li>CSS stylování funguje bez problémů</li>
  <li>Nejlepší výkon pro interaktivitu</li>
  <li>SEO friendly</li>
</ul>

<p><strong>Nevýhody:</strong></p>
<ul>
  <li>Zvětšuje velikost HTML</li>
  <li>Nelze cacheovat samostatně</li>
  <li>Složitější údržba pro velké SVG</li>
</ul>

<h4 id="2-object-tag">2. Object tag (kompromis)</h4>

<pre><code>&lt;object data="mapa.svg" type="image/svg+xml"&gt;
  &lt;img src="mapa-fallback.png" alt="Mapa ČR"&gt;
&lt;/object&gt;</code></pre>

<p><strong>Výhody:</strong></p>
<ul>
  <li>SVG se načítá samostatně (cache)</li>
  <li>Fallback pro starší prohlížeče</li>
  <li>Menší HTML soubor</li>
  <li>Možnost přístupu k SVG obsahu</li>
</ul>

<p><strong>Nevýhody:</strong></p>
<ul>
  <li>Složitější přístup k SVG elementům</li>
  <li>Potřebuje load event handling</li>
  <li>CORS problémy při cross-origin načítání</li>
</ul>

<h4 id="3-img-tag">3. Img tag (nejjednodušší)</h4>

<pre><code>&lt;img src="mapa.svg" alt="Mapa ČR"&gt;</code></pre>

<p><strong>Výhody:</strong></p>
<ul>
  <li>Nejjednodušší implementace</li>
  <li>Automatické cacheování</li>
  <li>Fallback pro všechny prohlížeče</li>
</ul>

<p><strong>Nevýhody:</strong></p>
<ul>
  <li>Žádná interaktivita</li>
  <li>Nelze stylovat CSS</li>
  <li>Žádný přístup k SVG elementům</li>
</ul>

<h4 id="4-use-element">4. Use element (pro opakované použití)</h4>

<pre><code>&lt;svg&gt;
  &lt;defs&gt;
    &lt;g id="kraje-def"&gt;
      &lt;path id="praha" d="M..."&gt;&lt;/path&gt;
    &lt;/g&gt;
  &lt;/defs&gt;
  &lt;use href="#kraje-def"&gt;&lt;/use&gt;
&lt;/svg&gt;</code></pre>

<h3 id="best-practice-pro-interaktivní-mapy">Best Practice pro interaktivní mapy</h3>

<p><strong>Pro klikací mapu ČR doporučuji:</strong></p>

<ol>
  <li><strong>Inline SVG</strong> – pokud je mapa malá a potřebujete maximální interaktivitu</li>
  <li><strong>Object tag</strong> – pokud je SVG velké nebo se používá na více místech</li>
  <li><strong>Img tag</strong> – pouze pro statické zobrazení bez interaktivity</li>
</ol>

<h4 id="optimalizace-pro-object-tag">Optimalizace pro Object tag</h4>

<pre><code>&lt;object data="mapa.svg" type="image/svg+xml" 
        style="width: 100%; height: auto;"&gt;
  &lt;!-- Fallback pro starší prohlížeče --&gt;
  &lt;img src="mapa.png" alt="Mapa ČR" style="width: 100%;"&gt;
&lt;/object&gt;

&lt;script&gt;
document.addEventListener('DOMContentLoaded', function() {
  const svgObject = document.querySelector('object[type="image/svg+xml"]');
  
  // Čekáme na načtení SVG
  svgObject.addEventListener('load', function() {
    const svgDoc = svgObject.contentDocument;
    const kraje = svgDoc.querySelectorAll('.kraj');
    
    kraje.forEach(kraj => {
      kraj.addEventListener('click', function() {
        console.log('Kliknuto na:', this.id);
      });
    });
  });
});
&lt;/script&gt;</code></pre>

<h4 id="optimalizace-pro-inline-svg">Optimalizace pro Inline SVG</h4>

<pre><code>&lt;svg viewBox="0 0 800 600" style="width: 100%; height: auto;"&gt;
  &lt;g id="kraje"&gt;
    &lt;path id="praha" d="M..." class="kraj"&gt;&lt;/path&gt;
    &lt;path id="stredocesky" d="M..." class="kraj"&gt;&lt;/path&gt;
  &lt;/g&gt;
&lt;/svg&gt;

&lt;script&gt;
document.addEventListener('DOMContentLoaded', function() {
  const kraje = document.querySelectorAll('.kraj');
  
  kraje.forEach(kraj => {
    kraj.addEventListener('click', function() {
      console.log('Kliknuto na:', this.id);
    });
  });
});
&lt;/script&gt;</code></pre>

<h3 id="doporučení-pro-mapu-cr">Doporučení pro mapu ČR</h3>

<p>Pro naši klikací mapu ČR s 14 kraji doporučuji:</p>

<ul>
  <li><strong>Inline SVG</strong> – protože je mapa relativně malá a potřebujeme maximální interaktivitu</li>
  <li><strong>Object tag</strong> – pokud chceme SVG cacheovat nebo použít na více místech</li>
  <li><strong>Vždy přidat fallback</strong> – pro starší prohlížeče nebo při chybě načítání</li>
  <li><strong>Responzivní viewBox</strong> – pro správné škálování</li>
  <li><strong>Přístupnost</strong> – přidat ARIA atributy a alt texty</li>
</ul>

<h2 id="css-styly">CSS styly</h2>

<pre><code>.kraj {
  fill: #e0e0e0;
  stroke: #333;
  stroke-width: 1;
  cursor: pointer;
  transition: fill 0.3s ease;
}

.kraj:hover {
  fill: #4CAF50;
}

.kraj.active {
  fill: #2196F3;
}</code></pre>

<h2 id="javascript-interaktivita">JavaScript interaktivita</h2>

<pre><code>document.querySelectorAll('.kraj').forEach(kraj => {
  kraj.addEventListener('click', function() {
    const nazev = this.dataset.nazev;
    console.log(`Kliknuto na: ${nazev}`);
    
    // Odstranění aktivního stavu z ostatních krajů
    document.querySelectorAll('.kraj').forEach(k => k.classList.remove('active'));
    
    // Aktivace kliknutého kraje
    this.classList.add('active');
  });
});</code></pre>

<h2 id="zdroje-svg-map">Zdroje SVG map</h2>

<ul>
  <li>
    <a href="https://restgis.com">REST GIS</a> – api pro získání map celého světa
  </li>
  <li><a href="https://simplemaps.com">Simple Maps</a> – bezplatné SVG mapy států a regionů</li>
  <li><a href="https://www.amcharts.com/svg-maps/">AmCharts</a> – interaktivní SVG mapy</li>
  <li><a href="https://github.com/deldersveld/topojson">TopoJSON</a> – topologické mapové data</li>
</ul>

<h2 id="tipy-pro-optimalizaci">Tipy pro optimalizaci</h2>

<ul>
  <li>Používejte <code>viewBox</code> pro responzivní chování</li>
  <li>Optimalizujte SVG pomocí nástrojů jako SVGO</li>
  <li>Přidejte <code>aria-label</code> pro přístupnost</li>
  <li>Používejte CSS proměnné pro konzistentní barvy</li>
  <li>Implementujte touch události pro mobilní zařízení</li>
</ul>

<h2 id="priklady-pouziti">Příklady použití</h2>

<p>SVG mapy se hodí pro:</p>

<ul>
  <li>Výběr regionů v e-shopech</li>
  <li>Statistické vizualizace</li>
  <li>Interaktivní průvodce</li>
  <li>Geografické hry a kvízy</li>
  <li>Dashboard aplikace</li>
</ul>

<p>SVG mapy poskytují moderní a flexibilní způsob zobrazení geografických dat přímo v prohlížeči bez nutnosti externích knihoven nebo pluginů.</p>