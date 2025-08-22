---
title: Převod SVG do PNG
description: Nástroj pro převod SVG souborů nebo textu do PNG formátu s možností nastavení rozměrů a pozadí
date: 2024-12-19
tags: [svg, png, konverze, nástroje]
---

<h1 id="prevod-svg-do-png">Převod SVG do PNG</h1>

<p>Nástroj pro snadný převod SVG souborů nebo textu do PNG formátu s pokročilými funkcemi. Podporuje automatickou detekci rozměrů, šachovnicové pozadí pro náhled a okamžitý převod.</p>

<h2 id="funkce">Funkce</h2>

<ul>
    <li><strong>Nahrávání SVG souborů</strong> - jednoduše nahrajte .svg soubor</li>
    <li><strong>Vkládání SVG textu</strong> - zkopírujte a vložte SVG kód</li>
    <li><strong>Automatická detekce rozměrů</strong> - rozměry se automaticky načtou z SVG obsahu</li>
    <li><strong>Nastavitelná velikost</strong> - zvolte šířku a výšku výstupního obrázku</li>
    <li><strong>Šachovnicové pozadí</strong> - pro lepší viditelnost transparentních oblastí v náhledu</li>
    <li><strong>Barva pozadí</strong> - nastavte barvu pozadí pro stažený PNG obrázek</li>
    <li><strong>Okamžitý náhled</strong> - automatický převod při změnách</li>
    <li><strong>Stažení</strong> - stáhněte PNG soubor s pevnou barvou pozadí</li>
</ul>

<h2 id="jak-pouzivat">Jak používat</h2>

<ol>
    <li><strong>Nahrajte SVG soubor</strong> - klikněte na tlačítko pro výběr souboru a vyberte .svg soubor</li>
    <li><strong>Nebo vložte SVG text</strong> - zkopírujte SVG kód a vložte ho do textového pole</li>
    <li><strong>Rozměry se automaticky detekují</strong> - šířka a výška se načtou z SVG obsahu</li>
    <li><strong>Nastavte parametry</strong> - upravte rozměry, zvolte pozadí (šachovnicové nebo barva)</li>
    <li><strong>Náhled se zobrazí automaticky</strong> - obrázek se převede okamžitě</li>
    <li><strong>Stáhněte</strong> - klikněte na tlačítko pro stažení PNG souboru</li>
</ol>

<h2 id="priklad-svg-kodu">Příklad SVG kódu</h2>

<pre><code class="language-svg">&lt;svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"&gt;
  &lt;circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /&gt;
&lt;/svg&gt;</code></pre>

<h2 id="technicke-reseni-prevodu-svg-do-png">Technické řešení převodu SVG do PNG</h2>

<p>Převod SVG do PNG probíhá pomocí HTML5 Canvas API v čistém JavaScriptu. Zde je detailní popis procesu:</p>

<h3 id="detekce-rozmeru-svg">1. Detekce rozměrů SVG</h3>

<pre><code class="language-javascript">function detectSvgDimensions(svgContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');
    
    if (!svgElement) return null;

    let detectedWidth = svgElement.getAttribute('width');
    let detectedHeight = svgElement.getAttribute('height');
    let viewBox = svgElement.getAttribute('viewBox');

    // Fallback na viewBox pokud width/height nejsou definovány
    if (viewBox) {
        const viewBoxParts = viewBox.split(' ');
        if (viewBoxParts.length === 4) {
            const [, , vbWidth, vbHeight] = viewBoxParts;
            if (!detectedWidth) detectedWidth = vbWidth;
            if (!detectedHeight) detectedHeight = vbHeight;
        }
    }

    if (detectedWidth && detectedHeight) {
        const widthNum = parseFloat(detectedWidth);
        const heightNum = parseFloat(detectedHeight);
        
        if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0 && heightNum > 0) {
            return { width: Math.round(widthNum), height: Math.round(heightNum) };
        }
    }

    return null;
}</code></pre>

<h3 id="vykresleni-sachovnicoveho-pozadi">2. Vykreslení šachovnicového pozadí</h3>

