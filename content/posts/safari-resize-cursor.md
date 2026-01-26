---
title: "Resize cursor v Safari"
headline: "Proč v Safari nefunguje resize cursor a jak to opravit"
description: "Safari/WebKit nezobrazuje resize cursor u elementů s CSS resize property. Článek vysvětluje příčinu a nabízí funkční řešení s vlastním resize handle."
date: "2026-01-12"
status: 1
tags: ["css", "css-vlastnosti", "apple", "webove-prohlizece", "js"]
format: "html"
---

<p>Při použití CSS vlastnosti <code>resize</code> pro změnu velikosti elementů narazíte v Safari na nepříjemný problém – prohlížeč <b>nezobrazuje resize cursor</b>, když uživatel najede myší na oblast pro změnu velikosti. Element jde sice stále zvětšovat, ale chybí vizuální zpětná vazba.</p>


<h2 id="problem">V čem je problém</h2>

<p>CSS vlastnost <code>resize</code> umožňuje uživateli měnit velikost elementu tažením za jeho roh. V Chromu a Firefoxu se při najetí na oblast změny velikosti automaticky zobrazí <a href="/cursor">resize cursor</a> (<code>nwse-resize</code>). Safari tento cursor <b>vůbec nezobrazuje</b>.</p>

<pre><code>.resizable {
  resize: both;
  overflow: auto;
}</code></pre>

<p>Zatímco v Chrome a Firefox uživatel vidí šipku pro změnu velikosti, v Safari zůstává výchozí kurzor myši beze změny – i přesto, že změna velikosti funguje.</p>


<h2 id="ukazka-problem">Ukázka problému</h2>

<p>Následující element používá pouze <code>resize: both</code>. <b>V Safari</b> neuvidíte změnu kurzoru při najetí na pravý dolní roh:</p>

<div class="live">
<div style="resize: both; overflow: auto; width: 200px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 16px; color: white; font-weight: bold; min-width: 100px; min-height: 60px; max-width: 400px; max-height: 300px;">
Táhni za pravý dolní roh
</div>
</div>


<h2 id="test-cursoru">Test resize cursorů ve vašem prohlížeči</h2>

<p>Nejprve si ověřte, jestli váš prohlížeč vůbec podporuje resize cursor hodnoty. Najeďte myší na jednotlivé boxy:</p>

<div class="live">
<style>
.cursor-test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  margin: 16px 0;
}
.cursor-test-box {
  padding: 12px 8px;
  background: #334155;
  border-radius: 6px;
  text-align: center;
  color: #e2e8f0;
  font-size: 12px;
  font-family: monospace;
}
</style>
<div class="cursor-test-grid">
  <div class="cursor-test-box" style="cursor: ew-resize;">ew-resize ↔</div>
  <div class="cursor-test-box" style="cursor: ns-resize;">ns-resize ↕</div>
  <div class="cursor-test-box" style="cursor: nwse-resize;">nwse-resize ↘</div>
  <div class="cursor-test-box" style="cursor: nesw-resize;">nesw-resize ↙</div>
  <div class="cursor-test-box" style="cursor: col-resize;">col-resize</div>
  <div class="cursor-test-box" style="cursor: row-resize;">row-resize</div>
  <div class="cursor-test-box" style="cursor: n-resize;">n-resize ↑</div>
  <div class="cursor-test-box" style="cursor: e-resize;">e-resize →</div>
  <div class="cursor-test-box" style="cursor: s-resize;">s-resize ↓</div>
  <div class="cursor-test-box" style="cursor: w-resize;">w-resize ←</div>
  <div class="cursor-test-box" style="cursor: se-resize;">se-resize</div>
  <div class="cursor-test-box" style="cursor: sw-resize;">sw-resize</div>
</div>
</div>

<p><b>V Safari typicky fungují pouze <code>col-resize</code> a <code>row-resize</code>.</b> Ostatní resize cursory (včetně diagonálních <code>nwse-resize</code>, <code>nesw-resize</code>) Safari nepodporuje.</p>


<h2 id="pricina">Proč Safari nepodporuje resize cursory</h2>

<p>Safari/WebKit má dva samostatné problémy:</p>

<ol>
  <li><b>Nepodporuje diagonální cursor hodnoty</b> – <code>nwse-resize</code>, <code>nesw-resize</code>, <code>ew-resize</code>, <code>ns-resize</code> a směrové varianty nefungují. Fungují pouze <code>col-resize</code> a <code>row-resize</code>.</li>
  <li><b>Resize handle ignoruje cursor</b> – i kdyby cursory fungovaly, pseudo-element <code>::-webkit-resizer</code> nepodporuje vlastnost <code>cursor</code>.</li>
