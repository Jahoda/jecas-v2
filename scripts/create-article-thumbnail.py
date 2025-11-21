#!/usr/bin/env python3
"""
Šablona pro vytváření náhledových obrázků článků.

Použití:
    python3 scripts/create-article-thumbnail.py

Před spuštěním:
    1. Nainstaluj Pillow: pip3 install Pillow
    2. Uprav konstanty SLUG, barvy a obsah
    3. Spusť skript
    4. Commitni výsledný obrázek
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ============================================================================
# KONFIGURACE - UPRAV PRO KAŽDÝ ČLÁNEK
# ============================================================================

# URL slug článku (např. "materializovane-pohledy")
SLUG = "nazev-clanku"  # ← ZMĚŇ TOTO!

# Rozměry (NEMĚŇ - standardní velikost)
WIDTH = 200
HEIGHT = 200

# Barevná paleta - vyber nebo uprav podle tématu
# Databáze/SQL:     BG="#336791", ELEMENT="#4A90C8", ACCENT="#FFC107"
# JavaScript:       BG="#F7DF1E", ELEMENT="#323330", ACCENT="#FFFFFF"
# CSS:              BG="#264DE4", ELEMENT="#2965F1", ACCENT="#EBEBEB"
# AI/ML:            BG="#00A67E", ELEMENT="#74AA9C", ACCENT="#FFD700"
# Bezpečnost:       BG="#D32F2F", ELEMENT="#F44336", ACCENT="#FFC107"

BG_COLOR = "#336791"      # Hlavní barva pozadí
ELEMENT_COLOR = "#4A90C8" # Barva hlavního prvku (ikony, tvary)
ACCENT_COLOR = "#FFC107"  # Akcentová barva (zvýraznění)
WHITE = "#FFFFFF"
BLACK = "#000000"

# Text (může být prázdný, pokud nechceš text)
TEXT = "TEXT"  # ← Uprav nebo nastav na "" pro žádný text
TEXT_SIZE = 24
TEXT_Y = 20  # Y pozice textu (20 = nahoře)

# ============================================================================
# KÓD PRO VYTVOŘENÍ OBRÁZKU
# ============================================================================

def create_thumbnail():
    """Vytvoří náhledový obrázek pro článek."""

    # Vytvoř obrázek
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # ========================================================================
    # TU NAKRESLI SVÉ PRVKY
    # Odkomentuj a uprav podle potřeby
    # ========================================================================

    # --- TEXT ---
    if TEXT:
        try:
            # Zkus načíst font
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", TEXT_SIZE)
        except:
            # Fallback na default font
            font = ImageFont.load_default()

        # Vypočítej pozici pro centrování
        bbox = draw.textbbox((0, 0), TEXT, font=font)
        text_width = bbox[2] - bbox[0]
        text_x = (WIDTH - text_width) // 2

        # Nakresli text se stínem (pro lepší čitelnost)
        draw.text((text_x + 2, TEXT_Y + 2), TEXT, fill=BLACK, font=font)
        draw.text((text_x, TEXT_Y), TEXT, fill=WHITE, font=font)

    # --- PŘÍKLADY TVARŮ (odkomentuj a uprav) ---

    # Obdélník/tabulka
    # draw.rounded_rectangle(
    #     [40, 80, 160, 170],
    #     radius=8,
    #     fill=ELEMENT_COLOR,
    #     outline=WHITE,
    #     width=2
    # )

    # Kruh
    # draw.ellipse([150, 30, 180, 60], fill=ACCENT_COLOR)

    # Hvězda (8-cípá)
    # star_center = (170, 40)
    # star_size = 15
    # points = [
    #     (star_center[0], star_center[1] - star_size),
    #     (star_center[0] + star_size//2, star_center[1] - star_size//2),
    #     (star_center[0] + star_size, star_center[1]),
    #     (star_center[0] + star_size//2, star_center[1] + star_size//2),
    #     (star_center[0], star_center[1] + star_size),
    #     (star_center[0] - star_size//2, star_center[1] + star_size//2),
    #     (star_center[0] - star_size, star_center[1]),
    #     (star_center[0] - star_size//2, star_center[1] - star_size//2),
    # ]
    # draw.polygon(points, fill=ACCENT_COLOR)

    # Čára/separator
    # draw.line([(30, 100), (170, 100)], fill=WHITE, width=3)

    # Více obdélníků (tabulka s řádky)
    # table_x, table_y = 40, 80
    # table_w, table_h = 120, 90
    # draw.rounded_rectangle(
    #     [table_x, table_y, table_x + table_w, table_y + table_h],
    #     radius=8,
    #     fill=ELEMENT_COLOR,
    #     outline=WHITE,
    #     width=2
    # )
    # # Řádky
    # for i in range(1, 4):
    #     y = table_y + (table_h // 4) * i
    #     draw.line([(table_x, y), (table_x + table_w, y)], fill=WHITE, width=2)
    # # Sloupce
    # for i in range(1, 3):
    #     x = table_x + (table_w // 3) * i
    #     draw.line([(x, table_y), (x, table_y + table_h)], fill=WHITE, width=2)

    # ========================================================================
    # KONEC KRESLENÍ
    # ========================================================================

    # Vytvoř adresář, pokud neexistuje
    os.makedirs("static/files/article", exist_ok=True)

    # Ulož obrázek
    output_path = f"static/files/article/{SLUG}.png"
    img.save(output_path, "PNG")

    print(f"✓ Obrázek vytvořen: {output_path}")
    print(f"✓ Rozměry: {WIDTH}×{HEIGHT} px")
    print(f"\nDalší kroky:")
    print(f"  git add {output_path}")
    print(f'  git commit -m "Přidán náhledový obrázek pro článek {SLUG}"')
    print(f"  git push")


if __name__ == "__main__":
    if SLUG == "nazev-clanku":
        print("⚠️  VAROVÁNÍ: Nezapomeň změnit SLUG na správný název článku!")
        print("   Otevři tento soubor a uprav konstantu SLUG na řádku 17")
        print()
        response = input("Pokračovat i tak? (ano/ne): ")
        if response.lower() not in ["ano", "a", "yes", "y"]:
            print("Zrušeno.")
            exit(1)

    try:
        create_thumbnail()
    except Exception as e:
        print(f"❌ Chyba: {e}")
        print("\nUjisti se, že:")
        print("  1. Máš nainstalovaný Pillow: pip3 install Pillow")
        print("  2. Jsi v root adresáři projektu")
        print("  3. Existuje adresář static/files/")
        exit(1)
