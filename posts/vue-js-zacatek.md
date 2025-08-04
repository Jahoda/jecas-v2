---
title: "Jak použít Vue.js na existujícím projektu"
headline: "Jak použít Vue.js na existujícím projektu"
description: "Vue.js je populární JS knihovna, kterou lze použít pro SPA nebo i jako náhradu jQuery."
date: "2018-07-26"
last_modification: "2018-07-26"
status: 0
tags: []
---

## Vue CLI

Nejsnazší způsob, jak s Vue.js rozumně začít, je použít Vue CLI. Nainstaluje se příkazem.

```
npm install -g @vue/cli
```

Po dokončení instalace stačí napsat:

```
vue ui
```

A spustí se pěkné webové rozhraní, kde jde naklikat nový projekt.

Touto webovou aplikací jde takřka plnohodnotně nastavovat a ovládat celý build proces.

## Připojení do stránky

Pro maximální komfort vývoje je dobré mít automatické obnovování.

Vue.js aplikace standardně běží na URL typu `http://localhost:8080/` a balík s obsahem (JS i CSS) na URL: `http://localhost:8080/app.js`. Pro vývoj je vhodné do existující aplikace připojit právě soubor `app.js`, čímž se zajistí automatické obnovování po každé úpravě.

Aby to fungovalo, je třeba povolit requesty mezi různými URL nastavením hlavičky `Access-Control-Allow-Origin`. Toho jde docílit nastavením Webpacku, konkrétně úpravou souboru `vue.config.js`:

```
module.exports = {
  …
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
```

### Připojení skriptu

Připojit výše uvedený JS soubor je vhodné pouze při vývoji.

```
{if $environmentType === 'dev'}
    &lt;script n:if="$scriptUrl" src="{$scriptUrl}">&lt;/script>
{/if}
```

Pro produkční použití se po spuštění `npm run build` vybuildí samostatné soubory pro CSS i JS do složky `dist`.

### Úprava HTML

Část stránky, kde je žádoucí Vue používat, je potřeba obalit do `&lt;div>`u:

```
&lt;div id="app">
  Obsah stránky
&lt;/div
```

Na tuto oblast se potom aplikují potřebné komponenty (v souboru `main.js`):

```
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

new Vue({
  components: {
    HelloWorld
  }
}).$mount('#app')
```