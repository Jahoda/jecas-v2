---
title: "Prerenderování stránky ve Vue.js"
headline: "Prerenderování stránky ve Vue.js"
description: "Jak vygenerovat statické stránky ve Vue.js."
date: "2019-06-21"
last_modification: "2019-06-21"
status: 0
tags: []
format: "html"
---

<h2 id="ssr-prerender">SSR, nebo prerenderování?</h2>

<h3 id="cli">vue-cli-plugin-prerender-spa</h3>

<p>Konfigurace z příkazové řádky:</p>

<ul>
  <li><a href="https://github.com/SolarLiner/vue-cli-plugin-prerender-spa">vue-cli-plugin-prerender-spa</a></li>
</ul>

<h2 id="prerender-spa-plugin">Prerender SPA Plugin</h2>


<pre><code>npm i prerender-spa-plugin</code></pre>

<h3 id="hydratace">Hydratace</h3>

<ul>
  <li><a href="https://ssr.vuejs.org/guide/hydration.html">Client Side Hydration</a></li>
</ul>

<h3 id="event">Událost po vyrenderování</h3>

<h4><code>main.js</code></h4>

<pre><code>new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted: () => {
    <b>document.dispatchEvent(new Event('render-event'))</b>
  }
}).$mount('#app')</code></pre>
























<h4><code>vue.config.js</code></h4>

<pre><code>const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const routeList = require('./src/router/routes/prerenderRouteList')

module.exports = {
  productionSourceMap: false,
  assetsDir: 'assets',
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        renderAfterDocumentEvent: 'render-event',
        // Required - Routes to render.
        routes: routeList,
        postProcess: route => {
          // Defer scripts and tell Vue it's been server rendered to trigger hydration
          route.html = route.html
            .replace(/&lt;script (.*?)>/g, '&lt;script $1 defer>')
            .replace('id="app"', 'id="app" data-server-rendered="true"')
          return route
        }
      })
    ]
  }
}
</code></pre>


























<h4 id="layout"><code>AppLayout.vue</code></h4>

<pre><code>&lt;template>
  <b>&lt;div id="app"></b>
    &lt;div class="page-wrapper">
      …
  &lt;/div>
&lt;/template></code></pre>

<h2 id="nginx">Nastavení nginx serveru</h2>

<pre><code>location / {
    add_header Cache-Control "no-store, no-cache, must-revalidate";
    try_files $uri $uri/index.html $uri.html /index.html =404;
}</code></pre>


<h2 id="docker">Docker</h2>

<pre><code>FROM node:latest as builder

# Install headless Chrome dependecies for puppeteer staic page prerender
RUN apt-get update
RUN apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget</code></pre>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://markus.oberlehner.net/blog/how-to-pre-render-vue-powered-websites-with-webpack/">How to Pre-render Vue.js Powered Websites With webpack</a></li>
</ul>