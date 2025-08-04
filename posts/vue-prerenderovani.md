---
title: "Prerenderování stránky ve Vue.js"
headline: "Prerenderování stránky ve Vue.js"
description: "Jak vygenerovat statické stránky ve Vue.js."
date: "2019-06-21"
last_modification: "2019-06-21"
status: 0
tags: []
---

## SSR, nebo prerenderování?

### vue-cli-plugin-prerender-spa

Konfigurace z příkazové řádky:

  - [vue-cli-plugin-prerender-spa](https://github.com/SolarLiner/vue-cli-plugin-prerender-spa)

## Prerender SPA Plugin

```
npm i prerender-spa-plugin
```

### Hydratace

  - [Client Side Hydration](https://ssr.vuejs.org/guide/hydration.html)

### Událost po vyrenderování

#### `main.js`

```
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted: () => {
    **document.dispatchEvent(new Event('render-event'))**
  }
}).$mount('#app')
```

#### `vue.config.js`

```
const path = require('path')
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

```

#### `AppLayout.vue`

```
&lt;template>
  **&lt;div id="app">**
    &lt;div class="page-wrapper">
      …
  &lt;/div>
&lt;/template>
```

## Nastavení nginx serveru

```
location / {
    add_header Cache-Control "no-store, no-cache, must-revalidate";
    try_files $uri $uri/index.html $uri.html /index.html =404;
}
```

## Docker

```
FROM node:latest as builder

# Install headless Chrome dependecies for puppeteer staic page prerender
RUN apt-get update
RUN apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

## Odkazy jinam

  - [How to Pre-render Vue.js Powered Websites With webpack](https://markus.oberlehner.net/blog/how-to-pre-render-vue-powered-websites-with-webpack/)