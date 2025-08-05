---
title: "Vue.js"
headline: "Vue.js"
description: ""
date: "2020-03-02"
last_modification: "2020-03-02"
status: 0
tags: []
format: "html"
---

<h2 id="model">Model <code>v-model</code></h2>

<pre><code>&lt;input v-model="hodnota">
Hodnota políčka je: {{ hodnota }}</code></pre>

<p>Ekvivalentní zápis je:</p>

<pre><code>&lt;input
  v-bind:value="hodnota"
  v-on:input="hodnota = $event.target.value"
></code></pre>


<h2 id="if-else">Podmínky</h2>

<p>Pro podmínky existují atributy <code>v-if</code>, <code>v-else</code> a <code>v-else-if</code>:</p>

<pre><code>&lt;div v-if="neco === 'A'">
  A
&lt;/div>
&lt;div v-else-if="neco === 'B'">
  B
&lt;/div>
&lt;div v-else>
  Něco jiného
&lt;/div></code></pre>





<p>Lze je používat i na značku <code>&lt;template></code>, pokud není potřeba mít v DOMu další element.</p>

<h3 id="v-show">„Podmínka“ <code>v-show</code></h3>

<p>Zvláštní případ podmínky je atribut <code>v-show</code>, ten (ne)zobrazuje element změnou CSS.</p>

<p>Podmínky <code>v-if</code>, <code>v-else</code> a <code>v-else-if</code> způsobují skutečnou změnu DOMu.</p>

<p>Z toho plyne poučka pro rozhodování mezi <code>v-if</code> a <code>v-show</code>:</p>

<p>Skrývání/odkrývání je rychlejší přes <code>v-show</code> (nemusí se vyměňovat elementy v DOMu.)</p>

<p>Prvotní vykreslení je rychlejší s <code>v-if</code>, protože se nemusí vytvořit část DOMu s neviditelnými elementy.</p>

<p>Z toho plyne nefunkčnost podmínky <code>v-show</code> u značky <code>&lt;template></code>, protože se tato značka při buildu zahazuje.</p>

<h2 id="validace">Validace formulářů</h2>


<h2 id="editory">Jaký editor pro Vue.js použít</h2>

<h3 id="vs-code">VS Code</h3>

<p>Pluginy:</p>

<div class="external-content">
  <ul>
    <li>
        <a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur">Vetur</a>
    </li>
    <li>
        <a href="https://marketplace.visualstudio.com/items?itemName=znck.vue-language-features">VueDX</a>
    </li>
    <li>
        <a href="https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar">Vue 3</a>
    </li>    
  </ul>
</div>