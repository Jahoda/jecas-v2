# Nahrávání obrázků ke článkům

Tato funkcionalita umožňuje v dev režimu nahrávat obrázky ke článkům pomocí drag & drop nebo paste ze schránky.

## Funkce

### 1. Náhledový obrázek

- **Umístění**: `static/files/article/{slug}.png`
- **Formát**: PNG
- **Použití**: Pro zobrazení náhledu článku v seznamech a sociálních sítích

### 2. Obrázek ke článku

- **Umístění**: `static/files/{slug}/{timestamp}-{nazev}.png`
- **Formát**: PNG, JPG, GIF, WebP
- **Použití**: Pro vložení do obsahu článku

## Jak používat

### V dev režimu

1. **Přejděte na stránku článku** - funkcionalita se zobrazí pouze v dev režimu
2. **Nahrávání náhledového obrázku**:
   - Přetáhněte PNG soubor do levé zóny
   - Nebo klikněte "Vybrat soubor"
   - Soubor se automaticky pojmenuje jako `{slug}.png`

3. **Nahrávání obrázku ke článku**:
   - Přetáhněte obrázek do pravé zóny
   - Nebo klikněte "Vybrat soubor"
   - Nebo použijte Ctrl+V pro paste ze schránky
   - Při paste se zobrazí dialog pro zadání názvu souboru

### Paste ze schránky

1. **Zkopírujte obrázek** do schránky (Ctrl+C nebo screenshot)
2. **Přejděte na stránku článku** v dev režimu
3. **Stiskněte Ctrl+V**
4. **Zadejte název souboru** v dialogu
5. **Potvrďte** - obrázek se nahraje a markdown kód se vloží do aktivního textového pole

## Technické detaily

### Komponenty

- `ImageUpload.svelte` - Základní komponenta pro drag & drop
- `ImageUploadManager.svelte` - Správa nahrávání a zobrazení UI
- `FileNameDialog.svelte` - Dialog pro zadání názvu souboru

### API Endpoint

- `POST /api/upload` - Nahrává soubory na server
- Pouze dostupné v dev režimu
- Validuje typ souboru (pouze obrázky)
- Automaticky vytváří složky podle potřeby

### Bezpečnost

- Funkcionalita je dostupná pouze v dev režimu
- Validace typů souborů
- Sanitizace názvů souborů
- Omezení na obrázkové formáty

## Struktura souborů

```
static/
├── files/
│   ├── article/
│   │   ├── slug1.png
│   │   └── slug2.png
│   └── slug1/
│       ├── 1703123456789-obrazek1.png
│       └── 1703123456790-obrazek2.jpg
```

## Markdown kód

Po nahrání obrázku ke článku se automaticky vygeneruje markdown kód:

```markdown
![nazev-souboru](/files/slug/timestamp-nazev-souboru.png)
```

Kód se buď:

- Vloží do aktivního textového pole
- Zkopíruje do schránky (pokud není aktivní textové pole)

## Podporované formáty

- **Náhledový obrázek**: PNG
- **Obrázky ke článku**: PNG, JPG, GIF, WebP

## Omezení

- Funkcionalita je dostupná pouze v dev režimu
- Maximální velikost souboru závisí na konfiguraci serveru
- Názvy souborů jsou automaticky sanitizovány
