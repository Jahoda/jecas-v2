---
title: "Dynamické generování OG obrázků"
headline: "Dynamické generování OG obrázků"
description: "Jak generovat náhledové obrázky z HTML."
date: "2023-03-13"
last_modification: "2023-03-13"
status: 0
tags: []
---

Pro sdílení odkazů na různých webových stránkách se hodí řešit jejich [náhledy](/nahled-odkazu).

Zejména sociální sítě se pro odkaz snaží dotáhnout další informace a nabídnout tak zajímavější náhled.

Ustálilo se k tomu používat [Open Graph protocol](https://ogp.me):

```
&lt;meta property="og:url" content="https://jecas.cz/ai-programovani">
&lt;meta property="og:title" content="10+ věcí, jak AI pomáhá při programování">
&lt;meta property="og:description" content="AI dokáže výrazně zvýšit efektivitu programátora. Nevezme mu ale práci?">
&lt;meta property="og:image" content="https://jecas.cz/files/article/ai-programovani.png">
```

Hezčí/poutavější náhledy mohou vést k **zvýšení návštěvnosti**. Proto není špatné jim věnovat trochu péče.

U převážně textového obsahu může být problém s jejich vytvářením.

První možnost je pro ruční vytvoření obrázku použít [grafický program](/sw-obrazky).

    Zajímavý způsob může být nechat obrázky generovat [umělou inteligenci](/ai-programovani).

    Pro více automatické řešení se hodí náhledový obrázek řešit v HTML.

## Převod HTML na obrázek

Trik tkví v tom, že se náhledový obrázek vyskládá v HTML/CSS, a potom převede na **skutečný obrázek**.

K tomu jde použít třeba [puppeteer](https://github.com/puppeteer/puppeteer), který rozjde headless Chrome, a dokáže tak dělat screenshoty stránek.

Výrazně zajímavější je ale [Satori](https://github.com/vercel/satori) od [Vercelu](https://vercel.com), které se obejde bez Chrome, a dokáže obrázek **vytvořit za pár milisekund**.

      [OG Image Playground](https://og-playground.vercel.app)

Podporuje všechny běžné CSS vlastnosti. Jde vkládat i obrázky nebo používat emoji. Nebo i připojit externí fonty.

## Odkazy

    Vercel: [Open Graph (OG) Image Generation](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)

    [Introducing OG Image Generation: Fast, dynamic social card images at the Edge](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images)

    [Create dynamic social card images with Svelte components](https://geoffrich.net/posts/svelte-social-image/)

    [Dynamic OG image with SvelteKit and Satori](https://dev.to/theether0/dynamic-og-image-with-sveltekit-and-satori-4438)