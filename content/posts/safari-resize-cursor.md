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

<p>Protože Safari nepodporuje standardní resize cursor hodnoty, můžeme použít <b>vlastní SVG cursor</b> jako data URI. Může to být jakýkoliv obrázek – třeba logo:</p>

<div class="live">
<style>
.custom-cursor-test {
  padding: 20px;
  background: #334155;
  border-radius: 8px;
  color: #e2e8f0;
  text-align: center;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Crect width='24' height='24' rx='4' fill='%232196F3'/%3E%3Cpath stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' fill='none' d='M5 16l7-8 7 8'/%3E%3C/svg%3E") 12 12, pointer;
}
</style>
<div class="custom-cursor-test">
Najeďte myší – cursor je logo jecas.cz
</div>
</div>

<pre><code>.element {
  cursor: url("data:image/svg+xml,...") 12 12, pointer;
}</code></pre>

<p>Hodnota <code>12 12</code> určuje hotspot (střed kurzoru 24×24 px).</p>


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
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E") 12 12, nwse-resize;
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

  const resizeCursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E\") 12 12, nwse-resize";

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


<h2 id="window-resize">Resize ze všech stran jako okno v macOS</h2>

<p>Pro kompletní resize funkcionalitu jako u systémových oken potřebujeme handly na všech <b>4 hranách</b> a <b>4 rozích</b>. Každý směr vyžaduje jiný SVG cursor:</p>

<h3>SVG cursory pro všechny směry</h3>

<pre><code>/* Svislý resize (↕) - horní/dolní hrana */
--cursor-ns: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M12 2l4 4h-3v5h-2V6H8l4-4zm0 20l-4-4h3v-5h2v5h3l-4 4z'/%3E%3C/svg%3E") 12 12, ns-resize;

/* Vodorovný resize (↔) - levá/pravá hrana */
--cursor-ew: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M2 12l4-4v3h5v2H6v3l-4-4zm20 0l-4 4v-3h-5v-2h5V8l4 4z'/%3E%3C/svg%3E") 12 12, ew-resize;

/* Diagonální NW-SE (↘↖) - levý horní / pravý dolní roh */
--cursor-nwse: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E") 12 12, nwse-resize;

/* Diagonální NE-SW (↙↗) - pravý horní / levý dolní roh */
--cursor-nesw: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M20 4l0 5-2 0 0-2.5-4 4-1.4-1.4 4-4-2.5 0 0-2 5 0zM4 20l0-5 2 0 0 2.5 4-4 1.4 1.4-4 4 2.5 0 0 2-5 0z'/%3E%3C/svg%3E") 12 12, nesw-resize;</code></pre>

<h3>Test všech SVG cursorů</h3>

<p>Najeďte myší na jednotlivé boxy – tyto custom cursory fungují i v Safari:</p>

<div class="live">
<style>
.svg-cursor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  margin: 16px 0;
}
.svg-cursor-box {
  padding: 16px 8px;
  background: #059669;
  border-radius: 6px;
  text-align: center;
  color: white;
  font-size: 12px;
  font-family: monospace;
}
</style>
<div class="svg-cursor-grid">
  <div class="svg-cursor-box" style="cursor: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M12 2l4 4h-3v5h-2V6H8l4-4zm0 20l-4-4h3v-5h2v5h3l-4 4z'/%3E%3C/svg%3E&quot;) 12 12, ns-resize;">ns-resize ↕</div>
  <div class="svg-cursor-box" style="cursor: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M2 12l4-4v3h5v2H6v3l-4-4zm20 0l-4 4v-3h-5v-2h5V8l4 4z'/%3E%3C/svg%3E&quot;) 12 12, ew-resize;">ew-resize ↔</div>
  <div class="svg-cursor-box" style="cursor: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E&quot;) 12 12, nwse-resize;">nwse-resize ↘</div>
  <div class="svg-cursor-box" style="cursor: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M20 4l0 5-2 0 0-2.5-4 4-1.4-1.4 4-4-2.5 0 0-2 5 0zM4 20l0-5 2 0 0 2.5 4-4 1.4 1.4-4 4 2.5 0 0 2-5 0z'/%3E%3C/svg%3E&quot;) 12 12, nesw-resize;">nesw-resize ↙</div>
</div>
</div>


<h3 id="window-demo">Ukázka: Resize ze všech stran</h3>

<p>Následující element lze zvětšovat/zmenšovat ze všech stran a rohů – stejně jako okno v macOS:</p>

<div class="live">
<style>
.window-resize-box {
  position: relative;
  width: 240px;
  height: 140px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  min-width: 120px;
  min-height: 80px;
  max-width: 500px;
  max-height: 400px;
  box-sizing: border-box;
  user-select: none;
  margin: 20px;
}

/* Hrany */
.window-resize-box .edge {
  position: absolute;
  background: transparent;
}
.window-resize-box .edge-n,
.window-resize-box .edge-s {
  left: 8px;
  right: 8px;
  height: 8px;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M12 2l4 4h-3v5h-2V6H8l4-4zm0 20l-4-4h3v-5h2v5h3l-4 4z'/%3E%3C/svg%3E") 12 12, ns-resize;
}
.window-resize-box .edge-n { top: 0; }
.window-resize-box .edge-s { bottom: 0; }

.window-resize-box .edge-w,
.window-resize-box .edge-e {
  top: 8px;
  bottom: 8px;
  width: 8px;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M2 12l4-4v3h5v2H6v3l-4-4zm20 0l-4 4v-3h-5v-2h5V8l4 4z'/%3E%3C/svg%3E") 12 12, ew-resize;
}
.window-resize-box .edge-w { left: 0; }
.window-resize-box .edge-e { right: 0; }