</ol>

<pre><code>/* NEFUNGUJE v Safari - hodnota není podporovaná */
.element {
  cursor: nwse-resize;
}

/* FUNGUJE v Safari */
.element {
  cursor: col-resize;  /* vodorovný */
  cursor: row-resize;  /* svislý */
}</code></pre>

<h2 id="custom-cursor">Řešení: Custom SVG cursor</h2>

<p>Protože Safari nepodporuje standardní resize cursor hodnoty, můžeme použít <b>vlastní SVG cursor</b> jako data URI:</p>

<pre><code>/* Diagonální resize cursor pro Safari */
.resize-handle {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M19 12l-4-4v3h-4V7h3l-4-4-4 4h3v4H5v-3l-4 4 4 4v-3h4v4H6l4 4 4-4h-3v-4h4v3z'/%3E%3C/svg%3E") 12 12, move;
}</code></pre>

<p>Zde je test custom cursoru – najeďte myší:</p>

<div class="live">
<style>
.custom-cursor-test {
  padding: 20px;
  background: #334155;
  border-radius: 8px;
  color: #e2e8f0;
  text-align: center;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M18 10L14 6v3h-4V5h3L9 1 5 5h3v4H4V6L0 10l4 4v-3h4v4H5l4 4 4-4h-3v-4h4v3z'/%3E%3C/svg%3E") 12 12, move;
}
</style>
<div class="custom-cursor-test">
Custom SVG cursor (funguje v Safari)
</div>
</div>


<h3>SVG kód pro diagonální resize</h3>

<p>SVG pro diagonální šipku (↘↖):</p>

<pre><code>&lt;svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"&gt;
  &lt;path fill="#000" stroke="#fff" stroke-width="1"
    d="M18 10L14 6v3h-4V5h3L9 1 5 5h3v4H4V6L0 10l4 4v-3h4v4H5l4 4
       4-4h-3v-4h4v3z"/&gt;
&lt;/svg&gt;</code></pre>

<p>Hodnota <code>12 12</code> určuje hotspot (střed kurzoru).</p>


<h2 id="reseni">Funkční řešení: Vlastní resize handle</h2>

<p>Jediné spolehlivé řešení je <b>nepoužívat CSS <code>resize</code></b> a implementovat vlastní resize handle jako skutečný DOM element s JavaScriptem:</p>

<div class="live">
<style>
.custom-resizable-box {
  position: relative;
  width: 200px;
  height: 100px;
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  border-radius: 8px;
  padding: 16px;
  color: white;
  font-weight: bold;
  min-width: 100px;
  min-height: 60px;
  max-width: 400px;
  max-height: 300px;
  box-sizing: border-box;
  user-select: none;
}

.custom-resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M18 10L14 6v3h-4V5h3L9 1 5 5h3v4H4V6L0 10l4 4v-3h4v4H5l4 4 4-4h-3v-4h4v3z'/%3E%3C/svg%3E") 12 12, move;
  background:
    linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.4) 50%);
  border-radius: 0 0 8px 0;
}

.custom-resize-handle:hover {
  background:
    linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.6) 50%);
}
</style>
<div class="custom-resizable-box" id="demo-resizable">
Táhni za pravý dolní roh (funguje v Safari)
<div class="custom-resize-handle" id="demo-handle"></div>
</div>
<script>
(function() {
  const box = document.getElementById('demo-resizable');
  const handle = document.getElementById('demo-handle');
  if (!box || !handle) return;

  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  const resizeCursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M18 10L14 6v3h-4V5h3L9 1 5 5h3v4H4V6L0 10l4 4v-3h4v4H5l4 4 4-4h-3v-4h4v3z'/%3E%3C/svg%3E\") 12 12, move";

  handle.addEventListener('mousedown', function(e) {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = box.offsetWidth;
    startHeight = box.offsetHeight;
    document.body.style.cursor = resizeCursor;
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;

    const newWidth = Math.min(400, Math.max(100, startWidth + e.clientX - startX));
    const newHeight = Math.min(300, Math.max(60, startHeight + e.clientY - startY));

    box.style.width = newWidth + 'px';
    box.style.height = newHeight + 'px';
  });

  document.addEventListener('mouseup', function() {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });

  // Touch support
  handle.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    isResizing = true;
    startX = touch.clientX;
    startY = touch.clientY;
    startWidth = box.offsetWidth;
    startHeight = box.offsetHeight;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchmove', function(e) {
    if (!isResizing) return;
    const touch = e.touches[0];

    const newWidth = Math.min(400, Math.max(100, startWidth + touch.clientX - startX));
    const newHeight = Math.min(300, Math.max(60, startHeight + touch.clientY - startY));

    box.style.width = newWidth + 'px';
    box.style.height = newHeight + 'px';
  }, { passive: true });

  document.addEventListener('touchend', function() {
    isResizing = false;
  });
})();
</script>
</div>


