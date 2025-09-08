---
title: "Možnosti stylování <iframe>"
headline: "Možnosti stylování <code>&lt;iframe></code>"
description: "Co lze a nelze u <code>&lt;iframe></code> ovlivnit pomocí CSS a jak na změnu textu nebo barev."
date: "2025-09-08"
last_modification: "2025-09-08"
status: 1
tags: ["html", "css", "stylovani", "responsive"]
format: "html"
---

<p>Element <a href="/ramy#iframe"><code>&lt;iframe></code></a> je <b>samostatný dokument v dokumentu</b>. To má důsledky pro stylování: lze upravovat rámeček samotného prvku, ale <b>nelze přímo stylovat obsah uvnitř</b> (pokud je z jiné domény). Níže je přehled praktických možností, jak rám upravit pomocí CSS.</p>

<div class="internal-content">
  <ul>
    <li><a href="/iframe-posuvnik">Jak skrýt posuvník v <code>&lt;iframe></code></a></li>
    <li><a href="/nacitani-webu-iframe">Načítání webu v <code>&lt;iframe></code></a></li>
  </ul>
  
</div>


<h2 id="co-lze">Co lze a nelze stylovat</h2>

<ul>
  <li><b>Lze</b>: velikost, ořez, rádius, stín, filtry, průhlednost, transformace nebo <a href="/pointer-events"><code>pointer-events</code></a>.</li>
  <li><b>Nelze</b>: měnit fonty, barvy nebo rozložení <b>uvnitř</b> načtené stránky z cizí domény. Ty patří obsahu rámu.</li>
</ul>


<h2 id="zakladni">Základní stylování prvku</h2>

<pre><code>iframe {
  width: 100%;
  height: 450px;
  border: 0;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.12);
}
</code></pre>


<h2 id="pomersr">Responsivní poměr stran</h2>

<p>Nejjednodušší je použít <code>aspect-ratio</code>. Výška se dopočítá podle šířky.</p>

<pre><code>.embed {
  max-width: 900px;
}
.embed iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
}
</code></pre>

<p>Pro starší prohlížeče lze použít obal s relativním pozicováním a poměrovým <code>padding-top</code>:</p>

<pre><code>.embed {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  overflow: hidden;
}
.embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</code></pre>


<h2 id="orez">Zaoblení, ořez a stín</h2>

<p><code>border-radius</code> a <code>overflow: hidden</code> umožní čisté zaoblení i pro vnitřní scrollbary.</p>

<pre><code>.frame {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,.15);
}
.frame iframe {
  display: block;
  width: 100%;
  height: 400px;
}
</code></pre>


<h2 id="fullscreen">Vyplnění celé obrazovky</h2>

<p>Pro náhledy, prototypy nebo interní nástroje lze rám roztáhnout přes celé okno.</p>

<pre><code>.iframe-full {
  position: fixed;
  inset: 0;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  border: 0;
  z-index: 1000;
}
</code></pre>


<h2 id="filtry">Filtry a průhlednost</h2>

<p>Na <code>&lt;iframe></code> lze aplikovat <a href="/filter"><code>filter</code></a> nebo <a href="/opacity"><code>opacity</code></a>. Platí to pro rám jako celek.</p>

<pre><code>.frame-muted { filter: grayscale(1) contrast(.9); }
.frame-dimmed { opacity: .7; }
</code></pre>

<p>To je jedna z možností, jak teoreticky rám přebarvit.</p>

<div class="live">
  <div style="display:grid;gap:.5rem;margin-bottom:.75rem">
    <label for="inv">Invert: <output id="inv-out">0%</output></label>
    <input id="inv" type="range" min="0" max="100" value="0">
    <label for="bri">Brightness: <output id="bri-out">100%</output></label>
    <input id="bri" type="range" min="50" max="150" value="100">
    <label for="hue">Hue-rotate: <output id="hue-out">0°</output></label>
    <input id="hue" type="range" min="0" max="360" value="0">
  </div>
  <iframe id="filter-demo"
          srcdoc='<!doctype html><html><body style="margin:0;font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif;display:grid;place-items:center;height:100vh;background:linear-gradient(135deg,#06b6d4,#3b82f6)"><div style="background:rgba(255,255,255,.9);padding:16px 20px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.15);text-align:center"><div style="font-size:18px;font-weight:700;margin-bottom:6px">Iframe náhled</div><div>Uprav filtry výše</div></div></body></html>'
          style="display:block;width:100%;height:260px;border:0;border-radius:12px"></iframe>
  <script>
    (function(){
      var container = document.currentScript && document.currentScript.parentElement;
      if(!container) return;
      var inv = container.querySelector('#inv');
      var bri = container.querySelector('#bri');
      var hue = container.querySelector('#hue');
      var outInv = container.querySelector('#inv-out');
      var outBri = container.querySelector('#bri-out');
      var outHue = container.querySelector('#hue-out');
      var frame = container.querySelector('#filter-demo');
      function update(){
        if(outInv) outInv.textContent = inv.value + '%';
        if(outBri) outBri.textContent = bri.value + '%';
        if(outHue) outHue.textContent = hue.value + '°';
        var f = 'invert(' + inv.value + '%) brightness(' + bri.value + '%) hue-rotate(' + hue.value + 'deg)';
        frame.style.filter = f;
      }
      inv.addEventListener('input', update);
      bri.addEventListener('input', update);
      hue.addEventListener('input', update);
      update();
    })();
  </script>