/* Rohy */
.window-resize-box .corner {
  position: absolute;
  width: 12px;
  height: 12px;
  background: transparent;
}
.window-resize-box .corner-nw {
  top: 0; left: 0;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E") 12 12, nwse-resize;
}
.window-resize-box .corner-ne {
  top: 0; right: 0;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M20 4l0 5-2 0 0-2.5-4 4-1.4-1.4 4-4-2.5 0 0-2 5 0zM4 20l0-5 2 0 0 2.5 4-4 1.4 1.4-4 4 2.5 0 0 2-5 0z'/%3E%3C/svg%3E") 12 12, nesw-resize;
}
.window-resize-box .corner-sw {
  bottom: 0; left: 0;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M20 4l0 5-2 0 0-2.5-4 4-1.4-1.4 4-4-2.5 0 0-2 5 0zM4 20l0-5 2 0 0 2.5 4-4 1.4 1.4-4 4 2.5 0 0 2-5 0z'/%3E%3C/svg%3E") 12 12, nesw-resize;
}
.window-resize-box .corner-se {
  bottom: 0; right: 0;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E") 12 12, nwse-resize;
}

/* Hover efekt pro vizuální zpětnou vazbu */
.window-resize-box .edge:hover,
.window-resize-box .corner:hover {
  background: rgba(255,255,255,0.2);
}
</style>
<div class="window-resize-box" id="window-box">
  Táhni za libovolnou hranu
  <div class="edge edge-n" data-resize="n"></div>
  <div class="edge edge-s" data-resize="s"></div>
  <div class="edge edge-w" data-resize="w"></div>
  <div class="edge edge-e" data-resize="e"></div>
  <div class="corner corner-nw" data-resize="nw"></div>
  <div class="corner corner-ne" data-resize="ne"></div>
  <div class="corner corner-sw" data-resize="sw"></div>
  <div class="corner corner-se" data-resize="se"></div>
</div>
<script>
(function() {
  const box = document.getElementById('window-box');
  if (!box) return;

  const cursors = {
    n: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M12 2l4 4h-3v5h-2V6H8l4-4zm0 20l-4-4h3v-5h2v5h3l-4 4z'/%3E%3C/svg%3E\") 12 12, ns-resize",
    s: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M12 2l4 4h-3v5h-2V6H8l4-4zm0 20l-4-4h3v-5h2v5h3l-4 4z'/%3E%3C/svg%3E\") 12 12, ns-resize",
    w: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M2 12l4-4v3h5v2H6v3l-4-4zm20 0l-4 4v-3h-5v-2h5V8l4 4z'/%3E%3C/svg%3E\") 12 12, ew-resize",
    e: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M2 12l4-4v3h5v2H6v3l-4-4zm20 0l-4 4v-3h-5v-2h5V8l4 4z'/%3E%3C/svg%3E\") 12 12, ew-resize",
    nw: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E\") 12 12, nwse-resize",
    se: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E\") 12 12, nwse-resize",
    ne: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M20 4l0 5-2 0 0-2.5-4 4-1.4-1.4 4-4-2.5 0 0-2 5 0zM4 20l0-5 2 0 0 2.5 4-4 1.4 1.4-4 4 2.5 0 0 2-5 0z'/%3E%3C/svg%3E\") 12 12, nesw-resize",
    sw: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M20 4l0 5-2 0 0-2.5-4 4-1.4-1.4 4-4-2.5 0 0-2 5 0zM4 20l0-5 2 0 0 2.5 4-4 1.4 1.4-4 4 2.5 0 0 2-5 0z'/%3E%3C/svg%3E\") 12 12, nesw-resize"
  };

  let resizing = null;
  let startX, startY, startW, startH, startL, startT;

  const minW = 120, minH = 80, maxW = 500, maxH = 400;

  box.querySelectorAll('[data-resize]').forEach(handle => {
    handle.addEventListener('mousedown', e => {
      resizing = handle.dataset.resize;
      startX = e.clientX;
      startY = e.clientY;
      startW = box.offsetWidth;
      startH = box.offsetHeight;
      startL = box.offsetLeft;
      startT = box.offsetTop;
      document.body.style.cursor = cursors[resizing];
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
  });

  document.addEventListener('mousemove', e => {
    if (!resizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newW = startW, newH = startH, newL = startL, newT = startT;

    if (resizing.includes('e')) newW = Math.min(maxW, Math.max(minW, startW + dx));
    if (resizing.includes('w')) {
      newW = Math.min(maxW, Math.max(minW, startW - dx));
      newL = startL + (startW - newW);
    }
    if (resizing.includes('s')) newH = Math.min(maxH, Math.max(minH, startH + dy));
    if (resizing.includes('n')) {
      newH = Math.min(maxH, Math.max(minH, startH - dy));
      newT = startT + (startH - newH);
    }

    box.style.width = newW + 'px';
    box.style.height = newH + 'px';
    if (resizing.includes('w')) box.style.marginLeft = (newL - startL + 20) + 'px';
    if (resizing.includes('n')) box.style.marginTop = (newT - startT + 20) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (resizing) {
      resizing = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
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
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E") 12 12, nwse-resize;
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
  const resizeCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23000' stroke='%23fff' d='M4 4l5 0 0 2-2.5 0 4 4-1.4 1.4-4-4 0 2.5-2 0 0-5zm16 16l-5 0 0-2 2.5 0-4-4 1.4-1.4 4 4 0-2.5 2 0 0 5z'/%3E%3C/svg%3E") 12 12, nwse-resize`;

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
