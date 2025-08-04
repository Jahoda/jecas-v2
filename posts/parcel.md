---
title: "Parcel"
headline: "Parcel"
description: "Build JS pomocí nástroje Parcel."
date: "2019-04-08"
last_modification: "2019-04-08"
status: 0
tags: []
---

## Safe Write

```
Cannot read property 'type' of undefined
```

  - [Safe Write](https://parceljs.org/hmr.html#safe-write)

## Globální funkce

### `fytopuf.js`

```
var fytopuf = function () {
	alert(1)
}

export default (() => {
	window.fytopuf = fytopuf
})()

```

### `index.js`

```
import fytopuf  from './fytopuf'
window.fytopuf = fytopuf
```

## jQuery

Soubor `import-jquery.js`:

```
import jquery from "jquery"
window.$ = window.jQuery = jquery
```

A v `index.js` připojit:

```
import './import-jquery'
```

## Esbuild

  - [esbuild](https://github.com/evanw/esbuild/)