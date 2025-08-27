---
title: Poskakování obsahu akčních tlačítek
headline: Poskakování obsahu akčních tlačítek
description: Jak vyřešit problém s poskakováním obsahu, když se změní textace nebo tučnost tlačítka.
date: "2025-08-27"
last_modification: "2025-08-27"
status: 1
tags: [css, ux, formulare]
format: "html"
---

<p>Často se setkáme s problémem, kdy obsah na stránce „<a href="/poskakovani">poskakuje</a>“ při klikání na tlačítka, která mění svůj text nebo styl. Typickým příkladem je třeba tlačítko „Přidat do košíku“, které se po kliknutí změní na „Přidáno". Nebo tlačítko pro kopírování textu do schránky („Zkopírovat“ na „Zkopírováno“).</p>

<p>Když se změní text na tlačítku, změní se i jeho šířka. To často způsobí, že se posune celý layout stránky, zvlášť když je vedle tlačítka další obsah.</p>


<div class="live">
<style>
  .demo-button-click-problem {
    background: #fff;
    padding: .2rem .6rem;
    border-radius: .4rem;
  }
  </style>
  <div class="demo-buttons">
    <button class="demo-button-click-problem custom-button" onclick="toggleText(this)">
      <span class="text-default">Přidat do košíku</span>
      <span class="text-success" style="display: none;">Přidáno ✓</span>
    </button>
  </div>
  <script>
  function toggleText(button) {
    const defaultText = button.querySelector('.text-default');
    const successText = button.querySelector('.text-success');
    
    if (defaultText.style.display !== 'none') {
      defaultText.style.display = 'none';
      successText.style.display = 'inline';
    } else {
      defaultText.style.display = 'inline';
      successText.style.display = 'none';
    }
  }
  </script>
</div>

<p>Podobný problém nastává i při hoveru, kdy se změní řez písma — například z normálního na tučné. Tučné písmo má větší šířku než normální, což způsobuje poskakování obsahu při najetí myší.</p>

<div class="live">
  <button class="demo-button-hover-problem custom-button">
    Hover pro tučné písmo
  </button>
  
  <style>
  .demo-button-hover-problem {
    background: #fff;
    padding: .2rem .6rem;
    border-radius: .4rem;
  }
  
  .demo-button-hover-problem:hover {
    font-weight: bold;
  }
  </style>
</div>


<h2 id="fixni-sirka">Fixní šířka tlačítka</h2>

<p>Nejjednodušší řešení je nastavit tlačítku pevnou šířku:</p>

<pre><code class="language-css">.button {
  width: 200px;
  min-width: 200px;
}</code></pre>

<p>Má to jednoduchou implementaci a předvídatelné chování. Nevýhoda je plýtvání místem nebo naopak zbytečně velká tlačítka.</p>

<p>Na druhou stranu má fixní šířka často opodstatnění. Rozměr tlačítka je navržen podle jeho důležitosti, takže nemusí dávat smysl, aby byl velký podle textu, který se zrovna zvolí.</p>

<p>Zvlášť u vícejazyčných aplikací to úplně nedává smysl, aby byla tlačítka <i>významná</i> podle toho, jak dlouhý text mají.</p>

<div class="live">
  <button class="demo-button-fixed custom-button" onclick="toggleText(this)">
    <span class="text-default">Přidat do košíku</span>
    <span class="text-success" style="display: none;">Přidáno ✓</span>
  </button>
  
  <style>
  .demo-button-fixed {
    background: #fff;
    padding: .2rem .6rem;
    border-radius: .4rem;
    width: 200px;
    min-width: 200px;
  }
  
  .demo-button-fixed:hover {
    background: #3b82f6;
    color: white;
  }
  </style>
  
  <script>
  function toggleText(button) {
    const defaultText = button.querySelector('.text-default');
    const successText = button.querySelector('.text-success');
    
    if (defaultText.style.display !== 'none') {
      defaultText.style.display = 'none';
      successText.style.display = 'inline';
    } else {
      defaultText.style.display = 'inline';
      successText.style.display = 'none';
    }
  }
  </script>
</div>

<h2 id="vsechny-varianty">Ponechání všech variant textu</h2>

