---
title: "Drag & Drop upload obrázků"
headline: "Drag & Drop upload obrázků"
description: "Všechny možnosti nahrávání obrázků ze schránky a pomocí drag &amp; drop."
date: "2014-11-02"
last_modification: "2015-09-03"
status: 1
tags: ["JavaScript", "Hotová řešení", "Obrázky"]
---

Pro **maximální pohodlí návštěvníka** při nahrávání obrázků na web existuje řada postupů, které fungují v různých prohlížečích.

Ukázka maximálních možností uploadu běží na: [img.djpw.cz](http://img.djpw.cz)

## Vložení ze schránky

Příjemná funkce je **vložení obrázku ze schránky**. Zde se situace lehce komplikuje, neboť mohou nastat dva případy vložení.

    Uživatel **zkopíruje celý soubor**. Buď přes *kontextové menu*, nebo například klávesovou zkratkou Ctrl + C.

  - Uživatel **zkopíruje kus (výřez) obrázku** do schránky. To může nastat v **grafickém editoru**, také po vyfocení obrazovky klávesou PrintScreen (či jen aktivního okna – Alt + PrintScreen) nebo třeba v prohlížeči po vybrání volby *Kopírovat obrázek* z kontextového menu.

### Využití `contenteditable`

Ve **Firefoxu** a **IE 11** je možné využít toho, že tyto prohlížeče umí (například) **screenshot obrazovky** vložit jako obrázek do elementu s `contenteditable`/`designMode` (tak si je možné vytvořit i [vlastní WYSIWYG edtior](/vlastni-wysiwyg)).

**Firefox** takto umí dokonce i vkládat zkopírované soubory.

[Živá ukázka](http://kod.djpw.cz/rchb) – vložení obrázku ze schránky do `contenteditable`

Jinde to ale nefunguje. Ve staré **Opeře 12** a starších **IE** není možnost obrázek ze schránky vložit (jen s využitím HTML a JS) v jakékoliv podobě bez použití nějakých **pluginů** v Javě nebo Flashi.

V **Chrome** jde použít `clipboardData`.

[Živá ukázka](http://kod.djpw.cz/ovpb) – získání souboru z `clipboardData`

## Drag &amp; Drop souborů

Kromě vložení přes Ctrl + V se může hodit i nahrání souboru jeho přetažením na stránku.

V **Chrome**, **nové Opeře** a **Firefoxu** jde soubor přesunout přímo na [`&lt;input type="file">`](/input#type-file) bez nutnosti dalšího programování. **Internet Explorer** ani [**MS Edge**](/microsoft-edge) toto neumí.

Jelikož je ale dobré mít uploadování funkční i v **IE** a navíc se hodí mít pro přesun souborů vyhrazenou větší plochu, která bude po přetažení navíc signalisovat možnost **tažený soubor upustit**, je řešení pomocí `&lt;input type="file">` celkem nedostatečné.

Nejdříve je nutné zablokovat výchozí akci prohlížeče při **přetáhnutí souboru**, což někde způsobí nežádoucí přechod na obrázek. Slouží k tomu drag &amp; drop událostí:

```
function prevent(e) {
    e = e || event;
    e.preventDefault();
}
window.addEventListener("dragover", prevent, false);
window.addEventListener("drop", prevent, false);
```

Přetažený soubor (nebo soubory) se získají z `event.dataTransfer.files` při události `ondrop` (upuštění obrázku).

[Živá ukázka](http://kod.djpw.cz/cchb) – výpis přetažených souborů

## Zvýraznění při přesouvání

Aby uživatel poznal, že stránka na přesouvání souboru reaguje, použijí se příslušné [drag &amp; drop události myši](/udalosti-mysi#drag-drop).

  - `ondragenter` – uživatel najel se souborem na oblast (provést zvýraznění)

  - `ondragleave` – uživatel najel se souborem na oblast (zrušit zvýraznění)

  - `ondrop` – uživatel soubor v dané oblasti *pustil*

## Zobrazení souboru

Když člověk vybere soubor (je jedno, jestli přesunutím na `&lt;input type="file">` nebo po kliknutí na tlačítko *Vybrat*) či použije přetažení myší, je dobré obsah obrázku **ihned zobrazit**.

Kromě toho, že návštěvník získá jistotu, že vybral správný obrázek a uvidí ho prakticky ihned, lze nabídnout i nějaké základní **funkce pro práci s obrázky**:

  - změnu velikosti,

  - oříznutí,

  - otočení/převrácení

To lze v dnešních prohlížečích řešit **na straně klienta** bez nutnosti přenášet data na server. Zvlášť výhodné je to u zmenšování obrázků, což je výborné i pro uživatele, neboť nemusí třeba X megabytový soubor vůbec **nikam přenášet**, ale nahraje se jen jeho zmenšenina.

Slouží k tomu *FileReader*:

### `FileReader`

Řešení pomocí `FileReader` funguje od **IE 10**. Pro vložení souboru jako obrázku na stránku je potřeba z původního souboru udělat [data URL](/data-uri), která se nastaví jako `src` pro `&lt;img>` (popř. se následně tento obrázek může nakreslit do [`&lt;canvas>`u](/canvas)). Převod na *data URL* řeší metoda `readAsDataURL`, které se jako argument předá soubor získaný z políčka pro **nahrávání souborů** nebo pomocí `dataTransfer` při přesunutí souboru do stránky pomocí drag&amp;dropu.

FileReader se používá velmi jednoduše:

```
var reader = new FileReader();
reader.onload = function (e) {
  *obrazek*.src = e.target.result;
};
reader.readAsDataURL(**soubor**);
```

  - Proměnná `obrazek` je `&lt;img>` značka na stránce, kde se obrázek objeví.

  - Proměnná `soubor` obsahuje soubor získaný přes `dataTransfer.files` / `input.files`.

Za povšimnutí stojí konstrukce `reader.onload`, která se spustí po dokončení `readAsDataURL`.

### Zobrazení přetaženého souboru

Hotové řešení zobrazení obrázku po drag &amp; drop může vypadat následovně:

[Živá ukázka](http://kod.djpw.cz/gchb) – zobrazení obrázku před uploadem

### Zobrazení souboru z `&lt;input>`u

V případě políčka `&lt;input>` se celý proces náhledu nabízí volat při změně (`onchange`) nahrávacího `&lt;input>`u.

```
&lt;input type="file" onchange="zobrazit(this)">
```

Funkci `zobrazit` se předává nahrávací políčko (`this`) právě kvůli následnému získání souboru z `input.files`.

[Živá ukázka](http://kod.djpw.cz/tbhb) – okamžitého zobrazení obrázku z `&lt;input type="file">`

### Více souborů najednou

Pro upload více souborů existuje HTML atribut `multiple`. V takovém případě bude záhodno zobrazit náhledy všech souborů. Počet souborů se zjistí z `input.files.length`. Potom stačí soubory projít [běžným cyklem `for`](/js-cykly) a místo nuly na místě indexu použít index každého jednoho souboru.

[Živá ukázka](http://kod.djpw.cz/xbhb) – zobrazení více souboru z `multiple` upload políčka.

Zobrazení více (datově větších) souborů **zabere nějaký čas**. Tudíž by bylo dobré dát uživateli vědět, že se něco děje.

### Kreslení do `&lt;canvas>`u

Překreslit obrázek do elementu `&lt;canvas>` jde metodou `drawImage`. Nejdříve se v HTML kódu připraví *plátno* (`&lt;canvas>`).

```
&lt;canvas id="**cc**">&lt;/canvas>
```

Do pomocných proměnných se přidá odkaz na `&lt;canvas>` a jeho *2D kontext*.

```
var canvas = document.getElementById("**cc**");
var ctx = canvas.getContext("2d");
```

A do funkce prováděné při `reader.onload` se pár řádky **nakreslí na plátno obrázek**. Může se hodit i nastavit `&lt;canvas>`u rozměry podle obrázku.

```
canvas.width = obrazek.width;
canvas.height = obrazek.height;
ctx.**drawImage**(obrazek, 0, 0);
```

Druhý a třetí parametr funkce `drawImage` **určuje souřadnice**, kam se má obrázek nakreslit – cílem je ho umístit hned do levého horního rohu, proto ty dvě nuly. Proměnná `obrazek` je `&lt;img>` element.

[Živá ukázka](http://kod.djpw.cz/ubhb) – překreslení obrázku do `&lt;canvas>`u

Kvůli **IE** musí obrázek na stránce skutečně existovat (být přidán do [DOMu](/dom)), byť třeba skrytý.

```
var obrazek = new Image();
obrazek.src = e.target.result;
```

Tato elegantnější konstrukce proto nebude v **IE** fungovat ([ukázka](http://kod.djpw.cz/vbhb)).

### Zobrazení textu před uploadem

Také textový soubor je možné před samotným nahráváním zobrazit.

Místo metody `readAsDataURL` k tomu slouží **přečtení souboru jako text** – `readAs**Text**` a výsledek se nastaví jako [`innerHTML`](/innerhtml) nějakého elementu.

[Živá ukázka](http://kod.djpw.cz/ybhb)

## Starší prohlížeče

V **IE 9** a starších není možné použít `FileReader`. Pro zobrazení náhledu tak nezbývá než soubor **nahrát na server** a až ten zobrazit. Případně použít nějaký plugin ve Flashi nebo Javě.

Údajně by ve starších **IE** mohlo fungovat [tohle](http://forums.asp.net/t/1320559.aspx) – [ukázka](http://kod.djpw.cz/wbhb) – v **IE 9** to ale funkčně nevypadá.

## Upload souboru

Samotný proces **nahrání souboru na server** proběhne například odesláním [AJAXového](/ajax) požadavku. Jako data se odešle *data URL*.

Obsah `&lt;canvas>`u se získá prostým `canvas.toDataURL()`.

```
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    alert(xhr.responseText); // výstup PHP skriptu
  }
}
xhr.open("POST", "upload.php");
xhr.setRequestHeader(
  "Content-type", 
  "application/x-www-form-urlencoded"
);
xhr.send("data=" + canvas.toDataURL());

```

PHP skript `upload.php`, který tento obsah **uložit do souboru** může vypadat takto:

```
if (isset($_POST["data"])) {
  $img = $_POST["data"];
  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $filename = time() . ".png";
  file_put_contents($filename, $data);
  echo $filename;
}
else {
  echo "Error";
}
```

    Při ukládání souborů je v praxi dobré zajistit, aby nemohlo vzniknout [hodně souborů v rámci jedné složky](/slozka-hodne-souboru).

  Taktéž určování názvu souboru podle *timestampu* (času požadavku na uložení) nebude v případě používání uploadu více uživateli ideální. Mohli by si navzájem obrázky **přepisovat**.

  Lepší postup je o obrázcích ukládat **záznam v databási** a fysický obrázek na serveru pojmenovat až na základě identifikátoru v DB (popř. nějakým hashem).

    Skript natvrdo ukládá obrázky jako PNG. To v případě například fotek nebude s ohledem na **datovou velikost** optimální formát.

## Odkazy jinam

  - [img.djpw.cz](http://img.djpw.cz) – můj nahrávač souborů obsahující všechny popsané postupy

  - MDN: [DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)

  - [Odchycení vložení obrázku ze schránky](http://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in) ([ukázka](http://jsfiddle.net/KJW4E/2/))

  - PHP triky: [Ukládání souborů od uživatele](http://php.vrana.cz/ukladani-souboru-od-uzivatele.php)

  - Medio Blog: [Jak ukládáme obrázky](http://blog.medio.cz/jak-ukladame-obrazky)

  - The New Code: [Upload and Upgrade: The HTML File Form Input](http://thenewcode.com/42/Upload-and-Upgrade-The-HTML-File-Form-Input)