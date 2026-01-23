---
title: "Automatická šířka inputu"
headline: "Jak udělat input s automatickou šířkou podle obsahu"
description: "Několik způsobů, jak dosáhnout toho, aby se textové pole rozšiřovalo a zužovalo podle délky zadaného textu."
date: "2026-01-23"
status: 1
tags: ["css", "formulare", "html", "js", "css-vlastnosti"]
format: "html"
---

<p>Běžný <a href="/input"><code>&lt;input></code></a> má <b>pevnou šířku</b>. Někdy je ale potřeba, aby se pole přizpůsobilo délce textu, který obsahuje – například v inline editoru, při úpravě tagů nebo v dynamických formulářích.</p>


<h2 id="field-sizing">CSS řešení: <code>field-sizing</code></h2>

<p>Od roku 2024 prohlížeče podporují novou CSS vlastnost <code>field-sizing</code>, která tento problém řeší elegantně a bez JavaScriptu.</p>

<pre><code>input {
  <b>field-sizing: content;</b>
  min-width: 50px;
  max-width: 300px;
}</code></pre>

<p>Vlastnost <code>field-sizing: content</code> způsobí, že se input automaticky rozšíří podle obsahu. Je vhodné přidat <code>min-width</code> a <code>max-width</code> pro rozumné limity.</p>

<p>Toto řešení funguje i pro <code>&lt;textarea></code> a <code>&lt;select></code>.</p>

<h3 id="field-sizing-podpora">Podpora v prohlížečích</h3>

<p>Vlastnost <code>field-sizing</code> podporují <b>Chrome 123+</b>, <b>Edge 123+</b> a <b>Firefox 132+</b>. Safari zatím nepodporuje.</p>

<div class="board board--demo board--left">
  <style>
    .demo-field-sizing {
      field-sizing: content;
      min-width: 50px;
      max-width: 300px;
      padding: 8px 12px;
      font-size: 16px;
      border: 2px solid #6366f1;
      border-radius: 6px;
    }
  </style>
  <input type="text" class="demo-field-sizing" value="Zkus psát..." placeholder="Zkus psát...">
</div>


<h2 id="javascript">JavaScript řešení</h2>

<p>Pro starší prohlížeče nebo Safari je potřeba použít JavaScript. Princip spočívá v měření šířky textu a nastavení šířky inputu.</p>

<h3 id="js-canvas">Měření pomocí canvas</h3>

<p>Nejpřesnější způsob je měřit text pomocí <code>canvas</code>:</p>

<pre><code>function adjustInputWidth(input) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const style = getComputedStyle(input);
  ctx.font = style.font;

  const textWidth = ctx.measureText(input.value || input.placeholder).width;
  const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

  input.style.width = Math.ceil(textWidth + padding + border + 2) + 'px';
}

// Použití
const input = document.querySelector('input');
input.addEventListener('input', () => adjustInputWidth(input));
adjustInputWidth(input);</code></pre>

<div class="board board--demo board--left">
  <input type="text" id="demo-canvas" value="Zkus psát..." placeholder="Zkus psát..." style="padding: 8px 12px; font-size: 16px; border: 2px solid #10b981; border-radius: 6px;">
  <script>
    (function() {
      const input = document.getElementById('demo-canvas');
      function adjust() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const style = getComputedStyle(input);
        ctx.font = style.font;
        const textWidth = ctx.measureText(input.value || input.placeholder).width;
        const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        input.style.width = Math.ceil(textWidth + padding + border + 2) + 'px';
      }
      input.addEventListener('input', adjust);
      adjust();
    })();
  </script>
</div>


<h3 id="js-hidden">Měření pomocí skrytého elementu</h3>

<p>Alternativní způsob využívá skrytý <code>&lt;span></code> se stejným stylem:</p>

