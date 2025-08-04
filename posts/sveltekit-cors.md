---
title: "SvelteKit API dostupné z cizí domény"
headline: "SvelteKit API dostupné z cizí domény"
description: "Jak povolit přístup na API vytvořené ve SvelteKitu z jiné domény."
date: "2023-02-16"
last_modification: "2023-02-16"
status: 0
tags: []
---

[SvelteKit](https://kit.svelte.dev) je komplexní nástroj pro vytváření webů.

Jednak umožňuje vytvářet skvelá uživatelská rozhraní ve **Svelte**, ale kromě toho řešit i renderování na straně serveru a další věci – například vytvářet API endpointy.

To jde velmi jednoduše umístěním souboru `+server.ts` např. do složky `routes/api/test`.

Automatický router založený na souborovém systému se postará o to, že vznikne endpoint `https://example.com/api/test`. Obsah souboru může být následující:

```
import { json } from '@sveltejs/kit';

export async function GET() {
	return json({ test: 'ok' });
}
```

Při navštívení adresy `https://example.com/api/test` se zobrazí výstup `{"test":"ok"}`.

## Nastavení CORS

Pro umožnění získání dat z cizí domény je potřeba použít tzv. [hook](https://kit.svelte.dev/docs/hooks#server-hooks).

Jde o soubor `hooks.server.ts` (umístěný rovnou ve složce `src`), který umožňuje modifikovat reqesty.

V tomto případě přidá potřebnou hlavičku [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin), pokud doména volající SvelteKit vyhoví regulárnímu výrazu `/^(.*)?\.?example\.com$/`:

```
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const allowedDomains = /^(.*)?\.?example\.com$/;
	let cors: string | null = null;
	const requestOrigin = event.request.headers.get('origin') || '';

	if (allowedDomains.test(requestOrigin)) {
		cors = requestOrigin;
	}

	const response = await resolve(event);

	if (cors &amp;&amp; event.url.pathname.startsWith('/api')) {
		response.headers.append('Access-Control-Allow-Origin', cors);
	}

	return response;
}) satisfies Handle;

```