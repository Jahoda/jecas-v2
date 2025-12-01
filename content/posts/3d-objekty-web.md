---
title: "Jak vkládat 3D objekty na web"
headline: "Jak vkládat 3D objekty na web pomocí Three.js"
description: "Průvodce vkládáním 3D modelů na web pomocí Three.js. Které formáty použít, jak vytvářet modely pomocí AI a kdy raději použít obrázek nebo video."
date: "2025-12-01"
last_modification: "2025-12-01"
status: 1
tags: ["javascript", "3d", "ai"]
format: "html"
---

<p>3D objekty na webu už dávno nejsou jen technologické demo. Díky moderním technologiím jako <a href="https://threejs.org/">Three.js</a> a WebGL můžete na své stránky přidat interaktivní 3D modely, které uživatelé můžou otáčet, přibližovat a prozkoumávat.</p>

<p>Ale pozor – ne vždy je 3D model tou správnou volbou. Často je lepší použít <b>klasický obrázek nebo video</b> kvůli datové velikosti a výkonu.</p>

<h2 id="kdy-pouzit-3d">Kdy použít 3D objekty</h2>

<p>3D modely dávají smysl, když potřebujete:</p>

<ul>
<li>
  <p><b>Interaktivitu</b> – uživatel může model otáčet a prohlížet ze všech stran (produkty v e-shopu, technické vizualizace)</p>
</li>

<li>
  <p><b>Konfigurátor</b> – změny barev, materiálů nebo částí produktu v reálném čase</p>
</li>

<li>
  <p><b>Vizualisace dat</b> – 3D grafy, mapy, architektury</p>
</li>

<li>
  <p><b>Hry a aplikace</b> – interaktivní zážitky</p>
</li>
</ul>

<p>Další věc je, že je potřeba ten 3D model vytvořit.</p>

<p>Pro <b>jednoduché zobrazení</b> produktu nebo objektu často stačí:</p>

<ul>
<li>
  <p><b>Statický obrázek</b> – nejrychlejší načítání, nejmenší datová velikost</p>
</li>

<li>
  <p><b>Video se smyčkou</b> – rotující produkt, přijatelná velikost, bez interaktivity</p>
</li>

<li>
  <p><b>CSS 3D transformace</b> – jednoduché animace a efekty bez nutnosti načítat velké knihovny</p>
</li>
</ul>

<h2 id="threejs">Three.js – základ pro 3D na webu</h2>

<p><a href="https://threejs.org/">Three.js</a> je jedna z nejpopulárnějších JavaScriptových knihoven pro práci s 3D grafikou na webu. Zjednodušuje práci s WebGL a nabízí jednoduchá API.</p>

<h3 id="zakladni-priklad">Základní příklad</h3>

<p>Jednoduchý příklad načtení a zobrazení 3D modelu:</p>

<pre><code class="language-javascript">import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Vytvoření scény
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Světlo
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Ovládání myší
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

// Načtení 3D modelu
const loader = new GLTFLoader();
loader.load(
  'model.glb',
  (gltf) => {
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error('Chyba při načítání modelu:', error);
  }
);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();</code></pre>

<h2 id="formaty">Formáty 3D souborů</h2>

<p>Pro web se používá několik formátů 3D modelů. Každý má své výhody a nevýhody.</p>

<h3 id="gltf-glb">GLTF / GLB (doporučeno)</h3>

<p><b>GLTF</b> (<i>GL Transmission Format</i>) a jeho binární varianta <b>GLB</b> jsou <b>standardem</b> pro 3D na webu.</p>

<p><b>Výhody:</b></p>
<ul>
<li><p>Optimalizováno pro web</p></li>
<li><p>Malá velikost souborů</p></li>
<li><p>Podpora animací, materiálů a textur</p></li>
<li><p>Nativní podpora v Three.js</p></li>
</ul>

<p><b>GLB vs GLTF:</b></p>
<ul>
<li><p><b>GLB</b> – binární formát, vše v jednom souboru (model + textury)</p></li>
<li><p><b>GLTF</b> – textový formát (JSON), textury jako separátní soubory</p></li>
</ul>

<p><b>Doporučení:</b> Použijte <b>GLB</b> pro co nejjednodušší použití. Pokud máte 3D model v jiném formátu, lze ho převést některým z dostupných nástrojů.</p>

<div class="external-content">
<ul>
<li><p><a href="https://www.blender.org/">Blender</a> – zdarma, otevřený 3D editor</p></li>
<li><p><a href="https://github.com/CesiumGS/obj2gltf">obj2gltf</a> – konverze OBJ → GLTF</p></li>
<li><p><a href="https://products.aspose.app/3d/conversion">Online konvertory</a></p></li>
</ul>
</div>

<h2 id="ai-modely">Vytváření 3D modelů pomocí AI</h2>

<p>Díky moderním AI nástrojům můžete vytvářet 3D modely <b>z textu nebo obrázků</b> během několika minut bez znalostí 3D grafiky:</p>

<p><a href="https://www.meshy.ai/">Meshy.ai</a> – generování 3D modelů z textu nebo obrázků.</p>
<p><a href="https://lumalabs.ai/genie">Luma Labs</a> – vytváření 3D modelů pomocí AI z videa nebo fotek.</p>
<p><a href="https://studio.tripo3d.ai/">Tripo3D</a> – AI generování 3D modelů s podporou riggingu (kostra pro animace).</p>

<h2 id="css-3d">CSS 3D transformace – alternativa pro jednoduché efekty</h2>

<p>Pro jednoduché 3D efekty <b>nepotřebujete Three.js</b>. Použijte CSS 3D transformace.</p>

