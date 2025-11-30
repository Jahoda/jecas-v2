---
title: "Threlte - 3D framework pro Svelte"
headline: "Threlte - 3D framework pro Svelte"
description: "Threlte je deklarativní, type-safe a reaktivní 3D framework pro Svelte postavený na Three.js. Zjistěte, jak snadno vytvářet interaktivní 3D aplikace pro web."
date: "2025-11-30"
last_modification: "2025-11-30"
status: 1
tags: ["svelte", "3d", "javascript", "knihovny"]
format: "html"
---

<p>Vytváření 3D aplikací na webu bylo vždy výzvou. Knihovna <b>Three.js</b> sice nabízí výkonné nástroje, ale její imperativní přístup může být složitý. <b>Threlte</b> tuto výzvu řeší elegantním způsobem.</p>

<div style="text-align: center; margin: 2rem 0; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
  <a href="/nastroje/threlte-demo" style="display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 0.5rem; font-weight: bold; font-size: 1.2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    🎮 3D Demo
  </a>
  <a href="/nastroje/threlte-stack-game" style="display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; text-decoration: none; border-radius: 0.5rem; font-weight: bold; font-size: 1.2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    🎯 Stack Game
  </a>
</div>

<h2 id="co-je-threlte">Co je Threlte?</h2>

<p><a href="https://threlte.xyz/">Threlte</a> je moderní 3D framework pro <b>Svelte</b>, který poskytuje deklarativní API nad knihovnou <b>Three.js</b>. Umožňuje vám psát 3D scény pomocí komponent namísto složitého imperativního kódu.</p>

<p>Hlavní výhody Threlte:</p>

<ul>
<li><b>Deklarativní API</b> – Píšete komponenty místo imperativního kódu</li>
<li><b>Type-safe</b> – Plná podpora TypeScriptu</li>
<li><b>Reaktivní</b> – Automatické propojení se Svelte reaktivitou</li>
<li><b>Výkonné</b> – Postaveno na Three.js s optimalizacemi</li>
<li><b>Modulární</b> – Bohatý ekosystém pluginů a rozšíření</li>
</ul>

<h2 id="porovnani">Porovnání s Three.js</h2>

<p>Podívejme se na rozdíl mezi vanilla Three.js a Threlte na jednoduchém příkladu rotující kostky.</p>

<h3 id="threejs">Vanilla Three.js</h3>

<div class="live">
<style>
.threejs-example {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
}

