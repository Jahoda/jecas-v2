# Pokyny pro Claude

## Struktura projektu

- **Články**: `content/posts/*.md` - Markdown soubory s YAML frontmatter
- **Tagy**: `content/tags/*.md` - Definice kategorií
- **Náhledové obrázky**: `static/files/article/*.svg` a `*.png` - 200x200 px

## Vytváření článků

### Frontmatter

```yaml
---
title: 'Krátký název'
headline: 'SEO titulek'
description: 'Meta popis 1-2 věty.'
date: 'YYYY-MM-DD'
status: 1
tags: ['tag1', 'tag2']
format: 'html'
---
```

### Obsah

- Formát: HTML
- Použít sémantické značky: `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<table>`, `<pre><code>`
- Každý `<h2>` by měl mít `id` pro odkazy
- Odkazy na jiné články: `<a href="/slug-clanku">text</a>`

## Generování náhledových obrázků

Pro nové články se vytvářejí **oba formáty** - SVG i PNG (200×200 px):

- **SVG** - primární formát zobrazovaný na webu (vektorový, ostrý na všech rozlišeních)
- **PNG** - fallback pro starší prohlížeče a pro Open Graph karty (sociální sítě nepodporují SVG)

### Styl obrázků

- **Pozadí**: Tmavý gradient (slate/dark blue) - např. `#1e293b` až `#334155`
- **Fonty**: Liberation Sans Bold nebo DejaVu Sans Bold
- **Barvy textu**: Bílá `#ffffff` nebo světle šedá `#94a3b8`
- **Akcenty**: Použít barevné badge/tlačítka s `rounded_rectangle`
  - Zelená: `#059669` (pro pozitivní/GET)
  - Modrá: `#2563eb` (pro neutrální/POST)
  - Červená: `#dc2626` (pro varování/chyby)

### PNG šablona (fallback)

Pro PNG použít **4× supersampling** (vykreslit ve 800×800, zmenšit na 200×200):

```python
from PIL import Image, ImageDraw, ImageFont

# 4× supersampling pro anti-aliasing
scale = 4
size = 200 * scale

img = Image.new('RGB', (size, size), '#1e293b')
draw = ImageDraw.Draw(img)

# Gradient pozadí
for y in range(size):
    r = int(30 + (y / size * 30))
    g = int(41 + (y / size * 40))
    b = int(59 + (y / size * 50))
    draw.line([(0, y), (size, y)], fill=(r, g, b))

# Font (velikost × scale)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf", 24 * scale)
except:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24 * scale)

# Badge s textem (souřadnice × scale)
draw.rounded_rectangle([(20 * scale, 70 * scale), (180 * scale, 130 * scale)], radius=8 * scale, fill='#2563eb')
draw.text((100 * scale, 100 * scale), "TEXT", fill='#ffffff', font=font, anchor='mm')

# Zmenšení s LANCZOS pro hladké hrany
img = img.resize((200, 200), Image.LANCZOS)
img.save('static/files/article/nazev-clanku.png', 'PNG')
```

### SVG šablona

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b"/>
      <stop offset="100%" style="stop-color:#334155"/>
    </linearGradient>
  </defs>

  <!-- Pozadí -->
  <rect width="200" height="200" fill="url(#bg)"/>

  <!-- Badge -->
  <rect x="20" y="70" width="160" height="60" rx="8" fill="#2563eb"/>

  <!-- Text -->
  <text x="100" y="105" text-anchor="middle" fill="#ffffff"
        font-family="Liberation Sans, DejaVu Sans, sans-serif"
        font-size="24" font-weight="bold">TEXT</text>
</svg>
```

### Pojmenování

Název souborů = slug článku + přípona

Příklad: článek `get-vs-post.md` → `get-vs-post.svg` + `get-vs-post.png`
