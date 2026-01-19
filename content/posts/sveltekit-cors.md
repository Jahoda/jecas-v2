---
title: "SvelteKit API dostupné z cizí domény"
headline: "SvelteKit API dostupné z cizí domény"
description: "Jak povolit přístup na API vytvořené ve SvelteKitu z jiné domény."
date: "2023-02-16"
last_modification: "2025-08-30"
status: 1
tags: ["js", "ts"]
format: "html"
---

<p><a href="https://kit.svelte.dev">SvelteKit</a> je komplexní nástroj pro vytváření webů.</p>

<p>Jednak umožňuje vytvářet skvelá uživatelská rozhraní ve <b>Svelte</b>, ale kromě toho řešit i renderování na straně serveru a další věci – například vytvářet API endpointy.</p>

<p>To jde velmi jednoduše umístěním souboru <code>+server.ts</code> např. do složky <code>routes/api/test</code>.</p>

<p>Automatický router založený na souborovém systému se postará o to, že vznikne endpoint <code>https://example.com/api/test</code>. Obsah souboru může být následující:</p>

<pre><code>import { json } from '@sveltejs/kit';

export async function GET() {
	return json({ test: 'ok' });
}</code></pre>










<p>Při navštívení adresy <code>https://example.com/api/test</code> se zobrazí výstup <code>{"test":"ok"}</code>.</p>


<h2 id="cors">Nastavení CORS</h2>

<p>Pro umožnění získání dat z cizí domény je potřeba použít tzv. <a href="https://kit.svelte.dev/docs/hooks#server-hooks">hook</a>.</p>

<p>Jde o soubor <code>hooks.server.ts</code> (umístěný rovnou ve složce <code>src</code>), který umožňuje modifikovat reqesty.</p>

<p>V tomto případě přidá potřebnou hlavičku <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin"><code>Access-Control-Allow-Origin</code></a>, pokud doména volající SvelteKit vyhoví regulárnímu výrazu <code>/^(.*)?\.?example\.com$/</code>:</p>

<pre><code>import type { Handle } from '@sveltejs/kit';

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
</code></pre>

<p>Pro otestování se hodí nástroj <a href="https://cors-test.codehappy.dev">CORS Tester</a>.</p>