<pre><code>function adjustInputWidth(input) {
  const span = document.createElement('span');
  span.style.cssText = `
    position: absolute;
    visibility: hidden;
    white-space: pre;
    font: ${getComputedStyle(input).font};
  `;
  span.textContent = input.value || input.placeholder || 'M';
  document.body.appendChild(span);

  input.style.width = span.offsetWidth + 'px';
  span.remove();
}

const input = document.querySelector('input');
input.addEventListener('input', () => adjustInputWidth(input));
adjustInputWidth(input);</code></pre>



<h2 id="ch">CSS jednotka <code>ch</code></h2>

<p>Pro jednoduché případy s monospace fontem lze využít CSS jednotku <code>ch</code>, která odpovídá šířce znaku „0".</p>

<pre><code>input {
  font-family: monospace;
  width: 10ch; /* šířka 10 znaků */
}</code></pre>

<p>V kombinaci s JavaScriptem:</p>

<pre><code>input.style.width = (input.value.length || 1) + 'ch';</code></pre>

<p>Toto řešení <b>nefunguje spolehlivě</b> s proporcionálními fonty, kde mají znaky různou šířku („i" vs „m").</p>

<div class="board board--demo board--left">
  <input type="text" id="demo-ch" value="Zkus psát..." placeholder="Zkus psát..." style="padding: 8px 12px; font-size: 16px; font-family: monospace; border: 2px solid #f59e0b; border-radius: 6px;">
  <script>
    (function() {
      const input = document.getElementById('demo-ch');
      function adjust() {
        input.style.width = (input.value.length || 1) + 'ch';
      }
      input.addEventListener('input', adjust);
      adjust();
    })();
  </script>
</div>



<h2 id="contenteditable">Alternativa: <code>contenteditable</code></h2>

<p>Místo <code>&lt;input></code> lze použít element s atributem <code>contenteditable</code>, který se automaticky rozšiřuje:</p>

<pre><code>&lt;span <b>contenteditable="true"</b> role="textbox">&lt;/span></code></pre>

<pre><code>[contenteditable] {
  display: inline-block;
  min-width: 50px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}</code></pre>

<p>Nevýhodou je, že <code>contenteditable</code> nepodporuje některé vlastnosti inputu jako <code>placeholder</code>, <code>maxlength</code> nebo validaci formuláře.</p>

<div class="board board--demo board--left">
  <span contenteditable="true" role="textbox" style="display: inline-block; min-width: 50px; padding: 8px 12px; font-size: 16px; border: 2px solid #ec4899; border-radius: 6px; outline: none;">Zkus psát...</span>
</div>



<h2 id="size">HTML atribut <code>size</code></h2>

<p>Nejjednodušší způsob je použít HTML atribut <code>size</code>, který určuje šířku v počtu znaků:</p>

<pre><code>&lt;input type="text" <b>size="10"</b>></code></pre>

<p>V kombinaci s JavaScriptem:</p>

<pre><code>input.addEventListener('input', () => {
  input.size = Math.max(1, input.value.length);
});</code></pre>

<p>Atribut <code>size</code> funguje podobně jako jednotka <code>ch</code> – počítá průměrnou šířku znaku. U proporcionálních fontů tak nebude výsledek přesný.</p>

<div class="board board--demo board--left">
  <input type="text" id="demo-size" value="Zkus psát..." size="12" style="padding: 8px 12px; font-size: 16px; border: 2px solid #8b5cf6; border-radius: 6px;">
  <script>
    (function() {
      const input = document.getElementById('demo-size');
      function adjust() {
        input.size = Math.max(1, input.value.length);
      }
      input.addEventListener('input', adjust);
    })();
  </script>
</div>



<h2 id="grid">CSS Grid trik</h2>

<p>Čistě CSS řešení využívající <code>display: grid</code> a <code>data-value</code> atribut:</p>

<pre><code>&lt;label class="auto-input">
  &lt;input type="text" oninput="this.parentNode.dataset.value = this.value">
&lt;/label></code></pre>

