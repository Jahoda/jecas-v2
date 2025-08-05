---
title: "Počítání v CSS funkcí calc()"
headline: "Počítání v CSS pomocí <code>calc()</code>"
description: "Od Exploreru 9 a mimo starou Operu 12 lze přímo v CSS provádět jednoduché výpočty využitím <code>calc()</code>."
date: "2013-06-06"
last_modification: "2013-06-10"
status: 1
tags: ["css", "css-funkce"]
format: "html"
---

<p>Tato vlastnost se zadává jako hodnota obyčejné CSS vlastnosti:
<pre><code>element {width: <b>calc(5px + 1em)</b>}</code></pre>

<h2>Využití</h2>
<p>Jak příklad výše napovídá, užitečná je možnost sčítat a odčítat (samozřejmě násobit i dělit) napříč různými jednotkami. 

<p>Lze tak elegantněji vyřešit:
<ol>
<li><b>Problém sčítání <code>width</code> a <code>padding</code>u v obsahovém boxmodelu</b> (výchozí ve standardním režimu), kdy není elegantně řešitelná procentuální šířka a <code>padding</code> třeba v pixelech. (Musí se používat další obal jen pro <code>padding</code> a podobně.)
<pre><code>element {width: 70%; padding: 10px}</code></pre>

<p>V prohlížeči podporující <code>calc</code> bude <font color=blue><b>modrý</b></font> a <font color=green><b>zelený</b></font> pruh stejně široký.
<!-- Ukázka -->
<style>
.live .test {width: 70%; background: green; color: #fff}
.live .padding {width: 70%; padding: 10px; background: red}
.live .calc {width: calc(70% - 10px * 2); background: blue}
</style>

<div class=live>
<div class='test padding'><code>{width: 70%; padding: 10px}</code></div>
<div class='test padding calc'><code>{width: calc(70% - 10px * 2); padding: 10px}</code></div>
<div class='test'><code>{width: 70%}</code></div>
</div>

<!-- / konec ukázky -->

<li><b>Vodorovné centrování</b> absolutním posicováním vypadá nějak takto:
<pre><code>element {position: absolute; left: 50%; width: 100px; margin-left: -50px}</code></pre>
<p>Využitím <code>calc()</code> lze rovnou zadat hodnotu <code>left</code> (50 % minus polovina šířky, tj. 100 px).
<pre><code>element {position: absolute; left: calc(50% - 100px / 2); width: 100px}</code></pre>
  <p>Obdobný způsob lze použít třeba i pro <code>background-image</code>.</p>

  <li><b>Počítání z lenosti</b> – u nekulatých čísel je jejich ruční dopočítávání zdlouhavé a z výsledného čísla není úplně jasné, jak se k němu došlo. Tohle ale mohou už dnes nahradit CSS preprocesory, byť pochopitelně neumí počítat napříč jednotkami.</li>
</ol>
  
  

<h2 id="starsi">Starší prohlížeče</h2>

<p>V <b>nepodporovaných prohlížečích</b> jde využít toho, že tyto prohlížeče hodnotu s <code>calc()</code> budou ignorovat.</p>

<p>Jde tedy zadat napřed nějakou přibližnou hodnotu a následně použít výpočet:</p>

<pre><code>width: 33.3333%;
width: calc(100% / 3);</code></pre>

<p>Tento <i>fallback</i> pro starší prohlížeče může jít zautomatisovat CSS postprocesorem. Pochopitelně s omezenými možnostmi, protože sčítat <b>hodnoty s různými jednotkami</b> jde přesně pouze v prohlížeči.</p>


<div class="external-content">
  <ul>
    <li><a href="http://cssnext.io/">cssnext</a> – CSS postprocesor umožňující používat zápisy „z budoucnosti“ už nyní</li>
  </ul>
</div>

<h2 id=zdroje>Zdroje a související odkazy</h2>
<ul>
<li>Historie funkcí pro počítání – <a href='http://www.webylon.info/K.41'>Webylon: Vypočítavý pokrok</a>
<li>Specifikace: <a href='http://www.w3.org/TR/css3-values/#calc-notation'>W3C: CSS Values and Units Module Level 3</a>
</ul>