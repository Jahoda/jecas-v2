---
title: "Jak použít Vue.js na existujícím projektu"
headline: "Jak použít Vue.js na existujícím projektu"
description: "Vue.js je populární JS knihovna, kterou lze použít pro SPA nebo i jako náhradu jQuery."
date: "2018-07-26"
last_modification: "2018-07-26"
status: 0
tags: []
format: "html"
---

<!-- -->


<h2 id="vue-cli">Vue CLI</h2>

<p>Nejsnazší způsob, jak s Vue.js rozumně začít, je použít Vue CLI. Nainstaluje se příkazem.</p>

<pre><code>npm install -g @vue/cli</code></pre>






<p>Po dokončení instalace stačí napsat:</p>




<pre><code>vue ui</code></pre>

<p>A spustí se pěkné webové rozhraní, kde jde naklikat nový projekt.</p>





<p>Touto webovou aplikací jde takřka plnohodnotně nastavovat a ovládat celý build proces.</p>






<h2 id="pripojeni">Připojení do stránky</h2>


<p>Pro maximální komfort vývoje je dobré mít automatické obnovování.</p>


<p>Vue.js aplikace standardně běží na URL typu <code>http://localhost:8080/</code> a balík s obsahem (JS i CSS) na URL: <code>http://localhost:8080/app.js</code>. Pro vývoj je vhodné do existující aplikace připojit právě soubor <code>app.js</code>, čímž se zajistí automatické obnovování po každé úpravě.</p>

<p>Aby to fungovalo, je třeba povolit requesty mezi různými URL nastavením hlavičky <code>Access-Control-Allow-Origin</code>. Toho jde docílit nastavením Webpacku, konkrétně úpravou souboru <code>vue.config.js</code>:</p>



<pre><code>module.exports = {
  …
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}</code></pre>












<h3 id="skript">Připojení skriptu</h3>

<p>Připojit výše uvedený JS soubor je vhodné pouze při vývoji.</p>

<pre><code>{if $environmentType === 'dev'}
    &lt;script n:if="$scriptUrl" src="{$scriptUrl}">&lt;/script>
{/if}</code></pre>









<p>Pro produkční použití se po spuštění <code>npm run build</code> vybuildí samostatné soubory pro CSS i JS do složky <code>dist</code>.</p>



<h3 id="html">Úprava HTML</h3>

<p>Část stránky, kde je žádoucí Vue používat, je potřeba obalit do <code>&lt;div></code>u:</p>

<pre><code>&lt;div id="app">
  Obsah stránky
&lt;/div</code></pre>









<p>Na tuto oblast se potom aplikují potřebné komponenty (v souboru <code>main.js</code>):</p>

<pre><code>import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

new Vue({
  components: {
    HelloWorld
  }
}).$mount('#app')</code></pre>