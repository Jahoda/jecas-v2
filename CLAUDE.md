# Pokyny pro Claude

## Struktura projektu

- **Články**: `content/posts/*.md` - Markdown soubory s YAML frontmatter
- **Tagy**: `content/tags/*.md` - Definice kategorií
- **Náhledové obrázky**: `static/files/article/*.png` - 100x100 px PNG

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

Náhledové obrázky se generují pomocí Python/Pillow. Obrázek musí být **100x100 px PNG**.

### Styl obrázků

- **Pozadí**: Tmavý gradient (slate/dark blue) - např. `#1e293b` až `#334155`
- **Fonty**: Liberation Sans Bold nebo DejaVu Sans Bold
- **Barvy textu**: Bílá `#ffffff` nebo světle šedá `#94a3b8`
- **Akcenty**: Použít barevné badge/tlačítka s `rounded_rectangle`
  - Zelená: `#059669` (pro pozitivní/GET)
  - Modrá: `#2563eb` (pro neutrální/POST)
  - Červená: `#dc2626` (pro varování/chyby)

### Šablona kódu

Pro hladké hrany použít **4× supersampling** (vykreslit ve 400×400, zmenšit na 100×100):

```python
from PIL import Image, ImageDraw, ImageFont

# 4× supersampling pro anti-aliasing
scale = 4
size = 100 * scale

img = Image.new('RGB', (size, size), '#1e293b')
draw = ImageDraw.Draw(img)

# Gradient pozadí
for y in range(size):
    r = int(30 + (y / scale * 0.15))
    g = int(41 + (y / scale * 0.2))
    b = int(59 + (y / scale * 0.25))
    draw.line([(0, y), (size, y)], fill=(r, g, b))

# Font (velikost × scale)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf", 18 * scale)
except:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18 * scale)

# Badge s textem (souřadnice × scale)
draw.rounded_rectangle([(10 * scale, 35 * scale), (90 * scale, 65 * scale)], radius=4 * scale, fill='#2563eb')
draw.text((50 * scale, 50 * scale), "TEXT", fill='#ffffff', font=font, anchor='mm')

# Zmenšení s LANCZOS pro hladké hrany
img = img.resize((100, 100), Image.LANCZOS)
img.save('static/files/article/nazev-clanku.png', 'PNG')
```

### Pojmenování

Název souboru = slug článku + `.png`

Příklad: článek `get-vs-post.md` → obrázek `get-vs-post.png`
