---
title: "Co je to localForage?"
headline: "Co je to localForage?"
description: "K čemu slouží a jak se používá localForage úložiště."
date: "2014-02-12"
last_modification: "2016-05-05"
status: 1
tags: ["JavaScript", "Frameworky"]
---

Úložiště `localForage` je JS knihovna (velká cca 10 kB zagzipovaná) zjednodušující ukládání dat **na straně klienta**.

    - Mozilla: [localForage](http://mozilla.github.io/localForage/#localforage)

Pro ukládání dat do prohlížeče existují 4 způsoby:

  - `IndexedDB`,

  - `WebSQL`,

  - [`localStorage`](/localstorage),

  - [cookies](/cookies)

Do cookies lze rozumně ukládat maximálně 4 kB dat, která se přenáší při každém požadavku na server, proto se pro větší data příliš nehodí. `IndexedDB` a `WebSQL` nejsou úplně dobře podporované napříč prohlížeči a nemají úplně přívětivé API.

Lokální úložiště se používá elegantně, ale **není asynchronní** (takže blokuje provádění kódu, než se z disku získají data). Taktéž do něj nelze ukládat binární data.

Knihovna `localForage` tedy přináší výhody asynchronních `IndexedDB`/`WebSQL` s rozhraním jako má `localStorage`. Úložiště `localStorage` se používá jako záložní způsob pro starší prohlížeče.

## Odkazy jinam

  - [localForage: Offline Storage, Improved](https://hacks.mozilla.org/2014/02/localforage-offline-storage-improved/)

  - MDN: [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

  - [IndexedDB, WebSQL, LocalStorage – what blocks the DOM?](http://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/) – IndexedDB blokuje DOM více než localStorage