#threejs-canvas {
  width: 100%;
  height: 400px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.code-comparison {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-comparison .keyword { color: #569cd6; }
.code-comparison .string { color: #ce9178; }
.code-comparison .comment { color: #6a9955; }
.code-comparison .function { color: #dcdcaa; }
</style>

<div class="threejs-example">
  <canvas id="threejs-canvas"></canvas>
</div>

<div class="code-comparison">
<span class="keyword">import</span> * <span class="keyword">as</span> THREE <span class="keyword">from</span> <span class="string">'three'</span>;<br>
<br>
<span class="comment">// Vytvoření scény</span><br>
<span class="keyword">const</span> scene = <span class="keyword">new</span> THREE.<span class="function">Scene</span>();<br>
<span class="keyword">const</span> camera = <span class="keyword">new</span> THREE.<span class="function">PerspectiveCamera</span>(<span class="string">75</span>, width / height, <span class="string">0.1</span>, <span class="string">1000</span>);<br>
<span class="keyword">const</span> renderer = <span class="keyword">new</span> THREE.<span class="function">WebGLRenderer</span>({ canvas });<br>
<br>
<span class="comment">// Vytvoření kostky</span><br>
<span class="keyword">const</span> geometry = <span class="keyword">new</span> THREE.<span class="function">BoxGeometry</span>(<span class="string">2</span>, <span class="string">2</span>, <span class="string">2</span>);<br>
<span class="keyword">const</span> material = <span class="keyword">new</span> THREE.<span class="function">MeshStandardMaterial</span>({ color: <span class="string">0xec4899</span> });<br>
<span class="keyword">const</span> cube = <span class="keyword">new</span> THREE.<span class="function">Mesh</span>(geometry, material);<br>
scene.<span class="function">add</span>(cube);<br>
<br>
<span class="comment">// Světla</span><br>
<span class="keyword">const</span> light = <span class="keyword">new</span> THREE.<span class="function">DirectionalLight</span>(<span class="string">0xffffff</span>, <span class="string">1</span>);<br>
scene.<span class="function">add</span>(light);<br>
<br>
<span class="comment">// Animační smyčka</span><br>
<span class="keyword">function</span> <span class="function">animate</span>() {<br>
&nbsp;&nbsp;cube.rotation.x += <span class="string">0.01</span>;<br>
&nbsp;&nbsp;cube.rotation.y += <span class="string">0.01</span>;<br>
&nbsp;&nbsp;renderer.<span class="function">render</span>(scene, camera);<br>
&nbsp;&nbsp;<span class="function">requestAnimationFrame</span>(animate);<br>
}<br>
<span class="function">animate</span>();
</div>

<script type="module">
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const canvas = document.getElementById('threejs-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xec4899,
  metalness: 0.3,
  roughness: 0.4
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});
</script>
</div>

<p>Výše vidíte funkční Three.js příklad. Všimněte si, kolik imperativního kódu je potřeba pro vytvoření jednoduché scény.</p>

<h3 id="threlte-priklad">Stejný příklad v Threlte</h3>

<div class="code-comparison">
<span class="keyword">&lt;script</span> <span class="string">lang</span>=<span class="string">"ts"</span><span class="keyword">&gt;</span><br>
&nbsp;&nbsp;<span class="keyword">import</span> { T } <span class="keyword">from</span> <span class="string">'@threlte/core'</span>;<br>
&nbsp;&nbsp;<span class="keyword">let</span> rotation = <span class="string">0</span>;<br>
<span class="keyword">&lt;/script&gt;</span><br>
<br>
<span class="keyword">&lt;T.PerspectiveCamera</span> <span class="string">makeDefault position</span>={[<span class="string">0</span>, <span class="string">0</span>, <span class="string">5</span>]} <span class="keyword">/&gt;</span><br>
<span class="keyword">&lt;T.DirectionalLight</span> <span class="string">position</span>={[<span class="string">5</span>, <span class="string">5</span>, <span class="string">5</span>]} <span class="keyword">/&gt;</span><br>
<span class="keyword">&lt;T.AmbientLight</span> <span class="string">intensity</span>={<span class="string">0.5</span>} <span class="keyword">/&gt;</span><br>
<br>
<span class="keyword">&lt;T.Mesh</span> <span class="string">rotation.x</span>={rotation} <span class="string">rotation.y</span>={rotation}<span class="keyword">&gt;</span><br>
&nbsp;&nbsp;<span class="keyword">&lt;T.BoxGeometry</span> <span class="string">args</span>={[<span class="string">2</span>, <span class="string">2</span>, <span class="string">2</span>]} <span class="keyword">/&gt;</span><br>
&nbsp;&nbsp;<span class="keyword">&lt;T.MeshStandardMaterial</span> <span class="string">color</span>=<span class="string">"#ec4899"</span> <span class="keyword">/&gt;</span><br>
<span class="keyword">&lt;/T.Mesh&gt;</span>
</div>

<p>Stejná funkcionalita, ale s <b>mnohem čitelnějším a deklarativním kódem</b>. Vše je reaktivní – změna proměnné <code>rotation</code> automaticky aktualizuje 3D scénu.</p>

<h2 id="ekosystem">Bohatý ekosystém</h2>

<p>Threlte nabízí několik oficiálních balíčků:</p>

<ul>
<li><b>@threlte/core</b> – Základní deklarativní binding pro Three.js</li>
<li><b>@threlte/extras</b> – Užitečné komponenty a utility (OrbitControls, GLTF loader, atd.)</li>
<li><b>@threlte/gltf</b> – CLI nástroj pro konverzi GLTF modelů na komponenty</li>
<li><b>@threlte/rapier</b> – Fyzikální engine pro realistické simulace</li>
<li><b>@threlte/theatre</b> – Integrace s Theatre.js pro animace</li>
<li><b>@threlte/xr</b> – Podpora pro VR a AR</li>
</ul>

<h2 id="kdy-pouzit">Kdy použít Threlte?</h2>

<p>Threlte je ideální volba pro:</p>

<ul>
<li>3D vizualizace a prezentace produktů</li>
<li>Interaktivní datové vizualizace</li>
<li>Hry a zábavné aplikace</li>
<li>Vzdělávací a výukové aplikace</li>
<li>VR/AR aplikace</li>
<li>Portfolio a kreativní weby</li>
</ul>

<h2 id="prakticky-priklad">Praktický příklad - 3D Stack Game</h2>

<p>Abyste viděli Threlte v akci, vytvořili jsme jednoduchou 3D hru. <b>Stack Game</b> je arkádová hra, kde stavíte věž z pohybujících se bloků.</p>

<div style="text-align: center; margin: 2rem 0;">
  <a href="/nastroje/threlte-stack-game" style="display: inline-block; padding: 1.5rem 3rem; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; text-decoration: none; border-radius: 0.5rem; font-weight: bold; font-size: 1.3rem; box-shadow: 0 6px 12px rgba(0,0,0,0.2);">
    🎯 Hrát 3D Stack Game →
  </a>
</div>

<p>Hra demonstruje:</p>

<ul>
<li><b>Reaktivní state management</b> – Celý herní stav (skóre, bloky, pozice) je reaktivní</li>
<li><b>Animace s useTask</b> – Plynulý pohyb bloků pomocí Threlte hooků</li>
<li><b>3D fyzika a kolize</b> – Výpočet překryvu bloků a detekce game over</li>
<li><b>Interaktivita</b> – Ovládání myší i klávesnicí</li>
<li><b>HTML overlay</b> – Kombinace 3D scény s HTML UI pomocí @threlte/extras</li>
</ul>

<p>Celá hra má méně než 200 řádků kódu díky deklarativnímu přístupu Threlte!</p>

<h2 id="zaver">Závěr</h2>

<p>Threlte přináší deklarativní a reaktivní přístup k 3D grafice na webu. Pokud již používáte Svelte a chcete přidat 3D obsah do své aplikace, je Threlte skvělá volba.</p>

<p>Framework aktivně vyvíjí komunita, má výbornou dokumentaci a rychle roste. S verzí 8.3.0 (z listopadu 2025) je Threlte stabilní a připravený pro produkční nasazení.</p>

<div style="text-align: center; margin: 3rem 0; padding: 2rem; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border-radius: 1rem; border: 2px solid rgba(102, 126, 234, 0.3);">
  <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Vyzkoušejte si Threlte naživo!</h3>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="/nastroje/threlte-demo" style="display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 0.5rem; font-weight: bold; font-size: 1.1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      🎮 Interaktivní demo
    </a>
    <a href="/nastroje/threlte-stack-game" style="display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; text-decoration: none; border-radius: 0.5rem; font-weight: bold; font-size: 1.1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      🎯 Stack Game
    </a>
    <a href="https://threlte.xyz/" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 1rem 2rem; background: #1e293b; color: white; text-decoration: none; border-radius: 0.5rem; font-weight: bold; font-size: 1.1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      📚 Oficiální dokumentace
    </a>
  </div>
</div>

<h2 id="zdroje">Zdroje</h2>

<ul>
<li><a href="https://threlte.xyz/">Oficiální web Threlte</a></li>
<li><a href="https://github.com/threlte/threlte">Threlte na GitHubu</a></li>
<li><a href="https://threejs.org/">Three.js dokumentace</a></li>
<li><a href="https://svelte.dev/">Svelte dokumentace</a></li>
</ul>