<h2 id="kod">Kompletní kód řešení</h2>

<h3>HTML</h3>

<pre><code>&lt;div class="resizable-box"&gt;
  Obsah
  &lt;div class="resize-handle"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

<h3>CSS</h3>

<pre><code>.resizable-box {
  position: relative;
  width: 200px;
  height: 100px;
  min-width: 100px;
  min-height: 60px;
  max-width: 400px;
  max-height: 300px;
  box-sizing: border-box;
  user-select: none;
}

.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  /* Custom SVG cursor pro Safari */
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' d='M18 10L14 6v3h-4V5h3L9 1 5 5h3v4H4V6L0 10l4 4v-3h4v4H5l4 4 4-4h-3v-4h4v3z'/%3E%3C/svg%3E") 12 12, move;
  background:
    linear-gradient(135deg,
      transparent 50%,
      rgba(0,0,0,0.2) 50%);
}</code></pre>

<h3>JavaScript</h3>

<pre><code>function makeResizable(box, handle, options = {}) {
  const minWidth = options.minWidth || 100;
  const minHeight = options.minHeight || 60;
  const maxWidth = options.maxWidth || Infinity;
  const maxHeight = options.maxHeight || Infinity;

  // Custom SVG cursor pro Safari kompatibilitu
  const resizeCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' d='M18 10L14 6v3h-4V5h3L9 1 5 5h3v4H4V6L0 10l4 4v-3h4v4H5l4 4 4-4h-3v-4h4v3z'/%3E%3C/svg%3E") 12 12, move`;

  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  handle.addEventListener('mousedown', (e) =&gt; {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = box.offsetWidth;
    startHeight = box.offsetHeight;

    document.body.style.cursor = resizeCursor;
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) =&gt; {
    if (!isResizing) return;

    const width = Math.min(maxWidth,
      Math.max(minWidth, startWidth + e.clientX - startX));
    const height = Math.min(maxHeight,
      Math.max(minHeight, startHeight + e.clientY - startY));

    box.style.width = width + 'px';
    box.style.height = height + 'px';
  });

  document.addEventListener('mouseup', () =&gt; {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
}</code></pre>


<h2 id="webkit-resizer">Stylování ::-webkit-resizer</h2>

<p>Pokud chcete použít nativní CSS <code>resize</code> a alespoň vizuálně odlišit resize oblast, můžete stylovat <code>::-webkit-resizer</code> (funguje pouze v Safari):</p>

<pre><code>.resizable::-webkit-resizer {
  background: linear-gradient(135deg,
    transparent 50%,
    rgba(0,0,0,0.3) 50%);
}</code></pre>

<p>Tímto alespoň uživatel uvidí, kde může táhnout – i když cursor zůstane výchozí.</p>


<h2 id="podpora">Podpora prohlížečů</h2>

<table>
<tr>
  <th>Prohlížeč</th>
  <th>nwse-resize, ew-resize...</th>
  <th>col-resize, row-resize</th>
  <th>Custom cursor (SVG)</th>
</tr>
<tr>
  <td>Chrome</td>
  <td>Funguje</td>
  <td>Funguje</td>
  <td>Funguje</td>
</tr>
<tr>
  <td>Firefox</td>
  <td>Funguje</td>
  <td>Funguje</td>
  <td>Funguje</td>
</tr>
<tr>
  <td>Safari</td>
  <td>Nefunguje</td>
  <td>Funguje</td>
  <td>Funguje</td>
</tr>
<tr>
  <td>Edge</td>
  <td>Funguje</td>
  <td>Funguje</td>
  <td>Funguje</td>
</tr>
</table>


<h2 id="souvisejici">Související</h2>

<ul>
  <li><a href="/cursor">CSS cursor</a> – přehled všech hodnot vlastnosti cursor</li>
</ul>
