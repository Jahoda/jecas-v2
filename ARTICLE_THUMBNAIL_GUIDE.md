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

### 2. Stažení moderního fontu Inter

Pro lepší vzhled použij font Inter (Google Fonts):

```bash
# Stáhni a rozbal Inter font
mkdir -p /tmp/fonts && cd /tmp/fonts
curl -sL "https://github.com/rsms/inter/releases/download/v4.0/Inter-4.0.zip" -o inter.zip
unzip -j inter.zip "extras/ttf/Inter-Bold.ttf" "extras/ttf/Inter-Medium.ttf" "extras/ttf/Inter-Regular.ttf" -d .
```

### 3. Vytvoření obrázku pomocí Python skriptu

Vytvoř dočasný Python skript pro generování obrázku:

```python
#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

# Konfigurace
SLUG = "nazev-clanku"  # ← ZMĚŇ TOTO!
WIDTH = 200
HEIGHT = 200

# Moderní Slate barevná paleta (Tailwind)
BG_COLOR = "#0f172a"       # Slate 900
ELEMENT_COLOR = "#1e293b"  # Slate 800
BORDER_COLOR = "#334155"   # Slate 700
TEXT_COLOR = "#f8fafc"     # Slate 50
GRAY = "#64748b"           # Slate 500
ACCENT_COLOR = "#3b82f6"   # Blue 500

# Fonty - Inter (moderní, čistý)
FONT_BOLD = "/tmp/fonts/Inter-Bold.ttf"
FONT_MEDIUM = "/tmp/fonts/Inter-Medium.ttf"
FONT_REGULAR = "/tmp/fonts/Inter-Regular.ttf"

# Fallback na systémový font
def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        try:
            return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
        except:
            return ImageFont.load_default()

# Vytvoř obrázek
img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
draw = ImageDraw.Draw(img)

# === TU NAKRESLI SVÉ PRVKY ===
# Příklady:

# 1. Text (nadpis)
font_title = load_font(FONT_BOLD, 32)
text = "SQL"
bbox = draw.textbbox((0, 0), text, font=font_title)
text_width = bbox[2] - bbox[0]
text_x = (WIDTH - text_width) // 2
draw.text((text_x, 15), text, fill=TEXT_COLOR, font=font_title)

# 2. Box s border radius
draw.rounded_rectangle(
    [20, 60, 180, 140],
    radius=6,
    fill=ELEMENT_COLOR,
    outline=BORDER_COLOR,
    width=1
)

# 3. Menší text v boxu
font_small = load_font(FONT_REGULAR, 13)
draw.text((30, 70), "SELECT * FROM", fill=GRAY, font=font_small)

# 4. Badge dole
font_badge = load_font(FONT_BOLD, 14)
badge_text = "DATABASE"
bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
text_width = bbox[2] - bbox[0]
text_x = (WIDTH - text_width) // 2

draw.rounded_rectangle(
    [text_x - 10, 165, text_x + text_width + 10, 185],
    radius=4,
    fill="#1e3a5f",
    outline=ACCENT_COLOR,
    width=1
)
draw.text((text_x, 167), badge_text, fill=ACCENT_COLOR, font=font_badge)

# === KONEC KRESLENÍ ===

# Ulož
output_path = f"static/files/article/{SLUG}.png"
img.save(output_path, "PNG")
print(f"✓ Obrázek vytvořen: {output_path}")
```

### 4. Spuštění skriptu

```bash
python3 create_thumbnail.py
```

### 5. Ověření

```bash
# Zkontroluj, že obrázek má správné rozměry
file static/files/article/{slug}.png

# Mělo by vypsat: PNG image data, 200 x 200, ...
```

### 6. Commit

```bash
git add static/files/article/{slug}.png
git commit -m "Přidán náhledový obrázek pro článek {název}"
git push
```

## Tipy pro design

### Barevné palety podle tématu (Tailwind CSS)

**Databáze/SQL (Slate + Blue):**

```python
BG_COLOR = "#0f172a"       # Slate 900
ELEMENT_COLOR = "#1e293b"  # Slate 800
BORDER_COLOR = "#334155"   # Slate 700
TEXT_COLOR = "#f8fafc"     # Slate 50
ACCENT_COLOR = "#3b82f6"   # Blue 500
```

**JavaScript (Amber):**

```python
BG_COLOR = "#78350f"       # Amber 900
ELEMENT_COLOR = "#92400e"  # Amber 800
BORDER_COLOR = "#b45309"   # Amber 700
TEXT_COLOR = "#fef3c7"     # Amber 100
ACCENT_COLOR = "#fbbf24"   # Amber 400
```

**CSS (Indigo):**

```python
BG_COLOR = "#1e1b4b"       # Indigo 950
ELEMENT_COLOR = "#312e81"  # Indigo 900
BORDER_COLOR = "#3730a3"   # Indigo 800
TEXT_COLOR = "#e0e7ff"     # Indigo 100
ACCENT_COLOR = "#818cf8"   # Indigo 400
```

**AI/ML (Emerald):**

```python
BG_COLOR = "#022c22"       # Emerald 950
ELEMENT_COLOR = "#064e3b"  # Emerald 900
BORDER_COLOR = "#065f46"   # Emerald 800
TEXT_COLOR = "#d1fae5"     # Emerald 100
ACCENT_COLOR = "#34d399"   # Emerald 400
```

**Bezpečnost (Rose):**

```python
BG_COLOR = "#4c0519"       # Rose 950
ELEMENT_COLOR = "#881337"  # Rose 900
BORDER_COLOR = "#9f1239"   # Rose 800
TEXT_COLOR = "#ffe4e6"     # Rose 100
ACCENT_COLOR = "#fb7185"   # Rose 400
```

**Testování (Amber + Red + Green):**

```python
BG_COLOR = "#0f172a"       # Slate 900
PASS_COLOR = "#22c55e"     # Green 500
FAIL_COLOR = "#ef4444"     # Red 500
WARN_COLOR = "#f59e0b"     # Amber 500
TEXT_COLOR = "#f8fafc"     # Slate 50
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