<pre><code>.auto-input {
  display: inline-grid;
}

.auto-input::after {
  content: attr(data-value) ' ';
  visibility: hidden;
  white-space: pre;
}

.auto-input > input {
  grid-area: 1 / 1;
  width: auto;
  min-width: 1em;
}</code></pre>

<p>Input a pseudo-element <code>::after</code> sdílejí stejnou grid buňku. Pseudo-element je neviditelný, ale roztahuje kontejner podle obsahu.</p>

<div class="board board--demo board--left">
  <style>
    .demo-grid-wrapper {
      display: inline-grid;
    }
    .demo-grid-wrapper::after {
      content: attr(data-value) ' ';
      visibility: hidden;
      white-space: pre;
      padding: 8px 12px;
      font-size: 16px;
      border: 2px solid transparent;
    }
    .demo-grid-wrapper > input {
      grid-area: 1 / 1;
      width: auto;
      min-width: 2em;
      padding: 8px 12px;
      font-size: 16px;
      border: 2px solid #06b6d4;
      border-radius: 6px;
    }
  </style>
  <label class="demo-grid-wrapper" data-value="Zkus psát...">
    <input type="text" value="Zkus psát..." oninput="this.parentNode.dataset.value = this.value">
  </label>
</div>



<h2 id="wrapper">Wrapper s absolutní posicí</h2>

<p>Podobný princip – input překrývá span se stejným obsahem:</p>

<pre><code>&lt;span class="input-wrapper">
  &lt;span class="input-sizer">&lt;/span>
  &lt;input type="text">
&lt;/span></code></pre>

<pre><code>.input-wrapper {
  display: inline-block;
  position: relative;
}

.input-sizer {
  visibility: hidden;
  white-space: pre;
  padding: 0 2px;
}

.input-wrapper input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}</code></pre>

<pre><code>const input = document.querySelector('input');
const sizer = document.querySelector('.input-sizer');

input.addEventListener('input', () => {
  sizer.textContent = input.value || input.placeholder || 'M';
});</code></pre>

<p>Výhodou je, že span používá přesně stejný font a velikost jako input, takže měření je přesné.</p>

<div class="board board--demo board--left">
  <style>
    .demo-wrapper {
      display: inline-block;
      position: relative;
    }
    .demo-wrapper-sizer {
      visibility: hidden;
      white-space: pre;
      padding: 8px 12px;
      font-size: 16px;
      border: 2px solid transparent;
    }
    .demo-wrapper input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 8px 12px;
      font-size: 16px;
      border: 2px solid #ef4444;
      border-radius: 6px;
    }
  </style>
  <span class="demo-wrapper">
    <span class="demo-wrapper-sizer">Zkus psát...</span>
    <input type="text" id="demo-wrapper-input" value="Zkus psát...">
  </span>
  <script>
    (function() {
      const input = document.getElementById('demo-wrapper-input');
      const sizer = input.previousElementSibling;
      input.addEventListener('input', () => {
        sizer.textContent = input.value || 'M';
      });
    })();
  </script>
</div>



<h2 id="doporuceni">Doporučení</h2>

<ol>
  <li><b>Moderní prohlížeče</b> – použijte <code>field-sizing: content</code>.</li>
  <li><b>Bez JavaScriptu</b> – CSS Grid trik s <code>data-value</code>.</li>
  <li><b>Podpora Safari</b> – přidejte JavaScript fallback (canvas nebo wrapper).</li>
  <li><b>Monospace fonty</b> – stačí jednotka <code>ch</code> nebo atribut <code>size</code>.</li>
  <li><b>Komplexní případy</b> – zvažte <code>contenteditable</code>.</li>
</ol>

<pre><code>/* Progresivní vylepšení */
input {
  width: 150px; /* fallback */
}

@supports (field-sizing: content) {
  input {
    field-sizing: content;
    min-width: 50px;
    max-width: 300px;
  }
}</code></pre>
