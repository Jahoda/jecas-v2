# Vytváření náhledových obrázků pro články

Tento průvodce popisuje, jak vytvořit náhledové obrázky pro články, které se zobrazují v seznamech a na sociálních sítích.

## Konvence projektu

### Umístění a pojmenování

- **Cesta**: `static/files/article/{slug}.png`
- **Formát**: PNG
- **Rozměry**: 200×200 px
- **Pojmenování**: Přesně podle URL slugu článku (např. `materializovane-pohledy.png`)

### Automatické použití

Systém automaticky:

- Načte obrázek podle URL slugu článku
- Nastaví `og:image` meta tag pro Facebook/LinkedIn
- Nastaví `twitter:image` meta tag pro Twitter
- Přidá obrázek do JSON-LD structured data
- Zobrazí náhled v seznamech článků

**Není potřeba nic konfigurovat v článku!** Stačí mít správně pojmenovaný soubor na správném místě.

## Postup vytvoření

### 1. Příprava prostředí

```bash
# Nainstalovat Pillow (Python imaging library)
pip3 install Pillow
```

### 2. Vytvoření obrázku pomocí Python skriptu

Vytvoř dočasný Python skript pro generování obrázku:

```python
#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

# Konfigurace
SLUG = "nazev-clanku"  # ← ZMĚŇ TOTO!
WIDTH = 200
HEIGHT = 200

# Barvy - přizpůsob podle tématu článku
BG_COLOR = "#336791"      # Hlavní barva pozadí
ELEMENT_COLOR = "#4A90C8" # Barva hlavního prvku
ACCENT_COLOR = "#FFC107"  # Akcentová barva
WHITE = "#FFFFFF"

# Vytvoř obrázek
img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
draw = ImageDraw.Draw(img)

# === TU NAKRESLI SVÉ PRVKY ===
# Příklady:

# 1. Text
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
except:
    font = ImageFont.load_default()

text = "SQL"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_x = (WIDTH - text_width) // 2
text_y = 20

# Stín
draw.text((text_x + 2, text_y + 2), text, fill="#000000", font=font)
# Text
draw.text((text_x, text_y), text, fill=WHITE, font=font)

# 2. Obdélník/tabulka
draw.rounded_rectangle(
    [40, 80, 160, 170],
    radius=8,
    fill=ELEMENT_COLOR,
    outline=WHITE,
    width=2
)

# 3. Ikona (čtverec, kruh, hvězda...)
draw.ellipse([150, 30, 180, 60], fill=ACCENT_COLOR)

# === KONEC KRESLENÍ ===

# Ulož
output_path = f"static/files/article/{SLUG}.png"
img.save(output_path, "PNG")
print(f"✓ Obrázek vytvořen: {output_path}")
```

### 3. Spuštění skriptu

```bash
python3 create_thumbnail.py
```

### 4. Ověření

```bash
# Zkontroluj, že obrázek má správné rozměry
file static/files/article/{slug}.png

# Mělo by vypsat: PNG image data, 200 x 200, ...
```

### 5. Commit

```bash
git add static/files/article/{slug}.png
git commit -m "Přidán náhledový obrázek pro článek {název}"
git push
```

## Tipy pro design

### Barevné palety podle tématu

**Databáze/SQL:**

```python
BG_COLOR = "#336791"      # PostgreSQL modrá
ELEMENT_COLOR = "#4A90C8" # Světlejší modrá
ACCENT_COLOR = "#FFC107"  # Žlutá
```

**JavaScript:**

```python
BG_COLOR = "#F7DF1E"      # JS žlutá
ELEMENT_COLOR = "#323330" # Tmavá
ACCENT_COLOR = "#FFFFFF"  # Bílá
```

**CSS:**

```python
BG_COLOR = "#264DE4"      # CSS modrá
ELEMENT_COLOR = "#2965F1" # Světlá modrá
ACCENT_COLOR = "#EBEBEB"  # Šedá
```

**AI/ML:**

```python
BG_COLOR = "#00A67E"      # OpenAI zelená
ELEMENT_COLOR = "#74AA9C" # Světlá zelená
ACCENT_COLOR = "#FFD700"  # Zlatá
```

**Bezpečnost:**