<h3 id="priklad-css">Příklad – otáčející se karta</h3>

<pre><code class="language-html">&lt;div class="card"&gt;
  &lt;div class="card-inner"&gt;
    &lt;div class="card-front"&gt;Přední strana&lt;/div&gt;
    &lt;div class="card-back"&gt;Zadní strana&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<pre><code class="language-css">.card {
  width: 200px;
  height: 300px;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #fff;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-back {
  transform: rotateY(180deg);
}</code></pre>

<p><b>Použití:</b></p>
<ul>
<li><p>Flip efekty</p></li>
<li><p>3D menu</p></li>
<li><p>Jednoduché animace</p></li>
</ul>

<p>Více o CSS 3D transformacích najdete v článku <a href="/3d-transformace">3D transformace v CSS</a>.</p>

<h2 id="velikost">Datová velikost – kdy raději použít obrázek nebo video</h2>

<p>3D modely mohou být <b>datově náročné</b>. Než se rozhodnete použít 3D model, zvažte alternativy.</p>

<h3 id="srovnani">Srovnání velikostí</h3>

<table>
<thead>
<tr>
  <th>Typ</th>
  <th>Velikost</th>
  <th>Interaktivita</th>
</tr>
</thead>
<tbody>
<tr>
  <td>Statický obrázek (WebP)</td>
  <td>~50 KB</td>
  <td>Ne</td>
</tr>
<tr>
  <td>Video (MP4, 5s smyčka)</td>
  <td>~0,5–2 MB</td>
  <td>Ne</td>
</tr>
<tr>
  <td>3D model (GLB + textury)</td>
  <td>~2-10 MB</td>
  <td>Ano</td>
</tr>
<tr>
  <td>Three.js knihovna</td>
  <td>~600 KB</td>
  <td>–</td>
</tr>
</tbody>
</table>

<p>V praxi to znamená, že <b>jeden interaktivní 3D prvek</b> na stránce může přenášet přibližně <b>3–11 MB dat</b> (optimalizovaný model 2–10 MB + Three.js ~600 KB). Při více modelech nebo větších texturních mapách se tato hodnota rychle násobí, což může být problém hlavně na mobilním připojení.</p>

<h3 id="optimalisace">Optimalizace 3D modelů</h3>

<p>Pokud už musíte použít 3D model, optimalizujte ho:</p>

<ul>
<li>
  <p><b>Decimace geometrie</b> – snižte počet polygonů (v Blenderu: Modifiers → Decimate)</p>
</li>

<li>
  <p><b>Komprese textur</b> – použijte WebP nebo zmenšete rozlišení (512×512 místo 4096×4096)</p>
</li>

<li>
  <p><b>Draco komprese</b> – komprese geometrie v GLTF (až 90% menší soubory)</p>
</li>

<li>
  <p><b>Lazy loading</b> – načítejte model až když je potřeba (při scrollu nebo po kliknutí)</p>
</li>
</ul>

<h3 id="video-alternativa">Video jako alternativa</h3>

<p>Pro <b>neinteraktivní rotující produkt</b> je často lepší video:</p>

<pre><code class="language-html">&lt;video autoplay loop muted playsinline&gt;
  &lt;source src="product-rotation.mp4" type="video/mp4"&gt;
  &lt;source src="product-rotation.webm" type="video/webm"&gt;
&lt;/video&gt;</code></pre>

<p><b>Výhody videa:</b></p>
<ul>
<li><p>Menší velikost než 3D model + knihovna</p></li>
<li><p>Funguje všude bez nutnosti WebGL</p></li>
<li><p>Lepší výkon na slabších zařízeních</p></li>
</ul>

<h2 id="performance">Výkon a kompatibilita</h2>

<p>3D objekty na webu vyžadují slušný hardware. Na starých zařízeních nebo slabších mobilech může být zážitek špatný.</p>

<h3 id="detekce-podpory">Detekce podpory WebGL</h3>

<pre><code class="language-javascript">function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &amp;&amp;
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

if (!isWebGLAvailable()) {
  // Zobraz fallback – obrázek nebo video
  console.log('WebGL není podporováno');
}</code></pre>

<h3 id="progressive-enhancement">Progressive enhancement</h3>

<p>Vždy poskytněte <b>fallback</b> pro zařízení bez WebGL podpory:</p>

<pre><code class="language-html">&lt;div id="model-container"&gt;
  &lt;!-- Fallback obrázek --&gt;
  &lt;img src="product.jpg" alt="Produkt" id="fallback"&gt;
&lt;/div&gt;

&lt;script&gt;
  if (isWebGLAvailable()) {
    // Skryj fallback a načti 3D model
    document.getElementById('fallback').style.display = 'none';
    loadThreeJSModel();
  }
&lt;/script&gt;</code></pre>

<h2 id="zaver">Závěr</h2>

<ul>
<li>
  <p><b>Three.js</b> je jedna z nejpopulárnějších knihoven pro práci s 3D na webu</p>
</li>

<li>
  <p>Používejte <b>GLB/GLTF</b> formát – optimalizovaný pro web</p>
</li>

<li>
  <p>AI nástroje umožňují rychle vytvářet 3D modely, pokud to sami neumíte</p>
</li>

<li>
  <p>Pro jednoduché efekty stačí <b>CSS 3D transformace</b></p>
</li>

<li>
  <p>Často je lepší použít <b>obrázek nebo video</b> kvůli datové velikosti</p>
</li>
</ul>

<p>3D objekty mohou výrazně oživit váš web, ale používejte je s rozvahou. Ne vždy je složitost ospravedlnitelná.</p>
