---
title: "3D transformace"
headline: "3D transformace"
description: "Jak v CSS používat 3D transformace pro vytváření pokročilých vizuálních efektů."
date: "2014-03-03"
last_modification: "2014-03-03"
status: 0
tags: ["css", "webove-animace"]
format: "html"
---

<p>CSS 3D transformace umožňují vytvářet pokročilé vizuální efekty přímo v prohlížeči bez nutnosti používat JavaScript nebo externí knihovny. S pomocí těchto vlastností můžeme vytvářet realistické 3D efekty, které dříve vyžadovaly složité programování.</p>

<h2 id="zakladni-principy">Základní principy</h2>

<p>3D transformace fungují na principu transformační matice, která mění pozici, rotaci a velikost elementů v trojrozměrném prostoru. Klíčové vlastnosti pro 3D transformace jsou:</p>

<ul>
<li><code>transform-style: preserve-3d</code> – zachovává 3D prostor</li>
<li><code>perspective</code> – definuje hloubku 3D scény</li>
<li><code>transform-origin</code> – určuje střed transformace</li>
</ul>

<h2 id="perspektiva">Perspektiva</h2>

<p>Perspektiva je základním kamenem 3D transformací. Určuje, jak daleko je "oko" diváka od scény a vytváří iluzi hloubky v 2D prostoru.</p>

<h3 id="jak-perspektiva-funguje">Jak perspektiva funguje</h3>

<p>Perspektiva funguje na principu <strong>konvergence rovnoběžných čar</strong>. V reálném světě se rovnoběžné čáry zdánlivě sbíhají v jednom bodě (úběžníku) na horizontu. CSS perspektiva simuluje tento efekt:</p>

<ul>
<li><strong>Nízká hodnota perspektivy</strong> (např. 200px) = "oko" je blízko scény = výrazný 3D efekt</li>
<li><strong>Vysoká hodnota perspektivy</strong> (např. 2000px) = "oko" je daleko od scény = jemný 3D efekt</li>
<li><strong>Žádná perspektiva</strong> = plochý 2D efekt bez hloubky</li>
</ul>

<h3 id="praktické-priklady-perspektivy">Praktické příklady perspektivy</h3>

