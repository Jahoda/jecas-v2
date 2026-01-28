# Pokyny pro Claude

## Struktura projektu

- **Články**: `content/posts/*.md` - Markdown soubory s YAML frontmatter
- **Tagy**: `content/tags/*.md` - Definice kategorií
- **Náhledové obrázky**: `static/files/article/*.png` - 200x200 px PNG

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

Náhledové obrázky se generují pomocí Python/Pillow. Obrázek musí být **200x200 px PNG**.

### Styl obrázků

- **Pozadí**: Tmavý gradient (slate/dark blue) - např. `#1e293b` až `#334155`
- **Fonty**: Inter Bold (moderní geometrický sans-serif) — fallback: Liberation Sans Bold
- **Barvy textu**: Bílá `#ffffff` nebo světle šedá `#94a3b8`
- **Akcenty**: Použít barevné badge/tlačítka s `rounded_rectangle`
  - Zelená: `#059669` (pro pozitivní/GET)
  - Modrá: `#2563eb` (pro neutrální/POST)
  - Červená: `#dc2626` (pro varování/chyby)

### Šablona kódu

Pro hladké hrany použít **4× supersampling** (vykreslit ve 800×800, zmenšit na 200×200):

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
    font = ImageFont.truetype("/usr/share/fonts/truetype/inter/Inter-Bold.otf", 24 * scale)
except:
    font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf", 24 * scale)

# Badge s textem (souřadnice × scale)
draw.rounded_rectangle([(20 * scale, 70 * scale), (180 * scale, 130 * scale)], radius=8 * scale, fill='#2563eb')
draw.text((100 * scale, 100 * scale), "TEXT", fill='#ffffff', font=font, anchor='mm')

# Zmenšení s LANCZOS pro hladké hrany
img = img.resize((200, 200), Image.LANCZOS)
img.save('static/files/article/nazev-clanku.png', 'PNG')
```

### Pojmenování

Název souboru = slug článku + `.png`

Příklad: článek `get-vs-post.md` → obrázek `get-vs-post.png`