</div>




<h2 id="kliky">Klikatelnost a <code>pointer-events</code></h2>

<p>Zakázat klikání do rámu jde přes <code>pointer-events: none</code>.</p>

<pre><code>.iframe-passive { pointer-events: none; }</code></pre>


<h2 id="scrollbar">Scrollbary</h2>

<p>Skrytí posuvníku při zachování rolování lze řešit obalem a ořezem. Postup je popsán v samostatném článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/iframe-posuvnik">Jak skrýt posuvník v <code>&lt;iframe></code></a></li>
  </ul>
</div>


<h2 id="zoom">Zvětšení/zmenšení obsahu</h2>

<p>Obsah rámu jde visuálně škálovat pomocí <code>transform: scale</code>. V praxi je vhodné použít obal kvůli ořezu.</p>

<pre><code>.scaled {
  --scale: .9;
  overflow: hidden;
}
.scaled iframe {
  transform: scale(var(--scale));
  transform-origin: 0 0;
  width: calc(100% / var(--scale));
  height: calc(100% / var(--scale));
}
</code></pre>


<h2 id="konfigrator">Kompletní konfigurátor</h2>

<div class="live">
  <div style="display:grid;gap:.5rem;margin-bottom:1rem">
    <div style="display:grid;gap:.25rem">
      <label for="cfg-url">URL</label>
      <div style="display:flex;gap:.5rem">
        <input id="cfg-url" type="url" placeholder="https://..." value="https://jecas.cz" >
        <button id="cfg-load">Načíst</button>
      </div>
    </div>
    <div style="display:grid;gap:.25rem">
      <label for="cfg-scale">Měřítko: <output id="cfg-scale-out">100%</output></label>
      <input id="cfg-scale" type="range" min="50" max="150" value="100">
    </div>
    <div style="display:grid;gap:.25rem">
      <label for="cfg-inv">Invert: <output id="cfg-inv-out">0%</output></label>
      <input id="cfg-inv" type="range" min="0" max="100" value="0">
    </div>
    <div style="display:grid;gap:.25rem">
      <label for="cfg-bri">Brightness: <output id="cfg-bri-out">100%</output></label>
      <input id="cfg-bri" type="range" min="50" max="150" value="100">
    </div>
    <div style="display:grid;gap:.25rem">
      <label for="cfg-hue">Hue-rotate: <output id="cfg-hue-out">0°</output></label>
      <input id="cfg-hue" type="range" min="0" max="360" value="0">
    </div>
    <div style="display:grid;gap:.25rem">
      <div>Ořez (px)</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem">
        <div>
          <label for="cfg-top">Top: <output id="cfg-top-out">0</output> px</label>
          <input id="cfg-top" type="range" min="0" max="200" value="0">
        </div>
        <div>
          <label for="cfg-right">Right: <output id="cfg-right-out">0</output> px</label>
          <input id="cfg-right" type="range" min="0" max="200" value="0">
        </div>
        <div>
          <label for="cfg-bottom">Bottom: <output id="cfg-bottom-out">0</output> px</label>
          <input id="cfg-bottom" type="range" min="0" max="200" value="0">
        </div>
        <div>
          <label for="cfg-left">Left: <output id="cfg-left-out">0</output> px</label>
          <input id="cfg-left" type="range" min="0" max="200" value="0">
        </div>
      </div>
    </div>
  </div>
  <div class="viewport" style="position:relative;height:360px;border-radius:12px;overflow:hidden;background:#e2e8f0">
    <iframe sandbox id="cfg-frame" src="https://jecas.cz" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;transform-origin:0 0"></iframe>
  </div>
  <div style="margin-top:.5rem">
    <pre class="mb-0 rounded-md bg-gray-100 p-3"><code id="cfg-css-code-percent">/* CSS se doplní podle nastavení výše */</code></pre>
  </div>
  <script>
    (function(){
      var root = document.currentScript && document.currentScript.parentElement;
      if(!root) return;
      var viewport = root.querySelector('.viewport');
      var frame = root.querySelector('#cfg-frame');
      var cssCodePercent = root.querySelector('#cfg-css-code-percent');
      var url = root.querySelector('#cfg-url');
      var loadBtn = root.querySelector('#cfg-load');
      var inv = root.querySelector('#cfg-inv');
      var bri = root.querySelector('#cfg-bri');
      var hue = root.querySelector('#cfg-hue');
      var scale = root.querySelector('#cfg-scale');
      var topR = root.querySelector('#cfg-top');
      var rightR = root.querySelector('#cfg-right');
      var bottomR = root.querySelector('#cfg-bottom');
      var leftR = root.querySelector('#cfg-left');
      var out = function(id, text){ var el = root.querySelector(id); if(el) el.textContent = text; };
      function normalize(u){
        if(!u) return null;
        try { return new URL(u).href; } catch(e) {
          try { return new URL('https://' + u).href; } catch(e2) { return null; }
        }
      }
      function update(){
        var s = Math.max(0.01, Number(scale.value||100)/100);
        var t = Number(topR.value||0);
        var r = Number(rightR.value||0);
        var b = Number(bottomR.value||0);
        var l = Number(leftR.value||0);
        out('#cfg-scale-out', Math.round(s*100) + '%');
        out('#cfg-inv-out', inv.value + '%');
        out('#cfg-bri-out', bri.value + '%');
        out('#cfg-hue-out', hue.value + '°');
        out('#cfg-top-out', t);
        out('#cfg-right-out', r);
        out('#cfg-bottom-out', b);
        out('#cfg-left-out', l);
        var vw = viewport.clientWidth;
        var vh = viewport.clientHeight;
        var w = (vw + l + r) / s;
        var h = (vh + t + b) / s;
        frame.style.width = w + 'px';
        frame.style.height = h + 'px';
        frame.style.transform = 'translate(' + (-l/s) + 'px,' + (-t/s) + 'px) scale(' + s + ')';
        frame.style.filter = 'invert(' + inv.value + '%) brightness(' + bri.value + '%) hue-rotate(' + hue.value + 'deg)';
        if(cssCodePercent){
          var cssPercent = '' +
            '.iframe-wrapper {\n' +
            '  --scale: ' + s.toFixed(2) + ';\n' +
            '  --crop-top: ' + t + 'px;\n' +
            '  --crop-right: ' + r + 'px;\n' +
            '  --crop-bottom: ' + b + 'px;\n' +
            '  --crop-left: ' + l + 'px;\n' +
            '  position: relative;\n' +
            '  overflow: hidden;\n' +
            '  width: 100%;\n' +
            '  aspect-ratio: 16 / 9;\n' +
            '}\n' +
            '.iframe-wrapper iframe {\n' +
            '  position: absolute;\n' +
            '  top: 0;\n' +
            '  left: 0;\n' +
            '  width: calc((100% + var(--crop-left) + var(--crop-right)) / var(--scale));\n' +
            '  height: calc((100% + var(--crop-top) + var(--crop-bottom)) / var(--scale));\n' +
            '  transform: translate(calc(-1 * var(--crop-left) / var(--scale)), calc(-1 * var(--crop-top) / var(--scale))) scale(var(--scale));\n' +
            '  transform-origin: 0 0;\n' +
            '  filter: invert(' + inv.value + '%) brightness(' + bri.value + '%) hue-rotate(' + hue.value + 'deg);\n' +
            '  border: 0;\n' +
            '}';
          cssCodePercent.textContent = cssPercent;
        }
      }
      function applyUrl(){
        var href = normalize(url.value.trim());
        if(href) frame.src = href;
      }
      inv.addEventListener('input', update);
      bri.addEventListener('input', update);
      hue.addEventListener('input', update);
      scale.addEventListener('input', update);
      topR.addEventListener('input', update);
      rightR.addEventListener('input', update);
      bottomR.addEventListener('input', update);
      leftR.addEventListener('input', update);
      loadBtn.addEventListener('click', function(e){ e.preventDefault(); applyUrl(); });
      url.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ e.preventDefault(); applyUrl(); } });
      window.addEventListener('resize', update);
      update();
    })();
  </script>
</div>

<h2 id="proxy">Alternativní řešení: proxy</h2>

<p>Pro plnou kontrolu vzhledu lze stránku načítat přes vlastní proxy na stejné doméně, vložit do ní vlastní styly a do rámu pak načíst už upravenou verzi.</p>

  <ul>
    <li>výhody: stejný origin, vlastní CSS/skripty, možnost úprav <a href="/dom">DOMu</a></li>
    <li>nevýhody: výkon, údržba, právní/licenční aspekty, CSP, přihlášení</li>
  </ul>

<p>Proxy nemusí fungovat pro weby s přísnou CSP (Content Security Policy) nebo vyžadující přihlášení. Vhodné je mít souhlas.</p>

<p>Proxy je i jediné řešení pro weby, které blokují načtení do rámu.</p>


<h2 id="zaver">Závěr</h2>

<p>Stylování <code>&lt;iframe></code> se zaměřuje na prvek samotný – velikost, poměr stran, ořez a visuální efekty. Do vnitřního obsahu cizí stránky zasahovat nelze.</p>

<p>Docílit alespoň nějak jde změny barev přes filtry, zmenšení/zvětšení přes <code>scale</code> a případně oříznout okraje.</p>


