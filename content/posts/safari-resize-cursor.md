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


<h2 id="pricina">Proč Safari nezobrazuje resize cursor</h2>

<p>Toto <b>není bug, ale záměrné chování WebKitu</b>. Safari používá pro resize handle pseudo-element <code>::-webkit-resizer</code>. I když na tomto pseudo-elementu můžete změnit barvu pozadí, <b>vlastnost cursor změnit nelze</b>:</p>

<pre><code>/* Funguje - změní barvu pozadí */
::-webkit-resizer {
  background: #000;
}

/* NEFUNGUJE - cursor zůstává výchozí */
::-webkit-resizer {
  cursor: nwse-resize;
}</code></pre>

<p>Rozdíl mezi prohlížeči:</p>

<ul>
  <li><b>Firefox</b> – při <code>resize: both</code> automaticky nastaví <code>cursor: nwse-resize</code></li>
  <li><b>Chrome</b> – zobrazuje resize cursor na resize handle</li>
  <li><b>Safari/WebKit</b> – cursor zůstává výchozí (šipka)</li>
</ul>


<h2 id="proc-workaroundy-nefunguji">Proč běžné workaroundy nefungují</h2>

<h3>Pseudo-element ::after</h3>

<p>První nápad je použít <code>::after</code> pseudo-element s nastaveným cursorem:</p>

<pre><code>.resizable::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
}</code></pre>

<p><b>Nefunguje v Safari.</b> Safari dlouhodobě nepodporuje vlastnost <code>cursor</code> na pseudo-elementech. Podpora byla přidána až v Safari Technology Preview 227.</p>

<h3>JavaScript nastavení cursoru na elementu</h3>

<p>Další nápad je nastavit cursor pomocí JavaScriptu na samotném elementu:</p>

<pre><code>element.addEventListener('mousemove', (e) =&gt; {
  const rect = element.getBoundingClientRect();
  const isNearCorner =
    rect.right - e.clientX &lt; 16 &amp;&amp;
    rect.bottom - e.clientY &lt; 16;

  element.style.cursor = isNearCorner ? 'nwse-resize' : '';
});</code></pre>

<p><b>Nefunguje spolehlivě.</b> I když nastavíte cursor na elementu, resize handle (který vykresluje prohlížeč) má vlastní cursor, který přepíše váš.</p>


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
  cursor: nwse-resize;
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

  handle.addEventListener('mousedown', function(e) {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = box.offsetWidth;
    startHeight = box.offsetHeight;
    document.body.style.cursor = 'nwse-resize';
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
  cursor: nwse-resize;
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

  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  handle.addEventListener('mousedown', (e) =&gt; {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = box.offsetWidth;
    startHeight = box.offsetHeight;

    document.body.style.cursor = 'nwse-resize';
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
  <th>CSS resize cursor</th>
  <th>::-webkit-resizer</th>
</tr>
<tr>
  <td>Chrome</td>
  <td>Funguje automaticky</td>
  <td>Nepodporuje (od v28)</td>
</tr>
<tr>
  <td>Firefox</td>
  <td>Funguje automaticky</td>
  <td>Nepodporuje</td>
</tr>
<tr>
  <td>Safari</td>
  <td>Cursor nefunguje</td>
  <td>Funguje (kromě cursor)</td>
</tr>
<tr>
  <td>Edge</td>
  <td>Funguje automaticky</td>
  <td>Nepodporuje</td>
</tr>
</table>


<h2 id="souvisejici">Související</h2>

<ul>
  <li><a href="/cursor">CSS cursor</a> – přehled všech hodnot vlastnosti cursor</li>
</ul>
