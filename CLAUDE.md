# Pokyny pro Claude

## Struktura projektu

- **Články**: `content/posts/*.md` - Markdown soubory s YAML frontmatter
- **Tagy**: `content/tags/*.md` - Definice kategorií
- **Náhledové obrázky**: `static/files/article/*.png` - 100x100 px PNG

## Vytváření článků

### Frontmatter

```yaml
---
title: "Krátký název"
headline: "SEO titulek"
description: "Meta popis 1-2 věty."
date: "YYYY-MM-DD"
status: 1
tags: ["tag1", "tag2"]
format: "html"
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

```python
from PIL import Image, ImageDraw, ImageFont

img = Image.new('RGB', (100, 100), '#1e293b')
draw = ImageDraw.Draw(img)

# Gradient pozadí
for y in range(100):
    r = int(30 + (y * 0.15))
    g = int(41 + (y * 0.2))
    b = int(59 + (y * 0.25))
    draw.line([(0, y), (100, y)], fill=(r, g, b))

# Font
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf", 18)
except:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)

# Badge s textem
draw.rounded_rectangle([(10, 35), (90, 65)], radius=4, fill='#2563eb')
draw.text((50, 50), "TEXT", fill='#ffffff', font=font, anchor='mm')

img.save('static/files/article/nazev-clanku.png', 'PNG')
```

### Pojmenování

Název souboru = slug článku + `.png`

Příklad: článek `get-vs-post.md` → obrázek `get-vs-post.png`
