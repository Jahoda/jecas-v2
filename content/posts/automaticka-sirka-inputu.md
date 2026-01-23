---
title: "Automatická šířka inputu"
headline: "Jak udělat input s automatickou šířkou podle obsahu"
description: "Několik způsobů, jak dosáhnout toho, aby se textové pole rozšiřovalo a zužovalo podle délky zadaného textu."
date: "2026-01-23"
status: 1
tags: ["css", "formulare", "html", "js", "css-vlastnosti"]
format: "html"
---

<p>Běžný <a href="/input"><code>&lt;input></code></a> má <b>pevnou šířku</b>. Někdy je ale potřeba, aby se pole přizpůsobilo délce textu, který obsahuje – například v inline editoru, při úpravě tagů nebo v dynamických formulářích.</p>


<h2 id="field-sizing">CSS řešení: <code>field-sizing</code></h2>

<p>Od roku 2024 prohlížeče podporují novou CSS vlastnost <code>field-sizing</code>, která tento problém řeší elegantně a bez JavaScriptu.</p>

<pre><code>input {
  <b>field-sizing: content;</b>
  min-width: 50px;
  max-width: 300px;
}</code></pre>

<p>Vlastnost <code>field-sizing: content</code> způsobí, že se input automaticky rozšíří podle obsahu. Je vhodné přidat <code>min-width</code> a <code>max-width</code> pro rozumné limity.</p>

<p>Toto řešení funguje i pro <code>&lt;textarea></code> a <code>&lt;select></code>.</p>

<h3 id="field-sizing-podpora">Podpora v prohlížečích</h3>

<p>Vlastnost <code>field-sizing</code> podporují <b>Chrome 123+</b>, <b>Edge 123+</b> a <b>Firefox 132+</b>. Safari zatím nepodporuje.</p>



<h2 id="javascript">JavaScript řešení</h2>

<p>Pro starší prohlížeče nebo Safari je potřeba použít JavaScript. Princip spočívá v měření šířky textu a nastavení šířky inputu.</p>

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

<p>Pro jednoduché případy s monospace fontem lze využít CSS jednotku <code>ch</code>, která odpovídá šířce znaku „0”.</p>

<pre><code>input {
  font-family: monospace;
  width: 10ch; /* šířka 10 znaků */
}</code></pre>

<p>V kombinaci s JavaScriptem:</p>

<pre><code>input.style.width = (input.value.length || 1) + 'ch';</code></pre>

<p>Toto řešení <b>nefunguje spolehlivě</b> s proporcionálními fonty, kde mají znaky různou šířku („i” vs ”m").</p>



<h2 id="contenteditable">Alternativa: <code>contenteditable</code></h2>

<p>Místo <code>&lt;input></code> lze použít element s atributem <code>contenteditable</code>, který se automaticky rozšiřuje:</p>

<pre><code>&lt;span <b>contenteditable="true"</b> role="textbox">&lt;/span></code></pre>

<pre><code>[contenteditable] {
  display: inline-block;
  min-width: 50px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}</code></pre>

<p>Nevýhodou je, že <code>contenteditable</code> nepodporuje některé vlastnosti inputu jako <code>placeholder</code>, <code>maxlength</code> nebo validaci formuláře.</p>


<h2 id="doporuceni">Doporučení</h2>

<ol>
  <li><b>Moderní prohlížeče</b> – použijte <code>field-sizing: content</code>.</li>
  <li><b>Podpora Safari</b> – přidejte JavaScript fallback.</li>
  <li><b>Monospace fonty</b> – stačí jednotka <code>ch</code>.</li>
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
