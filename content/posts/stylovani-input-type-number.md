---
title: "Stylování číselného <input>u"
headline: "Stylování <code>&lt;input type=number></code>"
description: "Jak stylovat <code>&lt;input></code> pro zadávání čísel."
date: "2020-01-13"
last_modification: "2020-01-13"
status: 0
tags: [css, stylovani, formulare]
format: "html"
---

<p>Číselné inputy (<code>&lt;input type="number"&gt;</code>) mají v prohlížečích vestavěné šipky pro zvyšování a snižování hodnoty. Tyto šipky se často nehodí do designu a je potřeba je odstranit nebo upravit.</p>

<p>Zobrazení v <b>Chrome</b>:</p>

<p><img src="/files/stylovani-input-type-number/input-number-chrome.png" class="border" alt="Input v Chrome" /></p>

<p>Zobrazení v <b>Safari</b>:</p>

<p><img src="/files/stylovani-input-type-number/input-number-safari.png" class="border" alt="Input v Safari" /></p>

<p>V jiných prohlížečích a operačních systémech mohou vypadat jinak. Třeba v mobilech s <b>iOS</b> nejsou vůbec.</p>

<p>Bohužel tyto šipky nejdou spolehlivě a napříč prohlížeči stylovat.</p>

<p>Co s tím?</p>

<ol>
<li>Vykašlat se na to. Smířit se s tím, že vzhled a chování nebude konsistentní.</li>
<li>Zrušit tyto šipky úplně.</li>
<li>Vytvořit si vlastní ovládací tlačítka</li>
</ol>


<h2 id="odstraneni-tlacitek">Odstranění tlačítek</h2>

<p>Pro kompletní odstranění šipek:</p>

<pre><code>input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    appearance: none;
}
input[type=number] {
  -moz-appearance: textfield;
}</code></pre>

<p>Tento kód funguje ve všech prohlížečích založených na WebKitu (Chrome, Safari, Edge). Druhá část je potom pro Firefox.</p>

<h2 id="vlastni-stylovani">Vlastní stylování tlačítek</h2>

<p>Protože výchozí tlačítka stylovat nejdou, jediné řešení je si vytvořit vlastní tlačítka a JavaScriptem jim dodat požadované chování.</p>


<div class="live">
  <style>
    .custom-stepper {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 20px 0;
    }
    .custom-stepper input[type=number] {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      width: 80px;
      text-align: center;
    }
    .custom-stepper input[type=number]::-webkit-inner-spin-button, 
    .custom-stepper input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    .custom-stepper input[type=number] {
      -moz-appearance: textfield;
    }
    .custom-stepper button {
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      transition: all 0.2s ease;
      text-align: center;
    }
    .custom-stepper button:hover {
      background: #f8f9fa;
      border-color: #007bff;
    }
    .custom-stepper button:active {
      background: #e9ecef;
    }
  </style>
  
  <div class="custom-stepper">
    <button onclick="changeValue(-1)">−</button>
    <input type="number" id="customInput" value="42" min="0" max="100">
    <button onclick="changeValue(1)">+</button>
  </div>


<script>
function changeValue(delta) {
  const input = document.getElementById('customInput');
  const newValue = parseInt(input.value) + delta;
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  
  if (newValue >= min && newValue <= max) {
    input.value = newValue;
  }
}
</script>
</div>

<p>Díky použití JS je chování plně pod kontrolou. Je potom k úvaze, jestli rovnou i neupravit logiku +/− tlačítek.</p>

<p>Výchozí šipky v prohlížečích zvětšují/zmenšují číslo dle atributu <code>step</code>. To se často vůbec nehodí, protože může být žádoucí umožnit skákat třeba o <code>1</code>, ale zároveň umožnit zadat do pole <code>0,1</code> – <code>step="1"</code> tomu zabrání.</p>

<h2 id="prakticke-priklady">Praktické příklady</h2>

<p>Kromě <em>spinner</em> tlačítek je možné políčko stylovat standardně jako jakýkoliv textový <code>&lt;input&gt;</code>.</p>

<p>Je tu ještě trochu záludnost s <a href="/input-number-min-max">různou šířkou dle <code>min</code>/<code>max</code> atributů</a>.</p>