<p>Pokročilejší řešení je mít všechny varianty textu v DOMu, aby zabíraly místo, a zobrazovat jen tu aktuální:</p>


<div class="live">
  <button class="demo-button-vertical custom-button" onclick="cycleVerticalStates(this)">
    <div class="text-container">
      <span class="text-default">Přidat do košíku</span>
      <span class="text-loading">Přidávám…</span>
      <span class="text-success">Přidáno ✓</span>
    </div>
  </button>
  
  <style>
  .demo-button-vertical {
    background: #fff;
    padding: 0 .6rem;
    border-radius: .4rem;
    height: 48px;
    overflow: hidden;
  }
  
  .demo-button-vertical:hover {
    background: #3b82f6;
    color: white;
  }
  
  .demo-button-vertical .text-container {
    position: relative;
    transition: transform 0.3s ease;
    transform: translateY(0);
  }
  
  .demo-button-vertical .text-container span {
    display: block;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
  
  .demo-button-vertical .text-container.loading {
    transform: translateY(-48px);
  }
  
  .demo-button-vertical .text-container.success {
    transform: translateY(-96px);
  }
  </style>
  
  <script>
  function cycleVerticalStates(button) {
    const textContainer = button.querySelector('.text-container');
    const states = ['', 'loading', 'success'];
    const currentState = textContainer.className.match(/loading|success/)?.[0] || '';
    const currentIndex = states.indexOf(currentState);
    const nextIndex = (currentIndex + 1) % states.length;
    
    textContainer.className = textContainer.className.replace(/loading|success/g, '');
    if (states[nextIndex]) {
      textContainer.classList.add(states[nextIndex]);
    }
  }
  </script>
</div>

<h2 id="pocitat">Počítat se změnou rozměrů</h2>

<p>Řešením může být i počítat se změnou šířky. Pokud není vedle tlačítka něco, co by reagovalo na změnu šířky, nebo se třeba tlačítko <a href="/position#absolute">absolutně naposicuje</a>, není problém.</p>

<h2 id="ikony">Tlačítka jen s ikonou a tooltipem</h2>

<p>Elegantní řešení pro minimalisaci poskakování je použití jen ikonových tlačítek. Má to ale háček – srozumitelnost pro uživatele bude o dost menší. Uživatel nemusí ikonu pochopit a problém může být i při vyhledávání na stránce (ikona se špatně hledá interním vyhledáváním v prohlížeči).</p>


<div class="live">
  <div class="demo-icon-buttons">
    <button class="demo-icon-button" title="Přidat k oblíbeným">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
  </div>
  
  <style>
  .demo-icon-buttons {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .demo-icon-button {
    width: 48px;
    height: 48px;
    border: 2px solid #3b82f6;
    border-radius: 50%;
    background: white;
    color: #3b82f6;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
  }
  
  .demo-icon-button:hover {
    background: #3b82f6;
    color: white;
  }
  
  .demo-icon-button .icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
  </style>
</div>

<h2 id="javascript-reseni">Měření JavaScriptem</h2>

<p>Před vyvoláním akce si lze změřit přirozenou šířku tlačítka a nastavit ji jako fixní. Tím se docílí toho, že výchozí velikost bude podle obsahu, ale při změně nic neposkočí.</p>

<h2 id="nemeneni-textu">Neměnit text tlačítka</h2>

<p>Místo změny textu na tlačítku můžete použít skrývání a odkrývání dodatečného obsahu. Ať už nějakých bublin nebo toast zpráv.</p>

<div class="live">
  <button class="demo-toast-button custom-button" onclick="showToast()">
    Přidat do košíku
  </button>
  
  <div class="demo-toast" id="demo-toast">
    <span class="toast-icon">✓</span>
    <span class="toast-text">Produkt byl přidán do košíku</span>
  </div>
  
  <style>
  .demo-toast-button {
    background: #fff;
    padding: .2rem .6rem;
    border-radius: .4rem;
  }

  .demo-toast-button:hover {
    background: #3b82f6;
    color: white;
  }
  
  .demo-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    z-index: 1000;
  }
  
  .demo-toast.show {
    transform: translateX(0);
  }
  
  .toast-icon {
    font-weight: bold;
    font-size: 1.2em;
  }
  
  .toast-text {
    font-size: 0.9em;
  }
  </style>
  
  <script>
  function showToast() {
    const toast = document.getElementById('demo-toast');
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  </script>
</div>

<h2 id="hover-reseni">Řešení problému s hoverem</h2>

<p>Pro hover efekty s tučným písmem existuje několik řešení:</p>

<h3 id="pseudo-elementy">Použití pseudo-elementů</h3>

<p>Nejefektivnější řešení je použít pseudo-elementy s tučným textem, které jsou skryté, ale zabírají místo, takže natáhnou tlačítko na tučnou variantu:</p>

<pre><code class="language-css">.button-hover-fixed {
  position: relative;
}

.button-hover-fixed::before {
  content: attr(data-text);
  font-weight: bold;
  visibility: hidden;
  display: block;
  height: 0;
  overflow: hidden;
}

.button-hover-fixed:hover {
  font-weight: bold;
}</code></pre>

<div class="live">
  <button class="demo-button-hover-fixed custom-button" data-text="Hover s pseudo-elementem">
    Hover s pseudo-elementem
  </button>
  
  <style>
  .demo-button-hover-fixed {
    background: #fff;
    padding: .2rem .6rem;
    border-radius: .4rem;
    position: relative;
  }
  
  .demo-button-hover-fixed::before {
    content: attr(data-text);
    font-weight: bold;
    visibility: hidden;
    display: block;
    height: 0;
    overflow: hidden;
  }
  
  .demo-button-hover-fixed:hover {
    font-weight: bold;
  }
  </style>
</div>

<h3 id="text-shadow">Použití text-shadow</h3>

<p>Alternativní řešení je použít text-shadow pro simulaci tučného písma bez změny šířky:</p>

<pre><code class="language-css">.button-shadow {
  transition: text-shadow 0.2s;
}

.button-shadow:hover {
  text-shadow: 
    0.5px 0 0 currentColor,
    1px 0 0 currentColor;
}</code></pre>

<div class="live">
  <button class="demo-button-shadow custom-button">
    Hover s text-shadow
  </button>
  
  <style>
  .demo-button-shadow {
    background: #fff;
    padding: .2rem .6rem;
    border-radius: .4rem;
    transition: text-shadow 0.2s;
  }
  
  .demo-button-shadow:hover {
    text-shadow: 
      0.5px 0 0 currentColor,
      1px 0 0 currentColor;
  }
  </style>
</div>

<h3 id="transform">Použití <code>transform</code></h3>

<p>Pro jemné efekty můžete použít <code>transform</code> místo změny <code>font-weight</code>.</p>

<p>Funguje to díky tomu, že transformace neovlivňují své okolí:</p>

<pre><code class="language-css">.button-transform {
  transition: transform 0.2s;
}

.button-transform:hover {
  transform: scale(1.05);
}</code></pre>

<div class="live">
  <button class="demo-button-transform custom-button">
    Hover s transform
  </button>
  
  <style>
  .demo-button-transform {
    background: #fff;
    padding: .2rem .6rem;
    border-radius: .4rem;
    transition: transform 0.2s;
  }
  
  .demo-button-transform:hover {
    transform: scale(1.05);
  }
  </style>
</div>

<h2 id="zaver">Závěr</h2>

<p>Problém s poskakováním obsahu při změně textu na tlačítkách je častý, ale řešitelný. Klíčové je myslet na stabilitu layoutu už při návrhu komponent.</p>

<p>Nejlepší řešení závisí na konkrétním případě:</p>

<ul>
  <li><strong>Jednoduché případy:</strong> Fixní šířka tlačítka</li>
  <li><strong>Složitější interakce:</strong> Ponechání všech variant textu v DOMu</li>
  <li><strong>Hover efekty:</strong> Pseudo-elementy nebo text-shadow</li>
  <li><strong>Alternativní přístupy:</strong> Toast zprávy, icon-only tlačítka</li>
</ul>


<p>Stabilní neposkakující stránka je základ dobré uživatelské zkušenosti. I malé poskakování může narušit plynulost interakce a působit neprofesionálně.</p>