<pre><code class="language-javascript">function drawCheckerboard(ctx, width, height) {
    const tileSize = 20;
    const lightColor = '#ffffff';
    const darkColor = '#e0e0e0';

    for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
            const isEvenRow = Math.floor(y / tileSize) % 2 === 0;
            const isEvenCol = Math.floor(x / tileSize) % 2 === 0;
            const shouldBeDark = isEvenRow ? isEvenCol : !isEvenCol;

            ctx.fillStyle = shouldBeDark ? darkColor : lightColor;
            ctx.fillRect(x, y, tileSize, tileSize);
        }
    }
}</code></pre>

<h3 id="hlavni-funkce-prevodu">3. Hlavní funkce převodu</h3>

<pre><code class="language-javascript">async function convertSvgToPng() {
    // Vytvoření canvas elementu
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Nastavení rozměrů canvasu
    canvas.width = width;
    canvas.height = height;

    // Vykreslení pozadí
    if (showCheckerboard) {
        drawCheckerboard(ctx, width, height);
    } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
    }

    // Vytvoření SVG blob a URL
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    // Načtení SVG jako obrázek
    const img = new Image();
    
    img.onload = () => {
        // Vykreslení SVG na canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Konverze na PNG data URL
        const pngDataUrl = canvas.toDataURL('image/png');
        
        // Uvolnění URL
        URL.revokeObjectURL(url);
        
        // Zobrazení výsledku
        outputImage = pngDataUrl;
    };

    img.onerror = () => {
        URL.revokeObjectURL(url);
        throw new Error('Chyba při načítání SVG');
    };

    img.src = url;
}</code></pre>

<h3 id="stazeni-s-pevnou-barovou-pozadi">4. Stažení s pevnou barvou pozadí</h3>

<pre><code class="language-javascript">async function downloadImage() {
    // Vytvoření nového canvasu pro stažení
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;

    // Vždy použít pevnou barvu pozadí pro stažení
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Vykreslení SVG
    const img = new Image();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        const downloadDataUrl = canvas.toDataURL('image/png');
        
        // Stažení souboru
        const link = document.createElement('a');
        link.download = 'converted-image.png';
        link.href = downloadDataUrl;
        link.click();
        
        URL.revokeObjectURL(url);
    };

    img.src = url;
}</code></pre>

<h2 id="klicove-technicke-aspekty">Klíčové technické aspekty</h2>

<h3 id="canvas-api">Canvas API</h3>
<ul>
    <li><strong>2D Context</strong>: Používá <code>getContext('2d')</code> pro vykreslování</li>
    <li><strong>Rozměry</strong>: Canvas se nastavuje na požadovanou šířku a výšku</li>
    <li><strong>Vykreslování</strong>: SVG se vykresluje pomocí <code>drawImage()</code></li>
</ul>

<h3 id="svg-zpracovani">SVG zpracování</h3>
<ul>
    <li><strong>DOMParser</strong>: Parsuje SVG string do DOM objektu</li>
    <li><strong>Blob</strong>: Vytváří blob z SVG obsahu pro načtení jako obrázek</li>
    <li><strong>URL.createObjectURL</strong>: Generuje URL pro blob</li>
</ul>

<h3 id="pozadi">Pozadí</h3>
<ul>
    <li><strong>Šachovnicové</strong>: Pro náhled transparentních oblastí</li>
    <li><strong>Pevná barva</strong>: Pro stažený soubor</li>
    <li><strong>Dva režimy</strong>: Náhled vs. stažení</li>
</ul>

<h3 id="optimalizace">Optimalizace</h3>
<ul>
    <li><strong>Debouncing</strong>: Pro text input (500ms zpoždění)</li>
    <li><strong>Memory management</strong>: Uvolňování URL objektů</li>
    <li><strong>Error handling</strong>: Zachytávání chyb při načítání</li>
</ul>

<h2 id="omezeni">Omezení</h2>

<ul>
    <li>Maximální velikost: 4000 × 4000 px</li>
    <li>Podporuje pouze standardní SVG formát</li>
    <li>Převod probíhá v prohlížeči (klientská strana)</li>
    <li>Šachovnicové pozadí pouze pro náhled</li>
</ul>

<p><a href="/nastroje/prevod-svg">Zkusit nástroj</a></p>