<h3 id="minimalisticky-design">Minimalistický design</h3>

<div class="live">
  <style>
    .minimalisticky {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin: 20px 0;
    }
    .minimalisticky input[type=number] {
      border: none;
      border-bottom: 2px solid #ddd;
      padding: 8px 0;
      font-size: 16px;
      transition: border-color 0.3s;
      background: transparent;
    }
    .minimalisticky input[type=number]:focus {
      outline: none;
      border-bottom-color: #007bff;
    }
    .minimalisticky input[type=number]::-webkit-inner-spin-button, 
    .minimalisticky input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    .minimalisticky input[type=number] {
      -moz-appearance: textfield;
    }
  </style>
  
  <div class="minimalisticky">
    <input type="number" value="42" placeholder="Zadejte číslo">
    <input type="number" value="100" placeholder="Další číslo">
  </div>
</div>

<h3 id="moderni-design">Moderní design s gradientem</h3>

<div class="live">
  <style>
    .moderni {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin: 20px 0;
    }
    .moderni input[type=number] {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 25px;
      color: white;
      padding: 12px 20px;
      font-size: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      width: 150px;
    }
    .moderni input[type=number]::placeholder {
      color: rgba(255,255,255,0.8);
    }
    .moderni input[type=number]::-webkit-inner-spin-button, 
    .moderni input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    .moderni input[type=number] {
      -moz-appearance: textfield;
    }
  </style>
  
  <div class="moderni">
    <input type="number" value="42" placeholder="Číslo">
    <input type="number" value="100" placeholder="Další">
  </div>
</div>

<h2 id="omezeni-validace">Omezení a validace</h2>

<p>Číselné inputy podporují několik atributů pro omezení hodnot:</p>

<pre><code>&lt;input type="number" min="0" max="100" step="1" value="50"&gt;</code></pre>

<ul>
<li><code>min</code> – minimální hodnota</li>
<li><code>max</code> – maximální hodnota</li>
<li><code>step</code> – krok pro šipky (<code>1</code> pro celá čísla, <code>0.1</code> pro desetinná)</li>
<li><code>value</code> – výchozí hodnota</li>
</ul>

<h3 id="stylovani-validace">Stylování podle validace</h3>

<p>CSS poskytuje pseudo-třídy <code>:valid</code> a <code>:invalid</code> pro stylování <code>&lt;input&gt;</code>ů podle toho, jestli jsou (ne)validní:</p>

<div class="live">
  <style>
    .validace-stylovani {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 20px 0;
    }
    .validace-stylovani input[type=number] {
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      transition: all 0.3s ease;
      width: 200px;
    }
    .validace-stylovani input[type=number]:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }
    .validace-stylovani input[type=number]:valid {
      border-color: #28a745;
      background-color: #f8fff9;
      box-shadow: 0 0 0 3px rgba(40,167,69,0.1);
    }
    .validace-stylovani input[type=number]:invalid {
      border-color: #dc3545;
      background-color: #fff8f8;
      box-shadow: 0 0 0 3px rgba(220,53,69,0.1);
    }
    .validace-stylovani input[type=number]::-webkit-inner-spin-button, 
    .validace-stylovani input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    .validace-stylovani input[type=number] {
      -moz-appearance: textfield;
    }
    .validace-stylovani .info {
      font-size: 14px;
      color: #666;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 4px;
      margin-top: 4px;
    }
  </style>
  
  <div class="validace-stylovani">
    <div>
      <label>Číslo 1–100 (validace):</label>
      <input type="number" id="validaceStyl" min="1" max="100" value="50">
    </div>
    <div class="info">Zadejte číslo mimo rozsah 1–100 pro vidění invalidního stylu</div>
  </div>
</div>

<h2 id="responsivni-design">Responsivní design</h2>

<p>Pro mobilní zařízení je dobré dodržet, aby velikost textu byla alespoň 16 pixelů, což předejde tomu, aby se po kliknutí do políčka na mobilech zoomovala stránka.</p>

<h2 id="zaver">Závěr</h2>

<p>Stylovat tlačítka pro změnu stepu políčka prakticky nejde. Je třeba zvážit dle situace, jestli se vyplatí dělat vlastní JS řešení, smířit se s nekonsistencí nebo je úplně schovat.</p>