```python
BG_COLOR = "#D32F2F"      # Červená
ELEMENT_COLOR = "#F44336" # Světle červená
ACCENT_COLOR = "#FFC107"  # Žlutá
```

### Typy ikon a symbolů

**Pro databázové články:**

- Tabulky (mřížky s řádky a sloupci)
- Cylindry (klasická DB ikona)
- Grafy vztahů

**Pro frontend články:**

- Značky `< >` pro HTML
- Kudrlinky `{ }` pro CSS/JS
- Komponenty/box layout

**Pro API články:**

- Šipky (směr toku dat)
- Brány/portály
- Spojené body (síťový graf)

**Pro výkon/optimalizace:**

- Blesky ⚡
- Rakety 🚀
- Rychloměry

### Kompoziční pravidla

1. **Jednoduchost**: Obrázek je malý (200×200), nebude vidět detail
2. **Kontrast**: Dobrý kontrast mezi pozadím a prvky
3. **Text**: Max 1-2 slova, velké písmo (20-28px)
4. **Centrování**: Hlavní prvek ve středu nebo podle zlatého řezu
5. **Stín na textu**: Pro lepší čitelnost

## Příklady z projektu

### Příklad 1: AI Programování

```python
# Jednoduché logo s ikonami nástrojů
# ai-programovani.png
# - Copilot logo
# - Tabnine logo
# - Zelené pozadí
```

### Příklad 2: AMP HTML

```python
# Textový banner
# amp-html.png
# - Text "ACCELERATED MOBILE PAGES PROJECT"
# - Modrý background
# - Bílé písmo
```

### Příklad 3: Materializované pohledy

```python
# Ikona + text
# materializovane-pohledy.png
# - Text "M-VIEW"
# - Tabulka (database icon)
# - Žlutá hvězdička (materializovaný stav)
# - PostgreSQL modrá
```

## Alternativní metody

### Ruční vytvoření v grafickém editoru

Pokud preferuješ grafický editor:

1. **Figma/Sketch**: Nakresli 200×200px artboard
2. **GIMP/Photoshop**: Vytvořit nový 200×200px obrázek
3. **Canva**: Použít custom rozměry

### Použití existujících log

Pro články o konkrétních technologiích:

```python
from PIL import Image

# Stáhni logo technologie
logo = Image.open("downloaded-logo.png")

# Změň velikost
logo = logo.resize((200, 200), Image.Resampling.LANCZOS)

# Nebo vytvoř s pozadím
img = Image.new('RGB', (200, 200), '#336791')
# Vlož logo na střed...
logo_resized = logo.resize((150, 150))
img.paste(logo_resized, (25, 25))

img.save(f"static/files/article/{SLUG}.png")
```

## Checklist pro nový článek

- [ ] Článek má správný `url_slug` v front matter
- [ ] Vytvořen obrázek `static/files/article/{slug}.png`
- [ ] Obrázek má rozměry 200×200 px
- [ ] Obrázek je ve formátu PNG
- [ ] Obrázek je commitnutý do gitu
- [ ] Obrázek je viditelný na článku (otevřít v dev režimu)
- [ ] OG meta tagy jsou správně nastavené (zkontrolovat zdrojový kód stránky)

## Debugging

### Obrázek se nezobrazuje

1. **Zkontroluj cestu**:

   ```bash
   ls -la static/files/article/{slug}.png
   ```

2. **Zkontroluj slug**: Musí přesně odpovídat URL článku

3. **Restart dev serveru**:

   ```bash
   pnpm run dev
   ```

4. **Vyčisti cache prohlížeče**: Ctrl+Shift+R

### OG preview nefunguje na sociálních sítích

1. **Facebook Debug Tool**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/

Vždy po přidání/změně obrázku je potřeba "re-scrape" URL na těchto nástrojích.

## Závěr

Vytváření náhledových obrázků:

1. ✅ Nainstaluj Pillow
2. ✅ Vytvoř Python skript pro konkrétní článek
3. ✅ Vygeneruj obrázek do `static/files/article/{slug}.png`
4. ✅ Commitni a pushni
5. ✅ Hotovo! Systém si ho automaticky najde

**Pro každý nový článek opakuj kroky 2-4.**