<div class="live">
  <style>
    .perspective-examples {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    
    .perspective-example {
      text-align: center;
      background: rgba(255,255,255,0.9);
      padding: 20px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }
    
    .perspective-demo-small {
      width: 100px;
      height: 100px;
      margin: 10px auto;
      transform-style: preserve-3d;
    }
    
    .perspective-demo-small.near {
      perspective: 200px;
    }
    
    .perspective-demo-small.medium {
      perspective: 1000px;
    }
    
    .perspective-demo-small.far {
      perspective: 2000px;
    }
    
    .perspective-demo-small.none {
      perspective: none;
    }
    
    .perspective-element-small {
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #667eea, #764ba2);
      transform: rotateY(45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      border-radius: 8px;
      font-size: 12px;
    }
    
    .perspective-label {
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
    
    .perspective-description {
      font-size: 12px;
      color: #666;
      line-height: 1.4;
    }
  </style>
  
  <div class="perspective-examples">
    <div class="perspective-example">
      <div class="perspective-label">Perspektiva: 200px</div>
      <div class="perspective-demo-small near">
        <div class="perspective-element-small">3D</div>
      </div>
      <div class="perspective-description">Výrazný 3D efekt, "oko" je blízko scény</div>
    </div>
    
    <div class="perspective-example">
      <div class="perspective-label">Perspektiva: 1000px</div>
      <div class="perspective-demo-small medium">
        <div class="perspective-element-small">3D</div>
      </div>
      <div class="perspective-description">Střední 3D efekt, standardní vzdálenost</div>
    </div>
    
    <div class="perspective-example">
      <div class="perspective-label">Perspektiva: 2000px</div>
      <div class="perspective-demo-small far">
        <div class="perspective-element-small">3D</div>
      </div>
      <div class="perspective-description">Jemný 3D efekt, "oko" je daleko</div>
    </div>
    
    <div class="perspective-example">
      <div class="perspective-label">Bez perspektivy</div>
      <div class="perspective-demo-small none">
        <div class="perspective-element-small">2D</div>
      </div>
      <div class="perspective-description">Žádný 3D efekt, plochý vzhled</div>
    </div>
  </div>
</div>

<h3 id="kdy-pouzivat-jake-hodnoty">Kdy používat jaké hodnoty</h3>

<table>
<thead>
<tr>
<th>Hodnota perspektivy</th>
<th>Použití</th>
<th>Efekt</th>
</tr>
</thead>
<tbody>
<tr>
<td>200-500px</td>
<td>Dramatické efekty, hero sekce</td>
<td>Výrazný 3D efekt, divák je "uvnitř" scény</td>
</tr>
<tr>
<td>500-1000px</td>
<td>Karty, tlačítka, hover efekty</td>
<td>Střední 3D efekt, přirozený vzhled</td>
</tr>
<tr>
<td>1000-2000px</td>
<td>Galerie, produkty, jemné animace</td>
<td>Jemný 3D efekt, elegantní vzhled</td>
</tr>
<tr>
<td>2000px+</td>
<td>Pozadí, jemné detaily</td>
<td>Velmi jemný 3D efekt, téměř nepostřehnutelný</td>
</tr>
</tbody>
</table>

<h4 id="proc-minimum-200px">Proč minimum 200px?</h4>

<p>Hodnota 200px jako minimum byla zvolena z několika praktických důvodů:</p>

<ul>
<li><strong>Extrémní zkreslení</strong> - Pod 200px se 3D efekt stává příliš dramatickým a nepřirozeným</li>
<li><strong>Čitelnost obsahu</strong> - Při velmi nízkých hodnotách se text a obrázky stávají nečitelnými</li>
<li><strong>Uživatelská zkušenost</strong> - Příliš výrazný 3D efekt může být rušivý a nepříjemný</li>
<li><strong>Performance</strong> - Velmi nízké hodnoty mohou způsobit problémy s vykreslováním</li>
</ul>

<p>Technicky vzato, CSS perspektiva může být i 1px, ale prakticky se hodnoty pod 200px téměř nepoužívají, protože vytvářejí příliš extrémní efekt.</p>

<div class="live">
  <style>
    .extreme-perspective {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    
    .extreme-demo {
      text-align: center;
      background: rgba(255,255,255,0.9);
      padding: 20px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }
    
    .extreme-container {
      perspective: 50px;
      width: 100px;
      height: 100px;
      margin: 10px auto;
      transform-style: preserve-3d;
    }
    
    .extreme-container.very-low {
      perspective: 100px;
    }
    
    .extreme-container.low {
      perspective: 200px;
    }
    
    .extreme-element {
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #667eea, #764ba2);
      transform: rotateY(45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      border-radius: 8px;
      font-size: 12px;
    }
    
    .extreme-label {
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
    
    .extreme-description {
      font-size: 11px;
      color: #666;
      line-height: 1.4;
    }
  </style>
  
  <div class="extreme-perspective">
    <div class="extreme-demo">
      <div class="extreme-label">Perspektiva: 50px</div>
      <div class="extreme-container">
        <div class="extreme-element">TEXT</div>
      </div>
      <div class="extreme-description">Extrémní zkreslení, nečitelný obsah</div>
    </div>
    
    <div class="extreme-demo">
      <div class="extreme-label">Perspektiva: 100px</div>
      <div class="extreme-container very-low">
        <div class="extreme-element">TEXT</div>
      </div>
      <div class="extreme-description">Velmi výrazný, ale stále problematický</div>
    </div>
    
    <div class="extreme-demo">
      <div class="extreme-label">Perspektiva: 200px</div>
      <div class="extreme-container low">
        <div class="extreme-element">TEXT</div>
      </div>
      <div class="extreme-description">Dramatický, ale použitelný efekt</div>
    </div>
  </div>
</div>

<h3 id="perspektiva-vs-transform-style">Perspektiva vs transform-style</h3>

<p>Důležité je rozlišovat mezi těmito vlastnostmi:</p>

<ul>
<li><code>perspective</code> - nastavuje vzdálenost "oka" od scény</li>
<li><code>transform-style: preserve-3d</code> - zachovává 3D prostor pro child elementy</li>
<li><code>transform-origin</code> - určuje střed transformace (bod, kolem kterého se element otáčí)</li>
</ul>

<p>Bez <code>transform-style: preserve-3d</code> se child elementy "zploští" a ztratí 3D efekt, i když je nastavena perspektiva.</p>

<div class="live">
  <style>
    .transform-demo-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin: 30px 0;
    }
    
    .transform-demo {
      background: rgba(255,255,255,0.9);
      padding: 25px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      text-align: center;
    }
    
    .demo-title {
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
      font-size: 16px;
    }
    
    .demo-container {
      perspective: 800px;
      width: 200px;
      height: 200px;
      margin: 20px auto;
      border: 2px dashed #ccc;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .demo-element {
      width: 100px;
      height: 100px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
      transform: rotateY(45deg) rotateX(30deg);
      transition: all 0.5s ease;
    }
    
    .demo-container.preserve-3d {
      transform-style: preserve-3d;
    }
    
    .demo-container.flat {
      transform-style: flat;
    }
    
    .origin-controls {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    }
    
    .origin-slider {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .slider-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
    
    .slider-label {
      font-size: 12px;
      font-weight: bold;
      color: #333;
    }
    
    .origin-range {
      width: 120px;
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(to right, #667eea, #764ba2);
      outline: none;
      -webkit-appearance: none;
      cursor: pointer;
    }
    
    .origin-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #667eea;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .origin-value {
      font-size: 11px;
      color: #667eea;
      font-weight: bold;
      min-width: 40px;
    }
    
    .origin-presets {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 10px;
    }
    
    .origin-preset {
      padding: 6px 12px;
      border: none;
      border-radius: 15px;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 11px;
    }
    
    .origin-preset:hover {
      background: rgba(102, 126, 234, 0.2);
      transform: translateY(-1px);
    }
    
    .origin-preset.active {
      background: #667eea;
      color: white;
    }
    
    .demo-description {
      font-size: 12px;
      color: #666;
      line-height: 1.4;
      margin-top: 15px;
    }
    
    .origin-indicator {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #ff6b6b;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 0 2px #ff6b6b;
      pointer-events: none;
      z-index: 10;
    }
  </style>
  
  <div class="transform-demo-container">
    <div class="transform-demo">
      <div class="demo-title">S preserve-3d</div>
      <div class="demo-container preserve-3d" id="preserve3dContainer">
        <div class="origin-indicator" id="preserve3dIndicator"></div>
        <div class="demo-element" id="preserve3dElement">3D</div>
      </div>
      
      <div class="origin-controls">
        <div class="origin-slider">
          <div class="slider-group">
            <div class="slider-label">X</div>
            <input type="range" class="origin-range" id="preserve3dX" min="0" max="100" value="50" step="5">
            <div class="origin-value" id="preserve3dXValue">50%</div>
          </div>
          <div class="slider-group">
            <div class="slider-label">Y</div>
            <input type="range" class="origin-range" id="preserve3dY" min="0" max="100" value="50" step="5">
            <div class="origin-value" id="preserve3dYValue">50%</div>
          </div>
        </div>
        
        <div class="origin-presets">
          <button class="origin-preset active" data-preset="center">Center</button>
          <button class="origin-preset" data-preset="top-left">Top Left</button>
          <button class="origin-preset" data-preset="top-right">Top Right</button>
          <button class="origin-preset" data-preset="bottom-left">Bottom Left</button>
          <button class="origin-preset" data-preset="bottom-right">Bottom Right</button>
        </div>
      </div>
      
      <div class="demo-description">
        Element si zachovává 3D efekt a otáčí se kolem nastaveného transform-origin bodu.
      </div>
    </div>
    
    <div class="transform-demo">
      <div class="demo-title">Bez preserve-3d (flat)</div>
      <div class="demo-container flat" id="flatContainer">
        <div class="origin-indicator" id="flatIndicator"></div>
        <div class="demo-element" id="flatElement">2D</div>
      </div>
      
      <div class="origin-controls">
        <div class="origin-slider">
          <div class="slider-group">
            <div class="slider-label">X</div>
            <input type="range" class="origin-range" id="flatX" min="0" max="100" value="50" step="5">
            <div class="origin-value" id="flatXValue">50%</div>
          </div>
          <div class="slider-group">
            <div class="slider-label">Y</div>
            <input type="range" class="origin-range" id="flatY" min="0" max="100" value="50" step="5">
            <div class="origin-value" id="flatYValue">50%</div>
          </div>
        </div>
        
        <div class="origin-presets">
          <button class="origin-preset active" data-preset="center">Center</button>
          <button class="origin-preset" data-preset="top-left">Top Left</button>
          <button class="origin-preset" data-preset="top-right">Top Right</button>
          <button class="origin-preset" data-preset="bottom-left">Bottom Left</button>
          <button class="origin-preset" data-preset="bottom-right">Bottom Right</button>
        </div>
      </div>
      
      <div class="demo-description">
        Element se "zploští" a ztratí 3D efekt, i když má nastavenou perspektivu.
      </div>
    </div>
  </div>
  
  <script>
    function updateTransformOrigin(containerId, elementId, indicatorId, xRangeId, yRangeId, xValueId, yValueId) {
      var container = document.getElementById(containerId);
      var element = document.getElementById(elementId);
      var indicator = document.getElementById(indicatorId);
      var xRange = document.getElementById(xRangeId);
      var yRange = document.getElementById(yRangeId);
      var xValue = document.getElementById(xValueId);
      var yValue = document.getElementById(yValueId);
      
      var x = xRange.value;
      var y = yRange.value;
      
      element.style.transformOrigin = x + '% ' + y + '%';
      
      xValue.textContent = x + '%';
      yValue.textContent = y + '%';
      
      indicator.style.left = x + '%';
      indicator.style.top = y + '%';
      indicator.style.transform = 'translate(-50%, -50%)';
    }
    
    function setupOriginControls(containerId, elementId, indicatorId, xRangeId, yRangeId, xValueId, yValueId) {
      var xRange = document.getElementById(xRangeId);
      var yRange = document.getElementById(yRangeId);
      var presets = document.querySelectorAll('[data-preset]');
      
      xRange.addEventListener('input', function() {
        updateTransformOrigin(containerId, elementId, indicatorId, xRangeId, yRangeId, xValueId, yValueId);
      });
      
      yRange.addEventListener('input', function() {
        updateTransformOrigin(containerId, elementId, indicatorId, xRangeId, yRangeId, xValueId, yValueId);
      });
      
      presets.forEach(function(preset) {
        preset.addEventListener('click', function() {
          var presetName = this.dataset.preset;
          var x, y;
          
          switch(presetName) {
            case 'center': x = 50; y = 50; break;
            case 'top-left': x = 0; y = 0; break;
            case 'top-right': x = 100; y = 0; break;
            case 'bottom-left': x = 0; y = 100; break;
            case 'bottom-right': x = 100; y = 100; break;
          }
          
          xRange.value = x;
          yRange.value = y;
          updateTransformOrigin(containerId, elementId, indicatorId, xRangeId, yRangeId, xValueId, yValueId);
          
          presets.forEach(p => p.classList.remove('active'));
          this.classList.add('active');
        });
      });
      
      updateTransformOrigin(containerId, elementId, indicatorId, xRangeId, yRangeId, xValueId, yValueId);
    }
    
    setupOriginControls('preserve3dContainer', 'preserve3dElement', 'preserve3dIndicator', 'preserve3dX', 'preserve3dY', 'preserve3dXValue', 'preserve3dYValue');
    setupOriginControls('flatContainer', 'flatElement', 'flatIndicator', 'flatX', 'flatY', 'flatXValue', 'flatYValue');
  </script>
</div>

<div class="live">
  <style>
    .perspective-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
      background: rgba(255,255,255,0.9);
      padding: 20px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }
    
    .perspective-slider {
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .slider-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
    
    .slider-label {
      font-weight: bold;
      color: #333;
      font-size: 14px;
    }
    
    .perspective-range {
      width: 200px;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, #667eea, #764ba2);
      outline: none;
      -webkit-appearance: none;
      cursor: pointer;
    }
    
    .perspective-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #667eea;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    }
    
    .perspective-range::-webkit-slider-thumb:hover {
      transform: scale(1.2);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
    
    .perspective-range::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #667eea;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    
    .perspective-value {
      font-weight: bold;
      color: #667eea;
      font-size: 16px;
      min-width: 60px;
      text-align: center;
    }
    
    .perspective-demo {
      width: 200px;
      height: 200px;
      margin: 20px auto;
      transition: perspective 0.3s ease;
    }
    
    .perspective-element {
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #667eea, #764ba2);
      transform: rotateY(45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      border-radius: 10px;
      transition: transform 0.3s ease;
    }
    
    .rotation-controls {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    
    .rotation-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 20px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 12px;
    }
    
    .rotation-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  </style>
  
  <div class="perspective-controls">
    <div class="perspective-slider">
      <div class="slider-container">
        <div class="slider-label">Perspektiva</div>
        <input type="range" class="perspective-range" id="perspectiveRange" min="200" max="2000" value="1000" step="50">
        <div class="perspective-value" id="perspectiveValue">1000px</div>
      </div>
      
      <div class="slider-container">
        <div class="slider-label">Rotace Y</div>
        <input type="range" class="perspective-range" id="rotationYRange" min="-180" max="180" value="45" step="5">
        <div class="perspective-value" id="rotationYValue">45°</div>
      </div>
      
      <div class="slider-container">
        <div class="slider-label">Rotace X</div>
        <input type="range" class="perspective-range" id="rotationXRange" min="-180" max="180" value="0" step="5">
        <div class="perspective-value" id="rotationXValue">0°</div>
      </div>
    </div>
    
    <div class="rotation-controls">
      <button class="rotation-btn" id="resetBtn">Resetovat</button>
      <button class="rotation-btn" id="frontBtn">Přední</button>
      <button class="rotation-btn" id="sideBtn">Boční</button>
      <button class="rotation-btn" id="topBtn">Vrchní</button>
    </div>
  </div>
  
  <div class="perspective-demo" id="perspectiveDemo">
    <div class="perspective-element" id="perspectiveElement">3D Element</div>
  </div>
  
  <script>
    var perspectiveRange = document.getElementById('perspectiveRange');
    var rotationYRange = document.getElementById('rotationYRange');
    var rotationXRange = document.getElementById('rotationXRange');
    var perspectiveValue = document.getElementById('perspectiveValue');
    var rotationYValue = document.getElementById('rotationYValue');
    var rotationXValue = document.getElementById('rotationXValue');
    var perspectiveDemo = document.getElementById('perspectiveDemo');
    var perspectiveElement = document.getElementById('perspectiveElement');
    var resetBtn = document.getElementById('resetBtn');
    var frontBtn = document.getElementById('frontBtn');
    var sideBtn = document.getElementById('sideBtn');
    var topBtn = document.getElementById('topBtn');
    
    function updatePerspective() {
      var perspective = perspectiveRange.value;
      var rotationY = rotationYRange.value;
      var rotationX = rotationXRange.value;
      
      perspectiveDemo.style.perspective = perspective + 'px';
      perspectiveElement.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
      
      perspectiveValue.textContent = perspective + 'px';
      rotationYValue.textContent = rotationY + '°';
      rotationXValue.textContent = rotationX + '°';
    }
    
    perspectiveRange.addEventListener('input', updatePerspective);
    rotationYRange.addEventListener('input', updatePerspective);
    rotationXRange.addEventListener('input', updatePerspective);
    
    resetBtn.addEventListener('click', function() {
      perspectiveRange.value = 1000;
      rotationYRange.value = 45;
      rotationXRange.value = 0;
      updatePerspective();
    });
    
    frontBtn.addEventListener('click', function() {
      rotationYRange.value = 0;
      rotationXRange.value = 0;
      updatePerspective();
    });
    
    sideBtn.addEventListener('click', function() {
      rotationYRange.value = 90;
      rotationXRange.value = 0;
      updatePerspective();
    });
    
    topBtn.addEventListener('click', function() {
      rotationYRange.value = 0;
      rotationXRange.value = 90;
      updatePerspective();
    });
    
    updatePerspective();
  </script>
</div>

<pre><code class="language-css">.container {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.element {
  transform: rotateY(45deg);
}</code></pre>

<h2 id="zakladni-3d-transformace">Základní 3D transformace</h2>

<h3 id="rotace-kolem-os">Rotace kolem os</h3>

<div class="live">
  <style>
    .rotation-demo {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 20px 0;
    }
    .rotation-box {
      width: 100px;
      height: 100px;
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }
    .rotate-x:hover { transform: rotateX(45deg); }
    .rotate-y:hover { transform: rotateY(45deg); }
    .rotate-z:hover { transform: rotateZ(45deg); }
  </style>
  <div class="rotation-demo">
    <div class="rotation-box rotate-x">RotateX</div>
    <div class="rotation-box rotate-y">RotateY</div>
    <div class="rotation-box rotate-z">RotateZ</div>
  </div>
  <p style="text-align: center; font-size: 0.9em; color: #666;">Najděte myší na boxy pro zobrazení rotace</p>
</div>

<pre><code class="language-css">.rotate-x {
  transform: rotateX(45deg);
}

.rotate-y {
  transform: rotateY(45deg);
}

.rotate-z {
  transform: rotateZ(45deg);
}</code></pre>

<h3 id="posun-v-3d-prostoru">Posun v 3D prostoru</h3>

<pre><code class="language-css">.translate-3d {
  transform: translate3d(100px, 50px, 200px);
}

.translate-z {
  transform: translateZ(100px);
}</code></pre>

<h3 id="meritko-v-3d">Měřítko v 3D</h3>

<pre><code class="language-css">.scale-3d {
  transform: scale3d(1.5, 1.5, 1.5);
}</code></pre>

<h2 id="prakticky-priklad-3d-karta">Praktický příklad – 3D karta</h2>

<p>Vytvoříme kartu, která se otáčí při najetí myší:</p>

<div class="live">
  <style>
    .card-container {
      perspective: 1000px;
      width: 300px;
      height: 200px;
      margin: 20px auto;
    }
    .card {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.8s;
    }
    .card:hover {
      transform: rotateY(180deg);
    }
    .card-front,
    .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
    }
    .card-front {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
    }
    .card-back {
      background: linear-gradient(45deg, #f093fb, #f5576c);
      color: white;
      transform: rotateY(180deg);
    }
  </style>
  <div class="card-container">
    <div class="card">
      <div class="card-front">
        <h2>Přední strana</h2>
        <p>Obsah přední strany karty</p>
      </div>
      <div class="card-back">
        <h2>Zadní strana</h2>
        <p>Obsah zadní strany karty</p>
      </div>
    </div>
  </div>
</div>

<pre><code class="language-html">&lt;div class="card-container"&gt;
  &lt;div class="card"&gt;
    &lt;div class="card-front"&gt;
      &lt;h2&gt;Přední strana&lt;/h2&gt;
      &lt;p&gt;Obsah přední strany karty&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="card-back"&gt;
      &lt;h2&gt;Zadní strana&lt;/h2&gt;
      &lt;p&gt;Obsah zadní strany karty&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<pre><code class="language-css">.card-container {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.card:hover {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.card-front {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.card-back {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  color: white;
  transform: rotateY(180deg);
}</code></pre>

<h2 id="3d-kostka">3D kostka</h2>

<p>Vytvoříme plně funkční 3D kostku:</p>

<div class="live">
  <style>
    .cube-container {
      perspective: 1000px;
      width: 200px;
      height: 200px;
      margin: 50px auto;
    }
    .cube {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      animation: rotate 10s infinite linear;
    }
    .face {
      position: absolute;
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid #333;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
    .front  { transform: rotateY(0deg) translateZ(100px); background: rgba(255, 107, 107, 0.8); }
    .back   { transform: rotateY(180deg) translateZ(100px); background: rgba(238, 90, 36, 0.8); }
    .right  { transform: rotateY(90deg) translateZ(100px); background: rgba(102, 126, 234, 0.8); }
    .left   { transform: rotateY(-90deg) translateZ(100px); background: rgba(240, 147, 251, 0.8); }
    .top    { transform: rotateX(90deg) translateZ(100px); background: rgba(245, 87, 108, 0.8); }
    .bottom { transform: rotateX(-90deg) translateZ(100px); background: rgba(118, 75, 162, 0.8); }
    @keyframes rotate {
      from { transform: rotateX(0deg) rotateY(0deg); }
      to { transform: rotateX(360deg) rotateY(360deg); }
    }
  </style>
  <div class="cube-container">
    <div class="cube">
      <div class="face front">Přední</div>
      <div class="face back">Zadní</div>
      <div class="face right">Pravá</div>
      <div class="face left">Levá</div>
      <div class="face top">Vrchní</div>
      <div class="face bottom">Spodní</div>
    </div>
  </div>
</div>

<pre><code class="language-html">&lt;div class="cube-container"&gt;
  &lt;div class="cube"&gt;
    &lt;div class="face front"&gt;Přední&lt;/div&gt;
    &lt;div class="face back"&gt;Zadní&lt;/div&gt;
    &lt;div class="face right"&gt;Pravá&lt;/div&gt;
    &lt;div class="face left"&gt;Levá&lt;/div&gt;
    &lt;div class="face top"&gt;Vrchní&lt;/div&gt;
    &lt;div class="face bottom"&gt;Spodní&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<pre><code class="language-css">.cube-container {
  perspective: 1000px;
  width: 200px;
  height: 200px;
  margin: 100px auto;
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: rotate 10s infinite linear;
}

.face {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}

.front  { transform: rotateY(0deg) translateZ(100px); }
.back   { transform: rotateY(180deg) translateZ(100px); }
.right  { transform: rotateY(90deg) translateZ(100px); }
.left   { transform: rotateY(-90deg) translateZ(100px); }
.top    { transform: rotateX(90deg) translateZ(100px); }
.bottom { transform: rotateX(-90deg) translateZ(100px); }

@keyframes rotate {
  from { transform: rotateX(0deg) rotateY(0deg); }
  to { transform: rotateX(360deg) rotateY(360deg); }
}</code></pre>

<h2 id="interaktivni-3d-ovladani">Interaktivní 3D ovládání</h2>

<p>Vytvoříme 3D element, který reaguje na pohyb myši a vytváří realistický tilt efekt:</p>

<div class="live">
  <style>
    .interactive-3d {
      perspective: 1000px;
      width: 300px;
      height: 300px;
      margin: 50px auto;
      cursor: none;
    }
    .tilt-container {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.1s ease-out;
      position: relative;
    }
    .tilt-element {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      font-weight: bold;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    }
    .tilt-element::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
      transform: rotate(45deg);
      transition: all 0.3s ease;
    }
    .tilt-element::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%);
      border-radius: inherit;
    }
    .cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(255,255,255,0.8);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
    }
  </style>
  <div class="cursor"></div>
  <div class="interactive-3d">
    <div class="tilt-container">
      <div class="tilt-element">Pohybuj myší</div>
    </div>
  </div>
  <p style="text-align: center; margin-top: 20px; font-size: 0.9em; color: #666;">Pohybuj myší nad elementem pro 3D tilt efekt</p>
  
  <script>
    var container = document.querySelector('.interactive-3d');
    var tiltContainer = document.querySelector('.tilt-container');
    var cursor = document.querySelector('.cursor');
    
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -20;
      const rotateY = (x - centerX) / centerX * 20;
      
      tiltContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
      
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
      cursor.style.transform = 'scale(1.5)';
    });
    
    container.addEventListener('mouseleave', () => {
      tiltContainer.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      cursor.style.transform = 'scale(1)';
    });
    
    container.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
    });
  </script>
</div>

<pre><code class="language-html">&lt;div class="interactive-3d"&gt;
  &lt;div class="tilt-container"&gt;
    &lt;div class="tilt-element"&gt;Pohybuj myší&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<pre><code class="language-css">.interactive-3d {
  perspective: 1000px;
  width: 300px;
  height: 300px;
}

.tilt-container {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}

.tilt-element {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}</code></pre>

<pre><code class="language-javascript">const container = document.querySelector('.interactive-3d');
const tiltContainer = document.querySelector('.tilt-container');

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / centerY * -20;
  const rotateY = (x - centerX) / centerX * 20;
  
  tiltContainer.style.transform = 
    `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
});
</code></pre>

<h2 id="3d-text-efekty">3D text efekty</h2>

<p>Vytvoříme různé 3D text efekty, které demonstrují pokročilé možnosti CSS transformací:</p>

<div class="live">
  <style>
    .text-3d-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .text-3d-item {
      text-align: center;
      perspective: 1000px;
    }
    
    .text-3d-title {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      font-weight: bold;
    }
    
    /* 3D Extruded Text */
    .extruded-text {
      font-size: 48px;
      font-weight: bold;
      color: #667eea;
      text-shadow: 
        0 1px 0 #ccc,
        0 2px 0 #c9c9c9,
        0 3px 0 #bbb,
        0 4px 0 #b9b9b9,
        0 5px 0 #aaa,
        0 6px 1px rgba(0,0,0,.1),
        0 0 5px rgba(0,0,0,.1),
        0 1px 3px rgba(0,0,0,.3),
        0 3px 5px rgba(0,0,0,.2),
        0 5px 10px rgba(0,0,0,.25),
        0 10px 10px rgba(0,0,0,.2),
        0 20px 20px rgba(0,0,0,.15);
      transform: rotateX(15deg);
      transition: all 0.3s ease;
    }
    .extruded-text:hover {
      transform: rotateX(25deg) scale(1.1);
      color: #764ba2;
    }
    
    /* 3D Floating Text */
    .floating-text {
      font-size: 42px;
      font-weight: bold;
      background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 
        0 0 20px rgba(102, 126, 234, 0.5),
        0 0 40px rgba(102, 126, 234, 0.3),
        0 0 60px rgba(102, 126, 234, 0.1);
      animation: float 3s ease-in-out infinite;
      transform-style: preserve-3d;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotateY(0deg); }
      50% { transform: translateY(-20px) rotateY(10deg); }
    }
    
    /* 3D Layered Text */
    .layered-text {
      font-size: 44px;
      font-weight: bold;
      position: relative;
      color: #f093fb;
    }
    .layered-text::before,
    .layered-text::after {
      content: '3D TEXT';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .layered-text::before {
      color: #667eea;
      transform: translateZ(-10px);
      filter: blur(2px);
    }
    .layered-text::after {
      color: #764ba2;
      transform: translateZ(-20px);
      filter: blur(4px);
    }
    
    /* 3D Neon Text */
    .neon-text {
      font-size: 46px;
      font-weight: bold;
      color: #fff;
      text-shadow: 
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #667eea,
        0 0 20px #667eea,
        0 0 25px #667eea,
        0 0 30px #667eea,
        0 0 35px #667eea;
      animation: neon-pulse 2s ease-in-out infinite alternate;
      transform: rotateY(-5deg);
    }
    @keyframes neon-pulse {
      from { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #667eea, 0 0 20px #667eea; }
      to { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #667eea, 0 0 20px #667eea, 0 0 25px #667eea, 0 0 30px #667eea, 0 0 35px #667eea; }
    }
    
    /* 3D Matrix Text */
    .matrix-text {
      font-size: 40px;
      font-weight: bold;
      color: #00ff00;
      text-shadow: 
        0 0 10px #00ff00,
        0 0 20px #00ff00,
        0 0 30px #00ff00;
      animation: matrix-rain 2s linear infinite;
      transform: rotateX(10deg) rotateY(-5deg);
      font-family: 'Courier New', monospace;
    }
    @keyframes matrix-rain {
      0% { transform: rotateX(10deg) rotateY(-5deg) translateY(0px); }
      50% { transform: rotateX(10deg) rotateY(-5deg) translateY(-10px); }
      100% { transform: rotateX(10deg) rotateY(-5deg) translateY(0px); }
    }
    
    /* 3D Holographic Text */
    .holographic-text {
      font-size: 38px;
      font-weight: bold;
      background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: holographic 3s ease infinite;
      transform: rotateY(15deg);
      text-shadow: 0 0 20px rgba(255,255,255,0.5);
    }
    @keyframes holographic {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    /* 3D Glitch Text */
    .glitch-text {
      font-size: 42px;
      font-weight: bold;
      color: #fff;
      position: relative;
      text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00;
      animation: glitch 725ms infinite;
      transform: rotateX(-10deg);
    }
    .glitch-text::before,
    .glitch-text::after {
      content: 'GLITCH';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .glitch-text::before {
      animation: glitch 500ms infinite;
      color: #00fffc;
      z-index: -1;
    }
    .glitch-text::after {
      animation: glitch 375ms infinite;
      color: #fc00ff;
      z-index: -2;
    }
    @keyframes glitch {
      0% { text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00; }
      15% { text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00; }
      16% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00; }
      49% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00; }
      50% { text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00; }
      99% { text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00; }
      100% { text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff, -0.04em -0.025em 0 #fffc00; }
    }
  </style>
  
  <div class="text-3d-container">
    <div class="text-3d-item">
      <div class="text-3d-title">Extruded Text</div>
      <div class="extruded-text">3D TEXT</div>
    </div>
    
    <div class="text-3d-item">
      <div class="text-3d-title">Floating Text</div>
      <div class="floating-text">3D TEXT</div>
    </div>
    
    <div class="text-3d-item">
      <div class="text-3d-title">Layered Text</div>
      <div class="layered-text">3D TEXT</div>
    </div>
    
    <div class="text-3d-item">
      <div class="text-3d-title">Neon Text</div>
      <div class="neon-text">3D TEXT</div>
    </div>
    
    <div class="text-3d-item">
      <div class="text-3d-title">Matrix Text</div>
      <div class="matrix-text">3D TEXT</div>
    </div>
    
    <div class="text-3d-item">
      <div class="text-3d-title">Holographic Text</div>
      <div class="holographic-text">3D TEXT</div>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 40px;">
    <div class="text-3d-title">Glitch Text</div>
    <div class="glitch-text">GLITCH</div>
  </div>
</div>

<pre><code class="language-css">/* Extruded Text */
.extruded-text {
  font-size: 48px;
  font-weight: bold;
  color: #667eea;
  text-shadow: 
    0 1px 0 #ccc,
    0 2px 0 #c9c9c9,
    0 3px 0 #bbb,
    0 4px 0 #b9b9b9,
    0 5px 0 #aaa,
    0 6px 1px rgba(0,0,0,.1),
    0 0 5px rgba(0,0,0,.1),
    0 1px 3px rgba(0,0,0,.3),
    0 3px 5px rgba(0,0,0,.2),
    0 5px 10px rgba(0,0,0,.25),
    0 10px 10px rgba(0,0,0,.2),
    0 20px 20px rgba(0,0,0,.15);
  transform: rotateX(15deg);
}

/* Floating Text */
.floating-text {
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: float 3s ease-in-out infinite;
}

/* Neon Text */
.neon-text {
  color: #fff;
  text-shadow: 
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 15px #667eea,
    0 0 20px #667eea,
    0 0 25px #667eea;
  animation: neon-pulse 2s ease-in-out infinite alternate;
}</code></pre>

<h2 id="3d-mobile-interface">3D Mobile Interface</h2>

<p>Vytvoříme realistický 3D mobilní interface s animovanými aplikacemi a swipe efekty:</p>

<div class="live">
  <style>
    .mobile-3d-container {
      perspective: 2000px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 500px;
      padding: 40px;
    }
    
    .mobile-device {
      width: 280px;
      height: 560px;
      background: linear-gradient(145deg, #2c2c2c, #1a1a1a);
      border-radius: 40px;
      padding: 8px;
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.4),
        inset 0 2px 4px rgba(255,255,255,0.1);
      transform-style: preserve-3d;
      transform: rotateY(-15deg) rotateX(10deg);
      transition: transform 0.6s ease;
      position: relative;
    }
    
    .mobile-device:hover {
      transform: rotateY(-5deg) rotateX(5deg);
    }
    
    .mobile-screen {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 32px;
      overflow: hidden;
      position: relative;
      transform-style: preserve-3d;
    }
    
    .status-bar {
      height: 30px;
      background: rgba(0,0,0,0.3);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
    
    .app-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      padding: 20px;
      height: calc(100% - 30px);
    }
    
    .app-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      transform-style: preserve-3d;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .app-icon:hover {
      transform: translateZ(20px) scale(1.1);
    }
    
    .app-icon:nth-child(1) { background: linear-gradient(45deg, #ff6b6b, #ee5a24); }
    .app-icon:nth-child(2) { background: linear-gradient(45deg, #4facfe, #00f2fe); }
    .app-icon:nth-child(3) { background: linear-gradient(45deg, #43e97b, #38f9d7); }
    .app-icon:nth-child(4) { background: linear-gradient(45deg, #fa709a, #fee140); }
    .app-icon:nth-child(5) { background: linear-gradient(45deg, #a8edea, #fed6e3); }
    .app-icon:nth-child(6) { background: linear-gradient(45deg, #ffecd2, #fcb69f); }
    .app-icon:nth-child(7) { background: linear-gradient(45deg, #ff9a9e, #fecfef); }
    .app-icon:nth-child(8) { background: linear-gradient(45deg, #a18cd1, #fbc2eb); }
    
    .dock {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 10px;
      transform-style: preserve-3d;
    }
    
    .dock-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .dock-icon:hover {
      transform: translateZ(15px) scale(1.2);
    }
    
    .dock-icon:nth-child(1) { background: linear-gradient(45deg, #667eea, #764ba2); }
    .dock-icon:nth-child(2) { background: linear-gradient(45deg, #f093fb, #f5576c); }
    .dock-icon:nth-child(3) { background: linear-gradient(45deg, #4facfe, #00f2fe); }
    .dock-icon:nth-child(4) { background: linear-gradient(45deg, #43e97b, #38f9d7); }
    
    .notification {
      position: absolute;
      top: 50px;
      right: 20px;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 15px;
      transform: translateX(300px);
      animation: slideIn 0.5s ease forwards;
      animation-delay: 1s;
    }
    
    @keyframes slideIn {
      to { transform: translateX(0); }
    }
    
    .notification-title {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    
    .notification-text {
      font-size: 12px;
      color: #666;
    }
    
    .swipe-indicator {
      position: absolute;
      top: 50%;
      left: 20px;
      color: white;
      font-size: 14px;
      opacity: 0.7;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    
    .home-indicator {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 4px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
    }
  </style>
  
  <div class="mobile-3d-container">
    <div class="mobile-device">
      <div class="mobile-screen">
        <div class="status-bar">
          <span>9:41</span>
          <span>📶 📶 📶 📶</span>
        </div>
        
        <div class="app-grid">
          <div class="app-icon">📱</div>
          <div class="app-icon">📧</div>
          <div class="app-icon">🌐</div>
          <div class="app-icon">📷</div>
          <div class="app-icon">🎵</div>
          <div class="app-icon">📺</div>
          <div class="app-icon">🎮</div>
          <div class="app-icon">⚙️</div>
        </div>
        
        <div class="dock">
          <div class="dock-icon">📞</div>
          <div class="dock-icon">💬</div>
          <div class="dock-icon">🌍</div>
          <div class="dock-icon">📱</div>
        </div>
        
        <div class="notification">
          <div class="notification-title">Nová zpráva</div>
          <div class="notification-text">Máte novou zprávu od přítele</div>
        </div>
        
        <div class="swipe-indicator">← Swipe</div>
        <div class="home-indicator"></div>
      </div>
    </div>
  </div>
</div>

<pre><code class="language-html">&lt;div class="mobile-3d-container"&gt;
  &lt;div class="mobile-device"&gt;
    &lt;div class="mobile-screen"&gt;
      &lt;div class="status-bar"&gt;
        &lt;span&gt;9:41&lt;/span&gt;
        &lt;span&gt;📶 📶 📶 📶&lt;/span&gt;
      &lt;/div&gt;
      
      &lt;div class="app-grid"&gt;
        &lt;div class="app-icon"&gt;📱&lt;/div&gt;
        &lt;div class="app-icon"&gt;📧&lt;/div&gt;
        &lt;!-- Další aplikace... --&gt;
      &lt;/div&gt;
      
      &lt;div class="dock"&gt;
        &lt;div class="dock-icon"&gt;📞&lt;/div&gt;
        &lt;div class="dock-icon"&gt;💬&lt;/div&gt;
        &lt;!-- Další dock ikony... --&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<pre><code class="language-css">.mobile-device {
  width: 280px;
  height: 560px;
  background: linear-gradient(145deg, #2c2c2c, #1a1a1a);
  border-radius: 40px;
  transform-style: preserve-3d;
  transform: rotateY(-15deg) rotateX(10deg);
  transition: transform 0.6s ease;
}

.app-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.app-icon:hover {
  transform: translateZ(20px) scale(1.1);
}

.dock {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  transform-style: preserve-3d;
}</code></pre>

<h2 id="3d-particle-system">3D Particle System</h2>

<p>Vytvoříme interaktivní 3D systém částic, který reaguje na pohyb myši a vytváří působivé vizuální efekty:</p>

<div class="live">
  <style>
    .particle-container {
      perspective: 1000px;
      width: 100%;
      height: 400px;
      background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: none;
    }
    
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, #fff, #667eea);
      border-radius: 50%;
      transform-style: preserve-3d;
      animation: float 6s ease-in-out infinite;
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.8);
    }
    
    .particle:nth-child(1) { animation-delay: 0s; left: 10%; top: 20%; }
    .particle:nth-child(2) { animation-delay: 0.5s; left: 20%; top: 60%; }
    .particle:nth-child(3) { animation-delay: 1s; left: 30%; top: 40%; }
    .particle:nth-child(4) { animation-delay: 1.5s; left: 40%; top: 80%; }
    .particle:nth-child(5) { animation-delay: 2s; left: 50%; top: 30%; }
    .particle:nth-child(6) { animation-delay: 2.5s; left: 60%; top: 70%; }
    .particle:nth-child(7) { animation-delay: 3s; left: 70%; top: 50%; }
    .particle:nth-child(8) { animation-delay: 3.5s; left: 80%; top: 20%; }
    .particle:nth-child(9) { animation-delay: 4s; left: 90%; top: 60%; }
    .particle:nth-child(10) { animation-delay: 4.5s; left: 15%; top: 80%; }
    .particle:nth-child(11) { animation-delay: 5s; left: 25%; top: 10%; }
    .particle:nth-child(12) { animation-delay: 5.5s; left: 35%; top: 90%; }
    .particle:nth-child(13) { animation-delay: 6s; left: 45%; top: 15%; }
    .particle:nth-child(14) { animation-delay: 6.5s; left: 55%; top: 85%; }
    .particle:nth-child(15) { animation-delay: 7s; left: 65%; top: 25%; }
    .particle:nth-child(16) { animation-delay: 7.5s; left: 75%; top: 75%; }
    .particle:nth-child(17) { animation-delay: 8s; left: 85%; top: 35%; }
    .particle:nth-child(18) { animation-delay: 8.5s; left: 95%; top: 85%; }
    .particle:nth-child(19) { animation-delay: 9s; left: 5%; top: 45%; }
    .particle:nth-child(20) { animation-delay: 9.5s; left: 95%; top: 5%; }
    
    @keyframes float {
      0%, 100% { 
        transform: translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1);
        opacity: 0.7;
      }
      25% { 
        transform: translateZ(100px) rotateX(90deg) rotateY(45deg) scale(1.2);
        opacity: 1;
      }
      50% { 
        transform: translateZ(200px) rotateX(180deg) rotateY(90deg) scale(0.8);
        opacity: 0.5;
      }
      75% { 
        transform: translateZ(150px) rotateX(270deg) rotateY(135deg) scale(1.1);
        opacity: 0.9;
      }
    }
    
    .particle:hover {
      animation-play-state: paused;
      transform: scale(3) translateZ(50px);
      box-shadow: 0 0 30px rgba(255, 255, 255, 1);
    }
    
    .particle-trail {
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(102, 126, 234, 0.6);
      border-radius: 50%;
      pointer-events: none;
      animation: trail 2s linear infinite;
    }
    
    @keyframes trail {
      0% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(0); }
    }
    
    .particle-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: screen;
      transition: transform 0.1s ease;
    }
    
    .particle-info {
      position: absolute;
      top: 20px;
      left: 20px;
      color: white;
      font-size: 14px;
      background: rgba(0,0,0,0.5);
      padding: 10px;
      border-radius: 8px;
      backdrop-filter: blur(10px);
    }
    
    .particle-count {
      font-weight: bold;
      color: #667eea;
    }
    
    .particle-instructions {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-size: 12px;
      opacity: 0.7;
      text-align: center;
    }
  </style>
  
  <div class="particle-cursor"></div>
  <div class="particle-info">
    <div>3D Particle System</div>
    <div>Částic: <span class="particle-count">20</span></div>
    <div>Pohybuj myší pro interakci</div>
  </div>
  
  <div class="particle-container">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    
    <div class="particle-instructions">
      Najděte myší na částice pro interakci • Pohybuj myší pro sledování kurzoru
    </div>
  </div>
  
  <script>
    var container = document.querySelector('.particle-container');
    var cursor = document.querySelector('.particle-cursor');
    var particles = document.querySelectorAll('.particle');
    
    container.addEventListener('mousemove', function(e) {
      var rect = container.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
      cursor.style.transform = 'scale(1.5)';
      
      particles.forEach(function(particle, index) {
        var particleRect = particle.getBoundingClientRect();
        var particleX = particleRect.left + particleRect.width / 2 - rect.left;
        var particleY = particleRect.top + particleRect.height / 2 - rect.top;
        
        var distance = Math.sqrt(Math.pow(x - particleX, 2) + Math.pow(y - particleY, 2));
        
        if (distance < 100) {
          var angle = Math.atan2(y - particleY, x - particleX);
          var force = (100 - distance) / 100;
          
          particle.style.transform = `translateX(${Math.cos(angle) * force * 20}px) translateY(${Math.sin(angle) * force * 20}px) translateZ(${force * 50}px) scale(${1 + force * 0.5})`;
          particle.style.boxShadow = `0 0 ${20 + force * 30}px rgba(102, 126, 234, ${0.8 + force * 0.2})`;
        }
      });
    });
    
    container.addEventListener('mouseleave', function() {
      cursor.style.transform = 'scale(1)';
      particles.forEach(function(particle) {
        particle.style.transform = '';
        particle.style.boxShadow = '';
      });
    });
    
    container.addEventListener('click', function(e) {
      var rect = container.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      
      var trail = document.createElement('div');
      trail.className = 'particle-trail';
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      container.appendChild(trail);
      
      setTimeout(function() {
        trail.remove();
      }, 2000);
    });
  </script>
</div>

<pre><code class="language-html">&lt;div class="particle-container"&gt;
  &lt;div class="particle"&gt;&lt;/div&gt;
  &lt;div class="particle"&gt;&lt;/div&gt;
  &lt;!-- Další částice... --&gt;
&lt;/div&gt;</code></pre>

<pre><code class="language-css">.particle-container {
  perspective: 1000px;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #fff, #667eea);
  border-radius: 50%;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.8);
}

@keyframes float {
  0%, 100% { 
    transform: translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1);
    opacity: 0.7;
  }
  25% { 
    transform: translateZ(100px) rotateX(90deg) rotateY(45deg) scale(1.2);
    opacity: 1;
  }
  50% { 
    transform: translateZ(200px) rotateX(180deg) rotateY(90deg) scale(0.8);
    opacity: 0.5;
  }
  75% { 
    transform: translateZ(150px) rotateX(270deg) rotateY(135deg) scale(1.1);
    opacity: 0.9;
  }
}</code></pre>

<pre><code class="language-javascript">container.addEventListener('mousemove', function(e) {
  var rect = container.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  
  particles.forEach(function(particle, index) {
    var particleRect = particle.getBoundingClientRect();
    var particleX = particleRect.left + particleRect.width / 2 - rect.left;
    var particleY = particleRect.top + particleRect.height / 2 - rect.top;
    
    var distance = Math.sqrt(Math.pow(x - particleX, 2) + Math.pow(y - particleY, 2));
    
    if (distance < 100) {
      var angle = Math.atan2(y - particleY, x - particleX);
      var force = (100 - distance) / 100;
      
      particle.style.transform = `translateX(${Math.cos(angle) * force * 20}px) translateY(${Math.sin(angle) * force * 20}px) translateZ(${force * 50}px) scale(${1 + force * 0.5})`;
    }
  });
});</code></pre>

<h2 id="3d-hry-alternativy">3D transformace vs. herní engine</h2>

<p>Zatímco CSS 3D transformace poskytují skvělé možnosti pro vizuální efekty, pro skutečné hry existují lepší alternativy. Podíváme se na výhody a nevýhody různých přístupů:</p>

<h3 id="css-3d-transformace">CSS 3D transformace pro hry</h3>

<div class="live">
  <style>
    .comparison-container {
      perspective: 1000px;
      padding: 40px;
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      border-radius: 20px;
      margin: 20px auto;
      max-width: 800px;
    }
    
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 30px;
    }
    
    .comparison-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 25px;
      transform-style: preserve-3d;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      cursor: pointer;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .comparison-card:hover {
      transform: translateZ(30px) rotateY(5deg);
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .card-title {
      font-size: 24px;
      font-weight: bold;
      color: white;
      margin-bottom: 15px;
      text-align: center;
    }
    
    .pros-cons {
      margin: 20px 0;
    }
    
    .pros, .cons {
      margin: 15px 0;
    }
    
    .pros h4 {
      color: #2ecc71;
      margin-bottom: 10px;
    }
    
    .cons h4 {
      color: #e74c3c;
      margin-bottom: 10px;
    }
    
    .pros ul, .cons ul {
      color: #ecf0f1;
      line-height: 1.6;
      padding-left: 20px;
    }
    
    .pros li, .cons li {
      margin: 5px 0;
    }
    
    .tech-demo {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      padding: 20px;
      margin-top: 20px;
      text-align: center;
    }
    
    .demo-element {
      display: inline-block;
      width: 60px;
      height: 60px;
      background: linear-gradient(45deg, #3498db, #2980b9);
      border-radius: 10px;
      margin: 10px;
      transform-style: preserve-3d;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .demo-element:hover {
      transform: rotateY(45deg) rotateX(45deg) translateZ(20px);
      box-shadow: 0 10px 20px rgba(52, 152, 219, 0.4);
    }
    
    .demo-element.animated {
      animation: demo-float 2s ease-in-out infinite;
    }
    
    @keyframes demo-float {
      0%, 100% { transform: translateY(0px) rotateY(0deg); }
      50% { transform: translateY(-10px) rotateY(180deg); }
    }
    
    .performance-meter {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      padding: 15px;
      margin-top: 15px;
    }
    
    .meter-bar {
      height: 20px;
      background: linear-gradient(90deg, #e74c3c, #f39c12, #2ecc71);
      border-radius: 10px;
      position: relative;
      overflow: hidden;
    }
    
    .meter-fill {
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      transition: width 0.5s ease;
    }
    
    .meter-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      font-size: 12px;
      color: #bdc3c7;
    }
  </style>
  
  <div class="comparison-container">
    <div class="comparison-grid">
      <div class="comparison-card">
        <div class="card-title">CSS 3D Transformace</div>
        
        <div class="pros-cons">
          <div class="pros">
            <h4>✅ Výhody</h4>
            <ul>
              <li>Jednoduchá implementace</li>
              <li>Hardware akcelerace</li>
              <li>Responsivní design</li>
              <li>Žádné externí knihovny</li>
              <li>Rychlé načítání</li>
              <li>SEO friendly</li>
            </ul>
          </div>
          
          <div class="cons">
            <h4>❌ Nevýhody</h4>
            <ul>
              <li>Omezená fyzika</li>
              <li>Žádná kolizní detekce</li>
              <li>Omezené 3D modely</li>
              <li>Žádný zvuk</li>
              <li>Omezené ovládání</li>
              <li>Žádné shadery</li>
            </ul>
          </div>
        </div>
        
        <div class="tech-demo">
          <div class="demo-element animated" onclick="toggleAnimation(this)"></div>
          <div class="demo-element" onclick="toggleAnimation(this)"></div>
          <div class="demo-element" onclick="toggleAnimation(this)"></div>
          <p style="color: #ecf0f1; margin-top: 10px; font-size: 14px;">
            Klikněte na kostky pro animaci
          </p>
        </div>
        
        <div class="performance-meter">
          <div class="meter-bar">
            <div class="meter-fill" style="width: 85%;"></div>
          </div>
          <div class="meter-labels">
            <span>Výkonnost: 85%</span>
            <span>Hardware akcelerace</span>
          </div>
        </div>
      </div>
      
      <div class="comparison-card">
        <div class="card-title">Herní Engines</div>
        
        <div class="pros-cons">
          <div class="pros">
            <h4>✅ Výhody</h4>
            <ul>
              <li>Pokročilá fyzika</li>
              <li>3D modely a textury</li>
              <li>Zvukové systémy</li>
              <li>Kolizní detekce</li>
              <li>Shadery a efekty</li>
              <li>Multiplayer podpora</li>
            </ul>
          </div>
          
          <div class="cons">
            <h4>❌ Nevýhody</h4>
            <ul>
              <li>Složitá implementace</li>
              <li>Větší velikost</li>
              <li>Pomalejší načítání</li>
              <li>Vysoké nároky</li>
              <li>Licenční poplatky</li>
              <li>Křivka učení</li>
            </ul>
          </div>
        </div>
        
        <div class="tech-demo">
          <div style="color: #ecf0f1; font-size: 14px; line-height: 1.6;">
            <strong>Populární engines:</strong><br>
            • Unity (C#)<br>
            • Unreal Engine (C++)<br>
            • Godot (GDScript)<br>
            • Three.js (JavaScript)<br>
            • Babylon.js (TypeScript)
          </div>
        </div>
        
        <div class="performance-meter">
          <div class="meter-bar">
            <div class="meter-fill" style="width: 95%;"></div>
          </div>
          <div class="meter-labels">
            <span>Funkcionalita: 95%</span>
            <span>Profesionální nástroje</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    function toggleAnimation(element) {
      element.classList.toggle('animated');
    }
  </script>
</div>

<h3 id="kdy-pouzit-css">Kdy použít CSS 3D transformace</h3>

<p>CSS 3D transformace jsou ideální pro:</p>

<ul>
<li><strong>Webové hry</strong> - Jednoduché browser hry bez složité fyziky</li>
<li><strong>Interaktivní prezentace</strong> - Demonstrace konceptů a nápadů</li>
<li><strong>UI/UX efekty</strong> - Hover animace a přechody</li>
<li><strong>Prototypování</strong> - Rychlé testování nápadů</li>
<li><strong>Edukační obsah</strong> - Vizuální vysvětlení 3D konceptů</li>
<li><strong>Mobilní aplikace</strong> - Lehké animace pro lepší UX</li>
</ul>

<h3 id="kdy-pouzit-engine">Kdy použít herní engine</h3>

<p>Herní engine je lepší volba pro:</p>

<ul>
<li><strong>Komplexní hry</strong> - Hry s pokročilou mechanikou</li>
<li><strong>3D svět</strong> - Otevřené světy a prostředí</li>
<li><strong>Multiplayer</strong> - Hry pro více hráčů</li>
<li><strong>Fyzika</strong> - Realistické simulace</li>
<li><strong>Zvuk</strong> - Hry vyžadující audio</li>
<li><strong>Komerční produkty</strong> - Profesionální hry</li>
</ul>

<h3 id="alternativy">Alternativy pro webové hry</h3>

<table>
<thead>
<tr>
<th>Technologie</th>
<th>Výhody</th>
<th>Nevýhody</th>
<th>Vhodnost</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CSS 3D</strong></td>
<td>Jednoduché, rychlé, lehké</td>
<td>Omezené možnosti</td>
<td>Jednoduché hry</td>
</tr>
<tr>
<td><strong>Canvas 2D</strong></td>
<td>Plná kontrola, dobrý výkon</td>
<td>Žádné 3D, manuální kreslení</td>
<td>2D hry</td>
</tr>
<tr>
<td><strong>WebGL</strong></td>
<td>Hardware akcelerace, 3D</td>
<td>Složitá implementace</td>
<td>Pokročilé 3D</td>
</tr>
<tr>
<td><strong>Three.js</strong></td>
<td>Snadné 3D, velká komunita</td>
<td>Větší velikost</td>
<td>3D webové hry</td>
</tr>
<tr>
<td><strong>Babylon.js</strong></td>
<td>Profesionální 3D</td>
<td>Křivka učení</td>
<td>Komplexní 3D</td>
</tr>
<tr>
<td><strong>Phaser</strong></td>
<td>Specializovaný na hry</td>
<td>Pouze 2D</td>
<td>2D hry</td>
</tr>
</tbody>
</table>

<h3 id="prakticke-priklady">Praktické příklady využití</h3>

<div class="live">
  <style>
    .examples-container {
      perspective: 1200px;
      padding: 40px;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      border-radius: 20px;
      margin: 20px auto;
      max-width: 900px;
    }
    
    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;
      margin-top: 30px;
    }
    
    .example-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 25px;
      transform-style: preserve-3d;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      cursor: pointer;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .example-card:hover {
      transform: translateZ(25px) rotateY(8deg);
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    }
    
    .example-icon {
      font-size: 40px;
      text-align: center;
      margin-bottom: 15px;
    }
    
    .example-title {
      font-size: 20px;
      font-weight: bold;
      color: white;
      text-align: center;
      margin-bottom: 15px;
    }
    
    .example-desc {
      color: #ecf0f1;
      line-height: 1.6;
      margin-bottom: 15px;
      font-size: 14px;
    }
    
    .tech-tag {
      display: inline-block;
      padding: 4px 8px;
      background: rgba(52, 152, 219, 0.3);
      color: white;
      border-radius: 12px;
      font-size: 12px;
      margin: 2px;
    }
    
    .tech-tag.css { background: rgba(52, 152, 219, 0.3); }
    .tech-tag.webgl { background: rgba(155, 89, 182, 0.3); }
    .tech-tag.three { background: rgba(46, 204, 113, 0.3); }
    .tech-tag.unity { background: rgba(231, 76, 60, 0.3); }
  </style>
  
  <div class="examples-container">
    <div class="examples-grid">
      <div class="example-card">
        <div class="example-icon">🎮</div>
        <div class="example-title">Jednoduché hry</div>
        <div class="example-desc">
          Hry jako Tic-tac-toe, Memory, jednoduché puzzle hry. 
          Ideální pro CSS 3D transformace.
        </div>
        <div style="text-align: center;">
          <span class="tech-tag css">CSS 3D</span>
          <span class="tech-tag">JavaScript</span>
        </div>
      </div>
      
      <div class="example-card">
        <div class="example-icon">🌐</div>
        <div class="example-title">Webové aplikace</div>
        <div class="example-desc">
          Interaktivní prezentace, produktové galerie, 
          vzdělávací obsah s 3D efekty.
        </div>
        <div style="text-align: center;">
          <span class="tech-tag css">CSS 3D</span>
          <span class="tech-tag">HTML5</span>
        </div>
      </div>
      
      <div class="example-card">
        <div class="example-icon">🏗️</div>
        <div class="example-title">3D vizualizace</div>
        <div class="example-desc">
          Architektonické modely, produktové preview, 
          vědecké vizualizace.
        </div>
        <div style="text-align: center;">
          <span class="tech-tag three">Three.js</span>
          <span class="tech-tag webgl">WebGL</span>
        </div>
      </div>
      
      <div class="example-card">
        <div class="example-icon">🎯</div>
        <div class="example-title">Komplexní hry</div>
        <div class="example-desc">
          šířkové hry, RPG, simulace s pokročilou fyzikou 
          a 3D modely.
        </div>
        <div style="text-align: center;">
          <span class="tech-tag unity">Unity</span>
          <span class="tech-tag">Unreal</span>
        </div>
      </div>
    </div>
  </div>
</div>

<h3 id="zavěr">Závěr</h3>

<p>CSS 3D transformace jsou skvělým nástrojem pro vytváření vizuálně atraktivních webových prvků a jednoduchých interaktivních her. Jsou ideální pro:</p>

<ul>
<li><strong>Rychlé prototypování</strong> - Testování nápadů bez složitého setupu</li>
<li><strong>Webové prezentace</strong> - Demonstrace konceptů a produktů</li>
<li><strong>Jednoduché hry</strong> - Browser hry s omezenou funkcionalitou</li>
<li><strong>UI/UX design</strong> - Moderní animace a přechody</li>
</ul>

<p>Pro složitější hry a aplikace je však lepší zvážit specializované herní enginy nebo 3D knihovny jako Three.js nebo Babylon.js. Ty poskytují mnohem více možností pro vytváření profesionálních herních zážitků.</p>

<h2 id="3d-galerie">3D galerie s hover efekty</h2>

<p>Vytvoříme pokročilou 3D galerii, která kombinuje různé transformace a vytváří působivé vizuální efekty:</p>

<div class="live">
  <style>
    .gallery-3d {
      perspective: 1200px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .gallery-item {
      position: relative;
      width: 200px;
      height: 200px;
      transform-style: preserve-3d;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      cursor: pointer;
    }
    .gallery-item:hover {
      transform: rotateY(15deg) rotateX(10deg) translateZ(50px) scale(1.1);
    }
    .gallery-item:nth-child(1):hover {
      transform: rotateY(-20deg) rotateX(15deg) translateZ(60px) scale(1.15);
    }
    .gallery-item:nth-child(2):hover {
      transform: rotateY(25deg) rotateX(-10deg) translateZ(70px) scale(1.2);
    }
    .gallery-item:nth-child(3):hover {
      transform: rotateY(-15deg) rotateX(20deg) translateZ(80px) scale(1.1);
    }
    .gallery-item:nth-child(4):hover {
      transform: rotateY(30deg) rotateX(-15deg) translateZ(65px) scale(1.18);
    }
    .gallery-item:nth-child(5):hover {
      transform: rotateY(-25deg) rotateX(25deg) translateZ(75px) scale(1.12);
    }
    .gallery-item:nth-child(6):hover {
      transform: rotateY(20deg) rotateX(-20deg) translateZ(85px) scale(1.16);
    }
    .gallery-content {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      color: white;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      backface-visibility: hidden;
    }
    .gallery-item:nth-child(1) .gallery-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .gallery-item:nth-child(2) .gallery-content {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    .gallery-item:nth-child(3) .gallery-content {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    .gallery-item:nth-child(4) .gallery-content {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }
    .gallery-item:nth-child(5) .gallery-content {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    }
    .gallery-item:nth-child(6) .gallery-content {
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      color: #333;
    }
    .gallery-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: inherit;
      border-radius: inherit;
      transform: translateZ(-20px);
      filter: blur(10px);
      opacity: 0.3;
      transition: all 0.6s ease;
    }
    .gallery-item:hover::before {
      transform: translateZ(-40px);
      filter: blur(20px);
      opacity: 0.6;
    }
  </style>
  <div class="gallery-3d">
    <div class="gallery-item">
      <div class="gallery-content">3D Efekt 1</div>
    </div>
    <div class="gallery-item">
      <div class="gallery-content">3D Efekt 2</div>
    </div>
    <div class="gallery-item">
      <div class="gallery-content">3D Efekt 3</div>
    </div>
    <div class="gallery-item">
      <div class="gallery-content">3D Efekt 4</div>
    </div>
    <div class="gallery-item">
      <div class="gallery-content">3D Efekt 5</div>
    </div>
    <div class="gallery-item">
      <div class="gallery-content">3D Efekt 6</div>
    </div>
  </div>
  <p style="text-align: center; margin-top: 20px; font-size: 0.9em; color: #666;">Najděte myší na kartičky pro 3D efekt</p>
</div>

<pre><code class="language-html">&lt;div class="gallery-3d"&gt;
  &lt;div class="gallery-item"&gt;
    &lt;div class="gallery-content"&gt;3D Efekt 1&lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Další položky... --&gt;
&lt;/div&gt;</code></pre>

<pre><code class="language-css">.gallery-3d {
  perspective: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.gallery-item {
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.gallery-item:hover {
  transform: rotateY(15deg) rotateX(10deg) translateZ(50px) scale(1.1);
}

.gallery-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  border-radius: inherit;
  transform: translateZ(-20px);
  filter: blur(10px);
  opacity: 0.3;
}</code></pre>

<h2 id="optimalizace-vykonu">Optimalizace výkonu</h2>

<p>Pro lepší výkon při 3D transformacích:</p>

<pre><code class="language-css">.element {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}</code></pre>

<h2 id="browser-support">Browser support</h2>

<p>3D transformace jsou podporovány ve všech moderních prohlížečích:</p>

<ul>
<li>Chrome 12+</li>
<li>Firefox 10+</li>
<li>Safari 4+</li>
<li>IE 10+</li>
</ul>

<h2 id="uzitecne-odkazy">Užitečné odkazy</h2>

<ul>
<li><a href="http://davidwalsh.name/3d-transforms">David Walsh – 3D Transforms</a></li>
<li><a href="http://aerotwist.com/tutorials/protip-nobody-expects-3d/">Aerotwist – Nobody expects 3D</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms">MDN – CSS 3D Transforms</a></li>
<li><a href="https://threlte.xyz">Threlte</a> – Svelte nadstavba nad Three.js</li>
</ul>